/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Centralized Palworld Game Data & Verified Formulas
// Game Version: Palworld v0.3.5 / 1.0+ (Sakitajima & Raid Updates)
// Last Updated: 2026

export const PALWORLD_DATA_VERSION = {
  version: 'v0.3.5 / 1.0+ (Latest)',
  lastUpdated: 'October 2026',
  patchNotes: 'Includes Sakurajima pals, raid bosses (Bellanoir, Blazamut Ryu), and updated breeding CombiRanks.'
};

export interface PalWorkSuitability {
  kindling?: number;
  watering?: number;
  planting?: number;
  electricity?: number;
  handiwork?: number;
  gathering?: number;
  lumbering?: number;
  mining?: number;
  medicine?: number;
  cooling?: number;
  transporting?: number;
  farming?: number;
}

export interface PalInfo {
  id: string;
  name: string;
  palDexNumber: number;
  elements: string[];
  breedingPower: number; // Official CombiRank power (lower = higher tier)
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  baseWorkSpeed: number;
  rarity: number;
  suitabilities: PalWorkSuitability;
  isSpecialChild?: boolean;
}

// Verified CombiRank & Stats for Key Meta & Popular Pals
export const PALWORLD_PALS: PalInfo[] = [
  { id: 'lamball', name: 'Lamball', palDexNumber: 1, elements: ['Neutral'], breedingPower: 1470, baseHp: 70, baseAttack: 70, baseDefense: 70, baseWorkSpeed: 100, rarity: 1, suitabilities: { handiwork: 1, transporting: 1, farming: 1 } },
  { id: 'cattiva', name: 'Cattiva', palDexNumber: 2, elements: ['Neutral'], breedingPower: 1460, baseHp: 70, baseAttack: 70, baseDefense: 70, baseWorkSpeed: 100, rarity: 1, suitabilities: { handiwork: 1, gathering: 1, mining: 1, transporting: 1 } },
  { id: 'chikipi', name: 'Chikipi', palDexNumber: 3, elements: ['Neutral'], breedingPower: 1500, baseHp: 60, baseAttack: 60, baseDefense: 60, baseWorkSpeed: 100, rarity: 1, suitabilities: { gathering: 1, farming: 1 } },
  { id: 'lifmunk', name: 'Lifmunk', palDexNumber: 4, elements: ['Grass'], breedingPower: 1430, baseHp: 75, baseAttack: 70, baseDefense: 70, baseWorkSpeed: 100, rarity: 1, suitabilities: { planting: 1, handiwork: 1, lumbering: 1, medicine: 1, gathering: 1 } },
  { id: 'foxparks', name: 'Foxparks', palDexNumber: 5, elements: ['Fire'], breedingPower: 1400, baseHp: 65, baseAttack: 75, baseDefense: 65, baseWorkSpeed: 100, rarity: 1, suitabilities: { kindling: 1 } },
  { id: 'fuack', name: 'Fuack', palDexNumber: 6, elements: ['Water'], breedingPower: 1390, baseHp: 65, baseAttack: 75, baseDefense: 70, baseWorkSpeed: 100, rarity: 1, suitabilities: { handiwork: 1, watering: 1, transporting: 1 } },
  { id: 'sparkit', name: 'Sparkit', palDexNumber: 7, elements: ['Electric'], breedingPower: 1410, baseHp: 60, baseAttack: 85, baseDefense: 70, baseWorkSpeed: 100, rarity: 1, suitabilities: { handiwork: 1, electricity: 1, transporting: 1 } },
  { id: 'tanzee', name: 'Tanzee', palDexNumber: 8, elements: ['Grass'], breedingPower: 1380, baseHp: 75, baseAttack: 85, baseDefense: 75, baseWorkSpeed: 100, rarity: 1, suitabilities: { planting: 1, handiwork: 1, lumbering: 1, transporting: 1, gathering: 1 } },
  { id: 'pengullet', name: 'Pengullet', palDexNumber: 10, elements: ['Water', 'Ice'], breedingPower: 1350, baseHp: 70, baseAttack: 75, baseDefense: 75, baseWorkSpeed: 100, rarity: 1, suitabilities: { handiwork: 1, watering: 1, transporting: 1, cooling: 1 } },
  { id: 'vixy', name: 'Vixy', palDexNumber: 14, elements: ['Neutral'], breedingPower: 1450, baseHp: 70, baseAttack: 70, baseDefense: 70, baseWorkSpeed: 100, rarity: 1, suitabilities: { gathering: 1, farming: 1 } },
  { id: 'daedream', name: 'Daedream', palDexNumber: 19, elements: ['Dark'], breedingPower: 1230, baseHp: 70, baseAttack: 80, baseDefense: 70, baseWorkSpeed: 100, rarity: 2, suitabilities: { handiwork: 1, transporting: 1, gathering: 1 } },
  { id: 'rushoar', name: 'Rushoar', palDexNumber: 20, elements: ['Ground'], breedingPower: 1130, baseHp: 80, baseAttack: 70, baseDefense: 75, baseWorkSpeed: 100, rarity: 2, suitabilities: { mining: 1 } },
  { id: 'nox', name: 'Nox', palDexNumber: 21, elements: ['Dark'], breedingPower: 1180, baseHp: 75, baseAttack: 85, baseDefense: 75, baseWorkSpeed: 100, rarity: 2, suitabilities: { gathering: 1 } },
  { id: 'depresso', name: 'Depresso', palDexNumber: 17, elements: ['Dark'], breedingPower: 1340, baseHp: 70, baseAttack: 70, baseDefense: 70, baseWorkSpeed: 100, rarity: 1, suitabilities: { handiwork: 1, transporting: 1, mining: 1 } },
  { id: 'eikthyrdeer', name: 'Eikthyrdeer', palDexNumber: 37, elements: ['Neutral'], breedingPower: 920, baseHp: 90, baseAttack: 80, baseDefense: 80, baseWorkSpeed: 100, rarity: 2, suitabilities: { lumbering: 2 } },
  { id: 'caprity', name: 'Caprity', palDexNumber: 35, elements: ['Grass'], breedingPower: 930, baseHp: 80, baseAttack: 75, baseDefense: 80, baseWorkSpeed: 100, rarity: 2, suitabilities: { planting: 2, farming: 1 } },
  { id: 'arsox', name: 'Arsox', palDexNumber: 42, elements: ['Fire'], breedingPower: 890, baseHp: 85, baseAttack: 90, baseDefense: 85, baseWorkSpeed: 100, rarity: 3, suitabilities: { kindling: 2, lumbering: 1 } },
  { id: 'dinossom', name: 'Dinossom', palDexNumber: 64, elements: ['Grass', 'Dragon'], breedingPower: 820, baseHp: 110, baseAttack: 80, baseDefense: 90, baseWorkSpeed: 100, rarity: 3, suitabilities: { planting: 2, lumbering: 2 } },
  { id: 'vanwyrm', name: 'Vanwyrm', palDexNumber: 66, elements: ['Fire', 'Dark'], breedingPower: 660, baseHp: 90, baseAttack: 95, baseDefense: 85, baseWorkSpeed: 100, rarity: 3, suitabilities: { kindling: 2, transporting: 3 } },
  { id: 'rayhound', name: 'Rayhound', palDexNumber: 60, elements: ['Electric'], breedingPower: 740, baseHp: 90, baseAttack: 90, baseDefense: 80, baseWorkSpeed: 100, rarity: 3, suitabilities: { electricity: 2 } },
  { id: 'beegarde', name: 'Beegarde', palDexNumber: 50, elements: ['Grass'], breedingPower: 1110, baseHp: 75, baseAttack: 75, baseDefense: 75, baseWorkSpeed: 100, rarity: 2, suitabilities: { planting: 1, handiwork: 1, lumbering: 1, medicine: 1, transporting: 2, gathering: 1, farming: 1 } },
  { id: 'elizabee', name: 'Elizabee', palDexNumber: 51, elements: ['Grass'], breedingPower: 390, baseHp: 100, baseAttack: 100, baseDefense: 100, baseWorkSpeed: 100, rarity: 4, suitabilities: { planting: 2, handiwork: 2, lumbering: 1, medicine: 2, gathering: 2 } },
  { id: 'mossanda', name: 'Mossanda', palDexNumber: 33, elements: ['Grass'], breedingPower: 580, baseHp: 100, baseAttack: 90, baseDefense: 90, baseWorkSpeed: 100, rarity: 3, suitabilities: { planting: 2, handiwork: 2, lumbering: 2, transporting: 3 } },
  { id: 'mossanda-lux', name: 'Mossanda Lux', palDexNumber: 33, elements: ['Electric'], breedingPower: 570, baseHp: 100, baseAttack: 100, baseDefense: 90, baseWorkSpeed: 100, rarity: 3, suitabilities: { handiwork: 2, lumbering: 2, transporting: 3, electricity: 2 }, isSpecialChild: true },
  { id: 'penking', name: 'Penking', palDexNumber: 11, elements: ['Water', 'Ice'], breedingPower: 520, baseHp: 95, baseAttack: 85, baseDefense: 95, baseWorkSpeed: 100, rarity: 3, suitabilities: { handiwork: 2, transporting: 2, watering: 2, mining: 2, cooling: 2 } },
  { id: 'bushio', name: 'Bushi', palDexNumber: 72, elements: ['Fire'], breedingPower: 730, baseHp: 80, baseAttack: 105, baseDefense: 80, baseWorkSpeed: 100, rarity: 3, suitabilities: { kindling: 2, handiwork: 1, lumbering: 3, transporting: 2, gathering: 1 } },
  { id: 'anubis', name: 'Anubis', palDexNumber: 100, elements: ['Ground'], breedingPower: 570, baseHp: 120, baseAttack: 130, baseDefense: 100, baseWorkSpeed: 100, rarity: 5, suitabilities: { handiwork: 4, mining: 3, transporting: 2 } },
  { id: 'grizzbolt', name: 'Grizzbolt', palDexNumber: 103, elements: ['Electric'], breedingPower: 200, baseHp: 105, baseAttack: 120, baseDefense: 100, baseWorkSpeed: 100, rarity: 4, suitabilities: { handiwork: 2, lumbering: 2, transporting: 3, electricity: 3 }, isSpecialChild: true },
  { id: 'relaxaurus', name: 'Relaxaurus', palDexNumber: 85, elements: ['Dragon', 'Water'], breedingPower: 280, baseHp: 110, baseAttack: 110, baseDefense: 90, baseWorkSpeed: 100, rarity: 4, suitabilities: { watering: 2, transporting: 1 } },
  { id: 'relaxaurus-lux', name: 'Relaxaurus Lux', palDexNumber: 85, elements: ['Dragon', 'Electric'], breedingPower: 270, baseHp: 110, baseAttack: 110, baseDefense: 90, baseWorkSpeed: 100, rarity: 4, suitabilities: { electricity: 3, transporting: 1 }, isSpecialChild: true },
  { id: 'digtoise', name: 'Digtoise', palDexNumber: 67, elements: ['Ground'], breedingPower: 880, baseHp: 80, baseAttack: 75, baseDefense: 95, baseWorkSpeed: 100, rarity: 3, suitabilities: { mining: 3 } },
  { id: 'jormuntide', name: 'Jormuntide', palDexNumber: 101, elements: ['Dragon', 'Water'], breedingPower: 310, baseHp: 130, baseAttack: 150, baseDefense: 100, baseWorkSpeed: 100, rarity: 5, suitabilities: { watering: 4 } },
  { id: 'jormuntide-ignis', name: 'Jormuntide Ignis', palDexNumber: 101, elements: ['Dragon', 'Fire'], breedingPower: 315, baseHp: 130, baseAttack: 150, baseDefense: 100, baseWorkSpeed: 100, rarity: 5, suitabilities: { kindling: 4 } },
  { id: 'helzephyr', name: 'Helzephyr', palDexNumber: 97, elements: ['Dark'], breedingPower: 190, baseHp: 100, baseAttack: 125, baseDefense: 100, baseWorkSpeed: 100, rarity: 4, suitabilities: { transporting: 3 } },
  { id: 'ragnahawk', name: 'Ragnahawk', palDexNumber: 98, elements: ['Fire'], breedingPower: 380, baseHp: 90, baseAttack: 125, baseDefense: 95, baseWorkSpeed: 100, rarity: 4, suitabilities: { kindling: 3, transporting: 3 } },
  { id: 'lyleen', name: 'Lyleen', palDexNumber: 104, elements: ['Grass'], breedingPower: 250, baseHp: 110, baseAttack: 100, baseDefense: 115, baseWorkSpeed: 100, rarity: 5, suitabilities: { planting: 4, handiwork: 3, medicine: 3, gathering: 2 } },
  { id: 'lyleen-noct', name: 'Lyleen Noct', palDexNumber: 104, elements: ['Dark'], breedingPower: 240, baseHp: 110, baseAttack: 105, baseDefense: 115, baseWorkSpeed: 100, rarity: 5, suitabilities: { handiwork: 3, medicine: 3, gathering: 2 }, isSpecialChild: true },
  { id: 'faleris', name: 'Faleris', palDexNumber: 105, elements: ['Fire'], breedingPower: 260, baseHp: 100, baseAttack: 120, baseDefense: 110, baseWorkSpeed: 100, rarity: 5, suitabilities: { kindling: 3, transporting: 3 } },
  { id: 'astegon', name: 'Astegon', palDexNumber: 99, elements: ['Dragon', 'Dark'], breedingPower: 150, baseHp: 100, baseAttack: 125, baseDefense: 125, baseWorkSpeed: 100, rarity: 5, suitabilities: { handiwork: 1, mining: 4 } },
  { id: 'suzaku', name: 'Suzaku', palDexNumber: 102, elements: ['Fire'], breedingPower: 140, baseHp: 120, baseAttack: 105, baseDefense: 105, baseWorkSpeed: 100, rarity: 5, suitabilities: { kindling: 3 } },
  { id: 'suzaku-aqua', name: 'Suzaku Aqua', palDexNumber: 102, elements: ['Water'], breedingPower: 130, baseHp: 120, baseAttack: 105, baseDefense: 105, baseWorkSpeed: 100, rarity: 5, suitabilities: { watering: 3 }, isSpecialChild: true },
  { id: 'shadowbeak', name: 'Shadowbeak', palDexNumber: 107, elements: ['Dark'], breedingPower: 120, baseHp: 120, baseAttack: 120, baseDefense: 120, baseWorkSpeed: 100, rarity: 5, suitabilities: { gathering: 1 }, isSpecialChild: true },
  { id: 'paladius', name: 'Paladius', palDexNumber: 108, elements: ['Neutral'], breedingPower: 80, baseHp: 130, baseAttack: 120, baseDefense: 145, baseWorkSpeed: 100, rarity: 5, suitabilities: { lumbering: 2, mining: 2 } },
  { id: 'necromus', name: 'Necromus', palDexNumber: 109, elements: ['Dark'], breedingPower: 70, baseHp: 130, baseAttack: 145, baseDefense: 120, baseWorkSpeed: 100, rarity: 5, suitabilities: { lumbering: 2, mining: 2 } },
  { id: 'frostallion', name: 'Frostallion', palDexNumber: 110, elements: ['Ice'], breedingPower: 60, baseHp: 140, baseAttack: 140, baseDefense: 120, baseWorkSpeed: 100, rarity: 5, suitabilities: { cooling: 4 } },
  { id: 'frostallion-noct', name: 'Frostallion Noct', palDexNumber: 110, elements: ['Dark'], breedingPower: 50, baseHp: 140, baseAttack: 140, baseDefense: 120, baseWorkSpeed: 100, rarity: 5, suitabilities: { gathering: 4 }, isSpecialChild: true },
  { id: 'jetragon', name: 'Jetragon', palDexNumber: 111, elements: ['Dragon'], breedingPower: 40, baseHp: 110, baseAttack: 140, baseDefense: 110, baseWorkSpeed: 100, rarity: 5, suitabilities: { gathering: 3 } },
  { id: 'blazamut', name: 'Blazamut', palDexNumber: 96, elements: ['Fire'], breedingPower: 10, baseHp: 100, baseAttack: 150, baseDefense: 120, baseWorkSpeed: 100, rarity: 5, suitabilities: { kindling: 3, mining: 4 } },
  { id: 'bellanoir', name: 'Bellanoir', palDexNumber: 112, elements: ['Dark'], breedingPower: 20, baseHp: 100, baseAttack: 120, baseDefense: 100, baseWorkSpeed: 100, rarity: 5, suitabilities: { medicine: 4, handiwork: 2, transporting: 2 } },
  { id: 'blazamut-ryu', name: 'Blazamut Ryu', palDexNumber: 113, elements: ['Dragon', 'Fire'], breedingPower: 5, baseHp: 120, baseAttack: 155, baseDefense: 125, baseWorkSpeed: 100, rarity: 5, suitabilities: { kindling: 4, mining: 4 } }
];

// Special Unique Breeding Combinations (Fixed Overrides)
export interface SpecialBreedingPair {
  parentAId: string;
  parentBId: string;
  childId: string;
}

export const SPECIAL_BREEDING_COMBOS: SpecialBreedingPair[] = [
  { parentAId: 'suzaku', parentBId: 'relaxaurus', childId: 'astegon' },
  { parentAId: 'mossanda', parentBId: 'rayhound', childId: 'grizzbolt' },
  { parentAId: 'mossanda', parentBId: 'grizzbolt', childId: 'mossanda-lux' },
  { parentAId: 'relaxaurus', parentBId: 'sparkit', childId: 'relaxaurus-lux' },
  { parentAId: 'frostallion', parentBId: 'helzephyr', childId: 'frostallion-noct' },
  { parentAId: 'penking', parentBId: 'bushio', childId: 'anubis' },
  { parentAId: 'vanwyrm', parentBId: 'anubis', childId: 'faleris' },
  { parentAId: 'astegon', parentBId: 'kitsun', childId: 'shadowbeak' },
  { parentAId: 'suzaku', parentBId: 'jormuntide', childId: 'suzaku-aqua' },
  { parentAId: 'lyleen', parentBId: 'menasting', childId: 'lyleen-noct' }
];

// Helper to determine breeding outcome
export function calculateBreedingChild(parentAId: string, parentBId: string): PalInfo {
  // 1. Same species breeding
  if (parentAId === parentBId) {
    return PALWORLD_PALS.find(p => p.id === parentAId) || PALWORLD_PALS[0];
  }

  // 2. Check special override pairs
  const specialMatch = SPECIAL_BREEDING_COMBOS.find(
    s => (s.parentAId === parentAId && s.parentBId === parentBId) ||
         (s.parentAId === parentBId && s.parentBId === parentAId)
  );
  if (specialMatch) {
    const specialChild = PALWORLD_PALS.find(p => p.id === specialMatch.childId);
    if (specialChild) return specialChild;
  }

  // 3. Standard CombiRank formula: Floor((PowerA + PowerB + 1) / 2)
  const palA = PALWORLD_PALS.find(p => p.id === parentAId) || PALWORLD_PALS[0];
  const palB = PALWORLD_PALS.find(p => p.id === parentBId) || PALWORLD_PALS[1];
  const targetPower = Math.floor((palA.breedingPower + palB.breedingPower + 1) / 2);

  // Find non-special Pal with closest breeding power
  const eligiblePals = PALWORLD_PALS.filter(p => !p.isSpecialChild);
  let closestPal = eligiblePals[0];
  let minDiff = Math.abs(closestPal.breedingPower - targetPower);

  for (const pal of eligiblePals) {
    const diff = Math.abs(pal.breedingPower - targetPower);
    if (diff < minDiff) {
      minDiff = diff;
      closestPal = pal;
    }
  }

  return closestPal;
}

// Reverse Breeding: Find all parent pairs that produce target Pal
export function findBreedingParents(targetPalId: string): { parentA: PalInfo; parentB: PalInfo; isSpecial: boolean }[] {
  const results: { parentA: PalInfo; parentB: PalInfo; isSpecial: boolean }[] = [];
  const targetPal = PALWORLD_PALS.find(p => p.id === targetPalId);
  if (!targetPal) return results;

  // Add same species
  results.push({ parentA: targetPal, parentB: targetPal, isSpecial: false });

  // Add special pairs
  SPECIAL_BREEDING_COMBOS.forEach(combo => {
    if (combo.childId === targetPalId) {
      const pA = PALWORLD_PALS.find(p => p.id === combo.parentAId);
      const pB = PALWORLD_PALS.find(p => p.id === combo.parentBId);
      if (pA && pB) {
        results.push({ parentA: pA, parentB: pB, isSpecial: true });
      }
    }
  });

  // Check generic pairs
  if (!targetPal.isSpecialChild) {
    for (let i = 0; i < PALWORLD_PALS.length; i++) {
      for (let j = i + 1; j < PALWORLD_PALS.length; j++) {
        const palA = PALWORLD_PALS[i];
        const palB = PALWORLD_PALS[j];
        
        // Skip if this pair is a special combo producing something else
        const isSpecial = SPECIAL_BREEDING_COMBOS.some(
          s => (s.parentAId === palA.id && s.parentBId === palB.id) ||
               (s.parentAId === palB.id && s.parentBId === palA.id)
        );
        if (isSpecial) continue;

        const child = calculateBreedingChild(palA.id, palB.id);
        if (child.id === targetPalId) {
          results.push({ parentA: palA, parentB: palB, isSpecial: false });
        }
      }
    }
  }

  return results;
}

// Passive Traits Catalog
export interface PassiveTrait {
  id: string;
  name: string;
  tier: number; // 1 to 4
  type: 'attack' | 'defense' | 'speed' | 'work' | 'element' | 'utility';
  attackMod: number;
  defenseMod: number;
  workSpeedMod: number;
  movementSpeedMod: number;
  description: string;
}

export const PASSIVE_TRAITS: PassiveTrait[] = [
  { id: 'artisan', name: 'Artisan', tier: 3, type: 'work', attackMod: 0, defenseMod: 0, workSpeedMod: 0.50, movementSpeedMod: 0, description: 'Work Speed +50%' },
  { id: 'work-slave', name: 'Work Slave', tier: 1, type: 'work', attackMod: -0.30, defenseMod: 0, workSpeedMod: 0.30, movementSpeedMod: 0, description: 'Work Speed +30%, Attack -30%' },
  { id: 'serious', name: 'Serious', tier: 2, type: 'work', attackMod: 0, defenseMod: 0, workSpeedMod: 0.20, movementSpeedMod: 0, description: 'Work Speed +20%' },
  { id: 'conceited', name: 'Conceited', tier: 1, type: 'work', attackMod: 0, defenseMod: -0.10, workSpeedMod: 0.10, movementSpeedMod: 0, description: 'Work Speed +10%, Defense -10%' },
  { id: 'musclehead', name: 'Musclehead', tier: 2, type: 'attack', attackMod: 0.30, defenseMod: 0, workSpeedMod: -0.50, movementSpeedMod: 0, description: 'Attack +30%, Work Speed -50%' },
  { id: 'ferocious', name: 'Ferocious', tier: 3, type: 'attack', attackMod: 0.20, defenseMod: 0, workSpeedMod: 0, movementSpeedMod: 0, description: 'Attack +20%' },
  { id: 'legend', name: 'Legend', tier: 4, type: 'utility', attackMod: 0.20, defenseMod: 0.20, workSpeedMod: 0, movementSpeedMod: 0.15, description: 'Attack +20%, Defense +20%, Movement Speed +15%' },
  { id: 'burly-body', name: 'Burly Body', tier: 3, type: 'defense', attackMod: 0, defenseMod: 0.20, workSpeedMod: 0, movementSpeedMod: 0, description: 'Defense +20%' },
  { id: 'runner', name: 'Runner', tier: 2, type: 'speed', attackMod: 0, defenseMod: 0, workSpeedMod: 0, movementSpeedMod: 0.20, description: 'Movement Speed +20%' },
  { id: 'swift', name: 'Swift', tier: 3, type: 'speed', attackMod: 0, defenseMod: 0, workSpeedMod: 0, movementSpeedMod: 0.30, description: 'Movement Speed +30%' },
  { id: 'nimble', name: 'Nimble', tier: 1, type: 'speed', attackMod: 0, defenseMod: 0, workSpeedMod: 0, movementSpeedMod: 0.10, description: 'Movement Speed +10%' },
  { id: 'diet-lover', name: 'Diet Lover', tier: 3, type: 'utility', attackMod: 0, defenseMod: 0, workSpeedMod: 0, movementSpeedMod: 0, description: 'Hunger depletion -15%' },
  { id: 'workaholic', name: 'Workaholic', tier: 3, type: 'utility', attackMod: 0, defenseMod: 0, workSpeedMod: 0, movementSpeedMod: 0, description: 'SAN drop rate -15%' }
];

// Capture Spheres
export interface PalSphere {
  id: string;
  name: string;
  power: number; // Capture power multiplier
  levelReq: number;
  materials: { name: string; count: number }[];
}

export const PAL_SPHERES: PalSphere[] = [
  { id: 'pal-sphere', name: 'Pal Sphere (Blue)', power: 1.0, levelReq: 2, materials: [{ name: 'Paldium Fragment', count: 1 }, { name: 'Wood', count: 3 }, { name: 'Stone', count: 3 }] },
  { id: 'mega-sphere', name: 'Mega Sphere (Green)', power: 1.5, levelReq: 14, materials: [{ name: 'Paldium Fragment', count: 1 }, { name: 'Ingot', count: 1 }, { name: 'Wood', count: 5 }, { name: 'Stone', count: 5 }] },
  { id: 'giga-sphere', name: 'Giga Sphere (Yellow)', power: 2.0, levelReq: 20, materials: [{ name: 'Paldium Fragment', count: 2 }, { name: 'Ingot', count: 2 }, { name: 'Wood', count: 7 }, { name: 'Stone', count: 7 }] },
  { id: 'hyper-sphere', name: 'Hyper Sphere (Red)', power: 2.5, levelReq: 27, materials: [{ name: 'Paldium Fragment', count: 3 }, { name: 'Ingot', count: 3 }, { name: 'Wood', count: 10 }, { name: 'Cement', count: 2 }] },
  { id: 'ultra-sphere', name: 'Ultra Sphere (Pink)', power: 3.2, levelReq: 35, materials: [{ name: 'Paldium Fragment', count: 5 }, { name: 'Refined Ingot', count: 5 }, { name: 'Carbon Fiber', count: 2 }, { name: 'Cement', count: 3 }] },
  { id: 'legendary-sphere', name: 'Legendary Sphere (Purple)', power: 4.5, levelReq: 44, materials: [{ name: 'Paldium Fragment', count: 10 }, { name: 'Pal Metal Ingot', count: 5 }, { name: 'Carbon Fiber', count: 3 }, { name: 'Cement', count: 5 }] },
  { id: 'ultimate-sphere', name: 'Ultimate Sphere (Sakurajima)', power: 6.0, levelReq: 51, materials: [{ name: 'Paldium Fragment', count: 15 }, { name: 'Plasteel', count: 10 }, { name: 'Carbon Fiber', count: 5 }] }
];

// Condensation Progression Matrix
export interface CondensationRank {
  rank: number; // 1 to 4
  stars: string;
  palsRequired: number;
  cumulativePals: number;
  statMultiplier: string;
  partnerSkillBonus: string;
}

export const CONDENSATION_RANKS: CondensationRank[] = [
  { rank: 1, stars: '★', palsRequired: 4, cumulativePals: 4, statMultiplier: '+5% HP, ATK, DEF', partnerSkillBonus: 'Partner Skill Lv. 2 (+1 Work Suitabilities)' },
  { rank: 2, stars: '★★', palsRequired: 16, cumulativePals: 20, statMultiplier: '+10% HP, ATK, DEF', partnerSkillBonus: 'Partner Skill Lv. 3' },
  { rank: 3, stars: '★★★', palsRequired: 32, cumulativePals: 52, statMultiplier: '+15% HP, ATK, DEF', partnerSkillBonus: 'Partner Skill Lv. 4' },
  { rank: 4, stars: '★★★★ (Max)', palsRequired: 64, cumulativePals: 116, statMultiplier: '+20% HP, ATK, DEF', partnerSkillBonus: 'Partner Skill Lv. 5 (+1 Work Suitability to ALL skills)' }
];

// Palworld 1.0 Datamined Passive Inheritance Mechanics
export type PassiveInheritanceMode = 'extras-allowed' | 'exact-only';

export const PALWORLD_INHERIT_WEIGHTS: Record<1 | 2 | 3 | 4, number> = {
  1: 0.40,
  2: 0.30,
  3: 0.20,
  4: 0.10
};

export const PALWORLD_RANDOM_ADD_WEIGHTS: Record<0 | 1 | 2 | 3, number> = {
  0: 0.40,
  1: 0.30,
  2: 0.20,
  3: 0.10
};

export const PALWORLD_SPECIAL_CAKE_RECIPE = {
  station: 'Ancient Kitchen (Tech 74)',
  ingredients: [
    { name: 'Flour', count: 20 },
    { name: 'Caramel Cotton Candy', count: 8 },
    { name: 'Milk', count: 15 },
    { name: 'Egg', count: 15 },
    { name: 'Mammorest Meat', count: 2 }
  ]
} as const;

// Extras allowed, Special Cake OFF (% per egg) for Pool 1..8 and Desired 1..4
export const PALWORLD_INHERITANCE_REFERENCE_TABLE: {
  poolSize: number;
  odds: [number, number | null, number | null, number | null];
}[] = [
  { poolSize: 1, odds: [100.00, null, null, null] },
  { poolSize: 2, odds: [80.00, 60.00, null, null] },
  { poolSize: 3, odds: [63.33, 40.00, 30.00, null] },
  { poolSize: 4, odds: [50.00, 25.00, 15.00, 10.00] },
  { poolSize: 5, odds: [40.00, 15.00, 6.00, 2.00] },
  { poolSize: 6, odds: [33.33, 10.00, 3.00, 0.67] },
  { poolSize: 7, odds: [28.57, 7.14, 1.71, 0.29] },
  { poolSize: 8, odds: [25.00, 5.36, 1.07, 0.14] }
];

export function binomialCoefficient(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  const r = Math.min(k, n - k);
  let result = 1;
  for (let i = 1; i <= r; i++) {
    result = (result * (n - i + 1)) / i;
  }
  return Math.round(result);
}

export interface InheritanceRollBreakdown {
  k: number;
  rollWeight: number;
  inheritedCount: number;
  drawMatchProbability: number;
  randomZeroFactor: number;
  contribution: number;
}

export interface PassiveInheritanceResult {
  poolSize: number;
  desiredCount: number;
  mode: PassiveInheritanceMode;
  specialCake: boolean;
  probability: number;
  percentageFormatted: string;
  expectedEggs: number | null;
  eggsFor90Percent: number | null;
  breakdown: InheritanceRollBreakdown[];
}

export function calculatePassiveInheritanceOdds(
  poolSize: number,
  desiredCount: number,
  mode: PassiveInheritanceMode,
  specialCake: boolean
): PassiveInheritanceResult {
  if (poolSize <= 0 || desiredCount <= 0 || desiredCount > poolSize || desiredCount > 4) {
    return {
      poolSize,
      desiredCount,
      mode,
      specialCake,
      probability: 0,
      percentageFormatted: '0.00%',
      expectedEggs: null,
      eggsFor90Percent: null,
      breakdown: []
    };
  }

  const breakdown: InheritanceRollBreakdown[] = [];
  let probability = 0;

  if (mode === 'extras-allowed') {
    if (specialCake) {
      const m = Math.min(4, poolSize);
      const drawMatchProbability =
        m >= desiredCount
          ? binomialCoefficient(poolSize - desiredCount, m - desiredCount) / binomialCoefficient(poolSize, m)
          : 0;
      probability = drawMatchProbability;
      breakdown.push({
        k: 4,
        rollWeight: 1,
        inheritedCount: m,
        drawMatchProbability,
        randomZeroFactor: 1,
        contribution: drawMatchProbability
      });
    } else {
      for (const k of [1, 2, 3, 4] as const) {
        const w = PALWORLD_INHERIT_WEIGHTS[k];
        const m = Math.min(k, poolSize);
        const drawMatchProbability =
          m >= desiredCount
            ? binomialCoefficient(poolSize - desiredCount, m - desiredCount) / binomialCoefficient(poolSize, m)
            : 0;
        const contribution = w * drawMatchProbability;
        probability += contribution;
        breakdown.push({
          k,
          rollWeight: w,
          inheritedCount: m,
          drawMatchProbability,
          randomZeroFactor: 1,
          contribution
        });
      }
    }
  } else {
    // mode === 'exact-only'
    if (specialCake) {
      const m = Math.min(4, poolSize);
      if (m === desiredCount) {
        const drawMatchProbability = 1 / binomialCoefficient(poolSize, desiredCount);
        const randomZeroFactor = m < 4 ? 0.40 : 1;
        const contribution = drawMatchProbability * randomZeroFactor;
        probability = contribution;
        breakdown.push({
          k: 4,
          rollWeight: 1,
          inheritedCount: m,
          drawMatchProbability,
          randomZeroFactor,
          contribution
        });
      } else {
        breakdown.push({
          k: 4,
          rollWeight: 1,
          inheritedCount: m,
          drawMatchProbability: 0,
          randomZeroFactor: m < 4 ? 0.40 : 1,
          contribution: 0
        });
      }
    } else if (desiredCount === 4) {
      const drawMatchProbability = 1 / binomialCoefficient(poolSize, 4);
      const contribution = PALWORLD_INHERIT_WEIGHTS[4] * drawMatchProbability;
      probability = contribution;
      for (const k of [1, 2, 3, 4] as const) {
        const m = Math.min(k, poolSize);
        breakdown.push({
          k,
          rollWeight: PALWORLD_INHERIT_WEIGHTS[k],
          inheritedCount: m,
          drawMatchProbability: k === 4 ? drawMatchProbability : 0,
          randomZeroFactor: 1,
          contribution: k === 4 ? contribution : 0
        });
      }
    } else {
      for (const k of [1, 2, 3, 4] as const) {
        const w = PALWORLD_INHERIT_WEIGHTS[k];
        const m = Math.min(k, poolSize);
        const matchesExactCount = m === desiredCount;
        const drawMatchProbability = matchesExactCount ? 1 / binomialCoefficient(poolSize, desiredCount) : 0;
        const randomZeroFactor = 0.40;
        const contribution = matchesExactCount ? w * drawMatchProbability * randomZeroFactor : 0;
        probability += contribution;
        breakdown.push({
          k,
          rollWeight: w,
          inheritedCount: m,
          drawMatchProbability,
          randomZeroFactor,
          contribution
        });
      }
    }
  }

  probability = Math.min(1, Math.max(0, probability));
  const expectedEggs = probability > 1e-12 ? Math.ceil(1 / probability - 1e-12) : null;
  const eggsFor90Percent =
    probability >= 1 - 1e-12
      ? 1
      : probability > 1e-12
        ? Math.ceil(Math.log(0.10) / Math.log(1 - probability) - 1e-12)
        : null;

  return {
    poolSize,
    desiredCount,
    mode,
    specialCake,
    probability,
    percentageFormatted: `${(probability * 100).toFixed(2)}%`,
    expectedEggs,
    eggsFor90Percent,
    breakdown
  };
}

// ============================================================================
// Egg Incubation Time Calculator (PalEggDefaultHatchingTime)
// ============================================================================

export type EggSize = 'regular' | 'large' | 'huge';

export type IncubationPresetId =
  | 'casual'
  | 'normal'
  | 'hard'
  | 'hardcore'
  | 'dedicated'
  | 'custom';

export interface EggSizeMeta {
  id: EggSize;
  label: string;
  shortLabel: string;
  divisor: number;
  rarityMin: number;
  rarityMax: number;
  defaultRarity: number;
}

export const EGG_SIZE_CONFIG: Record<EggSize, EggSizeMeta> = {
  regular: {
    id: 'regular',
    label: 'Regular Egg',
    shortLabel: 'Regular',
    divisor: 12,
    rarityMin: 1,
    rarityMax: 4,
    defaultRarity: 1
  },
  large: {
    id: 'large',
    label: 'Large Egg',
    shortLabel: 'Large',
    divisor: 2,
    rarityMin: 5,
    rarityMax: 7,
    defaultRarity: 5
  },
  huge: {
    id: 'huge',
    label: 'Huge Egg',
    shortLabel: 'Huge',
    divisor: 1,
    rarityMin: 8,
    rarityMax: 20,
    defaultRarity: 8
  }
};

export const EGG_SIZE_ORDER: EggSize[] = ['regular', 'large', 'huge'];

export interface IncubationWorldPreset {
  id: Exclude<IncubationPresetId, 'custom'>;
  label: string;
  hours: number;
  note: string;
}

export const INCUBATION_WORLD_PRESETS: IncubationWorldPreset[] = [
  { id: 'casual', label: 'Casual / Easy', hours: 0.5, note: '0.5 h' },
  { id: 'normal', label: 'Normal', hours: 1, note: '1 h (Palworld 1.0+)' },
  { id: 'hard', label: 'Hard', hours: 2, note: '2 h (Palworld 1.0+)' },
  { id: 'hardcore', label: 'Hardcore', hours: 2, note: '2 h' },
  { id: 'dedicated', label: 'Dedicated server default', hours: 72, note: '72 h classic' }
];

export function getEggSizeFromRarity(rarity: number): EggSize {
  const clamped = Math.min(20, Math.max(1, Math.round(rarity)));
  if (clamped <= 4) return 'regular';
  if (clamped <= 7) return 'large';
  return 'huge';
}

export interface FormattedHatchDuration {
  primary: string;
  daysText: string | null;
  isInstant: boolean;
}

export function formatEggHatchDuration(totalSeconds: number): FormattedHatchDuration {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return {
      primary: '0s',
      daysText: null,
      isInstant: true
    };
  }

  const roundedSeconds = Math.round(totalSeconds);
  if (roundedSeconds === 0) {
    return {
      primary: `${totalSeconds.toFixed(2)}s`,
      daysText: null,
      isInstant: false
    };
  }

  const totalHours = Math.floor(roundedSeconds / 3600);
  const remAfterHours = roundedSeconds % 3600;
  const minutes = Math.floor(remAfterHours / 60);
  const seconds = remAfterHours % 60;

  let primary: string;
  if (totalHours >= 1) {
    primary = seconds > 0 ? `${totalHours}h ${minutes}m ${seconds}s` : `${totalHours}h ${minutes}m`;
  } else if (minutes >= 1) {
    primary = `${minutes}m ${seconds}s`;
  } else {
    primary = `${seconds}s`;
  }

  let daysText: string | null = null;
  if (roundedSeconds >= 86400) {
    const days = Math.floor(roundedSeconds / 86400);
    const remHours = Math.floor((roundedSeconds % 86400) / 3600);
    const remMins = Math.floor((roundedSeconds % 3600) / 60);
    daysText = remMins > 0 ? `${days}d ${remHours}h ${remMins}m` : `${days}d ${remHours}h`;
  }

  return {
    primary,
    daysText,
    isInstant: false
  };
}

export interface EggIncubationResult {
  size: EggSize;
  sizeMeta: EggSizeMeta;
  settingHours: number;
  speedBonusPercent: number;
  rawSeconds: number;
  roundedSeconds: number;
  formatted: FormattedHatchDuration;
}

export function calculateEggIncubationTime(
  size: EggSize,
  settingHours: number,
  speedBonusPercent: number = 0
): EggIncubationResult {
  const sizeMeta = EGG_SIZE_CONFIG[size];
  const safeHours = Number.isFinite(settingHours) && settingHours > 0 ? settingHours : 0;
  const safeSpeed = Number.isFinite(speedBonusPercent) && speedBonusPercent > 0 ? speedBonusPercent : 0;
  const rawSeconds = (safeHours * 3600) / sizeMeta.divisor / (1 + safeSpeed / 100);
  const roundedSeconds = Math.round(rawSeconds);

  return {
    size,
    sizeMeta,
    settingHours: safeHours,
    speedBonusPercent: safeSpeed,
    rawSeconds,
    roundedSeconds,
    formatted: formatEggHatchDuration(rawSeconds)
  };
}


