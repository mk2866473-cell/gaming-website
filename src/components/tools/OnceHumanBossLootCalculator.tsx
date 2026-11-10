/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Trophy, ShieldAlert, Zap, Flame, Sparkles, Target, 
  Coins, Award, Crosshair, HelpCircle, CheckCircle2,
  AlertTriangle, RefreshCw, Layers
} from 'lucide-react';

interface BossEncounter {
  id: string;
  name: string;
  location: string;
  type: 'Monolith Boss' | 'Prime War' | 'Securement Silo' | 'Endgame Lab';
  recommendedLevel: number;
  weakspot: string;
  elementWeakness: string;
  elementResist: string;
  mechanicsHint: string;
  keyDrops: string[];
  baseStardust: number;
  baseEnergyLinks: number;
}

const ENCOUNTERS: BossEncounter[] = [
  {
    id: 'foul-shadow-hunter',
    name: 'Foul Shadow Hunter',
    location: 'Monolith of Greed (Dayton Wetlands)',
    type: 'Monolith Boss',
    recommendedLevel: 10,
    weakspot: 'Gatling gun arm cylinder and back fuel battery',
    elementWeakness: 'Power Surge & Shrapnel',
    elementResist: 'Burn',
    mechanicsHint: 'Shoot down the floating rocket pods before they barrage. When the Gatling gun glows red, roll behind concrete pillars.',
    keyDrops: ['Violent Mod Box', 'Assault Rifle Mods', 'Tier I Stardust Source'],
    baseStardust: 40,
    baseEnergyLinks: 1200
  },
  {
    id: 'treant',
    name: 'Treant',
    location: 'Monolith of Thirst (Broken Delta)',
    type: 'Monolith Boss',
    recommendedLevel: 20,
    weakspot: 'Humanoid torso fused to tree trunk & glowing root nodes',
    elementWeakness: 'Burn & Power Surge',
    elementResist: 'Frost Vortex',
    mechanicsHint: 'Kill the 3 tangled Vine Creepers to break the boss immune invulnerability shield. Once dropped, burst the hanging humanoid body.',
    keyDrops: ['Precision Mod Box', 'Sniper & LMG Mods', 'Tier II Stardust Source'],
    baseStardust: 65,
    baseEnergyLinks: 2400
  },
  {
    id: 'arachsiam',
    name: 'Arachsiam',
    location: 'Monolith of Gluttony (Iron River)',
    type: 'Monolith Boss',
    recommendedLevel: 30,
    weakspot: 'Glowing egg sac abdomen and head eye cluster',
    elementWeakness: 'Frost Vortex & Shrapnel',
    elementResist: 'Power Surge',
    mechanicsHint: 'Step out of venom pools immediately. Kill spider hatchlings before they explode into toxic fog clouds.',
    keyDrops: ['Talent Mod Box', 'Shotgun & SMG Mods', 'Tier III Stardust Source'],
    baseStardust: 90,
    baseEnergyLinks: 3800
  },
  {
    id: 'shadow-hound',
    name: 'Rabid Shadow Hound',
    location: 'Monolith of Feast (Chalk Peak)',
    type: 'Monolith Boss',
    recommendedLevel: 40,
    weakspot: 'Glowing exposed ribcage & underbelly during howl phase',
    elementWeakness: 'Burn & Shrapnel',
    elementResist: 'Frost Vortex',
    mechanicsHint: 'Avoid dark puddle vortexes. When the Hound leaps to the rocky cliffs and starts howling, aim all firepower at its glowing chest.',
    keyDrops: ['Legendary Weapon Mods', 'Tier IV Stardust Source', 'Calamity Armor Parts'],
    baseStardust: 120,
    baseEnergyLinks: 5500
  },
  {
    id: 'prime-war-hard',
    name: 'Prime War (Hard / Nightmare)',
    location: 'Red Sands / Blackfell Border',
    type: 'Prime War',
    recommendedLevel: 50,
    weakspot: 'Silver Calamity Shield (Weak ONLY to Biomass & Plasma Missiles)',
    elementWeakness: 'Biomass Missiles & Gatling Cannons',
    elementResist: 'Standard bullets until shield breaks',
    mechanicsHint: 'Conventional guns deal 0 DMG while the Silver Shield is up! Teams must build Gatling Turrets and fire Biomass Missiles to shatter the shield.',
    keyDrops: ['Starchrom Crates (x800-1500)', 'Tier V Legendary Mods', 'Gold Weapon Calibrations'],
    baseStardust: 250,
    baseEnergyLinks: 12000
  },
  {
    id: 'lea-research-lab',
    name: 'Lea Research Lab (Mother of Life)',
    location: 'Red Sands High Tech Lab',
    type: 'Endgame Lab',
    recommendedLevel: 50,
    weakspot: 'Mother of Life central eye pod and cocoon clusters',
    elementWeakness: 'Power Surge & Unstable Bomber',
    elementResist: 'Physical Resistance',
    mechanicsHint: 'Hardest dungeon in Once Human. Coordinate color-coded decontamination lasers to disrupt immunity shielding.',
    keyDrops: ['Supreme Tier V Weapon & Armor Mods', 'Stardust Source (x200)', 'Energy Links (x15000)'],
    baseStardust: 220,
    baseEnergyLinks: 15000
  }
];

export default function OnceHumanBossLootCalculator() {
  const [selectedEncounterId, setSelectedEncounterId] = useState<string>('prime-war-hard');
  const [difficultyTier, setDifficultyTier] = useState<'Normal' | 'Hard' | 'Master' | 'Pro'>('Pro');
  const [controllersToSpend, setControllersToSpend] = useState<number>(10);

  const encounter = useMemo(() => {
    return ENCOUNTERS.find(e => e.id === selectedEncounterId) || ENCOUNTERS[0];
  }, [selectedEncounterId]);

  // Difficulty Multipliers
  const diffMultiplier = useMemo(() => {
    switch (difficultyTier) {
      case 'Normal': return { stardust: 1.0, goldModChance: 0.15, purpleModChance: 0.85 };
      case 'Hard': return { stardust: 1.4, goldModChance: 0.40, purpleModChance: 0.60 };
      case 'Master': return { stardust: 1.8, goldModChance: 0.75, purpleModChance: 0.25 };
      case 'Pro': return { stardust: 2.3, goldModChance: 1.00, purpleModChance: 0.00 };
    }
  }, [difficultyTier]);

  // Loot Calculations based on controllers
  const lootResults = useMemo(() => {
    const totalStardust = Math.round(encounter.baseStardust * diffMultiplier.stardust * controllersToSpend);
    const totalEnergyLinks = Math.round(encounter.baseEnergyLinks * (difficultyTier === 'Pro' ? 2 : 1) * controllersToSpend);
    const expectedGoldMods = Math.round(controllersToSpend * diffMultiplier.goldModChance * 10) / 10;
    const expectedPurpleMods = Math.round(controllersToSpend * diffMultiplier.purpleModChance * 10) / 10;

    return {
      totalStardust,
      totalEnergyLinks,
      expectedGoldMods,
      expectedPurpleMods
    };
  }, [encounter, diffMultiplier, controllersToSpend, difficultyTier]);

  return (
    <div className="space-y-8">
      {/* Overview Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-rose-400" />
              <span>Boss Mechanics & Controller Yield Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Monolith Boss & Prime War Loot Calculator
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Calculate expected Legendary Mod drops and Stardust Source returns per Controller spent. View Calamity shield mechanics, elemental counters, and weakspot locations.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 bg-slate-950/80 border border-rose-500/40 rounded-xl p-4">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-2xl font-black text-amber-400 font-mono">+{lootResults.totalStardust.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Stardust Source</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-purple-400 font-mono">~{lootResults.expectedGoldMods}</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Gold Mods Expected</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Setup */}
        <div className="lg:col-span-2 space-y-6">
          {/* Encounter Selection */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>1. Select Monolith Boss or Calamity Raid</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {ENCOUNTERS.map(enc => (
                <button
                  key={enc.id}
                  onClick={() => setSelectedEncounterId(enc.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedEncounterId === enc.id
                      ? 'border-rose-500 bg-rose-950/60 text-white shadow-lg shadow-rose-950/50'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-xs truncate">{enc.name}</div>
                  <div className="text-[10px] text-rose-400 mt-1">{enc.type}</div>
                  <div className="text-[10px] text-slate-500 truncate">{enc.location}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty & Controller Budget */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>2. Difficulty Tier & Controller Budget</span>
            </h3>

            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">Dungeon Difficulty Tier:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Normal', 'Hard', 'Master', 'Pro'] as const).map(diff => (
                  <button
                    key={diff}
                    onClick={() => setDifficultyTier(diff)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      difficultyTier === diff
                        ? diff === 'Pro' ? 'bg-rose-600 text-white border-rose-400' : 'bg-purple-600 text-white border-purple-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {diff} Mode
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">Controllers to Spend:</span>
                <span className="text-purple-400 font-black font-mono text-base">{controllersToSpend} Controllers</span>
              </div>
              <input 
                type="range"
                min={1}
                max={50}
                value={controllersToSpend}
                onChange={(e) => setControllersToSpend(Number(e.target.value))}
                className="w-full accent-purple-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>1 Crate Run</span>
                <span>25 Weekend Grind</span>
                <span>50 Hardcore Session</span>
              </div>
            </div>
          </div>

          {/* Boss Mechanics & Counters */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-cyan-400" />
              <span>3. Tactical Mechanics & Weakspot Guide</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">Weakspot Target:</span>
                <div className="text-amber-300 font-bold">{encounter.weakspot}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
                  <span className="text-emerald-400 font-semibold block">Elemental Weakness:</span>
                  <span className="text-white font-bold">{encounter.elementWeakness}</span>
                </div>
                <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-xl">
                  <span className="text-rose-400 font-semibold block">Elemental Resistance:</span>
                  <span className="text-white font-bold">{encounter.elementResist}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-semibold">Phase Hazard & Mechanics:</span>
                <p className="text-slate-300 leading-relaxed">{encounter.mechanicsHint}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Loot Summary Card */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-rose-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
              Loot Returns ({controllersToSpend} Controllers • {difficultyTier})
            </h4>

            <div className="space-y-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Total Stardust Source:</span>
                <span className="text-lg font-black font-mono text-amber-400">
                  {lootResults.totalStardust.toLocaleString()}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Total Energy Links:</span>
                <span className="text-lg font-black font-mono text-emerald-400">
                  {lootResults.totalEnergyLinks.toLocaleString()} EL
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Legendary (Gold) Mods:</span>
                <span className="text-lg font-black font-mono text-purple-400">
                  ~{lootResults.expectedGoldMods} Drops
                </span>
              </div>

              {lootResults.expectedPurpleMods > 0 && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-400">Epic (Purple) Mods:</span>
                  <span className="text-lg font-black font-mono text-cyan-400">
                    ~{lootResults.expectedPurpleMods} Drops
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 space-y-2 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block">Key Drop Table:</span>
              <ul className="space-y-1 text-xs text-slate-400">
                {encounter.keyDrops.map((drop, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>{drop}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
