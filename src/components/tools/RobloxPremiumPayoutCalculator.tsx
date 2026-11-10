/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Award, Clock, Users, DollarSign, ShieldCheck, Check, Sparkles, TrendingUp
} from 'lucide-react';
import { ROBLOX_RATES } from '../../data/robloxData';

export default function RobloxPremiumPayoutCalculator() {
  const [monthlyPremiumVisits, setMonthlyPremiumVisits] = useState<number>(25000);
  const [avgPlaytimeMinutes, setAvgPlaytimeMinutes] = useState<number>(24);
  const [payoutRatePerPremiumHour, setPayoutRatePerPremiumHour] = useState<number>(0.22); // ~0.15 to 0.30 Robux per premium player hour

  const stats = useMemo(() => {
    const totalPlaytimeHours = (monthlyPremiumVisits * avgPlaytimeMinutes) / 60;
    const projectedRobux = Math.floor(totalPlaytimeHours * payoutRatePerPremiumHour);
    const devexUsd = (projectedRobux * ROBLOX_RATES.DEVEX_RATE_PER_ROBUX).toFixed(2);
    const annualRobux = projectedRobux * 12;
    const annualDevExUsd = (annualRobux * ROBLOX_RATES.DEVEX_RATE_PER_ROBUX).toFixed(2);

    return {
      totalPlaytimeHours: Math.round(totalPlaytimeHours).toLocaleString(),
      projectedRobux,
      devexUsd,
      annualRobux,
      annualDevExUsd
    };
  }, [monthlyPremiumVisits, avgPlaytimeMinutes, payoutRatePerPremiumHour]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Input Parameters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Premium Player Visits */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            Monthly Premium Visits
          </label>
          <input
            type="number"
            min="100"
            value={monthlyPremiumVisits}
            onChange={(e) => setMonthlyPremiumVisits(Math.max(0, parseInt(e.target.value, 10) || 0))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-lg font-bold font-mono text-white focus:outline-none focus:border-amber-500"
          />
          <span className="text-[10px] text-zinc-500 font-mono">
            ~{Math.round(monthlyPremiumVisits / 30)} premium players / day
          </span>
        </div>

        {/* Avg Session Duration */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
            Avg Session Time (Minutes)
          </label>
          <input
            type="number"
            min="1"
            value={avgPlaytimeMinutes}
            onChange={(e) => setAvgPlaytimeMinutes(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-lg font-bold font-mono text-white focus:outline-none focus:border-cyan-500"
          />
          <span className="text-[10px] text-zinc-500 font-mono">
            Total {stats.totalPlaytimeHours} premium hours
          </span>
        </div>

        {/* Rate per Hour */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            Est. Robux / Premium Hour
          </label>
          <input
            type="number"
            step="0.01"
            min="0.05"
            max="1.0"
            value={payoutRatePerPremiumHour}
            onChange={(e) => setPayoutRatePerPremiumHour(Math.max(0.01, parseFloat(e.target.value) || 0.01))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-lg font-bold font-mono text-white focus:outline-none focus:border-emerald-500"
          />
          <span className="text-[10px] text-zinc-500 font-mono">
            Standard: 0.18–0.25 R$/hour
          </span>
        </div>
      </div>

      {/* Output Projection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-amber-500/50 rounded-xl p-4 text-center shadow-lg shadow-amber-950/30">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Monthly Premium Payout</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 my-1 block">
            {stats.projectedRobux.toLocaleString()} <span className="text-xs font-normal text-zinc-400">R$</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            Engagement-based automated earnings
          </span>
        </div>

        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">DevEx USD Cashout</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            ${stats.devexUsd} <span className="text-xs font-normal text-zinc-400">USD</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            @ $0.0035 / Robux DevEx rate
          </span>
        </div>

        <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-purple-300 block">Annual Projected Payout</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
            ${stats.annualDevExUsd} <span className="text-xs font-normal text-zinc-400">USD/yr</span>
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">
            {stats.annualRobux.toLocaleString()} R$ / year
          </span>
        </div>
      </div>

      {/* Explanation Notice */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-400 flex items-center gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <span>
          Roblox distributes Premium Payouts dynamically based on your game's share of total premium subscriber engagement relative to platform-wide playtime.
        </span>
      </div>
    </div>
  );
}
