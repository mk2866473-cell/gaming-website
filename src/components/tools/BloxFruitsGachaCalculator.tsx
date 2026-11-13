/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Dices, Coins, Clock, Sparkles, Info } from 'lucide-react';

export const GACHA_MIN_LEVEL = 50;
export const GACHA_COOLDOWN_HOURS = 2;

export function calculateGachaRollPrice(level: number, hasPremium: boolean): number {
  const safeLevel = Math.max(1, Math.floor(Number.isFinite(level) ? level : 1));
  const basePrice = 25000 + 150 * (safeLevel - 1);
  return hasPremium ? Math.round(basePrice * 0.8) : basePrice;
}

export function calculateGachaTotalCost(
  level: number,
  hasPremium: boolean,
  rolls: number
) {
  const safeLevel = Math.max(1, Math.floor(Number.isFinite(level) ? level : 1));
  const safeRolls = Math.max(1, Math.floor(Number.isFinite(rolls) ? rolls : 1));
  const standardPerRoll = calculateGachaRollPrice(safeLevel, false);
  const premiumPerRoll = calculateGachaRollPrice(safeLevel, true);
  const effectivePerRoll = hasPremium ? premiumPerRoll : standardPerRoll;
  const totalCost = effectivePerRoll * safeRolls;
  const premiumSavings = (standardPerRoll - premiumPerRoll) * safeRolls;
  const cooldownSpanHours = Math.max(0, safeRolls - 1) * GACHA_COOLDOWN_HOURS;

  return {
    level: safeLevel,
    hasPremium,
    rolls: safeRolls,
    standardPerRoll,
    premiumPerRoll,
    effectivePerRoll,
    totalCost,
    premiumSavings,
    cooldownSpanHours
  };
}

export default function BloxFruitsGachaCalculator() {
  const [playerLevel, setPlayerLevel] = useState<number>(1000);
  const [hasPremium, setHasPremium] = useState<boolean>(false);
  const [rolls, setRolls] = useState<number>(1);

  const result = useMemo(
    () => calculateGachaTotalCost(playerLevel, hasPremium, rolls),
    [playerLevel, hasPremium, rolls]
  );

  const levelPresets = [50, 700, 1000, 1500, 2600];
  const rollPresets = [1, 3, 5, 10];

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Player Level */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="gacha-level-input" className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Player Level
              </label>
              <span className="text-[11px] font-mono text-zinc-400">
                Min level: {GACHA_MIN_LEVEL}
              </span>
            </div>
            <input
              id="gacha-level-input"
              type="number"
              min={1}
              max={2600}
              value={playerLevel}
              onChange={(e) => setPlayerLevel(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-base focus:outline-none focus:border-emerald-500"
            />
            <div className="flex flex-wrap gap-1.5">
              {levelPresets.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setPlayerLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono cursor-pointer transition-colors ${
                    playerLevel === lvl
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  Lvl {lvl.toLocaleString()}
                </button>
              ))}
            </div>
            {playerLevel < GACHA_MIN_LEVEL && (
              <p className="text-[11px] text-amber-400">
                Blox Fruit Gacha (Zioles) requires at least level {GACHA_MIN_LEVEL} to roll in-game.
              </p>
            )}
          </div>

          {/* Rolls & Premium Toggle */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="gacha-rolls-input" className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                How Many Rolls
              </label>
              <span className="text-[11px] font-mono text-zinc-400">
                2-hour cooldown between rolls
              </span>
            </div>
            <input
              id="gacha-rolls-input"
              type="number"
              min={1}
              max={1000}
              value={rolls}
              onChange={(e) => setRolls(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-base focus:outline-none focus:border-cyan-500"
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {rollPresets.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setRolls(count)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono cursor-pointer transition-colors ${
                      rolls === count
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    {count} {count === 1 ? 'Roll' : 'Rolls'}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setHasPremium((v) => !v)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-all ${
                  hasPremium
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Premium / Plus (×0.8): {hasPremium ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Result Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">
              Total Cost ({result.rolls} {result.rolls === 1 ? 'Roll' : 'Rolls'})
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-400 my-1 block">
              ${result.totalCost.toLocaleString()} Beli
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              {hasPremium ? 'Premium ×0.8 rate applied' : 'Standard Beli rate'}
            </span>
          </div>

          <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">
              Cost Per Single Roll
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-cyan-400 my-1 block">
              ${result.effectivePerRoll.toLocaleString()} Beli
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Standard: ${result.standardPerRoll.toLocaleString()} · Premium: ${result.premiumPerRoll.toLocaleString()}
            </span>
          </div>

          <div className="bg-zinc-950 border border-amber-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-400 block">
              Premium Savings / Cooldown
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-400 my-1 block">
              ${result.premiumSavings.toLocaleString()}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Wait across {result.rolls} {result.rolls === 1 ? 'roll' : 'rolls'}: {result.cooldownSpanHours}h (2h each)
            </span>
          </div>
        </div>

        {/* Formula & Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <Coins className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">Zioles Gacha Formula</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed font-mono">
                Price = 25,000 + 150 × (Level − 1) Beli. Premium / Plus pays ×0.8 of standard price.
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">Level &amp; Cooldown Rules</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Minimum level <strong>50</strong> required to buy a random physical fruit from Zioles; <strong>2-hour cooldown</strong> between rolls.
              </p>
            </div>
          </div>
        </div>

        {/* Single Required Disclaimer Line */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-zinc-400 shrink-0" />
          <span>Exact gacha odds are not officially published.</span>
        </div>
      </div>
    </div>
  );
}
