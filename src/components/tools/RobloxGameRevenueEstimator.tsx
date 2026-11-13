/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Users, Info } from 'lucide-react';

export const CREATOR_SHARE_RATE = 0.7;
export const MARKETPLACE_FEE_RATE = 0.3;
export const DEVEX_RATE_USD = 0.0035;
export const DEVEX_MIN_ROBUX = 30000;

export function estimateGameRevenue(
  visitsPerDay: number,
  buyerRatePercent: number,
  avgRobuxPerBuyer: number
) {
  const safeVisits = Math.max(0, Number.isFinite(visitsPerDay) ? visitsPerDay : 0);
  const safeRate = Math.max(0, Math.min(100, Number.isFinite(buyerRatePercent) ? buyerRatePercent : 0));
  const safeAvgRobux = Math.max(0, Number.isFinite(avgRobuxPerBuyer) ? avgRobuxPerBuyer : 0);

  const buyersPerDay = safeVisits * (safeRate / 100);
  const grossRobuxPerDay = Math.round(buyersPerDay * safeAvgRobux);
  const creatorSharePerDay = Math.round(grossRobuxPerDay * CREATOR_SHARE_RATE);
  const marketplaceFeePerDay = grossRobuxPerDay - creatorSharePerDay;
  const creatorShare30Days = creatorSharePerDay * 30;
  const usdEstimatePerDay = creatorSharePerDay * DEVEX_RATE_USD;
  const usdEstimate30Days = creatorShare30Days * DEVEX_RATE_USD;

  return {
    visitsPerDay: safeVisits,
    buyerRatePercent: safeRate,
    avgRobuxPerBuyer: safeAvgRobux,
    buyersPerDay,
    grossRobuxPerDay,
    creatorSharePerDay,
    marketplaceFeePerDay,
    creatorShare30Days,
    usdEstimatePerDay,
    usdEstimate30Days
  };
}

export default function RobloxGameRevenueEstimator() {
  const [visitsPerDay, setVisitsPerDay] = useState<number>(10000);
  const [buyerRatePercent, setBuyerRatePercent] = useState<number>(1);
  const [avgRobuxPerBuyer, setAvgRobuxPerBuyer] = useState<number>(100);

  const estimate = useMemo(
    () => estimateGameRevenue(visitsPerDay, buyerRatePercent, avgRobuxPerBuyer),
    [visitsPerDay, buyerRatePercent, avgRobuxPerBuyer]
  );

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Estimate Disclaimer Top Banner */}
        <div className="bg-zinc-950 border border-amber-500/40 rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs text-amber-200">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Estimate Notice:</strong> All figures below are estimates based on your inputs and Roblox&apos;s 70% creator share / 30% marketplace fee — real earnings vary.
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <label htmlFor="rev-visits-input" className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
              Visits Per Day
            </label>
            <input
              id="rev-visits-input"
              type="number"
              min={0}
              value={visitsPerDay}
              onChange={(e) => setVisitsPerDay(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-base focus:outline-none focus:border-rose-500"
            />
            <div className="flex flex-wrap gap-1.5">
              {[1000, 10000, 50000, 100000].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVisitsPerDay(v)}
                  className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:bg-zinc-800 cursor-pointer"
                >
                  {v.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <label htmlFor="rev-rate-input" className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
              % of Visitors Who Buy
            </label>
            <input
              id="rev-rate-input"
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={buyerRatePercent}
              onChange={(e) => setBuyerRatePercent(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-base focus:outline-none focus:border-cyan-500"
            />
            <div className="flex flex-wrap gap-1.5">
              {[0.5, 1, 2, 5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setBuyerRatePercent(r)}
                  className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:bg-zinc-800 cursor-pointer"
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <label htmlFor="rev-avg-input" className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Avg Robux Spent Per Buyer
            </label>
            <input
              id="rev-avg-input"
              type="number"
              min={0}
              value={avgRobuxPerBuyer}
              onChange={(e) => setAvgRobuxPerBuyer(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-base focus:outline-none focus:border-emerald-500"
            />
            <div className="flex flex-wrap gap-1.5">
              {[50, 100, 250, 500].map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAvgRobuxPerBuyer(a)}
                  className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:bg-zinc-800 cursor-pointer"
                >
                  {a} R$
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Estimate Output Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-950 border border-zinc-700 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">
              Estimated Gross Robux / Day
            </span>
            <span className="text-2xl font-extrabold font-mono tabular-nums text-white my-1 block">
              ~{estimate.grossRobuxPerDay.toLocaleString()} R$
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Estimate (~{estimate.buyersPerDay.toLocaleString(undefined, { maximumFractionDigits: 1 })} buyers/day)
            </span>
          </div>

          <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">
              Estimated 70% Share / Day
            </span>
            <span className="text-2xl font-extrabold font-mono tabular-nums text-emerald-400 my-1 block">
              ~{estimate.creatorSharePerDay.toLocaleString()} R$
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Estimate (30% fee: {estimate.marketplaceFeePerDay.toLocaleString()} R$)
            </span>
          </div>

          <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">
              Estimated 70% Share / 30 Days
            </span>
            <span className="text-2xl font-extrabold font-mono tabular-nums text-cyan-400 my-1 block">
              ~{estimate.creatorShare30Days.toLocaleString()} R$
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              30-day estimate ({estimate.creatorSharePerDay.toLocaleString()} R$/day × 30)
            </span>
          </div>

          <div className="bg-zinc-950 border border-amber-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-400 block">
              Estimated USD (30 Days DevEx)
            </span>
            <span className="text-2xl font-extrabold font-mono tabular-nums text-amber-400 my-1 block">
              ~${estimate.usdEstimate30Days.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Daily estimate: ~${estimate.usdEstimatePerDay.toFixed(2)} @ $0.0035/R$
            </span>
          </div>
        </div>

        {/* DevEx & 70/30 Fee Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">70% Creator Share on Experience Passes &amp; Products</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                For gamepasses and developer products sold in your own experience, creators receive <strong>70%</strong> of the Robux while <strong>30%</strong> goes to Roblox&apos;s marketplace fee. Real earnings vary based on retention, regional pricing, and updates.
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <DollarSign className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">DevEx Rate Estimate ($0.0035 / R$) &amp; 30,000 Minimum</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                USD figures are <strong>estimates</strong> calculated at the official DevEx rate of <strong>$0.0035 per Robux</strong>. Cashing out requires meeting full DevEx eligibility criteria and holding at least <strong>30,000 Earned Robux</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
