/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, Trophy, Target, Clock, Check, Sparkles, Flame
} from 'lucide-react';
import { FORTNITE_CONSTANTS } from '../../data/fortniteData';

export default function FortniteXpRequiredCalculator() {
  const [startLevel, setStartLevel] = useState<number>(30);
  const [endLevel, setEndLevel] = useState<number>(100);

  const stats = useMemo(() => {
    const s = Math.max(1, startLevel);
    const e = Math.max(s, endLevel);
    const levelsDiff = e - s;
    const totalXpRequired = levelsDiff * FORTNITE_CONSTANTS.XP_PER_LEVEL;

    // Breakdown into game modes:
    // BR Matches (~15k XP each with elims & top 10 survival)
    const brMatches = Math.ceil(totalXpRequired / 15000);
    // Creative Play (~60k XP per 15 min session)
    const creativeHours = (totalXpRequired / 240000).toFixed(1);
    // Daily match quests (3 quests = 60k XP)
    const dailyQuestDays = Math.ceil(totalXpRequired / 60000);
    // Weekly Quests (~25k XP each)
    const weeklyQuests = Math.ceil(totalXpRequired / 25000);

    return {
      s,
      e,
      levelsDiff,
      totalXpRequired,
      brMatches,
      creativeHours,
      dailyQuestDays,
      weeklyQuests,
      battleStars: levelsDiff * FORTNITE_CONSTANTS.BATTLE_STARS_PER_LEVEL
    };
  }, [startLevel, endLevel]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Target Presets */}
      <div className="flex flex-wrap gap-2 items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
        <span className="font-semibold text-zinc-400">Quick Level Spans:</span>
        {[
          { label: 'Level 1 → 100 (Tier 100)', s: 1, e: 100 },
          { label: 'Level 100 → 150 (Super Styles)', s: 100, e: 150 },
          { label: 'Level 100 → 200 (Full Bonus)', s: 100, e: 200 },
          { label: 'Level 1 → 200 (Complete Season)', s: 1, e: 200 }
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => { setStartLevel(preset.s); setEndLevel(preset.e); }}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-[11px] transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-amber-400 uppercase tracking-wider">Starting Level: {startLevel}</span>
          </div>
          <input
            type="range"
            min="1"
            max="300"
            value={startLevel}
            onChange={(e) => setStartLevel(parseInt(e.target.value, 10))}
            className="w-full accent-amber-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-cyan-400 uppercase tracking-wider">Target Level: {endLevel}</span>
          </div>
          <input
            type="range"
            min="1"
            max="300"
            value={endLevel}
            onChange={(e) => setEndLevel(parseInt(e.target.value, 10))}
            className="w-full accent-cyan-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Main Output Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-950 border border-amber-500/50 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Total XP Required</span>
          <span className="text-2xl font-extrabold font-mono text-amber-400 my-1 block">
            {stats.totalXpRequired.toLocaleString()}
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            {stats.levelsDiff} levels @ 80k each
          </span>
        </div>

        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-cyan-400 block">BR Matches Equivalent</span>
          <span className="text-2xl font-extrabold font-mono text-cyan-400 my-1 block">
            ~{stats.brMatches} <span className="text-xs font-normal text-zinc-400">matches</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            @ ~15k XP per match
          </span>
        </div>

        <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-purple-300 block">Creative Maps Playtime</span>
          <span className="text-2xl font-extrabold font-mono text-purple-300 my-1 block">
            ~{stats.creativeHours} <span className="text-xs font-normal text-zinc-400">hours</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            AFK / Deathrun / Tycoons
          </span>
        </div>

        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">Battle Stars Unlocked</span>
          <span className="text-2xl font-extrabold font-mono text-emerald-400 my-1 block">
            +{stats.battleStars}
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">
            Claim shop rewards
          </span>
        </div>
      </div>
    </div>
  );
}
