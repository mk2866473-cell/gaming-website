/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Shield, Zap, Heart, Sparkles, Award, ArrowRight, HelpCircle
} from 'lucide-react';
import { PALWORLD_PALS, PASSIVE_TRAITS, PalInfo } from '../../data/palworldData';

export default function PalworldIvCalculator() {
  const [selectedPalId, setSelectedPalId] = useState<string>('anubis');
  const [level, setLevel] = useState<number>(50);
  const [currentHp, setCurrentHp] = useState<number>(4200);
  const [currentAtk, setCurrentAtk] = useState<number>(1150);
  const [currentDef, setCurrentDef] = useState<number>(850);
  const [selectedPassives, setSelectedPassives] = useState<string[]>(['musclehead', 'ferocious']);
  const [palSoulsTier, setPalSoulsTier] = useState<number>(0); // 0% to +30% (10 upgrades * 3%)
  const [condensationRank, setCondensationRank] = useState<number>(0); // 0%, 5%, 10%, 15%, 20%

  const selectedPal = PALWORLD_PALS.find(p => p.id === selectedPalId) || PALWORLD_PALS[0];

  const analysis = useMemo(() => {
    // Passive multipliers
    let passiveAtkMod = 1.0;
    let passiveDefMod = 1.0;

    selectedPassives.forEach(id => {
      const trait = PASSIVE_TRAITS.find(t => t.id === id);
      if (trait) {
        passiveAtkMod += trait.attackMod;
        passiveDefMod += trait.defenseMod;
      }
    });

    const soulMod = 1.0 + (palSoulsTier * 0.03); // +3% per upgrade tier up to 30%
    const condenseMod = 1.0 + (condensationRank * 0.05); // +5% per star rank

    // Palworld stat formula:
    // Stat = (BaseStat * Scaling * (1 + IV/100)) * PassiveMod * SoulMod * CondenseMod
    // Level scaling: ~0.075 * level + 1
    const lvlScale = (level * 0.075) + 1;

    // Estimate IVs (0% to 30%)
    const rawAtkExpected = selectedPal.baseAttack * lvlScale * 7.5;
    const rawDefExpected = selectedPal.baseDefense * lvlScale * 5.0;
    const rawHpExpected = selectedPal.baseHp * lvlScale * 25.0;

    const computedAtkIv = Math.min(30, Math.max(0, Math.round(((currentAtk / (passiveAtkMod * soulMod * condenseMod) - rawAtkExpected) / rawAtkExpected) * 100)));
    const computedDefIv = Math.min(30, Math.max(0, Math.round(((currentDef / (passiveDefMod * soulMod * condenseMod) - rawDefExpected) / rawDefExpected) * 100)));
    const computedHpIv = Math.min(30, Math.max(0, Math.round(((currentHp / (soulMod * condenseMod) - rawHpExpected) / rawHpExpected) * 100)));

    const totalIvSum = computedHpIv + computedAtkIv + computedDefIv;
    const totalIvPercent = ((totalIvSum / 90) * 100).toFixed(1);

    return {
      computedHpIv,
      computedAtkIv,
      computedDefIv,
      totalIvSum,
      totalIvPercent,
      passiveAtkMod: ((passiveAtkMod - 1) * 100).toFixed(0),
      passiveDefMod: ((passiveDefMod - 1) * 100).toFixed(0)
    };
  }, [selectedPal, level, currentHp, currentAtk, currentDef, selectedPassives, palSoulsTier, condensationRank]);

  const togglePassive = (id: string) => {
    if (selectedPassives.includes(id)) {
      setSelectedPassives(selectedPassives.filter(p => p !== id));
    } else {
      if (selectedPassives.length < 4) {
        setSelectedPassives([...selectedPassives, id]);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-amber-950/40 border border-emerald-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-2">
              <Award className="w-3.5 h-3.5" />
              0% - 30% IV Genetic Talent Formula
            </div>
            <h2 className="text-xl font-bold text-white">Palworld IV & Stat Talent Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Calculate exact hidden IV percentages (0% to +30% for HP, Attack, Defense) after subtracting passive skills and statue soul bonuses.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              1. Pal Species & Stats
            </h3>

            {/* Select Pal */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Select Pal Species</label>
              <select
                value={selectedPalId}
                onChange={e => setSelectedPalId(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm"
              >
                {PALWORLD_PALS.map(p => (
                  <option key={p.id} value={p.id}>
                    #{p.palDexNumber} - {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Slider */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300 font-semibold">Pal Level: {level}</span>
                <span className="font-mono text-emerald-400 font-bold">Lvl {level}</span>
              </div>
              <input
                type="range"
                min="1"
                max="55"
                value={level}
                onChange={e => setLevel(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Stat Inputs */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">In-Game HP</label>
                <input
                  type="number"
                  value={currentHp}
                  onChange={e => setCurrentHp(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">In-Game Attack</label>
                <input
                  type="number"
                  value={currentAtk}
                  onChange={e => setCurrentAtk(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">In-Game Defense</label>
                <input
                  type="number"
                  value={currentDef}
                  onChange={e => setCurrentDef(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-xs font-mono"
                />
              </div>
            </div>

            {/* Passive Traits Selector */}
            <div className="pt-3 border-t border-zinc-800 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Passive Traits ({selectedPassives.length}/4 Selected)
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                {PASSIVE_TRAITS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => togglePassive(t.id)}
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${
                      selectedPassives.includes(t.id)
                        ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>{t.name}</div>
                    <div className="text-[10px] text-zinc-500">{t.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Statue of Power Souls Upgrades */}
            <div className="pt-2 border-t border-zinc-800">
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">Statue of Power Soul Upgrade (+30% Max)</span>
                <span className="text-amber-400 font-mono font-bold">+{palSoulsTier * 3}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={palSoulsTier}
                onChange={e => setPalSoulsTier(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Right: Calculated IV Scores */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Genetic Talent (IV) Rating
            </h3>

            {/* Main Score Banner */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/50 to-zinc-950 border border-emerald-500/40 text-center">
              <div className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">Total Genetic Perfection</div>
              <div className="text-4xl font-black text-amber-400 font-mono my-2">
                {analysis.totalIvPercent}% <span className="text-sm font-normal text-zinc-400">({analysis.totalIvSum} / 90)</span>
              </div>
              <div className="text-xs text-zinc-400">
                {analysis.totalIvSum >= 85 ? '★ Near Perfect 100% God Roll' : analysis.totalIvSum >= 60 ? 'Great Competitive IVs' : 'Standard Wild IVs'}
              </div>
            </div>

            {/* Individual IV Cards */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">HP IV</div>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">+{analysis.computedHpIv}%</div>
                <div className="text-[10px] text-zinc-500">Max +30%</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">Attack IV</div>
                <div className="text-2xl font-black text-red-400 font-mono mt-1">+{analysis.computedAtkIv}%</div>
                <div className="text-[10px] text-zinc-500">Max +30%</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">Defense IV</div>
                <div className="text-2xl font-black text-blue-400 font-mono mt-1">+{analysis.computedDefIv}%</div>
                <div className="text-[10px] text-zinc-500">Max +30%</div>
              </div>
            </div>

            {/* Mechanics Explanation */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> Palworld IV Mechanics
              </div>
              <p className="text-zinc-400 leading-relaxed">
                In Palworld, every Pal hatches or spawns with random IV talent boosts ranging from +0% to +30% on HP, Attack, and Defense. Parents have a high probability to pass down their highest IV talents to eggs at the Breeding Farm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
