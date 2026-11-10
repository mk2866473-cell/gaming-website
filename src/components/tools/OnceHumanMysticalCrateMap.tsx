/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  MapPin, CheckCircle, Circle, Search, Filter, Compass, 
  Gift, Trophy, Sparkles, AlertCircle, RefreshCw, Layers,
  ChevronDown, ChevronUp, Eye, EyeOff, ShieldCheck, Box
} from 'lucide-react';

interface CrateLocation {
  id: string;
  name: string;
  region: 'Dayton Wetlands' | 'Broken Delta' | 'Iron River' | 'Chalk Peak' | 'Red Sands' | 'Blackfell';
  settlement: string;
  levelRange: string;
  type: 'Mystical Crate' | 'Weapon Crate' | 'Gear Crate' | 'Rift Anchor';
  coordinates: string;
  locationHint: string;
  keyReward: string;
  blueprintFrags?: string;
}

const CRATE_DATABASE: CrateLocation[] = [
  // Dayton Wetlands (Level 1-10)
  {
    id: 'dw-overlook-mystic',
    name: 'Overlook Town Mystical Crate',
    region: 'Dayton Wetlands',
    settlement: 'Overlook Town',
    levelRange: 'Lv. 4',
    type: 'Mystical Crate',
    coordinates: 'X: 6810, Y: -5120',
    locationHint: 'On the rooftop of the central supermarket. Climb the broken fire escape ladder behind the back alley.',
    keyReward: 'KAM - Crank Fragments (x30)',
    blueprintFrags: 'KAM - Crank (Epic AR)'
  },
  {
    id: 'dw-overlook-rift',
    name: 'Overlook Town Rift Anchor',
    region: 'Dayton Wetlands',
    settlement: 'Overlook Town',
    levelRange: 'Lv. 4',
    type: 'Rift Anchor',
    coordinates: 'X: 6750, Y: -5080',
    locationHint: 'Inside the plaza courtyard next to the fountain.',
    keyReward: 'Rift Anchor Active (Monolith unlock)'
  },
  {
    id: 'dw-coastside-mystic',
    name: 'Coastside Plaza Mystical Crate',
    region: 'Dayton Wetlands',
    settlement: 'Coastside Plaza',
    levelRange: 'Lv. 7',
    type: 'Mystical Crate',
    coordinates: 'X: 7420, Y: -5540',
    locationHint: 'Inside the top floor office of the seaside hotel. Watch out for Siren elite enemy guarding the doorway.',
    keyReward: 'Falcon Gloves Blueprint Fragment (x30)',
    blueprintFrags: 'Falcon Gloves (Epic Set)'
  },
  {
    id: 'dw-sutherland-mystic',
    name: 'Sutherland Chemical Plant Mystical Crate',
    region: 'Dayton Wetlands',
    settlement: 'Sutherland Chemical',
    levelRange: 'Lv. 10',
    type: 'Mystical Crate',
    coordinates: 'X: 6320, Y: -6100',
    locationHint: 'Top platform of the massive chemical distillation sphere. Take the steel spiral catwalks up.',
    keyReward: 'SOCR - Outsider Blueprint Fragment (x20)',
    blueprintFrags: 'SOCR - Outsider (Legendary AR)'
  },
  {
    id: 'dw-sutherland-weapon',
    name: 'Sutherland Storage Weapon Crate',
    region: 'Dayton Wetlands',
    settlement: 'Sutherland Chemical',
    levelRange: 'Lv. 10',
    type: 'Weapon Crate',
    coordinates: 'X: 6380, Y: -6140',
    locationHint: 'Inside warehouse warehouse bay #2, behind the forklift truck.',
    keyReward: 'Tier I Weapon & Steel Parts'
  },

  // Broken Delta (Level 11-20)
  {
    id: 'bd-sunbury-mystic',
    name: 'Sunbury Middle School Mystical Crate',
    region: 'Broken Delta',
    settlement: 'Sunbury Town',
    levelRange: 'Lv. 13',
    type: 'Mystical Crate',
    coordinates: 'X: 5210, Y: -6930',
    locationHint: 'School auditorium main stage. Clear the Gnawers mob surrounding the podium.',
    keyReward: 'Renegade Boots Blueprint Fragment (x30)',
    blueprintFrags: 'Renegade Set (Epic)'
  },
  {
    id: 'bd-sunbury-rift',
    name: 'Sunbury Rift Anchor',
    region: 'Broken Delta',
    settlement: 'Sunbury Town',
    levelRange: 'Lv. 13',
    type: 'Rift Anchor',
    coordinates: 'X: 5150, Y: -6880',
    locationHint: 'Center of the football field behind the gymnasium bleachers.',
    keyReward: 'Rift Anchor Active'
  },
  {
    id: 'bd-highbanks-mystic',
    name: 'High Banks Mystical Crate',
    region: 'Broken Delta',
    settlement: 'High Banks',
    levelRange: 'Lv. 17',
    type: 'Mystical Crate',
    coordinates: 'X: 5890, Y: -7410',
    locationHint: 'Inside the bank vault basement. Look behind the blown security vault door.',
    keyReward: 'AWM - Bingo / Bullseye Fragments (x30)',
    blueprintFrags: 'AWM - Bingo (Legendary Sniper)'
  },
  {
    id: 'bd-harbor-mystic',
    name: 'Harbor Town Mystical Crate',
    region: 'Broken Delta',
    settlement: 'Harbor Town',
    levelRange: 'Lv. 19',
    type: 'Mystical Crate',
    coordinates: 'X: 4720, Y: -7980',
    locationHint: 'Top of the cargo crane control cabin. Climb the vertical yellow ladder on the pier crane leg.',
    keyReward: 'Heavy Duty Mask Blueprint (x30)',
    blueprintFrags: 'Heavy Duty Set'
  },
  {
    id: 'bd-harbor-gear',
    name: 'Harbor Pier Gear Crate',
    region: 'Broken Delta',
    settlement: 'Harbor Town',
    levelRange: 'Lv. 19',
    type: 'Gear Crate',
    coordinates: 'X: 4760, Y: -8010',
    locationHint: 'Inside open red shipping container stacked near the dock barrier.',
    keyReward: 'Tier II Armor Mods & Raw Materials'
  },

  // Iron River (Level 21-30)
  {
    id: 'ir-alkirk-mystic',
    name: 'Alkirk Mystical Crate',
    region: 'Iron River',
    settlement: 'Alkirk',
    levelRange: 'Lv. 22',
    type: 'Mystical Crate',
    coordinates: 'X: 4120, Y: -4320',
    locationHint: 'Inside the medical clinic attic. Break the wooden barrier blocking the stairs.',
    keyReward: 'MP7 - Outer Space Fragments (x30)',
    blueprintFrags: 'MP7 - Outer Space (Legendary SMG)'
  },
  {
    id: 'ir-greywater-mystic',
    name: 'Greywater Industrial Mystical Crate',
    region: 'Iron River',
    settlement: 'Greywater Camp Outskirts',
    levelRange: 'Lv. 26',
    type: 'Mystical Crate',
    coordinates: 'X: 4980, Y: -3610',
    locationHint: 'On the roof of the water filtration pumping facility. Use the ventilation pipe to jump up.',
    keyReward: 'Falcon Jacket Blueprint (x30)',
    blueprintFrags: 'Falcon Jacket (Epic Set)'
  },
  {
    id: 'ir-highland-mystic',
    name: 'Highland Mystical Crate',
    region: 'Iron River',
    settlement: 'Highland Settlement',
    levelRange: 'Lv. 29',
    type: 'Mystical Crate',
    coordinates: 'X: 3820, Y: -3200',
    locationHint: 'Inside the mayor mansion luxury bedroom closet behind the painting.',
    keyReward: 'KVD - Boom! Boom! Fragments (x30)',
    blueprintFrags: 'KVD - Boom! Boom! (Legendary LMG)'
  },
  {
    id: 'ir-highland-weapon',
    name: 'Highland Armory Weapon Crate',
    region: 'Iron River',
    settlement: 'Highland Settlement',
    levelRange: 'Lv. 29',
    type: 'Weapon Crate',
    coordinates: 'X: 3790, Y: -3220',
    locationHint: 'Down in the emergency bunker underground shelter.',
    keyReward: 'Tier III Calibrated Weapon & Steel Ingots'
  },

  // Chalk Peak (Level 31-40)
  {
    id: 'cp-tallgrass-mystic',
    name: 'Tall Grass Inn Mystical Crate',
    region: 'Chalk Peak',
    settlement: 'Tall Grass Inn',
    levelRange: 'Lv. 32',
    type: 'Mystical Crate',
    coordinates: 'X: 1980, Y: -4980',
    locationHint: 'Inside the cellar wine cave behind the bar. Use your flashlight to spot the path.',
    keyReward: 'Shelter Gas Mask Blueprint (x30)',
    blueprintFrags: 'Shelter Gas Mask'
  },
  {
    id: 'cp-brewery-mystic',
    name: 'Brewery Estate Mystical Crate',
    region: 'Chalk Peak',
    settlement: 'Brewery Estate',
    levelRange: 'Lv. 35',
    type: 'Mystical Crate',
    coordinates: 'X: 1450, Y: -5420',
    locationHint: 'Suspended metal gantry above the massive copper brewing vats.',
    keyReward: 'DB-G - Doomsday Fragments (x30)',
    blueprintFrags: 'DB-G - Doomsday (Legendary Shotgun)'
  },
  {
    id: 'cp-believer-mystic',
    name: 'Believer Outpost Mystical Crate',
    region: 'Chalk Peak',
    settlement: 'Believer Outpost',
    levelRange: 'Lv. 38',
    type: 'Mystical Crate',
    coordinates: 'X: 890, Y: -6120',
    locationHint: 'Top watchtower platform overlooking the mountain cliff gorge.',
    keyReward: 'Agent Vest Blueprint (x30)',
    blueprintFrags: 'Agent Vest'
  },

  // Red Sands (Level 41-50)
  {
    id: 'rs-blackfell-fallen-mystic',
    name: 'Blackfell Fallen Zone Mystical Crate',
    region: 'Red Sands',
    settlement: 'Blackfell Fallen Zone',
    levelRange: 'Lv. 43',
    type: 'Mystical Crate',
    coordinates: 'X: 4120, Y: -1290',
    locationHint: 'Roof of the multi-story hospital complex. Requires climbing elevator shaft cables.',
    keyReward: 'Brahminy Tactical Boots Blueprint (x30)',
    blueprintFrags: 'Brahminy Set'
  },
  {
    id: 'rs-alternate-mystic',
    name: 'Alternate Reality Research Institute Mystical Crate',
    region: 'Red Sands',
    settlement: 'Research Institute',
    levelRange: 'Lv. 47',
    type: 'Mystical Crate',
    coordinates: 'X: 4890, Y: -840',
    locationHint: 'Sub-level 2 cleanroom laboratory behind the locked security terminal door.',
    keyReward: 'MG4 - Predator Fragments (x30)',
    blueprintFrags: 'MG4 - Predator (Legendary LMG)'
  },
  {
    id: 'rs-73-source-mystic',
    name: '73 Source Extraction Point Mystical Crate',
    region: 'Red Sands',
    settlement: '73 Source Site',
    levelRange: 'Lv. 50',
    type: 'Mystical Crate',
    coordinates: 'X: 5310, Y: -1720',
    locationHint: 'On the central Stardust pipeline pump platform suspended above toxic sludge.',
    keyReward: 'Juggernaut Armor Blueprint (x30)',
    blueprintFrags: 'Juggernaut Set'
  },

  // Blackfell Oil Fields / Endgame (Level 50+)
  {
    id: 'bf-oilfield-mystic',
    name: 'Blackfell Oil Fields Mystical Crate',
    region: 'Blackfell',
    settlement: 'Blackfell Oil Fields',
    levelRange: 'Lv. 50+ (Endgame)',
    type: 'Mystical Crate',
    coordinates: 'X: 4560, Y: -1100',
    locationHint: 'Top deck of the offshore style oil pump tower. Extreme enemy density with laser snipers.',
    keyReward: 'Tungsten Ingot (x50) & Stardust Source (x120)',
    blueprintFrags: 'Tier V Gold Mod Box'
  },
  {
    id: 'bf-refinery-weapon',
    name: 'Blackfell Central Refinery Weapon Crate',
    region: 'Blackfell',
    settlement: 'Blackfell Refinery',
    levelRange: 'Lv. 50+ (Endgame)',
    type: 'Weapon Crate',
    coordinates: 'X: 4620, Y: -1180',
    locationHint: 'Inside control room #4 next to the reactor emergency killswitch.',
    keyReward: 'Level 50 Legendary Calibrated Drop'
  }
];

export default function OnceHumanMysticalCrateMap() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('once_human_crates_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [hideCompleted, setHideCompleted] = useState(false);

  // Toggle completion
  const toggleComplete = (id: string) => {
    setCompletedIds(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('once_human_crates_completed', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const markAllRegion = (regionName: string) => {
    const regionCrates = CRATE_DATABASE.filter(c => regionName === 'All' || c.region === regionName).map(c => c.id);
    setCompletedIds(prev => {
      const set = new Set([...prev, ...regionCrates]);
      const updated = Array.from(set);
      try {
        localStorage.setItem('once_human_crates_completed', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const resetAllProgress = () => {
    setCompletedIds([]);
    try {
      localStorage.removeItem('once_human_crates_completed');
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered crates
  const filteredCrates = useMemo(() => {
    return CRATE_DATABASE.filter(crate => {
      const matchesRegion = selectedRegion === 'All' || crate.region === selectedRegion;
      const matchesType = selectedType === 'All' || crate.type === selectedType;
      const matchesSearch = searchQuery === '' || 
        crate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crate.settlement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crate.keyReward.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crate.locationHint.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCompleted = hideCompleted ? !completedIds.includes(crate.id) : true;

      return matchesRegion && matchesType && matchesSearch && matchesCompleted;
    });
  }, [selectedRegion, selectedType, searchQuery, hideCompleted, completedIds]);

  const completionPercent = useMemo(() => {
    return Math.round((completedIds.length / CRATE_DATABASE.length) * 100);
  }, [completedIds]);

  const regions = ['All', 'Dayton Wetlands', 'Broken Delta', 'Iron River', 'Chalk Peak', 'Red Sands', 'Blackfell'];
  const types = ['All', 'Mystical Crate', 'Weapon Crate', 'Gear Crate', 'Rift Anchor'];

  return (
    <div className="space-y-6">
      {/* Header and Progress Card */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Interactive Tactical Map & Exploration Tracker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Once Human Mystical Crate & Anchor Checklist
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Track guaranteed Weapon & Armor Blueprint fragments, Stardust Source, and Rift Anchors across all major strongholds from Dayton Wetlands to Blackfell. Never miss a single crate again!
            </p>
          </div>

          <div className="w-full md:w-64 bg-slate-950/80 border border-purple-500/40 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Total Progress</span>
              <span className="text-purple-300 font-black font-mono">{completedIds.length} / {CRATE_DATABASE.length} ({completionPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>{CRATE_DATABASE.length - completedIds.length} Remaining</span>
              <button 
                onClick={resetAllProgress}
                className="text-rose-400 hover:text-rose-300 font-medium transition-colors"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search settlements, rewards, blueprints, or hints (e.g. AWM, Overlook, roof)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={() => setHideCompleted(!hideCompleted)}
            className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              hideCompleted 
                ? 'bg-purple-950/80 border-purple-500/60 text-purple-300' 
                : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {hideCompleted ? <EyeOff className="w-4 h-4 text-purple-400" /> : <Eye className="w-4 h-4" />}
            <span>{hideCompleted ? 'Hiding Found' : 'Show All'}</span>
          </button>

          <button
            onClick={() => markAllRegion(selectedRegion)}
            className="px-4 py-2.5 rounded-xl border border-purple-500/30 bg-purple-950/50 hover:bg-purple-900/60 text-purple-300 text-sm font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Mark {selectedRegion === 'All' ? 'Current' : selectedRegion} Found</span>
          </button>
        </div>

        {/* Region Pills */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Filter by Territory:</span>
          <div className="flex flex-wrap gap-2">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedRegion === region
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Crate Type Pills */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Filter by Objective Type:</span>
          <div className="flex flex-wrap gap-2">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedType === t
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/50'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Crates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCrates.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-slate-900/50 border border-slate-800 rounded-2xl space-y-3">
            <Box className="w-10 h-10 text-slate-500 mx-auto" />
            <div className="text-lg font-bold text-slate-300">No Crates Found</div>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              No tactical objectives match your current filters. Try searching another territory or toggling "Show All".
            </p>
          </div>
        ) : (
          filteredCrates.map(crate => {
            const isCompleted = completedIds.includes(crate.id);
            return (
              <div 
                key={crate.id}
                onClick={() => toggleComplete(crate.id)}
                className={`cursor-pointer group relative border rounded-2xl p-5 transition-all duration-200 ${
                  isCompleted
                    ? 'bg-slate-950/60 border-emerald-900/40 opacity-70'
                    : 'bg-slate-900/90 hover:bg-slate-850 border-purple-500/20 hover:border-purple-500/50 shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                        crate.type === 'Mystical Crate'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                          : crate.type === 'Rift Anchor'
                          ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                          : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                      }`}>
                        {crate.type}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {crate.region} • <span className="text-slate-300">{crate.settlement}</span>
                      </span>
                      <span className="text-xs text-amber-400/80 font-mono">
                        [{crate.levelRange}]
                      </span>
                    </div>

                    <h3 className={`text-base font-bold transition-colors ${
                      isCompleted ? 'text-slate-400 line-through' : 'text-white group-hover:text-purple-300'
                    }`}>
                      {crate.name}
                    </h3>
                  </div>

                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComplete(crate.id);
                    }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </button>
                </div>

                {/* Coordinates & Hints */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="text-amber-400 font-bold">{crate.coordinates}</span>
                  </div>

                  <p className="text-slate-400 leading-relaxed pl-5">
                    <span className="text-slate-300 font-semibold">Location Hint:</span> {crate.locationHint}
                  </p>

                  <div className="flex items-center gap-2 pl-5 pt-1">
                    <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-slate-300 font-semibold">Reward:</span>
                    <span className="text-emerald-400 font-semibold">{crate.keyReward}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
