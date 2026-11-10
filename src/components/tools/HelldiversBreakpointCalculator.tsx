/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Crosshair, Shield, Zap, Target, Share2, Copy, Check, Flame, 
  AlertTriangle, Info, Skull, Award, Gauge, Sparkles, TrendingUp
} from 'lucide-react';

interface WeaponData {
  id: string;
  name: string;
  damage: number;
  rpm: number;
  type: string;
  isPopular?: boolean;
  notes?: string;
}

interface EnemyData {
  id: string;
  name: string;
  faction: 'Terminids (Bugs)' | 'Automatons (Bots)';
  baseHp: number;
  weakSpotName: string;
  weakSpotMultiplier: number;
  armorClass: 'Light' | 'Medium' | 'Heavy' | 'Massive';
  tacticalTip: string;
}

interface DifficultyData {
  id: string;
  name: string;
  multiplier: number;
  levelBadge: string;
  color: string;
}

const WEAPONS: WeaponData[] = [
  // Trending & top-searched weapons first as requested
  { id: 'sickle', name: 'LAS-16 Sickle', damage: 55, rpm: 750, type: 'Energy Heat', isPopular: true, notes: 'Infinite ammo if cooled; ultra-high 750 RPM' },
  { id: 'dominator', name: 'JAR-5 Dominator', damage: 300, rpm: 250, type: 'Jet-Propelled Explosive', isPopular: true, notes: 'Staggers Devastators; massive 300 kinetic punch' },
  { id: 'eruptor', name: 'R-36 Eruptor', damage: 550, rpm: 25, type: 'Heavy Explosive Bolt-Action', isPopular: true, notes: '550 explosive payload; destroys bug holes & fabricators' },
  { id: 'scorcher', name: 'PLAS-1 Scorcher', damage: 250, rpm: 200, type: 'Plasma Explosive', isPopular: true, notes: 'Penetrates scout striders & hulk rear vents' },
  { id: 'breaker', name: 'SG-225 Breaker', damage: 400, rpm: 300, type: 'Full-Auto Shotgun', isPopular: true, notes: 'Burst champion with 400 point-blank damage' },
  { id: 'counter-sniper', name: 'R-63CS Diligence Counter Sniper', damage: 200, rpm: 350, type: 'Marksman DMR', isPopular: true, notes: 'One-taps Automaton Devastators in the skull' },
  { id: 'tenderizer', name: 'BR-14 Adjudicator / Tenderizer', damage: 95, rpm: 400, type: 'Heavy Assault Rifle', notes: '95 precision dmg; accurate burst tap-fire' },
  { id: 'punisher', name: 'SG-8 Punisher', damage: 405, rpm: 80, type: 'Pump Shotgun (8 Pellets)', notes: '405 total spread dmg + heavy knockback stagger' },
  { id: 'slugger', name: 'SG-8S Slugger', damage: 300, rpm: 80, type: 'Heavy Shotgun Slug', notes: '300 single-slug armor-piercing round' },
  { id: 'blitzer', name: 'ARC-12 Blitzer', damage: 250, rpm: 45, type: 'Arc Shotgun', notes: 'Infinite battery arc burst; chain lightning' },
  { id: 'liberator', name: 'AR-23 Liberator', damage: 70, rpm: 650, type: 'Standard Assault Rifle', notes: 'Reliable 70 dmg standard-issue workhorse' },
  { id: 'liberator-concussive', name: 'AR-23C Liberator Concussive', damage: 65, rpm: 320, type: 'Concussive Stun Rifle', notes: 'Stuns enemies backwards at 320 RPM' },
  { id: 'diligence', name: 'R-63 Diligence', damage: 125, rpm: 350, type: 'Standard Marksman DMR', notes: 'Clean 125 dmg semi-auto DMR' },
  { id: 'spray-pray', name: 'SG-225SP Breaker Spray & Pray', damage: 48, rpm: 320, type: 'Drum Shotgun (Per Pellet)', notes: 'Clear swarms of hunters and scavengers' },
];

const ENEMIES: EnemyData[] = [
  { 
    id: 'bile-titan', 
    name: 'Bile Titan', 
    faction: 'Terminids (Bugs)', 
    baseHp: 2500, 
    weakSpotName: 'Exposed Head / Open Mouth', 
    weakSpotMultiplier: 1.5, 
    armorClass: 'Massive',
    tacticalTip: 'Aim directly for the forehead or mouth while it begins its green bile spit animation.'
  },
  { 
    id: 'charger', 
    name: 'Charger / Behemoth', 
    faction: 'Terminids (Bugs)', 
    baseHp: 1200, 
    weakSpotName: 'Stripped Leg Joint', 
    weakSpotMultiplier: 2.0, 
    armorClass: 'Heavy',
    tacticalTip: 'Dodge the charge, strip leg chitin, then focus fire the exposed orange leg flesh for 200% dmg.'
  },
  { 
    id: 'hulk', 
    name: 'Hulk Bruiser / Scorcher', 
    faction: 'Automatons (Bots)', 
    baseHp: 1500, 
    weakSpotName: 'Glowing Red Eye Visor', 
    weakSpotMultiplier: 2.0, 
    armorClass: 'Heavy',
    tacticalTip: 'A single high-damage shot from Counter Sniper or Dominator to the red visor triggers an instant kill.'
  },
  { 
    id: 'factory-strider', 
    name: 'Factory Strider', 
    faction: 'Automatons (Bots)', 
    baseHp: 2500, 
    weakSpotName: 'Belly Hatch / Underbelly Doors', 
    weakSpotMultiplier: 2.0, 
    armorClass: 'Massive',
    tacticalTip: 'Rush beneath while the twin chin-gatlings are disabled and mag-dump into the open underbelly bays.'
  },
  { 
    id: 'devastator', 
    name: 'Devastator (Rocket / Heavy / Shield)', 
    faction: 'Automatons (Bots)', 
    baseHp: 350, 
    weakSpotName: 'Unarmored Red Head', 
    weakSpotMultiplier: 2.0, 
    armorClass: 'Medium',
    tacticalTip: 'Always aim for the tiny skull head. Head HP is capped at 125 HP for an instant one-tap.'
  },
  { 
    id: 'berserker', 
    name: 'Berserker (Dual Chainsaws)', 
    faction: 'Automatons (Bots)', 
    baseHp: 500, 
    weakSpotName: 'Glowing Red Abdomen / Head', 
    weakSpotMultiplier: 1.5, 
    armorClass: 'Medium',
    tacticalTip: 'Berserkers possess huge torso health pool; aim for the glowing red midsection wire joint.'
  },
  { 
    id: 'brood-commander', 
    name: 'Brood Commander', 
    faction: 'Terminids (Bugs)', 
    baseHp: 800, 
    weakSpotName: 'Chitin Head Plate', 
    weakSpotMultiplier: 1.5, 
    armorClass: 'Medium',
    tacticalTip: 'Decapitation triggers a 3-second death frenzy. Keep backing up until it collapses.'
  },
  { 
    id: 'bile-spewer', 
    name: 'Bile Spewer / Nursing Spewer', 
    faction: 'Terminids (Bugs)', 
    baseHp: 600, 
    weakSpotName: 'Swollen Acid Sac (Back)', 
    weakSpotMultiplier: 1.5, 
    armorClass: 'Medium',
    tacticalTip: 'Explosive weapons like Scorcher and Eruptor deal double internal splash damage to the bulbous green sac.'
  },
];

const DIFFICULTIES: DifficultyData[] = [
  { id: 'easy', name: 'Trivial - Easy (1-3)', multiplier: 1.0, levelBadge: '1.0x Base HP', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { id: 'medium', name: 'Medium - Challenging (4-5)', multiplier: 1.1, levelBadge: '1.1x Scaling', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
  { id: 'hard', name: 'Hard - Suicide Mission (6-7)', multiplier: 1.25, levelBadge: '1.25x Elite', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { id: 'helldive', name: 'Impossible - Helldive 9/10', multiplier: 1.5, levelBadge: '1.5x Helldive', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
];

export default function HelldiversBreakpointCalculator() {
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>('sickle');
  const [selectedEnemyId, setSelectedEnemyId] = useState<string>('hulk');
  const [selectedDifficultyId, setSelectedDifficultyId] = useState<string>('helldive');
  const [targetHitZone, setTargetHitZone] = useState<'weakspot' | 'body'>('weakspot');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const selectedWeapon = useMemo(() => {
    return WEAPONS.find(w => w.id === selectedWeaponId) || WEAPONS[0];
  }, [selectedWeaponId]);

  const selectedEnemy = useMemo(() => {
    return ENEMIES.find(e => e.id === selectedEnemyId) || ENEMIES[0];
  }, [selectedEnemyId]);

  const selectedDifficulty = useMemo(() => {
    return DIFFICULTIES.find(d => d.id === selectedDifficultyId) || DIFFICULTIES[3];
  }, [selectedDifficultyId]);

  // Scaled Effective HP
  const effectiveEnemyHp = Math.round(selectedEnemy.baseHp * selectedDifficulty.multiplier);

  // Body Shots to Kill
  const bodyDamagePerShot = selectedWeapon.damage;
  const bodyShotsToKill = Math.ceil(effectiveEnemyHp / bodyDamagePerShot);

  // Weak Spot Shots to Kill
  const weakSpotDamagePerShot = selectedWeapon.damage * selectedEnemy.weakSpotMultiplier;
  const weakSpotShotsToKill = Math.ceil(effectiveEnemyHp / weakSpotDamagePerShot);

  // Active shots based on current Weak Spot Toggle
  const activeShots = targetHitZone === 'weakspot' ? weakSpotShotsToKill : bodyShotsToKill;
  const activeDamagePerShot = targetHitZone === 'weakspot' ? weakSpotDamagePerShot : bodyDamagePerShot;

  // Time to Kill (TTK) calculation in seconds
  // TTK = (Shots - 1) / (RPM / 60)
  const calculateTtk = (shots: number, rpm: number): string => {
    if (shots <= 1) return '0.00s (Instant)';
    const shotsPerSecond = rpm / 60;
    const timeInSeconds = (shots - 1) / shotsPerSecond;
    return `${timeInSeconds.toFixed(2)}s`;
  };

  const bodyTtk = calculateTtk(bodyShotsToKill, selectedWeapon.rpm);
  const weakSpotTtk = calculateTtk(weakSpotShotsToKill, selectedWeapon.rpm);
  const activeTtk = targetHitZone === 'weakspot' ? weakSpotTtk : bodyTtk;

  // Shots saved by hitting weak spot
  const shotsSaved = Math.max(0, bodyShotsToKill - weakSpotShotsToKill);
  const ammoEfficiencyGain = Math.round(((bodyShotsToKill - weakSpotShotsToKill) / bodyShotsToKill) * 100);

  // Share text handler (Clean, professional formatting without old emojis)
  const shareText = `[Helldivers 2 Combat Breakpoint]
Weapon: ${selectedWeapon.name}
Target: ${selectedEnemy.name} (${selectedDifficulty.name})
- Weak Spot (${selectedEnemy.weakSpotName}): ${weakSpotShotsToKill} shots (TTK: ${weakSpotTtk})
- Body Shots: ${bodyShotsToKill} shots (TTK: ${bodyTtk})
- Advantage: Saves ${shotsSaved} shots (${ammoEfficiencyGain}% ammo efficiency)
Calculate on GamingToolsHub: https://gamingtoolshub.com/tools/helldivers-2-damage-calculator`;

  const handleCopyShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Helldivers Operational Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border-l-4 border-amber-400 bg-[#0c101a] p-4 sm:p-5 rounded-r-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center font-black text-lg shadow-lg shadow-amber-500/20">
            <Crosshair className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase">Super Earth Tactical Command</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">Patch 01.000.400+</span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-white">Ballistics, Breakpoints & TTK Simulation Engine</h2>
          </div>
        </div>

        <button
          onClick={() => setShowShareModal(true)}
          className="w-full sm:w-auto px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Breakpoint Card</span>
        </button>
      </div>

      {/* Main Interactive Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dropdown 1: Select Weapon */}
        <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-bold">
            <Crosshair className="w-3.5 h-3.5" />
            <span>1. Primary Weapon</span>
          </label>
          <select
            value={selectedWeaponId}
            onChange={(e) => setSelectedWeaponId(e.target.value)}
            className="w-full bg-[#080c14] border border-slate-700 hover:border-amber-400/70 focus:border-amber-400 rounded-xl px-3.5 py-3 text-sm text-white font-medium outline-none transition-colors cursor-pointer"
          >
            <optgroup label="⭐ Trending & High Search Volume (Top Meta)">
              {WEAPONS.filter(w => w.isPopular).map(w => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.damage} dmg • {w.rpm} RPM)
                </option>
              ))}
            </optgroup>
            <optgroup label="Assault Rifles, Shotguns & DMRs">
              {WEAPONS.filter(w => !w.isPopular).map(w => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.damage} dmg • {w.rpm} RPM)
                </option>
              ))}
            </optgroup>
          </select>
          <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Class: <strong className="text-slate-200">{selectedWeapon.type}</strong></span>
            <span>Rate: <strong className="text-amber-400">{selectedWeapon.rpm} RPM</strong></span>
          </div>
        </div>

        {/* Dropdown 2: Select Enemy */}
        <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-bold">
            <Skull className="w-3.5 h-3.5" />
            <span>2. Target Enemy</span>
          </label>
          <select
            value={selectedEnemyId}
            onChange={(e) => setSelectedEnemyId(e.target.value)}
            className="w-full bg-[#080c14] border border-slate-700 hover:border-amber-400/70 focus:border-amber-400 rounded-xl px-3.5 py-3 text-sm text-white font-medium outline-none transition-colors cursor-pointer"
          >
            <optgroup label="Terminids (Bugs)">
              {ENEMIES.filter(e => e.faction.includes('Terminids')).map(e => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.baseHp} Base HP)
                </option>
              ))}
            </optgroup>
            <optgroup label="Automatons (Bots)">
              {ENEMIES.filter(e => e.faction.includes('Automatons')).map(e => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.baseHp} Base HP)
                </option>
              ))}
            </optgroup>
          </select>
          <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Armor: <strong className="text-rose-400">{selectedEnemy.armorClass}</strong></span>
            <span>Weak: <strong className="text-amber-400">{selectedEnemy.weakSpotMultiplier}x ({selectedEnemy.weakSpotName})</strong></span>
          </div>
        </div>

        {/* Dropdown 3: Select Difficulty */}
        <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>3. Mission Difficulty</span>
          </label>
          <select
            value={selectedDifficultyId}
            onChange={(e) => setSelectedDifficultyId(e.target.value)}
            className="w-full bg-[#080c14] border border-slate-700 hover:border-amber-400/70 focus:border-amber-400 rounded-xl px-3.5 py-3 text-sm text-white font-medium outline-none transition-colors cursor-pointer"
          >
            {DIFFICULTIES.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.levelBadge})
              </option>
            ))}
          </select>
          <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Scaled HP: <strong className="text-white">{effectiveEnemyHp} HP</strong></span>
            <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${selectedDifficulty.color}`}>
              {selectedDifficulty.levelBadge}
            </span>
          </div>
        </div>
      </div>

      {/* FEATURE 1: WEAK SPOT TOGGLE (BODY VS WEAK SPOT) */}
      <div className="bg-[#0b0f19] border border-amber-500/20 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Target Hit Zone Comparison (Body vs. Weak Spot)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Toggle between body shots and precision weak spot shots to measure TTK and ammo savings.</p>
          </div>

          <div className="flex bg-[#070a12] p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setTargetHitZone('weakspot')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                targetHitZone === 'weakspot'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Weak Spot ({selectedEnemy.weakSpotMultiplier}x)</span>
            </button>
            <button
              onClick={() => setTargetHitZone('body')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                targetHitZone === 'body'
                  ? 'bg-slate-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Body Armor (1.0x)</span>
            </button>
          </div>
        </div>

        {/* Comparative Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
          <div className={`p-3 rounded-xl border transition-all ${targetHitZone === 'weakspot' ? 'bg-amber-950/20 border-amber-500/40' : 'bg-[#080c14] border-slate-800'}`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-amber-300 font-bold flex items-center gap-1.5">
                <Target className="w-3 h-3 text-amber-400" />
                <span>Weak Spot: {selectedEnemy.weakSpotName}</span>
              </span>
              <span className="text-xs font-extrabold text-amber-400 font-mono">{weakSpotShotsToKill} Shots</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex justify-between font-mono">
              <span>Time: <strong className="text-slate-200">{weakSpotTtk}</strong></span>
              <span>Dmg/Shot: <strong className="text-amber-400">{weakSpotDamagePerShot}</strong></span>
            </div>
          </div>

          <div className={`p-3 rounded-xl border transition-all ${targetHitZone === 'body' ? 'bg-slate-800/40 border-slate-600' : 'bg-[#080c14] border-slate-800'}`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-300 font-bold flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-slate-400" />
                <span>Main Torso / Body Armor</span>
              </span>
              <span className="text-xs font-extrabold text-slate-200 font-mono">{bodyShotsToKill} Shots</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex justify-between font-mono">
              <span>Time: <strong className="text-slate-200">{bodyTtk}</strong></span>
              <span>Dmg/Shot: <strong className="text-slate-200">{bodyDamagePerShot}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE 2: BIG NUMBERS OUTPUT PANEL */}
      <div className="bg-gradient-to-b from-[#121829] to-[#0a0e1a] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-amber-500/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
              Confirmed Breakpoint Results
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white">
              {selectedWeapon.name} <span className="text-slate-500 font-normal">vs</span> {selectedEnemy.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono bg-[#080c14] px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
            <span>Target Zone:</span>
            <strong className={targetHitZone === 'weakspot' ? 'text-amber-400' : 'text-slate-200'}>
              {targetHitZone === 'weakspot' ? selectedEnemy.weakSpotName : 'Main Torso / Body'}
            </strong>
          </div>
        </div>

        {/* 3 Major Output Big Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Shots to Kill */}
          <div className="bg-[#070a12] border border-amber-500/30 rounded-2xl p-5 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1 font-semibold">
              Shots to Kill (STK)
            </span>
            <div className="text-4xl sm:text-6xl font-black text-amber-400 font-mono tracking-tight my-2">
              {activeShots}
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {targetHitZone === 'weakspot' ? 'Precision Weak Spot' : 'Standard Body Hits'}
            </p>
          </div>

          {/* Card 2: Time to Kill */}
          <div className="bg-[#070a12] border border-cyan-500/30 rounded-2xl p-5 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-500"></div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1 font-semibold">
              Time to Kill (TTK)
            </span>
            <div className="text-4xl sm:text-6xl font-black text-cyan-400 font-mono tracking-tight my-2">
              {activeTtk}
            </div>
            <p className="text-xs text-slate-400 font-mono">
              at {selectedWeapon.rpm} RPM cyclic rate
            </p>
          </div>

          {/* Card 3: Ammo & Shots Saved */}
          <div className="bg-[#070a12] border border-emerald-500/30 rounded-2xl p-5 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500"></div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1 font-semibold">
              Shots Saved By Weakspot
            </span>
            <div className="text-4xl sm:text-6xl font-black text-emerald-400 font-mono tracking-tight my-2">
              +{shotsSaved}
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {ammoEfficiencyGain}% ammo efficiency gain
            </p>
          </div>
        </div>

        {/* Tactical Intel Box */}
        <div className="bg-[#070a12] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Combat Tactical Tip:</span>
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedEnemy.tacticalTip}
            </p>
          </div>

          <button
            onClick={handleCopyShare}
            className="w-full sm:w-auto px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-amber-400 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied to Clipboard!' : 'Copy Breakpoint Stats'}</span>
          </button>
        </div>
      </div>

      {/* FEATURE 3: SHARE IMAGE & REDDIT BREAKPOINT CARD MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-400 text-black flex items-center justify-center font-black text-sm">Ж</span>
                <h3 className="text-base font-extrabold text-white">Share Your Breakpoint Card</h3>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Visual Card Preview to screenshot for Reddit / Discord */}
            <div 
              ref={shareCardRef}
              className="bg-gradient-to-br from-[#101726] to-[#070a12] border-2 border-amber-400 rounded-2xl p-5 space-y-4 text-left shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">Helldivers 2 Tactical Combat Breakpoint</span>
                <span className="text-[10px] font-mono text-slate-400">GamingToolsHub.com</span>
              </div>

              <div>
                <div className="text-xs text-slate-400 font-mono">WEAPON LOADOUT:</div>
                <div className="text-base font-extrabold text-white">{selectedWeapon.name} ({selectedWeapon.damage} dmg • {selectedWeapon.rpm} RPM)</div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-[#05070d] p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">TARGET:</span>
                  <span className="text-sm font-bold text-amber-400">{selectedEnemy.name}</span>
                  <span className="text-[11px] text-slate-400 block font-mono">({effectiveEnemyHp} Scaled HP)</span>
                </div>

                <div className="bg-[#05070d] p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">DIFFICULTY:</span>
                  <span className="text-sm font-bold text-white">{selectedDifficulty.name}</span>
                  <span className="text-[11px] text-amber-400 block font-mono">{selectedDifficulty.levelBadge}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800/80">
                <div className="bg-amber-950/20 border border-amber-500/40 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-mono text-amber-300 uppercase block font-bold flex items-center justify-center gap-1">
                    <Target className="w-3 h-3 text-amber-400" />
                    <span>Weak Spot STK</span>
                  </span>
                  <span className="text-2xl font-black text-amber-400 font-mono">{weakSpotShotsToKill} Shots</span>
                  <span className="text-[10px] text-slate-400 block font-mono">TTK: {weakSpotTtk}</span>
                </div>

                <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-mono text-slate-300 uppercase block font-bold flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3 text-slate-400" />
                    <span>Body Shots STK</span>
                  </span>
                  <span className="text-2xl font-black text-slate-200 font-mono">{bodyShotsToKill} Shots</span>
                  <span className="text-[10px] text-slate-400 block font-mono">TTK: {bodyTtk}</span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-emerald-400 text-center bg-emerald-950/20 p-2 rounded-lg border border-emerald-500/30 flex items-center justify-center gap-1.5">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>Hitting {selectedEnemy.weakSpotName} saves {shotsSaved} shots ({ammoEfficiencyGain}% ammo conserved)</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-400 text-center">
                Copy the formatted text below or take a screenshot to share with your Helldivers squad on Reddit (r/Helldivers) or Discord:
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyShare}
                  className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Copied to Clipboard!' : 'Copy Reddit / Discord Post Text'}</span>
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breakpoint Weapon Matrix Table */}
      <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Full Primary Weapons Breakpoint Matrix vs {selectedEnemy.name}</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">At {selectedDifficulty.name}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                <th className="py-2.5 px-3">Weapon</th>
                <th className="py-2.5 px-3">Damage</th>
                <th className="py-2.5 px-3">Fire Rate</th>
                <th className="py-2.5 px-3 text-amber-400">Weak Spot STK</th>
                <th className="py-2.5 px-3 text-slate-300">Body STK</th>
                <th className="py-2.5 px-3 text-cyan-400">Weak Spot TTK</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {WEAPONS.map(weapon => {
                const wWeakDmg = weapon.damage * selectedEnemy.weakSpotMultiplier;
                const wWeakShots = Math.ceil(effectiveEnemyHp / wWeakDmg);
                const wBodyShots = Math.ceil(effectiveEnemyHp / weapon.damage);
                const wWeakTtk = calculateTtk(wWeakShots, weapon.rpm);
                const isCurrent = weapon.id === selectedWeaponId;

                return (
                  <tr 
                    key={weapon.id} 
                    className={`transition-colors hover:bg-slate-800/40 ${isCurrent ? 'bg-amber-400/10' : ''}`}
                  >
                    <td className="py-2.5 px-3 font-sans font-bold text-white flex items-center gap-2">
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                      <span>{weapon.name}</span>
                      {weapon.isPopular && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">Meta</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">{weapon.damage}</td>
                    <td className="py-2.5 px-3 text-slate-400">{weapon.rpm} RPM</td>
                    <td className="py-2.5 px-3 font-bold text-amber-400">{wWeakShots} shots</td>
                    <td className="py-2.5 px-3 text-slate-400">{wBodyShots} shots</td>
                    <td className="py-2.5 px-3 text-cyan-400 font-semibold">{wWeakTtk}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedWeaponId(weapon.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          isCurrent 
                            ? 'bg-amber-400 text-black' 
                            : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                        }`}
                      >
                        {isCurrent ? 'Selected' : 'Compare'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
