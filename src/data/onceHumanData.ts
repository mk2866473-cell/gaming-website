/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlueprintStarTier {
  starLevel: number;
  xpRequiredForTier: number;
  cumulativeXp: number;
  bonusStatPerk: string;
}

export const BLUEPRINT_STAR_TIERS: BlueprintStarTier[] = [
  { starLevel: 1, xpRequiredForTier: 0, cumulativeXp: 0, bonusStatPerk: 'Base Blueprint Stats' },
  { starLevel: 2, xpRequiredForTier: 1600, cumulativeXp: 1600, bonusStatPerk: '+8% Weapon Attack & +3% Crit Rate' },
  { starLevel: 3, xpRequiredForTier: 4000, cumulativeXp: 5600, bonusStatPerk: '+15% Weapon Attack & +5% Status DMG' },
  { starLevel: 4, xpRequiredForTier: 8000, cumulativeXp: 13600, bonusStatPerk: '+22% Weapon Attack & +10% Crit DMG' },
  { starLevel: 5, xpRequiredForTier: 16000, cumulativeXp: 29600, bonusStatPerk: '+30% Weapon Attack & +15% Special Key Word DMG' },
];

export interface OnceHumanWeapon {
  id: string;
  name: string;
  category: 'Assault Rifle' | 'Sniper Rifle' | 'Submachine Gun' | 'Shotgun' | 'Light Machine Gun' | 'Pistol';
  rarity: 'Legendary' | 'Epic';
  brand: 'Brahminy' | 'Renegade' | 'Falcon' | 'Shelter' | 'Agent' | 'Juggernaut';
  keyWord: 'Power Surge' | 'Shrapnel' | 'Unstable Bomber' | 'Frost Vortex' | 'Burn' | 'Bounce' | 'Fast Rate';
  baseDamage: number;
  icon: string;
}

export const PRESET_ONCE_HUMAN_WEAPONS: OnceHumanWeapon[] = [
  { id: 'socr-outsider', name: 'SOCR - Outsider', category: 'Assault Rifle', rarity: 'Legendary', brand: 'Brahminy', keyWord: 'Power Surge', baseDamage: 68, icon: 'Zap' },
  { id: 'kam-abyss-glance', name: 'KAM - Abyss Glance', category: 'Assault Rifle', rarity: 'Legendary', brand: 'Renegade', keyWord: 'Frost Vortex', baseDamage: 72, icon: 'Snowflake' },
  { id: 'mg4-predator', name: 'MG4 - Predator', category: 'Light Machine Gun', rarity: 'Legendary', brand: 'Falcon', keyWord: 'Fast Rate', baseDamage: 54, icon: 'Flame' },
  { id: 'kvd-boom-boom', name: 'KVD - Boom! Boom!', category: 'Light Machine Gun', rarity: 'Legendary', brand: 'Shelter', keyWord: 'Burn', baseDamage: 58, icon: 'Bomb' },
  { id: 'mp7-outer-space', name: 'MP7 - Outer Space', category: 'Submachine Gun', rarity: 'Legendary', brand: 'Brahminy', keyWord: 'Power Surge', baseDamage: 42, icon: 'Radio' },
  { id: 'awm-bullseye', name: 'AWM - Bingo / Bullseye', category: 'Sniper Rifle', rarity: 'Legendary', brand: 'Agent', keyWord: 'Shrapnel', baseDamage: 380, icon: 'Target' },
  { id: 'dbg-doomsay', name: 'DB-G - Doomsday', category: 'Shotgun', rarity: 'Legendary', brand: 'Juggernaut', keyWord: 'Unstable Bomber', baseDamage: 180, icon: 'Crosshair' },
];

export interface FragmentSourceValue {
  type: 'sameNameLegendary' | 'sameBrandLegendary' | 'sameBrandEpic' | 'genericFragment';
  name: string;
  xpPerFragment: number;
  description: string;
}

export const FRAGMENT_VALUES = {
  sameNameLegendary: 160,  // Same Name gives double XP (80 * 2 = 160 XP)
  sameBrandLegendary: 80,  // Same Brand gives normal XP (80 XP)
  sameBrandEpic: 40,       // Same Brand Epic fragment gives 40 XP
  genericFragment: 20      // Rare or generic fragment gives 20 XP
};

export const ONCE_HUMAN_FAQS = [
  {
    question: 'How much total Fragment XP is needed to reach 5-Star Blueprint level in Once Human?',
    answer: 'Upgrading a Legendary weapon blueprint from 1-Star to 5-Star requires exactly 29,600 total Fragment XP (1,600 XP for 2-Star, 4,000 XP for 3-Star, 8,000 XP for 4-Star, and 16,000 XP for 5-Star).'
  },
  {
    question: 'What is the difference between Same-Name and Same-Brand Blueprint Fragments?',
    answer: 'Same-Name Blueprint Fragments match the exact weapon (e.g. SOCR Outsider fragments on a SOCR Outsider blueprint) and yield DOUBLE XP (160 XP per fragment). Same-Brand Blueprint Fragments match the manufacturer brand (e.g. Brahminy) and yield normal XP (80 XP per fragment).'
  },
  {
    question: 'How much Starchrom does it take to get blueprint fragments in Wish Machine?',
    answer: 'Each Wish Machine gamble turn costs 500 Starchrom. Purchasing a guaranteed full Legendary blueprint from the Starchrom Shop costs 8,000 Starchrom (yielding 80 blueprint fragments).'
  },
  {
    question: 'Do Blueprint Star levels reset during scenario wipe or season reset?',
    answer: 'No! Blueprint star upgrades, learned blueprint fragments, and Starchrom progress are PERMANENT and carry over across all season resets, scenario transfers, and server wipes.'
  }
];
