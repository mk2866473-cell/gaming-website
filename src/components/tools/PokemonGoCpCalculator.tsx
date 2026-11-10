/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Search, Star, Shield, Zap, Heart, Award, ArrowRight
} from 'lucide-react';
import { POKEMON_SPECIES_LIST, CP_MULTIPLIERS, calculatePokemonCp, PokemonSpecies } from '../../data/pokemonGoData';

export default function PokemonGoCpCalculator() {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>('mewtwo');
  const [level, setLevel] = useState<number>(40);
  const [atkIv, setAtkIv] = useState<number>(15);
  const [defIv, setDefIv] = useState<number>(15);
  const [staIv, setStaIv] = useState<number>(15);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const selectedPokemon = POKEMON_SPECIES_LIST.find(p => p.id === selectedSpeciesId) || POKEMON_SPECIES_LIST[0];

  const filteredList = useMemo(() => {
    if (!searchFilter.trim()) return POKEMON_SPECIES_LIST;
    return POKEMON_SPECIES_LIST.filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()));
  }, [searchFilter]);

  const calculation = useMemo(() => {
    const cp = calculatePokemonCp(
      selectedPokemon.baseAttack,
      selectedPokemon.baseDefense,
      selectedPokemon.baseStamina,
      atkIv,
      defIv,
      staIv,
      level
    );

    const cpm = CP_MULTIPLIERS[level] || 0.7903;
    const actualHp = Math.max(10, Math.floor((selectedPokemon.baseStamina + staIv) * cpm));
    const totalIvSum = atkIv + defIv + staIv;
    const ivPercentage = ((totalIvSum / 45) * 100).toFixed(1);

    // Appraisal stars
    let stars = '0★';
    let starColor = 'text-zinc-400';
    if (totalIvSum === 45) {
      stars = '4★ (100% Hundo)';
      starColor = 'text-amber-400 font-extrabold';
    } else if (totalIvSum >= 37) {
      stars = '3★ (82% - 98%)';
      starColor = 'text-emerald-400 font-bold';
    } else if (totalIvSum >= 30) {
      stars = '2★ (67% - 80%)';
      starColor = 'text-cyan-400';
    } else if (totalIvSum >= 23) {
      stars = '1★ (51% - 64%)';
      starColor = 'text-zinc-300';
    }

    return {
      cp,
      actualHp,
      totalIvSum,
      ivPercentage,
      stars,
      starColor,
      cpm: cpm.toFixed(4)
    };
  }, [selectedPokemon, level, atkIv, defIv, staIv]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Pokémon Search & Selection */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-4 h-4" /> Select Pokémon Species
          </label>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search species (Mewtwo, Rayquaza...)"
            className="w-full sm:w-64 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 max-h-36 overflow-y-auto pr-1">
          {filteredList.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedSpeciesId(p.id)}
              className={`p-2 rounded-lg text-left border text-xs transition-colors ${
                selectedSpeciesId === p.id
                  ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <span className="block truncate">{p.name}</span>
              <span className="text-[10px] text-zinc-500 font-mono">#{p.dexNumber} • {p.types.join('/')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Level Slider (1 to 50, +51 Best Buddy) */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Pokémon Level: <span className="font-mono text-white text-base">Level {level}</span>
          </label>
          <span className="text-xs font-mono text-zinc-400">
            CPM: {calculation.cpm}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="51"
          step="0.5"
          value={level}
          onChange={(e) => setLevel(parseFloat(e.target.value))}
          className="w-full accent-cyan-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
          <span>L1 (Wild)</span>
          <span>L15 (Research)</span>
          <span>L20 (Raid/Egg)</span>
          <span>L25 (Boosted)</span>
          <span>L40 (Max XL)</span>
          <span>L50 (Master XL)</span>
          <span>L51 (Buddy)</span>
        </div>
      </div>

      {/* 3 IV Sliders: Attack, Defense, Stamina (0-15) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-rose-400 uppercase tracking-wider">Attack IV</span>
            <span className="font-mono text-white">{atkIv} / 15</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            value={atkIv}
            onChange={(e) => setAtkIv(parseInt(e.target.value, 10))}
            className="w-full accent-rose-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-emerald-400 uppercase tracking-wider">Defense IV</span>
            <span className="font-mono text-white">{defIv} / 15</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            value={defIv}
            onChange={(e) => setDefIv(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-cyan-400 uppercase tracking-wider">HP / Stamina IV</span>
            <span className="font-mono text-white">{staIv} / 15</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            value={staIv}
            onChange={(e) => setStaIv(parseInt(e.target.value, 10))}
            className="w-full accent-cyan-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Main Results Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-amber-500/50 rounded-xl p-4 text-center shadow-lg shadow-amber-950/30">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Calculated Combat Power (CP)</span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 my-1 block">
            {calculation.cp.toLocaleString()} <span className="text-xs font-normal text-zinc-400">CP</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            {selectedPokemon.name} @ Level {level}
          </span>
        </div>

        <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">IV Quality Percentage</span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 my-1 block">
            {calculation.ivPercentage}%
          </span>
          <span className={`text-xs font-mono block ${calculation.starColor}`}>
            {calculation.stars} ({calculation.totalIvSum}/45)
          </span>
        </div>

        <div className="bg-zinc-950 border border-rose-500/40 rounded-xl p-4 text-center">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">In-Battle Max HP</span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-rose-400 my-1 block">
            {calculation.actualHp} <span className="text-xs font-normal text-zinc-400">HP</span>
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Base {selectedPokemon.baseStamina} + {staIv} IV
          </span>
        </div>
      </div>
    </div>
  );
}
