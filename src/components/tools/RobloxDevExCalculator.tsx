/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, DollarSign, ShieldCheck, Check, AlertCircle, Copy, HelpCircle
} from 'lucide-react';
import { ROBLOX_RATES } from '../../data/robloxData';

export default function RobloxDevExCalculator() {
  const [earnedRobux, setEarnedRobux] = useState<number>(100000);
  const [usStateTaxPercent, setUsStateTaxPercent] = useState<number>(0);
  const [tipaltiFee, setTipaltiFee] = useState<number>(2.5); // Tipalti transaction wire fee $

  const calculation = useMemo(() => {
    const robux = Math.max(0, earnedRobux);
    const isEligible = robux >= ROBLOX_RATES.MIN_DEVEX_ROBUX;
    
    // DevEx rate: $0.0035 per 1 Earned Robux
    const grossUsd = robux * ROBLOX_RATES.DEVEX_RATE_PER_ROBUX;
    const taxWithheld = grossUsd * (usStateTaxPercent / 100);
    const netPayoutUsd = Math.max(0, grossUsd - taxWithheld - tipaltiFee);

    const robuxShortfall = Math.max(0, ROBLOX_RATES.MIN_DEVEX_ROBUX - robux);

    return {
      robux,
      isEligible,
      grossUsd: grossUsd.toFixed(2),
      taxWithheld: taxWithheld.toFixed(2),
      netPayoutUsd: netPayoutUsd.toFixed(2),
      robuxShortfall
    };
  }, [earnedRobux, usStateTaxPercent, tipaltiFee]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* DevEx Status Banner */}
      {!calculation.isEligible ? (
        <div className="p-4 bg-amber-950/60 border border-amber-500/50 rounded-xl flex items-center gap-3 text-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wide">
              Below DevEx Minimum Threshold ({ROBLOX_RATES.MIN_DEVEX_ROBUX.toLocaleString()} R$ Minimum)
            </h4>
            <p className="text-xs text-amber-300 mt-0.5">
              You need {calculation.robuxShortfall.toLocaleString()} more Earned Robux to submit a cashout request.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between gap-3 text-emerald-300">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                Eligible for Developer Exchange (DevEx)
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Official Current Rate: $0.0035 USD per Earned Robux ($350 per 100k R$)
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-zinc-400">Estimated Cashout:</span>
            <span className="text-2xl font-extrabold font-mono text-emerald-400 block">
              ${calculation.grossUsd} USD
            </span>
          </div>
        </div>
      )}

      {/* Standard DevEx Tiers Quick Buttons */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 space-y-2">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
          Official DevEx Cashout Tiers
        </span>
        <div className="flex flex-wrap gap-1.5">
          {ROBLOX_RATES.STANDARD_DEVEX_TIERS.map((tier) => (
            <button
              key={tier.robux}
              onClick={() => setEarnedRobux(tier.robux)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
                earnedRobux === tier.robux
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {tier.robux >= 1000000 ? `${tier.robux / 1000000}M R$` : `${tier.robux / 1000}k R$`} (${tier.usd.toLocaleString()})
            </button>
          ))}
        </div>
      </div>

      {/* Main Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2 md:col-span-2">
          <label className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">
            Earned Robux for Cashout (Clean Creator Revenue)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              value={earnedRobux}
              onChange={(e) => setEarnedRobux(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xl font-bold font-mono text-white focus:outline-none focus:border-emerald-500 pl-12"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-zinc-500">
              R$
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono block">
            Note: Robux acquired from trading, gift cards, or group funds not from game earnings is not DevEx eligible.
          </span>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-zinc-300 block uppercase tracking-wider">
            Estimated Tax / Fees (%)
          </label>
          <input
            type="number"
            min="0"
            max="50"
            value={usStateTaxPercent}
            onChange={(e) => setUsStateTaxPercent(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-base font-bold font-mono text-white focus:outline-none focus:border-emerald-500"
          />
          <span className="text-[10px] text-zinc-500 font-mono block">
            W-9 / W-8BEN withholding estimate
          </span>
        </div>
      </div>

      {/* Payout Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Gross USD Value</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            ${calculation.grossUsd}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            @ $0.0035 / Robux
          </span>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Withholdings & Fees</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400 my-1 block">
            -${(parseFloat(calculation.taxWithheld) + tipaltiFee).toFixed(2)}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Tax (${calculation.taxWithheld}) + Tipalti (${tipaltiFee})
          </span>
        </div>

        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-cyan-400 block">Estimated Net Take-Home</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
            ${calculation.netPayoutUsd}
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">
            Direct Bank Wire / PayPal
          </span>
        </div>
      </div>

      {/* DevEx Official Requirements Checklist */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          Official DevEx Eligibility Checklist
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>At least 13 years of age</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Minimum {ROBLOX_RATES.MIN_DEVEX_ROBUX.toLocaleString()} Earned Robux in balance</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Verified email & 2-Factor Authentication (2FA)</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Valid Tipalti portal account & IRS W-9 / W-8BEN form</span>
          </div>
        </div>
      </div>
    </div>
  );
}
