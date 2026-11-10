/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, Timer, Cpu, ArrowRightLeft, Sparkles, Check, Copy
} from 'lucide-react';

export default function MinecraftRedstoneTickCalculator() {
  const [redstoneTicks, setRedstoneTicks] = useState<number>(10); // Default 1.0 second (10 rt)
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const conversions = useMemo(() => {
    const rt = Math.max(0, redstoneTicks);
    const gameTicks = rt * 2;
    const seconds = rt * 0.1;
    const milliseconds = rt * 100;
    const frequencyHz = seconds > 0 ? (1 / seconds).toFixed(2) : '0';

    // Component equivalents
    const repeaters4Tick = Math.floor(rt / 4);
    const remainderAfter4 = rt % 4;
    const repeaters3Tick = Math.floor(remainderAfter4 / 3);
    const remainderAfter3 = remainderAfter4 % 3;
    const repeaters2Tick = Math.floor(remainderAfter3 / 2);
    const repeaters1Tick = remainderAfter3 % 2;

    // Hopper transfer: 1 item per 8 game ticks (4 redstone ticks / 0.4s)
    const hopperItemsTransferred = (gameTicks / 8).toFixed(1);

    // Hopper clock item requirement: 2 hoppers pass items back and forth (8 gt per item each direction)
    const hopperClockItems = Math.max(1, Math.round(seconds / 0.8));

    return {
      rt,
      gameTicks,
      seconds: seconds.toFixed(2),
      milliseconds,
      frequencyHz,
      repeaters4Tick,
      repeaters3Tick,
      repeaters2Tick,
      repeaters1Tick,
      totalRepeaters: repeaters4Tick + repeaters3Tick + repeaters2Tick + repeaters1Tick,
      hopperItemsTransferred,
      hopperClockItems
    };
  }, [redstoneTicks]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Quick Timing Presets */}
      <div className="flex flex-wrap gap-2 items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
        <span className="font-semibold text-zinc-400">Quick Presets:</span>
        {[
          { label: 'Observer Pulse (1 RT / 2 GT)', rt: 1 },
          { label: 'Comparator Delay (1 RT / 0.1s)', rt: 1 },
          { label: 'Hopper 1 Item (4 RT / 8 GT)', rt: 4 },
          { label: '1 Full Second (10 RT / 20 GT)', rt: 10 },
          { label: 'Item Despawn Timer (5 Min / 3000 RT)', rt: 3000 },
          { label: 'Day/Night Cycle (20 Min / 12000 RT)', rt: 12000 }
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => setRedstoneTicks(preset.rt)}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-[11px] transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Input Slider & Direct Numbers */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4" />
            Redstone Delay Input
          </label>
          <span className="text-xs font-mono text-zinc-400">1 RT = 2 GT = 0.10s = 100ms</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] text-zinc-400 block mb-1 font-mono">Redstone Ticks (RT)</label>
            <input
              type="number"
              min="1"
              value={redstoneTicks}
              onChange={(e) => setRedstoneTicks(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-base font-bold font-mono text-rose-400 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-zinc-400 block mb-1 font-mono">Game Ticks (GT)</label>
            <input
              type="number"
              min="2"
              step="2"
              value={conversions.gameTicks}
              onChange={(e) => setRedstoneTicks(Math.max(1, Math.round((parseInt(e.target.value, 10) || 2) / 2)))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-base font-bold font-mono text-amber-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-zinc-400 block mb-1 font-mono">Real-World Time (Seconds)</label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={conversions.seconds}
              onChange={(e) => setRedstoneTicks(Math.max(1, Math.round((parseFloat(e.target.value) || 0.1) * 10)))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-base font-bold font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <input
          type="range"
          min="1"
          max="100"
          value={Math.min(100, redstoneTicks)}
          onChange={(e) => setRedstoneTicks(parseInt(e.target.value, 10))}
          className="w-full accent-rose-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
        />
      </div>

      {/* Main Timing Conversion Output Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-950 border border-rose-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Redstone Ticks (10 Hz)</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400 my-1 block">
            {conversions.rt.toLocaleString()} <span className="text-xs font-normal text-zinc-400">RT</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {conversions.frequencyHz} Hz clock
          </span>
        </div>

        <div className="bg-zinc-950 border border-amber-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Game Ticks (20 Hz)</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 my-1 block">
            {conversions.gameTicks.toLocaleString()} <span className="text-xs font-normal text-zinc-400">GT</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            50ms per game tick
          </span>
        </div>

        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Exact Real Time</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            {conversions.seconds}s
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {conversions.milliseconds.toLocaleString()} milliseconds
          </span>
        </div>

        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Hopper Transfer Capacity</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
            {conversions.hopperItemsTransferred} <span className="text-xs font-normal text-zinc-400">items</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            @ 8 GT per item
          </span>
        </div>
      </div>

      {/* Repeater Array Configuration Recommendation */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          Optimal Repeater Array for this Delay ({conversions.totalRepeaters} Total Repeaters)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <span className="text-zinc-400 block text-[11px]">4-Tick Repeaters:</span>
            <strong className="text-base font-mono text-emerald-400">{conversions.repeaters4Tick}x</strong>
          </div>
          <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <span className="text-zinc-400 block text-[11px]">3-Tick Repeaters:</span>
            <strong className="text-base font-mono text-cyan-400">{conversions.repeaters3Tick}x</strong>
          </div>
          <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <span className="text-zinc-400 block text-[11px]">2-Tick Repeaters:</span>
            <strong className="text-base font-mono text-amber-400">{conversions.repeaters2Tick}x</strong>
          </div>
          <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <span className="text-zinc-400 block text-[11px]">1-Tick Repeaters:</span>
            <strong className="text-base font-mono text-purple-400">{conversions.repeaters1Tick}x</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
