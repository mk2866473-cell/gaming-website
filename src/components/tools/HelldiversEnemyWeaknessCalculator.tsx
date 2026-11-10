/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Crosshair, Skull, Shield, Zap, Target, Search, HelpCircle, 
  Award, Share2, Download, Check, Sparkles, AlertTriangle, 
  ChevronRight, Eye, Flame, Bomb, Swords, Filter, RotateCcw, 
  Info, ArrowLeft, ArrowRight
} from 'lucide-react';

export type Faction = 'bugs' | 'bots' | 'illuminate';

export interface Weakspot {
  label: string;
  multiplier: string;
  xPct: number; // 0 - 100 for SVG diagram position
  yPct: number;
  description: string;
}

export interface WeaponCounter {
  name: string;
  category: 'Primary' | 'Secondary' | 'Support' | 'Explosive';
  effectivenessPct: number; // 0 - 100%
  note: string;
  minLevel: number;
}

export interface StratagemCounter {
  name: string;
  tier: 'S Tier' | 'A Tier' | 'B Tier' | 'C Tier' | 'F Tier';
  note: string;
}

export interface EnemyData {
  id: string;
  name: string;
  faction: Faction;
  baseHp: number;
  armorLevel: number; // 0 = None, 2 = Medium, 5 = Heavy, 6 = Super Heavy
  speed: 'Slow' | 'Medium' | 'Fast' | 'Extreme';
  dangerRating: 'Low' | 'Medium' | 'High' | 'Lethal';
  weakspots: Weakspot[];
  bestWeapons: WeaponCounter[];
  worstWeapons: { name: string; reason: string }[];
  bestStratagems: StratagemCounter[];
  tacticalTip: string;
  threeStepGuide: [string, string, string];
  h2Title: string;
  h2Content: string;
  weakspotH2Title: string;
  weakspotH2Content: string;
}

export interface MatrixWeapon {
  id: string;
  name: string;
  category: string;
  apLevel: number;
}

export const MATRIX_WEAPONS: MatrixWeapon[] = [
  { id: 'breaker', name: 'SG-225 Breaker', category: 'Primary Shotgun', apLevel: 2 },
  { id: 'sickle', name: 'LAS-16 Sickle', category: 'Energy Rifle', apLevel: 2 },
  { id: 'dominator', name: 'JAR-5 Dominator', category: 'Heavy Primary', apLevel: 3 },
  { id: 'eruptor', name: 'R-36 Eruptor', category: 'Explosive Rifle', apLevel: 3 },
  { id: 'autocannon', name: 'AC-8 Autocannon', category: 'Support Cannon', apLevel: 4 },
  { id: 'railgun', name: 'RS-422 Railgun', category: 'Support Precision', apLevel: 5 },
  { id: 'quasar', name: 'LAS-99 Quasar', category: 'Support Anti-Tank', apLevel: 6 },
  { id: 'recoilless', name: 'GR-8 Recoilless Rifle', category: 'Support Heavy Rocket', apLevel: 6 },
  { id: 'spear', name: 'FAF-14 Spear', category: 'Support Homing Missile', apLevel: 6 },
  { id: 'flamethrower', name: 'FLAM-44 Flamethrower', category: 'Support Fire', apLevel: 3 }
];

export const ENEMIES_CATALOG: EnemyData[] = [
  // TERMINIDS (BUGS)
  {
    id: 'charger',
    name: 'Charger',
    faction: 'bugs',
    baseHp: 2500,
    armorLevel: 5,
    speed: 'Fast',
    dangerRating: 'High',
    weakspots: [
      { label: 'Legs (Armor Strip)', multiplier: '100% after 2 AP5 shots', xPct: 35, yPct: 70, description: 'Strip heavy chitin with Quasar or Railgun, then fire primary at exposed orange flesh.' },
      { label: 'Unarmored Rear Abdomen', multiplier: '100% Explosive / 10% Ballistic', xPct: 75, yPct: 45, description: 'Bulbous orange tail takes full explosive damage. Destroying it causes fatal bleeding.' },
      { label: 'Head (Direct Hit)', multiplier: '100% Anti-Tank One-Shot', xPct: 20, yPct: 35, description: 'Direct Recoilless or Quasar to the forehead kills instantly.' }
    ],
    bestWeapons: [
      { name: 'RS-422 Railgun', category: 'Support', effectivenessPct: 95, note: 'Strips front leg armor in 2 safe mode shots', minLevel: 20 },
      { name: 'LAS-99 Quasar Cannon', category: 'Support', effectivenessPct: 92, note: '1 hit to head or leg strips chitin instantly', minLevel: 20 },
      { name: 'GR-8 Recoilless Rifle', category: 'Support', effectivenessPct: 90, note: 'One-shot kill on direct forehead impact', minLevel: 8 },
      { name: 'R-36 Eruptor', category: 'Primary', effectivenessPct: 65, note: 'Shoots rear abdomen for fast bleed-out', minLevel: 10 }
    ],
    worstWeapons: [
      { name: 'Light Primaries (Liberator/Sickle)', reason: 'Deflects 100% off front and side heavy chitin' },
      { name: 'Machine Guns', reason: 'Zero damage to frontal armor unless targeting rear' }
    ],
    bestStratagems: [
      { name: 'Orbital Railcannon Strike', tier: 'S Tier', note: 'Auto-targets and one-shots Charger instantly' },
      { name: 'Eagle 500KG Bomb', tier: 'A Tier', note: 'Lethal within 5m blast radius' },
      { name: 'Orbital Laser', tier: 'B Tier', note: 'Burns chitin but wastes orbital duration' },
      { name: 'Eagle Gatling Strafe', tier: 'F Tier', note: 'Completely useless against heavy armor' }
    ],
    tacticalTip: 'Side-step its charge at the last second, then fire Quasar or Railgun at the front leg. Switch to primary shotgun to shred the pink flesh!',
    threeStepGuide: [
      'Dodge the Charger’s initial rush by sprinting sideways at a 90-degree angle.',
      'Fire an Anti-Tank shot (Quasar, Recoilless, or 2 Railgun shots) at its front leg chitin.',
      'Unload your primary weapon (Breaker Incendiary / Dominator) directly into the exposed pink leg tissue.'
    ],
    h2Title: 'How to kill Charger Helldivers 2',
    h2Content: 'To kill a Charger in Helldivers 2 fast, use heavy anti-tank support weapons like the LAS-99 Quasar Cannon, GR-8 Recoilless Rifle, or RS-422 Railgun. Target one of its front legs to strip away the armor chitin, revealing vulnerable soft flesh. Once stripped, unload your primary weapon directly into the exposed leg to kill the Charger in under 3 seconds.',
    weakspotH2Title: 'Charger weakspot',
    weakspotH2Content: 'The Charger has two main weakspots: its front leg chitin (which takes 100% damage once stripped by armor-penetrating weapons) and its unarmored orange rear abdomen. Destroying the rear abdomen causes the Charger to bleed out within 10 seconds.'
  },
  {
    id: 'bile-titan',
    name: 'Bile Titan',
    faction: 'bugs',
    baseHp: 6000,
    armorLevel: 6,
    speed: 'Medium',
    dangerRating: 'Lethal',
    weakspots: [
      { label: 'Head (Open Mouth Spew)', multiplier: '1.5x Damage', xPct: 20, yPct: 25, description: 'Timing an Anti-Tank missile directly into its open mouth during bile spew deals massive critical damage.' },
      { label: 'Underbelly Sacs', multiplier: '100% Unarmored', xPct: 50, yPct: 60, description: 'Pop both green glowing sacs underneath to disable its range attack and deal 2,500 damage.' }
    ],
    bestWeapons: [
      { name: 'FAF-14 Spear', category: 'Support', effectivenessPct: 98, note: 'Locks onto head for 1-2 hit decapitation', minLevel: 13 },
      { name: 'LAS-99 Quasar Cannon', category: 'Support', effectivenessPct: 90, note: '2 direct headshots kill instantly', minLevel: 20 },
      { name: 'GR-8 Recoilless Rifle', category: 'Support', effectivenessPct: 88, note: '2 precise headshots eliminate it', minLevel: 8 },
      { name: 'AC-8 Autocannon', category: 'Support', effectivenessPct: 70, note: 'Destroys underbelly sacs in 4 shots', minLevel: 5 }
    ],
    worstWeapons: [
      { name: 'All Primary Primaries', reason: 'Deflects completely off leg and carapace armor' },
      { name: 'Flamethrower', reason: 'Cannot reach high torso or head safely' }
    ],
    bestStratagems: [
      { name: 'Eagle 500KG Bomb', tier: 'S Tier', note: 'Direct hit or landing under torso oneshots' },
      { name: 'Orbital Railcannon Strike', tier: 'S Tier', note: 'Takes ~80% of HP and stuns titan' },
      { name: 'Orbital Laser', tier: 'A Tier', note: 'Melt carapace over 12 seconds' }
    ],
    tacticalTip: 'Shoot the glowing green belly sacs first with primary or Autocannon to permanently disable its ranged acid vomit, then hit the head with Spear or 500KG!',
    threeStepGuide: [
      'Bait the Bile Titan into starting its acid spew animation.',
      'Pop its lower glowing green underbelly sacs to remove its ranged attack and chop 2,500 HP.',
      'Call down an Eagle 500KG Bomb directly beneath its body or land a Spear missile square in its forehead.'
    ],
    h2Title: 'How to kill Bile Titan Helldivers 2',
    h2Content: 'Killing a Bile Titan requires heavy anti-tank stratagems or high-tier heavy support weapons. The most effective combo is throwing an Eagle 500KG Bomb directly under its legs or firing two LAS-99 Quasar Cannon / Recoilless Rifle shots into its forehead when it opens its mouth to spew acid.',
    weakspotH2Title: 'Bile Titan weakspot',
    weakspotH2Content: 'The primary weakspot on a Bile Titan is its head when opening its mouth to spew acid (1.5x damage multiplier). Secondary weakspots are the green sacs underneath its abdomen; destroying them disables its acid spew attack and removes nearly half its total health pool.'
  },
  {
    id: 'impaler',
    name: 'Impaler',
    faction: 'bugs',
    baseHp: 4000,
    armorLevel: 5,
    speed: 'Slow',
    dangerRating: 'Lethal',
    weakspots: [
      { label: 'Exposed Face (When Tentacles Burried)', multiplier: '2.0x Damage / Armor 0', xPct: 30, yPct: 40, description: 'When tentacles dig into ground, the face shield opens revealing unarmored orange flesh.' },
      { label: 'Tentacle Joints', multiplier: '1.0x Damage', xPct: 70, yPct: 80, description: 'Destroying active tentacles stuns the Impaler and forces it to retract.' }
    ],
    bestWeapons: [
      { name: 'AC-8 Autocannon', category: 'Support', effectivenessPct: 95, note: 'Melts exposed face in 4 rapid shots', minLevel: 5 },
      { name: 'JAR-5 Dominator', category: 'Primary', effectivenessPct: 88, note: 'Shreds fleshy face when unshielded', minLevel: 1 },
      { name: 'LAS-99 Quasar Cannon', category: 'Support', effectivenessPct: 90, note: 'One-shots open face', minLevel: 20 }
    ],
    worstWeapons: [
      { name: 'Light Primaries (Frontal)', reason: 'Deflects off heavy face plate when tentacles are retracted' }
    ],
    bestStratagems: [
      { name: 'Orbital Precision Strike', tier: 'S Tier', note: 'Impaler remains stationary while burrowing' },
      { name: 'Eagle 500KG Bomb', tier: 'S Tier', note: 'Wipes Impaler and burrowed tentacles' }
    ],
    tacticalTip: 'Wait for the Impaler to drive its three tentacles into the ground. Its heavy armor face plate will split open, exposing 0-armor fleshy tissue that melts to any primary weapon!',
    threeStepGuide: [
      'Locate the stationary Impaler by tracing tentacle roots back to the main body.',
      'Wait for its front face shield to split open as tentacles enter the soil.',
      'Unload an Autocannon magazine or heavy primary directly into the unarmored fleshy face.'
    ],
    h2Title: 'How to kill Impaler Helldivers 2',
    h2Content: 'To eliminate an Impaler, wait until it implants its three tentacles into the dirt. This forces its heavy frontal armor plate to fold open, revealing zero-armor orange flesh. Shoot this exposed area with an Autocannon, Machine Gun, or Primary weapon to kill it in seconds.',
    weakspotH2Title: 'Impaler weakspot',
    weakspotH2Content: 'The Impaler’s weakspot is its inner face neck tissue, which becomes completely unarmored (Armor 0, 2.0x damage) whenever its tentacles are buried underground.'
  },
  {
    id: 'stalker',
    name: 'Stalker',
    faction: 'bugs',
    baseHp: 1000,
    armorLevel: 2,
    speed: 'Extreme',
    dangerRating: 'Lethal',
    weakspots: [
      { label: 'Head', multiplier: '1.5x Damage', xPct: 25, yPct: 35, description: 'Headshots stagger Stalkers and prevent tongue lash.' },
      { label: 'Wings / Cloaked Body', multiplier: '1.0x Damage', xPct: 60, yPct: 50, description: 'High stagger weapons stop their stealth ambush rush.' }
    ],
    bestWeapons: [
      { name: 'SG-225IE Breaker Incendiary', category: 'Primary', effectivenessPct: 96, note: 'Fire sets cloaked stalkers visible', minLevel: 1 },
      { name: 'JAR-5 Dominator', category: 'Primary', effectivenessPct: 94, note: 'High stagger knocks Stalker backward', minLevel: 1 },
      { name: 'P-4 Senator', category: 'Secondary', effectivenessPct: 85, note: 'Heavy stopping power pistol', minLevel: 1 }
    ],
    worstWeapons: [
      { name: 'DMRs / Snipers', reason: 'Hard to track fast, cloaked jumping targets in close quarters' }
    ],
    bestStratagems: [
      { name: 'Guard Dog Rover', tier: 'S Tier', note: 'Auto-targets cloaked stalkers before you see them' },
      { name: 'Eagle Cluster Bomb', tier: 'A Tier', note: 'Clears Stalker lair surrounding areas' }
    ],
    tacticalTip: 'Always prioritize Stalkers! Use staggering weapons like the Dominator or Punisher to break their attack animation, then follow the smoke trail to destroy their Stalker Lair hive!',
    threeStepGuide: [
      'Equip a high-stagger weapon (Dominator, Punisher, or Breaker Incendiary).',
      'Aim for the head to interrupt their ragdoll tongue strike.',
      'Trace their retreat vector straight to the Stalker Nest and seal the holes with grenades.'
    ],
    h2Title: 'How to kill Stalker Helldivers 2',
    h2Content: 'Stalkers are deadly stealth predators that jump and knock players down. Kill Stalkers using high-stagger weapons like the JAR-5 Dominator, SG-225 Punisher, or SG-225IE Breaker Incendiary. Fire directly at their head to stagger them back, then trace their spawn direction to destroy the Stalker Lair.',
    weakspotH2Title: 'Stalker weakspot',
    weakspotH2Content: 'The Stalker weakspot is its head and neck region. Hitting the head delivers 1.5x damage and interrupts their aggressive ragdoll whip attack.'
  },
  {
    id: 'bile-spewer',
    name: 'Bile Spewer',
    faction: 'bugs',
    baseHp: 1000,
    armorLevel: 2,
    speed: 'Medium',
    dangerRating: 'High',
    weakspots: [
      { label: 'Green Abdomen Sac', multiplier: '2.0x Explosive Damage', xPct: 70, yPct: 50, description: 'Blowing up the sac triggers an AoE explosion killing nearby scavengers.' },
      { label: 'Armored Forehead', multiplier: '1.0x (Medium AP required on Diff 7+)', xPct: 25, yPct: 30, description: 'Armored Spewers require Medium AP to headshot.' }
    ],
    bestWeapons: [
      { name: 'R-36 Eruptor', category: 'Primary', effectivenessPct: 98, note: 'One-shots sac causing massive explosion', minLevel: 10 },
      { name: 'AC-8 Autocannon', category: 'Support', effectivenessPct: 95, note: '2 shots pop sac or forehead', minLevel: 5 },
      { name: 'Grenade Pistol', category: 'Secondary', effectivenessPct: 90, note: '1 grenade pops abdomen instantly', minLevel: 1 }
    ],
    worstWeapons: [
      { name: 'Light Pistols', reason: 'Low impact damage takes full mag to pop green sac' }
    ],
    bestStratagems: [
      { name: 'Eagle Cluster Bomb', tier: 'S Tier', note: 'Wipes full hordes of Bile Spewers' },
      { name: 'Orbital Gas Strike', tier: 'A Tier', note: 'Corrodes armored spewer pods' }
    ],
    tacticalTip: 'Use explosive weapons like the Grenade Pistol or Autocannon on their massive rear sac. The resulting explosion deals 2.0x damage and destroys surrounding bug hordes!',
    threeStepGuide: [
      'Maintain distance to avoid their instant-kill artillery or spew stream.',
      'Target their swollen green rear abdomen with an explosive weapon (Eruptor, Autocannon, Grenade Pistol).',
      'Watch the sac explode, clearing all scavengers in a 5-meter radius.'
    ],
    h2Title: 'How to kill Bile Spewer Helldivers 2',
    h2Content: 'Kill Bile Spewers easily using explosive weapons. Guns like the R-36 Eruptor, AC-8 Autocannon, or Impact Grenades pop their large green rear sac in 1-2 hits, causing a massive acid explosion that kills the spewer and surrounding bugs.',
    weakspotH2Title: 'Bile Spewer weakspot',
    weakspotH2Content: 'The Bile Spewer’s primary weakspot is its huge green acid abdomen sac, taking 200% explosive damage.'
  },
  {
    id: 'hive-guard',
    name: 'Hive Guard',
    faction: 'bugs',
    baseHp: 800,
    armorLevel: 3,
    speed: 'Slow',
    dangerRating: 'Medium',
    weakspots: [
      { label: 'Unarmored Red Belly', multiplier: '1.0x Damage', xPct: 50, yPct: 70, description: 'Shoot underneath or flank when they turtle.' },
      { label: 'Armored Face Shield', multiplier: 'Medium AP penetrate', xPct: 25, yPct: 35, description: 'Deflects Light AP weapons when in defensive posture.' }
    ],
    bestWeapons: [
      { name: 'JAR-5 Dominator', category: 'Primary', effectivenessPct: 95, note: 'Punches through front head shield', minLevel: 1 },
      { name: 'PLAS-1 Scorcher', category: 'Primary', effectivenessPct: 92, note: 'Explosive splash bypasses armor', minLevel: 1 }
    ],
    worstWeapons: [
      { name: 'AR-23 Liberator', reason: 'Deflects off frontal shield when guarded' }
    ],
    bestStratagems: [
      { name: 'Eagle Airstrike', tier: 'S Tier', note: 'Wipes groups of Hive Guards' },
      { name: 'Orbital Airburst', tier: 'A Tier', note: 'Shreds unarmored bellies' }
    ],
    tacticalTip: 'When a Hive Guard turtles up behind its front shields, flank around its sides or use a Medium AP weapon (Dominator / Slugger) to punch straight through.',
    threeStepGuide: [
      'Identify the Hive Guard entering defensive shield stance.',
      'Equip a Medium AP weapon (JAR-5 Dominator, Scorcher) or grenade.',
      'Fire directly through the red face plate or shoot its soft lower joints.'
    ],
    h2Title: 'How to kill Hive Guard Helldivers 2',
    h2Content: 'To kill a Hive Guard in Helldivers 2, use Medium Armor Penetration weapons like the JAR-5 Dominator or PLAS-1 Scorcher. Alternatively, wait for it to turtle up and throw a grenade behind it.',
    weakspotH2Title: 'Hive Guard weakspot',
    weakspotH2Content: 'The Hive Guard weakspots are its soft red underbelly and leg joints which bypass its heavy frontal head shield.'
  },

  // AUTOMATONS (BOTS)
  {
    id: 'hulk',
    name: 'Hulk (Bruiser / Scorcher)',
    faction: 'bots',
    baseHp: 2000,
    armorLevel: 5,
    speed: 'Medium',
    dangerRating: 'Lethal',
    weakspots: [
      { label: 'Glowing Red Eye Visor', multiplier: '1.5x Critical (AP4+ required)', xPct: 45, yPct: 25, description: 'Precise Anti-Tank or Autocannon shot to the glowing eye slot kills instantly.' },
      { label: 'Rear Glowing Vent', multiplier: '2.0x Damage (Unarmored)', xPct: 80, yPct: 40, description: 'Flamethrower or primary weapon to back heat sink destroys Hulk rapidly.' }
    ],
    bestWeapons: [
      { name: 'RS-422 Railgun', category: 'Support', effectivenessPct: 98, note: '1 unsafe shot to red eye visor kills instantly', minLevel: 20 },
      { name: 'AC-8 Autocannon', category: 'Support', effectivenessPct: 92, note: '2 double-tap shots to eye visor', minLevel: 5 },
      { name: 'FLAM-44 Flamethrower', category: 'Support', effectivenessPct: 90, note: 'Melts rear vent or leg joints in 3s', minLevel: 3 },
      { name: 'AMR Anti-Material Rifle', category: 'Support', effectivenessPct: 88, note: '2 headshots to red eye visor', minLevel: 2 }
    ],
    worstWeapons: [
      { name: 'Light Primaries (Frontal)', reason: 'Deflects 100% off heavy steel chest plate' }
    ],
    bestStratagems: [
      { name: 'Orbital Railcannon Strike', tier: 'S Tier', note: 'Auto-targets and kills instantly' },
      { name: 'Eagle 110MM Rocket Pods', tier: 'A Tier', note: 'Locks onto Hulk top armor' },
      { name: 'Stun Grenade', tier: 'S Tier', note: 'Freezes Hulk for 5s to easily line up eye headshots' }
    ],
    tacticalTip: 'Throw a Stun Grenade to freeze the Hulk in place, then take your time landing 1 Railgun or 2 Autocannon shots directly into the small glowing red eye visor!',
    threeStepGuide: [
      'Throw a G-23 Stun Grenade directly at the approaching Hulk’s feet to freeze it.',
      'Aim down sights with a Railgun, Autocannon, or Anti-Material Rifle.',
      'Shoot the glowing red eye visor slit twice to trigger an instant head detonation.'
    ],
    h2Title: 'How to kill Hulk Helldivers 2',
    h2Content: 'The most effective way to kill a Hulk in Helldivers 2 is using a Stun Grenade to immobilize it, then landing 1 RS-422 Railgun shot or 2 AC-8 Autocannon / AMR shots directly into its glowing red eye visor. Alternatively, flank around and shoot its unarmored glowing rear heat vent.',
    weakspotH2Title: 'Hulk weakspot',
    weakspotH2Content: 'A Hulk has two primary weakspots: the glowing red eye slot on its front chest (1.5x damage, requires AP4+) and the bright orange radiator heat vents on its back (2.0x damage, unarmored).'
  },
  {
    id: 'tank',
    name: 'Annihilator Tank',
    faction: 'bots',
    baseHp: 3500,
    armorLevel: 6,
    speed: 'Slow',
    dangerRating: 'Lethal',
    weakspots: [
      { label: 'Turret Rear Vents', multiplier: '2.0x Critical (Unarmored)', xPct: 75, yPct: 35, description: '3 Autocannon / Impact Grenade hits to the glowing rear vents destroys the turret.' },
      { label: 'Top Turret Roof', multiplier: '1.0x Anti-Tank', xPct: 45, yPct: 20, description: 'Eagle Rocket Pods or Spear target top armor.' }
    ],
    bestWeapons: [
      { name: 'FAF-14 Spear', category: 'Support', effectivenessPct: 98, note: 'Locks onto tank turret for 1-shot kill', minLevel: 13 },
      { name: 'LAS-99 Quasar Cannon', category: 'Support', effectivenessPct: 90, note: '2 hits to turret or rear vent', minLevel: 20 },
      { name: 'AC-8 Autocannon', category: 'Support', effectivenessPct: 88, note: '3 rapid shots to rear glowing heat sink', minLevel: 5 }
    ],
    worstWeapons: [
      { name: 'All Primaries (Frontal)', reason: 'Sloped tank treads and frontal turret bounce all small arms' }
    ],
    bestStratagems: [
      { name: 'Orbital Railcannon Strike', tier: 'S Tier', note: '100% 1-shot destruction' },
      { name: 'Eagle 500KG Bomb', tier: 'S Tier', note: 'Destroys tank in direct blast' },
      { name: 'Eagle 110MM Rocket Pods', tier: 'A Tier', note: 'Auto-targets tank roof armor' }
    ],
    tacticalTip: 'Climb on top of the tank hull! The tank cannon cannot swivel high enough to hit you, allowing you to dump Impact Grenades or Autocannon shells into its rear vents safely.',
    threeStepGuide: [
      'Avoid standing in front of the tank’s main cannon barrel or heavy laser sight.',
      'Flank behind the turret or call an Orbital Railcannon / Spear.',
      'Fire 3 Autocannon shots or 2 Impact Grenades directly into the glowing orange rear heat sink vents.'
    ],
    h2Title: 'How to kill Tank Helldivers 2',
    h2Content: 'To kill an Annihilator Tank or Shredder Tank in Helldivers 2, use heavy anti-tank stratagems like the Orbital Railcannon Strike or Eagle 500KG Bomb. If using support weapons, flank the tank and fire 3 AC-8 Autocannon shots or Impact Grenades directly into the glowing orange heat vents on the back of the turret.',
    weakspotH2Title: 'Tank weakspot',
    weakspotH2Content: 'The main weakspot on Automaton Tanks is the glowing heat radiator vents mounted on the rear of the turret, taking 2.0x damage.'
  },
  {
    id: 'factory-strider',
    name: 'Factory Strider',
    faction: 'bots',
    baseHp: 3000,
    armorLevel: 6,
    speed: 'Slow',
    dangerRating: 'Lethal',
    weakspots: [
      { label: 'Belly Hatch Doors', multiplier: '2.0x Damage when doors open to drop devastators', xPct: 50, yPct: 75, description: 'Underbelly hatch is unarmored when spawning bots. Unload Autocannon or Heavy MG into open bay.' },
      { label: 'Chin Machine Guns', multiplier: '1.0x Destructible', xPct: 20, yPct: 50, description: 'Destroy chin turrets first with primary to make approaching safe.' },
      { label: 'Eye Visor Slot', multiplier: '1.5x Critical', xPct: 15, yPct: 30, description: 'Heavy Anti-Tank shots to head eye slit deal lethal damage.' }
    ],
    bestWeapons: [
      { name: 'AC-8 Autocannon', category: 'Support', effectivenessPct: 95, note: 'Shreds open belly hatch in 6 shots', minLevel: 5 },
      { name: 'LAS-99 Quasar Cannon', category: 'Support', effectivenessPct: 90, note: 'Target top cannon and head eye', minLevel: 20 },
      { name: 'HMG Heavy Machine Gun', category: 'Support', effectivenessPct: 88, note: 'High AP shreds underbelly doors', minLevel: 10 }
    ],
    worstWeapons: [
      { name: 'Light Primaries', reason: 'Deflects off full heavy chassis' }
    ],
    bestStratagems: [
      { name: 'Orbital Laser', tier: 'S Tier', note: 'Burns top cannon and chassis' },
      { name: 'Eagle 500KG Bomb', tier: 'S Tier', note: '2 direct 500KGs destroy Factory Strider' },
      { name: 'Orbital Precision Strike', tier: 'A Tier', note: 'Deals massive heavy armor damage' }
    ],
    tacticalTip: 'Shoot off its twin chin Gatling guns first with a primary rifle, run directly UNDER its belly, look up, and dump a full Autocannon or HMG magazine into its open dev bay!',
    threeStepGuide: [
      'Shoot off the two chin-mounted Gatling turrets using Medium AP primary or Autocannon.',
      'Sprint directly beneath the Factory Strider’s belly to enter its dead zone.',
      'Fire an Autocannon or Heavy Machine Gun into the open belly hatch doors while it drops devastators.'
    ],
    h2Title: 'How to kill Factory Strider Helldivers 2',
    h2Content: 'Killing a Factory Strider (AT-AT) requires destroying its offensive weapons first. Shoot off the two front chin Gatling guns, run underneath its legs into its belly dead zone, and fire an AC-8 Autocannon or Heavy Machine Gun straight into its unarmored belly hatch doors.',
    weakspotH2Title: 'Factory Strider weakspot',
    weakspotH2Content: 'The Factory Strider’s primary weakspots are its underbelly hatch doors (unarmored when opening) and the red optic eye slot on its head.'
  },
  {
    id: 'devastator',
    name: 'Devastator (Rocket / Heavy)',
    faction: 'bots',
    baseHp: 1000,
    armorLevel: 4,
    speed: 'Medium',
    dangerRating: 'High',
    weakspots: [
      { label: 'Exposed Unarmored Head', multiplier: '2.0x Critical One-Shot', xPct: 35, yPct: 20, description: 'Single headshot from Dominator, Diligence CS, or Senator kills instantly.' },
      { label: 'Rocket Pods (Rocket Devastator)', multiplier: '1.0x Destructible', xPct: 65, yPct: 25, description: 'Shoot shoulder rocket pods to disarm artillery barrage.' }
    ],
    bestWeapons: [
      { name: 'JAR-5 Dominator', category: 'Primary', effectivenessPct: 98, note: 'Staggers devastators and 1-shots head', minLevel: 1 },
      { name: 'R-36 Eruptor', category: 'Primary', effectivenessPct: 95, note: 'AoE blast destroys rocket pods and stuns', minLevel: 10 },
      { name: 'Diligence Counter Sniper', category: 'Primary', effectivenessPct: 92, note: 'One-shot headshot from 100m distance', minLevel: 1 }
    ],
    worstWeapons: [
      { name: 'Spray Primaries (Liberator)', reason: 'Bounces off chest plate armor' }
    ],
    bestStratagems: [
      { name: 'Eagle Cluster Bomb', tier: 'S Tier', note: 'Wipes devastator squads' },
      { name: 'Orbital EMS Strike', tier: 'A Tier', note: 'Stuns devastators for easy headshots' }
    ],
    tacticalTip: 'Always aim for the tiny unarmored skull head! A single round from a precision weapon like the Diligence Counter Sniper or Dominator will pop a Devastator instantly.',
    threeStepGuide: [
      'Take cover behind rock pillars to block heavy laser fire or rocket salvos.',
      'Aim precision crosshairs at the small metal head protruding above the chest plate.',
      'Fire a single heavy primary bullet (Dominator / Diligence CS) to trigger head decapitation.'
    ],
    h2Title: 'How to kill Devastator Helldivers 2',
    h2Content: 'Kill Devastators in Helldivers 2 by targeting their exposed skull head with high-precision or staggering primaries like the JAR-5 Dominator, Diligence Counter Sniper, or PLAS-1 Scorcher.',
    weakspotH2Title: 'Devastator weakspot',
    weakspotH2Content: 'The Devastator weakspot is its small unarmored head (2.0x critical multiplier) and shoulder rocket pods.'
  },
  {
    id: 'gunship',
    name: 'Automaton Gunship',
    faction: 'bots',
    baseHp: 1000,
    armorLevel: 3,
    speed: 'Fast',
    dangerRating: 'High',
    weakspots: [
      { label: '4 Thruster Engines', multiplier: '1.0x (Medium AP required)', xPct: 25, yPct: 40, description: '2 Autocannon or Laser Cannon hits to a single engine destroys the gunship.' }
    ],
    bestWeapons: [
      { name: 'AC-8 Autocannon', category: 'Support', effectivenessPct: 98, note: '2 shots to a single engine drops it', minLevel: 5 },
      { name: 'LAS-98 Laser Cannon', category: 'Support', effectivenessPct: 95, note: 'Melts thruster engine in 1.5 seconds', minLevel: 5 },
      { name: 'AMR Anti-Material Rifle', category: 'Support', effectivenessPct: 90, note: '4 shots to engine thruster', minLevel: 2 }
    ],
    worstWeapons: [
      { name: 'Shotguns & Light Pistols', reason: 'Out of range and bullet deflection' }
    ],
    bestStratagems: [
      { name: 'Rocket Sentry', tier: 'S Tier', note: 'Auto-shoots down hovering gunships' },
      { name: 'Autocannon Sentry', tier: 'S Tier', note: 'Destroys gunships on spawn' }
    ],
    tacticalTip: 'Focus fire on ONE specific thruster engine! You do not need to destroy the whole hull—destroying a single engine causes the gunship to crash immediately.',
    threeStepGuide: [
      'Take cover behind heavy rocks to avoid rocket pod barrages.',
      'Aim an Autocannon, Laser Cannon, or AMR directly at ONE of the four thruster engines.',
      'Maintain continuous fire until that single thruster explodes, sending the gunship crashing.'
    ],
    h2Title: 'How to kill Gunship Helldivers 2',
    h2Content: 'Shoot down Automaton Gunships using Medium AP anti-air support weapons like the AC-8 Autocannon, LAS-98 Laser Cannon, or Anti-Material Rifle. Focus all fire on a single engine thruster until it explodes.',
    weakspotH2Title: 'Gunship weakspot',
    weakspotH2Content: 'The weakspot on an Automaton Gunship is any of its four engine thruster nacelles.'
  }
];

export default function HelldiversEnemyWeaknessCalculator() {
  // State
  const [selectedFaction, setSelectedFaction] = useState<Faction>('bugs');
  const [selectedEnemyId, setSelectedEnemyId] = useState<string>('charger');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<number>(1); // Min weapon level unlocked
  const [activeTab, setActiveTab] = useState<'matrix' | 'quiz' | 'guide'>('guide');

  // Interactive Quiz State
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizStreak, setQuizStreak] = useState<number>(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  // Emergency Help Modal
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  // Social Export Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Filtered Enemies by Faction & Search
  const filteredEnemies = useMemo(() => {
    return ENEMIES_CATALOG.filter(e => {
      const matchFaction = e.faction === selectedFaction;
      const matchSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.h2Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.tacticalTip.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFaction && matchSearch;
    });
  }, [selectedFaction, searchQuery]);

  // Currently Selected Enemy
  const currentEnemy = useMemo(() => {
    return ENEMIES_CATALOG.find(e => e.id === selectedEnemyId) || ENEMIES_CATALOG[0];
  }, [selectedEnemyId]);

  // Quiz Click Handler
  const handleQuizClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Check distance to any weakspot
    let hitWeakspot: Weakspot | null = null;
    currentEnemy.weakspots.forEach(ws => {
      const dist = Math.sqrt(Math.pow(clickX - ws.xPct, 2) + Math.pow(clickY - ws.yPct, 2));
      if (dist < 18) {
        hitWeakspot = ws;
      }
    });

    if (hitWeakspot) {
      setQuizScore(prev => prev + 100);
      setQuizStreak(prev => prev + 1);
      setQuizFeedback(`CRITICAL HIT! You targeted ${(hitWeakspot as Weakspot).label} (${(hitWeakspot as Weakspot).multiplier})`);
    } else {
      setQuizStreak(0);
      setQuizFeedback(`MISSED WEAKSPOT! Armor deflected your shot. Aim for red targets.`);
    }

    setTimeout(() => setQuizFeedback(null), 3000);
  };

  // High-Res Image Export Card
  const handleExportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1080;

    // Canvas Background
    const bg = ctx.createLinearGradient(0, 0, 1080, 1080);
    bg.addColorStop(0, '#060810');
    bg.addColorStop(1, '#0c101d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1080);

    // Border
    ctx.strokeStyle = '#FFE900';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1000, 1000);

    const drawFitText = (text: string, x: number, y: number, maxWidth: number, fontStyle: string, maxFontSize: number) => {
      let fontSize = maxFontSize;
      ctx.font = `900 ${fontSize}px ${fontStyle}`;
      while (ctx.measureText(text).width > maxWidth && fontSize > 14) {
        fontSize -= 2;
        ctx.font = `900 ${fontSize}px ${fontStyle}`;
      }
      ctx.fillText(text, x, y);
    };

    // Header
    ctx.fillStyle = '#FFE900';
    drawFitText(`HOW TO KILL ${currentEnemy.name.toUpperCase()} IN 3 STEPS`, 90, 120, 900, 'sans-serif', 38);

    ctx.fillStyle = '#94a3b8';
    drawFitText(`SUPER EARTH COMBAT INTEL // TACTICAL BRIEFING 2026`, 90, 170, 900, 'monospace', 22);

    // Enemy Stats Card
    ctx.fillStyle = 'rgba(20, 24, 38, 0.9)';
    ctx.roundRect(90, 210, 900, 180, 20);
    ctx.fill();

    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`FACTION: ${currentEnemy.faction.toUpperCase()}  |  HEALTH: ${currentEnemy.baseHp} HP  |  ARMOR: CLASS ${currentEnemy.armorLevel}`, 130, 260);

    ctx.fillStyle = '#FFFFFF';
    drawFitText(`PRIMARY WEAKSPOT: ${currentEnemy.weakspots[0]?.label || 'Unarmored Body'}`, 130, 315, 820, 'sans-serif', 30);

    ctx.fillStyle = '#34d399';
    drawFitText(`BEST WEAPON: ${currentEnemy.bestWeapons[0]?.name || 'Anti-Tank'} (${currentEnemy.bestWeapons[0]?.effectivenessPct}% Effective)`, 130, 360, 820, 'monospace', 22);

    // 3 Step Guide Box
    ctx.fillStyle = 'rgba(12, 16, 28, 0.95)';
    ctx.roundRect(90, 420, 900, 520, 20);
    ctx.fill();

    ctx.font = '900 28px sans-serif';
    ctx.fillStyle = '#FFE900';
    ctx.fillText('TACTICAL EXECUTION PROTOCOL:', 130, 480);

    currentEnemy.threeStepGuide.forEach((step, idx) => {
      const y = 540 + (idx * 125);
      ctx.fillStyle = '#FFE900';
      ctx.beginPath();
      ctx.arc(150, y - 8, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000000';
      ctx.font = '900 20px monospace';
      ctx.fillText(`${idx + 1}`, 145, y - 1);

      ctx.fillStyle = '#FFFFFF';
      drawFitText(step, 190, y, 760, 'sans-serif', 22);
    });

    // Branding Footer
    ctx.fillStyle = '#FFE900';
    drawFitText('GAMINGTOOLSHUB.COM // ENEMY WEAKNESS CALCULATOR 2026', 90, 980, 900, 'monospace', 24);

    setTimeout(() => {
      const uri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `how-to-kill-${currentEnemy.id}-helldivers-2.png`;
      link.href = uri;
      link.click();
    }, 150);
  };

  const handleShare = () => {
    const text = `HELLDIVERS 2 ENEMY WEAKNESS GUIDE\n` +
      `Target: ${currentEnemy.name} (${currentEnemy.baseHp} HP, Armor Class ${currentEnemy.armorLevel})\n` +
      `Weakspot: ${currentEnemy.weakspots[0]?.label} (${currentEnemy.weakspots[0]?.multiplier})\n` +
      `Best Counter: ${currentEnemy.bestWeapons[0]?.name}\n` +
      `Tip: ${currentEnemy.tacticalTip}\n` +
      `Full Counter Matrix: https://gamingtoolshub.com/tools/helldivers-2-enemy-weakness-calculator`;

    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="space-y-8 text-zinc-100 font-sans">
      {/* Hidden Canvas for High-Res PNG Export */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Banner & Search Header */}
      <div className="bg-[#090b14] border-2 border-[#FFE900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFE900]/10 border border-[#FFE900]/40 flex items-center justify-center text-[#FFE900]">
              <Skull className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE900] font-bold">
                Super Earth Xenobiology Database
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Enemy Weakness & Counter Matrix Guide (2026)
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowHelpModal(true)}
              className="px-3.5 py-2 rounded-xl bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 animate-bounce" />
              I Can't Kill {currentEnemy.name}!
            </button>
            <button
              onClick={handleExportImage}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition font-mono"
            >
              <Download className="w-4 h-4 text-[#FFE900]" />
              Export Reddit Guide (PNG)
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-[#FFE900] text-black font-black uppercase text-xs tracking-wider flex items-center gap-1.5 hover:bg-[#fff033] shadow cursor-pointer transition"
            >
              {copiedShare ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copiedShare ? 'Copied' : 'Share Intel'}
            </button>
          </div>
        </div>

        {/* Search Bar & Level Filter */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 'How to kill Charger', 'Hulk weakspot', 'Bile Titan'..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE900]"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2 bg-zinc-950 p-2 rounded-xl border border-zinc-800">
            <Filter className="w-4 h-4 text-[#FFE900]" />
            <span className="text-xs font-mono text-zinc-400">Weapon Level:</span>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(Number(e.target.value))}
              aria-label="Filter counters by unlocked player level"
              className="bg-zinc-900 text-xs font-mono font-bold text-white rounded px-2 py-1 border border-zinc-700 focus:outline-none"
            >
              <option value={1}>All Levels (1-50)</option>
              <option value={5}>Level 5+ Weapons</option>
              <option value={10}>Level 10+ Weapons</option>
              <option value={20}>Level 20+ High Anti-Tank</option>
            </select>
          </div>
        </div>
      </div>

      {/* Faction Selector & Enemy Grid Carousel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFaction('bugs')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 border ${
                selectedFaction === 'bugs'
                  ? 'bg-red-950/80 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4 text-red-500" />
              TERMINIDS (BUGS)
            </button>
            <button
              onClick={() => setSelectedFaction('bots')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 border ${
                selectedFaction === 'bots'
                  ? 'bg-slate-900 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              AUTOMATONS (BOTS)
            </button>
          </div>

          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg font-bold uppercase transition ${activeTab === 'guide' ? 'bg-[#FFE900] text-black' : 'text-zinc-400'}`}
            >
              Tactical Intel
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-lg font-bold uppercase transition ${activeTab === 'matrix' ? 'bg-[#FFE900] text-black' : 'text-zinc-400'}`}
            >
              Counter Matrix
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg font-bold uppercase transition ${activeTab === 'quiz' ? 'bg-[#FFE900] text-black' : 'text-zinc-400'}`}
            >
              Weakspot Quiz
            </button>
          </div>
        </div>

        {/* Enemy Selection Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredEnemies.map((enemy) => {
            const isSelected = selectedEnemyId === enemy.id;
            return (
              <button
                key={enemy.id}
                onClick={() => setSelectedEnemyId(enemy.id)}
                className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#090b14] border-[#FFE900] shadow-[0_0_15px_rgba(255,233,0,0.25)] ring-1 ring-[#FFE900]'
                    : 'bg-[#090a0f] border-zinc-800 hover:border-zinc-700 hover:bg-[#0c0f1d]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span className="uppercase">{enemy.speed}</span>
                    <span className={`px-1.5 py-0.5 rounded font-bold ${enemy.armorLevel >= 5 ? 'bg-red-500/20 text-red-400' : 'bg-zinc-800 text-zinc-300'}`}>
                      Armor {enemy.armorLevel}
                    </span>
                  </div>

                  <h3 className="mt-2 text-sm font-black text-white group-hover:text-[#FFE900]">
                    {enemy.name}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">HP</span>
                  <span className="text-[#FFE900] font-bold">{enemy.baseHp}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: TACTICAL INTEL DETAILED PANEL */}
      {activeTab === 'guide' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Col: Interactive Weakspot Visual Diagram */}
          <div className="lg:col-span-5 bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono font-bold text-[#FFE900] uppercase tracking-wider flex items-center gap-1.5">
                <Crosshair className="w-4 h-4 text-[#FFE900]" />
                Weakspot Target Map: {currentEnemy.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-700">
                Click Target Circles
              </span>
            </div>

            {/* Interactive Visual Blueprint Canvas/SVG */}
            <div className="relative w-full h-64 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex items-center justify-center font-mono">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              {/* Central Stylized Enemy Silhoutte Icon */}
              <div className="flex flex-col items-center justify-center text-zinc-700 space-y-2">
                <Skull className="w-24 h-24 opacity-30 text-[#FFE900]" />
                <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">{currentEnemy.name} Visual Diagram</span>
              </div>

              {/* Target Circles overlay */}
              {currentEnemy.weakspots.map((ws, idx) => (
                <div
                  key={idx}
                  style={{ top: `${ws.yPct}%`, left: `${ws.xPct}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-400 font-bold text-xs animate-ping absolute inset-0" />
                  <div className="w-9 h-9 rounded-full bg-red-950/80 border-2 border-red-500 flex items-center justify-center text-red-400 font-black text-xs shadow-lg relative z-10 hover:scale-110 transition">
                    {idx + 1}
                  </div>

                  {/* Tooltip on Hover */}
                  <div className="hidden group-hover:block absolute bottom-10 left-1/2 -translate-x-1/2 w-48 bg-zinc-900 border border-red-500/50 p-2.5 rounded-lg text-[10px] text-zinc-200 z-30 shadow-xl pointer-events-none">
                    <span className="font-bold text-red-400 block uppercase">{ws.label}</span>
                    <span className="text-emerald-400 block font-mono font-bold mt-0.5">{ws.multiplier}</span>
                    <p className="mt-1 text-zinc-400 leading-tight">{ws.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Weakspots List */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                Identified Vulnerabilities:
              </h4>
              {currentEnemy.weakspots.map((ws, idx) => (
                <div key={idx} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-white flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 border border-red-500 flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      {ws.label}
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">{ws.multiplier}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-5">
                    {ws.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Stats & Loadout Recommendations */}
          <div className="lg:col-span-7 space-y-6">
            {/* Stat Header Card */}
            <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase">Target Classification</span>
                  <h2 className="text-2xl font-black text-white">{currentEnemy.name}</h2>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/40 text-red-400 font-bold">
                    Danger: {currentEnemy.dangerRating}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#FFE900]/10 border border-[#FFE900]/40 text-[#FFE900] font-bold">
                    Armor Level {currentEnemy.armorLevel}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs font-mono text-center">
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">HEALTH POOL</span>
                  <span className="text-[#FFE900] font-black text-base">{currentEnemy.baseHp} HP</span>
                </div>
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">MOVEMENT SPEED</span>
                  <span className="text-white font-black text-base">{currentEnemy.speed}</span>
                </div>
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">WEAKSPOT MULTIPLIER</span>
                  <span className="text-emerald-400 font-black text-base">Up to 2.0x</span>
                </div>
              </div>

              {/* Tactical Pro Tip Callout */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-400 uppercase font-mono block mb-0.5">Helldiver Pro Tip:</strong>
                  {currentEnemy.tacticalTip}
                </div>
              </div>
            </div>

            {/* Best Counters Loadout Card */}
            <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-xs font-mono font-bold text-[#FFE900] uppercase tracking-wider flex items-center gap-1.5">
                <Swords className="w-4 h-4 text-[#FFE900]" />
                Optimal Weapon Counters & Stratagems
              </h3>

              <div className="space-y-3">
                <span className="text-[11px] font-mono text-zinc-400 uppercase block">Top Recommended Weapons</span>
                {currentEnemy.bestWeapons
                  .filter(w => w.minLevel <= levelFilter || levelFilter === 1)
                  .map((w, idx) => (
                    <div key={idx} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{w.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-700">
                            {w.category}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-400 mt-0.5 block">{w.note}</span>
                      </div>

                      <div className="text-right font-mono">
                        <span className="text-emerald-400 font-black text-sm block">{w.effectivenessPct}%</span>
                        <span className="text-[9px] text-zinc-500">EFFICIENCY</span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Best Stratagems */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <span className="text-[11px] font-mono text-zinc-400 uppercase block">Top Stratagems</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentEnemy.bestStratagems.map((s, idx) => (
                    <div key={idx} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">{s.name}</span>
                        <span className="text-[10px] text-zinc-400">{s.note}</span>
                      </div>
                      <span className={`text-xs font-mono font-black px-2 py-1 rounded ${
                        s.tier.includes('S Tier') ? 'bg-[#FFE900]/20 text-[#FFE900] border border-[#FFE900]/40' : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {s.tier}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: FULL COUNTER MATRIX GRID */}
      {activeTab === 'matrix' && (
        <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h3 className="text-base font-black text-white uppercase">Complete Weapon vs Enemy Counter Matrix</h3>
              <p className="text-xs text-zinc-400">Green = S/A Tier Counter, Yellow = B/C Tier Partial, Red = Deflects / Ineffective</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-400">
                  <th className="p-3">Target Enemy</th>
                  <th className="p-3">HP / Armor</th>
                  {MATRIX_WEAPONS.map(w => (
                    <th key={w.id} className="p-3 text-center min-w-[100px]">
                      {w.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {ENEMIES_CATALOG.map(enemy => (
                  <tr key={enemy.id} className="hover:bg-zinc-900/50 transition">
                    <td className="p-3 font-bold text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${enemy.faction === 'bugs' ? 'bg-red-500' : 'bg-cyan-400'}`} />
                      {enemy.name}
                    </td>
                    <td className="p-3 text-zinc-400">
                      {enemy.baseHp} HP (AP{enemy.armorLevel})
                    </td>
                    {MATRIX_WEAPONS.map(w => {
                      const isEffective = w.apLevel >= enemy.armorLevel || (enemy.armorLevel <= 3 && w.apLevel >= 2);
                      const isHeavyDeflect = w.apLevel < enemy.armorLevel;

                      return (
                        <td key={w.id} className="p-2 text-center">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold block ${
                            isHeavyDeflect
                              ? 'bg-red-950/80 text-red-400 border border-red-800/50'
                              : isEffective
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-800/50'
                          }`}>
                            {isHeavyDeflect ? 'RICOHET' : isEffective ? 'SHRED' : 'PARTIAL'}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: WEAKSPOT QUIZ MODE */}
      {activeTab === 'quiz' && (
        <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="flex justify-between items-center max-w-md mx-auto bg-zinc-950 p-4 rounded-2xl border border-zinc-800 font-mono">
            <div>
              <span className="text-zinc-500 text-xs block">QUIZ SCORE</span>
              <span className="text-2xl font-black text-[#FFE900]">{quizScore} PTS</span>
            </div>
            <div>
              <span className="text-zinc-500 text-xs block">STREAK</span>
              <span className="text-2xl font-black text-emerald-400">{quizStreak}🔥</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-white uppercase">Weakspot Precision Quiz: {currentEnemy.name}</h3>
            <p className="text-xs text-zinc-400 mt-1">Click on the visual image where you think the primary weakspot is located!</p>
          </div>

          {/* Interactive Clickable Quiz Area */}
          <div
            onClick={handleQuizClick}
            className="relative max-w-lg mx-auto h-72 bg-zinc-950 border-2 border-dashed border-zinc-700 rounded-2xl overflow-hidden cursor-crosshair flex items-center justify-center font-mono group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

            <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
              <Skull className="w-28 h-28 text-zinc-700 group-hover:text-[#FFE900] transition" />
              <span className="text-xs font-bold text-zinc-400 uppercase">CLICK TO SHOOT WEAKSPOT</span>
            </div>

            {quizFeedback && (
              <div className="absolute inset-x-4 bottom-4 p-3 rounded-xl bg-black/90 border border-[#FFE900] text-xs font-bold font-mono text-[#FFE900] shadow-2xl animate-fade-in">
                {quizFeedback}
              </div>
            )}
          </div>
        </div>
      )}

      {/* EMERGENCY HELP MODAL: "I Can't Kill X!" */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#090b14] border-2 border-red-500 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="text-base font-black text-white uppercase">Emergency Tactical Guide: {currentEnemy.name}</h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-zinc-400 hover:text-white font-mono text-xs cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-zinc-400 block">Follow these 3 steps to guaranteed eliminate {currentEnemy.name}:</span>
              {currentEnemy.threeStepGuide.map((step, idx) => (
                <div key={idx} className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-zinc-200 font-sans leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#FFE900] text-black font-black uppercase text-xs tracking-wider cursor-pointer hover:bg-[#fff033]"
              >
                Got It, Returning to Battle!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEO ARTICLE CONTENT SECTION (H2s for Google Ranking) */}
      <div className="bg-[#090a0f] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-8 text-zinc-300 text-xs leading-relaxed">
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-wider mb-2">
            Helldivers 2 Enemy Weakness Guide – How to Kill Charger, Bile Titan, Hulk 2026
          </h2>
          <p className="text-zinc-400">
            Mastering Helldiver combat requires knowing exact armor penetration values, health thresholds, and critical weakspots for all Terminid bug and Automaton bot forces. This verified Super Earth xenobiology guide compiles exact game testing data to help squad members defeat heavy armor targets efficiently.
          </p>
        </div>

        {/* Dynamic SEO H2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ENEMIES_CATALOG.slice(0, 6).map((e) => (
            <div key={e.id} className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-2">
              <h2 className="text-sm font-bold text-[#FFE900] uppercase font-mono">
                {e.h2Title}
              </h2>
              <p className="text-zinc-400">{e.h2Content}</p>

              <h3 className="text-xs font-bold text-emerald-400 uppercase font-mono pt-2">
                {e.weakspotH2Title}
              </h3>
              <p className="text-zinc-400">{e.weakspotH2Content}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-zinc-800 text-center text-zinc-500 font-mono text-[11px]">
          Helldivers 2 Enemy Weakness & Counter Matrix Guide 2026 • Verified Helldivers Wiki & Player Testing Data
        </div>
      </div>
    </div>
  );
}
