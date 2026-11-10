/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  ArrowRightLeft, Footprints, Shield, Heart, Zap, RefreshCw, Box, Award
} from 'lucide-react';
import { PokeballIcon } from '../GameIcons';

export default function PokemonGoCandyCalculator() {
  const [currentCandy, setCurrentCandy] = useState<number>(350);
  const [currentXlCandy, setCurrentXlCandy] = useState<number>(45);
  const [pokemonInStorage, setPokemonInStorage] = useState<number>(18);
  const [transferMultiplier, setTransferMultiplier] = useState<number>(1); // 1 for normal, 2 for spotlight hour
  const [buddyDistanceKm, setBuddyDistanceKm] = useState<number>(5); // 1, 3, 5, 20 km
  const [buddyPoffinActive, setBuddyPoffinActive] = useState<boolean>(false);
  const [targetXlCandy, setTargetXlCandy] = useState<number>(296); // Standard Level 50 max

  const calc = useMemo(() => {
    // Regular candy from transfers
    const transferCandy = pokemonInStorage * transferMultiplier;
    const totalPotentialCandy = currentCandy + transferCandy;

    // Convert Regular Candy to XL (100:1 conversion rate)
    const xlFromConversion = Math.floor(totalPotentialCandy / 100);
    const leftoverCandy = totalPotentialCandy % 100;

    // Total available XL
    const totalAvailableXl = currentXlCandy + xlFromConversion;
    const xlDeficit = Math.max(0, targetXlCandy - totalAvailableXl);

    // Buddy walking
    const effectiveKmPerCandy = buddyPoffinActive ? buddyDistanceKm / 2 : buddyDistanceKm;
    // At level 31+ buddy, ~75% chance of XL candy per walk interval
    const walksForDeficit = xlDeficit > 0 ? Math.ceil(xlDeficit / 0.75) : 0;
    const totalKmToWalk = walksForDeficit * effectiveKmPerCandy;

    return {
      transferCandy,
      totalPotentialCandy,
      xlFromConversion,
      leftoverCandy,
      totalAvailableXl,
      xlDeficit,
      effectiveKmPerCandy,
      walksForDeficit,
      totalKmToWalk
    };
  }, [currentCandy, currentXlCandy, pokemonInStorage, transferMultiplier, buddyDistanceKm, buddyPoffinActive, targetXlCandy]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-rose-950/40 border border-amber-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-semibold text-rose-400 mb-2 font-mono">
              <PokeballIcon className="w-3.5 h-3.5 text-rose-400" />
              Candy & XL Conversion (100:1)
            </div>
            <h2 className="text-xl font-bold text-white">Pokémon GO Candy & XL Candy Walking Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Convert Regular Candies to XL, optimize transfer spotlight hours, and calculate exact Buddy walking distance for Level 50.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Box className="w-5 h-5 text-amber-400" />
              1. Current Inventory & Transfers
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Current Regular Candy</label>
                <input
                  type="number"
                  min="0"
                  value={currentCandy}
                  onChange={e => setCurrentCandy(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Current Candy XL</label>
                <input
                  type="number"
                  min="0"
                  value={currentXlCandy}
                  onChange={e => setCurrentXlCandy(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-purple-400 font-bold font-mono"
                />
              </div>
            </div>

            {/* Storage to transfer */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-zinc-300">Pokémon in Storage to Transfer</label>
                <span className="text-xs text-amber-400 font-bold font-mono">+{calc.transferCandy} Candy</span>
              </div>
              <input
                type="number"
                min="0"
                value={pokemonInStorage}
                onChange={e => setPokemonInStorage(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-mono text-sm"
              />
              
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setTransferMultiplier(transferMultiplier === 2 ? 1 : 2)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                    transferMultiplier === 2
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  {transferMultiplier === 2 ? '✓ 2x Transfer Event Active' : 'Enable 2x Transfer Event (Spotlight Hour)'}
                </button>
              </div>
            </div>

            {/* Buddy Distance Settings */}
            <div className="pt-3 border-t border-zinc-800 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Buddy Walking Settings</h4>
              
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Species Buddy Distance</label>
                <select
                  value={buddyDistanceKm}
                  onChange={e => setBuddyDistanceKm(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm"
                >
                  <option value={1}>1 km (Magikarp, Gyarados, Pidgey)</option>
                  <option value={3}>3 km (Starters, Machop, Gastly, Eevee)</option>
                  <option value={5}>5 km (Dratini, Larvitar, Beldum, Lucario)</option>
                  <option value={20}>20 km (Mewtwo, Rayquaza, Dialga, Legendaries)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-300">Poffin or Excited Mood (Halves Distance)</div>
                <button
                  onClick={() => setBuddyPoffinActive(!buddyPoffinActive)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    buddyPoffinActive ? 'bg-rose-500 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {buddyPoffinActive ? 'POFFIN ACTIVE' : 'NO POFFIN'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Candy Conversion & Level 50 Goals
            </h3>

            {/* 100 to 1 conversion box */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Total Potential Regular Candy</span>
                <span className="font-mono text-white font-bold">{calc.totalPotentialCandy} Candy</span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Converts (100:1) to</div>
                  <div className="text-xl font-bold text-purple-400 font-mono">+{calc.xlFromConversion} XL Candy</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-500">Remaining Candy</div>
                  <div className="text-sm font-mono text-zinc-300">{calc.leftoverCandy} Candy</div>
                </div>
              </div>
            </div>

            {/* Level 50 Milestone Target */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-purple-950/40 to-zinc-950 border border-purple-500/40 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-purple-300 uppercase">Target: Level 50 Max ({targetXlCandy} XL)</span>
                <span className="text-xs text-zinc-400">Total: {calc.totalAvailableXl} / {targetXlCandy} XL</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-zinc-900 rounded-full h-3 overflow-hidden border border-zinc-800">
                <div
                  className="bg-gradient-to-r from-purple-500 to-amber-400 h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (calc.totalAvailableXl / targetXlCandy) * 100)}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs text-zinc-300 pt-1">
                <span>XL Deficit:</span>
                <span className="font-bold text-rose-400 font-mono">
                  {calc.xlDeficit > 0 ? `${calc.xlDeficit} XL Candy still needed` : '✓ Ready for Level 50!'}
                </span>
              </div>
            </div>

            {/* Walking Distance Plan */}
            {calc.xlDeficit > 0 && (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <Footprints className="w-4 h-4 text-emerald-400" />
                  Buddy Distance to Cover Deficit
                </div>
                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="text-zinc-400">Distance per Candy:</span>
                  <span className="font-mono text-zinc-200">{calc.effectiveKmPerCandy} km</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-1 border-t border-zinc-800">
                  <span className="text-zinc-300 font-medium">Total Walking Required (~75% XL drop rate):</span>
                  <span className="text-base font-black text-emerald-400 font-mono">~{calc.totalKmToWalk.toLocaleString()} km</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
