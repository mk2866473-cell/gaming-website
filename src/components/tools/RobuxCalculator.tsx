/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  DollarSign, ShoppingCart, Award, ArrowRightLeft, Check, Sparkles, TrendingUp
} from 'lucide-react';
import { ROBUX_PURCHASE_TIERS, ROBLOX_RATES } from '../../data/robloxData';

export default function RobuxCalculator() {
  const [conversionType, setConversionType] = useState<'robux-to-usd' | 'usd-to-robux'>('robux-to-usd');
  const [amount, setAmount] = useState<number>(1000);
  const [isPremiumMember, setIsPremiumMember] = useState<boolean>(false);

  const results = useMemo(() => {
    if (conversionType === 'robux-to-usd') {
      const robux = Math.max(0, amount);
      // Store purchase value estimation (~$0.0125 per Robux average across standard tiers)
      const storeCostUsd = (robux * 0.0125).toFixed(2);
      // DevEx cashout value ($0.0035 per Robux)
      const devexCashoutUsd = (robux * ROBLOX_RATES.DEVEX_RATE_PER_ROBUX).toFixed(2);
      // Net Robux after 30% creator marketplace tax
      const netAfterTax = Math.floor(robux * 0.70);

      return {
        robux,
        storeCostUsd,
        devexCashoutUsd,
        netAfterTax
      };
    } else {
      const usd = Math.max(0, amount);
      // Standard rate ~80 Robux per $1 USD baseline
      const estimatedRobux = isPremiumMember ? Math.round(usd * 88) : Math.round(usd * 80);
      const devexValue = (estimatedRobux * ROBLOX_RATES.DEVEX_RATE_PER_ROBUX).toFixed(2);
      const netAfterTax = Math.floor(estimatedRobux * 0.70);

      return {
        usd,
        estimatedRobux,
        devexValue,
        netAfterTax
      };
    }
  }, [conversionType, amount, isPremiumMember]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Type Selector */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
        <button
          onClick={() => { setConversionType('robux-to-usd'); setAmount(1000); }}
          className={`py-2 rounded-lg text-xs font-bold transition-all ${
            conversionType === 'robux-to-usd' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Robux (R$) → Real USD ($)
        </button>
        <button
          onClick={() => { setConversionType('usd-to-robux'); setAmount(25); }}
          className={`py-2 rounded-lg text-xs font-bold transition-all ${
            conversionType === 'usd-to-robux' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Real USD ($) → Robux (R$)
        </button>
      </div>

      {/* Main Input */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center">
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
            <span>Roblox Premium Member (+10% Bonus)</span>
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
      </div>

      {/* Conversion Output Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {conversionType === 'robux-to-usd' ? (
          <>
            <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Retail Purchase Cost</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
                ${results.storeCostUsd} <span className="text-xs font-normal text-zinc-400">USD</span>
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                Store buy price (~$0.0125/R$)
              </span>
            </div>

            <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Developer DevEx Cashout</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
                ${results.devexCashoutUsd} <span className="text-xs font-normal text-zinc-400">USD</span>
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                Official DevEx rate ($0.0035/R$)
              </span>
            </div>

            <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">After 30% Marketplace Tax</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
                {results.netAfterTax?.toLocaleString()} <span className="text-xs font-normal text-zinc-400">R$</span>
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                Creator 70% share
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Estimated Robux Received</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
                {results.estimatedRobux?.toLocaleString()} <span className="text-xs font-normal text-zinc-400">R$</span>
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                {isPremiumMember ? 'Includes +10% Premium Bonus' : 'Standard Rate (~80 R$/$)'}
              </span>
            </div>

            <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">DevEx Developer Cashout</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
                ${results.devexValue} <span className="text-xs font-normal text-zinc-400">USD</span>
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                @ $0.0035 DevEx rate
              </span>
            </div>

            <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">After 30% Marketplace Tax</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
                {results.netAfterTax?.toLocaleString()} <span className="text-xs font-normal text-zinc-400">R$</span>
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                70% creator share
              </span>
            </div>
          </>
        )}
      </div>

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
              className="p-3 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-xl text-left transition-colors group"
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
