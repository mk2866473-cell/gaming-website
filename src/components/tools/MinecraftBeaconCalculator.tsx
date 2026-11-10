/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Flame, Shield, Zap, Sparkles, Check, Copy, ArrowRight, Layers, Compass
} from 'lucide-react';
import { BEACON_TIERS } from '../../data/minecraftData';

export default function MinecraftBeaconCalculator() {
  const [tier, setTier] = useState<number>(4);
  const [beaconType, setBeaconType] = useState<'single' | 'quad' | 'six'>('single');
  const [mineralType, setMineralType] = useState<string>('iron');
  const [primaryEffect, setPrimaryEffect] = useState<string>('haste-2');
  const [secondaryEffect, setSecondaryEffect] = useState<string>('regeneration');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const minerals: Record<string, { name: string; color: string; item: string }> = {
    iron: { name: 'Iron', color: 'text-zinc-300', item: 'Iron Ingot' },
    gold: { name: 'Gold', color: 'text-amber-400', item: 'Gold Ingot' },
    emerald: { name: 'Emerald', color: 'text-emerald-400', item: 'Emerald Gem' },
    diamond: { name: 'Diamond', color: 'text-cyan-400', item: 'Diamond Gem' },
    netherite: { name: 'Netherite', color: 'text-purple-400', item: 'Netherite Ingot' }
  };

  const calculation = useMemo(() => {
    // Single beacon layers: 3x3 (9), 5x5 (25), 7x7 (49), 9x9 (81) -> Total 164 blocks
    // Quad beacon (2x2 beacons): 4x4 (16), 6x6 (36), 8x8 (64), 10x10 (100) -> Total 244 blocks
    // Six beacon (2x3 beacons): 4x5 (20), 6x7 (42), 8x9 (72), 10x11 (110) -> Total 244 blocks
    let totalBlocks = 0;
    let layersBreakdown: { layer: number; size: string; blocks: number }[] = [];

    if (beaconType === 'single') {
      const tierInfo = BEACON_TIERS[tier - 1];
      totalBlocks = tierInfo.totalBlocks;
      const dims = ['3×3', '5×5', '7×7', '9×9'];
      const counts = [9, 25, 49, 81];
      for (let i = 0; i < tier; i++) {
        layersBreakdown.push({ layer: i + 1, size: dims[i], blocks: counts[i] });
      }
    } else if (beaconType === 'quad') {
      const counts = [16, 36, 64, 100];
      const dims = ['4×4', '6×6', '8×8', '10×10'];
      for (let i = 0; i < tier; i++) {
        totalBlocks += counts[i];
        layersBreakdown.push({ layer: i + 1, size: dims[i], blocks: counts[i] });
      }
    } else {
      const counts = [20, 42, 72, 110];
      const dims = ['4×5', '6×7', '8×9', '10×11'];
      for (let i = 0; i < tier; i++) {
        totalBlocks += counts[i];
        layersBreakdown.push({ layer: i + 1, size: dims[i], blocks: counts[i] });
      }
    }

    const totalIngots = totalBlocks * 9;
    const fullStacks = Math.floor(totalIngots / 64);
    const remainderIngots = totalIngots % 64;
    const blockStacks = (totalBlocks / 64).toFixed(1);

    const range = tier * 10 + 10;
    const durationSecs = 9 + tier * 2;

    return {
      totalBlocks,
      totalIngots,
      fullStacks,
      remainderIngots,
      blockStacks,
      range,
      durationSecs,
      layersBreakdown
    };
  }, [tier, beaconType]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Top Configuration Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-zinc-800">
        {/* Tier Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-300 block uppercase tracking-wider">
            Pyramid Tier (Height)
          </label>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
            {[1, 2, 3, 4].map((t) => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  tier === t ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Tier {t}
              </button>
            ))}
          </div>
        </div>

        {/* Array Type (Single / Quad) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-300 block uppercase tracking-wider">
            Beacon Array Type
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
            {[
              { id: 'single', name: 'Single (1 Beam)' },
              { id: 'quad', name: 'Quad (4 Beams)' },
              { id: 'six', name: 'Six (All Buffs)' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setBeaconType(type.id as any)}
                className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                  beaconType === type.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mineral Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-300 block uppercase tracking-wider">
            Base Mineral Block
          </label>
          <select
            value={mineralType}
            onChange={(e) => setMineralType(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
          >
            {Object.entries(minerals).map(([key, min]) => (
              <option key={key} value={key}>{min.name} Blocks</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Results Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Mineral Blocks */}
        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Mineral Blocks</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            {calculation.totalBlocks} <span className="text-xs font-normal text-zinc-400">blocks</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            ~{calculation.blockStacks} stacks (64)
          </span>
        </div>

        {/* Total Raw Ingots / Gems */}
        <div className="bg-zinc-950 border border-amber-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Raw {minerals[mineralType].item}s</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 my-1 block">
            {calculation.totalIngots.toLocaleString()}
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            {calculation.fullStacks} stacks + {calculation.remainderIngots} ingots
          </span>
        </div>

        {/* Range */}
        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Buff Radial Range</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
            {calculation.range} <span className="text-xs font-normal text-zinc-400">blocks</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Down to bedrock, up to build limit
          </span>
        </div>

        {/* Duration */}
        <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Effect Refresh Duration</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
            {calculation.durationSecs} <span className="text-xs font-normal text-zinc-400">seconds</span>
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">
            Refreshes every 4 seconds
          </span>
        </div>
      </div>

      {/* Layer-by-Layer Dimensions Breakdown */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-emerald-400" />
          Pyramid Construction Layers (Top to Bottom)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {calculation.layersBreakdown.map((layer) => (
            <div key={layer.layer} className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-zinc-200">Layer {layer.layer}</span>
                <span className="font-mono text-emerald-400">{layer.size}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-[11px]">
                <span>Blocks:</span>
                <span className="font-mono font-bold text-white">{layer.blocks} blocks</span>
              </div>
              <div className="flex justify-between text-zinc-500 text-[10px] pt-1 border-t border-zinc-800/80 mt-1">
                <span>Ingots:</span>
                <span className="font-mono">{layer.blocks * 9} ingots</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
