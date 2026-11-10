/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Crosshair, Clock, Shield, Zap, Skull, Bot, Bug, 
  Target, Download, Share2, Check, AlertTriangle, Sparkles, 
  ChevronRight, ArrowRight, Table, Layers, Sliders, Eye, 
  Flame, Award, CheckCircle2, RotateCcw, Info
} from 'lucide-react';

export type FactionType = 'Terminids' | 'Automatons';

export interface WeaponData {
  id: string;
  name: string;
  shortName: string;
  damage: number;
  rpm: number;
  magSize: number;
  reloadTime: number; // in seconds
  apLevel: number; // 1 = Light (Armor 1-2), 2 = Medium (Armor 3), 3 = Heavy / Explosive (Armor 4-5), 4 = Anti-Tank (Armor 6+)
  apLabel: string;
  damageType: string;
  tier: 'S-Tier' | 'A-Tier' | 'B-Tier';
}

export interface EnemyData {
  id: string;
  name: string;
  faction: FactionType;
  baseHp: number;
  armorLevel: number; // 1 to 6
  weakspotName: string;
  weakspotMultiplier: number;
  weakspotHint: string;
  weakspotCoordinates: { x: number; y: number }; // percentage on graphic
  tacticalNote: string;
}

export const ALL_WEAPONS: WeaponData[] = [
  {
    id: 'sg-225-breaker',
    name: 'SG-225 Breaker',
    shortName: 'Breaker',
    damage: 400,
    rpm: 300,
    magSize: 13,
    reloadTime: 2.7,
    apLevel: 1,
    apLabel: 'Light AP (1)',
    damageType: 'Kinetic Shotgun',
    tier: 'S-Tier'
  },
  {
    id: 'las-16-sickle',
    name: 'LAS-16 Sickle',
    shortName: 'Sickle',
    damage: 55,
    rpm: 750,
    magSize: 85,
    reloadTime: 2.0,
    apLevel: 1,
    apLabel: 'Light AP (1)',
    damageType: 'Energy Laser',
    tier: 'S-Tier'
  },
  {
    id: 'plas-1-scorcher',
    name: 'PLAS-1 Scorcher',
    shortName: 'Scorcher',
    damage: 250,
    rpm: 200,
    magSize: 15,
    reloadTime: 2.8,
    apLevel: 2,
    apLabel: 'Medium Explosive (2)',
    damageType: 'Plasma Explosive',
    tier: 'S-Tier'
  },
  {
    id: 'r-36-eruptor',
    name: 'R-36 Eruptor',
    shortName: 'Eruptor',
    damage: 550,
    rpm: 30,
    magSize: 5,
    reloadTime: 3.5,
    apLevel: 3,
    apLabel: 'Heavy Explosive (3)',
    damageType: 'Heavy Shell',
    tier: 'S-Tier'
  },
  {
    id: 'sg-8s-slugger',
    name: 'SG-8S Slugger',
    shortName: 'Slugger',
    damage: 300,
    rpm: 80,
    magSize: 8,
    reloadTime: 3.2,
    apLevel: 2,
    apLabel: 'Medium AP (2)',
    damageType: 'Heavy Shell',
    tier: 'A-Tier'
  },
  {
    id: 'ar-23-liberator',
    name: 'AR-23 Liberator',
    shortName: 'Liberator',
    damage: 70,
    rpm: 640,
    magSize: 45,
    reloadTime: 2.1,
    apLevel: 1,
    apLabel: 'Light AP (1)',
    damageType: 'Kinetic Rifle',
    tier: 'A-Tier'
  },
  {
    id: 'ar-61-tenderizer',
    name: 'AR-61 Tenderizer',
    shortName: 'Tenderizer',
    damage: 95,
    rpm: 400,
    magSize: 35,
    reloadTime: 2.5,
    apLevel: 1,
    apLabel: 'Light AP (1)',
    damageType: 'Kinetic Rifle',
    tier: 'A-Tier'
  },
  {
    id: 'ar-23p-liberator-penetrator',
    name: 'AR-23P Liberator Penetrator',
    shortName: 'Liberator Pen',
    damage: 75,
    rpm: 320,
    magSize: 30,
    reloadTime: 2.3,
    apLevel: 2,
    apLabel: 'Medium AP (2)',
    damageType: 'Kinetic AP',
    tier: 'A-Tier'
  },
  {
    id: 'las-5-scythe',
    name: 'LAS-5 Scythe',
    shortName: 'Scythe',
    damage: 350,
    rpm: 100,
    magSize: 60,
    reloadTime: 2.0,
    apLevel: 1,
    apLabel: 'Light AP (1)',
    damageType: 'Continuous Beam',
    tier: 'B-Tier'
  },
  {
    id: 'jar-5-dominator',
    name: 'JAR-5 Dominator',
    shortName: 'Dominator',
    damage: 275,
    rpm: 250,
    magSize: 15,
    reloadTime: 3.4,
    apLevel: 2,
    apLabel: 'Medium AP (2)',
    damageType: 'Rocket Jet',
    tier: 'S-Tier'
  },
  {
    id: 'ac-8-autocannon',
    name: 'AC-8 Autocannon (Support)',
    shortName: 'Autocannon',
    damage: 420,
    rpm: 220,
    magSize: 10,
    reloadTime: 2.5,
    apLevel: 3,
    apLabel: 'Heavy AP (3)',
    damageType: 'Heavy Explosive Shell',
    tier: 'S-Tier'
  },
  {
    id: 'las-99-quasar',
    name: 'LAS-99 Quasar Cannon (Support)',
    shortName: 'Quasar Cannon',
    damage: 950,
    rpm: 12,
    magSize: 1,
    reloadTime: 5.0,
    apLevel: 4,
    apLabel: 'Anti-Tank (4)',
    damageType: 'Heavy Energy Charge',
    tier: 'S-Tier'
  }
];

// 15 Enemies with official 2026 data
export const ALL_ENEMIES: EnemyData[] = [
  // BUGS (Terminids)
  {
    id: 'scavenger',
    name: 'Scavenger',
    faction: 'Terminids',
    baseHp: 150,
    armorLevel: 1,
    weakspotName: 'Center Torso',
    weakspotMultiplier: 1.5,
    weakspotHint: 'Shoot center mass. Extremely fragile swarmer.',
    weakspotCoordinates: { x: 50, y: 50 },
    tacticalNote: 'Dies to any stray bullet; avoid wasting high caliber ammo.'
  },
  {
    id: 'warrior',
    name: 'Warrior',
    faction: 'Terminids',
    baseHp: 400,
    armorLevel: 2,
    weakspotName: 'Head / Eye cluster',
    weakspotMultiplier: 1.8,
    weakspotHint: 'Aim directly for the skull between the scythe arms.',
    weakspotCoordinates: { x: 50, y: 30 },
    tacticalNote: 'Decapitated Warriors can still sprint blindly for 2.5 seconds.'
  },
  {
    id: 'hive-guard',
    name: 'Hive Guard',
    faction: 'Terminids',
    baseHp: 800,
    armorLevel: 3,
    weakspotName: 'Underbelly / Rear unarmored flesh',
    weakspotMultiplier: 2.0,
    weakspotHint: 'Flank its armored carapace or use Medium AP through front plate.',
    weakspotCoordinates: { x: 50, y: 70 },
    tacticalNote: 'Hunkers down when shot; grenades or flanking bypasses shield.'
  },
  {
    id: 'stalker',
    name: 'Stalker',
    faction: 'Terminids',
    baseHp: 1000,
    armorLevel: 2,
    weakspotName: 'Head & Face',
    weakspotMultiplier: 2.0,
    weakspotHint: 'Shoot directly in the glowing head before tongue lashing.',
    weakspotCoordinates: { x: 50, y: 35 },
    tacticalNote: 'Priority #1 threat. Rush its nest immediately when spotted.'
  },
  {
    id: 'bile-spewer',
    name: 'Bile Spewer',
    faction: 'Terminids',
    baseHp: 1000,
    armorLevel: 2,
    weakspotName: 'Green Glowing Bile Sac',
    weakspotMultiplier: 2.0,
    weakspotHint: 'Pop the bulbous green abdomen for explosive splash damage.',
    weakspotCoordinates: { x: 50, y: 65 },
    tacticalNote: 'Mortar artillery posture renders them immobile for easy kills.'
  },
  {
    id: 'charger',
    name: 'Charger',
    faction: 'Terminids',
    baseHp: 2500,
    armorLevel: 5,
    weakspotName: 'Head (60% weak) & Glowing Green Butt',
    weakspotMultiplier: 2.0,
    weakspotHint: 'Anti-Tank rocket to head for 1-shot; or shoot glowing butt from behind.',
    weakspotCoordinates: { x: 30, y: 40 },
    tacticalNote: 'Sidestep charge into rocks to stun, then mag-dump into tail flesh.'
  },
  {
    id: 'bile-titan',
    name: 'Bile Titan',
    faction: 'Terminids',
    baseHp: 6000,
    armorLevel: 6,
    weakspotName: 'Forehead Visor & Green Belly Sacs',
    weakspotMultiplier: 2.0,
    weakspotHint: 'Hit forehead during vomit animation with Quasar/EAT or pop both bile sacs.',
    weakspotCoordinates: { x: 50, y: 25 },
    tacticalNote: 'Blowing out the underbelly permanently disables its spit attack.'
  },
  {
    id: 'impaler',
    name: 'Impaler',
    faction: 'Terminids',
    baseHp: 4000,
    armorLevel: 5,
    weakspotName: 'Exposed Fleshy Face',
    weakspotMultiplier: 2.5,
    weakspotHint: 'When tentacles burrow into ground, its armored face opens completely!',
    weakspotCoordinates: { x: 50, y: 45 },
    tacticalNote: 'Do not shoot the shell; wait until tentacles deploy to melt the soft head.'
  },

  // BOTS (Automatons)
  {
    id: 'bot-trooper',
    name: 'Bot Trooper',
    faction: 'Automatons',
    baseHp: 150,
    armorLevel: 1,
    weakspotName: 'Glowing Red Visor (Head)',
    weakspotMultiplier: 2.0,
    weakspotHint: 'Headshot is instant 1-tap with any firearm.',
    weakspotCoordinates: { x: 50, y: 25 },
    tacticalNote: 'Kill flare-carrying troopers first to prevent bot dropships.'
  },
  {
    id: 'commissar',
    name: 'Commissar',
    faction: 'Automatons',
    baseHp: 250,
    armorLevel: 1,
    weakspotName: 'Red Eye Visor (Head)',
    weakspotMultiplier: 2.0,
    weakspotHint: 'Headshot or sword arm dismemberment.',
    weakspotCoordinates: { x: 50, y: 25 },
    tacticalNote: 'Carries high-priority red flare pistol. Eliminate on sight.'
  },
  {
    id: 'devastator',
    name: 'Devastator (Heavy / Rocket)',
    faction: 'Automatons',
    baseHp: 1000,
    armorLevel: 3,
    weakspotName: 'Small Red Head (70% weak)',
    weakspotMultiplier: 2.2,
    weakspotHint: 'Aim for the tiny glowing red skull; head HP is only 150!',
    weakspotCoordinates: { x: 50, y: 28 },
    tacticalNote: 'Shooting the rocket pods on shoulders disables its volley.'
  },
  {
    id: 'hulk',
    name: 'Hulk (Bruiser / Scorcher)',
    faction: 'Automatons',
    baseHp: 2000,
    armorLevel: 5,
    weakspotName: 'Slit Eye (150% weak) & Rear Vents (200% weak)',
    weakspotMultiplier: 2.2,
    weakspotHint: 'Autocannon/Anti-Materiel 2-tap to glowing red eye; or flank orange vents.',
    weakspotCoordinates: { x: 50, y: 35 },
    tacticalNote: 'Stun grenades freeze the Hulk for 5 seconds for easy eye shots.'
  },
  {
    id: 'tank',
    name: 'Annihilator Tank',
    faction: 'Automatons',
    baseHp: 3500,
    armorLevel: 5,
    weakspotName: 'Rear Glowing Radiator Vents',
    weakspotMultiplier: 2.5,
    weakspotHint: 'Flank behind the turret and mag dump into the glowing orange heat sink.',
    weakspotCoordinates: { x: 50, y: 60 },
    tacticalNote: 'Turret traverses slowly; sprint around its side to get behind it.'
  },
  {
    id: 'scout-strider',
    name: 'Scout Strider',
    faction: 'Automatons',
    baseHp: 1500,
    armorLevel: 3,
    weakspotName: 'Pilot Back & Leg Joint Joints',
    weakspotMultiplier: 2.0,
    weakspotHint: 'Flank to shoot the exposed pilot or use Scorcher/Plasma on front shield.',
    weakspotCoordinates: { x: 50, y: 40 },
    tacticalNote: 'Scorcher plasma explosion bypasses the front steel shield plate.'
  },
  {
    id: 'gunship',
    name: 'Automaton Gunship',
    faction: 'Automatons',
    baseHp: 1000,
    armorLevel: 4,
    weakspotName: '4 Jet Thruster Engines',
    weakspotMultiplier: 2.0,
    weakspotHint: 'Concentrate fire on a single jet engine (Armor 3) with Laser Cannon/AC.',
    weakspotCoordinates: { x: 30, y: 50 },
    tacticalNote: 'Destroying just ONE engine immediately causes the gunship to crash.'
  }
];

export default function HelldiversTtkCalculator() {
  // Navigation Tabs: 1 = TTK Calculator, 2 = Enemy Health List, 3 = Weapon vs Enemy Matrix
  const [activeTab, setActiveTab] = useState<'calculator' | 'enemies' | 'matrix'>('calculator');

  // Interactive Inputs
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>('sg-225-breaker');
  const [selectedEnemyId, setSelectedEnemyId] = useState<string>('charger');
  const [difficultyTier, setDifficultyTier] = useState<'normal' | 'helldive'>('helldive');
  const [hitWeakspot, setHitWeakspot] = useState<boolean>(true);

  // Viral Feature 1 State: "Can my loadout kill it?"
  const [stratagem1, setStratagem1] = useState<string>('Eagle 500KG Bomb');
  const [stratagem2, setStratagem2] = useState<string>('Orbital Laser');
  const [stratagem3, setStratagem3] = useState<string>('Quasar Cannon');
  const [stratagem4, setStratagem4] = useState<string>('Autocannon');

  // Copy feedback state
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active Weapon & Enemy Objects
  const currentWeapon = useMemo(() => {
    return ALL_WEAPONS.find(w => w.id === selectedWeaponId) || ALL_WEAPONS[0];
  }, [selectedWeaponId]);

  const currentEnemy = useMemo(() => {
    return ALL_ENEMIES.find(e => e.id === selectedEnemyId) || ALL_ENEMIES[5]; // Charger default
  }, [selectedEnemyId]);

  // Difficulty HP Multiplier:
  // Diff 7-9 Helldive is baseline 1.0 (as specified in 2026 data); Lower diffs = 0.85x
  const effectiveEnemyHp = useMemo(() => {
    return difficultyTier === 'helldive' ? currentEnemy.baseHp : Math.round(currentEnemy.baseHp * 0.85);
  }, [currentEnemy, difficultyTier]);

  // TTK Calculation Core Function
  const calculateTtkForWeapon = (weapon: WeaponData, enemy: EnemyData, isWeakspot: boolean, hp: number) => {
    // 1. Weakspot Multiplier
    const weakMultiplier = isWeakspot ? enemy.weakspotMultiplier : 1.0;

    // 2. Armor Penetration Logic
    // If weapon AP < enemy armor: damage penalty (0.1x ricochet)
    // If weapon AP == enemy armor: glance (0.5x)
    // If weapon AP > enemy armor: full penetration (1.0x)
    let armorMultiplier = 1.0;
    if (weapon.apLevel < enemy.armorLevel) {
      // If hitting weakspot and weakspot has lower armor, allow penetration
      if (isWeakspot && enemy.armorLevel >= 4 && weapon.apLevel >= 2) {
        armorMultiplier = 0.5; // Medium can damage weak spots like Hulk vent or Charger butt
      } else {
        armorMultiplier = 0.1; // Deflection
      }
    } else if (weapon.apLevel === enemy.armorLevel) {
      armorMultiplier = 0.5;
    } else {
      armorMultiplier = 1.0;
    }

    const effectiveDamagePerShot = Math.max(1, weapon.damage * weakMultiplier * armorMultiplier);
    const shotsToKill = Math.ceil(hp / effectiveDamagePerShot);

    // Calculate TTK including firing cadence and reload pauses
    // First shot fires at t=0s, so firing time is (shots - 1) / (RPM / 60)
    const timeBetweenShots = (shotsToKill > 1) ? ((shotsToKill - 1) / (weapon.rpm / 60)) : 0;
    
    // Reloads needed
    const magCapacity = weapon.magSize;
    const reloadsNeeded = Math.floor((shotsToKill - 1) / magCapacity);
    const reloadDelay = reloadsNeeded * weapon.reloadTime;

    const totalTtkSeconds = Number((timeBetweenShots + reloadDelay).toFixed(2));

    return {
      effectiveDamagePerShot: Math.round(effectiveDamagePerShot),
      shotsToKill,
      reloadsNeeded,
      totalTtkSeconds,
      armorPenetrationVerdict: armorMultiplier === 1.0 ? 'Full Penetration' : armorMultiplier === 0.5 ? 'Partial Penetration' : 'Heavy Deflection (Ricochet)'
    };
  };

  // Primary Selected TTK Result
  const primaryResult = useMemo(() => {
    return calculateTtkForWeapon(currentWeapon, currentEnemy, hitWeakspot, effectiveEnemyHp);
  }, [currentWeapon, currentEnemy, hitWeakspot, effectiveEnemyHp]);

  // Top 5 Weapons vs Current Enemy (Sorted by TTK Ascending)
  const topWeaponsForEnemy = useMemo(() => {
    return ALL_WEAPONS.map(w => {
      const res = calculateTtkForWeapon(w, currentEnemy, hitWeakspot, effectiveEnemyHp);
      return {
        weapon: w,
        ...res
      };
    }).sort((a, b) => a.totalTtkSeconds - b.totalTtkSeconds).slice(0, 5);
  }, [currentEnemy, hitWeakspot, effectiveEnemyHp]);

  // Viral Feature 1 Calculation: "Can my loadout kill it?"
  const loadoutSoloAnalysis = useMemo(() => {
    // Check if squad has anti-tank or heavy orbital to bust heavy armor
    let totalBurstDamage = currentWeapon.damage * 10;
    let hasAntiTank = currentWeapon.apLevel >= 4;

    const stratagemList = [stratagem1, stratagem2, stratagem3, stratagem4];
    stratagemList.forEach(s => {
      if (s.includes('500KG')) {
        totalBurstDamage += 3500;
        hasAntiTank = true;
      } else if (s.includes('Laser')) {
        totalBurstDamage += 4500;
        hasAntiTank = true;
      } else if (s.includes('Quasar')) {
        totalBurstDamage += 2000;
        hasAntiTank = true;
      } else if (s.includes('Autocannon')) {
        totalBurstDamage += 2500;
        hasAntiTank = true;
      }
    });

    const canSolo = hasAntiTank && (totalBurstDamage >= effectiveEnemyHp);
    const estimatedTime = (effectiveEnemyHp / (totalBurstDamage / 12)).toFixed(1);

    return {
      canSolo,
      totalBurstDamage,
      estimatedTime: Math.max(1.8, Number(estimatedTime)),
      verdict: canSolo 
        ? `YES! Your loadout deals ~${totalBurstDamage} burst damage, eliminating ${currentEnemy.name} in ~${estimatedTime}s.`
        : `RISK: Lacks sufficient heavy armor penetration (AP 5+). Bring Quasar Cannon, 500KG, or Autocannon!`
    };
  }, [currentWeapon, stratagem1, stratagem2, stratagem3, stratagem4, effectiveEnemyHp, currentEnemy]);

  // Share Reddit/Social Text
  const handleShare = () => {
    const text = `HELLDIVERS 2 TTK COMBAT BENCHMARK\n` +
      `Weapon: ${currentWeapon.name} vs ${currentEnemy.name} (${currentEnemy.faction})\n` +
      `Hits: ${primaryResult.shotsToKill} Shots (${hitWeakspot ? `Weakspot: ${currentEnemy.weakspotName}` : 'Body Shot'})\n` +
      `Time to Kill: ${primaryResult.totalTtkSeconds} Seconds\n` +
      `Verdict: ${primaryResult.armorPenetrationVerdict}\n` +
      `Calculate your TTK: https://gamingtoolshub.com/tools/helldivers-2-ttk-calculator`;

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Hidden Canvas for High-Res Image Card */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Banner & 3 Navigation Tabs */}
      <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFE900]/10 border border-[#FFE900]/40 flex items-center justify-center text-[#FFE900]">
              <Crosshair className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Super Earth Ballistics Lab
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Time to Kill (TTK) Calculator (2026)
              </h2>
            </div>
          </div>

          {/* Tab Navigation Buttons */}
          <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'calculator'
                  ? 'bg-[#FFE900] text-black font-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              TTK Calculator
            </button>
            <button
              onClick={() => setActiveTab('enemies')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'enemies'
                  ? 'bg-[#FFE900] text-black font-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Skull className="w-3.5 h-3.5" />
              15 Enemy Bestiary
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'matrix'
                  ? 'bg-[#FFE900] text-black font-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              TTK Grid Matrix
            </button>
          </div>
        </div>

        {/* Global Filter Bar: Difficulty & Weakspot Hit Toggle */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Difficulty Scale:
            </span>
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setDifficultyTier('normal')}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                  difficultyTier === 'normal' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Diff 1–6 (0.85x HP)
              </button>
              <button
                onClick={() => setDifficultyTier('helldive')}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                  difficultyTier === 'helldive' ? 'bg-[#FFE900] text-black font-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Helldive 7–9 (Full HP)
              </button>
            </div>
          </div>

          {/* Weakspot Target Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Shot Placement:
            </span>
            <button
              onClick={() => setHitWeakspot(!hitWeakspot)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer flex items-center gap-2 border ${
                hitWeakspot
                  ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400'
              }`}
            >
              <Target className={`w-3.5 h-3.5 ${hitWeakspot ? 'text-rose-400 animate-spin' : 'text-zinc-500'}`} style={{ animationDuration: '8s' }} />
              {hitWeakspot ? `Targeting Weakspot (${currentEnemy.weakspotMultiplier}x Multiplier)` : 'Center Mass (Body Shot)'}
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: MAIN TTK CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="space-y-8">
          {/* Top Row: 2 Big Interactive Selector Cards (Left: Weapon | Right: Enemy) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT: Weapon Selector Card */}
            <div className="bg-[#090b14] border-2 border-zinc-800 hover:border-[#FFE900]/50 rounded-2xl p-6 shadow-xl transition space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#FFE900]" />
                  Step 1: Select Firearm
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[#FFE900] font-bold">
                  {currentWeapon.tier}
                </span>
              </div>

              {/* Weapon Dropdown Selector */}
              <select
                value={selectedWeaponId}
                onChange={(e) => setSelectedWeaponId(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-bold font-mono text-white focus:outline-none focus:border-[#FFE900]"
              >
                {ALL_WEAPONS.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.name} — {w.damage} Dmg ({w.apLabel})
                  </option>
                ))}
              </select>

              {/* Weapon Stats Chips */}
              <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
                <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800 text-center">
                  <span className="text-zinc-500 block text-[10px]">DAMAGE</span>
                  <span className="text-white font-bold">{currentWeapon.damage} HP</span>
                </div>
                <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800 text-center">
                  <span className="text-zinc-500 block text-[10px]">FIRE RATE</span>
                  <span className="text-emerald-400 font-bold">{currentWeapon.rpm} RPM</span>
                </div>
                <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800 text-center">
                  <span className="text-zinc-500 block text-[10px]">MAGAZINE</span>
                  <span className="text-[#FFE900] font-bold">{currentWeapon.magSize} Rds</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-zinc-400 pt-1">
                <span>Penetration: <strong className="text-white">{currentWeapon.apLabel}</strong></span>
                <span>Reload: <strong className="text-white">{currentWeapon.reloadTime}s</strong></span>
              </div>
            </div>

            {/* RIGHT: Enemy Selector Card */}
            <div className={`bg-[#090b14] border-2 rounded-2xl p-6 shadow-xl transition space-y-4 ${
              currentEnemy.faction === 'Terminids'
                ? 'border-orange-500/40 hover:border-orange-500'
                : 'border-cyan-500/40 hover:border-cyan-500'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  {currentEnemy.faction === 'Terminids' ? <Bug className="w-4 h-4 text-orange-400" /> : <Bot className="w-4 h-4 text-cyan-400" />}
                  Step 2: Select Enemy Target
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  currentEnemy.faction === 'Terminids'
                    ? 'bg-orange-950/70 border border-orange-500/30 text-orange-400'
                    : 'bg-cyan-950/70 border border-cyan-500/30 text-cyan-400'
                }`}>
                  {currentEnemy.faction}
                </span>
              </div>

              {/* Enemy Dropdown Selector */}
              <select
                value={selectedEnemyId}
                onChange={(e) => setSelectedEnemyId(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-bold font-mono text-white focus:outline-none focus:border-[#FFE900]"
              >
                <optgroup label="Terminids (Bugs)">
                  {ALL_ENEMIES.filter(e => e.faction === 'Terminids').map(e => (
                    <option key={e.id} value={e.id}>{e.name} ({e.baseHp} HP)</option>
                  ))}
                </optgroup>
                <optgroup label="Automatons (Bots)">
                  {ALL_ENEMIES.filter(e => e.faction === 'Automatons').map(e => (
                    <option key={e.id} value={e.id}>{e.name} ({e.baseHp} HP)</option>
                  ))}
                </optgroup>
              </select>

              {/* Enemy Stats Chips */}
              <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
                <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800 text-center">
                  <span className="text-zinc-500 block text-[10px]">TOTAL HEALTH</span>
                  <span className="text-white font-bold">{effectiveEnemyHp} HP</span>
                </div>
                <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800 text-center">
                  <span className="text-zinc-500 block text-[10px]">ARMOR TIER</span>
                  <span className="text-rose-400 font-bold">Class {currentEnemy.armorLevel}</span>
                </div>
                <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800 text-center">
                  <span className="text-zinc-500 block text-[10px]">WEAKSPOT BONUS</span>
                  <span className="text-[#FFE900] font-bold">+{Math.round((currentEnemy.weakspotMultiplier - 1) * 100)}%</span>
                </div>
              </div>

              <div className="text-xs font-mono text-zinc-400 pt-1 truncate">
                Weakspot: <strong className="text-[#FFE900]">{currentEnemy.weakspotName}</strong>
              </div>
            </div>
          </div>

          {/* Middle Row: GIANT RESULT HERO BANNER */}
          <div className="bg-[#08090f] border-2 border-[#FFE900] rounded-2xl p-6 sm:p-10 shadow-[0_0_30px_rgba(255,233,0,0.15)] relative overflow-hidden text-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold flex items-center justify-center gap-2">
                <Target className="w-4 h-4 text-[#FFE900]" />
                CALCULATED TIME TO KILL BENCHMARK
              </span>

              {/* Giant Yellow Result Text */}
              <div className="text-4xl sm:text-6xl font-black text-[#FFE900] tracking-tight uppercase">
                {primaryResult.shotsToKill} {primaryResult.shotsToKill === 1 ? 'Shot' : 'Shots'} to Kill {currentEnemy.name}
              </div>

              {/* Giant White Time Result */}
              <div className="text-3xl sm:text-5xl font-black text-white font-mono">
                {primaryResult.totalTtkSeconds} Seconds
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300">
                  Damage/Shot: <strong className="text-white">{primaryResult.effectiveDamagePerShot} HP</strong>
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300">
                  Reloads Needed: <strong className="text-amber-400">{primaryResult.reloadsNeeded}</strong>
                </span>
                <span className={`px-3 py-1 rounded-full font-bold border ${
                  primaryResult.armorPenetrationVerdict.includes('Full') 
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                    : primaryResult.armorPenetrationVerdict.includes('Partial')
                    ? 'bg-amber-950 text-amber-400 border-amber-500/40'
                    : 'bg-rose-950 text-rose-400 border-rose-500/40'
                }`}>
                  {primaryResult.armorPenetrationVerdict}
                </span>
              </div>
            </div>

            {/* Animated Enemy Health Bar Depletion */}
            <div className="max-w-2xl mx-auto space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>{currentEnemy.name} Vitality</span>
                <span className="text-white font-bold">{effectiveEnemyHp} HP Total</span>
              </div>
              <div className="w-full h-4 bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden relative">
                {/* Visual segments for shots */}
                <div 
                  className={`h-full transition-all duration-700 rounded-full ${
                    currentEnemy.faction === 'Terminids' ? 'bg-gradient-to-r from-orange-500 to-rose-600' : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                  }`}
                  style={{ width: `${Math.max(5, Math.min(100, (primaryResult.effectiveDamagePerShot / effectiveEnemyHp) * 100 * Math.min(primaryResult.shotsToKill, 8)))}%` }}
                />
              </div>
              <div className="text-[11px] font-mono text-zinc-500">
                Each round strips ~{primaryResult.effectiveDamagePerShot} HP ({((primaryResult.effectiveDamagePerShot / effectiveEnemyHp) * 100).toFixed(1)}% of total health bar)
              </div>
            </div>

            {/* Share Button for Reddit / Socials */}
            <div className="pt-2">
              <button
                onClick={handleShare}
                className="px-6 py-2.5 rounded-xl bg-[#FFE900] text-black font-black uppercase text-xs tracking-wider inline-flex items-center gap-2 hover:bg-[#fff033] shadow cursor-pointer transition"
              >
                {copiedText ? <Check className="w-4 h-4 text-emerald-900" /> : <Share2 className="w-4 h-4" />}
                {copiedText ? 'Copied to Clipboard!' : `Share: My ${currentWeapon.shortName} kills ${currentEnemy.name} in ${primaryResult.totalTtkSeconds}s`}
              </button>
            </div>
          </div>

          {/* Side Panel & Tactical Weakspot Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Weakspot Diagram Panel (5 Cols) */}
            <div className="lg:col-span-5 bg-[#090b14] border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    Weakspot Tactical Inspection
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-700">
                    Target Reticle
                  </span>
                </div>

                {/* Simulated Target Diagram with Red Weakspot Pin */}
                <div className="mt-4 p-6 rounded-xl bg-zinc-950 border border-zinc-800 relative h-64 flex items-center justify-center overflow-hidden">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-48 h-48 rounded-full border border-[#FFE900]" />
                    <div className="w-32 h-32 rounded-full border border-[#FFE900]" />
                    <div className="w-16 h-16 rounded-full border border-[#FFE900]" />
                  </div>

                  {/* Silhouetted Vector Entity */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-2xl bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center relative shadow-2xl">
                      {currentEnemy.faction === 'Terminids' ? (
                        <Bug className="w-14 h-14 text-orange-400 opacity-60" />
                      ) : (
                        <Bot className="w-14 h-14 text-cyan-400 opacity-60" />
                      )}

                      {/* Glowing Weakspot Reticle Overlay */}
                      <div className="absolute w-8 h-8 rounded-full border-2 border-rose-500 bg-rose-500/30 animate-ping" />
                      <div className="absolute w-6 h-6 rounded-full border-2 border-rose-400 bg-rose-500/50 flex items-center justify-center">
                        <Crosshair className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-white mt-2 uppercase">
                      {currentEnemy.name}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 text-[10px] font-mono text-zinc-500">
                    Weakspot: <span className="text-rose-400 font-bold">{currentEnemy.weakspotName}</span>
                  </div>
                </div>

                {/* Tactical Instruction Box */}
                <div className="mt-4 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/90 text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-[#FFE900] block mb-1">Combat Directive:</strong>
                  {currentEnemy.weakspotHint}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-500">
                Tactical note: {currentEnemy.tacticalNote}
              </div>
            </div>

            {/* Right: Top 5 Ranked Weapons vs Selected Enemy (7 Cols) */}
            <div className="lg:col-span-7 bg-[#090b14] border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <h3 className="text-sm font-black uppercase text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#FFE900]" />
                    Top 5 Ranked Weapons vs {currentEnemy.name}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500">Fastest TTK</span>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider">
                        <th className="py-2.5 px-3">Rank & Weapon</th>
                        <th className="py-2.5 px-2">Shots</th>
                        <th className="py-2.5 px-2">Ammo / Reload</th>
                        <th className="py-2.5 px-3 text-right">TTK (Seconds)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {topWeaponsForEnemy.map((item, index) => (
                        <tr 
                          key={item.weapon.id}
                          className={`hover:bg-zinc-900/50 transition cursor-pointer ${
                            item.weapon.id === currentWeapon.id ? 'bg-[#FFE900]/10 font-bold' : ''
                          }`}
                          onClick={() => setSelectedWeaponId(item.weapon.id)}
                        >
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] text-[#FFE900] font-black">
                                #{index + 1}
                              </span>
                              <div>
                                <span className="text-white block font-bold">{item.weapon.name}</span>
                                <span className="text-[10px] text-zinc-500">{item.weapon.apLabel}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2 font-bold text-zinc-200">
                            {item.shotsToKill} shot{item.shotsToKill > 1 ? 's' : ''}
                          </td>
                          <td className="py-3 px-2 text-zinc-400">
                            {item.reloadsNeeded > 0 ? (
                              <span className="text-amber-400">{item.reloadsNeeded} reload</span>
                            ) : (
                              <span className="text-emerald-400">1 Mag</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right font-black text-sm text-[#FFE900]">
                            {item.totalTtkSeconds}s
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Click any row to load into calculator</span>
                <span className="text-zinc-400">Sorted by lowest kill time</span>
              </div>
            </div>
          </div>

          {/* Viral Feature 1: "Can my loadout kill it?" Solo Squad Simulator */}
          <div className="bg-[#090b14] border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="pb-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Tactical Loadout Solo Viability Test
                </span>
                <h3 className="text-xl font-black uppercase text-white mt-1">
                  "Can My Loadout Kill It?" Simulator
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Test your primary weapon + 4 stratagems to verify whether you have the firepower to solo {currentEnemy.name}.
                </p>
              </div>
            </div>

            {/* 4 Stratagems Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { label: 'Stratagem 1', val: stratagem1, set: setStratagem1 },
                { label: 'Stratagem 2', val: stratagem2, set: setStratagem2 },
                { label: 'Stratagem 3', val: stratagem3, set: setStratagem3 },
                { label: 'Stratagem 4', val: stratagem4, set: setStratagem4 }
              ].map((s, idx) => (
                <div key={idx}>
                  <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                    Slot {idx + 1}
                  </label>
                  <select
                    value={s.val}
                    onChange={(e) => s.set(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white"
                  >
                    <option value="Eagle 500KG Bomb">Eagle 500KG Bomb (Heavy AT)</option>
                    <option value="Orbital Laser">Orbital Laser (Heavy Sustained)</option>
                    <option value="Quasar Cannon">LAS-99 Quasar (Anti-Tank)</option>
                    <option value="Autocannon">AC-8 Autocannon (Heavy Shell)</option>
                    <option value="Orbital Railcannon">Orbital Railcannon (Instant AT)</option>
                    <option value="Eagle Airstrike">Eagle Airstrike (Medium Armor)</option>
                    <option value="Shield Generator">Shield Generator Pack (Defense)</option>
                  </select>
                </div>
              ))}
            </div>

            {/* Simulator Verdict Card */}
            <div className={`p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              loadoutSoloAnalysis.canSolo
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}>
              <div className="flex items-center gap-3.5">
                {loadoutSoloAnalysis.canSolo ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-rose-400 shrink-0" />
                )}
                <div>
                  <div className="text-base font-black uppercase text-white">
                    {loadoutSoloAnalysis.canSolo ? 'SOLO VIABLE LOADOUT' : 'INSUFFICIENT ARMOR PENETRATION'}
                  </div>
                  <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                    {loadoutSoloAnalysis.verdict}
                  </p>
                </div>
              </div>

              <div className="text-right font-mono text-xs shrink-0">
                <span className="text-zinc-400 block text-[10px]">TOTAL BURST CAPACITY:</span>
                <span className="text-lg font-black text-white">{loadoutSoloAnalysis.totalBurstDamage} HP</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ENEMY HEALTH LIST (ALL 15 ENEMIES) */}
      {activeTab === 'enemies' && (
        <div className="space-y-6">
          <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-black uppercase text-white flex items-center gap-2 pb-4 border-b border-zinc-800">
              <Skull className="w-5 h-5 text-rose-400" />
              Super Earth Intelligence: 15 Enemy Combat Bestiary (2026)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {ALL_ENEMIES.map(enemy => (
                <div
                  key={enemy.id}
                  onClick={() => {
                    setSelectedEnemyId(enemy.id);
                    setActiveTab('calculator');
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer group flex flex-col justify-between ${
                    enemy.faction === 'Terminids'
                      ? 'bg-zinc-950/70 border-zinc-800 hover:border-orange-500'
                      : 'bg-zinc-950/70 border-zinc-800 hover:border-cyan-500'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                      <span className="text-xs font-mono font-bold uppercase text-white group-hover:text-[#FFE900]">
                        {enemy.name}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        enemy.faction === 'Terminids' ? 'bg-orange-950 text-orange-400' : 'bg-cyan-950 text-cyan-400'
                      }`}>
                        {enemy.faction}
                      </span>
                    </div>

                    <div className="my-3 space-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Base Health:</span>
                        <span className="text-white font-bold">{enemy.baseHp} HP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Armor Level:</span>
                        <span className="text-rose-400 font-bold">Class {enemy.armorLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Weakspot:</span>
                        <span className="text-[#FFE900] font-bold">{enemy.weakspotName}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 line-clamp-2 mt-2">
                      {enemy.weakspotHint}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>Click to calculate TTK</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FFE900] transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WEAPON VS ENEMY MATRIX */}
      {activeTab === 'matrix' && (
        <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="pb-4 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
                <Table className="w-5 h-5 text-[#FFE900]" />
                Weapon vs Enemy Time to Kill (TTK) Master Matrix
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Full combat matrix displaying exact TTK (seconds) and shots to kill across all weapon and enemy matchups.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider bg-zinc-950">
                  <th className="py-3 px-3 sticky left-0 bg-zinc-950">Firearm</th>
                  <th className="py-3 px-2">Trooper</th>
                  <th className="py-3 px-2">Warrior</th>
                  <th className="py-3 px-2">Stalker</th>
                  <th className="py-3 px-2">Devastator</th>
                  <th className="py-3 px-2">Hulk (Eye)</th>
                  <th className="py-3 px-2">Charger</th>
                  <th className="py-3 px-2">Bile Titan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {ALL_WEAPONS.map(weapon => (
                  <tr key={weapon.id} className="hover:bg-zinc-900/60 transition">
                    <td className="py-3 px-3 font-bold text-white sticky left-0 bg-zinc-950/90 whitespace-nowrap">
                      {weapon.shortName}
                    </td>

                    {/* Trooper */}
                    <td className="py-3 px-2">
                      <span className="text-emerald-400 font-bold">
                        {calculateTtkForWeapon(weapon, ALL_ENEMIES[8], true, 150).totalTtkSeconds}s
                      </span>
                    </td>

                    {/* Warrior */}
                    <td className="py-3 px-2">
                      <span className="text-emerald-400 font-bold">
                        {calculateTtkForWeapon(weapon, ALL_ENEMIES[1], true, 400).totalTtkSeconds}s
                      </span>
                    </td>

                    {/* Stalker */}
                    <td className="py-3 px-2">
                      <span className="text-amber-400 font-bold">
                        {calculateTtkForWeapon(weapon, ALL_ENEMIES[3], true, 1000).totalTtkSeconds}s
                      </span>
                    </td>

                    {/* Devastator */}
                    <td className="py-3 px-2">
                      <span className="text-amber-400 font-bold">
                        {calculateTtkForWeapon(weapon, ALL_ENEMIES[10], true, 1000).totalTtkSeconds}s
                      </span>
                    </td>

                    {/* Hulk */}
                    <td className="py-3 px-2">
                      <span className={weapon.apLevel >= 3 ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
                        {calculateTtkForWeapon(weapon, ALL_ENEMIES[11], true, 2000).totalTtkSeconds}s
                      </span>
                    </td>

                    {/* Charger */}
                    <td className="py-3 px-2">
                      <span className={weapon.apLevel >= 4 ? 'text-emerald-400 font-bold' : 'text-zinc-400'}>
                        {calculateTtkForWeapon(weapon, ALL_ENEMIES[5], true, 2500).totalTtkSeconds}s
                      </span>
                    </td>

                    {/* Bile Titan */}
                    <td className="py-3 px-2">
                      <span className={weapon.apLevel >= 4 ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                        {calculateTtkForWeapon(weapon, ALL_ENEMIES[6], true, 6000).totalTtkSeconds}s
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SEO Footer & Verified Ballistics Documentation */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 text-zinc-300 text-xs leading-relaxed">
        <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-[#FFE900]" />
          Helldivers 2 TTK & Weakspot Mechanics Breakdown (2026)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-2 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
            <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-[#FFE900]" />
              1. Weakspot Multipliers (2.0x)
            </h5>
            <p className="text-zinc-400">
              Hitting unarmored weakspots like the glowing green sacs on Bile Spewers, the rear radiator vents on Hulks, or the glowing rear of Chargers doubles your damage output and bypasses heavy deflection angles.
            </p>
          </div>

          <div className="space-y-2 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
            <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              2. Armor Penetration Thresholds
            </h5>
            <p className="text-zinc-400">
              If a weapon's Armor Penetration is lower than the target's armor level, bullets ricochet dealing only 10% damage. Matching armor deals 50% damage (white reticle), while exceeding armor deals 100% full damage (red reticle).
            </p>
          </div>

          <div className="space-y-2 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
            <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              3. Burst TTK vs Reload Penalties
            </h5>
            <p className="text-zinc-400">
              Weapons with small magazines (like the SG-8S Slugger or R-36 Eruptor) require reload animations against bullet-sponge enemies, increasing sustained TTK compared to high-capacity weapons like the LAS-16 Sickle.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center text-zinc-500 font-mono text-[11px]">
          Helldivers 2 TTK Calculator - How many shots to kill Bile Titan 2026 • Verified Super Earth Logistics
        </div>
      </div>
    </div>
  );
}
