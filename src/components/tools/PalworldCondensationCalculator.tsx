/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, Shield, Heart, ArrowRight, Check, Star, Users, Flame
} from 'lucide-react';
import { CONDENSATION_RANKS, PALWORLD_PALS } from '../../data/palworldData';

export default function PalworldCondensationCalculator() {
  const [selectedPalId, setSelectedPalId] = useState<string>('anubis');
  const [currentRank, setCurrentRank] = useState<number>(0); // 0 to 4
  const [targetRank, setTargetRank] = useState<number>(4); // 1 to 4
  const [currentlyOwnedPals, setCurrentlyOwnedPals] = useState<number>(24);
  const [cakesPerBreedingPairPerHour, setCakesPerBreedingPairPerHour] = useState<number>(10); // Cake speed

  const selectedPal = PALWORLD_PALS.find(p => p.id === selectedPalId) || PALWORLD_PALS[0];

  const results = useMemo(() => {
    let totalNeededFromCurrentToTarget = 0;

    CONDENSATION_RANKS.forEach(r => {
      if (r.rank > currentRank && r.rank <= targetRank) {
        totalNeededFromCurrentToTarget += r.palsRequired;
      }
    });

    const deficit = Math.max(0, totalNeededFromCurrentToTarget - currentlyOwnedPals);
    const breedingEggsNeeded = deficit;
    const cakesNeeded = breedingEggsNeeded; // 1 cake per egg
    const hoursToBreed = (cakesNeeded / cakesPerBreedingPairPerHour).toFixed(1);

    return {
      totalNeededFromCurrentToTarget,
      deficit,
      cakesNeeded,
      hoursToBreed
    };
  }, [currentRank, targetRank, currentlyOwnedPals, cakesPerBreedingPairPerHour]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-rose-950/40 border border-amber-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-2">
              <Star className="w-3.5 h-3.5" />
              116-Pal Essence Condenser Matrix
            </div>
            <h2 className="text-xl font-bold text-white">Palworld Condensation & Star Rank Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Track identical Pal sacrifices (4 → 16 → 32 → 64 = 116 Total), +20% stats, +1 Work Suitability levels, and cake requirements.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              1. Pal Species & Star Goals
            </h3>

            {/* Select Pal */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Target Pal to Maximize</label>
              <select
                value={selectedPalId}
                onChange={e => setSelectedPalId(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm"
              >
                {PALWORLD_PALS.map(p => (
                  <option key={p.id} value={p.id}>
                    #{p.palDexNumber} - {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Star Ranks */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Current Star Rank</label>
                <select
                  value={currentRank}
                  onChange={e => setCurrentRank(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm font-mono"
                >
                  <option value={0}>0 Stars (Base)</option>
                  <option value={1}>★ 1 Star (4 Pals)</option>
                  <option value={2}>★★ 2 Stars (20 Pals)</option>
                  <option value={3}>★★★ 3 Stars (52 Pals)</option>
                  <option value={4}>★★★★ 4 Stars (Max)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Target Star Goal</label>
                <select
                  value={targetRank}
                  onChange={e => setTargetRank(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-amber-400 font-bold text-sm font-mono"
                >
                  <option value={1}>★ 1 Star</option>
                  <option value={2}>★★ 2 Stars</option>
                  <option value={3}>★★★ 3 Stars</option>
                  <option value={4}>★★★★ 4 Stars (+1 Work Lv.)</option>
                </select>
              </div>
            </div>

            {/* Current Inventory Count */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">Pals Currently Stored in Palbox</span>
                <span className="font-mono text-amber-400 font-bold">{currentlyOwnedPals} Pals</span>
              </div>
              <input
                type="number"
                min="0"
                max="116"
                value={currentlyOwnedPals}
                onChange={e => setCurrentlyOwnedPals(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Right: Results & Roadmap */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              Condensation Budget
            </h3>

            {/* Summary Banner */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/60 via-zinc-950 to-zinc-950 border border-amber-500/40 text-center">
              <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold">Additional Pals Still Needed</div>
              <div className="text-4xl font-black text-amber-400 font-mono my-2">
                {results.deficit} <span className="text-sm font-normal text-zinc-400">Pals</span>
              </div>
              <div className="text-xs text-zinc-400">
                Breeding Cakes Required: <span className="text-white font-mono font-bold">{results.cakesNeeded} Cakes</span> (~{results.hoursToBreed} hours)
              </div>
            </div>

            {/* 4-Star Milestone Tiers */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Rank Progression Milestone Table</span>
              {CONDENSATION_RANKS.map(r => (
                <div key={r.rank} className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                  r.rank <= targetRank ? 'bg-zinc-950 border-amber-500/30' : 'bg-zinc-950/40 border-zinc-800 opacity-60'
                }`}>
                  <div>
                    <span className="font-bold text-amber-400 font-mono">{r.stars} Rank {r.rank}</span>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{r.statMultiplier} • {r.partnerSkillBonus}</div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-white font-bold">{r.palsRequired} Pals</span>
                    <div className="text-[10px] text-zinc-500">{r.cumulativePals} Cumulative</div>
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
