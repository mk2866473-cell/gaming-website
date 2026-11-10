/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Cpu, Sparkles, Award, Shield, Check, BookOpen, Compass, Plus, Trash2
} from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  tierLevel: number;
  cost: number;
  isAncient: boolean;
}

const TECH_TREE: TechItem[] = [
  // Normal Tech Tree
  { id: 'pal-sphere', name: 'Pal Sphere', tierLevel: 2, cost: 1, isAncient: false },
  { id: 'cloth-armor', name: 'Cloth Armor', tierLevel: 4, cost: 2, isAncient: false },
  { id: 'mega-sphere', name: 'Mega Sphere', tierLevel: 14, cost: 2, isAncient: false },
  { id: 'cross-bow', name: 'Crossbow', tierLevel: 13, cost: 2, isAncient: false },
  { id: 'breeding-farm', name: 'Breeding Farm', tierLevel: 19, cost: 3, isAncient: false },
  { id: 'giga-sphere', name: 'Giga Sphere', tierLevel: 20, cost: 3, isAncient: false },
  { id: 'handgun', name: 'Handgun', tierLevel: 29, cost: 3, isAncient: false },
  { id: 'hyper-sphere', name: 'Hyper Sphere', tierLevel: 27, cost: 3, isAncient: false },
  { id: 'ultra-sphere', name: 'Ultra Sphere', tierLevel: 35, cost: 4, isAncient: false },
  { id: 'assault-rifle', name: 'Assault Rifle', tierLevel: 45, cost: 4, isAncient: false },
  { id: 'legendary-sphere', name: 'Legendary Sphere', tierLevel: 44, cost: 5, isAncient: false },
  { id: 'rocket-launcher', name: 'Rocket Launcher', tierLevel: 49, cost: 5, isAncient: false },
  { id: 'pal-metal-armor', name: 'Pal Metal Armor', tierLevel: 46, cost: 4, isAncient: false },
  
  // Ancient Tech Tree (Purple)
  { id: 'incubator', name: 'Egg Incubator', tierLevel: 7, cost: 1, isAncient: true },
  { id: 'small-feed-bag', name: 'Small Feed Bag', tierLevel: 10, cost: 1, isAncient: true },
  { id: 'grappling-gun', name: 'Grappling Gun', tierLevel: 12, cost: 1, isAncient: true },
  { id: 'pal-essence-condenser', name: 'Pal Essence Condenser', tierLevel: 14, cost: 2, isAncient: true },
  { id: 'spear-anchor', name: 'Mega Grappling Gun', tierLevel: 17, cost: 2, isAncient: true },
  { id: 'homing-sphere-launcher', name: 'Homing Sphere Launcher', tierLevel: 50, cost: 5, isAncient: true }
];

export default function PalworldTechPointCalculator() {
  const [playerLevel, setPlayerLevel] = useState<number>(50); // 1 to 55
  const [fastTravelStatuesUnlocked, setFastTravelStatuesUnlocked] = useState<number>(55); // ~60 on map
  const [alphaBossesDefeated, setAlphaBossesDefeated] = useState<number>(38); // 1 ATP for first-time clear
  const [dungeonBossesDefeated, setDungeonBossesDefeated] = useState<number>(15);
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([
    'incubator', 'pal-essence-condenser', 'breeding-farm', 'mega-sphere', 'giga-sphere', 'hyper-sphere', 'ultra-sphere', 'legendary-sphere'
  ]);

  const toggleTech = (id: string) => {
    if (selectedTechIds.includes(id)) {
      setSelectedTechIds(selectedTechIds.filter(t => t !== id));
    } else {
      setSelectedTechIds([...selectedTechIds, id]);
    }
  };

  const totals = useMemo(() => {
    // Normal Tech Points:
    // Level 1-50: ~3-5 points per level (~180 points)
    // Fast Travel Statues: +1 point each
    const normalFromLevel = Math.floor(playerLevel * 3.6);
    const normalFromFastTravel = fastTravelStatuesUnlocked;
    const totalNormalPointsAvailable = normalFromLevel + normalFromFastTravel;

    // Ancient Tech Points:
    // +1 for each first-time Alpha Boss clear
    // +1 for each first-time Dungeon Boss clear
    // Syndicate Tower Bosses: +5 each (5 towers = 25 ATP)
    const towerPoints = 25;
    const totalAncientPointsAvailable = alphaBossesDefeated + dungeonBossesDefeated + towerPoints;

    // Spent points
    let normalSpent = 0;
    let ancientSpent = 0;

    selectedTechIds.forEach(id => {
      const item = TECH_TREE.find(t => t.id === id);
      if (item) {
        if (item.isAncient) ancientSpent += item.cost;
        else normalSpent += item.cost;
      }
    });

    const normalRemaining = totalNormalPointsAvailable - normalSpent;
    const ancientRemaining = totalAncientPointsAvailable - ancientSpent;

    return {
      totalNormalPointsAvailable,
      totalAncientPointsAvailable,
      normalSpent,
      ancientSpent,
      normalRemaining,
      ancientRemaining
    };
  }, [playerLevel, fastTravelStatuesUnlocked, alphaBossesDefeated, dungeonBossesDefeated, selectedTechIds]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-indigo-950/40 border border-purple-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-400 mb-2">
              <Cpu className="w-3.5 h-3.5" />
              Technology & Ancient Tech Points Planner
            </div>
            <h2 className="text-xl font-bold text-white">Palworld Technology & Ancient Tech Point Calculator</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Calculate total regular Technology Points and Ancient Tech Points from Alpha Bosses, Fast Travel Statues, and Dungeons.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-purple-400" />
              1. Player Progression & Discovery
            </h3>

            {/* Level slider */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">Player Character Level</span>
                <span className="font-mono text-purple-400 font-bold">Lvl {playerLevel}</span>
              </div>
              <input
                type="range"
                min="1"
                max="55"
                value={playerLevel}
                onChange={e => setPlayerLevel(parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            {/* Fast travel statues */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">Great Eagle Fast Travel Statues Unlocked (+1 Tech Point each)</span>
                <span className="font-mono text-blue-400 font-bold">{fastTravelStatuesUnlocked} Statues</span>
              </div>
              <input
                type="range"
                min="0"
                max="65"
                value={fastTravelStatuesUnlocked}
                onChange={e => setFastTravelStatuesUnlocked(parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Alpha Bosses */}
            <div className="pt-2 border-t border-zinc-800">
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">First-Time Alpha Field Bosses Cleared (+1 Ancient Point each)</span>
                <span className="font-mono text-amber-400 font-bold">{alphaBossesDefeated} Bosses</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                value={alphaBossesDefeated}
                onChange={e => setAlphaBossesDefeated(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Dungeons */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-zinc-300">Sealed Realm / Dungeon Bosses Cleared</span>
                <span className="font-mono text-teal-400 font-bold">{dungeonBossesDefeated} Dungeons</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={dungeonBossesDefeated}
                onChange={e => setDungeonBossesDefeated(parseInt(e.target.value))}
                className="w-full accent-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Right: Tech Tree Selection & Ledger */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Technology Points Ledger
            </h3>

            {/* Balance Cards */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-zinc-400">Regular Tech Points</div>
                <div className="text-2xl font-black text-blue-400 font-mono mt-1">
                  {totals.normalRemaining} <span className="text-xs font-normal text-zinc-500">/ {totals.totalNormalPointsAvailable}</span>
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">{totals.normalSpent} Spent</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs text-purple-300">Ancient Tech Points</div>
                <div className="text-2xl font-black text-purple-400 font-mono mt-1">
                  {totals.ancientRemaining} <span className="text-xs font-normal text-zinc-500">/ {totals.totalAncientPointsAvailable}</span>
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">{totals.ancientSpent} Spent</div>
              </div>
            </div>

            {/* Checklist of Tech Tree Items */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Toggle Desired Blueprints:</span>
              {TECH_TREE.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleTech(item.id)}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    selectedTechIds.includes(item.id)
                      ? item.isAncient
                        ? 'bg-purple-950/40 border-purple-500 text-purple-200 font-bold'
                        : 'bg-blue-950/40 border-blue-500 text-blue-200 font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-zinc-500">Lv.{item.tierLevel}</span>
                    <span>{item.name}</span>
                    {item.isAncient && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-purple-500/20 text-purple-300">
                        Ancient
                      </span>
                    )}
                  </div>
                  <span className="font-mono font-bold">{item.cost} Pts</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
