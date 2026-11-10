/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, Shield, Target, Crosshair, Flame, Sparkles, 
  CheckCircle2, Circle, AlertCircle, RefreshCw, Bookmark,
  TrendingUp, Award, Layers
} from 'lucide-react';

interface CradlePerk {
  id: string;
  name: string;
  tier: number;
  category: 'Weapon' | 'Status / Elemental' | 'Survival' | 'Deviant';
  description: string;
  bonuses: {
    weaponDmg?: number;
    statusDmg?: number;
    critDmg?: number;
    shieldBonus?: number;
    deviantDmg?: number;
  };
  keyWordAffinity?: string;
}

const CRADLE_PERKS: CradlePerk[] = [
  // Tier 1
  { id: 'auto-weapon', name: 'Automatic Weapon Enhancement', tier: 1, category: 'Weapon', description: '+15% Assault Rifle & SMG Damage for 6s after hitting an enemy.', bonuses: { weaponDmg: 15 } },
  { id: 'handgun-specialist', name: 'Handgun Specialist', tier: 1, category: 'Weapon', description: '+20% Pistol and Revolver Damage; reload speed +15%.', bonuses: { weaponDmg: 20 } },
  { id: 'shotgun-blast', name: 'Close Quarters Blast', tier: 1, category: 'Weapon', description: '+18% Shotgun Damage when within 10 meters of target.', bonuses: { weaponDmg: 18 } },
  { id: 'tactical-combo', name: 'Tactical Combo', tier: 1, category: 'Weapon', description: 'Switching weapons grants +20% reload speed and +10% Fire Rate for 5s.', bonuses: { weaponDmg: 5 } },
  { id: 'anti-anomaly', name: 'Anti-Anomaly Barrier', tier: 1, category: 'Survival', description: 'Reduces damage taken from Deviation and Pollution attacks by 15%.', bonuses: { shieldBonus: 10 } },

  // Tier 2
  { id: 'status-boost', name: 'Status Resonance', tier: 2, category: 'Status / Elemental', description: '+15% Status Damage and Elemental Damage across all weapons.', bonuses: { statusDmg: 15 } },
  { id: 'heavy-firepower', name: 'Heavy Firepower', tier: 2, category: 'Weapon', description: '+15% LMG & Sniper Rifle Weakspot Damage.', bonuses: { weaponDmg: 10, critDmg: 10 } },
  { id: 'lone-wolf', name: 'Lone Wolf Operator', tier: 2, category: 'Survival', description: 'When no allies are within 15 meters, gain +12% all Weapon DMG.', bonuses: { weaponDmg: 12 } },
  { id: 'deviant-assist', name: 'Deviant Assistance', tier: 2, category: 'Deviant', description: '+25% Damage dealt by summoned Combat Deviants (Butterfly, Gel).', bonuses: { deviantDmg: 25 } },

  // Tier 3
  { id: 'shrapnel-souvenir', name: 'Shrapnel Souvenir', tier: 3, category: 'Weapon', description: 'Triggering Shrapnel has a 50% chance to immediately refund 1 bullet into your magazine.', bonuses: { weaponDmg: 10 }, keyWordAffinity: 'Shrapnel' },
  { id: 'transient-impact', name: 'Transient Impact', tier: 3, category: 'Status / Elemental', description: 'Triggering Power Surge causes a secondary electric chain arc dealing 30% shock DMG.', bonuses: { statusDmg: 20 }, keyWordAffinity: 'Power Surge' },
  { id: 'frost-compression', name: 'Frost Vortex Compression', tier: 3, category: 'Status / Elemental', description: 'Frost Vortex pull radius +2m and applies 10% Vulnerability to trapped enemies.', bonuses: { statusDmg: 15 }, keyWordAffinity: 'Frost Vortex' },
  { id: 'pyroclast', name: 'Pyroclast Detonation', tier: 3, category: 'Status / Elemental', description: 'When an enemy reaches max Burn stacks, trigger an explosion dealing massive fire DMG.', bonuses: { statusDmg: 25 }, keyWordAffinity: 'Burn' },
  { id: 'unstable-blast', name: 'Unstable Blast Wave', tier: 3, category: 'Weapon', description: 'Unstable Bomber explosion radius +35% and gains +15% Crit Rate.', bonuses: { weaponDmg: 15, critDmg: 15 }, keyWordAffinity: 'Unstable Bomber' },

  // Tier 4
  { id: 'deadly-reflex', name: 'Deadly Reflex', tier: 4, category: 'Survival', description: 'Dodging through an enemy attack grants +25% Crit DMG for 4 seconds.', bonuses: { critDmg: 25 } },
  { id: 'shield-reinforce', name: 'Shield Reinforcement', tier: 4, category: 'Survival', description: '+20% Maximum Shield Capacity and regenerates 5% shield on kill.', bonuses: { shieldBonus: 20 } },
  { id: 'sprint-rebound', name: 'Combat Agility', tier: 4, category: 'Survival', description: '+15% Sprint Speed and +20% Stamina recovery during boss fights.', bonuses: { weaponDmg: 0 } },
  { id: 'sustained-suppress', name: 'Sustained Suppression', tier: 4, category: 'Weapon', description: 'Firing continuously without reloading stacks up to +15% Weapon DMG.', bonuses: { weaponDmg: 15 } },

  // Tier 5
  { id: 'cradle-awakening', name: 'Cradle Awakening', tier: 5, category: 'Deviant', description: 'Summoning a Combat Deviant grants you +15% all Weapon DMG for 15 seconds.', bonuses: { weaponDmg: 15, deviantDmg: 15 } },
  { id: 'kinetic-overdrive', name: 'Kinetic Overdrive', tier: 5, category: 'Weapon', description: 'Kills increase your Fire Rate by 15% and reload speed by 25% for 6s.', bonuses: { weaponDmg: 10 } },
  { id: 'thermal-discharge', name: 'Thermal Discharge', tier: 5, category: 'Status / Elemental', description: 'Dealing status damage emits a kinetic thermal shockwave every 5s.', bonuses: { statusDmg: 15 } },
];

const PRESET_BUILDS = [
  {
    name: 'Power Surge SOCR Build',
    perks: ['auto-weapon', 'status-boost', 'transient-impact', 'deviant-assist', 'deadly-reflex', 'cradle-awakening', 'shield-reinforce', 'lone-wolf']
  },
  {
    name: 'Shrapnel AWM Boss Melter',
    perks: ['heavy-firepower', 'shrapnel-souvenir', 'deadly-reflex', 'sustained-suppress', 'kinetic-overdrive', 'cradle-awakening', 'shield-reinforce', 'auto-weapon']
  },
  {
    name: 'Frost Vortex CC Specialist',
    perks: ['auto-weapon', 'status-boost', 'frost-compression', 'deviant-assist', 'cradle-awakening', 'shield-reinforce', 'thermal-discharge', 'deadly-reflex']
  },
  {
    name: 'Burn KVD Explosion Build',
    perks: ['heavy-firepower', 'status-boost', 'pyroclast', 'thermal-discharge', 'cradle-awakening', 'deadly-reflex', 'shield-reinforce', 'sustained-suppress']
  }
];

export default function OnceHumanCradleOverridePlanner() {
  const [selectedPerkIds, setSelectedPerkIds] = useState<string[]>(PRESET_BUILDS[0].perks);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const maxCapacity = 8;
  const currentCount = selectedPerkIds.length;
  const isOverCapacity = currentCount > maxCapacity;

  const togglePerk = (id: string) => {
    setSelectedPerkIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(p => p !== id);
      } else {
        if (prev.length >= maxCapacity) {
          return prev; // capacity full
        }
        return [...prev, id];
      }
    });
  };

  const applyPreset = (presetPerks: string[]) => {
    setSelectedPerkIds(presetPerks);
  };

  const clearAll = () => {
    setSelectedPerkIds([]);
  };

  // Cumulative Build Totals
  const buildSummary = useMemo(() => {
    let weaponDmg = 0;
    let statusDmg = 0;
    let critDmg = 0;
    let shieldBonus = 0;
    let deviantDmg = 0;

    selectedPerkIds.forEach(id => {
      const perk = CRADLE_PERKS.find(p => p.id === id);
      if (perk?.bonuses) {
        if (perk.bonuses.weaponDmg) weaponDmg += perk.bonuses.weaponDmg;
        if (perk.bonuses.statusDmg) statusDmg += perk.bonuses.statusDmg;
        if (perk.bonuses.critDmg) critDmg += perk.bonuses.critDmg;
        if (perk.bonuses.shieldBonus) shieldBonus += perk.bonuses.shieldBonus;
        if (perk.bonuses.deviantDmg) deviantDmg += perk.bonuses.deviantDmg;
      }
    });

    return {
      weaponDmg,
      statusDmg,
      critDmg,
      shieldBonus,
      deviantDmg
    };
  }, [selectedPerkIds]);

  const filteredPerks = useMemo(() => {
    if (activeFilter === 'All') return CRADLE_PERKS;
    return CRADLE_PERKS.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  const categories = ['All', 'Weapon', 'Status / Elemental', 'Survival', 'Deviant'];

  return (
    <div className="space-y-8">
      {/* Overview Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Season Cradle Overrides • 8-Slot Budget</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Once Human Cradle Override Build Planner
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Design endgame combat synergy builds with seasonal Cradle Overrides. Mix status explosions, infinite Shrapnel refunding, and deviant buffs within the 8-node allocation ceiling.
            </p>
          </div>

          <div className="w-full md:w-56 bg-slate-950/80 border border-cyan-500/40 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Cradle Capacity:</span>
              <span className={`font-mono font-black ${isOverCapacity ? 'text-rose-400' : 'text-cyan-400'}`}>
                {currentCount} / {maxCapacity} Slots
              </span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  isOverCapacity ? 'bg-rose-500' : 'bg-gradient-to-r from-cyan-500 to-purple-400'
                }`}
                style={{ width: `${Math.min(100, (currentCount / maxCapacity) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>{maxCapacity - currentCount} Slots Remaining</span>
              <button onClick={clearAll} className="text-rose-400 hover:text-rose-300">Clear</button>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Loadouts */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Bookmark className="w-4 h-4 text-amber-400" />
          <span>Quick Meta Build Presets:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PRESET_BUILDS.map(preset => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.perks)}
              className="px-3 py-2 bg-slate-950 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/40 rounded-xl text-left transition-all"
            >
              <div className="text-xs font-bold text-white truncate">{preset.name}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">8 Synced Nodes</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Perks Selection */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === cat
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredPerks.map(perk => {
              const isSelected = selectedPerkIds.includes(perk.id);
              return (
                <div
                  key={perk.id}
                  onClick={() => togglePerk(perk.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          Tier {perk.tier}
                        </span>
                        {perk.keyWordAffinity && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                            {perk.keyWordAffinity}
                          </span>
                        )}
                      </div>
                      <h4 className={`text-sm font-bold mt-1.5 ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                        {perk.name}
                      </h4>
                    </div>

                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-cyan-500 text-slate-950' : 'border border-slate-700 text-transparent'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Aggregate Combat Buffs */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Active Cradle Override Buffs
            </h4>

            <div className="space-y-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Weapon Damage Amp:</span>
                <span className="text-lg font-black font-mono text-cyan-400">+{buildSummary.weaponDmg}%</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Status & Elemental DMG:</span>
                <span className="text-lg font-black font-mono text-purple-400">+{buildSummary.statusDmg}%</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Bonus Crit Damage:</span>
                <span className="text-lg font-black font-mono text-amber-400">+{buildSummary.critDmg}%</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Max Shield Boost:</span>
                <span className="text-lg font-black font-mono text-emerald-400">+{buildSummary.shieldBonus}%</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Deviant Combat Power:</span>
                <span className="text-lg font-black font-mono text-rose-400">+{buildSummary.deviantDmg}%</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
              💡 <span className="font-semibold text-slate-300">Pro-Tip:</span> Cradle Overrides are season-specific perks that can be swapped instantly anywhere in the field with zero cost or cooldown.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
