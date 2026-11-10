/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Centralized Roblox game data, rates, DevEx exchange formulas, and Blox Fruits metadata
// Easily updated when Roblox adjusts DevEx rates or Blox Fruits updates fruit values & level caps.

export const ROBLOX_RATES = {
  TAX_RATE: 0.30, // 30% Roblox Marketplace Cut
  CREATOR_CUT: 0.70, // 70% Creator Net Revenue
  DEVEX_RATE_PER_ROBUX: 0.0035, // $0.0035 USD per 1 Robux ($350 per 100,000 Robux)
  MIN_DEVEX_ROBUX: 30000, // Current minimum threshold for DevEx eligibility
  STANDARD_DEVEX_TIERS: [
    { robux: 30000, usd: 105 },
    { robux: 50000, usd: 175 },
    { robux: 100000, usd: 350 },
    { robux: 250000, usd: 875 },
    { robux: 500000, usd: 1750 },
    { robux: 1000000, usd: 3500 },
    { robux: 5000000, usd: 17500 },
    { robux: 10000000, usd: 35000 },
    { robux: 50000000, usd: 175000 }
  ]
};

export interface RobuxPurchaseTier {
  priceUSD: number;
  robuxStandard: number;
  robuxPremium: number;
  bonusPercent: number;
}

export const ROBUX_PURCHASE_TIERS: RobuxPurchaseTier[] = [
  { priceUSD: 4.99, robuxStandard: 400, robuxPremium: 440, bonusPercent: 10 },
  { priceUSD: 9.99, robuxStandard: 800, robuxPremium: 880, bonusPercent: 10 },
  { priceUSD: 19.99, robuxStandard: 1700, robuxPremium: 1870, bonusPercent: 10 },
  { priceUSD: 49.99, robuxStandard: 4500, robuxPremium: 4950, bonusPercent: 10 },
  { priceUSD: 99.99, robuxStandard: 10000, robuxPremium: 11000, bonusPercent: 10 },
  { priceUSD: 199.99, robuxStandard: 22500, robuxPremium: 24750, bonusPercent: 10 }
];

export interface BloxFruitItem {
  id: string;
  name: string;
  rarity: 'Mythical' | 'Legendary' | 'Rare' | 'Uncommon' | 'Common';
  type: 'Natural' | 'Elemental' | 'Beast';
  beliPrice: number;
  robuxPrice: number;
  tradingValue: number; // In game trading benchmark value
  demand: number; // 1 to 10 scale
  iconColor: string;
}

export const BLOX_FRUITS_LIST: BloxFruitItem[] = [
  // Mythical
  { id: 'kitsune', name: 'Kitsune', rarity: 'Mythical', type: 'Beast', beliPrice: 8000000, robuxPrice: 4000, tradingValue: 125000000, demand: 10, iconColor: 'text-amber-400' },
  { id: 'dragon', name: 'Dragon (Rework)', rarity: 'Mythical', type: 'Beast', beliPrice: 10000000, robuxPrice: 5000, tradingValue: 180000000, demand: 10, iconColor: 'text-rose-500' },
  { id: 'leopard', name: 'Leopard', rarity: 'Mythical', type: 'Beast', beliPrice: 5000000, robuxPrice: 3000, tradingValue: 40000000, demand: 9, iconColor: 'text-yellow-500' },
  { id: 'dough', name: 'Dough', rarity: 'Mythical', type: 'Elemental', beliPrice: 2800000, robuxPrice: 2400, tradingValue: 25000000, demand: 9.5, iconColor: 'text-amber-200' },
  { id: 't-rex', name: 'T-Rex', rarity: 'Mythical', type: 'Beast', beliPrice: 2700000, robuxPrice: 2350, tradingValue: 20000000, demand: 8.5, iconColor: 'text-emerald-500' },
  { id: 'mammoth', name: 'Mammoth', rarity: 'Mythical', type: 'Beast', beliPrice: 2700000, robuxPrice: 2350, tradingValue: 12500000, demand: 7.5, iconColor: 'text-stone-400' },
  { id: 'spirit', name: 'Spirit', rarity: 'Mythical', type: 'Natural', beliPrice: 3400000, robuxPrice: 2550, tradingValue: 10000000, demand: 7, iconColor: 'text-cyan-400' },
  { id: 'venom', name: 'Venom', rarity: 'Mythical', type: 'Natural', beliPrice: 3000000, robuxPrice: 2450, tradingValue: 9000000, demand: 7.5, iconColor: 'text-purple-400' },
  { id: 'shadow', name: 'Shadow', rarity: 'Mythical', type: 'Natural', beliPrice: 2900000, robuxPrice: 2425, tradingValue: 6000000, demand: 6.5, iconColor: 'text-indigo-400' },
  { id: 'control', name: 'Control', rarity: 'Mythical', type: 'Natural', beliPrice: 3200000, robuxPrice: 2500, tradingValue: 8000000, demand: 7, iconColor: 'text-blue-400' },
  { id: 'gravity', name: 'Gravity', rarity: 'Mythical', type: 'Natural', beliPrice: 2500000, robuxPrice: 2300, tradingValue: 2500000, demand: 4, iconColor: 'text-purple-500' },

  // Legendary
  { id: 'portal', name: 'Portal', rarity: 'Legendary', type: 'Natural', beliPrice: 1900000, robuxPrice: 2000, tradingValue: 7000000, demand: 9, iconColor: 'text-cyan-400' },
  { id: 'buddha', name: 'Buddha', rarity: 'Legendary', type: 'Beast', beliPrice: 1200000, robuxPrice: 1650, tradingValue: 8000000, demand: 10, iconColor: 'text-amber-300' },
  { id: 'blizzard', name: 'Blizzard', rarity: 'Legendary', type: 'Elemental', beliPrice: 2400000, robuxPrice: 2250, tradingValue: 5000000, demand: 7, iconColor: 'text-sky-300' },
  { id: 'sound', name: 'Sound', rarity: 'Legendary', type: 'Natural', beliPrice: 1700000, robuxPrice: 1900, tradingValue: 4000000, demand: 6.5, iconColor: 'text-pink-400' },
  { id: 'rumble', name: 'Rumble', rarity: 'Legendary', type: 'Elemental', beliPrice: 2100000, robuxPrice: 2100, tradingValue: 5000000, demand: 8, iconColor: 'text-yellow-300' },
  { id: 'magma', name: 'Magma', rarity: 'Rare', type: 'Elemental', beliPrice: 850000, robuxPrice: 1300, tradingValue: 1500000, demand: 8, iconColor: 'text-orange-500' },
  { id: 'light', name: 'Light', rarity: 'Rare', type: 'Elemental', beliPrice: 650000, robuxPrice: 1100, tradingValue: 1000000, demand: 8.5, iconColor: 'text-yellow-200' },
  { id: 'ice', name: 'Ice', rarity: 'Uncommon', type: 'Elemental', beliPrice: 350000, robuxPrice: 750, tradingValue: 500000, demand: 7, iconColor: 'text-blue-300' },
  { id: 'dark', name: 'Dark', rarity: 'Uncommon', type: 'Elemental', beliPrice: 500000, robuxPrice: 950, tradingValue: 600000, demand: 6.5, iconColor: 'text-purple-600' }
];

export const BLOX_FRUITS_GAME_CONSTANTS = {
  MAX_LEVEL: 2600,
  STAT_POINTS_PER_LEVEL: 3,
  MAX_STAT_PER_ATTRIBUTE: 2600,
  TOTAL_MAX_STAT_POINTS: 7800, // 2600 * 3
  HP_PER_DEFENSE_POINT: 5,
  BASE_HP: 100,
  ENERGY_PER_MELEE_POINT: 5,
  BASE_ENERGY: 100,
  SEAS: [
    { sea: 1, name: 'First Sea (Old World)', minLevel: 1, maxLevel: 700, color: 'text-sky-400' },
    { sea: 2, name: 'Second Sea', minLevel: 700, maxLevel: 1500, color: 'text-emerald-400' },
    { sea: 3, name: 'Third Sea', minLevel: 1500, maxLevel: 2600, color: 'text-purple-400' }
  ],
  ACCESSORIES: [
    { id: 'leviathan-crown', name: 'Leviathan Crown', damageBuff: 0.12, defenseBuff: 0.10, notes: '+12% Melee/Sword/Gun Dmg' },
    { id: 'valkyrie-helm', name: 'Valkyrie Helm', damageBuff: 0.15, defenseBuff: 0.08, notes: '+15% Sword Damage' },
    { id: 'pale-scarf', name: 'Pale Scarf', damageBuff: 0.15, defenseBuff: 0.0, notes: '+15% Blox Fruit & Sword Dmg' },
    { id: 'swan-glasses', name: 'Swan Glasses', damageBuff: 0.08, defenseBuff: 0.08, notes: '+8% All Dmg, +8% Def, +25% Speed' },
    { id: 'dark-coat', name: 'Dark Coat', damageBuff: 0.15, defenseBuff: 0.0, notes: '+15% Blox Fruit Damage' },
    { id: 'hunter-cape', name: 'Hunter Cape', damageBuff: 0.10, defenseBuff: 0.0, notes: '+10% Melee/Sword/Gun Dmg' },
    { id: 'none', name: 'None / Standard', damageBuff: 0.0, defenseBuff: 0.0, notes: 'No accessory equipped' }
  ],
  RACES: [
    { id: 'human', name: 'Human (Psycho / Rage Mode)', v3Buff: 0.15, v4Buff: 0.35 },
    { id: 'cyborg', name: 'Cyborg (Energy Overdrive)', v3Buff: 0.10, v4Buff: 0.25 },
    { id: 'ghoul', name: 'Ghoul (Life Leech & Speed)', v3Buff: 0.08, v4Buff: 0.20 },
    { id: 'shark', name: 'Shark / Fishman (Water Body Tank)', v3Buff: 0.0, v4Buff: 0.15 },
    { id: 'mink', name: 'Mink / Rabbit (Agility)', v3Buff: 0.0, v4Buff: 0.15 },
    { id: 'angel', name: 'Angel / Skypian (Heavenly Blood)', v3Buff: 0.05, v4Buff: 0.20 }
  ]
};
