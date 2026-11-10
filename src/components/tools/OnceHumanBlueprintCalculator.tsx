/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Star, Flame, Zap, Shield, Target, Radio, Crosshair,
  HelpCircle, CheckCircle2, ChevronRight, Info, AlertCircle, RefreshCw,
  Coins, ArrowUpRight, Award, Layers, Gift
} from 'lucide-react';
import { 
  BLUEPRINT_STAR_TIERS, PRESET_ONCE_HUMAN_WEAPONS, FRAGMENT_VALUES, 
  OnceHumanWeapon, ONCE_HUMAN_FAQS 
} from '../../data/onceHumanData';

export default function OnceHumanBlueprintCalculator() {
  // Active weapon selection
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>('socr-outsider');

  // Current Star Level and Target Star Level
  const [currentStarLevel, setCurrentStarLevel] = useState<number>(1);
  const [targetStarLevel, setTargetStarLevel] = useState<number>(5);

  // User Fragment Inputs
  const [sameNameFrags, setSameNameFrags] = useState<number>(50); // Double XP (160 XP)
  const [sameBrandFrags, setSameBrandFrags] = useState<number>(20); // Normal XP (80 XP)
  const [sameBrandEpicFrags, setSameBrandEpicFrags] = useState<number>(10); // 40 XP
  const [genericFrags, setGenericFrags] = useState<number>(0); // 20 XP

  // Selected Weapon Object
  const selectedWeapon = useMemo(() => {
    return PRESET_ONCE_HUMAN_WEAPONS.find(w => w.id === selectedWeaponId) || PRESET_ONCE_HUMAN_WEAPONS[0];
  }, [selectedWeaponId]);

  // Calculate total XP accumulated from inputted fragments
  const accumulatedXp = useMemo(() => {
    return (
      (sameNameFrags * FRAGMENT_VALUES.sameNameLegendary) +
      (sameBrandFrags * FRAGMENT_VALUES.sameBrandLegendary) +
      (sameBrandEpicFrags * FRAGMENT_VALUES.sameBrandEpic) +
      (genericFrags * FRAGMENT_VALUES.genericFragment)
    );
  }, [sameNameFrags, sameBrandFrags, sameBrandEpicFrags, genericFrags]);

  // Target Tier Requirements
  const targetTier = useMemo(() => {
    return BLUEPRINT_STAR_TIERS.find(t => t.starLevel === targetStarLevel) || BLUEPRINT_STAR_TIERS[4];
  }, [targetStarLevel]);

  // Current Tier Requirements
  const currentTier = useMemo(() => {
    return BLUEPRINT_STAR_TIERS.find(t => t.starLevel === currentStarLevel) || BLUEPRINT_STAR_TIERS[0];
  }, [currentStarLevel]);

  // Net XP needed between current level and target level
  const netXpNeededForTarget = useMemo(() => {
    const net = targetTier.cumulativeXp - currentTier.cumulativeXp;
    return Math.max(0, net);
  }, [targetTier, currentTier]);

  // Remaining XP shortfall considering current accumulated fragment XP
  const remainingXpNeeded = useMemo(() => {
    return Math.max(0, netXpNeededForTarget - accumulatedXp);
  }, [netXpNeededForTarget, accumulatedXp]);

  // Shortfall in fragments equivalent
  const fragsShortfall = useMemo(() => {
    const sameNameNeeded = Math.ceil(remainingXpNeeded / FRAGMENT_VALUES.sameNameLegendary);
    const sameBrandNeeded = Math.ceil(remainingXpNeeded / FRAGMENT_VALUES.sameBrandLegendary);
    
    // Wish Machine Starchrom Estimate:
    // Buying a full 80-fragment blueprint in Starchrom Shop costs 8,000 Starchrom (100 Starchrom per fragment).
    // Wish Machine pull costs 500 Starchrom per pull (~30-50 fragments avg or full weapon drop).
    const starchromShopEstimate = sameBrandNeeded * 100;
    const wishMachinePullsEstimate = Math.ceil(sameBrandNeeded / 15); // approx 15 frags avg per pull

    return {
      sameNameNeeded,
      sameBrandNeeded,
      starchromShopEstimate,
      wishMachinePullsEstimate,
    };
  }, [remainingXpNeeded]);

  // Calculate current effective star progress percentage
  const totalMaxXp = 29600;
  const progressPercentage = Math.min(100, Math.round(((currentTier.cumulativeXp + accumulatedXp) / totalMaxXp) * 100));

  const getWeaponIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Snowflake': return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-red-400" />;
      case 'Bomb': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Radio': return <Radio className="w-5 h-5 text-purple-400" />;
      case 'Target': return <Target className="w-5 h-5 text-emerald-400" />;
      default: return <Crosshair className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 font-sans">
      {/* Sci-Fi Post-Apocalyptic Starchrom Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 border border-purple-500/30 p-6 md:p-8 shadow-2xl shadow-purple-950/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-purple-950 border border-purple-500/40 text-purple-300 flex items-center gap-1.5 shadow-sm">
                <Coins className="w-3.5 h-3.5 text-amber-400" /> Once Human Starchrom & Fragment Engine
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 border border-amber-500/30 text-amber-300">
                Official 29,600 XP Max Tier
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              Blueprint Star Upgrade & Fragment XP Calculator
            </h1>
            <p className="text-slate-300 mt-2 text-sm md:text-base max-w-3xl">
              Calculate exact Fragment XP required for <span className="text-purple-300 font-semibold">{selectedWeapon.name}</span>, factor in Same-Name double XP bonuses (160 XP), and compute Starchrom costs for 1★ to 5★ Star tiers.
            </p>
          </div>

          {/* Quick Summary Dashboard */}
          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 bg-slate-900/90 border border-purple-500/30 rounded-xl p-4 min-w-[220px]">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Remaining XP Needed</span>
            <span className="text-3xl font-black text-amber-400 tracking-wider">
              {remainingXpNeeded.toLocaleString()} <span className="text-xs text-slate-400 font-medium">XP</span>
            </span>
            <div className="text-xs text-purple-300 font-medium flex items-center gap-1">
              <span>Target: {targetStarLevel}★ ({targetTier.cumulativeXp.toLocaleString()} total XP)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Weapon Selector */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-purple-400" /> Choose Legendary Blueprint
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {PRESET_ONCE_HUMAN_WEAPONS.map((w) => {
            const isSelected = selectedWeaponId === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setSelectedWeaponId(w.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-center group ${
                  isSelected
                    ? 'bg-purple-950/80 border-purple-400 text-purple-300 shadow-md shadow-purple-950/50 scale-[1.02]'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="mb-1.5 p-2 rounded-lg bg-slate-900/80 border border-slate-800 group-hover:border-slate-700">
                  {getWeaponIcon(w.icon)}
                </div>
                <span className="text-xs font-bold truncate w-full">{w.name}</span>
                <span className="text-[10px] text-purple-400 font-medium">{w.brand}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Star Upgrade Progress Nodes Tracker */}
      <div className="bg-slate-900/90 border border-purple-500/20 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" /> Blueprint Star Tier Milestone Journey
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cumulative XP requirements for each Star level upgrade in Once Human.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-amber-400 bg-amber-950/50 border border-amber-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
            {progressPercentage}% to 5★ Max (29,600 XP)
          </div>
        </div>

        {/* Milestone Steps Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {BLUEPRINT_STAR_TIERS.map((tier) => {
            const isCurrent = currentStarLevel === tier.starLevel;
            const isTarget = targetStarLevel === tier.starLevel;
            const isAchieved = currentTier.cumulativeXp + accumulatedXp >= tier.cumulativeXp;

            return (
              <div
                key={tier.starLevel}
                onClick={() => {
                  if (tier.starLevel >= currentStarLevel) {
                    setTargetStarLevel(tier.starLevel);
                  }
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 relative overflow-hidden ${
                  isTarget
                    ? 'bg-purple-950/80 border-purple-400 shadow-lg shadow-purple-950/60 scale-[1.02]'
                    : isAchieved
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black flex items-center gap-1 text-amber-400">
                    {tier.starLevel} <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </span>
                  {isAchieved ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isTarget ? (
                    <span className="text-[10px] bg-purple-500 text-slate-950 font-bold px-1.5 py-0.5 rounded uppercase">Target</span>
                  ) : null}
                </div>

                <div className="text-xs font-mono font-bold text-white">
                  {tier.cumulativeXp.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">XP</span>
                </div>

                <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                  {tier.bonusStatPerk}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Inputs vs Calculation Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Star Levels & Fragment Inventory Inputs (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" /> Blueprint Tier & Inventory
              </h3>
              <span className="text-xs text-purple-400 font-mono">Input Fragment Counts</span>
            </div>

            {/* Current vs Target Star Level Selectors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Current Blueprint Level</label>
                <select
                  value={currentStarLevel}
                  onChange={(e) => {
                    const newCurrent = Number(e.target.value);
                    setCurrentStarLevel(newCurrent);
                    if (newCurrent > targetStarLevel) {
                      setTargetStarLevel(newCurrent);
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-amber-400 font-bold focus:outline-none focus:border-purple-400"
                >
                  <option value={1}>1 Star (0 XP)</option>
                  <option value={2}>2 Star (1,600 XP)</option>
                  <option value={3}>3 Star (5,600 XP)</option>
                  <option value={4}>4 Star (13,600 XP)</option>
                  <option value={5}>5 Star (29,600 XP)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Target Blueprint Level</label>
                <select
                  value={targetStarLevel}
                  onChange={(e) => setTargetStarLevel(Math.max(currentStarLevel, Number(e.target.value)))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-purple-300 font-bold focus:outline-none focus:border-purple-400"
                >
                  <option value={1} disabled={currentStarLevel > 1}>1 Star</option>
                  <option value={2} disabled={currentStarLevel > 2}>2 Star (+1,600 XP)</option>
                  <option value={3} disabled={currentStarLevel > 3}>3 Star (+5,600 XP)</option>
                  <option value={4} disabled={currentStarLevel > 4}>4 Star (+13,600 XP)</option>
                  <option value={5}>5 Star (Max 29,600 XP)</option>
                </select>
              </div>
            </div>

            {/* Fragment Inputs Form */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Your Blueprint Fragment Inventory
              </h4>

              {/* 1. Same-Name Fragments (Double XP = 160 XP) */}
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-purple-200 flex items-center gap-1.5">
                      <span>Same-Name Legendary Fragments</span>
                      <span className="text-[10px] bg-purple-500/30 text-purple-300 px-2 py-0.5 rounded font-bold">2x DOUBLE XP (160 XP)</span>
                    </div>
                    <div className="text-xs text-slate-400">Matching weapon ({selectedWeapon.name})</div>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={sameNameFrags}
                    onChange={(e) => setSameNameFrags(Math.max(0, Number(e.target.value) || 0))}
                    className="w-24 bg-slate-950 border border-purple-500/50 rounded-lg px-3 py-1.5 text-sm text-amber-400 font-mono font-bold text-right focus:outline-none focus:border-purple-300"
                  />
                </div>
                <div className="text-right text-[11px] text-purple-300 font-mono">
                  Yields: {(sameNameFrags * FRAGMENT_VALUES.sameNameLegendary).toLocaleString()} XP
                </div>
              </div>

              {/* 2. Same-Brand Legendary Fragments (Normal XP = 80 XP) */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Same-Brand Legendary Fragments</span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">1x NORMAL XP (80 XP)</span>
                    </div>
                    <div className="text-xs text-slate-400">Matching brand ({selectedWeapon.brand})</div>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={sameBrandFrags}
                    onChange={(e) => setSameBrandFrags(Math.max(0, Number(e.target.value) || 0))}
                    className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white font-mono font-bold text-right focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div className="text-right text-[11px] text-slate-400 font-mono">
                  Yields: {(sameBrandFrags * FRAGMENT_VALUES.sameBrandLegendary).toLocaleString()} XP
                </div>
              </div>

              {/* 3. Same-Brand Epic Fragments (40 XP) */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-300">
                      Same-Brand Epic Fragments <span className="text-xs text-purple-400 font-mono font-semibold">(40 XP)</span>
                    </div>
                    <div className="text-xs text-slate-400">Purple quality {selectedWeapon.brand} fragments</div>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={sameBrandEpicFrags}
                    onChange={(e) => setSameBrandEpicFrags(Math.max(0, Number(e.target.value) || 0))}
                    className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white font-mono font-bold text-right focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div className="text-right text-[11px] text-slate-400 font-mono">
                  Yields: {(sameBrandEpicFrags * FRAGMENT_VALUES.sameBrandEpic).toLocaleString()} XP
                </div>
              </div>

              {/* 4. Generic Fragments (20 XP) */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-300">
                      Generic / Rare Fragments <span className="text-xs text-purple-400 font-mono font-semibold">(20 XP)</span>
                    </div>
                    <div className="text-xs text-slate-400">Blue quality or mismatched fragments</div>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={genericFrags}
                    onChange={(e) => setGenericFrags(Math.max(0, Number(e.target.value) || 0))}
                    className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white font-mono font-bold text-right focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div className="text-right text-[11px] text-slate-400 font-mono">
                  Yields: {(genericFrags * FRAGMENT_VALUES.genericFragment).toLocaleString()} XP
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Calculations & Shortfall Breakdown (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Upgrade Calculation Summary
              </h3>
              <span className="text-xs font-bold text-amber-400 bg-amber-950 border border-amber-500/40 px-2.5 py-1 rounded-full">
                {currentStarLevel}★ → {targetStarLevel}★ Target
              </span>
            </div>

            {/* Total XP Progress Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1">
                <div className="text-xs text-slate-400 font-semibold">Fragment XP Inventory</div>
                <div className="text-2xl font-black text-purple-300 font-mono">
                  {accumulatedXp.toLocaleString()} <span className="text-xs text-slate-400">XP</span>
                </div>
                <div className="text-[11px] text-slate-500">From inputted blueprint fragments</div>
              </div>

              <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 space-y-1">
                <div className="text-xs text-slate-400 font-semibold">Net Target Requirement</div>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {netXpNeededForTarget.toLocaleString()} <span className="text-xs text-slate-400">XP</span>
                </div>
                <div className="text-[11px] text-slate-500">XP needed from {currentStarLevel}★ to {targetStarLevel}★</div>
              </div>
            </div>

            {/* Shortfall Verdict Card */}
            {remainingXpNeeded === 0 ? (
              <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-xl p-4 space-y-2 text-emerald-200">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> READY TO UPGRADE!
                </div>
                <p className="text-xs text-emerald-300/80 leading-relaxed">
                  You have enough fragment XP in your inventory to upgrade <strong className="text-white">{selectedWeapon.name}</strong> directly to <strong className="text-white">{targetStarLevel}★</strong>!
                </p>
              </div>
            ) : (
              <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Fragments Shortfall Needed</span>
                  <span className="text-xs text-amber-400 font-mono font-bold">
                    Need {remainingXpNeeded.toLocaleString()} XP More
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-purple-950/50 border border-purple-500/40 space-y-1">
                    <div className="text-slate-300 font-bold flex items-center justify-between">
                      <span>Option A: Same-Name</span>
                      <span className="text-amber-400 font-mono font-black text-sm">
                        {fragsShortfall.sameNameNeeded} frags
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Requires {fragsShortfall.sameNameNeeded} SOCR Outsider fragments (160 XP each)
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-slate-300 font-bold flex items-center justify-between">
                      <span>Option B: Same-Brand</span>
                      <span className="text-white font-mono font-black text-sm">
                        {fragsShortfall.sameBrandNeeded} frags
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Requires {fragsShortfall.sameBrandNeeded} Brahminy fragments (80 XP each)
                    </div>
                  </div>
                </div>

                {/* Starchrom & Wish Machine Cost Estimates */}
                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Coins className="w-4 h-4 text-amber-400" /> Wish Shop Starchrom Cost:
                    </span>
                    <span className="font-mono font-bold text-amber-400">
                      ~{fragsShortfall.starchromShopEstimate.toLocaleString()} Starchrom
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Gift className="w-4 h-4 text-purple-400" /> Wish Machine Pulls:
                    </span>
                    <span className="font-mono font-bold text-purple-300">
                      ~{fragsShortfall.wishMachinePullsEstimate} Draws (~{(fragsShortfall.wishMachinePullsEstimate * 500).toLocaleString()} Starchrom)
                    </span>
                  </div>
                </div>

              </div>
            )}

            {/* In-Game Tip Banner */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Pro Tip:</strong> Prioritize using Same-Name blueprint fragments for your main weapon upgrades since they provide 2x double XP (160 XP vs 80 XP). Save Same-Brand fragments for tier filler when Same-Name duplicates are unavailable!
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Educational Guide & FAQs */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-purple-400" /> Once Human Blueprint Upgrade Mechanics Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          {ONCE_HUMAN_FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-purple-300 text-xs flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-400" /> {faq.question}
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
