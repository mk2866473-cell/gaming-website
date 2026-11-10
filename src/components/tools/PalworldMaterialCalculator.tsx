/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Box, Sparkles, Layers, ArrowRight, Shield, Check, Flame, Hammer
} from 'lucide-react';

interface RefinedItem {
  id: string;
  name: string;
  iconColor: string;
  rawInputs: { name: string; perUnit: number }[];
}

const REFINED_ITEMS: RefinedItem[] = [
  { id: 'pal-metal-ingot', name: 'Pal Metal Ingot', iconColor: 'text-purple-400', rawInputs: [{ name: 'Ore', perUnit: 4 }, { name: 'Paldium Fragment', perUnit: 2 }] },
  { id: 'refined-ingot', name: 'Refined Ingot', iconColor: 'text-cyan-400', rawInputs: [{ name: 'Ore', perUnit: 2 }, { name: 'Coal', perUnit: 2 }] },
  { id: 'regular-ingot', name: 'Standard Ingot', iconColor: 'text-amber-400', rawInputs: [{ name: 'Ore', perUnit: 2 }] },
  { id: 'cement', name: 'Cement', iconColor: 'text-zinc-400', rawInputs: [{ name: 'Stone', perUnit: 50 }, { name: 'Bone', perUnit: 1 }, { name: 'Pal Fluids', perUnit: 1 }] },
  { id: 'carbon-fiber', name: 'Carbon Fiber', iconColor: 'text-zinc-200', rawInputs: [{ name: 'Coal', perUnit: 2 }, { name: 'Charcoal (Wood)', perUnit: 5 }] },
  { id: 'polymer', name: 'Polymer', iconColor: 'text-emerald-400', rawInputs: [{ name: 'High Quality Pal Oil', perUnit: 2 }] },
  { id: 'circuit-board', name: 'Circuit Board', iconColor: 'text-blue-400', rawInputs: [{ name: 'Pure Quartz', perUnit: 4 }, { name: 'High Quality Pal Oil (Polymer)', perUnit: 4 }] },
  { id: 'plasteel', name: 'Plasteel (Sakurajima Tier)', iconColor: 'text-indigo-400', rawInputs: [{ name: 'Crude Oil', perUnit: 5 }, { name: 'Paldium Fragment', perUnit: 5 }, { name: 'Ore', perUnit: 10 }] }
];

export default function PalworldMaterialCalculator() {
  const [targetItemCounts, setTargetItemCounts] = useState<Record<string, number>>({
    'pal-metal-ingot': 100,
    'refined-ingot': 100,
    'cement': 100,
    'carbon-fiber': 50,
    'polymer': 50,
    'circuit-board': 20,
    'plasteel': 50,
    'regular-ingot': 0
  });

  const updateCount = (id: string, count: number) => {
    setTargetItemCounts({
      ...targetItemCounts,
      [id]: Math.max(0, count)
    });
  };

  const rawTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    Object.entries(targetItemCounts).forEach(([itemId, qty]) => {
      if (qty <= 0) return;
      const item = REFINED_ITEMS.find(r => r.id === itemId);
      if (!item) return;

      item.rawInputs.forEach(input => {
        const totalForThis = input.perUnit * qty;
        totals[input.name] = (totals[input.name] || 0) + totalForThis;
      });
    });

    return totals;
  }, [targetItemCounts]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-indigo-950/40 border border-purple-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-400 mb-2">
              <Box className="w-3.5 h-3.5" />
              Raw Ore, Coal & Paldium Breakdown
            </div>
            <h2 className="text-xl font-bold text-white">Palworld Material & Resource Decomposition Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Deconstruct end-game materials like Pal Metal, Plasteel, Circuit Boards, and Polymers into exact raw mining counts.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Refined Items Needed */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              1. Desired Advanced Materials
            </h3>

            <div className="space-y-3">
              {REFINED_ITEMS.map(item => (
                <div key={item.id} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4">
                  <div>
                    <div className={`text-sm font-bold ${item.iconColor}`}>{item.name}</div>
                    <div className="text-[10px] text-zinc-500">
                      Per Unit: {item.rawInputs.map(r => `${r.perUnit}x ${r.name}`).join(' + ')}
                    </div>
                  </div>

                  <div className="w-28">
                    <input
                      type="number"
                      min="0"
                      value={targetItemCounts[item.id] || 0}
                      onChange={e => updateCount(item.id, parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-sm text-right"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Total Raw Mining Checklist */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Hammer className="w-5 h-5 text-amber-400" />
              Total Raw Material Shopping List
            </h3>

            {/* List of raw materials */}
            <div className="space-y-2.5">
              {Object.entries(rawTotals).map(([matName, count]) => (
                <div key={matName} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div className="text-sm font-semibold text-zinc-200">{matName}</div>
                  <div className="text-xl font-black text-amber-400 font-mono">
                    {count.toLocaleString()}x
                  </div>
                </div>
              ))}
            </div>

            {/* Mining Strategy */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 space-y-2">
              <div className="font-bold text-emerald-400">Automated Mining Camp Tip:</div>
              <p className="text-zinc-400 leading-relaxed">
                Build a secondary base on top of a Coal & Ore node cluster (such as the mountain ridge at coordinates 190, -40). Assign 3 Astegon or Digtoise to passive-mine thousands of raw ore and coal overnight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
