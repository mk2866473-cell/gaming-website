/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Flame, Zap, Timer, Check, Copy, AlertTriangle, Layers, Clock
} from 'lucide-react';
import { MINECRAFT_FUELS, FuelItem } from '../../data/minecraftData';

export default function MinecraftFurnaceFuelCalculator() {
  const [itemsToSmelt, setItemsToSmelt] = useState<number>(64);
  const [furnaceType, setFurnaceType] = useState<'standard' | 'blast' | 'smoker'>('standard');
  const [selectedFuelId, setSelectedFuelId] = useState<string>('coal');

  const selectedFuel = MINECRAFT_FUELS.find(f => f.id === selectedFuelId) || MINECRAFT_FUELS[4];

  const stats = useMemo(() => {
    // Standard Furnace: 200 ticks (10s) per item
    // Blast Furnace / Smoker: 100 ticks (5s) per item (2x speed, same fuel to item ratio)
    const itemsPerFuel = selectedFuel.itemsSmelted;
    const fuelsNeeded = Math.ceil(itemsToSmelt / itemsPerFuel);
    const totalPotentialSmelt = fuelsNeeded * itemsPerFuel;
    const wastedItemsCapacity = totalPotentialSmelt - itemsToSmelt;
    const wastePercentage = totalPotentialSmelt > 0 ? (wastedItemsCapacity / totalPotentialSmelt) * 100 : 0;

    const secondsPerItem = furnaceType === 'standard' ? 10 : 5;
    const totalSmeltSeconds = itemsToSmelt * secondsPerItem;

    const formatDuration = (sec: number) => {
      if (sec < 60) return `${sec}s`;
      const mins = Math.floor(sec / 60);
      const remSecs = sec % 60;
      return `${mins}m ${remSecs > 0 ? `${remSecs}s` : ''}`;
    };

    return {
      fuelsNeeded,
      totalPotentialSmelt,
      wastedItemsCapacity,
      wastePercentage: wastePercentage.toFixed(1),
      totalDuration: formatDuration(totalSmeltSeconds),
      totalSmeltSeconds
    };
  }, [itemsToSmelt, furnaceType, selectedFuel]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Smelter Type & Quick Batch Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-300 block uppercase tracking-wider">
            Smelter Machine Type
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
            {[
              { id: 'standard', name: 'Regular Furnace (10s)' },
              { id: 'blast', name: 'Blast Furnace (5s)' },
              { id: 'smoker', name: 'Smoker (5s)' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFurnaceType(f.id as any)}
                className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  furnaceType === f.id ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-300 block uppercase tracking-wider">
            Batch Size Presets
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: '8 Items (1 Coal)', count: 8 },
              { label: '64 (1 Stack)', count: 64 },
              { label: '80 (1 Coal Block)', count: 80 },
              { label: '100 (1 Lava Bucket)', count: 100 },
              { label: '500 Items (Mega)', count: 500 },
              { label: '1,728 (1 Shulker)', count: 1728 }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => setItemsToSmelt(preset.count)}
                className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-mono"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quantity Input */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <label className="text-xs font-bold text-amber-400 block uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4" />
            Items to Smelt / Cook
          </label>
          <input
            type="number"
            min="1"
            value={itemsToSmelt}
            onChange={(e) => setItemsToSmelt(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xl font-bold font-mono text-white focus:outline-none focus:border-amber-500"
          />
          <span className="text-[11px] text-zinc-400 font-mono block">
            = {Math.floor(itemsToSmelt / 64)} stacks + {itemsToSmelt % 64} items
          </span>
        </div>

        {/* Selected Fuel Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <label className="text-xs font-bold text-zinc-300 block uppercase tracking-wider">
            Active Fuel: <span className="text-amber-400 font-bold">{selectedFuel.name}</span>
          </label>
          <div className="text-xs text-zinc-400 space-y-1 font-mono">
            <div className="flex justify-between">
              <span>Items per Unit:</span>
              <strong className="text-white">{selectedFuel.itemsSmelted} items</strong>
            </div>
            <div className="flex justify-between">
              <span>Burn Duration:</span>
              <strong className="text-white">{(selectedFuel.burnTimeTicks / 20).toFixed(0)} seconds</strong>
            </div>
            <div className="flex justify-between">
              <span>Category:</span>
              <span className="capitalize text-emerald-400">{selectedFuel.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fuel Type Cards Grid */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
          Select or Compare Fuel Types ({MINECRAFT_FUELS.length} Options)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {MINECRAFT_FUELS.map((fuel) => {
            const isSelected = selectedFuel.id === fuel.id;
            const required = Math.ceil(itemsToSmelt / fuel.itemsSmelted);
            return (
              <button
                key={fuel.id}
                onClick={() => setSelectedFuelId(fuel.id)}
                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div>
                  <span className="text-xs font-bold block truncate">{fuel.name}</span>
                  <span className="text-[10px] text-zinc-500 font-mono block">
                    {fuel.itemsSmelted} items/unit
                  </span>
                </div>
                <div className="mt-2 pt-1 border-t border-zinc-800/80 flex justify-between items-center text-[10px] font-mono">
                  <span>Req:</span>
                  <strong className="text-amber-400">{required}x</strong>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Results Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Fuel Units Needed */}
        <div className="bg-zinc-950 border border-amber-500/50 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Exact Fuel Needed</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 my-1 block">
            {stats.fuelsNeeded} <span className="text-xs font-normal text-zinc-400">{selectedFuel.name}s</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Smelts up to {stats.totalPotentialSmelt} items
          </span>
        </div>

        {/* Total Smelt Time */}
        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Smelting Time</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
            {stats.totalDuration}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {furnaceType === 'standard' ? '10s per item (Furnace)' : '5s per item (2× Fast)'}
          </span>
        </div>

        {/* Residual Waste */}
        <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Residual Burn Waste</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
            {stats.wastedItemsCapacity} <span className="text-xs font-normal text-zinc-400">items</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            {stats.wastePercentage}% of last fuel cycle
          </span>
        </div>
      </div>
    </div>
  );
}
