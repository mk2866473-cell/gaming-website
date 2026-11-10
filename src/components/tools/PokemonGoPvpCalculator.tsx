/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Search, Shield, Zap, Heart, Trophy, ArrowRight, Award, Check
} from 'lucide-react';
import { POKEMON_SPECIES_LIST, findBestPvpIv, calculatePokemonCp, CP_MULTIPLIERS, PokemonSpecies } from '../../data/pokemonGoData';

export default function PokemonGoPvpCalculator() {
  const [selectedId, setSelectedId] = useState<string>('swampert');
  const [activeLeague, setActiveLeague] = useState<'great' | 'ultra' | 'master'>('great');
  const [atkIv, setAtkIv] = useState<number>(0);
  const [defIv, setDefIv] = useState<number>(14);
  const [staIv, setStaIv] = useState<number>(13);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedPokemon = POKEMON_SPECIES_LIST.find(p => p.id === selectedId) || POKEMON_SPECIES_LIST[0];

  const filteredPokemon = useMemo(() => {
    if (!searchQuery.trim()) return POKEMON_SPECIES_LIST;
    return POKEMON_SPECIES_LIST.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const maxCpCap = activeLeague === 'great' ? 1500 : activeLeague === 'ultra' ? 2500 : 9999;

  const analysis = useMemo(() => {
    // Find optimal rank 1 build under cap
    const rank1Build = findBestPvpIv(selectedPokemon, maxCpCap);

    // Calculate user build
    let userMaxLevel = 1;
    let userCp = 10;
    let userProduct = 0;
    let userAtk = 0;
    let userDef = 0;
    let userHp = 0;

    for (let lvl = 1; lvl <= 51; lvl += 0.5) {
      const cp = calculatePokemonCp(selectedPokemon.baseAttack, selectedPokemon.baseDefense, selectedPokemon.baseStamina, atkIv, defIv, staIv, lvl);
      if (cp <= maxCpCap) {
        const cpm = CP_MULTIPLIERS[lvl] || 0.7903;
        const a = (selectedPokemon.baseAttack + atkIv) * cpm;
        const d = (selectedPokemon.baseDefense + defIv) * cpm;
        const h = Math.floor((selectedPokemon.baseStamina + staIv) * cpm);
        const prod = Math.round(a * d * h / 1000);

        if (prod > userProduct) {
          userProduct = prod;
          userMaxLevel = lvl;
          userCp = cp;
          userAtk = Math.round(a * 10) / 10;
          userDef = Math.round(d * 10) / 10;
          userHp = h;
        }
      }
    }

    // Performance vs Rank 1
    const percentOfMax = rank1Build.statProduct > 0 
      ? ((userProduct / rank1Build.statProduct) * 100).toFixed(2)
      : '100.00';

    return {
      rank1Build,
      userMaxLevel,
      userCp,
      userProduct,
      userAtk,
      userDef,
      userHp,
      percentOfMax
    };
  }, [selectedPokemon, maxCpCap, atkIv, defIv, staIv]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-zinc-900 to-emerald-950/40 border border-blue-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400 mb-2">
              <Trophy className="w-3.5 h-3.5" />
              GO Battle League Stat Product Optimizer
            </div>
            <h2 className="text-xl font-bold text-white">Pokémon GO PvP IV & Stat Product Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Find the #1 Rank PvP IV spread for Great League (1500 CP), Ultra League (2500 CP), and Master League.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: League & Pokémon Selector */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              1. League & Pokémon Selection
            </h3>

            {/* League Tabs */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'great', name: 'Great League', cap: '1,500 CP' },
                { id: 'ultra', name: 'Ultra League', cap: '2,500 CP' },
                { id: 'master', name: 'Master League', cap: 'No CP Cap' }
              ].map(league => (
                <button
                  key={league.id}
                  onClick={() => setActiveLeague(league.id as any)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    activeLeague === league.id
                      ? 'bg-blue-500/20 border-blue-500 text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-xs">{league.name}</div>
                  <div className="text-[10px] text-zinc-500">{league.cap}</div>
                </button>
              ))}
            </div>

            {/* Pokemon Search & Grid */}
            <div>
              <input
                type="text"
                placeholder="Search Swampert, Lucario, Umbreon..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm mb-3"
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                {filteredPokemon.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      selectedId === p.id
                        ? 'bg-blue-500/20 border-blue-500 text-white font-bold'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="truncate">{p.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">#{p.dexNumber}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* IV Inputs for User's pokemon */}
            <div className="pt-3 border-t border-zinc-800 space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Your Pokémon's IVs (0 - 15)
              </label>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>ATK</span>
                    <span className="font-bold text-red-400">{atkIv}</span>
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
                    <span className="font-bold text-blue-400">{defIv}</span>
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
                    <span>HP</span>
                    <span className="font-bold text-emerald-400">{staIv}</span>
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

        {/* Right: Stat Product Comparison */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              PvP Stat Product Analysis
            </h3>

            {/* Performance Bar */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400 font-medium">PvP Stat Product Quality:</span>
                <span className="font-mono font-bold text-emerald-400">{analysis.percentOfMax}% of Rank 1</span>
              </div>
              <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full"
                  style={{ width: `${Math.min(100, parseFloat(analysis.percentOfMax))}%` }}
                />
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* User Build */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="text-xs uppercase text-zinc-400 font-semibold">Your Build ({atkIv}/{defIv}/{staIv})</div>
                <div className="text-2xl font-black text-blue-400 font-mono">{analysis.userCp} CP</div>
                <div className="text-xs text-zinc-400">Target Level: <span className="font-bold text-white">Lvl {analysis.userMaxLevel}</span></div>
                
                <div className="pt-2 border-t border-zinc-800 text-[11px] space-y-1 text-zinc-400">
                  <div>Atk: <span className="text-zinc-200 font-mono">{analysis.userAtk}</span></div>
                  <div>Def: <span className="text-zinc-200 font-mono">{analysis.userDef}</span></div>
                  <div>HP: <span className="text-zinc-200 font-mono">{analysis.userHp}</span></div>
                  <div className="text-purple-300 font-semibold pt-1">Stat Prod: {analysis.userProduct.toLocaleString()}k</div>
                </div>
              </div>

              {/* Optimal Rank 1 */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/40 to-zinc-950 border border-amber-500/40 space-y-2">
                <div className="text-xs uppercase text-amber-400 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Optimal Rank #1 (0/15/15)
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono">{analysis.rank1Build.bestCp} CP</div>
                <div className="text-xs text-zinc-400">Ideal Level: <span className="font-bold text-white">Lvl {analysis.rank1Build.bestLevel}</span></div>

                <div className="pt-2 border-t border-zinc-800 text-[11px] space-y-1 text-zinc-400">
                  <div>Atk: <span className="text-zinc-200 font-mono">{analysis.rank1Build.atk}</span></div>
                  <div>Def: <span className="text-zinc-200 font-mono">{analysis.rank1Build.def}</span></div>
                  <div>HP: <span className="text-zinc-200 font-mono">{analysis.rank1Build.hp}</span></div>
                  <div className="text-amber-300 font-semibold pt-1">Max Prod: {analysis.rank1Build.statProduct.toLocaleString()}k</div>
                </div>
              </div>
            </div>

            {/* PVP Pro Tip */}
            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-zinc-300">
              <span className="font-bold text-blue-400">PvP Tip:</span> In CP-capped leagues (Great & Ultra), Attack contributes double towards the CP formula. Lower attack allows more power-ups, yielding significantly higher bulk (Defense × HP).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
