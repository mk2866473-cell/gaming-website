/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, Flame, Sword, Pickaxe, Award, ChevronRight, 
  HelpCircle, RefreshCw, BarChart3, Eye, Waves, Layers, Sparkles
} from 'lucide-react';

// Minecraft Vanilla XP Calculations
export function getXpForLevel(level: number): number {
  if (level <= 16) {
    return Math.floor(level * level + 6 * level);
  } else if (level <= 31) {
    return Math.floor(2.5 * level * level - 40.5 * level + 360);
  } else {
    return Math.floor(4.5 * level * level - 162.5 * level + 2220);
  }
}

export function getXpToNextLevel(level: number): number {
  if (level <= 15) {
    return 2 * level + 7;
  } else if (level <= 30) {
    return 5 * level - 38;
  } else {
    return 9 * level - 158;
  }
}

export default function MinecraftXpCalculator() {
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [currentProgressPercent, setCurrentProgressPercent] = useState<number>(0);
  const [targetLevel, setTargetLevel] = useState<number>(30);

  const xpAnalysis = useMemo(() => {
    const safeCurrent = Math.max(0, currentLevel);
    const safeTarget = Math.max(safeCurrent, targetLevel);

    const xpForCurrentBase = getXpForLevel(safeCurrent);
    const xpToNext = getXpToNextLevel(safeCurrent);
    const progressXP = Math.floor(xpToNext * (currentProgressPercent / 100));
    const currentTotalXP = xpForCurrentBase + progressXP;

    const targetTotalXP = getXpForLevel(safeTarget);
    const xpNeeded = Math.max(0, targetTotalXP - currentTotalXP);

    return {
      currentTotalXP,
      targetTotalXP,
      xpNeeded,
      xpToNext,
      bottlesNeeded: Math.ceil(xpNeeded / 7),
      endermenNeeded: Math.ceil(xpNeeded / 5),
      blazesNeeded: Math.ceil(xpNeeded / 10),
      guardiansNeeded: Math.ceil(xpNeeded / 10),
      quartzOresNeeded: Math.ceil(xpNeeded / 3.5),
      ancientDebrisSmeltNeeded: Math.ceil(xpNeeded / 2.0),
      ironSmeltNeeded: Math.ceil(xpNeeded / 0.7)
    };
  }, [currentLevel, currentProgressPercent, targetLevel]);

  return (
    <div className="space-y-6">
      {/* Presets row */}
      <div className="flex flex-wrap gap-2 items-center bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl backdrop-blur">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mr-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          Quick Goals:
        </span>
        {[
          { label: '0 → 30 (Full Enchant)', cur: 0, prog: 0, tgt: 30 },
          { label: '27 → 30 (Enchant Top-up)', cur: 27, prog: 0, tgt: 30 },
          { label: '30 → 50 (Mastery)', cur: 30, prog: 0, tgt: 50 },
          { label: '0 → 100 (Centurion)', cur: 0, prog: 0, tgt: 100 }
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => {
              setCurrentLevel(preset.cur);
              setCurrentProgressPercent(preset.prog);
              setTargetLevel(preset.tgt);
            }}
            className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 hover:text-emerald-300 text-zinc-300 font-mono transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Input Level Config Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current XP Status */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800">
            <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Current Experience Level
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              Total: {xpAnalysis.currentTotalXP.toLocaleString()} XP
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <label className="text-zinc-300 font-medium">Level Number</label>
                <span className="font-mono text-emerald-400 font-bold">Lvl {currentLevel}</span>
              </div>
              <input
                type="number"
                min="0"
                max="1000"
                value={currentLevel}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || 0;
                  setCurrentLevel(Math.max(0, val));
                  if (val > targetLevel) setTargetLevel(val);
                }}
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg p-2.5 text-sm font-mono text-white focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <label className="text-zinc-300 font-medium">Progress to Next Level (%)</label>
                <span className="font-mono text-zinc-400">{currentProgressPercent}% ({Math.floor(xpAnalysis.xpToNext * (currentProgressPercent / 100))} / {xpAnalysis.xpToNext} XP)</span>
              </div>
              <input
                type="range"
                min="0"
                max="99"
                value={currentProgressPercent}
                onChange={(e) => setCurrentProgressPercent(parseInt(e.target.value, 10) || 0)}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
              />

              {/* In-game XP Bar Style Visualizer */}
              <div className="mt-3 relative h-4 bg-zinc-950 border border-zinc-700 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-lime-400 rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${currentProgressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Target Level Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800">
            <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              Target Goal Level
            </h2>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              Total: {xpAnalysis.targetTotalXP.toLocaleString()} XP
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <label className="text-zinc-300 font-medium">Target Level</label>
                <span className="font-mono text-cyan-400 font-bold">Lvl {targetLevel}</span>
              </div>
              <input
                type="number"
                min={currentLevel}
                max="1000"
                value={targetLevel}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || 0;
                  setTargetLevel(Math.max(currentLevel, val));
                }}
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-cyan-500 rounded-lg p-2.5 text-sm font-mono text-white focus:outline-none"
              />
            </div>

            {/* Total Delta Requirement Callout */}
            <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center mt-4">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium block">
                Total XP Points Needed
              </span>
              <span className="text-3xl font-extrabold font-mono text-emerald-400 block my-1">
                +{xpAnalysis.xpNeeded.toLocaleString()} XP
              </span>
              <span className="text-xs text-zinc-400">
                From Level {currentLevel} ({currentProgressPercent}%) → Level {targetLevel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Equivalents and Grinding Breakdown Grid */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-zinc-100 mb-4 flex items-center gap-2 pb-2 border-b border-zinc-800">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          Farming & Grinding Equivalents to Reach Goal
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Bottles */}
          <div className="bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 p-3 rounded-lg text-center transition-colors flex flex-col items-center">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-1">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs text-zinc-400 block font-medium">Bottles o' Enchanting</span>
            <span className="text-lg font-bold font-mono text-emerald-400 mt-1 block">
              {xpAnalysis.bottlesNeeded.toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">~{Math.ceil(xpAnalysis.bottlesNeeded / 64)} stacks</span>
          </div>

          {/* Endermen */}
          <div className="bg-zinc-950 border border-zinc-800 hover:border-purple-500/50 p-3 rounded-lg text-center transition-colors flex flex-col items-center">
            <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-1">
              <Eye className="w-4 h-4" />
            </span>
            <span className="text-xs text-zinc-400 block font-medium">Enderman Farm</span>
            <span className="text-lg font-bold font-mono text-purple-400 mt-1 block">
              {xpAnalysis.endermenNeeded.toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">5 XP / kill</span>
          </div>

          {/* Blazes */}
          <div className="bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 p-3 rounded-lg text-center transition-colors flex flex-col items-center">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-1">
              <Flame className="w-4 h-4" />
            </span>
            <span className="text-xs text-zinc-400 block font-medium">Blaze Spawner</span>
            <span className="text-lg font-bold font-mono text-amber-400 mt-1 block">
              {xpAnalysis.blazesNeeded.toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">10 XP / kill</span>
          </div>

          {/* Guardians */}
          <div className="bg-zinc-950 border border-zinc-800 hover:border-cyan-500/50 p-3 rounded-lg text-center transition-colors flex flex-col items-center">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-1">
              <Waves className="w-4 h-4" />
            </span>
            <span className="text-xs text-zinc-400 block font-medium">Ocean Monument</span>
            <span className="text-lg font-bold font-mono text-cyan-400 mt-1 block">
              {xpAnalysis.guardiansNeeded.toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">10 XP / kill</span>
          </div>

          {/* Nether Quartz */}
          <div className="bg-zinc-950 border border-zinc-800 hover:border-rose-500/50 p-3 rounded-lg text-center transition-colors flex flex-col items-center">
            <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-1">
              <Pickaxe className="w-4 h-4" />
            </span>
            <span className="text-xs text-zinc-400 block font-medium">Nether Quartz Ores</span>
            <span className="text-lg font-bold font-mono text-rose-400 mt-1 block">
              {xpAnalysis.quartzOresNeeded.toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">~3.5 XP / ore</span>
          </div>

          {/* Smelting Ancient Debris */}
          <div className="bg-zinc-950 border border-zinc-800 hover:border-indigo-500/50 p-3 rounded-lg text-center transition-colors flex flex-col items-center">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-1">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs text-zinc-400 block font-medium">Debris Smelting</span>
            <span className="text-lg font-bold font-mono text-indigo-400 mt-1 block">
              {xpAnalysis.ancientDebrisSmeltNeeded.toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">2 XP / scrap</span>
          </div>
        </div>
      </div>
    </div>
  );
}
