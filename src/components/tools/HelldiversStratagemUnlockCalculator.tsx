/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Lock, Unlock, Shield, Zap, Bomb, Plane, Flame, Radio, 
  Search, Award, Sparkles, Sliders, ChevronRight, CheckCircle2, 
  TrendingUp, Info, ArrowUp, RefreshCw, Crosshair, HelpCircle
} from 'lucide-react';

export interface StratagemItem {
  id: string;
  name: string;
  category: 'Orbital' | 'Eagle' | 'Support' | 'Defensive' | 'Bridge';
  unlockLevel: number;
  cooldown: string;
  damage: string;
  bestUseCase: string;
  metaRating: 'S-Tier' | 'A-Tier' | 'B-Tier';
  iconSymbol: string;
}

export const STRATAGEMS_DATA: StratagemItem[] = [
  // LEVEL 1
  { id: 'machine-gun', name: 'Machine Gun', category: 'Support', unlockLevel: 1, cooldown: '0s (Call-in 3s)', damage: 'High Sustained AP2', bestUseCase: 'Clearing swarms of basic Bug Scavengers and Bot Troopers.', metaRating: 'B-Tier', iconSymbol: '🔫' },
  { id: 'ap-minefield', name: 'Anti-Personnel Minefield', category: 'Defensive', unlockLevel: 1, cooldown: '300s', damage: 'Explosive Area Denial', bestUseCase: 'Blocking chokepoints during bug breaches.', metaRating: 'B-Tier', iconSymbol: '💣' },
  { id: 'orbital-precision', name: 'Orbital Precision Strike', category: 'Orbital', unlockLevel: 1, cooldown: '90s', damage: 'Massive Single Target AP4', bestUseCase: 'Sniping static Automaton fabricators and stationary hulks.', metaRating: 'S-Tier', iconSymbol: '🎯' },

  // LEVEL 2
  { id: 'orbital-gatling', name: 'Orbital Gatling Barrage', category: 'Orbital', unlockLevel: 2, cooldown: '80s', damage: 'Continuous AP2 Lead Storm', bestUseCase: 'Fast cooldown chaff clearing across bug bugles.', metaRating: 'A-Tier', iconSymbol: '💥' },
  { id: 'orbital-airburst', name: 'Orbital Airburst Strike', category: 'Orbital', unlockLevel: 2, cooldown: '120s', damage: 'Shrapnel Airburst AP2', bestUseCase: 'Wiping clustered infantry before they call bug breaches.', metaRating: 'A-Tier', iconSymbol: '💥' },
  { id: 'jump-pack', name: 'Jump Pack', category: 'Support', unlockLevel: 2, cooldown: '20s', damage: 'Mobility Utility', bestUseCase: 'Escaping Hunter pounces and scaling high extraction cliffs.', metaRating: 'A-Tier', iconSymbol: '⚡' },

  // LEVEL 3
  { id: 'eagle-airstrike', name: 'Eagle Airstrike', category: 'Eagle', unlockLevel: 3, cooldown: '15s (Rearm 2:30)', damage: 'Carpet Bomb AP3', bestUseCase: 'The absolute #1 most versatile building destroyer in the game.', metaRating: 'S-Tier', iconSymbol: '🦅' },
  { id: 'eagle-strafing', name: 'Eagle Strafing Run', category: 'Eagle', unlockLevel: 3, cooldown: '10s (Rearm 2:30)', damage: 'Precision Forward AP3', bestUseCase: 'Staggering charging Brood Commanders and factory striders.', metaRating: 'A-Tier', iconSymbol: '🦅' },
  { id: 'flamethrower', name: 'Flamethrower', category: 'Support', unlockLevel: 3, cooldown: '0s', damage: 'Napalm Burn AP4', bestUseCase: 'Melting Charger leg armor in 2 seconds flat.', metaRating: 'S-Tier', iconSymbol: '🔥' },
  { id: 'guard-dog', name: 'Guard Dog (Rover)', category: 'Support', unlockLevel: 3, cooldown: '480s', damage: 'Autonomous Laser AP2', bestUseCase: 'Continuous automated covering fire against swarming infantry.', metaRating: 'S-Tier', iconSymbol: '🐕' },

  // LEVEL 5
  { id: 'orbital-120mm', name: 'Orbital 120MM HE Barrage', category: 'Orbital', unlockLevel: 5, cooldown: '180s', damage: 'Concentrated Shells AP4', bestUseCase: 'Bombarding medium Automaton outposts and medium nests.', metaRating: 'B-Tier', iconSymbol: '💥' },
  { id: 'orbital-gas', name: 'Orbital Gas Strike', category: 'Orbital', unlockLevel: 5, cooldown: '75s', damage: 'Caustic Acid DOT', bestUseCase: 'Dropping on bug breaches to dissolve entire waves instantly.', metaRating: 'S-Tier', iconSymbol: '💨' },
  { id: 'autocannon', name: 'Autocannon', category: 'Support', unlockLevel: 5, cooldown: '0s', damage: 'High Explosive AP3', bestUseCase: 'The king of versatile utility: closes bug holes, kills hulks, shoots spores.', metaRating: 'S-Tier', iconSymbol: '🎯' },

  // LEVEL 6
  { id: 'eagle-cluster', name: 'Eagle Cluster Bomb', category: 'Eagle', unlockLevel: 6, cooldown: '15s (Rearm 2:30)', damage: 'Wide Area Anti-Infantry', bestUseCase: 'Wiping 30+ light bugs in a single sweeping line.', metaRating: 'A-Tier', iconSymbol: '🦅' },
  { id: 'eagle-smoke', name: 'Eagle Smoke Strike', category: 'Eagle', unlockLevel: 6, cooldown: '8s (Rearm 2:30)', damage: 'Visual Smoke Screen', bestUseCase: 'Breaking Automaton bot gunline line-of-sight during emergency extractions.', metaRating: 'A-Tier', iconSymbol: '🌫️' },

  // LEVEL 8
  { id: 'orbital-ems', name: 'Orbital EMS Strike', category: 'Orbital', unlockLevel: 8, cooldown: '75s', damage: 'Stasis Field', bestUseCase: 'Freezing Chargers and Hulks in place for precision anti-tank shots.', metaRating: 'S-Tier', iconSymbol: '❄️' },
  { id: 'orbital-smoke', name: 'Orbital Smoke Strike', category: 'Orbital', unlockLevel: 8, cooldown: '100s', damage: 'Long Duration Smoke', bestUseCase: 'Covering open desert retreats from bot laser turrets.', metaRating: 'B-Tier', iconSymbol: '🌫️' },
  { id: 'recoilless-rifle', name: 'Recoilless Rifle', category: 'Support', unlockLevel: 8, cooldown: '0s', damage: 'Anti-Tank Rocket AP5', bestUseCase: 'Instant one-shot kills on charger heads and dropship engines.', metaRating: 'S-Tier', iconSymbol: '🚀' },

  // LEVEL 10
  { id: 'eagle-500kg', name: 'Eagle 500KG Bomb', category: 'Eagle', unlockLevel: 10, cooldown: '15s (Rearm 2:30)', damage: 'Mini-Nuke AP6', bestUseCase: 'Obliterating Bile Titans and Factory Striders in 1 clean drop.', metaRating: 'S-Tier', iconSymbol: '💥' },
  { id: 'orbital-laser', name: 'Orbital Laser', category: 'Orbital', unlockLevel: 10, cooldown: '300s', damage: 'Sustained Thermal Beam AP5', bestUseCase: 'Clearing entire heavy bot bases automatically while you run.', metaRating: 'S-Tier', iconSymbol: '✨' },
  { id: 'shield-generator', name: 'Shield Generator Pack', category: 'Support', unlockLevel: 10, cooldown: '480s', damage: 'Personal Energy Bubble', bestUseCase: 'Preventing one-shots from rockets and Hunter slow status effects.', metaRating: 'S-Tier', iconSymbol: '🛡️' },
  { id: 'stalwart', name: 'Stalwart', category: 'Support', unlockLevel: 10, cooldown: '0s', damage: 'Mobile Light Machine Gun', bestUseCase: 'Running and gunning down bug swarms without stopping.', metaRating: 'A-Tier', iconSymbol: '🔫' },

  // LEVEL 12
  { id: 'orbital-railcannon', name: 'Orbital Railcannon Strike', category: 'Orbital', unlockLevel: 12, cooldown: '210s', damage: 'Auto-Targeting AT AP6', bestUseCase: 'Emergency panic button to instantly delete the biggest threat on screen.', metaRating: 'S-Tier', iconSymbol: '🎯' },
  { id: 'orbital-380mm', name: 'Orbital 380MM HE Barrage', category: 'Orbital', unlockLevel: 12, cooldown: '240s', damage: 'Prolonged Devastation AP5', bestUseCase: 'Flattening entire mega-nests and Automaton command bunkers.', metaRating: 'A-Tier', iconSymbol: '💥' },

  // LEVEL 13
  { id: 'spear', name: 'Spear Launcher', category: 'Support', unlockLevel: 13, cooldown: '0s', damage: 'Lock-On Anti-Tank AP5', bestUseCase: 'Sniping Spore Spewers, Fabricators, and Bile Titans across the map.', metaRating: 'A-Tier', iconSymbol: '🚀' },
  { id: 'supply-pack', name: 'Supply Pack', category: 'Support', unlockLevel: 13, cooldown: '480s', damage: 'Extra Stims & Ammo Boxes', bestUseCase: 'Fueling endless grenade spam and stim-running without resupply pods.', metaRating: 'S-Tier', iconSymbol: '📦' },

  // LEVEL 15
  { id: 'eagle-110mm', name: 'Eagle 110MM Rocket Pods', category: 'Eagle', unlockLevel: 15, cooldown: '15s (Rearm 2:30)', damage: 'Targeted Anti-Armor AP5', bestUseCase: 'Stripping armor off Hulks and Chargers automatically.', metaRating: 'A-Tier', iconSymbol: '🦅' },
  { id: 'orbital-walking', name: 'Orbital Walking Barrage', category: 'Orbital', unlockLevel: 15, cooldown: '180s', damage: 'Advancing Artillery AP5', bestUseCase: 'Walking a wall of heavy shells forward into enemy lines safely.', metaRating: 'A-Tier', iconSymbol: '💥' },
  { id: 'ballistic-shield', name: 'Ballistic Shield', category: 'Support', unlockLevel: 15, cooldown: '300s', damage: 'Frontal Riot Shield', bestUseCase: 'Blocking heavy machine gun fire from Automaton commissars and troopers.', metaRating: 'B-Tier', iconSymbol: '🛡️' },

  // LEVEL 20
  { id: 'railgun', name: 'Railgun', category: 'Support', unlockLevel: 20, cooldown: '0s', damage: 'Hyper-Velocity Slug AP4+', bestUseCase: 'Safely or unsafely stripping armor off Hulks and Chargers with precision.', metaRating: 'S-Tier', iconSymbol: '⚡' },
  { id: 'orbital-napalm', name: 'Orbital Napalm Barrage', category: 'Orbital', unlockLevel: 20, cooldown: '240s', damage: 'Wall of Firestorm AP4', bestUseCase: 'Creating an impassable wall of fire against Terminid bug stampedes.', metaRating: 'S-Tier', iconSymbol: '🔥' },
  { id: 'patriot-exosuit', name: 'Patriot Exosuit (ME-48)', category: 'Defensive', unlockLevel: 20, cooldown: '600s', damage: 'Minigun & Rocket Mech', bestUseCase: 'Raining explosive rocket death during extraction defense.', metaRating: 'S-Tier', iconSymbol: '🤖' },
  { id: 'quasar-cannon', name: 'Quasar Cannon', category: 'Support', unlockLevel: 20, cooldown: '15s', damage: 'Infinite Ammo Anti-Tank AP5', bestUseCase: 'The undisputed king of anti-tank: no reloads, infinite cooldown energy shots.', metaRating: 'S-Tier', iconSymbol: '☀️' }
];

export const RANK_TITLES: { minLevel: number; title: string }[] = [
  { minLevel: 1, title: 'Cadet' },
  { minLevel: 5, title: 'Space Cadet' },
  { minLevel: 10, title: 'Sergeant' },
  { minLevel: 15, title: 'Master Sergeant' },
  { minLevel: 20, title: 'Chief' },
  { minLevel: 25, title: 'Space Chief Prime' },
  { minLevel: 30, title: 'Death Captain' },
  { minLevel: 40, title: 'Marshal' },
  { minLevel: 50, title: 'Hell Commander' }
];

export default function HelldiversStratagemUnlockCalculator() {
  const [currentLevel, setCurrentLevel] = useState<number>(12);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStratagemId, setSelectedStratagemId] = useState<string>('railgun'); // default selected to showRailgun prompt

  // Get current rank title
  const currentRankTitle = useMemo(() => {
    let current = RANK_TITLES[0].title;
    for (let r of RANK_TITLES) {
      if (currentLevel >= r.minLevel) {
        current = r.title;
      }
    }
    return current;
  }, [currentLevel]);

  // Filtered Stratagems by search query
  const filteredStratagems = useMemo(() => {
    if (!searchQuery.trim()) return STRATAGEMS_DATA;
    return STRATAGEMS_DATA.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Unlocked vs Locked lists
  const unlockedList = useMemo(() => {
    return filteredStratagems.filter(s => s.unlockLevel <= currentLevel);
  }, [filteredStratagems, currentLevel]);

  const lockedList = useMemo(() => {
    return filteredStratagems.filter(s => s.unlockLevel > currentLevel).sort((a, b) => a.unlockLevel - b.unlockLevel);
  }, [filteredStratagems, currentLevel]);

  const unlockedCount = useMemo(() => {
    return STRATAGEMS_DATA.filter(s => s.unlockLevel <= currentLevel).length;
  }, [currentLevel]);

  const totalStratagems = STRATAGEMS_DATA.length;
  const progressPercent = Math.round((unlockedCount / totalStratagems) * 100);

  // Selected Stratagem Object for Right Panel
  const selectedStratagem = useMemo(() => {
    return STRATAGEMS_DATA.find(s => s.id === selectedStratagemId) || STRATAGEMS_DATA[0];
  }, [selectedStratagemId]);

  // Calculations for selected stratagem or next unlocks
  const unlockMetrics = useMemo(() => {
    const isLocked = selectedStratagem.unlockLevel > currentLevel;
    const levelsLeft = isLocked ? selectedStratagem.unlockLevel - currentLevel : 0;
    
    // Avg XP per level: 5,000 XP
    // Avg XP per mission: 300 XP
    const xpNeeded = levelsLeft * 5000;
    const missionsNeeded = Math.ceil(xpNeeded / 300);

    return {
      isLocked,
      levelsLeft,
      missionsNeeded
    };
  }, [selectedStratagem, currentLevel]);

  // Viral Feature 1: "What's META at my level?"
  const handleMetaLoadoutAtLevel = () => {
    // Pick highest rated unlocked stratagems
    const unlocked = STRATAGEMS_DATA.filter(s => s.unlockLevel <= currentLevel);
    if (unlocked.length > 0) {
      setSelectedStratagemId(unlocked[unlocked.length - 1].id);
    }
  };

  // Viral Feature 2: Level Up Simulator (+1 level)
  const handleLevelUp = () => {
    setCurrentLevel(prev => Math.min(50, prev + 1));
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Top Banner & Header */}
      <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFE900]/10 border border-[#FFE900]/40 flex items-center justify-center text-[#FFE900]">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Super Earth Military Academy
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Stratagem Unlock Level Calculator (2026)
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleMetaLoadoutAtLevel}
              className="px-3.5 py-2 rounded-xl bg-[#FFE900] text-black font-black uppercase text-xs tracking-wider flex items-center gap-1.5 hover:bg-[#fff033] shadow cursor-pointer transition"
            >
              <Sparkles className="w-4 h-4" />
              What's META at My Level?
            </button>

            <button
              onClick={handleLevelUp}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition"
            >
              <ArrowUp className="w-4 h-4 text-emerald-400" />
              Level Up Simulator (+1 Lv)
            </button>
          </div>
        </div>

        {/* Level Slider & Rank Display */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold tracking-wider uppercase text-zinc-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#FFE900]" />
                Current Helldiver Level: <span className="text-2xl font-black text-[#FFE900] font-mono">Lv. {currentLevel}</span>
              </label>
              <span className="text-xs font-mono text-zinc-400">
                Rank: <strong className="text-white uppercase">{currentRankTitle}</strong>
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={currentLevel}
              aria-label="Helldiver current level slider"
              onChange={(e) => setCurrentLevel(Number(e.target.value))}
              className="w-full h-3 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[#FFE900]"
            />

            <div className="flex justify-between text-[11px] font-mono text-zinc-500">
              <span>Lv. 1 (Cadet)</span>
              <span>Lv. 10 (Sergeant)</span>
              <span>Lv. 25 (Chief)</span>
              <span>Lv. 50 (General)</span>
            </div>
          </div>

          <div className="md:col-span-4 bg-zinc-950/80 p-4 rounded-xl border border-zinc-800 flex flex-col justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase font-mono">
              Stratagem Arsenal Unlocked
            </span>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-white">
                {unlockedCount}
              </span>
              <span className="text-sm font-mono text-zinc-400">
                / {totalStratagems} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FFE900] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Top */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-4 flex items-center gap-3">
        <Search className="w-5 h-5 text-zinc-500 ml-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search stratagem: Railgun, 500KG, Autocannon, Shield..."
          className="w-full bg-transparent text-sm font-mono text-white placeholder-zinc-500 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-mono text-zinc-500 hover:text-white px-2 py-1 bg-zinc-950 rounded border border-zinc-800"
          >
            Clear
          </button>
        )}
      </div>

      {/* Main 3-Column Layout: Unlocked (Left) | Locked (Center) | Detail Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: UNLOCKED STRATAGEMS (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Unlock className="w-4 h-4 text-emerald-400" />
                Unlocked Stratagems ({unlockedList.length})
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Ready to Deploy
              </span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {unlockedList.map(strat => {
                const isSelected = strat.id === selectedStratagemId;
                return (
                  <div
                    key={strat.id}
                    onClick={() => setSelectedStratagemId(strat.id)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-zinc-900 border-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.15)] ring-1 ring-[#FFE900]'
                        : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-lg shrink-0">
                        {strat.iconSymbol}
                      </span>
                      <div>
                        <div className="text-xs font-black text-white group-hover:text-[#FFE900] transition">
                          {strat.name}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-2 mt-0.5">
                          <span>Lv. {strat.unlockLevel}</span>
                          <span className="text-emerald-400 font-bold">• {strat.category}</span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition ${isSelected ? 'text-[#FFE900] translate-x-1' : 'text-zinc-600'}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Column: LOCKED STRATAGEMS (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-rose-400" />
                Locked Stratagems ({lockedList.length})
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30">
                Future Unlocks
              </span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {lockedList.map(strat => {
                const isSelected = strat.id === selectedStratagemId;
                const levelsNeeded = strat.unlockLevel - currentLevel;
                return (
                  <div
                    key={strat.id}
                    onClick={() => setSelectedStratagemId(strat.id)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between group opacity-75 hover:opacity-100 ${
                      isSelected
                        ? 'bg-zinc-900 border-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.15)] ring-1 ring-[#FFE900] opacity-100'
                        : 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-lg shrink-0 grayscale opacity-60">
                        {strat.iconSymbol}
                      </span>
                      <div>
                        <div className="text-xs font-black text-zinc-300 group-hover:text-white transition">
                          {strat.name}
                        </div>
                        <div className="text-[10px] text-rose-400 font-mono mt-0.5 font-bold">
                          Level {strat.unlockLevel} needed (+{levelsNeeded} lvls)
                        </div>
                      </div>
                    </div>

                    <Lock className="w-3.5 h-3.5 text-zinc-600" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: DETAIL PANEL (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 shadow-2xl space-y-5 sticky top-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase font-bold text-[#FFE900]">
                Stratagem Intelligence Brief
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                selectedStratagem.unlockLevel <= currentLevel
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                  : 'bg-rose-950 text-rose-400 border border-rose-500/40'
              }`}>
                {selectedStratagem.unlockLevel <= currentLevel ? 'UNLOCKED' : `LOCKED (Lv. ${selectedStratagem.unlockLevel})`}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-3xl shrink-0 shadow-lg">
                {selectedStratagem.iconSymbol}
              </div>
              <div>
                <h3 className="text-lg font-black text-white">{selectedStratagem.name}</h3>
                <span className="text-xs font-mono text-zinc-400">
                  Category: <strong className="text-white">{selectedStratagem.category}</strong> • <span className="text-[#FFE900]">{selectedStratagem.metaRating}</span>
                </span>
              </div>
            </div>

            {/* Unlock Requirements Callout (If Locked) */}
            {unlockMetrics.isLocked ? (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 space-y-2">
                <div className="text-xs font-bold text-rose-300 uppercase font-mono flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  You need {unlockMetrics.levelsLeft} more level{unlockMetrics.levelsLeft > 1 ? 's' : ''} to unlock {selectedStratagem.name}
                </div>
                <div className="text-xs font-mono text-zinc-300">
                  Estimated missions required: <strong className="text-[#FFE900]">{unlockMetrics.missionsNeeded} Helldive missions</strong> (~{(unlockMetrics.missionsNeeded * 25 / 60).toFixed(1)} hours).
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-mono text-emerald-300 font-bold">
                  You have already unlocked this stratagem! Ready for deployment.
                </span>
              </div>
            )}

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">COOLDOWN</span>
                <span className="text-white font-bold">{selectedStratagem.cooldown}</span>
              </div>
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">UNLOCK REQUIREMENT</span>
                <span className="text-[#FFE900] font-bold">Level {selectedStratagem.unlockLevel}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-mono uppercase text-zinc-500 font-bold">Damage Output & Profile:</span>
              <p className="text-xs text-zinc-200 font-mono bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                {selectedStratagem.damage}
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-mono uppercase text-zinc-500 font-bold">Best Use Case:</span>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                {selectedStratagem.bestUseCase}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO FAQs with 20 Keywords as Requested */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 text-zinc-300 text-xs leading-relaxed">
        <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-[#FFE900]" />
          Helldivers 2 Stratagem Unlock Levels & FAQ (2026 Guide)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">What level is Railgun unlock level?</h5>
            <p className="text-zinc-400">
              The Railgun support weapon unlocks at <strong>Level 20</strong>, along with the Quasar Cannon, Orbital Napalm Barrage, and Patriot Exosuit.
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">What level is 500kg bomb unlock level?</h5>
            <p className="text-zinc-400">
              The Eagle 500KG Bomb unlocks at <strong>Level 10</strong>, paired with the Orbital Laser and Shield Generator Pack.
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">What level is Orbital Laser unlock level?</h5>
            <p className="text-zinc-400">
              The Orbital Laser unlocks at <strong>Level 10</strong>, making it one of the earliest high-tier boss-clearing stratagems available.
            </p>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-1">
            <h5 className="font-bold text-white text-xs">What level is Autocannon unlock level?</h5>
            <p className="text-zinc-400">
              The iconic AC-8 Autocannon unlocks early at <strong>Level 5</strong>, giving players reliable bug hole and fabricator destruction.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center text-zinc-500 font-mono text-[11px]">
          Helldivers 2 Stratagem Unlock Levels - What Level is Railgun 2026 • Verified Super Earth Logistics Hub
        </div>
      </div>
    </div>
  );
}
