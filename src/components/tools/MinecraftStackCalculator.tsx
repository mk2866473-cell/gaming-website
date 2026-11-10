/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Layers, Box, Archive, ArrowRightLeft, Timer, Search, Check, Copy 
} from 'lucide-react';
import { COMMON_STACK_ITEMS, StackPresetItem } from '../../data/minecraftData';

export default function MinecraftStackCalculator() {
  const [totalItems, setTotalItems] = useState<number>(3456); // 1 double chest of 64
  const [stackSize, setStackSize] = useState<64 | 16 | 1>(64);
  const [searchItem, setSearchItem] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Filtered preset items
  const filteredItems = useMemo(() => {
    if (!searchItem.trim()) return COMMON_STACK_ITEMS;
    return COMMON_STACK_ITEMS.filter(item => 
      item.name.toLowerCase().includes(searchItem.toLowerCase())
    );
  }, [searchItem]);

  // Conversions
  const storage = useMemo(() => {
    const itemsPerShulker = 27 * stackSize;
    const itemsPerSingleChest = 27 * stackSize;
    const itemsPerDoubleChest = 54 * stackSize;

    const fullDoubleChests = Math.floor(totalItems / itemsPerDoubleChest);
    const doubleChestRemainder = totalItems % itemsPerDoubleChest;

    const fullShulkers = Math.floor(totalItems / itemsPerShulker);
    const shulkerRemainder = totalItems % itemsPerShulker;

    const fullStacks = Math.floor(totalItems / stackSize);
    const looseItems = totalItems % stackSize;

    // Hopper transfer timing: 1 item per 8 game ticks (0.4s) = 2.5 items/sec
    const hopperSeconds = totalItems / 2.5;

    return {
      itemsPerShulker,
      itemsPerDoubleChest,
      fullDoubleChests,
      doubleChestRemainder,
      fullShulkers,
      shulkerRemainder,
      fullStacks,
      looseItems,
      totalSlotsNeeded: Math.ceil(totalItems / stackSize),
      hopperSeconds
    };
  }, [totalItems, stackSize]);

  const formatSeconds = (sec: number) => {
    if (sec < 60) return `${sec.toFixed(1)} seconds`;
    const mins = Math.floor(sec / 60);
    const remSecs = Math.round(sec % 60);
    return `${mins} min ${remSecs} sec`;
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Quick Search Preset Bar */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-4 h-4 text-emerald-400" />
            Quick Item Stack Presets
          </span>
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setStackSize(64)}
              className={`px-3 py-1 rounded-lg border font-semibold ${stackSize === 64 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
            >
              Max 64 Stack
            </button>
            <button
              onClick={() => setStackSize(16)}
              className={`px-3 py-1 rounded-lg border font-semibold ${stackSize === 16 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
            >
              Max 16 (Pearls/Eggs)
            </button>
            <button
              onClick={() => setStackSize(1)}
              className={`px-3 py-1 rounded-lg border font-semibold ${stackSize === 1 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
            >
              Unstackable (1)
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          {filteredItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setStackSize(item.maxStack)}
              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1.5 ${
                stackSize === item.maxStack
                  ? 'bg-zinc-900 border-emerald-500/50 text-emerald-300'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <span>{item.name}</span>
              <span className="font-mono text-[9px] px-1 rounded bg-zinc-800 text-zinc-400">
                {item.maxStack}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Number Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Raw Items */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">
            Total Item Count
          </label>
          <input
            type="number"
            min="1"
            value={totalItems}
            onChange={(e) => setTotalItems(Math.max(0, parseInt(e.target.value, 10) || 0))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-lg font-bold font-mono text-white focus:outline-none focus:border-emerald-500"
          />
          <div className="flex gap-1 pt-1 text-[10px] font-mono">
            <button onClick={() => setTotalItems(64)} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800">1 Stack (64)</button>
            <button onClick={() => setTotalItems(1728)} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800">1 Shulker (1.7k)</button>
            <button onClick={() => setTotalItems(3456)} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800">1 Double (3.4k)</button>
          </div>
        </div>

        {/* Shulker Boxes Input */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-purple-400 block uppercase tracking-wider">
            Set by Shulker Boxes
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={(totalItems / storage.itemsPerShulker).toFixed(2)}
            onChange={(e) => setTotalItems(Math.round((parseFloat(e.target.value) || 0) * storage.itemsPerShulker))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-lg font-bold font-mono text-purple-300 focus:outline-none focus:border-purple-500"
          />
          <span className="text-[10px] text-zinc-500 font-mono block">
            1 Shulker = {storage.itemsPerShulker.toLocaleString()} items
          </span>
        </div>

        {/* Double Chests Input */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">
            Set by Double Chests
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={(totalItems / storage.itemsPerDoubleChest).toFixed(2)}
            onChange={(e) => setTotalItems(Math.round((parseFloat(e.target.value) || 0) * storage.itemsPerDoubleChest))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-lg font-bold font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
          />
          <span className="text-[10px] text-zinc-500 font-mono block">
            1 Double Chest = {storage.itemsPerDoubleChest.toLocaleString()} items
          </span>
        </div>
      </div>

      {/* Storage Breakdown Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Full Stacks */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Inventory Stacks ({stackSize})</span>
          <span className="text-2xl font-extrabold font-mono text-emerald-400 my-1 block">
            {storage.fullStacks} <span className="text-xs font-normal text-zinc-400">stacks</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            + {storage.looseItems} loose items
          </span>
        </div>

        {/* Shulker Boxes */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Shulker Boxes (27 slots)</span>
          <span className="text-2xl font-extrabold font-mono text-purple-300 my-1 block">
            {storage.fullShulkers} <span className="text-xs font-normal text-zinc-400">boxes</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            + {storage.shulkerRemainder} items remainder
          </span>
        </div>

        {/* Double Chests */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Double Chests (54 slots)</span>
          <span className="text-2xl font-extrabold font-mono text-cyan-400 my-1 block">
            {storage.fullDoubleChests} <span className="text-xs font-normal text-zinc-400">chests</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            + {storage.doubleChestRemainder} items remainder
          </span>
        </div>

        {/* Hopper Transfer Speed */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Single Hopper Unload Time</span>
          <span className="text-2xl font-extrabold font-mono text-amber-400 my-1 block">
            {formatSeconds(storage.hopperSeconds)}
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            @ 2.5 items / second (8 gt)
          </span>
        </div>
      </div>
    </div>
  );
}
