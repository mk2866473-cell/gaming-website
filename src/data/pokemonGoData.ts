/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Official Pokémon GO CPM (CP Multiplier) table for Level 1 to 51 (Best Buddy)
export const CP_MULTIPLIERS: Record<number, number> = {
  1.0: 0.094, 1.5: 0.135137432,
  2.0: 0.16639787, 2.5: 0.192650919,
  3.0: 0.21573247, 3.5: 0.236572661,
  4.0: 0.25572005, 4.5: 0.273530381,
  5.0: 0.29024988, 5.5: 0.306057377,
  6.0: 0.3210876, 6.5: 0.335445036,
  7.0: 0.34921268, 7.5: 0.362457751,
  8.0: 0.37523559, 8.5: 0.387592406,
  9.0: 0.39956728, 9.5: 0.411193551,
  10.0: 0.42250001, 10.5: 0.432926419,
  11.0: 0.44310872, 11.5: 0.453059958,
  12.0: 0.46279839, 12.5: 0.472336083,
  13.0: 0.48168495, 13.5: 0.4908558,
  14.0: 0.49985844, 14.5: 0.508701765,
  15.0: 0.51739395, 15.5: 0.525942511,
  16.0: 0.53435433, 16.5: 0.542635767,
  17.0: 0.55079269, 17.5: 0.558830576,
  18.0: 0.56675452, 18.5: 0.574569153,
  19.0: 0.58227891, 19.5: 0.589887917,
  20.0: 0.59740001, 20.5: 0.604818814,
  21.0: 0.61215729, 21.5: 0.619399365,
  22.0: 0.62656713, 22.5: 0.633644533,
  23.0: 0.64065295, 23.5: 0.647575252,
  24.0: 0.65443563, 24.5: 0.661214806,
  25.0: 0.667934, 25.5: 0.674577537,
  26.0: 0.68118057, 26.5: 0.687680648,
  27.0: 0.69414365, 27.5: 0.700512879,
  28.0: 0.70684712, 28.5: 0.713091009,
  29.0: 0.71939909, 29.5: 0.725593881,
  30.0: 0.73170000, 30.5: 0.734741009,
  31.0: 0.73776948, 31.5: 0.740785574,
  32.0: 0.74378943, 32.5: 0.746781211,
  33.0: 0.74976104, 33.5: 0.752728872,
  34.0: 0.75568551, 34.5: 0.758630885,
  35.0: 0.76156384, 35.5: 0.764484984,
  36.0: 0.76739443, 36.5: 0.770292193,
  37.0: 0.77318835, 37.5: 0.776072793,
  38.0: 0.77894652, 38.5: 0.781808625,
  39.0: 0.78465997, 39.5: 0.787500366,
  40.0: 0.79030001, 40.5: 0.792803968,
  41.0: 0.79530001, 41.5: 0.797800016,
  42.0: 0.80030000, 42.5: 0.802799999,
  43.0: 0.80530000, 43.5: 0.807800002,
  44.0: 0.81029999, 44.5: 0.812799989,
  45.0: 0.81529999, 45.5: 0.817799984,
  46.0: 0.82029998, 46.5: 0.822799980,
  47.0: 0.82529998, 47.5: 0.827799975,
  48.0: 0.83029997, 48.5: 0.832799971,
  49.0: 0.83529997, 49.5: 0.837799966,
  50.0: 0.84029996, 50.5: 0.842799962,
  51.0: 0.84529996
};

// Power-Up Stardust and Candy Cost Chart (per half-level step)
export interface PowerUpStepCost {
  levelRange: [number, number]; // [minLevel, maxLevel]
  stardust: number;
  regularCandy: number;
  xlCandy: number;
}

export const POWER_UP_COSTS: PowerUpStepCost[] = [
  { levelRange: [1, 2.5], stardust: 200, regularCandy: 1, xlCandy: 0 },
  { levelRange: [3, 4.5], stardust: 400, regularCandy: 1, xlCandy: 0 },
  { levelRange: [5, 6.5], stardust: 600, regularCandy: 1, xlCandy: 0 },
  { levelRange: [7, 8.5], stardust: 800, regularCandy: 1, xlCandy: 0 },
  { levelRange: [9, 10.5], stardust: 1000, regularCandy: 1, xlCandy: 0 },
  { levelRange: [11, 12.5], stardust: 1300, regularCandy: 2, xlCandy: 0 },
  { levelRange: [13, 14.5], stardust: 1600, regularCandy: 2, xlCandy: 0 },
  { levelRange: [15, 16.5], stardust: 1900, regularCandy: 2, xlCandy: 0 },
  { levelRange: [17, 18.5], stardust: 2200, regularCandy: 2, xlCandy: 0 },
  { levelRange: [19, 20.5], stardust: 2500, regularCandy: 2, xlCandy: 0 },
  { levelRange: [21, 22.5], stardust: 3000, regularCandy: 3, xlCandy: 0 },
  { levelRange: [23, 24.5], stardust: 3500, regularCandy: 3, xlCandy: 0 },
  { levelRange: [25, 26.5], stardust: 4000, regularCandy: 3, xlCandy: 0 },
  { levelRange: [27, 28.5], stardust: 4500, regularCandy: 3, xlCandy: 0 },
  { levelRange: [29, 30.5], stardust: 5000, regularCandy: 3, xlCandy: 0 },
  { levelRange: [31, 32.5], stardust: 6000, regularCandy: 4, xlCandy: 0 },
  { levelRange: [33, 34.5], stardust: 7000, regularCandy: 4, xlCandy: 0 },
  { levelRange: [35, 36.5], stardust: 8000, regularCandy: 4, xlCandy: 0 },
  { levelRange: [37, 38.5], stardust: 9000, regularCandy: 4, xlCandy: 0 },
  { levelRange: [39, 40.5], stardust: 10000, regularCandy: 4, xlCandy: 0 },
  // Level 40 to 50 uses Candy XL (2 power ups per full level)
  { levelRange: [40.5, 41.5], stardust: 10000, regularCandy: 0, xlCandy: 10 },
  { levelRange: [41.5, 42.5], stardust: 11000, regularCandy: 0, xlCandy: 10 },
  { levelRange: [42.5, 43.5], stardust: 11000, regularCandy: 0, xlCandy: 12 },
  { levelRange: [43.5, 44.5], stardust: 12000, regularCandy: 0, xlCandy: 12 },
  { levelRange: [44.5, 45.5], stardust: 12000, regularCandy: 0, xlCandy: 15 },
  { levelRange: [45.5, 46.5], stardust: 13000, regularCandy: 0, xlCandy: 15 },
  { levelRange: [46.5, 47.5], stardust: 13000, regularCandy: 0, xlCandy: 17 },
  { levelRange: [47.5, 48.5], stardust: 14000, regularCandy: 0, xlCandy: 17 },
  { levelRange: [48.5, 49.5], stardust: 14000, regularCandy: 0, xlCandy: 20 },
  { levelRange: [49.5, 50.0], stardust: 15000, regularCandy: 0, xlCandy: 20 }
];

export function getPowerUpCostForLevel(lvl: number): { stardust: number; candy: number; xlCandy: number } {
  const match = POWER_UP_COSTS.find(c => lvl >= c.levelRange[0] && lvl <= c.levelRange[1]);
  if (!match) {
    if (lvl >= 40) return { stardust: 15000, candy: 0, xlCandy: 20 };
    return { stardust: 200, candy: 1, xlCandy: 0 };
  }
  return { stardust: match.stardust, candy: match.regularCandy, xlCandy: match.xlCandy };
}

export function calculateTotalPowerUpCost(startLevel: number, targetLevel: number, isLucky = false, isShadow = false, isPurified = false): {
  stardust: number;
  candy: number;
  xlCandy: number;
  steps: number;
} {
  let totalStardust = 0;
  let totalCandy = 0;
  let totalXlCandy = 0;
  let steps = 0;

  for (let lvl = startLevel; lvl < targetLevel; lvl += 0.5) {
    const cost = getPowerUpCostForLevel(lvl);
    totalStardust += cost.stardust;
    totalCandy += cost.candy;
    totalXlCandy += cost.xlCandy;
    steps++;
  }

  // Modifiers
  if (isLucky) {
    totalStardust = Math.floor(totalStardust * 0.5);
  } else if (isShadow) {
    totalStardust = Math.floor(totalStardust * 1.2);
    totalCandy = Math.floor(totalCandy * 1.2);
    totalXlCandy = Math.floor(totalXlCandy * 1.2);
  } else if (isPurified) {
    totalStardust = Math.floor(totalStardust * 0.9);
    totalCandy = Math.floor(totalCandy * 0.9);
    totalXlCandy = Math.floor(totalXlCandy * 0.9);
  }

  return { stardust: totalStardust, candy: totalCandy, xlCandy: totalXlCandy, steps };
}

export interface PokemonSpecies {
  id: string;
  name: string;
  dexNumber: number;
  types: string[];
  baseAttack: number;
  baseDefense: number;
  baseStamina: number;
  baseCaptureRate?: number;
  fleeRate?: number;
  evolution?: {
    evolvesToId: string;
    candyCost: number;
    itemRequired?: string;
  };
  fastMoves?: string[];
  chargedMoves?: string[];
}

export const POKEMON_SPECIES_LIST: PokemonSpecies[] = [
  // Starters & Generations Meta
  { id: 'bulbasaur', name: 'Bulbasaur', dexNumber: 1, types: ['Grass', 'Poison'], baseAttack: 118, baseDefense: 111, baseStamina: 128, baseCaptureRate: 0.20, evolution: { evolvesToId: 'ivysaur', candyCost: 25 } },
  { id: 'ivysaur', name: 'Ivysaur', dexNumber: 2, types: ['Grass', 'Poison'], baseAttack: 151, baseDefense: 143, baseStamina: 155, baseCaptureRate: 0.10, evolution: { evolvesToId: 'venusaur', candyCost: 100 } },
  { id: 'venusaur', name: 'Venusaur', dexNumber: 3, types: ['Grass', 'Poison'], baseAttack: 198, baseDefense: 189, baseStamina: 190, baseCaptureRate: 0.05 },
  
  { id: 'charmander', name: 'Charmander', dexNumber: 4, types: ['Fire'], baseAttack: 116, baseDefense: 93, baseStamina: 118, baseCaptureRate: 0.20, evolution: { evolvesToId: 'charmeleon', candyCost: 25 } },
  { id: 'charmeleon', name: 'Charmeleon', dexNumber: 5, types: ['Fire'], baseAttack: 158, baseDefense: 126, baseStamina: 151, baseCaptureRate: 0.10, evolution: { evolvesToId: 'charizard', candyCost: 100 } },
  { id: 'charizard', name: 'Charizard', dexNumber: 6, types: ['Fire', 'Flying'], baseAttack: 223, baseDefense: 173, baseStamina: 186, baseCaptureRate: 0.05 },
  
  { id: 'squirtle', name: 'Squirtle', dexNumber: 7, types: ['Water'], baseAttack: 94, baseDefense: 121, baseStamina: 127, baseCaptureRate: 0.20, evolution: { evolvesToId: 'wartortle', candyCost: 25 } },
  { id: 'wartortle', name: 'Wartortle', dexNumber: 8, types: ['Water'], baseAttack: 126, baseDefense: 155, baseStamina: 153, baseCaptureRate: 0.10, evolution: { evolvesToId: 'blastoise', candyCost: 100 } },
  { id: 'blastoise', name: 'Blastoise', dexNumber: 9, types: ['Water'], baseAttack: 171, baseDefense: 207, baseStamina: 188, baseCaptureRate: 0.05 },
  
  { id: 'pikachu', name: 'Pikachu', dexNumber: 25, types: ['Electric'], baseAttack: 112, baseDefense: 96, baseStamina: 111, baseCaptureRate: 0.20, evolution: { evolvesToId: 'raichu', candyCost: 50, itemRequired: 'Thunder Stone' } },
  { id: 'raichu', name: 'Raichu', dexNumber: 26, types: ['Electric'], baseAttack: 193, baseDefense: 151, baseStamina: 155, baseCaptureRate: 0.10 },

  { id: 'machop', name: 'Machop', dexNumber: 66, types: ['Fighting'], baseAttack: 137, baseDefense: 82, baseStamina: 172, baseCaptureRate: 0.50, evolution: { evolvesToId: 'machoke', candyCost: 25 } },
  { id: 'machoke', name: 'Machoke', dexNumber: 67, types: ['Fighting'], baseAttack: 177, baseDefense: 125, baseStamina: 190, baseCaptureRate: 0.25, evolution: { evolvesToId: 'machamp', candyCost: 100 } },
  { id: 'machamp', name: 'Machamp', dexNumber: 68, types: ['Fighting'], baseAttack: 234, baseDefense: 159, baseStamina: 207, baseCaptureRate: 0.125 },

  { id: 'gastly', name: 'Gastly', dexNumber: 92, types: ['Ghost', 'Poison'], baseAttack: 186, baseDefense: 67, baseStamina: 102, baseCaptureRate: 0.40, evolution: { evolvesToId: 'haunter', candyCost: 25 } },
  { id: 'haunter', name: 'Haunter', dexNumber: 93, types: ['Ghost', 'Poison'], baseAttack: 223, baseDefense: 107, baseStamina: 128, baseCaptureRate: 0.20, evolution: { evolvesToId: 'gengar', candyCost: 100 } },
  { id: 'gengar', name: 'Gengar', dexNumber: 94, types: ['Ghost', 'Poison'], baseAttack: 261, baseDefense: 149, baseStamina: 155, baseCaptureRate: 0.10 },

  { id: 'magikarp', name: 'Magikarp', dexNumber: 129, types: ['Water'], baseAttack: 29, baseDefense: 85, baseStamina: 67, baseCaptureRate: 0.70, evolution: { evolvesToId: 'gyarados', candyCost: 400 } },
  { id: 'gyarados', name: 'Gyarados', dexNumber: 130, types: ['Water', 'Flying'], baseAttack: 237, baseDefense: 186, baseStamina: 216, baseCaptureRate: 0.10 },

  { id: 'eevee', name: 'Eevee', dexNumber: 133, types: ['Normal'], baseAttack: 104, baseDefense: 114, baseStamina: 146, baseCaptureRate: 0.40, evolution: { evolvesToId: 'vaporeon', candyCost: 25 } },
  { id: 'vaporeon', name: 'Vaporeon', dexNumber: 134, types: ['Water'], baseAttack: 205, baseDefense: 161, baseStamina: 277, baseCaptureRate: 0.125 },
  { id: 'jolteon', name: 'Jolteon', dexNumber: 135, types: ['Electric'], baseAttack: 232, baseDefense: 182, baseStamina: 163, baseCaptureRate: 0.125 },
  { id: 'flareon', name: 'Flareon', dexNumber: 136, types: ['Fire'], baseAttack: 246, baseDefense: 179, baseStamina: 163, baseCaptureRate: 0.125 },
  { id: 'espeon', name: 'Espeon', dexNumber: 196, types: ['Psychic'], baseAttack: 261, baseDefense: 175, baseStamina: 163, baseCaptureRate: 0.125 },
  { id: 'umbreon', name: 'Umbreon', dexNumber: 197, types: ['Dark'], baseAttack: 126, baseDefense: 240, baseStamina: 216, baseCaptureRate: 0.125 },
  { id: 'sylveon', name: 'Sylveon', dexNumber: 700, types: ['Fairy'], baseAttack: 203, baseDefense: 205, baseStamina: 216, baseCaptureRate: 0.125 },

  { id: 'dratini', name: 'Dratini', dexNumber: 147, types: ['Dragon'], baseAttack: 119, baseDefense: 91, baseStamina: 121, baseCaptureRate: 0.40, evolution: { evolvesToId: 'dragonair', candyCost: 25 } },
  { id: 'dragonair', name: 'Dragonair', dexNumber: 148, types: ['Dragon'], baseAttack: 163, baseDefense: 135, baseStamina: 156, baseCaptureRate: 0.10, evolution: { evolvesToId: 'dragonite', candyCost: 100 } },
  { id: 'dragonite', name: 'Dragonite', dexNumber: 149, types: ['Dragon', 'Flying'], baseAttack: 263, baseDefense: 198, baseStamina: 209, baseCaptureRate: 0.05 },

  { id: 'snorlax', name: 'Snorlax', dexNumber: 143, types: ['Normal'], baseAttack: 190, baseDefense: 169, baseStamina: 330, baseCaptureRate: 0.05 },
  { id: 'blissey', name: 'Blissey', dexNumber: 242, types: ['Normal'], baseAttack: 129, baseDefense: 169, baseStamina: 496, baseCaptureRate: 0.05 },
  { id: 'tyranitar', name: 'Tyranitar', dexNumber: 248, types: ['Rock', 'Dark'], baseAttack: 251, baseDefense: 207, baseStamina: 225, baseCaptureRate: 0.05 },
  
  { id: 'swampert', name: 'Swampert', dexNumber: 260, types: ['Water', 'Ground'], baseAttack: 208, baseDefense: 175, baseStamina: 225, baseCaptureRate: 0.05 },
  { id: 'marshtomp', name: 'Marshtomp', dexNumber: 259, types: ['Water', 'Ground'], baseAttack: 156, baseDefense: 133, baseStamina: 172, baseCaptureRate: 0.10, evolution: { evolvesToId: 'swampert', candyCost: 100 } },
  { id: 'mudkip', name: 'Mudkip', dexNumber: 258, types: ['Water'], baseAttack: 126, baseDefense: 93, baseStamina: 137, baseCaptureRate: 0.20, evolution: { evolvesToId: 'marshtomp', candyCost: 25 } },

  { id: 'gardevoir', name: 'Gardevoir', dexNumber: 282, types: ['Psychic', 'Fairy'], baseAttack: 237, baseDefense: 195, baseStamina: 169, baseCaptureRate: 0.05 },
  { id: 'metagross', name: 'Metagross', dexNumber: 376, types: ['Steel', 'Psychic'], baseAttack: 257, baseDefense: 228, baseStamina: 190, baseCaptureRate: 0.05 },
  { id: 'lucario', name: 'Lucario', dexNumber: 448, types: ['Fighting', 'Steel'], baseAttack: 236, baseDefense: 144, baseStamina: 172, baseCaptureRate: 0.10 },
  { id: 'garchomp', name: 'Garchomp', dexNumber: 445, types: ['Dragon', 'Ground'], baseAttack: 261, baseDefense: 193, baseStamina: 239, baseCaptureRate: 0.05 },
  { id: 'togekiss', name: 'Togekiss', dexNumber: 468, types: ['Fairy', 'Flying'], baseAttack: 225, baseDefense: 217, baseStamina: 198, baseCaptureRate: 0.10 },

  // Legendaries & Mythicals
  { id: 'mewtwo', name: 'Mewtwo', dexNumber: 150, types: ['Psychic'], baseAttack: 300, baseDefense: 182, baseStamina: 214, baseCaptureRate: 0.02 },
  { id: 'kyogre', name: 'Kyogre', dexNumber: 382, types: ['Water'], baseAttack: 270, baseDefense: 228, baseStamina: 205, baseCaptureRate: 0.02 },
  { id: 'groudon', name: 'Groudon', dexNumber: 383, types: ['Ground'], baseAttack: 270, baseDefense: 228, baseStamina: 205, baseCaptureRate: 0.02 },
  { id: 'rayquaza', name: 'Rayquaza', dexNumber: 384, types: ['Dragon', 'Flying'], baseAttack: 284, baseDefense: 170, baseStamina: 213, baseCaptureRate: 0.02 },
  { id: 'dialga', name: 'Dialga (Origin / Normal)', dexNumber: 483, types: ['Steel', 'Dragon'], baseAttack: 275, baseDefense: 211, baseStamina: 205, baseCaptureRate: 0.02 },
  { id: 'palkia', name: 'Palkia (Origin / Normal)', dexNumber: 484, types: ['Water', 'Dragon'], baseAttack: 280, baseDefense: 215, baseStamina: 189, baseCaptureRate: 0.02 },
  { id: 'giratina-o', name: 'Giratina (Origin)', dexNumber: 487, types: ['Ghost', 'Dragon'], baseAttack: 225, baseDefense: 187, baseStamina: 284, baseCaptureRate: 0.02 },
  { id: 'giratina-a', name: 'Giratina (Altered)', dexNumber: 487, types: ['Ghost', 'Dragon'], baseAttack: 187, baseDefense: 225, baseStamina: 284, baseCaptureRate: 0.02 },
  { id: 'kartana', name: 'Kartana', dexNumber: 798, types: ['Grass', 'Steel'], baseAttack: 323, baseDefense: 182, baseStamina: 139, baseCaptureRate: 0.02 },
  { id: 'xurkitree', name: 'Xurkitree', dexNumber: 796, types: ['Electric'], baseAttack: 330, baseDefense: 144, baseStamina: 195, baseCaptureRate: 0.02 },
  { id: 'necrozma-dusk', name: 'Necrozma (Dusk Mane)', dexNumber: 800, types: ['Psychic', 'Steel'], baseAttack: 277, baseDefense: 220, baseStamina: 200, baseCaptureRate: 0.02 },
  { id: 'necrozma-dawn', name: 'Necrozma (Dawn Wings)', dexNumber: 800, types: ['Psychic', 'Ghost'], baseAttack: 277, baseDefense: 220, baseStamina: 200, baseCaptureRate: 0.02 },
  { id: 'zacian', name: 'Zacian (Hero)', dexNumber: 888, types: ['Fairy'], baseAttack: 254, baseDefense: 236, baseStamina: 192, baseCaptureRate: 0.02 }
];

export interface RaidBossTier {
  name: string;
  tier: number;
  bossHp: number;
  timeLimitSec: number;
}

export const RAID_BOSS_TIERS: RaidBossTier[] = [
  { name: 'Tier 1 (Normal)', tier: 1, bossHp: 600, timeLimitSec: 180 },
  { name: 'Tier 3 (Solo / Duo)', tier: 3, bossHp: 3600, timeLimitSec: 180 },
  { name: 'Tier 5 (Legendary Raid)', tier: 5, bossHp: 15000, timeLimitSec: 300 },
  { name: 'Mega / Primal Raid', tier: 6, bossHp: 22500, timeLimitSec: 300 },
  { name: 'Elite Raid', tier: 7, bossHp: 20000, timeLimitSec: 300 }
];

// Calculation Helpers
export function calculatePokemonCp(
  baseAtk: number,
  baseDef: number,
  baseSta: number,
  atkIv: number,
  defIv: number,
  staIv: number,
  level: number
): number {
  const cpm = CP_MULTIPLIERS[level] || 0.7903;
  const totalAtk = baseAtk + atkIv;
  const totalDef = baseDef + defIv;
  const totalSta = baseSta + staIv;

  const cp = Math.floor((totalAtk * Math.sqrt(totalDef) * Math.sqrt(totalSta) * Math.pow(cpm, 2)) / 10);
  return Math.max(10, cp);
}

// Calculate PvP Stat Product for Great League (1500 CP) or Ultra League (2500 CP)
export function findBestPvpIv(
  pokemon: PokemonSpecies,
  maxCp: number
): { bestLevel: number; bestCp: number; statProduct: number; atk: number; def: number; hp: number } {
  let bestProd = 0;
  let result = { bestLevel: 1, bestCp: 10, statProduct: 0, atk: 0, def: 0, hp: 0 };

  // Sample standard rank-1 candidates (usually low atk, high def & hp)
  for (let lvl = 1; lvl <= 51; lvl += 0.5) {
    const cp = calculatePokemonCp(pokemon.baseAttack, pokemon.baseDefense, pokemon.baseStamina, 0, 15, 15, lvl);
    if (cp <= maxCp) {
      const cpm = CP_MULTIPLIERS[lvl] || 0.7903;
      const actualAtk = (pokemon.baseAttack + 0) * cpm;
      const actualDef = (pokemon.baseDefense + 15) * cpm;
      const actualHp = Math.floor((pokemon.baseStamina + 15) * cpm);
      const prod = Math.round(actualAtk * actualDef * actualHp / 1000);

      if (prod > bestProd) {
        bestProd = prod;
        result = {
          bestLevel: lvl,
          bestCp: cp,
          statProduct: prod,
          atk: Math.round(actualAtk * 10) / 10,
          def: Math.round(actualDef * 10) / 10,
          hp: actualHp
        };
      }
    }
  }

  return result;
}

// Catch probability formula
export interface CatchRateParams {
  baseCaptureRate: number;
  level: number;
  ballType: 'poke' | 'great' | 'ultra'; // 1.0, 1.5, 2.0
  berryType: 'none' | 'razz' | 'golden' | 'silver'; // 1.0, 1.5, 2.5, 1.8
  throwQuality: 'none' | 'nice' | 'great' | 'excellent'; // 1.0, 1.15, 1.5, 1.85
  curveball: boolean; // 1.7
  medalBonus: number; // 1.0 to 1.4
}

export function calculateCatchProbability(params: CatchRateParams): number {
  const cpm = CP_MULTIPLIERS[params.level] || 0.5;
  const ballMultiplier = params.ballType === 'ultra' ? 2.0 : params.ballType === 'great' ? 1.5 : 1.0;
  const berryMultiplier = params.berryType === 'golden' ? 2.5 : params.berryType === 'silver' ? 1.8 : params.berryType === 'razz' ? 1.5 : 1.0;
  const throwMultiplier = params.throwQuality === 'excellent' ? 1.85 : params.throwQuality === 'great' ? 1.5 : params.throwQuality === 'nice' ? 1.15 : 1.0;
  const curveMultiplier = params.curveball ? 1.7 : 1.0;
  const medalMultiplier = params.medalBonus || 1.4;

  const multi = ballMultiplier * berryMultiplier * throwMultiplier * curveMultiplier * medalMultiplier;
  const modifiedCaptureRate = 1 - Math.pow(1 - (params.baseCaptureRate / (2 * cpm)), multi);

  return Math.min(1.0, Math.max(0.01, modifiedCaptureRate));
}
