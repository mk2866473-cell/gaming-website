/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Trophy, Sparkles, Award, CheckCircle2, RotateCcw, 
  Copy, Check, ShieldCheck, Info, Flame 
} from 'lucide-react';

const MASTERY_TYPES = [
  { id: 'enchant', name: 'Enchant Mastery', maxLevel: 99, xpPerLevelBase: 5000 },
  { id: 'potion', name: 'Potion Mastery', maxLevel: 99, xpPerLevelBase: 4500 },
  { id: 'hatching', name: 'Hatching Mastery', maxLevel: 99, xpPerLevelBase: 6000 },
  { id: 'breaking', name: 'Breakables Mastery', maxLevel: 99, xpPerLevelBase: 5500 },
  { id: 'trading', name: 'Trading Mastery', maxLevel: 99, xpPerLevelBase: 4000 }
];

export default function Ps99MasteryCalculator() {
  const [selectedMasteryId, setSelectedMasteryId] = useState<string>('enchant');
  const [currentLevel, setCurrentLevel] = useState<number>(45);
  const [targetLevel, setTargetLevel] = useState<number>(99);
  const [dailyActionsCompleted, setDailyActionsCompleted] = useState<number>(2500);
  const [copied, setCopied] = useState(false);

  const activeMastery = MASTERY_TYPES.find(m => m.id === selectedMasteryId) || MASTERY_TYPES[0];

  const calculation = useMemo(() => {
    const start = Math.max(1, Math.min(activeMastery.maxLevel - 1, currentLevel));
    const target = Math.max(start + 1, Math.min(activeMastery.maxLevel, targetLevel));

    let totalXpNeeded = 0;
    for (let lvl = start; lvl < target; lvl++) {
      totalXpNeeded += activeMastery.xpPerLevelBase * Math.pow(1.05, lvl / 10);
    }

    const xpPerAction = 25; // average XP per action
    const totalActionsNeeded = Math.ceil(totalXpNeeded / xpPerAction);
    const daysNeeded = Math.ceil(totalActionsNeeded / Math.max(1, dailyActionsCompleted));

    return {
      totalXpNeeded: Math.round(totalXpNeeded),
      totalActionsNeeded,
      daysNeeded
    };
  }, [activeMastery, currentLevel, targetLevel, dailyActionsCompleted]);

  const handleCopy = () => {
    const text = [
      `🏆 PS99 MASTERY PROGRESS MANIFEST`,
      `• Mastery: ${activeMastery.name} (Lv. ${currentLevel} → ${targetLevel})`,
      `• Total XP Required: ${calculation.totalXpNeeded.toLocaleString()} XP`,
      `• Actions Required: ${calculation.totalActionsNeeded.toLocaleString()} Actions`,
      `• Estimated Time: ~${calculation.daysNeeded} Days`
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans text-slate-100">
      {/* Header Card */}
      <div className="relative bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-2 border-indigo-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-indigo-500/20 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-indigo-950 border border-indigo-500/50 rounded-xl text-indigo-400 shadow-lg">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded border border-indigo-500/30">
                PET SIMULATOR 99 PROGRESSION
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
                Mastery Level Progress Calculator
              </h1>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 transition font-mono flex items-center gap-1.5 shadow-lg shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Manifest Copied!' : 'Copy Mastery Manifest'}
          </button>
        </div>

        {/* Live Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="bg-[#090d16] border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Total XP Needed</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                {calculation.totalXpNeeded.toLocaleString()} XP
              </span>
            </div>
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>

          <div className="bg-[#090d16] border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Actions Required</span>
              <span className="text-xl sm:text-2xl font-black text-indigo-400 font-mono">
                {calculation.totalActionsNeeded.toLocaleString()}
              </span>
            </div>
            <Award className="w-6 h-6 text-indigo-400" />
          </div>

          <div className="bg-[#090d16] border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Estimated Time</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                ~{calculation.daysNeeded} Days
              </span>
            </div>
            <Trophy className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white pb-3 border-b border-slate-800">Mastery Target Configuration</h2>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase text-slate-400 font-mono block mb-1">Select Mastery Category</label>
              <select
                value={selectedMasteryId}
                onChange={e => setSelectedMasteryId(e.target.value)}
                className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
              >
                {MASTERY_TYPES.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase text-slate-400 font-mono block mb-1">Current Level ({currentLevel})</label>
                <input
                  type="number"
                  min={1}
                  max={98}
                  value={currentLevel}
                  onChange={e => setCurrentLevel(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-slate-400 font-mono block mb-1">Target Level ({targetLevel})</label>
                <input
                  type="number"
                  min={2}
                  max={99}
                  value={targetLevel}
                  onChange={e => setTargetLevel(parseInt(e.target.value) || 99)}
                  className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block font-medium mb-1">
                Daily Actions Completed: <span className="text-indigo-400 font-bold font-mono">{dailyActionsCompleted.toLocaleString()} / day</span>
              </label>
              <input
                type="range"
                min={500}
                max={10000}
                step={500}
                value={dailyActionsCompleted}
                onChange={e => setDailyActionsCompleted(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Right Output Analysis (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              Progression Overview
            </h3>

            <div className="bg-[#090d16] border border-slate-800 rounded-xl p-4 space-y-3 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Selected Mastery:</span>
                <span className="font-mono font-bold text-indigo-400">{activeMastery.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total XP Required:</span>
                <span className="font-mono font-bold text-amber-400">{calculation.totalXpNeeded.toLocaleString()} XP</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated Duration:</span>
                <span className="font-mono font-bold text-emerald-400">~{calculation.daysNeeded} Days</span>
              </div>
            </div>

            <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4 space-y-2 text-xs text-indigo-200">
              <div className="font-bold flex items-center gap-1.5 text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" /> Mastery Perk Bonus
              </div>
              <p className="leading-relaxed text-slate-300 text-[11px]">
                Reaching Level 99 in Masteries grants permanent game-changing perks such as free extra enchant slots, doubled potion durations, and higher secret drop rates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
