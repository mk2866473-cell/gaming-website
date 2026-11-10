/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, Trophy, Clock, Sparkles, Check, Flame, Award, Layers
} from 'lucide-react';
import { FORTNITE_CONSTANTS } from '../../data/fortniteData';

export default function FortniteXpCalculator() {
  const [currentLevel, setCurrentLevel] = useState<number>(45);
  const [targetLevel, setTargetLevel] = useState<number>(100);
  const [dailyQuestsDone, setDailyQuestsDone] = useState<number>(3); // 3 daily match quests = 60k+
  const [weeklyQuestsRemaining, setWeeklyQuestsRemaining] = useState<number>(5); // ~25k each
  const [creativeHoursPerDay, setCreativeHoursPerDay] = useState<number>(1); // ~400k max creative cap

  const stats = useMemo(() => {
    const cur = Math.max(1, Math.min(FORTNITE_CONSTANTS.MAX_ACCOUNT_LEVEL, currentLevel));
    const tgt = Math.max(cur, Math.min(FORTNITE_CONSTANTS.MAX_ACCOUNT_LEVEL, targetLevel));

    const levelsNeeded = tgt - cur;
    const totalXpNeeded = levelsNeeded * FORTNITE_CONSTANTS.XP_PER_LEVEL;
    const battleStarsEarned = levelsNeeded * FORTNITE_CONSTANTS.BATTLE_STARS_PER_LEVEL;

    // Daily XP sources:
    // Daily match quests: 3 x 20,000 = 60,000 XP
    // Creative Play: ~60,000 XP per 15 mins (up to 400,000 cap)
    const dailyQuestsXp = dailyQuestsDone * 20000;
    const dailyCreativeXp = Math.min(FORTNITE_CONSTANTS.DAILY_CREATIVE_XP_CAP, creativeHoursPerDay * 200000);
    const totalDailyXpIncome = dailyQuestsXp + dailyCreativeXp;

    const daysToTarget = totalDailyXpIncome > 0 ? (totalXpNeeded / totalDailyXpIncome).toFixed(1) : '∞';

    // Matches equivalent (~15,000 XP average per Battle Royale match with elims & survival)
    const matchesNeeded = Math.ceil(totalXpNeeded / 15000);

    return {
      cur,
      tgt,
      levelsNeeded,
      totalXpNeeded,
      battleStarsEarned,
      totalDailyXpIncome,
      daysToTarget,
      matchesNeeded
    };
  }, [currentLevel, targetLevel, dailyQuestsDone, weeklyQuestsRemaining, creativeHoursPerDay]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Target Milestone Quick Buttons */}
      <div className="flex flex-wrap gap-2 items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
        <span className="font-semibold text-zinc-400">Battle Pass Milestones:</span>
        {[
          { label: 'Tier 100 Base Pass (Level 100)', target: 100 },
          { label: 'Super Level Styles (Level 150)', target: 150 },
          { label: 'Max 200 Bonus Rewards (Level 200)', target: 200 }
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => setTargetLevel(preset.target)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
              targetLevel === preset.target
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-amber-400 uppercase tracking-wider">Current Level: {currentLevel}</span>
            <span className="font-mono text-zinc-400">80k XP / Level</span>
          </div>
          <input
            type="range"
            min="1"
            max="300"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(parseInt(e.target.value, 10))}
            className="w-full accent-amber-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-cyan-400 uppercase tracking-wider">Target Level: {targetLevel}</span>
            <span className="font-mono text-zinc-400">+{stats.battleStarsEarned} Battle Stars</span>
          </div>
          <input
            type="range"
            min="1"
            max="300"
            value={targetLevel}
            onChange={(e) => setTargetLevel(parseInt(e.target.value, 10))}
            className="w-full accent-cyan-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Daily XP Habits Config */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          Your Daily XP Routine
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-zinc-400 block mb-1">Daily Match Quests Completed (0–3):</label>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => setDailyQuestsDone(num)}
                  className={`flex-1 py-1.5 rounded-lg border font-mono font-bold ${
                    dailyQuestsDone === num ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                  }`}
                >
                  {num} ({num * 20}k XP)
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">Daily Creative Maps Playtime (Hours):</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.5"
              value={creativeHoursPerDay}
              onChange={(e) => setCreativeHoursPerDay(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-zinc-500 font-mono block mt-1">
              {creativeHoursPerDay} hrs = ~{Math.min(400, creativeHoursPerDay * 200)}k Creative XP / day
            </span>
          </div>
        </div>
      </div>

      {/* Main Results Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-amber-500/50 rounded-xl p-4 text-center shadow-lg shadow-amber-950/30">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Total XP Needed</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 my-1 block">
            {stats.totalXpNeeded.toLocaleString()} <span className="text-xs font-normal text-zinc-400">XP</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            {stats.levelsNeeded} levels @ 80k/level
          </span>
        </div>

        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">Estimated Days to Goal</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
            ~{stats.daysToTarget} <span className="text-xs font-normal text-zinc-400">Days</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            @ {stats.totalDailyXpIncome.toLocaleString()} XP/day routine
          </span>
        </div>

        <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-purple-300 block">Battle Stars Earned</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
            +{stats.battleStarsEarned} <span className="text-xs font-normal text-zinc-400">Stars</span>
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">
            5 Stars per level
          </span>
        </div>
      </div>
    </div>
  );
}
