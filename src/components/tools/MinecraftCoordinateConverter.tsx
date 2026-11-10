/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Compass, Map, FolderGit2, Navigation, ArrowRight, Copy, Check, 
  Timer, Footprints, Wind, Flame
} from 'lucide-react';

export default function MinecraftCoordinateConverter() {
  // Point A (Current)
  const [posX, setPosX] = useState<number>(1450);
  const [posY, setPosY] = useState<number>(72);
  const [posZ, setPosZ] = useState<number>(-860);

  // Point B (Destination for distance calculations)
  const [destX, setDestX] = useState<number>(3200);
  const [destY, setDestY] = useState<number>(64);
  const [destZ, setDestZ] = useState<number>(1500);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Calculations for Point A
  const chunkData = useMemo(() => {
    const chunkX = Math.floor(posX / 16);
    const chunkZ = Math.floor(posZ / 16);
    const subX = ((posX % 16) + 16) % 16;
    const subZ = ((posZ % 16) + 16) % 16;
    const regionX = Math.floor(posX / 512);
    const regionZ = Math.floor(posZ / 512);
    const regionFile = `r.${regionX}.${regionZ}.mca`;

    // Nether equivalent
    const netherX = Math.floor(posX / 8);
    const netherZ = Math.floor(posZ / 8);

    return {
      chunkX,
      chunkZ,
      subX,
      subZ,
      regionX,
      regionZ,
      regionFile,
      netherX,
      netherZ
    };
  }, [posX, posY, posZ]);

  // Distance & Travel estimation
  const travelStats = useMemo(() => {
    const dx = destX - posX;
    const dy = destY - posY;
    const dz = destZ - posZ;

    const dist2D = Math.hypot(dx, dz);
    const dist3D = Math.hypot(dx, dy, dz);

    const walkingTimeSec = Math.round(dist2D / 4.3);
    const sprintJumpTimeSec = Math.round(dist2D / 7.1);
    const elytraTimeSec = Math.round(dist2D / 30.0);
    const netherHighwaySec = Math.round((dist2D / 8) / 7.1);

    return {
      dist2D: Math.round(dist2D),
      dist3D: Math.round(dist3D),
      walkingTime: formatTime(walkingTimeSec),
      sprintJumpTime: formatTime(sprintJumpTimeSec),
      elytraTime: formatTime(elytraTimeSec),
      netherHighwayTime: formatTime(netherHighwaySec),
      netherDistance: Math.round(dist2D / 8)
    };
  }, [posX, posY, posZ, destX, destY, destZ]);

  function formatTime(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Point A Coordinate Input Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-wrap justify-between items-center pb-3 mb-4 border-b border-zinc-800 gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-zinc-100">
              Primary Block Coordinates (Point A)
            </h2>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            Read from F3 Screen (XYZ)
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">X Coordinate</label>
            <input
              type="number"
              value={posX}
              onChange={(e) => setPosX(parseInt(e.target.value, 10) || 0)}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg p-2.5 text-sm font-mono text-white text-center focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Y Coordinate (Altitude)</label>
            <input
              type="number"
              value={posY}
              onChange={(e) => setPosY(parseInt(e.target.value, 10) || 64)}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg p-2.5 text-sm font-mono text-white text-center focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Z Coordinate</label>
            <input
              type="number"
              value={posZ}
              onChange={(e) => setPosZ(parseInt(e.target.value, 10) || 0)}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg p-2.5 text-sm font-mono text-white text-center focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Spatial Breakdown Grid: Chunks, Region File, Nether Equivalents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Chunk Coordinates */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-800 text-cyan-400">
            <Map className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Chunk Coordinates
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Chunk X, Z:</span>
              <span className="font-mono text-white font-bold bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                {chunkData.chunkX}, {chunkData.chunkZ}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">In-Chunk Block Offset (0-15):</span>
              <span className="font-mono text-cyan-400 font-bold bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                [{chunkData.subX}, {chunkData.subZ}]
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Chunk Boundaries:</span>
              <span className="font-mono text-zinc-400 text-[11px]">
                {chunkData.chunkX * 16} to {chunkData.chunkX * 16 + 15}
              </span>
            </div>
          </div>
        </div>

        {/* Region File (*.mca) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-800 text-purple-400">
            <FolderGit2 className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Region File (.mca)
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">World Save File:</span>
              <button
                onClick={() => handleCopy(chunkData.regionFile, 'mca')}
                className="font-mono text-purple-300 font-bold bg-zinc-950 px-2.5 py-1 rounded border border-purple-900/40 hover:bg-zinc-800 flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === 'mca' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {chunkData.regionFile}
              </button>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Region Coords:</span>
              <span className="font-mono text-zinc-300">
                r.{chunkData.regionX}.{chunkData.regionZ}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 pt-1">
              Use this file name in MCA Selector or NBT tools to reset or backup chunks.
            </p>
          </div>
        </div>

        {/* Nether Highway Point */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-800 text-rose-400">
            <Flame className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Nether Equivalent
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Nether Portal Point:</span>
              <button
                onClick={() => handleCopy(`${chunkData.netherX} ${posY} ${chunkData.netherZ}`, 'nether-coords')}
                className="font-mono text-rose-300 font-bold bg-zinc-950 px-2.5 py-1 rounded border border-rose-900/40 hover:bg-zinc-800 flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === 'nether-coords' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {chunkData.netherX}, {posY}, {chunkData.netherZ}
              </button>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Overworld/Nether Ratio:</span>
              <span className="font-mono text-zinc-300">8 to 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Point A to Point B Distance & Navigation Estimator */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800">
          <Navigation className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-zinc-100">
            Waypoint Distance & Travel Time Estimator
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Destination Target (Point B)
            </label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 block mb-1">Target X</span>
                <input
                  type="number"
                  value={destX}
                  onChange={(e) => setDestX(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-xs font-mono text-white text-center"
                />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-500 block mb-1">Target Y</span>
                <input
                  type="number"
                  value={destY}
                  onChange={(e) => setDestY(parseInt(e.target.value, 10) || 64)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-xs font-mono text-white text-center"
                />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-500 block mb-1">Target Z</span>
                <input
                  type="number"
                  value={destZ}
                  onChange={(e) => setDestZ(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-xs font-mono text-white text-center"
                />
              </div>
            </div>

            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Horizontal 2D Distance:</span>
                <span className="font-mono text-emerald-400 font-bold">{travelStats.dist2D.toLocaleString()} blocks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">True 3D Euclidean Distance:</span>
                <span className="font-mono text-white font-bold">{travelStats.dist3D.toLocaleString()} blocks</span>
              </div>
            </div>
          </div>

          {/* Travel Speeds comparison */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Travel Time Comparison
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
                  <Footprints className="w-3.5 h-3.5" />
                  <span>Sprint-Jumping</span>
                </div>
                <span className="text-base font-bold font-mono text-zinc-200">{travelStats.sprintJumpTime}</span>
                <span className="text-[10px] text-zinc-500 block">7.1 blocks/sec</span>
              </div>

              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs mb-1">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Elytra Rockets</span>
                </div>
                <span className="text-base font-bold font-mono text-cyan-300">{travelStats.elytraTime}</span>
                <span className="text-[10px] text-zinc-500 block">~30 blocks/sec</span>
              </div>

              <div className="col-span-2 bg-purple-950/30 border border-purple-500/30 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-purple-300 text-xs font-semibold mb-0.5">
                    <Flame className="w-3.5 h-3.5 text-purple-400" />
                    <span>Nether Highway Tunnel</span>
                  </div>
                  <span className="text-[11px] text-zinc-400">Only {travelStats.netherDistance} Nether blocks!</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono text-purple-300">{travelStats.netherHighwayTime}</span>
                  <span className="text-[10px] text-emerald-400 block font-semibold">87.5% time saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
