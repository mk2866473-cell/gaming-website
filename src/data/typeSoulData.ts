/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TypeSoulGrade {
  id: string;
  name: string;
  maxPoints: number;
  description: string;
}

export const TYPE_SOUL_GRADES: TypeSoulGrade[] = [
  { id: 'grade_5', name: 'Grade 5', maxPoints: 10, description: 'Novice Soul Reaper / Arrancar / Quincy' },
  { id: 'grade_4', name: 'Grade 4', maxPoints: 20, description: 'Apprentice rank with basic skill tree access' },
  { id: 'grade_3', name: 'Grade 3', maxPoints: 30, description: 'Intermediate combat rank' },
  { id: 'grade_2', name: 'Grade 2', maxPoints: 40, description: 'Advanced combat rank with tier-2 skill tree mastery' },
  { id: 'grade_1', name: 'Grade 1', maxPoints: 50, description: 'Veteran rank with access to 40+ threshold master skills' },
  { id: 'semi_grade_1', name: 'Semi-Grade 1', maxPoints: 55, description: 'Near-peak rank for high-end hybrid builds' },
  { id: 'elite_grade', name: 'Elite Grade', maxPoints: 60, description: 'Maximum cap rank (60 Points) for endgame Shikai/Bankai/Resurreccion' },
];

export type StatType = 'hakuda' | 'kendo' | 'medic' | 'speed' | 'kido';

export interface StatDefinition {
  id: StatType;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  icon: string;
  description: string;
  thresholds: Array<{ points: number; skillName: string; perk: string }>;
}

export const STAT_TREES: Record<StatType, StatDefinition> = {
  kendo: {
    id: 'kendo',
    name: 'Kendo',
    color: 'text-red-400',
    bgColor: 'bg-red-950/60',
    borderColor: 'border-red-500/40',
    accentColor: 'from-red-600 to-rose-600',
    icon: 'Swords',
    description: 'Blade mastery, heavy slash damage, armor breakers, and weapon stances.',
    thresholds: [
      { points: 10, skillName: 'Flowing Slash', perk: '+5% Slash Damage & Light Armor Break' },
      { points: 25, skillName: 'Vertical Slash / Scythe Stance', perk: 'Heavy stagger attack & posture damage' },
      { points: 40, skillName: 'Suiju / Master Kendo', perk: 'Massive heavy blade combo multiplier' },
      { points: 50, skillName: 'Executioner Slash', perk: 'Executes targets below 15% HP' },
      { points: 60, skillName: 'Grand Master Blade', perk: 'Maximal sword damage & posture breaking' },
    ]
  },
  hakuda: {
    id: 'hakuda',
    name: 'Hakuda',
    color: 'text-amber-400',
    bgColor: 'bg-amber-950/60',
    borderColor: 'border-amber-500/40',
    accentColor: 'from-amber-600 to-yellow-600',
    icon: 'Fist',
    description: 'Unarmed martial arts, hand-to-hand combo extenders, grab moves, and iron body.',
    thresholds: [
      { points: 10, skillName: 'Iron Fist', perk: '+5% Unarmed Stun Duration & Knockback' },
      { points: 25, skillName: 'Gekkoku / Shoulder Charge', perk: 'Unblockable rush attack & air combo launcher' },
      { points: 40, skillName: 'Martial Master Stance', perk: 'Unlocks advanced martial arts combo strings' },
      { points: 50, skillName: 'Demolition Strike', perk: 'Destroys opponent guard instantly' },
      { points: 60, skillName: 'Hakuda Emperor', perk: 'Maximal unarmed DMG & grappling finishers' },
    ]
  },
  speed: {
    id: 'speed',
    name: 'Speed',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/60',
    borderColor: 'border-emerald-500/40',
    accentColor: 'from-emerald-600 to-teal-600',
    icon: 'Zap',
    description: 'Movement mobility, flash step range, evasive i-frame counters, and phantom step.',
    thresholds: [
      { points: 10, skillName: 'Quick Step', perk: '+15% Flash Step distance & stamina regen' },
      { points: 25, skillName: 'Strabismus / Evasive Dodge', perk: 'Passively dodges 1 incoming strike per 20s' },
      { points: 40, skillName: 'Ghost Step', perk: 'Leaves behind shadow clone that explodes' },
      { points: 50, skillName: 'Flash Master', perk: 'Triple flash step burst with zero delay' },
      { points: 60, skillName: 'God of Speed', perk: 'Unmatched evasive mobility & speed blitz' },
    ]
  },
  kido: {
    id: 'kido',
    name: 'Kido',
    color: 'text-purple-400',
    bgColor: 'bg-purple-950/60',
    borderColor: 'border-purple-500/40',
    accentColor: 'from-purple-600 to-indigo-600',
    icon: 'Sparkles',
    description: 'Spiritual energy blasts, Hado destruction spells, Bakudo restraints, and AOE zone control.',
    thresholds: [
      { points: 10, skillName: 'Sho / Hado #1', perk: '+10% Spirit Energy projectile speed' },
      { points: 25, skillName: 'Byakurai / Thunder Blast', perk: 'Ranged piercing beam attack' },
      { points: 40, skillName: 'Kurohitsugi / Black Coffin', perk: 'Summons crushing gravity zone' },
      { points: 50, skillName: 'Hado Master', perk: '+30% Spirit DMG & reduced cooldowns' },
      { points: 60, skillName: 'Grand Kido Sage', perk: 'Ultimate ranged spiritual destruction' },
    ]
  },
  medic: {
    id: 'medic',
    name: 'Medic',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-950/60',
    borderColor: 'border-cyan-500/40',
    accentColor: 'from-cyan-600 to-blue-600',
    icon: 'HeartHandshake',
    description: 'Kaido healing arts, team squad regeneration, self-revive, and damage reduction shields.',
    thresholds: [
      { points: 10, skillName: 'Healing Palm', perk: 'Restores +15% HP over 5s' },
      { points: 25, skillName: 'Cleanse / Squad Heal', perk: 'Removes burn/poison & heals nearby allies' },
      { points: 40, skillName: 'High Medic Ward', perk: 'Reduces incoming burst damage by 25%' },
      { points: 50, skillName: 'Divine Kaido', perk: 'Passive HP regen during active combat' },
      { points: 60, skillName: 'Soul Saint', perk: 'Self-revive on fatal damage once per raid' },
    ]
  }
};

export interface HybridBuildPreset {
  id: string;
  name: string;
  description: string;
  stats: Record<StatType, number>;
  unlockedSkills: string[];
}

export const TYPE_SOUL_PRESETS: HybridBuildPreset[] = [
  {
    id: 'pure_kendo',
    name: 'Pure Kendo Slayer (40 Kendo / 20 Speed)',
    description: 'High-damage blade master with Ghost Step mobility for PvP single-target execution.',
    stats: { kendo: 40, hakuda: 0, speed: 20, kido: 0, medic: 0 },
    unlockedSkills: ['Suiju / Master Kendo', 'Executioner Slash', 'Quick Step']
  },
  {
    id: 'pure_hakuda',
    name: 'Pure Hakuda Brawler (40 Hakuda / 20 Speed)',
    description: 'Aggressive hand-to-hand martial artist with shoulder charges and heavy stuns.',
    stats: { kendo: 0, hakuda: 40, speed: 20, kido: 0, medic: 0 },
    unlockedSkills: ['Martial Master Stance', 'Gekkoku Charge', 'Quick Step']
  },
  {
    id: 'flash_blade',
    name: 'Flash Blade Hybrid (30 Kendo / 30 Speed)',
    description: 'Balanced hybrid offering both sword combo extenders and Strabismus evasive dodges.',
    stats: { kendo: 30, hakuda: 0, speed: 30, kido: 0, medic: 0 },
    unlockedSkills: ['Vertical Slash', 'Strabismus Dodge', 'Flowing Slash']
  },
  {
    id: 'kido_caster',
    name: 'Pure Kido Sage (40 Kido / 20 Speed)',
    description: 'Long-range spirit energy caster with Black Coffin AOE and flash step zoning.',
    stats: { kendo: 0, hakuda: 0, speed: 20, kido: 40, medic: 0 },
    unlockedSkills: ['Kurohitsugi Black Coffin', 'Byakurai', 'Quick Step']
  },
  {
    id: 'medic_support',
    name: 'High Medic Priest (40 Medic / 20 Kido)',
    description: 'Ultimate squad support healer with damage mitigation wards and spirit blasts.',
    stats: { kendo: 0, hakuda: 0, speed: 0, kido: 20, medic: 40 },
    unlockedSkills: ['High Medic Ward', 'Cleanse Squad Heal', 'Hado Blast']
  }
];

export const TYPE_SOUL_FAQS = [
  {
    question: 'What is the maximum skill point cap in Roblox Type Soul?',
    answer: 'At Elite Grade (the highest rank), players receive a maximum cap of 60 total skill points to distribute across Kendo, Hakuda, Speed, Kido, and Medic tree paths.'
  },
  {
    question: 'How do stat threshold skill unlocks work in Type Soul?',
    answer: 'Skills unlock at specific stat investment thresholds: 10 points (Basic), 25 points (Advanced), 40 points (Master Skill), 50 points (Grand Skill), and 60 points (Emperor Skill).'
  },
  {
    question: 'What is a Hybrid Lockout Warning in Type Soul?',
    answer: 'Investing 40+ points into a single primary stat (like Kendo or Hakuda) uses up two-thirds of your 60-point cap, preventing you from reaching 40+ Master skills in any other tree path.'
  }
];
