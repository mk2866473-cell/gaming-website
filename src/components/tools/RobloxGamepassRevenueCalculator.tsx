/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, DollarSign, Users, ShoppingCart, ShieldCheck, Check, Sparkles
} from 'lucide-react';
import { ROBLOX_RATES } from '../../data/robloxData';

export default function RobloxGamepassRevenueCalculator() {
  const [gamepassPrice, setGamepassPrice] = useState<number>(450);
  const [monthlySales, setMonthlySales] = useState<number>(1000);
  const [dailyVisits, setDailyVisits] = useState<number>(50000);

  const stats = useMemo(() => {
    const grossRobux = gamepassPrice * monthlySales;
    const netRobux = Math.floor(grossRobux * ROBLOX_RATES.CREATOR_CUT);
    const robloxTaxRobux = grossRobux - netRobux;
    const grossDevExUsd = (netRobux * ROBLOX_RATES.DEVEX_RATE_PER_ROBUX).toFixed(2);
    const annualNetRobux = netRobux * 12;
    const annualDevExUsd = (annualNetRobux * ROBLOX_RATES.DEVEX_RATE_PER_ROBUX).toFixed(2);

    // Monthly Visits & Conversion Rate
    const monthlyVisits = dailyVisits * 30;
    const conversionRatePercent = monthlyVisits > 0 ? ((monthlySales / monthlyVisits) * 100).toFixed(3) : '0';
    const arppuRobux = gamepassPrice; // Average Revenue Per Paying User

    return {
      grossRobux,
      netRobux,
      robloxTaxRobux,
      grossDevExUsd,
      annualNetRobux,
      annualDevExUsd,
      monthlyVisits,
      conversionRatePercent,
      arppuRobux
    };
  }, [gamepassPrice, monthlySales, dailyVisits]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Input Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Gamepass Price */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            Gamepass Price (R$)
          </label>
          <input
            type="number"
            min="1"
            value={gamepassPrice}
            onChange={(e) => setGamepassPrice(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-lg font-bold font-mono text-white focus:outline-none focus:border-emerald-500"
          />
          <span className="text-[10px] text-zinc-500 font-mono">
            Net per sale: {Math.floor(gamepassPrice * 0.70)} R$
          </span>
        </div>

        {/* Monthly Unit Sales */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
            Estimated Monthly Sales
          </label>
          <input
            type="number"
            min="1"
            value={monthlySales}
            onChange={(e) => setMonthlySales(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-lg font-bold font-mono text-white focus:outline-none focus:border-cyan-500"
          />
          <span className="text-[10px] text-zinc-500 font-mono">
            ~{Math.round(monthlySales / 30)} sales / day
          </span>
        </div>

        {/* Daily Active Visits */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
            Daily Game Visits
          </label>
          <input
            type="number"
            min="100"
            value={dailyVisits}
            onChange={(e) => setDailyVisits(Math.max(100, parseInt(e.target.value, 10) || 100))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-lg font-bold font-mono text-white focus:outline-none focus:border-purple-500"
          />
          <span className="text-[10px] text-zinc-500 font-mono">
            Conv Rate: {stats.conversionRatePercent}%
          </span>
        </div>
      </div>

      {/* Main Revenue Projection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-emerald-500/50 rounded-xl p-4 text-center shadow-lg shadow-emerald-950/30">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">Monthly Net Creator Robux</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            {stats.netRobux.toLocaleString()} <span className="text-xs font-normal text-zinc-400">R$</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            Gross: {stats.grossRobux.toLocaleString()} R$ (-30% tax)
          </span>
        </div>

        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-cyan-400 block">Monthly DevEx Cashout</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
            ${stats.grossDevExUsd} <span className="text-xs font-normal text-zinc-400">USD</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            @ $0.0035 / R$ DevEx rate
          </span>
        </div>

        <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-purple-300 block">Annual Projected DevEx</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
            ${stats.annualDevExUsd} <span className="text-xs font-normal text-zinc-400">USD/yr</span>
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">
            {stats.annualNetRobux.toLocaleString()} R$ / year
          </span>
        </div>
      </div>
    </div>
  );
}
