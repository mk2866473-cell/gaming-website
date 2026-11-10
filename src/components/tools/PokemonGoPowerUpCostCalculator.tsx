/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Zap, Shield, Heart, ArrowRight, Layers, Trophy, Check, Table
} from 'lucide-react';
import { POWER_UP_COSTS, calculateTotalPowerUpCost, getPowerUpCostForLevel } from '../../data/pokemonGoData';

export default function PokemonGoPowerUpCostCalculator() {
  const [fromLevel, setFromLevel] = useState<number>(1);
  const [toLevel, setToLevel] = useState<number>(50);
  const [modifier, setModifier] = useState<'normal' | 'lucky' | 'shadow' | 'purified'>('normal');

  const summary = useMemo(() => {
    const isLucky = modifier === 'lucky';
    const isShadow = modifier === 'shadow';
    const isPurified = modifier === 'purified';

    const fullCost = calculateTotalPowerUpCost(fromLevel, toLevel, isLucky, isShadow, isPurified);

    // Generate step breakdown table
    const stepsTable: {
      levelStart: number;
      levelEnd: number;
      stardust: number;
      candy: number;
      xlCandy: number;
    }[] = [];

    for (let lvl = fromLevel; lvl < toLevel; lvl += 0.5) {
      const base = getPowerUpCostForLevel(lvl);
      let dust = base.stardust;
      let cnd = base.candy;
      let xl = base.xlCandy;

      if (isLucky) dust = Math.floor(dust * 0.5);
      if (isShadow) {
        dust = Math.floor(dust * 1.2);
        cnd = Math.floor(cnd * 1.2);
        xl = Math.floor(xl * 1.2);
      }
      if (isPurified) {
        dust = Math.floor(dust * 0.9);
        cnd = Math.floor(cnd * 0.9);
        xl = Math.floor(xl * 0.9);
      }

      stepsTable.push({
        levelStart: lvl,
        levelEnd: lvl + 0.5,
        stardust: dust,
        candy: cnd,
        xlCandy: xl
      });
    }

    return {
      fullCost,
      stepsTable
    };
  }, [fromLevel, toLevel, modifier]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-teal-950/40 border border-emerald-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-2">
              <Zap className="w-3.5 h-3.5" />
              Comprehensive Power-Up Cost Matrix
            </div>
            <h2 className="text-xl font-bold text-white">Pokémon GO Power-Up Cost & Milestones Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Exact Stardust, Candy, and XL Candy step-by-step breakdown across Lucky, Shadow, and Purified tiers.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              1. Level Interval & Variant
            </h3>

            {/* Modifier selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Classification Modifier
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'normal', name: 'Regular (100%)' },
                  { id: 'lucky', name: 'Lucky (50% Stardust)' },
                  { id: 'shadow', name: 'Shadow (+20% Cost)' },
                  { id: 'purified', name: 'Purified (10% Discount)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setModifier(item.id as any)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                      modifier === item.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-white'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Milestones presets */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Quick Milestone Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Raid Lvl 20 → 40', from: 20, to: 40 },
                  { name: 'Raid Lvl 20 → 50', from: 20, to: 50 },
                  { name: 'Boosted Lvl 25 → 40', from: 25, to: 40 },
                  { name: 'Boosted Lvl 25 → 50', from: 25, to: 50 },
                  { name: 'Wild Lvl 35 → 50', from: 35, to: 50 },
                  { name: 'Lvl 40 → 50 (XL Only)', from: 40, to: 50 }
                ].map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setFromLevel(preset.from);
                      setToLevel(preset.to);
                    }}
                    className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-emerald-500 text-xs text-zinc-300 transition-all text-left"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-300">From Level</span>
                  <span className="text-xs font-bold font-mono text-emerald-400">Lvl {fromLevel}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="49.5"
                  step="0.5"
                  value={fromLevel}
                  onChange={e => {
                    const val = parseFloat(e.target.value);
                    setFromLevel(val);
                    if (val >= toLevel) setToLevel(val + 0.5);
                  }}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-300">To Level</span>
                  <span className="text-xs font-bold font-mono text-teal-400">Lvl {toLevel}</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="50"
                  step="0.5"
                  value={toLevel}
                  onChange={e => {
                    const val = parseFloat(e.target.value);
                    setToLevel(val);
                    if (val <= fromLevel) setFromLevel(val - 0.5);
                  }}
                  className="w-full accent-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary & Step Matrix */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Investment Total
            </h3>

            {/* Main Cards */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">Total Stardust</div>
                <div className="text-xl font-black text-amber-400 font-mono mt-1">
                  {summary.fullCost.stardust.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">Regular Candy</div>
                <div className="text-xl font-black text-blue-400 font-mono mt-1">
                  {summary.fullCost.candy}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">Candy XL</div>
                <div className="text-xl font-black text-purple-400 font-mono mt-1">
                  {summary.fullCost.xlCandy}
                </div>
              </div>
            </div>

            {/* Scrollable Step Table */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Step-by-Step Power-Up Ledger</span>
                <span className="text-xs text-zinc-500">{summary.stepsTable.length} power-ups</span>
              </div>

              <div className="max-h-72 overflow-y-auto border border-zinc-800 rounded-xl bg-zinc-950">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900/90 text-zinc-400 uppercase text-[10px] sticky top-0">
                    <tr>
                      <th className="p-2.5">Level Step</th>
                      <th className="p-2.5 text-right">Stardust</th>
                      <th className="p-2.5 text-right">Candy</th>
                      <th className="p-2.5 text-right">Candy XL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 font-mono">
                    {summary.stepsTable.map((step, idx) => (
                      <tr key={idx} className="hover:bg-zinc-900/40">
                        <td className="p-2.5 text-white font-sans font-medium">
                          {step.levelStart} → {step.levelEnd}
                        </td>
                        <td className="p-2.5 text-right text-amber-400">{step.stardust.toLocaleString()}</td>
                        <td className="p-2.5 text-right text-zinc-300">{step.candy > 0 ? step.candy : '—'}</td>
                        <td className="p-2.5 text-right text-purple-400">{step.xlCandy > 0 ? step.xlCandy : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
