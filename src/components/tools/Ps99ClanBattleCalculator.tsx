/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Trophy, Users, Target, Clock, Calculator, Shield, Award, 
  Sparkles, CheckCircle2, AlertTriangle, TrendingUp, ArrowRight,
  Flame, Gem, Zap
} from 'lucide-react';
import { formatGems } from '../../data/ps99Data';

export default function Ps99ClanBattleCalculator() {
  // Clan Battle parameters
  const [targetRank, setTargetRank] = useState<number>(10); // e.g. Top 10
  const [totalClanMembers, setTotalClanMembers] = useState<number>(50);
  const [currentClanPoints, setCurrentClanPoints] = useState<number>(1250000);
  const [targetClanPoints, setTargetClanPoints] = useState<number>(5000000);
  const [daysRemaining, setDaysRemaining] = useState<number>(3);

  // Individual parameters
  const [myActivityHoursPerDay, setMyActivityHoursPerDay] = useState<number>(6);
  const [farmingMethod, setFarmingMethod] = useState<'chest_mimic' | 'last_zone' | 'boss_arena'>('chest_mimic');
  const [hasGamepasses, setHasGamepasses] = useState<boolean>(true);

  // Calculations
  const stats = useMemo(() => {
    const pointsNeeded = Math.max(0, targetClanPoints - currentClanPoints);
    const activeMembers = Math.max(1, totalClanMembers);
    const pointsPerMemberTotal = Math.ceil(pointsNeeded / activeMembers);
    
    const pointsPerDayTotal = daysRemaining > 0 ? pointsNeeded / daysRemaining : pointsNeeded;
    const pointsPerMemberDaily = Math.ceil(pointsPerDayTotal / activeMembers);

    // Hourly point yield based on method
    let pointsPerHour = 15000;
    if (farmingMethod === 'chest_mimic') pointsPerHour = 45000;
    else if (farmingMethod === 'boss_arena') pointsPerHour = 30000;
    else if (farmingMethod === 'last_zone') pointsPerHour = 18000;

    if (hasGamepasses) pointsPerHour *= 1.5;

    const myTotalPointsPossible = pointsPerHour * myActivityHoursPerDay * daysRemaining;
    const mySharePercentage = targetClanPoints > 0 ? (myTotalPointsPossible / targetClanPoints) * 100 : 0;
    const hoursNeededForQuota = pointsPerMemberTotal > 0 ? pointsPerMemberTotal / pointsPerHour : 0;

    return {
      pointsNeeded,
      pointsPerMemberTotal,
      pointsPerMemberDaily,
      pointsPerHour,
      myTotalPointsPossible,
      mySharePercentage,
      hoursNeededForQuota
    };
  }, [targetRank, totalClanMembers, currentClanPoints, targetClanPoints, daysRemaining, myActivityHoursPerDay, farmingMethod, hasGamepasses]);

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/70 p-5 sm:p-6 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>PS99 CLAN BATTLE PLANNER</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-mono">LEADERBOARD OPTIMIZER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Clan Battle Point Contributor Tool
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Calculate exact individual quotas, daily point targets, and grinding hours needed for your clan to secure Top 10, Top 50, or #1 leaderboard rewards.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-4 py-3 rounded-xl shadow-inner">
            <Users className="w-6 h-6 text-sky-400" />
            <div>
              <span className="text-[11px] text-slate-400 block">Target Rank Goal</span>
              <span className="text-lg font-black text-white font-mono">Top {targetRank}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Total Points Needed</span>
            <span className="text-lg font-bold font-mono text-sky-400">{stats.pointsNeeded.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Per Member Quota</span>
            <span className="text-lg font-bold font-mono text-emerald-400">{stats.pointsPerMemberTotal.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Daily Member Target</span>
            <span className="text-lg font-bold font-mono text-amber-400">{stats.pointsPerMemberDaily.toLocaleString()} /day</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Grind Hours Needed</span>
            <span className="text-lg font-bold font-mono text-purple-400">{stats.hoursNeededForQuota.toFixed(1)} hrs total</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-400" />
              <span>Clan Target & Progress</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Target Rank Tier</label>
                <select
                  value={targetRank}
                  onChange={(e) => {
                    const r = parseInt(e.target.value);
                    setTargetRank(r);
                    if (r === 1) setTargetClanPoints(15000000);
                    else if (r === 10) setTargetClanPoints(5000000);
                    else if (r === 50) setTargetClanPoints(2000000);
                    else setTargetClanPoints(800000);
                  }}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-sky-500"
                >
                  <option value={1}>#1 Global Leaderboard</option>
                  <option value={10}>Top 10 Clan Rewards</option>
                  <option value={50}>Top 50 Clan Rewards</option>
                  <option value={100}>Top 100 Clan Rewards</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Active Clan Members</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={totalClanMembers}
                  onChange={(e) => setTotalClanMembers(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Current Clan Points</label>
                <input
                  type="number"
                  step="50000"
                  value={currentClanPoints}
                  onChange={(e) => setCurrentClanPoints(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Target Goal Points</label>
                <input
                  type="number"
                  step="100000"
                  value={targetClanPoints}
                  onChange={(e) => setTargetClanPoints(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Days Remaining in Battle</label>
              <input
                type="number"
                min="1"
                max="14"
                value={daysRemaining}
                onChange={(e) => setDaysRemaining(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Your Grind Efficiency</span>
            </h2>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Primary Farming Method</label>
              <select
                value={farmingMethod}
                onChange={(e) => setFarmingMethod(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-sky-500"
              >
                <option value="chest_mimic">Chest Mimic / Boss Chest Farm (~45k pts/hr)</option>
                <option value="boss_arena">Boss Arena & Mini-Bosses (~30k pts/hr)</option>
                <option value="last_zone">Standard Last Zone Farming (~18k pts/hr)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Your Daily Grinding Hours: {myActivityHoursPerDay} hrs</label>
              <input
                type="range"
                min="1"
                max="24"
                value={myActivityHoursPerDay}
                onChange={(e) => setMyActivityHoursPerDay(parseInt(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="text-sm font-bold text-white">VIP & Super Drops Gamepasses</span>
                <span className="text-xs text-slate-400 block">+50% point drop efficiency bonus</span>
              </div>
              <input
                type="checkbox"
                checked={hasGamepasses}
                onChange={(e) => setHasGamepasses(e.target.checked)}
                className="w-5 h-5 accent-sky-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Output & Member Quota Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-b from-slate-900 to-indigo-950/40 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Squad Quota & Performance Report</span>
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Estimated Hourly Point Rate</span>
                  <span className="text-base font-bold font-mono text-emerald-400">{Math.round(stats.pointsPerHour).toLocaleString()} pts / hr</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Your Projected Contribution</span>
                  <span className="text-base font-bold font-mono text-sky-400">{stats.myTotalPointsPossible.toLocaleString()} pts</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Your Share of Clan Goal ({stats.mySharePercentage.toFixed(1)}%)</span>
                  <span className="font-mono">{stats.myTotalPointsPossible >= stats.pointsPerMemberTotal ? '✅ Quota Met' : '⚠️ Need More Grinding'}</span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (stats.myTotalPointsPossible / stats.pointsPerMemberTotal) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Clan Member Checklist</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Assign at least <strong className="text-white">{stats.pointsPerMemberDaily.toLocaleString()} points</strong> per member every 24 hours.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Total grind time per member: <strong className="text-white">{stats.hoursNeededForQuota.toFixed(1)} hours</strong> across remaining {daysRemaining} days.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Use Chest Mimic and Boss Chest enchants to maximize point drops per minute.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200/90 leading-relaxed">
                <strong className="font-bold text-amber-300">Pro Tip for Clan Leaders: </strong>
                Kick inactive members who contribute less than 10% of the average quota with 24 hours remaining to prevent losing Top 10 leaderboard placement rewards!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
