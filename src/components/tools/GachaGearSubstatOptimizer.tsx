/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Sliders, RefreshCw, Zap, ShieldAlert,
  Flame, HelpCircle, CheckCircle2, Info, ArrowRight, Layers, Coins,
  Calculator, ChevronRight, Gauge, Target, Gift, Trophy
} from 'lucide-react';
import { 
  GachaGameType, WUWA_MAIN_STATS, WUWA_SUB_STATS, WUWA_PRESETS,
  ZZZ_MAIN_STATS, ZZZ_SUB_STATS, ZZZ_PRESETS, StatDefinition,
  GACHA_PITY_CONFIG, GACHA_GEAR_FAQS 
} from '../../data/gachaGearData';

export default function GachaGearSubstatOptimizer() {
  // Selected Game
  const [activeGame, setActiveGame] = useState<GachaGameType>('wuwa');

  // Main Stat
  const [selectedMainStat, setSelectedMainStat] = useState<string>('Crit Rate %');

  // Active Archetype Preset
  const [selectedPresetId, setSelectedPresetId] = useState<string>('dps_crit');

  // 4 Sub-Stat Slots
  const [subStats, setSubStats] = useState<Array<{ statId: string; value: number; weight: number }>>([
    { statId: 'crit_rate', value: 8.5, weight: 1.0 },
    { statId: 'crit_dmg', value: 16.8, weight: 1.0 },
    { statId: 'atk_pct', value: 8.4, weight: 0.85 },
    { statId: 'flat_atk', value: 40, weight: 0.4 },
  ]);

  // Pity Pull Tracker Inputs
  const [currentPity, setCurrentPity] = useState<number>(45);
  const [currencyCount, setCurrencyCount] = useState<number>(6400); // e.g. 6400 Astrite = 40 pulls
  const [passesCount, setPassesCount] = useState<number>(5);
  const [isGuaranteed, setIsGuaranteed] = useState<boolean>(false);

  // Switch Game Handler
  const handleGameChange = (game: GachaGameType) => {
    setActiveGame(game);
    if (game === 'wuwa') {
      setSelectedMainStat('Crit Rate %');
      setSelectedPresetId('dps_crit');
      setSubStats([
        { statId: 'crit_rate', value: 8.5, weight: 1.0 },
        { statId: 'crit_dmg', value: 16.8, weight: 1.0 },
        { statId: 'atk_pct', value: 8.4, weight: 0.85 },
        { statId: 'flat_atk', value: 40, weight: 0.4 },
      ]);
      setCurrentPity(45);
    } else {
      setSelectedMainStat('Crit Rate %');
      setSelectedPresetId('crit_attacker');
      setSubStats([
        { statId: 'crit_rate', value: 4.2, weight: 1.0 },
        { statId: 'crit_dmg', value: 8.4, weight: 1.0 },
        { statId: 'atk_pct', value: 5.4, weight: 0.85 },
        { statId: 'flat_atk', value: 30, weight: 0.4 },
      ]);
      setCurrentPity(55);
    }
  };

  // Get current game's available sub-stats list
  const availableSubStats = activeGame === 'wuwa' ? WUWA_SUB_STATS : ZZZ_SUB_STATS;
  const availablePresets = activeGame === 'wuwa' ? WUWA_PRESETS : ZZZ_PRESETS;
  const availableMainStats = activeGame === 'wuwa' ? WUWA_MAIN_STATS : ZZZ_MAIN_STATS;
  const pityConfig = GACHA_PITY_CONFIG[activeGame];

  // Apply Preset Weights Handler
  const handleApplyPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = availablePresets.find(p => p.id === presetId);
    if (preset) {
      setSubStats(prev => prev.map(s => ({
        ...s,
        weight: preset.statWeights[s.statId] ?? availableSubStats.find(def => def.id === s.statId)?.defaultWeight ?? 0.5
      })));
    }
  };

  // Calculate Build Score out of 100%
  const scoreResult = useMemo(() => {
    let currentScore = 0;
    let maxPossibleScore = 0;

    const slotScores = subStats.map((slot) => {
      const def = availableSubStats.find(d => d.id === slot.statId);
      if (!def) return { score: 0, maxScore: 0, pct: 0, name: 'Empty' };

      // Calculate roll quality ratio (value / maxRoll)
      const rollRatio = Math.min(1.2, Math.max(0, slot.value / def.maxRoll));
      const slotWeight = slot.weight;

      const slotScore = rollRatio * slotWeight * 25; // Each slot contributes up to 25 points
      const slotMaxScore = 25 * slotWeight;

      currentScore += slotScore;
      maxPossibleScore += slotMaxScore;

      return {
        score: slotScore,
        maxScore: slotMaxScore,
        pct: slotMaxScore > 0 ? Math.round((slotScore / slotMaxScore) * 100) : 0,
        name: def.name,
      };
    });

    // Final score scaled out of 100%
    const finalScorePct = maxPossibleScore > 0 ? Math.min(100, Math.round((currentScore / maxPossibleScore) * 100)) : 0;

    // Grade Assignment
    let grade = 'F';
    let gradeLabel = 'Fodder / Re-roll';
    let gradeColor = 'text-red-400 border-red-500/40 bg-red-950/60';

    if (finalScorePct >= 90) {
      grade = 'SSS';
      gradeLabel = 'God Roll (Perfect Piece)';
      gradeColor = 'text-amber-300 border-amber-400 bg-amber-950/80 shadow-lg shadow-amber-500/30';
    } else if (finalScorePct >= 80) {
      grade = 'SS';
      gradeLabel = 'Great Build (Meta Tier)';
      gradeColor = 'text-purple-300 border-purple-400 bg-purple-950/80 shadow-lg shadow-purple-500/20';
    } else if (finalScorePct >= 70) {
      grade = 'S';
      gradeLabel = 'Good Piece (Endgame Ready)';
      gradeColor = 'text-cyan-300 border-cyan-400 bg-cyan-950/80';
    } else if (finalScorePct >= 60) {
      grade = 'A';
      gradeLabel = 'Usable Place-holder';
      gradeColor = 'text-emerald-300 border-emerald-400 bg-emerald-950/60';
    } else if (finalScorePct >= 50) {
      grade = 'B';
      gradeLabel = 'Average Roll';
      gradeColor = 'text-blue-300 border-blue-400 bg-blue-950/50';
    }

    return {
      finalScorePct,
      grade,
      gradeLabel,
      gradeColor,
      slotScores,
    };
  }, [subStats, availableSubStats]);

  // Pity Calculation
  const pityResult = useMemo(() => {
    const pullsFromCurrency = Math.floor(currencyCount / pityConfig.pullCost);
    const totalPullsAvailable = pullsFromCurrency + passesCount;

    const pullsToSoftPity = Math.max(0, pityConfig.softPityStart - currentPity);
    const pullsToHardPity = Math.max(0, pityConfig.hardPity - currentPity);

    // Guaranteed 5-Star Calculation
    const effectivePityPullsNeeded = isGuaranteed ? pullsToHardPity : pullsToHardPity + pityConfig.hardPity;
    const pullsShortfall = Math.max(0, effectivePityPullsNeeded - totalPullsAvailable);
    const currencyShortfall = pullsShortfall * pityConfig.pullCost;

    // Approximate Success Probability
    let probabilityPct = 0;
    const totalSimulatedPulls = currentPity + totalPullsAvailable;

    if (totalSimulatedPulls >= pityConfig.hardPity) {
      probabilityPct = isGuaranteed ? 100 : 50; // 50/50 if non-guaranteed at 1 Hard Pity
      if (totalSimulatedPulls >= pityConfig.hardPity * 2) {
        probabilityPct = 100;
      }
    } else if (totalSimulatedPulls >= pityConfig.softPityStart) {
      probabilityPct = Math.min(95, Math.round(50 + (totalSimulatedPulls - pityConfig.softPityStart) * 3));
      if (isGuaranteed) probabilityPct = Math.min(100, probabilityPct + 40);
    } else {
      probabilityPct = Math.min(60, Math.round((totalSimulatedPulls / pityConfig.softPityStart) * 30));
      if (isGuaranteed) probabilityPct += 30;
    }

    return {
      totalPullsAvailable,
      pullsToSoftPity,
      pullsToHardPity,
      effectivePityPullsNeeded,
      pullsShortfall,
      currencyShortfall,
      probabilityPct: Math.min(100, probabilityPct),
    };
  }, [currentPity, currencyCount, passesCount, isGuaranteed, pityConfig]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 font-sans">
      {/* Sci-Fi Gacha Header */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 border border-cyan-500/30 p-6 md:p-8 shadow-2xl shadow-cyan-950/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5 shadow-sm">
                <Gauge className="w-3.5 h-3.5 text-amber-400" /> Dual Gacha Gear Evaluator
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/80 border border-purple-500/30 text-purple-300">
                WuWa Echoes & ZZZ Drive Discs 2026
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              Echo / Drive Disc Sub-Stat Optimizer & Pity Tracker
            </h1>
            <p className="text-slate-300 mt-2 text-sm md:text-base max-w-3xl">
              Calculate exact 100% perfection Build Scores for <span className="text-cyan-300 font-semibold">Wuthering Waves</span> Echoes and <span className="text-purple-300 font-semibold">Zenless Zone Zero</span> Drive Discs with weighted sub-stat scoring and soft/hard pity counters.
            </p>
          </div>

          {/* Game Selector Toggle */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1.5 gap-1.5 self-start md:self-auto">
            <button
              onClick={() => handleGameChange('wuwa')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeGame === 'wuwa'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" /> Wuthering Waves (Echoes)
            </button>
            <button
              onClick={() => handleGameChange('zzz')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeGame === 'zzz'
                  ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/30 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" /> Zenless Zone Zero (Discs)
            </button>
          </div>
        </div>
      </div>

      {/* Preset Archetype Selector */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" /> Choose Build Archetype Weightage Preset
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {availablePresets.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950/50'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{preset.name}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {preset.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Gear Inputs vs Grade Outcome Score (7 & 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Sub-Stat Inputs Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" /> Main Stat & 4 Sub-Stat Rolls
              </h3>
              <span className="text-xs text-cyan-400 font-mono">
                {activeGame === 'wuwa' ? '5★ Echo Roll Ranges' : 'S-Rank Disc Roll Ranges'}
              </span>
            </div>

            {/* Main Stat Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Piece Main Stat</label>
              <select
                value={selectedMainStat}
                onChange={(e) => setSelectedMainStat(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-amber-400 font-bold focus:outline-none focus:border-cyan-400"
              >
                {availableMainStats.map((ms) => (
                  <option key={ms} value={ms}>{ms}</option>
                ))}
              </select>
            </div>

            {/* 4 Sub-Stat Rows */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sub-Stat Roll Entries (4 Slots)
              </h4>

              {subStats.map((slot, idx) => {
                const currentDef = availableSubStats.find(d => d.id === slot.statId) || availableSubStats[0];

                return (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Slot #{idx + 1}
                      </span>

                      {/* Stat Dropdown */}
                      <select
                        value={slot.statId}
                        onChange={(e) => {
                          const newId = e.target.value;
                          const newDef = availableSubStats.find(d => d.id === newId);
                          setSubStats(prev => prev.map((s, i) => i === idx ? {
                            statId: newId,
                            value: newDef ? Math.round((newDef.minRoll + newDef.maxRoll) / 2 * 10) / 10 : 0,
                            weight: newDef?.defaultWeight ?? 0.5
                          } : s));
                        }}
                        className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-cyan-400 flex-1"
                      >
                        {availableSubStats.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.unit === '%' ? '%' : 'flat'})
                          </option>
                        ))}
                      </select>

                      {/* Value Input */}
                      <div className="flex items-center gap-1.5 w-full sm:w-32">
                        <input
                          type="number"
                          step="0.1"
                          value={slot.value}
                          onChange={(e) => {
                            const val = Number(e.target.value) || 0;
                            setSubStats(prev => prev.map((s, i) => i === idx ? { ...s, value: val } : s));
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-amber-400 font-mono font-bold text-right focus:outline-none focus:border-cyan-400"
                        />
                        <span className="text-xs text-slate-400 font-mono font-bold">
                          {currentDef.unit}
                        </span>
                      </div>
                    </div>

                    {/* Weightage Slider */}
                    <div className="flex items-center gap-3 pt-1 border-t border-slate-900">
                      <span className="text-[11px] text-slate-400 font-semibold min-w-[90px]">
                        Weight Priority:
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={slot.weight}
                        onChange={(e) => {
                          const w = Number(e.target.value);
                          setSubStats(prev => prev.map((s, i) => i === idx ? { ...s, weight: w } : s));
                        }}
                        className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                      />
                      <span className="text-xs font-mono font-bold text-cyan-300 w-12 text-right">
                        {(slot.weight * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right Column: Build Score & Grade Badge Outcome (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" /> Cumulative Gear Build Score
              </h3>
              <span className="text-xs text-slate-400 uppercase font-semibold">Quality Index</span>
            </div>

            {/* Dynamic Grade Outcome Badge */}
            <div className={`p-6 rounded-2xl border text-center space-y-2 transition-all ${scoreResult.gradeColor}`}>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-300">Overall Build Grade</div>
              <div className="text-6xl font-black tracking-tight">{scoreResult.grade}</div>
              <div className="text-sm font-bold">{scoreResult.gradeLabel}</div>
              <div className="text-2xl font-mono font-black pt-1">
                {scoreResult.finalScorePct}% <span className="text-xs font-normal text-slate-300">Score</span>
              </div>
            </div>

            {/* Sub-Stat Quality Breakdown Bars */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sub-Stat Roll Quality Breakdown
              </h4>

              {scoreResult.slotScores.map((slot, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300 font-semibold">
                    <span>{slot.name}</span>
                    <span className="font-mono text-cyan-300">{slot.pct}% roll efficiency</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        slot.pct >= 85 ? 'bg-amber-400' : slot.pct >= 65 ? 'bg-cyan-400' : 'bg-slate-600'
                      }`}
                      style={{ width: `${slot.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Pity Pull Counter Input Box & Estimator */}
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-400" /> {pityConfig.gameName} Gacha Pity Pull Tracker
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Input current pity counter and currency to calculate guaranteed 5-Star pull odds.
            </p>
          </div>

          {/* Guarantee Toggle */}
          <button
            onClick={() => setIsGuaranteed(!isGuaranteed)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              isGuaranteed
                ? 'bg-amber-950/80 border-amber-500/60 text-amber-300 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>{isGuaranteed ? 'Status: GUARANTEED 5★' : 'Status: 50/50 ON NEXT 5★'}</span>
          </button>
        </div>

        {/* Inputs Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Current Pity Input */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Current Pity Count</span>
              <span className="text-cyan-400 font-mono font-bold">{currentPity} / {pityConfig.hardPity}</span>
            </label>
            <input
              type="number"
              min="0"
              max={pityConfig.hardPity}
              value={currentPity}
              onChange={(e) => setCurrentPity(Math.max(0, Math.min(pityConfig.hardPity, Number(e.target.value) || 0)))}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Currency Count (Astrite / Polychrome) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>{pityConfig.currencyName}</span>
              <span className="text-amber-400 font-mono font-bold">{currencyCount.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="0"
              step="160"
              value={currencyCount}
              onChange={(e) => setCurrencyCount(Math.max(0, Number(e.target.value) || 0))}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Passes Count */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Tides / Tapes Count</span>
              <span className="text-purple-300 font-mono font-bold">{passesCount}</span>
            </label>
            <input
              type="number"
              min="0"
              value={passesCount}
              onChange={(e) => setPassesCount(Math.max(0, Number(e.target.value) || 0))}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        {/* Output Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400 font-semibold">Total Pulls Available</div>
            <div className="text-2xl font-black text-cyan-300 font-mono">
              {pityResult.totalPullsAvailable} <span className="text-xs text-slate-400">pulls</span>
            </div>
            <div className="text-[11px] text-slate-500">From currency + tides/tapes</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400 font-semibold">Pulls To Soft Pity</div>
            <div className="text-2xl font-black text-purple-300 font-mono">
              {pityResult.pullsToSoftPity} <span className="text-xs text-slate-400">pulls</span>
            </div>
            <div className="text-[11px] text-slate-500">Starts at pull #{pityConfig.softPityStart}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400 font-semibold">Pulls To Hard Pity</div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {pityResult.pullsToHardPity} <span className="text-xs text-slate-400">pulls</span>
            </div>
            <div className="text-[11px] text-slate-500">Guaranteed 5★ at pull #{pityConfig.hardPity}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
            <div className="text-slate-400 font-semibold">5★ Success Probability</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {pityResult.probabilityPct}%
            </div>
            <div className="text-[11px] text-slate-500">
              {pityResult.currencyShortfall > 0 
                ? `Need ~${pityResult.currencyShortfall.toLocaleString()} more currency for 100%`
                : '100% Guaranteed 5★!'}
            </div>
          </div>
        </div>

      </div>

      {/* FAQs Guide */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-cyan-400" /> Theorycrafting & Gacha Mechanics Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 leading-relaxed">
          {GACHA_GEAR_FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-cyan-300 text-xs flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" /> {faq.question}
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
