/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Flame, Shield, Sword, Heart, Trophy, Users, Timer, Sparkles, Check, AlertTriangle
} from 'lucide-react';
import { RAID_BOSS_TIERS, POKEMON_SPECIES_LIST, RaidBossTier } from '../../data/pokemonGoData';

export default function PokemonGoRaidDamageCalculator() {
  const [selectedTier, setSelectedTier] = useState<number>(5);
  const [trainerCount, setTrainerCount] = useState<number>(3);
  const [attackerDps, setAttackerDps] = useState<number>(32); // average DPS per trainer
  const [weatherBoost, setWeatherBoost] = useState<boolean>(false); // +20% damage
  const [friendshipBonus, setFriendshipBonus] = useState<'none' | 'great' | 'ultra' | 'best'>('best'); // 0%, 5%, 7%, 10%
  const [megaBoost, setMegaBoost] = useState<boolean>(true); // +10% / 30% same type

  const currentBoss = RAID_BOSS_TIERS.find(t => t.tier === selectedTier) || RAID_BOSS_TIERS[2];

  const simulation = useMemo(() => {
    let multiplier = 1.0;
    if (weatherBoost) multiplier *= 1.2;
    if (friendshipBonus === 'great') multiplier *= 1.05;
    if (friendshipBonus === 'ultra') multiplier *= 1.07;
    if (friendshipBonus === 'best') multiplier *= 1.10;
    if (megaBoost) multiplier *= 1.10;

    const effectiveSingleDps = attackerDps * multiplier;
    const totalTeamDps = effectiveSingleDps * trainerCount;

    const timeToWinSeconds = Math.round(currentBoss.bossHp / totalTeamDps);
    const timeRemaining = currentBoss.timeLimitSec - timeToWinSeconds;
    const isWin = timeToWinSeconds <= currentBoss.timeLimitSec;

    // Minimum trainers needed
    const minTrainersNeeded = Math.ceil(currentBoss.bossHp / (effectiveSingleDps * currentBoss.timeLimitSec));

    // Solo viability
    const soloTtw = Math.round(currentBoss.bossHp / effectiveSingleDps);
    const isSoloPossible = soloTtw <= currentBoss.timeLimitSec;

    return {
      effectiveSingleDps: effectiveSingleDps.toFixed(1),
      totalTeamDps: totalTeamDps.toFixed(1),
      timeToWinSeconds,
      timeRemaining,
      isWin,
      minTrainersNeeded,
      soloTtw,
      isSoloPossible
    };
  }, [currentBoss, trainerCount, attackerDps, weatherBoost, friendshipBonus, megaBoost]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/40 border border-red-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400 mb-2">
              <Sword className="w-3.5 h-3.5" />
              Raid Battle Boss DPS & TTW Simulator
            </div>
            <h2 className="text-xl font-bold text-white">Pokémon GO Raid Boss Damage & Time-To-Win Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Simulate raid team damage, TTW (Time-To-Win), weather buffs, Best Friend multipliers, and minimum party size.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-400" />
              1. Raid Boss Difficulty & Lobby
            </h3>

            {/* Tier Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Raid Boss Tier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {RAID_BOSS_TIERS.map(b => (
                  <button
                    key={b.tier}
                    onClick={() => setSelectedTier(b.tier)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                      selectedTier === b.tier
                        ? 'bg-red-500/20 border-red-500 text-white'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>{b.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{b.bossHp.toLocaleString()} HP • {b.timeLimitSec}s</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trainers Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-zinc-300">Trainers in Lobby: {trainerCount}</span>
                <span className="text-xs font-bold font-mono text-red-400">{trainerCount} Trainers</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={trainerCount}
                onChange={e => setTrainerCount(parseInt(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>

            {/* Average Trainer DPS */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-zinc-300">Average Attacker DPS per Trainer: {attackerDps}</span>
                <span className="text-xs font-bold font-mono text-amber-400">{attackerDps} DPS</span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                value={attackerDps}
                onChange={e => setAttackerDps(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>Budget (15-20)</span>
                <span>Solid Counters (30-35)</span>
                <span>Top Shadow/Mega (45-55+)</span>
              </div>
            </div>

            {/* Combat Multipliers */}
            <div className="pt-3 border-t border-zinc-800 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Battle Modifiers</h4>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Weather Boost */}
                <button
                  onClick={() => setWeatherBoost(!weatherBoost)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    weatherBoost ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="font-bold">Weather Boost (+20%)</div>
                  <div className="text-[10px] text-zinc-500">{weatherBoost ? 'Active' : 'Disabled'}</div>
                </button>

                {/* Mega Boost */}
                <button
                  onClick={() => setMegaBoost(!megaBoost)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    megaBoost ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="font-bold">Mega In Lobby (+10%)</div>
                  <div className="text-[10px] text-zinc-500">{megaBoost ? 'Active' : 'Disabled'}</div>
                </button>
              </div>

              {/* Friendship */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Friendship Attack Bonus</label>
                <select
                  value={friendshipBonus}
                  onChange={e => setFriendshipBonus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-xs"
                >
                  <option value="none">No Friend Bonus (0%)</option>
                  <option value="great">Great Friend (+5% Damage)</option>
                  <option value="ultra">Ultra Friend (+7% Damage)</option>
                  <option value="best">Best Friend (+10% Damage)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Raid Outcome Forecast
            </h3>

            {/* Victory Banner */}
            <div className={`p-5 rounded-xl border text-center ${
              simulation.isWin 
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400' 
                : 'bg-rose-950/40 border-rose-500/50 text-rose-400'
            }`}>
              <div className="text-xs uppercase font-bold tracking-wider">
                {simulation.isWin ? '✓ VICTORY ESTIMATED' : '✕ TIMEOUT (DEFEAT)'}
              </div>
              <div className="text-4xl font-black font-mono my-2 text-white">
                {simulation.timeToWinSeconds}s <span className="text-sm font-normal text-zinc-400">/ {currentBoss.timeLimitSec}s</span>
              </div>
              <div className="text-xs">
                {simulation.isWin
                  ? `Clear with ${simulation.timeRemaining} seconds left on timer`
                  : `Needs ${Math.abs(simulation.timeRemaining)} more seconds. Add more trainers!`}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400">Total Lobby Output</div>
                <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                  {simulation.totalTeamDps} <span className="text-xs text-zinc-400">DPS</span>
                </div>
                <div className="text-[10px] text-zinc-500 mt-1">
                  ({simulation.effectiveSingleDps} DPS per player)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400">Minimum Party Size</div>
                <div className="text-2xl font-black text-red-400 font-mono mt-1">
                  {simulation.minTrainersNeeded} <span className="text-xs text-zinc-400">Trainers</span>
                </div>
                <div className="text-[10px] text-zinc-500 mt-1">
                  {simulation.isSoloPossible ? 'Soloable by 1 elite trainer!' : 'Multiplayer lobby required'}
                </div>
              </div>
            </div>

            {/* Solo Breakdown */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Solo (1-Trainer) TTW:</span>
                <span className={`font-mono font-bold ${simulation.isSoloPossible ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  {simulation.soloTtw}s {simulation.isSoloPossible ? '(Soloable)' : '(Not soloable)'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                <span className="text-zinc-400">Boss Total Health Pool:</span>
                <span className="font-mono text-white font-bold">{currentBoss.bossHp.toLocaleString()} HP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
