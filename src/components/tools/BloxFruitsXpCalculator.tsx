/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, Clock, Compass, Shield, Check, Trophy, Sparkles, Flame, ChevronRight
} from 'lucide-react';
import { BLOX_FRUITS_GAME_CONSTANTS } from '../../data/robloxData';

export default function BloxFruitsXpCalculator() {
  const [currentLevel, setCurrentLevel] = useState<number>(700);
  const [targetLevel, setTargetLevel] = useState<number>(2600);
  const [has2xExpBoost, setHas2xExpBoost] = useState<boolean>(true);
  const [hasBuddhaFruit, setHasBuddhaFruit] = useState<boolean>(true);

  const stats = useMemo(() => {
    const cur = Math.max(1, Math.min(BLOX_FRUITS_GAME_CONSTANTS.MAX_LEVEL, currentLevel));
    const tgt = Math.max(cur, Math.min(BLOX_FRUITS_GAME_CONSTANTS.MAX_LEVEL, targetLevel));

    const levelsToGain = tgt - cur;
    const statPointsGained = levelsToGain * BLOX_FRUITS_GAME_CONSTANTS.STAT_POINTS_PER_LEVEL;

    // Approximate XP progression curve in Blox Fruits:
    // XP for level L ~ 50 * L^1.6
    let totalXpNeeded = 0;
    for (let l = cur; l < tgt; l++) {
      totalXpNeeded += Math.round(55 * Math.pow(l, 1.62));
    }

    // Average grinding speed in Blox Fruits (levels/hr)
    // Base ~ 30-40 levels/hr in First Sea, ~ 20-25 levels/hr in Second Sea, ~ 12-18 levels/hr in Third Sea
    let avgLevelsPerHour = 20;
    if (has2xExpBoost) avgLevelsPerHour *= 2;
    if (hasBuddhaFruit) avgLevelsPerHour *= 1.4; // Buddha transforms M1 grinding speed

    const estimatedHours = levelsToGain > 0 ? (levelsToGain / avgLevelsPerHour).toFixed(1) : '0';

    // Current Sea Identification
    let currentSea = 'First Sea (Old World)';
    let targetSea = 'Third Sea';
    if (cur >= 1500) currentSea = 'Third Sea';
    else if (cur >= 700) currentSea = 'Second Sea';

    if (tgt >= 1500) targetSea = 'Third Sea';
    else if (tgt >= 700) targetSea = 'Second Sea';
    else targetSea = 'First Sea';

    return {
      cur,
      tgt,
      levelsToGain,
      statPointsGained,
      totalXpNeeded,
      estimatedHours,
      currentSea,
      targetSea
    };
  }, [currentLevel, targetLevel, has2xExpBoost, hasBuddhaFruit]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Quick Level Presets */}
      <div className="flex flex-wrap gap-2 items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
        <span className="font-semibold text-zinc-400">Milestone Presets:</span>
        {[
          { label: 'Start → Second Sea (1 → 700)', c: 1, t: 700 },
          { label: 'Second Sea → Third Sea (700 → 1500)', c: 700, t: 1500 },
          { label: 'Third Sea → Max Level (1500 → 2600)', c: 1500, t: 2600 },
          { label: 'Fresh Level 1 → Max Level (1 → 2600)', c: 1, t: 2600 }
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => { setCurrentLevel(preset.c); setTargetLevel(preset.t); }}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-[11px] transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Input Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Level */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">
              Current Level: <span className="font-mono text-white text-base">{currentLevel}</span>
            </label>
            <span className="text-xs font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
              {stats.currentSea}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max={BLOX_FRUITS_GAME_CONSTANTS.MAX_LEVEL}
            value={currentLevel}
            onChange={(e) => setCurrentLevel(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Target Level */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">
              Target Goal Level: <span className="font-mono text-white text-base">{targetLevel}</span>
            </label>
            <span className="text-xs font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
              {stats.targetSea}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max={BLOX_FRUITS_GAME_CONSTANTS.MAX_LEVEL}
            value={targetLevel}
            onChange={(e) => setTargetLevel(parseInt(e.target.value, 10))}
            className="w-full accent-cyan-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Buff Boost Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={has2xExpBoost}
            onChange={(e) => setHas2xExpBoost(e.target.checked)}
            className="w-4 h-4 rounded accent-emerald-500 bg-zinc-900 border-zinc-700 cursor-pointer"
          />
          <div>
            <span className="text-xs font-bold text-zinc-200 block">2× EXP Codes / Gamepass Active</span>
            <span className="text-[11px] text-zinc-500">Doubles quest XP earning speed</span>
          </div>
        </label>

        <label className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={hasBuddhaFruit}
            onChange={(e) => setHasBuddhaFruit(e.target.checked)}
            className="w-4 h-4 rounded accent-amber-500 bg-zinc-900 border-zinc-700 cursor-pointer"
          />
          <div>
            <span className="text-xs font-bold text-zinc-200 block">Awakened Buddha Fruit Equipped</span>
            <span className="text-[11px] text-zinc-500">Fastest mob M1 spam grinding speed</span>
          </div>
        </label>
      </div>

      {/* Summary Output Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Levels to Grind</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            +{stats.levelsToGain} <span className="text-xs font-normal text-zinc-400">Levels</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            +{stats.statPointsGained} Stat Points
          </span>
        </div>

        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total XP Needed</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
            {stats.totalXpNeeded.toLocaleString()}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Cumulative quest experience
          </span>
        </div>

        <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-purple-300 block">Estimated Playtime</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
            ~{stats.estimatedHours} <span className="text-xs font-normal text-zinc-400">Hours</span>
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">
            Fast Track Grinding
          </span>
        </div>
      </div>
    </div>
  );
}
