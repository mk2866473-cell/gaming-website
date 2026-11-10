/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Search, Target, Award, Shield, Check, Crosshair, Heart
} from 'lucide-react';
import { 
  POKEMON_SPECIES_LIST, calculatePokemonCp, calculateCatchProbability, CatchRateParams 
} from '../../data/pokemonGoData';

export default function PokemonGoCatchCpCalculator() {
  const [selectedId, setSelectedId] = useState<string>('mewtwo');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Catch probability settings
  const [encounterLevel, setEncounterLevel] = useState<number>(20);
  const [ballType, setBallType] = useState<'poke' | 'great' | 'ultra'>('ultra');
  const [berryType, setBerryType] = useState<'none' | 'razz' | 'golden' | 'silver'>('golden');
  const [throwQuality, setThrowQuality] = useState<'none' | 'nice' | 'great' | 'excellent'>('excellent');
  const [curveball, setCurveball] = useState<boolean>(true);
  const [medalBonus, setMedalBonus] = useState<number>(1.4); // Platinum Medal

  const selectedPokemon = POKEMON_SPECIES_LIST.find(p => p.id === selectedId) || POKEMON_SPECIES_LIST[0];

  const filteredPokemon = useMemo(() => {
    if (!searchQuery.trim()) return POKEMON_SPECIES_LIST;
    return POKEMON_SPECIES_LIST.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  // Calculate encounter CP ranges (Min IV: 10/10/10 for raids/research, Max: 15/15/15)
  const encounterTiers = useMemo(() => {
    // 1. Research Breakthrough (Level 15)
    const researchMinCp = calculatePokemonCp(selectedPokemon.baseAttack, selectedPokemon.baseDefense, selectedPokemon.baseStamina, 10, 10, 10, 15);
    const researchMaxCp = calculatePokemonCp(selectedPokemon.baseAttack, selectedPokemon.baseDefense, selectedPokemon.baseStamina, 15, 15, 15, 15);

    // 2. Raid Encounter (Level 20)
    const raidMinCp = calculatePokemonCp(selectedPokemon.baseAttack, selectedPokemon.baseDefense, selectedPokemon.baseStamina, 10, 10, 10, 20);
    const raidMaxCp = calculatePokemonCp(selectedPokemon.baseAttack, selectedPokemon.baseDefense, selectedPokemon.baseStamina, 15, 15, 15, 20);

    // 3. Weather Boosted Raid (Level 25)
    const boostedRaidMinCp = calculatePokemonCp(selectedPokemon.baseAttack, selectedPokemon.baseDefense, selectedPokemon.baseStamina, 10, 10, 10, 25);
    const boostedRaidMaxCp = calculatePokemonCp(selectedPokemon.baseAttack, selectedPokemon.baseDefense, selectedPokemon.baseStamina, 15, 15, 15, 25);

    // 4. Wild Max (Level 35 Weather Boosted Hundo)
    const wildMaxCp = calculatePokemonCp(selectedPokemon.baseAttack, selectedPokemon.baseDefense, selectedPokemon.baseStamina, 15, 15, 15, 35);

    // 5. Max Level 50 Hundo
    const max50Cp = calculatePokemonCp(selectedPokemon.baseAttack, selectedPokemon.baseDefense, selectedPokemon.baseStamina, 15, 15, 15, 50);

    return {
      research: { min: researchMinCp, max: researchMaxCp },
      raid: { min: raidMinCp, max: raidMaxCp },
      boostedRaid: { min: boostedRaidMinCp, max: boostedRaidMaxCp },
      wildMax: wildMaxCp,
      max50: max50Cp
    };
  }, [selectedPokemon]);

  // Catch probability calculation
  const catchProbability = useMemo(() => {
    const baseCapture = selectedPokemon.baseCaptureRate || 0.02;
    const params: CatchRateParams = {
      baseCaptureRate: baseCapture,
      level: encounterLevel,
      ballType,
      berryType,
      throwQuality,
      curveball,
      medalBonus
    };
    const rate = calculateCatchProbability(params);
    return {
      singleThrowPercent: (rate * 100).toFixed(1),
      attemptsTo95Percent: Math.ceil(Math.log(0.05) / Math.log(1 - rate))
    };
  }, [selectedPokemon, encounterLevel, ballType, berryType, throwQuality, curveball, medalBonus]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/40 via-zinc-900 to-emerald-950/40 border border-teal-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-semibold text-teal-400 mb-2">
              <Target className="w-3.5 h-3.5" />
              Raid & Wild Catch CP Range Matrix
            </div>
            <h2 className="text-xl font-bold text-white">Pokémon GO Catch CP & Catch Rate Simulator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Verify 100% IV Hundo CP thresholds for Level 20/25 Raids and calculate single-throw catch probabilities.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Species Selection & Catch Modifiers */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-teal-400" />
              1. Select Encounter Pokémon
            </h3>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search Mewtwo, Rayquaza, Kyogre, Tyranitar..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm mb-2"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-44 overflow-y-auto pr-1">
              {filteredPokemon.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    selectedId === p.id
                      ? 'bg-teal-500/20 border-teal-500 text-white font-bold'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="truncate">{p.name}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">#{p.dexNumber}</div>
                </button>
              ))}
            </div>

            {/* Catch Probability Settings */}
            <div className="pt-3 border-t border-zinc-800 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Catch Formula Modifiers</h4>

              {/* Pokéball Type */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Pokéball / Premier Ball</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'poke', name: 'Poké / Premier (1x)' },
                    { id: 'great', name: 'Great Ball (1.5x)' },
                    { id: 'ultra', name: 'Ultra Ball (2.0x)' }
                  ].map(b => (
                    <button
                      key={b.id}
                      onClick={() => setBallType(b.id as any)}
                      className={`p-2 rounded-xl border text-center text-xs transition-all ${
                        ballType === b.id
                          ? 'bg-teal-500/20 border-teal-500 text-white font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Berry Type */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Berry Feeder</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'none', name: 'None (1x)' },
                    { id: 'razz', name: 'Razz (1.5x)' },
                    { id: 'silver', name: 'Silver (1.8x)' },
                    { id: 'golden', name: 'Golden (2.5x)' }
                  ].map(b => (
                    <button
                      key={b.id}
                      onClick={() => setBerryType(b.id as any)}
                      className={`p-2 rounded-xl border text-center text-xs transition-all ${
                        berryType === b.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Throw Quality */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Throw Accuracy & Curve</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'none', name: 'Regular' },
                    { id: 'nice', name: 'Nice' },
                    { id: 'great', name: 'Great' },
                    { id: 'excellent', name: 'Excellent' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setThrowQuality(t.id as any)}
                      className={`p-2 rounded-xl border text-center text-xs transition-all ${
                        throwQuality === t.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Curveball checkbox */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={curveball}
                    onChange={e => setCurveball(e.target.checked)}
                    className="accent-teal-500"
                  />
                  <span>Curveball Throw Bonus (1.7x)</span>
                </label>
                <span className="text-xs text-teal-400 font-bold">1.7x Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: CP Breakdown by Encounter Type & Catch Odds */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              {selectedPokemon.name} CP & Catch Probability
            </h3>

            {/* Single-Throw Odds */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-teal-950/50 to-zinc-950 border border-teal-500/40 text-center">
              <div className="text-xs uppercase tracking-wider text-teal-300 font-semibold">Single-Throw Catch Chance</div>
              <div className="text-4xl font-black text-emerald-400 font-mono my-2">
                {catchProbability.singleThrowPercent}%
              </div>
              <div className="text-xs text-zinc-400">
                Guaranteed ~95% cumulative catch probability in <span className="text-amber-400 font-bold">{catchProbability.attemptsTo95Percent} throws</span>
              </div>
            </div>

            {/* Encounter CP Ranges */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Encounter CP Ranges</h4>

              {/* Raid Level 20 */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Raid Boss (Level 20)</div>
                  <div className="text-[11px] text-zinc-500">Non-weather boosted encounter</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-base font-bold text-teal-400">
                    {encounterTiers.raid.min} - <span className="text-amber-400">{encounterTiers.raid.max} (100% IV)</span>
                  </div>
                  <div className="text-[10px] text-zinc-500">10/10/10 to 15/15/15</div>
                </div>
              </div>

              {/* Weather Boosted Raid Level 25 */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/20 to-zinc-950 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-300">Weather Boosted Raid (Level 25)</div>
                  <div className="text-[11px] text-zinc-500">Boosted weather encounter</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-base font-bold text-amber-400">
                    {encounterTiers.boostedRaid.min} - <span className="text-emerald-400">{encounterTiers.boostedRaid.max} (Hundo)</span>
                  </div>
                  <div className="text-[10px] text-zinc-500">10/10/10 to 15/15/15</div>
                </div>
              </div>

              {/* Research Level 15 */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Field / Special Research (Level 15)</div>
                  <div className="text-[11px] text-zinc-500">Breakthrough encounter</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-base font-bold text-zinc-200">
                    {encounterTiers.research.min} - <span className="text-amber-400">{encounterTiers.research.max} CP</span>
                  </div>
                </div>
              </div>

              {/* Level 50 Cap */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-purple-300">Max Level 50 (100% IV Hundo)</div>
                  <div className="text-[11px] text-zinc-500">Absolute ceiling with XL Candies</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-lg font-black text-purple-400">
                    {encounterTiers.max50} CP
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
