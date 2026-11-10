/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sword, Shield, Flame, Crosshair, Zap, Award, Check
} from 'lucide-react';

export default function PalworldDamageCalculator() {
  const [attackerAtk, setAttackerAtk] = useState<number>(1200);
  const [activeSkillPower, setActiveSkillPower] = useState<number>(140); // 30 - 150 power
  const [targetDef, setTargetDef] = useState<number>(800);
  const [elementAdvantage, setElementAdvantage] = useState<number>(2.0); // 2.0 (Super effective), 1.0 (Neutral), 0.5 (Resisted)
  const [isStab, setIsStab] = useState<boolean>(true); // +20% same-type attack bonus
  const [isCrit, setIsCrit] = useState<boolean>(false); // 2.0x Critical hit
  const [isHeadshot, setIsHeadshot] = useState<boolean>(false); // 2.0x Headshot multiplier
  const [mountElementalBoost, setMountElementalBoost] = useState<boolean>(true); // +50% elemental mount (e.g. Ragnahawk, Chillet)

  const calculation = useMemo(() => {
    // Palworld Damage Formula:
    // Damage = (Attacker_Atk * Skill_Power / Target_Def) * 0.5 * Element_Multiplier * STAB * Crit * Headshot * MountBoost
    let multiplier = 1.0;
    multiplier *= elementAdvantage;
    if (isStab) multiplier *= 1.2;
    if (mountElementalBoost) multiplier *= 1.5;
    if (isCrit) multiplier *= 2.0;
    if (isHeadshot) multiplier *= 2.0;

    const baseHit = (attackerAtk * activeSkillPower) / Math.max(50, targetDef) * 0.5;
    const finalDamage = Math.round(baseHit * multiplier);
    const nonCritDamage = Math.round(baseHit * (multiplier / (isCrit ? 2.0 : 1.0)));
    const maxCritDamage = Math.round(baseHit * (multiplier * (isCrit ? 1.0 : 2.0)));

    return {
      finalDamage,
      nonCritDamage,
      maxCritDamage,
      totalMultiplier: multiplier.toFixed(2)
    };
  }, [attackerAtk, activeSkillPower, targetDef, elementAdvantage, isStab, isCrit, isHeadshot, mountElementalBoost]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/40 border border-red-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400 mb-2">
              <Sword className="w-3.5 h-3.5" />
              Palworld Combat Damage Equation
            </div>
            <h2 className="text-xl font-bold text-white">Palworld Combat & Active Skill Damage Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Simulate damage output against Alpha Bosses and Tower Leaders incorporating STAB, elemental weaknesses, mounted buffs, and headshots.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-red-400" />
              1. Combat Stats & Skill
            </h3>

            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">Attacker Total Attack Power</span>
                <span className="font-mono text-red-400 font-bold">{attackerAtk} ATK</span>
              </div>
              <input
                type="range"
                min="100"
                max="3500"
                step="25"
                value={attackerAtk}
                onChange={e => setAttackerAtk(parseInt(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">Active Skill Power (CT Skill)</span>
                <span className="font-mono text-amber-400 font-bold">{activeSkillPower} Power</span>
              </div>
              <input
                type="range"
                min="30"
                max="160"
                step="5"
                value={activeSkillPower}
                onChange={e => setActiveSkillPower(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>Fast Skill (30-50)</span>
                <span>Mid-Tier (70-90)</span>
                <span>Signature Ultimate (140-160)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">Defender Target Defense</span>
                <span className="font-mono text-blue-400 font-bold">{targetDef} DEF</span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="25"
                value={targetDef}
                onChange={e => setTargetDef(parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Modifiers */}
            <div className="pt-3 border-t border-zinc-800 space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Elemental Advantage & Mount Buffs
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Super Effective (2x)', val: 2.0 },
                  { name: 'Neutral (1x)', val: 1.0 },
                  { name: 'Resisted (0.5x)', val: 0.5 }
                ].map(el => (
                  <button
                    key={el.name}
                    onClick={() => setElementAdvantage(el.val)}
                    className={`p-2 rounded-lg border text-center text-xs transition-all ${
                      elementAdvantage === el.val
                        ? 'bg-red-500/20 border-red-500 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    {el.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setIsStab(!isStab)}
                  className={`p-2.5 rounded-lg border text-xs font-medium text-left ${
                    isStab ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  STAB Same-Type Bonus (+20%)
                </button>

                <button
                  onClick={() => setMountElementalBoost(!mountElementalBoost)}
                  className={`p-2.5 rounded-lg border text-xs font-medium text-left ${
                    mountElementalBoost ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  Mount Elemental Infusion (+50%)
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsCrit(!isCrit)}
                  className={`p-2 rounded-lg border text-xs font-medium text-left ${
                    isCrit ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  {isCrit ? '✓ Critical Hit (2.0x)' : 'Standard Hit'}
                </button>

                <button
                  onClick={() => setIsHeadshot(!isHeadshot)}
                  className={`p-2 rounded-lg border text-xs font-medium text-left ${
                    isHeadshot ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  {isHeadshot ? '✓ Headshot Multiplier (2.0x)' : 'Body Shot'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Damage Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-400" />
              Damage Forecast
            </h3>

            {/* Big Final Damage Number */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-red-950/60 via-zinc-950 to-zinc-950 border border-red-500/40 text-center">
              <div className="text-xs uppercase tracking-wider text-red-300 font-semibold">Simulated Hit Damage</div>
              <div className="text-4xl font-black text-amber-400 font-mono my-2">
                {calculation.finalDamage.toLocaleString()} DMG
              </div>
              <div className="text-xs text-zinc-400">
                Combined Multipliers: <span className="text-white font-mono font-bold">{calculation.totalMultiplier}x</span>
              </div>
            </div>

            {/* Non-Crit vs Crit Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">Non-Critical Damage</div>
                <div className="text-xl font-bold text-zinc-200 font-mono mt-1">
                  {calculation.nonCritDamage.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">Full Critical Hit</div>
                <div className="text-xl font-bold text-red-400 font-mono mt-1">
                  {calculation.maxCritDamage.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Boss Damage Tip */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 space-y-2">
              <div className="font-bold text-amber-400">Raid & Boss Meta Tip:</div>
              <p className="text-zinc-400 leading-relaxed">
                Riding elemental mount Pals (such as Ragnahawk for Fire or Chillet for Dragon) infuses player gun attacks with elemental damage and gives an additional +50% damage boost that stacks with headshot criticals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
