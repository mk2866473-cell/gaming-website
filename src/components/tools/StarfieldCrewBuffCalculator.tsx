/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Users, Rocket, Shield, Zap, Box, Compass, 
  Sparkles, CheckCircle2, Award, Heart, Plus, 
  Trash2, AlertTriangle, ChevronRight
} from 'lucide-react';

export interface CrewMember {
  id: string;
  name: string;
  title: string;
  location: string;
  cost: string;
  skills: {
    name: string;
    rank: number;
    effect: string;
  }[];
  notes: string;
}

const CREW_ROSTER: CrewMember[] = [
  {
    id: 'sam_coe',
    name: 'Sam Coe',
    title: 'Freestar Ranger & Ace Pilot',
    location: 'Akila City / Lodge',
    cost: 'Free (Story Companion)',
    skills: [
      { name: 'Piloting', rank: 4, effect: '+1 Free Power to Engines & +30% Ship Max Top Speed' },
      { name: 'Payloads', rank: 2, effect: '+20% Total Ship Cargo Capacity' },
      { name: 'Rifle Certification', rank: 3, effect: '+30% Rifle Damage' }
    ],
    notes: 'Arguably the #1 essential ship crew member: grants free engine power and expands your cargo hold.'
  },
  {
    id: 'vasco',
    name: 'Vasco',
    title: 'Constellation Expeditionary Robot',
    location: 'The Lodge, New Atlantis',
    cost: 'Free (Story Companion)',
    skills: [
      { name: 'Aneutronic Fusion', rank: 1, effect: '+1 Bonus Permanent Reactor Power' },
      { name: 'Shield Systems', rank: 2, effect: '+40% Ship Shield Capacity' },
      { name: 'EM Weapon Systems', rank: 1, effect: '+5% Electromagnetic Weapon Damage' }
    ],
    notes: 'Provides a free auxiliary reactor power pip and strong early-game shield reinforcement.'
  },
  {
    id: 'omari_hassan',
    name: 'Omari Hassan',
    title: 'Veteran Ship Shield Specialist',
    location: 'The Hitching Post, Akila City',
    cost: '13,500 Credits (Hireable)',
    skills: [
      { name: 'Shield Systems', rank: 3, effect: '+60% Ship Shield Capacity & Faster Shield Regen' },
      { name: 'Starship Engineering', rank: 1, effect: '+10% Ship Repair Speed' }
    ],
    notes: 'The highest Shield Systems rank of any crew member in the galaxy; essential for Class C dreadnoughts.'
  },
  {
    id: 'barrett',
    name: 'Barrett',
    title: 'Constellation Veteran Explorer',
    location: 'The Lodge, New Atlantis',
    cost: 'Free (Story Companion)',
    skills: [
      { name: 'Starship Engineering', rank: 4, effect: '+25% System Repair Speed & +10% Damage Resistance' },
      { name: 'Particle Beam Weapon Systems', rank: 3, effect: '+15% Particle Beam Weapon Damage' }
    ],
    notes: 'Top-tier damage multiplier for particle beam loadouts and unmatched hull repair recovery speed.'
  },
  {
    id: 'sarah_morgan',
    name: 'Sarah Morgan',
    title: 'Chair of Constellation',
    location: 'The Lodge, New Atlantis',
    cost: 'Free (Story Companion)',
    skills: [
      { name: 'Astrodynamics', rank: 4, effect: '-50% Grav Jump Fuel Cost & +30% Jump Range' },
      { name: 'Leadership', rank: 2, effect: 'Acts as free companion without consuming personal slot' },
      { name: 'Lasers', rank: 3, effect: '+30% Laser Damage' }
    ],
    notes: 'Halves grav jump Helium-3 fuel expenditure; her Leadership skill allows her to board ships without filling standard crew slots.'
  },
  {
    id: 'andreja',
    name: 'Andreja',
    title: 'House Va\'ruun Operative',
    location: 'The Lodge, New Atlantis',
    cost: 'Free (Story Companion)',
    skills: [
      { name: 'Energy Weapon Systems', rank: 2, effect: '+10% Energy Weapon Damage' },
      { name: 'Particle Beams', rank: 1, effect: '+5% Particle Beam Damage' },
      { name: 'Stealth', rank: 4, effect: 'Superior stealth field detection' }
    ],
    notes: 'Combines energy and particle beam buffs to amplify hybrid ship weaponry.'
  },
  {
    id: 'gideon_aker',
    name: 'Gideon Aker',
    title: 'Viewport Mercenary Weapons Officer',
    location: 'The Viewport, New Atlantis',
    cost: '12,000 Credits (Hireable)',
    skills: [
      { name: 'Ballistic Weapon Systems', rank: 2, effect: '+10% Ballistic Weapon Damage' },
      { name: 'Missile Weapon Systems', rank: 2, effect: '+10% Missile Weapon Damage' }
    ],
    notes: 'Solid dual-weapon officer for ships utilizing ballistic cannons and tracking missile launchers.'
  },
  {
    id: 'marika_borlaug',
    name: 'Marika Borlaug',
    title: 'Security Specialist & Gunner',
    location: 'The Viewport, New Atlantis',
    cost: '13,500 Credits (Hireable)',
    skills: [
      { name: 'Ballistics', rank: 2, effect: '+10% Ballistic Damage' },
      { name: 'Particle Beam Weapon Systems', rank: 1, effect: '+5% Particle Beam Damage' }
    ],
    notes: 'General weaponry specialist capable of operating ship turrets or defending outposts.'
  }
];

export const StarfieldCrewBuffCalculator: React.FC = () => {
  const [shipCommandRank, setShipCommandRank] = useState<number>(3); // Rank 0 to 4
  const [assignedCrewIds, setAssignedCrewIds] = useState<string[]>([
    'sam_coe', 'vasco', 'omari_hassan', 'barrett'
  ]);

  // Max crew allowed by Ship Command perk
  // Base = 3 crew. Rank 1 = 4, Rank 2 = 5, Rank 3 = 6, Rank 4 = 8 crew.
  const maxCrewCapacity = shipCommandRank === 0 ? 3 : shipCommandRank === 1 ? 4 : shipCommandRank === 2 ? 5 : shipCommandRank === 3 ? 6 : 8;

  const toggleCrew = (id: string) => {
    if (assignedCrewIds.includes(id)) {
      if (assignedCrewIds.length <= 1) return;
      setAssignedCrewIds(assignedCrewIds.filter(c => c !== id));
    } else {
      if (assignedCrewIds.length >= maxCrewCapacity) return;
      setAssignedCrewIds([...assignedCrewIds, id]);
    }
  };

  // Calculations: Crew Skills Stacking Rule: Highest rank applies for each unique skill!
  const buffs = useMemo(() => {
    const assignedCrew = CREW_ROSTER.filter(c => assignedCrewIds.includes(c.id));

    // Reactor Power (Vasco Aneutronic Fusion 1 = +1)
    let bonusReactorPower = 0;
    if (assignedCrewIds.includes('vasco')) bonusReactorPower += 1;

    // Engine Free Power & Speed (Sam Coe Piloting 4 = +1 free engine pip & +30% top speed)
    let freeEnginePower = 0;
    let topSpeedBonusPercent = 0;
    if (assignedCrewIds.includes('sam_coe')) {
      freeEnginePower = 1;
      topSpeedBonusPercent = 30;
    }

    // Shield Systems: Omari (Rank 3 = +60%) vs Vasco (Rank 2 = +40%). Highest wins!
    let shieldCapacityBonus = 0;
    if (assignedCrewIds.includes('omari_hassan')) {
      shieldCapacityBonus = 60;
    } else if (assignedCrewIds.includes('vasco')) {
      shieldCapacityBonus = 40;
    }

    // Cargo Payloads: Sam Coe (Rank 2 = +20%)
    let cargoBonusPercent = 0;
    if (assignedCrewIds.includes('sam_coe')) {
      cargoBonusPercent = 20;
    }

    // Grav Jump Fuel: Sarah Morgan (Astrodynamics 4 = -50% fuel)
    let gravFuelDiscount = 0;
    let jumpRangeBonus = 0;
    if (assignedCrewIds.includes('sarah_morgan')) {
      gravFuelDiscount = 50;
      jumpRangeBonus = 30;
    }

    // Particle Beam Weapons: Barrett (Rank 3 = +15%) vs Andreja (Rank 1 = +5%)
    let particleDamageBonus = 0;
    if (assignedCrewIds.includes('barrett')) {
      particleDamageBonus = 15;
    } else if (assignedCrewIds.includes('andreja')) {
      particleDamageBonus = 5;
    }

    // Energy / Laser Weapons
    let energyDamageBonus = 0;
    if (assignedCrewIds.includes('andreja')) energyDamageBonus = 10;
    else if (assignedCrewIds.includes('sarah_morgan')) energyDamageBonus = 10;

    // Ballistics & Missiles
    let ballisticDamageBonus = 0;
    let missileDamageBonus = 0;
    if (assignedCrewIds.includes('gideon_aker')) {
      ballisticDamageBonus = 10;
      missileDamageBonus = 10;
    }

    // Repair Rate
    let repairRateBonus = 0;
    if (assignedCrewIds.includes('barrett')) {
      repairRateBonus = 25;
    } else if (assignedCrewIds.includes('omari_hassan')) {
      repairRateBonus = 10;
    }

    return {
      bonusReactorPower,
      freeEnginePower,
      topSpeedBonusPercent,
      shieldCapacityBonus,
      cargoBonusPercent,
      gravFuelDiscount,
      jumpRangeBonus,
      particleDamageBonus,
      energyDamageBonus,
      ballisticDamageBonus,
      missileDamageBonus,
      repairRateBonus
    };
  }, [assignedCrewIds]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Fleet Officer Roster
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full">
                Ship Command Rank {shipCommandRank}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Crew Assignment Buff Calculator
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Select and assign up to 8 crew officers. Calculates non-stacking crew rules, bonus auxiliary reactor power, free engine pips, +60% shield capacity, and weapon system multipliers.
            </p>
          </div>

          {/* Crew Limit Badge */}
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl shrink-0">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Active Crew Capacity</div>
              <div className="text-3xl font-black text-cyan-400 flex items-baseline gap-1">
                {assignedCrewIds.length} <span className="text-sm font-normal text-slate-500">/ {maxCrewCapacity} Slots</span>
              </div>
              <div className="text-[11px] text-amber-400 font-medium">
                Ship Command Rank {shipCommandRank}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Ship Command Rank Selector */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Player Ship Command Skill Rank (Social Tree):</span>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map(rank => (
              <button
                key={rank}
                onClick={() => setShipCommandRank(rank)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  shipCommandRank === rank
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Rank {rank} ({rank === 0 ? '3 Crew' : rank === 1 ? '4 Crew' : rank === 2 ? '5 Crew' : rank === 3 ? '6 Crew' : '8 Crew'})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Buffs Output */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" /> Active Ship Buff Summary
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Auxiliary Reactor</div>
                <div className="text-2xl font-black text-amber-400 mt-1">+{buffs.bonusReactorPower} Pwr</div>
                <div className="text-[10px] text-slate-500">Vasco Fusion</div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Free Engine Power</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">+{buffs.freeEnginePower} Pip</div>
                <div className="text-[10px] text-slate-500">Sam Coe Piloting</div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Shield Capacity</div>
                <div className="text-2xl font-black text-cyan-400 mt-1">+{buffs.shieldCapacityBonus}%</div>
                <div className="text-[10px] text-slate-500">Omari / Vasco</div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Cargo Expansion</div>
                <div className="text-2xl font-black text-purple-400 mt-1">+{buffs.cargoBonusPercent}%</div>
                <div className="text-[10px] text-slate-500">Sam Coe Payloads</div>
              </div>
            </div>

            {/* Additional Performance Buffs */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                <span className="text-slate-300">Max Top Speed Boost:</span>
                <span className="font-bold text-emerald-400">+{buffs.topSpeedBonusPercent}%</span>
              </div>

              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                <span className="text-slate-300">Grav Jump Fuel Discount:</span>
                <span className="font-bold text-amber-400">-{buffs.gravFuelDiscount}%</span>
              </div>

              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                <span className="text-slate-300">Particle Beam Weapon Multiplier:</span>
                <span className="font-bold text-cyan-400">+{buffs.particleDamageBonus}%</span>
              </div>

              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                <span className="text-slate-300">Ship System Repair Recovery Speed:</span>
                <span className="font-bold text-purple-400">+{buffs.repairRateBonus}%</span>
              </div>
            </div>

            {/* Crew Stacking Note */}
            <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-[11px] text-slate-300 leading-relaxed">
              <strong className="text-amber-400">Stacking Rule:</strong> Duplicate crew skills do not stack with each other (e.g. Omari's Shield Systems 3 overrides Vasco's Shield Systems 2), but they DO stack with the player's personal perks!
            </div>
          </div>
        </div>

        {/* Right Column: Crew Selection Cards */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" /> Click to Assign or Dismiss Officers
            </h3>
            <span className="text-xs text-slate-400">
              {assignedCrewIds.length} / {maxCrewCapacity} Assigned
            </span>
          </div>

          <div className="space-y-2.5">
            {CREW_ROSTER.map((crew) => {
              const isAssigned = assignedCrewIds.includes(crew.id);
              const isLimitReached = assignedCrewIds.length >= maxCrewCapacity;

              return (
                <div
                  key={crew.id}
                  onClick={() => toggleCrew(crew.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isAssigned
                      ? 'bg-cyan-950/30 border-cyan-500/50 shadow-sm'
                      : isLimitReached
                      ? 'bg-slate-900 border-slate-800 opacity-60'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-white font-serif">{crew.name}</span>
                        <span className="text-[10px] text-slate-400">• {crew.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">{crew.location} ({crew.cost})</div>
                    </div>

                    <div className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1.5 ${
                      isAssigned 
                        ? 'bg-cyan-500 text-slate-950' 
                        : 'bg-slate-950 border border-slate-800 text-slate-400'
                    }`}>
                      {isAssigned ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      {isAssigned ? 'ASSIGNED' : 'ASSIGN'}
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {crew.skills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-950 border border-slate-800 text-slate-300">
                        <strong className="text-cyan-400">{s.name} {s.rank}:</strong> {s.effect}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StarfieldCrewBuffCalculator;
