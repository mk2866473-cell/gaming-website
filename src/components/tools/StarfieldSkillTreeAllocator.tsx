/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Shield, Rocket, Cpu, Users, 
  Target, Award, CheckCircle2, RotateCcw, 
  ChevronRight, Lock, BookOpen, Layers
} from 'lucide-react';

export type SkillCategory = 'physical' | 'social' | 'combat' | 'science' | 'tech';

export interface StarfieldSkill {
  id: string;
  name: string;
  category: SkillCategory;
  tier: 1 | 2 | 3 | 4; // 1: Novice, 2: Advanced (4 pts), 3: Expert (8 pts), 4: Master (12 pts)
  description: string;
  ranks: string[];
}

const SKILL_DATABASE: StarfieldSkill[] = [
  // TECH
  {
    id: 'boost_pack',
    name: 'Boost Pack Training',
    category: 'tech',
    tier: 1,
    description: 'Allows utilizing jetpack thrusters for jump maneuvering and combat repositioning.',
    ranks: [
      'Rank 1: You can now utilize boost packs.',
      'Rank 2: Using a boost pack expends less fuel (-20%).',
      'Rank 3: Boost pack fuel regenerates more quickly (+25%).',
      'Rank 4: Doubles previous bonuses, and boosting now directs fire downward.'
    ]
  },
  {
    id: 'piloting',
    name: 'Piloting',
    category: 'tech',
    tier: 1,
    description: 'Mastery of spaceflight thrusters, turning radius, and ship class licensing.',
    ranks: [
      'Rank 1: Gain access to ship thrusters for tight turning.',
      'Rank 2: Increased ship turning rate and maneuverability (+20%).',
      'Rank 3: You can now pilot Class B ships.',
      'Rank 4: You can now pilot Class C dreadnought ships.'
    ]
  },
  {
    id: 'security',
    name: 'Security (Digipick)',
    category: 'tech',
    tier: 1,
    description: 'Bypass electronic locks, master vaults, and secure data safes with digipicks.',
    ranks: [
      'Rank 1: Pick Advanced locks; 2 auto-attempts banked.',
      'Rank 2: Pick Expert locks; 3 auto-attempts; keys blue highlight.',
      'Rank 3: Pick Master locks; 4 auto-attempts banked.',
      'Rank 4: Expending a digipick eliminates keys that aren\'t needed.'
    ]
  },
  {
    id: 'starship_design',
    name: 'Starship Design',
    category: 'tech',
    tier: 2,
    description: 'Installs experimental, military, and exotic starship components.',
    ranks: [
      'Rank 1: Install improved starship modules.',
      'Rank 2: Install superior starship modules.',
      'Rank 3: Install cutting-edge starship modules.',
      'Rank 4: Install experimental starship modules.'
    ]
  },
  {
    id: 'shield_systems',
    name: 'Shield Systems',
    category: 'tech',
    tier: 2,
    description: 'Boosts starship deflector shield capacity, resist damage, and instant deflections.',
    ranks: [
      'Rank 1: Ship shields have 20% increased capacity.',
      'Rank 2: Ship shields have 40% increased capacity.',
      'Rank 3: Ship shields have 60% increased capacity.',
      'Rank 4: Shields occasionally completely resist incoming damage.'
    ]
  },
  {
    id: 'aneutronic_fusion',
    name: 'Aneutronic Fusion',
    category: 'tech',
    tier: 4,
    description: 'Overclocks ship fusion reactors to output auxiliary power beyond factory limits.',
    ranks: [
      'Rank 1: Ship reactors produce 1 extra unit of power.',
      'Rank 2: Ship reactors produce 2 extra units of power.',
      'Rank 3: Ship reactors produce 3 extra units of power.',
      'Rank 4: Ship reactors produce 5 extra units of power!'
    ]
  },

  // COMBAT
  {
    id: 'ballistics',
    name: 'Ballistics',
    category: 'combat',
    tier: 1,
    description: 'Increases damage and effective firing range of physical projectile firearms.',
    ranks: [
      'Rank 1: Ballistic weapons do 10% more damage.',
      'Rank 2: Ballistic weapons do 20% more damage.',
      'Rank 3: Ballistic weapons do 30% more damage.',
      'Rank 4: Ballistic weapon range is increased by 30%.'
    ]
  },
  {
    id: 'rifle_cert',
    name: 'Rifle Certification',
    category: 'combat',
    tier: 2,
    description: 'Specialization in semi-automatic and automatic combat rifles like Beowulf and Hard Target.',
    ranks: [
      'Rank 1: Rifles do 10% more damage.',
      'Rank 2: Rifles do 20% more damage.',
      'Rank 3: Rifles do 30% more damage.',
      'Rank 4: Reload rifles 30% faster while standing still.'
    ]
  },
  {
    id: 'sniper_cert',
    name: 'Sniper Certification',
    category: 'combat',
    tier: 3,
    description: 'Steady scoped aiming and massive critical strike damage at extreme distances.',
    ranks: [
      'Rank 1: Scoped weapons are steadier and have less sway.',
      'Rank 2: Scoped headshots deal 25% more critical damage.',
      'Rank 3: Scoped weapons do 50% more critical damage.',
      'Rank 4: Scoped weapons do 50% more damage while holding breath.'
    ]
  },
  {
    id: 'armor_pen',
    name: 'Armor Penetration',
    category: 'combat',
    tier: 4,
    description: 'Attacks punch clean through armored plating, kinetic suits, and alien carapaces.',
    ranks: [
      'Rank 1: Attacks ignore 15% of a target\'s armor.',
      'Rank 2: Attacks ignore 30% of a target\'s armor.',
      'Rank 3: Attacks ignore 50% of a target\'s armor.',
      'Rank 4: Enemy armor is decreased by 25% for 6s after a critical.'
    ]
  },

  // SCIENCE
  {
    id: 'surveying',
    name: 'Surveying',
    category: 'science',
    tier: 1,
    description: 'Increases the range and optical zoom of your hand scanner for faster planet scans.',
    ranks: [
      'Rank 1: Hand scanner zoom increased; scan range up to 20m.',
      'Rank 2: Scan range up to 30m; additional zoom level.',
      'Rank 3: Scan range up to 40m; additional zoom level.',
      'Rank 4: Scan range up to 50m; maximum zoom level.'
    ]
  },
  {
    id: 'weapon_engineering',
    name: 'Weapon Engineering',
    category: 'science',
    tier: 2,
    description: 'Fabricate barrels, suppressors, armor-piercing rounds, and high-powered receivers.',
    ranks: [
      'Rank 1: Craft improved weapon mods at workbench.',
      'Rank 2: Research and craft superior weapon mods.',
      'Rank 3: Research and craft cutting-edge weapon mods.',
      'Rank 4: Research and craft masterwork weapon mods.'
    ]
  },
  {
    id: 'planetary_hab',
    name: 'Planetary Habitation',
    category: 'science',
    tier: 4,
    description: 'Build outposts on deep-freeze, inferno, toxic, and extreme gravity worlds.',
    ranks: [
      'Rank 1: Build on Deep Freeze & Inferno planets; +4 max outposts.',
      'Rank 2: Build on Toxic & Corrosive planets; +8 max outposts.',
      'Rank 3: Build on Extreme Pressure planets; +12 max outposts.',
      'Rank 4: Build on Extreme Gravity planets; +16 max outposts (24 total!).'
    ]
  },

  // SOCIAL
  {
    id: 'persuasion',
    name: 'Persuasion',
    category: 'social',
    tier: 1,
    description: 'Charm, negotiate, and de-escalate hostile NPCs during speech challenges.',
    ranks: [
      'Rank 1: 10% increased chance of success on speech challenges.',
      'Rank 2: 20% increased chance of success on speech challenges.',
      'Rank 3: 30% increased chance of success on speech challenges.',
      'Rank 4: 50% increased chance of success on speech challenges.'
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce',
    category: 'social',
    tier: 1,
    description: 'Increases credit payout when selling loot and discounts vendor purchasing costs.',
    ranks: [
      'Rank 1: Buy for 5% less; sell for 10% more credits.',
      'Rank 2: Buy for 10% less; sell for 15% more credits.',
      'Rank 3: Buy for 15% less; sell for 20% more credits.',
      'Rank 4: Buy for 20% less; sell for 25% more credits.'
    ]
  },
  {
    id: 'ship_command',
    name: 'Ship Command',
    category: 'social',
    tier: 4,
    description: 'Direct fleet personnel, increasing the maximum active ship crew capacity.',
    ranks: [
      'Rank 1: You can have up to 4 active crew members.',
      'Rank 2: You can have up to 5 active crew members.',
      'Rank 3: You can have up to 6 active crew members.',
      'Rank 4: You can have up to 8 active crew members!'
    ]
  },

  // PHYSICAL
  {
    id: 'weight_lifting',
    name: 'Weight Lifting',
    category: 'physical',
    tier: 1,
    description: 'Increases personal inventory carrying capacity and stagger resistance.',
    ranks: [
      'Rank 1: Increase carrying capacity by 10 kilograms.',
      'Rank 2: Increase carrying capacity by 25 kilograms.',
      'Rank 3: Increase carrying capacity by 50 kilograms.',
      'Rank 4: Increase carrying capacity by 100 kg; 50% stagger resist.'
    ]
  },
  {
    id: 'stealth',
    name: 'Stealth',
    category: 'physical',
    tier: 1,
    description: 'Adds a stealth detection bar and amplifies suppressed sneak attack damage.',
    ranks: [
      'Rank 1: Adds a Stealth Meter; 25% harder to detect; suppressed +3x sneak.',
      'Rank 2: Up to 50% harder to detect; suppressed sneak attacks do 2.5x.',
      'Rank 3: Up to 75% harder to detect; suppressed sneak attacks do 3x.',
      'Rank 4: Up to 100% harder to detect; opening doors makes no noise.'
    ]
  }
];

export const StarfieldSkillTreeAllocator: React.FC = () => {
  const [characterLevel, setCharacterLevel] = useState<number>(45);
  const [allocatedRanks, setAllocatedRanks] = useState<Record<string, number>>({
    boost_pack: 4,
    piloting: 4,
    security: 3,
    starship_design: 4,
    shield_systems: 3,
    aneutronic_fusion: 4,
    ballistics: 3,
    rifle_cert: 4,
    sniper_cert: 3,
    armor_pen: 4,
    surveying: 2,
    weapon_engineering: 3,
    planetary_hab: 2,
    persuasion: 2
  });

  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('tech');

  // Spent points
  const pointsSpent = useMemo(() => {
    return Object.values(allocatedRanks).reduce((sum, r) => sum + r, 0);
  }, [allocatedRanks]);

  const categorySpent = useMemo(() => {
    const counts: Record<SkillCategory, number> = {
      physical: 0,
      social: 0,
      combat: 0,
      science: 0,
      tech: 0
    };
    Object.entries(allocatedRanks).forEach(([skillId, rank]) => {
      const skill = SKILL_DATABASE.find(s => s.id === skillId);
      if (skill) {
        counts[skill.category] += rank;
      }
    });
    return counts;
  }, [allocatedRanks]);

  const handleRankClick = (skill: StarfieldSkill, targetRank: number) => {
    const current = allocatedRanks[skill.id] || 0;
    // Check tier unlock
    const spentInCat = categorySpent[skill.category] - current;
    const req = skill.tier === 1 ? 0 : skill.tier === 2 ? 4 : skill.tier === 3 ? 8 : 12;
    if (spentInCat < req && targetRank > 0) return; // locked tier

    const newRanks = { ...allocatedRanks };
    if (current === targetRank) {
      newRanks[skill.id] = targetRank - 1;
    } else {
      newRanks[skill.id] = targetRank;
    }
    setAllocatedRanks(newRanks);

    // Auto-sync Character Level if total allocated points exceed current level slider
    const newTotalSpent = Object.values(newRanks).reduce((sum, r) => sum + r, 0);
    if (newTotalSpent > characterLevel) {
      setCharacterLevel(newTotalSpent);
    }
  };

  const handleReset = () => {
    setAllocatedRanks({});
  };

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return SKILL_DATABASE;
    return SKILL_DATABASE.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 82-Skill Bethesda Engine
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full">
                Tier 1–4 Gating
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Skill Tree Allocation Tool
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Allocate skill points across Physical, Social, Combat, Science, and Tech. Calculates category point gating (4, 8, 12 points for Advanced, Expert, Master), perk ranks, and character level requirements.
            </p>
          </div>

          {/* Level & Points Badge */}
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl shrink-0">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Points Allocated</div>
              <div className="text-3xl font-black text-cyan-400 flex items-baseline gap-1">
                {pointsSpent} <span className="text-sm font-normal text-slate-500">/ Lv {characterLevel}</span>
              </div>
              <div className="text-[11px] text-amber-400 font-medium">
                {characterLevel - pointsSpent >= 0 ? `${characterLevel - pointsSpent} Points Available` : 'Exceeds Current Level!'}
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-colors"
              title="Reset All Skills"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Level Slider Bar (Dedicated Row) */}
        <div className="pt-3 pb-1 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Character Level Budget:
            </span>
            <span className="text-xs font-bold text-cyan-400 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg">
              Lv {characterLevel}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="150"
              value={characterLevel}
              onChange={(e) => setCharacterLevel(parseInt(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-950 h-2.5 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Skill Category Filter Bar (Dedicated Row) */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-slate-300">
            Filter Skill Tree Category:
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {(['all', 'tech', 'combat', 'science', 'social', 'physical'] as const).map(cat => {
              const pts = cat === 'all' ? pointsSpent : categorySpent[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-all whitespace-nowrap inline-flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded font-black ${
                    activeCategory === cat
                      ? 'bg-slate-950/20 text-slate-950'
                      : pts > 0 ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' : 'text-slate-500'
                  }`}>
                    ({pts} pts)
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => {
          const currentRank = allocatedRanks[skill.id] || 0;
          const spentInCat = categorySpent[skill.category];
          const req = skill.tier === 1 ? 0 : skill.tier === 2 ? 4 : skill.tier === 3 ? 8 : 12;
          const isLocked = (spentInCat - currentRank) < req;

          return (
            <div
              key={skill.id}
              className={`bg-slate-900 border rounded-xl p-5 space-y-3 transition-all relative ${
                isLocked ? 'border-slate-800/50 opacity-60' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300">
                      Tier {skill.tier} ({skill.tier === 1 ? 'Novice' : skill.tier === 2 ? 'Advanced' : skill.tier === 3 ? 'Expert' : 'Master'})
                    </span>
                    <span className="text-[10px] font-semibold text-cyan-400 uppercase">
                      {skill.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif">{skill.name}</h3>
                </div>

                <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                  {isLocked ? <Lock className="w-4 h-4 text-slate-500" /> : <Award className="w-4 h-4 text-cyan-400" />}
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                {skill.description}
              </p>

              {/* 4-Rank Selector Buttons */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-slate-400">Skill Rank:</span>
                  <span className="font-bold text-cyan-400">
                    {currentRank > 0 ? `Rank ${currentRank} / 4` : 'Unlearned'}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map(rank => (
                    <button
                      key={rank}
                      disabled={isLocked && currentRank === 0}
                      onClick={() => handleRankClick(skill, rank)}
                      className={`py-1.5 rounded text-xs font-bold transition-all ${
                        currentRank >= rank
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'bg-slate-950 border border-slate-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      R{rank}
                    </button>
                  ))}
                </div>

                {/* Active Rank Perk text */}
                {currentRank > 0 && (
                  <div className="mt-2.5 p-2 bg-slate-950/70 border border-cyan-500/20 rounded text-[11px] text-cyan-300">
                    <strong>Active Bonus: </strong>
                    {skill.ranks[currentRank - 1]}
                  </div>
                )}

                {isLocked && (
                  <div className="mt-2 text-[10px] text-amber-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Spend {req - spentInCat} more point(s) in {skill.category} to unlock Tier {skill.tier}!
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default StarfieldSkillTreeAllocator;
