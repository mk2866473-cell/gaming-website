/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Plus, Trash2, Shield, Zap, TrendingUp, Check, Layers, Award, Coins
} from 'lucide-react';
import { calculateTotalPowerUpCost } from '../../data/pokemonGoData';
import { PokeballIcon } from '../GameIcons';

interface PlannedPokemon {
  id: string;
  name: string;
  startLevel: number;
  targetLevel: number;
  type: 'normal' | 'lucky' | 'shadow' | 'purified';
  unlockSecondMove: boolean;
  secondMoveCost: number; // 10k, 50k, 75k, 100k
}

export default function PokemonGoStardustCalculator() {
  const [team, setTeam] = useState<PlannedPokemon[]>([
    { id: '1', name: 'Mewtwo (Raid Attacker)', startLevel: 20, targetLevel: 40, type: 'normal', unlockSecondMove: true, secondMoveCost: 100000 },
    { id: '2', name: 'Shadow Machamp (Raid Attacker)', startLevel: 8, targetLevel: 40, type: 'shadow', unlockSecondMove: false, secondMoveCost: 75000 },
    { id: '3', name: 'Swampert (PvP Ultra League)', startLevel: 20, targetLevel: 35, type: 'lucky', unlockSecondMove: true, secondMoveCost: 10000 }
  ]);

  const [starPieceActive, setStarPieceActive] = useState<boolean>(false);
  const [baseCatchDust, setBaseCatchDust] = useState<number>(100);

  // Form to add a new pokemon
  const [newName, setNewName] = useState<string>('');
  const [newStartLvl, setNewStartLvl] = useState<number>(20);
  const [newTargetLvl, setNewTargetLvl] = useState<number>(40);
  const [newType, setNewType] = useState<'normal' | 'lucky' | 'shadow' | 'purified'>('normal');
  const [newSecondMove, setNewSecondMove] = useState<boolean>(false);
  const [newSecondMoveCost, setNewSecondMoveCost] = useState<number>(75000);

  const addPokemon = () => {
    if (!newName.trim()) return;
    setTeam([
      ...team,
      {
        id: Date.now().toString(),
        name: newName.trim(),
        startLevel: newStartLvl,
        targetLevel: newTargetLvl,
        type: newType,
        unlockSecondMove: newSecondMove,
        secondMoveCost: newSecondMoveCost
      }
    ]);
    setNewName('');
  };

  const removePokemon = (id: string) => {
    setTeam(team.filter(p => p.id !== id));
  };

  const totals = useMemo(() => {
    let powerUpDust = 0;
    let secondMoveDust = 0;
    let totalCandy = 0;
    let totalXlCandy = 0;

    const perPokemonBreakdown = team.map(p => {
      const isLucky = p.type === 'lucky';
      const isShadow = p.type === 'shadow';
      const isPurified = p.type === 'purified';

      const cost = calculateTotalPowerUpCost(p.startLevel, p.targetLevel, isLucky, isShadow, isPurified);
      let moveDust = 0;
      if (p.unlockSecondMove) {
        moveDust = isShadow ? Math.floor(p.secondMoveCost * 1.2) : isPurified ? Math.floor(p.secondMoveCost * 0.8) : p.secondMoveCost;
      }

      powerUpDust += cost.stardust;
      secondMoveDust += moveDust;
      totalCandy += cost.candy;
      totalXlCandy += cost.xlCandy;

      return {
        ...p,
        dustCost: cost.stardust + moveDust,
        candyCost: cost.candy,
        xlCandyCost: cost.xlCandy
      };
    });

    const grandTotalDust = powerUpDust + secondMoveDust;

    // Farming calculations
    const dustPerCatch = baseCatchDust * (starPieceActive ? 1.5 : 1.0);
    const catchesNeeded = Math.ceil(grandTotalDust / dustPerCatch);

    return {
      perPokemonBreakdown,
      powerUpDust,
      secondMoveDust,
      grandTotalDust,
      totalCandy,
      totalXlCandy,
      catchesNeeded,
      dustPerCatch
    };
  }, [team, starPieceActive, baseCatchDust]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-amber-950/40 border border-purple-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-400 mb-2 font-mono">
              <PokeballIcon className="w-3.5 h-3.5 text-rose-400" />
              Team Multi-Investment Stardust Planner
            </div>
            <h2 className="text-xl font-bold text-white">Pokémon GO Stardust & Power-Up Budget Planner</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Calculate total stardust and second-move costs across your entire raid team or PvP roster.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Team List & Add */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                Your Power-Up Queue ({team.length} Pokémon)
              </h3>
            </div>

            {/* List */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {totals.perPokemonBreakdown.map(p => (
                <div key={p.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      {p.name}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        p.type === 'lucky' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        p.type === 'shadow' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        p.type === 'purified' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                        {p.type}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Lvl {p.startLevel} → Lvl {p.targetLevel} {p.unlockSecondMove && '• +2nd Charge Move'}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-base font-bold text-purple-400 font-mono">
                        {p.dustCost.toLocaleString()} Dust
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        {p.candyCost} Candy {p.xlCandyCost > 0 && `+ ${p.xlCandyCost} XL`}
                      </div>
                    </div>
                    <button
                      onClick={() => removePokemon(p.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Pokémon Form */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Add Pokémon to Queue</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Pokémon Name (e.g. Rayquaza)"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="px-3.5 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm"
                />
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as any)}
                  className="px-3.5 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm"
                >
                  <option value="normal">Normal (Standard)</option>
                  <option value="lucky">Lucky (50% Stardust off)</option>
                  <option value="shadow">Shadow (+20% Cost)</option>
                  <option value="purified">Purified (10% Discount)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Start Level</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    step="0.5"
                    value={newStartLvl}
                    onChange={e => setNewStartLvl(parseFloat(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Target Level</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    step="0.5"
                    value={newTargetLvl}
                    onChange={e => setNewTargetLvl(parseFloat(e.target.value) || 40)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newSecondMove}
                    onChange={e => setNewSecondMove(e.target.checked)}
                    className="rounded accent-purple-500"
                  />
                  <span>Unlock 2nd Charged Attack</span>
                </label>
                {newSecondMove && (
                  <select
                    value={newSecondMoveCost}
                    onChange={e => setNewSecondMoveCost(parseInt(e.target.value))}
                    className="px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-xs text-white"
                  >
                    <option value={10000}>10,000 Dust (Starters)</option>
                    <option value={50000}>50,000 Dust (Standard)</option>
                    <option value={75000}>75,000 Dust (Rare/PvP)</option>
                    <option value={100000}>100,000 Dust (Legendary)</option>
                  </select>
                )}
              </div>

              <button
                onClick={addPokemon}
                disabled={!newName.trim()}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" /> Add to Stardust Plan
              </button>
            </div>
          </div>
        </div>

        {/* Right: Grand Totals & Catch Grind Planner */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Budget Summary
            </h3>

            {/* Total stardust highlight */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-purple-950/60 to-zinc-950 border border-purple-500/40 text-center">
              <div className="text-xs uppercase tracking-wider text-purple-300 font-semibold">Total Stardust Required</div>
              <div className="text-4xl font-black text-amber-400 font-mono my-2">
                {totals.grandTotalDust.toLocaleString()}
              </div>
              <div className="text-xs text-zinc-400">
                Power-ups: {totals.powerUpDust.toLocaleString()} • 2nd Moves: {totals.secondMoveDust.toLocaleString()}
              </div>
            </div>

            {/* Total Candy */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400">Regular Candies</div>
                <div className="text-xl font-bold text-white font-mono mt-1">{totals.totalCandy}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400">Candy XL</div>
                <div className="text-xl font-bold text-purple-400 font-mono mt-1">{totals.totalXlCandy}</div>
              </div>
            </div>

            {/* Farming Calculator */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Stardust Grind Estimator</h4>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-300">Star Piece Active (+50% Dust)</div>
                <button
                  onClick={() => setStarPieceActive(!starPieceActive)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    starPieceActive ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {starPieceActive ? 'ACTIVE (1.5x)' : 'OFF (1.0x)'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Dust per Wild Catch:</span>
                  <span className="font-mono text-white font-bold">{totals.dustPerCatch} Stardust</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-200 pt-2 border-t border-zinc-800/80">
                  <span className="font-semibold">Wild Pokémon Catches Required:</span>
                  <span className="font-mono font-black text-amber-400">~{totals.catchesNeeded.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
