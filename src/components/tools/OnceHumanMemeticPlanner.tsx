/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, RefreshCw, Zap, Coins, Flame, 
  ShieldCheck, AlertCircle, Bookmark, CheckCircle2,
  ChevronDown, ChevronUp, Layers, TrendingUp
} from 'lucide-react';

interface SpecializationPerk {
  id: string;
  name: string;
  level: number;
  tier: 'S-Tier' | 'A-Tier' | 'B-Tier';
  category: 'Economy & Energy Links' | 'Acid & Mining' | 'Combat & Munitions' | 'Base & Crafting';
  description: string;
  synergyTip: string;
}

const SPECIALIZATIONS: SpecializationPerk[] = [
  // Level 5
  { id: 'sulfur-chemist', name: 'Sulfur Chemist', level: 5, tier: 'S-Tier', category: 'Acid & Mining', description: 'Craft 1 Pure Acid using 5 Sulfur + 50 Energy Links at a Chemistry Workbench.', synergyTip: 'Must-have for generating thousands of Acid without a polluted zone.' },
  { id: 'portable-rainwater', name: 'Portable Rainwater Collector', level: 5, tier: 'B-Tier', category: 'Base & Crafting', description: 'Automatically gathers clean rainwater in your backpack over time.', synergyTip: 'Good for early game survival, obsolete by endgame.' },
  { id: 'gathering-knife', name: 'Artisan Gathering Knife', level: 5, tier: 'A-Tier', category: 'Economy & Energy Links', description: 'Skinning animals yields 100% additional Raw Hides and Meat.', synergyTip: 'Great for cooking buff feasts and leather armor crafting.' },
  { id: 'campfire-gourmet', name: 'Campfire Gourmet', level: 5, tier: 'B-Tier', category: 'Base & Crafting', description: 'Food cooked on basic campfires grants +15 Max Sanity.', synergyTip: 'Early sanity maintenance.' },

  // Level 10
  { id: 'solar-drill', name: 'Solar Drill', level: 10, tier: 'S-Tier', category: 'Acid & Mining', description: 'Craft electric mining drills that auto-recharge durability under sunlight. Yields +40% Copper, Iron, and Tungsten.', synergyTip: 'Infinite durability mining drill! Best seller in player vending machines.' },
  { id: 'smelting-yield', name: 'Furnace Smelting Boost', level: 10, tier: 'A-Tier', category: 'Base & Crafting', description: 'Smelting Copper, Steel, and Tungsten ingots yields +50% extra ingots.', synergyTip: 'Drastically cuts metal ore grinding for endgame weapon calibration.' },
  { id: 'charcoal-artisan', name: 'Charcoal Artisan', level: 10, tier: 'B-Tier', category: 'Base & Crafting', description: 'Produce 100% more charcoal from wood logs.', synergyTip: 'Decent early furnace fuel source.' },

  // Level 15
  { id: 'backpack-expansion', name: 'Backpack Expansion', level: 15, tier: 'S-Tier', category: 'Base & Crafting', description: 'Permanently increases maximum carrying weight capacity by +40kg.', synergyTip: 'Essential quality of life for hoarding loot during Blackfell runs.' },
  { id: 'stardust-tea', name: 'Stardust Tea Master', level: 15, tier: 'A-Tier', category: 'Economy & Energy Links', description: 'Brew Stardust Tea that grants complete pollution immunity for 30 minutes.', synergyTip: 'Vital for farming High-Pollution zones without Sanity pill spam.' },
  { id: 'healing-brew', name: 'Healing Brew Potency', level: 15, tier: 'B-Tier', category: 'Combat & Munitions', description: 'Medical drinks restore 50% more Health and shield.', synergyTip: 'Useful for solo bossing.' },

  // Level 20
  { id: 'munitions-maker', name: 'Munitions Artisan', level: 20, tier: 'S-Tier', category: 'Combat & Munitions', description: 'Crafting Steel, AP, and Tungsten ammo produces +50% more rounds per craft.', synergyTip: 'Saves thousands of Gunpowder and Tungsten ingots.' },
  { id: 'biomass-missiles', name: 'Biomass Missiles', level: 20, tier: 'S-Tier', category: 'Combat & Munitions', description: 'Craft specialized Biomass Missiles using Biofuel for Prime War Gatling Turrets.', synergyTip: 'Essential for Prime War Hard / Nightmare boss shield breaking.' },
  { id: 'explosive-trap', name: 'High-Explosive Landmine', level: 20, tier: 'B-Tier', category: 'Combat & Munitions', description: 'Craft proximity mines dealing 1,200 explosive damage to territory invaders.', synergyTip: 'Great for PvP Evolution Call scenarios.' },

  // Level 25
  { id: 'combo-chipset', name: 'Combo Chipset', level: 25, tier: 'S-Tier', category: 'Economy & Energy Links', description: 'Craft Combo Chipsets from electronic waste that sell to NPC vendors for 12,000 Energy Links each.', synergyTip: 'The #1 fastest way to max out weekly NPC 50,000 EL vendor caps!' },
  { id: 'acid-brewery-master', name: 'Acid Brewery Master', level: 25, tier: 'S-Tier', category: 'Acid & Mining', description: 'Brewing Barrels ferment Impure Acid into Pure Acid 30% faster.', synergyTip: 'Core building block of automated passive Acid farms.' },
  { id: 'gold-silver-artisan', name: 'Gold & Silver Ingot Artisan', level: 25, tier: 'A-Tier', category: 'Economy & Energy Links', description: 'Smelt pure Gold and Silver bars to sell to vendors for 6,000 to 10,000 EL.', synergyTip: 'Pairs perfectly with Digby Boy and Solar Drill mining.' },

  // Level 30
  { id: 'solar-generator-boost', name: 'Solar Generator Efficiency', level: 30, tier: 'A-Tier', category: 'Base & Crafting', description: 'All territory Solar Generators produce +10W additional power (30W total).', synergyTip: 'Allows running more Water Pumps without building fragile biofuel generators.' },
  { id: 'parts-scavenger', name: 'Electronic Parts Recovery', level: 30, tier: 'A-Tier', category: 'Base & Crafting', description: 'Dismantling electronics yields +50% Electronic Parts and Metal Scraps.', synergyTip: 'Drastically reduces calibration bottlenecks.' },

  // Level 35
  { id: 'stardust-mining', name: 'Stardust Mining Instinct', level: 35, tier: 'S-Tier', category: 'Acid & Mining', description: 'Mining Silver or Tungsten nodes has a 20% chance to yield Stardust Ore.', synergyTip: 'Farm Stardust Source without spending Controllers on Silos!' },
  { id: 'rare-crystal-refiner', name: 'Rare Crystal Refiner', level: 35, tier: 'A-Tier', category: 'Base & Crafting', description: 'Refine raw crystals into Stardust Source at an Advanced Chemistry Bench.', synergyTip: 'Great alternative Stardust source loop.' },

  // Level 40
  { id: 'tungsten-mastery', name: 'Tungsten Ingot Mastery', level: 40, tier: 'A-Tier', category: 'Base & Crafting', description: 'Smelting Tungsten ingots costs 30% less Tungsten Ore and produces +25% bonus bars.', synergyTip: 'Save immense mining time in Red Sands and Blackfell.' },
  { id: 'advanced-turrets', name: 'Heavy Artillery Defense Turrets', level: 40, tier: 'B-Tier', category: 'Combat & Munitions', description: 'Territory Gatling and Plasma turrets deal +40% damage to Calamity elites.', synergyTip: 'Territory purification defense automation.' },

  // Level 45
  { id: 'he-ap-ammo', name: 'High-Explosive Armor-Piercing Ammo', level: 45, tier: 'S-Tier', category: 'Combat & Munitions', description: 'Craft HE-AP ammo rounds dealing +15% weakspot damage and exploding on hit.', synergyTip: 'Supreme raid boss DPS ammo.' },
  { id: 'buffet-kitchen', name: 'Advanced Kitchen Buffet', level: 45, tier: 'A-Tier', category: 'Base & Crafting', description: 'Allows characters to benefit from two distinct food buffs simultaneously.', synergyTip: 'Stack Crit DMG Food + Weakspot Food together for astronomical DPS.' },

  // Level 50
  { id: 'stardust-generator', name: 'Stardust Resonance Generator', level: 50, tier: 'S-Tier', category: 'Acid & Mining', description: 'Territory facility passively generates 100 Stardust Source every 24 hours.', synergyTip: 'Free daily Stardust Source without running dungeons!' },
  { id: 'staroid-synth', name: 'Staroid Synthesizer', level: 50, tier: 'A-Tier', category: 'Economy & Energy Links', description: 'Synthesize Staroids to summon high-tier Calamity Purification events for Starchrom.', synergyTip: 'Weekly Starchrom purification accelerator.' }
];

const MILESTONES = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

export default function OnceHumanMemeticPlanner() {
  // Selected perk at each level
  const [selectedPerks, setSelectedPerks] = useState<Record<number, string>>({
    5: 'sulfur-chemist',
    10: 'solar-drill',
    15: 'backpack-expansion',
    20: 'munitions-maker',
    25: 'combo-chipset',
    30: 'solar-generator-boost',
    35: 'stardust-mining',
    40: 'tungsten-mastery',
    45: 'he-ap-ammo',
    50: 'stardust-generator'
  });

  const [memoryCleanerTokens, setMemoryCleanerTokens] = useState<number>(5);

  const selectPerkForLevel = (lvl: number, perkId: string) => {
    setSelectedPerks(prev => ({ ...prev, [lvl]: perkId }));
  };

  const useResetToken = (lvl: number) => {
    if (memoryCleanerTokens <= 0) return;
    setMemoryCleanerTokens(prev => prev - 1);
    // pick alternate perk
    const available = SPECIALIZATIONS.filter(p => p.level === lvl && p.id !== selectedPerks[lvl]);
    if (available.length > 0) {
      setSelectedPerks(prev => ({ ...prev, [lvl]: available[0].id }));
    }
  };

  // Evaluation Score
  const scoreReport = useMemo(() => {
    let sTierCount = 0;
    let aTierCount = 0;

    Object.values(selectedPerks).forEach(id => {
      const perk = SPECIALIZATIONS.find(p => p.id === id);
      if (perk?.tier === 'S-Tier') sTierCount++;
      if (perk?.tier === 'A-Tier') aTierCount++;
    });

    const ratingScore = Math.min(100, Math.round((sTierCount * 10) + (aTierCount * 6) + 10));
    const grade = ratingScore >= 90 ? 'S+ God Build' : ratingScore >= 75 ? 'A-Tier Meta Build' : 'B-Tier Balanced';

    return {
      sTierCount,
      aTierCount,
      ratingScore,
      grade
    };
  }, [selectedPerks]);

  return (
    <div className="space-y-8">
      {/* Overview Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Level 5 to 50 Specialization & Re-roll Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Memetic Specialization & Memory Cleaner Planner
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Plan your 10 Memetic Specialization milestones (Lv 5–50). Optimize for Sulfur Chemist, Solar Drills, Combo Chipsets, and manage your 5 seasonal Memory Cleaner re-roll tokens.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 bg-slate-950/80 border border-amber-500/40 rounded-xl p-4">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-2xl font-black text-amber-400">{scoreReport.ratingScore}%</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">{scoreReport.grade}</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-purple-400">{memoryCleanerTokens} / 5</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Memory Cleaners</div>
            </div>
          </div>
        </div>
      </div>

      {/* 10 Milestone Cards */}
      <div className="space-y-4">
        {MILESTONES.map(lvl => {
          const activePerkId = selectedPerks[lvl];
          const activePerk = SPECIALIZATIONS.find(p => p.id === activePerkId);
          const levelPerks = SPECIALIZATIONS.filter(p => p.level === lvl);

          return (
            <div 
              key={lvl}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono font-black flex items-center justify-center shrink-0">
                    {lvl}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">Specialization Milestone</div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{activePerk?.name || 'Select Perk'}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${
                        activePerk?.tier === 'S-Tier' ? 'bg-amber-500 text-slate-950' : 'bg-purple-600 text-white'
                      }`}>
                        {activePerk?.tier}
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => useResetToken(lvl)}
                    disabled={memoryCleanerTokens <= 0}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 hover:border-purple-500/50 text-slate-300 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
                    <span>Memory Cleaner Re-Roll ({memoryCleanerTokens} Left)</span>
                  </button>
                </div>
              </div>

              {/* Perk Selection Radios */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                {levelPerks.map(perk => {
                  const isSelected = activePerkId === perk.id;
                  return (
                    <div
                      key={perk.id}
                      onClick={() => selectPerkForLevel(lvl, perk.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500/60 shadow-md'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="font-bold text-xs text-white flex items-center gap-1.5">
                          <span>{perk.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-black ${
                            perk.tier === 'S-Tier' ? 'bg-amber-500/20 text-amber-300' : 'bg-purple-500/20 text-purple-300'
                          }`}>
                            {perk.tier}
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-amber-400 text-slate-950' : 'border border-slate-700'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        {perk.description}
                      </p>

                      <div className="text-[10px] text-amber-400/90 mt-2 pt-2 border-t border-slate-800/80">
                        💡 {perk.synergyTip}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
