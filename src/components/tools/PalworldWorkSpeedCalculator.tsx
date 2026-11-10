/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, Wrench, Shield, Sparkles, Award, ArrowRight, Clock
} from 'lucide-react';
import { PALWORLD_PALS, PASSIVE_TRAITS } from '../../data/palworldData';

export default function PalworldWorkSpeedCalculator() {
  const [baseWorkSpeed, setBaseWorkSpeed] = useState<number>(100);
  const [suitabilityLevel, setSuitabilityLevel] = useState<number>(4); // Handiwork 4 (e.g. Anubis)
  const [selectedPassives, setSelectedPassives] = useState<string[]>(['artisan', 'work-slave', 'serious', 'conceited']);
  const [soulUpgradeCount, setSoulUpgradeCount] = useState<number>(10); // 10 upgrades = +30%
  const [taskCraftingWorkUnits, setTaskCraftingWorkUnits] = useState<number>(500); // e.g. 500 work units for Legendary Sphere / Pal Metal Armor

  const calculation = useMemo(() => {
    // Passive work speed bonus
    let passiveBonus = 0;
    selectedPassives.forEach(id => {
      const p = PASSIVE_TRAITS.find(t => t.id === id);
      if (p) passiveBonus += p.workSpeedMod;
    });

    const soulBonus = soulUpgradeCount * 0.03; // +3% per upgrade up to 30%
    const totalMultiplier = 1.0 + passiveBonus + soulBonus;
    const finalWorkSpeed = Math.round(baseWorkSpeed * totalMultiplier);

    // Suitability multiplier: Lv 1 (1x), Lv 2 (3x), Lv 3 (9x), Lv 4 (27x), Lv 5 (81x condensed)
    const suitabilityMulti = Math.pow(3, suitabilityLevel - 1);
    const effectiveWorkRatePerSec = (finalWorkSpeed / 100) * suitabilityMulti * 2.5;

    // Time to craft task
    const secondsToComplete = Math.max(1, Math.round(taskCraftingWorkUnits / effectiveWorkRatePerSec));
    const minutes = Math.floor(secondsToComplete / 60);
    const seconds = secondsToComplete % 60;

    return {
      finalWorkSpeed,
      passiveBonusPercent: (passiveBonus * 100).toFixed(0),
      soulBonusPercent: (soulBonus * 100).toFixed(0),
      totalMultiplier: totalMultiplier.toFixed(2),
      suitabilityMulti,
      effectiveWorkRatePerSec: effectiveWorkRatePerSec.toFixed(1),
      secondsToComplete,
      formattedTime: minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
    };
  }, [baseWorkSpeed, suitabilityLevel, selectedPassives, soulUpgradeCount, taskCraftingWorkUnits]);

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
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-emerald-950/40 border border-amber-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-2">
              <Wrench className="w-3.5 h-3.5" />
              Maximum Work Speed & Handiwork Optimizer (+115%)
            </div>
            <h2 className="text-xl font-bold text-white">Palworld Work Speed & Crafting Duration Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Calculate maximum possible work speed with the "God Worker" passive stack (Artisan + Work Slave + Serious + Conceited) and Statue souls.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              1. Base Stats & Trait Modifiers
            </h3>

            {/* Suitability Level */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">Work Suitability Level (Handiwork / Mining / Kindling)</span>
                <span className="font-mono text-amber-400 font-bold">Lv. {suitabilityLevel} ({calculation.suitabilityMulti}x Speed)</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={suitabilityLevel}
                onChange={e => setSuitabilityLevel(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>Lv. 1 (1x)</span>
                <span>Lv. 2 (3x)</span>
                <span>Lv. 3 (9x)</span>
                <span>Lv. 4 (27x Anubis)</span>
                <span>Lv. 5 (81x Max Condense)</span>
              </div>
            </div>

            {/* Passive Trait Stack */}
            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Work Passive Traits ({selectedPassives.length}/4 Active)
              </label>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'artisan', name: 'Artisan', bonus: '+50% Work Speed' },
                  { id: 'work-slave', name: 'Work Slave', bonus: '+30% Work Speed' },
                  { id: 'serious', name: 'Serious', bonus: '+20% Work Speed' },
                  { id: 'conceited', name: 'Conceited', bonus: '+10% Work Speed' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => togglePassive(p.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      selectedPassives.includes(p.id)
                        ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div>{p.name}</div>
                    <div className="text-[10px] text-zinc-500">{p.bonus}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Statue of Power Souls */}
            <div className="pt-2 border-t border-zinc-800">
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">Statue of Power Work Speed Upgrades</span>
                <span className="font-mono text-emerald-400 font-bold">+{soulUpgradeCount * 3}% (Lv. {soulUpgradeCount})</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={soulUpgradeCount}
                onChange={e => setSoulUpgradeCount(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Task Work Units */}
            <div className="pt-2 border-t border-zinc-800">
              <label className="block text-xs text-zinc-400 mb-1">Crafting Task Work Units</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Pal Sphere (20)', units: 20 },
                  { name: 'Pal Metal Ingot (150)', units: 150 },
                  { name: 'Legendary Armor (1000)', units: 1000 }
                ].map(task => (
                  <button
                    key={task.name}
                    onClick={() => setTaskCraftingWorkUnits(task.units)}
                    className={`p-2 rounded-lg border text-center text-xs transition-all ${
                      taskCraftingWorkUnits === task.units
                        ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    {task.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Effective Work Production Output
            </h3>

            {/* Big Work Speed Number */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/50 via-zinc-950 to-zinc-950 border border-amber-500/40 text-center">
              <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold">Total Character Work Speed Stat</div>
              <div className="text-5xl font-black text-amber-400 font-mono my-2">
                {calculation.finalWorkSpeed} <span className="text-sm font-normal text-zinc-400">WS</span>
              </div>
              <div className="text-xs text-zinc-400">
                +{calculation.passiveBonusPercent}% Passives • +{calculation.soulBonusPercent}% Statue Souls ({calculation.totalMultiplier}x Total)
              </div>
            </div>

            {/* Time to Complete Benchmark */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Effective Output Rate:</span>
                <span className="font-mono text-white font-bold">{calculation.effectiveWorkRatePerSec} units/sec</span>
              </div>
              <div className="flex items-center justify-between text-sm text-zinc-200 pt-2 border-t border-zinc-800">
                <span className="font-semibold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" /> Crafting Completion Time:
                </span>
                <span className="font-mono font-black text-emerald-400 text-lg">{calculation.formattedTime}</span>
              </div>
            </div>

            {/* God Worker Recommendation */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-zinc-300 space-y-1.5">
              <div className="font-bold text-amber-300">The "God Worker" Anubis Blueprint:</div>
              <p className="text-zinc-400 leading-relaxed">
                Breeding an Anubis with <span className="text-white font-semibold">Artisan (+50%)</span>, <span className="text-white font-semibold">Work Slave (+30%)</span>, <span className="text-white font-semibold">Serious (+20%)</span>, and <span className="text-white font-semibold">Conceited (+10%)</span>, paired with 4-star condensation (Handiwork Lv. 5), creates the fastest crafter in the game, crafting spheres in fractions of a second.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
