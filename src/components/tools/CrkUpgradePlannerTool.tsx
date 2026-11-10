/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Sparkles, Zap, Shield, Check, Layers, Coins } from 'lucide-react';

const CLASS_TYPES = ['Charge', 'Defense', 'Ambush', 'Magic', 'Ranged', 'Bomber', 'Support', 'Healing'] as const;

export default function CrkUpgradePlannerTool() {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(80);

  const [currentSkillLevel, setCurrentSkillLevel] = useState<number>(1);
  const [targetSkillLevel, setTargetSkillLevel] = useState<number>(80);

  const [selectedClass, setSelectedClass] = useState<string>('Magic');
  const [currentStars, setCurrentStars] = useState<number>(0); // 0 to 5
  const [targetStars, setTargetStars] = useState<number>(5); // 0 to 5

  // Calculations
  const upgradeCosts = useMemo(() => {
    const levelDiff = Math.max(0, targetLevel - currentLevel);
    const skillDiff = Math.max(0, targetSkillLevel - currentSkillLevel);

    // Approximate total EXP needed (exponential progression)
    // Level 1 -> 80 = approx 12,800,000 EXP
    let totalExpNeeded = 0;
    for (let l = currentLevel; l < targetLevel; l++) {
      totalExpNeeded += Math.floor(1000 * Math.pow(1.08, l));
    }

    // Equivalent Level 4 EXP Jellies (grant 3,200 EXP each)
    const lvl4Jellies = Math.ceil(totalExpNeeded / 3200);
    const goldLevelCost = totalExpNeeded * 0.8;

    // Skill Powders breakdown
    // Skill Level 1-20: Regular Powder (~300)
    // Skill Level 21-40: Refined Powder (~600)
    // Skill Level 41-80: Pristine Powder (~1,800)
    let regularPowder = 0;
    let refinedPowder = 0;
    let pristinePowder = 0;

    for (let s = currentSkillLevel; s < targetSkillLevel; s++) {
      if (s <= 20) regularPowder += Math.floor(10 + s * 0.8);
      else if (s <= 40) refinedPowder += Math.floor(15 + s * 1.1);
      else pristinePowder += Math.floor(25 + s * 1.5);
    }

    const goldSkillCost = skillDiff * 15000;

    // Soulstones for promotion (20, 30, 50, 70, 100 = 270 total)
    const soulstonesPerStar = [0, 20, 30, 50, 70, 100];
    let totalSoulstonesNeeded = 0;
    for (let st = currentStars + 1; st <= targetStars; st++) {
      if (st <= 5) totalSoulstonesNeeded += soulstonesPerStar[st];
    }

    return {
      levelDiff,
      skillDiff,
      totalExpNeeded,
      lvl4Jellies,
      goldLevelCost: Math.round(goldLevelCost),
      regularPowder,
      refinedPowder,
      pristinePowder,
      goldSkillCost,
      totalGold: Math.round(goldLevelCost + goldSkillCost),
      totalSoulstonesNeeded
    };
  }, [currentLevel, targetLevel, currentSkillLevel, targetSkillLevel, currentStars, targetStars]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-900 border border-amber-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              EXP & Skill Powder Matrix
            </span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <ArrowLeftRight className="w-6 h-6 text-amber-400" />
              Cookie Run: Kingdom Cookie Upgrade Planner
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Calculate exact EXP Jellies, Skill Powder tiers, Gold budget, and Soulstone promotion requirements up to Level 80.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Total Gold Budget</div>
              <div className="text-2xl font-black text-amber-400">
                {upgradeCosts.totalGold.toLocaleString()} Gold
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inputs Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Cookie Level */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Cookie Level (1 to 80)
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Current Level:</span>
                <span className="font-mono text-amber-300 font-bold">{currentLevel}</span>
              </label>
              <input
                type="range"
                min="1"
                max="80"
                value={currentLevel}
                onChange={e => setCurrentLevel(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Target Level:</span>
                <span className="font-mono text-amber-300 font-bold">{targetLevel}</span>
              </label>
              <input
                type="range"
                min="1"
                max="80"
                value={targetLevel}
                onChange={e => setTargetLevel(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          <div className="p-3 bg-zinc-950/60 border border-zinc-800 rounded-lg text-xs space-y-1 font-mono">
            <div className="text-zinc-400 flex justify-between">
              <span>EXP Required:</span>
              <span className="text-amber-400">{upgradeCosts.totalExpNeeded.toLocaleString()}</span>
            </div>
            <div className="text-zinc-400 flex justify-between">
              <span>Lv 4 EXP Jellies:</span>
              <span className="text-emerald-400">~{upgradeCosts.lvl4Jellies.toLocaleString()} pcs</span>
            </div>
          </div>
        </div>

        {/* Card 2: Skill Level & Class */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Skill Powder & Class
          </h3>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Cookie Class Type:</label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="w-full bg-zinc-950 text-xs text-amber-300 font-semibold border border-zinc-800 rounded px-2.5 py-1.5 focus:border-amber-500 outline-none"
            >
              {CLASS_TYPES.map(c => (
                <option key={c} value={c}>{c} Powder</option>
              ))}
            </select>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Current Skill Lv:</span>
                <span className="font-mono text-amber-300 font-bold">{currentSkillLevel}</span>
              </label>
              <input
                type="range"
                min="1"
                max="80"
                value={currentSkillLevel}
                onChange={e => setCurrentSkillLevel(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 flex justify-between mb-1">
                <span>Target Skill Lv:</span>
                <span className="font-mono text-amber-300 font-bold">{targetSkillLevel}</span>
              </label>
              <input
                type="range"
                min="1"
                max="80"
                value={targetSkillLevel}
                onChange={e => setTargetSkillLevel(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Star Promotion */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            Star Promotion (0★ to 5★)
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Current Stars:</label>
              <select
                value={currentStars}
                onChange={e => setCurrentStars(parseInt(e.target.value))}
                className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-amber-500 outline-none"
              >
                {[0, 1, 2, 3, 4, 5].map(s => (
                  <option key={s} value={s}>{s} Stars ★</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Target Stars:</label>
              <select
                value={targetStars}
                onChange={e => setTargetStars(parseInt(e.target.value))}
                className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 focus:border-amber-500 outline-none"
              >
                {[0, 1, 2, 3, 4, 5].map(s => (
                  <option key={s} value={s}>{s} Stars ★</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-3 bg-zinc-950/60 border border-zinc-800 rounded-lg text-xs space-y-1 font-mono">
            <div className="text-zinc-400 flex justify-between">
              <span>Soulstones Required:</span>
              <span className="text-amber-400 font-bold">{upgradeCosts.totalSoulstonesNeeded} pcs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Materials Required Matrix */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          Complete Resource Requirements Matrix
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl">
            <div className="text-xs text-zinc-400 mb-1">EXP Jellies Required</div>
            <div className="text-xl font-bold text-amber-400 font-mono">
              {upgradeCosts.lvl4Jellies.toLocaleString()}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">Level 4 EXP Jellies</div>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl">
            <div className="text-xs text-zinc-400 mb-1">{selectedClass} Skill Powders</div>
            <div className="text-sm font-mono space-y-0.5 text-zinc-200">
              <div>Refined: <strong className="text-amber-300">{upgradeCosts.refinedPowder}</strong></div>
              <div>Pristine: <strong className="text-emerald-400">{upgradeCosts.pristinePowder}</strong></div>
            </div>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl">
            <div className="text-xs text-zinc-400 mb-1">Soulstones Needed</div>
            <div className="text-xl font-bold text-rose-400 font-mono">
              {upgradeCosts.totalSoulstonesNeeded} Soulstones
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">From Mileage or Dark Mode</div>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl">
            <div className="text-xs text-zinc-400 mb-1">Total Gold Required</div>
            <div className="text-xl font-bold text-amber-300 font-mono">
              {upgradeCosts.totalGold.toLocaleString()}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">Leveling + Skill Costs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
