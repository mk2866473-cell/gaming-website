/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Plus, Trash2, CheckCircle2, AlertCircle, ArrowUpRight, Scale } from 'lucide-react';

export interface TradeItem {
  id: string;
  name: string;
  valueSheckles: number;
}

export default function GrowAGardenTradeCalculator() {
  const [yourOffer, setYourOffer] = useState<TradeItem[]>([
    { id: '1', name: 'Gold Carrot (0.55kg, Shocked)', valueSheckles: 174400 },
    { id: '2', name: 'Rare Pet (Orange Tabby)', valueSheckles: 600000 }
  ]);

  const [theirOffer, setTheirOffer] = useState<TradeItem[]>([
    { id: '3', name: 'Legendary Pet (Cow)', valueSheckles: 800000 }
  ]);

  // Input state for adding new items
  const [yourNewName, setYourNewName] = useState('');
  const [yourNewValue, setYourNewValue] = useState('');

  const [theirNewName, setTheirNewName] = useState('');
  const [theirNewValue, setTheirNewValue] = useState('');

  // Totals
  const yourTotal = useMemo(() => yourOffer.reduce((sum, item) => sum + Math.max(0, item.valueSheckles || 0), 0), [yourOffer]);
  const theirTotal = useMemo(() => theirOffer.reduce((sum, item) => sum + Math.max(0, item.valueSheckles || 0), 0), [theirOffer]);

  const diff = theirTotal - yourTotal; // Positive = Win for you, Negative = Loss for you

  // Verdict calculation (±5% threshold)
  const verdict = useMemo(() => {
    if (yourTotal === 0 && theirTotal === 0) {
      return { status: 'neutral', label: 'Empty Trade', color: 'text-slate-400 bg-slate-900 border-slate-700' };
    }

    const minFair = yourTotal * 0.95;
    const maxFair = yourTotal * 1.05;

    if (theirTotal >= minFair && theirTotal <= maxFair) {
      return { status: 'fair', label: 'Fair Trade (Balanced)', color: 'text-amber-300 bg-amber-500/10 border-amber-500/30' };
    }
    if (theirTotal > maxFair) {
      return { status: 'win', label: 'Win (Big W for You!)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    }
    return { status: 'loss', label: 'Loss (Big L for You)', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
  }, [yourTotal, theirTotal]);

  const addYourItem = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(yourNewValue);
    if (!yourNewName.trim() || isNaN(val)) return;

    setYourOffer(prev => [
      ...prev,
      { id: `your_${Date.now()}`, name: yourNewName.trim(), valueSheckles: Math.max(0, val) }
    ]);
    setYourNewName('');
    setYourNewValue('');
  };

  const addTheirItem = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(theirNewValue);
    if (!theirNewName.trim() || isNaN(val)) return;

    setTheirOffer(prev => [
      ...prev,
      { id: `their_${Date.now()}`, name: theirNewName.trim(), valueSheckles: Math.max(0, val) }
    ]);
    setTheirNewName('');
    setTheirNewValue('');
  };

  const removeYourItem = (id: string) => {
    setYourOffer(prev => prev.filter(item => item.id !== id));
  };

  const removeTheirItem = (id: string) => {
    setTheirOffer(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-2">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Roblox Grow a Garden WFL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Trade Value Calculator (WFL)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Compare "Your Offer" vs "Their Offer" Sheckle values to determine Win, Fair, or Loss status before confirming trades.
          </p>
        </div>
      </div>

      {/* Trade Verdict Banner */}
      <div className={`p-6 rounded-2xl border ${verdict.color} flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl`}>
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest block font-bold">
            Trade Evaluation Verdict
          </span>
          <div className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
            <Scale className="w-6 h-6" />
            <span>{verdict.label}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-right font-mono text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Value Difference</span>
            <span className={`font-bold ${diff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {diff >= 0 ? `+${diff.toLocaleString()}` : diff.toLocaleString()} Sheckles
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Difference %</span>
            <span className="font-bold text-white">
              {yourTotal > 0 ? `${((diff / yourTotal) * 100).toFixed(1)}%` : '0%'}
            </span>
          </div>
        </div>
      </div>

      {/* Two Sides Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Your Offer */}
        <div className="space-y-4 bg-[#070b19] border border-indigo-950 p-5 rounded-2xl">
          <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
              <span>Your Offer (Your Total)</span>
            </h3>
            <span className="text-sm font-mono font-black text-amber-300">
              {yourTotal.toLocaleString()} Sheckles
            </span>
          </div>

          <div className="space-y-2 min-h-[160px]">
            {yourOffer.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-[#0c122e] border border-indigo-900/60 p-3 rounded-xl">
                <span className="text-xs font-semibold text-slate-200 truncate pr-2">{item.name}</span>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {item.valueSheckles.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeYourItem(item.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {yourOffer.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500 italic">No items added to your offer.</div>
            )}
          </div>

          {/* Add Item Form */}
          <form onSubmit={addYourItem} className="pt-3 border-t border-indigo-950 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Add Item to Your Offer</span>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Item name (e.g. Gold Carrot)"
                value={yourNewName}
                onChange={(e) => setYourNewName(e.target.value)}
                className="flex-1 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
              <input
                type="number"
                placeholder="Sheckles"
                value={yourNewValue}
                onChange={(e) => setYourNewValue(e.target.value)}
                className="w-full sm:w-28 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </form>
        </div>

        {/* Their Offer */}
        <div className="space-y-4 bg-[#070b19] border border-indigo-950 p-5 rounded-2xl">
          <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>Their Offer (Their Total)</span>
            </h3>
            <span className="text-sm font-mono font-black text-cyan-300">
              {theirTotal.toLocaleString()} Sheckles
            </span>
          </div>

          <div className="space-y-2 min-h-[160px]">
            {theirOffer.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-[#0c122e] border border-indigo-900/60 p-3 rounded-xl">
                <span className="text-xs font-semibold text-slate-200 truncate pr-2">{item.name}</span>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {item.valueSheckles.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeTheirItem(item.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {theirOffer.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500 italic">No items added to their offer.</div>
            )}
          </div>

          {/* Add Item Form */}
          <form onSubmit={addTheirItem} className="pt-3 border-t border-indigo-950 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Add Item to Their Offer</span>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Item name (e.g. Legendary Cow)"
                value={theirNewName}
                onChange={(e) => setTheirNewName(e.target.value)}
                className="flex-1 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <input
                type="number"
                placeholder="Sheckles"
                value={theirNewValue}
                onChange={(e) => setTheirNewValue(e.target.value)}
                className="w-full sm:w-28 bg-[#0c122e] border border-indigo-900/80 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
