/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Boxes, 
  DollarSign, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  ShieldAlert, 
  Radio, 
  ShoppingCart, 
  TrendingUp, 
  Terminal, 
  Info,
  Copy,
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';
import { 
  calculateLethalQuota, 
  LETHAL_COMPANY_BUYING_RATES, 
  LETHAL_COMPANY_ITEMS, 
  STANDARD_QUOTA_PROGRESSION, 
  QuotaCalculationResult 
} from '../../data/lethalCompanyData';

export const LethalCompanyQuotaCalculator: React.FC = () => {
  // Primary Inputs
  const [currentQuota, setCurrentQuota] = useState<number>(130);
  const [fulfilledQuota, setFulfilledQuota] = useState<number>(0);
  const [totalShipScrapValue, setTotalShipScrapValue] = useState<number>(200);
  const [daysLeft, setDaysLeft] = useState<number>(0); // 3, 2, 1, 0

  // Optional Equipment Budget Shopping List
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);

  // Toggle item quantity
  const handleItemToggle = (itemId: string, delta: number) => {
    setSelectedItems(prev => {
      const current = prev[itemId] || 0;
      const updated = Math.max(0, current + delta);
      const clone = { ...prev };
      if (updated === 0) {
        delete clone[itemId];
      } else {
        clone[itemId] = updated;
      }
      return clone;
    });
  };

  // Compute total item purchase budget
  const itemBudgetCost = Object.entries(selectedItems).reduce((sum, [id, qty]) => {
    const item = LETHAL_COMPANY_ITEMS.find(i => i.id === id);
    return sum + (item ? item.cost * qty : 0);
  }, 0);

  // Calculate quota results
  const result: QuotaCalculationResult = calculateLethalQuota(
    currentQuota,
    fulfilledQuota,
    totalShipScrapValue,
    daysLeft,
    itemBudgetCost
  );

  // Preset Quota Buttons
  const applyPresetQuota = (quota: number) => {
    setCurrentQuota(quota);
    setFulfilledQuota(0);
  };

  const resetAll = () => {
    setCurrentQuota(130);
    setFulfilledQuota(0);
    setTotalShipScrapValue(0);
    setDaysLeft(0);
    setSelectedItems({});
  };

  const getShareText = () => {
    return [
      `🛸 LETHAL COMPANY QUOTA PLANNER`,
      `• Quota Target: $${currentQuota}`,
      `• Days Left: ${daysLeft} (${result.buyingRatePercentage}% Rate)`,
      `• Ship Scrap: $${totalShipScrapValue}`,
      `• Selling Strategy: ${result.sellingStrategyText}`,
      `• Carried Over Scrap: $${result.surplusScrapAfterQuota}`,
    ].join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-mono text-amber-400">
      {/* Lethal Company Industrial CRT Terminal Header */}
      <div className="relative bg-zinc-950 border-4 border-amber-600/80 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-md">
        {/* CRT Scanline Overlay Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

        {/* Top Industrial Hazard Warning Stripes */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(45deg,#d97706,#d97706_10px,#18181b_10px,#18181b_20px)] opacity-90" />

        <div className="relative z-10 pt-2 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-500/30 pb-5">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-950 border border-amber-500/60 rounded-xl text-amber-400 shadow-lg shadow-amber-950">
                <Terminal className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500/80">
                    FORTUNE-500 COMPANY SYSTEM
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[10px] font-mono text-emerald-400/80 font-bold tracking-tighter">
                    LINK ONLINE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
                  Scrap & Quota Optimization Terminal
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetAll}
                className="px-3 py-2 text-xs font-bold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-slate-300 border border-zinc-700 transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
              <button
                onClick={handleCopy}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-500 text-black transition font-sans flex items-center gap-1.5 shadow-lg shadow-amber-950/60"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied Log!' : 'Copy Directive'}
              </button>
            </div>
          </div>

          {/* CRT Terminal Main Recommendation Box */}
          <div className={`p-6 rounded-xl border-2 backdrop-blur-md shadow-2xl space-y-4 ${
            result.statusBadge === 'DANGER'
              ? 'bg-red-950/40 border-red-500 text-red-200'
              : result.statusBadge === 'WARNING'
              ? 'bg-amber-950/40 border-amber-500 text-amber-200'
              : 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {result.statusBadge === 'DANGER' ? (
                  <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
                ) : result.statusBadge === 'WARNING' ? (
                  <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                )}
                <span className="text-sm font-extrabold uppercase tracking-widest">
                  COMPANY DIRECTIVE STATUS: {result.statusBadge}
                </span>
              </div>

              <span className="px-3 py-1 bg-black/60 border border-current text-xs font-mono font-bold">
                Rate: {result.buyingRatePercentage}% Value
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed font-mono">
              {result.sellingStrategyText}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-current/20 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Scrap to Sell Today:</span>
                <span className="text-white font-bold text-base font-mono">${result.scrapNeededToSellToday}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Cash Received:</span>
                <span className="text-emerald-400 font-bold text-base font-mono">${result.effectiveSellingValueToday}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Carried Over Scrap:</span>
                <span className="text-amber-300 font-bold text-base font-mono">${result.surplusScrapAfterQuota}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Est. Next Quota:</span>
                <span className="text-purple-300 font-bold text-base font-mono">${result.estimatedNextQuota}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Input Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Quota Inputs */}
        <div className="lg:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-xl">
          {/* Quick Select Standard Quota Progression */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Quick Select Quota Progression Cycle:
            </label>
            <div className="flex flex-wrap gap-2">
              {STANDARD_QUOTA_PROGRESSION.map((q, idx) => (
                <button
                  key={q}
                  onClick={() => applyPresetQuota(q)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition ${
                    currentQuota === q
                      ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                      : 'bg-zinc-950 text-slate-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  Q{idx + 1}: ${q}
                </button>
              ))}
            </div>
          </div>

          {/* Numeric Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">
                Target Quota Amount ($):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-amber-500 font-bold">$</span>
                <input
                  type="number"
                  min={0}
                  max={50000}
                  value={currentQuota}
                  onChange={e => setCurrentQuota(parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-white font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">
                Already Fulfilled Quota ($):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-amber-500 font-bold">$</span>
                <input
                  type="number"
                  min={0}
                  max={currentQuota}
                  value={fulfilledQuota}
                  onChange={e => setFulfilledQuota(parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-white font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">
                Total Un-Sold Scrap Value Stored in Ship ($):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-amber-500 font-bold">$</span>
                <input
                  type="number"
                  min={0}
                  max={100000}
                  value={totalShipScrapValue}
                  onChange={e => setTotalShipScrapValue(parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-white font-bold text-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Current Day / Company Buying Rate Selector */}
          <div className="pt-4 border-t border-zinc-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Select Current Day (Company Buying Rate Penalty):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {LETHAL_COMPANY_BUYING_RATES.map(rate => {
                const isActive = daysLeft === rate.daysLeft;
                return (
                  <button
                    key={rate.daysLeft}
                    onClick={() => setDaysLeft(rate.daysLeft)}
                    className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center text-center ${
                      isActive
                        ? 'bg-amber-600 text-black border-amber-400 shadow-lg'
                        : 'bg-zinc-950 text-slate-400 border-zinc-800 hover:border-zinc-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{rate.dayName}</span>
                    <span className="text-[11px] font-mono mt-1 font-extrabold text-amber-300">
                      {rate.ratePercentage}% Value
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Ship Store Equipment Budget Planner */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Equipment Shopping Budget
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">+${itemBudgetCost}</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Select items to buy from the store console today. Required scrap sales will adjust automatically to cover item costs.
          </p>

          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {LETHAL_COMPANY_ITEMS.map(item => {
              const count = selectedItems[item.id] || 0;
              return (
                <div key={item.id} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-200">{item.name}</span>
                    <span className="text-[11px] font-mono text-amber-400 ml-2 font-bold">${item.cost}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleItemToggle(item.id, -1)}
                      className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-mono font-bold text-white">{count}</span>
                    <button
                      onClick={() => handleItemToggle(item.id, 1)}
                      className="w-6 h-6 rounded bg-amber-600 hover:bg-amber-500 text-black font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
