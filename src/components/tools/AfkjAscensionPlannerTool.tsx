/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sparkles, Shield, Layers, Coins, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

const FACTIONS = ['Lightbearer', 'Mauler', 'Wilder', 'Graveborn', 'Celestial/Hypogean'] as const;

interface TierReq {
  tierName: string;
  sLevelCopiesNeeded: number; // total copies cumulative
  aLevelCopiesNeeded: number;
  acornsNeeded: number;
}

const ASCENSION_TIERS: TierReq[] = [
  { tierName: 'Elite', sLevelCopiesNeeded: 1, aLevelCopiesNeeded: 1, acornsNeeded: 0 },
  { tierName: 'Elite+', sLevelCopiesNeeded: 2, aLevelCopiesNeeded: 2, acornsNeeded: 0 },
  { tierName: 'Epic', sLevelCopiesNeeded: 2, aLevelCopiesNeeded: 4, acornsNeeded: 20 },
  { tierName: 'Epic+', sLevelCopiesNeeded: 3, aLevelCopiesNeeded: 8, acornsNeeded: 20 },
  { tierName: 'Legendary', sLevelCopiesNeeded: 4, aLevelCopiesNeeded: 16, acornsNeeded: 50 },
  { tierName: 'Legendary+', sLevelCopiesNeeded: 4, aLevelCopiesNeeded: 20, acornsNeeded: 100 },
  { tierName: 'Mythic', sLevelCopiesNeeded: 5, aLevelCopiesNeeded: 32, acornsNeeded: 150 },
  { tierName: 'Mythic+', sLevelCopiesNeeded: 6, aLevelCopiesNeeded: 44, acornsNeeded: 200 },
  { tierName: 'Supreme', sLevelCopiesNeeded: 7, aLevelCopiesNeeded: 56, acornsNeeded: 270 },
  { tierName: 'Supreme+', sLevelCopiesNeeded: 8, aLevelCopiesNeeded: 64, acornsNeeded: 350 },
  { tierName: 'Paragon 1', sLevelCopiesNeeded: 14, aLevelCopiesNeeded: 114, acornsNeeded: 550 }
];

export default function AfkjAscensionPlannerTool() {
  const [heroRarity, setHeroRarity] = useState<'S-Level' | 'A-Level'>('S-Level');
  const [selectedFaction, setSelectedFaction] = useState<string>('Wilder');

  const [currentTierIndex, setCurrentTierIndex] = useState<number>(2); // Epic
  const [targetTierIndex, setTargetTierIndex] = useState<number>(9); // Supreme+

  const currentTier = ASCENSION_TIERS[currentTierIndex] || ASCENSION_TIERS[0];
  const targetTier = ASCENSION_TIERS[targetTierIndex] || ASCENSION_TIERS[9];

  const calcResults = useMemo(() => {
    const isSLevel = heroRarity === 'S-Level';

    const currentCopies = isSLevel ? currentTier.sLevelCopiesNeeded : currentTier.aLevelCopiesNeeded;
    const targetCopies = isSLevel ? targetTier.sLevelCopiesNeeded : targetTier.aLevelCopiesNeeded;

    const remainingCopies = Math.max(0, targetCopies - currentCopies);
    const remainingAcorns = Math.max(0, targetTier.acornsNeeded - currentTier.acornsNeeded);

    const isCelHypo = selectedFaction === 'Celestial/Hypogean';

    return {
      remainingCopies,
      remainingAcorns,
      acornTypeLabel: isCelHypo ? 'Omniacorns' : `${selectedFaction} Acorns`,
      unlocksExclusiveWeapon: targetTierIndex >= 7, // Mythic+ unlocks EX Weapon
      unlocksParagon: targetTierIndex >= 10
    };
  }, [heroRarity, selectedFaction, currentTier, targetTier, targetTierIndex]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-zinc-900 border border-purple-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500/80">
                HERO SOUL SIGILS & ACORNS ENGINE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <Sparkles className="w-6 h-6 text-purple-400" />
              AFK Journey Hero Ascension & Acorn Calculator
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Calculate exact hero duplicate copies, soul sigils, and faction acorns required to reach Mythic+, Supreme+, and Paragon tiers.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-right">
            <div>
              <div className="text-xs text-zinc-400">Duplicate Copies Needed</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {calcResults.remainingCopies} Copies
              </div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <div className="text-xs text-zinc-400">Acorns Needed</div>
              <div className="text-2xl font-black text-purple-300 font-mono">
                {calcResults.remainingAcorns} Pcs
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Hero Rarity & Faction */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            1. Hero Rarity & Faction
          </h3>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Hero Base Rarity:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setHeroRarity('S-Level')}
                className={`py-2 rounded-lg border text-xs font-bold transition-colors ${
                  heroRarity === 'S-Level'
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
                }`}
              >
                S-Level (Yellow)
              </button>
              <button
                onClick={() => setHeroRarity('A-Level')}
                className={`py-2 rounded-lg border text-xs font-bold transition-colors ${
                  heroRarity === 'A-Level'
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
                }`}
              >
                A-Level (Purple)
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Hero Faction:</label>
            <select
              value={selectedFaction}
              onChange={e => setSelectedFaction(e.target.value)}
              className="w-full bg-zinc-950 text-xs text-amber-300 font-semibold border border-zinc-800 rounded px-2.5 py-2 focus:border-purple-500 outline-none"
            >
              {FACTIONS.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Card 2: Current & Target Ascension */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            2. Current → Target Tier
          </h3>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Current Ascension Tier:</label>
            <select
              value={currentTierIndex}
              onChange={e => setCurrentTierIndex(parseInt(e.target.value))}
              className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-2 focus:border-purple-500 outline-none"
            >
              {ASCENSION_TIERS.map((t, idx) => (
                <option key={idx} value={idx}>{t.tierName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Target Ascension Tier:</label>
            <select
              value={targetTierIndex}
              onChange={e => setTargetTierIndex(parseInt(e.target.value))}
              className="w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded px-2.5 py-2 focus:border-purple-500 outline-none"
            >
              {ASCENSION_TIERS.map((t, idx) => (
                <option key={idx} value={idx}>{t.tierName}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Card 3: Milestone Unlocks */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-400" />
              Target Tier Milestone Unlocks
            </h3>

            <div className="space-y-2 text-xs">
              <div className={`p-3 border flex items-center justify-between ${
                calcResults.unlocksExclusiveWeapon
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-500'
              }`}>
                <span>Exclusive Weapon (+1 to +25)</span>
                <span className="font-bold">{calcResults.unlocksExclusiveWeapon ? 'UNLOCKED (Mythic+)' : 'Locked'}</span>
              </div>

              <div className={`p-3 border flex items-center justify-between ${
                targetTierIndex >= 9
                  ? 'bg-amber-950/20 border-amber-500/40 text-amber-300'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-500'
              }`}>
                <span>Supreme+ Skill Passive (+10 Level)</span>
                <span className="font-bold">{targetTierIndex >= 9 ? 'UNLOCKED' : 'Locked'}</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 bg-zinc-950/60 p-2.5 rounded border border-zinc-800">
            Acorns can be purchased from Dream Realm Shop, Legend Trial towers, or pulled from All-Hero summons.
          </div>
        </div>
      </div>
    </div>
  );
}
