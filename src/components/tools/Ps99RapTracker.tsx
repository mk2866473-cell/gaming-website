/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, Sparkles, AlertTriangle, CheckCircle2, 
  RotateCcw, Copy, Check, ShieldCheck, Info, Flame 
} from 'lucide-react';
import { PS99_ITEMS_DATABASE, formatGems } from '../../data/ps99Data';

export default function Ps99RapTracker() {
  const [selectedCategory, setSelectedCategory] = useState<string>('titanic');
  const [copied, setCopied] = useState(false);

  const filteredItems = useMemo(() => {
    return PS99_ITEMS_DATABASE.filter(i => selectedCategory === 'all' || i.category === selectedCategory).slice(0, 10);
  }, [selectedCategory]);

  const handleCopy = () => {
    const text = [
      `📈 PS99 RAP PRICE ALERT & TREND MANIFEST`,
      `• Category: ${selectedCategory.toUpperCase()}`,
      ...filteredItems.map(i => `  - ${i.name}: 💎 ${formatGems(i.rap)} RAP (${i.trend.toUpperCase()}, Demand: ${i.demand}/10)`)
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans text-slate-100">
      {/* Header Card */}
      <div className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-sky-950 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-emerald-500/20 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-950 border border-emerald-500/50 rounded-xl text-emerald-400 shadow-lg">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/30">
                PET SIMULATOR 99 MARKET FEED
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
                RAP Price Alert & Trend Tracker
              </h1>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition font-mono flex items-center gap-1.5 shadow-lg shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Manifest Copied!' : 'Copy RAP Manifest'}
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pt-6">
          {[
            { id: 'titanic', label: 'Titanic Pets' },
            { id: 'huge', label: 'Huge Pets' },
            { id: 'enchant', label: 'Enchants' },
            { id: 'item', label: 'Items & Potions' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white pb-3 border-b border-slate-800">Live RAP Market Index</h2>

        <div className="space-y-3">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-[#090d16] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{item.rarity} · Demand: {item.demand}/10</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right font-mono">
                  <div className="text-xs text-slate-400">RAP Value</div>
                  <div className="text-sm font-black text-amber-400">💎 {formatGems(item.rap)}</div>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1 ${
                  item.trend === 'rising' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' :
                  item.trend === 'dropping' ? 'bg-rose-950 text-rose-400 border border-rose-500/40' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {item.trend === 'rising' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span className="capitalize">{item.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
