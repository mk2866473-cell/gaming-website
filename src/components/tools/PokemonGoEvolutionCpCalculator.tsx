/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, ArrowRight, Shield, Zap, Heart, RefreshCw, Award, Dna
} from 'lucide-react';
import { POKEMON_SPECIES_LIST, calculatePokemonCp } from '../../data/pokemonGoData';
import { PokeballIcon } from '../GameIcons';

export default function PokemonGoEvolutionCpCalculator() {
  const [selectedBaseId, setSelectedBaseId] = useState<string>('charmander');
  const [currentCp, setCurrentCp] = useState<number>(650);
  const [level, setLevel] = useState<number>(20);
  const [atkIv, setAtkIv] = useState<number>(15);
  const [defIv, setDefIv] = useState<number>(14);
  const [staIv, setStaIv] = useState<number>(14);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Find evolvable pokemon
  const evolvablePokemon = useMemo(() => {
    return POKEMON_SPECIES_LIST.filter(p => p.evolution);
  }, []);

  const filteredList = useMemo(() => {
    if (!searchFilter.trim()) return evolvablePokemon;
    return evolvablePokemon.filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()));
  }, [searchFilter, evolvablePokemon]);

  const basePokemon = POKEMON_SPECIES_LIST.find(p => p.id === selectedBaseId) || evolvablePokemon[0];
  const evolvedPokemon = basePokemon.evolution 
    ? POKEMON_SPECIES_LIST.find(p => p.id === basePokemon.evolution?.evolvesToId) 
    : null;

  // Next stage evolution (for 3-stage lines like Charmander -> Charmeleon -> Charizard)
  const finalEvolvedPokemon = evolvedPokemon?.evolution
    ? POKEMON_SPECIES_LIST.find(p => p.id === evolvedPokemon.evolution?.evolvesToId)
    : null;

  const results = useMemo(() => {
    const preEvoCp = calculatePokemonCp(
      basePokemon.baseAttack,
      basePokemon.baseDefense,
      basePokemon.baseStamina,
      atkIv,
      defIv,
      staIv,
      level
    );

    let stage1Cp = 0;
    let stage2Cp = 0;

    if (evolvedPokemon) {
      stage1Cp = calculatePokemonCp(
        evolvedPokemon.baseAttack,
        evolvedPokemon.baseDefense,
        evolvedPokemon.baseStamina,
        atkIv,
        defIv,
        staIv,
        level
      );
    }

    if (finalEvolvedPokemon) {
      stage2Cp = calculatePokemonCp(
        finalEvolvedPokemon.baseAttack,
        finalEvolvedPokemon.baseDefense,
        finalEvolvedPokemon.baseStamina,
        atkIv,
        defIv,
        staIv,
        level
      );
    }

    const stage1Multiplier = preEvoCp > 0 ? (stage1Cp / preEvoCp).toFixed(2) : '1.00';
    const stage2Multiplier = preEvoCp > 0 && stage2Cp > 0 ? (stage2Cp / preEvoCp).toFixed(2) : '1.00';

    return {
      preEvoCp,
      stage1Cp,
      stage2Cp,
      stage1Multiplier,
      stage2Multiplier
    };
  }, [basePokemon, evolvedPokemon, finalEvolvedPokemon, atkIv, defIv, staIv, level]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/40 border border-red-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400 mb-2 font-mono">
              <PokeballIcon className="w-3.5 h-3.5 text-rose-400" />
              Verified Evolution Mechanics
            </div>
            <h2 className="text-xl font-bold text-white">Pokémon GO Evolution CP Predictor</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Know your Pokémon's exact Combat Power before spending precious Candies.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Select Pokemon and IVs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-red-400" />
              1. Choose Pre-Evolution Pokémon
            </h3>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Quick Search
              </label>
              <input
                type="text"
                placeholder="Search Charmander, Dratini, Magikarp..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
              {filteredList.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedBaseId(p.id)}
                  className={`px-3 py-2 text-left rounded-xl border text-sm transition-all flex flex-col ${
                    selectedBaseId === p.id
                      ? 'bg-red-500/20 border-red-500 text-white font-bold'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  <span className="text-[11px] text-zinc-500 font-mono">#{p.dexNumber}</span>
                </button>
              ))}
            </div>

            {/* Level slider */}
            <div className="pt-3 border-t border-zinc-800">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-zinc-300">Pokémon Level: {level}</label>
                <span className="text-xs text-red-400 font-mono">Level {level}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="0.5"
                value={level}
                onChange={e => setLevel(parseFloat(e.target.value))}
                className="w-full accent-red-500 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* IV Controls */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-zinc-300 mb-2">Appraisal IVs (0 - 15)</label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>ATK</span>
                    <span className="text-red-400 font-bold">{atkIv}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={atkIv}
                    onChange={e => setAtkIv(parseInt(e.target.value))}
                    className="w-full accent-red-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>DEF</span>
                    <span className="text-blue-400 font-bold">{defIv}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={defIv}
                    onChange={e => setDefIv(parseInt(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>STA/HP</span>
                    <span className="text-emerald-400 font-bold">{staIv}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={staIv}
                    onChange={e => setStaIv(parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Result: Evolution Chain & Post-Evolution CP */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Dna className="w-5 h-5 text-rose-400" />
              Evolution Forecast
            </h3>

            {/* Base Form Card */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-zinc-400 font-medium">Current Stage</div>
                <div className="text-lg font-bold text-white">{basePokemon.name}</div>
                <div className="text-xs text-zinc-500">Types: {basePokemon.types.join(', ')}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white font-mono">{results.preEvoCp}</div>
                <div className="text-[11px] text-zinc-500 uppercase font-semibold">Current CP</div>
              </div>
            </div>

            {/* Stage 1 Evolution */}
            {evolvedPokemon && (
              <div className="p-5 rounded-xl bg-gradient-to-r from-red-950/40 to-zinc-950 border border-red-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-red-400 font-semibold mb-1">
                      <ArrowRight className="w-3.5 h-3.5" />
                      Requires {basePokemon.evolution?.candyCost} Candies
                      {basePokemon.evolution?.itemRequired && ` + ${basePokemon.evolution.itemRequired}`}
                    </div>
                    <div className="text-xl font-bold text-white">{evolvedPokemon.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-red-400 font-mono">
                      {results.stage1Cp}
                    </div>
                    <div className="text-xs text-zinc-400">
                      Multiplier: <span className="text-emerald-400 font-bold">~{results.stage1Multiplier}x</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stage 2 Final Evolution (if 3-stage line) */}
            {finalEvolvedPokemon && evolvedPokemon && (
              <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/40 to-zinc-950 border border-amber-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
                      <ArrowRight className="w-3.5 h-3.5" />
                      Requires +{evolvedPokemon.evolution?.candyCost} Candies
                    </div>
                    <div className="text-xl font-bold text-white flex items-center gap-2">
                      {finalEvolvedPokemon.name}
                      <Award className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-amber-400 font-mono">
                      {results.stage2Cp}
                    </div>
                    <div className="text-xs text-zinc-400">
                      Total Multiplier: <span className="text-amber-400 font-bold">~{results.stage2Multiplier}x</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Great/Ultra League Readiness Check */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">PvP League Eligibility</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 font-medium">Great League (1500 CP)</div>
                  <div className={`font-bold mt-1 ${
                    (results.stage2Cp || results.stage1Cp) <= 1500 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {(results.stage2Cp || results.stage1Cp) <= 1500 ? '✓ Eligible' : '✕ Exceeds 1500'}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                  <div className="text-zinc-400 font-medium">Ultra League (2500 CP)</div>
                  <div className={`font-bold mt-1 ${
                    (results.stage2Cp || results.stage1Cp) <= 2500 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {(results.stage2Cp || results.stage1Cp) <= 2500 ? '✓ Eligible' : '✕ Exceeds 2500'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
