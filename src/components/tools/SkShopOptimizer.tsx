/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ShoppingCart, Check, AlertTriangle, TrendingUp, Sparkles, Award, ArrowRight } from 'lucide-react';

interface Bundle {
  id: string;
  name: string;
  price: number;
  rubies: number;
  tickets: number;
  keys: number;
  goldMillions: number;
  reforgeStones: number;
}

const PRESET_BUNDLES: Bundle[] = [
  {
    id: 'monthly_hero',
    name: 'Monthly Grand Summon Package',
    price: 29.99,
    rubies: 1500,
    tickets: 30, // worth 3000 rubies
    keys: 400, // worth 480 rubies
    goldMillions: 2, // worth 600 rubies
    reforgeStones: 20 // worth 1000 rubies
  },
  {
    id: 'starter_growth',
    name: 'Newcomer Adventure Pass',
    price: 9.99,
    rubies: 1200,
    tickets: 10,
    keys: 500,
    goldMillions: 3,
    reforgeStones: 10
  },
  {
    id: 'key_marathon',
    name: 'Stamina Marathon Bundle',
    price: 14.99,
    rubies: 500,
    tickets: 0,
    keys: 2000, // worth 2400 rubies
    goldMillions: 5,
    reforgeStones: 5
  },
  {
    id: 'standard_rubies',
    name: 'Standard Raw Ruby Tier',
    price: 49.99,
    rubies: 5000,
    tickets: 0,
    keys: 0,
    goldMillions: 0,
    reforgeStones: 0
  }
];

export default function SkShopOptimizer() {
  const [bundles, setBundles] = useState<Bundle[]>(PRESET_BUNDLES);
  const [activeTab, setActiveTab] = useState<string>('monthly_hero');

  // Benchmark weights (in Ruby-equivalents):
  // 1 Ticket = 100 Rubies
  // 100 Keys = 120 Rubies (1.2 per key)
  // 1 Million Gold = 300 Rubies
  // 1 Reforge Stone = 50 Rubies
  // Base dollar value: 100 Rubies = $1.00 USD baseline

  const evaluatedBundles = useMemo(() => {
    return bundles.map(b => {
      const ticketVal = b.tickets * 100;
      const keyVal = b.keys * 1.2;
      const goldVal = b.goldMillions * 300;
      const stoneVal = b.reforgeStones * 50;
      const totalRubyEquivalent = Math.round(b.rubies + ticketVal + keyVal + goldVal + stoneVal);

      // Baseline dollar value is $1.00 per 100 rubies
      const baselineDollarValue = totalRubyEquivalent / 100;
      const valueRatio = b.price > 0 ? (baselineDollarValue / b.price) * 100 : 0;
      const effectiveCostPerPull = b.tickets + (b.rubies / 100) > 0
        ? (b.price / (b.tickets + (b.rubies / 100)))
        : 0;

      let tierBadge: string;
      let tierColor: string;

      if (valueRatio >= 300) {
        tierBadge = 'GOD TIER (MUST BUY)';
        tierColor = 'text-amber-400 border-amber-500/40 bg-amber-950/20';
      } else if (valueRatio >= 200) {
        tierBadge = 'EXCELLENT VALUE';
        tierColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20';
      } else if (valueRatio >= 130) {
        tierBadge = 'MODEST DEAL';
        tierColor = 'text-blue-400 border-blue-500/40 bg-blue-950/20';
      } else {
        tierBadge = 'TRAP / POOR VALUE';
        tierColor = 'text-rose-400 border-rose-500/40 bg-rose-950/20';
      }

      return {
        ...b,
        totalRubyEquivalent,
        baselineDollarValue,
        valueRatio: Math.round(valueRatio),
        effectiveCostPerPull: effectiveCostPerPull.toFixed(2),
        tierBadge,
        tierColor
      };
    });
  }, [bundles]);

  const updateBundleField = (id: string, field: keyof Bundle, val: any) => {
    setBundles(prev => prev.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  const selectedBundle = evaluatedBundles.find(b => b.id === activeTab) || evaluatedBundles[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-blue-900/20 to-zinc-900 border border-blue-500/30 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Seven Knights Re:BIRTH Market Intelligence
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-zinc-400">Bundle ROI Arbitrage</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Shop Bundle & Pack Value Optimizer</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Convert summon tickets, stamina keys, reforge stones, and gold into standardized ruby equivalents to detect high-value vs trap shop packages.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 px-4 py-3 rounded-xl border border-zinc-800">
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Selected Pack Efficiency</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {selectedBundle.valueRatio}% Value
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {evaluatedBundles.map(b => (
          <button
            key={b.id}
            onClick={() => setActiveTab(b.id)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === b.id
                ? 'bg-blue-500/20 border-blue-400 text-white shadow-lg shadow-blue-950/30'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="text-xs font-bold truncate">{b.name}</div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs font-mono font-bold text-white">${b.price}</span>
              <span className={`text-[10px] font-mono font-bold ${b.valueRatio >= 200 ? 'text-emerald-400' : 'text-zinc-500'}`}>
                {b.valueRatio}%
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Editor & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Bundle Item Inputs */}
        <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Customize Package Items: {selectedBundle.name}
            </h3>
            <span className="text-xs font-mono text-blue-400 font-bold">${selectedBundle.price} USD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Package Price ($ USD):</label>
              <input
                type="number"
                step="0.01"
                value={selectedBundle.price}
                onChange={e => updateBundleField(selectedBundle.id, 'price', Number(e.target.value))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Direct Rubies Included:</label>
              <input
                type="number"
                value={selectedBundle.rubies}
                onChange={e => updateBundleField(selectedBundle.id, 'rubies', Number(e.target.value))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Summon Tickets (1 = 100 Rubies):</label>
              <input
                type="number"
                value={selectedBundle.tickets}
                onChange={e => updateBundleField(selectedBundle.id, 'tickets', Number(e.target.value))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Adventure Keys (100 = 120 Rubies):</label>
              <input
                type="number"
                value={selectedBundle.keys}
                onChange={e => updateBundleField(selectedBundle.id, 'keys', Number(e.target.value))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Gold (Millions, 1M = 300 Rubies):</label>
              <input
                type="number"
                step="0.5"
                value={selectedBundle.goldMillions}
                onChange={e => updateBundleField(selectedBundle.id, 'goldMillions', Number(e.target.value))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Reforge Stones (1 = 50 Rubies):</label>
              <input
                type="number"
                value={selectedBundle.reforgeStones}
                onChange={e => updateBundleField(selectedBundle.id, 'reforgeStones', Number(e.target.value))}
                className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-white font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right: ROI Valuation Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          <div className={`p-6 rounded-xl border flex flex-col gap-2 ${selectedBundle.tierColor}`}>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80 block">
              Market Efficiency Verdict
            </span>
            <h3 className="text-xl font-black tracking-tight">{selectedBundle.tierBadge}</h3>
            <p className="text-xs opacity-90 leading-relaxed mt-1">
              Yields <strong>${selectedBundle.baselineDollarValue.toFixed(2)}</strong> worth of progression currency for <strong>${selectedBundle.price.toFixed(2)}</strong>, delivering {selectedBundle.valueRatio}% real purchasing power.
            </p>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Unit Cost Analysis</h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-400">Total Ruby Equivalent Value:</span>
                <span className="font-mono text-amber-400 font-bold">{selectedBundle.totalRubyEquivalent.toLocaleString()} Rubies</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-400">Effective Cost Per Summon:</span>
                <span className="font-mono text-emerald-400 font-bold">${selectedBundle.effectiveCostPerPull} / summon</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-400">Standard Rate Comparison:</span>
                <span className="font-mono text-zinc-300 font-bold">Standard is $1.00 / summon</span>
              </div>
            </div>

            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed">
              <strong>Buyer Rule:</strong> In Seven Knights Re:BIRTH, avoid raw ruby packs below $49.99 unless bundled with Key stamina pots or Transcendence reforge stones.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
