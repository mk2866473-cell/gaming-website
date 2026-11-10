/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Hammer, Clock, Shield, Sparkles, Plus, Trash2, Box, Award
} from 'lucide-react';

interface CraftItem {
  id: string;
  name: string;
  workUnits: number;
  materials: { name: string; count: number }[];
}

const RECIPES: CraftItem[] = [
  { id: 'legendary-sphere', name: 'Legendary Sphere', workUnits: 150, materials: [{ name: 'Pal Metal Ingot', count: 5 }, { name: 'Carbon Fiber', count: 3 }, { name: 'Cement', count: 5 }, { name: 'Paldium', count: 10 }] },
  { id: 'ultra-sphere', name: 'Ultra Sphere', workUnits: 100, materials: [{ name: 'Refined Ingot', count: 5 }, { name: 'Carbon Fiber', count: 2 }, { name: 'Cement', count: 3 }, { name: 'Paldium', count: 5 }] },
  { id: 'pal-metal-armor', name: 'Pal Metal Armor', workUnits: 1200, materials: [{ name: 'Pal Metal Ingot', count: 30 }, { name: 'Leather', count: 20 }, { name: 'High Quality Cloth', count: 6 }] },
  { id: 'rocket-ammo', name: 'Rocket Ammo (x1)', workUnits: 120, materials: [{ name: 'Pal Metal Ingot', count: 1 }, { name: 'Gunpowder', count: 5 }] },
  { id: 'assault-rifle-ammo', name: 'Assault Rifle Ammo (x10)', workUnits: 80, materials: [{ name: 'Refined Ingot', count: 1 }, { name: 'Gunpowder', count: 2 }] },
  { id: 'cake', name: 'Cake (Breeding)', workUnits: 2000, materials: [{ name: 'Flour', count: 5 }, { name: 'Red Berries', count: 8 }, { name: 'Milk', count: 7 }, { name: 'Egg', count: 8 }, { name: 'Honey', count: 2 }] }
];

export default function PalworldCraftingCalculator() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('legendary-sphere');
  const [quantity, setQuantity] = useState<number>(50);
  const [crafterHandiworkLevel, setCrafterHandiworkLevel] = useState<number>(4); // Anubis Lv. 4
  const [crafterCount, setCrafterCount] = useState<number>(3); // 3 Anubis helping

  const recipe = RECIPES.find(r => r.id === selectedRecipeId) || RECIPES[0];

  const results = useMemo(() => {
    const totalWorkUnits = recipe.workUnits * quantity;

    // Handiwork speed scaling: Lv1 = 1x, Lv2 = 3x, Lv3 = 9x, Lv4 = 27x, Lv5 = 81x
    const speedPerWorker = Math.pow(3, crafterHandiworkLevel - 1) * 3.5; // ~95 units/s for Lv4 Anubis
    const totalTeamSpeed = speedPerWorker * crafterCount;

    const totalSeconds = Math.max(1, Math.round(totalWorkUnits / totalTeamSpeed));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const totalMaterials = recipe.materials.map(m => ({
      name: m.name,
      totalCount: m.count * quantity
    }));

    let formattedTime = '';
    if (hours > 0) formattedTime += `${hours}h `;
    if (minutes > 0 || hours > 0) formattedTime += `${minutes}m `;
    formattedTime += `${seconds}s`;

    return {
      totalWorkUnits,
      totalSeconds,
      formattedTime,
      totalMaterials,
      totalTeamSpeed: totalTeamSpeed.toFixed(0)
    };
  }, [recipe, quantity, crafterHandiworkLevel, crafterCount]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-rose-950/40 border border-amber-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-2">
              <Hammer className="w-3.5 h-3.5" />
              Production Queue & Workload Simulation
            </div>
            <h2 className="text-xl font-bold text-white">Palworld Crafting & Batch Production Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Calculate total raw material requirements and exact completion time for batch crafting Spheres, Ammo, Armor, and Breeding Cakes.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recipe & Quantity */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Box className="w-5 h-5 text-amber-400" />
              1. Item Recipe & Queue
            </h3>

            {/* Select Recipe */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Select Crafting Blueprint</label>
              <select
                value={selectedRecipeId}
                onChange={e => setSelectedRecipeId(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm"
              >
                {RECIPES.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.workUnits} Work Units)
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Slider */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">Crafting Batch Quantity</span>
                <span className="font-mono text-amber-400 font-bold">{quantity.toLocaleString()} Items</span>
              </div>
              <input
                type="range"
                min="1"
                max="500"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Workforce Controls */}
            <div className="pt-3 border-t border-zinc-800 space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Assigned Handiwork Pals
              </label>

              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-zinc-300">Crafter Handiwork Level</span>
                  <span className="font-mono text-emerald-400 font-bold">Lv. {crafterHandiworkLevel}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={crafterHandiworkLevel}
                  onChange={e => setCrafterHandiworkLevel(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-zinc-300">Number of Helping Workers</span>
                  <span className="font-mono text-blue-400 font-bold">{crafterCount} Workers</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={crafterCount}
                  onChange={e => setCrafterCount(parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Material Checklist & Completion Timer */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              Production Output
            </h3>

            {/* Completion Time Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/60 via-zinc-950 to-zinc-950 border border-amber-500/40 text-center">
              <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold">Estimated Crafting Time</div>
              <div className="text-4xl font-black text-amber-400 font-mono my-2">
                {results.formattedTime}
              </div>
              <div className="text-xs text-zinc-400">
                {results.totalWorkUnits.toLocaleString()} total work units @ {results.totalTeamSpeed} units/sec
              </div>
            </div>

            {/* Total Materials Required */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Raw Materials Needed:</div>
              
              <div className="grid grid-cols-2 gap-2">
                {results.totalMaterials.map(mat => (
                  <div key={mat.name} className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-zinc-300">{mat.name}</span>
                    <span className="font-mono font-bold text-amber-400">x{mat.totalCount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
