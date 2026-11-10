/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CraftingIngredient {
  itemId: string;
  name: string;
  quantityPerBundle: number;
  icon?: string;
  locationTip: string;
}

export interface BuildingBlockRecipe {
  id: string;
  name: string;
  category: 'wood' | 'stone' | 'shroud' | 'roof' | 'specialty';
  bundleYield: number; // Block output per craft action (usually 100)
  npc: 'Carpenter' | 'Blacksmith' | 'Alchemist' | 'Farmer' | 'Hunter' | 'Workbench';
  station: 'Workbench' | 'Kiln' | 'Smelter' | 'Sawmill' | 'Laboratory' | 'Handcrafted';
  flameLevel: number; // Required Flame Altar level (1 to 6)
  region: 'Springlands' | 'Revelwood' | 'Nomad Highlands' | 'Kindlewastes';
  ingredients: CraftingIngredient[];
  description: string;
}

export const ENSHROUDED_BLOCK_RECIPES: Record<string, BuildingBlockRecipe> = {
  // Wood Blocks
  rough_wood_block: {
    id: 'rough_wood_block',
    name: 'Rough Wood Block',
    category: 'wood',
    bundleYield: 100,
    npc: 'Carpenter',
    station: 'Workbench',
    flameLevel: 1,
    region: 'Springlands',
    description: 'Basic wooden building block crafted from standard tree logs.',
    ingredients: [
      { itemId: 'wood_log', name: 'Wood Log', quantityPerBundle: 10, locationTip: 'Chop trees anywhere in Springlands' }
    ]
  },
  shroud_wood_block: {
    id: 'shroud_wood_block',
    name: 'Shroud Wood Block',
    category: 'shroud',
    bundleYield: 100,
    npc: 'Carpenter',
    station: 'Workbench',
    flameLevel: 1,
    region: 'Springlands',
    description: 'Dark infused wooden block harvested from trees inside Shroud zones.',
    ingredients: [
      { itemId: 'shroud_wood', name: 'Shroud Wood', quantityPerBundle: 10, locationTip: 'Chop glowing trees inside foggy Shroud zones' },
      { itemId: 'shroud_liquid', name: 'Shroud Liquid', quantityPerBundle: 1, locationTip: 'Harvest glowing fungal spores in Shroud valleys' }
    ]
  },
  refined_wood_block: {
    id: 'refined_wood_block',
    name: 'Refined Wood Block',
    category: 'wood',
    bundleYield: 100,
    npc: 'Carpenter',
    station: 'Sawmill',
    flameLevel: 2,
    region: 'Revelwood',
    description: 'Polished sturdy timber block reinforced with natural resin.',
    ingredients: [
      { itemId: 'wood_log', name: 'Wood Log', quantityPerBundle: 10, locationTip: 'Chop trees in Springlands or Revelwood' },
      { itemId: 'resin', name: 'Resin', quantityPerBundle: 1, locationTip: 'Chop amber-leaved birch trees' }
    ]
  },

  // Stone Blocks
  rough_stone_block: {
    id: 'rough_stone_block',
    name: 'Rough Stone Block',
    category: 'stone',
    bundleYield: 100,
    npc: 'Workbench',
    station: 'Handcrafted',
    flameLevel: 1,
    region: 'Springlands',
    description: 'Coarse stone masonry block suitable for starter base walls.',
    ingredients: [
      { itemId: 'stone', name: 'Stone', quantityPerBundle: 10, locationTip: 'Mine rocks with a Pickaxe anywhere' }
    ]
  },
  flint_block: {
    id: 'flint_block',
    name: 'Flint Block',
    category: 'stone',
    bundleYield: 100,
    npc: 'Blacksmith',
    station: 'Workbench',
    flameLevel: 1,
    region: 'Springlands',
    description: 'Sharp dark stone block with distinctive flint streaks.',
    ingredients: [
      { itemId: 'flintstone', name: 'Flintstone', quantityPerBundle: 10, locationTip: 'Mine dark orange-black flint outcrops' },
      { itemId: 'stone', name: 'Stone', quantityPerBundle: 10, locationTip: 'Mine standard rock deposits' }
    ]
  },
  refined_stone_block: {
    id: 'refined_stone_block',
    name: 'Refined Stone Block',
    category: 'stone',
    bundleYield: 100,
    npc: 'Carpenter',
    station: 'Workbench',
    flameLevel: 2,
    region: 'Revelwood',
    description: 'Clean dressed stone reinforced with reclaimed metal scraps.',
    ingredients: [
      { itemId: 'stone', name: 'Stone', quantityPerBundle: 10, locationTip: 'Mine standard stone' },
      { itemId: 'metal_scraps', name: 'Metal Scraps', quantityPerBundle: 1, locationTip: 'Loot Scavenger camps and pots' }
    ]
  },
  highly_refined_stone: {
    id: 'highly_refined_stone',
    name: 'Highly Refined Stone Block',
    category: 'stone',
    bundleYield: 100,
    npc: 'Blacksmith',
    station: 'Smelter',
    flameLevel: 3,
    region: 'Nomad Highlands',
    description: 'Elite castle stone reinforced with smelted metal bars.',
    ingredients: [
      { itemId: 'stone', name: 'Stone', quantityPerBundle: 10, locationTip: 'Mine rock outcrops' },
      { itemId: 'metal_bars', name: 'Metal Bars', quantityPerBundle: 2, locationTip: 'Smelt Metal Scraps in Blacksmith Smelter' }
    ]
  },
  limestone_block: {
    id: 'limestone_block',
    name: 'Limestone Block',
    category: 'stone',
    bundleYield: 100,
    npc: 'Carpenter',
    station: 'Workbench',
    flameLevel: 3,
    region: 'Nomad Highlands',
    description: 'Bright pale desert stone ideal for grand temples and pillars.',
    ingredients: [
      { itemId: 'limestone', name: 'Limestone', quantityPerBundle: 10, locationTip: 'Mine white cliffs in Nomad Highlands' }
    ]
  },
  sandstone_block: {
    id: 'sandstone_block',
    name: 'Sandstone Block',
    category: 'stone',
    bundleYield: 100,
    npc: 'Carpenter',
    station: 'Workbench',
    flameLevel: 4,
    region: 'Kindlewastes',
    description: 'Warm arid sandstone for desert fortresses.',
    ingredients: [
      { itemId: 'sandstone', name: 'Sandstone', quantityPerBundle: 10, locationTip: 'Mine golden desert rock formations' },
      { itemId: 'sand', name: 'Sand', quantityPerBundle: 5, locationTip: 'Dig dunes with Shovel in Kindlewastes' }
    ]
  },

  // Roof Blocks
  straw_roof_block: {
    id: 'straw_roof_block',
    name: 'Straw Roof Block',
    category: 'roof',
    bundleYield: 100,
    npc: 'Farmer',
    station: 'Workbench',
    flameLevel: 2,
    region: 'Revelwood',
    description: 'Rustic thatched roofing woven from agricultural wheat straw.',
    ingredients: [
      { itemId: 'plant_fiber', name: 'Plant Fiber', quantityPerBundle: 10, locationTip: 'Harvest bushes and flora' },
      { itemId: 'wheat_straw', name: 'Wheat Straw', quantityPerBundle: 5, locationTip: 'Farm Wheat seeds in Farmer Seedbed' }
    ]
  },
  tar_roof_block: {
    id: 'tar_roof_block',
    name: 'Tar Roof Block',
    category: 'roof',
    bundleYield: 100,
    npc: 'Blacksmith',
    station: 'Kiln',
    flameLevel: 1,
    region: 'Springlands',
    description: 'Waterproof dark shingle roofing sealed with thick tar.',
    ingredients: [
      { itemId: 'wood_log', name: 'Wood Log', quantityPerBundle: 10, locationTip: 'Chop trees' },
      { itemId: 'tar', name: 'Tar', quantityPerBundle: 2, locationTip: 'Byproduct from Charcoal Kiln or Wood Smelting' }
    ]
  },
  copper_roof_block: {
    id: 'copper_roof_block',
    name: 'Copper Roof Block',
    category: 'roof',
    bundleYield: 100,
    npc: 'Blacksmith',
    station: 'Smelter',
    flameLevel: 2,
    region: 'Revelwood',
    description: 'Ornate metallic copper roofing with brilliant patina sheen.',
    ingredients: [
      { itemId: 'wood_log', name: 'Wood Log', quantityPerBundle: 10, locationTip: 'Chop trees' },
      { itemId: 'copper_bar', name: 'Copper Bar', quantityPerBundle: 2, locationTip: 'Smelt Copper Ore in Charcoal Smelter' }
    ]
  }
};

export interface MaterialRequirementSummary {
  blockType: BuildingBlockRecipe;
  targetBlocks: number;
  bundlesNeeded: number;
  rawMaterials: Array<{ name: string; quantity: number; locationTip: string }>;
  npc: string;
  station: string;
  flameLevel: number;
  region: string;
}

export function calculateSingleBlockRequirements(
  blockId: string,
  targetBlocks: number
): MaterialRequirementSummary | null {
  const block = ENSHROUDED_BLOCK_RECIPES[blockId];
  if (!block) return null;

  const bundlesNeeded = Math.ceil(targetBlocks / block.bundleYield);
  const rawMaterials = block.ingredients.map(ing => ({
    name: ing.name,
    quantity: ing.quantityPerBundle * bundlesNeeded,
    locationTip: ing.locationTip
  }));

  return {
    blockType: block,
    targetBlocks,
    bundlesNeeded,
    rawMaterials,
    npc: block.npc,
    station: block.station,
    flameLevel: block.flameLevel,
    region: block.region
  };
}

export const ENSHROUDED_FAQS = [
  {
    question: 'How do building block yields work in Enshrouded?',
    answer: 'Building block recipes in Enshrouded produce blocks in bundles (typically 100 blocks per single crafting action). Crafting 500 blocks requires 5 crafting recipe actions.'
  },
  {
    question: 'Which Craftsman NPC unlocks building blocks in Enshrouded?',
    answer: 'Cade Hawthorn the Carpenter is the primary NPC for unlocking wooden, refined stone, and decorative blocks. The Blacksmith unlocks metal, copper roofs, and Highly Refined Stone.'
  },
  {
    question: 'How do I get Shroud Wood and Shroud Liquid?',
    answer: 'Enter foggy Shroud zones across Springlands and Revelwood. Chop glowing blue Shroud trees for Shroud Wood, and harvest glowing fungal bulbs for Shroud Liquid.'
  }
];
