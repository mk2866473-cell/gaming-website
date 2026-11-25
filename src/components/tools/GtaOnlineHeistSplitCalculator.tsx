/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Users,
  DollarSign,
  Check,
  ShieldAlert,
  Info,
  RotateCcw,
  Coins
} from 'lucide-react';
import {
  ORIGINAL_HEISTS,
  DOOMSDAY_HEISTS,
  DOOMSDAY_ELITE_BONUS,
  CASINO_VAULT_TARGETS,
  CASINO_GUNMEN,
  CASINO_DRIVERS,
  CASINO_HACKERS,
  CASINO_ELITE_NORMAL,
  CASINO_ELITE_HARD,
  HeistCategoryId,
  HeistDifficulty,
  CasinoVaultTarget,
  calculateHeistSplit
} from '../../data/gtaOnlineData';

function getEqualishCuts(count: number): number[] {
  if (count === 2) return [85, 15];
  if (count === 3) return [70, 15, 15];
  return [40, 20, 20, 20];
}

export default function GtaOnlineHeistSplitCalculator() {
  const [category, setCategory] = useState<HeistCategoryId>('original');
  const [originalHeistId, setOriginalHeistId] = useState<string>('pacific-standard-job');
  const [doomsdayHeistId, setDoomsdayHeistId] = useState<string>('doomsday-act-2');
  const [casinoTargetId, setCasinoTargetId] = useState<CasinoVaultTarget['id']>('gold');
  const [casinoGunmanId, setCasinoGunmanId] = useState<string>('karl-abolaji');
  const [casinoDriverId, setCasinoDriverId] = useState<string>('karim-denz');
  const [casinoHackerId, setCasinoHackerId] = useState<string>('avi-schwartzman');
  const [difficulty, setDifficulty] = useState<HeistDifficulty>('hard');
  const [eliteChallenge, setEliteChallenge] = useState<boolean>(false);

  const [customGross, setCustomGross] = useState<number>(1500000);
  const [customSetupCost, setCustomSetupCost] = useState<number>(25000);
  const [customExtraFeePercent, setCustomExtraFeePercent] = useState<number>(0);

  const [playerCount, setPlayerCount] = useState<number>(4);
  const [cuts, setCuts] = useState<number[]>([40, 20, 20, 20]);

  const effectivePlayerCount = useMemo(() => {
    if (category === 'original') {
      const preset = ORIGINAL_HEISTS.find((h) => h.id === originalHeistId);
      return preset ? preset.exactPlayers : 4;
    }
    return playerCount;
  }, [category, originalHeistId, playerCount]);

  const handleCategoryChange = (cat: HeistCategoryId) => {
    setCategory(cat);
    if (cat === 'original') {
      const preset = ORIGINAL_HEISTS.find((h) => h.id === originalHeistId) || ORIGINAL_HEISTS[4];
      setPlayerCount(preset.exactPlayers);
      setCuts(getEqualishCuts(preset.exactPlayers));
    } else if (cat === 'doomsday' || cat === 'casino') {
      if (difficulty === 'easy') setDifficulty('normal');
      setCuts(getEqualishCuts(playerCount));
    }
  };

  const handleOriginalHeistChange = (id: string) => {
    setOriginalHeistId(id);
    const preset = ORIGINAL_HEISTS.find((h) => h.id === id);
    if (preset) {
      setPlayerCount(preset.exactPlayers);
      setCuts(getEqualishCuts(preset.exactPlayers));
    }
  };

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    setCuts(getEqualishCuts(count));
  };

  const handleCutChange = (idx: number, value: number) => {
    setCuts((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const resetDefaults = () => {
    setCategory('original');
    setOriginalHeistId('pacific-standard-job');
    setDoomsdayHeistId('doomsday-act-2');
    setCasinoTargetId('gold');
    setCasinoGunmanId('karl-abolaji');
    setCasinoDriverId('karim-denz');
    setCasinoHackerId('avi-schwartzman');
    setDifficulty('hard');
    setEliteChallenge(false);
    setCustomGross(1500000);
    setCustomSetupCost(25000);
    setCustomExtraFeePercent(0);
    setPlayerCount(4);
    setCuts([40, 20, 20, 20]);
  };

  const result = useMemo(() => {
    return calculateHeistSplit({
      category,
      originalHeistId,
      doomsdayHeistId,
      casinoTargetId,
      casinoGunmanId,
      casinoDriverId,
      casinoHackerId,
      difficulty,
      eliteChallenge,
      customGross,
      customSetupCost,
      customExtraFeePercent,
      playerCount: effectivePlayerCount,
      cuts
    });
  }, [
    category,
    originalHeistId,
    doomsdayHeistId,
    casinoTargetId,
    casinoGunmanId,
    casinoDriverId,
    casinoHackerId,
    difficulty,
    eliteChallenge,
    customGross,
    customSetupCost,
    customExtraFeePercent,
    effectivePlayerCount,
    cuts
  ]);

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
            <Coins className="w-3.5 h-3.5" />
            <span>GTA Online • Verified Heist Payouts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Heist Split Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Pick an Original, Doomsday, Diamond Casino, or Custom heist to calculate NPC crew deductions, player splits, and host setup costs.
          </p>
        </div>
        <button
          type="button"
          onClick={resetDefaults}
          className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Pacific Standard</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Heist Category */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
              1. Select Heist Type
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'original', label: 'Original' },
                { id: 'doomsday', label: 'Doomsday' },
                { id: 'casino', label: 'Diamond Casino' },
                { id: 'custom', label: 'Custom' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleCategoryChange(tab.id as HeistCategoryId)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    category === tab.id
                      ? 'bg-emerald-600/25 border-emerald-400 text-emerald-300 shadow-md'
                      : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Category-Specific Presets */}
            {category === 'original' && (
              <div className="space-y-3 pt-2 border-t border-indigo-950">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ORIGINAL_HEISTS.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => handleOriginalHeistChange(h.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        originalHeistId === h.id
                          ? 'bg-emerald-600/20 border-emerald-400 text-white'
                          : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{h.name}</div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        Setup ${h.setupCost.toLocaleString()} • {h.exactPlayers} players
                      </div>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(['easy', 'normal', 'hard'] as HeistDifficulty[]).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`py-2 rounded-xl border text-xs font-bold capitalize cursor-pointer ${
                        difficulty === diff
                          ? 'bg-violet-600/25 border-violet-400 text-white'
                          : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {category === 'doomsday' && (
              <div className="space-y-3 pt-2 border-t border-indigo-950">
                <div className="grid grid-cols-1 gap-2">
                  {DOOMSDAY_HEISTS.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setDoomsdayHeistId(h.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        doomsdayHeistId === h.id
                          ? 'bg-emerald-600/20 border-emerald-400 text-white'
                          : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{h.name}</div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Setup ${h.setupCost.toLocaleString()} • 2–4 players
                        </div>
                      </div>
                      <div className="text-xs font-mono text-emerald-400 font-bold shrink-0">
                        ${(difficulty === 'hard' ? h.hard : h.normal).toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {(['normal', 'hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`py-2 rounded-xl border text-xs font-bold capitalize cursor-pointer ${
                        (difficulty === 'easy' ? 'normal' : difficulty) === diff
                          ? 'bg-violet-600/25 border-violet-400 text-white'
                          : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {category === 'casino' && (
              <div className="space-y-4 pt-2 border-t border-indigo-950">
                <div className="grid grid-cols-2 gap-2.5">
                  {CASINO_VAULT_TARGETS.map((target) => {
                    const isHard = difficulty === 'hard';
                    const amount = isHard ? target.hard : target.normal;
                    return (
                      <button
                        key={target.id}
                        type="button"
                        onClick={() => setCasinoTargetId(target.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          casinoTargetId === target.id
                            ? 'bg-emerald-600/20 border-emerald-400 text-white'
                            : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold">{target.name}</span>
                          {target.eventWeeksOnly && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                              event weeks only
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-emerald-400 font-bold mt-1">
                          ${amount.toLocaleString()}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {(['normal', 'hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`py-2 rounded-xl border text-xs font-bold capitalize cursor-pointer ${
                        (difficulty === 'easy' ? 'normal' : difficulty) === diff
                          ? 'bg-violet-600/25 border-violet-400 text-white'
                          : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>

                {/* Support Crew Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">
                      Gunman (% gross)
                    </label>
                    <select
                      value={casinoGunmanId}
                      onChange={(e) => setCasinoGunmanId(e.target.value)}
                      className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      {CASINO_GUNMEN.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name} ({g.cutPercent}%)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">
                      Driver (% gross)
                    </label>
                    <select
                      value={casinoDriverId}
                      onChange={(e) => setCasinoDriverId(e.target.value)}
                      className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      {CASINO_DRIVERS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.cutPercent}%)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">
                      Hacker (% gross)
                    </label>
                    <select
                      value={casinoHackerId}
                      onChange={(e) => setCasinoHackerId(e.target.value)}
                      className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      {CASINO_HACKERS.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.name} ({h.cutPercent}%)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Lester automatically deducts 5% of gross, followed by your chosen Gunman, Driver, and Hacker (each floored to whole dollars).
                </p>
              </div>
            )}

            {category === 'custom' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-indigo-950">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Gross Take ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={customGross}
                    onChange={(e) => setCustomGross(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Setup Cost ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={customSetupCost}
                    onChange={(e) =>
                      setCustomSetupCost(Math.max(0, parseInt(e.target.value, 10) || 0))
                    }
                    className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Extra Fee (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={customExtraFeePercent}
                    onChange={(e) =>
                      setCustomExtraFeePercent(
                        Math.max(0, Math.min(100, parseFloat(e.target.value) || 0))
                      )
                    }
                    className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono text-white font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. Crew Size, Cuts & Elite */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-violet-400" />
                  <span>
                    2. Crew Size {category === 'original' ? '(Locked by Preset)' : '(2–4)'}
                  </span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 3, 4].map((n) => {
                    const isLockedOut = category === 'original' && effectivePlayerCount !== n;
                    return (
                      <button
                        key={n}
                        type="button"
                        disabled={isLockedOut}
                        onClick={() => handlePlayerCountChange(n)}
                        className={`py-2.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                          effectivePlayerCount === n
                            ? 'bg-emerald-600/25 border-emerald-400 text-emerald-300 cursor-pointer'
                            : isLockedOut
                            ? 'bg-[#090d1e] border-indigo-950 text-slate-600 opacity-50 cursor-not-allowed'
                            : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:text-white cursor-pointer'
                        }`}
                      >
                        {n} Players
                      </button>
                    );
                  })}
                </div>
              </div>

              {result.supportsElite && (
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                    3. Elite Challenge
                  </span>
                  <button
                    type="button"
                    onClick={() => setEliteChallenge((prev) => !prev)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      eliteChallenge
                        ? 'bg-emerald-600/20 border-emerald-400 text-white'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">
                        {eliteChallenge ? 'Elite Challenge: ON' : 'Elite Challenge: OFF'}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        +$
                        {(category === 'doomsday'
                          ? DOOMSDAY_ELITE_BONUS
                          : difficulty === 'hard'
                          ? CASINO_ELITE_HARD
                          : CASINO_ELITE_NORMAL
                        ).toLocaleString()}{' '}
                        per player
                      </div>
                    </div>
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        eliteChallenge
                          ? 'bg-emerald-500 border-emerald-400 text-black'
                          : 'bg-[#070b19] border-indigo-900 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Player Cuts */}
            <div className="space-y-2.5 pt-2 border-t border-indigo-950">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
                  Player Cut Percentages
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Multiples of 5, min 15%, total 100%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {Array.from({ length: effectivePlayerCount }, (_, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 block">
                      {idx === 0 ? 'Host %' : `Player ${idx + 1} %`}
                    </label>
                    <input
                      type="number"
                      min={15}
                      max={100}
                      step={5}
                      value={cuts[idx] ?? 0}
                      onChange={(e) => handleCutChange(idx, parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                ))}
              </div>

              {!result.isValidCuts && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-200 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-rose-300">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Invalid Player Cut Split</span>
                  </div>
                  {result.cutErrors.map((err, i) => (
                    <div key={i}>• {err}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-950/80 via-[#070b19] to-indigo-950/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                Net Pool to Split
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1.5">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 self-center shrink-0" />
                <span>{result.netTake.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">{result.heistTitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Gross Take</span>
                <span className="text-white font-bold text-sm">
                  ${result.grossTake.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Total Deductions</span>
                <span className="text-amber-300 font-bold text-sm">
                  -${result.totalDeductions.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Host Setup Cost</span>
                <span className="text-slate-200 font-bold text-sm">
                  -${result.setupCost.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Rounding Remainder</span>
                <span className="text-cyan-300 font-bold text-sm">
                  ${result.unallocatedRemainder.toLocaleString()}
                </span>
              </div>
            </div>

            {result.deductions.length > 0 && (
              <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-1.5 text-[11px] font-mono text-slate-300">
                <span className="text-[10px] uppercase text-slate-400 font-bold block mb-1">
                  Gross Deductions (Floored)
                </span>
                {result.deductions.map((d, i) => (
                  <div key={i} className="flex justify-between text-amber-300">
                    <span>
                      {d.label} ({d.percent}%):
                    </span>
                    <span>-${d.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            {result.isValidCuts ? (
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">
                  Player Take-Home Payouts
                </span>
                {result.playerPayouts.map((p) => (
                  <div
                    key={p.playerIndex}
                    className="bg-[#070b19] border border-indigo-950 rounded-2xl p-3.5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        {p.isHost ? 'Host (Player 1)' : `Player ${p.playerIndex}`} •{' '}
                        <span className="text-cyan-300 font-mono">{p.cutPercent}%</span>
                      </span>
                      <span className="text-sm font-mono font-black text-emerald-400">
                        ${p.finalTakeHome.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 flex flex-wrap gap-x-3 gap-y-0.5">
                      <span>Gross Share: ${p.grossShare.toLocaleString()}</span>
                      {p.setupDeducted > 0 && (
                        <span className="text-amber-300">
                          Setup: -${p.setupDeducted.toLocaleString()}
                        </span>
                      )}
                      {p.eliteBonus > 0 && (
                        <span className="text-cyan-300">
                          Elite: +${p.eliteBonus.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Fix the player cut validation errors to calculate individual splits.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
