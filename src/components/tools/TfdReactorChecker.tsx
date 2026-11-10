/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Cpu, Sparkles, Award, Shield, CheckCircle2, AlertTriangle, 
  RotateCcw, Sliders, ChevronDown, Check, Info, Flame, Zap
} from 'lucide-react';

interface SubstatDef {
  id: string;
  name: string;
  goldMax: number;
  unit: string;
  weightMeta: number; // 1 to 10 priority
}

const REACTOR_SUBSTATS: SubstatDef[] = [
  { id: 'crit_damage', name: 'Skill Critical Hit Damage', goldMax: 31.5, unit: '%', weightMeta: 10 },
  { id: 'crit_rate', name: 'Skill Critical Hit Rate', goldMax: 31.5, unit: '%', weightMeta: 9.5 },
  { id: 'colossus_damage', name: 'Bonus Damage to Colossus', goldMax: 2540, unit: ' ATK', weightMeta: 10 },
  { id: 'cooldown', name: 'Skill Cooldown Reduction', goldMax: 7.4, unit: '%', weightMeta: 9 },
  { id: 'range', name: 'Skill Effect Range', goldMax: 24.5, unit: '%', weightMeta: 8.5 },
  { id: 'duration', name: 'Skill Duration UP', goldMax: 11.2, unit: '%', weightMeta: 8 },
  { id: 'cost', name: 'Skill Cost Reduction', goldMax: 4.1, unit: '%', weightMeta: 7 },
  { id: 'element_boost', name: 'Specific Element Skill Power', goldMax: 8.2, unit: '%', weightMeta: 8 }
];

export default function TfdReactorChecker() {
  const [reactorRarity, setReactorRarity] = useState<'ultimate' | 'rare'>('ultimate');
  const [attributeType, setAttributeType] = useState<string>('Tingling (Electric)');
  const [archetypeType, setArchetypeType] = useState<string>('Singular');
  const [weaponMountingMatches, setWeaponMountingMatches] = useState<boolean>(true);

  // Substat 1
  const [substat1Id, setSubstat1Id] = useState<string>('crit_damage');
  const [substat1Tier, setSubstat1Tier] = useState<'gold' | 'purple' | 'blue'>('gold');
  const [substat1Value, setSubstat1Value] = useState<number>(31.2);

  // Substat 2
  const [substat2Id, setSubstat2Id] = useState<string>('colossus_damage');
  const [substat2Tier, setSubstat2Tier] = useState<'gold' | 'purple' | 'blue'>('gold');
  const [substat2Value, setSubstat2Value] = useState<number>(2510);

  // Calculations
  const scoreResults = useMemo(() => {
    const s1 = REACTOR_SUBSTATS.find(s => s.id === substat1Id) || REACTOR_SUBSTATS[0];
    const s2 = REACTOR_SUBSTATS.find(s => s.id === substat2Id) || REACTOR_SUBSTATS[1];

    // Substat roll efficiency
    const eff1 = Math.min(1.0, substat1Value / s1.goldMax);
    const eff2 = Math.min(1.0, substat2Value / s2.goldMax);

    // Tier multipliers
    const tierMult1 = substat1Tier === 'gold' ? 1.0 : substat1Tier === 'purple' ? 0.75 : 0.50;
    const tierMult2 = substat2Tier === 'gold' ? 1.0 : substat2Tier === 'purple' ? 0.75 : 0.50;

    // Weight score
    const weighted1 = (s1.weightMeta / 10) * eff1 * tierMult1 * 40;
    const weighted2 = (s2.weightMeta / 10) * eff2 * tierMult2 * 40;

    // Mounting bonus (20 pts)
    const mountingScore = weaponMountingMatches ? 20 : 0;

    const totalScore = Math.round(weighted1 + weighted2 + mountingScore);

    let grade = 'SSS God Roll';
    let gradeBadgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-500/20';
    let recommendation = 'PERFECT GOD ROLL! Keep and max enhance immediately.';

    if (totalScore < 50 || !weaponMountingMatches) {
      grade = 'D / Dismantle';
      gradeBadgeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/50';
      recommendation = weaponMountingMatches 
        ? 'Low roll efficiency or poor substats. Safe to dismantle for Precision Phase Adjusters.'
        : 'Mounting weapon mismatch! Without +160% weapon mounting, this reactor loses 60% of its base power.';
    } else if (totalScore < 70) {
      grade = 'B / Decent Temporary';
      gradeBadgeColor = 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      recommendation = 'Good stepping-stone reactor while farming for double Gold substats.';
    } else if (totalScore < 85) {
      grade = 'S Tier Great Roll';
      gradeBadgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
      recommendation = 'High performance roll! Excellent for Colossus hard mode intercepts.';
    } else if (totalScore < 95) {
      grade = 'SS Tier Near-God Roll';
      gradeBadgeColor = 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      recommendation = 'Near-perfect meta roll. Top 2% quality on the server.';
    }

    return {
      totalScore,
      grade,
      gradeBadgeColor,
      recommendation,
      mountingMultiplier: weaponMountingMatches ? (reactorRarity === 'ultimate' ? 1.6 : 1.4) : 1.0
    };
  }, [reactorRarity, weaponMountingMatches, substat1Id, substat1Tier, substat1Value, substat2Id, substat2Tier, substat2Value]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/70 p-5 sm:p-6 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
              <Cpu className="w-4 h-4 text-purple-300" />
              <span>THE FIRST DESCENDANT</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-mono">REACTOR CHECKER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Reactor Perfect-Roll Checker
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Inspect your Ultimate & Rare Reactor substat rolls. Evaluate +160% weapon mounting optimization, double-gold roll efficiency, and identify SSS-tier God Rolls.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700/80 px-4 py-3 rounded-xl shadow-inner shrink-0">
            <Award className="w-6 h-6 text-purple-400" />
            <div>
              <span className="text-[11px] text-slate-400 block">Overall Score</span>
              <span className="text-2xl font-black text-purple-300 font-mono">{scoreResults.totalScore} / 100</span>
            </div>
          </div>
        </div>

        {/* Grade Banner */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl border font-black text-base uppercase tracking-wider ${scoreResults.gradeBadgeColor}`}>
              {scoreResults.grade}
            </div>
            <p className="text-xs text-slate-300 max-w-md">{scoreResults.recommendation}</p>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Mounting Skill Power Mult</span>
            <span className="text-lg font-bold font-mono text-cyan-400">{scoreResults.mountingMultiplier}× ({scoreResults.mountingMultiplier === 1.6 ? '+160%' : '+100%'})</span>
          </div>
        </div>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Reactor Classification</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Rarity Tier</label>
                <select
                  value={reactorRarity}
                  onChange={(e) => setReactorRarity(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-purple-500"
                >
                  <option value="ultimate">Ultimate Reactor (+160% Mounting)</option>
                  <option value="rare">Rare Reactor (+140% Equipped)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Archetype</label>
                <select
                  value={archetypeType}
                  onChange={(e) => setArchetypeType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-purple-500"
                >
                  <option value="Singular">Singular</option>
                  <option value="Dimension">Dimension</option>
                  <option value="Fusion">Fusion</option>
                  <option value="Tech">Tech</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="text-sm font-bold text-white">Matching Weapon Mounted (+160%)</span>
                <span className="text-xs text-slate-400 block">Holding exact weapon (e.g. Thunder Cage) in hands</span>
              </div>
              <input
                type="checkbox"
                checked={weaponMountingMatches}
                onChange={(e) => setWeaponMountingMatches(e.target.checked)}
                className="w-5 h-5 accent-purple-500 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>Substat 1 (Primary Stat)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs text-slate-300 font-medium block mb-1">Substat Type</label>
                <select
                  value={substat1Id}
                  onChange={(e) => {
                    setSubstat1Id(e.target.value);
                    const def = REACTOR_SUBSTATS.find(s => s.id === e.target.value);
                    if (def) setSubstat1Value(def.goldMax * 0.95);
                  }}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-purple-500"
                >
                  {REACTOR_SUBSTATS.map(s => (
                    <option key={s.id} value={s.id}>{s.name} (Max: {s.goldMax}{s.unit})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Color Tier</label>
                <select
                  value={substat1Tier}
                  onChange={(e) => setSubstat1Tier(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-amber-300 font-bold focus:outline-none focus:border-purple-500"
                >
                  <option value="gold">Gold Tier</option>
                  <option value="purple">Purple Tier</option>
                  <option value="blue">Blue Tier</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">In-Game Value: {substat1Value}</label>
              <input
                type="number"
                step="0.1"
                value={substat1Value}
                onChange={(e) => setSubstat1Value(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Right Inputs & Scoring */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>Substat 2 (Secondary Stat)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs text-slate-300 font-medium block mb-1">Substat Type</label>
                <select
                  value={substat2Id}
                  onChange={(e) => {
                    setSubstat2Id(e.target.value);
                    const def = REACTOR_SUBSTATS.find(s => s.id === e.target.value);
                    if (def) setSubstat2Value(def.goldMax * 0.95);
                  }}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-purple-500"
                >
                  {REACTOR_SUBSTATS.map(s => (
                    <option key={s.id} value={s.id}>{s.name} (Max: {s.goldMax}{s.unit})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Color Tier</label>
                <select
                  value={substat2Tier}
                  onChange={(e) => setSubstat2Tier(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-amber-300 font-bold focus:outline-none focus:border-purple-500"
                >
                  <option value="gold">Gold Tier</option>
                  <option value="purple">Purple Tier</option>
                  <option value="blue">Blue Tier</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">In-Game Value: {substat2Value}</label>
              <input
                type="number"
                step="0.1"
                value={substat2Value}
                onChange={(e) => setSubstat2Value(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* God Roll Guide */}
          <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>S-Tier Reactor Meta Presets</span>
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Boss Melters:</strong> Skill Crit DMG (Gold) + Colossus Damage (Gold). Essential for Lepic & Hailey.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Dungeon Farming:</strong> Skill Effect Range (Gold) + Skill Cooldown (Gold). King for Bunny & Freyna.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Infinite Buffers:</strong> Skill Duration (Gold) + Skill Cost Reduction (Gold). Best for Enzo & Gley.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
