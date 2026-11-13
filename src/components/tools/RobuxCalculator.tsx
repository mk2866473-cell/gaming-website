/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ShoppingCart, ShieldCheck, AlertCircle
} from 'lucide-react';
import { ROBUX_PURCHASE_TIERS, ROBLOX_RATES } from '../../data/robloxData';

const STORE_USD_PER_ROBUX = 0.0125;
const STANDARD_ROBUX_PER_USD = 80;
const PREMIUM_ROBUX_PER_USD = 88;

export default function RobuxCalculator() {
  const [conversionType, setConversionType] = useState<'robux-to-usd' | 'usd-to-robux'>('robux-to-usd');
  const [amount, setAmount] = useState<number>(1000);
  const [isPremiumMember, setIsPremiumMember] = useState<boolean>(false);

  const results = useMemo(() => {
    const cleanInput = Math.max(0, amount);
    const robuxAmount =
      conversionType === 'robux-to-usd'
        ? Math.round(cleanInput)
        : Math.round(cleanInput * (isPremiumMember ? PREMIUM_ROBUX_PER_USD : STANDARD_ROBUX_PER_USD));

    const storeCostUsd =
      conversionType === 'robux-to-usd'
        ? (robuxAmount * STORE_USD_PER_ROBUX).toFixed(2)
        : cleanInput.toFixed(2);

    const devexCashoutUsd = (robuxAmount * ROBLOX_RATES.DEVEX_RATE_PER_ROBUX).toFixed(2);
    const meetsDevExMin = robuxAmount >= ROBLOX_RATES.MIN_DEVEX_ROBUX;
    const devexShortfall = Math.max(0, ROBLOX_RATES.MIN_DEVEX_ROBUX - robuxAmount);

    return {
      robuxAmount,
      storeCostUsd,
      devexCashoutUsd,
      meetsDevExMin,
      devexShortfall
    };
  }, [conversionType, amount, isPremiumMember]);

  const devExMinUsd = (ROBLOX_RATES.MIN_DEVEX_ROBUX * ROBLOX_RATES.DEVEX_RATE_PER_ROBUX).toFixed(2);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Direction Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
        <button
          onClick={() => { setConversionType('robux-to-usd'); setAmount(1000); }}
          className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            conversionType === 'robux-to-usd'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Robux (R$) → Real USD ($)
        </button>
        <button
          onClick={() => { setConversionType('usd-to-robux'); setAmount(25); }}
          className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            conversionType === 'usd-to-robux'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Real USD ($) → Robux (R$)
        </button>
      </div>

      {/* Main Input */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <label className="text-xs font-bold text-zinc-300 block uppercase tracking-wider">
            {conversionType === 'robux-to-usd' ? 'Enter Robux Amount (R$)' : 'Enter Dollar Budget ($ USD)'}
          </label>
          <label className="flex items-center gap-2 text-xs text-amber-400 font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={isPremiumMember}
              onChange={(e) => setIsPremiumMember(e.target.checked)}
              className="w-4 h-4 rounded accent-amber-500 bg-zinc-900 border-zinc-700 cursor-pointer"
            />
            <span>Roblox Premium Member (+10% Store Bonus)</span>
          </label>
        </div>

        <div className="relative">
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(Math.max(1, parseFloat(e.target.value) || 1))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-2xl font-extrabold font-mono text-white focus:outline-none focus:border-emerald-500 pl-12"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-zinc-500 text-lg">
            {conversionType === 'robux-to-usd' ? 'R$' : '$'}
          </span>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {(conversionType === 'robux-to-usd'
            ? [400, 1000, 5000, 10000, 30000, 50000, 100000]
            : [5, 10, 20, 50, 100, 200]
          ).map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(preset)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-colors cursor-pointer ${
                amount === preset
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {conversionType === 'robux-to-usd' ? `${preset.toLocaleString()} R$` : `$${preset}`}
            </button>
          ))}
        </div>
      </div>

      {/* Conversion Output Cards: Store Purchase vs DevEx Cashout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {conversionType === 'robux-to-usd' ? (
          <>
            <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-5 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                Store Purchase Value
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1.5 block">
                ${results.storeCostUsd} <span className="text-xs font-normal text-zinc-400">USD</span>
              </span>
              <span className="text-[11px] text-zinc-400 font-mono block">
                Standard store rate: ${STORE_USD_PER_ROBUX}/R$ (~{STANDARD_ROBUX_PER_USD} R$/$)
              </span>
              <span className="text-[10px] text-amber-400/90 font-mono block mt-1">
                With +10% Premium bonus: ~{PREMIUM_ROBUX_PER_USD} R$/$ (${(results.robuxAmount / PREMIUM_ROBUX_PER_USD).toFixed(2)} USD)
              </span>
            </div>

            <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-5 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                Developer Exchange (DevEx) Cashout
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1.5 block">
                ${results.devexCashoutUsd} <span className="text-xs font-normal text-zinc-400">USD</span>
              </span>
              <span className="text-[11px] text-zinc-400 font-mono block">
                Official DevEx rate: ${ROBLOX_RATES.DEVEX_RATE_PER_ROBUX}/R$ ($350 per 100k R$)
              </span>
              <span className="text-[10px] text-cyan-300/90 font-mono block mt-1">
                Minimum cashout: {ROBLOX_RATES.MIN_DEVEX_ROBUX.toLocaleString()} Earned Robux (${devExMinUsd} USD)
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-5 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                Estimated Store Robux Received
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1.5 block">
                {results.robuxAmount.toLocaleString()} <span className="text-xs font-normal text-zinc-400">R$</span>
              </span>
              <span className="text-[11px] text-zinc-400 font-mono block">
                {isPremiumMember
                  ? `Premium +10% rate (~${PREMIUM_ROBUX_PER_USD} R$/$)`
                  : `Standard store rate (~${STANDARD_ROBUX_PER_USD} R$/$, ~$${STORE_USD_PER_ROBUX}/R$)`}
              </span>
            </div>

            <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-5 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                Equivalent DevEx Cashout Value
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1.5 block">
                ${results.devexCashoutUsd} <span className="text-xs font-normal text-zinc-400">USD</span>
              </span>
              <span className="text-[11px] text-zinc-400 font-mono block">
                @ ${ROBLOX_RATES.DEVEX_RATE_PER_ROBUX}/R$ DevEx cashout rate
              </span>
              <span className="text-[10px] text-cyan-300/90 font-mono block mt-1">
                Min DevEx threshold: {ROBLOX_RATES.MIN_DEVEX_ROBUX.toLocaleString()} R$ (${devExMinUsd})
              </span>
            </div>
          </>
        )}
      </div>

      {/* DevEx 30,000 Robux Minimum Eligibility Indicator */}
      {results.meetsDevExMin ? (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center gap-3 text-emerald-200">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">
              Meets {ROBLOX_RATES.MIN_DEVEX_ROBUX.toLocaleString()} Robux DevEx Cashout Minimum
            </span>
            <span className="text-zinc-300">
              {results.robuxAmount.toLocaleString()} Earned Robux converts to ${results.devexCashoutUsd} USD at the official $0.0035/R$ Developer Exchange rate.
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-center gap-3 text-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">
              DevEx Minimum Requirement: {ROBLOX_RATES.MIN_DEVEX_ROBUX.toLocaleString()} Earned Robux (${devExMinUsd} USD)
            </span>
            <span className="text-amber-200/90">
              You need {results.devexShortfall.toLocaleString()} more Earned Robux to reach the 30,000 Robux minimum needed for a DevEx cashout request.
            </span>
          </div>
        </div>
      )}

      {/* Official Roblox Store Packages Grid */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-emerald-400" />
          Official Roblox Purchase Tiers (USD)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {ROBUX_PURCHASE_TIERS.map((tier) => (
            <button
              key={tier.priceUSD}
              onClick={() => { setConversionType('usd-to-robux'); setAmount(tier.priceUSD); }}
              className="p-3 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-xl text-left transition-colors group cursor-pointer"
            >
              <span className="text-base font-extrabold font-mono text-white block">
                ${tier.priceUSD}
              </span>
              <span className="text-xs font-bold font-mono text-emerald-400 mt-1 block">
                {tier.robuxStandard.toLocaleString()} R$
              </span>
              <span className="text-[10px] text-zinc-500 font-mono block">
                Prem: {tier.robuxPremium.toLocaleString()} R$
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
