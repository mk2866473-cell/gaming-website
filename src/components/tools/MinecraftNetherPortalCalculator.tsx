/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  ArrowRightLeft, Copy, Check, Info, ShieldAlert, Navigation, 
  MapPin, Compass, Flame, Trees
} from 'lucide-react';

export default function MinecraftNetherPortalCalculator() {
  const [direction, setDirection] = useState<'overworldToNether' | 'netherToOverworld'>('overworldToNether');
  
  // Overworld coords
  const [owX, setOwX] = useState<number>(800);
  const [owY, setOwY] = useState<number>(64);
  const [owZ, setOwZ] = useState<number>(-1200);

  // Nether coords
  const [netherX, setNetherX] = useState<number>(100);
  const [netherY, setNetherY] = useState<number>(64);
  const [netherZ, setNetherZ] = useState<number>(-150);

  // Secondary portal for linking test
  const [enableLinkingCheck, setEnableLinkingCheck] = useState<boolean>(true);
  const [secondOwX, setSecondOwX] = useState<number>(1200);
  const [secondOwZ, setSecondOwZ] = useState<number>(-1200);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Calculated values based on active direction
  const computedNether = useMemo(() => {
    return {
      x: Math.floor(owX / 8),
      y: owY,
      z: Math.floor(owZ / 8)
    };
  }, [owX, owY, owZ]);

  const computedOverworld = useMemo(() => {
    return {
      x: netherX * 8,
      y: netherY,
      z: netherZ * 8
    };
  }, [netherX, netherY, netherZ]);

  // Secondary distance check
  const portalAnalysis = useMemo(() => {
    const owDist = Math.hypot(secondOwX - owX, secondOwZ - owZ);
    const netherDist = owDist / 8;
    const isConflictLikely = owDist < 1024; // If closer than 1024 blocks in OW (128 in Nether), default portals might hijack each other

    return {
      owDist: Math.round(owDist),
      netherDist: Math.round(netherDist * 10) / 10,
      isConflictLikely
    };
  }, [owX, owZ, secondOwX, secondOwZ]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl backdrop-blur">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDirection('overworldToNether')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              direction === 'overworldToNether'
                ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300'
                : 'bg-zinc-800/60 border border-zinc-700/60 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Trees className="w-4 h-4 text-emerald-400" />
            Overworld → Nether (Divide by 8)
          </button>
          <button
            onClick={() => setDirection('netherToOverworld')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              direction === 'netherToOverworld'
                ? 'bg-purple-500/20 border border-purple-500 text-purple-300'
                : 'bg-zinc-800/60 border border-zinc-700/60 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Flame className="w-4 h-4 text-purple-400" />
            Nether → Overworld (Multiply by 8)
          </button>
        </div>

        <span className="text-xs text-zinc-400 font-mono">
          Ratio: 1 Nether Block = 8 Overworld Blocks
        </span>
      </div>

      {/* Main Coordinate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Dimension Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {direction === 'overworldToNether' ? <Trees className="w-5 h-5" /> : <Flame className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-100">
                  {direction === 'overworldToNether' ? 'Overworld Coordinates (Source)' : 'Nether Coordinates (Source)'}
                </h2>
                <p className="text-[11px] text-zinc-400">Enter your in-game portal location</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {direction === 'overworldToNether' ? (
              <>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">X Coord</label>
                  <input
                    type="number"
                    value={owX}
                    onChange={(e) => setOwX(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg p-2.5 text-sm font-mono text-white text-center focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Y (Height)</label>
                  <input
                    type="number"
                    value={owY}
                    onChange={(e) => setOwY(parseInt(e.target.value, 10) || 64)}
                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg p-2.5 text-sm font-mono text-white text-center focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Z Coord</label>
                  <input
                    type="number"
                    value={owZ}
                    onChange={(e) => setOwZ(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg p-2.5 text-sm font-mono text-white text-center focus:outline-none"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Nether X</label>
                  <input
                    type="number"
                    value={netherX}
                    onChange={(e) => setNetherX(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-purple-500 rounded-lg p-2.5 text-sm font-mono text-white text-center focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Nether Y</label>
                  <input
                    type="number"
                    value={netherY}
                    onChange={(e) => setNetherY(parseInt(e.target.value, 10) || 64)}
                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-purple-500 rounded-lg p-2.5 text-sm font-mono text-white text-center focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Nether Z</label>
                  <input
                    type="number"
                    value={netherZ}
                    onChange={(e) => setNetherZ(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-purple-500 rounded-lg p-2.5 text-sm font-mono text-white text-center focus:outline-none"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>Minecraft 1.14 - 1.21+</span>
            <span>Scale: 1:1 Height Y</span>
          </div>
        </div>

        {/* Target Dimension Result Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                {direction === 'overworldToNether' ? <Flame className="w-5 h-5" /> : <Trees className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-100">
                  {direction === 'overworldToNether' ? 'Target Nether Coordinates (Exact)' : 'Target Overworld Coordinates (Exact)'}
                </h2>
                <p className="text-[11px] text-purple-400">Build your matching portal here</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {direction === 'overworldToNether' ? (
              <>
                <div className="bg-zinc-950 border border-purple-500/30 rounded-lg p-3 text-center">
                  <span className="text-xs text-zinc-500 font-mono block">Nether X</span>
                  <span className="text-xl font-bold font-mono text-purple-300">{computedNether.x}</span>
                </div>
                <div className="bg-zinc-950 border border-purple-500/30 rounded-lg p-3 text-center">
                  <span className="text-xs text-zinc-500 font-mono block">Nether Y</span>
                  <span className="text-xl font-bold font-mono text-purple-300">{computedNether.y}</span>
                </div>
                <div className="bg-zinc-950 border border-purple-500/30 rounded-lg p-3 text-center">
                  <span className="text-xs text-zinc-500 font-mono block">Nether Z</span>
                  <span className="text-xl font-bold font-mono text-purple-300">{computedNether.z}</span>
                </div>
              </>
            ) : (
              <>
                <div className="bg-zinc-950 border border-emerald-500/30 rounded-lg p-3 text-center">
                  <span className="text-xs text-zinc-500 font-mono block">Overworld X</span>
                  <span className="text-xl font-bold font-mono text-emerald-300">{computedOverworld.x}</span>
                </div>
                <div className="bg-zinc-950 border border-emerald-500/30 rounded-lg p-3 text-center">
                  <span className="text-xs text-zinc-500 font-mono block">Overworld Y</span>
                  <span className="text-xl font-bold font-mono text-emerald-300">{computedOverworld.y}</span>
                </div>
                <div className="bg-zinc-950 border border-emerald-500/30 rounded-lg p-3 text-center">
                  <span className="text-xs text-zinc-500 font-mono block">Overworld Z</span>
                  <span className="text-xl font-bold font-mono text-emerald-300">{computedOverworld.z}</span>
                </div>
              </>
            )}
          </div>

          {/* Action copy buttons */}
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap gap-2 justify-between items-center">
            {direction === 'overworldToNether' ? (
              <>
                <button
                  onClick={() => handleCopy(`/tp @s ${computedNether.x} ${computedNether.y} ${computedNether.z}`, 'tp-nether')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === 'tp-nether' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy /tp command
                </button>
                <button
                  onClick={() => handleCopy(`${computedNether.x}, ${computedNether.y}, ${computedNether.z}`, 'coords-nether')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === 'coords-nether' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy X Y Z
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleCopy(`/tp @s ${computedOverworld.x} ${computedOverworld.y} ${computedOverworld.z}`, 'tp-ow')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-200 flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === 'tp-ow' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy /tp command
                </button>
                <button
                  onClick={() => handleCopy(`${computedOverworld.x}, ${computedOverworld.y}, ${computedOverworld.z}`, 'coords-ow')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === 'coords-ow' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy X Y Z
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Portal Linking Safety Analyzer */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 backdrop-blur">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-zinc-100">
              Multi-Portal Conflict & Linking Safety Validator
            </h3>
          </div>
          <button
            onClick={() => setEnableLinkingCheck(!enableLinkingCheck)}
            className="text-xs text-zinc-400 hover:text-zinc-200 underline"
          >
            {enableLinkingCheck ? 'Hide Checker' : 'Show Checker'}
          </button>
        </div>

        {enableLinkingCheck && (
          <div className="space-y-4">
            <p className="text-xs text-zinc-400">
              Planning to build a second portal in your Overworld base? Enter its coordinates to verify whether it will safely link to its own Nether portal without getting hijacked by Portal 1.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-950/60 p-4 rounded-lg border border-zinc-800">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Second Portal Overworld X</label>
                <input
                  type="number"
                  value={secondOwX}
                  onChange={(e) => setSecondOwX(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Second Portal Overworld Z</label>
                <input
                  type="number"
                  value={secondOwZ}
                  onChange={(e) => setSecondOwZ(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-xs font-mono text-white"
                />
              </div>
            </div>

            <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
              portalAnalysis.isConflictLikely
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
            }`}>
              {portalAnalysis.isConflictLikely ? (
                <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              ) : (
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="text-xs space-y-1">
                <p className="font-semibold">
                  Distance between portals: {portalAnalysis.owDist} blocks Overworld ({portalAnalysis.netherDist} blocks Nether)
                </p>
                {portalAnalysis.isConflictLikely ? (
                  <p className="text-zinc-300">
                    Warning: Portals are under 1,024 blocks apart in the Overworld. If you simply step through a new Overworld portal, Minecraft may automatically redirect you to Portal 1 in the Nether! To fix this, <strong className="text-amber-300">you MUST manually ignite a second portal in the Nether at X: {Math.floor(secondOwX / 8)}, Z: {Math.floor(secondOwZ / 8)}</strong> before stepping through.
                  </p>
                ) : (
                  <p className="text-zinc-300">
                    Safe distance! These portals are sufficiently spaced ({portalAnalysis.owDist} &gt; 1,024 blocks) that default automatic linking will not hijack each other.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
