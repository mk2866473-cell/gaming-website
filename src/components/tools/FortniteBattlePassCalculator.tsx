/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Trophy, Calendar, Clock, Check, AlertTriangle, Sparkles, TrendingUp, Award
} from 'lucide-react';
import { FORTNITE_CONSTANTS } from '../../data/fortniteData';

export default function FortniteBattlePassCalculator() {
  const [currentLevel, setCurrentLevel] = useState<number>(62);
  const [targetGoal, setTargetGoal] = useState<number>(200); // 100, 150, 200
  const [daysRemainingInSeason, setDaysRemainingInSeason] = useState<number>(35);
  const [totalSeasonDays, setTotalSeasonDays] = useState<number>(75);

  const pacing = useMemo(() => {
    const cur = Math.max(1, currentLevel);
    const tgt = Math.max(cur, targetGoal);
    const daysLeft = Math.max(1, daysRemainingInSeason);
    const totalDays = Math.max(daysLeft, totalSeasonDays);
    const daysPassed = totalDays - daysLeft;

    const levelsRemaining = tgt - cur;
    const requiredLevelsPerDay = (levelsRemaining / daysLeft).toFixed(2);
    const requiredXpPerDay = Math.round((levelsRemaining * FORTNITE_CONSTANTS.XP_PER_LEVEL) / daysLeft);

    // Expected level today if progressing evenly
    const expectedLevelToday = Math.round((daysPassed / totalDays) * tgt);
    const levelDifference = cur - expectedLevelToday;
    const isOnTrack = levelDifference >= 0;

    return {
      cur,
      tgt,
      daysLeft,
      levelsRemaining,
      requiredLevelsPerDay,
      requiredXpPerDay,
      expectedLevelToday,
      levelDifference,
      isOnTrack
    };
  }, [currentLevel, targetGoal, daysRemainingInSeason, totalSeasonDays]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* On-Track Status Banner */}
      {pacing.isOnTrack ? (
        <div className="p-4 bg-emerald-950/50 border border-emerald-500/50 rounded-xl flex items-center justify-between gap-3 text-emerald-300">
          <div className="flex items-center gap-2.5">
            <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                You Are Ahead of Schedule! (+{pacing.levelDifference} Levels Ahead)
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Expected level today was {pacing.expectedLevelToday}. Keep your current pace to unlock all Level {pacing.tgt} rewards early.
              </p>
            </div>
          </div>
          <span className="text-sm font-mono font-bold text-emerald-400">
            {pacing.requiredLevelsPerDay} Lvls / Day
          </span>
        </div>
      ) : (
        <div className="p-4 bg-amber-950/60 border border-amber-500/50 rounded-xl flex items-center justify-between gap-3 text-amber-200">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                Behind Pace ({Math.abs(pacing.levelDifference)} Levels Behind Expected)
              </span>
              <p className="text-xs text-amber-300 mt-0.5">
                You should be Level {pacing.expectedLevelToday} today. Increase your daily XP to {pacing.requiredLevelsPerDay} levels/day.
              </p>
            </div>
          </div>
          <span className="text-sm font-mono font-bold text-amber-400">
            {pacing.requiredLevelsPerDay} Lvls / Day
          </span>
        </div>
      )}

      {/* Target Goal Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
        {[
          { level: 100, name: 'Level 100 (Base Pass)' },
          { level: 150, name: 'Level 150 (Super Styles)' },
          { level: 200, name: 'Level 200 (Full Max)' }
        ].map((tab) => (
          <button
            key={tab.level}
            onClick={() => setTargetGoal(tab.level)}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              targetGoal === tab.level ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Current Level */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            Your Current Level
          </label>
          <input
            type="number"
            min="1"
            max="1000"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xl font-bold font-mono text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Days Left */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
            Days Remaining in Season
          </label>
          <input
            type="number"
            min="1"
            max="120"
            value={daysRemainingInSeason}
            onChange={(e) => setDaysRemainingInSeason(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xl font-bold font-mono text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Total Season Duration */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
            Total Season Length (Days)
          </label>
          <input
            type="number"
            min="30"
            max="150"
            value={totalSeasonDays}
            onChange={(e) => setTotalSeasonDays(Math.max(30, parseInt(e.target.value, 10) || 30))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xl font-bold font-mono text-white focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Pacing Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-amber-500/50 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Required Daily Level Pace</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 my-1 block">
            {pacing.requiredLevelsPerDay} <span className="text-xs font-normal text-zinc-400">levels/day</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {pacing.requiredXpPerDay.toLocaleString()} XP needed per day
          </span>
        </div>

        <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-cyan-400 block">Levels Left to Goal</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
            {pacing.levelsRemaining} <span className="text-xs font-normal text-zinc-400">levels</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Across {pacing.daysLeft} days remaining
          </span>
        </div>

        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">Ideal Level Today</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            Level {pacing.expectedLevelToday}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Based on linear season progression
          </span>
        </div>
      </div>
    </div>
  );
}
