/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Award, Zap, Check, ArrowRight, Trophy, Sparkles
} from 'lucide-react';
import { FORTNITE_CONSTANTS } from '../../data/fortniteData';

export default function FortniteLevelCalculator() {
  const [totalXp, setTotalXp] = useState<number>(4800000); // Level 60 equivalent

  const stats = useMemo(() => {
    const rawXp = Math.max(0, totalXp);
    // Level 1 starts at 0 XP
    const calculatedLevel = Math.floor(rawXp / FORTNITE_CONSTANTS.XP_PER_LEVEL) + 1;
    const remainderXp = rawXp % FORTNITE_CONSTANTS.XP_PER_LEVEL;
    const progressPercent = ((remainderXp / FORTNITE_CONSTANTS.XP_PER_LEVEL) * 100).toFixed(1);
    const xpToNextLevel = FORTNITE_CONSTANTS.XP_PER_LEVEL - remainderXp;
    const battleStars = (calculatedLevel - 1) * FORTNITE_CONSTANTS.BATTLE_STARS_PER_LEVEL;

    return {
      rawXp,
      calculatedLevel,
      remainderXp,
      progressPercent,
      xpToNextLevel,
      battleStars
    };
  }, [totalXp]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Quick Level Milestones */}
      <div className="flex flex-wrap gap-2 items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
        <span className="font-semibold text-zinc-400">Jump to XP:</span>
        {[
          { label: 'Level 50 (3.92M XP)', xp: 3920000 },
          { label: 'Level 100 (7.92M XP)', xp: 7920000 },
          { label: 'Level 150 (11.92M XP)', xp: 11920000 },
          { label: 'Level 200 (15.92M XP)', xp: 15920000 }
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => setTotalXp(preset.xp)}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-[11px] transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Main Input */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Total Season Cumulative Experience (XP)
          </label>
          <span className="text-xs font-mono text-zinc-400">80,000 XP per level</span>
        </div>
        <input
          type="number"
          min="0"
          value={totalXp}
          onChange={(e) => setTotalXp(Math.max(0, parseInt(e.target.value, 10) || 0))}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-2xl font-extrabold font-mono text-white focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Primary Result Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-amber-500/50 rounded-xl p-4 text-center shadow-lg shadow-amber-950/30">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Your Exact Season Level</span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 my-1 block">
            Level {stats.calculatedLevel}
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            {stats.progressPercent}% of current level complete
          </span>
        </div>

        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-cyan-400 block">XP to Next Level</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
            {stats.xpToNextLevel.toLocaleString()} <span className="text-xs font-normal text-zinc-400">XP</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {stats.remainderXp.toLocaleString()} / 80,000 XP
          </span>
        </div>

        <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-purple-300 block">Battle Stars Acquired</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
            {stats.battleStars} <span className="text-xs font-normal text-zinc-400">Stars</span>
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">
            5 Stars per level earned
          </span>
        </div>
      </div>
    </div>
  );
}
