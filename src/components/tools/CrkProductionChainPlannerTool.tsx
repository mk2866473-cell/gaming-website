/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Layers, Clock, Coins, ShoppingBag, ArrowRight, PackageCheck, Zap } from 'lucide-react';

interface CraftableItem {
  id: string;
  name: string;
  building: string;
  craftTimeSec: number;
  goldValue: number;
  expValue: number;
  ingredients: { name: string; qty: number }[];
}

const PRODUCTION_ITEMS: CraftableItem[] = [
  { id: 'roll_cake_wood', name: 'Roll Cake Wood', building: 'Woodshop', craftTimeSec: 30, goldValue: 30, expValue: 10, ingredients: [] },
  { id: 'sugar_cube', name: 'Sugar Cube', building: 'Sugar Quarry', craftTimeSec: 60, goldValue: 50, expValue: 15, ingredients: [] },
  { id: 'jelly_bean', name: 'Jelly Bean', building: 'Jelly Farm', craftTimeSec: 90, goldValue: 70, expValue: 20, ingredients: [] },
  { id: 'biscuit', name: 'Biscuit', building: 'Bakery', craftTimeSec: 300, goldValue: 240, expValue: 50, ingredients: [{ name: 'Sugar Cube', qty: 2 }, { name: 'Jelly Bean', qty: 2 }] },
  { id: 'jelly_jam', name: 'Jelly Jam', building: 'Jam House', craftTimeSec: 420, goldValue: 310, expValue: 65, ingredients: [{ name: 'Jelly Bean', qty: 3 }] },
  { id: 'biscoff_brick', name: 'Biscoff Brick', building: 'Masonry', craftTimeSec: 600, goldValue: 480, expValue: 90, ingredients: [{ name: 'Roll Cake Wood', qty: 4 }] },
  { id: 'sweet_bread', name: 'Sweet Bread', building: 'Bakery', craftTimeSec: 900, goldValue: 720, expValue: 140, ingredients: [{ name: 'Biscuit', qty: 2 }, { name: 'Sugar Cube', qty: 3 }] },
  { id: 'spooky_muffin', name: 'Spooky Muffin', building: 'Bakery', craftTimeSec: 1800, goldValue: 1450, expValue: 260, ingredients: [{ name: 'Sweet Bread', qty: 1 }, { name: 'Jelly Jam', qty: 2 }] }
];

export default function CrkProductionChainPlannerTool() {
  const [targetQuantities, setTargetQuantities] = useState<Record<string, number>>({
    roll_cake_wood: 10,
    biscuit: 5,
    sweet_bread: 2,
    spooky_muffin: 1
  });

  const [researchSpeedBonus, setResearchSpeedBonus] = useState<number>(10); // % gnome lab boost

  const updateQty = (id: string, qty: number) => {
    setTargetQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, qty)
    }));
  };

  const calculatedDemand = useMemo(() => {
    let totalCraftTimeSec = 0;
    let totalGold = 0;
    let totalExp = 0;

    const rawResourceMap: Record<string, number> = {
      'Roll Cake Wood': 0,
      'Sugar Cube': 0,
      'Jelly Bean': 0
    };

    PRODUCTION_ITEMS.forEach(item => {
      const qty = targetQuantities[item.id] || 0;
      if (qty > 0) {
        const timeWithBuff = item.craftTimeSec * (1 - researchSpeedBonus / 100);
        totalCraftTimeSec += timeWithBuff * qty;
        totalGold += item.goldValue * qty;
        totalExp += item.expValue * qty;

        // Simple calculation of raw requirements
        if (item.id === 'roll_cake_wood') rawResourceMap['Roll Cake Wood'] += qty;
        if (item.id === 'sugar_cube') rawResourceMap['Sugar Cube'] += qty;
        if (item.id === 'jelly_bean') rawResourceMap['Jelly Bean'] += qty;

        if (item.id === 'biscuit') {
          rawResourceMap['Sugar Cube'] += 2 * qty;
          rawResourceMap['Jelly Bean'] += 2 * qty;
        }
        if (item.id === 'jelly_jam') {
          rawResourceMap['Jelly Bean'] += 3 * qty;
        }
        if (item.id === 'biscoff_brick') {
          rawResourceMap['Roll Cake Wood'] += 4 * qty;
        }
        if (item.id === 'sweet_bread') {
          rawResourceMap['Sugar Cube'] += 7 * qty;
          rawResourceMap['Jelly Bean'] += 4 * qty;
        }
        if (item.id === 'spooky_muffin') {
          rawResourceMap['Sugar Cube'] += 7 * qty;
          rawResourceMap['Jelly Bean'] += 10 * qty;
        }
      }
    });

    const hours = Math.floor(totalCraftTimeSec / 3600);
    const minutes = Math.floor((totalCraftTimeSec % 3600) / 60);
    const seconds = Math.floor(totalCraftTimeSec % 60);

    return {
      totalCraftTimeSec,
      timeFormatted: `${hours}h ${minutes}m ${seconds}s`,
      totalGold,
      totalExp,
      rawResourceMap
    };
  }, [targetQuantities, researchSpeedBonus]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-900 border border-amber-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Kingdom Economy Simulator
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Layers className="w-6 h-6 text-amber-400" />
              Cookie Run: Kingdom Production Chain Planner
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Calculate total crafting times, raw material bottlenecks, and gold returns for Tree of Wishes and Jelly Trains.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Total Craft Time</div>
              <div className="text-xl font-bold text-amber-400">{calculatedDemand.timeFormatted}</div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <div className="text-xs text-zinc-400">Est. Gold Value</div>
              <div className="text-xl font-bold text-emerald-400">+{calculatedDemand.totalGold.toLocaleString()} Gold</div>
            </div>
          </div>
        </div>
      </div>

      {/* Speed Buff Adjustment */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span className="text-sm text-white font-medium">Sugar Gnome Research Lab Crafting Speed:</span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={researchSpeedBonus}
            onChange={e => setResearchSpeedBonus(parseInt(e.target.value) || 0)}
            className="w-full sm:w-40 accent-amber-500"
          />
          <span className="text-sm font-mono text-amber-300 w-12 text-right">+{researchSpeedBonus}%</span>
        </div>
      </div>

      {/* Target Items Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Goods Selector */}
        <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            Select Manufactured Goods Target Quantity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRODUCTION_ITEMS.map(item => {
              const qty = targetQuantities[item.id] || 0;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    qty > 0 ? 'bg-amber-950/20 border-amber-500/40' : 'bg-zinc-950/60 border-zinc-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white">{item.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {item.building}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-400 space-y-0.5 mt-1">
                      <div>Base Time: {Math.round(item.craftTimeSec / 60)} mins</div>
                      <div>Gold: +{item.goldValue}</div>
                    </div>

                    {item.ingredients.length > 0 && (
                      <div className="mt-2 text-[11px] text-zinc-500 border-t border-zinc-800/80 pt-1">
                        Requires: {item.ingredients.map(ing => `${ing.qty}x ${ing.name}`).join(', ')}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Order Qty:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, qty - 1)}
                        className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm flex items-center justify-center"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={qty}
                        onChange={e => updateQty(item.id, parseInt(e.target.value) || 0)}
                        className="w-12 text-center bg-zinc-950 text-amber-300 font-mono text-sm border border-zinc-800 rounded py-0.5 outline-none"
                      />
                      <button
                        onClick={() => updateQty(item.id, qty + 1)}
                        className="w-7 h-7 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-sm flex items-center justify-center border border-amber-500/40"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Raw Materials Throughput Breakdown */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-amber-400" />
              Raw Materials Throughput Required
            </h3>

            <div className="space-y-3">
              {Object.entries(calculatedDemand.rawResourceMap).map(([resName, count]) => (
                <div key={resName} className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-lg flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-200">{resName}</span>
                  <span className="text-base font-mono font-bold text-amber-400">
                    {count.toLocaleString()} units
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
            <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
              Tree of Wishes Efficiency Tip
            </div>
            <p className="text-xs text-zinc-300">
              Complete 3 daily Burning Time wishes to receive double gold rewards. Prioritize high-tier products like Sweet Bread & Spooky Muffins during burning hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
