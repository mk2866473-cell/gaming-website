/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  CheckCircle2, Circle, Swords, Coins, Sparkles, Key, RotateCcw
} from 'lucide-react';

export type FightingStyleId =
  | 'combat'
  | 'dark-step'
  | 'electric'
  | 'water-kung-fu'
  | 'dragon-breath'
  | 'superhuman'
  | 'death-step'
  | 'sharkman-karate'
  | 'electric-claw'
  | 'dragon-talon'
  | 'godhuman';

export interface FightingStyleItem {
  id: FightingStyleId;
  name: string;
  tier: 'Starter' | 'First / Second Sea (V1)' | 'Second / Third Sea (V2)' | 'Final (V3)';
  beli: number;
  fragments: number;
  prerequisiteIds: FightingStyleId[];
  requirements: string;
}

export const FIGHTING_STYLES: FightingStyleItem[] = [
  {
    id: 'combat',
    name: 'Combat',
    tier: 'Starter',
    beli: 0,
    fragments: 0,
    prerequisiteIds: [],
    requirements: 'Free starter fighting style (not required for Godhuman)'
  },
  {
    id: 'dark-step',
    name: 'Dark Step',
    tier: 'First / Second Sea (V1)',
    beli: 150000,
    fragments: 0,
    prerequisiteIds: [],
    requirements: 'No mastery prerequisites ($150,000 Beli)'
  },
  {
    id: 'electric',
    name: 'Electric',
    tier: 'First / Second Sea (V1)',
    beli: 500000,
    fragments: 0,
    prerequisiteIds: [],
    requirements: 'No mastery prerequisites ($500,000 Beli)'
  },
  {
    id: 'water-kung-fu',
    name: 'Water Kung Fu',
    tier: 'First / Second Sea (V1)',
    beli: 750000,
    fragments: 0,
    prerequisiteIds: [],
    requirements: 'No mastery prerequisites ($750,000 Beli)'
  },
  {
    id: 'dragon-breath',
    name: 'Dragon Breath',
    tier: 'First / Second Sea (V1)',
    beli: 0,
    fragments: 1500,
    prerequisiteIds: [],
    requirements: '1,500 fragments (no Beli)'
  },
  {
    id: 'superhuman',
    name: 'Superhuman',
    tier: 'Second / Third Sea (V2)',
    beli: 3000000,
    fragments: 0,
    prerequisiteIds: ['dark-step', 'electric', 'water-kung-fu', 'dragon-breath'],
    requirements: '300+ mastery on Dark Step, Electric, Water Kung Fu, and Dragon Breath'
  },
  {
    id: 'death-step',
    name: 'Death Step',
    tier: 'Second / Third Sea (V2)',
    beli: 2500000,
    fragments: 5000,
    prerequisiteIds: ['dark-step'],
    requirements: '400 mastery on Dark Step + Library Key'
  },
  {
    id: 'sharkman-karate',
    name: 'Sharkman Karate',
    tier: 'Second / Third Sea (V2)',
    beli: 2500000,
    fragments: 5000,
    prerequisiteIds: ['water-kung-fu'],
    requirements: '400+ mastery on Water Kung Fu + Water Key'
  },
  {
    id: 'electric-claw',
    name: 'Electric Claw',
    tier: 'Second / Third Sea (V2)',
    beli: 3000000,
    fragments: 5000,
    prerequisiteIds: ['electric'],
    requirements: '400 mastery on Electric + Previous Hero quest'
  },
  {
    id: 'dragon-talon',
    name: 'Dragon Talon',
    tier: 'Second / Third Sea (V2)',
    beli: 3000000,
    fragments: 5000,
    prerequisiteIds: ['dragon-breath'],
    requirements: '400 mastery on Dragon Breath + Fire Essence'
  },
  {
    id: 'godhuman',
    name: 'Godhuman',
    tier: 'Final (V3)',
    beli: 5000000,
    fragments: 5000,
    prerequisiteIds: [
      'dark-step',
      'electric',
      'water-kung-fu',
      'dragon-breath',
      'superhuman',
      'death-step',
      'sharkman-karate',
      'electric-claw',
      'dragon-talon'
    ],
    requirements:
      '400 mastery on NINE styles (every style except Combat, Advanced Combat, and Sanguine Art) + 20 Fish Tail, 20 Magma Ore, 10 Mystic Droplet, 10 Dragon Scale'
  }
];

export const FULL_CHAIN_BELI_TOTAL = 20400000;
export const FULL_CHAIN_FRAGMENTS_TOTAL = 26500;

export function getChainForTarget(targetId: FightingStyleId): FightingStyleItem[] {
  const byId = new Map(FIGHTING_STYLES.map((s) => [s.id, s]));
  const neededIds = new Set<FightingStyleId>();

  const collect = (id: FightingStyleId) => {
    if (neededIds.has(id)) return;
    const style = byId.get(id);
    if (!style) return;
    style.prerequisiteIds.forEach(collect);
    neededIds.add(id);
  };

  collect(targetId);
  return FIGHTING_STYLES.filter((s) => neededIds.has(s.id));
}

export function calculateFightingStyleCost(
  ownedIds: FightingStyleId[],
  targetId: FightingStyleId
) {
  const ownedSet = new Set<FightingStyleId>(ownedIds);
  const chain = getChainForTarget(targetId);
  const remainingStyles = chain.filter((s) => !ownedSet.has(s.id));

  const beliNeeded = remainingStyles.reduce((sum, s) => sum + s.beli, 0);
  const fragmentsNeeded = remainingStyles.reduce((sum, s) => sum + s.fragments, 0);
  const chainTotalBeli = chain.reduce((sum, s) => sum + s.beli, 0);
  const chainTotalFragments = chain.reduce((sum, s) => sum + s.fragments, 0);

  return {
    targetId,
    chain,
    remainingStyles,
    beliNeeded,
    fragmentsNeeded,
    chainTotalBeli,
    chainTotalFragments
  };
}

export default function BloxFruitsFightingStyleCalculator() {
  const [targetId, setTargetId] = useState<FightingStyleId>('godhuman');
  const [ownedIds, setOwnedIds] = useState<FightingStyleId[]>([]);

  const result = useMemo(
    () => calculateFightingStyleCost(ownedIds, targetId),
    [ownedIds, targetId]
  );

  const toggleOwned = (id: FightingStyleId) => {
    setOwnedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const applyPreset = (preset: 'none' | 'v1' | 'v1-superhuman') => {
    if (preset === 'none') {
      setOwnedIds([]);
    } else if (preset === 'v1') {
      setOwnedIds(['dark-step', 'electric', 'water-kung-fu', 'dragon-breath']);
    } else {
      setOwnedIds(['dark-step', 'electric', 'water-kung-fu', 'dragon-breath', 'superhuman']);
    }
  };

  const targetOptions = FIGHTING_STYLES.filter((s) => s.id !== 'combat');
  const ownedSet = new Set<FightingStyleId>(ownedIds);
  const chainIdSet = new Set<FightingStyleId>(result.chain.map((s) => s.id));

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Prominent Full Chain Banner */}
        <div className="bg-zinc-950 border border-amber-500/40 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
              Full Chain Total (Everything Including Godhuman)
            </span>
            <p className="text-xs text-zinc-400">
              Total currency needed from scratch across all prerequisite styles up to Godhuman.
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <span className="text-lg sm:text-xl font-extrabold font-mono tabular-nums text-white block">
              ${FULL_CHAIN_BELI_TOTAL.toLocaleString()} Beli + {FULL_CHAIN_FRAGMENTS_TOTAL.toLocaleString()} Fragments
            </span>
          </div>
        </div>

        {/* Target Fighting Style Selector */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <Swords className="w-4 h-4" />
              Select Target Fighting Style
            </label>
            <span className="text-[11px] font-mono text-zinc-400">
              {result.chain.length} {result.chain.length === 1 ? 'style' : 'styles'} in unlock chain
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {targetOptions.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setTargetId(style.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  targetId === style.id
                    ? 'bg-rose-500/20 border-rose-500/70 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {/* Output Totals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">
              Beli Still Needed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-400 my-1 block">
              ${result.beliNeeded.toLocaleString()}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Target chain total: ${result.chainTotalBeli.toLocaleString()}
            </span>
          </div>

          <div className="bg-zinc-950 border border-purple-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-purple-300 block">
              Fragments Still Needed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-purple-300 my-1 block">
              {result.fragmentsNeeded.toLocaleString()}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Target chain total: {result.chainTotalFragments.toLocaleString()}
            </span>
          </div>

          <div className="bg-zinc-950 border border-cyan-500/40 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">
              Styles Left to Buy
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-cyan-400 my-1 block">
              {result.remainingStyles.length} / {result.chain.length}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              For {FIGHTING_STYLES.find((s) => s.id === targetId)?.name}
            </span>
          </div>
        </div>

        {/* Already Owned Checklist */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-emerald-400" />
              Tick Fighting Styles You Already Own
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => applyPreset('none')}
                className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:bg-zinc-800 cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                None Owned
              </button>
              <button
                type="button"
                onClick={() => applyPreset('v1')}
                className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:bg-zinc-800 cursor-pointer"
              >
                All V1 Owned
              </button>
              <button
                type="button"
                onClick={() => applyPreset('v1-superhuman')}
                className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:bg-zinc-800 cursor-pointer"
              >
                V1 + Superhuman
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {FIGHTING_STYLES.map((style) => {
              const isOwned = ownedSet.has(style.id);
              const inTargetChain = chainIdSet.has(style.id);

              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => toggleOwned(style.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isOwned
                      ? 'bg-emerald-950/35 border-emerald-500/45 text-emerald-100'
                      : inTargetChain
                      ? 'bg-zinc-950 border-zinc-700 text-zinc-100 hover:border-zinc-500'
                      : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    {isOwned ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{style.name}</span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {inTargetChain ? '· In target chain' : `· ${style.tier}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">{style.requirements}</p>
                    </div>
                  </div>

                  <div className="text-right font-mono tabular-nums text-[11px] shrink-0">
                    {style.beli === 0 && style.fragments === 0 ? (
                      <span className="text-emerald-400 font-bold">Free</span>
                    ) : (
                      <>
                        {style.beli > 0 && (
                          <span className="text-emerald-400 font-bold block">
                            ${style.beli.toLocaleString()}
                          </span>
                        )}
                        {style.fragments > 0 && (
                          <span className="text-purple-300 font-bold block">
                            {style.fragments.toLocaleString()} f
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Godhuman Materials & Unlock Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">Godhuman Mastery &amp; Material Requirements</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Requires <strong>400 mastery on NINE styles</strong> (every style except Combat, Advanced Combat, and Sanguine Art) plus <strong>20 Fish Tail, 20 Magma Ore, 10 Mystic Droplet, and 10 Dragon Scale</strong>.
              </p>
            </div>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-start gap-2.5">
            <Key className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">V2 Keys, Quests &amp; Essence</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Death Step requires the <strong>Library Key</strong> (400 Dark Step); Sharkman Karate requires the <strong>Water Key</strong> (400+ Water Kung Fu); Electric Claw requires the <strong>Previous Hero quest</strong> (400 Electric); Dragon Talon requires <strong>Fire Essence</strong> (400 Dragon Breath).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
