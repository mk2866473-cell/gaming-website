/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CropPreset {
  id: string;
  name: string;
  baseValue: number; // Sheckles
  baseWeight: number; // kg
}

export interface Variant {
  id: string;
  name: string;
  multiplier: number;
}

export interface EnvironmentalMutation {
  id: string;
  name: string;
  multiplier: number;
  note?: string;
}

export interface CustomMutation {
  id: string;
  name: string;
  multiplier: number;
}

export const CROP_PRESETS: CropPreset[] = [
  { id: 'carrot', name: 'Carrot', baseValue: 20, baseWeight: 0.275 }
];

export const VARIANTS: Variant[] = [
  { id: 'none', name: 'None', multiplier: 1 },
  { id: 'silver', name: 'Silver', multiplier: 5 },
  { id: 'gold', name: 'Gold', multiplier: 20 },
  { id: 'rainbow', name: 'Rainbow', multiplier: 50 },
  { id: 'diamond', name: 'Diamond', multiplier: 50 },
  { id: 'jelly', name: 'Jelly', multiplier: 50 },
  { id: 'ember', name: 'Ember', multiplier: 60 }
];

export const ENVIRONMENTAL_MUTATIONS: EnvironmentalMutation[] = [
  { id: 'wet', name: 'Wet', multiplier: 2 },
  { id: 'chilled', name: 'Chilled', multiplier: 2 },
  { id: 'chocolate', name: 'Chocolate', multiplier: 2 },
  { id: 'moonlit', name: 'Moonlit', multiplier: 2 },
  { id: 'windstruck', name: 'Windstruck', multiplier: 2 },
  { id: 'pollinated', name: 'Pollinated', multiplier: 3 },
  { id: 'bloodlit', name: 'Bloodlit', multiplier: 4 },
  { id: 'plasma', name: 'Plasma', multiplier: 5 },
  { id: 'heavenly', name: 'Heavenly', multiplier: 5 },
  { id: 'frozen', name: 'Frozen', multiplier: 10 },
  { id: 'cooked', name: 'Cooked', multiplier: 10 },
  { id: 'zombified', name: 'Zombified', multiplier: 25 },
  { id: 'sundried', name: 'Sundried', multiplier: 85 },
  { id: 'aurora', name: 'Aurora', multiplier: 90 },
  { id: 'foxfire', name: 'Foxfire Chakra', multiplier: 90 },
  { id: 'shocked', name: 'Shocked', multiplier: 100 },
  { id: 'alienlike', name: 'Alienlike', multiplier: 100 },
  { id: 'celestial', name: 'Celestial', multiplier: 120 },
  { id: 'galactic', name: 'Galactic', multiplier: 120 },
  { id: 'disco', name: 'Disco', multiplier: 125 },
  { id: 'meteoric', name: 'Meteoric', multiplier: 125 },
  { id: 'voidtouched', name: 'Voidtouched', multiplier: 135 },
  { id: 'dawnbound', name: 'Dawnbound (Sunflower only)', multiplier: 150, note: 'Sunflower only' }
];

export function getEffectiveMutations(
  selectedMutationIds: string[],
  customMutations: CustomMutation[] = []
): { id: string; name: string; multiplier: number; isFused?: boolean }[] {
  const result: { id: string; name: string; multiplier: number; isFused?: boolean }[] = [];
  const selectedSet = new Set(selectedMutationIds);

  const hasWet = selectedSet.has('wet');
  const hasChilled = selectedSet.has('chilled');
  const isFusedFrozen = hasWet && hasChilled;

  for (const mut of ENVIRONMENTAL_MUTATIONS) {
    if (mut.id === 'wet' || mut.id === 'chilled') {
      if (!isFusedFrozen && selectedSet.has(mut.id)) {
        result.push({ id: mut.id, name: mut.name, multiplier: mut.multiplier });
      }
    } else if (mut.id === 'frozen') {
      if (selectedSet.has('frozen') || isFusedFrozen) {
        result.push({
          id: 'frozen',
          name: isFusedFrozen ? 'Frozen (Fused from Wet + Chilled)' : mut.name,
          multiplier: 10,
          isFused: isFusedFrozen
        });
      }
    } else {
      if (selectedSet.has(mut.id)) {
        result.push({ id: mut.id, name: mut.name, multiplier: mut.multiplier });
      }
    }
  }

  for (const custom of customMutations) {
    if (selectedSet.has(custom.id) && custom.multiplier > 0) {
      result.push({ id: custom.id, name: custom.name, multiplier: custom.multiplier });
    }
  }

  return result;
}

export interface CropCalculationInput {
  baseValue: number;
  baseWeight: number;
  actualWeight: number;
  variantMultiplier: number;
  variantName: string;
  selectedMutationIds: string[];
  customMutations?: CustomMutation[];
  friendBoostPercent: number;
  quantity: number;
}

export interface CropCalculationResult {
  weightRatio: number;
  weightFactor: number;
  variantMultiplier: number;
  effectiveMutations: { id: string; name: string; multiplier: number; term: number; isFused?: boolean }[];
  sumEnvTerms: number;
  envBracketMultiplier: number;
  combinedMutationMultiplier: number;
  friendBoostFactor: number;
  totalValue: number;
  formulaBreakdown: string;
}

export function calculateCropValue(input: CropCalculationInput): CropCalculationResult {
  const baseValue = Math.max(0, input.baseValue);
  const baseWeight = Math.max(0.001, input.baseWeight);
  const actualWeight = Math.max(0, input.actualWeight);
  const qty = Math.max(1, Math.floor(input.quantity || 1));

  const weightRatio = actualWeight / baseWeight;
  const weightFactor = Math.pow(Math.max(weightRatio, 0.95), 2);

  const effectiveMuts = getEffectiveMutations(input.selectedMutationIds, input.customMutations || []);
  const mutationsWithTerms = effectiveMuts.map(m => ({
    ...m,
    term: m.multiplier - 1
  }));

  const sumEnvTerms = mutationsWithTerms.reduce((acc, m) => acc + m.term, 0);
  const envBracketMultiplier = Math.max(1, 1 + sumEnvTerms);

  const combinedMutationMultiplier = input.variantMultiplier * envBracketMultiplier;
  const friendBoostFactor = 1 + Math.max(0, input.friendBoostPercent || 0) / 100;

  const rawValue = baseValue * weightFactor * input.variantMultiplier * envBracketMultiplier * friendBoostFactor * qty;
  const totalValue = Math.round(rawValue);

  const breakdownStr = `Base ${baseValue} Sheckles × WeightFactor (${weightFactor.toFixed(4)}) × Variant (${input.variantName} ×${input.variantMultiplier}) × EnvBracket (×${envBracketMultiplier}) × FriendBoost (×${friendBoostFactor.toFixed(2)}) × Qty (${qty})`;

  return {
    weightRatio,
    weightFactor,
    variantMultiplier: input.variantMultiplier,
    effectiveMutations: mutationsWithTerms,
    sumEnvTerms,
    envBracketMultiplier,
    combinedMutationMultiplier,
    friendBoostFactor,
    totalValue,
    formulaBreakdown: breakdownStr
  };
}

/* ==========================================================================
   EGG HATCHING DATA & ODDS FUNCTIONS
   ========================================================================== */

export interface PetChance {
  name: string;
  chancePercent: number;
}

export interface EggData {
  id: string;
  name: string;
  priceSheckles: number | null;
  hatchTimeText: string;
  pets: PetChance[];
}

export const EGGS: EggData[] = [
  {
    id: 'common',
    name: 'Common Egg',
    priceSheckles: 50000,
    hatchTimeText: '10 min',
    pets: [
      { name: 'Dog', chancePercent: 33.33 },
      { name: 'Golden Lab', chancePercent: 33.33 },
      { name: 'Bunny', chancePercent: 33.33 }
    ]
  },
  {
    id: 'uncommon',
    name: 'Uncommon Egg',
    priceSheckles: 150000,
    hatchTimeText: '20 min',
    pets: [
      { name: 'Black Bunny', chancePercent: 25.0 },
      { name: 'Cat', chancePercent: 25.0 },
      { name: 'Chicken', chancePercent: 25.0 },
      { name: 'Deer', chancePercent: 25.0 }
    ]
  },
  {
    id: 'rare',
    name: 'Rare Egg',
    priceSheckles: 600000,
    hatchTimeText: '2 hours',
    pets: [
      { name: 'Orange Tabby', chancePercent: 33.33 },
      { name: 'Spotted Deer', chancePercent: 25.0 },
      { name: 'Pig', chancePercent: 16.67 },
      { name: 'Rooster', chancePercent: 16.67 },
      { name: 'Monkey', chancePercent: 8.33 }
    ]
  },
  {
    id: 'legendary',
    name: 'Legendary Egg',
    priceSheckles: 3000000,
    hatchTimeText: '4 hours',
    pets: [
      { name: 'Cow', chancePercent: 42.55 },
      { name: 'Silver Monkey', chancePercent: 42.55 },
      { name: 'Sea Otter', chancePercent: 10.64 },
      { name: 'Polar Bear', chancePercent: 2.13 },
      { name: 'Turtle', chancePercent: 2.13 }
    ]
  },
  {
    id: 'mythical',
    name: 'Mythical Egg',
    priceSheckles: 8000000,
    hatchTimeText: '5 h 6 m 40 s',
    pets: [
      { name: 'Grey Mouse', chancePercent: 36.0 },
      { name: 'Brown Mouse', chancePercent: 27.0 },
      { name: 'Squirrel', chancePercent: 27.0 },
      { name: 'Red Giant Ant', chancePercent: 8.5 },
      { name: 'Red Fox', chancePercent: 1.5 }
    ]
  },
  {
    id: 'bug',
    name: 'Bug Egg',
    priceSheckles: 50000000,
    hatchTimeText: '8 hours',
    pets: [
      { name: 'Caterpillar', chancePercent: 40.0 },
      { name: 'Snail', chancePercent: 30.0 },
      { name: 'Giant Ant', chancePercent: 25.0 },
      { name: 'Praying Mantis', chancePercent: 4.0 },
      { name: 'Dragonfly', chancePercent: 1.0 }
    ]
  },
  {
    id: 'jungle',
    name: 'Jungle Egg',
    priceSheckles: null,
    hatchTimeText: '8 hours',
    pets: [
      { name: 'Tree Frog', chancePercent: 40.0 },
      { name: 'Hummingbird', chancePercent: 30.0 },
      { name: 'Iguana', chancePercent: 24.0 },
      { name: 'Chimpanzee', chancePercent: 5.0 },
      { name: 'Tiger', chancePercent: 1.0 }
    ]
  }
];

export function calculateEggsForProbability(chancePercent: number, targetProbability: number): number {
  if (chancePercent <= 0 || targetProbability <= 0 || targetProbability >= 1) return 0;
  const p = chancePercent / 100;
  return Math.ceil(Math.log(1 - targetProbability) / Math.log(1 - p));
}

export function calculateExpectedEggs(chancePercent: number): number {
  if (chancePercent <= 0) return 0;
  const p = chancePercent / 100;
  return Math.round(1 / p);
}

