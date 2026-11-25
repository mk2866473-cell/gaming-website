/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { Dices, Check, AlertTriangle, RotateCcw } from 'lucide-react';
import {
  PASSIVE_TRAITS,
  PALWORLD_INHERITANCE_REFERENCE_TABLE,
  PALWORLD_SPECIAL_CAKE_RECIPE,
  PassiveInheritanceMode,
  PassiveTrait,
  calculatePassiveInheritanceOdds
} from '../../data/palworldData';

export default function PalworldPassiveInheritanceCalculator() {
  const [parentAIds, setParentAIds] = useState<string[]>(['legend', 'musclehead']);
  const [parentBIds, setParentBIds] = useState<string[]>(['ferocious', 'swift']);
  const [desiredIds, setDesiredIds] = useState<string[]>(['legend', 'musclehead', 'ferocious', 'swift']);
  const [mode, setMode] = useState<PassiveInheritanceMode>('extras-allowed');
  const [specialCake, setSpecialCake] = useState<boolean>(false);

  const traitById = useMemo(() => {
    const map = new Map<string, PassiveTrait>();
    for (const trait of PASSIVE_TRAITS) {
      map.set(trait.id, trait);
    }
    return map;
  }, []);

  // Combined unique pool across Parent A + Parent B (duplicates count once)
  const uniquePool = useMemo(() => {
    const seen = new Set<string>();
    const list: PassiveTrait[] = [];
    for (const id of [...parentAIds, ...parentBIds]) {
      if (!seen.has(id)) {
        seen.add(id);
        const trait = traitById.get(id);
        if (trait) list.push(trait);
      }
    }
    return list;
  }, [parentAIds, parentBIds, traitById]);

  const poolIdSet = useMemo(() => new Set(uniquePool.map(t => t.id)), [uniquePool]);

  // Valid desired passives must belong to the current unique pool and be at most 4
  const activeDesiredIds = useMemo(
    () => desiredIds.filter(id => poolIdSet.has(id)).slice(0, 4),
    [desiredIds, poolIdSet]
  );

  const duplicateCount = useMemo(() => {
    const setA = new Set(parentAIds);
    return parentBIds.filter(id => setA.has(id)).length;
  }, [parentAIds, parentBIds]);

  const result = useMemo(
    () =>
      calculatePassiveInheritanceOdds(
        uniquePool.length,
        activeDesiredIds.length,
        mode,
        specialCake
      ),
    [uniquePool.length, activeDesiredIds.length, mode, specialCake]
  );

  const toggleParentPassive = (
    parent: 'A' | 'B',
    traitId: string
  ) => {
    const current = parent === 'A' ? parentAIds : parentBIds;
    const setter = parent === 'A' ? setParentAIds : setParentBIds;

    let next: string[];
    if (current.includes(traitId)) {
      next = current.filter(id => id !== traitId);
    } else {
      if (current.length >= 4) return;
      next = [...current, traitId];
    }

    setter(next);

    // Prune desiredIds that are no longer in either parent
    const other = parent === 'A' ? parentBIds : parentAIds;
    const nextPool = new Set([...next, ...other]);
    setDesiredIds(prev => prev.filter(id => nextPool.has(id)));
  };

  const toggleDesired = (traitId: string) => {
    if (!poolIdSet.has(traitId)) return;
    setDesiredIds(prev => {
      const valid = prev.filter(id => poolIdSet.has(id));
      if (valid.includes(traitId)) {
        return valid.filter(id => id !== traitId);
      }
      if (valid.length >= 4) return valid;
      return [...valid, traitId];
    });
  };

  const handleSelectAllPool = () => {
    setDesiredIds(uniquePool.slice(0, 4).map(t => t.id));
  };

  const handleReset = () => {
    setParentAIds(['legend', 'musclehead']);
    setParentBIds(['ferocious', 'swift']);
    setDesiredIds(['legend', 'musclehead', 'ferocious', 'swift']);
    setMode('extras-allowed');
    setSpecialCake(false);
  };

  const isExactCakeImpossible =
    mode === 'exact-only' &&
    specialCake &&
    uniquePool.length > 0 &&
    activeDesiredIds.length > 0 &&
    Math.min(4, uniquePool.length) !== activeDesiredIds.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-400 font-medium">
              <Dices className="w-4 h-4 shrink-0" />
              <span>Palworld 1.0 Datamined Model</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">Inherit Roll 40/30/20/10</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">Random Add 40/30/20/10</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Palworld Passive Inheritance Odds Calculator
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Pick up to 4 passives on Parent A and Parent B, tick 1–4 passives the child must inherit from the unique pool, and calculate exact per-egg odds.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0 self-start cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Parent Selections, Pool & Options */}
        <div className="lg:col-span-7 space-y-6">
          {/* Parent A & Parent B Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Parent A */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white">Parent A Passives</h3>
                  <p className="text-xs text-zinc-400 font-mono tabular-nums">
                    {parentAIds.length}/4 selected
                  </p>
                </div>
                {parentAIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setParentAIds([]);
                      const nextPool = new Set(parentBIds);
                      setDesiredIds(prev => prev.filter(id => nextPool.has(id)));
                    }}
                    className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-950 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-1.5 max-h-72 overflow-y-auto pr-1">
                {PASSIVE_TRAITS.map(trait => {
                  const selected = parentAIds.includes(trait.id);
                  const disabled = !selected && parentAIds.length >= 4;
                  return (
                    <button
                      key={`A-${trait.id}`}
                      type="button"
                      disabled={disabled}
                      onClick={() => toggleParentPassive('A', trait.id)}
                      className={`min-h-[40px] px-3 py-2 rounded-lg border text-left transition-colors flex items-center justify-between gap-2 ${
                        selected
                          ? 'bg-cyan-500/15 border-cyan-500 text-white'
                          : disabled
                            ? 'bg-zinc-950/40 border-zinc-800/50 text-zinc-600 cursor-not-allowed'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 cursor-pointer'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">{trait.name}</div>
                        <div className="text-[11px] text-zinc-400 truncate">{trait.description}</div>
                      </div>
                      {selected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Parent B */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white">Parent B Passives</h3>
                  <p className="text-xs text-zinc-400 font-mono tabular-nums">
                    {parentBIds.length}/4 selected
                  </p>
                </div>
                {parentBIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setParentBIds([]);
                      const nextPool = new Set(parentAIds);
                      setDesiredIds(prev => prev.filter(id => nextPool.has(id)));
                    }}
                    className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-950 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-1.5 max-h-72 overflow-y-auto pr-1">
                {PASSIVE_TRAITS.map(trait => {
                  const selected = parentBIds.includes(trait.id);
                  const disabled = !selected && parentBIds.length >= 4;
                  return (
                    <button
                      key={`B-${trait.id}`}
                      type="button"
                      disabled={disabled}
                      onClick={() => toggleParentPassive('B', trait.id)}
                      className={`min-h-[40px] px-3 py-2 rounded-lg border text-left transition-colors flex items-center justify-between gap-2 ${
                        selected
                          ? 'bg-emerald-500/15 border-emerald-500 text-white'
                          : disabled
                            ? 'bg-zinc-950/40 border-zinc-800/50 text-zinc-600 cursor-not-allowed'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 cursor-pointer'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">{trait.name}</div>
                        <div className="text-[11px] text-zinc-400 truncate">{trait.description}</div>
                      </div>
                      {selected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Unique Pool & Desired Passives Checkboxes */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Combined Unique Pool &amp; Desired Child Passives
                </h3>
                <p className="text-xs text-zinc-400 font-mono tabular-nums mt-0.5">
                  Pool P = {uniquePool.length} unique {uniquePool.length === 1 ? 'passive' : 'passives'}
                  {duplicateCount > 0 ? ` (${duplicateCount} duplicate${duplicateCount > 1 ? 's' : ''} merged)` : ''}
                  {' · '}
                  Desired D = {activeDesiredIds.length}/4
                </p>
              </div>

              {uniquePool.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSelectAllPool}
                    className="text-xs text-cyan-400 hover:text-cyan-300 px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Tick up to 4
                  </button>
                  {activeDesiredIds.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setDesiredIds([])}
                      className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Clear desired
                    </button>
                  )}
                </div>
              )}
            </div>

            {uniquePool.length === 0 ? (
              <div className="py-6 text-center text-xs text-zinc-400">
                Select at least 1 passive on Parent A or Parent B above to build the breeding pool.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {uniquePool.map(trait => {
                  const checked = activeDesiredIds.includes(trait.id);
                  const disabled = !checked && activeDesiredIds.length >= 4;
                  const onA = parentAIds.includes(trait.id);
                  const onB = parentBIds.includes(trait.id);
                  const sourceText = onA && onB ? 'Both parents (counts once)' : onA ? 'Parent A' : 'Parent B';

                  return (
                    <label
                      key={`pool-${trait.id}`}
                      className={`min-h-[44px] px-3.5 py-2.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                        checked
                          ? 'bg-cyan-500/15 border-cyan-500 text-white cursor-pointer'
                          : disabled
                            ? 'bg-zinc-950/40 border-zinc-800/60 text-zinc-500 cursor-not-allowed'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-200 hover:border-zinc-700 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={disabled}
                          onChange={() => toggleDesired(trait.id)}
                          className="w-4 h-4 accent-cyan-400 rounded shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-semibold truncate">{trait.name}</div>
                          <div className="text-[11px] text-zinc-400 truncate">{sourceText}</div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Mode & Special Cake Controls */}
            <div className="pt-4 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Mode Select */}
              <div className="space-y-2">
                <span className="block text-xs font-semibold text-zinc-300">
                  Target Matching Mode
                </span>
                <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-zinc-950 border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setMode('extras-allowed')}
                    className={`min-h-[40px] px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      mode === 'extras-allowed'
                        ? 'bg-cyan-500 text-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Extras allowed
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('exact-only')}
                    className={`min-h-[40px] px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      mode === 'exact-only'
                        ? 'bg-cyan-500 text-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Exact set only
                  </button>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {mode === 'extras-allowed'
                    ? 'Child carries all desired passives; extra inherited or random passives are fine.'
                    : 'Child carries only the desired passives with zero extra inherited or random passives.'}
                </p>
              </div>

              {/* Special Cake Toggle */}
              <div className="space-y-2">
                <span className="block text-xs font-semibold text-zinc-300">
                  Special Cake
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={specialCake}
                  onClick={() => setSpecialCake(prev => !prev)}
                  className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl border flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    specialCake
                      ? 'bg-amber-500/15 border-amber-500 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-xs font-semibold">
                      {specialCake ? 'Special Cake: On' : 'Special Cake: Off'}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {specialCake
                        ? 'Inherits min(4, P) passives from pool'
                        : 'Standard 40 / 30 / 20 / 10 inherit roll'}
                    </div>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                      specialCake ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {specialCake ? 'ON' : 'OFF'}
                  </span>
                </button>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Other cakes do not alter passive odds (Vegetable Cake gives 2 eggs per cycle; Mushroom / Extravagant Vegetable Cake affect IVs).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Exact Odds Readout & Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6">
            <div className="space-y-1">
              <div className="text-xs font-medium text-zinc-400">
                Per-Egg Success Chance
              </div>
              <div
                data-testid="per-egg-chance"
                className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-cyan-400 tracking-tight"
              >
                {result.percentageFormatted}
              </div>
              <div className="text-xs text-zinc-400 font-mono tabular-nums pt-1">
                Pool P = {uniquePool.length} · Desired D = {activeDesiredIds.length} ·{' '}
                {mode === 'extras-allowed' ? 'Extras allowed' : 'Exact set only'} ·{' '}
                {specialCake ? 'Special Cake ON' : 'Special Cake OFF'}
              </div>
            </div>

            {isExactCakeImpossible && (
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2.5 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  With Special Cake ON, the child always inherits{' '}
                  <strong className="font-mono">min(4, P) = {Math.min(4, uniquePool.length)}</strong>{' '}
                  passives from the pool, which cannot match{' '}
                  <strong className="font-mono">D = {activeDesiredIds.length}</strong> in Exact set only mode.
                </span>
              </div>
            )}

            {/* Expected Eggs & 90% Confidence */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400">Expected Eggs (Avg)</div>
                <div
                  data-testid="expected-eggs"
                  className="text-2xl font-bold font-mono tabular-nums text-white mt-1"
                >
                  {result.expectedEggs !== null ? result.expectedEggs.toLocaleString() : '—'}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">ceil(1 ÷ probability)</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400">Eggs for 90% Chance</div>
                <div
                  data-testid="eggs-90-percent"
                  className="text-2xl font-bold font-mono tabular-nums text-emerald-400 mt-1"
                >
                  {result.eggsFor90Percent !== null ? result.eggsFor90Percent.toLocaleString() : '—'}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  {result.probability >= 1 - 1e-12 ? 'Guaranteed (1 egg)' : 'ceil(ln(0.10) ÷ ln(1 − p))'}
                </div>
              </div>
            </div>

            {/* Per-Roll Math Breakdown */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Inherit-Count Roll Breakdown
              </h3>

              {result.breakdown.length === 0 ? (
                <p className="text-xs text-zinc-400">
                  Tick at least 1 desired passive from the pool to view the exact per-roll probabilities.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono tabular-nums">
                    <thead>
                      <tr className="text-zinc-500 border-b border-zinc-800">
                        <th className="text-left py-2 pr-2 font-medium">Roll k</th>
                        <th className="text-right py-2 px-2 font-medium">Weight</th>
                        <th className="text-right py-2 px-2 font-medium">Drawn m</th>
                        <th className="text-right py-2 px-2 font-medium">Match</th>
                        <th className="text-right py-2 pl-2 font-medium">Contrib.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/70">
                      {result.breakdown.map(row => (
                        <tr key={row.k} className="text-zinc-300">
                          <td className="py-2 pr-2 text-white">
                            {specialCake ? 'Cake (4)' : `k = ${row.k}`}
                          </td>
                          <td className="py-2 px-2 text-right">{(row.rollWeight * 100).toFixed(0)}%</td>
                          <td className="py-2 px-2 text-right">{row.inheritedCount}</td>
                          <td className="py-2 px-2 text-right">
                            {(row.drawMatchProbability * row.randomZeroFactor * 100).toFixed(2)}%
                          </td>
                          <td className="py-2 pl-2 text-right font-semibold text-cyan-400">
                            {(row.contribution * 100).toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Special Cake Recipe Reference */}
            <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs text-zinc-400">
              <div className="font-semibold text-zinc-200">
                Special Cake Recipe · {PALWORLD_SPECIAL_CAKE_RECIPE.station}
              </div>
              <p className="leading-relaxed">
                {PALWORLD_SPECIAL_CAKE_RECIPE.ingredients.map(i => `${i.name} ×${i.count}`).join(' · ')}
              </p>
            </div>
          </div>

          {/* Reference Odds Matrix */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div>
              <h3 className="text-sm font-bold text-white">
                Reference Odds Table (Extras Allowed, No Cake)
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Per-egg chance by total unique pool size P and desired count D.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono tabular-nums">
                <thead>
                  <tr className="text-zinc-500 border-b border-zinc-800">
                    <th className="text-left py-2 pr-2 font-medium">Pool P</th>
                    <th className="text-right py-2 px-2 font-medium">Want 1</th>
                    <th className="text-right py-2 px-2 font-medium">Want 2</th>
                    <th className="text-right py-2 px-2 font-medium">Want 3</th>
                    <th className="text-right py-2 pl-2 font-medium">Want 4</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70">
                  {PALWORLD_INHERITANCE_REFERENCE_TABLE.map(row => (
                    <tr key={row.poolSize} className="text-zinc-300">
                      <td className="py-2 pr-2 font-semibold text-white">Pool {row.poolSize}</td>
                      {row.odds.map((val, idx) => {
                        const desiredCol = idx + 1;
                        const isActiveCell =
                          mode === 'extras-allowed' &&
                          !specialCake &&
                          uniquePool.length === row.poolSize &&
                          activeDesiredIds.length === desiredCol;
                        return (
                          <td
                            key={desiredCol}
                            className={`py-2 px-2 text-right ${
                              isActiveCell
                                ? 'text-cyan-300 font-bold bg-cyan-500/15 rounded'
                                : val === null
                                  ? 'text-zinc-600'
                                  : ''
                            }`}
                          >
                            {val !== null ? `${val.toFixed(2)}%` : '—'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
