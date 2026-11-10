/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Swords, 
  Zap, 
  Sparkles, 
  Heart, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Info, 
  Lock, 
  Unlock, 
  Copy, 
  ShieldAlert,
  Award,
  Sparkle,
  Layers,
  ChevronRight
} from 'lucide-react';
import { 
  TYPE_SOUL_GRADES, 
  STAT_TREES, 
  TYPE_SOUL_PRESETS, 
  StatType, 
  HybridBuildPreset 
} from '../../data/typeSoulData';

export const TypeSoulStatPlanner: React.FC = () => {
  const [selectedGradeId, setSelectedGradeId] = useState<string>('elite_grade');
  const [stats, setStats] = useState<Record<StatType, number>>({
    kendo: 40,
    hakuda: 0,
    speed: 20,
    kido: 0,
    medic: 0,
  });
  const [copied, setCopied] = useState(false);

  const currentGrade = TYPE_SOUL_GRADES.find(g => g.id === selectedGradeId) || TYPE_SOUL_GRADES[6];
  const maxPoints = currentGrade.maxPoints;

  // Calculate total allocated points
  const totalAllocated = Object.values(stats).reduce((acc, curr) => acc + curr, 0);
  const remainingPoints = Math.max(0, maxPoints - totalAllocated);

  // Handle stat change with strict cap enforcement
  const handleStatChange = (statKey: StatType, rawVal: number) => {
    const val = Math.max(0, Math.min(maxPoints, Math.floor(rawVal || 0)));
    const otherTotal = Object.entries(stats).reduce(
      (sum, [k, v]) => (k === statKey ? sum : sum + v),
      0
    );

    // Enforce strict total cap
    const maxAllowed = Math.max(0, maxPoints - otherTotal);
    const clampedVal = Math.min(val, maxAllowed);

    setStats(prev => ({
      ...prev,
      [statKey]: clampedVal,
    }));
  };

  // Grade change handler - auto scale down if over cap
  const handleGradeChange = (gradeId: string) => {
    setSelectedGradeId(gradeId);
    const newGrade = TYPE_SOUL_GRADES.find(g => g.id === gradeId) || TYPE_SOUL_GRADES[0];
    const newMax = newGrade.maxPoints;

    let currentSum = 0;
    const newStats = { ...stats };

    (Object.keys(newStats) as StatType[]).forEach(k => {
      if (currentSum + newStats[k] > newMax) {
        newStats[k] = Math.max(0, newMax - currentSum);
      }
      currentSum += newStats[k];
    });

    setStats(newStats);
  };

  // Load preset
  const applyPreset = (preset: HybridBuildPreset) => {
    setSelectedGradeId('elite_grade');
    setStats({ ...preset.stats });
  };

  // Reset stats
  const resetStats = () => {
    setStats({
      kendo: 0,
      hakuda: 0,
      speed: 0,
      kido: 0,
      medic: 0,
    });
  };

  // Identify master skills (>= 40 pts)
  const masterStats = (Object.keys(stats) as StatType[]).filter(k => stats[k] >= 40);
  const secondaryStats = (Object.keys(stats) as StatType[]).filter(k => stats[k] >= 25 && stats[k] < 40);

  // Generate copy string
  const getBuildShareText = () => {
    const lines = [
      `⚔️ Roblox Type Soul Stat Build (${currentGrade.name} - ${totalAllocated}/${maxPoints} PTS)`,
      `• Kendo: ${stats.kendo}`,
      `• Hakuda: ${stats.hakuda}`,
      `• Speed: ${stats.speed}`,
      `• Kido: ${stats.kido}`,
      `• Medic: ${stats.medic}`,
    ];
    if (masterStats.length > 0) {
      lines.push(`• Master Path: ${masterStats.map(s => STAT_TREES[s].name).join(', ')}`);
    }
    lines.push(`Calculated with Type Soul Build Planner`);
    return lines.join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getBuildShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatIcon = (id: StatType) => {
    switch (id) {
      case 'kendo': return <Swords className="w-5 h-5 text-red-400" />;
      case 'hakuda': return <Award className="w-5 h-5 text-amber-400" />;
      case 'speed': return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'kido': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'medic': return <Heart className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 text-slate-100">
      {/* Top Banner & Title */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-purple-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                <Swords className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                  Type Soul Stat Build Planner
                </h2>
                <p className="text-slate-400 text-sm">
                  Roblox Type Soul Skill Tree Allocator & Hybrid Lockout Simulator
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetStats}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                onClick={handleCopy}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-500 text-white transition shadow-lg shadow-red-950/50 flex items-center gap-1.5"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Build'}
              </button>
            </div>
          </div>

          {/* Player Grade Selector */}
          <div className="pt-4 border-t border-slate-800/80">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Select Player Rank / Grade (Sets Max Stat Points Cap):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {TYPE_SOUL_GRADES.map(grade => {
                const isActive = grade.id === selectedGradeId;
                return (
                  <button
                    key={grade.id}
                    onClick={() => handleGradeChange(grade.id)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center text-center ${
                      isActive
                        ? 'bg-gradient-to-b from-red-600 to-red-800 border-red-400 text-white shadow-lg shadow-red-950/60 ring-2 ring-red-500/30'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span>{grade.name}</span>
                    <span className="text-[10px] opacity-80 font-normal mt-0.5">{grade.maxPoints} Points</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Point Budget & Hybrid Lockout Warning Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Point Budget Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Point Budget</span>
              <span className="text-xs font-mono font-bold text-slate-300">{totalAllocated} / {maxPoints} PTS</span>
            </div>

            <div className="relative w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  totalAllocated === maxPoints 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500'
                }`}
                style={{ width: `${Math.min(100, (totalAllocated / maxPoints) * 100)}%` }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400">Available Remaining:</span>
              <span className={`font-mono font-bold ${remainingPoints === 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {remainingPoints} PTS
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              {currentGrade.description}. Points can be split freely, but 40+ points lock in your Primary Master Path.
            </span>
          </div>
        </div>

        {/* Dynamic Hybrid Lockout Banner */}
        <div className="md:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Hybrid Build & Master Skill Lockout Analysis
            </h3>
          </div>

          <div className="space-y-3">
            {masterStats.length > 0 ? (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-red-300 uppercase tracking-wide">
                    Primary Master Path Locked: {STAT_TREES[masterStats[0]].name} ({stats[masterStats[0]]} PTS)
                  </span>
                  <p className="mt-1 text-slate-300">
                    By investing 40+ points into {STAT_TREES[masterStats[0]].name}, you have unlocked Tier-3 Master Skill & Tier-4 Grand Skill access. 
                    However, you are locked out of obtaining 40+ Master skills in all other 4 trees.
                  </p>
                </div>
              </div>
            ) : secondaryStats.length >= 2 ? (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 uppercase tracking-wide">
                    Balanced Dual-Hybrid Build Detected
                  </span>
                  <p className="mt-1 text-slate-300">
                    You have invested 25+ points into multiple trees ({secondaryStats.map(s => STAT_TREES[s].name).join(' & ')}). 
                    This unlocks strong Tier 2 combo moves in both paths, but prevents you from reaching 40+ Master cap skills.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-2.5">
                <Unlock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-300 uppercase tracking-wide">
                    Flexible Skill Distribution Mode
                  </span>
                  <p className="mt-1 text-slate-300">
                    No stat has reached the 40-point Master threshold yet. You can still customize your path towards a Master 40+ Skill or balance as a Hybrid build.
                  </p>
                </div>
              </div>
            )}

            {/* Unlocked Skill Summary Badges */}
            <div className="pt-2 flex flex-wrap gap-2">
              {(Object.keys(stats) as StatType[]).map(key => {
                const val = stats[key];
                if (val < 10) return null;
                const tree = STAT_TREES[key];
                const highestUnlocked = [...tree.thresholds].reverse().find(t => val >= t.points);
                return (
                  <div key={key} className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center gap-2">
                    {getStatIcon(key)}
                    <span className="font-semibold text-slate-200">{tree.name} ({val} pts):</span>
                    <span className="text-amber-300 font-bold">{highestUnlocked?.skillName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Hybrid Build Presets Quick-Selector */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              Recommended Meta Build Presets
            </h3>
          </div>
          <span className="text-xs text-slate-400">Click to auto-load build</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TYPE_SOUL_PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/80 transition text-left group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-200 group-hover:text-purple-300 transition">
                    {preset.name}
                  </h4>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                  {preset.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                <span>Stats:</span>
                <span className="font-mono text-purple-300 font-semibold">
                  {Object.entries(preset.stats)
                    .filter(([, val]) => val > 0)
                    .map(([k, v]) => `${k.slice(0, 3).toUpperCase()}:${v}`)
                    .join(' / ')}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 5 Stat Trees Inputs & Sliders */}
      <div className="space-y-4">
        <h3 className="text-base font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
          <Sparkle className="w-4 h-4 text-amber-400" />
          Allocate Skill Points across 5 Stat Trees
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(Object.keys(STAT_TREES) as StatType[]).map(key => {
            const tree = STAT_TREES[key];
            const val = stats[key];
            const isPrimaryMaster = val >= 40;

            return (
              <div 
                key={key} 
                className={`p-6 rounded-2xl border transition-all backdrop-blur ${tree.bgColor} ${
                  isPrimaryMaster ? 'border-amber-500/60 ring-1 ring-amber-500/30' : tree.borderColor
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 shadow-inner">
                      {getStatIcon(key)}
                    </div>
                    <div>
                      <h4 className={`text-lg font-black tracking-wide ${tree.color}`}>
                        {tree.name}
                      </h4>
                      <p className="text-xs text-slate-300">{tree.description}</p>
                    </div>
                  </div>

                  {/* Numeric Input */}
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1.5">
                    <input
                      type="number"
                      min={0}
                      max={maxPoints}
                      value={val}
                      onChange={e => handleStatChange(key, parseInt(e.target.value) || 0)}
                      className="w-16 bg-transparent text-center font-mono font-extrabold text-slate-100 text-sm focus:outline-none"
                    />
                    <span className="text-xs font-mono text-slate-400 pr-2">/ {maxPoints}</span>
                  </div>
                </div>

                {/* Range Slider */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={maxPoints}
                    value={val}
                    onChange={e => handleStatChange(key, parseInt(e.target.value) || 0)}
                    className="w-full accent-red-500 cursor-pointer bg-slate-950 h-2.5 rounded-lg border border-slate-800"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>0 (Base)</span>
                    <span>10 (Basic)</span>
                    <span>25 (Adv)</span>
                    <span>40 (Master)</span>
                    <span>60 (Max)</span>
                  </div>
                </div>

                {/* Threshold Unlocks List for this Stat */}
                <div className="mt-5 space-y-2 pt-4 border-t border-slate-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Skill Threshold Unlocks:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {tree.thresholds.map(thresh => {
                      const isUnlocked = val >= thresh.points;
                      return (
                        <div
                          key={thresh.points}
                          className={`px-3 py-2 rounded-xl border text-xs flex items-start justify-between gap-3 transition ${
                            isUnlocked
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {isUnlocked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <span className={`font-bold ${isUnlocked ? 'text-slate-100' : 'text-slate-400'}`}>
                                {thresh.skillName}
                              </span>
                              <p className={`text-[11px] mt-0.5 ${isUnlocked ? 'text-emerald-300/90' : 'text-slate-500'}`}>
                                {thresh.perk}
                              </p>
                            </div>
                          </div>

                          <span className={`text-[11px] font-mono px-2 py-0.5 ${
                            isUnlocked 
                              ? 'text-emerald-300 font-bold border border-emerald-500/30' 
                              : 'text-slate-500 border border-slate-800'
                          }`}>
                            {thresh.points} PTS
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
