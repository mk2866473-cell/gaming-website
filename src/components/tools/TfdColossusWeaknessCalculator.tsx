/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Crosshair, Shield, Zap, Flame, Snowflake, Skull, Circle, 
  Target, Award, AlertTriangle, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';

interface ColossusData {
  id: string;
  name: string;
  difficulty: 'Normal' | 'Hard';
  elementalWeakness: 'Fire' | 'Chill' | 'Electric' | 'Toxic' | 'Non-Attribute';
  elementalResistance: 'Fire' | 'Chill' | 'Electric' | 'Toxic' | 'Non-Attribute';
  physicalWeakness: 'Crush' | 'Pierce' | 'Burst';
  recommendedDescendants: string[];
  recommendedWeapons: string[];
  removableParts: string[];
  enrageTrick: string;
  recommendedResistModule: string;
}

const COLOSSUS_LIST: ColossusData[] = [
  {
    id: 'grave-walker',
    name: 'Grave Walker',
    difficulty: 'Normal',
    elementalWeakness: 'Fire',
    elementalResistance: 'Toxic',
    physicalWeakness: 'Crush',
    recommendedDescendants: ['Lepic', 'Ajax', 'Bunny'],
    recommendedWeapons: ['Thunder Cage (Electric / Fire Mod)', 'Greg\'s Reversed Fate'],
    removableParts: ['Sensor (Head)', 'Core (Chest)', 'Rear Booster'],
    enrageTrick: 'Aim for knee joints when enrage lights ignite.',
    recommendedResistModule: 'Fire Resistance (+3,200)'
  },
  {
    id: 'executioner',
    name: 'Executioner',
    difficulty: 'Hard',
    elementalWeakness: 'Toxic',
    elementalResistance: 'Electric',
    physicalWeakness: 'Pierce',
    recommendedDescendants: ['Freyna', 'Ultimate Gley', 'Enzo'],
    recommendedWeapons: ['Python (Toxic Shred)', 'Enduring Legacy'],
    removableParts: ['Shoulder Armor Plate', 'Core (Chest)', 'Rear Thruster'],
    enrageTrick: 'Use Absolute Curse module or Piercing Light sniper to dispel his DEF/ATK buff instantly.',
    recommendedResistModule: 'Electric Resistance (+3,800)'
  },
  {
    id: 'dead-bride',
    name: 'Dead Bride',
    difficulty: 'Hard',
    elementalWeakness: 'Fire',
    elementalResistance: 'Chill',
    physicalWeakness: 'Burst',
    recommendedDescendants: ['Ultimate Lepic', 'Blair', 'Gley'],
    recommendedWeapons: ['Enduring Legacy (Fire Firearm ATK)', 'Afterglow Sword'],
    removableParts: ['Head Sensor', 'Left/Right Shoulder Pods', 'Core'],
    enrageTrick: 'Immediately sprint out when she teleports and summons the Snowstorm Blizzard Dome.',
    recommendedResistModule: 'Chill Resistance (+4,200)'
  },
  {
    id: 'devourer',
    name: 'Devourer',
    difficulty: 'Hard',
    elementalWeakness: 'Electric',
    elementalResistance: 'Toxic',
    physicalWeakness: 'Pierce',
    recommendedDescendants: ['Ultimate Bunny', 'Sharen', 'Hailey'],
    recommendedWeapons: ['Thunder Cage', 'Enduring Legacy (Electric Mod)'],
    removableParts: ['Chest Core', 'Left/Right Shoulders', 'Knee Guards'],
    enrageTrick: 'Spread team to all 3 Symbiont Pylons and burst them down before he regenerates 100% of his shield.',
    recommendedResistModule: 'Toxic Resistance (+4,000)'
  },
  {
    id: 'pyromaniac',
    name: 'Pyromaniac',
    difficulty: 'Hard',
    elementalWeakness: 'Chill',
    elementalResistance: 'Fire',
    physicalWeakness: 'Crush',
    recommendedDescendants: ['Viessa / Ultimate Viessa', 'Hailey', 'Valby'],
    recommendedWeapons: ['Naziestra\'s Devotion', 'Afterglow Sword (Chill Mod)'],
    removableParts: ['Rear Fluid Tank', 'Head Sensor', 'Chest Core'],
    enrageTrick: 'Pyromaniac takes 90% reduced firearm damage! You MUST rely on Chill skill power or Hailey Zenith sniper hits.',
    recommendedResistModule: 'Fire Resistance (+4,500)'
  },
  {
    id: 'swamp-walker',
    name: 'Swamp Walker',
    difficulty: 'Hard',
    elementalWeakness: 'Electric',
    elementalResistance: 'Toxic',
    physicalWeakness: 'Pierce',
    recommendedDescendants: ['Ultimate Bunny', 'Enzo', 'Gley'],
    recommendedWeapons: ['Thunder Cage', 'Enduring Legacy'],
    removableParts: ['Sensor Dome', 'Four Leg Joints', 'Core'],
    enrageTrick: 'Shoot the 6 floating micro-missile pods above his shell to stop homing acid barrages.',
    recommendedResistModule: 'Toxic Resistance (+4,300)'
  },
  {
    id: 'hanged-man',
    name: 'Hanged Man',
    difficulty: 'Hard',
    elementalWeakness: 'Toxic',
    elementalResistance: 'Electric',
    physicalWeakness: 'Burst',
    recommendedDescendants: ['Ultimate Lepic', 'Gley', 'Runner Ajax'],
    recommendedWeapons: ['Enduring Legacy', 'Afterglow Sword'],
    removableParts: ['Mouth Laser Tube', 'Chest Core'],
    enrageTrick: 'Designated runner grabs the central glowing cube at 8:00 mark. Team shoots the glowing mouth tube until tube breaks before wipe laser!',
    recommendedResistModule: 'Electric Resistance (+4,500)'
  },
  {
    id: 'obstructor',
    name: 'Obstructor',
    difficulty: 'Hard',
    elementalWeakness: 'Chill',
    elementalResistance: 'Toxic',
    physicalWeakness: 'Crush',
    recommendedDescendants: ['Ultimate Bunny (Orb Clearer)', 'Viessa', 'Enzo'],
    recommendedWeapons: ['Thunder Cage', 'Enduring Legacy'],
    removableParts: ['Head Fin', 'Shoulder Plates', 'Chest Core'],
    enrageTrick: 'Bunny must run circles shooting every purple orb drifting toward the boss to stop party wipe.',
    recommendedResistModule: 'Toxic Resistance (+4,600)'
  },
  {
    id: 'frost-walker',
    name: 'Frost Walker',
    difficulty: 'Hard',
    elementalWeakness: 'Fire',
    elementalResistance: 'Chill',
    physicalWeakness: 'Pierce',
    recommendedDescendants: ['Ultimate Lepic', 'Fast Runner Bunny', 'Gley'],
    recommendedWeapons: ['Enduring Legacy (Fire Element)', 'Afterglow Sword'],
    removableParts: ['4 Leg Cylinders', 'Head Sensor', 'Back Thruster'],
    enrageTrick: 'Runner collects 6 glowing fire embers. When the 7:30 wipe pulse fires, stand close to the runner\'s fire bubble!',
    recommendedResistModule: 'Chill Resistance (+4,800)'
  },
  {
    id: 'molten-fortress',
    name: 'Molten Fortress',
    difficulty: 'Hard',
    elementalWeakness: 'Chill',
    elementalResistance: 'Fire',
    physicalWeakness: 'Burst',
    recommendedDescendants: ['Viessa', 'Ultimate Lepic', 'Valby'],
    recommendedWeapons: ['Enduring Legacy', 'Greg\'s Reversed Fate'],
    removableParts: ['Shoulder Basins', 'Head Visor', 'Core'],
    enrageTrick: 'Turn all outer arena pillar arrows pointing RIGHT simultaneously while shooting incoming flying meteors.',
    recommendedResistModule: 'Fire Resistance (+5,000)'
  },
  {
    id: 'gluttony',
    name: 'Gluttony',
    difficulty: 'Hard',
    elementalWeakness: 'Fire',
    elementalResistance: 'Chill',
    physicalWeakness: 'Pierce',
    recommendedDescendants: ['Spiral Tidal Wave Valby', 'Enzo', 'Gley', 'Hailey'],
    recommendedWeapons: ['Enduring Legacy', 'Greg\'s Reversed Fate'],
    removableParts: ['Shoulder Cannons', 'Core Sensor', 'Arm Blades'],
    enrageTrick: 'Use Valby Clean Water or Chill gun to herd chilled white orbs directly into Gluttony to cool his wipe gauge.',
    recommendedResistModule: 'Chill Resistance (+5,200)'
  },
  {
    id: 'death-stalker',
    name: 'Death Stalker',
    difficulty: 'Hard',
    elementalWeakness: 'Electric',
    elementalResistance: 'Toxic',
    physicalWeakness: 'Crush',
    recommendedDescendants: ['Ultimate Bunny', 'Hailey', 'Enzo'],
    recommendedWeapons: ['Thunder Cage', 'Enduring Legacy'],
    removableParts: ['Stinger Tail', 'Abdomen Sensor', 'Front Claw Armor'],
    enrageTrick: 'Collect floating luminescence essence to prevent pitch-black darkness blindness debuff.',
    recommendedResistModule: 'Toxic Resistance (+5,500)'
  }
];

export default function TfdColossusWeaknessCalculator() {
  const [selectedColossusId, setSelectedColossusId] = useState<string>('gluttony');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'Normal' | 'Hard'>('Hard');

  const filteredBosses = useMemo(() => {
    if (filterDifficulty === 'all') return COLOSSUS_LIST;
    return COLOSSUS_LIST.filter(b => b.difficulty === filterDifficulty);
  }, [filterDifficulty]);

  const activeBoss = useMemo(() => {
    return COLOSSUS_LIST.find(b => b.id === selectedColossusId) || COLOSSUS_LIST[0];
  }, [selectedColossusId]);

  const getElementBadge = (element: string, type: 'weak' | 'resist') => {
    switch (element) {
      case 'Fire':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
            type === 'weak' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' : 'bg-orange-950/60 text-orange-300 border border-orange-900'
          }`}>
            <Flame className="w-3.5 h-3.5" /> Fire
          </span>
        );
      case 'Chill':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
            type === 'weak' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-cyan-950/60 text-cyan-300 border border-cyan-900'
          }`}>
            <Snowflake className="w-3.5 h-3.5" /> Chill
          </span>
        );
      case 'Electric':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
            type === 'weak' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' : 'bg-blue-950/60 text-blue-300 border border-blue-900'
          }`}>
            <Zap className="w-3.5 h-3.5" /> Electric
          </span>
        );
      case 'Toxic':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
            type === 'weak' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-emerald-950/60 text-emerald-300 border border-emerald-900'
          }`}>
            <Skull className="w-3.5 h-3.5" /> Toxic
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
            <Circle className="w-3.5 h-3.5" /> Non-Attribute
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs tracking-wider uppercase mb-1">
            <Crosshair className="w-4 h-4" />
            <span>The First Descendant • Void Intercept Battle Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Colossus Void Intercept Boss Weakness & Resistance Matrix
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
            Elemental weaknesses, firearm physical types (Crush, Pierce, Burst), removable armor parts, and wipe prevention tactics for every Void Colossus.
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
          <button
            onClick={() => setFilterDifficulty('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterDifficulty === 'all'
                ? 'bg-zinc-800 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterDifficulty('Hard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterDifficulty === 'Hard'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Hard Mode
          </button>
          <button
            onClick={() => setFilterDifficulty('Normal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterDifficulty === 'Normal'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Normal
          </button>
        </div>
      </div>

      {/* Boss Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {filteredBosses.map((boss) => (
          <button
            key={boss.id}
            onClick={() => setSelectedColossusId(boss.id)}
            className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
              selectedColossusId === boss.id
                ? 'bg-gradient-to-b from-zinc-800 to-zinc-900 border-rose-500 text-white shadow-lg shadow-rose-950/20'
                : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            <div className="text-xs font-bold truncate text-white">{boss.name}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                boss.difficulty === 'Hard' ? 'bg-rose-950/80 text-rose-400' : 'bg-blue-950/80 text-blue-400'
              }`}>
                {boss.difficulty}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Boss Combat Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Weakness Matrix */}
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                activeBoss.difficulty === 'Hard' ? 'bg-rose-950 text-rose-400' : 'bg-blue-950 text-blue-400'
              }`}>
                {activeBoss.difficulty} Void Intercept
              </span>
              <h3 className="text-xl font-black text-white mt-1">{activeBoss.name}</h3>
            </div>
            <Target className="w-6 h-6 text-rose-400" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-1.5">
                Primary Elemental Weakness (Deal +40% DMG)
              </div>
              <div>{getElementBadge(activeBoss.elementalWeakness, 'weak')}</div>
            </div>

            <div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-1.5">
                Strong Resistance (DO NOT USE)
              </div>
              <div>{getElementBadge(activeBoss.elementalResistance, 'resist')}</div>
            </div>

            <div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-1.5">
                Firearm Physical Weakness Type
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Crosshair className="w-3.5 h-3.5" /> {activeBoss.physicalWeakness} Damage
              </span>
            </div>

            <div className="pt-2 border-t border-zinc-800">
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-1">
                Required Defensive Module:
              </div>
              <div className="text-xs font-bold text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-3 py-2 rounded-lg flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-cyan-400" />
                {activeBoss.recommendedResistModule}
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Recommended Build & Fireteam */}
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-5 space-y-5">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Award className="w-4 h-4" />
            <h3>Meta Fireteam & Weapon Counters</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
                Top Counter Descendants:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {activeBoss.recommendedDescendants.map(desc => (
                  <span key={desc} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-700 text-zinc-200">
                    {desc}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
                Top Meta Weapons:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {activeBoss.recommendedWeapons.map(wpn => (
                  <span key={wpn} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-300">
                    {wpn}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800">
              <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block mb-1.5">
                Removable / Grapple Parts:
              </label>
              <ul className="space-y-1.5">
                {activeBoss.removableParts.map(part => (
                  <li key={part} className="text-xs text-zinc-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{part}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Wipe Mechanic & Survival Guide */}
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <h3>Wipe Mechanic & Enrage Bypass</h3>
          </div>

          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl space-y-2">
            <div className="text-xs font-bold text-rose-300 uppercase tracking-wider">
              Critical Boss Mechanic:
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {activeBoss.enrageTrick}
            </p>
          </div>

          <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Grapple Hold Advice:
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When a removable part turns yellow, grapple onto it immediately and HOLD on without striking it. This freezes the Colossus in place for up to 10 seconds, allowing your squad to unload uninterrupted damage!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
