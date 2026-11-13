/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Zap, Timer, Target, ShieldAlert, Users, Coins, Trophy
} from 'lucide-react';

export const RAID_FIXED_OUTCOMES = [
  { outcome: 'Fail Raid', fragments: '300 fragments', note: 'Fixed payout on failed raid completion' },
  { outcome: 'Timeout (Per Island)', fragments: '90 fragments per island completed', note: 'Awarded based on islands cleared before time expires' },
  { outcome: 'Idle on Island 1 Until Timeout', fragments: '90 fragments', note: 'Idling on Island 1 until timer runs out' },
  { outcome: 'Death During Raid', fragments: '0 fragments', note: 'No fragments awarded upon dying in the raid' }
];

/**
 * Fragments earned on raid completion:
 * 300 + 4.5 * secondsRemaining, capped at 1,000.
 * Verified self-tests:
 * - 100s -> 750 fragments
 * - 200s -> 1,000 fragments (capped)
 */
export function calculateRaidFragments(secondsRemaining: number): number {
  const cleanSeconds = Math.max(0, isNaN(secondsRemaining) ? 0 : secondsRemaining);
  return Math.min(1000, Math.floor(300 + 4.5 * cleanSeconds));
}

/**
 * Farming mode raids needed:
 * ceil(targetFragments / fragmentsPerRaid)
 * Verified self-test:
 * - 14,500 target @ 750/raid (100s) -> 20 raids
 */
export function calculateRaidsNeeded(
  targetFragments: number,
  secondsRemaining: number
): { fragmentsPerRaid: number; raidsNeeded: number } {
  const fragmentsPerRaid = calculateRaidFragments(secondsRemaining);
  const cleanTarget = Math.max(0, isNaN(targetFragments) ? 0 : targetFragments);
  const raidsNeeded = cleanTarget > 0 ? Math.ceil(cleanTarget / fragmentsPerRaid) : 0;
  return { fragmentsPerRaid, raidsNeeded };
}

export default function BloxFruitsRaidCalculator() {
  const [mode, setMode] = useState<'rewards' | 'farming'>('rewards');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(100);

  const [targetFragments, setTargetFragments] = useState<number>(14500);
  const [avgSecondsRemaining, setAvgSecondsRemaining] = useState<number>(100);

  const rewardsStats = useMemo(() => {
    const fragmentsEarned = calculateRaidFragments(secondsRemaining);
    const isCapped = 300 + 4.5 * Math.max(0, secondsRemaining) >= 1000;
    return { fragmentsEarned, isCapped };
  }, [secondsRemaining]);

  const farmingStats = useMemo(() => {
    const { fragmentsPerRaid, raidsNeeded } = calculateRaidsNeeded(
      targetFragments,
      avgSecondsRemaining
    );
    const totalFragmentsEarned = raidsNeeded * fragmentsPerRaid;
    const minBeliDrops = raidsNeeded * 62000;
    const maxBeliDrops = raidsNeeded * 72000;
    return {
      fragmentsPerRaid,
      raidsNeeded,
      totalFragmentsEarned,
      minBeliDrops,
      maxBeliDrops
    };
  }, [targetFragments, avgSecondsRemaining]);

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Two Modes Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
          <button
            type="button"
            onClick={() => setMode('rewards')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'rewards'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>(a) Rewards Mode</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('farming')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'farming'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>(b) Farming Mode</span>
          </button>
        </div>

        {mode === 'rewards' ? (
          <div className="space-y-6">
            {/* Seconds Remaining Input */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label htmlFor="raid-seconds-input" className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Seconds Remaining When Raid Finishes
                </label>
                <input
                  id="raid-seconds-input"
                  type="number"
                  min={0}
                  max={720}
                  value={secondsRemaining}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setSecondsRemaining(isNaN(val) ? 0 : Math.max(0, Math.min(720, val)));
                  }}
                  className="w-28 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-right font-mono font-bold text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <input
                type="range"
                min={0}
                max={400}
                value={Math.min(400, Math.max(0, secondsRemaining))}
                onChange={(e) => setSecondsRemaining(parseInt(e.target.value, 10))}
                className="w-full accent-purple-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
              />

              <div className="flex flex-wrap gap-2 text-[11px]">
                {[
                  { label: '0s left (300 f)', s: 0 },
                  { label: '100s left (750 f)', s: 100 },
                  { label: '156s left (1,000 f cap)', s: 156 },
                  { label: '200s left (1,000 f cap)', s: 200 }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setSecondsRemaining(preset.s)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Output Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-purple-300 flex items-center justify-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Fragments Earned
                </span>
                <span className="text-3xl font-extrabold font-mono text-purple-300 my-1 block">
                  {rewardsStats.fragmentsEarned.toLocaleString()} <span className="text-xs font-normal text-zinc-400">fragments</span>
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  min(1,000, 300 + 4.5 × {secondsRemaining}s){rewardsStats.isCapped ? ' — Max 1,000 cap (156+ sec)' : ''}
                </span>
              </div>

              <div className="bg-zinc-950 border border-amber-500/40 rounded-xl p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center justify-center gap-1">
                  <Coins className="w-3.5 h-3.5" /> Enemy Drop Beli (Per Raid)
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-300 my-1 block">
                  ~$62,000–$72,000
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  Comes only from enemy drops depending on theme
                </span>
              </div>
            </div>

            {/* Fixed Outcomes Table */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Fixed Raid Outcomes (Non-Victory / Partial Runs)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {RAID_FIXED_OUTCOMES.map((row) => (
                  <div key={row.outcome} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-white block">{row.outcome}</span>
                      <span className="text-[10px] text-zinc-400">{row.note}</span>
                    </div>
                    <span className="font-mono font-extrabold text-cyan-300 text-right shrink-0">
                      {row.fragments}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Farming Target & Average Speed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
                <label htmlFor="raid-target-fragments" className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  Fragment Target
                </label>
                <input
                  id="raid-target-fragments"
                  type="number"
                  min={0}
                  value={targetFragments}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setTargetFragments(isNaN(val) ? 0 : Math.max(0, val));
                  }}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xl font-extrabold font-mono text-white focus:outline-none focus:border-cyan-500"
                />
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {[
                    { label: '14,500 (Standard Fruit)', val: 14500 },
                    { label: '17,000 (Quake)', val: 17000 },
                    { label: '18,500 (Dough/Phoenix)', val: 18500 },
                    { label: '26,750 (Race V4)', val: 26750 },
                    { label: '172,800 (All 11 Fruits)', val: 172800 }
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setTargetFragments(p.val)}
                      className="px-2 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor="raid-avg-seconds" className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    Avg. Seconds Remaining Per Raid
                  </label>
                  <input
                    id="raid-avg-seconds"
                    type="number"
                    min={0}
                    max={720}
                    value={avgSecondsRemaining}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setAvgSecondsRemaining(isNaN(val) ? 0 : Math.max(0, Math.min(720, val)));
                    }}
                    className="w-24 bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-right font-mono font-bold text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={300}
                  value={Math.min(300, Math.max(0, avgSecondsRemaining))}
                  onChange={(e) => setAvgSecondsRemaining(parseInt(e.target.value, 10))}
                  className="w-full accent-purple-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
                />
                <div className="text-[11px] font-mono text-zinc-400">
                  Average payout: <strong className="text-purple-300">{farmingStats.fragmentsPerRaid.toLocaleString()} fragments / raid</strong>
                </div>
              </div>
            </div>

            {/* Farming Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center justify-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> Raids Needed
                </span>
                <span className="text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
                  {farmingStats.raidsNeeded.toLocaleString()} <span className="text-xs font-normal text-zinc-400">raids</span>
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  ceil({targetFragments.toLocaleString()} ÷ {farmingStats.fragmentsPerRaid.toLocaleString()})
                </span>
              </div>

              <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-purple-300 block">
                  Total Fragments Earned
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
                  {farmingStats.totalFragmentsEarned.toLocaleString()}
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {farmingStats.fragmentsPerRaid.toLocaleString()} fragments per clear
                </span>
              </div>

              <div className="bg-zinc-950 border border-amber-500/40 rounded-xl p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-400 block">
                  Est. Enemy Drop Beli
                </span>
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-amber-300 my-1 block">
                  ${(farmingStats.minBeliDrops / 1000).toLocaleString()}k–${(farmingStats.maxBeliDrops / 1000).toLocaleString()}k
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  ~$62,000–$72,000 Beli / raid
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Microchip Entry & Squad Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">Microchip Raid Entry Costs</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                • <strong>Basic Microchip:</strong> $100,000 Beli OR any physical fruit.<br />
                • <strong>Advanced Microchip (Phoenix/Dough):</strong> 1,000 fragments OR a physical fruit worth $1,000,000+.
              </p>
            </div>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <Users className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">Squad Limit &amp; Full Payout Threshold</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                • <strong>Max 4 players</strong> per raid.<br />
                • Earning the capped <strong>1,000 fragments</strong> requires finishing with about <strong>156+ seconds</strong> remaining.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
