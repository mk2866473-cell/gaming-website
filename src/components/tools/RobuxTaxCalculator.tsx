/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Percent, DollarSign, ArrowRightLeft, ShieldCheck, Copy, Check, Sparkles, TrendingUp
} from 'lucide-react';
import { ROBLOX_RATES } from '../../data/robloxData';

export default function RobuxTaxCalculator() {
  const [calcMode, setCalcMode] = useState<'selling' | 'target'>('selling');
  const [inputValue, setInputValue] = useState<number>(1000);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const calculation = useMemo(() => {
    let grossPrice = 0;
    let netReceive = 0;
    let taxAmount = 0;

    if (calcMode === 'selling') {
      grossPrice = Math.max(0, inputValue);
      // Roblox rounds down (floor) when computing net proceeds
      netReceive = Math.floor(grossPrice * ROBLOX_RATES.CREATOR_CUT);
      taxAmount = grossPrice - netReceive;
    } else {
      netReceive = Math.max(0, inputValue);
      // To receive exact net amount, price must be ceiling(net / 0.70)
      grossPrice = Math.ceil(netReceive / ROBLOX_RATES.CREATOR_CUT);
      // Re-verify exact floor
      if (Math.floor(grossPrice * 0.70) < netReceive) {
        grossPrice += 1;
      }
      taxAmount = grossPrice - netReceive;
    }

    const devexUsd = (netReceive * ROBLOX_RATES.DEVEX_RATE_PER_ROBUX).toFixed(2);
    const storeUsdValue = (grossPrice * 0.0125).toFixed(2); // ~$10 per 800 Robux standard store rate

    return {
      grossPrice,
      netReceive,
      taxAmount,
      devexUsd,
      storeUsdValue
    };
  }, [calcMode, inputValue]);

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Mode Switcher */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-zinc-950 rounded-xl border border-zinc-800">
        <button
          onClick={() => setCalcMode('selling')}
          className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            calcMode === 'selling'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-lg'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span>I am Setting a Item / Gamepass Price</span>
        </button>
        <button
          onClick={() => setCalcMode('target')}
          className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            calcMode === 'target'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-lg'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span>I Want to Receive an Exact Net Robux Amount</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap gap-2 items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
        <span className="font-semibold text-zinc-400">Quick Robux Presets:</span>
        {[100, 250, 500, 1000, 2500, 5000, 10000, 50000].map((preset) => (
          <button
            key={preset}
            onClick={() => setInputValue(preset)}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-[11px] transition-colors"
          >
            {preset.toLocaleString()} R$
          </button>
        ))}
      </div>

      {/* Main Input Field */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-3">
        <label className="text-xs font-bold text-zinc-300 block uppercase tracking-wider">
          {calcMode === 'selling' ? 'Gamepass / Avatar Item Listing Price (Gross Robux)' : 'Target Net Robux to Receive in Account'}
        </label>
        <div className="relative">
          <input
            type="number"
            min="1"
            value={inputValue}
            onChange={(e) => setInputValue(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-2xl font-extrabold font-mono text-white focus:outline-none focus:border-rose-500 pl-12"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-zinc-500 text-lg">
            R$
          </span>
        </div>
      </div>

      {/* Main 3 Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Creator Receives (70%) */}
        <div className="bg-zinc-950 border border-emerald-500/50 rounded-xl p-4 text-center shadow-lg shadow-emerald-950/30">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">You Receive (70% Net)</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            {calculation.netReceive.toLocaleString()} <span className="text-xs font-normal text-zinc-400">R$</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            DevEx Value: ${calculation.devexUsd} USD
          </span>
        </div>

        {/* Roblox Tax Cut (30%) */}
        <div className="bg-zinc-950 border border-rose-500/50 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-rose-400 block">Roblox Fee (30% Tax)</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400 my-1 block">
            {calculation.taxAmount.toLocaleString()} <span className="text-xs font-normal text-zinc-400">R$</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Marketplace maintenance cut
          </span>
        </div>

        {/* Listing Price */}
        <div className="bg-zinc-950 border border-cyan-500/50 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-cyan-400 block">Required Listing Price</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
            {calculation.grossPrice.toLocaleString()} <span className="text-xs font-normal text-zinc-400">R$</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Buyer pays this amount
          </span>
        </div>
      </div>

      {/* Pro Tip & Exact Formula Notice */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            Roblox calculates tax using mathematical floor: <code className="text-zinc-200 font-mono">Receive = floor(Price × 0.70)</code>. Pending sales take 3–7 business days to clear into group/user balances.
          </span>
        </div>
      </div>
    </div>
  );
}
