/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Crosshair, ArrowRightLeft, MousePointer, ShieldCheck, Check, Copy, Sparkles
} from 'lucide-react';

interface GameSensConfig {
  id: string;
  name: string;
  yaw: number; // degrees per count at sens = 1.0
}

const GAMES_LIST: GameSensConfig[] = [
  { id: 'fortnite', name: 'Fortnite (Yaw 0.005555)', yaw: 0.00555555 },
  { id: 'valorant', name: 'Valorant (Yaw 0.07)', yaw: 0.07 },
  { id: 'cs2', name: 'CS2 / CS:GO / Apex Legends / Source (Yaw 0.022)', yaw: 0.022 },
  { id: 'overwatch', name: 'Overwatch 2 / COD Warzone (Yaw 0.0066)', yaw: 0.0066 },
  { id: 'r6', name: 'Rainbow Six Siege (Yaw 0.02133)', yaw: 0.02133 },
  { id: 'roblox', name: 'Roblox (Default Camera)', yaw: 0.022 }
];

export default function FortniteSensitivityConverter() {
  const [sourceGameId, setSourceGameId] = useState<string>('valorant');
  const [sourceSens, setSourceSens] = useState<number>(0.35);
  const [sourceDpi, setSourceDpi] = useState<number>(800);

  const [targetGameId, setTargetGameId] = useState<string>('fortnite');
  const [targetDpi, setTargetDpi] = useState<number>(800);

  const conversion = useMemo(() => {
    const srcGame = GAMES_LIST.find(g => g.id === sourceGameId) || GAMES_LIST[1];
    const tgtGame = GAMES_LIST.find(g => g.id === targetGameId) || GAMES_LIST[0];

    // True physical 360 distance:
    // Degrees per count = sourceSens * srcGame.yaw
    // Counts for 360 = 360 / (sourceSens * srcGame.yaw)
    // Distance in inches = Counts / sourceDpi
    // Distance in cm = Distance in inches * 2.54
    const degreesPerCountSrc = sourceSens * srcGame.yaw;
    let cm360 = 0;
    let convertedSens = 0;

    if (degreesPerCountSrc > 0 && sourceDpi > 0) {
      const counts360 = 360 / degreesPerCountSrc;
      const inches360 = counts360 / sourceDpi;
      cm360 = inches360 * 2.54;

      // Target Sensitivity to match exact same cm/360:
      // Target counts needed at targetDpi = inches360 * targetDpi
      // Target degrees per count = 360 / Target counts
      // Target sens = Target degrees per count / tgtGame.yaw
      const targetCounts360 = inches360 * targetDpi;
      if (targetCounts360 > 0 && tgtGame.yaw > 0) {
        convertedSens = (360 / targetCounts360) / tgtGame.yaw;
      }
    }

    // In-game display formatting: Fortnite uses percentages (e.g. 8.5%)
    const formattedSens = targetGameId === 'fortnite' 
      ? `${convertedSens.toFixed(2)}%` 
      : convertedSens.toFixed(3);

    const edpi = targetGameId === 'fortnite' 
      ? (convertedSens * targetDpi / 100 * 10).toFixed(1)
      : (convertedSens * targetDpi).toFixed(1);

    return {
      convertedSens: convertedSens.toFixed(3),
      formattedSens,
      cm360: cm360.toFixed(1),
      inches360: (cm360 / 2.54).toFixed(1),
      edpi
    };
  }, [sourceGameId, sourceSens, sourceDpi, targetGameId, targetDpi]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Source vs Target Game Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Game */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            Convert From (Source Game)
          </span>

          <div className="space-y-2">
            <label className="text-[11px] text-zinc-400 block font-semibold">Game</label>
            <select
              value={sourceGameId}
              onChange={(e) => setSourceGameId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
            >
              {GAMES_LIST.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Sensitivity</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={sourceSens}
                onChange={(e) => setSourceSens(parseFloat(e.target.value) || 0.01)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm font-bold font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Mouse DPI</label>
              <input
                type="number"
                step="50"
                min="100"
                value={sourceDpi}
                onChange={(e) => setSourceDpi(parseInt(e.target.value, 10) || 800)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm font-bold font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Target Game */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
            Convert To (Target Game)
          </span>

          <div className="space-y-2">
            <label className="text-[11px] text-zinc-400 block font-semibold">Game</label>
            <select
              value={targetGameId}
              onChange={(e) => setTargetGameId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
            >
              {GAMES_LIST.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Target Mouse DPI</label>
              <input
                type="number"
                step="50"
                min="100"
                value={targetDpi}
                onChange={(e) => setTargetDpi(parseInt(e.target.value, 10) || 800)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm font-bold font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Equivalent Sens</label>
              <div className="w-full bg-zinc-900 border border-cyan-500/50 rounded-lg px-2.5 py-1.5 text-sm font-bold font-mono text-cyan-300">
                {conversion.formattedSens}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 360 Distance & Physical Metrics Output */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-cyan-500/50 rounded-xl p-4 text-center shadow-lg shadow-cyan-950/30">
          <span className="text-[10px] uppercase font-bold text-cyan-400 block">Exact Target Sensitivity</span>
          <span className="text-3xl font-extrabold font-mono text-cyan-300 my-1 block">
            {conversion.formattedSens}
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            Apply in Fortnite Mouse Settings
          </span>
        </div>

        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Physical 360° Turn Distance</span>
          <span className="text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            {conversion.cm360} <span className="text-xs font-normal text-zinc-400">cm</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {conversion.inches360} inches per full 360° turn
          </span>
        </div>

        <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Effective DPI (eDPI)</span>
          <span className="text-3xl font-extrabold font-mono text-purple-300 my-1 block">
            {conversion.edpi}
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">
            1:1 Muscle Memory Preserved
          </span>
        </div>
      </div>
    </div>
  );
}
