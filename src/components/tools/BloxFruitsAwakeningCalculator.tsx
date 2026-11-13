/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Sparkles, CheckSquare, Square, Zap, Info, ShieldAlert, Users, Layers
} from 'lucide-react';

export interface AwakeningMove {
  key: 'Z' | 'F' | 'X' | 'C' | 'Tap' | 'V';
  label: string;
  cost: number;
}

export interface AwakeningFruitData {
  id: string;
  name: string;
  patternLabel: string;
  moves: AwakeningMove[];
  totalFragments: number;
  note?: string;
}

const STANDARD_MOVES: AwakeningMove[] = [
  { key: 'Z', label: 'Z Move', cost: 500 },
  { key: 'F', label: 'F Move', cost: 2000 },
  { key: 'X', label: 'X Move', cost: 3000 },
  { key: 'C', label: 'C Move', cost: 4000 },
  { key: 'V', label: 'V Move', cost: 5000 }
];

export const AWAKENING_FRUITS: AwakeningFruitData[] = [
  {
    id: 'flame',
    name: 'Flame',
    patternLabel: 'Standard Pattern (5 moves)',
    moves: STANDARD_MOVES,
    totalFragments: 14500
  },
  {
    id: 'ice',
    name: 'Ice',
    patternLabel: 'Standard Pattern (5 moves)',
    moves: STANDARD_MOVES,
    totalFragments: 14500
  },
  {
    id: 'light',
    name: 'Light',
    patternLabel: 'Standard Pattern (5 moves)',
    moves: STANDARD_MOVES,
    totalFragments: 14500
  },
  {
    id: 'dark',
    name: 'Dark',
    patternLabel: 'Standard Pattern (5 moves)',
    moves: STANDARD_MOVES,
    totalFragments: 14500
  },
  {
    id: 'magma',
    name: 'Magma',
    patternLabel: 'Standard Pattern (5 moves)',
    moves: STANDARD_MOVES,
    totalFragments: 14500
  },
  {
    id: 'buddha',
    name: 'Buddha',
    patternLabel: 'Standard Pattern (5 moves)',
    moves: STANDARD_MOVES,
    totalFragments: 14500
  },
  {
    id: 'sand',
    name: 'Sand',
    patternLabel: 'Standard Pattern (5 moves)',
    moves: STANDARD_MOVES,
    totalFragments: 14500
  },
  {
    id: 'quake',
    name: 'Quake',
    patternLabel: '4 Moves Only',
    moves: [
      { key: 'Z', label: 'Z Move', cost: 1000 },
      { key: 'X', label: 'X Move', cost: 3000 },
      { key: 'C', label: 'C Move', cost: 5000 },
      { key: 'V', label: 'V Move', cost: 8000 }
    ],
    totalFragments: 17000
  },
  {
    id: 'spider',
    name: 'Spider',
    patternLabel: 'Custom Pattern (5 moves)',
    moves: [
      { key: 'Z', label: 'Z Move', cost: 800 },
      { key: 'F', label: 'F Move', cost: 2500 },
      { key: 'X', label: 'X Move', cost: 3500 },
      { key: 'C', label: 'C Move', cost: 4500 },
      { key: 'V', label: 'V Move', cost: 6000 }
    ],
    totalFragments: 17300
  },
  {
    id: 'dough',
    name: 'Dough',
    patternLabel: 'Advanced Raid (6 moves incl. Tap)',
    moves: [
      { key: 'Z', label: 'Z Move', cost: 500 },
      { key: 'F', label: 'F Move', cost: 2000 },
      { key: 'X', label: 'X Move', cost: 3000 },
      { key: 'C', label: 'C Move', cost: 4000 },
      { key: 'Tap', label: 'Tap / M1', cost: 4000 },
      { key: 'V', label: 'V Move', cost: 5000 }
    ],
    totalFragments: 18500,
    note: 'Dough full awakening is 18,500 fragments (some websites wrongly list 23,500 — 18,500 is the verified cost).'
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    patternLabel: 'Advanced Raid (6 moves incl. Tap)',
    moves: [
      { key: 'Z', label: 'Z Move', cost: 500 },
      { key: 'F', label: 'F Move', cost: 2000 },
      { key: 'X', label: 'X Move', cost: 3000 },
      { key: 'C', label: 'C Move', cost: 4000 },
      { key: 'Tap', label: 'Tap / M1', cost: 4000 },
      { key: 'V', label: 'V Move', cost: 5000 }
    ],
    totalFragments: 18500,
    note: 'Hosting a Phoenix raid requires 400+ mastery on Phoenix.'
  }
];

export const ALL_11_RAID_FRUITS_TOTAL = AWAKENING_FRUITS.reduce(
  (sum, fruit) => sum + fruit.totalFragments,
  0
); // 172,800

export default function BloxFruitsAwakeningCalculator() {
  const [selectedFruitId, setSelectedFruitId] = useState<string>('dough');
  const [awakenedMovesByFruit, setAwakenedMovesByFruit] = useState<Record<string, string[]>>({
    dough: []
  });

  const selectedFruit = useMemo(
    () => AWAKENING_FRUITS.find((f) => f.id === selectedFruitId) || AWAKENING_FRUITS[0],
    [selectedFruitId]
  );

  const awakenedKeys = awakenedMovesByFruit[selectedFruit.id] || [];

  const toggleMove = (moveKey: string) => {
    setAwakenedMovesByFruit((prev) => {
      const current = prev[selectedFruit.id] || [];
      const next = current.includes(moveKey)
        ? current.filter((k) => k !== moveKey)
        : [...current, moveKey];
      return { ...prev, [selectedFruit.id]: next };
    });
  };

  const setAllMoves = (awakened: boolean) => {
    setAwakenedMovesByFruit((prev) => ({
      ...prev,
      [selectedFruit.id]: awakened ? selectedFruit.moves.map((m) => m.key) : []
    }));
  };

  const summary = useMemo(() => {
    let spentFragments = 0;
    let remainingFragments = 0;
    let completedCount = 0;

    for (const move of selectedFruit.moves) {
      if (awakenedKeys.includes(move.key)) {
        spentFragments += move.cost;
        completedCount += 1;
      } else {
        remainingFragments += move.cost;
      }
    }

    const totalCost = selectedFruit.totalFragments;
    const progressPct = totalCost > 0 ? (spentFragments / totalCost) * 100 : 0;

    return {
      spentFragments,
      remainingFragments,
      totalCost,
      completedCount,
      totalMoves: selectedFruit.moves.length,
      progressPct
    };
  }, [selectedFruit, awakenedKeys]);

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Fruit Selector */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Select Raid Awakening Fruit (11 Fruits)
            </label>
            <span className="text-[11px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-lg">
              Awakening all 11 raid fruits = {ALL_11_RAID_FRUITS_TOTAL.toLocaleString()} fragments total
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {AWAKENING_FRUITS.map((fruit) => {
              const isSelected = fruit.id === selectedFruit.id;
              return (
                <button
                  key={fruit.id}
                  onClick={() => setSelectedFruitId(fruit.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-500/20 border-purple-500/70 text-white shadow-lg shadow-purple-950/30'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-bold block">{fruit.name}</span>
                  <span className="text-[11px] font-mono text-purple-300 block">
                    {fruit.totalFragments.toLocaleString()} f
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Move Checklist */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                {selectedFruit.name} Awakening Moves
              </h3>
              <span className="text-[11px] text-zinc-400 font-mono">
                {selectedFruit.patternLabel} · Tick the moves already awakened
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setAllMoves(false)}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold cursor-pointer"
              >
                None Awakened
              </button>
              <button
                type="button"
                onClick={() => setAllMoves(true)}
                className="px-2.5 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 font-semibold cursor-pointer"
              >
                Mark All Awakened
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedFruit.moves.map((move) => {
              const isChecked = awakenedKeys.includes(move.key);
              return (
                <button
                  key={move.key}
                  type="button"
                  onClick={() => toggleMove(move.key)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-zinc-900/90 border-zinc-800 text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-zinc-500 shrink-0" />
                    )}
                    <div>
                      <span className="text-xs font-bold block">{move.label}</span>
                      <span className="text-[10px] text-zinc-400">
                        {isChecked ? 'Already Awakened' : 'Not Awakened'}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-extrabold text-purple-300">
                    {move.cost.toLocaleString()} f
                  </span>
                </button>
              );
            })}
          </div>

          {selectedFruit.note && (
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-[11px] text-amber-200 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{selectedFruit.note}</span>
            </div>
          )}
        </div>

        {/* Fragment Output Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-purple-300 block">
              Fragments Still Needed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
              {summary.remainingFragments.toLocaleString()}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              {summary.totalMoves - summary.completedCount} of {summary.totalMoves} moves remaining
            </span>
          </div>

          <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">
              Total Cost ({selectedFruit.name})
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
              {summary.totalCost.toLocaleString()}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              {summary.spentFragments.toLocaleString()} fragments already unlocked
            </span>
          </div>

          <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">
              Awakening Progress
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
              {summary.progressPct.toFixed(0)}%
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              {summary.completedCount} / {summary.totalMoves} moves awakened
            </span>
          </div>
        </div>

        {/* All 11 Raid Fruits Total Banner */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="flex items-center gap-2 text-zinc-300 font-semibold">
            <Layers className="w-4 h-4 text-purple-400" />
            Awakening all 11 raid fruits costs <strong className="text-white font-mono">172,800 fragments</strong> in total.
          </span>
          <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            Max 4 players per raid
          </span>
        </div>
      </div>

      {/* Separate Info Section: Lightning upgrades (not a raid awakening) */}
      <div className="bg-zinc-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-amber-400 shrink-0" />
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Lightning upgrades (not a raid awakening)
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-2.5 py-1 rounded-lg">
            21,500 Fragments + 500 Mastery
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <strong>Lightning</strong> (formerly Rumble) no longer awakens in raids. Instead, it upgrades via the <strong>Admin Panel</strong> through 4 sequential upgrades requiring fragments, materials, and <strong>500 mastery</strong>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {[
            { step: 'Upgrade 1', cost: '1,500 Fragments' },
            { step: 'Upgrade 2', cost: '3,000 Fragments' },
            { step: 'Upgrade 3', cost: '6,000 Fragments' },
            { step: 'Upgrade 4', cost: '11,000 Fragments' }
          ].map((item) => (
            <div key={item.step} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">{item.step}</span>
              <span className="font-mono font-extrabold text-amber-300 text-sm">{item.cost}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Fragment Cost</span>
            <span className="font-mono font-bold text-white text-sm">21,500 Fragments (1,500 + 3,000 + 6,000 + 11,000)</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Required Materials</span>
            <span className="font-mono font-bold text-white text-sm">Volt Capsule ×4, Electric Wing ×13, Angel Wings ×3</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Mastery Requirement</span>
            <span className="font-mono font-bold text-white text-sm">500 Mastery</span>
          </div>
        </div>

        {/* Raid Entry Reference */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-[11px] text-zinc-300 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block">Raid Microchip Entry Requirements (Max 4 Players per Raid):</span>
            <p className="text-zinc-400">
              • <strong>Basic Microchip:</strong> $100,000 Beli OR any physical fruit.<br />
              • <strong>Advanced Microchip (Phoenix &amp; Dough raids only):</strong> 1,000 fragments OR a physical fruit worth $1,000,000+ Beli (Phoenix raid hosting also requires 400+ mastery on Phoenix).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
