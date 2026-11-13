/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Trophy, Sparkles, Award, RotateCcw, Copy, Check, 
  ShieldCheck, Info, Zap, ChevronRight, Layers, Flame
} from 'lucide-react';
import { 
  PS99_MASTERY_TRACKS, 
  PS99_MASTERY_XP_TABLE, 
  PS99_MAX_MASTERY_XP, 
  PS99_MILESTONE_LEVELS,
  MasteryTrack,
  MasteryActionOption
} from '../../data/ps99MasteryData';

export default function Ps99MasteryCalculator() {
  const [selectedTrackId, setSelectedTrackId] = useState<string>('eggs');
  const [selectedActionId, setSelectedActionId] = useState<string>('normal-egg');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentXpInLevel, setCurrentXpInLevel] = useState<number>(0);
  const [targetLevel, setTargetLevel] = useState<number>(99);
  const [clanLevel6Plus, setClanLevel6Plus] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Active track
  const currentTrack: MasteryTrack = useMemo(() => {
    return PS99_MASTERY_TRACKS.find(t => t.id === selectedTrackId) || PS99_MASTERY_TRACKS[0];
  }, [selectedTrackId]);

  // Handle track change - automatically select first action
  const handleTrackChange = (trackId: string) => {
    setSelectedTrackId(trackId);
    const track = PS99_MASTERY_TRACKS.find(t => t.id === trackId) || PS99_MASTERY_TRACKS[0];
    if (track.actions.length > 0) {
      setSelectedActionId(track.actions[0].id);
    }
  };

  // Active action
  const currentAction: MasteryActionOption = useMemo(() => {
    return currentTrack.actions.find(a => a.id === selectedActionId) || currentTrack.actions[0];
  }, [currentTrack, selectedActionId]);

  // Max XP required for next level from current level
  const xpNeededForNextLevel = useMemo(() => {
    if (currentLevel >= 99) return 0;
    return PS99_MASTERY_XP_TABLE[currentLevel + 1] - PS99_MASTERY_XP_TABLE[currentLevel];
  }, [currentLevel]);

  // Validated current XP inside current level
  const clampedXpInLevel = Math.min(Math.max(0, currentXpInLevel), xpNeededForNextLevel > 0 ? xpNeededForNextLevel - 1 : 0);

  // Calculation core
  const calculation = useMemo(() => {
    const validCurrentLevel = Math.max(1, Math.min(98, currentLevel));
    const validTargetLevel = Math.max(validCurrentLevel + 1, Math.min(99, targetLevel));

    const curCumulativeXp = PS99_MASTERY_XP_TABLE[validCurrentLevel] + clampedXpInLevel;
    const targetCumulativeXp = PS99_MASTERY_XP_TABLE[validTargetLevel];
    const totalXpNeeded = Math.max(0, targetCumulativeXp - curCumulativeXp);

    // Boost multiplier: Clan level 6+ gives +10% mastery XP
    const multiplier = clanLevel6Plus ? 1.10 : 1.0;
    const effectiveXpPerAction = currentAction.xpPerAction * multiplier;

    const totalActionsNeeded = effectiveXpPerAction > 0 
      ? Math.ceil(totalXpNeeded / effectiveXpPerAction) 
      : 0;

    // Standard Mastery XP Potion: +10,000 XP base (+11,000 with Clan Lv 6+)
    const potionXpGain = clanLevel6Plus ? 11000 : 10000;
    const potionsNeeded = Math.ceil(totalXpNeeded / potionXpGain);

    // Perk at target level
    const perkAtTarget = currentTrack.perks.find(p => p.level === validTargetLevel)?.perk || 
      (validTargetLevel === 99 ? currentTrack.perks[currentTrack.perks.length - 1]?.perk : 'Level milestone progression perk');

    return {
      validCurrentLevel,
      validTargetLevel,
      curCumulativeXp,
      targetCumulativeXp,
      totalXpNeeded,
      totalActionsNeeded,
      effectiveXpPerAction,
      potionsNeeded,
      potionXpGain,
      perkAtTarget
    };
  }, [currentLevel, targetLevel, clampedXpInLevel, clanLevel6Plus, currentAction, currentTrack]);

  // Copy manifest
  const handleCopy = () => {
    const text = [
      `🏆 PS99 MASTERY PROGRESSION MANIFEST`,
      `• Track: ${currentTrack.name} (Lv. ${calculation.validCurrentLevel} → Lv. ${calculation.validTargetLevel})`,
      `• Action: ${currentAction.name} (${currentAction.xpPerAction} XP base)`,
      `• Clan Boost (Lv. 6+): ${clanLevel6Plus ? 'ACTIVE (+10% Mastery XP)' : 'None'}`,
      `• Total XP Required: ${calculation.totalXpNeeded.toLocaleString()} XP`,
      `• Actions Required: ${calculation.totalActionsNeeded.toLocaleString()} ${currentAction.unit}`,
      `• Standard Mastery Potions (10k XP): ~${calculation.potionsNeeded.toLocaleString()} potions`,
      `• Target Perk: ${calculation.perkAtTarget}`
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSelectedTrackId('eggs');
    setSelectedActionId('normal-egg');
    setCurrentLevel(1);
    setCurrentXpInLevel(0);
    setTargetLevel(99);
    setClanLevel6Plus(false);
  };

  // Self-test presets from prompt
  const loadPreset = (trackId: string, actionId: string, curLvl: number, curXp: number, tgtLvl: number, clan: boolean = false) => {
    setSelectedTrackId(trackId);
    setSelectedActionId(actionId);
    setCurrentLevel(curLvl);
    setCurrentXpInLevel(curXp);
    setTargetLevel(tgtLvl);
    setClanLevel6Plus(clan);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans text-slate-100">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-2 border-indigo-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-indigo-500/20 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-indigo-950 border border-indigo-500/50 rounded-xl text-indigo-400 shadow-lg">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded border border-indigo-500/30">
                PET SIMULATOR 99 (REBIRTH 4+)
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mt-1">
                Pet Simulator 99 Mastery XP Calculator
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1 cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 text-xs font-bold rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 transition font-mono flex items-center gap-1.5 shadow-lg shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Manifest'}
            </button>
          </div>
        </div>

        {/* Live Summary Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="bg-[#090d16] border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Total XP Needed</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {calculation.totalXpNeeded.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                of 13,034,431 XP (Lv 99)
              </span>
            </div>
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>

          <div className="bg-[#090d16] border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Actions Required</span>
              <span className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono">
                {calculation.totalActionsNeeded.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                {currentAction.unit}
              </span>
            </div>
            <Award className="w-6 h-6 text-indigo-400" />
          </div>

          <div className="bg-[#090d16] border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Potion Equivalent</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                ~{calculation.potionsNeeded.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                Mastery XP Potions (10k XP)
              </span>
            </div>
            <Zap className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Main Grid: Controls & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">Mastery Track Configuration</h2>
            <span className="text-xs font-mono text-purple-400">14 Verified Tracks</span>
          </div>

          {/* Quick Presets / Verified Self-Tests */}
          <div>
            <label className="text-[10px] uppercase text-slate-400 font-mono block mb-2">Verified Wiki Self-Tests</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => loadPreset('eggs', 'normal-egg', 1, 0, 50, false)}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition text-left cursor-pointer"
              >
                <div className="font-bold text-amber-300">Eggs: L1 → L50</div>
                <div className="text-[10px] text-slate-400">101,333 XP = 253,333 eggs</div>
              </button>
              <button
                type="button"
                onClick={() => loadPreset('fishing', 'fishing-cast', 1, 0, 99, false)}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition text-left cursor-pointer"
              >
                <div className="font-bold text-sky-300">Fishing: L1 → L99</div>
                <div className="text-[10px] text-slate-400">13,034,431 XP = 521,378 casts</div>
              </button>
              <button
                type="button"
                onClick={() => loadPreset('superior-chests', 'superior-chest', 1, 0, 99, false)}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition text-left cursor-pointer"
              >
                <div className="font-bold text-indigo-300">Chests: L1 → L99</div>
                <div className="text-[10px] text-slate-400">13,034,431 XP = 4,345 chests</div>
              </button>
            </div>
          </div>

          {/* Track Selection */}
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase text-slate-400 font-mono block mb-1">
                Select Mastery Track (14 Tracks Unlocked at Rebirth 4)
              </label>
              <select
                value={selectedTrackId}
                onChange={e => handleTrackChange(e.target.value)}
                className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                {PS99_MASTERY_TRACKS.map(track => (
                  <option key={track.id} value={track.id}>
                    {track.name} ({track.actions.length} action types)
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {currentTrack.description}
              </p>
            </div>

            {/* Action Selection for this track */}
            <div>
              <label className="text-[10px] uppercase text-slate-400 font-mono block mb-1">
                Farming Action Method (XP Rate)
              </label>
              <select
                value={selectedActionId}
                onChange={e => setSelectedActionId(e.target.value)}
                className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                {currentTrack.actions.map(action => (
                  <option key={action.id} value={action.id}>
                    {action.name} — {action.xpPerAction < 1 ? action.xpPerAction.toFixed(2) : action.xpPerAction.toLocaleString()} XP per {action.unit.slice(0, -1) || 'action'}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Range Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase text-slate-400 font-mono block mb-1">
                  Current Level (1–98)
                </label>
                <input
                  type="number"
                  min={1}
                  max={98}
                  value={currentLevel}
                  onChange={e => {
                    const lvl = Math.max(1, Math.min(98, parseInt(e.target.value) || 1));
                    setCurrentLevel(lvl);
                    if (targetLevel <= lvl) setTargetLevel(lvl + 1);
                  }}
                  className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-slate-400 font-mono block mb-1">
                  Target Level (2–99)
                </label>
                <input
                  type="number"
                  min={currentLevel + 1}
                  max={99}
                  value={targetLevel}
                  onChange={e => setTargetLevel(Math.max(currentLevel + 1, Math.min(99, parseInt(e.target.value) || 99)))}
                  className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Current XP in Level */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] uppercase text-slate-400 font-mono">
                  XP Into Current Level ({clampedXpInLevel.toLocaleString()} / {xpNeededForNextLevel.toLocaleString()})
                </label>
                <span className="text-[11px] font-mono text-indigo-400">
                  {xpNeededForNextLevel > 0 ? ((clampedXpInLevel / xpNeededForNextLevel) * 100).toFixed(1) : 0}%
                </span>
              </div>
              <input
                type="number"
                min={0}
                max={Math.max(0, xpNeededForNextLevel - 1)}
                value={clampedXpInLevel}
                onChange={e => setCurrentXpInLevel(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            {/* Clan Level 6+ Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-3 p-3 bg-[#090d16] border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition">
                <input
                  type="checkbox"
                  checked={clanLevel6Plus}
                  onChange={e => setClanLevel6Plus(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <span>Clan Level 6+ Active (+10% Mastery XP Perk)</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Multiplies all mastery XP actions and standard mastery potions by 1.10× (+10%).
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Output Analysis (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Target Perk Unlocked */}
          <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>Target Level Perk</span>
              <span className="text-xs font-mono text-amber-400">Lv. {calculation.validTargetLevel}</span>
            </h3>

            <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-2">
              <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{currentTrack.name} Perk (Level {calculation.validTargetLevel}):</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {calculation.perkAtTarget}
              </p>
            </div>

            {/* Potion Shortcuts Callout */}
            <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> Mastery XP Potions
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                • <strong className="text-emerald-400">Mastery XP Potion:</strong> +10,000 XP (+11,000 with Lv6+ Clan). You need ~<span className="text-white font-mono font-bold">{calculation.potionsNeeded.toLocaleString()}</span> potions to reach Lv {calculation.validTargetLevel}.<br/>
                • <strong className="text-purple-400">Ultra Mastery XP Potion:</strong> Instantly grants Level 99 (13,034,431 XP) with zero actions.
              </p>
            </div>
          </div>

          {/* Milestone Table for Selected Track */}
          <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>Milestone Perks</span>
              <span className="text-[11px] font-mono text-slate-400">50 · 75 · 85 · 92 · 96 · 99</span>
            </h3>

            <div className="space-y-2 text-xs">
              {currentTrack.perks.map(perkItem => {
                const isPassed = calculation.validCurrentLevel >= perkItem.level;
                const isTarget = calculation.validTargetLevel === perkItem.level;
                return (
                  <div
                    key={perkItem.level}
                    className={`p-2.5 rounded-lg border flex items-start gap-2.5 transition ${
                      isTarget 
                        ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                        : isPassed 
                          ? 'bg-[#090d16] border-slate-800 text-slate-400' 
                          : 'bg-[#090d16]/60 border-slate-800/60 text-slate-300'
                    }`}
                  >
                    <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded shrink-0 ${
                      isTarget ? 'bg-indigo-600 text-white' : isPassed ? 'bg-slate-800 text-slate-400' : 'bg-slate-800 text-amber-400'
                    }`}>
                      Lv.{perkItem.level}
                    </span>
                    <div className="flex-1 text-[11px] leading-snug">
                      <span className="text-slate-200">{perkItem.perk}</span>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                        {PS99_MASTERY_XP_TABLE[perkItem.level].toLocaleString()} Cumulative XP
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
