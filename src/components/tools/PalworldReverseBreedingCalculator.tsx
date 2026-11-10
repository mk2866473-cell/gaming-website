/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Heart, Search, ArrowRight, Shield, Award, Users, Filter, GitMerge
} from 'lucide-react';
import { PalSphereIcon } from '../GameIcons';
import { PALWORLD_PALS, findBreedingParents, PalInfo } from '../../data/palworldData';

export default function PalworldReverseBreedingCalculator() {
  const [targetPalId, setTargetPalId] = useState<string>('anubis');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [onlySpecialCombos, setOnlySpecialCombos] = useState<boolean>(false);

  const targetPal = PALWORLD_PALS.find(p => p.id === targetPalId) || PALWORLD_PALS[0];

  const filteredPals = useMemo(() => {
    if (!searchFilter.trim()) return PALWORLD_PALS;
    return PALWORLD_PALS.filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()));
  }, [searchFilter]);

  const parentCombos = useMemo(() => {
    const allPairs = findBreedingParents(targetPal.id);
    if (onlySpecialCombos) {
      return allPairs.filter(p => p.isSpecial);
    }
    return allPairs;
  }, [targetPal, onlySpecialCombos]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/40 via-zinc-900 to-indigo-950/40 border border-teal-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-2 font-mono">
              <PalSphereIcon className="w-3.5 h-3.5 text-cyan-400" />
              Reverse CombiRank Lookup
            </div>
            <h2 className="text-xl font-bold text-white">Palworld Reverse Breeding Calculator (Target Pal → Parent Pairs)</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Choose your desired goal Pal and see all valid parent pairs and special recipes to breed it.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Select Target Pal */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-teal-400" />
              1. Choose Target Pal
            </h3>

            <input
              type="text"
              placeholder="Search Anubis, Jetragon, Shadowbeak..."
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm"
            />

            <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
              {filteredPals.map(p => (
                <button
                  key={p.id}
                  onClick={() => setTargetPalId(p.id)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                    targetPalId === p.id
                      ? 'bg-teal-500/20 border-teal-500 text-white font-bold'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  <span className="text-[10px] text-zinc-500 font-mono mt-1">Power {p.breedingPower}</span>
                </button>
              ))}
            </div>

            {/* Target Pal Details Card */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="text-xs uppercase text-zinc-400 font-semibold">Selected Target:</div>
              <div className="text-lg font-bold text-white flex items-center justify-between">
                <span>{targetPal.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono">
                  #{targetPal.palDexNumber}
                </span>
              </div>
              <div className="text-xs text-zinc-400">
                Breeding Power: <span className="text-teal-400 font-mono font-bold">{targetPal.breedingPower}</span> • Elements: {targetPal.elements.join(', ')}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Parent Pairs Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                Possible Parent Combinations ({parentCombos.length} Pairs)
              </h3>

              <button
                onClick={() => setOnlySpecialCombos(!onlySpecialCombos)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  onlySpecialCombos
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                {onlySpecialCombos ? '★ Showing Special Pairs Only' : 'Filter: Show Special Pairs'}
              </button>
            </div>

            {/* Parent Pairs List */}
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {parentCombos.map((combo, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                    combo.isSpecial
                      ? 'bg-gradient-to-r from-amber-950/30 via-zinc-950 to-zinc-950 border-amber-500/40'
                      : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-bold text-white">
                      {combo.parentA.name}
                      <span className="text-[10px] text-zinc-500 font-mono block">Power {combo.parentA.breedingPower}</span>
                    </div>

                    <span className="text-xs text-zinc-500 font-bold">+</span>

                    <div className="text-xs font-bold text-white">
                      {combo.parentB.name}
                      <span className="text-[10px] text-zinc-500 font-mono block">Power {combo.parentB.breedingPower}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {combo.isSpecial ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        ★ Special Recipe
                      </span>
                    ) : combo.parentA.id === combo.parentB.id ? (
                      <span className="px-2 py-0.5 rounded text-[10px] text-zinc-400 bg-zinc-900">
                        Same Species
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-emerald-400 font-medium">
                        CombiRank
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
