/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, RotateCcw, Copy, Check, Info, 
  TrendingUp, Zap, ChevronRight, AlertCircle, Layers, Sliders
} from 'lucide-react';

interface SubstatRoll {
  stat: string;
  value: number;
}

interface StatRange {
  name: string;
  min: number;
  max: number;
  unit: string;
  weightDPS: number;
  weightSupport: number;
}

const SUBSTAT_RANGES: Record<string, StatRange> = {
  'crit_rate': { name: 'Crit Rate', min: 6.3, max: 10.5, unit: '%', weightDPS: 1.0, weightSupport: 0.3 },
  'crit_dmg': { name: 'Crit DMG', min: 12.6, max: 21.0, unit: '%', weightDPS: 1.0, weightSupport: 0.2 },
  'atk_pct': { name: 'ATK %', min: 6.4, max: 11.6, unit: '%', weightDPS: 0.75, weightSupport: 0.3 },
  'flat_atk': { name: 'Flat ATK', min: 30, max: 60, unit: '', weightDPS: 0.35, weightSupport: 0.1 },
  'energy_regen': { name: 'Energy Regen', min: 6.8, max: 12.4, unit: '%', weightDPS: 0.6, weightSupport: 1.0 },
  'skill_dmg': { name: 'Resonance Skill DMG', min: 6.4, max: 11.6, unit: '%', weightDPS: 0.7, weightSupport: 0.1 },
  'liberation_dmg': { name: 'Resonance Liberation DMG', min: 6.4, max: 11.6, unit: '%', weightDPS: 0.7, weightSupport: 0.1 },
  'basic_dmg': { name: 'Basic Attack DMG', min: 6.4, max: 11.6, unit: '%', weightDPS: 0.65, weightSupport: 0.1 },
  'heavy_dmg': { name: 'Heavy Attack DMG', min: 6.4, max: 11.6, unit: '%', weightDPS: 0.65, weightSupport: 0.1 },
  'hp_pct': { name: 'HP %', min: 6.4, max: 11.6, unit: '%', weightDPS: 0.1, weightSupport: 0.8 },
  'flat_hp': { name: 'Flat HP', min: 320, max: 580, unit: '', weightDPS: 0.05, weightSupport: 0.4 },
  'def_pct': { name: 'DEF %', min: 8.1, max: 14.7, unit: '%', weightDPS: 0.1, weightSupport: 0.5 },
  'flat_def': { name: 'Flat DEF', min: 40, max: 70, unit: '', weightDPS: 0.05, weightSupport: 0.2 },
};

const ECHO_COST_OPTIONS = [
  { id: '4', name: '4-Cost (Overlord / Calamity)', mainStats: ['Crit Rate (22%)', 'Crit DMG (44%)', 'Healing Bonus (26.4%)', 'ATK% (33%)', 'HP% (33%)', 'DEF% (41.8%)'] },
  { id: '3', name: '3-Cost (Elite)', mainStats: ['Elemental DMG Bonus (30%)', 'Energy Regen (32%)', 'ATK% (18%)', 'HP% (22.8%)', 'DEF% (22.8%)'] },
  { id: '1', name: '1-Cost (Common)', mainStats: ['ATK% (18%)', 'HP% (22.8%)', 'DEF% (18%)'] },
];

export default function WuwaEchoTuningEvaluator() {
  const [echoCost, setEchoCost] = useState<'4' | '3' | '1'>('4');
  const [mainStat, setMainStat] = useState<string>('Crit Rate (22%)');
  const [echoLevel, setEchoLevel] = useState<number>(25);
  const [roleFocus, setRoleFocus] = useState<'dps' | 'burst' | 'support'>('dps');
  const [copied, setCopied] = useState(false);

  // 5 Substat slots
  const [substats, setSubstats] = useState<SubstatRoll[]>([
    { stat: 'crit_rate', value: 9.3 },
    { stat: 'crit_dmg', value: 18.2 },
    { stat: 'atk_pct', value: 8.6 },
    { stat: 'energy_regen', value: 10.4 },
    { stat: 'skill_dmg', value: 7.9 },
  ]);

  const updateSubstatStat = (index: number, newStat: string) => {
    const updated = [...substats];
    const range = SUBSTAT_RANGES[newStat];
    const avg = Number(((range.min + range.max) / 2).toFixed(1));
    updated[index] = { stat: newStat, value: avg };
    setSubstats(updated);
  };

  const updateSubstatValue = (index: number, val: number) => {
    const updated = [...substats];
    updated[index].value = val;
    setSubstats(updated);
  };

  // Evaluation calculations
  const analysis = useMemo(() => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    let critValue = 0;
    let critRateVal = 0;
    let critDmgVal = 0;

    const slotsCount = Math.floor(echoLevel / 5);

    substats.slice(0, slotsCount).forEach(slot => {
      const config = SUBSTAT_RANGES[slot.stat];
      if (!config) return;

      if (slot.stat === 'crit_rate') critRateVal += slot.value;
      if (slot.stat === 'crit_dmg') critDmgVal += slot.value;

      const rollRatio = Math.max(0, Math.min(1, (slot.value - config.min) / (config.max - config.min)));
      const weight = roleFocus === 'support' ? config.weightSupport : config.weightDPS;

      // Base presence weight + roll quality inside range
      const statEfficiency = (0.5 + 0.5 * rollRatio) * weight;
      totalScore += statEfficiency;
      maxPossibleScore += 1.0; // best possible is max roll of top tier stat
    });

    critValue = Number(((critRateVal * 2) + critDmgVal).toFixed(1));
    const efficiencyPct = maxPossibleScore > 0 ? Math.min(100, Math.round((totalScore / maxPossibleScore) * 100)) : 0;

    let grade = 'C';
    let gradeColor = 'text-slate-400 border-slate-700 bg-slate-900/60';
    let verdict = 'Sub-optimal rolls. Recommended for tuner recycling.';

    if (efficiencyPct >= 92 && critValue >= 32) {
      grade = 'SSS';
      gradeColor = 'text-amber-300 border-amber-500/50 bg-amber-950/40 shadow-amber-500/20';
      verdict = 'God-Roll Echo! Locked and maximum priority investment.';
    } else if (efficiencyPct >= 82 && critValue >= 26) {
      grade = 'SS';
      gradeColor = 'text-cyan-300 border-cyan-500/50 bg-cyan-950/40 shadow-cyan-500/20';
      verdict = 'Excellent endgame piece with stellar roll efficiency.';
    } else if (efficiencyPct >= 70 && (critValue >= 18 || roleFocus === 'support')) {
      grade = 'S';
      gradeColor = 'text-blue-300 border-blue-500/50 bg-blue-950/40 shadow-blue-500/20';
      verdict = 'Strong competitive Echo. Safe to use in Tower of Adversity.';
    } else if (efficiencyPct >= 55) {
      grade = 'A';
      gradeColor = 'text-emerald-300 border-emerald-500/50 bg-emerald-950/40 shadow-emerald-500/20';
      verdict = 'Decent placeholder. Keep until finding double-crit replacement.';
    } else if (efficiencyPct >= 42) {
      grade = 'B';
      gradeColor = 'text-orange-300 border-orange-500/50 bg-orange-950/40 shadow-orange-500/20';
      verdict = 'Low roll quality or missing primary offensive substats.';
    }

    // Material cost from +0 to echoLevel
    const tunerCost = slotsCount * 10; // 10 Premium Tuners per unlock
    const expTubes = slotsCount === 5 ? 142 : slotsCount === 4 ? 88 : slotsCount === 3 ? 48 : slotsCount === 2 ? 22 : 8; // approx Premium tubes
    const shellCredits = slotsCount * 28000;

    return {
      critValue,
      efficiencyPct,
      grade,
      gradeColor,
      verdict,
      tunerCost,
      expTubes,
      shellCredits,
      slotsCount
    };
  }, [substats, echoLevel, roleFocus]);

  const handleCopy = () => {
    const text = `Wuthering Waves Echo Evaluation:
Cost: ${echoCost} | Level: +${echoLevel} | Focus: ${roleFocus.toUpperCase()}
Grade: ${analysis.grade} (${analysis.efficiencyPct}% Roll Efficiency)
Crit Value (CV): ${analysis.critValue}
Substats:
${substats.slice(0, analysis.slotsCount).map((s, i) => `• Slot ${i+1}: ${SUBSTAT_RANGES[s.stat]?.name || s.stat} ${s.value}${SUBSTAT_RANGES[s.stat]?.unit || ''}`).join('\n')}
Verdict: ${analysis.verdict}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 shadow-xl text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
              SOL3 v2.0 READY
            </span>
            <span className="text-xs text-slate-400">5-Substat Tuning Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Echo Tuning Sub-Stat Evaluator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Evaluate roll quality, calculate exact Crit Value (CV), and score God-Roll status for Wuthering Waves Echoes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            {copied ? 'Copied' : 'Share Build'}
          </button>
        </div>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Echo Cost */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Echo Cost & Rank</label>
          <div className="grid grid-cols-3 gap-1.5">
            {ECHO_COST_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => {
                  setEchoCost(opt.id as any);
                  setMainStat(opt.mainStats[0]);
                }}
                className={`py-2 px-1 text-xs font-bold rounded-lg transition-all ${
                  echoCost === opt.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {opt.id}-Cost
              </button>
            ))}
          </div>
        </div>

        {/* Echo Level / Tuning Progress */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Echo Level & Tuner Slots</label>
          <div className="grid grid-cols-5 gap-1">
            {[5, 10, 15, 20, 25].map(lvl => (
              <button
                key={lvl}
                onClick={() => setEchoLevel(lvl)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  echoLevel === lvl
                    ? 'bg-blue-600 text-white font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                +{lvl}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 text-center">Unlocks {analysis.slotsCount} of 5 Substat Slots</p>
        </div>

        {/* Role Preset */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Role Scaling Weight</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'dps', label: 'Hypercarry' },
              { id: 'burst', label: 'Sub-DPS' },
              { id: 'support', label: 'Healer/Buffer' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setRoleFocus(r.id as any)}
                className={`py-2 px-1 text-xs font-bold rounded-lg transition-all ${
                  roleFocus === r.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Stat Selector */}
      <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" /> Primary Main Stat:
        </span>
        <select
          value={mainStat}
          onChange={(e) => setMainStat(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-cyan-200 focus:outline-none focus:border-cyan-500"
        >
          {ECHO_COST_OPTIONS.find(o => o.id === echoCost)?.mainStats.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Substat Tuning Slots */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" /> Tuned Substats ({analysis.slotsCount} / 5 Active)
          </h3>
          <span className="text-xs text-slate-400">Kuro Games Official Stat Ranges</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {substats.slice(0, analysis.slotsCount).map((sub, idx) => {
            const config = SUBSTAT_RANGES[sub.stat];
            const rollPct = config ? Math.round(((sub.value - config.min) / (config.max - config.min)) * 100) : 50;

            return (
              <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-3 relative group hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-400">Slot {idx + 1}</span>
                  <select
                    value={sub.stat}
                    onChange={(e) => updateSubstatStat(idx, e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-md text-xs text-slate-200 px-2 py-1 focus:outline-none focus:border-cyan-500"
                  >
                    {Object.entries(SUBSTAT_RANGES).map(([key, val]) => (
                      <option key={key} value={key}>{val.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Roll: {sub.value}{config?.unit}</span>
                    <span className={`font-bold ${
                      rollPct >= 80 ? 'text-amber-400' : rollPct >= 50 ? 'text-cyan-400' : 'text-slate-400'
                    }`}>
                      {rollPct}% Max
                    </span>
                  </div>

                  <input
                    type="range"
                    min={config?.min || 0}
                    max={config?.max || 100}
                    step={config?.unit === '%' ? 0.1 : 1}
                    value={sub.value}
                    onChange={(e) => updateSubstatValue(idx, parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Min {config?.min}{config?.unit}</span>
                    <span>Max {config?.max}{config?.unit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analysis & Verdict Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/90 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Evaluation Grade</span>
          <div className={`text-5xl font-black my-2 px-6 py-2 rounded-2xl border ${analysis.gradeColor}`}>
            {analysis.grade}
          </div>
          <span className="text-xs text-slate-300 font-bold">{analysis.efficiencyPct}% Roll Efficiency</span>
        </div>

        <div className="space-y-3 p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-center">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Crit Value (CV):</span>
            <span className="font-extrabold text-cyan-300 text-lg">{analysis.critValue}</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (analysis.critValue / 42) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Formula: (Crit Rate × 2) + Crit DMG. Target &gt;25 for endgame.
          </p>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Invested Materials</span>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block">Tuners:</span>
                <span className="font-bold text-amber-300">{analysis.tunerCost} Premium</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block">Sealed Tubes:</span>
                <span className="font-bold text-blue-300">~{analysis.expTubes} Tubes</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-cyan-200 font-medium italic pt-1 border-t border-slate-800">
            {analysis.verdict}
          </p>
        </div>
      </div>

      {/* Pro Advice Accordion */}
      <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-xl p-4 text-xs text-cyan-100 space-y-2">
        <h4 className="font-bold text-cyan-300 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-cyan-400" /> Pro Tuning Strategy (Save 70% Tuners)
        </h4>
        <p className="text-slate-300 leading-relaxed">
          In Wuthering Waves, tuning an Echo to +5 or +10 only costs 10 to 20 Tuners. If the first 2 slots do NOT roll Crit Rate or Crit DMG, stop leveling and recycle the piece into the next candidate to refund 70% of Echo XP! Never level to +25 blindly without at least 1 high-priority offensive stat in the first two rolls.
        </p>
      </div>
    </div>
  );
}
