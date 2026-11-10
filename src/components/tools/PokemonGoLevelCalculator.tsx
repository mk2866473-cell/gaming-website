/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Zap, Shield, Heart, ArrowRight, Layers, Flame, Award, HelpCircle
} from 'lucide-react';
import { CP_MULTIPLIERS, POWER_UP_COSTS, calculateTotalPowerUpCost } from '../../data/pokemonGoData';

export default function PokemonGoLevelCalculator() {
  const [startLevel, setStartLevel] = useState<number>(20);
  const [targetLevel, setTargetLevel] = useState<number>(40);
  const [pokemonType, setPokemonType] = useState<'normal' | 'lucky' | 'shadow' | 'purified'>('normal');
  const [stardustCostPerPowerUp, setStardustCostPerPowerUp] = useState<number>(2500);

  // Estimate current level by stardust cost
  const estimatedLevelRange = useMemo(() => {
    const matches = POWER_UP_COSTS.filter(c => c.stardust === stardustCostPerPowerUp);
    if (matches.length > 0) {
      return `Level ${matches[0].levelRange[0]} - ${matches[matches.length - 1].levelRange[1]}`;
    }
    return 'Custom';
  }, [stardustCostPerPowerUp]);

  const calc = useMemo(() => {
    const validTarget = Math.max(startLevel + 0.5, targetLevel);
    const isLucky = pokemonType === 'lucky';
    const isShadow = pokemonType === 'shadow';
    const isPurified = pokemonType === 'purified';

    const cost = calculateTotalPowerUpCost(startLevel, validTarget, isLucky, isShadow, isPurified);
    const cpmStart = CP_MULTIPLIERS[startLevel] || 0.5974;
    const cpmTarget = CP_MULTIPLIERS[validTarget] || 0.7903;
    const statGrowthPercentage = (((cpmTarget - cpmStart) / cpmStart) * 100).toFixed(1);

    return {
      ...cost,
      target: validTarget,
      cpmStart,
      cpmTarget,
      statGrowthPercentage
    };
  }, [startLevel, targetLevel, pokemonType]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-zinc-900 to-indigo-950/40 border border-blue-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400 mb-2">
              <Zap className="w-3.5 h-3.5" />
              Level 1 to 50 CPM Progression
            </div>
            <h2 className="text-xl font-bold text-white">Pokémon GO Level & Power-Up Step Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Determine your Pokémon's exact level from arc position/stardust cost and calculate required power-up steps.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              1. Level Parameters & Status
            </h3>

            {/* Type selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Pokémon Classification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'normal', name: 'Regular', desc: '100% standard' },
                  { id: 'lucky', name: 'Lucky', desc: '50% dust off' },
                  { id: 'shadow', name: 'Shadow', desc: '+20% cost' },
                  { id: 'purified', name: 'Purified', desc: '10% discount' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setPokemonType(type.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      pokemonType === type.id
                        ? 'bg-blue-500/20 border-blue-500 text-white font-bold'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-sm">{type.name}</div>
                    <div className="text-[10px] text-zinc-500">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Level Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-zinc-300">Starting Level: {startLevel}</label>
                <span className="text-xs text-blue-400 font-mono">Lvl {startLevel}</span>
              </div>
              <input
                type="range"
                min="1"
                max="49.5"
                step="0.5"
                value={startLevel}
                onChange={e => setStartLevel(parseFloat(e.target.value))}
                className="w-full accent-blue-500 bg-zinc-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>Lvl 1 (Wild)</span>
                <span>Lvl 20 (Raid/Egg)</span>
                <span>Lvl 25 (Boosted)</span>
                <span>Lvl 40 (Cap)</span>
              </div>
            </div>

            {/* Target Level Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-zinc-300">Target Level: {targetLevel}</label>
                <span className="text-xs text-indigo-400 font-mono">Lvl {targetLevel}</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="50"
                step="0.5"
                value={targetLevel}
                onChange={e => setTargetLevel(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-zinc-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>Lvl 30 (Soft Cap)</span>
                <span>Lvl 40 (Max Regular)</span>
                <span>Lvl 50 (Max XL)</span>
              </div>
            </div>

            {/* Stardust finder helper */}
            <div className="pt-4 border-t border-zinc-800">
              <label className="block text-xs font-semibold text-zinc-400 mb-2">
                Or Find Level by Power-Up Stardust Cost (Arc Check)
              </label>
              <select
                value={stardustCostPerPowerUp}
                onChange={e => {
                  const dust = parseInt(e.target.value);
                  setStardustCostPerPowerUp(dust);
                  const found = POWER_UP_COSTS.find(c => c.stardust === dust);
                  if (found) setStartLevel(found.levelRange[0]);
                }}
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm"
              >
                {[200, 400, 600, 800, 1000, 1300, 1600, 1900, 2200, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000].map(cost => (
                  <option key={cost} value={cost}>
                    {cost.toLocaleString()} Stardust per power-up
                  </option>
                ))}
              </select>
              <div className="text-xs text-zinc-500 mt-1">
                Estimated current bracket: <span className="text-blue-400 font-medium">{estimatedLevelRange}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results & Required Materials */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              Power-Up Roadmap
            </h3>

            {/* Big summary stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">Total Stardust Needed</div>
                <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                  {calc.stardust.toLocaleString()}
                </div>
                <div className="text-[11px] text-zinc-500">
                  {pokemonType === 'lucky' ? '50% Lucky discount applied' : 'Standard dust'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">Power-Up Button Taps</div>
                <div className="text-2xl font-black text-blue-400 font-mono mt-1">
                  {calc.steps} <span className="text-xs font-normal text-zinc-400">half-levels</span>
                </div>
                <div className="text-[11px] text-zinc-500">
                  From Lvl {startLevel} → Lvl {calc.target}
                </div>
              </div>
            </div>

            {/* Candy Breakdown */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-blue-500/30 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Candy Requirements</div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-zinc-200">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  Regular Candy (Lvl 1 - 40):
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  {calc.candy} Candy
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-zinc-200">
                  <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                  Candy XL (Lvl 40 - 50):
                </div>
                <div className="text-lg font-bold text-purple-400 font-mono">
                  {calc.xlCandy} XL Candy
                </div>
              </div>
            </div>

            {/* Combat Power Multiplier Growth */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="text-xs text-zinc-400 font-medium">Effective Stat Growth</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">CPM Multiplier</span>
                <span className="font-mono text-zinc-200">
                  {calc.cpmStart.toFixed(4)} → {calc.cpmTarget.toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Effective Combat Strength</span>
                <span className="font-bold text-emerald-400">
                  +{calc.statGrowthPercentage}% Higher
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
