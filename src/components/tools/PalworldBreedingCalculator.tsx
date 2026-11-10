/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Heart, Search, ArrowRight, Shield, Zap, Award, Flame, Box, Dna
} from 'lucide-react';
import { PalSphereIcon } from '../GameIcons';
import { PALWORLD_PALS, calculateBreedingChild, SPECIAL_BREEDING_COMBOS, PalInfo } from '../../data/palworldData';

export default function PalworldBreedingCalculator() {
  const [parentAId, setParentAId] = useState<string>('anubis');
  const [parentBId, setParentBId] = useState<string>('vanwyrm');
  const [searchA, setSearchA] = useState<string>('');
  const [searchB, setSearchB] = useState<string>('');

  const filteredPalsA = useMemo(() => {
    if (!searchA.trim()) return PALWORLD_PALS;
    return PALWORLD_PALS.filter(p => p.name.toLowerCase().includes(searchA.toLowerCase()));
  }, [searchA]);

  const filteredPalsB = useMemo(() => {
    if (!searchB.trim()) return PALWORLD_PALS;
    return PALWORLD_PALS.filter(p => p.name.toLowerCase().includes(searchB.toLowerCase()));
  }, [searchB]);

  const parentA = PALWORLD_PALS.find(p => p.id === parentAId) || PALWORLD_PALS[0];
  const parentB = PALWORLD_PALS.find(p => p.id === parentBId) || PALWORLD_PALS[1];

  const breedingResult = useMemo(() => {
    const child = calculateBreedingChild(parentA.id, parentB.id);
    const isSpecial = SPECIAL_BREEDING_COMBOS.some(
      s => (s.parentAId === parentA.id && s.parentBId === parentB.id) ||
           (s.parentAId === parentB.id && s.parentBId === parentA.id)
    );
    const avgPower = Math.floor((parentA.breedingPower + parentB.breedingPower + 1) / 2);

    return {
      child,
      isSpecial,
      avgPower
    };
  }, [parentA, parentB]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-teal-950/40 border border-emerald-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-2">
              <Heart className="w-3.5 h-3.5" />
              Official CombiRank Breeding Algorithm
            </div>
            <h2 className="text-xl font-bold text-white">Palworld Breeding Calculator (Parent A + B → Child)</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Select any two parent Pals to instantly calculate their offspring using verified breeding power and special unique combinations.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs: Parents */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Parent A */}
            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Parent A (Male/Female)</span>
                <span className="text-xs text-zinc-500 font-mono">Rank {parentA.breedingPower}</span>
              </div>

              <input
                type="text"
                placeholder="Search Parent A..."
                value={searchA}
                onChange={e => setSearchA(e.target.value)}
                className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-xs"
              />

              <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                {filteredPalsA.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setParentAId(p.id)}
                    className={`w-full p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      parentAId === p.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                        : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">#{p.palDexNumber}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Parent B */}
            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Parent B (Opposite Sex)</span>
                <span className="text-xs text-zinc-500 font-mono">Rank {parentB.breedingPower}</span>
              </div>

              <input
                type="text"
                placeholder="Search Parent B..."
                value={searchB}
                onChange={e => setSearchB(e.target.value)}
                className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-xs"
              />

              <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                {filteredPalsB.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setParentBId(p.id)}
                    className={`w-full p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      parentBId === p.id
                        ? 'bg-teal-500/20 border-teal-500 text-white font-bold'
                        : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">#{p.palDexNumber}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Popular Breeding Presets */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Meta Breeding Combos:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Penking + Bushi = Anubis', a: 'penking', b: 'bushio' },
                { name: 'Suzaku + Relaxaurus = Astegon', a: 'suzaku', b: 'relaxaurus' },
                { name: 'Mossanda + Rayhound = Grizzbolt', a: 'mossanda', b: 'rayhound' },
                { name: 'Vanwyrm + Anubis = Faleris', a: 'vanwyrm', b: 'anubis' },
                { name: 'Frostallion + Helzephyr = Frostallion Noct', a: 'frostallion', b: 'helzephyr' }
              ].map(combo => (
                <button
                  key={combo.name}
                  onClick={() => {
                    setParentAId(combo.a);
                    setParentBId(combo.b);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-emerald-500 text-xs text-zinc-300 transition-colors"
                >
                  {combo.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Child Pal Result Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <PalSphereIcon className="w-5 h-5 text-cyan-400" />
              Egg Outcome
            </h3>

            {/* Child Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-950/40 via-zinc-950 to-teal-950/40 border border-cyan-500/40 space-y-4 text-center">
              {breedingResult.isSpecial && (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold font-mono">
                  Special Unique Combination
                </span>
              )}

              <div>
                <div className="text-3xl font-black text-white tracking-tight">{breedingResult.child.name}</div>
                <div className="text-xs text-zinc-400 mt-1">
                  PalDex #{breedingResult.child.palDexNumber} • {breedingResult.child.elements.join(' / ')} Element
                </div>
              </div>

              {/* Stats & Power */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800/80 text-center">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Breeding Power</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">{breedingResult.child.breedingPower}</div>
                </div>
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Base Attack</div>
                  <div className="text-sm font-bold text-red-400 font-mono">{breedingResult.child.baseAttack}</div>
                </div>
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Base Defense</div>
                  <div className="text-sm font-bold text-blue-400 font-mono">{breedingResult.child.baseDefense}</div>
                </div>
              </div>

              {/* Work Suitabilities */}
              <div className="pt-2 text-left space-y-1.5">
                <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Base Work Skills:</div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(breedingResult.child.suitabilities).map(([key, lvl]) => (
                    <span key={key} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 capitalize">
                      {key} Lv.{lvl}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Formula note */}
            <div className="text-xs text-zinc-400 p-3 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="font-semibold text-zinc-300">Calculation:</span> Average breeding power is{' '}
              <span className="font-mono text-emerald-400">({parentA.breedingPower} + {parentB.breedingPower} + 1) / 2 = {breedingResult.avgPower}</span>, yielding the closest CombiRank Pal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
