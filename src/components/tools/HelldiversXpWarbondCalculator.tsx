/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Trophy, Zap, Clock, Shield, Target, Award, CheckCircle2, 
  Sparkles, TrendingUp, Share2, Check, Flame, ChevronRight, 
  BookOpen, HelpCircle, Layers, Users, Star, ArrowUpRight
} from 'lucide-react';

export interface DifficultyTier {
  level: number;
  name: string;
  baseXp: number;
  medalsPerMission: number;
  superSamples: number;
  color: string;
}

export interface MissionType {
  id: string;
  name: string;
  durationMinutes: number;
  xpMultiplier: number;
  isMetaFarm?: boolean;
  description: string;
}

export interface WarbondData {
  id: string;
  name: string;
  type: 'Standard (Free)' | 'Premium Warbond';
  totalMedals: number;
  totalPages: number;
  superCreditCost: number;
  highlightItem: string;
}

const DIFFICULTIES: DifficultyTier[] = [
  { level: 1, name: 'Trivial (Diff 1)', baseXp: 50, medalsPerMission: 1, superSamples: 0, color: 'text-emerald-400' },
  { level: 2, name: 'Easy (Diff 2)', baseXp: 100, medalsPerMission: 2, superSamples: 0, color: 'text-emerald-400' },
  { level: 3, name: 'Medium (Diff 3)', baseXp: 150, medalsPerMission: 3, superSamples: 0, color: 'text-emerald-300' },
  { level: 4, name: 'Challenging (Diff 4)', baseXp: 200, medalsPerMission: 4, superSamples: 0, color: 'text-cyan-400' },
  { level: 5, name: 'Hard (Diff 5)', baseXp: 250, medalsPerMission: 6, superSamples: 0, color: 'text-cyan-300' },
  { level: 6, name: 'Extreme (Diff 6)', baseXp: 300, medalsPerMission: 7, superSamples: 0, color: 'text-amber-400' },
  { level: 7, name: 'Suicide Mission (Diff 7)', baseXp: 350, medalsPerMission: 8, superSamples: 3, color: 'text-amber-300' },
  { level: 8, name: 'Impossible (Diff 8)', baseXp: 420, medalsPerMission: 10, superSamples: 5, color: 'text-rose-400' },
  { level: 9, name: 'Helldive (Diff 9)', baseXp: 500, medalsPerMission: 12, superSamples: 6, color: 'text-rose-300' },
  { level: 10, name: 'Super Helldive (Diff 10)', baseXp: 600, medalsPerMission: 15, superSamples: 8, color: 'text-[#FFE900]' }
];

const MISSION_TYPES: MissionType[] = [
  {
    id: 'blitz',
    name: 'Blitz: Search & Destroy (12-Min Meta Farm)',
    durationMinutes: 12,
    xpMultiplier: 1.0,
    isMetaFarm: true,
    description: 'Fastest XP/hour: rush bug holes or automaton fabricators and extract in 8-12 minutes.'
  },
  {
    id: 'eradicate',
    name: 'Eradicate Swarm / Defend (Turret Farm)',
    durationMinutes: 8,
    xpMultiplier: 0.9,
    isMetaFarm: true,
    description: 'Fastest Medals/hour: deploy mortars and sentries in a small arena, clear in 6-8 minutes.'
  },
  {
    id: 'standard-icbm',
    name: 'Full 40-Min Map (ICBM / Ore Vein)',
    durationMinutes: 24,
    xpMultiplier: 1.25,
    description: 'Full map clear: complete all secondary tactical objectives, stalker nests, and outposts.'
  },
  {
    id: 'evacuate',
    name: 'Evacuate High-Value Assets',
    durationMinutes: 16,
    xpMultiplier: 1.1,
    description: 'Defend tiered blast gates until 8 rockets launch successfully.'
  }
];

const WARBONDS: WarbondData[] = [
  {
    id: 'mobilize',
    name: 'Helldivers Mobilize!',
    type: 'Standard (Free)',
    totalMedals: 2015,
    totalPages: 10,
    superCreditCost: 0,
    highlightItem: 'SG-225 Breaker & Scorcher'
  },
  {
    id: 'steeled-veterans',
    name: 'Steeled Veterans',
    type: 'Premium Warbond',
    totalMedals: 686,
    totalPages: 3,
    superCreditCost: 1000,
    highlightItem: 'JAR-5 Dominator & Incendiary Breaker'
  },
  {
    id: 'cutting-edge',
    name: 'Cutting Edge',
    type: 'Premium Warbond',
    totalMedals: 672,
    totalPages: 3,
    superCreditCost: 1000,
    highlightItem: 'LAS-16 Sickle & Stun Grenade'
  },
  {
    id: 'democratic-detonation',
    name: 'Democratic Detonation',
    type: 'Premium Warbond',
    totalMedals: 685,
    totalPages: 3,
    superCreditCost: 1000,
    highlightItem: 'R-36 Eruptor & Grenade Pistol'
  },
  {
    id: 'polar-patriots',
    name: 'Polar Patriots',
    type: 'Premium Warbond',
    totalMedals: 679,
    totalPages: 3,
    superCreditCost: 1000,
    highlightItem: 'AR-61 Tenderizer & Impact Incendiary'
  },
  {
    id: 'viper-commandos',
    name: 'Viper Commandos',
    type: 'Premium Warbond',
    totalMedals: 680,
    totalPages: 3,
    superCreditCost: 1000,
    highlightItem: 'Peak Physique Armor & Bushwhacker'
  },
  {
    id: 'freedoms-flame',
    name: "Freedom's Flame",
    type: 'Premium Warbond',
    totalMedals: 680,
    totalPages: 3,
    superCreditCost: 1000,
    highlightItem: 'Crisper & Torcher Flamethrowers'
  },
  {
    id: 'chemical-agents',
    name: 'Chemical Agents',
    type: 'Premium Warbond',
    totalMedals: 680,
    totalPages: 3,
    superCreditCost: 1000,
    highlightItem: 'Sterilizer & Gas Grenades'
  }
];

// Helper: Calculate total cumulative XP to reach a level
export function getCumulativeXp(level: number): number {
  if (level <= 1) return 0;
  let total = 0;
  for (let l = 1; l < level; l++) {
    if (l < 10) total += 1000;
    else if (l < 25) total += 2500;
    else if (l < 50) total += 5000;
    else total += 7500;
  }
  return total;
}

export default function HelldiversXpWarbondCalculator() {
  // Inputs
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(50);
  const [difficultyTier, setDifficultyTier] = useState<number>(7); // Suicide Mission Diff 7 default meta
  const [selectedMissionId, setSelectedMissionId] = useState<string>('blitz');
  const [hasFullSquad, setHasFullSquad] = useState<boolean>(true); // +25% XP
  const [hasFullClear, setHasFullClear] = useState<boolean>(true); // +50% XP
  const [majorOrderBonus, setMajorOrderBonus] = useState<boolean>(true); // +15 medals daily
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // High CPC Warbond Converter Inputs
  const [userMedalsInput, setUserMedalsInput] = useState<number>(200);
  const [selectedWarbondId, setSelectedWarbondId] = useState<string>('cutting-edge');

  // Ensure targetLevel is always >= currentLevel
  const handleCurrentLevelChange = (val: number) => {
    setCurrentLevel(val);
    if (targetLevel <= val) {
      setTargetLevel(Math.min(150, val + 10));
    }
  };

  // Selected Difficulty & Mission
  const activeDiff = useMemo(() => {
    return DIFFICULTIES.find(d => d.level === difficultyTier) || DIFFICULTIES[6];
  }, [difficultyTier]);

  const activeMission = useMemo(() => {
    return MISSION_TYPES.find(m => m.id === selectedMissionId) || MISSION_TYPES[0];
  }, [selectedMissionId]);

  // Selected Warbond
  const activeWarbond = useMemo(() => {
    return WARBONDS.find(w => w.id === selectedWarbondId) || WARBONDS[2];
  }, [selectedWarbondId]);

  // Calculations
  const xpCurrent = getCumulativeXp(currentLevel);
  const xpTarget = getCumulativeXp(targetLevel);
  const xpNeeded = Math.max(0, xpTarget - xpCurrent);

  // XP per mission calculation:
  // Base XP * (1 + 0.25 if squad + 0.50 if full clear) * missionTypeMultiplier
  const xpPerMission = useMemo(() => {
    let multiplier = 1.0;
    if (hasFullSquad) multiplier += 0.25;
    if (hasFullClear) multiplier += 0.50;
    multiplier *= activeMission.xpMultiplier;
    return Math.round(activeDiff.baseXp * multiplier);
  }, [activeDiff, activeMission, hasFullSquad, hasFullClear]);

  // Medals per mission
  const medalsPerMission = activeDiff.medalsPerMission;

  // Missions & Time Needed
  const missionsNeeded = xpNeeded > 0 ? Math.ceil(xpNeeded / Math.max(1, xpPerMission)) : 0;
  const totalMinutesNeeded = missionsNeeded * activeMission.durationMinutes;
  const hoursNeeded = (totalMinutesNeeded / 60).toFixed(1);

  // Medals earned during this leveling path
  const medalsEarned = useMemo(() => {
    const base = missionsNeeded * medalsPerMission;
    return majorOrderBonus ? base + 45 : base; // include ~3 Major order ticks
  }, [missionsNeeded, medalsPerMission, majorOrderBonus]);

  // Super Samples earned
  const superSamplesEarned = missionsNeeded * activeDiff.superSamples;

  // Warbond Calculator Output for userMedalsInput
  const warbondAnalysis = useMemo(() => {
    const medals = userMedalsInput;
    const avgMedalsPerPage = activeWarbond.totalMedals / activeWarbond.totalPages;
    const pagesUnlocked = (medals / avgMedalsPerPage).toFixed(1);
    const progressPercent = Math.min(100, Math.round((medals / activeWarbond.totalMedals) * 100));
    const medalsRemaining = Math.max(0, activeWarbond.totalMedals - medals);

    return {
      pagesUnlocked,
      progressPercent,
      medalsRemaining,
      isFullyUnlocked: medals >= activeWarbond.totalMedals
    };
  }, [userMedalsInput, activeWarbond]);

  // Viral Auto-Preset Handlers
  const handleSetLevel50 = () => {
    setCurrentLevel(1);
    setTargetLevel(50);
    setDifficultyTier(7);
    setSelectedMissionId('blitz');
    setHasFullSquad(true);
    setHasFullClear(true);
  };

  const handleSetFastestFarm = () => {
    setDifficultyTier(7);
    setSelectedMissionId('blitz');
    setHasFullSquad(true);
    setHasFullClear(true);
  };

  const handleSetLevel150 = () => {
    setTargetLevel(150);
  };

  // Copy share message
  const handleShare = () => {
    const text = `HELLDIVERS 2 LEVEL & WARBOND PROGRESSION\n` +
      `Current: Level ${currentLevel} -> Target: Level ${targetLevel}\n` +
      `XP Needed: ${xpNeeded.toLocaleString()} XP\n` +
      `Requirement: ${missionsNeeded} ${activeDiff.name} (${activeMission.name})\n` +
      `Time Required: ~${hoursNeeded} Hours\n` +
      `Medals Earned: ~${medalsEarned.toLocaleString()} Medals\n` +
      `Calculated via GamingToolsHub.com/tools/helldivers-2-xp-calculator`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Top Warbond / Tactical Header */}
      <div className="bg-[#090a0f] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#FFE900] text-black text-[10px] sm:text-xs font-mono font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
          Super Earth Military Career Progression · Updated 2026
        </div>

        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFE900] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
              Rank Promotion & Medal Acquisition Center
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Helldivers 2 XP & Warbond Medal Calculator
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Calculate exact XP needed to level up from Level 1 to 150, estimate total missions and hours required, and compute how many Warbond pages your Medals can unlock.
          </p>
        </div>

        {/* Viral Quick Preset Buttons */}
        <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-wrap gap-2.5">
          <button
            onClick={handleSetLevel50}
            className="px-4 py-2 bg-[#FFE900] hover:bg-[#FFE900]/90 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <Trophy className="w-4 h-4 text-black" />
            <span>Level 50 Calculator (Level 1 → 50)</span>
          </button>

          <button
            onClick={handleSetFastestFarm}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <Zap className="w-4 h-4 text-black" />
            <span>Are you new? Click here for fastest farm</span>
          </button>

          <button
            onClick={handleSetLevel150}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Star className="w-4 h-4 text-[#FFE900]" />
            <span>Target Level 150 (Super Private)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid: Sliders on Left, Big Result Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sliders & Mission Settings (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#FFE900]" />
                Level & Mission Configuration
              </h3>
              <span className="text-[11px] font-mono text-zinc-400">Step 1 of 2</span>
            </div>

            {/* Slider 1: Current Level */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  Current Helldiver Level:
                </label>
                <span className="font-mono font-bold text-emerald-400 text-base bg-zinc-950 border border-zinc-800 px-3 py-0.5 rounded-lg">
                  Level {currentLevel}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={149}
                value={currentLevel}
                onChange={(e) => handleCurrentLevelChange(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-zinc-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>Level 1 (Cadet)</span>
                <span>Level 50 (Fleet Admiral)</span>
                <span>Level 149</span>
              </div>
            </div>

            {/* Slider 2: Target Level */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#FFE900]" />
                  Target Helldiver Level:
                </label>
                <span className="font-mono font-bold text-[#FFE900] text-base bg-zinc-950 border border-zinc-800 px-3 py-0.5 rounded-lg">
                  Level {targetLevel}
                </span>
              </div>
              <input
                type="range"
                min={Math.min(150, currentLevel + 1)}
                max={150}
                value={targetLevel}
                onChange={(e) => setTargetLevel(Number(e.target.value))}
                className="w-full accent-[#FFE900] bg-zinc-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>Level 20 (All Stratagems)</span>
                <span>Level 50 (Ship Modules)</span>
                <span>Level 150 (Max Cap)</span>
              </div>
            </div>

            {/* Input 3: Difficulty You Play (1-10) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Difficulty Tier You Play
              </label>
              <select
                value={difficultyTier}
                onChange={(e) => setDifficultyTier(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-[#FFE900] transition-colors"
              >
                {DIFFICULTIES.map(diff => (
                  <option key={diff.level} value={diff.level}>
                    {diff.name} — Base {diff.baseXp} XP ({diff.medalsPerMission} Medals{diff.superSamples > 0 ? ` + ${diff.superSamples} Super Samples` : ''})
                  </option>
                ))}
              </select>
            </div>

            {/* Input 4: Mission Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Mission Type Strategy
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MISSION_TYPES.map(m => {
                  const isSelected = selectedMissionId === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMissionId(m.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFE900]/10 border-[#FFE900] text-white shadow-sm'
                          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white truncate">{m.name}</span>
                        {m.isMetaFarm && (
                          <span className="text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/40">
                            Fast Farm
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-400 block font-mono">
                        ~{m.durationMinutes} mins per mission
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bonus Modifiers Toggles */}
            <div className="pt-2 border-t border-zinc-800 space-y-2.5">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Tactical XP & Medal Bonus Modifiers
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setHasFullSquad(!hasFullSquad)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    hasFullSquad
                      ? 'bg-emerald-500/10 border-emerald-500 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-xs font-bold block text-white">Full 4-Player Squad</span>
                      <span className="text-[10px] text-zinc-400 block">+25% Squad XP Bonus</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    hasFullSquad ? 'bg-emerald-400 text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {hasFullSquad ? '+25%' : 'OFF'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setHasFullClear(!hasFullClear)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    hasFullClear
                      ? 'bg-[#FFE900]/10 border-[#FFE900] text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFE900]" />
                    <div>
                      <span className="text-xs font-bold block text-white">100% Map Objective Clear</span>
                      <span className="text-[10px] text-zinc-400 block">+50% Extraction & Side Ops</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    hasFullClear ? 'bg-[#FFE900] text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {hasFullClear ? '+50%' : 'OFF'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Big Result Card & Progress Bar (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-b from-[#141724] to-[#0c0e17] border-2 border-[#FFE900] rounded-2xl p-6 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#FFE900]" />
                <span className="text-xs font-mono font-bold uppercase text-[#FFE900]">
                  Career Promotion Roadmap
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                {currentLevel} → {targetLevel}
              </span>
            </div>

            {/* Big Headline Result Banner */}
            <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-5 space-y-2 text-center">
              <span className="text-xs font-mono uppercase text-zinc-400 block tracking-wider">
                Mission Requirement Verdict
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white leading-tight">
                You need <span className="text-[#FFE900]">{missionsNeeded}</span> more {activeDiff.name.split(' ')[0]} missions
              </div>
              <div className="text-lg font-bold font-mono text-emerald-400">
                = ~{hoursNeeded} Hours of Combat Time
              </div>
              <span className="text-[11px] text-zinc-500 block font-mono">
                Based on {activeMission.durationMinutes}-minute average {activeMission.name.split(' ')[0]} runs
              </span>
            </div>

            {/* Primary Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3.5 text-center">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-0.5">
                  Total XP Needed
                </span>
                <span className="text-2xl font-black font-mono text-white">
                  {xpNeeded.toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-500 block font-mono mt-0.5">
                  XP ({xpPerMission} / run)
                </span>
              </div>

              <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3.5 text-center">
                <span className="text-[10px] font-mono uppercase text-[#FFE900] block mb-0.5">
                  Medals You Will Earn
                </span>
                <span className="text-2xl font-black font-mono text-[#FFE900]">
                  ~{medalsEarned.toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-400 block font-mono mt-0.5">
                  Warbond Medals
                </span>
              </div>
            </div>

            {/* Progress Bar from Current to Target Level */}
            <div className="space-y-2 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">Rank Progression:</span>
                <span className="text-white font-bold">
                  {Math.round((xpCurrent / Math.max(1, xpTarget)) * 100)}% to Goal
                </span>
              </div>

              <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800 p-0.5">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-[#FFE900] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(3, (xpCurrent / Math.max(1, xpTarget)) * 100))}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>Lvl {currentLevel} ({xpCurrent.toLocaleString()} XP)</span>
                <span>Lvl {targetLevel} ({xpTarget.toLocaleString()} XP)</span>
              </div>
            </div>

            {/* Super Samples Bonus Indicator */}
            {superSamplesEarned > 0 && (
              <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-3 flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Super Uranium Samples Earned:
                </span>
                <span className="font-bold text-white text-sm">
                  +{superSamplesEarned} Samples
                </span>
              </div>
            )}

            {/* Share Promotion Road Map */}
            <button
              onClick={handleShare}
              className="w-full py-2.5 bg-[#FFE900] hover:bg-[#FFE900]/90 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              {isCopied ? <Check className="w-4 h-4 text-black" /> : <Share2 className="w-4 h-4 text-black" />}
              <span>{isCopied ? 'Roadmap Copied to Clipboard!' : 'Share Your Leveling Roadmap'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* HIGH CPC MONETIZATION SECTION: Medal to Warbond Converter */}
      <section className="bg-gradient-to-b from-[#101424] to-[#0a0d16] border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                Medal to Warbond Unlock Converter
              </h3>
            </div>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Calculate exactly how many Warbond pages your Medals will unlock and how many medals you still need for 100% completion.
            </p>
          </div>

          <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
            High Search Volume Metric
          </span>
        </div>

        {/* Converter Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-6 space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Enter How Many Medals You Have:
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={2500}
                value={userMedalsInput}
                onChange={(e) => setUserMedalsInput(Math.max(0, Number(e.target.value)))}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                placeholder="e.g. 200 medals"
              />
              <span className="absolute right-3.5 top-2.5 text-xs font-mono text-zinc-400 font-bold">
                Medals
              </span>
            </div>
          </div>

          <div className="sm:col-span-6 space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Select Warbond Catalog:
            </label>
            <select
              value={selectedWarbondId}
              onChange={(e) => setSelectedWarbondId(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-amber-400"
            >
              {WARBONDS.map(wb => (
                <option key={wb.id} value={wb.id}>
                  {wb.name} ({wb.type} — {wb.totalMedals} Medals, {wb.totalPages} Pages)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Converter Output Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                Pages Unlocked
              </span>
              <span className="text-3xl font-black font-mono text-[#FFE900]">
                {warbondAnalysis.pagesUnlocked}
              </span>
              <span className="text-[11px] text-zinc-400 font-mono block mt-1">
                out of {activeWarbond.totalPages} Pages
              </span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4">
              <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">
                Warbond Completion
              </span>
              <span className="text-3xl font-black font-mono text-emerald-400">
                {warbondAnalysis.progressPercent}%
              </span>
              <span className="text-[11px] text-zinc-400 font-mono block mt-1">
                {userMedalsInput} / {activeWarbond.totalMedals} Medals
              </span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4">
              <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-1">
                Remaining to Complete
              </span>
              <span className="text-3xl font-black font-mono text-cyan-400">
                {warbondAnalysis.medalsRemaining}
              </span>
              <span className="text-[11px] text-zinc-400 font-mono block mt-1">
                Medals Needed for 100%
              </span>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-400">{activeWarbond.name} Progress:</span>
              <span className="text-amber-400 font-bold">{warbondAnalysis.progressPercent}% Completed</span>
            </div>
            <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${warbondAnalysis.progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-zinc-400 font-mono pt-1">
              {activeWarbond.type === 'Premium Warbond' ? `Requires 1,000 Super Credits to activate. ` : `Free standard issue warbond. `}
              Top items in this warbond: <strong className="text-white">{activeWarbond.highlightItem}</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM META TABLE: Fastest Way to Level 50 & 150 */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800 gap-2">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-400" />
            <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
              Fastest Way to Level 50 & 150 (Meta Farm Route Breakdown)
            </h4>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Ranked by XP and Medals earned per 60 minutes
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-950 text-zinc-400 uppercase text-[11px] border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Farm Route & Mission</th>
                <th className="py-3 px-3 text-center">Difficulty</th>
                <th className="py-3 px-3 text-center">Clear Time</th>
                <th className="py-3 px-3 text-center text-[#FFE900]">XP / Hour</th>
                <th className="py-3 px-3 text-center text-emerald-400">Medals / Hour</th>
                <th className="py-3 px-4 text-right">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 bg-zinc-900/60">
              <tr className="hover:bg-zinc-800/50 transition-colors bg-emerald-950/20">
                <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Blitz: Search & Destroy Speedruns
                </td>
                <td className="py-3 px-3 text-center text-amber-300 font-bold">Diff 7 (Suicide)</td>
                <td className="py-3 px-3 text-center text-zinc-300">10-12 mins</td>
                <td className="py-3 px-3 text-center font-bold text-[#FFE900]">~2,100 XP/hr</td>
                <td className="py-3 px-3 text-center font-bold text-emerald-400">~42 Medals/hr</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Best Overall XP & Samples
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-zinc-800/50 transition-colors">
                <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Eradicate Swarm Turret Trap
                </td>
                <td className="py-3 px-3 text-center text-rose-300 font-bold">Diff 9 (Helldive)</td>
                <td className="py-3 px-3 text-center text-zinc-300">6-8 mins</td>
                <td className="py-3 px-3 text-center font-bold text-[#FFE900]">~1,950 XP/hr</td>
                <td className="py-3 px-3 text-center font-bold text-emerald-400">~48 Medals/hr</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    Fastest Medal Farm
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-zinc-800/50 transition-colors">
                <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Full 40-Min Map Clear (ICBM)
                </td>
                <td className="py-3 px-3 text-center text-rose-300 font-bold">Diff 9 (Helldive)</td>
                <td className="py-3 px-3 text-center text-zinc-300">22-25 mins</td>
                <td className="py-3 px-3 text-center font-bold text-[#FFE900]">~1,800 XP/hr</td>
                <td className="py-3 px-3 text-center font-bold text-emerald-400">~28 Medals/hr</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-[10px] text-zinc-400">
                    Highest Requisition Slips
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-zinc-800/50 transition-colors">
                <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-500" />
                  Casual Patrol Clearing
                </td>
                <td className="py-3 px-3 text-center text-cyan-300 font-bold">Diff 4 (Challenging)</td>
                <td className="py-3 px-3 text-center text-zinc-300">18-20 mins</td>
                <td className="py-3 px-3 text-center font-bold text-[#FFE900]">~800 XP/hr</td>
                <td className="py-3 px-3 text-center font-bold text-emerald-400">~14 Medals/hr</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-[10px] text-zinc-500">
                    Relaxed / Solo Play
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SEO & Required Footer Text */}
      <div className="text-center pt-4 pb-2 border-t border-zinc-800/80">
        <p className="text-xs font-mono text-zinc-400 tracking-wider">
          Helldivers 2 Level Calculator 2026 - How long to level 150
        </p>
      </div>
    </div>
  );
}
