/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Egg, Sparkles, Calculator, Check, Info } from 'lucide-react';
import { 
  EGGS, 
  EggData, 
  PetChance, 
  calculateEggsForProbability, 
  calculateExpectedEggs 
} from '../../data/growAGardenData';

export default function GrowAGardenEggHatchingCalculator() {
  const [selectedEggId, setSelectedEggId] = useState<string>('bug');
  const [selectedPetName, setSelectedPetName] = useState<string>('Dragonfly');

  const currentEgg = useMemo(() => {
    return EGGS.find(e => e.id === selectedEggId) || EGGS[0];
  }, [selectedEggId]);

  // When egg changes, default to its lowest chance pet (rarest)
  const handleEggChange = (eggId: string) => {
    setSelectedEggId(eggId);
    const egg = EGGS.find(e => e.id === eggId);
    if (egg && egg.pets.length > 0) {
      const rarestPet = [...egg.pets].sort((a, b) => a.chancePercent - b.chancePercent)[0];
      setSelectedPetName(rarestPet.name);
    }
  };

  const selectedPet = useMemo(() => {
    return currentEgg.pets.find(p => p.name === selectedPetName) || currentEgg.pets[0];
  }, [currentEgg, selectedPetName]);

  const pPercent = selectedPet ? selectedPet.chancePercent : 1.0;

  const eggsFor50 = useMemo(() => calculateEggsForProbability(pPercent, 0.50), [pPercent]);
  const eggsFor90 = useMemo(() => calculateEggsForProbability(pPercent, 0.90), [pPercent]);
  const expectedEggs = useMemo(() => calculateExpectedEggs(pPercent), [pPercent]);

  // Worked example quick actions
  const loadBugDragonflyExample = () => {
    setSelectedEggId('bug');
    setSelectedPetName('Dragonfly');
  };

  const loadLegendaryTurtleExample = () => {
    setSelectedEggId('legendary');
    setSelectedPetName('Turtle');
  };

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-2">
            <Egg className="w-3.5 h-3.5" />
            <span>Roblox Grow a Garden Egg Odds</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Egg Hatching Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate exact pet hatch probabilities, "1 in N" odds, 50%/90% confidence thresholds, and total Sheckle costs.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={loadBugDragonflyExample}
            className="px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 text-violet-300 text-xs font-semibold transition-all cursor-pointer"
          >
            Bug ➔ Dragonfly Example
          </button>
          <button
            type="button"
            onClick={loadLegendaryTurtleExample}
            className="px-3 py-1.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all cursor-pointer"
          >
            Legendary ➔ Turtle Example
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Egg Picker & Pet Odds Table */}
        <div className="lg:col-span-6 space-y-6">
          {/* Egg Selection Tabs */}
          <div className="space-y-3 bg-[#070b19] border border-indigo-950 p-5 rounded-2xl">
            <label className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
              1. Choose an Egg
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EGGS.map(egg => {
                const isSelected = selectedEggId === egg.id;
                return (
                  <button
                    key={egg.id}
                    type="button"
                    onClick={() => handleEggChange(egg.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-md'
                        : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{egg.name}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {egg.priceSheckles ? `${(egg.priceSheckles / 1000).toLocaleString()}k Sheckles` : 'Event / Free'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Egg Pet Table */}
          <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Egg className="w-4 h-4 text-amber-400" />
                  <span>{currentEgg.name} Loot Table</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Cost: {currentEgg.priceSheckles ? `${currentEgg.priceSheckles.toLocaleString()} Sheckles` : 'Special Event'} • Hatch Time: {currentEgg.hatchTimeText}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {currentEgg.pets.map(pet => {
                const isTarget = selectedPetName === pet.name;
                const oneInN = Math.round(100 / pet.chancePercent);
                return (
                  <button
                    key={pet.name}
                    type="button"
                    onClick={() => setSelectedPetName(pet.name)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isTarget
                        ? 'bg-violet-600/30 border-violet-400 text-white shadow-md'
                        : 'bg-[#0c122e] border-indigo-950 text-slate-300 hover:border-indigo-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-3 h-3 rounded-full ${isTarget ? 'bg-amber-400' : 'bg-slate-600'}`} />
                      <span className="text-xs font-bold">{pet.name}</span>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="text-amber-300 font-bold">{pet.chancePercent}%</span>
                      <span className="text-slate-500 text-[10px] ml-2">(1 in {oneInN})</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Probability Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-gradient-to-br from-amber-950/80 via-[#070b19] to-indigo-950/90 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                Target Pet Odds Analysis
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
                <span>{selectedPet.name}</span>
                <span className="text-base font-bold text-amber-400">({selectedPet.chancePercent}%)</span>
              </div>
              <p className="text-xs text-slate-300">
                1 in {Math.round(100 / selectedPet.chancePercent)} chance per egg from {currentEgg.name}.
              </p>
            </div>

            {/* Odds Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#070b19]/90 border border-indigo-900/80 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">50% Confidence</span>
                <div className="text-2xl font-black text-amber-300 font-mono">{eggsFor50.toLocaleString()}</div>
                <span className="text-[10px] text-slate-400 block">Eggs needed</span>
                {currentEgg.priceSheckles && (
                  <span className="text-[10px] font-mono text-emerald-400 block pt-1 border-t border-indigo-950">
                    {(eggsFor50 * currentEgg.priceSheckles).toLocaleString()} Sheckles
                  </span>
                )}
              </div>

              <div className="bg-[#070b19]/90 border border-indigo-900/80 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">90% Confidence</span>
                <div className="text-2xl font-black text-cyan-300 font-mono">{eggsFor90.toLocaleString()}</div>
                <span className="text-[10px] text-slate-400 block">Eggs needed</span>
                {currentEgg.priceSheckles && (
                  <span className="text-[10px] font-mono text-emerald-400 block pt-1 border-t border-indigo-950">
                    {(eggsFor90 * currentEgg.priceSheckles).toLocaleString()} Sheckles
                  </span>
                )}
              </div>

              <div className="bg-[#070b19]/90 border border-indigo-900/80 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Expected Average</span>
                <div className="text-2xl font-black text-violet-300 font-mono">{expectedEggs.toLocaleString()}</div>
                <span className="text-[10px] text-slate-400 block">Eggs (1/p)</span>
                {currentEgg.priceSheckles && (
                  <span className="text-[10px] font-mono text-emerald-400 block pt-1 border-t border-indigo-950">
                    {(expectedEggs * currentEgg.priceSheckles).toLocaleString()} Sheckles
                  </span>
                )}
              </div>
            </div>

            {/* Formula Explanation Card */}
            <div className="bg-[#070b19] border border-indigo-950 p-5 rounded-2xl space-y-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                Logarithmic Odds Formula
              </span>
              <div className="font-mono text-xs text-amber-300 bg-[#0c122e] p-3 rounded-xl border border-indigo-900/60">
                <code>Eggs = Ceil( Ln(1 − Target) / Ln(1 − p) )</code>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed pt-1">
                Because each hatch is independent, reaching a 50% or 90% cumulative guarantee requires solving 1 − (1 − p)^N ≥ Target.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
