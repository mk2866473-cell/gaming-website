/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Compass, Navigation, Footprints, Wind, Flame, Copy, Check, 
  ArrowRight, ShieldAlert, Timer, Sparkles, Zap
} from 'lucide-react';
import { MINECRAFT_TRAVEL_MODES } from '../../data/minecraftData';

export default function MinecraftDistanceCalculator() {
  const [x1, setX1] = useState<number>(0);
  const [y1, setY1] = useState<number>(64);
  const [z1, setZ1] = useState<number>(0);

  const [x2, setX2] = useState<number>(1000);
  const [y2, setY2] = useState<number>(70);
  const [z2, setZ2] = useState<number>(1000);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Compute distances
  const stats = useMemo(() => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;

    const horizontalDist = Math.sqrt(dx * dx + dz * dz);
    const euclidean3D = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const manhattan = Math.abs(dx) + Math.abs(dy) + Math.abs(dz);

    // Nether Equivalent Travel
    const netherX1 = Math.floor(x1 / 8);
    const netherZ1 = Math.floor(z1 / 8);
    const netherX2 = Math.floor(x2 / 8);
    const netherZ2 = Math.floor(z2 / 8);
    const netherDx = netherX2 - netherX1;
    const netherDz = netherZ2 - netherZ1;
    const netherHorizontalDist = Math.sqrt(netherDx * netherDx + netherDz * netherDz);
    const netherEuclidean = Math.sqrt(netherDx * netherDx + dy * dy + netherDz * netherDz);

    return {
      dx, dy, dz,
      horizontalDist: Math.round(horizontalDist * 10) / 10,
      euclidean3D: Math.round(euclidean3D * 10) / 10,
      manhattan,
      netherHorizontalDist: Math.round(netherHorizontalDist * 10) / 10,
      netherEuclidean: Math.round(netherEuclidean * 10) / 10,
      netherX1, netherZ1, netherX2, netherZ2
    };
  }, [x1, y1, z1, x2, y2, z2]);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    const mins = Math.floor(seconds / 60);
    const remainingSecs = Math.round(seconds % 60);
    return `${mins}m ${remainingSecs}s`;
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2 items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
        <span className="font-semibold text-zinc-400">Quick Presets:</span>
        {[
          { label: 'Spawn → Stronghold (~1,500 blocks)', a: [0, 64, 0], b: [1200, 30, 900] },
          { label: 'Base → Ocean Monument (~3,000 blocks)', a: [150, 68, -200], b: [2200, 62, 2100] },
          { label: 'Base → Woodland Mansion (~12,000 blocks)', a: [0, 70, 0], b: [8500, 80, -9200] },
          { label: 'End Island Outer Rings (~1,000 blocks)', a: [0, 60, 0], b: [1000, 65, 0] }
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => {
              setX1(preset.a[0]); setY1(preset.a[1]); setZ1(preset.a[2]);
              setX2(preset.b[0]); setY2(preset.b[1]); setZ2(preset.b[2]);
            }}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Coordinate Input Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Point A (Start) */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              Point A (Starting Base)
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">X Coord</label>
              <input
                type="number"
                value={x1}
                onChange={(e) => setX1(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Y (Height)</label>
              <input
                type="number"
                value={y1}
                onChange={(e) => setY1(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Z Coord</label>
              <input
                type="number"
                value={z1}
                onChange={(e) => setZ1(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Point B (Destination) */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Navigation className="w-4 h-4" />
              Point B (Target Destination)
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">X Coord</label>
              <input
                type="number"
                value={x2}
                onChange={(e) => setX2(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Y (Height)</label>
              <input
                type="number"
                value={y2}
                onChange={(e) => setY2(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Z Coord</label>
              <input
                type="number"
                value={z2}
                onChange={(e) => setZ2(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Distance Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 3D Euclidean */}
        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1 bg-emerald-500" />
          <span className="text-[11px] uppercase font-bold text-zinc-400 block">3D True Euclidean Distance</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            {stats.euclidean3D.toLocaleString()} <span className="text-xs font-normal text-zinc-400">blocks</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            dX={stats.dx}, dY={stats.dy}, dZ={stats.dz}
          </span>
        </div>

        {/* 2D Horizontal Distance */}
        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1 bg-cyan-500" />
          <span className="text-[11px] uppercase font-bold text-zinc-400 block">2D Horizontal Surface Distance</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
            {stats.horizontalDist.toLocaleString()} <span className="text-xs font-normal text-zinc-400">blocks</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Ignoring height elevation
          </span>
        </div>

        {/* Nether Highway Distance */}
        <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1 bg-purple-500" />
          <span className="text-[11px] uppercase font-bold text-purple-300 block">Nether Tunnel Highway</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
            {stats.netherHorizontalDist.toLocaleString()} <span className="text-xs font-normal text-zinc-400">blocks</span>
          </span>
          <span className="flex items-center justify-center gap-1 text-[11px] text-emerald-400 font-semibold font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>87.5% Distance Saved (8:1)</span>
          </span>
        </div>
      </div>

      {/* Travel Times Comparison Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              Estimated Travel Time Breakdown ({MINECRAFT_TRAVEL_MODES.length} Modes)
            </h3>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            Overworld vs Nether Highway
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MINECRAFT_TRAVEL_MODES.map((mode) => {
            const overworldSeconds = stats.horizontalDist / mode.speedBlocksPerSec;
            const netherSeconds = stats.netherHorizontalDist / mode.speedBlocksPerSec;

            return (
              <div
                key={mode.id}
                className="bg-zinc-900 border border-zinc-800/90 rounded-xl p-3 flex flex-col justify-between hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-zinc-200 truncate">{mode.name}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{mode.speedBlocksPerSec} b/s</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-tight mb-2">
                    {mode.notes}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Overworld</span>
                    <strong className="font-mono text-zinc-200">{formatTime(overworldSeconds)}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-purple-400 block font-semibold">Nether Tunnel</span>
                    <strong className="font-mono text-purple-300 font-bold">{formatTime(netherSeconds)}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
