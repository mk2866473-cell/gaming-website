/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Target, Sparkles, Shield, Heart, Award, ArrowRight, Zap
} from 'lucide-react';
import { PAL_SPHERES, PalSphere } from '../../data/palworldData';

export default function PalworldCaptureCalculator() {
  const [selectedSphereId, setSelectedSphereId] = useState<string>('ultra-sphere');
  const [targetMaxHp, setTargetMaxHp] = useState<number>(3500);
  const [targetCurrentHp, setTargetCurrentHp] = useState<number>(350); // 10% remaining
  const [palBaseRarity, setPalBaseRarity] = useState<number>(4); // 1 to 5
  const [lifmunkEffigyLevel, setLifmunkEffigyLevel] = useState<number>(10); // 0 to 10 (+5% to +50%)
  const [statusCondition, setStatusCondition] = useState<'none' | 'shocked' | 'frozen' | 'sleep'>('frozen');
  const [backAttackBonus, setBackAttackBonus] = useState<boolean>(true); // +20% from behind

  const selectedSphere = PAL_SPHERES.find(s => s.id === selectedSphereId) || PAL_SPHERES[0];

  const odds = useMemo(() => {
    // Palworld Capture Formula:
    // Rate = BaseChance * SpherePower * (1 + (MaxHP - CurrentHP)/MaxHP * 2) * EffigyMultiplier * StatusMultiplier * BackBonus
    const hpFraction = Math.max(0.01, Math.min(1.0, targetCurrentHp / targetMaxHp));
    const hpFactor = 1.0 + (1.0 - hpFraction) * 2.5; // low HP grants up to 3.5x boost

    const baseChanceByRarity = palBaseRarity === 5 ? 0.05 : palBaseRarity === 4 ? 0.12 : palBaseRarity === 3 ? 0.25 : 0.45;
    const effigyMultiplier = 1.0 + (lifmunkEffigyLevel * 0.05); // up to +50% at lv 10
    const statusMultiplier = statusCondition === 'frozen' || statusCondition === 'sleep' ? 1.5 : statusCondition === 'shocked' ? 1.3 : 1.0;
    const backMultiplier = backAttackBonus ? 1.25 : 1.0;

    const rawRate = baseChanceByRarity * selectedSphere.power * hpFactor * effigyMultiplier * statusMultiplier * backMultiplier;
    const finalRate = Math.min(0.99, Math.max(0.01, rawRate));
    const percentage = (finalRate * 100).toFixed(1);

    // Estimate spheres to reach 95% certainty
    const spheresFor95Percent = Math.ceil(Math.log(0.05) / Math.log(1 - finalRate));

    return {
      percentage,
      finalRate,
      spheresFor95Percent,
      hpPercent: ((hpFraction) * 100).toFixed(0)
    };
  }, [selectedSphere, targetMaxHp, targetCurrentHp, palBaseRarity, lifmunkEffigyLevel, statusCondition, backAttackBonus]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/40 via-zinc-900 to-emerald-950/40 border border-teal-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-semibold text-teal-400 mb-2">
              <Target className="w-3.5 h-3.5" />
              Pal Sphere Catch Probability Engine
            </div>
            <h2 className="text-xl font-bold text-white">Palworld Capture Chance Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Simulate exact catch percentage using Pal Sphere tiers, low HP scaling, status ailments (Frozen/Shocked), Lifmunk Effigies, and Back Attacks.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-400" />
              1. Sphere & Target Parameters
            </h3>

            {/* Sphere Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Pal Sphere Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PAL_SPHERES.map(sphere => (
                  <button
                    key={sphere.id}
                    onClick={() => setSelectedSphereId(sphere.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      selectedSphereId === sphere.id
                        ? 'bg-teal-500/20 border-teal-500 text-white font-bold'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="truncate">{sphere.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{sphere.power}x Power</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target HP Slider */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">Target Remaining HP ({odds.hpPercent}%)</span>
                <span className="font-mono text-emerald-400 font-bold">{targetCurrentHp} / {targetMaxHp} HP</span>
              </div>
              <input
                type="range"
                min="10"
                max={targetMaxHp}
                value={targetCurrentHp}
                onChange={e => setTargetCurrentHp(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Target Boss Rarity */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Pal Tier / Boss Difficulty</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Common / Wild', val: 2 },
                  { name: 'Alpha Dungeon Boss', val: 4 },
                  { name: 'Legendary Boss (Jetragon/Frostallion)', val: 5 }
                ].map(tier => (
                  <button
                    key={tier.name}
                    onClick={() => setPalBaseRarity(tier.val)}
                    className={`p-2 rounded-lg border text-center text-xs transition-all ${
                      palBaseRarity === tier.val
                        ? 'bg-teal-500/20 border-teal-500 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    {tier.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Statue & Status Modifiers */}
            <div className="pt-3 border-t border-zinc-800 space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-zinc-300">Lifmunk Effigy Statue Bonus (Lv. 0 - 10)</span>
                  <span className="text-teal-400 font-mono font-bold">Lv. {lifmunkEffigyLevel} (+{lifmunkEffigyLevel * 5}%)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={lifmunkEffigyLevel}
                  onChange={e => setLifmunkEffigyLevel(parseInt(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>

              {/* Status condition */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Status Condition Ailment</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'none', name: 'None (1.0x)' },
                    { id: 'shocked', name: 'Shocked (1.3x)' },
                    { id: 'frozen', name: 'Frozen (1.5x)' },
                    { id: 'sleep', name: 'Asleep (1.5x)' }
                  ].map(status => (
                    <button
                      key={status.id}
                      onClick={() => setStatusCondition(status.id as any)}
                      className={`p-2 rounded-lg border text-center text-xs transition-all ${
                        statusCondition === status.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {status.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Back Bonus */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={backAttackBonus}
                    onChange={e => setBackAttackBonus(e.target.checked)}
                    className="accent-teal-500"
                  />
                  <span>Back Attack Throw Bonus (+25% Capture Power)</span>
                </label>
                <span className="text-xs text-teal-400 font-bold">1.25x Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-400" />
              Capture Probability
            </h3>

            {/* Odds Banner */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-teal-950/60 via-zinc-950 to-zinc-950 border border-teal-500/40 text-center">
              <div className="text-xs uppercase tracking-wider text-teal-300 font-semibold">Single Throw Capture Rate</div>
              <div className="text-5xl font-black text-emerald-400 font-mono my-2">
                {odds.percentage}%
              </div>
              <div className="text-xs text-zinc-400">
                Guaranteed ~95% cumulative catch in <span className="text-amber-400 font-bold">{odds.spheresFor95Percent} Spheres</span>
              </div>
            </div>

            {/* Sphere Crafting Cost Check */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Sphere Recipe:</div>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedSphere.materials.map(mat => (
                  <span key={mat.name} className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                    {mat.count}x {mat.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 space-y-2">
              <div className="font-bold text-teal-400">Capture Meta Strategy:</div>
              <p className="text-zinc-400 leading-relaxed">
                Whittle legendary bosses down to under 5% HP, apply Frozen or Shock with an electric/ice Pal, and throw an Ultra/Legendary sphere directly into their back for the maximum possible capture multiplier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
