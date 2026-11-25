/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  DollarSign,
  Users,
  AlertTriangle,
  Check,
  Info,
  RotateCcw,
  ShieldAlert
} from 'lucide-react';
import {
  CAYO_PRIMARY_TARGETS,
  CAYO_SECONDARY_LOOT,
  CAYO_OFFICE_SAFE_MIN,
  CAYO_OFFICE_SAFE_MAX,
  CAYO_OFFICE_SAFE_DEFAULT,
  CAYO_FENCING_FEE_PERCENT,
  CAYO_PAVEL_CUT_PERCENT,
  CAYO_REPEAT_SETUP_FEE,
  CAYO_ELITE_NORMAL,
  CAYO_ELITE_HARD,
  CayoPrimaryTargetId,
  CayoSecondaryLootId,
  calculateCayoPericoPayout
} from '../../data/gtaOnlineData';

function getDefaultCutsForPlayers(count: number): number[] {
  if (count === 1) return [100];
  if (count === 2) return [85, 15];
  if (count === 3) return [70, 15, 15];
  return [55, 15, 15, 15];
}

export default function GtaOnlineCayoPericoPayoutCalculator() {
  const [isFirstRun, setIsFirstRun] = useState<boolean>(false);
  const [primaryTargetId, setPrimaryTargetId] = useState<CayoPrimaryTargetId>('pink-diamond');
  const [hardMode, setHardMode] = useState<boolean>(true);
  const [secondaryStacks, setSecondaryStacks] = useState<Record<CayoSecondaryLootId, number>>({
    cash: 0,
    weed: 0,
    cocaine: 2,
    artwork: 0,
    gold: 0
  });
  const [officeSafeAmount, setOfficeSafeAmount] = useState<number>(CAYO_OFFICE_SAFE_DEFAULT);
  const [eliteChallenge, setEliteChallenge] = useState<boolean>(true);
  const [playerCount, setPlayerCount] = useState<number>(1);
  const [cuts, setCuts] = useState<number[]>([100]);

  const handlePlayerCountChange = (newCount: number) => {
    setPlayerCount(newCount);
    setCuts(getDefaultCutsForPlayers(newCount));
  };

  const handleCutChange = (idx: number, val: number) => {
    setCuts((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const handleStackChange = (id: CayoSecondaryLootId, val: number) => {
    setSecondaryStacks((prev) => ({
      ...prev,
      [id]: Math.max(0, Number.isFinite(val) ? val : 0)
    }));
  };

  const resetDefaults = () => {
    setIsFirstRun(false);
    setPrimaryTargetId('pink-diamond');
    setHardMode(true);
    setSecondaryStacks({ cash: 0, weed: 0, cocaine: 2, artwork: 0, gold: 0 });
    setOfficeSafeAmount(CAYO_OFFICE_SAFE_DEFAULT);
    setEliteChallenge(true);
    setPlayerCount(1);
    setCuts([100]);
  };

  const result = useMemo(() => {
    return calculateCayoPericoPayout({
      isFirstRun,
      primaryTargetId,
      hardMode,
      secondaryStacks,
      officeSafeAmount,
      eliteChallenge,
      playerCount,
      cuts
    });
  }, [
    isFirstRun,
    primaryTargetId,
    hardMode,
    secondaryStacks,
    officeSafeAmount,
    eliteChallenge,
    playerCount,
    cuts
  ]);

  const repeatTargets = CAYO_PRIMARY_TARGETS.filter((t) => !t.firstRunOnly);

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>GTA Online • Title Update 1.73</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Cayo Perico Payout Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate gross take, secondary loot documented averages, bag space, fencing &amp; Pavel fees, Elite bonus, and 1–4 player splits.
          </p>
        </div>
        <button
          type="button"
          onClick={resetDefaults}
          className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Solo Hard</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. First Run Toggle & Difficulty & Primary Target */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
                1. Run Mode &amp; Primary Target
              </span>

              <button
                type="button"
                onClick={() => setIsFirstRun((prev) => !prev)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isFirstRun
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                    isFirstRun
                      ? 'bg-amber-400 border-amber-300 text-black'
                      : 'bg-[#070b19] border-indigo-900 text-transparent'
                  }`}
                >
                  <Check className="w-3 h-3" />
                </span>
                <span>This is my first run</span>
              </button>
            </div>

            {isFirstRun ? (
              <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/40 text-xs space-y-1">
                <div className="font-bold text-amber-300">
                  First Run Mode Active: Madrazo Files ($1,100,000)
                </div>
                <p className="text-slate-300">
                  No Hard mode, no secondary loot bonus, no fencing fee, no Pavel cut, and no $100,000 setup fee.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setHardMode(false)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      !hardMode
                        ? 'bg-emerald-600/25 border-emerald-400 text-emerald-300'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    Normal Mode (1.0×)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHardMode(true)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      hardMode
                        ? 'bg-emerald-600/25 border-emerald-400 text-emerald-300'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    Hard Mode (1.1×)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {repeatTargets.map((target) => {
                    const isSelected = primaryTargetId === target.id;
                    const value =
                      hardMode && target.hardValue !== null
                        ? target.hardValue
                        : target.normalValue;

                    return (
                      <button
                        key={target.id}
                        type="button"
                        onClick={() => setPrimaryTargetId(target.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600/20 border-emerald-400 text-white shadow-md'
                            : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold">{target.name}</span>
                          {target.eventsOnly && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                              events only
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono mt-1">
                          <span className="text-emerald-400 font-bold">
                            ${value.toLocaleString()}
                          </span>
                          <span className="text-slate-400">
                            +{target.secondaryBonusPercent}% sec
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* 2. Secondary Loot & Office Safe */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
                2. Secondary Loot Stacks &amp; Office Safe
              </span>
              <span
                className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${
                  result.bagCapacityExceeded
                    ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                    : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300'
                }`}
              >
                Bag Space: {result.totalBagPercentUsed}% / {result.maxCrewBagPercent}%
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Each secondary stack&apos;s real value varies in a range in-game; this calculator uses the documented average value per full stack.
            </p>

            {result.bagCapacityExceeded && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  Entered secondary stacks require <strong>{result.totalBagPercentUsed}%</strong> bag space, which exceeds your {playerCount}-player crew&apos;s maximum capacity of <strong>{result.maxCrewBagPercent}%</strong> (100% per player).
                </span>
              </div>
            )}

            <div className="space-y-2.5">
              {CAYO_SECONDARY_LOOT.map((loot) => {
                const count = secondaryStacks[loot.id] || 0;
                return (
                  <div
                    key={loot.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#0c122e] border border-indigo-900/60"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white">{loot.name}</div>
                      <div className="text-[11px] font-mono text-slate-400">
                        Avg ${loot.averageValuePerStack.toLocaleString()}/stack • {loot.bagSpacePercent}% bag
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStackChange(loot.id, Math.max(0, count - 1))}
                        className="w-7 h-7 rounded-lg bg-[#070b19] border border-indigo-900 text-slate-300 hover:text-white font-mono font-bold cursor-pointer"
                        aria-label={`Decrease ${loot.name} stacks`}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={count}
                        onChange={(e) => handleStackChange(loot.id, parseFloat(e.target.value) || 0)}
                        className="w-14 bg-[#070b19] border border-indigo-900 rounded-lg px-2 py-1 text-center text-xs font-mono text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
                        aria-label={`${loot.name} stacks`}
                      />
                      <button
                        type="button"
                        onClick={() => handleStackChange(loot.id, count + 1)}
                        className="w-7 h-7 rounded-lg bg-[#070b19] border border-indigo-900 text-slate-300 hover:text-white font-mono font-bold cursor-pointer"
                        aria-label={`Increase ${loot.name} stacks`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Office Safe */}
            <div className="pt-3 border-t border-indigo-950 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="cayo-office-safe"
                  className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider"
                >
                  Office Safe Cash ($0 bag space)
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  Typical range: ${CAYO_OFFICE_SAFE_MIN.toLocaleString()}–$
                  {CAYO_OFFICE_SAFE_MAX.toLocaleString()}
                </span>
              </div>
              <input
                id="cayo-office-safe"
                type="number"
                min="0"
                step="1000"
                value={officeSafeAmount}
                onChange={(e) =>
                  setOfficeSafeAmount(Math.max(0, parseInt(e.target.value, 10) || 0))
                }
                className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3.5 py-2.5 text-sm font-mono text-emerald-300 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* 3. Crew Size, Player Cuts & Elite */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-violet-400" />
                  <span>3. Crew Size (1–4)</span>
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handlePlayerCountChange(n)}
                      className={`py-2.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer ${
                        playerCount === n
                          ? 'bg-emerald-600/25 border-emerald-400 text-emerald-300'
                          : 'bg-[#0c122e] border-indigo-900/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      {n === 1 ? 'Solo' : `${n}P`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                  4. Elite Challenge
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
                      {(result.effectiveHardMode
                        ? CAYO_ELITE_HARD
                        : CAYO_ELITE_NORMAL
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
            </div>

            {/* Player Cuts */}
            <div className="space-y-2.5 pt-2 border-t border-indigo-950">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
                  Player Cut Percentages
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {playerCount === 1 ? 'Solo = 100%' : 'Multiples of 5, min 15%, total 100%'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {Array.from({ length: playerCount }, (_, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 block">
                      {idx === 0 ? 'Host %' : `Player ${idx + 1} %`}
                    </label>
                    <input
                      type="number"
                      min={playerCount === 1 ? 100 : 15}
                      max={100}
                      step={5}
                      disabled={playerCount === 1}
                      value={cuts[idx] ?? 0}
                      onChange={(e) => handleCutChange(idx, parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 font-bold disabled:opacity-60 focus:outline-none focus:border-emerald-500"
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

        {/* Right Results */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-950/80 via-[#070b19] to-indigo-950/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                Net Heist Take (After Fees)
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1.5">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 self-center shrink-0" />
                <span>{result.netTake.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {result.primaryTarget.name} (
                {result.isFirstRun
                  ? 'First Run'
                  : result.effectiveHardMode
                  ? 'Hard'
                  : 'Normal'}
                )
              </p>
            </div>

            {/* Gross / Fees Breakdown */}
            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Gross Take</span>
                <span className="text-white font-bold text-sm">
                  ${result.grossTake.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">
                  Total Fees ({result.isFirstRun ? '0%' : '12%'})
                </span>
                <span className="text-amber-300 font-bold text-sm">
                  -${result.totalFees.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">
                  Secondary (+{result.secondaryBonusPercent}%)
                </span>
                <span className="text-cyan-300 font-bold text-sm">
                  ${result.secondaryTotalWithBonus.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#070b19]/80 border border-emerald-950 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Host Setup Fee</span>
                <span className="text-slate-200 font-bold text-sm">
                  -${result.setupFee.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Itemized Gross & Fees */}
            <div className="bg-[#070b19] border border-indigo-950/80 p-4 rounded-2xl space-y-1.5 text-[11px] font-mono text-slate-300">
              <div className="flex justify-between">
                <span>Primary ({result.primaryTarget.name}):</span>
                <span className="text-white font-bold">${result.primaryValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Secondary Base:</span>
                <span className="text-white">${result.secondaryBaseTotal.toLocaleString()}</span>
              </div>
              {result.secondaryBonusPercent > 0 && (
                <div className="flex justify-between text-emerald-300">
                  <span>Repeat Bonus (+{result.secondaryBonusPercent}%):</span>
                  <span>+${result.secondaryBonusAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Office Safe:</span>
                <span className="text-white">${result.officeSafeAmount.toLocaleString()}</span>
              </div>
              <div className="border-t border-indigo-950 my-1.5 pt-1.5 flex justify-between text-amber-300">
                <span>Fencing Fee ({result.isFirstRun ? 0 : CAYO_FENCING_FEE_PERCENT}%):</span>
                <span>-${result.fencingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-amber-300">
                <span>Pavel&apos;s Cut ({result.isFirstRun ? 0 : CAYO_PAVEL_CUT_PERCENT}%):</span>
                <span>-${result.pavelCut.toLocaleString()}</span>
              </div>
            </div>

            {/* Player Payout Cards */}
            {result.isValidCuts ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase text-slate-400">
                  <span>Player Payouts</span>
                  {result.unallocatedRemainder > 0 && (
                    <span className="text-amber-300">
                      Remainder: ${result.unallocatedRemainder}
                    </span>
                  )}
                </div>

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
                        ${p.finalProfitAfterSetup.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 flex flex-wrap gap-x-3 gap-y-0.5">
                      <span>Share: ${p.shareBeforeElite.toLocaleString()}</span>
                      {p.eliteBonus > 0 && (
                        <span className="text-cyan-300">
                          w/ Elite: ${p.payoutWithElite.toLocaleString()}
                        </span>
                      )}
                      {p.setupFeeDeducted > 0 && (
                        <span className="text-amber-300">
                          Setup: -${p.setupFeeDeducted.toLocaleString()}
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

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Title Update 1.73: Repeat runs deduct a ${CAYO_REPEAT_SETUP_FEE.toLocaleString()} host setup fee from the host&apos;s final payout only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
