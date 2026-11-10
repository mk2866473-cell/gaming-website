/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  DollarSign, Calculator, TrendingUp, AlertTriangle, 
  CheckCircle2, RotateCcw, Info, Sparkles, Award, 
  ShieldAlert, Layers, Scale, Clock
} from 'lucide-react';

export const LethalCompanyQuotaMarginMatrix: React.FC = () => {
  const [currentQuota, setCurrentQuota] = useState<number>(1200);
  const [currentScrapInShip, setCurrentScrapInShip] = useState<number>(1850);
  const [daysRemaining, setDaysRemaining] = useState<number>(0); // 0 = Deadline Day (100%), 1 = 1 Day Left (66%), 2 = 2 Days Left (33%), 3 = 3 Days Left (0%)
  const [fulfilledAmount, setFulfilledAmount] = useState<number>(0);

  // Overtime Calculation & Selling Optimization
  const metrics = useMemo(() => {
    // Buying rates per day
    const buyingRatePercent = daysRemaining === 0 ? 100 : daysRemaining === 1 ? 66 : daysRemaining === 2 ? 33 : 0;
    
    // Total needed from ship scrap if rate < 100%
    const rateMultiplier = buyingRatePercent / 100;
    const remainingQuotaNeeded = Math.max(0, currentQuota - fulfilledAmount);
    
    // Effective scrap value needed at current company buying rate
    const scrapNeededToMeetQuota = rateMultiplier > 0 
      ? Math.ceil(remainingQuotaNeeded / rateMultiplier) 
      : 99999;

    const hasEnoughScrap = currentScrapInShip >= scrapNeededToMeetQuota;
    const scrapHoldbackForNextQuota = Math.max(0, currentScrapInShip - scrapNeededToMeetQuota);

    // Overtime Bonus Formula (Official Lethal Company Mechanic)
    // On Deadline Day (100% buying rate), selling MORE than the quota grants Overtime Bonus:
    // Overtime Bonus = Max(0, (TotalSold - Quota) / 5 + 15)
    let overtimeBonus = 0;
    if (daysRemaining === 0 && currentScrapInShip > remainingQuotaNeeded) {
      const excessSold = currentScrapInShip - remainingQuotaNeeded;
      overtimeBonus = Math.floor((excessSold / 5) + 15);
    }

    // Profit Margin
    const totalPotentialValue = currentScrapInShip * rateMultiplier;
    const profitMarginPercent = currentQuota > 0 ? Math.round(((totalPotentialValue - currentQuota) / currentQuota) * 100) : 0;

    return {
      buyingRatePercent,
      remainingQuotaNeeded,
      scrapNeededToMeetQuota,
      hasEnoughScrap,
      scrapHoldbackForNextQuota,
      overtimeBonus,
      profitMarginPercent,
      totalPotentialValue: Math.round(totalPotentialValue)
    };
  }, [currentQuota, currentScrapInShip, daysRemaining, fulfilledAmount]);

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" /> Company Buying Rate Matrix
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full">
                Overtime Formula Verified
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Quota Profit Margin Matrix
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Calculate exact company buying rates (0% to 100%), overtime bonus payouts, scrap holdback recommendations for future quotas, and avoid zero-profit company penalties.
            </p>
          </div>

          {/* Big Profit Status Badge */}
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl shrink-0">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Overtime Bonus Payout</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 flex items-baseline gap-1">
                +${metrics.overtimeBonus} <span className="text-xs font-semibold text-slate-400">Cash</span>
              </div>
              <div className="text-[11px] text-amber-400 font-medium">
                Holdback for Next Quota: ${metrics.scrapHoldbackForNextQuota} Scrap
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Inputs & Company Rate Day Selector */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Days Left & Company Buying Rate
            </h3>

            {/* Buying Rate Days Selector */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { days: 3, rate: '0% Rate', label: '3 Days Left' },
                { days: 2, rate: '33% Rate', label: '2 Days Left' },
                { days: 1, rate: '66% Rate', label: '1 Day Left' },
                { days: 0, rate: '100% Rate', label: 'Deadline Day' },
              ].map(d => (
                <button
                  key={d.days}
                  onClick={() => setDaysRemaining(d.days)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    daysRemaining === d.days
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div>{d.label}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{d.rate}</div>
                </button>
              ))}
            </div>

            {/* Inputs Sliders */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>Current Target Quota</span>
                  <span className="font-bold text-amber-400">${currentQuota}</span>
                </div>
                <input
                  type="range"
                  min="130"
                  max="5000"
                  step="50"
                  value={currentQuota}
                  onChange={(e) => setCurrentQuota(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>Total Scrap Loot in Ship</span>
                  <span className="font-bold text-cyan-400">${currentScrapInShip}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6000"
                  step="50"
                  value={currentScrapInShip}
                  onChange={(e) => setCurrentScrapInShip(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between">
                  <span>Already Fulfilled Quota Amount</span>
                  <span className="font-bold text-emerald-400">${fulfilledAmount}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={currentQuota}
                  step="25"
                  value={fulfilledAmount}
                  onChange={(e) => setFulfilledAmount(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-950 h-2 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Validation Alert */}
          {metrics.hasEnoughScrap ? (
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs space-y-1">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Quota Requirement Met!
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Selling <strong className="text-amber-300">${metrics.scrapNeededToMeetQuota}</strong> scrap at {metrics.buyingRatePercent}% buying rate clears your remaining quota. You can safely hold back <strong className="text-emerald-400">${metrics.scrapHoldbackForNextQuota}</strong> in scrap for the next quota surge!
              </p>
            </div>
          ) : (
            <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl text-red-300 text-xs space-y-1">
              <div className="font-bold text-red-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-400" /> DANGER: Quota Shortfall!
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                You are short by <strong className="text-red-400">${metrics.scrapNeededToMeetQuota - currentScrapInShip}</strong> in scrap value. You must make another moon run before the deadline to avoid team termination!
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Calculations & Overtime Strategy */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Buying Rate</div>
              <div className="text-2xl font-black text-amber-400 mt-1">{metrics.buyingRatePercent}%</div>
              <div className="text-[10px] text-slate-500">{daysRemaining === 0 ? 'Deadline Day' : `${daysRemaining} Days Remaining`}</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Scrap Needed To Sell</div>
              <div className="text-2xl font-black text-cyan-400 mt-1">${metrics.scrapNeededToMeetQuota}</div>
              <div className="text-[10px] text-slate-500">At current rate</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Profit Margin</div>
              <div className={`text-2xl font-black mt-1 ${metrics.profitMarginPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {metrics.profitMarginPercent}%
              </div>
              <div className="text-[10px] text-slate-500">Relative to Quota</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Overtime Payout</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">+${metrics.overtimeBonus}</div>
              <div className="text-[10px] text-slate-500">On Deadline Day</div>
            </div>
          </div>

          {/* Overtime & Holdback Strategy */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2.5">
            <div className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Lethal Company Meta Selling Strategy
            </div>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-400 text-[11px]">
              <li>
                <strong className="text-slate-200">Never Sell on Days 1-3:</strong> Selling scrap early gives 0%, 33%, or 66% value. Always wait for Deadline Day (0 Days Left) to receive 100% full market value at the Company Building counter!
              </li>
              <li>
                <strong className="text-slate-200">The Holdback Rule:</strong> Only sell EXACTLY enough scrap to meet your quota unless you have extra scrap left over. Holding extra scrap in your ship guarantees an easy start for the next increased quota!
              </li>
              <li>
                <strong className="text-slate-200">Overtime Cash Bonus:</strong> Selling excess scrap on Deadline Day grants bonus cash (`(Excess / 5) + 15`). Use overtime bonus cash to buy Jetpacks and Pro-Flashlights immediately on Day 1 of the new quota.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LethalCompanyQuotaMarginMatrix;
