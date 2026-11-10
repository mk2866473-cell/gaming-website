/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Skull, FlaskConical, Sparkles, Clock, Compass, Shield, 
  CheckCircle2, Share2, Check, Sliders, MapPin, AlertTriangle, 
  TrendingUp, Users, ChevronRight, Zap, Target, HelpCircle,
  Award, Eye, Info, Layers
} from 'lucide-react';

export interface DifficultyConfig {
  level: number;
  name: string;
  romanNumeral: string;
  commonCap: number;
  rareCap: number;
  superCap: number;
  colorClass: string;
  borderClass: string;
  bgGlow: string;
}

export const DIFFICULTIES: DifficultyConfig[] = [
  { level: 1, name: 'Trivial', romanNumeral: 'I', commonCap: 5, rareCap: 0, superCap: 0, colorClass: 'text-zinc-300', borderClass: 'border-zinc-700', bgGlow: 'bg-zinc-800/40' },
  { level: 2, name: 'Easy', romanNumeral: 'II', commonCap: 10, rareCap: 0, superCap: 0, colorClass: 'text-emerald-400', borderClass: 'border-emerald-500/40', bgGlow: 'bg-emerald-950/20' },
  { level: 3, name: 'Medium', romanNumeral: 'III', commonCap: 15, rareCap: 2, superCap: 0, colorClass: 'text-emerald-400', borderClass: 'border-emerald-500/50', bgGlow: 'bg-emerald-900/30' },
  { level: 4, name: 'Challenging', romanNumeral: 'IV', commonCap: 18, rareCap: 4, superCap: 0, colorClass: 'text-cyan-400', borderClass: 'border-cyan-500/50', bgGlow: 'bg-cyan-950/30' },
  { level: 5, name: 'Hard', romanNumeral: 'V', commonCap: 20, rareCap: 5, superCap: 0, colorClass: 'text-amber-400', borderClass: 'border-amber-500/50', bgGlow: 'bg-amber-950/30' },
  { level: 6, name: 'Extreme', romanNumeral: 'VI', commonCap: 25, rareCap: 10, superCap: 3, colorClass: 'text-amber-500', borderClass: 'border-amber-600/50', bgGlow: 'bg-amber-900/30' },
  { level: 7, name: 'Suicide Mission', romanNumeral: 'VII', commonCap: 30, rareCap: 15, superCap: 5, colorClass: 'text-orange-500', borderClass: 'border-orange-500/50', bgGlow: 'bg-orange-950/30' },
  { level: 8, name: 'Impossible', romanNumeral: 'VIII', commonCap: 35, rareCap: 20, superCap: 6, colorClass: 'text-rose-500', borderClass: 'border-rose-500/50', bgGlow: 'bg-rose-950/30' },
  { level: 9, name: 'Helldive', romanNumeral: 'IX', commonCap: 40, rareCap: 25, superCap: 7, colorClass: 'text-purple-400', borderClass: 'border-purple-500/60', bgGlow: 'bg-purple-950/40' }
];

// Target ship upgrade costs (Tier 1-5 Modules)
export const TOTAL_SHIP_COSTS = {
  common: 250,
  rare: 180,
  super: 85
};

export type MapType = 'small' | 'medium' | 'large';

export default function HelldiversSampleCalculator() {
  // Input State
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState<number>(7);
  const [mapType, setMapType] = useState<MapType>('large');
  const [teamSize, setTeamSize] = useState<number>(4);

  // User Current Sample Inventory
  const [ownedCommon, setOwnedCommon] = useState<number>(65);
  const [ownedRare, setOwnedRare] = useState<number>(30);
  const [ownedSuper, setOwnedSuper] = useState<number>(12);

  // Daily farm hours slider
  const [dailyFarmHours, setDailyFarmHours] = useState<number>(2);

  // Copy feedback state
  const [copiedRoute, setCopiedRoute] = useState<boolean>(false);

  // Current Difficulty Object
  const currentDiff = useMemo(() => {
    return DIFFICULTIES.find(d => d.level === selectedDifficultyLevel) || DIFFICULTIES[6];
  }, [selectedDifficultyLevel]);

  // Map & Team Modifiers
  const missionMetrics = useMemo(() => {
    let avgMinutes = 35;
    let mapFactor = 1.0;

    if (mapType === 'small') {
      avgMinutes = 12; // Blitz or Eradicate
      mapFactor = 0.65; // Fewer POIs exist on 12-min map
    } else if (mapType === 'medium') {
      avgMinutes = 22;
      mapFactor = 0.85;
    } else {
      avgMinutes = 35;
      mapFactor = 1.0;
    }

    // Team efficiency factor (Solo vs 4-man map sweep)
    const teamFactor = teamSize === 4 ? 1.0 : teamSize === 3 ? 0.90 : teamSize === 2 ? 0.80 : 0.65;

    const effectiveCommon = Math.round(currentDiff.commonCap * mapFactor * teamFactor);
    const effectiveRare = Math.round(currentDiff.rareCap * mapFactor * teamFactor);
    // Super samples are concentrated in 1 rock cluster, so full squad finds 100%, solo might miss if time runs out
    const effectiveSuper = currentDiff.superCap > 0 ? (teamSize >= 2 ? currentDiff.superCap : Math.max(1, currentDiff.superCap - 1)) : 0;

    return {
      avgMinutes,
      effectiveCommon,
      effectiveRare,
      effectiveSuper
    };
  }, [mapType, teamSize, currentDiff]);

  // Deficit and Missions to Max Ship Modules
  const sampleCalculations = useMemo(() => {
    const commonNeeded = Math.max(0, TOTAL_SHIP_COSTS.common - ownedCommon);
    const rareNeeded = Math.max(0, TOTAL_SHIP_COSTS.rare - ownedRare);
    const superNeeded = Math.max(0, TOTAL_SHIP_COSTS.super - ownedSuper);

    // Progress percentages
    const commonProgress = Math.min(100, Math.round((ownedCommon / TOTAL_SHIP_COSTS.common) * 100));
    const rareProgress = Math.min(100, Math.round((ownedRare / TOTAL_SHIP_COSTS.rare) * 100));
    const superProgress = Math.min(100, Math.round((ownedSuper / TOTAL_SHIP_COSTS.super) * 100));
    const overallProgress = Math.round((commonProgress + rareProgress + superProgress) / 3);

    // Missions on Current Selected Difficulty
    const missionsForCommon = missionMetrics.effectiveCommon > 0 ? Math.ceil(commonNeeded / missionMetrics.effectiveCommon) : 999;
    const missionsForRare = missionMetrics.effectiveRare > 0 ? Math.ceil(rareNeeded / missionMetrics.effectiveRare) : 999;
    const missionsForSuper = missionMetrics.effectiveSuper > 0 ? Math.ceil(superNeeded / missionMetrics.effectiveSuper) : 999;

    // The bottleneck determines overall missions needed
    const bottleneckMissions = Math.max(missionsForCommon, missionsForRare, missionsForSuper);

    // If farming on optimal Helldive (Diff 9) with 4 players:
    // Helldive yield: 40 Common, 25 Rare, 7 Super per 25-30 min run
    const helldiveMissionsCommon = Math.ceil(commonNeeded / 40);
    const helldiveMissionsRare = Math.ceil(rareNeeded / 25);
    const helldiveMissionsSuper = Math.ceil(superNeeded / 7);
    const helldiveBottleneckMissions = Math.max(helldiveMissionsCommon, helldiveMissionsRare, helldiveMissionsSuper);

    // Hours calculation
    const currentHours = ((bottleneckMissions * missionMetrics.avgMinutes) / 60).toFixed(1);
    const helldiveHours = ((helldiveBottleneckMissions * 25) / 60).toFixed(1);

    // Identify which sample is the primary bottleneck
    let bottleneckName = 'Rare Samples';
    let bottleneckColor = 'text-amber-400';
    if (missionsForCommon >= missionsForRare && missionsForCommon >= missionsForSuper) {
      bottleneckName = 'Common Samples';
      bottleneckColor = 'text-emerald-400';
    } else if (missionsForSuper >= missionsForRare && missionsForSuper >= missionsForCommon) {
      bottleneckName = 'Super Uranium';
      bottleneckColor = 'text-purple-400';
    }

    // Daily Farm Projection
    const totalRemainingHours = Number(helldiveHours);
    const daysToMax = dailyFarmHours > 0 ? Math.max(1, Math.ceil(totalRemainingHours / dailyFarmHours)) : 0;

    return {
      commonNeeded,
      rareNeeded,
      superNeeded,
      commonProgress,
      rareProgress,
      superProgress,
      overallProgress,
      missionsForCommon,
      missionsForRare,
      missionsForSuper,
      bottleneckMissions,
      helldiveBottleneckMissions,
      currentHours,
      helldiveHours,
      bottleneckName,
      bottleneckColor,
      daysToMax
    };
  }, [ownedCommon, ownedRare, ownedSuper, missionMetrics, dailyFarmHours]);

  // Presets
  const applyPreset = (common: number, rare: number, superS: number) => {
    setOwnedCommon(common);
    setOwnedRare(rare);
    setOwnedSuper(superS);
  };

  // Copy Tactical Farm Route
  const handleCopyFarmRoute = () => {
    const routeText = 
`HELLDIVERS 2 OPTIMAL SAMPLE FARM ROUTE (2026)
--------------------------------------------------
TARGET YIELD: 7 Super Uranium + 25 Rare + 40 Common Samples
RECOMMENDED OPERATION: Difficulty 9 (Helldive) Blitz: Search & Destroy or 40m Bug Desert Map
SQUAD SIZE: 4 Helldivers (Speed Split Setup)

TACTICAL STEP-BY-STEP:
1. Scan the Horizon: Immediately upon dropping, scan 360° for the distinctive tall, bulbous silver-veined rock monolith ("The Super Rock / Cock Rock").
2. Grab the Pink Samples First: Rush the rock monolith and collect all ${currentDiff.superCap || 7} Super Uranium floating at its base.
3. Drop at Extraction Early: Run by the Extraction Pad and press your drop-wheel (Hold Down on D-pad or 'X' key) to deposit the sample container safely on the landing pad. Even if you wipe in combat, the samples are already at extraction!
4. Clear Radar Station Secondary: Prioritize the Radar Dish sub-objective to reveal all diamond icons (POIs) across the entire map.
5. Extract & Profit: Every sample is pooled 100% for the entire squad!

Calculate your ship unlock ETA: https://gamingtoolshub.com/tools/helldivers-2-sample-calculator`;

    navigator.clipboard.writeText(routeText);
    setCopiedRoute(true);
    setTimeout(() => setCopiedRoute(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Top Banner & Title Card */}
      <div className="bg-[#090a0f] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFE900]/10 border border-[#FFE900]/30 flex items-center justify-center text-[#FFE900]">
              <FlaskConical className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Super Earth Ordnance Logistics
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Sample Caps & Farm Optimizer (2026)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFE900]/10 text-[#FFE900] border border-[#FFE900]/30 font-mono">
              Tier 5 Ship Modules
            </span>
          </div>
        </div>

        {/* Difficulty Selector: 1-9 In-Game Skulls */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold tracking-wider uppercase text-zinc-300 flex items-center gap-2">
              <Skull className="w-4 h-4 text-[#FFE900]" />
              Select Mission Difficulty (1–9)
            </label>
            <span className="text-xs font-mono font-bold text-[#FFE900] bg-zinc-900 px-2.5 py-1 rounded border border-zinc-700">
              Selected: {currentDiff.level} - {currentDiff.name} ({currentDiff.romanNumeral})
            </span>
          </div>

          {/* 9 Interactive Skull Buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
            {DIFFICULTIES.map(diff => {
              const isSelected = diff.level === selectedDifficultyLevel;
              return (
                <button
                  key={diff.level}
                  onClick={() => setSelectedDifficultyLevel(diff.level)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? `bg-zinc-900 border-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.25)] scale-105 ring-1 ring-[#FFE900]`
                      : `bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60`
                  }`}
                >
                  <Skull className={`w-5 h-5 mb-1 ${isSelected ? 'text-[#FFE900]' : diff.colorClass}`} />
                  <span className="text-xs font-black font-mono tracking-tighter">
                    {diff.romanNumeral}
                  </span>
                  <span className="text-[10px] text-zinc-400 truncate max-w-full font-medium">
                    {diff.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Slider scrubbing option */}
          <div className="pt-2">
            <input
              type="range"
              min="1"
              max="9"
              step="1"
              value={selectedDifficultyLevel}
              aria-label="Mission difficulty slider"
              onChange={(e) => setSelectedDifficultyLevel(Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#FFE900]"
            />
          </div>
        </div>

        {/* Map Type & Team Size Controls */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-zinc-800/80">
          {/* Map Type Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-zinc-300" />
              Mission Map Type & Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setMapType('small')}
                className={`py-2 px-2 rounded-lg text-xs font-bold font-mono border transition cursor-pointer text-center ${
                  mapType === 'small'
                    ? 'bg-[#FFE900]/15 border-[#FFE900] text-[#FFE900]'
                    : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Small / Blitz
                <span className="block text-[10px] text-zinc-500 font-normal">12-15 Mins</span>
              </button>
              <button
                onClick={() => setMapType('medium')}
                className={`py-2 px-2 rounded-lg text-xs font-bold font-mono border transition cursor-pointer text-center ${
                  mapType === 'medium'
                    ? 'bg-[#FFE900]/15 border-[#FFE900] text-[#FFE900]'
                    : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Medium Map
                <span className="block text-[10px] text-zinc-500 font-normal">20-25 Mins</span>
              </button>
              <button
                onClick={() => setMapType('large')}
                className={`py-2 px-2 rounded-lg text-xs font-bold font-mono border transition cursor-pointer text-center ${
                  mapType === 'large'
                    ? 'bg-[#FFE900]/15 border-[#FFE900] text-[#FFE900]'
                    : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Full Campaign
                <span className="block text-[10px] text-zinc-500 font-normal">40 Mins (Max)</span>
              </button>
            </div>
          </div>

          {/* Team Size Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-zinc-300" />
              Helldiver Squad Size ({teamSize} Players)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(size => (
                <button
                  key={size}
                  onClick={() => setTeamSize(size)}
                  className={`py-2 rounded-lg text-xs font-bold font-mono border transition cursor-pointer text-center ${
                    teamSize === size
                      ? 'bg-[#FFE900]/15 border-[#FFE900] text-[#FFE900]'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {size === 1 ? 'Solo' : `${size} Divers`}
                  <span className="block text-[10px] text-zinc-500 font-normal">
                    {size === 4 ? '100% POIs' : size === 1 ? '~65% POIs' : `~${size * 25}%`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: 3 Big Glowing Sample Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Common Samples Card (Green) */}
        <div className="bg-[#090b10] border-2 border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-[0_0_20px_rgba(16,185,129,0.12)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-emerald-400" />
              Common Sample
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
              All Difficulties
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight">
              {missionMetrics.effectiveCommon}
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              / {currentDiff.commonCap} max on map
            </span>
          </div>

          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Found at Minor Points of Interest, destroyed Bug Nests, Automaton Fabricators, and extraction zones.
          </p>

          <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Total Fleet Cost:</span>
            <span className="text-emerald-400 font-bold">{TOTAL_SHIP_COSTS.common} Samples</span>
          </div>
        </div>

        {/* Rare Samples Card (Orange) */}
        <div className="bg-[#090b10] border-2 border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-[0_0_20px_rgba(245,158,11,0.12)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-amber-400" />
              Rare Sample
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300">
              Diff 3+ Required
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black font-mono text-amber-400 tracking-tight">
              {missionMetrics.effectiveRare}
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              / {currentDiff.rareCap} max on map
            </span>
          </div>

          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Spawns inside heavy outpost centers, radar dish bases, and hidden shipping container doors requiring grenades.
          </p>

          <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Total Fleet Cost:</span>
            <span className="text-amber-400 font-bold">{TOTAL_SHIP_COSTS.rare} Samples</span>
          </div>
        </div>

        {/* Super Uranium Samples Card (Pink / Fuchsia) */}
        <div className="bg-[#090b10] border-2 border-fuchsia-500/60 rounded-2xl p-5 sm:p-6 shadow-[0_0_20px_rgba(217,70,239,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              Super Uranium
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-fuchsia-950/60 border border-fuchsia-500/40 text-fuchsia-300">
              Diff 6+ Only
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${
              currentDiff.superCap > 0 ? 'text-fuchsia-400' : 'text-zinc-600'
            }`}>
              {missionMetrics.effectiveSuper}
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              / {currentDiff.superCap} max on map
            </span>
          </div>

          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            {currentDiff.superCap > 0 
              ? 'Spawns exclusively in floating clusters around the silver-veined rock monolith ("Cock Rock").'
              : 'Does not spawn on this difficulty. Must play Difficulty 6 (Extreme) or higher!'}
          </p>

          <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Total Fleet Cost:</span>
            <span className="text-fuchsia-400 font-bold">{TOTAL_SHIP_COSTS.super} Samples</span>
          </div>
        </div>
      </div>

      {/* Calculator Section 1: "How Many Missions Left?" */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div>
            <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#FFE900]" />
              Super Destroyer Upgrade Progress Tracker
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Input your current inventory to calculate exact mission bottlenecks and time remaining.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-400 font-mono">Presets:</span>
            <button
              onClick={() => applyPreset(0, 0, 0)}
              className="text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-zinc-500 cursor-pointer"
            >
              Fresh Cadet (0)
            </button>
            <button
              onClick={() => applyPreset(120, 65, 20)}
              className="text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-zinc-500 cursor-pointer"
            >
              Mid-Tier (50%)
            </button>
            <button
              onClick={() => applyPreset(210, 145, 65)}
              className="text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-zinc-500 cursor-pointer"
            >
              End-Game (85%)
            </button>
          </div>
        </div>

        {/* 3 Interactive Input Sliders */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Common Input */}
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5" />
                Current Common
              </span>
              <span className="text-sm font-black font-mono text-emerald-400">
                {ownedCommon} / {TOTAL_SHIP_COSTS.common}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={TOTAL_SHIP_COSTS.common}
              value={ownedCommon}
              aria-label="Current common samples"
              onChange={(e) => setOwnedCommon(Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="mt-3 flex justify-between text-[11px] text-zinc-400 font-mono">
              <span>Needed: {sampleCalculations.commonNeeded}</span>
              <span className="font-bold text-emerald-400">{sampleCalculations.commonProgress}%</span>
            </div>
          </div>

          {/* Rare Input */}
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5" />
                Current Rare
              </span>
              <span className="text-sm font-black font-mono text-amber-400">
                {ownedRare} / {TOTAL_SHIP_COSTS.rare}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={TOTAL_SHIP_COSTS.rare}
              value={ownedRare}
              aria-label="Current rare samples"
              onChange={(e) => setOwnedRare(Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="mt-3 flex justify-between text-[11px] text-zinc-400 font-mono">
              <span>Needed: {sampleCalculations.rareNeeded}</span>
              <span className="font-bold text-amber-400">{sampleCalculations.rareProgress}%</span>
            </div>
          </div>

          {/* Super Uranium Input */}
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-fuchsia-400 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Current Super
              </span>
              <span className="text-sm font-black font-mono text-fuchsia-400">
                {ownedSuper} / {TOTAL_SHIP_COSTS.super}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={TOTAL_SHIP_COSTS.super}
              value={ownedSuper}
              aria-label="Current super samples"
              onChange={(e) => setOwnedSuper(Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-400"
            />
            <div className="mt-3 flex justify-between text-[11px] text-zinc-400 font-mono">
              <span>Needed: {sampleCalculations.superNeeded}</span>
              <span className="font-bold text-fuchsia-400">{sampleCalculations.superProgress}%</span>
            </div>
          </div>
        </div>

        {/* Big Results Banner: Missions to Max Ship */}
        <div className="mt-6 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border-2 border-[#FFE900]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFE900] flex items-center justify-center md:justify-start gap-1.5">
              <Target className="w-4 h-4" />
              Upgrade Forecast (Helldive Diff 9)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white">
              You need <span className="text-[#FFE900] underline">{sampleCalculations.helldiveBottleneckMissions} more</span> Helldive missions
            </div>
            <p className="text-xs text-zinc-400">
              Equivalent to <span className="text-zinc-200 font-bold font-mono">~{sampleCalculations.helldiveHours} hours</span> of combat. Primary bottleneck: <span className={`font-bold ${sampleCalculations.bottleneckColor}`}>{sampleCalculations.bottleneckName}</span>.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleCopyFarmRoute}
              className="w-full md:w-auto px-5 py-3 rounded-xl bg-[#FFE900] text-black font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-[#fff033] shadow-lg shadow-[#FFE900]/20 transition cursor-pointer"
            >
              {copiedRoute ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  Route Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Copy Farm Route
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: "Best Farm Table" (Time vs Reward Efficiency) */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="pb-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Optimal Sample Farming Yield Table (2026 Meta)
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Tested meta farm routes comparing time-to-yield efficiency across top difficulty levels.
            </p>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[11px] tracking-wider">
                <th className="py-3 px-3">Target Sample</th>
                <th className="py-3 px-3">Recommended Diff</th>
                <th className="py-3 px-3">Mission Type</th>
                <th className="py-3 px-3">Avg Run Time</th>
                <th className="py-3 px-3">Yield Per Run</th>
                <th className="py-3 px-3 text-right">Hourly Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {/* Row 1: Fastest Common */}
              <tr className="hover:bg-zinc-900/40 transition">
                <td className="py-3.5 px-3 font-bold text-emerald-400 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-emerald-400" />
                  Fastest Common
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold">
                    Diff 3 (Medium)
                  </span>
                </td>
                <td className="py-3.5 px-3 text-zinc-300">Eradicate / Blitz</td>
                <td className="py-3.5 px-3 text-zinc-300">~6 Mins</td>
                <td className="py-3.5 px-3 font-bold text-emerald-400">15 Common</td>
                <td className="py-3.5 px-3 text-right font-black text-emerald-400">
                  ~150 / hr
                </td>
              </tr>

              {/* Row 2: Fastest Rare */}
              <tr className="hover:bg-zinc-900/40 transition">
                <td className="py-3.5 px-3 font-bold text-amber-400 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-amber-400" />
                  Fastest Rare
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded bg-orange-950/60 border border-orange-500/30 text-orange-300 font-bold">
                    Diff 7 (Suicide)
                  </span>
                </td>
                <td className="py-3.5 px-3 text-zinc-300">Search & Destroy (Bugs)</td>
                <td className="py-3.5 px-3 text-zinc-300">~15 Mins</td>
                <td className="py-3.5 px-3 font-bold text-amber-400">15 Rare + 30 Common</td>
                <td className="py-3.5 px-3 text-right font-black text-amber-400">
                  ~60 Rare / hr
                </td>
              </tr>

              {/* Row 3: Fastest Super */}
              <tr className="hover:bg-zinc-900/40 transition">
                <td className="py-3.5 px-3 font-bold text-fuchsia-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-fuchsia-400" />
                  Fastest Super
                </td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/40 text-purple-300 font-bold">
                    Diff 9 (Helldive)
                  </span>
                </td>
                <td className="py-3.5 px-3 text-zinc-300">Blitz Speedrun + Rock Scout</td>
                <td className="py-3.5 px-3 text-zinc-300">~14-18 Mins</td>
                <td className="py-3.5 px-3 font-bold text-fuchsia-400">7 Super Uranium</td>
                <td className="py-3.5 px-3 text-right font-black text-fuchsia-400">
                  ~24-28 Super / hr
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Viral Feature 1 & 2: Super Sample Radar Map & Daily Farm Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Super Sample Radar Map Blueprint */}
        <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                Super Sample "Cock Rock" Radar Blueprint
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-950/60 text-fuchsia-300 border border-fuchsia-500/30">
                100% Spawns Near Rock
              </span>
            </div>

            {/* Simulated Radar Map Graphic */}
            <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 relative h-56 flex items-center justify-center overflow-hidden">
              {/* Radar Grid Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 rounded-full border border-zinc-800/80" />
                <div className="w-32 h-32 rounded-full border border-zinc-800/60" />
                <div className="w-16 h-16 rounded-full border border-zinc-800/40" />
                <div className="absolute w-full h-[1px] bg-zinc-800/60" />
                <div className="absolute h-full w-[1px] bg-zinc-800/60" />
              </div>

              {/* Extraction Pad Icon Center */}
              <div className="absolute bottom-6 left-8 flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center text-emerald-400">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono text-emerald-400 mt-1 font-bold">Extraction (Bank Here)</span>
              </div>

              {/* Super Rock Monolith Spawn Location (Top Right) */}
              <div className="absolute top-6 right-10 flex flex-col items-center animate-bounce">
                <div className="w-10 h-10 rounded-xl bg-fuchsia-600/30 border-2 border-fuchsia-400 flex items-center justify-center text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-fuchsia-300 font-bold bg-zinc-900/90 px-1.5 py-0.5 rounded border border-fuchsia-500/40 mt-1">
                  7 Super Samples (Cock Rock)
                </span>
              </div>

              {/* Radar Tower Objective */}
              <div className="absolute top-12 left-12 flex flex-col items-center">
                <div className="w-6 h-6 rounded-md bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-mono text-blue-400 mt-0.5">Radar Tower POI</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-zinc-300 leading-relaxed">
              <strong className="text-white">Pro Tip:</strong> Look for a tall, smooth, phallic stone monolith with shimmering silver-metallic veins. All 3 to 7 Super Samples float directly at its base on Difficulties 6–9.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Extract Drop Strategy:</span>
            <span className="text-[#FFE900] font-bold">Drop samples on pad prior to clearing map</span>
          </div>
        </div>

        {/* Viral Daily Farm Time Calculator */}
        <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFE900] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#FFE900]" />
                Daily Playtime to Max Fleet Calculator
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFE900]/10 text-[#FFE900] border border-[#FFE900]/30 font-bold">
                Personalized Pace
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-zinc-300 uppercase">
                  Daily Farming Commitment:
                </label>
                <span className="text-sm font-black font-mono text-[#FFE900] bg-zinc-900 px-3 py-1 rounded border border-zinc-700">
                  {dailyFarmHours} Hours / Day
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="6"
                step="0.5"
                value={dailyFarmHours}
                aria-label="Daily farming hours"
                onChange={(e) => setDailyFarmHours(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#FFE900]"
              />

              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>Casual (1h)</span>
                <span>Dedicated (3h)</span>
                <span>Hardcore (6h)</span>
              </div>
            </div>

            {/* Result callout */}
            <div className="mt-6 p-4 rounded-xl bg-zinc-950 border border-zinc-800/90 space-y-2">
              <div className="text-xs font-bold text-zinc-400 uppercase font-mono">
                Estimated Fleet Completion:
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                Max Ship in <span className="text-[#FFE900] underline">{sampleCalculations.daysToMax} Days</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Assuming you run Difficulty 7–9 operations with an average 4-diver squad extracting with full Super and Rare sample quotas.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Overall Fleet Completion:</span>
            <span className="text-emerald-400 font-bold">{sampleCalculations.overallProgress}% Completed</span>
          </div>
        </div>
      </div>

      {/* SEO Footer & Verified Game Mechanics */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 text-zinc-300 text-xs leading-relaxed">
        <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-[#FFE900]" />
          Helldivers 2 Sample Extraction Mechanics & Verified Rules (2026)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
            <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#FFE900]" />
              1. Samples Are 100% Shared Across Squad
            </h5>
            <p className="text-zinc-400">
              There is zero team competition for samples. If one player extracts with 40 Common, 25 Rare, and 7 Super samples, all 4 players receive the full reward upon mission debriefing.
            </p>
          </div>

          <div className="space-y-2 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
            <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              2. The Extraction Pad Banking Technique
            </h5>
            <p className="text-zinc-400">
              If your squad passes near the extraction beacon early in the match, open your inventory wheel (hold Down or X) and drop your sample container directly on the helipad. If you die in deep combat later, your samples remain safe at extraction.
            </p>
          </div>

          <div className="space-y-2 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
            <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              3. Deep Water & Bug Hole Hazard
            </h5>
            <p className="text-zinc-400">
              Dying inside deep water or directly into an open Bug Hole can permanently submerge sample containers beyond retrieval reach. Steer clear of water bodies when holding the Super Sample vial!
            </p>
          </div>

          <div className="space-y-2 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
            <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              4. Radar Tower Diamond Icons
            </h5>
            <p className="text-zinc-400">
              Completing the secondary Radar Station objective changes all Minor POIs on your compass to diamond icons. An open diamond indicates uncollected samples or Super Credits; a closed dot means the POI is depleted.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center text-zinc-500 font-mono text-[11px]">
          Helldivers 2 Sample Calculator – How to farm Super Samples Fast 2026 • Verified Super Earth Logistics Hub
        </div>
      </div>
    </div>
  );
}
