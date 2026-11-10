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
