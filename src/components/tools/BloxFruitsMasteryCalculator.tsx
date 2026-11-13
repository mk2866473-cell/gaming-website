/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Zap, Target, Sparkles, AlertTriangle, Swords, Info, Award
} from 'lucide-react';

export const MAX_MASTERY_LEVEL = 600;
export const FISHING_ROD_MAX_MASTERY = 100;

export interface MasteryFarmingSource {
  id: string;
  name: string;
  xpPerKill: number | null;
  note: string;
}

export const MASTERY_FARMING_SOURCES: MasteryFarmingSource[] = [
  {
    id: 'cake-queen',
    name: 'Cake Queen (~2,200,000 XP / kill — Highest)',
    xpPerKill: 2200000,
    note: 'Highest mastery XP boss kill (~2,200,000 base mastery XP)'
  },
  {
    id: 'cocoa-warriors',
    name: 'Cocoa Warriors / Chocolate Bar Battlers (~100,000 XP / kill)',
    xpPerKill: 100000,
    note: 'High-efficiency mob farm (~100,000 base mastery XP per kill)'
  },
  {
    id: 'custom',
    name: 'Custom XP per Kill (Enter Manually)',
    xpPerKill: null,
    note: 'Enter your own average mastery XP per kill below (leave blank to hide kill estimate)'
  }
];

/**
 * XP required to advance from mastery level L to L + 1:
 * ceil(L^2.26 + 69)
 * Cumulative XP from currentLevel to targetLevel sums L = currentLevel .. targetLevel - 1.
 * Verified benchmark: 300 -> 400 = 56,551,080.
 */
export function calculateMasteryXpNeeded(currentLevel: number, targetLevel: number): number {
  const cur = Math.max(0, Math.min(MAX_MASTERY_LEVEL - 1, Math.floor(currentLevel)));
  const tgt = Math.max(cur, Math.min(MAX_MASTERY_LEVEL, Math.floor(targetLevel)));
  let total = 0;
  for (let L = cur; L < tgt; L++) {
    total += Math.ceil(Math.pow(L, 2.26) + 69);
  }
  return total;
}

export default function BloxFruitsMasteryCalculator() {
  const [currentMastery, setCurrentMastery] = useState<number>(300);
  const [targetMastery, setTargetMastery] = useState<number>(400);
  const [has2xMastery, setHas2xMastery] = useState<boolean>(false);
  const [selectedSourceId, setSelectedSourceId] = useState<string>('cake-queen');
  const [xpPerKillInput, setXpPerKillInput] = useState<string>('2200000');

  const handleSourceChange = (sourceId: string) => {
    setSelectedSourceId(sourceId);
    const matched = MASTERY_FARMING_SOURCES.find((s) => s.id === sourceId);
    if (matched && matched.xpPerKill !== null) {
      setXpPerKillInput(String(matched.xpPerKill));
    }
  };

  const handleXpPerKillChange = (value: string) => {
    setXpPerKillInput(value);
    const num = Number(value);
    if (num === 2200000) {
      setSelectedSourceId('cake-queen');
    } else if (num === 100000) {
      setSelectedSourceId('cocoa-warriors');
    } else {
      setSelectedSourceId('custom');
    }
  };

  const result = useMemo(() => {
    const cur = Math.max(0, Math.min(599, isNaN(currentMastery) ? 0 : Math.floor(currentMastery)));
    const tgt = Math.max(1, Math.min(600, isNaN(targetMastery) ? 1 : Math.floor(targetMastery)));
    const validTarget = Math.max(cur, tgt);

    const xpNeeded = calculateMasteryXpNeeded(cur, validTarget);
    const levelsToGain = Math.max(0, validTarget - cur);

    const parsedXpPerKill = parseFloat(xpPerKillInput);
    const hasValidXpPerKill = !isNaN(parsedXpPerKill) && parsedXpPerKill > 0;
    const effectiveXpPerKill = hasValidXpPerKill
      ? parsedXpPerKill * (has2xMastery ? 2 : 1)
      : 0;
    const estimatedKills =
      hasValidXpPerKill && xpNeeded > 0
        ? Math.ceil(xpNeeded / effectiveXpPerKill)
        : hasValidXpPerKill
        ? 0
        : null;

    const total0to600 = calculateMasteryXpNeeded(0, 600);
    const percentOfMax = Math.min(100, (xpNeeded / total0to600) * 100);

    return {
      cur,
      validTarget,
      levelsToGain,
      xpNeeded,
      hasValidXpPerKill,
      effectiveXpPerKill,
      estimatedKills,
      percentOfMax,
      isRangeInvalid: tgt <= cur
    };
  }, [currentMastery, targetMastery, has2xMastery, xpPerKillInput]);

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Quick Presets */}
        <div className="flex flex-wrap gap-2 items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
          <span className="font-semibold text-zinc-400">Quick Mastery Goals:</span>
          {[
            { label: '300 → 400 (Phoenix Raid Req)', c: 300, t: 400 },
            { label: '0 → 300 (Unlock All Moves)', c: 0, t: 300 },
            { label: '0 → 500 (Lightning Admin Req)', c: 0, t: 500 },
            { label: '0 → 600 (Max Mastery)', c: 0, t: 600 }
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setCurrentMastery(preset.c);
                setTargetMastery(preset.t);
              }}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-[11px] transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Mastery Level Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center gap-2">
              <label htmlFor="bf-cur-mastery" className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Current Mastery (0–599)
              </label>
              <input
                id="bf-cur-mastery"
                type="number"
                min={0}
                max={599}
                value={currentMastery}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setCurrentMastery(isNaN(val) ? 0 : Math.max(0, Math.min(599, val)));
                }}
                className="w-24 bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-right font-mono font-bold text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <input
              type="range"
              min={0}
              max={599}
              value={result.cur}
              onChange={(e) => setCurrentMastery(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center gap-2">
              <label htmlFor="bf-tgt-mastery" className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Target Mastery (1–600)
              </label>
              <input
                id="bf-tgt-mastery"
                type="number"
                min={1}
                max={600}
                value={targetMastery}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setTargetMastery(isNaN(val) ? 1 : Math.max(1, Math.min(600, val)));
                }}
                className="w-24 bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-right font-mono font-bold text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
            <input
              type="range"
              min={1}
              max={600}
              value={Math.max(1, Math.min(600, targetMastery))}
              onChange={(e) => setTargetMastery(parseInt(e.target.value, 10))}
              className="w-full accent-cyan-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* 2x Mastery Gamepass & Farming Source Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <label className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={has2xMastery}
              onChange={(e) => setHas2xMastery(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded accent-emerald-500 bg-zinc-900 border-zinc-700 cursor-pointer"
            />
            <div>
              <span className="text-xs font-bold text-zinc-100 block">
                2x Mastery gamepass
              </span>
              <span className="text-[11px] text-zinc-400 block mt-0.5 leading-relaxed">
                Doubles mastery XP gained per kill (×2.00). Max combined multiplier is ×2.70 with gamepass + party hat + enchant.
              </span>
            </div>
          </label>

          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-2">
            <label htmlFor="bf-farming-source" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
              Farming Source
            </label>
            <select
              id="bf-farming-source"
              value={selectedSourceId}
              onChange={(e) => handleSourceChange(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:border-emerald-500"
            >
              {MASTERY_FARMING_SOURCES.map((source) => (
                <option key={source.id} value={source.id}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="bf-xp-per-kill" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Average Mastery XP per Kill (Optional)
              </label>
              {xpPerKillInput && (
                <button
                  type="button"
                  onClick={() => {
                    setXpPerKillInput('');
                    setSelectedSourceId('custom');
                  }}
                  className="text-[10px] text-zinc-400 hover:text-white underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <input
              id="bf-xp-per-kill"
              type="number"
              min={0}
              placeholder="Optional base XP per kill"
              value={xpPerKillInput}
              onChange={(e) => handleXpPerKillChange(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono font-bold text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Summary Output Cards */}
        <div className={`grid grid-cols-1 ${result.estimatedKills !== null ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-4`}>
          <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400 flex items-center justify-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Mastery XP Still Needed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
              {result.xpNeeded.toLocaleString()}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Mastery {result.cur} → {result.validTarget} (+{result.levelsToGain} levels)
            </span>
          </div>

          {result.estimatedKills !== null && (
            <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center justify-center gap-1">
                <Swords className="w-3.5 h-3.5" /> Estimated Kills Needed
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
                {result.estimatedKills.toLocaleString()} <span className="text-xs font-normal text-zinc-400">kills</span>
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">
                @ {Math.round(result.effectiveXpPerKill).toLocaleString()} XP/kill {has2xMastery ? '(2x Mastery ON)' : '(Base 1x)'}
              </span>
            </div>
          )}

          <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-purple-300 flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5" /> Share of 0 → 600 Max Grind
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
              {result.percentOfMax.toFixed(1)}%
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Full 0 → 600 total ≈ 348.7M XP
            </span>
          </div>
        </div>

        {/* Important Warnings & Verified Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-300 block">
                2x EXP Does NOT Affect Mastery XP
              </span>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                Mastery is a completely separate XP system from player level. Using 2x EXP codes or boosts only speeds up player level quests — only the <strong>2x Mastery gamepass</strong> (and up to <strong>×2.70</strong> max combined with party hat + enchant) increases mastery XP.
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-3">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-zinc-200 block">
                Mastery Caps & Verified Benchmarks
              </span>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Fruits, swords, guns, and fighting styles cap at <strong>600 mastery</strong> (~348.7M cumulative XP from 0 to 600). Fishing rods are capped separately at <strong>100 mastery</strong>. Cake Queen gives the highest kill yield (~2,200,000 mastery XP).
              </p>
            </div>
          </div>
        </div>

        {result.isRangeInvalid && (
          <div className="text-xs text-amber-300 bg-amber-950/40 border border-amber-500/40 rounded-xl px-4 py-2.5 flex items-center gap-2">
            <Target className="w-4 h-4 shrink-0" />
            <span>Target mastery level is at or below current mastery level — 0 additional mastery XP needed.</span>
          </div>
        )}
      </div>
    </div>
  );
}
