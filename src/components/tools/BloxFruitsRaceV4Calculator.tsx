/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Sparkles, CheckCircle2, Circle, Clock, Shield, Layers, Flame
} from 'lucide-react';

export interface RaceV4Step {
  step: number;
  trialPhase: 1 | 2 | 3 | 4;
  label: string;
  fragments: number;
  activations: number;
}

export const RACE_V4_RACES = [
  'Human',
  'Rabbit',
  'Shark',
  'Angel',
  'Ghoul',
  'Cyborg',
  'Draco'
] as const;

export const RACE_V4_LADDER: RaceV4Step[] = [
  { step: 1, trialPhase: 1, label: 'After Trial 1 (Tier 1)', fragments: 1000, activations: 3 },
  { step: 2, trialPhase: 2, label: 'After Trial 2 (Tier 2)', fragments: 1500, activations: 5 },
  { step: 3, trialPhase: 3, label: 'Trial 3 – Level 1', fragments: 2000, activations: 4 },
  { step: 4, trialPhase: 3, label: 'Trial 3 – Level 2', fragments: 2250, activations: 5 },
  { step: 5, trialPhase: 3, label: 'Trial 3 – Level 3', fragments: 2500, activations: 10 },
  { step: 6, trialPhase: 4, label: 'Trial 4 – Level 1', fragments: 3000, activations: 8 },
  { step: 7, trialPhase: 4, label: 'Trial 4 – Level 2', fragments: 3250, activations: 9 },
  { step: 8, trialPhase: 4, label: 'Trial 4 – Level 3', fragments: 3500, activations: 10 },
  { step: 9, trialPhase: 4, label: 'Trial 4 – Level 4', fragments: 3750, activations: 11 },
  { step: 10, trialPhase: 4, label: 'Trial 4 – Level 5', fragments: 4000, activations: 12 }
];

export const RACE_V4_TOTAL_FRAGMENTS_PER_RACE = 26750;
export const RACE_V4_ALL_7_RACES_FRAGMENTS = 187250;
export const RACE_V4_TOTAL_ACTIVATIONS = 77;

export function calculateRaceV4Progress(purchasesDone: number) {
  const clamped = Math.max(0, Math.min(RACE_V4_LADDER.length, Math.floor(purchasesDone)));
  let fragmentsSpent = 0;
  let activationsCompleted = 0;

  for (let i = 0; i < clamped; i++) {
    fragmentsSpent += RACE_V4_LADDER[i].fragments;
    activationsCompleted += RACE_V4_LADDER[i].activations;
  }

  return {
    purchasesDone: clamped,
    purchasesRemaining: RACE_V4_LADDER.length - clamped,
    fragmentsSpent,
    fragmentsRemaining: RACE_V4_TOTAL_FRAGMENTS_PER_RACE - fragmentsSpent,
    activationsCompleted,
    activationsRemaining: RACE_V4_TOTAL_ACTIVATIONS - activationsCompleted
  };
}

export default function BloxFruitsRaceV4Calculator() {
  const [selectedRace, setSelectedRace] = useState<string>('Human');
  const [purchasesDone, setPurchasesDone] = useState<number>(2);

  const progress = useMemo(() => calculateRaceV4Progress(purchasesDone), [purchasesDone]);

  const milestones = [
    { label: '0 Done (Start)', purchases: 0 },
    { label: 'After Trial 1 (1/10)', purchases: 1 },
    { label: 'After Trial 2 (2/10)', purchases: 2 },
    { label: 'After Trial 3 (5/10)', purchases: 5 },
    { label: 'Max V4 Done (10/10)', purchases: 10 }
  ];

  const trialSubtotals = [
    { phase: 1, title: 'After Trial 1', detail: '1 purchase · 1,000 fragments · 3 activations' },
    { phase: 2, title: 'After Trial 2', detail: '1 purchase · 1,500 fragments · 5 activations' },
    { phase: 3, title: 'Trial 3 Phase', detail: '3 purchases (2,000 / 2,250 / 2,500 = 6,750) · 4/5/10 activations' },
    { phase: 4, title: 'Trial 4 Phase', detail: '5 purchases (3,000–4,000 = 17,500) · 8/9/10/11/12 activations' }
  ] as const;

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Race Picker */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Select Race (All 7 Races Share Identical 26,750 Fragment Ladder)
            </label>
            <span className="text-[11px] font-mono text-zinc-400">
              All 7 races combined = 187,250 fragments
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {RACE_V4_RACES.map((race) => (
              <button
                key={race}
                type="button"
                onClick={() => setSelectedRace(race)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedRace === race
                    ? 'bg-purple-500/20 border-purple-500/70 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {race}
              </button>
            ))}
          </div>
        </div>

        {/* Trial Milestones & Slider */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="v4-purchases-slider" className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Ancient One Training Purchases Done: <span className="font-mono text-white text-base">{progress.purchasesDone} / 10</span>
            </label>
            <span className="text-xs font-mono text-zinc-400">
              {selectedRace} Race V4 Awakening
            </span>
          </div>

          <input
            id="v4-purchases-slider"
            type="range"
            min={0}
            max={10}
            value={progress.purchasesDone}
            onChange={(e) => setPurchasesDone(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />

          <div className="flex flex-wrap gap-2">
            {milestones.map((m) => (
              <button
                key={m.label}
                type="button"
                onClick={() => setPurchasesDone(m.purchases)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-colors cursor-pointer ${
                  progress.purchasesDone === m.purchases
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Output Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">
              Fragments Spent
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 my-1 block">
              {progress.fragmentsSpent.toLocaleString()}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              {progress.purchasesDone} of 10 purchases completed
            </span>
          </div>

          <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-purple-300 block">
              Fragments Still Needed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300 my-1 block">
              {progress.fragmentsRemaining.toLocaleString()}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Out of {RACE_V4_TOTAL_FRAGMENTS_PER_RACE.toLocaleString()} total per race
            </span>
          </div>

          <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">
              V4 Activations Still Needed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 my-1 block">
              {progress.activationsRemaining}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              {progress.activationsCompleted} / {RACE_V4_TOTAL_ACTIVATIONS} activations done
            </span>
          </div>
        </div>

        {/* Full 10-Purchase Ancient One Ladder */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" />
            Ancient One Training Ladder (Click Any Step to Set Progress)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {trialSubtotals.map((group) => {
              const groupSteps = RACE_V4_LADDER.filter((s) => s.trialPhase === group.phase);
              return (
                <div key={group.phase} className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
                  <div className="border-b border-zinc-800 pb-2">
                    <span className="text-xs font-extrabold text-white block">{group.title}</span>
                    <span className="text-[11px] font-mono text-zinc-400">{group.detail}</span>
                  </div>
                  <div className="space-y-1.5">
                    {groupSteps.map((item) => {
                      const isDone = item.step <= progress.purchasesDone;
                      return (
                        <button
                          key={item.step}
                          type="button"
                          onClick={() =>
                            setPurchasesDone(
                              item.step === progress.purchasesDone ? item.step - 1 : item.step
                            )
                          }
                          className={`w-full px-3 py-2 rounded-lg border flex items-center justify-between text-xs transition-all cursor-pointer ${
                            isDone
                              ? 'bg-emerald-950/35 border-emerald-500/40 text-emerald-200'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          <span className="flex items-center gap-2 font-semibold">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-zinc-500 shrink-0" />
                            )}
                            #{item.step}. {item.label}
                          </span>
                          <span className="font-mono text-[11px]">
                            <strong className="text-purple-300">{item.fragments.toLocaleString()} f</strong> · {item.activations} act.
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gear & Multi-Race Facts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">5 Gears &amp; Ancient Clock Unlock</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Race V4 has <strong>5 gears</strong>. Completing <strong>4 successful trials</strong> completes the awakening at the Ancient One in the Temple of Time; a <strong>5th trial</strong> unlocks the <strong>Ancient Clock</strong> for gear switching.
              </p>
            </div>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <Layers className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">Single Race vs All 7 Races Total</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Each race requires <strong>26,750 fragments</strong> (10 purchases) and <strong>77 V4 activations</strong>. Maxing all 7 races (Human, Rabbit, Shark, Angel, Ghoul, Cyborg, Draco) totals <strong>187,250 fragments</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
