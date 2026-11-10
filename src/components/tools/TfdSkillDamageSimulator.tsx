/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, Flame, Shield, Target, Sparkles, Calculator, 
  HelpCircle, ChevronDown, ChevronUp, Check, Copy, RotateCcw,
  Sliders, Award, Crosshair, Cpu, Gauge
} from 'lucide-react';

interface DescendantPreset {
  id: string;
  name: string;
  element: 'Electric' | 'Fire' | 'Chill' | 'Toxic' | 'Non-Attribute';
  archetype: 'Singular' | 'Dimension' | 'Fusion' | 'Tech';
  baseSkillPower: number;
  skillPowerModifier: number; // percentage e.g. 1800%
  baseCritRate: number; // percentage e.g. 5%
  critDamage: number; // multiplier e.g. 1.5x
  description: string;
  signatureSkill: string;
}

const DESCENDANTS: DescendantPreset[] = [
  {
    id: 'bunny',
    name: 'Bunny / Ultimate Bunny',
    element: 'Electric',
    archetype: 'Singular',
    baseSkillPower: 12500,
    skillPowerModifier: 320,
    baseCritRate: 10,
    critDamage: 1.5,
    description: 'High voltage mob clearing and boss shocking.',
    signatureSkill: 'Lightning Emission (Skill 3)'
  },
  {
    id: 'lepic',
    name: 'Lepic / Ultimate Lepic',
    element: 'Fire',
    archetype: 'Tech',
    baseSkillPower: 14200,
    skillPowerModifier: 2450,
    baseCritRate: 15,
    critDamage: 1.6,
    description: 'Colossus melt boss killer with Overkill traction grenades.',
    signatureSkill: 'Overkill Traction Rounds (Skill 4)'
  },
  {
    id: 'gley',
    name: 'Gley / Ultimate Gley',
    element: 'Non-Attribute',
    archetype: 'Dimension',
    baseSkillPower: 11800,
    skillPowerModifier: 480,
    baseCritRate: 5,
    critDamage: 1.3,
    description: 'Infinite ammo frenzy scaling and Massacre damage.',
    signatureSkill: 'Massacre (Skill 4)'
  },
  {
    id: 'freyna',
    name: 'Freyna / Ultimate Freyna',
    element: 'Toxic',
    archetype: 'Tech',
    baseSkillPower: 13100,
    skillPowerModifier: 620,
    baseCritRate: 5,
    critDamage: 1.5,
    description: 'Room-wide Poison and Room 0 Trauma spread.',
    signatureSkill: 'Venom Baptism (Skill 4)'
  },
  {
    id: 'valby',
    name: 'Valby / Ultimate Valby',
    element: 'Non-Attribute',
    archetype: 'Fusion',
    baseSkillPower: 12000,
    skillPowerModifier: 280,
    baseCritRate: 5,
    critDamage: 1.4,
    description: 'Clean Water puddle zone DOT and Laundry debuff.',
    signatureSkill: 'Clean Up (Skill 3)'
  },
  {
    id: 'hailey',
    name: 'Hailey',
    element: 'Chill',
    archetype: 'Singular',
    baseSkillPower: 15500,
    skillPowerModifier: 3800,
    baseCritRate: 50,
    critDamage: 2.2,
    description: 'Sniper railgun giant single-hit boss obliteration.',
    signatureSkill: 'Zenith Railgun (Skill 4)'
  }
];

export default function TfdSkillDamageSimulator() {
  const [selectedDescendantId, setSelectedDescendantId] = useState<string>('bunny');
  const [reactorPower, setReactorPower] = useState<number>(23000);
  const [reactorOptimizationActive, setReactorOptimizationActive] = useState<boolean>(true); // +160% mounting
  const [skillPowerBoostPercent, setSkillPowerBoostPercent] = useState<number>(85); // Modules
  const [skillPowerModifierAdd, setSkillPowerModifierAdd] = useState<number>(45); // e.g. Focus on Electric
  const [elementalBonusPercent, setElementalBonusPercent] = useState<number>(35);
  const [archetypeBonusPercent, setArchetypeBonusPercent] = useState<number>(25);
  const [critRateModPercent, setCritRateModPercent] = useState<number>(120); // Front Lines + Skill Insight
  const [critDamageModPercent, setCritDamageModPercent] = useState<number>(95);
  const [enemyDefenseReductionPercent, setEnemyDefenseReductionPercent] = useState<number>(0);
  const [targetType, setTargetType] = useState<'normal' | 'colossus'>('colossus');

  const activeDescendant = useMemo(() => {
    return DESCENDANTS.find(d => d.id === selectedDescendantId) || DESCENDANTS[0];
  }, [selectedDescendantId]);

  // Calculations
  const results = useMemo(() => {
    // Mounting multiplier: 1.6x if optimized, else 1.0x or 1.2x
    const mountingMult = reactorOptimizationActive ? 1.6 : 1.0;
    const effectiveReactorPower = reactorPower * mountingMult;

    // Total Skill Power
    const totalSkillPower = (activeDescendant.baseSkillPower + effectiveReactorPower) * (1 + skillPowerBoostPercent / 100);

    // Final Skill Power Modifier
    const totalModifier = (activeDescendant.skillPowerModifier + skillPowerModifierAdd) / 100;

    // Elemental and Archetype multipliers
    const elementMult = 1 + (elementalBonusPercent / 100);
    const archetypeMult = 1 + (archetypeBonusPercent / 100);

    // Base Non-Crit Hit Damage
    const baseHitDamage = totalSkillPower * totalModifier * elementMult * archetypeMult;

    // Effective Crit Stats
    const finalCritRate = Math.min(100, activeDescendant.baseCritRate * (1 + critRateModPercent / 100));
    const finalCritDamage = activeDescendant.critDamage * (1 + critDamageModPercent / 100);

    // Critical Hit Damage
    const criticalHitDamage = baseHitDamage * finalCritDamage;

    // Average Expected Damage (Weighted)
    const critChance = finalCritRate / 100;
    const averageExpectedDamage = (baseHitDamage * (1 - critChance)) + (criticalHitDamage * critChance);

    // Colossus Armor Mitigation (~30% base reduction unless shredded)
    const enemyMitigation = targetType === 'colossus' ? Math.max(0.05, 0.30 * (1 - enemyDefenseReductionPercent / 100)) : 0.05;
    const netDamageToBoss = averageExpectedDamage * (1 - enemyMitigation);
    const netCritDamageToBoss = criticalHitDamage * (1 - enemyMitigation);

    return {
      totalSkillPower,
      totalModifierPercent: Math.round(totalModifier * 100),
      baseHitDamage: Math.round(baseHitDamage),
      finalCritRate: finalCritRate.toFixed(1),
      finalCritDamage: finalCritDamage.toFixed(2),
      criticalHitDamage: Math.round(criticalHitDamage),
      averageExpectedDamage: Math.round(averageExpectedDamage),
      netDamageToBoss: Math.round(netDamageToBoss),
      netCritDamageToBoss: Math.round(netCritDamageToBoss)
    };
  }, [activeDescendant, reactorPower, reactorOptimizationActive, skillPowerBoostPercent, skillPowerModifierAdd, elementalBonusPercent, archetypeBonusPercent, critRateModPercent, critDamageModPercent, enemyDefenseReductionPercent, targetType]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/70 p-5 sm:p-6 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Zap className="w-4 h-4 text-cyan-300" />
              <span>THE FIRST DESCENDANT</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-mono">SKILL DAMAGE SIMULATOR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Descendant Skill Damage Simulator
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Calculate exact skill burst, non-crit hits, critical hits, and Colossus boss damage with Reactor mounting, elemental bonuses, and skill critical scaling.
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-700/80 px-4 py-3 rounded-xl shadow-inner shrink-0">
            <Target className="w-6 h-6 text-cyan-400" />
            <div>
              <span className="text-[11px] text-slate-400 block">Critical Hit Damage</span>
              <span className="text-lg font-black text-cyan-300 font-mono">{results.criticalHitDamage.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Quick Result Meter */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Total Skill Power</span>
            <span className="text-lg font-bold font-mono text-cyan-400">{Math.round(results.totalSkillPower).toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Skill Crit Rate</span>
            <span className="text-lg font-bold font-mono text-amber-400">{results.finalCritRate}%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Skill Crit DMG Multiplier</span>
            <span className="text-lg font-bold font-mono text-purple-400">{results.finalCritDamage}×</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Net Damage to Colossus</span>
            <span className="text-lg font-bold font-mono text-emerald-400">{results.netDamageToBoss.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Descendant & Reactor Setup</span>
            </h2>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Select Descendant Character</label>
              <select
                value={selectedDescendantId}
                onChange={(e) => setSelectedDescendantId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-cyan-500"
              >
                {DESCENDANTS.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.element} • {d.archetype})</option>
                ))}
              </select>
              <span className="text-[11px] text-cyan-400/90 mt-1 block">Signature: {activeDescendant.signatureSkill}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Base Reactor Skill Power</label>
                <input
                  type="number"
                  step="500"
                  value={reactorPower}
                  onChange={(e) => setReactorPower(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Target Enemy Type</label>
                <select
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-cyan-500"
                >
                  <option value="colossus">Void Intercept Colossus Boss</option>
                  <option value="normal">Standard Field Monster / Commander</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="text-sm font-bold text-white">Reactor Weapon Mounting Condition (+160%)</span>
                <span className="text-xs text-slate-400 block">Holding matching weapon class in hands</span>
              </div>
              <input
                type="checkbox"
                checked={reactorOptimizationActive}
                onChange={(e) => setReactorOptimizationActive(e.target.checked)}
                className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>Skill Modules & Power Boosts</span>
            </h2>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Skill Power Boost (Modules): +{skillPowerBoostPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={skillPowerBoostPercent}
                  onChange={(e) => setSkillPowerBoostPercent(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Skill Power Modifier Add (Focus Modules): +{skillPowerModifierAdd}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={skillPowerModifierAdd}
                  onChange={(e) => setSkillPowerModifierAdd(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Skill Critical Hit Rate (Front Lines + Insight): +{critRateModPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={critRateModPercent}
                  onChange={(e) => setCritRateModPercent(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Skill Critical Hit Damage (Emergency Measures): +{critDamageModPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="250"
                  value={critDamageModPercent}
                  onChange={(e) => setCritDamageModPercent(parseInt(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-slate-900 to-cyan-950/40 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>Simulated Combat Damage Output</span>
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Single Non-Crit Hit</span>
                  <span className="text-xl font-bold font-mono text-slate-200">{results.baseHitDamage.toLocaleString()}</span>
                </div>
                <span className="text-xs font-mono px-2 py-1 bg-slate-800 text-slate-400 rounded">1.0× Dmg</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-300 block">Single Critical Strike</span>
                  <span className="text-2xl font-black font-mono text-amber-300">{results.criticalHitDamage.toLocaleString()}</span>
                </div>
                <span className="text-xs font-mono px-2 py-1 bg-amber-950 text-amber-400 border border-amber-600/40 rounded font-bold">
                  {results.finalCritDamage}× CRIT
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-center justify-between">
                <div>
                  <span className="text-xs text-cyan-300 block">Average Sustained Hit (Expected Value)</span>
                  <span className="text-xl font-bold font-mono text-cyan-300">{results.averageExpectedDamage.toLocaleString()}</span>
                </div>
                <span className="text-xs font-mono text-slate-400">{results.finalCritRate}% Crit Probability</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-300 block">Effective Damage vs Hard Colossus Boss</span>
                  <span className="text-2xl font-black font-mono text-emerald-400">{results.netDamageToBoss.toLocaleString()}</span>
                </div>
                <span className="text-xs font-mono text-emerald-300">Armor Adjusted</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
              <h3 className="font-bold text-white uppercase tracking-wider">Theorycrafting Pro Note</h3>
              <p className="leading-relaxed">
                In The First Descendant, Skill Power Modifier additives (e.g. Focus on Electric +20%) are added directly to the skill's base percentage. For skills with already high base modifiers (like Lepic's Overkill at 2,450%), stacking raw Skill Power is more effective than Skill Power Modifier!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
