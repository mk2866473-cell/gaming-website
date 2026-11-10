/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Separated Minecraft game constants, formulas and data for easy updates across game versions (1.20 - 1.21+)

export interface FuelItem {
  id: string;
  name: string;
  itemsSmelted: number;
  burnTimeTicks: number; // 20 ticks = 1 sec; 200 ticks = 1 item in furnace
  iconColor: string;
  category: 'efficient' | 'standard' | 'renewable' | 'early-game';
}

export const MINECRAFT_FUELS: FuelItem[] = [
  { id: 'lava-bucket', name: 'Lava Bucket', itemsSmelted: 100, burnTimeTicks: 20000, iconColor: 'text-orange-500', category: 'efficient' },
  { id: 'coal-block', name: 'Block of Coal', itemsSmelted: 80, burnTimeTicks: 16000, iconColor: 'text-zinc-400', category: 'efficient' },
  { id: 'dried-kelp-block', name: 'Dried Kelp Block', itemsSmelted: 20, burnTimeTicks: 4000, iconColor: 'text-emerald-500', category: 'renewable' },
  { id: 'blaze-rod', name: 'Blaze Rod', itemsSmelted: 12, burnTimeTicks: 2400, iconColor: 'text-amber-500', category: 'efficient' },
  { id: 'coal', name: 'Coal', itemsSmelted: 8, burnTimeTicks: 1600, iconColor: 'text-zinc-300', category: 'standard' },
  { id: 'charcoal', name: 'Charcoal', itemsSmelted: 8, burnTimeTicks: 1600, iconColor: 'text-zinc-400', category: 'standard' },
  { id: 'boat', name: 'Wooden Boat', itemsSmelted: 6, burnTimeTicks: 1200, iconColor: 'text-amber-600', category: 'renewable' },
  { id: 'wood-log', name: 'Wood Log / Stem', itemsSmelted: 1.5, burnTimeTicks: 300, iconColor: 'text-amber-700', category: 'standard' },
  { id: 'planks', name: 'Wooden Planks', itemsSmelted: 1.5, burnTimeTicks: 300, iconColor: 'text-amber-600', category: 'standard' },
  { id: 'wooden-slab', name: 'Wooden Slab', itemsSmelted: 0.75, burnTimeTicks: 150, iconColor: 'text-amber-600', category: 'early-game' },
  { id: 'scaffolding', name: 'Scaffolding', itemsSmelted: 2, burnTimeTicks: 400, iconColor: 'text-yellow-600', category: 'renewable' },
  { id: 'bamboo-block', name: 'Block of Bamboo', itemsSmelted: 1.5, burnTimeTicks: 300, iconColor: 'text-lime-500', category: 'renewable' },
  { id: 'stick', name: 'Stick', itemsSmelted: 0.5, burnTimeTicks: 100, iconColor: 'text-stone-400', category: 'early-game' },
  { id: 'bamboo', name: 'Single Bamboo', itemsSmelted: 0.25, burnTimeTicks: 50, iconColor: 'text-lime-600', category: 'renewable' }
];

export interface TravelMode {
  id: string;
  name: string;
  speedBlocksPerSec: number;
  icon: string;
  notes: string;
}

export const MINECRAFT_TRAVEL_MODES: TravelMode[] = [
  { id: 'walking', name: 'Walking (Normal)', speedBlocksPerSec: 4.317, icon: 'Footprints', notes: 'Default ground movement speed' },
  { id: 'sprinting', name: 'Sprinting', speedBlocksPerSec: 5.612, icon: 'Footprints', notes: 'Consumes hunger over time' },
  { id: 'sprint-jumping', name: 'Sprint-Jumping (Flat)', speedBlocksPerSec: 7.127, icon: 'Footprints', notes: 'Fastest unassisted running' },
  { id: 'sprint-jump-ceiling', name: 'Sprint-Jumping (2-Block Ceiling)', speedBlocksPerSec: 9.87, icon: 'Footprints', notes: 'Optimal Nether tunnel travel' },
  { id: 'horse-fast', name: 'High-Tier Horse', speedBlocksPerSec: 14.23, icon: 'Navigation', notes: 'Max breedable horse speed' },
  { id: 'soul-speed-3', name: 'Soul Speed III + Soul Sand', speedBlocksPerSec: 10.5, icon: 'Flame', notes: 'Fast walking speed on Soul Sand/Soil' },
  { id: 'boat-water', name: 'Boat (Water)', speedBlocksPerSec: 8.0, icon: 'Compass', notes: 'Standard waterway travel' },
  { id: 'boat-ice', name: 'Boat on Normal Ice', speedBlocksPerSec: 40.0, icon: 'Compass', notes: 'High speed highway' },
  { id: 'boat-blue-ice', name: 'Boat on Blue Ice', speedBlocksPerSec: 72.73, icon: 'Compass', notes: 'Fastest mechanical transport in Minecraft' },
  { id: 'elytra-glide', name: 'Elytra (Standard 45° Glide)', speedBlocksPerSec: 25.0, icon: 'Wind', notes: 'Gentle downward glide' },
  { id: 'elytra-rockets', name: 'Elytra + Firework Boost', speedBlocksPerSec: 33.5, icon: 'Wind', notes: 'Sustained horizontal rocket flight' },
  { id: 'dolphin-grace-depth', name: 'Dolphin Grace + Depth Strider III', speedBlocksPerSec: 33.0, icon: 'Wind', notes: 'Underwater highway' }
];

export interface StackPresetItem {
  name: string;
  maxStack: 64 | 16 | 1;
  category: 'blocks' | 'minerals' | 'food' | 'combat' | 'tools' | 'redstone';
}

export const COMMON_STACK_ITEMS: StackPresetItem[] = [
  { name: 'Cobblestone / Stone', maxStack: 64, category: 'blocks' },
  { name: 'Deepslate / Obsidian', maxStack: 64, category: 'blocks' },
  { name: 'Diamond / Iron / Gold Ingot', maxStack: 64, category: 'minerals' },
  { name: 'Netherite Ingot / Scrap', maxStack: 64, category: 'minerals' },
  { name: 'Redstone Dust / Lapis', maxStack: 64, category: 'minerals' },
  { name: 'Ender Pearl', maxStack: 16, category: 'combat' },
  { name: 'Egg / Snowball', maxStack: 16, category: 'food' },
  { name: 'Honey Bottle', maxStack: 16, category: 'food' },
  { name: 'Sign / Hanging Sign', maxStack: 16, category: 'blocks' },
  { name: 'Bucket (Empty)', maxStack: 16, category: 'tools' },
  { name: 'Water / Lava Bucket', maxStack: 1, category: 'tools' },
  { name: 'Potion / Splash Potion', maxStack: 1, category: 'combat' },
  { name: 'Sword / Pickaxe / Tool', maxStack: 1, category: 'tools' },
  { name: 'Armor Piece / Elytra', maxStack: 1, category: 'combat' },
  { name: 'Shulker Box', maxStack: 1, category: 'blocks' },
  { name: 'Totem of Undying', maxStack: 1, category: 'combat' }
];

export interface BeaconTierInfo {
  tier: number;
  blocksPerLayer: number;
  totalBlocks: number;
  totalIngots: number;
  dimensions: string;
  rangeBlocks: number;
  durationSeconds: number;
}

export const BEACON_TIERS: BeaconTierInfo[] = [
  { tier: 1, blocksPerLayer: 9, totalBlocks: 9, totalIngots: 81, dimensions: '3×3 (1 Layer)', rangeBlocks: 20, durationSeconds: 11 },
  { tier: 2, blocksPerLayer: 25, totalBlocks: 34, totalIngots: 306, dimensions: '5×5 + 3×3 (2 Layers)', rangeBlocks: 30, durationSeconds: 13 },
  { tier: 3, blocksPerLayer: 49, totalBlocks: 83, totalIngots: 747, dimensions: '7×7 + 5×5 + 3×3 (3 Layers)', rangeBlocks: 40, durationSeconds: 15 },
  { tier: 4, blocksPerLayer: 81, totalBlocks: 164, totalIngots: 1476, dimensions: '9×9 + 7×7 + 5×5 + 3×3 (4 Layers)', rangeBlocks: 50, durationSeconds: 17 }
];

export interface WeaponDamageBase {
  name: string;
  attackDamage: number;
  attackSpeed: number; // Java attack speed (Hz)
}

export const WEAPON_DAMAGE_TABLE: Record<string, Record<string, WeaponDamageBase>> = {
  sword: {
    wooden: { name: 'Wooden Sword', attackDamage: 4, attackSpeed: 1.6 },
    golden: { name: 'Golden Sword', attackDamage: 4, attackSpeed: 1.6 },
    stone: { name: 'Stone Sword', attackDamage: 5, attackSpeed: 1.6 },
    iron: { name: 'Iron Sword', attackDamage: 6, attackSpeed: 1.6 },
    diamond: { name: 'Diamond Sword', attackDamage: 7, attackSpeed: 1.6 },
    netherite: { name: 'Netherite Sword', attackDamage: 8, attackSpeed: 1.6 },
    mace: { name: 'Mace (1.21 Base)', attackDamage: 6, attackSpeed: 0.6 }
  },
  axe: {
    wooden: { name: 'Wooden Axe', attackDamage: 7, attackSpeed: 0.8 },
    golden: { name: 'Golden Axe', attackDamage: 7, attackSpeed: 1.0 },
    stone: { name: 'Stone Axe', attackDamage: 9, attackSpeed: 0.8 },
    iron: { name: 'Iron Axe', attackDamage: 9, attackSpeed: 0.9 },
    diamond: { name: 'Diamond Axe', attackDamage: 9, attackSpeed: 1.0 },
    netherite: { name: 'Netherite Axe', attackDamage: 10, attackSpeed: 1.0 }
  },
  trident: {
    melee: { name: 'Trident (Melee)', attackDamage: 9, attackSpeed: 1.1 },
    thrown: { name: 'Trident (Thrown)', attackDamage: 8, attackSpeed: 1.1 }
  },
  bow: {
    un本当: { name: 'Bow (Full Charge Unenchanted)', attackDamage: 9, attackSpeed: 1.0 },
    crit: { name: 'Bow (Full Charge Critical)', attackDamage: 10, attackSpeed: 1.0 }
  },
  crossbow: {
    arrow: { name: 'Crossbow (Arrow)', attackDamage: 9, attackSpeed: 1.0 },
    firework: { name: 'Crossbow (7-Star Firework Rocket)', attackDamage: 18, attackSpeed: 1.0 }
  }
};
