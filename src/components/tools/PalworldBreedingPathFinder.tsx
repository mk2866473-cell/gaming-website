/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  GitMerge, Sparkles, Search, ArrowRight, Shield, Award, Layers
} from 'lucide-react';
import { PALWORLD_PALS, calculateBreedingChild, PalInfo } from '../../data/palworldData';

interface PathStep {
  stepNumber: number;
  parentA: PalInfo;
  parentB: PalInfo;
  child: PalInfo;
}

export default function PalworldBreedingPathFinder() {
  const [startPalId, setStartPalId] = useState<string>('lamball');
  const [goalPalId, setGoalPalId] = useState<string>('anubis');

  const startPal = PALWORLD_PALS.find(p => p.id === startPalId) || PALWORLD_PALS[0];
  const goalPal = PALWORLD_PALS.find(p => p.id === goalPalId) || PALWORLD_PALS[10];

  // Find 1-step and 2-step breeding pathways
  const pathways = useMemo(() => {
    if (startPal.id === goalPal.id) return [];

    const foundPaths: PathStep[][] = [];

    // 1. Direct 1-Step: StartPal + Mate = GoalPal
    for (const mate of PALWORLD_PALS) {
      const child = calculateBreedingChild(startPal.id, mate.id);
      if (child.id === goalPal.id) {
        foundPaths.push([
          { stepNumber: 1, parentA: startPal, parentB: mate, child: goalPal }
        ]);
      }
    }

    // 2. 2-Step Breeding Paths (if less than 5 paths found)
    if (foundPaths.length < 8) {
      for (const mate1 of PALWORLD_PALS) {
        const intermediate = calculateBreedingChild(startPal.id, mate1.id);
        if (intermediate.id === startPal.id || intermediate.id === goalPal.id) continue;

        for (const mate2 of PALWORLD_PALS) {
          const finalChild = calculateBreedingChild(intermediate.id, mate2.id);
          if (finalChild.id === goalPal.id) {
            foundPaths.push([
              { stepNumber: 1, parentA: startPal, parentB: mate1, child: intermediate },
              { stepNumber: 2, parentA: intermediate, parentB: mate2, child: goalPal }
            ]);
            if (foundPaths.length >= 12) break;
          }
        }
        if (foundPaths.length >= 12) break;
      }
    }

    return foundPaths;
  }, [startPal, goalPal]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-zinc-900 to-purple-950/40 border border-indigo-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-400 mb-2">
              <GitMerge className="w-3.5 h-3.5" />
              Multi-Step Breeding Route Optimizer
            </div>
            <h2 className="text-xl font-bold text-white">Palworld Breeding Path & Tree Finder</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Find the shortest breeding routes to cross traits from your starter Pal to end-game legendary workers and fighters.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Origin & Destination Selector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              1. Choose Origin & Destination
            </h3>

            {/* Start Pal */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
                Your Starting Pal (Has Desired Passives)
              </label>
              <select
                value={startPalId}
                onChange={e => setStartPalId(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm"
              >
                {PALWORLD_PALS.map(p => (
                  <option key={p.id} value={p.id}>
                    #{p.palDexNumber} - {p.name} (Power: {p.breedingPower})
                  </option>
                ))}
              </select>
            </div>

            {/* Goal Pal */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                Target Goal Pal (Final Offspring)
              </label>
              <select
                value={goalPalId}
                onChange={e => setGoalPalId(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm"
              >
                {PALWORLD_PALS.map(p => (
                  <option key={p.id} value={p.id}>
                    #{p.palDexNumber} - {p.name} (Power: {p.breedingPower})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Presets */}
            <div className="pt-3 border-t border-zinc-800">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">Popular Breeding Paths:</span>
              <div className="space-y-1.5">
                {[
                  { name: 'Lamball → Anubis (God Miner)', start: 'lamball', goal: 'anubis' },
                  { name: 'Chikipi → Jetragon (Fastest Mount)', start: 'chikipi', goal: 'jetragon' },
                  { name: 'Cattiva → Shadowbeak (Dark Boss)', start: 'cattiva', goal: 'shadowbeak' },
                  { name: 'Lifmunk → Lyleen (Master Planter)', start: 'lifmunk', goal: 'lyleen' }
                ].map(p => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setStartPalId(p.start);
                      setGoalPalId(p.goal);
                    }}
                    className="w-full p-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-indigo-500 text-xs text-zinc-300 transition-colors text-left flex justify-between items-center"
                  >
                    <span>{p.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Breeding Paths Output */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-amber-400" />
              Optimal Breeding Pathways ({pathways.length} Routes Found)
            </h3>

            {pathways.length === 0 ? (
              <div className="p-6 text-center text-zinc-500 text-sm">
                Same species selected or no direct path found.
              </div>
            ) : (
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                {pathways.map((path, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                      <span>Route #{idx + 1} ({path.length} Step{path.length > 1 ? 's' : ''})</span>
                      <span className="text-emerald-400">{path.length === 1 ? '✓ Direct 1-Step Combo' : '2-Step Chain'}</span>
                    </div>

                    <div className="space-y-2">
                      {path.map(step => (
                        <div key={step.stepNumber} className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-400">Step {step.stepNumber}:</span>
                            <span className="text-white font-medium">{step.parentA.name}</span>
                            <span className="text-zinc-500">+</span>
                            <span className="text-white font-medium">{step.parentB.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-bold text-amber-400">
                            <ArrowRight className="w-3 h-3 text-zinc-500" />
                            <span>{step.child.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
