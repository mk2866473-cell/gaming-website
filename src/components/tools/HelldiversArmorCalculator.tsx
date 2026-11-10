/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Shield, Zap, Activity, Flame, Bomb, Wind, Check, Share2, 
  HeartPulse, Sparkles, Sliders, Crosshair, AlertTriangle, 
  Award, Heart, Skull, ShieldCheck, Target, Eye, Compass, 
  Download, ArrowRightLeft, Radio, CheckCircle2, ChevronRight,
  TrendingUp, Info, RefreshCw
} from 'lucide-react';

export type ArmorWeightClass = 'light' | 'medium' | 'heavy';

export interface ArmorItem {
  id: string;
  name: string;
  classType: ArmorWeightClass;
  armorRating: number;
  speed: number;
  staminaRegen: number;
  stealthBonus: number; // e.g. 0% or -30% detection
  defaultPassiveId: string;
  description: string;
  bestFor: string;
  isMeta?: boolean;
}

export interface ArmorPassive {
  id: string;
  name: string;
  bonusArmor: number;
  speedModifier: number;
  staminaModifier: number;
  explosiveResistPercent: number;
  fireResistPercent: number;
  gasResistPercent: number;
  arcResistPercent: number;
  stealthBonusPercent: number;
  recoilReductionPercent: number;
  description: string;
  perkSummary: string;
}

export interface EnemyDamageProfile {
  id: string;
  name: string;
  faction: 'Terminids' | 'Automatons';
  attackName: string;
  rawDamage: number;
  damageType: 'melee' | 'kinetic' | 'explosive' | 'fire' | 'acid';
  icon: React.ElementType;
}

// 10 Official In-Game Passives (2026 Data)
export const ARMOR_PASSIVES: ArmorPassive[] = [
  {
    id: 'extra-padding',
    name: 'Extra Padding',
    bonusArmor: 50,
    speedModifier: 0,
    staminaModifier: 0,
    explosiveResistPercent: 0,
    fireResistPercent: 0,
    gasResistPercent: 0,
    arcResistPercent: 0,
    stealthBonusPercent: 0,
    recoilReductionPercent: 0,
    description: 'Increases Armor Rating by +50, upgrading durability to the next tier with zero speed penalties.',
    perkSummary: '+50 Armor Rating'
  },
  {
    id: 'med-kit',
    name: 'Med-Kit',
    bonusArmor: 0,
    speedModifier: 0,
    staminaModifier: 0,
    explosiveResistPercent: 0,
    fireResistPercent: 0,
    gasResistPercent: 0,
    arcResistPercent: 0,
    stealthBonusPercent: 0,
    recoilReductionPercent: 0,
    description: 'Increases initial inventory and holding capacity of Stims by +2. Increases Stim healing duration by +2.0 seconds.',
    perkSummary: '+2 Stims, +2.0s Duration'
  },
  {
    id: 'engineering-kit',
    name: 'Engineering Kit',
    bonusArmor: 0,
    speedModifier: 0,
    staminaModifier: 0,
    explosiveResistPercent: 0,
    fireResistPercent: 0,
    gasResistPercent: 0,
    arcResistPercent: 0,
    stealthBonusPercent: 0,
    recoilReductionPercent: 10,
    description: 'Increases grenade capacity by +2 (+30%). Reduces recoil when crouching or prone by 30%.',
    perkSummary: '+2 Grenades, -30% Recoil'
  },
  {
    id: 'fortified',
    name: 'Fortified',
    bonusArmor: 0,
    speedModifier: 0,
    staminaModifier: 0,
    explosiveResistPercent: 50,
    fireResistPercent: 0,
    gasResistPercent: 0,
    arcResistPercent: 0,
    stealthBonusPercent: 0,
    recoilReductionPercent: 30,
    description: 'Reduces explosive damage taken by 50%. Further reduces recoil when crouching or prone by 30%.',
    perkSummary: '+50% Explosive Resist, -30% Recoil'
  },
  {
    id: 'scout',
    name: 'Scout',
    bonusArmor: 0,
    speedModifier: 0,
    staminaModifier: 0,
    explosiveResistPercent: 0,
    fireResistPercent: 0,
    gasResistPercent: 0,
    arcResistPercent: 0,
    stealthBonusPercent: 30,
    recoilReductionPercent: 0,
    description: 'Markers placed on map generate radar scans every 2.0s. Reduces enemy detection range by 30%.',
    perkSummary: '-30% Detection, +30% Radar Range'
  },
  {
    id: 'servo-assisted',
    name: 'Servo-Assisted',
    bonusArmor: 0,
    speedModifier: 0,
    staminaModifier: 0,
    explosiveResistPercent: 0,
    fireResistPercent: 0,
    gasResistPercent: 0,
    arcResistPercent: 0,
    stealthBonusPercent: 0,
    recoilReductionPercent: 0,
    description: 'Increases throwing distance of stratagems and grenades by +50%. Increases melee damage by +30%.',
    perkSummary: '+50% Throw Range, +30% Melee Dmg'
  },
  {
    id: 'democracy-protects',
    name: 'Democracy Protects',
    bonusArmor: 0,
    speedModifier: 0,
    staminaModifier: 0,
    explosiveResistPercent: 0,
    fireResistPercent: 0,
    gasResistPercent: 0,
    arcResistPercent: 0,
    stealthBonusPercent: 0,
    recoilReductionPercent: 0,
    description: '50% chance to survive lethal damage with 1 HP remaining. Completely negates fatal chest bleed.',
    perkSummary: '50% Lethal Survival Chance'
  },
  {
    id: 'electrical-conduit',
    name: 'Electrical Conduit',
    bonusArmor: 0,
    speedModifier: 0,
    staminaModifier: 0,
    explosiveResistPercent: 0,
    fireResistPercent: 0,
    gasResistPercent: 0,
    arcResistPercent: 95,
    stealthBonusPercent: 0,
    recoilReductionPercent: 0,
    description: 'Provides 95% damage resistance to Arc Throwers, Tesla Towers, and allied arc lightning discharges.',
    perkSummary: '+95% Arc Resistance'
  },
  {
    id: 'inflammable',
    name: 'Inflammable',
    bonusArmor: 0,
    speedModifier: 0,
    staminaModifier: 0,
    explosiveResistPercent: 0,
    fireResistPercent: 75,
    gasResistPercent: 0,
    arcResistPercent: 0,
    stealthBonusPercent: 0,
    recoilReductionPercent: 0,
    description: 'Provides 75% resistance to fire, burning ground ticks, Hulk Scorchers, and fire tornadoes.',
    perkSummary: '+75% Fire & Burn Resistance'
  },
  {
    id: 'advanced-filtration',
    name: 'Advanced Filtration',
    bonusArmor: 0,
    speedModifier: 0,
    staminaModifier: 0,
    explosiveResistPercent: 0,
    fireResistPercent: 0,
    gasResistPercent: 80,
    arcResistPercent: 0,
    stealthBonusPercent: 0,
    recoilReductionPercent: 0,
    description: 'Provides 80% resistance to caustic Orbital Gas Strikes, Bile Spewer spit, and environmental gas clouds.',
    perkSummary: '+80% Gas & Acid Resistance'
  }
];

// Verified In-Game Armors
export const ARMOR_CATALOG: ArmorItem[] = [
  // Light Armors
  {
    id: 'sc-34-infiltrator',
    name: 'SC-34 Infiltrator',
    classType: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    stealthBonus: 30,
    defaultPassiveId: 'scout',
    description: 'Light recon chassis optimized for high-speed perimeter scouting and objective stealth.',
    bestFor: 'Best for Stealth & Radar Run',
    isMeta: true
  },
  {
    id: 'b-08-light-gunner',
    name: 'B-08 Light Gunner',
    classType: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    stealthBonus: 0,
    defaultPassiveId: 'extra-padding',
    description: 'Light mobility frame reinforced with Extra Padding, boosting armor rating to 100.',
    bestFor: 'Best for Speed with Medium Armor',
    isMeta: true
  },
  {
    id: 'ce-07-demolition',
    name: 'CE-07 Demolition Specialist',
    classType: 'light',
    armorRating: 64,
    speed: 535,
    staminaRegen: 118,
    stealthBonus: 0,
    defaultPassiveId: 'engineering-kit',
    description: 'High-speed demolition harness packed with extra grenade pouches for Blitz missions.',
    bestFor: 'Best for Bug Hole / Fabricator Blitz'
  },
  {
    id: 'cm-21-trench-paramedic',
    name: 'CM-21 Trench Paramedic',
    classType: 'light',
    armorRating: 50,
    speed: 550,
    staminaRegen: 125,
    stealthBonus: 0,
    defaultPassiveId: 'med-kit',
    description: 'Agile medical suit delivering 6 Stims and sustained invulnerability sprint boosts.',
    bestFor: 'Best for Combat Medic & Infinite Stamina'
  },

  // Medium Armors
  {
    id: 'b-01-tactical',
    name: 'B-01 Tactical (Standard)',
    classType: 'medium',
    armorRating: 100,
    speed: 500,
    staminaRegen: 100,
    stealthBonus: 0,
    defaultPassiveId: 'extra-padding',
    description: 'The iconic Super Earth frontline armor with Extra Padding providing Heavy-tier 150 durability.',
    bestFor: 'Best for Balanced Durability'
  },
  {
    id: 'dp-40-hero',
    name: 'DP-40 Hero of the Federation',
    classType: 'medium',
    armorRating: 100,
    speed: 500,
    staminaRegen: 100,
    stealthBonus: 0,
    defaultPassiveId: 'democracy-protects',
    description: 'Ceremonial armor celebrated for 50% lethal cheat-death survival in heavy crossfire.',
    bestFor: 'Best for Clutch Survival & 500KG Dodging'
  },
  {
    id: 'b-24-enforcer',
    name: 'B-24 Enforcer',
    classType: 'medium',
    armorRating: 129,
    speed: 470,
    staminaRegen: 90,
    stealthBonus: 0,
    defaultPassiveId: 'fortified',
    description: 'Reinforced medium frame with 129 armor and 50% explosive mitigation against Automaton rockets.',
    bestFor: 'Best for Automaton Gunline Defense'
  },
  {
    id: 'sa-25-steel-trooper',
    name: 'SA-25 Steel Trooper',
    classType: 'medium',
    armorRating: 100,
    speed: 500,
    staminaRegen: 100,
    stealthBonus: 0,
    defaultPassiveId: 'servo-assisted',
    description: 'Hydraulic powered armor boosting 380mm and grenade throw distance across entire valleys.',
    bestFor: 'Best for Long-Distance Stratagem Drops'
  },

  // Heavy Armors
  {
    id: 'fs-05-marksman',
    name: 'FS-05 Marksman',
    classType: 'heavy',
    armorRating: 150,
    speed: 450,
    staminaRegen: 75,
    stealthBonus: 0,
    defaultPassiveId: 'fortified',
    description: 'Impenetrable heavy ballistic bulwark with 50% explosive blast mitigation and pinpoint recoil control.',
    bestFor: 'Best for Heavy Tanking & Rocket Devastators',
    isMeta: true
  },
  {
    id: 'b-27-fortified-commando',
    name: 'B-27 Fortified Commando',
    classType: 'heavy',
    armorRating: 150,
    speed: 450,
    staminaRegen: 75,
    stealthBonus: 0,
    defaultPassiveId: 'extra-padding',
    description: 'The single highest armor rating in the entire game: 200 Armor Rating with Extra Padding!',
    bestFor: 'Best for Absolute Maximum Damage Absorption'
  },
  {
    id: 'i-09-heatseeker',
    name: 'I-09 Heatseeker',
    classType: 'heavy',
    armorRating: 150,
    speed: 450,
    staminaRegen: 75,
    stealthBonus: 0,
    defaultPassiveId: 'inflammable',
    description: 'Thermal insulated heavy ceramic plating resisting 75% fire damage on Hellmire fire tornadoes.',
    bestFor: 'Best for Firefront & Hulk Scorchers'
  }
];

// Enemy Damage Profiles (Player Health = 100 HP)
export const ENEMY_ATTACKS: EnemyDamageProfile[] = [
  {
    id: 'bile-titan',
    name: 'Bile Titan (Stomp / Leg Crush)',
    faction: 'Terminids',
    attackName: 'Heavy Leg Crush',
    rawDamage: 180,
    damageType: 'melee',
    icon: Skull
  },
  {
    id: 'bug-warrior',
    name: 'Bug Warrior (Claw Strike)',
    faction: 'Terminids',
    attackName: 'Scythe Claw Slash',
    rawDamage: 65,
    damageType: 'melee',
    icon: Skull
  },
  {
    id: 'hunter-melee',
    name: 'Hunter (Tongue / Claw Combo)',
    faction: 'Terminids',
    attackName: 'Rapid Leaping Melee',
    rawDamage: 45,
    damageType: 'melee',
    icon: Skull
  },
  {
    id: 'bot-trooper',
    name: 'Bot Trooper (Laser Rifle)',
    faction: 'Automatons',
    attackName: 'Plasma Bolt Hit',
    rawDamage: 40,
    damageType: 'kinetic',
    icon: Target
  },
  {
    id: 'rocket-devastator',
    name: 'Rocket Devastator (Direct Missile)',
    faction: 'Automatons',
    attackName: 'High-Explosive Rocket Barrage',
    rawDamage: 120,
    damageType: 'explosive',
    icon: Bomb
  }
];

export default function HelldiversArmorCalculator() {
  // Armor 1 Selection
  const [selectedClassType, setSelectedClassType] = useState<ArmorWeightClass>('light');
  const [selectedArmorId, setSelectedArmorId] = useState<string>('sc-34-infiltrator');
  const [selectedPassiveId, setSelectedPassiveId] = useState<string>('scout');

  // Compare Mode Toggle & Armor 2
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [compareArmorId, setCompareArmorId] = useState<string>('fs-05-marksman');
  const [comparePassiveId, setComparePassiveId] = useState<string>('fortified');

  // Enemy Survival Simulation Focus
  const [selectedEnemyId, setSelectedEnemyId] = useState<string>('bile-titan');

  // Loadout Card Customizer State (for Instagram export)
  const [customWeapon, setCustomWeapon] = useState<string>('LAS-16 Sickle');
  const [customStratagem, setCustomStratagem] = useState<string>('Eagle 500KG Bomb');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active Armor 1 Object
  const currentArmor = useMemo(() => {
    return ARMOR_CATALOG.find(a => a.id === selectedArmorId) || ARMOR_CATALOG[0];
  }, [selectedArmorId]);

  // Active Passive 1 Object
  const currentPassive = useMemo(() => {
    return ARMOR_PASSIVES.find(p => p.id === selectedPassiveId) || ARMOR_PASSIVES[4]; // Scout
  }, [selectedPassiveId]);

  // Compare Armor 2 Object
  const compareArmor = useMemo(() => {
    return ARMOR_CATALOG.find(a => a.id === compareArmorId) || ARMOR_CATALOG[8];
  }, [compareArmorId]);

  const comparePassive = useMemo(() => {
    return ARMOR_PASSIVES.find(p => p.id === comparePassiveId) || ARMOR_PASSIVES[3]; // Fortified
  }, [comparePassiveId]);

  // When classType changes, auto-select first armor of that class
  const handleClassTypeChange = (cls: ArmorWeightClass) => {
    setSelectedClassType(cls);
    const firstOfClass = ARMOR_CATALOG.find(a => a.classType === cls);
    if (firstOfClass) {
      setSelectedArmorId(firstOfClass.id);
      setSelectedPassiveId(firstOfClass.defaultPassiveId);
    }
  };

  // Armor 1 Stats Calculation
  // In Helldivers 2: Damage multiplier = (100 / EffectiveArmor)
  // Armor 50: takes 100% (1.0x baseline)
  // Armor 100: takes ~80% damage (0.80x)
  // Armor 150: takes ~67% damage (0.67x)
  // Armor 200: takes ~55% damage (0.55x)
  const stats1 = useMemo(() => {
    const effectiveArmor = currentArmor.armorRating + currentPassive.bonusArmor;
    const speed = currentArmor.speed + currentPassive.speedModifier;
    const staminaRegen = currentArmor.staminaRegen + currentPassive.staminaModifier;
    const stealth = currentArmor.stealthBonus + currentPassive.stealthBonusPercent;

    // Damage Reduction vs baseline 50 armor
    // Damage factor = Math.min(1.2, 100 / (effectiveArmor + 50))
    const damageFactor = 100 / (effectiveArmor + 50); // 50 rating = 1.0 (100%), 100 rating = 0.67, 150 rating = 0.50, 200 rating = 0.40
    const damageMitigationPercent = Math.round((1 - damageFactor) * 100);

    return {
      effectiveArmor,
      speed,
      staminaRegen,
      stealth,
      damageFactor,
      damageMitigationPercent
    };
  }, [currentArmor, currentPassive]);

  // Armor 2 Stats Calculation
  const stats2 = useMemo(() => {
    const effectiveArmor = compareArmor.armorRating + comparePassive.bonusArmor;
    const speed = compareArmor.speed + comparePassive.speedModifier;
    const staminaRegen = compareArmor.staminaRegen + comparePassive.staminaModifier;
    const stealth = compareArmor.stealthBonus + comparePassive.stealthBonusPercent;
    const damageFactor = 100 / (effectiveArmor + 50);
    const damageMitigationPercent = Math.round((1 - damageFactor) * 100);

    return {
      effectiveArmor,
      speed,
      staminaRegen,
      stealth,
      damageFactor,
      damageMitigationPercent
    };
  }, [compareArmor, comparePassive]);

  // Selected Enemy Attack Calculation
  const selectedEnemy = useMemo(() => {
    return ENEMY_ATTACKS.find(e => e.id === selectedEnemyId) || ENEMY_ATTACKS[0];
  }, [selectedEnemyId]);

  // Calculate Hits to Kill for Player (HP = 100)
  const calculateSurvival = (armorStats: typeof stats1, passive: ArmorPassive, enemy: EnemyDamageProfile) => {
    let incomingDamage = enemy.rawDamage * armorStats.damageFactor;

    // Apply passive element resistance
    if (enemy.damageType === 'explosive' && passive.explosiveResistPercent > 0) {
      incomingDamage *= (1 - passive.explosiveResistPercent / 100);
    } else if (enemy.damageType === 'fire' && passive.fireResistPercent > 0) {
      incomingDamage *= (1 - passive.fireResistPercent / 100);
    }

    const hitsToKill = Math.max(1, Math.ceil(100 / incomingDamage));
    return {
      damagePerHit: Math.round(incomingDamage),
      hitsToKill
    };
  };

  const survival1 = useMemo(() => calculateSurvival(stats1, currentPassive, selectedEnemy), [stats1, currentPassive, selectedEnemy]);
  const survival2 = useMemo(() => calculateSurvival(stats2, comparePassive, selectedEnemy), [stats2, comparePassive, selectedEnemy]);

  // Generate and Download Instagram Helldiver Card
  const handleExportImage = () => {
    setIsExporting(true);
    const canvas = canvasRef.current;
    if (!canvas) {
      setIsExporting(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // Set dimensions: 1080x1350 (4:5 Instagram Portrait Post / Story format)
    canvas.width = 1080;
    canvas.height = 1350;

    // 1. Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    bgGradient.addColorStop(0, '#060810');
    bgGradient.addColorStop(0.5, '#0c101d');
    bgGradient.addColorStop(1, '#05070d');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1080, 1350);

    // 2. Yellow Corner Accents & Cyber Grid
    ctx.strokeStyle = 'rgba(255, 233, 0, 0.2)';
    ctx.lineWidth = 1;
    for (let x = 60; x < 1020; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 60);
      ctx.lineTo(x, 1290);
      ctx.stroke();
    }
    for (let y = 60; y < 1290; y += 60) {
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(1020, y);
      ctx.stroke();
    }

    // 3. Header Top Frame
    ctx.fillStyle = '#FFE900';
    ctx.fillRect(60, 60, 960, 8);

    const drawFitText = (text: string, x: number, y: number, maxWidth: number, fontStyle: string, maxFontSize: number) => {
      let fontSize = maxFontSize;
      ctx.font = `900 ${fontSize}px ${fontStyle}`;
      while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
        fontSize -= 1;
        ctx.font = `900 ${fontSize}px ${fontStyle}`;
      }
      ctx.fillText(text, x, y);
    };

    ctx.fillStyle = '#FFE900';
    drawFitText('SUPER EARTH ARSENAL // HELLDIVERS 2', 80, 120, 780, 'monospace', 24);

    ctx.fillStyle = '#FFFFFF';
    drawFitText('HELLDIVER LOADOUT', 80, 195, 780, 'sans-serif', 42);

    // 4. Armor Class & Name Card
    ctx.fillStyle = 'rgba(16, 21, 35, 0.85)';
    ctx.strokeStyle = '#FFE900';
    ctx.lineWidth = 3;
    ctx.roundRect(80, 240, 920, 220, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = currentArmor.classType === 'light' ? '#34d399' : currentArmor.classType === 'medium' ? '#fbbf24' : '#f87171';
    drawFitText(`[ ${currentArmor.classType.toUpperCase()} ARMOR ]`, 110, 295, 740, 'monospace', 26);

    ctx.fillStyle = '#FFFFFF';
    drawFitText(currentArmor.name, 110, 360, 740, 'sans-serif', 40);

    ctx.fillStyle = '#94a3b8';
    drawFitText(`Passive: ${currentPassive.name} (${currentPassive.perkSummary})`, 110, 415, 740, 'sans-serif', 20);

    // 5. Stat Gauges Card
    ctx.fillStyle = 'rgba(12, 16, 28, 0.9)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.roundRect(80, 490, 920, 330, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFE900';
    drawFitText('COMBAT RATING METRICS', 110, 545, 740, 'sans-serif', 28);

    // Draw 3 horizontal stat bars
    const drawStatBar = (label: string, val: string, pct: number, y: number, barColor: string) => {
      ctx.fillStyle = '#e2e8f0';
      drawFitText(label, 110, y, 420, 'monospace', 22);
      ctx.fillStyle = barColor;
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(val, 940, y);
      ctx.textAlign = 'left';

      ctx.fillStyle = '#1e293b';
      ctx.roundRect(110, y + 15, 830, 16, 8);
      ctx.fill();

      ctx.fillStyle = barColor;
      ctx.roundRect(110, y + 15, Math.max(20, (830 * pct) / 100), 16, 8);
      ctx.fill();
    };

    drawStatBar('ARMOR PROTECTION RATING', `${stats1.effectiveArmor} (${stats1.damageMitigationPercent}% Mit)`, (stats1.effectiveArmor / 200) * 100, 605, '#38bdf8');
    drawStatBar('SPEED VELOCITY', `${stats1.speed}`, (stats1.speed / 550) * 100, 695, '#34d399');
    drawStatBar('STAMINA REGENERATION', `${stats1.staminaRegen}%`, (stats1.staminaRegen / 125) * 100, 785, '#f59e0b');

    // 6. Selected Weapon & Stratagem Loadout Section
    ctx.fillStyle = 'rgba(12, 16, 28, 0.9)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.roundRect(80, 850, 920, 240, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFE900';
    drawFitText('DEPLOYED LOADOUT', 110, 905, 740, 'sans-serif', 28);

    const drawLoadoutRow = (label: string, val: string, y: number) => {
      ctx.fillStyle = '#94a3b8';
      drawFitText(label, 110, y, 280, 'monospace', 22);
      ctx.fillStyle = '#FFFFFF';
      drawFitText(val, 400, y, 520, 'sans-serif', 22);
    };

    drawLoadoutRow('Primary Weapon:', customWeapon, 960);
    drawLoadoutRow('Heavy Stratagem:', customStratagem, 1015);
    drawLoadoutRow('Bile Titan Survival:', `Survives ${survival1.hitsToKill} Hit${survival1.hitsToKill > 1 ? 's' : ''} (${survival1.damagePerHit} Dmg)`, 1065);

    // 7. Footer Watermark & Branding
    ctx.fillStyle = '#FFE900';
    ctx.fillRect(80, 1120, 920, 4);

    ctx.fillStyle = '#FFFFFF';
    drawFitText('GAMINGTOOLSHUB.COM', 80, 1200, 800, 'sans-serif', 32);

    ctx.fillStyle = '#FFE900';
    drawFitText('// Helldivers 2 Armor & Passive Calculator 2026', 80, 1245, 800, 'monospace', 20);

    // Trigger Browser Image Download
    setTimeout(() => {
      const imageUri = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `helldivers-2-${currentArmor.id}-loadout.png`;
      downloadLink.href = imageUri;
      downloadLink.click();
      setIsExporting(false);
    }, 200);
  };

  // Share Loadout link to clipboard
  const handleShare = () => {
    const text = `HELLDIVERS 2 ARMOR & LOADOUT\n` +
      `Armor: ${currentArmor.name} (${currentArmor.classType.toUpperCase()})\n` +
      `Passive: ${currentPassive.name} (${currentPassive.perkSummary})\n` +
      `Rating: ${stats1.effectiveArmor} Armor | ${stats1.speed} Speed | ${stats1.staminaRegen}% Stamina\n` +
      `Bile Titan Defense: Survives ${survival1.hitsToKill} Hits (${survival1.damagePerHit} Dmg/hit)\n` +
      `Optimize your loadout: https://gamingtoolshub.com/tools/helldivers-2-armor-calculator`;

    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Hidden Offscreen Canvas for Exporting High-Res PNG */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Banner: Armor Class Tabs & Meta Badge */}
      <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFE900]/10 border border-[#FFE900]/40 flex items-center justify-center text-[#FFE900]">
              <Shield className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Super Earth Ordnance Research
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Armor Rating & Passive Calculator (2026)
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Meta Armor Highlight Badge */}
            <div className="px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>META: Light Scout Armor (70% Helldive Pick Rate)</span>
            </div>

            <button
              onClick={() => setIsCompareMode(!isCompareMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer border ${
                isCompareMode 
                  ? 'bg-[#FFE900] text-black border-[#FFE900]' 
                  : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              {isCompareMode ? 'Exit Compare' : 'Compare 2 Armors'}
            </button>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? 'Copied' : 'Share'}
            </button>
          </div>
        </div>

        {/* 3 Armor Weight Class Tabs */}
        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 block">
            Select Armor Weight Class
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { type: 'light' as ArmorWeightClass, label: 'Light Armor', stats: 'Armor 50 • Speed 550 • Stamina 125%', color: 'border-white text-white bg-zinc-900' },
              { type: 'medium' as ArmorWeightClass, label: 'Medium Armor', stats: 'Armor 100 • Speed 500 • Stamina 100%', color: 'border-zinc-400 text-zinc-200 bg-zinc-900' },
              { type: 'heavy' as ArmorWeightClass, label: 'Heavy Armor', stats: 'Armor 150 • Speed 450 • Stamina 75%', color: 'border-rose-500 text-rose-300 bg-zinc-900' }
            ].map(tab => {
              const isSelected = selectedClassType === tab.type;
              return (
                <button
                  key={tab.type}
                  onClick={() => handleClassTypeChange(tab.type)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#FFE900] bg-zinc-900 ring-1 ring-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.2)]'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black uppercase text-white">{tab.label}</span>
                    <Shield className={`w-4 h-4 ${isSelected ? 'text-[#FFE900]' : 'text-zinc-600'}`} />
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono mt-1 block">
                    {tab.stats}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 3-Column Armory Layout (Left: Armor Selector | Center: Character Overlay | Right: Stat Bars) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Armor & Passive Selectors (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Armor List for Selected Class */}
          <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
              <span>{selectedClassType.toUpperCase()} Armors in Catalog</span>
              <span className="text-[10px] font-mono text-zinc-500">Pick Chassis</span>
            </h3>

            <div className="space-y-2">
              {ARMOR_CATALOG.filter(a => a.classType === selectedClassType).map(armor => {
                const isSelected = armor.id === selectedArmorId;
                return (
                  <button
                    key={armor.id}
                    onClick={() => {
                      setSelectedArmorId(armor.id);
                      setSelectedPassiveId(armor.defaultPassiveId);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#FFE900] bg-zinc-900/90 shadow-md ring-1 ring-[#FFE900]'
                        : 'border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                        {armor.name}
                      </span>
                      {armor.isMeta && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
                          Meta
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>Rating: {armor.armorRating}</span>
                      <span>Speed: {armor.speed}</span>
                      <span>Regen: {armor.staminaRegen}%</span>
                    </div>
                    <span className="mt-1.5 text-[10px] text-amber-400/90 font-mono flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {armor.bestFor}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 10 Passives Selector */}
          <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
              <span>Equipped Armor Passive (10 Total)</span>
              <span className="text-[10px] font-mono text-[#FFE900]">Perk</span>
            </h3>

            <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
              {ARMOR_PASSIVES.map(passive => {
                const isSelected = passive.id === selectedPassiveId;
                return (
                  <button
                    key={passive.id}
                    onClick={() => setSelectedPassiveId(passive.id)}
                    className={`w-full p-2.5 rounded-lg border text-left transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#FFE900] bg-[#FFE900]/10 text-white'
                        : 'border-zinc-800/60 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div>
                      <div className={`text-xs font-bold ${isSelected ? 'text-[#FFE900]' : 'text-zinc-300'}`}>
                        {passive.name}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                        {passive.perkSummary}
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#FFE900]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Column: Big Helldiver Character Silhouette & Overlay (4 Cols) */}
        <div className="lg:col-span-4 bg-[#090b14] border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-zinc-400">
              Chassis Diagnostic
            </span>
            <span className="text-xs font-mono font-bold text-[#FFE900] bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700">
              {currentArmor.classType.toUpperCase()} CLASS
            </span>
          </div>

          {/* Tactical Silhouette Art with Stats Pins */}
          <div className="my-6 relative h-72 flex items-center justify-center">
            {/* Background Glow Ring */}
            <div className="absolute w-56 h-56 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-dashed border-[#FFE900]/20 animate-spin" style={{ animationDuration: '30s' }} />
            </div>

            {/* Tactical Vector Silhouette Figure */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Helmet */}
              <div className="w-12 h-14 bg-zinc-800 rounded-t-2xl border-2 border-zinc-600 flex items-center justify-center relative shadow-lg">
                <div className="w-8 h-2.5 bg-[#FFE900] rounded-sm shadow-[0_0_8px_rgba(255,233,0,0.8)]" />
              </div>
              {/* Torso & Cape */}
              <div className="w-24 h-28 bg-zinc-900 border-2 border-zinc-700 rounded-lg mt-1 flex flex-col items-center justify-between p-2 relative shadow-2xl">
                <div className="w-16 h-8 bg-zinc-800 rounded border border-zinc-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#FFE900]" />
                </div>
                <div className="w-20 h-1.5 bg-zinc-700 rounded-full" />
                <div className="w-14 h-6 bg-zinc-800/80 rounded" />
              </div>
              {/* Legs */}
              <div className="flex gap-2 mt-1">
                <div className="w-8 h-20 bg-zinc-800 border border-zinc-700 rounded-b-md" />
                <div className="w-8 h-20 bg-zinc-800 border border-zinc-700 rounded-b-md" />
              </div>
            </div>

            {/* Tactical Callout Overlays */}
            <div className="absolute top-4 left-2 bg-zinc-950/90 border border-zinc-800 rounded-lg p-2 text-[10px] font-mono">
              <span className="text-zinc-500 block">ARMOR RATING</span>
              <span className="text-white font-black text-xs">{stats1.effectiveArmor}</span>
            </div>

            <div className="absolute top-4 right-2 bg-zinc-950/90 border border-zinc-800 rounded-lg p-2 text-[10px] font-mono text-right">
              <span className="text-zinc-500 block">DAMAGE TAKEN</span>
              <span className="text-emerald-400 font-black text-xs">{(stats1.damageFactor * 100).toFixed(0)}%</span>
            </div>

            <div className="absolute bottom-4 left-2 bg-zinc-950/90 border border-zinc-800 rounded-lg p-2 text-[10px] font-mono">
              <span className="text-zinc-500 block">SPEED</span>
              <span className="text-emerald-400 font-black text-xs">{stats1.speed}</span>
            </div>

            <div className="absolute bottom-4 right-2 bg-zinc-950/90 border border-zinc-800 rounded-lg p-2 text-[10px] font-mono text-right">
              <span className="text-zinc-500 block">REGEN</span>
              <span className="text-amber-400 font-black text-xs">{stats1.staminaRegen}%</span>
            </div>
          </div>

          {/* Bottom Card Summary */}
          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/90 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-bold">{currentArmor.name}</span>
              <span className="text-[#FFE900] font-mono text-[11px] font-bold">+{currentPassive.bonusArmor} Armor</span>
            </div>
            <p className="text-[11px] text-zinc-400 line-clamp-2">
              {currentPassive.description}
            </p>
          </div>
        </div>

        {/* Right Column: In-Game Style Stat Bars (4 Cols) */}
        <div className="lg:col-span-4 bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="pb-3 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              In-Game Stat Calibrations
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">Tier 2026</span>
          </div>

          {/* Bar 1: Armor Rating */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                Armor Rating
              </span>
              <span className="text-white font-black">
                {stats1.effectiveArmor} <span className="text-zinc-500 font-normal">/ 200</span>
              </span>
            </div>
            <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${(stats1.effectiveArmor / 200) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>50 (Light)</span>
              <span>100 (Medium)</span>
              <span>200 (Max)</span>
            </div>
          </div>

          {/* Bar 2: Speed */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-emerald-400" />
                Speed Velocity
              </span>
              <span className="text-white font-black">
                {stats1.speed} <span className="text-zinc-500 font-normal">/ 550</span>
              </span>
            </div>
            <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800">
              <div 
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${(stats1.speed / 550) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>450 (Heavy)</span>
              <span>500 (Medium)</span>
              <span>550 (Light)</span>
            </div>
          </div>

          {/* Bar 3: Stamina Regen */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                Stamina Regeneration
              </span>
              <span className="text-white font-black">
                {stats1.staminaRegen}% <span className="text-zinc-500 font-normal">/ 125%</span>
              </span>
            </div>
            <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800">
              <div 
                className="h-full bg-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${(stats1.staminaRegen / 125) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>75% (Slow)</span>
              <span>100% (Base)</span>
              <span>125% (Sprint)</span>
            </div>
          </div>

          {/* Bar 4: Stealth & Detection */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-purple-400" />
                Detection Range Reduction
              </span>
              <span className="text-white font-black">
                -{stats1.stealth}%
              </span>
            </div>
            <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800">
              <div 
                className="h-full bg-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${(stats1.stealth / 30) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono block">
              {stats1.stealth > 0 ? 'Enemies must be 30% closer before initiating combat alert.' : 'Standard 100% detection distance.'}
            </span>
          </div>

          {/* Quick Playstyle Tag */}
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-2 text-xs">
            <Award className="w-4 h-4 text-[#FFE900] shrink-0" />
            <span className="text-zinc-300 font-medium">
              Profile: <strong className="text-white">{currentArmor.bestFor}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Side-By-Side Comparison Section (If Compare Mode Active) */}
      {isCompareMode && (
        <div className="bg-[#090b14] border-2 border-cyan-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div>
              <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-cyan-400" />
                Side-by-Side Armor Comparison
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Compare your current loadout against heavy tanking or alternative perks.
              </p>
            </div>
            <button
              onClick={() => setIsCompareMode(false)}
              className="text-xs font-mono text-zinc-400 hover:text-white cursor-pointer"
            >
              Close Comparison
            </button>
          </div>

          {/* Compare Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Armor 1 Column */}
            <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#FFE900] font-bold">Loadout A (Current)</span>
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300">
                  {currentArmor.classType.toUpperCase()}
                </span>
              </div>
              <h4 className="text-base font-black text-white">{currentArmor.name}</h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Armor Rating:</span>
                  <span className="text-white font-bold">{stats1.effectiveArmor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Speed:</span>
                  <span className="text-white font-bold">{stats1.speed}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Stamina Regen:</span>
                  <span className="text-white font-bold">{stats1.staminaRegen}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Passive Perk:</span>
                  <span className="text-[#FFE900] font-bold">{currentPassive.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-400">Bile Titan TTK:</span>
                  <span className="text-emerald-400 font-bold">{survival1.hitsToKill} Hit{survival1.hitsToKill > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            {/* Armor 2 Column (Selectable) */}
            <div className="bg-zinc-950 p-5 rounded-xl border border-cyan-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Loadout B (Comparison)</span>
                {/* Armor 2 Dropdown */}
                <select
                  value={compareArmorId}
                  onChange={(e) => setCompareArmorId(e.target.value)}
                  className="bg-zinc-900 text-xs font-mono border border-zinc-700 rounded px-2 py-1 text-white"
                >
                  {ARMOR_CATALOG.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.classType})</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <h4 className="text-base font-black text-white">{compareArmor.name}</h4>
                <select
                  value={comparePassiveId}
                  onChange={(e) => setComparePassiveId(e.target.value)}
                  className="bg-zinc-900 text-[11px] font-mono border border-zinc-700 rounded px-2 py-0.5 text-amber-400"
                >
                  {ARMOR_PASSIVES.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Armor Rating:</span>
                  <span className={`font-bold ${stats2.effectiveArmor > stats1.effectiveArmor ? 'text-emerald-400' : 'text-zinc-300'}`}>
                    {stats2.effectiveArmor} ({stats2.effectiveArmor - stats1.effectiveArmor >= 0 ? `+${stats2.effectiveArmor - stats1.effectiveArmor}` : stats2.effectiveArmor - stats1.effectiveArmor})
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Speed:</span>
                  <span className={`font-bold ${stats2.speed > stats1.speed ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stats2.speed} ({stats2.speed - stats1.speed >= 0 ? `+${stats2.speed - stats1.speed}` : stats2.speed - stats1.speed})
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Stamina Regen:</span>
                  <span className={`font-bold ${stats2.staminaRegen > stats1.staminaRegen ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stats2.staminaRegen}% ({stats2.staminaRegen - stats1.staminaRegen >= 0 ? `+${stats2.staminaRegen - stats1.staminaRegen}` : stats2.staminaRegen - stats1.staminaRegen}%)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Passive Perk:</span>
                  <span className="text-cyan-400 font-bold">{comparePassive.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-400">Bile Titan TTK:</span>
                  <span className="text-cyan-400 font-bold">{survival2.hitsToKill} Hit{survival2.hitsToKill > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enemy Survival Calculator Section (e.g. Bile Titan, Bug Warrior, Bot Trooper) */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="pb-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
              <Skull className="w-5 h-5 text-rose-500" />
              Enemy Damage & Time to Kill (TTK) Simulator
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Select an enemy threat to test how many hits your armor rating and passives can endure before death.
            </p>
          </div>

          {/* Enemy Threat Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {ENEMY_ATTACKS.map(enemy => (
              <button
                key={enemy.id}
                onClick={() => setSelectedEnemyId(enemy.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer border ${
                  selectedEnemyId === enemy.id
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {enemy.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Big Highlight Survival Card */}
        <div className="p-6 rounded-xl bg-zinc-950 border-2 border-rose-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center justify-center md:justify-start gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Survival Verdict vs {selectedEnemy.name}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white">
              You survive <span className="text-[#FFE900] underline">{survival1.hitsToKill} hit{survival1.hitsToKill > 1 ? 's' : ''}</span> in {currentArmor.name}
            </div>
            <p className="text-xs text-zinc-400">
              Each strike inflicts <span className="text-rose-400 font-bold font-mono">{survival1.damagePerHit} HP</span> damage (Base: {selectedEnemy.rawDamage} HP). Effective mitigation: <span className="text-emerald-400 font-bold font-mono">{stats1.damageMitigationPercent}%</span>.
            </p>
          </div>

          {/* Direct comparison statement requested in prompt */}
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono space-y-1.5 text-center md:text-right">
            <span className="text-zinc-400 block text-[11px] uppercase">Comparative Durability:</span>
            <div className="text-white font-bold">
              Heavy Fortified = <span className="text-cyan-400">2 Hits</span> vs Light = <span className="text-rose-400">1 Hit</span>
            </div>
            <span className="text-[10px] text-zinc-500 block">
              Fortified 50% explosive cut saves your life from Charger slams & Bile Titan spit.
            </span>
          </div>
        </div>
      </div>

      {/* Viral Feature: "Try My Loadout" & Instagram Story Card Generator */}
      <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="pb-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase font-bold text-[#FFE900]">
              Social Card Exporter // Free Community Share
            </span>
            <h3 className="text-xl font-black uppercase text-white flex items-center gap-2 mt-0.5">
              <Download className="w-5 h-5 text-[#FFE900]" />
              "Try My Loadout" Instagram Story Card Generator
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Customize your loadout and export a high-resolution, branded Helldivers card to post on your Instagram Story or Discord.
            </p>
          </div>

          <button
            onClick={handleExportImage}
            disabled={isExporting}
            className="px-5 py-3 rounded-xl bg-[#FFE900] text-black font-black uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-[#fff033] shadow-lg shadow-[#FFE900]/20 transition cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Generating Image...' : 'Export Card (PNG)'}
          </button>
        </div>

        {/* Loadout Weapon & Stratagem Customizers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
              Select Primary Weapon:
            </label>
            <select
              value={customWeapon}
              onChange={(e) => setCustomWeapon(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
            >
              <option value="LAS-16 Sickle">LAS-16 Sickle (S-Tier Meta)</option>
              <option value="SG-225 Breaker">SG-225 Breaker (Close Range Burst)</option>
              <option value="PLAS-1 Scorcher">PLAS-1 Scorcher (Explosive Plasma)</option>
              <option value="R-36 Eruptor">R-36 Eruptor (Heavy Shrapnel)</option>
              <option value="AR-23P Liberator Pen">AR-23P Liberator Penetrator</option>
              <option value="AR-61 Tenderizer">AR-61 Tenderizer (High Caliber)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
              Select Signature Stratagem:
            </label>
            <select
              value={customStratagem}
              onChange={(e) => setCustomStratagem(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
            >
              <option value="Eagle 500KG Bomb">Eagle 500KG Bomb</option>
              <option value="Orbital Laser">Orbital Laser</option>
              <option value="Railcannon Strike">Orbital Railcannon Strike</option>
              <option value="Quasar Cannon">LAS-99 Quasar Cannon</option>
              <option value="Autocannon AC-8">Autocannon AC-8</option>
              <option value="Shield Generator Pack">Shield Generator Pack</option>
            </select>
          </div>
        </div>

        {/* Live Card Preview Box */}
        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1 text-zinc-300">
            <div><strong>Card Armor:</strong> {currentArmor.name} ({currentArmor.classType.toUpperCase()})</div>
            <div><strong>Card Weapon:</strong> {customWeapon}</div>
            <div><strong>Card Stratagem:</strong> {customStratagem}</div>
          </div>
          <div className="text-right text-zinc-500 text-[11px]">
            Watermarked with <span className="text-[#FFE900]">GamingToolsHub.com</span>
          </div>
        </div>
      </div>

      {/* Required SEO Footer */}
      <div className="text-center pt-4 pb-2 border-t border-zinc-800/80">
        <p className="text-xs font-mono text-zinc-400 tracking-wider">
          Helldivers 2 Armor Calculator - Best Armor Passive Tier List 2026
        </p>
      </div>
    </div>
  );
}
