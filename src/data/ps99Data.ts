/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PS99Category = 'titanic' | 'huge' | 'exclusive' | 'enchant' | 'item' | 'hoverboard';
export type PS99Trend = 'rising' | 'stable' | 'dropping' | 'manipulated';
export type PS99Variant = 'regular' | 'golden' | 'rainbow' | 'shiny' | 'shiny_rainbow';

export interface PS99Item {
  id: string;
  name: string;
  category: PS99Category;
  value: number; // In Diamonds/Gems (baseline regular)
  rap: number;   // Recent Average Price (baseline regular)
  demand: number; // 1 to 10 scale (10 = instantly sells, 1 = hard to sell)
  trend: PS99Trend;
  rarity: 'Titanic' | 'Huge' | 'Exclusive' | 'Mythical' | 'Legendary' | 'Rare';
  icon: string; // Emoji or character representation
  bgGradient: string;
  borderColor: string;
  glowColor: string;
  canHaveVariants: boolean;
  notes?: string;
}

export interface TradeOfferItem {
  uid: string;
  itemId: string;
  variant: PS99Variant;
  quantity: number;
}

export const VARIANT_MULTIPLIERS: Record<PS99Variant, { label: string; mult: number; badgeColor: string }> = {
  regular: { label: 'Regular', mult: 1.0, badgeColor: 'bg-zinc-800 text-zinc-300' },
  golden: { label: 'Golden', mult: 1.25, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  rainbow: { label: 'Rainbow', mult: 1.75, badgeColor: 'bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-blue-500/20 text-cyan-200 border-cyan-400/40' },
  shiny: { label: 'Shiny', mult: 1.6, badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40' },
  shiny_rainbow: { label: 'Shiny Rainbow', mult: 2.8, badgeColor: 'bg-gradient-to-r from-fuchsia-500/30 via-cyan-500/30 to-amber-500/30 text-amber-200 border-amber-300/50' }
};

// Verified PS99 Trading Values & RAP Data (2026 Active Market)
export const PS99_ITEMS_DATABASE: PS99Item[] = [
  // TITANICS
  {
    id: 'titanic-dominus-astra',
    name: 'Titanic Dominus Astra',
    category: 'titanic',
    value: 12500000000, // 12.5B
    rap: 12200000000,
    demand: 10,
    trend: 'rising',
    rarity: 'Titanic',
    icon: '👑',
    bgGradient: 'from-amber-600/30 via-purple-700/30 to-zinc-900',
    borderColor: 'border-amber-400',
    glowColor: 'shadow-amber-500/30',
    canHaveVariants: true,
    notes: 'God-tier flex pet with maximum trade liquidity.'
  },
  {
    id: 'titanic-hubert',
    name: 'Titanic Hubert',
    category: 'titanic',
    value: 9800000000, // 9.8B
    rap: 9500000000,
    demand: 9.5,
    trend: 'stable',
    rarity: 'Titanic',
    icon: '🦆',
    bgGradient: 'from-yellow-600/30 via-amber-700/30 to-zinc-900',
    borderColor: 'border-yellow-400',
    glowColor: 'shadow-yellow-500/30',
    canHaveVariants: true,
    notes: 'Highly sought after meme mascot Titanic.'
  },
  {
    id: 'titanic-red-balloon-cat',
    name: 'Titanic Red Balloon Cat',
    category: 'titanic',
    value: 8200000000, // 8.2B
    rap: 8100000000,
    demand: 9,
    trend: 'stable',
    rarity: 'Titanic',
    icon: '🎈',
    bgGradient: 'from-red-600/30 via-rose-700/30 to-zinc-900',
    borderColor: 'border-rose-400',
    glowColor: 'shadow-rose-500/30',
    canHaveVariants: true
  },
  {
    id: 'titanic-silver-dragon',
    name: 'Titanic Silver Dragon',
    category: 'titanic',
    value: 7500000000, // 7.5B
    rap: 7350000000,
    demand: 9,
    trend: 'rising',
    rarity: 'Titanic',
    icon: '🐉',
    bgGradient: 'from-slate-400/30 via-cyan-600/30 to-zinc-900',
    borderColor: 'border-cyan-300',
    glowColor: 'shadow-cyan-400/30',
    canHaveVariants: true
  },
  {
    id: 'titanic-holographic-cat',
    name: 'Titanic Holographic Cat',
    category: 'titanic',
    value: 6900000000, // 6.9B
    rap: 6750000000,
    demand: 8.5,
    trend: 'stable',
    rarity: 'Titanic',
    icon: '✨',
    bgGradient: 'from-cyan-500/30 via-fuchsia-600/30 to-zinc-900',
    borderColor: 'border-fuchsia-400',
    glowColor: 'shadow-fuchsia-500/30',
    canHaveVariants: true
  },
  {
    id: 'titanic-banana',
    name: 'Titanic Banana',
    category: 'titanic',
    value: 8900000000, // 8.9B
    rap: 8700000000,
    demand: 9.8,
    trend: 'rising',
    rarity: 'Titanic',
    icon: '🍌',
    bgGradient: 'from-yellow-400/30 via-amber-600/30 to-zinc-900',
    borderColor: 'border-yellow-300',
    glowColor: 'shadow-yellow-400/30',
    canHaveVariants: true,
    notes: 'Extreme collector item with sky-high demand.'
  },
  {
    id: 'titanic-jelly-cat',
    name: 'Titanic Jelly Cat',
    category: 'titanic',
    value: 6200000000, // 6.2B
    rap: 6100000000,
    demand: 8,
    trend: 'dropping',
    rarity: 'Titanic',
    icon: '🍮',
    bgGradient: 'from-pink-500/30 via-rose-600/30 to-zinc-900',
    borderColor: 'border-pink-400',
    glowColor: 'shadow-pink-500/30',
    canHaveVariants: true
  },
  {
    id: 'titanic-nightmare-cat',
    name: 'Titanic Nightmare Cat',
    category: 'titanic',
    value: 7800000000, // 7.8B
    rap: 7600000000,
    demand: 9,
    trend: 'rising',
    rarity: 'Titanic',
    icon: '🌑',
    bgGradient: 'from-purple-900/40 via-indigo-950 to-zinc-900',
    borderColor: 'border-purple-500',
    glowColor: 'shadow-purple-500/40',
    canHaveVariants: true
  },

  // HUGES
  {
    id: 'huge-cat',
    name: 'Huge Cat',
    category: 'huge',
    value: 1450000000, // 1.45B
    rap: 1400000000,
    demand: 10,
    trend: 'rising',
    rarity: 'Huge',
    icon: '🐱',
    bgGradient: 'from-sky-500/30 via-indigo-600/20 to-zinc-900',
    borderColor: 'border-sky-400',
    glowColor: 'shadow-sky-500/30',
    canHaveVariants: true,
    notes: 'Original plush code pet. Iconic and permanently in demand.'
  },
  {
    id: 'huge-happy-rock',
    name: 'Huge Happy Rock',
    category: 'huge',
    value: 68000000, // 68M
    rap: 66000000,
    demand: 7.5,
    trend: 'stable',
    rarity: 'Huge',
    icon: '🪨',
    bgGradient: 'from-zinc-500/30 to-zinc-900',
    borderColor: 'border-zinc-400',
    glowColor: 'shadow-zinc-500/20',
    canHaveVariants: true,
    notes: 'The community currency baseline Huge.'
  },
  {
    id: 'huge-hell-rock',
    name: 'Huge Hell Rock',
    category: 'huge',
    value: 72000000, // 72M
    rap: 70000000,
    demand: 8,
    trend: 'stable',
    rarity: 'Huge',
    icon: '🌋',
    bgGradient: 'from-red-600/30 via-orange-600/20 to-zinc-900',
    borderColor: 'border-orange-500',
    glowColor: 'shadow-orange-500/30',
    canHaveVariants: true
  },
  {
    id: 'huge-poseidon-corgi',
    name: 'Huge Poseidon Corgi',
    category: 'huge',
    value: 140000000, // 140M
    rap: 135000000,
    demand: 8.5,
    trend: 'rising',
    rarity: 'Huge',
    icon: '🔱',
    bgGradient: 'from-cyan-600/30 via-blue-700/20 to-zinc-900',
    borderColor: 'border-cyan-400',
    glowColor: 'shadow-cyan-500/30',
    canHaveVariants: true
  },
  {
    id: 'huge-cupcake',
    name: 'Huge Cupcake',
    category: 'huge',
    value: 85000000, // 85M
    rap: 83000000,
    demand: 8,
    trend: 'stable',
    rarity: 'Huge',
    icon: '🧁',
    bgGradient: 'from-pink-500/30 via-purple-600/20 to-zinc-900',
    borderColor: 'border-pink-400',
    glowColor: 'shadow-pink-500/20',
    canHaveVariants: true
  },
  {
    id: 'huge-peacock',
    name: 'Huge Peacock',
    category: 'huge',
    value: 190000000, // 190M
    rap: 185000000,
    demand: 9,
    trend: 'rising',
    rarity: 'Huge',
    icon: '🦚',
    bgGradient: 'from-emerald-600/30 via-teal-600/20 to-zinc-900',
    borderColor: 'border-emerald-400',
    glowColor: 'shadow-emerald-500/30',
    canHaveVariants: true
  },
  {
    id: 'huge-balloon-dragon',
    name: 'Huge Balloon Dragon',
    category: 'huge',
    value: 320000000, // 320M
    rap: 310000000,
    demand: 9.2,
    trend: 'rising',
    rarity: 'Huge',
    icon: '🎈',
    bgGradient: 'from-yellow-500/30 via-red-600/20 to-zinc-900',
    borderColor: 'border-amber-400',
    glowColor: 'shadow-amber-500/30',
    canHaveVariants: true
  },
  {
    id: 'huge-pixel-cat',
    name: 'Huge Pixel Cat',
    category: 'huge',
    value: 110000000, // 110M
    rap: 108000000,
    demand: 8.5,
    trend: 'stable',
    rarity: 'Huge',
    icon: '👾',
    bgGradient: 'from-violet-600/30 via-indigo-700/20 to-zinc-900',
    borderColor: 'border-violet-400',
    glowColor: 'shadow-violet-500/30',
    canHaveVariants: true
  },
  {
    id: 'huge-storm-agony',
    name: 'Huge Storm Agony',
    category: 'huge',
    value: 450000000, // 450M
    rap: 430000000,
    demand: 9.5,
    trend: 'rising',
    rarity: 'Huge',
    icon: '⚡',
    bgGradient: 'from-blue-600/30 via-amber-500/20 to-zinc-900',
    borderColor: 'border-blue-400',
    glowColor: 'shadow-blue-500/30',
    canHaveVariants: true
  },
  {
    id: 'huge-golden-dragon',
    name: 'Huge Golden Dragon',
    category: 'huge',
    value: 175000000, // 175M
    rap: 170000000,
    demand: 8.8,
    trend: 'stable',
    rarity: 'Huge',
    icon: '🐲',
    bgGradient: 'from-amber-500/30 via-yellow-600/20 to-zinc-900',
    borderColor: 'border-yellow-400',
    glowColor: 'shadow-yellow-500/30',
    canHaveVariants: true
  },
  {
    id: 'huge-chroma-lucky-cat',
    name: 'Huge Chroma Lucky Cat',
    category: 'huge',
    value: 580000000, // 580M
    rap: 560000000,
    demand: 9.6,
    trend: 'rising',
    rarity: 'Huge',
    icon: '🌈',
    bgGradient: 'from-pink-500/30 via-cyan-500/20 to-zinc-900',
    borderColor: 'border-fuchsia-400',
    glowColor: 'shadow-fuchsia-500/40',
    canHaveVariants: true
  },
  {
    id: 'huge-grim-reaper',
    name: 'Huge Grim Reaper',
    category: 'huge',
    value: 290000000, // 290M
    rap: 280000000,
    demand: 8.9,
    trend: 'stable',
    rarity: 'Huge',
    icon: '💀',
    bgGradient: 'from-purple-950/40 via-zinc-800 to-zinc-900',
    borderColor: 'border-purple-400',
    glowColor: 'shadow-purple-500/30',
    canHaveVariants: true
  },
  {
    id: 'huge-gamer-shiba',
    name: 'Huge Gamer Shiba',
    category: 'huge',
    value: 125000000, // 125M
    rap: 120000000,
    demand: 8.2,
    trend: 'stable',
    rarity: 'Huge',
    icon: '🎮',
    bgGradient: 'from-emerald-500/30 via-cyan-600/20 to-zinc-900',
    borderColor: 'border-cyan-400',
    glowColor: 'shadow-cyan-500/30',
    canHaveVariants: true
  },
  {
    id: 'huge-scam-rock',
    name: 'Huge Ghost Fox (RAP Manipulated)',
    category: 'huge',
    value: 70000000, // True Value 70M
    rap: 195000000,  // Fake RAP 195M!
    demand: 2.5,
    trend: 'manipulated',
    rarity: 'Huge',
    icon: '🦊',
    bgGradient: 'from-rose-950/40 via-red-900/30 to-zinc-900',
    borderColor: 'border-rose-500',
    glowColor: 'shadow-rose-500/30',
    canHaveVariants: true,
    notes: 'RAP MANIPULATED! Recent kiosk fake auctions pumped RAP by 178% over true liquidity value.'
  },

  // EXCLUSIVES
  {
    id: 'pop-cat',
    name: 'Pop Cat (Exclusive 95%)',
    category: 'exclusive',
    value: 18000000, // 18M
    rap: 17500000,
    demand: 9,
    trend: 'rising',
    rarity: 'Exclusive',
    icon: '🐱',
    bgGradient: 'from-amber-500/20 to-zinc-900',
    borderColor: 'border-amber-400/60',
    glowColor: 'shadow-amber-500/20',
    canHaveVariants: true
  },
  {
    id: 'party-dog',
    name: 'Party Dog (Exclusive 90%)',
    category: 'exclusive',
    value: 8500000, // 8.5M
    rap: 8200000,
    demand: 7.5,
    trend: 'stable',
    rarity: 'Exclusive',
    icon: '🎉',
    bgGradient: 'from-purple-500/20 to-zinc-900',
    borderColor: 'border-purple-400/60',
    glowColor: 'shadow-purple-500/20',
    canHaveVariants: true
  },
  {
    id: 'safari-cat',
    name: 'Safari Cat (Exclusive 85%)',
    category: 'exclusive',
    value: 5200000, // 5.2M
    rap: 5000000,
    demand: 6.8,
    trend: 'dropping',
    rarity: 'Exclusive',
    icon: '🦁',
    bgGradient: 'from-yellow-600/20 to-zinc-900',
    borderColor: 'border-yellow-500/60',
    glowColor: 'shadow-yellow-500/20',
    canHaveVariants: true
  },
  {
    id: 'knife-cat',
    name: 'Knife Cat (Exclusive 95%)',
    category: 'exclusive',
    value: 24000000, // 24M
    rap: 23500000,
    demand: 9.3,
    trend: 'rising',
    rarity: 'Exclusive',
    icon: '🔪',
    bgGradient: 'from-red-500/20 to-zinc-900',
    borderColor: 'border-red-400/60',
    glowColor: 'shadow-red-500/20',
    canHaveVariants: true
  },
  {
    id: 'capybara',
    name: 'Capybara (Exclusive 90%)',
    category: 'exclusive',
    value: 12000000, // 12M
    rap: 11800000,
    demand: 8.8,
    trend: 'stable',
    rarity: 'Exclusive',
    icon: '🥥',
    bgGradient: 'from-amber-700/20 to-zinc-900',
    borderColor: 'border-amber-600/60',
    glowColor: 'shadow-amber-600/20',
    canHaveVariants: true
  },
  {
    id: 'sad-hamster',
    name: 'Sad Hamster (Exclusive 95%)',
    category: 'exclusive',
    value: 38000000, // 38M
    rap: 37000000,
    demand: 9.7,
    trend: 'rising',
    rarity: 'Exclusive',
    icon: '🐹',
    bgGradient: 'from-pink-500/20 to-zinc-900',
    borderColor: 'border-pink-400/60',
    glowColor: 'shadow-pink-500/20',
    canHaveVariants: true
  },

  // ENCHANTS
  {
    id: 'chest-mimic-book',
    name: 'Chest Mimic Enchant',
    category: 'enchant',
    value: 750000000, // 750M
    rap: 730000000,
    demand: 10,
    trend: 'rising',
    rarity: 'Exclusive',
    icon: '📖',
    bgGradient: 'from-indigo-600/30 to-zinc-900',
    borderColor: 'border-indigo-400',
    glowColor: 'shadow-indigo-500/30',
    canHaveVariants: false,
    notes: 'Meta farming book. Spawns high-reward mini chests continuously.'
  },
  {
    id: 'boss-chest-mimic-book',
    name: 'Boss Chest Mimic Enchant',
    category: 'enchant',
    value: 380000000, // 380M
    rap: 375000000,
    demand: 9.4,
    trend: 'stable',
    rarity: 'Exclusive',
    icon: '📚',
    bgGradient: 'from-purple-600/30 to-zinc-900',
    borderColor: 'border-purple-400',
    glowColor: 'shadow-purple-500/30',
    canHaveVariants: false
  },
  {
    id: 'super-magnet-book',
    name: 'Super Magnet Enchant',
    category: 'enchant',
    value: 290000000, // 290M
    rap: 285000000,
    demand: 9.8,
    trend: 'rising',
    rarity: 'Exclusive',
    icon: '🧲',
    bgGradient: 'from-red-600/30 via-blue-600/20 to-zinc-900',
    borderColor: 'border-rose-400',
    glowColor: 'shadow-rose-500/30',
    canHaveVariants: false,
    notes: 'Picks up all items/diamonds across the entire zone automatically.'
  },
  {
    id: 'huge-hunter-book',
    name: 'Huge Hunter Enchant',
    category: 'enchant',
    value: 45000000, // 45M
    rap: 44000000,
    demand: 7.8,
    trend: 'dropping',
    rarity: 'Exclusive',
    icon: '🎯',
    bgGradient: 'from-amber-600/30 to-zinc-900',
    borderColor: 'border-amber-400',
    glowColor: 'shadow-amber-500/30',
    canHaveVariants: false
  },
  {
    id: 'lucky-block-book',
    name: 'Lucky Block Enchant',
    category: 'enchant',
    value: 95000000, // 95M
    rap: 92000000,
    demand: 8.6,
    trend: 'stable',
    rarity: 'Exclusive',
    icon: '❓',
    bgGradient: 'from-yellow-600/30 to-zinc-900',
    borderColor: 'border-yellow-400',
    glowColor: 'shadow-yellow-500/30',
    canHaveVariants: false
  },
  {
    id: 'diamond-gift-hunter',
    name: 'Diamond Gift Hunter Enchant',
    category: 'enchant',
    value: 210000000, // 210M
    rap: 205000000,
    demand: 9.2,
    trend: 'stable',
    rarity: 'Exclusive',
    icon: '💎',
    bgGradient: 'from-cyan-600/30 to-zinc-900',
    borderColor: 'border-cyan-400',
    glowColor: 'shadow-cyan-500/30',
    canHaveVariants: false
  },

  // ITEMS & KEYS
  {
    id: 'secret-key',
    name: 'Secret Key',
    category: 'item',
    value: 120000, // 120k
    rap: 120000,
    demand: 9,
    trend: 'stable',
    rarity: 'Rare',
    icon: '🗝️',
    bgGradient: 'from-amber-600/20 to-zinc-900',
    borderColor: 'border-amber-500/40',
    glowColor: 'shadow-amber-500/10',
    canHaveVariants: false
  },
  {
    id: 'crystal-key',
    name: 'Crystal Key',
    category: 'item',
    value: 35000, // 35k
    rap: 35000,
    demand: 8.5,
    trend: 'stable',
    rarity: 'Rare',
    icon: '🔑',
    bgGradient: 'from-cyan-600/20 to-zinc-900',
    borderColor: 'border-cyan-500/40',
    glowColor: 'shadow-cyan-500/10',
    canHaveVariants: false
  },
  {
    id: 'tech-key',
    name: 'Tech Key',
    category: 'item',
    value: 70000, // 70k
    rap: 68000,
    demand: 8.5,
    trend: 'stable',
    rarity: 'Rare',
    icon: '⚙️',
    bgGradient: 'from-violet-600/20 to-zinc-900',
    borderColor: 'border-violet-500/40',
    glowColor: 'shadow-violet-500/10',
    canHaveVariants: false
  },
  {
    id: 'void-key',
    name: 'Void Key',
    category: 'item',
    value: 180000, // 180k
    rap: 175000,
    demand: 9.2,
    trend: 'rising',
    rarity: 'Rare',
    icon: '🌌',
    bgGradient: 'from-indigo-600/20 to-zinc-900',
    borderColor: 'border-indigo-500/40',
    glowColor: 'shadow-indigo-500/10',
    canHaveVariants: false
  },
  {
    id: 'ultimate-cocktail',
    name: 'Ultimate Cocktail Potion',
    category: 'item',
    value: 1800000, // 1.8M
    rap: 1750000,
    demand: 9.8,
    trend: 'rising',
    rarity: 'Legendary',
    icon: '🍸',
    bgGradient: 'from-rose-600/20 to-zinc-900',
    borderColor: 'border-rose-400/50',
    glowColor: 'shadow-rose-500/20',
    canHaveVariants: false
  },
  {
    id: 'large-gift-bag',
    name: 'Large Gift Bag',
    category: 'item',
    value: 320000, // 320k
    rap: 310000,
    demand: 8.7,
    trend: 'stable',
    rarity: 'Rare',
    icon: '🎁',
    bgGradient: 'from-red-600/20 to-zinc-900',
    borderColor: 'border-red-400/40',
    glowColor: 'shadow-red-500/10',
    canHaveVariants: false
  },

  // HOVERBOARDS & BOOTHS
  {
    id: 'rainbow-hoverboard',
    name: 'Rainbow Hoverboard',
    category: 'hoverboard',
    value: 85000000, // 85M
    rap: 82000000,
    demand: 8.8,
    trend: 'stable',
    rarity: 'Exclusive',
    icon: '🛹',
    bgGradient: 'from-fuchsia-600/30 via-cyan-600/20 to-zinc-900',
    borderColor: 'border-cyan-400',
    glowColor: 'shadow-cyan-400/20',
    canHaveVariants: false
  },
  {
    id: 'high-roller-booth',
    name: 'High Roller Booth',
    category: 'hoverboard',
    value: 350000000, // 350M
    rap: 340000000,
    demand: 9.5,
    trend: 'rising',
    rarity: 'Exclusive',
    icon: '🎪',
    bgGradient: 'from-amber-500/30 via-yellow-600/20 to-zinc-900',
    borderColor: 'border-amber-400',
    glowColor: 'shadow-amber-500/30',
    canHaveVariants: false
  },
  {
    id: 'dragon-booth',
    name: 'Dragon Booth',
    category: 'hoverboard',
    value: 120000000, // 120M
    rap: 115000000,
    demand: 8.2,
    trend: 'stable',
    rarity: 'Exclusive',
    icon: '🐉',
    bgGradient: 'from-red-600/30 to-zinc-900',
    borderColor: 'border-red-400',
    glowColor: 'shadow-red-500/20',
    canHaveVariants: false
  }
];

// Helper to format numbers like 1.25B, 85.4M, 150k
export function formatGems(num: number): string {
  if (num === 0) return '0';
  const abs = Math.abs(num);
  if (abs >= 1000000000) {
    return `${(num / 1000000000).toFixed(2).replace(/\.00$/, '')}B`;
  }
  if (abs >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (abs >= 1000) {
    return `${(num / 1000).toFixed(0)}k`;
  }
  return num.toLocaleString();
}

export function calculateTradeItem(item: PS99Item, variant: PS99Variant, quantity: number) {
  const mult = item.canHaveVariants ? VARIANT_MULTIPLIERS[variant]?.mult || 1 : 1;
  const unitValue = Math.round(item.value * mult);
  const unitRap = Math.round(item.rap * mult);
  return {
    unitValue,
    unitRap,
    totalValue: unitValue * quantity,
    totalRap: unitRap * quantity
  };
}
