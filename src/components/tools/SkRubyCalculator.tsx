/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Coins, TrendingUp, Calendar, Zap, Shield, Target, Award } from 'lucide-react';

const ARENA_TIERS = [
  { name: 'Grand Master', rubies: 1200 },
  { name: 'Master', rubies: 900 },
  { name: 'Diamond I-III', rubies: 700 },
  { name: 'Platinum I-III', rubies: 500 },
  { name: 'Gold I-III', rubies: 350 },
  { name: 'Silver / Bronze', rubies: 200 }
];

export default function SkRubyCalculator() {
  const [currentRubies, setCurrentRubies] = useState<number>(3400);
  const [arenaTierIndex, setArenaTierIndex] = useState<number>(1); // Master
  const [guildRaidTier, setGuildRaidTier] = useState<number>(400); // weekly rubies
  const [dailyKeyRefills, setDailyKeyRefills] = useState<number>(2); // 60 rubies each
  const [targetPulls, setTargetPulls] = useState<number>(80); // Pity goal
  const [targetDays, setTargetDays] = useState<number>(30); // 1 month timeline
  const [hasMonthlyPass, setHasMonthlyPass] = useState<boolean>(true); // 100/day

  const selectedTier = ARENA_TIERS[arenaTierIndex];

  const calculations = useMemo(() => {
    // In Seven Knights Re:BIRTH:
    // Daily missions: 60 rubies / day
    // Weekly missions: 300 rubies / week
    // Monthly Pass: 100 rubies / day (if enabled)
    // Daily key refill cost: 60 rubies * dailyKeyRefills

    const dailyBase = 60;
    const dailyPass = hasMonthlyPass ? 100 : 0;
    const dailyRefillsCost = dailyKeyRefills * 60;
    const netDaily = dailyBase + dailyPass - dailyRefillsCost;

    const weeklyArena = selectedTier.rubies;
    const weeklyGuild = guildRaidTier;
    const weeklyMissions = 300;
    const totalWeekly = weeklyArena + weeklyGuild + weeklyMissions;

    // Projected over targetDays
    const weeks = targetDays / 7;
    const projectedDaily = netDaily * targetDays;
    const projectedWeekly = totalWeekly * weeks;
    const totalAccumulated = Math.max(0, Math.floor(currentRubies + projectedDaily + projectedWeekly));

    // Pull cost: 100 rubies per summon (1,000 rubies per 10-pull)
    const pullsAvailableNow = Math.floor(currentRubies / 100);
    const totalPullsProjected = Math.floor(totalAccumulated / 100);
    const rubiesNeededForGoal = targetPulls * 100;
    const rubiesDeficit = Math.max(0, rubiesNeededForGoal - currentRubies);

    // Days required to reach targetPulls from currentRubies
    const dailyEquivalentIncome = netDaily + (totalWeekly / 7);
    const daysToGoal = dailyEquivalentIncome > 0
      ? Math.ceil(rubiesDeficit / dailyEquivalentIncome)
      : 999;

    return {
      dailyBase,
      dailyPass,
      dailyRefillsCost,
      netDaily,
      totalWeekly,
      totalAccumulated,
      pullsAvailableNow,
      totalPullsProjected,
      rubiesNeededForGoal,
      rubiesDeficit,
      daysToGoal: Math.max(0, daysToGoal),
      dailyEquivalentIncome: Math.round(dailyEquivalentIncome)
    };
  }, [currentRubies, selectedTier, guildRaidTier, dailyKeyRefills, targetPulls, targetDays, hasMonthlyPass]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-blue-900/20 to-zinc-900 border border-blue-500/30 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <Coins className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Seven Knights Re:BIRTH Economy
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-zinc-400">Pity Budget Planner</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Ruby Income & Banner Budget Calculator</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Forecast weekly Arena payouts, daily missions, key stamina expenses, and calculate exact days to your next guarantee banner.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 px-4 py-3 rounded-xl border border-zinc-800">
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Pulls in {targetDays} Days</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {calculations.totalPullsProjected} Summons
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Income & Expense Inputs */}
        <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Resource Configuration</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                Current Rubies in Inventory
              </label>
              <input
                type="number"
                value={currentRubies}
                onChange={e => setCurrentRubies(Math.max(0, Number(e.target.value)))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                Arena Weekly Rank Tier
              </label>
              <select
                value={arenaTierIndex}
                onChange={e => setArenaTierIndex(Number(e.target.value))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white text-xs cursor-pointer"
              >
                {ARENA_TIERS.map((tier, idx) => (
                  <option key={tier.name} value={idx}>
                    {tier.name} (+{tier.rubies} Rubies/wk)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                Guild Raid Weekly Share
              </label>
              <select
                value={guildRaidTier}
                onChange={e => setGuildRaidTier(Number(e.target.value))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white text-xs cursor-pointer"
              >
                <option value={600}>Top 1% Guild (+600 Rubies/wk)</option>
                <option value={400}>Top 5% Guild (+400 Rubies/wk)</option>
                <option value={250}>Top 20% Guild (+250 Rubies/wk)</option>
                <option value={100}>Casual Guild (+100 Rubies/wk)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                Daily Adventure Key Refills
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={dailyKeyRefills}
                onChange={e => setDailyKeyRefills(Math.max(0, Number(e.target.value)))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                Costs {dailyKeyRefills * 60} Rubies/day (60 per 50 Keys)
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-zinc-300 font-medium flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasMonthlyPass}
                  onChange={e => setHasMonthlyPass(e.target.checked)}
                  className="rounded accent-blue-500"
                />
                <span>Active 30-Day Ruby Supply Pass (+100 Rubies/day)</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                  Banner Pity Target
                </label>
                <input
                  type="number"
                  value={targetPulls}
                  onChange={e => setTargetPulls(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
                />
                <span className="text-[10px] text-zinc-500">80 = Standard Pity, 100 = Limited Pity</span>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                  Planning Window (Days)
                </label>
                <input
                  type="number"
                  value={targetDays}
                  onChange={e => setTargetDays(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Projections & Summary */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>Net Income Projection</span>
            </h4>

            <div className="space-y-3">
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex justify-between items-center">
                <span className="text-xs text-zinc-400">Net Daily Earnings</span>
                <span className="font-mono text-sm font-bold text-white">
                  {calculations.netDaily >= 0 ? `+${calculations.netDaily}` : calculations.netDaily} Rubies/day
                </span>
              </div>

              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex justify-between items-center">
                <span className="text-xs text-zinc-400">Weekly Fixed Rewards</span>
                <span className="font-mono text-sm font-bold text-blue-400">
                  +{calculations.totalWeekly} Rubies/week
                </span>
              </div>

              <div className="p-3 bg-blue-950/20 border border-blue-500/30 rounded-lg flex justify-between items-center">
                <span className="text-xs text-blue-300 font-medium">Projected Balance in {targetDays} Days</span>
                <span className="font-mono text-lg font-black text-amber-400">
                  {calculations.totalAccumulated.toLocaleString()} Rubies
                </span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Banner Pity Feasibility</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Days to reach {targetPulls} Summons:</span>
              <span className="font-mono font-bold text-white text-sm">
                {calculations.daysToGoal === 0 ? 'GOAL MET NOW!' : `${calculations.daysToGoal} Days`}
              </span>
            </div>

            <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${Math.min(100, (currentRubies / (targetPulls * 100)) * 100)}%` }}
              />
            </div>

            <div className="text-[11px] text-zinc-400 leading-relaxed pt-2 border-t border-zinc-800/80">
              <strong>Recommendation:</strong> With ~{calculations.dailyEquivalentIncome} average rubies daily, maintain Master arena tier to secure at least one guaranteed hero pull every 20–25 days without microtransactions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
