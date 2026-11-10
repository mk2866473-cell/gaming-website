/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Calculator, Coins, Zap, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AfkjResourcePlannerTool() {
  const [currentResonance, setCurrentResonance] = useState<number>(180);
  const [targetResonance, setTargetResonance] = useState<number>(240);

  const [hourlyDustRate, setHourlyDustRate] = useState<number>(38); // dust per hour from AFK
  const [dailyInstantAfkCount, setDailyInstantAfkCount] = useState<number>(3); // 3 instant claims daily

  // Calculations
  const calculations = useMemo(() => {
    const levelDiff = Math.max(0, targetResonance - currentResonance);

    // Dust wall costs:
    // Resonance 1-100: ~1,500 dust per 10 levels
    // Resonance 101-200: ~4,500 dust per 10 levels
    // Resonance 201-240: ~12,000 dust per 10 levels
    let totalDustNeeded = 0;
    for (let lvl = currentResonance; lvl < targetResonance; lvl++) {
      if (lvl % 10 === 0) {
        if (lvl <= 100) totalDustNeeded += 1500;
        else if (lvl <= 200) totalDustNeeded += 4500;
        else totalDustNeeded += 12000;
      }
    }

    // Daily Dust generation:
    // (Hourly rate * 24) + (Instant claims * 2 hours AFK yield each) + Daily Quest (200 dust) + Daily Shop (800 dust)
    const base24hDust = hourlyDustRate * 24;
    const instantAfkDust = dailyInstantAfkCount * (hourlyDustRate * 2);
    const dailyShopDust = 800;
    const dailyQuestDust = 200;

    const totalDailyDustIncome = base24hDust + instantAfkDust + dailyShopDust + dailyQuestDust;

    const daysToTarget = totalDailyDustIncome > 0 ? Math.ceil(totalDustNeeded / totalDailyDustIncome) : 0;
    const totalGoldNeeded = levelDiff * 250000;

    return {
      levelDiff,
      totalDustNeeded,
      totalDailyDustIncome,
      daysToTarget,
      totalGoldNeeded: Math.round(totalGoldNeeded)
    };
  }, [currentResonance, targetResonance, hourlyDustRate, dailyInstantAfkCount]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-zinc-900 border border-purple-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Resonance Dust Wall Calculator
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Calculator className="w-6 h-6 text-purple-400" />
              AFK Journey Hero Essence (Dust) Planner
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Calculate Hero Essence (Dust) bottlenecks, daily AFK income, and days required to cross your next Resonance Wall.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Days to Target Level</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                ~{calculations.daysToTarget} Days
              </div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <div className="text-xs text-zinc-400">Total Dust Needed</div>
              <div className="text-2xl font-black text-purple-300 font-mono">
                {calculations.totalDustNeeded.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Resonance Levels */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            1. Resonance Level Target
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Current Resonance Level:</span>
                <span className="font-mono text-amber-300 font-bold">Lv {currentResonance}</span>
              </label>
              <input
                type="range"
                min="1"
                max="300"
                value={currentResonance}
                onChange={e => setCurrentResonance(parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Target Resonance Level:</span>
                <span className="font-mono text-amber-300 font-bold">Lv {targetResonance}</span>
              </label>
              <input
                type="range"
                min="1"
                max="300"
                value={targetResonance}
                onChange={e => setTargetResonance(parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Right: Income Sources */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            2. Daily AFK Income Sources
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>AFK Hourly Dust Yield:</span>
                <span className="font-mono text-amber-300 font-bold">{hourlyDustRate} / hr</span>
              </label>
              <input
                type="number"
                value={hourlyDustRate}
                onChange={e => setHourlyDustRate(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Instant AFK Claims Per Day:</span>
                <span className="font-mono text-amber-300 font-bold">{dailyInstantAfkCount} attempts</span>
              </label>
              <input
                type="range"
                min="0"
                max="6"
                value={dailyInstantAfkCount}
                onChange={e => setDailyInstantAfkCount(parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
