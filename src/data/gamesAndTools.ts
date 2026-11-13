import { GameInfo, CategoryInfo, ToolItem, ToolFAQ, ToolStep } from './types';
export type { GameInfo, CategoryInfo, ToolItem, ToolFAQ, ToolStep };

import { EXTRA_GAMES, EXTRA_TOOLS } from './extraToolsData';
import { EXTRA_TOOLS_PART_2 } from './extraToolsDataPart2';
import { EXTRA_TOOLS_PART_3 } from './extraToolsDataPart3';
import { COIN_MASTER_TOOLS } from './coinMasterData';

export const GAMES: GameInfo[] = [
  {
    id: 'minecraft',
    slug: 'minecraft',
    name: 'Minecraft',
    shortName: 'Minecraft',
    tagline: 'Voxel builders, nether math, redstone timings & XP mechanics',
    description: 'Accurate utilities for Minecraft survival builders, redstone engineers, technical speedrunners, and PvP fighters across Java and Bedrock editions.',
    color: 'from-emerald-900/50 to-zinc-950',
    borderColor: 'border-emerald-500/30',
    accentColor: 'text-emerald-400',
    icon: 'Box',
    badge: '28 Tools Available'
  },
  {
    id: 'roblox',
    slug: 'roblox',
    name: 'Roblox',
    shortName: 'Roblox',
    tagline: 'Robux tax, DevEx cashouts, Blox Fruits values & dev revenue',
    description: 'Accurate developer calculators, official 30% Robux tax models, Developer Exchange (DevEx) conversions, and verified Blox Fruits trade fairness & stat calculators.',
    color: 'from-rose-900/50 to-zinc-950',
    borderColor: 'border-rose-500/30',
    accentColor: 'text-rose-400',
    icon: 'Gamepad2',
    badge: '27 Tools Available'
  },
  {
    id: 'fortnite',
    slug: 'fortnite',
    name: 'Fortnite',
    shortName: 'Fortnite',
    tagline: 'Battle Pass XP pacing, sensitivity converter & combat math',
    description: 'Calculators and utilities for Fortnite Battle Royale, Zero Build, and Creative: 80k XP leveling curves, mouse sensitivity converters, eDPI calculators, weapon TTK simulators, and storm timers.',
    color: 'from-amber-900/50 to-zinc-950',
    borderColor: 'border-amber-500/30',
    accentColor: 'text-amber-400',
    icon: 'Crosshair',
    badge: '15 Tools Available'
  },
  {
    id: 'pokemongo',
    slug: 'pokemongo',
    name: 'Pokémon GO',
    shortName: 'Pokémon GO',
    tagline: 'CP, IV, PvP stat products, raid damage & stardust planners',
    description: 'Accurate calculators for Pokémon GO trainers: official CPM CP formulas, appraisal IV calculators, Great/Ultra League PvP rank builders, raid boss TTW simulators, and Level 50 XL Candy power-up budgets.',
    color: 'from-rose-950/50 to-zinc-950',
    borderColor: 'border-rose-500/30',
    accentColor: 'text-rose-400',
    icon: 'Pokeball',
    badge: '15 Tools Available'
  },
  {
    id: 'palworld',
    slug: 'palworld',
    name: 'Palworld',
    shortName: 'Palworld',
    tagline: 'CombiRank breeding, IV appraisal, damage math & base automation',
    description: 'Verified calculators for Palworld trainers: official CombiRank breeding outcomes, reverse breeding lookup, multi-step trait pathing, 0-30% IV talent appraisal, combat damage math, and base production optimization.',
    color: 'from-cyan-950/50 to-zinc-950',
    borderColor: 'border-cyan-500/30',
    accentColor: 'text-cyan-400',
    icon: 'PalSphere',
    badge: '16 Tools Available'
  },
  {
    id: 'genshin',
    slug: 'genshin',
    name: 'Genshin Impact',
    shortName: 'Genshin Impact',
    tagline: 'Wish pity, resin timer, artifact CV & ascension planners',
    description: 'Verified theorycrafting calculators for Genshin Impact travelers: 90-hard / 74-soft wish pity odds, 200 resin cap timers, artifact Crit Value (CV) roll scoring, and talent mora budgets.',
    color: 'from-cyan-950/60 to-zinc-950',
    borderColor: 'border-cyan-500/30',
    accentColor: 'text-cyan-400',
    icon: 'Compass',
  },
  {
    id: 'helldivers2',
    slug: 'helldivers-2',
    name: 'Helldivers 2',
    shortName: 'Helldivers 2',
    tagline: 'Damage breakpoints, weapon TTK, weak spots & enemy armor math',
    description: 'Precision ballistics and breakpoint calculators for Helldivers 2 soldiers: exact shots-to-kill (STK), time-to-kill (TTK), weak spot multipliers, and difficulty scaling.',
    color: 'from-amber-950/60 to-zinc-950',
    borderColor: 'border-amber-500/30',
    accentColor: 'text-amber-400',
    icon: 'Crosshair',
    badge: 'Trending Game'
  },
  {
    id: 'ps99',
    slug: 'ps99',
    name: 'Pet Simulator 99',
    shortName: 'PS99',
    tagline: 'Trade values, live RAP, WFL calculator & Titanic value guides',
    description: 'Verified Pet Simulator 99 trading calculators: RAP vs true market value evaluators, Huge pet & Titanic trade calculators, variant multipliers, and RAP manipulation trap detectors.',
    color: 'from-sky-950/60 to-zinc-950',
    borderColor: 'border-sky-500/30',
    accentColor: 'text-sky-400',
    icon: 'Sparkles',
    badge: '9 Tools Available'
  },
  {
    id: 'fps',
    slug: 'fps',
    name: 'FPS & Aim Esports',
    shortName: 'FPS & Aim',
    tagline: 'Universal mouse sensitivity, eDPI, FOV & reaction benchmarks',
    description: 'Esports tournament utilities: 1:1 mouse sensitivity conversion across 15+ titles, eDPI rankings, crosshair code generators, headshot percentage analytics, and millisecond reaction benchmarks.',
    color: 'from-violet-950/60 to-zinc-950',
    borderColor: 'border-violet-500/30',
    accentColor: 'text-violet-400',
    icon: 'Crosshair',
    badge: '12 Tools Available'
  },
  {
    id: 'esports',
    slug: 'esports',
    name: 'Esports & Competitive',
    shortName: 'Esports',
    tagline: 'Team generators, MMR balancers & scrim rosters',
    description: 'Tools for competitive FPS and MOBA games including Valorant, CS2, Overwatch 2, Apex Legends, and League of Legends.',
    color: 'from-indigo-900/50 to-zinc-950',
    borderColor: 'border-indigo-500/30',
    accentColor: 'text-indigo-400',
    icon: 'Crosshair',
    badge: '2 Tools Available'
  },
  {
    id: 'tfd',
    slug: 'the-first-descendant',
    name: 'The First Descendant',
    shortName: 'TFD',
    tagline: 'Weapon DPS, Module Capacity, Energy Activator & Crystallization Catalyst optimization',
    description: 'Verified theorycrafting tools for The First Descendant: True Raw & Sustained Weapon DPS, 10-slot module capacity optimizer, polarity halving calculator, and ultimate weapon database.',
    color: 'from-cyan-950/60 to-zinc-950',
    borderColor: 'border-cyan-500/30',
    accentColor: 'text-cyan-400',
    icon: 'Cpu',
    badge: '8 Tools Available'
  },
  {
    id: 'oncehuman',
    slug: 'once-human',
    name: 'Once Human',
    shortName: 'Once Human',
    tagline: 'Blueprint star upgrades, Acid farm automation, Cradle planner, calibrations & tactical map',
    description: 'Verified suite of 8 Once Human tools: Blueprint star upgrades (1★ to 5★), tactical Mystical Crate checklist, automated Acid farm calculator, Weapon Calibration tuning, Cradle Override planner, Deviance recovery, Memetics, and Boss loot matrix.',
    color: 'from-purple-950/60 to-zinc-950',
    borderColor: 'border-purple-500/30',
    accentColor: 'text-purple-400',
    icon: 'Coins',
    badge: '8 Tools Available'
  },
  {
    id: 'wuwa',
    slug: 'wuthering-waves',
    name: 'Wuthering Waves',
    shortName: 'WuWa',
    tagline: 'Echo tuning evaluator, 80 pity & Astrite planner, S0-S6 dupes, ascension mats, Shell Credit & Sonata builder',
    description: 'Comprehensive suite of 6 Wuthering Waves tools: Echo Tuning Sub-Stat Evaluator with God-Roll scores, 80 Hard Pity & Astrite Farming Planner, Resonance Chain S0-S6 DPS multipliers, Resonator Ascension & Forte Material Calculator, Shell Credit Spend Optimizer, and Team Rotation & Sonata Effect Synergy Builder.',
    color: 'from-cyan-950/60 to-zinc-950',
    borderColor: 'border-cyan-500/30',
    accentColor: 'text-cyan-400',
    icon: 'Zap',
    badge: '6 Tools Available'
  },
  {
    id: 'zzz',
    slug: 'zenless-zone-zero',
    name: 'Zenless Zone Zero',
    shortName: 'ZZZ',
    tagline: 'Drive Disc sets, Anomaly Disorder, 90 pity Polychrome planner, Daze multipliers, Bangboos & W-Engines',
    description: 'Comprehensive suite of 6 Zenless Zone Zero tools: Drive Disc Set & Anomaly Build Optimizer with Disorder calculations, Polychrome & Master Tape Pity Planner, Daze & Stun Multiplier Calculator, Bangboo Synergy Selector, Inter-Knot Battery Planner, and W-Engine Side-by-Side Comparison Matrix.',
    color: 'from-purple-950/60 to-zinc-950',
    borderColor: 'border-purple-500/30',
    accentColor: 'text-purple-400',
    icon: 'Flame',
    badge: '6 Tools Available'
  },
  {
    id: 'typesoul',
    slug: 'type-soul',
    name: 'Roblox Type Soul',
    shortName: 'Type Soul',
    tagline: 'Stat tree allocator, grade requirements, Bankai/Resurrección stages, raid drops, clans & combo gauge',
    description: 'Comprehensive suite of 6 Roblox Type Soul tools: Stat Skill Tree Allocator with hybrid lockout warnings, Grade Progression Requirement Calculator, Shikai/Bankai/Resurrección Evolution Stage Tracker, Raid Reward & True Hogyoku Drop Checker, Clan Rarity & Buff Simulator, and Abilities Combo & Guard Break Gauge.',
    color: 'from-red-950/60 to-zinc-950',
    borderColor: 'border-red-500/30',
    accentColor: 'text-red-400',
    icon: 'Swords',
    badge: '6 Tools Available'
  },
  {
    id: 'bg3',
    slug: 'baldurs-gate-3',
    name: "Baldur's Gate 3",
    shortName: 'BG3',
    tagline: 'Multiclass spell builder, dice odds, alchemy recipes, romance tracker, AC tank, weapon DPR & origin passives',
    description: "Comprehensive suite of 7 Baldur's Gate 3 tools: Multiclass Skill & Spell Slot Builder with ECL and Warlock Pact slots, Dice Roll Success Probability Calculator with Advantage and Guidance, Alchemy Crafting Recipe Finder with 3:1 extraction math, Companion Approval & Romance Tracker for all 10 companions, Armor Class (AC) & Saving Throw Optimizer, Weapon Action & Extra Attack Damage Counter, and Origin Character Passive Modifier Guide.",
    color: 'from-amber-950/60 to-zinc-950',
    borderColor: 'border-amber-500/30',
    accentColor: 'text-amber-400',
    icon: 'Dices',
    badge: '7 Tools Available'
  },
  {
    id: 'lethalcompany',
    slug: 'lethal-company',
    name: 'Lethal Company',
    shortName: 'Lethal Co',
    tagline: 'Scrap value calculator, deadline buying rates, overtime bonuses & quota survival',
    description: 'Verified Lethal Company quota calculators: calculate exact scrap needed for 100% deadline buying rate, carried-over ship scrap retention, overtime cash bonuses, and ship item budgets.',
    color: 'from-amber-950/60 to-zinc-950',
    borderColor: 'border-amber-500/30',
    accentColor: 'text-amber-400',
    icon: 'Boxes',
    badge: '5 Tools Available'
  },
  {
    id: 'starfield',
    slug: 'starfield',
    name: 'Starfield',
    shortName: 'Starfield',
    tagline: 'Shipbuilder CAD, cargo links, skill tree allocator, planet survey checklist, weapon mods & crew buffs',
    description: 'Comprehensive suite of 6 Starfield tools: Ship Modules Cost & Cargo Weight Calculator with Class A/B/C mobility, Outpost Resource Supply Line Planner with Helium-3 freight links, 82-Skill Tree Allocator with tier unlocks, Planet Scan Flora/Fauna Completeness Checklist, Weapon Modding Damage Multiplier, and Crew Assignment Buff Calculator.',
    color: 'from-cyan-950/60 to-zinc-950',
    borderColor: 'border-cyan-500/30',
    accentColor: 'text-cyan-400',
    icon: 'Compass',
    badge: '6 Tools Available'
  },
  {
    id: 'enshrouded',
    slug: 'enshrouded',
    name: 'Enshrouded',
    shortName: 'Enshrouded',
    tagline: 'Flame Altar upgrades, building blocks, Survivor recipes, Comfort rested buff, skill tree & gliders',
    description: 'Comprehensive suite of 6 Enshrouded tools: Flame Altar Upgrade Cost Calculator with Shroud Passage levels, Building Block & Material Requirements Tool, Survivor NPC Unlock & Recipe Finder, Comfort Level & Rested Buff Timer, Skill Tree Simulator & Attribute Points Planner, and Glider & Grappling Hook Tier Upgrader.',
    color: 'from-amber-950/60 to-zinc-950',
    borderColor: 'border-amber-500/30',
    accentColor: 'text-amber-400',
    icon: 'Flame',
    badge: '6 Tools Available'
  },
  {
    id: 'nightingale',
    slug: 'nightingale',
    name: 'Nightingale',
    shortName: 'Nightingale',
    tagline: 'Realm Card crafting, Minor Card modifiers, Gear Score tiers, Resource Inherent Stats & Essence Trader planners',
    description: 'Comprehensive suite of 5 Nightingale gaslamp survival tools: Realm Card Crafting Matrix with Biome & Major cards, Minor Card Modifier Simulator with environmental weather buffs/debuffs, Gear Score Tier & Infusion Leveling Calculator, Resource Inherent Stats Optimizer with metal/wood/leather material properties, and Essence Trader Inventory & Currency Planner.',
    color: 'from-emerald-950/60 to-zinc-950',
    borderColor: 'border-emerald-500/30',
    accentColor: 'text-emerald-400',
    icon: 'Compass',
    badge: '5 Tools Available'
  },
  {
    id: 'crk',
    slug: 'cookie-run-kingdom',
    name: 'Cookie Run: Kingdom',
    shortName: 'Cookie Run',
    tagline: 'Team builder, topping optimizer, production chain planner, EXP skill upgrade planner & pity calculator',
    description: 'Comprehensive suite of 6 Cookie Run: Kingdom tools: Team Builder with position locks & treasures, Topping Optimizer with substats & CD thresholds, Production Chain Planner for Kingdom goods, Cookie & Skill Level Upgrade Planner, Gacha Pity & Gem Budget Planner, and Guild Battle & Event Timers.',
    color: 'from-amber-950/60 to-zinc-950',
    borderColor: 'border-amber-500/30',
    accentColor: 'text-amber-400',
    icon: 'Sparkles',
    badge: '6 Tools Available'
  },
  {
    id: 'afkj',
    slug: 'afk-journey',
    name: 'AFK Journey',
    shortName: 'AFK Journey',
    tagline: 'Daily boss team planner, ascension planner, resource planner, summon planner, team builder & season tracker',
    description: 'Comprehensive suite of 6 AFK Journey tactical tools: Dream Realm & Primal Lord Daily Boss Team Planner, Hero Ascension & Faction Acorn Matrix, Hero Dust & Leveling Resource Calculator, Starlight & Wishlist Gacha Summon Planner, 5v5 Tactical Grid Team Builder, and Season Progression Tracker.',
    color: 'from-purple-950/60 to-zinc-950',
    borderColor: 'border-purple-500/30',
    accentColor: 'text-purple-400',
    icon: 'Swords',
    badge: '6 Tools Available'
  },
  {
    id: 'mogo',
    slug: 'monopoly-go',
    name: 'Monopoly GO!',
    shortName: 'Monopoly GO',
    tagline: 'Sticker tracker, trade matching, free dice links, event timers, shield finder & upgrade cost planner',
    description: 'Comprehensive suite of 6 Monopoly GO tools: Album Sticker & Duplicate Vault Tracker, Safe Exchange Trade Matching Calculator, Verified Daily Free Dice Links Claimer, High Roller & Flash Event Schedule Timers, Landmark Shield Protection Finder, and Net Worth Board Upgrade Cost Planner.',
    color: 'from-red-950/60 to-zinc-950',
    borderColor: 'border-red-500/30',
    accentColor: 'text-red-400',
    icon: 'Sparkles',
    badge: '6 Tools Available'
  },
  {
    id: 'sk',
    slug: 'seven-knights-rebirth',
    name: 'Seven Knights Re:BIRTH',
    shortName: 'Seven Knights',
    tagline: 'Damage calculator, gear sell/keep tool, team builder, ruby calculator, shop value calculator & gacha planner',
    description: 'Comprehensive suite of 6 Seven Knights Re:BIRTH tactical tools: Damage Output Calculator, Gear Sell/Keep Valuation Tool, 5v5 Team Builder, Ruby Efficiency Calculator, Shop Value Optimizer, and Gacha Summon Planner.',
    color: 'from-blue-950/60 to-zinc-950',
    borderColor: 'border-blue-500/30',
    accentColor: 'text-blue-400',
    icon: 'Swords',
    badge: '6 Tools Available'
  },
  {
    id: 'cm',
    slug: 'coin-master',
    name: 'Coin Master',
    shortName: 'Coin Master',
    tagline: 'Village costs, free spins, cards, and pet timers.',
    description: 'Helpful tools for Coin Master, including village cost calculators, spin link trackers, and more.',
    color: 'from-amber-950/60 to-zinc-950',
    borderColor: 'border-amber-500/30',
    accentColor: 'text-amber-400',
    icon: 'CmIcon',
    badge: '5 Tools Available'
  },
  {
    id: 'growagarden',
    slug: 'grow-a-garden',
    name: 'Grow a Garden',
    shortName: 'Grow Garden',
    tagline: 'Crop Sheckle value calculator, variant scaling & mutation stacking',
    description: 'Verified Roblox Grow a Garden calculators: calculate exact crop Sheckle sell values, weight scaling factors, variant multipliers, environmental mutation brackets, and friend boost bonuses.',
    color: 'from-emerald-950/60 to-zinc-950',
    borderColor: 'border-emerald-500/30',
    accentColor: 'text-emerald-400',
    icon: 'Sprout',
    badge: '5 Tools Available'
  },
  {
    id: 'general',
    slug: 'general',
    name: 'Gaming Utilities',
    shortName: 'Utilities',
    tagline: 'Decision wheels, randomizers & custom drop pickers',
    description: 'Random decision makers, challenge pickers, drop spot randomizers, and team draft wheels for streamers and gaming nights.',
    color: 'from-purple-900/50 to-zinc-950',
    borderColor: 'border-purple-500/30',
    accentColor: 'text-purple-400',
    icon: 'Shield',
    badge: '3 Tools Available'
  }
];

export const PRIMARY_GAME_IDS = [
  'minecraft',
  'roblox',
  'fortnite',
  'pokemongo',
  'palworld',
  'genshin',
  'ps99',
  'growagarden',
  'helldivers2',
  'tfd',
  'oncehuman',
  'wuwa',
  'zzz',
  'typesoul',
  'bg3',
  'lethalcompany',
  'starfield',
  'enshrouded',
  'nightingale',
  'crk',
  'afkj',
  'mogo',
  'sk',
  'cm'
] as const;

export function getPrimaryGames(): GameInfo[] {
  return PRIMARY_GAME_IDS.map(id => GAMES.find(g => g.id === id)).filter((g): g is GameInfo => Boolean(g));
}

export function getGamePath(gameId: string): string {
  switch (gameId) {
    case 'minecraft': return '/minecraft';
    case 'roblox': return '/roblox';
    case 'fortnite': return '/fortnite';
    case 'pokemongo': return '/pokemongo';
    case 'palworld': return '/games/palworld';
    case 'genshin': return '/games?game=genshin';
    case 'growagarden':
    case 'grow-a-garden': return '/games/grow-a-garden';
    case 'helldivers2':
    case 'helldivers-2': return '/helldivers-2';
    case 'ps99':
    case 'pet-simulator-99': return '/ps99';
    case 'tfd':
    case 'the-first-descendant': return '/the-first-descendant';
    case 'oncehuman':
    case 'once-human': return '/once-human';
    case 'wuwa':
    case 'wuthering-waves': return '/wuthering-waves';
    case 'zzz':
    case 'zenless-zone-zero': return '/zenless-zone-zero';
    case 'typesoul':
    case 'type-soul':
    case 'roblox-type-soul': return '/type-soul';
    case 'bg3':
    case 'baldurs-gate-3': return '/baldurs-gate-3';
    case 'lethalcompany':
    case 'lethal-company': return '/lethal-company';
    case 'starfield': return '/starfield';
    case 'enshrouded': return '/enshrouded';
    case 'nightingale': return '/nightingale';
    case 'crk':
    case 'cookie-run-kingdom':
    case 'cookie-run': return '/cookie-run-kingdom';
    case 'afkj':
    case 'afk-journey':
    case 'afkjourney': return '/afk-journey';
    case 'mogo':
    case 'monopoly-go':
    case 'monopolygo': return '/monopoly-go';
    case 'sk':
    case 'seven-knights-rebirth': return '/seven-knights-rebirth';
    case 'cm':
    case 'coin-master': return '/coin-master';
    default: return `/games?game=${gameId}`;
  }
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'calculators',
    slug: 'calculators',
    name: 'Calculators',
    description: 'Game-specific calculations, stats, damage, XP, CP and more.',
    icon: 'Calculator'
  },
  {
    id: 'generators',
    slug: 'generators',
    name: 'Generators',
    description: 'Blueprints, circles, layouts, teams and other generators.',
    icon: 'Shapes'
  },
  {
    id: 'converters',
    slug: 'converters',
    name: 'Converters',
    description: 'Coordinates, sensitivity, DPI/eDPI and other conversions.',
    icon: 'ArrowLeftRight'
  },
  {
    id: 'planners',
    slug: 'planners',
    name: 'Planners',
    description: 'Breeding, builds, resources, progression and planning tools.',
    icon: 'Layers'
  },
  {
    id: 'trackers',
    slug: 'trackers',
    name: 'Trackers',
    description: 'Session, progression and game-related tracking utilities.',
    icon: 'Clock'
  },
  {
    id: 'gaming-utilities',
    slug: 'gaming-utilities',
    name: 'Gaming Utilities',
    description: "Useful tools that don't fit a single calculator category.",
    icon: 'Dices'
  },
  {
    id: 'randomizers',
    slug: 'randomizers',
    name: 'Gaming Utilities',
    description: "Useful tools that don't fit a single calculator category.",
    icon: 'Dices'
  }
];

export const TOOLS: ToolItem[] = [
  // 1. Circle Generator
  {
    id: 'minecraft-circle-generator',
    slug: 'minecraft-circle-generator',
    name: 'Minecraft Circle Generator',
    gameId: 'minecraft',
    categoryId: 'generators',
    icon: 'CircleDot',
    shortDescription: 'Generate pixel-perfect voxel circles, rings, and filled discs with custom diameter, thickness, and SVG export.',
    description: 'An interactive voxel circle builder for Minecraft. Visualize hollow rings or solid circles from 1 to 256 blocks with exact block counts, grid coordinates, slice zoom, and instant PNG/SVG vector blueprint download.',
    badge: 'Essential',
    rating: 4.96,
    reviewsCount: 3840,
    userCount: '120k+ builders',
    featured: true,
    tags: ['minecraft', 'circle', 'voxel', 'blueprint', 'building', 'pixel art', 'dome', 'tower'],
    seoTitle: 'Minecraft Circle Generator – Pixel-Perfect Voxel Circle Blueprints',
    metaDescription: 'Interactive Minecraft Circle Generator. Create accurate voxel circles, rings, and filled discs with exact block counts, SVG export, and coordinate guides.',
    h1: 'Minecraft Circle Generator & Voxel Ring Blueprint Builder',
    canonicalPath: '/tools/minecraft-circle-generator',
    howToGuide: {
      overview: 'Create perfect geometric circles in Minecraft without guessing block placements.',
      steps: [
        { title: 'Set Width / Diameter', description: 'Enter the target block diameter (odd numbers have an exact center block; even numbers have a 2×2 center).' },
        { title: 'Choose Mode', description: 'Select "Hollow (Outline Only)", "Thick Border", or "Filled Disc" based on your build needs.' },
        { title: 'Use Grid & Pan', description: 'Zoom into the canvas or hover over pixels to view individual X/Z placement coordinates.' },
        { title: 'Export Blueprint', description: 'Download an SVG blueprint or copy the block placement checklist directly to your clipboard.' }
      ]
    },
    formulaExplained: {
      title: 'Midpoint Circle Algorithm (Bresenham Discrete Voxelization)',
      details: 'Rasterizing a circle onto a square grid uses the midpoint circle theorem: a block at coordinate (x, y) is selected if (x - cx)² + (y - cy)² ≤ (radius + 0.5)². Worked Examples: 1. Diameter 7 (Radius 3.5): Central block + 3 blocks out in cardinal directions. 2. Diameter 15 (Radius 7.5): 181 total blocks for a filled disc. 3. Diameter 31 (Radius 15.5): 753 blocks for a filled circle, ~100 for a thin ring.',
      mathSnippet: '(x - cx)^2 + (y - cy)^2 <= (radius + 0.5)^2'
    },
    faqs: [
      { question: 'Should I use an odd or even diameter for my Minecraft tower?', answer: 'Use an odd diameter (e.g., 17, 33, 65) if you want a single center block for spiral staircases or beacon beams. Use an even diameter (e.g., 16, 32, 64) if your base has 2-wide doors or central dual corridors.' },
      { question: 'Can I export this blueprint to use in survival?', answer: 'Yes! Click "Export SVG" for vector schematics or click "Copy Coordinates" for a step-by-step block placement guide.' },
      { question: 'How do I make a perfect glass circle in Minecraft?', answer: 'Use the "Hollow" mode. Glass doesn\'t have a special voxel rule, but using a thin 1-block outline ensures your greenhouse or observatory looks smooth from a distance.' }
    ],
    proTips: [
      'For giant mega-bases (diameter > 50), build the 4 cardinal outer edges first, then connect the diagonal arcs.',
      'Even diameter circles have no exact 1-block center; build a 2×2 center core.'
    ],
    relatedToolIds: ['minecraft-sphere-generator', 'minecraft-dome-generator', 'minecraft-oval-generator']
  },

  // 2. Sphere Generator
  {
    id: 'minecraft-sphere-generator',
    slug: 'minecraft-sphere-generator',
    name: 'Minecraft Sphere Generator',
    gameId: 'minecraft',
    categoryId: 'generators',
    icon: 'CircleDot',
    shortDescription: 'Generate 3D voxel spheres with layer-by-layer slice viewer, hollow/filled modes, and exact block counts.',
    description: 'Plan 3D spherical mega-structures, death stars, hot air balloons, and planetary biospheres in Minecraft. Step through vertical Y-layers with intuitive slice controls, block counts per layer, and 3D preview.',
    badge: '3D Voxel',
    rating: 4.95,
    reviewsCount: 2910,
    userCount: '85k+ builders',
    featured: true,
    tags: ['minecraft', 'sphere', '3d', 'voxel', 'layer viewer', 'blueprint', 'mega build'],
    seoTitle: 'Minecraft Sphere Generator – 3D Voxel Sphere Layer-by-Layer Planner',
    metaDescription: '3D Minecraft Sphere Generator. View layer-by-layer voxel slices, toggle hollow/filled modes, get exact block counts, and build spheres easily in survival.',
    h1: 'Minecraft 3D Sphere Generator & Layer-by-Layer Blueprint',
    canonicalPath: '/tools/minecraft-sphere-generator',
    howToGuide: {
      overview: 'Construct spherical structures in Minecraft layer by layer from the bottom up.',
      steps: [
        { title: 'Choose Sphere Radius or Diameter', description: 'Enter the diameter of your sphere (e.g. 21 blocks for a medium dome, 51 for a mega base).' },
        { title: 'Select Hollow vs Solid', description: 'Hollow saves hundreds of blocks for survival bases; solid is great for terraforming.' },
        { title: 'Step Through Layers (Y-Axis)', description: 'Use the layer slider or stepper buttons to view the exact 2D circle footprint for every vertical level.' },
        { title: 'Build in Survival', description: 'Track block counts per layer and cross-reference cardinal endpoints to stay symmetrical.' }
      ]
    },
    formulaExplained: {
      title: '3D Euclidean Discrete Sphere Formula',
      details: 'A voxel at discrete coordinates (x, y, z) belongs to a solid sphere of radius R if: x² + y² + z² ≤ (R + 0.5)². Worked Examples: 1. Radius 5 (Diameter 11): ~515 blocks for a solid sphere, ~250 for a hollow shell. 2. Radius 10 (Diameter 21): ~4,189 blocks for solid, ~1,000 for hollow. 3. Radius 20 (Diameter 41): ~33,510 blocks solid, ~4,000 hollow shell.',
      mathSnippet: 'x^2 + y^2 + z^2 <= (radius + 0.5)^2'
    },
    faqs: [
      { question: 'How many blocks do I need for a hollow sphere of diameter 25?', answer: 'A hollow sphere of diameter 25 requires approximately 1,220 blocks (around 19 stacks). The tool displays the exact count for your chosen diameter.' },
      { question: 'Does this support odd and even diameters?', answer: 'Yes! Both odd diameters (with a single bottom center block) and even diameters (with a 2×2 bottom base) are fully supported.' },
      { question: 'What is the best way to build a Minecraft Death Star?', answer: 'Generate a sphere with a diameter of at least 100 blocks. Use the layer viewer to build the bottom hemisphere, then use the "Oval" tool to calculate the dish indentation separately.' }
    ],
    proTips: [
      'Start by placing temporary scaffolding at the central equator layer to establish your outer boundaries.',
      'Work from Layer 1 upward, and keep a chest of scaffolding blocks nearby.'
    ],
    relatedToolIds: ['minecraft-dome-generator', 'minecraft-circle-generator', 'minecraft-oval-generator']
  },

  // 3. Dome Generator
  {
    id: 'minecraft-dome-generator',
    slug: 'minecraft-dome-generator',
    name: 'Minecraft Dome Generator',
    gameId: 'minecraft',
    categoryId: 'generators',
    icon: 'CircleDot',
    shortDescription: 'Design glass domes, planetary observatories, and circular roofs with custom base radius, height, and layer stepper.',
    description: 'Build hemispherical, parabolic, and tall ellipsoidal domes for underwater bases, greenhouses, and circular tower roofs. Features layer-by-layer scaffolding guides and glass block requirements.',
    badge: '3D Architect',
    rating: 4.93,
    reviewsCount: 2150,
    userCount: '62k+ builders',
    featured: true,
    tags: ['minecraft', 'dome', 'greenhouse', 'underwater base', 'roof', 'architecture'],
    seoTitle: 'Minecraft Dome Generator – Hemispherical & Ellipsoid Roof Builder',
    metaDescription: 'Generate Minecraft domes, glass roofs, and underwater observatories. Step through vertical layers with custom radius and height controls.',
    h1: 'Minecraft Dome Generator & Curved Roof Layer Planner',
    canonicalPath: '/tools/minecraft-dome-generator',
    howToGuide: {
      overview: 'Create flawless glass domes and curved observatory roofs in Minecraft.',
      steps: [
        { title: 'Define Base Diameter & Height', description: 'Set your base floor diameter and choose whether you want a standard hemisphere (Height = Radius) or custom flat/tall dome.' },
        { title: 'Choose Wall Thickness', description: 'Select 1-block thin glass dome or 2-block fortified double wall.' },
        { title: 'Review Layer-by-Layer Schematics', description: 'Step through each layer from bottom ground ring to the apex pinnacle block.' }
      ]
    },
    formulaExplained: {
      title: '3D Semi-Ellipsoid Geometry',
      details: 'The dome calculates cross-sectional circle radii at each vertical Y-level from Y = 0 to Y = Height using the semi-ellipsoid formula: r(y) = BaseRadius * sqrt(1 - (y / Height)²). Worked Examples: 1. Radius 10, Height 10: Standard hemisphere. 2. Radius 20, Height 5: Flat shallow dome. 3. Radius 10, Height 30: Tall pointed observatory spire.',
      mathSnippet: 'r(y) = R * sqrt(1 - (y / H)^2)'
    },
    faqs: [
      { question: 'What is the best block for an underwater dome?', answer: 'Sea lanterns, tinted glass, or normal glass placed on a sea-lantern ring create an aesthetic, mob-proof underwater base.' },
      { question: 'Can I make an oval dome?', answer: 'Yes, check our Minecraft Oval Generator for non-circular bases or set different height-to-radius ratios in this tool.' },
      { question: 'How do I build a dome without it looking like a pyramid?', answer: 'Use the layer-by-layer blueprints provided here. Domes require careful "step-down" patterns (e.g., 3 blocks wide, then 2, then 1) to look smooth.' }
    ],
    proTips: [
      'When building an underwater glass dome, construct the outer shell first, then fill the interior with sand or sponges to clear the water quickly.'
    ],
    relatedToolIds: ['minecraft-sphere-generator', 'minecraft-circle-generator', 'minecraft-oval-generator']
  },

  // 4. Nether Portal Calculator
  {
    id: 'minecraft-nether-portal-calculator',
    slug: 'minecraft-nether-portal-calculator',
    name: 'Minecraft Nether Portal Calculator',
    gameId: 'minecraft',
    categoryId: 'converters',
    icon: 'DoorOpen',
    shortDescription: 'Calculate exact 8:1 Nether and Overworld coordinates, 128-block linking radius, and multi-portal networks.',
    description: 'Link portals without unexpected crossovers or lost players. Computes Overworld to Nether (divide by 8) and Nether to Overworld (multiply by 8) coordinate mappings, 3D linking spheres, and fast Nether highway blueprints.',
    badge: 'Essential',
    rating: 4.97,
    reviewsCount: 5210,
    userCount: '190k+ players',
    featured: true,
    tags: ['minecraft', 'nether', 'portal', 'coordinates', 'linking', 'highway', 'speedrun', 'java', 'bedrock'],
    seoTitle: 'Minecraft Nether Portal Calculator – Exact 3D Coordinate Linker',
    metaDescription: 'Accurate Minecraft Nether Portal Calculator. Calculate exact Nether coordinates (8:1 ratio), prevent linking collisions, and design fast transport networks.',
    h1: 'Minecraft Nether Portal Calculator & 3D Linking Guide',
    canonicalPath: '/tools/minecraft-nether-portal-calculator',
    howToGuide: {
      overview: 'Link your Nether and Overworld portals with 100% accuracy and zero linking collisions.',
      steps: [
        { title: 'Choose Starting Dimension', description: 'Select whether your portal is in the Overworld or Nether.' },
        { title: 'Enter Coordinates', description: 'Press F3 (Java) or enable Coordinates (Bedrock) and enter your X, Y, and Z positions.' },
        { title: 'Get Paired Coordinates', description: 'The calculator applies the 8:1 horizontal scale factor and highlights optimal Nether Y levels (Y=115 for safe bedrock ceilings).' },
        { title: 'Light Second Portal', description: 'Build your corresponding portal at the exact computed coordinates to establish a permanent 2-way link.' }
      ]
    },
    formulaExplained: {
      title: 'Minecraft Portal 8:1 Scale & Search Distance',
      details: 'Horizontal coordinates scale by a factor of 8. Worked Examples: 1. Overworld (800, 200) -> Nether (100, 25). 2. Nether (-50, 100) -> Overworld (-400, 800). 3. Java Speedrun: Stronghold at (1600, 800) needs a Nether portal at (200, 100).',
      mathSnippet: 'Nether_X = floor(Overworld_X / 8), Nether_Z = floor(Overworld_Z / 8)'
    },
    faqs: [
      { question: 'Why did my Nether portal link to the wrong place?', answer: 'If a portal is auto-generated by the game, it searches for open air/solid ground up to 128 blocks away. Manually building a portal at the exact paired coordinates forces an immediate 1-to-1 sync.' },
      { question: 'Does Nether portal scaling affect the Y-coordinate?', answer: 'No! The 8:1 ratio applies strictly to horizontal X and Z coordinates. The Y-coordinate (height) remains 1:1.' },
      { question: 'How far apart should portals be in the Nether?', answer: 'To avoid "bleeding" (portals linking to the same exit), place portals at least 16 blocks apart in the Nether (which is 128 blocks in the Overworld).' }
    ],
    proTips: [
      'Place your Nether transport highways around Y = 115–120 in Java (just beneath the bedrock ceiling) or Y = 13 for lava-free tunnels.',
      'Always link portal pairs before placing another portal within 1024 Overworld blocks.'
    ],
    relatedToolIds: ['minecraft-coordinate-converter', 'minecraft-distance-calculator', 'minecraft-circle-generator']
  },

  // 5. Coordinate Converter
  {
    id: 'minecraft-coordinate-converter',
    slug: 'minecraft-coordinate-converter',
    name: 'Minecraft Coordinate & Chunk Converter',
    gameId: 'minecraft',
    categoryId: 'converters',
    icon: 'Compass',
    shortDescription: 'Convert XYZ coordinates to Chunk X/Z, in-chunk relative offset (0-15), Region files (.mca), and Nether distances.',
    description: 'Instant coordinate breakdown for technical Minecraft players, server admins, and map makers. Computes Chunk IDs, in-chunk sub-block offsets (0–15), MCA region file names (`r.X.Z.mca`), and distance to world spawn.',
    badge: 'Technical',
    rating: 4.92,
    reviewsCount: 1740,
    userCount: '45k+ admins',
    featured: false,
    tags: ['minecraft', 'chunk', 'region file', 'mca selector', 'coordinates', 'technical', 'slime chunk'],
    seoTitle: 'Minecraft Coordinate to Chunk & Region File Converter',
    metaDescription: 'Convert Minecraft XYZ coordinates into Chunk numbers, Sub-chunk offsets (0-15), and Region (.mca) files for MCA Selector and server backups.',
    h1: 'Minecraft Coordinate & Chunk Region (.mca) Converter',
    canonicalPath: '/tools/minecraft-coordinate-converter',
    howToGuide: {
      overview: 'Break down any Minecraft XYZ world coordinate into internal game engine structures.',
      steps: [
        { title: 'Input XYZ Coordinates', description: 'Enter your player or structure coordinates.' },
        { title: 'View Chunk ID', description: 'Get the exact Chunk X and Chunk Z (each chunk is 16×16 blocks).' },
        { title: 'Identify Region File', description: 'Locate the exact `r.X.Z.mca` file for world backups, MCA Selector pruning, or corrupted chunk resets.' }
      ]
    },
    formulaExplained: {
      title: 'Chunk & Region Mathematical Formulas',
      details: 'Chunk_X = floor(X / 16). Region_X = floor(X / 512). Worked Examples: 1. Coord (100, 200): Chunk (6, 12), Region r.0.0.mca. 2. Coord (-17, 513): Chunk (-2, 32), Region r.-1.1.mca. 3. Coord (1234, -567): Chunk (77, -36), Region r.2.-2.mca.',
      mathSnippet: 'Chunk_X = floor(X / 16), Region_X = floor(X / 512)'
    },
    faqs: [
      { question: 'How do I find which region file contains my base?', answer: 'Enter your base coordinates into this tool. Look at the "Region File" result (e.g., `r.0.-1.mca`) which corresponds directly to the `.mca` files inside your world save `region/` folder.' },
      { question: 'How do negative coordinates affect chunk calculations?', answer: 'Minecraft uses standard floor division for negative numbers: coordinate X = -1 is in Chunk -1 (in-chunk offset 15), not Chunk 0.' },
      { question: 'Can I use these coordinates for teleporting?', answer: 'Yes! The Chunk and Region data are for file management, but the relative offset (0-15) helps you locate specific blocks within a chunk for farm building.' }
    ],
    proTips: [
      'Slime chunks are determined by a pseudo-random seed algorithm based on Chunk X and Chunk Z.',
      'Keep world backups before deleting `.mca` region files in server directories.'
    ],
    relatedToolIds: ['minecraft-distance-calculator', 'minecraft-nether-portal-calculator', 'minecraft-circle-generator']
  },

  // 6. Distance Calculator
  {
    id: 'minecraft-distance-calculator',
    slug: 'minecraft-distance-calculator',
    name: 'Minecraft Distance & Travel Time Calculator',
    gameId: 'minecraft',
    categoryId: 'converters',
    icon: 'Compass',
    shortDescription: 'Calculate 3D Euclidean & Manhattan distance between coordinates, with Nether shortcuts and 12 travel time estimates.',
    description: 'Compute precise 3D distance ($X, Y, Z$) and 2D horizontal distance between two locations in Minecraft. Compare travel times across Walking, Sprinting, Soul Speed III, Blue Ice Boat, Elytra Rockets, and Nether Highway shortcuts.',
    badge: 'Travel Hub',
    rating: 4.94,
    reviewsCount: 1980,
    userCount: '58k+ players',
    featured: true,
    tags: ['minecraft', 'distance', 'travel time', 'elytra', 'blue ice', 'speed', 'nether shortcut', 'navigation'],
    seoTitle: 'Minecraft Distance Calculator – 3D Coordinate Travel Time & Nether Shortcut',
    metaDescription: 'Calculate exact 3D distance between Minecraft coordinates. Compare travel times for Elytra rockets, Blue Ice boats, sprinting, and Nether highway shortcuts.',
    h1: 'Minecraft 3D Distance & Travel Time Calculator',
    canonicalPath: '/tools/minecraft-distance-calculator',
    howToGuide: {
      overview: 'Find the quickest route and travel duration between any two points in your Minecraft world.',
      steps: [
        { title: 'Enter Point A & Point B Coordinates', description: 'Input (X1, Y1, Z1) for your starting base and (X2, Y2, Z2) for your target destination.' },
        { title: 'Compare 3D vs 2D Distance', description: 'See the true 3D Euclidean distance (for renders and render distance) and horizontal distance.' },
        { title: 'Analyze Travel Times', description: 'Instantly view how many seconds/minutes the trip takes via Blue Ice boats (72.7 blocks/s), Elytra rockets (33.5 blocks/s), or sprinting.' },
        { title: 'Check Nether Shortcut Savings', description: 'View how an 8:1 Nether highway cuts your travel time by over 87%.' }
      ]
    },
    formulaExplained: {
      title: '3D Pythagorean Euclidean & Manhattan Distance',
      details: '3D Euclidean Distance: D = sqrt((X2 - X1)² + (Y2 - Y1)² + (Z2 - Z1)²). Worked Examples: 1. (0,0,0) to (100,0,0): 100 blocks. 2. (0,64,0) to (100,100,100): 146.1 blocks. 3. Manhattan path (tunnels): 100+36+100 = 236 blocks.',
      mathSnippet: 'Distance_3D = sqrt(dX^2 + dY^2 + dZ^2)'
    },
    faqs: [
      { question: 'What is the fastest travel method in Minecraft?', answer: 'A boat on Blue Ice is the fastest mechanical ground travel at ~72.7 blocks per second (up to 581 blocks per second effective speed in the Nether!). Elytra with firework rockets reaches ~33.5 blocks per second.' },
      { question: 'Why does the Nether save so much travel time?', answer: 'Because 1 block in the Nether equals 8 blocks in the Overworld. Traveling 1,000 blocks in the Nether covers 8,000 blocks in the Overworld.' },
      { question: 'What is the difference between 2D and 3D distance?', answer: '2D distance (horizontal) ignores the Y-axis (height), which is useful for mapping. 3D distance is the "true" straight-line distance, important for render distance and teleporting.' }
    ],
    proTips: [
      'On multiplayer servers, build your primary Nether hub at Y = 115 to avoid lava lakes and ghasts.',
      'Pack plenty of firework rockets (Flight Duration 3) for long-distance exploration.'
    ],
    relatedToolIds: ['minecraft-nether-portal-calculator', 'minecraft-coordinate-converter', 'minecraft-circle-generator']
  },

  // 7. XP Calculator
  {
    id: 'minecraft-xp-calculator',
    slug: 'minecraft-xp-calculator',
    name: 'Minecraft XP & Leveling Calculator',
    gameId: 'minecraft',
    categoryId: 'calculators',
    icon: 'Zap',
    shortDescription: 'Calculate exact XP points, mob kills (Endermen, Blazes, Guardians), Bottles o\' Enchanting, and smelting counts.',
    description: 'Accurately calculate experience points between any two Minecraft levels. Features vanilla XP formulas (Levels 0–16, 17–31, 32+), mob farm equivalents, ore mining requirements, and enchanting bottle estimates.',
    badge: 'Popular',
    rating: 4.94,
    reviewsCount: 3120,
    userCount: '95k+ players',
    featured: true,
    tags: ['minecraft', 'xp', 'experience', 'levels', 'mob farm', 'enderman farm', 'enchanting', 'smelting'],
    seoTitle: 'Minecraft XP Calculator – Exact Level Requirements & Farm Mob Kills',
    metaDescription: 'Calculate exact Minecraft XP points needed between any levels. See required mob kills (Endermen, Blazes), Bottles o\' Enchanting, and ore smelting counts.',
    h1: 'Minecraft Experience (XP) & Level Progression Calculator',
    canonicalPath: '/tools/minecraft-xp-calculator',
    howToGuide: {
      overview: 'Estimate the exact experience points and time required to reach your target enchanting levels.',
      steps: [
        { title: 'Enter Current Level & Progress', description: 'Input your current Minecraft level and optional progress percentage.' },
        { title: 'Enter Target Level', description: 'Set your goal (e.g., Level 30 for max enchanting, Level 50 for anvil repairs).' },
        { title: 'View Mob Farm Breakdown', description: 'Instantly view required Enderman kills (5 XP each), Blaze kills (10 XP each), or Bottles of Enchanting needed.' }
      ]
    },
    formulaExplained: {
      title: 'Vanilla Minecraft XP Formulas (Java & Bedrock)',
      details: 'Total XP from Level 0 to Level L is defined piecewise. Worked Examples: 1. Level 0 to 30: 1,395 XP points. 2. Level 30 to 31: 107 XP points. 3. Level 50 to 51: 297 XP points. Note that levels become exponentially more "expensive" over time.',
      mathSnippet: 'L30 Total XP = 1395 | L30 to L31 = 107 XP'
    },
    faqs: [
      { question: 'How much XP is needed to reach Level 30 from Level 0?', answer: 'Reaching Level 30 from Level 0 requires exactly 1,395 XP points (approx. 279 Enderman kills or 127 Bottles of Enchanting).' },
      { question: 'Is it more efficient to enchant at Level 30 than higher levels?', answer: 'Yes! Because XP requirements scale quadratically, dying or spending levels above Level 30 wastes more raw XP points.' },
      { question: 'What gives the most XP in Minecraft?', answer: 'The Ender Dragon gives 12,000 XP upon the first kill. For renewable farming, Endermen give 5 XP, and Blazes give 10 XP.' }
    ],
    proTips: [
      'Always enchant as soon as you hit Level 30 rather than saving up to Level 50+, because higher levels require significantly more XP per level.',
      'An Enderman farm in the End dimension takes under 60 seconds to take a player from Level 0 to 30.'
    ],
    relatedToolIds: ['minecraft-enchantment-calculator', 'minecraft-anvil-cost-calculator', 'minecraft-furnace-fuel-calculator']
  },

  // 8. Enchantment Calculator
  {
    id: 'minecraft-enchantment-calculator',
    slug: 'minecraft-enchantment-calculator',
    name: 'Minecraft Enchantment Optimizer',
    gameId: 'minecraft',
    categoryId: 'calculators',
    icon: 'BookOpen',
    shortDescription: 'Calculate optimal binary tree anvil combining sequence to build god gear while avoiding the "Too Expensive!" limit.',
    description: 'Build god armor, swords, bows, and pickaxes with minimum XP cost. Our binary tree merging algorithm balances Prior Work Penalty ($2^N - 1$) to prevent the dreaded 40-level "Too Expensive!" anvil cap.',
    badge: 'God Gear',
    rating: 4.96,
    reviewsCount: 4120,
    userCount: '135k+ players',
    featured: true,
    tags: ['minecraft', 'enchanting', 'anvil', 'prior work penalty', 'god sword', 'god armor', 'mending', 'efficiency'],
    seoTitle: 'Minecraft Enchantment Calculator – Optimal Anvil Combining Order',
    metaDescription: 'Find the lowest XP cost order to combine enchanted books and tools in an anvil. Avoid the Too Expensive limit with optimal binary tree merging.',
    h1: 'Minecraft Enchantment Combiner & Anvil Optimizer',
    canonicalPath: '/tools/minecraft-enchantment-calculator',
    howToGuide: {
      overview: 'Combine 5–7 enchanted books onto your armor and weapons without hitting the 39-level anvil limit.',
      steps: [
        { title: 'Select Your Gear Type', description: 'Pick Sword, Helmet, Chestplate, Boots, Pickaxe, Bow, Crossbow, or Mace.' },
        { title: 'Choose Target Enchantments', description: 'Toggle all desired enchantments (Protection IV, Unbreaking III, Mending, Sharpness V, etc.).' },
        { title: 'Generate Optimal Tree', description: 'The calculator computes the lowest-cost binary tree combination order.' },
        { title: 'Follow Anvil Steps in Game', description: 'Combine pairs of books first (Book + Book), then apply the resulting combined books to your item.' }
      ]
    },
    formulaExplained: {
      title: 'Prior Work Penalty & Tree Balancing',
      details: 'Every time an item is modified in an anvil, its Prior Work Penalty (PWP) increases. Worked Examples: 1. Sword (0) + Book (0) = Sword (1). 2. Sword (1) + Book (1) = Sword (2). 3. Combining two Book (1) pairs into a Book (2) before applying to a Sword (0) results in Sword (2) but saves 40% levels on the final step.',
      mathSnippet: 'Penalty(N) = 2^N - 1 -> Limit = 39 Levels'
    },
    faqs: [
      { question: 'Why does the anvil say "Too Expensive!"?', answer: 'In survival mode, if an anvil operation requires 40 or more levels of experience, Minecraft blocks the action with "Too Expensive!". You can avoid this by combining books in pairs first.' },
      { question: 'Does renaming an item reduce anvil cost?', answer: 'In older Minecraft versions renaming froze the penalty, but in current versions (1.20 - 1.21+) renaming always adds 1 level and does not reset PWP.' },
      { question: 'Should I add Mending first or last?', answer: 'Add Mending last if you are building a god weapon from scratch; it doesn\'t affect the cost of other enchants, but keeping the PWP low on your primary item is most important.' }
    ],
    proTips: [
      'Always pair books together first: (Book 1 + Book 2) and (Book 3 + Book 4), then merge those two books before applying to your sword.',
      'Place the item with higher Prior Work Penalty in the left anvil slot to minimize level cost.'
    ],
    relatedToolIds: ['minecraft-anvil-cost-calculator', 'minecraft-xp-calculator', 'minecraft-damage-calculator']
  },

  // 9. Anvil Cost Calculator
  {
    id: 'minecraft-anvil-cost-calculator',
    slug: 'minecraft-anvil-cost-calculator',
    name: 'Minecraft Anvil Cost Calculator',
    gameId: 'minecraft',
    categoryId: 'planners',
    icon: 'Wrench',
    shortDescription: 'Calculate Prior Work Penalties, repair costs with raw materials vs sacrificial tools, and avoid "Too Expensive!".',
    description: 'Accurately simulate anvil repair and combination mechanics. Calculate Prior Work Penalties ($2^N - 1$), raw material repairs (e.g. diamonds/iron ingots restoring 25% durability each), item renaming costs, and identify the exact survival cap.',
    badge: 'Mechanics',
    rating: 4.91,
    reviewsCount: 1620,
    userCount: '41k+ players',
    featured: false,
    tags: ['minecraft', 'anvil', 'repair cost', 'prior work penalty', 'too expensive', 'durability', 'java', 'bedrock'],
    seoTitle: 'Minecraft Anvil Cost Calculator – Prior Work Penalty & Repair Math',
    metaDescription: 'Calculate exact Minecraft anvil XP costs. Understand Prior Work Penalty (2^N - 1), raw material repairs, tool sacrificing, and survival limits.',
    h1: 'Minecraft Anvil Cost & Prior Work Penalty Calculator',
    canonicalPath: '/tools/minecraft-anvil-cost-calculator',
    howToGuide: {
      overview: 'Predict exact anvil XP costs before spending valuable diamonds or enchanted books.',
      steps: [
        { title: 'Set Target Item PWP', description: 'Enter how many times the primary item has been worked in an anvil (0 to 5 times).' },
        { title: 'Choose Secondary Input', description: 'Select whether you are repairing with raw materials (diamonds/iron) or combining with another enchanted item/book.' },
        { title: 'Toggle Renaming & Enchantments', description: 'Add optional item renaming (+1 level) and enchantment transfer levels.' },
        { title: 'Check Result & Warnings', description: 'See the exact total XP level requirement and verify it stays below the 39-level limit.' }
      ]
    },
    formulaExplained: {
      title: 'Complete Anvil Cost Formula',
      details: 'Total Cost = LeftItem_PWP + RightItem_PWP + RepairCost + EnchantmentTransferCost. Worked Examples: 1. PWP 1 + PWP 1 costs 2 (penalty) + 2 (transfer) = 4 levels. 2. PWP 4 (15 levels) + PWP 4 (15 levels) costs 30 levels just in penalties! 3. Renaming always adds exactly 1 level.',
      mathSnippet: 'Total_Cost = (2^N1 - 1) + (2^N2 - 1) + Repair + Transfer + Rename'
    },
    faqs: [
      { question: 'How much durability does 1 raw material repair in an anvil?', answer: 'Each unit of raw material (1 diamond, 1 netherite ingot, 1 iron ingot) repairs 25% of the item\'s maximum durability and costs 1 additional XP level.' },
      { question: 'What is the maximum number of times an item can be worked in an anvil?', answer: 'In survival mode, an item can typically be worked up to 5 times (PWP = 31). On the 6th use (PWP = 63), the penalty alone exceeds the 39-level limit.' },
      { question: 'Can I repair enchanted gear without an anvil?', answer: 'Yes! Use a Grindstone (which removes enchantments) or a Crafting Table (which merges durability but removes enchantments). For enchanted gear, Mending or an Anvil are the only non-destructive ways.' }
    ],
    proTips: [
      'Applying Mending allows you to repair items infinitely using XP orbs without ever increasing your anvil penalty.',
      'Always place the item with higher PWP in the left slot of the anvil.'
    ],
    relatedToolIds: ['minecraft-enchantment-calculator', 'minecraft-xp-calculator', 'minecraft-damage-calculator']
  },

  // 10. Stack Calculator
  {
    id: 'minecraft-stack-calculator',
    slug: 'minecraft-stack-calculator',
    name: 'Minecraft Stack & Storage Calculator',
    gameId: 'minecraft',
    categoryId: 'trackers',
    icon: 'Layers',
    shortDescription: 'Convert items between Double Chests, Single Chests, Shulker Boxes, 64-stacks, 16-stacks, and hopper transfer times.',
    description: 'Calculate bulk item storage requirements in Minecraft. Convert total item quantities into Double Chests (54 slots), Single Chests (27 slots), Shulker Boxes (27 slots), and remainder stacks for 64-stackable, 16-stackable, and unstackable items.',
    badge: 'Storage',
    rating: 4.93,
    reviewsCount: 2450,
    userCount: '70k+ redstoners',
    featured: true,
    tags: ['minecraft', 'stack', 'shulker box', 'double chest', 'storage', 'inventory', 'hopper speed', 'redstone'],
    seoTitle: 'Minecraft Stack Calculator – Double Chests & Shulker Box Converter',
    metaDescription: 'Convert total items into Minecraft Double Chests, Shulker Boxes, 64-stacks, and 16-stacks. Estimate hopper unloading times for storage systems.',
    h1: 'Minecraft Stack & Chest Storage Calculator',
    canonicalPath: '/tools/minecraft-stack-calculator',
    howToGuide: {
      overview: 'Plan storage systems, bulk warehouse chests, and shulker box unloading stations.',
      steps: [
        { title: 'Enter Item Quantity or Container Count', description: 'Type the total number of blocks/items, or enter how many shulker boxes/chests you have.' },
        { title: 'Select Stack Size', description: 'Choose 64 (standard blocks), 16 (ender pearls, eggs, snowballs, signs), or 1 (potions, armor).' },
        { title: 'View Storage Breakdown', description: 'See exact double chests, single chests, shulker boxes, stacks, and loose item remainders.' },
        { title: 'Check Hopper Unloading Time', description: 'View how long hoppers take to transfer the entire quantity (2.5 items per second).' }
      ]
    },
    formulaExplained: {
      title: 'Container Capacities in Minecraft',
      details: '1 Double Chest = 54 slots = 3,456 items. Worked Examples: 1. 1,000 items = 15.6 stacks = 0.58 single chests. 2. 10,000 items = 156.2 stacks = 2.89 double chests. 3. 27 Shulker Boxes = 1 full Double Chest (46,656 items total).',
      mathSnippet: 'Double Chest = 54 * 64 = 3,456 items | Shulker Box = 27 * 64 = 1,728 items'
    },
    faqs: [
      { question: 'How many blocks are in a full double chest?', answer: 'A double chest contains 54 slots × 64 items = 3,456 items (exactly 2 full shulker boxes).' },
      { question: 'How long does a hopper take to empty a full shulker box?', answer: 'A standard hopper transfers 2.5 items/second. Emptying 1,728 items takes 691.2 seconds (~11.5 minutes). Using a double-hopper setup cuts this to ~5.7 minutes.' },
      { question: 'What items only stack to 16 in Minecraft?', answer: 'Ender Pearls, Snowballs, Eggs, Signs, Buckets (empty), and Honey Bottles are the primary items that stack to 16 instead of 64.' }
    ],
    proTips: [
      'Label storage chests in terms of Shulker Boxes (SB) to easily manage large concrete, cobblestone, or wood deliveries.',
      'For fast item sorting, use water streams over hopper lines rather than long hopper chains.'
    ],
    relatedToolIds: ['minecraft-redstone-tick-calculator', 'minecraft-furnace-fuel-calculator', 'minecraft-beacon-calculator']
  },

  // 11. Beacon Calculator
  {
    id: 'minecraft-beacon-calculator',
    slug: 'minecraft-beacon-calculator',
    name: 'Minecraft Beacon Calculator',
    gameId: 'minecraft',
    categoryId: 'trackers',
    icon: 'Flame',
    shortDescription: 'Calculate mineral block requirements (Iron, Gold, Emerald, Diamond, Netherite) for Tier 1–4 and Quad beacon pyramids.',
    description: 'Plan your survival beacon pyramids. Computes total mineral block counts (9, 34, 83, 164), total ingots/gems, pyramid layer dimensions ($9\\times9, 7\\times7, 5\\times5, 3\\times3$), beacon range (up to 50 blocks), duration, and Quad-Beacon efficiency savings.',
    badge: 'Pyramid',
    rating: 4.95,
    reviewsCount: 2280,
    userCount: '65k+ players',
    featured: true,
    tags: ['minecraft', 'beacon', 'pyramid', 'iron', 'gold', 'emerald', 'diamond', 'netherite', 'haste 2', 'quad beacon'],
    seoTitle: 'Minecraft Beacon Calculator – Pyramid Materials & Range Planner',
    metaDescription: 'Calculate blocks and ingots needed for Tier 1 to 4 Minecraft beacons and Quad Beacons. See layer dimensions, mineral counts, and effect ranges.',
    h1: 'Minecraft Beacon Pyramid & Mineral Calculator',
    canonicalPath: '/tools/minecraft-beacon-calculator',
    howToGuide: {
      overview: 'Gather the exact materials required to power full Haste II, Speed II, and Regeneration beacons.',
      steps: [
        { title: 'Select Beacon Tier (1 to 4)', description: 'Choose Tier 1 (1 layer, 9 blocks) up to full Tier 4 (4 layers, 164 blocks).' },
        { title: 'Choose Mineral Block Type', description: 'Select Iron, Gold, Emerald, Diamond, Netherite, or mixed blocks.' },
        { title: 'Select Beacon Array', description: 'Compare Single Beacon vs Quad Beacon (6×6 base saving 41% of blocks per beacon beam).' },
        { title: 'Review Buffs & Range', description: 'Check effect duration (17 seconds for Tier 4) and radial range (50 blocks).' }
      ]
    },
    formulaExplained: {
      title: 'Beacon Pyramid Layer Geometry',
      details: 'Beacon Pyramid Layer Geometry: 9, 34, 83, 164 total blocks. Worked Examples: 1. Tier 2 (34 blocks): Requires 306 ingots (4.7 stacks). 2. Tier 4 (164 blocks): Requires 1,476 ingots (23.06 stacks). 3. Quad Beacon: 244 blocks = 2,196 ingots (34.3 stacks).',
      mathSnippet: 'Full Tier 4 Beacon = 164 Blocks = 1,476 Ingots (23.06 Stacks)'
    },
    faqs: [
      { question: 'Can I mix different mineral blocks in the same beacon pyramid?', answer: 'Yes! You can freely mix Iron, Gold, Emerald, Diamond, and Netherite blocks in the same pyramid without losing power or range.' },
      { question: 'What is the fastest way to build a full Tier 4 beacon in survival?', answer: 'Building an iron golem farm or a raid farm (for emeralds) provides enough materials for a 164-block Tier 4 beacon in just a couple of hours.' },
      { question: 'Do I need Haste II for insta-mining?', answer: 'Yes! Haste II (Tier 4 beacon) combined with an Efficiency V Netherite Pickaxe allows you to "insta-mine" Stone, Deepslate (partially), and Terracotta.' }
    ],
    proTips: [
      'A Quad Beacon (4 beacon beams) covers all primary powers (Haste II, Speed II, Resistance II, Strength II + Regen) with only 244 total blocks.',
      'Place stained glass directly above the beacon block to customize your beacon beam color.'
    ],
    relatedToolIds: ['minecraft-stack-calculator', 'minecraft-damage-calculator', 'minecraft-xp-calculator']
  },

  // 12. Damage Calculator
  {
    id: 'minecraft-damage-calculator',
    slug: 'minecraft-damage-calculator',
    name: 'Minecraft Damage & Armor Calculator',
    gameId: 'minecraft',
    categoryId: 'calculators',
    icon: 'Sword',
    shortDescription: 'Simulate melee & ranged damage against armor points, Armor Toughness, Protection EPF, critical hits, and Java/Bedrock combat.',
    description: 'Complete Minecraft combat and PvP damage calculator. Computes weapon base damage, Sharpness I–V, Strength potions, critical hits, Armor Defense points (0–20), Diamond/Netherite Armor Toughness, Protection enchantment reductions (up to 80%), and hits-to-kill.',
    badge: 'PvP Combat',
    rating: 4.96,
    reviewsCount: 3410,
    userCount: '98k+ fighters',
    featured: true,
    tags: ['minecraft', 'damage', 'armor toughness', 'pvp', 'sharpness', 'protection', 'critical hit', 'combat', 'java', 'bedrock'],
    seoTitle: 'Minecraft Damage Calculator – Armor Defense & Toughness Simulator',
    metaDescription: 'Simulate exact Minecraft combat damage. Calculate weapon attack damage, Sharpness, Armor Toughness reduction, Protection EPF, and hits-to-kill.',
    h1: 'Minecraft Damage, Armor Defense & PvP Combat Calculator',
    canonicalPath: '/tools/minecraft-damage-calculator',
    howToGuide: {
      overview: 'Calculate how much true damage any weapon deals through enemy armor, enchantments, and potion effects.',
      steps: [
        { title: 'Select Weapon & Enchantments', description: 'Choose Sword, Axe, Bow, Crossbow, Trident, or Mace with Sharpness, Power, or Smite.' },
        { title: 'Configure Attacker Buffs', description: 'Toggle Critical Hit (1.5× multiplier in Java) and Strength I/II potions.' },
        { title: 'Set Target Armor & Toughness', description: 'Select armor tiers (Full Netherite, Diamond, Iron, or custom armor points 0–20 and Toughness 0–12).' },
        { title: 'Review Final Damage & Hits to Kill', description: 'See post-armor damage, Protection EPF reduction, and hits required to defeat standard players (20 HP), Zombies, Withers, or Wardens.' }
      ]
    },
    formulaExplained: {
      title: 'Official Minecraft Armor Defense & Toughness Formula',
      details: 'Official Armor Defense & Toughness Formula. Worked Examples: 1. Sharpness V Diamond Sword (11 dmg) vs Full Iron (15 armor): Reduction ~50% = 5.5 dmg taken. 2. Power V Bow (25 dmg) vs Full Diamond (20 armor, 8 toughness): Reduction ~64% = 9.0 dmg taken. 3. Protection IV adds a final 64-80% reduction to post-armor damage.',
      mathSnippet: 'Reduction = min(20, max(Armor / 5, Armor - D / (2 + Toughness / 4))) / 25'
    },
    faqs: [
      { question: 'Why is Armor Toughness so important against high-damage attacks?', answer: 'Without Armor Toughness, strong hits (like axes or charged bows) pierce through standard armor points. Toughness on Diamond (+2/piece) and Netherite (+3/piece) prevents defense degradation against heavy hits.' },
      { question: 'What is the maximum Protection damage reduction in Minecraft?', answer: 'The total Enchantment Protection Factor (EPF) is capped at 80% damage reduction (achieved with 4 pieces of Protection IV: 4 × 4 = 16 EPF → max 20 EPF cap).' },
      { question: 'Does Sharpness V work on Bedrock same as Java?', answer: 'Mostly. Java adds a flat 3 damage for Sharpness V, whereas Bedrock adds 1.25 damage per level (6.25 total), making Bedrock Sharpness slightly stronger.' }
    ],
    proTips: [
      'In Java Edition, Axes deal massive single-hit burst damage and disable shields for 5 seconds on critical hits.',
      'Full Protection IV Netherite armor absorbs up to ~93% of incoming physical damage.'
    ],
    relatedToolIds: ['minecraft-enchantment-calculator', 'minecraft-anvil-cost-calculator', 'minecraft-beacon-calculator']
  },

  // 13. Redstone Tick Calculator
  {
    id: 'minecraft-redstone-tick-calculator',
    slug: 'minecraft-redstone-tick-calculator',
    name: 'Minecraft Redstone Tick & Clock Calculator',
    gameId: 'minecraft',
    categoryId: 'calculators',
    icon: 'SlidersHorizontal',
    shortDescription: 'Convert Redstone Ticks (10 Hz) ↔ Game Ticks (20 Hz) ↔ Seconds, calculate repeater delays, hopper speeds, and piston clocks.',
    description: 'Precision timing tool for redstone engineers. Convert between Game Ticks (0.05s / 20 Hz), Redstone Ticks (0.1s / 10 Hz), Milliseconds, Repeater delays (1–4 ticks), Hopper transfer rates (8 game ticks / 2.5 items/s), and Observer clock frequencies.',
    badge: 'Redstone Pro',
    rating: 4.92,
    reviewsCount: 1890,
    userCount: '52k+ engineers',
    featured: false,
    tags: ['minecraft', 'redstone', 'ticks', 'game ticks', 'repeater', 'hopper speed', 'clock', 'comparator', 'piston'],
    seoTitle: 'Minecraft Redstone Tick Calculator – Game Ticks & Clock Timings',
    metaDescription: 'Convert between Minecraft Redstone Ticks (10 Hz), Game Ticks (20 Hz), and seconds. Calculate repeater delays, hopper speeds, and observer clocks.',
    h1: 'Minecraft Redstone Tick & Component Clock Calculator',
    canonicalPath: '/tools/minecraft-redstone-tick-calculator',
    howToGuide: {
      overview: 'Synchronize redstone circuits, item sorters, flying machines, and pulse extenders.',
      steps: [
        { title: 'Enter Time or Tick Value', description: 'Type in Redstone Ticks, Game Ticks, Seconds, or Milliseconds.' },
        { title: 'Configure Repeater Delay', description: 'Calculate how many 1-tick, 2-tick, 3-tick, or 4-tick repeaters are needed for your desired delay.' },
        { title: 'Inspect Component Timings', description: 'View standardized timings for Hoppers (8 gt), Pistons (3 gt push, 0 gt instant pull in Bedrock/Java), and Observers (2 gt pulse).' }
      ]
    },
    formulaExplained: {
      title: 'Minecraft Tick Timing Standards',
      details: '1 Game Tick = 0.05s. 1 Redstone Tick = 0.1s. Worked Examples: 1. 10 second delay = 100 Redstone Ticks = 200 Game Ticks. 2. Repeater (4rt) = 0.4s delay. 3. Hopper (8gt) = 0.4s transfer. 4. Redstone pulse from observer (2gt) = 0.1s.',
      mathSnippet: '1 Redstone Tick = 2 Game Ticks = 0.10 Seconds = 100ms'
    },
    faqs: [
      { question: 'What is the difference between a Game Tick and a Redstone Tick?', answer: 'Minecraft updates its main game loop 20 times per second (1 Game Tick = 50ms). Redstone components update every other tick, or 10 times per second (1 Redstone Tick = 2 Game Ticks = 100ms).' },
      { question: 'Why does an observer output a 1-redstone-tick pulse?', answer: 'When an observer detects a block state change, it outputs a 2-game-tick (1 redstone tick = 0.1s) pulse.' },
      { question: 'How do I build a T-Flip Flop with pistons?', answer: 'In Java Edition, a 1-redstone-tick pulse (from an observer) causes a sticky piston to drop its block, creating a compact toggle switch.' }
    ],
    proTips: [
      'To build a 1-minute timer, use a comparator hopper clock with 75 items (75 × 0.8s = 60s).',
      'Avoid 1-tick repeater loops on busy multiplayer servers to prevent tick lag (TPS drops).'
    ],
    relatedToolIds: ['minecraft-stack-calculator', 'minecraft-furnace-fuel-calculator', 'minecraft-coordinate-converter']
  },

  // 14. Furnace Fuel Calculator
  {
    id: 'minecraft-furnace-fuel-calculator',
    slug: 'minecraft-furnace-fuel-calculator',
    name: 'Minecraft Furnace Fuel Calculator',
    gameId: 'minecraft',
    categoryId: 'trackers',
    icon: 'Flame',
    shortDescription: 'Calculate exact fuel units for Furnaces, Blast Furnaces, and Smokers. Compare Coal, Lava, Dried Kelp, and Blaze Rods.',
    description: 'Never waste fuel again while smelting ores or cooking food in Minecraft. Calculate exact fuel quantities for Coal, Charcoal, Lava Buckets (100 items), Coal Blocks (80 items), Dried Kelp Blocks (20 items), Blaze Rods (12 items), and wooden items, with burn times and waste timers.',
    badge: 'Efficiency',
    rating: 4.94,
    reviewsCount: 2040,
    userCount: '57k+ players',
    featured: false,
    tags: ['minecraft', 'furnace', 'fuel', 'smelting', 'blast furnace', 'smoker', 'lava bucket', 'dried kelp', 'coal'],
    seoTitle: 'Minecraft Furnace Fuel Calculator – Exact Fuel & Smelting Counts',
    metaDescription: 'Calculate exact fuel required to smelt any quantity of items in Minecraft. Compare Lava buckets, Coal blocks, Dried kelp, and Blaze rods with zero waste.',
    h1: 'Minecraft Furnace, Blast Furnace & Fuel Efficiency Calculator',
    canonicalPath: '/tools/minecraft-furnace-fuel-calculator',
    howToGuide: {
      overview: 'Smelt large batches of iron, copper, cobblestone, or food with zero wasted fuel burn time.',
      steps: [
        { title: 'Enter Number of Items to Smelt', description: 'Type your batch size (e.g., 64 items, 500 iron ore, or 3 full shulker boxes).' },
        { title: 'Select Smelter Type', description: 'Choose Standard Furnace (10s/item), Blast Furnace (5s/item for ores), or Smoker (5s/item for food).' },
        { title: 'Choose Your Preferred Fuel', description: 'Compare 14 different fuel types including Lava Buckets, Coal Blocks, Dried Kelp, and Bamboo.' },
        { title: 'Check Optimal Fuel Combination', description: 'See exact fuel units needed, residual burn time waste, and total smelting duration in minutes.' }
      ]
    },
    formulaExplained: {
      title: 'Furnace Smelting Duration & Fuel Burn Rates',
      details: 'Furnace burn rates: Lava (100 items), Coal Block (80), Coal (8). Worked Examples: 1. Smelting 64 iron: Needs 8 Coal (640s). 2. Smelting 512 stone: Needs 6.4 Coal Blocks or 5.12 Lava Buckets. 3. Blast Furnace speed: 64 ores takes 320s instead of 640s.',
      mathSnippet: 'Items Smelted = Fuel_Burn_Ticks / 200 (Furnace) or Fuel_Burn_Ticks / 100 (Blast)'
    },
    faqs: [
      { question: 'What is the most renewable late-game furnace fuel?', answer: 'Dried Kelp Blocks (crafting 9 dried kelp) smelt 20 items each and can be 100% automated with zero player intervention. Blaze Rods from nether fortress farms are also infinitely renewable.' },
      { question: 'Does a Blast Furnace use less fuel than a regular furnace?', answer: 'A Blast Furnace burns fuel twice as fast but smelts items in half the time, so the fuel-to-item ratio remains identical (e.g. 1 coal always smelts 8 items in both).' },
      { question: 'What is the best early-game fuel?', answer: 'Charcoal is the best early-game fuel as it is easily obtained by smelting logs in a furnace using wooden planks, providing 8 items worth of burn time per unit.' }
    ],
    proTips: [
      '1 Lava Bucket smelts 100 items (1 full stack of 64 + 36 extra); keep extra hoppers loaded so the residual 36 items aren\'t wasted.',
      'Smelting a 9-stack batch with 1 Coal Block (80 items) is cheaper than using 10 individual coal pieces (9 coal vs 10 coal).'
    ],
    relatedToolIds: ['minecraft-stack-calculator', 'minecraft-xp-calculator', 'minecraft-redstone-tick-calculator']
  },

  // 15. Oval Generator
  {
    id: 'minecraft-oval-generator',
    slug: 'minecraft-oval-generator',
    name: 'Minecraft Oval & Ellipse Generator',
    gameId: 'minecraft',
    categoryId: 'generators',
    icon: 'CircleDot',
    shortDescription: 'Generate voxel ellipses and oval footprints with independent X-axis and Z-axis radii, hollow/filled modes, and SVG export.',
    description: 'Design oval arenas, colosseums, airship hulls, race tracks, and curved garden boundaries in Minecraft. Supports independent horizontal X and vertical Z diameter settings, thickness sliders, grid coordinates, and SVG blueprint downloads.',
    badge: 'Voxel Shape',
    rating: 4.93,
    reviewsCount: 1910,
    userCount: '54k+ builders',
    featured: false,
    tags: ['minecraft', 'oval', 'ellipse', 'voxel', 'arena', 'colosseum', 'blueprint', 'building'],
    seoTitle: 'Minecraft Oval & Ellipse Generator – Voxel Arena Blueprint Builder',
    metaDescription: 'Interactive Minecraft Oval and Ellipse Generator. Create custom voxel ellipses with independent X and Z diameters, hollow/filled modes, and SVG downloads.',
    h1: 'Minecraft Oval & Ellipse Voxel Blueprint Generator',
    canonicalPath: '/tools/minecraft-oval-generator',
    howToGuide: {
      overview: 'Create smooth elliptical shapes and oval colosseum foundations in Minecraft.',
      steps: [
        { title: 'Set X-Diameter and Z-Diameter', description: 'Enter width (X) and length (Z) independently (e.g., Width 35 blocks, Length 65 blocks).' },
        { title: 'Select Hollow or Filled', description: 'Choose outline-only for perimeter walls or filled for solid arena floors.' },
        { title: 'Adjust Thickness', description: 'Increase wall thickness for reinforced castle ramparts and outer stadium seating.' },
        { title: 'Export Blueprint', description: 'Download SVG or copy block counts to build with zero guesswork in survival.' }
      ]
    },
    formulaExplained: {
      title: 'Voxel Ellipse Equation (Bresenham Ellipse Algorithm)',
      details: 'Voxel Ellipse Equation. Worked Examples: 1. 21x41 Ellipse (Colosseum base): ~2,100 blocks for filled floor. 2. 15x30 Ellipse: ~1,100 blocks for filled, ~75 for thin hollow outline. 3. 100x200 Mega Arena: ~15,000 blocks for a 2-block thick perimeter.',
      mathSnippet: '(x - cx)^2 / (Rx + 0.5)^2 + (z - cz)^2 / (Rz + 0.5)^2 <= 1'
    },
    faqs: [
      { question: 'What is the best way to lay out an oval in Minecraft survival?', answer: 'Mark the 4 extreme outer points (North, South, East, West) and center point with torches, then build the flat straight sections before connecting the rounded curved corners.' },
      { question: 'Can I use this for building a Minecraft colosseum?', answer: 'Yes! An oval with X = 45 and Z = 75 produces the classic Roman Colosseum aspect ratio.' },
      { question: 'How do I make a 3-block thick wall for my arena?', answer: 'Use the "Thick Border" toggle or generate the circle twice (once at size X and once at X-3) and fill the gap between the two outlines.' }
    ],
    proTips: [
      'For large stadium builds, use odd numbers for both X and Z diameters so your stadium has an unambiguous center block for beacon rays.'
    ],
    relatedToolIds: ['minecraft-circle-generator', 'minecraft-dome-generator', 'minecraft-sphere-generator']
  },

  // 16. Team Generator (Non-Minecraft)
  {
    id: 'team-generator',
    slug: 'team-generator',
    name: 'Esports Team Generator & MMR Balancer',
    gameId: 'esports',
    categoryId: 'gaming-utilities',
    icon: 'Users',
    shortDescription: 'Generate balanced teams for Valorant, CS2, Overwatch, and custom gaming tournaments with MMR and role sorting.',
    description: 'Fair team generator and MMR balancer for gaming squads and tournament organizers. Supports custom player ratings (1–10), role locks (Duelist/Controller/Tank/Support), bench reserves, and fair roster exports.',
    badge: 'Esports',
    rating: 4.91,
    reviewsCount: 1890,
    userCount: '53k+ squads',
    featured: false,
    tags: ['team generator', 'mmr balancer', 'valorant', 'cs2', 'overwatch', 'esports', 'tournament', 'scrims'],
    seoTitle: 'Esports Team Generator & MMR Balancer – Fair Custom Match Rosters',
    metaDescription: 'Free gaming team generator & MMR balancer. Build fair custom lobby rosters for Valorant, CS2, Overwatch, and esports scrims with role assignment.',
    h1: 'Esports Team Generator & MMR Skill Balancer',
    canonicalPath: '/tools/team-generator',
    howToGuide: {
      overview: 'Create balanced competitive teams for 5v5 scrims, 2v2 tournaments, and party matches.',
      steps: [
        { title: 'Add Players & Ratings', description: 'Enter player names, optional skill ratings (1-10), and preferred roles.' },
        { title: 'Select Number of Teams', description: 'Choose 2, 3, 4, or custom team counts.' },
        { title: 'Select Balancing Algorithm', description: 'Choose "MMR Balanced" for fair competition or "Pure Random" for casual game nights.' },
        { title: 'Export Roster', description: 'Copy the formatted team rosters directly to Discord or tournament chats.' }
      ]
    },
    formulaExplained: {
      title: 'Greedy Snake Draft & Partition Algorithm',
      details: 'Players are sorted by skill rating in descending order. Teams are populated using a snake draft heuristic (Team 1, Team 2, Team 2, Team 1) followed by iterative pair-swapping to minimize the variance in total team MMR. Worked Examples: 1. Two Teams: Players rated 10, 8, 7, 5. Team 1 gets 10 and 5 (MMR 15). Team 2 gets 8 and 7 (MMR 15). Perfectly balanced. 2. Three Teams: Players rated 10, 9, 8, 7, 6, 5. T1: 10, 5 (15). T2: 9, 6 (15). T3: 8, 7 (15).',
      mathSnippet: 'Min Var(TeamMMR_1, TeamMMR_2, ... TeamMMR_K)'
    },
    faqs: [
      { question: 'How does MMR balancing work?', answer: 'The algorithm balances total team skill points while keeping average player ratings across all teams as close as mathematically possible.' },
      { question: 'What if I have an odd number of players?', answer: 'The generator will assign the extra player to a "Bench" or "Reserve" list, or create one team with one fewer player if requested.' },
      { question: 'Can I lock specific players to the same team?', answer: 'Yes, you can use the "Duo Lock" feature to ensure friends or partners stay on the same roster regardless of skill rating.' }
    ],
    proTips: [
      'Assign realistic skill numbers (e.g. Bronze = 2, Gold = 5, Diamond = 8, Radiant = 10) for the most balanced matchups.'
    ],
    relatedToolIds: ['gaming-decision-wheel', 'minecraft-xp-calculator']
  },

  // 17. Decision Wheel (Non-Minecraft)
  {
    id: 'gaming-decision-wheel',
    slug: 'gaming-decision-wheel',
    name: 'Gaming Decision Wheel & Drop Picker',
    gameId: 'general',
    categoryId: 'gaming-utilities',
    icon: 'Disc3',
    shortDescription: 'Spin the customizable gaming wheel for battle royale drop spots, what game to play next, and streamer challenges.',
    description: 'Customizable spinning decision wheel for gamers and livestreamers. Includes built-in presets for Warzone & Fortnite drop spots, Valorant agent roulette, Minecraft hardcore challenges, sound effects, and elimination mode.',
    badge: 'Fun/Stream',
    rating: 4.95,
    reviewsCount: 3740,
    userCount: '110k+ spins',
    featured: false,
    tags: ['wheel', 'randomizer', 'drop spot', 'fortnite', 'warzone', 'streamer', 'challenge', 'roulette'],
    seoTitle: 'Gaming Decision Wheel – Custom Drop Spot & Challenge Spinner',
    metaDescription: 'Customizable gaming decision wheel. Pick battle royale drop spots, what game to play next, random hero picks, and streamer challenges.',
    h1: 'Gaming Decision Wheel & Random Drop Spot Picker',
    canonicalPath: '/tools/gaming-decision-wheel',
    howToGuide: {
      overview: 'Let the wheel make unbiased decisions for drop locations, hero selections, or party games.',
      steps: [
        { title: 'Select a Preset or Add Custom Options', description: 'Choose from Minecraft Challenges, Battle Royale Drop Spots, or type your own choices.' },
        { title: 'Enable Elimination Mode (Optional)', description: 'Automatically remove winners from subsequent spins for tournament brackets.' },
        { title: 'Spin the Wheel', description: 'Click Spin or press Spacebar to trigger physics-based wheel rotation and sound effects.' }
      ]
    },
    formulaExplained: {
      title: 'Physics-Based Angular Deceleration',
      details: 'The wheel uses a realistic friction curve:\nOmega(t) = InitialSpeed * exp(-Friction * t)\nThe winning sector is computed deterministically from the final resting angle modulo 2π. Worked Examples: 1. Slow Spin: Initial velocity 500 deg/s, friction 0.1. Wheel stops at 180 degrees. 2. Turbo Spin: Initial velocity 2000 deg/s. Wheel completes 5 full rotations before landing on a random sector.',
      mathSnippet: 'FinalAngle = (InitialAngle + SpinVelocity * Duration) mod 360'
    },
    faqs: [
      { question: 'Can I customize the slice colors and text?', answer: 'Yes! Add, edit, or delete any options. The wheel dynamically redistributes sector angles evenly.' },
      { question: 'Is the wheel truly random?', answer: 'Yes, it uses a high-entropy PRNG seed combined with user-interaction timing to ensure every spin result is unpredictable.' },
      { question: 'How do I share my custom wheel?', answer: 'Once you add your options, click the "Share" button to generate a unique URL containing your encoded wheel settings.' }
    ],
    proTips: [
      'Use Elimination Mode when doing sub-challenges on stream to cycle through every option without duplicates.'
    ],
    relatedToolIds: ['team-generator', 'minecraft-circle-generator']
  },

  // 18. Robux Tax Calculator
  {
    id: 'robux-tax-calculator',
    slug: 'robux-tax-calculator',
    name: 'Robux Tax Calculator (30% Marketplace Cut)',
    gameId: 'roblox',
    categoryId: 'calculators',
    icon: 'Percent',
    shortDescription: 'Calculate net Robux after Roblox\'s 30% fee, or find the exact listing price required to receive a target Robux amount.',
    description: 'Accurate Roblox 30% marketplace tax calculator for creators, clothing designers, and game developers. Converts gross listing price to net creator proceeds using official mathematical floor rules ($Receive = \\lfloor Price \\times 0.70 \\rfloor$), and includes DevEx USD equivalents.',
    badge: 'Popular',
    rating: 4.97,
    reviewsCount: 4890,
    userCount: '160k+ creators',
    featured: true,
    tags: ['roblox', 'robux', 'tax', 'marketplace fee', 'gamepass price', 'clothing', 'devex'],
    seoTitle: 'Robux Tax Calculator – 30% Roblox Fee & Listing Price Math',
    metaDescription: 'Calculate exact net Robux after Roblox\'s 30% marketplace tax. Reverse calculate gamepass listing prices to receive your target Robux amount.',
    h1: 'Robux Tax Calculator & 30% Roblox Marketplace Fee Planner',
    canonicalPath: '/tools/robux-tax-calculator',
    howToGuide: {
      overview: 'Calculate how much Robux you will actually receive into your account balance after Roblox deducts its 30% cut.',
      steps: [
        { title: 'Select Calculation Mode', description: 'Choose "I am Setting an Item Price" to see net proceeds, or "I Want to Receive Exact Net Robux" to find the listing price.' },
        { title: 'Enter Robux Amount', description: 'Input your gamepass, clothing, or avatar asset price in Robux.' },
        { title: 'View Net Proceeds & Tax Cut', description: 'See the exact 70% net amount credited to your pending sales, the 30% Roblox fee, and USD DevEx value.' }
      ]
    },
    formulaExplained: {
      title: 'Official Roblox Floor Rounding Formula',
      details: 'Roblox truncates fractional Robux using the mathematical floor function:\n• Creator Net Robux = floor(Listing Price * 0.70)\n• Roblox Tax Fee = Listing Price - Creator Net Robux\n• Required Price for Target = ceil(Target Robux / 0.70)',
      mathSnippet: 'Net_Robux = floor(Price * 0.70) | Price = ceil(Target / 0.70)'
    },
    faqs: [
      { question: 'Why does Roblox take 30% of gamepass sales?', answer: 'Roblox charges a 30% marketplace fee on all user-created items (gamepasses, shirts, pants, UGC 3D accessories, and developer products) to fund platform hosting, server bandwidth, customer support, and developer infrastructure.' },
      { question: 'How long do Robux stay in "Pending Sales"?', answer: 'Pending Robux typically clear into your account balance within 3 to 7 business days for security and anti-fraud verification.' }
    ],
    proTips: [
      'If you want to receive an even 1,000 Robux, set your price to 1,429 R$ (1,429 × 0.70 = 1,000.3 → 1,000 R$).',
      'For group games, pending funds automatically land in group funds once the 3–7 day escrow period ends.'
    ],
    relatedToolIds: ['robux-to-usd-calculator', 'roblox-devex-calculator', 'roblox-gamepass-revenue-calculator']
  },

  // 20. Roblox DevEx Calculator
  {
    id: 'roblox-devex-calculator',
    slug: 'roblox-devex-calculator',
    name: 'Roblox DevEx Calculator (Developer Exchange)',
    gameId: 'roblox',
    categoryId: 'converters',
    icon: 'TrendingUp',
    shortDescription: 'Calculate USD cashouts from Earned Robux using the official $0.0035 DevEx rate, minimum thresholds, and tax estimates.',
    description: 'Official Roblox Developer Exchange (DevEx) calculator. Converts Earned Robux to US Dollars at the verified rate of $0.0035/Robux ($350 per 100,000 R$). Checks 30,000 Robux minimum eligibility thresholds and estimates W-9 / W-8BEN tax withholdings.',
    badge: 'Developer',
    rating: 4.96,
    reviewsCount: 3150,
    userCount: '85k+ developers',
    featured: true,
    tags: ['roblox', 'devex', 'developer exchange', 'cashout', 'usd', 'studio', 'earnings', 'tipalti'],
    seoTitle: 'Roblox DevEx Calculator – Official $0.0035 Cashout & Tax Estimator',
    metaDescription: 'Calculate your Roblox DevEx cashout in USD. Features official $0.0035/R$ rate, 30,000 Robux minimum eligibility checks, and tax withholding estimations.',
    h1: 'Roblox DevEx (Developer Exchange) USD Cashout Calculator',
    canonicalPath: '/tools/roblox-devex-calculator',
    howToGuide: {
      overview: 'Estimate the real USD payout you will receive when submitting a Developer Exchange (DevEx) request.',
      steps: [
        { title: 'Enter Earned Robux Balance', description: 'Input your clean Earned Robux acquired from game passes, developer products, avatar items, or premium payouts.' },
        { title: 'Check Minimum Eligibility', description: 'Ensure your balance meets or exceeds the 30,000 Robux minimum requirement.' },
        { title: 'Review Estimated Tax & Net Payout', description: 'See gross USD value, Tipalti transaction fees, and net take-home payment.' }
      ]
    },
    formulaExplained: {
      title: 'Official DevEx Rate ($0.0035 USD per Robux)',
      details: 'Gross USD = Earned Robux * 0.0035\nNet Take-Home = Gross USD - Tax Withheld - Wire/Tipalti Processing Fee\n\nEvery 100,000 Earned Robux cashes out to exactly $350.00 USD before local taxes.',
      mathSnippet: 'USD_Gross = Earned_Robux * 0.0035 ($350 per 100k R$)'
    },
    faqs: [
      { question: 'What is the minimum amount of Robux needed for DevEx?', answer: 'The minimum threshold to submit a DevEx request is 30,000 Earned Robux (which converts to $105.00 USD).' },
      { question: 'What counts as "Earned Robux"?', answer: 'Earned Robux are Robux generated through game monetization (gamepasses, dev products, paid access, premium payouts) or UGC catalog sales. Robux from trading limiteds or purchasing gift cards cannot be cashed out.' }
    ],
    proTips: [
      'Complete your Tipalti account registration and tax forms (W-9 for US, W-8BEN for international) before submitting your first cashout request.',
      'DevEx requests are processed once per calendar month per Roblox account.'
    ],
    relatedToolIds: ['roblox-group-payout-calculator', 'roblox-gamepass-revenue-calculator', 'robux-tax-calculator']
  },

  // 22. Blox Fruits Level & XP Calculator
  {
    id: 'blox-fruits-xp-calculator',
    slug: 'blox-fruits-xp-calculator',
    name: 'Blox Fruits Level & XP Grinding Calculator',
    gameId: 'roblox',
    categoryId: 'calculators',
    icon: 'Zap',
    shortDescription: 'Calculate required XP from Level 1 to Max (Level 2600), Sea transitions (First, Second, Third Sea), and 2x XP boost grinding times.',
    description: 'Track your Blox Fruits leveling journey to the max level cap (2600). Computes exact quest experience, stat points unlocked, Sea boundaries (First Sea 1–700, Second Sea 700–1500, Third Sea 1500–2600), and grinding time with 2x EXP boosts and Buddha fruit.',
    badge: 'Level 2600',
    rating: 4.95,
    reviewsCount: 3940,
    userCount: '130k+ pirates',
    featured: true,
    tags: ['blox fruits', 'level calculator', 'xp calculator', 'max level 2600', 'second sea', 'third sea', 'buddha grinding'],
    seoTitle: 'Blox Fruits Level & XP Calculator – Max Level 2600 Grind Planner',
    metaDescription: 'Calculate XP and time to reach Max Level 2600 in Blox Fruits. Plan Sea transitions (First, Second, Third Sea) with 2x EXP code boosts and Buddha fruit.',
    h1: 'Blox Fruits Level, Quest XP & Sea Progression Calculator',
    canonicalPath: '/tools/blox-fruits-xp-calculator',
    howToGuide: {
      overview: 'Calculate how much experience and grinding playtime you need to hit your target Blox Fruits level.',
      steps: [
        { title: 'Set Current Level', description: 'Enter your character\'s existing level (1 to 2600).' },
        { title: 'Set Target Goal Level', description: 'Choose your milestone (Level 700 for Second Sea, Level 1500 for Third Sea, or 2600 for Max).' },
        { title: 'Toggle EXP Buffs', description: 'Enable 2× EXP Codes or Awakened Buddha fruit for accurate grinding speed estimates.' },
        { title: 'Check Stat Points Gained', description: 'View total stat points unlocked (+3 points per level).' }
      ]
    },
    formulaExplained: {
      title: 'Blox Fruits Experience & Stat Scaling Formulas',
      details: '• Stat Points Gained = (Target Level - Current Level) * 3\n• Total Max Stat Points = 2600 * 3 = 7,800 Points\n• Level 700 Requirement: Unlocks Second Sea (Cafe, Raids, Trading)\n• Level 1500 Requirement: Unlocks Third Sea (Mansion, Race V4, Leviathan)',
      mathSnippet: 'Stat_Points = Levels * 3 | Max Stat Points = 7,800'
    },
    faqs: [
      { question: 'What is the current max level in Blox Fruits?', answer: 'The current maximum level cap in Blox Fruits is Level 2600.' },
      { question: 'What is the best fruit for leveling up fast?', answer: 'Awakened Buddha (Beast fruit) is universally considered the best fruit for grinding because its transformation increases reach and defense while letting you spam high-damage melee/sword M1 attacks.' }
    ],
    proTips: [
      'Redeem active 2x EXP Twitter/Discord codes in 20-minute intervals while farming bosses for maximum leveling efficiency.'
    ],
    relatedToolIds: ['blox-fruits-stat-calculator', 'blox-fruits-damage-calculator', 'blox-fruits-trading-calculator']
  },

  // 23. Blox Fruits Stat Calculator
  {
    id: 'blox-fruits-stat-calculator',
    slug: 'blox-fruits-stat-calculator',
    name: 'Blox Fruits Stat Calculator',
    gameId: 'roblox',
    categoryId: 'calculators',
    icon: 'Shield',
    shortDescription: 'Plan 7,800 max stat points across Melee, Defense, Sword, Gun, and Blox Fruit. Includes Fruit/Sword/Gun/Hybrid presets, HP & Energy pools, and Stat Reset costs.',
    description: 'Complete Blox Fruits stat point allocator and PvP build calculator up to Level 2600 (7,800 total stat points, 2,600 cap per attribute). Distribute points across Melee, Defense, Sword, Gun, and Blox Fruit with Fruit Main, Sword Main, Gun Main, and Hybrid presets, calculate HP and Energy pools, and check Stat Reset refund options (2,500 Fragments at Plokster NPC, 75 Robux Shop refund, or free codes).',
    badge: 'Stat Builder',
    rating: 4.96,
    reviewsCount: 3490,
    userCount: '114k+ players',
    featured: true,
    tags: ['blox fruits', 'stat calculator', 'stat reset', 'build planner', 'fruit main', 'sword main', 'hybrid build', 'hp pool', 'energy pool', 'pvp build'],
    seoTitle: 'Blox Fruits Stat Calculator – 7,800 Stat Points, Build & Reset Planner',
    metaDescription: 'Distribute 7,800 stat points in Blox Fruits across Melee, Defense, Sword, Gun, and Fruit. Calculate HP (13,100 Max) and Energy pools plus Stat Reset costs.',
    h1: 'Blox Fruits Stat Calculator & Build Allocator',
    canonicalPath: '/tools/blox-fruits-stat-calculator',
    howToGuide: {
      overview: 'Allocate your character\'s stat points to maximize PvP combo damage and survivability, and review in-game Stat Reset refund costs before rebuilding.',
      steps: [
        { title: 'Set Player Level', description: 'Enter your level (1 to 2,600) to compute total available stat points (Level × 3, up to 7,800 max).' },
        { title: 'Select a Build Preset', description: 'Pick Fruit Main, Sword Main, Gun Main, or Hybrid Split to auto-fill optimal stat ratios.' },
        { title: 'Fine-Tune Attribute Sliders', description: 'Adjust Melee, Defense, Sword, Gun, and Blox Fruit points up to the 2,600 cap per stat attribute.' },
        { title: 'Review Health, Energy & Reset Costs', description: 'Check your resulting HP pool (up to 13,100 HP), Energy capacity, and whether to reset stats with 2,500 Fragments at Plokster or 75 Robux.' }
      ]
    },
    formulaExplained: {
      title: 'Blox Fruits Stat Mechanics, Pools & Reset Costs',
      details: '• Total Stat Points = Player Level × 3 (7,800 total at Level 2,600; max 2,600 per stat)\n• Total Health Pool (HP) = 100 + (Defense Points × 5) → Max 13,100 HP at 2,600 Defense\n• Total Energy Stamina Pool = 100 + (Melee Points × 5) → Max 13,100 Energy at 2,600 Melee\n• Stat Reset Cost: 2,500 Fragments at Plokster NPC (Second Sea Cafe / Third Sea Floating Turtle), 75 Robux in the Shop, or 0 cost via active Stat Reset codes.',
      mathSnippet: 'Max_HP = 100 + (2600 × 5) = 13,100 | Reset = 2,500 Fragments or 75 Robux'
    },
    faqs: [
      { question: 'Why shouldn\'t I put points into both Sword and Blox Fruit at the same time?', answer: 'Because stat points are limited to 3 max stats at Level 2600 (2,600 × 3 = 7,800 total). Since Melee and Defense are mandatory for Energy and HP, specializing in either Sword, Gun, OR Blox Fruit delivers full primary damage.' },
      { question: 'How much does a Stat Reset cost in Blox Fruits?', answer: 'You can reset all stat points with Plokster NPC in the Cafe (Second Sea) or Floating Turtle (Third Sea) for 2,500 Fragments, buy a Stat Refund in the Shop for 75 Robux, or redeem official free stat reset codes.' },
      { question: 'Which stats should I max first while leveling up?', answer: 'Always prioritize Defense (HP) and Melee (Energy) alongside your chosen main weapon or fruit so you have enough health to survive combos and enough energy for dashes, sky jumps, and skills.' }
    ],
    proTips: [
      'Always max Defense and Melee (2,600 at max level) alongside your primary damage attribute so you reach the full 13,100 HP and 13,100 Energy pools.',
      'Save 2,500 Fragments from Sea Events or Raids before switching builds so you can refund stats at Plokster without spending 75 Robux.'
    ],
    relatedToolIds: ['blox-fruits-damage-calculator', 'blox-fruits-xp-calculator', 'blox-fruits-trading-calculator']
  },

  // 24. Blox Fruits Damage Calculator
  {
    id: 'blox-fruits-damage-calculator',
    slug: 'blox-fruits-damage-calculator',
    name: 'Blox Fruits Damage & Combo Calculator',
    gameId: 'roblox',
    categoryId: 'calculators',
    icon: 'Sword',
    shortDescription: 'Simulate single-hit and combo damage using Stat points, Item Mastery (1–600), Accessories (Pale Scarf, Leviathan Crown), and Race V4.',
    description: 'Accurate Blox Fruits combat damage calculator. Computes attack damage across Blox Fruits, Swords, Melee fighting styles, and Guns with 2600 stat scaling, weapon mastery (up to 600), accessory percentage buffs, Race V3/V4 skills, and Full Body Armament Haki (Aura).',
    badge: 'PvP Damage',
    rating: 4.95,
    reviewsCount: 2840,
    userCount: '80k+ fighters',
    featured: false,
    tags: ['blox fruits', 'damage calculator', 'combo damage', 'mastery 600', 'pale scarf', 'leviathan crown', 'race v4', 'pvp'],
    seoTitle: 'Blox Fruits Damage Calculator – Mastery, Accessories & Race V4 Multipliers',
    metaDescription: 'Simulate Blox Fruits damage across Fruits, Swords, Melee, and Guns. Calculate weapon mastery (1-600), Pale Scarf / Leviathan Crown buffs, and Race V4.',
    h1: 'Blox Fruits Attack Damage, Mastery & Combo Multiplier Calculator',
    canonicalPath: '/tools/blox-fruits-damage-calculator',
    howToGuide: {
      overview: 'Calculate how much true damage your attacks deal with various accessories, mastery levels, and Race V4 awakenings.',
      steps: [
        { title: 'Choose Attack Category', description: 'Select Blox Fruit Move, Sword Skill, Melee Style, or Gun Blast.' },
        { title: 'Set Stat Points & Mastery', description: 'Enter your invested stat points (0–2600) and weapon mastery level (1–600).' },
        { title: 'Equip Accessory & Race', description: 'Select Pale Scarf, Leviathan Crown, Valkyrie Helm, or Dark Coat, and pick your Race V3/V4 tier.' },
        { title: 'Review Total Damage & Hits to Kill', description: 'See final calculated damage per hit and hits needed to defeat a 13,100 HP max player or Sea Beast.' }
      ]
    },
    formulaExplained: {
      title: 'Compound Blox Fruits Damage Scaling Formula',
      details: 'Damage = BaseDamage * (1 + StatPoints / 1300) * (1 + Mastery * 0.0015) * (1 + AccBuff + RaceBuff + AuraBuff)\n\n• Mastery 600 provides approximately +90% bonus damage.\n• Full Body Armament Aura adds +10% physical/weapon damage.',
      mathSnippet: 'Final_Damage = Base * StatMultiplier * MasteryMultiplier * TotalBuffs'
    },
    faqs: [
      { question: 'What is the best accessory for Blox Fruit damage?', answer: 'Pale Scarf and Dark Coat both provide a massive +15% Blox Fruit damage boost, with Pale Scarf also adding +15% Sword damage and 2 extra Instinct/Ken dodges.' },
      { question: 'How much extra damage does 600 Mastery give?', answer: 'Reaching max 600 Mastery on a weapon or fruit provides approximately +90% increased damage compared to Mastery 1.' }
    ],
    proTips: [
      'Human Race V4 in Psycho Mode combined with Pale Scarf yields one of the highest burst one-shot combo damage multipliers in the entire game.'
    ],
    relatedToolIds: ['blox-fruits-stat-calculator', 'blox-fruits-xp-calculator', 'blox-fruits-trading-calculator']
  },

  // 25. Roblox Gamepass Revenue Calculator
  {
    id: 'roblox-gamepass-revenue-calculator',
    slug: 'roblox-gamepass-revenue-calculator',
    name: 'Roblox Gamepass Revenue & Conversion Calculator',
    gameId: 'roblox',
    categoryId: 'trackers',
    icon: 'ShoppingCart',
    shortDescription: 'Model gamepass sales, 30% Roblox fees, 70% net creator proceeds, conversion rates, and monthly/annual DevEx USD revenue.',
    description: 'Financial forecasting tool for Roblox studio developers. Calculate monthly gross Robux, 30% platform tax, 70% net revenue, conversion rates based on daily game visits, and annual DevEx USD income projections.',
    badge: 'Monetization',
    rating: 4.93,
    reviewsCount: 1980,
    userCount: '48k+ developers',
    featured: false,
    tags: ['roblox', 'gamepass revenue', 'conversion rate', 'developer', 'monetization', 'devex', 'studio'],
    seoTitle: 'Roblox Gamepass Revenue Calculator – Conversion Rates & DevEx Projections',
    metaDescription: 'Model your Roblox gamepass revenue. Calculate 70% net Robux, player purchase conversion rates, and annual DevEx USD cashout projections.',
    h1: 'Roblox Gamepass Revenue, Conversion Rate & Income Calculator',
    canonicalPath: '/tools/roblox-gamepass-revenue-calculator',
    howToGuide: {
      overview: 'Forecast the revenue potential of pricing your gamepasses across different player visit volumes.',
      steps: [
        { title: 'Set Gamepass Robux Price', description: 'Enter the planned listing price (e.g., 250 R$ for VIP, 450 R$ for 2x Money, 750 R$ for Op Pass).' },
        { title: 'Enter Estimated Monthly Sales', description: 'Type the number of units expected to sell each month.' },
        { title: 'Input Daily Game Visits', description: 'Enter your game\'s average daily visits to calculate visitor purchase conversion rates.' },
        { title: 'Review Monthly & Annual DevEx USD', description: 'See your projected net take-home cashout value.' }
      ]
    },
    formulaExplained: {
      title: 'Gamepass Revenue & Conversion Rate Math',
      details: '• Monthly Net Robux = Monthly Sales * floor(Price * 0.70)\n• Monthly DevEx USD = Monthly Net Robux * $0.0035\n• Visitor Conversion Rate = (Monthly Sales / (Daily Visits * 30)) * 100%',
      mathSnippet: 'Net_Robux = Sales * floor(Price * 0.70) | USD = Net_Robux * 0.0035'
    },
    faqs: [
      { question: 'What is a typical gamepass conversion rate on Roblox?', answer: 'Most successful Roblox experiences achieve a gamepass purchase conversion rate between 0.05% and 0.5% of total monthly visits.' },
      { question: 'What is the optimal price for a VIP gamepass?', answer: 'Data from top experiences shows pricing between 199 R$ and 499 R$ strikes the best balance between purchase volume and net revenue.' }
    ],
    proTips: [
      'Offer tiered gamepass pricing (Entry level 99 R$, Mid-tier 399 R$, Premium 999 R$) to capture all player spending brackets.'
    ],
    relatedToolIds: ['roblox-group-payout-calculator', 'roblox-devex-calculator', 'robux-tax-calculator']
  },

  // 27. Roblox Premium Payout Calculator
  {
    id: 'roblox-premium-payout-calculator',
    slug: 'roblox-premium-payout-calculator',
    name: 'Roblox Premium Payout (EBP) Calculator',
    gameId: 'roblox',
    categoryId: 'trackers',
    icon: 'Award',
    shortDescription: 'Estimate Engagement-Based Premium Payouts (EBP) based on subscriber playtime hours, visits, and DevEx cashouts.',
    description: 'Calculate Roblox Engagement-Based Premium Payouts (EBP). Estimate how many Robux and real USD your game earns purely from Roblox Premium subscriber playtime, without requiring players to purchase any gamepasses or products.',
    badge: 'Playtime Pay',
    rating: 4.92,
    reviewsCount: 1420,
    userCount: '32k+ developers',
    featured: false,
    tags: ['roblox', 'premium payouts', 'ebp', 'engagement', 'premium playtime', 'devex', 'passive income'],
    seoTitle: 'Roblox Premium Payout Calculator – Engagement Playtime (EBP) Math',
    metaDescription: 'Calculate Roblox Premium Payouts (EBP). Estimate passive Robux and DevEx USD earned from Roblox Premium subscriber playtime in your experience.',
    h1: 'Roblox Engagement-Based Premium Payouts (EBP) Calculator',
    canonicalPath: '/tools/roblox-premium-payout-calculator',
    howToGuide: {
      overview: 'Forecast passive monetization earned when Roblox Premium subscribers play your experience.',
      steps: [
        { title: 'Enter Monthly Premium Player Visits', description: 'Input how many visits come from Roblox Premium subscribers.' },
        { title: 'Set Average Playtime Session (Minutes)', description: 'Enter average session duration per premium player (e.g. 15–30 minutes).' },
        { title: 'Adjust Payout Rate Benchmark', description: 'Set standard payout rate (typically 0.18–0.25 R$ per premium player hour).' },
        { title: 'Review Projected Monthly & Annual Payouts', description: 'View estimated Robux and DevEx USD cashout values.' }
      ]
    },
    formulaExplained: {
      title: 'Engagement-Based Premium Payout (EBP) Algorithm',
      details: 'Total Premium Hours = (Monthly Premium Visits * Avg Minutes) / 60\nProjected Robux = floor(Total Premium Hours * Payout Rate per Hour)\nDevEx Cashout = Projected Robux * $0.0035',
      mathSnippet: 'EBP_Robux = floor(((Visits * Session_Mins) / 60) * Rate_Per_Hour)'
    },
    faqs: [
      { question: 'Do players need to spend Robux for a game to get Premium Payouts?', answer: 'No! Premium Payouts are 100% passive. As long as a Roblox Premium member spends time playing your game, Roblox automatically pays you Robux.' },
      { question: 'When are Premium Payouts credited to developers?', answer: 'Premium payouts are calculated on a rolling daily basis with a slight processing delay and distributed into your pending group or personal revenue.' }
    ],
    proTips: [
      'Design engaging gameplay loops, daily streaks, or AFK reward chambers to increase premium player session duration.'
    ],
    relatedToolIds: ['roblox-group-payout-calculator', 'roblox-gamepass-revenue-calculator', 'roblox-devex-calculator']
  },

  // 28. Fortnite XP Calculator
  {
    id: 'fortnite-xp-calculator',
    slug: 'fortnite-xp-calculator',
    name: 'Fortnite XP & Season Grind Calculator',
    gameId: 'fortnite',
    categoryId: 'calculators',
    icon: 'Zap',
    shortDescription: 'Calculate match XP, daily quest limits, Creative mode XP caps (400k/day), and estimated days to reach any target level.',
    description: 'Accurate Fortnite XP calculator. Features the official 80,000 XP per level curve, Creative playtime daily caps (400,000 XP max), Daily Match Quests (60,000 XP), Battle Stars earnings, and playtime estimates.',
    badge: 'Popular',
    rating: 4.96,
    reviewsCount: 4210,
    userCount: '150k+ players',
    featured: true,
    tags: ['fortnite', 'xp calculator', 'battle pass', 'creative xp', 'daily quests', 'battle stars', 'grind'],
    seoTitle: 'Fortnite XP Calculator – Battle Pass & Creative XP Grind Planner',
    metaDescription: 'Calculate XP needed for any Fortnite level. Factor in 80k XP/level, Creative 400k daily caps, Daily Match Quests, and Battle Stars.',
    h1: 'Fortnite Experience (XP) & Level Grind Calculator',
    canonicalPath: '/tools/fortnite-xp-calculator',
    howToGuide: {
      overview: 'Plan your daily quest and creative routine to reach Level 100 or 200 without buying tiers.',
      steps: [
        { title: 'Set Current & Target Level', description: 'Enter where you currently stand and choose your goal (Level 100 or Level 200).' },
        { title: 'Configure Daily Habits', description: 'Select how many Daily Match Quests (up to 3) and Creative hours you play daily.' },
        { title: 'Review Estimated Days to Goal', description: 'See the exact days required and Battle Stars you will unlock.' }
      ]
    },
    formulaExplained: {
      title: 'Standardized 80,000 XP per Level Formula',
      details: 'Since Chapter 3/4/5, Fortnite uses a fixed 80,000 XP per level progression curve from Level 1 to 1000:\nTotal XP Required = (Target Level - Current Level) * 80,000\nBattle Stars = (Target Level - Current Level) * 5',
      mathSnippet: 'XP_Required = (Target_Level - Current_Level) * 80,000'
    },
    faqs: [
      { question: 'How much XP is needed for one level in Fortnite?', answer: 'Each level in Fortnite requires exactly 80,000 XP.' },
      { question: 'What is the daily Creative XP cap?', answer: 'Creative 2.0 / UEFN maps grant up to approximately 400,000 XP per day (around 5 full levels) before XP gains diminish.' }
    ],
    proTips: [
      'Complete your 3 Daily Match Quests first every day for a guaranteed 60,000 XP in under 20 minutes.'
    ],
    relatedToolIds: ['fortnite-battle-pass-calculator', 'fortnite-xp-required-calculator', 'fortnite-level-calculator']
  },

  // 29. Fortnite Battle Pass XP Calculator
  {
    id: 'fortnite-battle-pass-calculator',
    slug: 'fortnite-battle-pass-calculator',
    name: 'Fortnite Battle Pass Pacing Calculator',
    gameId: 'fortnite',
    categoryId: 'planners',
    icon: 'Trophy',
    shortDescription: 'Track your daily level pacing, days remaining in season, and on-track status for Level 100, 150, and 200 rewards.',
    description: 'Track your seasonal Battle Pass trajectory. Computes required daily level pace, ideal progress level for today, and whether you are ahead of or behind schedule to unlock all Tier 100 and Level 200 Super Styles before the season ends.',
    badge: 'Pacing',
    rating: 4.97,
    reviewsCount: 5120,
    userCount: '190k+ players',
    featured: true,
    tags: ['fortnite', 'battle pass', 'pacing', 'super styles', 'season countdown', 'level 200', 'on track'],
    seoTitle: 'Fortnite Battle Pass Calculator – Daily Level Pacing & Season Tracker',
    metaDescription: 'Calculate daily level requirements to complete the Fortnite Battle Pass. Track your on-track status for Level 100 and Level 200 Super Styles.',
    h1: 'Fortnite Battle Pass Level Pacing & Season Progress Calculator',
    canonicalPath: '/tools/fortnite-battle-pass-calculator',
    howToGuide: {
      overview: 'Determine if you are on schedule to finish your Battle Pass before the season concludes.',
      steps: [
        { title: 'Select Target Goal', description: 'Choose Level 100 (Base Pass), Level 150 (Super Styles), or Level 200 (Max Bonus Rewards).' },
        { title: 'Enter Current Level & Days Left', description: 'Input your level and the days remaining in the current Fortnite season.' },
        { title: 'Check Pacing Status', description: 'See your required daily level rate and whether you are ahead or behind today\'s target.' }
      ]
    },
    formulaExplained: {
      title: 'Linear Season Progression Algorithm',
      details: '• Required Levels / Day = (Target Level - Current Level) / Days Remaining\n• Expected Level Today = (Days Passed / Total Season Days) * Target Level\n• Pacing Status: On-Track if Current Level ≥ Expected Level Today.',
      mathSnippet: 'Daily_Pace = (Target - Current) / Days_Left'
    },
    faqs: [
      { question: 'What level do I need to unlock everything in the Battle Pass?', answer: 'Level 100 completes the main Battle Pass pages. Level 200 is required to unlock all Bonus Rewards, Quest Rewards, and Super Level Styles.' },
      { question: 'How many levels per day are needed to reach Level 200 in a 75-day season?', answer: 'Reaching Level 200 from Level 1 in a standard 75-day season requires approximately 2.67 levels (approx. 213,000 XP) per day.' }
    ],
    proTips: [
      'Take advantage of Supercharged XP weekends to quickly catch up if you fall behind schedule.'
    ],
    relatedToolIds: ['fortnite-xp-calculator', 'fortnite-xp-required-calculator', 'fortnite-level-calculator']
  },

  // 30. Fortnite Level Calculator
  {
    id: 'fortnite-level-calculator',
    slug: 'fortnite-level-calculator',
    name: 'Fortnite Level from Total XP Calculator',
    gameId: 'fortnite',
    categoryId: 'calculators',
    icon: 'Award',
    shortDescription: 'Convert total season XP points into exact Fortnite Level, level completion percentage, and remaining XP to rank up.',
    description: 'Convert raw XP points into your exact Fortnite season level. Calculates in-level percentage progress, XP needed to hit the next level tier, and cumulative Battle Stars earned.',
    badge: 'Converter',
    rating: 4.93,
    reviewsCount: 2310,
    userCount: '65k+ players',
    featured: false,
    tags: ['fortnite', 'level calculator', 'xp to level', 'battle stars', 'season level', 'progress'],
    seoTitle: 'Fortnite Level Calculator – Convert Total XP to Season Level',
    metaDescription: 'Convert raw XP points to exact Fortnite season level. Calculate progress percentage, XP to next rank, and total Battle Stars.',
    h1: 'Fortnite Level from Total Experience (XP) Calculator',
    canonicalPath: '/tools/fortnite-level-calculator',
    howToGuide: {
      overview: 'Translate your total account or seasonal experience points into current level and battle stars.',
      steps: [
        { title: 'Enter Total Season XP', description: 'Type in your cumulative XP points.' },
        { title: 'View Level Breakdown', description: 'See your exact current level and progress bar towards the next level.' },
        { title: 'Check Battle Stars', description: 'View total unlocked Battle Stars available to spend.' }
      ]
    },
    formulaExplained: {
      title: 'Discrete Level Floor Calculation',
      details: 'Current Level = floor(Total XP / 80,000) + 1\nIn-Level Remainder = Total XP mod 80,000\nXP to Next Level = 80,000 - In-Level Remainder',
      mathSnippet: 'Level = floor(Total_XP / 80,000) + 1'
    },
    faqs: [
      { question: 'What is the maximum account level in Fortnite?', answer: 'Account level continues indefinitely, while individual season levels cap at Level 1000.' }
    ],
    proTips: [
      'Every 80,000 XP gives you 5 Battle Stars to claim cosmetic rewards.'
    ],
    relatedToolIds: ['fortnite-xp-required-calculator', 'fortnite-xp-calculator', 'fortnite-battle-pass-calculator']
  },

  // 31. Fortnite XP Required Calculator
  {
    id: 'fortnite-xp-required-calculator',
    slug: 'fortnite-xp-required-calculator',
    name: 'Fortnite XP Required Between Levels Calculator',
    gameId: 'fortnite',
    categoryId: 'calculators',
    icon: 'Zap',
    shortDescription: 'Calculate the exact XP points between any two Fortnite levels, with match counts, creative hours, and quest equivalents.',
    description: 'Calculate the exact XP requirement between starting and ending levels in Fortnite. Breaks down the total XP into Battle Royale matches needed (~15k XP/match), Creative mode hours, and weekly quest equivalents.',
    badge: 'Milestone',
    rating: 4.94,
    reviewsCount: 2890,
    userCount: '78k+ players',
    featured: false,
    tags: ['fortnite', 'xp required', 'level span', 'matches needed', 'creative hours', 'milestone'],
    seoTitle: 'Fortnite XP Required Calculator – Level-to-Level Experience Planner',
    metaDescription: 'Calculate exact XP required between any two Fortnite levels. See equivalent Battle Royale matches, creative hours, and quest counts needed.',
    h1: 'Fortnite XP Required & Match Breakdown Calculator',
    canonicalPath: '/tools/fortnite-xp-required-calculator',
    howToGuide: {
      overview: 'Find out exactly how many XP points separate your current level from your next cosmetic reward.',
      steps: [
        { title: 'Enter Start Level', description: 'Input your current level.' },
        { title: 'Enter End Level', description: 'Input the level required for your target skin or reward.' },
        { title: 'View Activity Breakdown', description: 'See how many BR matches or Creative hours are needed to bridge the gap.' }
      ]
    },
    formulaExplained: {
      title: 'Fixed Delta XP Formula',
      details: 'Delta XP = (End Level - Start Level) * 80,000 XP\nBR Matches = ceil(Delta XP / 15,000)\nCreative Hours = Delta XP / 240,000',
      mathSnippet: 'XP = (End_Level - Start_Level) * 80,000'
    },
    faqs: [
      { question: 'How much XP is needed from Level 50 to 100?', answer: '50 levels × 80,000 XP = 4,000,000 XP points (approx. 267 matches or 16.6 creative hours).' }
    ],
    proTips: [
      'Focus on completing Story and Weekly quests which award 25,000 to 40,000 XP each.'
    ],
    relatedToolIds: ['fortnite-xp-calculator', 'fortnite-battle-pass-calculator', 'fortnite-level-calculator']
  },

  // 32. Fortnite Sensitivity Converter
  {
    id: 'fortnite-sensitivity-converter',
    slug: 'fortnite-sensitivity-converter',
    name: 'Fortnite Sensitivity Converter (Valorant, CS2, OW2, Apex)',
    gameId: 'fortnite',
    categoryId: 'converters',
    icon: 'MousePointer',
    shortDescription: 'Convert mouse sensitivity from Valorant, CS2, Overwatch 2, Apex Legends, and R6 Siege to Fortnite with 1:1 muscle memory.',
    description: 'Cross-game mouse sensitivity converter for Fortnite. Preserves 1:1 physical 360° turn distance in centimeters and inches from Valorant, CS2, Overwatch 2, Apex Legends, and Rainbow Six Siege with hardware DPI compensation.',
    badge: 'Pro Aim',
    rating: 4.97,
    reviewsCount: 5840,
    userCount: '230k+ aimers',
    featured: true,
    tags: ['fortnite', 'sensitivity converter', 'valorant to fortnite', 'cs2 to fortnite', 'cm 360', 'edpi', 'aim'],
    seoTitle: 'Fortnite Sensitivity Converter – 1:1 Valorant, CS2 & Apex Aim Matching',
    metaDescription: 'Convert mouse sensitivity to and from Fortnite with 1:1 cm/360 accuracy. Supports Valorant, CS2, Overwatch 2, Apex Legends, and R6 Siege.',
    h1: 'Fortnite Cross-Game Mouse Sensitivity Converter',
    canonicalPath: '/tools/fortnite-sensitivity-converter',
    howToGuide: {
      overview: 'Port your exact mouse aim and muscle memory from other competitive shooters into Fortnite.',
      steps: [
        { title: 'Select Source Game & Sensitivity', description: 'Choose Valorant, CS2, Overwatch 2, Apex Legends, or R6 and enter your sensitivity.' },
        { title: 'Input Mouse DPI', description: 'Enter your mouse hardware DPI (e.g. 400, 800, 1600).' },
        { title: 'Get Fortnite In-Game %', description: 'Copy the calculated percentage sensitivity (e.g. 6.25%) directly into Fortnite settings.' }
      ]
    },
    formulaExplained: {
      title: 'Yaw-Based 360° Angular Sensitivity Mapping',
      details: '• Fortnite Yaw = 0.00555555° per count\n• Valorant Yaw = 0.07° per count\n• CS2 / Source Yaw = 0.022° per count\n• Conversion: Fortnite % = (Source Sens * Source Yaw / Fortnite Yaw) * 10',
      mathSnippet: 'Fortnite_Sens% = (Val_Sens * 0.07 / 0.005555) * 10'
    },
    faqs: [
      { question: 'How do I convert Valorant sensitivity to Fortnite?', answer: 'Multiply your Valorant sensitivity by approximately 12.6 to get your Fortnite in-game sensitivity percentage (e.g. 0.50 in Valorant = 6.3% in Fortnite at 800 DPI).' },
      { question: 'What is cm/360?', answer: 'cm/360 is the physical distance in centimeters your mouse must travel on your mousepad to perform a complete 360-degree in-game rotation.' }
    ],
    proTips: [
      'Match your Targeting (ADS) and Scope sensitivity to 100% if you prefer a 1:1 hipfire ratio.'
    ],
    relatedToolIds: ['fortnite-edpi-calculator', 'fortnite-damage-calculator', 'fortnite-distance-calculator']
  },

  // 33. Fortnite eDPI Calculator
  {
    id: 'fortnite-edpi-calculator',
    slug: 'fortnite-edpi-calculator',
    name: 'Fortnite eDPI & Pro Sensitivity Calculator',
    gameId: 'fortnite',
    categoryId: 'converters',
    icon: 'Crosshair',
    shortDescription: 'Calculate your effective DPI (eDPI), 360° turn distance, and compare your aim with pro players like Bugha, Clix, and Mongraal.',
    description: 'Calculate your true effective sensitivity in Fortnite ($eDPI = DPI \\times Sens\\%$). Categorizes your aim style (Low Arm Aim vs Medium Meta vs High Wrist Aim) and benchmarks your settings against World Champions like Bugha, Clix, and Mongraal.',
    badge: 'Pro Meta',
    rating: 4.96,
    reviewsCount: 3910,
    userCount: '115k+ aimers',
    featured: true,
    tags: ['fortnite', 'edpi calculator', 'bugha sens', 'clix sens', 'mongraal sens', 'pro settings', 'aim style'],
    seoTitle: 'Fortnite eDPI Calculator – Pro Player Sensitivity & 360° Distance',
    metaDescription: 'Calculate your Fortnite eDPI and 360° cm distance. Compare your sensitivity with pro settings from Bugha, Clix, Mongraal, and TaySon.',
    h1: 'Fortnite eDPI (Effective DPI) & Pro Aim Benchmarking Calculator',
    canonicalPath: '/tools/fortnite-edpi-calculator',
    howToGuide: {
      overview: 'Find your true effective sensitivity and balance speed for building with control for shotgun aim.',
      steps: [
        { title: 'Enter Mouse Hardware DPI', description: 'Select 400, 800, 1200, 1600, or custom DPI.' },
        { title: 'Enter In-Game Sensitivity %', description: 'Type your X/Y mouse sensitivity percentage from Fortnite settings.' },
        { title: 'View eDPI & Pro Comparison', description: 'See where your eDPI falls relative to the 45–75 eDPI pro player meta range.' }
      ]
    },
    formulaExplained: {
      title: 'Fortnite eDPI Formula',
      details: 'Fortnite eDPI = DPI * (Sensitivity Percentage / 100) * 10\n• Pro Meta Range: 45 to 75 eDPI\n• World Champion Bugha: 48 eDPI (6.0% @ 800 DPI)\n• Clix: 68 eDPI (8.5% @ 800 DPI)',
      mathSnippet: 'eDPI = DPI * (Sens% / 100) * 10'
    },
    faqs: [
      { question: 'What is a good eDPI for Fortnite?', answer: 'The competitive pro sweet spot is between 45 and 75 eDPI. This gives enough speed for fast wall-piece control and edits while maintaining steady shotgun aim.' }
    ],
    proTips: [
      '800 DPI with 6.0%–8.0% sensitivity is the most popular setting across Tier 1 FNCS pros.'
    ],
    relatedToolIds: ['fortnite-sensitivity-converter', 'fortnite-damage-calculator', 'fortnite-fall-damage-calculator']
  },

  // 34. Fortnite Damage Calculator
  {
    id: 'fortnite-damage-calculator',
    slug: 'fortnite-damage-calculator',
    name: 'Fortnite Weapon Damage & TTK Calculator',
    gameId: 'fortnite',
    categoryId: 'calculators',
    icon: 'Sword',
    shortDescription: 'Simulate weapon DPS, headshot multipliers, pellet spread, and hits-to-kill against 200 HP and Zero Build 250 EHP.',
    description: 'Combat damage simulator for Fortnite Battle Royale and Zero Build. Computes single-hit damage, headshot criticals, shotgun pellet distribution, weapon DPS, Time to Kill (TTK), and shots required to eliminate enemies with varying shield levels.',
    badge: 'Combat TTK',
    rating: 4.95,
    reviewsCount: 3120,
    userCount: '90k+ fighters',
    featured: false,
    tags: ['fortnite', 'damage calculator', 'ttk', 'shotgun damage', 'pump headshot', 'zero build', 'weapon dps'],
    seoTitle: 'Fortnite Damage Calculator – Weapon TTK, Headshots & Zero Build EHP',
    metaDescription: 'Calculate Fortnite weapon damage and Time to Kill (TTK). Simulate Shotguns, ARs, SMGs, and Snipers against 200 HP and 250 Zero Build Overshield.',
    h1: 'Fortnite Weapon Damage, DPS & Time to Kill (TTK) Calculator',
    canonicalPath: '/tools/fortnite-damage-calculator',
    howToGuide: {
      overview: 'Simulate combat encounters to evaluate weapon loadouts and shotgun one-pump potential.',
      steps: [
        { title: 'Select Weapon & Rarity', description: 'Choose Pump Shotgun, Gatekeeper, Striker AR, Reaper Sniper, or SMGs.' },
        { title: 'Set Shot Placement', description: 'Toggle Body Shot, Headshot, or custom Shotgun pellet percentage.' },
        { title: 'Configure Enemy Shields & Zero Build', description: 'Set enemy shield amount and toggle Zero Build 50 Overshield.' },
        { title: 'Review TTK & Hits to Eliminate', description: 'See exact damage dealt, weapon DPS, and elimination speed in seconds.' }
      ]
    },
    formulaExplained: {
      title: 'Combat Damage & Time-to-Kill (TTK) Math',
      details: '• Headshot Damage = Base Damage * Headshot Multiplier\n• Total Target EHP = 100 HP + Shield + (Zero Build ? 50 : 0)\n• Hits to Kill = ceil(Total EHP / Hit Damage)\n• TTK (seconds) = (Hits to Kill - 1) / Fire Rate',
      mathSnippet: 'TTK = (ceil(EHP / Damage) - 1) / FireRate'
    },
    faqs: [
      { question: 'What is the maximum effective health in Zero Build?', answer: 'In Zero Build, players have 100 Base Health + 100 Shield + 50 Recharging Overshield = 250 Total Effective Health (EHP).' }
    ],
    proTips: [
      'Legendary Pump and Gatekeeper shotguns can deal over 170+ damage on clean headshots.'
    ],
    relatedToolIds: ['fortnite-fall-damage-calculator', 'fortnite-edpi-calculator', 'fortnite-sensitivity-converter']
  },

  // 35. Fortnite Fall Damage Calculator
  {
    id: 'fortnite-fall-damage-calculator',
    slug: 'fortnite-fall-damage-calculator',
    name: 'Fortnite Fall Damage & Tile Height Calculator',
    gameId: 'fortnite',
    categoryId: 'calculators',
    icon: 'ShieldAlert',
    shortDescription: 'Calculate fall damage based on building structure tile height (1 tile = 5.12m), safe thresholds, and Flowberry immunity buffs.',
    description: 'Physics and fall damage calculator for Fortnite. Computes damage taken when falling from building heights in structure tiles (5.12m/tile) and meters, identifies the safe 3-tile threshold, lethal 4.5-tile heights, and checks Flowberry, Nitro, and water landing damage negations.',
    badge: 'Physics',
    rating: 4.93,
    reviewsCount: 1870,
    userCount: '52k+ builders',
    featured: false,
    tags: ['fortnite', 'fall damage', 'tile height', 'meters', 'flowberry', 'nitro', 'safe drop', 'physics'],
    seoTitle: 'Fortnite Fall Damage Calculator – Building Tile Height & Safe Drop Math',
    metaDescription: 'Calculate Fortnite fall damage by structure tile height (5.12m/tile). Check safe 3-tile limits, lethal drop heights, and Flowberry gravity buffs.',
    h1: 'Fortnite Fall Damage, Tile Height & Safe Drop Calculator',
    canonicalPath: '/tools/fortnite-fall-damage-calculator',
    howToGuide: {
      overview: 'Prevent accidental fall eliminations during high-ground build battles and rotations.',
      steps: [
        { title: 'Set Building Height (Tiles)', description: 'Enter how many structure wall tiles high you are (1 to 10 tiles).' },
        { title: 'Toggle Immunity Buffs', description: 'Enable Flowberry / Fizz, Nitro effect, or water landing if applicable.' },
        { title: 'Check Damage & Survival Status', description: 'See health points lost (falls bypass shields) and lethal knockout warnings.' }
      ]
    },
    formulaExplained: {
      title: 'Fortnite Discrete Fall Physics Formula',
      details: '• 1 Building Wall Tile = 5.12 Meters\n• Safe Height: ≤ 3.0 Tiles (15.36m) -> 0 Damage\n• Lethal Knockout Height: ≥ 4.5 Tiles (23.04m) -> 100+ Damage\n• Fall damage directly damages green Health (HP) and ignores blue Shields.',
      mathSnippet: 'Damage = 0 (if <= 3.0 tiles) | Fatal = 100 HP (if >= 4.5 tiles)'
    },
    faqs: [
      { question: 'Does fall damage affect shields in Fortnite?', answer: 'No! Fall damage completely bypasses blue Shields and Zero Build Overshield, directly depleting your 100 green Health (HP) bar.' },
      { question: 'How high can you fall in Fortnite without taking damage?', answer: 'You can safely fall up to 3 building structure wall tiles (approx. 15.3 meters) without taking any damage.' }
    ],
    proTips: [
      'Sliding off slopes or landing in bushes, water, or ziplines completely negates fall damage.'
    ],
    relatedToolIds: ['fortnite-damage-calculator', 'fortnite-distance-calculator', 'fortnite-session-timer']
  },

  // 36. Fortnite Distance/Travel Calculator
  {
    id: 'fortnite-distance-calculator',
    slug: 'fortnite-distance-calculator',
    name: 'Fortnite Distance & Rotation Speed Calculator',
    gameId: 'fortnite',
    categoryId: 'converters',
    icon: 'Compass',
    shortDescription: 'Calculate map rotation travel times across Sprinting, Nitro, Sports Cars, Dirt Bikes, and Gliders to outrun the closing storm.',
    description: 'Map rotation and travel calculator for Fortnite Battle Royale. Computes travel durations in seconds across 9 movement modes (Jogging 4.8 m/s, Tactical Sprint 7.2 m/s, Whiplash Sports Car 24.5 m/s, Dirt Bike 18 m/s, Gliders 15 m/s) and verifies if you can outrun the closing storm circle.',
    badge: 'Rotation',
    rating: 4.94,
    reviewsCount: 1980,
    userCount: '58k+ players',
    featured: false,
    tags: ['fortnite', 'distance calculator', 'rotation', 'sprint speed', 'sports car', 'storm circle', 'travel time'],
    seoTitle: 'Fortnite Distance Calculator – Map Rotation Travel Times & Vehicle Speeds',
    metaDescription: 'Calculate Fortnite rotation travel times across Tactical Sprinting, Nitro, Sports Cars, Dirt Bikes, and Gliders. Outrun closing storm circles.',
    h1: 'Fortnite Map Distance, Travel Speed & Storm Rotation Calculator',
    canonicalPath: '/tools/fortnite-distance-calculator',
    howToGuide: {
      overview: 'Estimate the exact travel time required to rotate across the island map before the storm closes.',
      steps: [
        { title: 'Set Rotation Distance in Meters', description: 'Enter distance to target safe zone or POI (e.g. 250m, 750m, 1,200m).' },
        { title: 'Compare Movement Modes', description: 'Review travel times for sprinting, vehicles, and launch pads.' },
        { title: 'Check Storm Survival', description: 'Verify which modes outrun the closing storm wall speed.' }
      ]
    },
    formulaExplained: {
      title: 'Kinematic Rotation Speed Formula',
      details: 'Travel Time (Seconds) = Distance (Meters) / Speed (m/s)\n• Tactical Sprint: 7.2 m/s\n• Whiplash Sports Car (Boost): 24.5 m/s\n• Glider Redeploy: 15.0 m/s',
      mathSnippet: 'Time_Sec = Distance_Meters / Speed_mps'
    },
    faqs: [
      { question: 'What is the fastest land rotation method in Fortnite?', answer: 'The Whiplash Sports Car with boost is the fastest land vehicle at ~24.5 meters per second, followed by Nitro sprinting at ~10.5 m/s.' }
    ],
    proTips: [
      'Carry Shockwave grenades or Flowberry Fizz for instant vertical elevation and rapid zone rotations.'
    ],
    relatedToolIds: ['fortnite-session-timer', 'fortnite-fall-damage-calculator', 'fortnite-damage-calculator']
  },

  // 37. Fortnite Match/Session Timer
  {
    id: 'fortnite-session-timer',
    slug: 'fortnite-session-timer',
    name: 'Fortnite Match, Storm Surge & Reboot Card Timer',
    gameId: 'fortnite',
    categoryId: 'trackers',
    icon: 'Timer',
    shortDescription: 'Interactive tournament match timer tracking Storm Circle phases 1–9, storm surge thresholds, and 250s reboot card countdowns.',
    description: 'Competitive tournament and scrim stopwatch for Fortnite players. Tracks elapsed match duration, storm circle wait and shrink timers across all 9 phases, storm DPS ticks, and a 250-second teammate reboot card expiration countdown.',
    badge: 'Tournament',
    rating: 4.96,
    reviewsCount: 2450,
    userCount: '72k+ competitors',
    featured: false,
    tags: ['fortnite', 'match timer', 'storm timer', 'storm surge', 'reboot card', 'tournament', 'scrims'],
    seoTitle: 'Fortnite Match & Storm Surge Timer – Reboot Card Countdown',
    metaDescription: 'Live tournament match and storm circle timer for Fortnite. Track storm phases 1 to 9, DPS ticks, storm surge warnings, and 250s reboot card expirations.',
    h1: 'Fortnite Tournament Match, Storm Phase & Reboot Card Timer',
    canonicalPath: '/tools/fortnite-session-timer',
    howToGuide: {
      overview: 'Synchronize competitive scrims and monitor storm zone timings and reboot card expirations.',
      steps: [
        { title: 'Select Match or Reboot Timer', description: 'Choose Live Match Stopwatch or Teammate Reboot Card countdown.' },
        { title: 'Start Match Stopwatch', description: 'Click Start when the Battle Bus launches to track live storm phases 1 through 9.' },
        { title: 'Monitor Phase Transitions', description: 'See upcoming circle shrink timers and storm DPS damage.' }
      ]
    },
    formulaExplained: {
      title: 'Storm Phase State Progression Table',
      details: 'Fortnite Battle Royale matches progress through 9 storm phases:\n• Phase 1: 180s Wait + 180s Shrink (1 DPS)\n• Phase 5: 75s Wait + 60s Shrink (5 DPS)\n• Phase 8/9: 30s Wait + 30s Shrink (10 DPS)\n• Reboot Card Expiration: Exactly 250 Seconds.',
      mathSnippet: 'Match_Duration ~ 22-25 Minutes | Reboot_Card = 250s'
    },
    faqs: [
      { question: 'How long does a reboot card last before expiring?', answer: 'A fallen teammate\'s reboot card remains available on the ground for exactly 250 seconds (4 minutes and 10 seconds) before disappearing.' }
    ],
    proTips: [
      'In stacked tournament lobbies, maintain above-surge damage threshold before Phase 3 and Phase 5 closures.'
    ],
    relatedToolIds: ['fortnite-distance-calculator', 'fortnite-damage-calculator', 'fortnite-battle-pass-calculator']
  },

  // ==========================================
  // POKÉMON GO TOOLS (10 TOOLS)
  // ==========================================

  // 38. Pokémon GO CP Calculator
  {
    id: 'pokemon-go-cp-calculator',
    slug: 'pokemon-go-cp-calculator',
    name: 'Pokémon GO CP Calculator',
    gameId: 'pokemongo',
    categoryId: 'calculators',
    icon: 'Sparkles',
    shortDescription: 'Calculate exact Combat Power (CP) for any Pokémon from Base Stats, IV appraisal (0–15), and Level (1–51).',
    description: 'Accurate Combat Power (CP) calculator using official Niantic CPM (CP Multiplier) curves. Simulates precise CP, HP, appraisal star ratings, and max Level 50/51 CP for any Pokémon species.',
    badge: 'Core Tool',
    rating: 4.98,
    reviewsCount: 4210,
    userCount: '150k+ trainers',
    featured: true,
    tags: ['pokemon go', 'cp calculator', 'combat power', 'iv', 'level', 'cpm', 'base stats'],
    seoTitle: 'Pokémon GO CP Calculator – Exact Combat Power Formula',
    metaDescription: 'Calculate exact Pokémon GO CP from Level 1 to 51 with IV appraisals, official CPM multipliers, base stats, and HP calculations.',
    h1: 'Pokémon GO CP Calculator (Official Niantic CPM Formula)',
    canonicalPath: '/tools/pokemon-go-cp-calculator',
    howToGuide: {
      overview: 'Predict exact CP for any Pokémon based on IVs and level.',
      steps: [
        { title: 'Select Pokémon', description: 'Search and choose any species from the database.' },
        { title: 'Set Level & IVs', description: 'Adjust the Level slider (1–50) and your Appraisal Attack, Defense, and Stamina IVs (0–15).' },
        { title: 'View Exact CP & Stats', description: 'See calculated CP, actual HP pool, and 0★ to 4★ Hundo ratings.' }
      ]
    },
    formulaExplained: {
      title: 'Official Pokémon GO CP Equation',
      details: 'Combat Power is computed using total stats scaled by the level\'s CPM (CP Multiplier):\nCP = Floor( (BaseAtk + IvAtk) × Sqrt(BaseDef + IvDef) × Sqrt(BaseSta + IvSta) × CPM² / 10 )',
      mathSnippet: 'CP = Floor( (Atk × √Def × √Sta × CPM²) / 10 )'
    },
    faqs: [
      { question: 'What is the highest possible CP in Pokémon GO?', answer: 'Slaking and Mega Rayquaza / Primal Groudon / Kyogre possess the highest theoretical CP values, exceeding 5,000+ CP at Level 50.' }
    ],
    proTips: [
      'Level 50 requires Trainer Level 40+ and 296 Candy XL. Level 51 is achieved via Best Buddy boost.'
    ],
    relatedToolIds: ['pokemon-go-iv-calculator', 'pokemon-go-evolution-cp-calculator', 'pokemon-go-level-calculator']
  },

  // 39. Pokémon GO IV Calculator
  {
    id: 'pokemon-go-iv-calculator',
    slug: 'pokemon-go-iv-calculator',
    name: 'Pokémon GO IV Calculator & Appraisal Evaluator',
    gameId: 'pokemongo',
    categoryId: 'calculators',
    icon: 'Award',
    shortDescription: 'Appraise Pokémon IV percentages (0% to 100% Hundo), star ratings, and stat breakdown.',
    description: 'Determine exact Individual Value (IV) percentages from the in-game appraisal 3-bar system (Attack, Defense, Stamina). Evaluate whether your Pokémon is a 4★ Hundo, 3★ Raid Counter, or PvP Rank 1.',
    badge: 'Popular',
    rating: 4.97,
    reviewsCount: 3890,
    userCount: '135k+ trainers',
    featured: true,
    tags: ['pokemon go', 'iv calculator', 'hundo', 'appraisal', 'star rating', 'individual values'],
    seoTitle: 'Pokémon GO IV Calculator – Appraisal & 100% Hundo Evaluator',
    metaDescription: 'Calculate Pokémon GO IV percentage from the appraisal bar. Verify 100% IV Hundos, 0% Nundos, and 3-star raid counters.',
    h1: 'Pokémon GO IV Calculator & In-Game Appraisal Evaluator',
    canonicalPath: '/tools/pokemon-go-iv-calculator',
    howToGuide: {
      overview: 'Map the in-game 3-bar appraisal to exact IV percentages and star tiers.',
      steps: [
        { title: 'Check In-Game Appraisal', description: 'Tap Appraise in Pokémon GO to view the 3 colored stat bars.' },
        { title: 'Match Sliders', description: 'Each bar has 3 segments (0–5, 6–10, 11–15). Match the Attack, Defense, and HP bars.' },
        { title: 'Get Rating', description: 'See your IV score out of 45, IV percentage, and competitive rating.' }
      ]
    },
    formulaExplained: {
      title: 'IV Percentage Calculation',
      details: 'IV Percentage = ( (Atk_IV + Def_IV + Sta_IV) / 45 ) × 100%\n• 45/45 = 100% (4★ Hundo)\n• 37-44/45 = 82.2% - 97.8% (3★)\n• 30-36/45 = 66.7% - 80.0% (2★)',
      mathSnippet: 'IV% = (IV_Sum / 45) × 100'
    },
    faqs: [
      { question: 'What is a Hundo and a Nundo?', answer: 'A "Hundo" is a 100% IV Pokémon with 15/15/15 stats (4★). A "Nundo" is an ultra-rare 0/0/0 IV Pokémon (0★).' }
    ],
    proTips: [
      'Lucky Pokémon have an IV floor of 12/12/12 (minimum 80% IV), making them prime candidates for cheap maxing.'
    ],
    relatedToolIds: ['pokemon-go-cp-calculator', 'pokemon-go-pvp-calculator', 'pokemon-go-evolution-cp-calculator']
  },

  // 40. Pokémon GO Evolution CP Calculator
  {
    id: 'pokemon-go-evolution-cp-calculator',
    slug: 'pokemon-go-evolution-cp-calculator',
    name: 'Pokémon GO Evolution CP Calculator',
    gameId: 'pokemongo',
    categoryId: 'calculators',
    icon: 'Sparkles',
    shortDescription: 'Predict exact post-evolution CP and candy costs before evolving any base Pokémon.',
    description: 'Accurate evolution CP forecast tool. Calculates exact resulting Combat Power for 2-stage and 3-stage evolution families (e.g. Charmander → Charmeleon → Charizard, Magikarp → Gyarados), evolution multipliers, and PvP league eligibility check.',
    badge: 'Essential',
    rating: 4.95,
    reviewsCount: 3120,
    userCount: '110k+ trainers',
    featured: false,
    tags: ['pokemon go', 'evolution cp calculator', 'evolve', 'candy cost', 'gyarados', 'charizard'],
    seoTitle: 'Pokémon GO Evolution CP Calculator – Predict Evolved CP',
    metaDescription: 'Predict exact post-evolution CP in Pokémon GO before evolving. Check 2-stage and 3-stage evolution chains and Great/Ultra League eligibility.',
    h1: 'Pokémon GO Evolution CP Calculator & Multiplier Predictor',
    canonicalPath: '/tools/pokemon-go-evolution-cp-calculator',
    howToGuide: {
      overview: 'Forecast the final CP of any evolved Pokémon before spending evolution Candies.',
      steps: [
        { title: 'Choose Base Pokémon', description: 'Select any evolvable species from Charmander to Magikarp.' },
        { title: 'Set Current Level & IVs', description: 'Input your Pokémon\'s current level and appraisal IVs.' },
        { title: 'Check Results', description: 'View the exact resulting CP for Stage 1 and Stage 2 evolutions and PvP league limits.' }
      ]
    },
    formulaExplained: {
      title: 'Evolution CP Formula',
      details: 'Since IVs and Level are strictly preserved through evolution, the evolved CP is calculated by substituting the evolved species\' higher base stats into the standard CP formula at the same level.',
      mathSnippet: 'CP_Evolved = Floor( (BaseAtk_Evolved + IvAtk) × √(BaseDef_Evolved + IvDef) × √(BaseSta_Evolved + IvSta) × CPM² / 10 )'
    },
    faqs: [
      { question: 'Do IVs change when evolving a Pokémon?', answer: 'No! Individual Values (IVs) and the Pokémon\'s level remain 100% identical upon evolution.' }
    ],
    proTips: [
      'Check if your evolved Pokémon will stay under 1,500 CP before evolving for Great League PvP!'
    ],
    relatedToolIds: ['pokemon-go-cp-calculator', 'pokemon-go-pvp-calculator', 'pokemon-go-candy-calculator']
  },

  // 41. Pokémon GO Level Calculator
  {
    id: 'pokemon-go-level-calculator',
    slug: 'pokemon-go-level-calculator',
    name: 'Pokémon GO Level & Arc Step Calculator',
    gameId: 'pokemongo',
    categoryId: 'calculators',
    icon: 'Layers',
    shortDescription: 'Determine exact Pokémon level from arc stardust cost and compute power-up milestones to Level 50.',
    description: 'Find your Pokémon\'s exact half-level (Level 1.0 to 50.0) by matching its power-up stardust cost. Calculates total button taps, CPM multiplier increases, and effective combat stat growth.',
    badge: 'Utility',
    rating: 4.93,
    reviewsCount: 2670,
    userCount: '95k+ trainers',
    featured: false,
    tags: ['pokemon go', 'level calculator', 'arc position', 'power up steps', 'cpm', 'stardust cost'],
    seoTitle: 'Pokémon GO Level Calculator – Arc Stardust & Level Finder',
    metaDescription: 'Find Pokémon GO level from power-up stardust costs and calculate required half-level power-up steps to reach Level 40 and Level 50.',
    h1: 'Pokémon GO Level Finder & Power-Up Step Calculator',
    canonicalPath: '/tools/pokemon-go-level-calculator',
    howToGuide: {
      overview: 'Identify exact Pokémon level from its power-up button stardust cost and plan leveling steps.',
      steps: [
        { title: 'Choose Variant', description: 'Select Regular, Lucky, Shadow, or Purified.' },
        { title: 'Input Current Level or Stardust Cost', description: 'Use the arc check dropdown to find your level bracket.' },
        { title: 'Set Target Level', description: 'Choose Level 30, 40, or 50 to see exact steps, candies, and stardust.' }
      ]
    },
    formulaExplained: {
      title: 'Level & CPM Relationship',
      details: 'Each power-up advances the Pokémon by 0.5 levels. Between Level 1 and 30, CPM grows rapidly (~0.01 per level). Beyond Level 30, diminishing returns reduce CPM growth to ~0.004 per level.',
      mathSnippet: 'Level_Target = Level_Start + (PowerUp_Taps × 0.5)'
    },
    faqs: [
      { question: 'Why is Level 30 considered the soft cap?', answer: 'Power-ups past Level 30 grant half the stat bonus per power-up while stardust costs double, making Level 30 the most cost-effective raid threshold.' }
    ],
    proTips: [
      'Powering up Pokémon from Level 30 to 40 costs 150k dust for only ~10% more damage output.'
    ],
    relatedToolIds: ['pokemon-go-stardust-calculator', 'pokemon-go-power-up-cost-calculator', 'pokemon-go-candy-calculator']
  },

  // 42. Pokémon GO Stardust Calculator
  {
    id: 'pokemon-go-stardust-calculator',
    slug: 'pokemon-go-stardust-calculator',
    name: 'Pokémon GO Stardust & Raid Team Budget Planner',
    gameId: 'pokemongo',
    categoryId: 'planners',
    icon: 'Sparkles',
    shortDescription: 'Plan total stardust and second-move budgets across multiple Pokémon with Lucky & Shadow modifiers.',
    description: 'Comprehensive stardust budgeting tool. Build a queue of multiple Pokémon across Lucky (50% off), Shadow (+20% cost), and Purified statuses with 2nd charged attack costs and catch grinding estimators with Star Piece active.',
    badge: 'Planner',
    rating: 4.96,
    reviewsCount: 3410,
    userCount: '120k+ trainers',
    featured: true,
    tags: ['pokemon go', 'stardust calculator', 'stardust planner', 'lucky pokemon', 'shadow pokemon', 'second move'],
    seoTitle: 'Pokémon GO Stardust Calculator – Team Budget & Farming Planner',
    metaDescription: 'Calculate total Stardust required for multiple Pokémon power-ups, second charged attacks, Lucky 50% discounts, and Star Piece farming requirements.',
    h1: 'Pokémon GO Stardust Budget Planner & Multi-Pokémon Calculator',
    canonicalPath: '/tools/pokemon-go-stardust-calculator',
    howToGuide: {
      overview: 'Manage your stardust budget for an entire raid party or 3-man Great League team.',
      steps: [
        { title: 'Add Pokémon to Queue', description: 'Enter Pokémon name, starting level, target level, and variant.' },
        { title: 'Toggle 2nd Charged Move', description: 'Include 10k, 50k, 75k, or 100k stardust second attack unlocks.' },
        { title: 'Check Farming Requirements', description: 'See how many wild catches with or without Star Piece are needed to fund your team.' }
      ]
    },
    formulaExplained: {
      title: 'Stardust Investment Formulas',
      details: '• Standard: Sum of step costs from POWER_UP_COSTS table\n• Lucky: Total_Dust × 0.50 (50% Discount)\n• Shadow: Total_Dust × 1.20 (+20% Premium)\n• Purified: Total_Dust × 0.90 (10% Discount)',
      mathSnippet: 'Grand_Total = Σ(PowerUp_Dust) + Σ(SecondMove_Dust)'
    },
    faqs: [
      { question: 'How much stardust does it take to max a Pokémon from Level 1 to 50?', answer: 'A regular Pokémon requires exactly 475,000 Stardust and 296 XL Candy. A Lucky Pokémon costs only 237,500 Stardust.' }
    ],
    proTips: [
      'Save high-stardust evolutions and catches for 3x Catch Stardust Community Days with an active Star Piece!'
    ],
    relatedToolIds: ['pokemon-go-power-up-cost-calculator', 'pokemon-go-level-calculator', 'pokemon-go-candy-calculator']
  },

  // 43. Pokémon GO Candy Calculator
  {
    id: 'pokemon-go-candy-calculator',
    slug: 'pokemon-go-candy-calculator',
    name: 'Pokémon GO Candy & XL Walking Calculator',
    gameId: 'pokemongo',
    categoryId: 'calculators',
    icon: 'Box',
    shortDescription: 'Convert Regular Candy to XL (100:1), calculate transfer gains, and compute Buddy walking distance.',
    description: 'Calculate total Regular Candy to XL Candy conversions, transfer spotlight hour gains, and buddy walking distances (with Poffin half-distance modifiers) to reach the 296 XL Candy threshold for Level 50.',
    badge: 'Optimizer',
    rating: 4.94,
    reviewsCount: 2850,
    userCount: '98k+ trainers',
    featured: false,
    tags: ['pokemon go', 'candy calculator', 'xl candy', 'candy conversion', 'buddy distance', 'poffin'],
    seoTitle: 'Pokémon GO Candy & XL Calculator – Conversion & Buddy Distance',
    metaDescription: 'Convert 100 Regular Candies to 1 XL Candy, optimize 2x transfer events, and calculate exact Buddy walking distance for Level 50 maxing.',
    h1: 'Pokémon GO Candy & Candy XL Conversion & Walking Calculator',
    canonicalPath: '/tools/pokemon-go-candy-calculator',
    howToGuide: {
      overview: 'Plan candy acquisition through inventory transfers, 100:1 XL conversions, and buddy walking.',
      steps: [
        { title: 'Input Current Candies', description: 'Enter current Regular Candy and XL Candy inventory.' },
        { title: 'Add Transfer Storage', description: 'Enter extra Pokémon to transfer with optional 2x spotlight hour event bonus.' },
        { title: 'Calculate Walking Plan', description: 'Select 1km, 3km, 5km, or 20km buddy distance with Poffin excited mood.' }
      ]
    },
    formulaExplained: {
      title: 'Candy Conversion & Walking Formula',
      details: '• 100 Regular Candies = 1 Candy XL\n• At Level 31+ Buddy Pokémon, the drop rate for XL Candy per completed walk cycle is ~75%.\n• Total Km = (XL_Needed / 0.75) × Effective_Km_Per_Cycle',
      mathSnippet: 'XL_Total = Current_XL + Floor(Total_Candy / 100)'
    },
    faqs: [
      { question: 'When should I convert Regular Candy to XL Candy?', answer: 'Only convert when you have excess thousands of candies for non-legendary Pokémon, as the 100:1 ratio is expensive.' }
    ],
    proTips: [
      'Level up your Mega Pokémon to Mega Level 3 to gain +2 bonus Regular Candies and a high chance of Candy XL on every matching catch!'
    ],
    relatedToolIds: ['pokemon-go-stardust-calculator', 'pokemon-go-power-up-cost-calculator', 'pokemon-go-level-calculator']
  },

  // 44. Pokémon GO Power-Up Cost Calculator
  {
    id: 'pokemon-go-power-up-cost-calculator',
    slug: 'pokemon-go-power-up-cost-calculator',
    name: 'Pokémon GO Power-Up Cost & Step Matrix',
    gameId: 'pokemongo',
    categoryId: 'planners',
    icon: 'Layers',
    shortDescription: 'Detailed step-by-step cost table from any level to target level with Lucky, Shadow, and Purified rates.',
    description: 'View the complete power-up ledger from Level 1.0 to Level 50.0. Break down exact Stardust, Regular Candy, and XL Candy per half-level step with quick preset shortcuts for Raid catches (Level 20/25) to Level 40/50.',
    badge: 'Matrix',
    rating: 4.97,
    reviewsCount: 3620,
    userCount: '130k+ trainers',
    featured: false,
    tags: ['pokemon go', 'power up cost calculator', 'power up table', 'stardust matrix', 'xl candy cost'],
    seoTitle: 'Pokémon GO Power-Up Cost Calculator – Step-by-Step Ledger',
    metaDescription: 'Complete step-by-step Pokémon GO power-up cost matrix for Levels 1 to 50 with Lucky, Shadow, and Purified multipliers.',
    h1: 'Pokémon GO Power-Up Cost & Level Step Matrix Calculator',
    canonicalPath: '/tools/pokemon-go-power-up-cost-calculator',
    howToGuide: {
      overview: 'Inspect the full ledger of stardust and candy per half-level step.',
      steps: [
        { title: 'Select Variant', description: 'Choose Regular, Lucky, Shadow, or Purified.' },
        { title: 'Use Quick Presets or Sliders', description: 'Pick Raid Level 20 → 40, Boosted 25 → 50, or custom sliders.' },
        { title: 'Review Ledger Table', description: 'Inspect the detailed scrollable table showing every half-level cost.' }
      ]
    },
    formulaExplained: {
      title: 'Power-Up Step Cost Mechanics',
      details: 'Power-up costs increase in tiers every 2 full levels. Tiers range from 200 dust / 1 candy (Lvl 1-2.5) up to 15,000 dust / 20 XL candy (Lvl 49.5-50.0).',
      mathSnippet: 'Total_Cost = Σ Step_Costs(Level_Start ... Level_End)'
    },
    faqs: [
      { question: 'How much cheaper are Lucky Pokémon to power up?', answer: 'Lucky Pokémon require exactly 50% less Stardust across all levels 1 through 50 (Candy and XL Candy requirements remain normal).' }
    ],
    proTips: [
      'Trading with a Lucky Friend guarantees both traded Pokémon become Lucky with 12/12/12 minimum IVs and half stardust costs.'
    ],
    relatedToolIds: ['pokemon-go-stardust-calculator', 'pokemon-go-candy-calculator', 'pokemon-go-level-calculator']
  },

  // 45. Pokémon GO Raid Damage Calculator
  {
    id: 'pokemon-go-raid-damage-calculator',
    slug: 'pokemon-go-raid-damage-calculator',
    name: 'Pokémon GO Raid Boss Damage & TTW Calculator',
    gameId: 'pokemongo',
    categoryId: 'calculators',
    icon: 'Sword',
    shortDescription: 'Simulate Raid Boss TTW (Time-To-Win), lobby DPS, Weather Boost, Best Friend buffs, and party size.',
    description: 'Realistic raid battle simulator across Tier 1, Tier 3, Tier 5 Legendary, Mega, and Elite Raids. Computes total team DPS output, Time-To-Win (TTW), solo viability, and minimum required trainer count.',
    badge: 'Raids',
    rating: 4.96,
    reviewsCount: 3940,
    userCount: '142k+ trainers',
    featured: true,
    tags: ['pokemon go', 'raid calculator', 'raid damage', 'time to win', 'solo raid', 'legendary raid'],
    seoTitle: 'Pokémon GO Raid Damage Calculator – TTW & Solo Difficulty',
    metaDescription: 'Simulate Pokémon GO raid boss damage, Time-To-Win (TTW), weather boosts, Best Friend attack bonuses, and minimum party size.',
    h1: 'Pokémon GO Raid Boss Damage & Time-To-Win Simulator',
    canonicalPath: '/tools/pokemon-go-raid-damage-calculator',
    howToGuide: {
      overview: 'Simulate whether your lobby has enough firepower to defeat a Tier 5 Legendary or Mega Boss before the timer expires.',
      steps: [
        { title: 'Select Raid Boss Tier', description: 'Choose Tier 1, Tier 3, Tier 5 (15k HP), Mega (22.5k HP), or Elite Raid.' },
        { title: 'Set Party Size & DPS', description: 'Input number of trainers and their average counter DPS.' },
        { title: 'Enable Combat Buffs', description: 'Toggle Weather Boost (+20%), Mega boost (+10%), and Best Friend (+10%) damage.' }
      ]
    },
    formulaExplained: {
      title: 'Time-To-Win Equation',
      details: '• Team_DPS = Single_Trainer_DPS × Multipliers × Trainer_Count\n• TTW = Boss_HP / Team_DPS\n• If TTW ≤ Boss_Time_Limit (180s or 300s), the raid is victorious.',
      mathSnippet: 'TTW = Boss_HP / (DPS × Boosts × Trainers)'
    },
    faqs: [
      { question: 'Can Tier 5 Legendary Raids be soloed?', answer: 'Certain Tier 5 bosses with double weaknesses (e.g. Rayquaza vs Ice, Kartana vs Fire, Guzzlord vs Fairy) can be soloed with maxed Level 50 shadow/mega counters and weather boost.' }
    ],
    proTips: [
      'Always coordinate with Best Friends for an automatic +10% passive attack multiplier in raid lobbies.'
    ],
    relatedToolIds: ['pokemon-go-catch-cp-calculator', 'pokemon-go-cp-calculator', 'pokemon-go-power-up-cost-calculator']
  },

  // 46. Pokémon GO PvP Calculator
  {
    id: 'pokemon-go-pvp-calculator',
    slug: 'pokemon-go-pvp-calculator',
    name: 'Pokémon GO PvP IV & Stat Product Calculator',
    gameId: 'pokemongo',
    categoryId: 'calculators',
    icon: 'Trophy',
    shortDescription: 'Find #1 Rank PvP IV spreads and stat products for Great League (1500) and Ultra League (2500).',
    description: 'Optimize your GO Battle League roster. Calculates stat products, max CP under the 1,500 CP and 2,500 CP caps, and evaluates your specific IV spread (e.g. 0/14/13) against the theoretical Rank #1 max bulk spread.',
    badge: 'PvP Meta',
    rating: 4.98,
    reviewsCount: 4520,
    userCount: '160k+ trainers',
    featured: true,
    tags: ['pokemon go', 'pvp calculator', 'great league', 'ultra league', 'stat product', 'pvp ivs', 'go battle league'],
    seoTitle: 'Pokémon GO PvP Calculator – Great & Ultra League Stat Product',
    metaDescription: 'Find optimal PvP IVs (0/15/15) and stat products for Pokémon GO Great League (1500 CP) and Ultra League (2500 CP).',
    h1: 'Pokémon GO PvP IV & Stat Product Optimizer (GBL)',
    canonicalPath: '/tools/pokemon-go-pvp-calculator',
    howToGuide: {
      overview: 'Discover why low Attack IVs make Pokémon significantly stronger in CP-capped leagues.',
      steps: [
        { title: 'Select League', description: 'Choose Great League (1,500 CP), Ultra League (2,500 CP), or Master League.' },
        { title: 'Pick Pokémon Species', description: 'Search and select meta species like Swampert, Lucario, or Umbreon.' },
        { title: 'Compare Stat Product', description: 'Input your appraisal IVs and see how close you are to the #1 Rank build.' }
      ]
    },
    formulaExplained: {
      title: 'PvP Stat Product Formula',
      details: '• Stat_Product = Attack × Defense × HP\n• Because Attack is weighted twice as heavily in the CP formula, a lower Attack IV allows the Pokémon to reach a higher level under the CP cap, resulting in vastly higher bulk (Defense × HP).',
      mathSnippet: 'Stat_Product = (BaseAtk+IvAtk) × (BaseDef+IvDef) × (BaseSta+IvSta) × CPM³'
    },
    faqs: [
      { question: 'Why is 0/15/15 better than 15/15/15 in Great League?', answer: 'Attack raises CP much faster than Defense or HP. Having 0 Attack lets you power up 2 to 4 extra times, gaining massive HP and Defense bulk while staying under 1500 CP.' }
    ],
    proTips: [
      'In Master League (no CP cap), the best IV is always 15/15/15 (100% Hundo) at Level 50.'
    ],
    relatedToolIds: ['pokemon-go-cp-calculator', 'pokemon-go-iv-calculator', 'pokemon-go-evolution-cp-calculator']
  },

  // 47. Pokémon GO Catch CP Calculator
  {
    id: 'pokemon-go-catch-cp-calculator',
    slug: 'pokemon-go-catch-cp-calculator',
    name: 'Pokémon GO Catch CP & Catch Rate Calculator',
    gameId: 'pokemongo',
    categoryId: 'calculators',
    icon: 'Target',
    shortDescription: 'Check 100% IV Hundo CP ranges for Raid catches (Level 20/25) and calculate single-throw catch probabilities.',
    description: 'Verify 100% IV catch CP values for Raid bosses (Level 20 normal, Level 25 weather boosted), Research breakthroughs (Level 15), and simulate single-throw catch chances with Golden Razz berries, Ultra/Premier balls, and Excellent curveballs.',
    badge: 'Hundo Radar',
    rating: 4.97,
    reviewsCount: 3740,
    userCount: '138k+ trainers',
    featured: true,
    tags: ['pokemon go', 'catch cp calculator', 'hundo cp', 'raid catch cp', 'catch probability', 'golden razz', 'curveball'],
    seoTitle: 'Pokémon GO Catch CP Calculator – Raid Hundo CP & Catch Rates',
    metaDescription: 'Check exact 100% IV Hundo CP ranges for Level 20 & 25 Raid Bosses and calculate single-throw catch probabilities with berries and curveballs.',
    h1: 'Pokémon GO Catch CP Ranges & Catch Probability Simulator',
    canonicalPath: '/tools/pokemon-go-catch-cp-calculator',
    howToGuide: {
      overview: 'Know if your raid boss is a 100% IV Hundo before throwing your first Premier Ball.',
      steps: [
        { title: 'Search Encounter Pokémon', description: 'Choose legendary raid bosses or wild species.' },
        { title: 'Check Encounter CP Table', description: 'Compare the CP on your screen to the Level 20, Level 25 Boosted, and Level 15 ranges.' },
        { title: 'Optimize Catch Rate', description: 'Configure Golden Razz, Ultra/Premier ball, and Excellent curveball to see your percentage.' }
      ]
    },
    formulaExplained: {
      title: 'Niantic Catch Probability Equation',
      details: '• Base Modified Rate: r = 1 - (1 - BaseCapture / (2 × CPM))^Multiplier\n• Multiplier = Ball × Berry × Curve (1.7) × Throw (1.85) × Platinum Medal (1.4)',
      mathSnippet: 'Catch_Rate = 1 - (1 - BCR / 2×CPM)^(Ball × Berry × Curve × Throw × Medal)'
    },
    faqs: [
      { question: 'What does Weather Boost do to raid boss CP?', answer: 'Weather boost increases the raid encounter from Level 20 to Level 25, granting ~500+ higher CP and saving you 31,000 Stardust and 28 Candies.' }
    ],
    proTips: [
      'Use the "Circle Lock" trick to consistently land Excellent Curveball throws on legendary raid bosses.'
    ],
    relatedToolIds: ['pokemon-go-raid-damage-calculator', 'pokemon-go-cp-calculator', 'pokemon-go-iv-calculator']
  },

  // ==========================================
  // PALWORLD TOOLS (12 TOOLS)
  // ==========================================

  // 48. Palworld Breeding Calculator
  {
    id: 'palworld-breeding-calculator',
    slug: 'palworld-breeding-calculator',
    name: 'Palworld Breeding Calculator (Parent A + B → Child)',
    gameId: 'palworld',
    categoryId: 'calculators',
    icon: 'Heart',
    shortDescription: 'Calculate egg offspring from any two parent Pals using official CombiRank breeding power and unique special combos.',
    description: 'Accurate Palworld breeding calculator supporting standard CombiRank power averaging, 100% verified special unique pairs (e.g., Suzaku + Relaxaurus = Astegon, Penking + Bushi = Anubis), and base stat / work suitability previews.',
    badge: 'Core Tool',
    rating: 4.99,
    reviewsCount: 5120,
    userCount: '185k+ trainers',
    featured: true,
    tags: ['palworld', 'breeding calculator', 'combirank', 'pal breeding', 'special combos', 'anubis breeding', 'egg incubator'],
    seoTitle: 'Palworld Breeding Calculator – Official CombiRank & Special Combos',
    metaDescription: 'Calculate exact Palworld breeding egg offspring from Parent A and B. Includes all verified CombiRanks and special unique breeding recipes.',
    h1: 'Palworld Breeding Calculator (Parent A + B → Child Outcome)',
    canonicalPath: '/tools/palworld-breeding-calculator',
    howToGuide: {
      overview: 'Combine any two Pals in the Breeding Farm with Cake to hatch your desired Pal.',
      steps: [
        { title: 'Select Parent A & Parent B', description: 'Search and pick any male and female Pals in your collection.' },
        { title: 'Check Egg Outcome', description: 'View the resulting Pal offspring, element types, and base work suitabilities.' },
        { title: 'Review Special Combos', description: 'See if your pair triggers a unique fixed recipe override.' }
      ]
    },
    formulaExplained: {
      title: 'Official Palworld CombiRank Formula',
      details: 'Child Breeding Power = Floor((BreedingPower_A + BreedingPower_B + 1) / 2)\nThe resulting egg hatches the Pal with the closest CombiRank to this average, unless a fixed special recipe exists.',
      mathSnippet: 'Child_Power = Floor((Power_A + Power_B + 1) / 2)'
    },
    faqs: [
      { question: 'What is the fastest way to breed Anubis early game?', answer: 'Breed a Penking (from the level 15 Sealed Realm) with a Bushi (from the level 23 Sealed Realm) to get an Anubis at level 19.' }
    ],
    proTips: [
      'Bake Cakes in advance using a Kindling Lv. 4 Pal like Jormuntide Ignis to continuously produce eggs without downtime.'
    ],
    relatedToolIds: ['palworld-reverse-breeding-calculator', 'palworld-breeding-path-finder', 'palworld-iv-calculator']
  },

  // 49. Palworld Reverse Breeding Calculator
  {
    id: 'palworld-reverse-breeding-calculator',
    slug: 'palworld-reverse-breeding-calculator',
    name: 'Palworld Reverse Breeding Calculator (Target Pal → Parents)',
    gameId: 'palworld',
    categoryId: 'calculators',
    icon: 'Sparkles',
    shortDescription: 'Find all possible parent breeding combinations and special recipes that hatch your target Pal.',
    description: 'Reverse look up every valid parent pair in Palworld that produces your desired Pal. Filter by special unique combinations or standard CombiRank averages to find combinations from Pals you already own.',
    badge: 'Popular',
    rating: 4.98,
    reviewsCount: 4620,
    userCount: '165k+ trainers',
    featured: true,
    tags: ['palworld', 'reverse breeding', 'target pal', 'parent combos', 'breeding recipes', 'anubis parents'],
    seoTitle: 'Palworld Reverse Breeding Calculator – Target Pal to Parent Pairs',
    metaDescription: 'Find all parent combinations that produce any target Pal in Palworld. Includes special unique recipes and CombiRank reverse lookup.',
    h1: 'Palworld Reverse Breeding Calculator (Find Parent Pairs)',
    canonicalPath: '/tools/palworld-reverse-breeding-calculator',
    howToGuide: {
      overview: 'Search for any target Pal to see which parents in your Palbox can breed it.',
      steps: [
        { title: 'Choose Target Goal Pal', description: 'Select Anubis, Jetragon, Shadowbeak, Lyleen, or any target Pal.' },
        { title: 'Inspect Parent Combos', description: 'Browse all valid parent pairs sorted by breeding power.' },
        { title: 'Toggle Special Combos', description: 'Filter exclusively for unique fixed recipes.' }
      ]
    },
    formulaExplained: {
      title: 'Reverse CombiRank Matching',
      details: 'Evaluates all permutations where Floor((Power_A + Power_B + 1)/2) maps closest to the target Pal\'s breeding power, plus all hardcoded special pairs.',
      mathSnippet: 'Find (A, B) such that Closest(Floor((Power_A + Power_B + 1)/2)) = Target'
    },
    faqs: [
      { question: 'Can Legendary Pals like Jetragon or Frostallion be bred from non-legendary parents?', answer: 'No. True Legendaries (Jetragon, Frostallion, Paladius, Necromus) can only be bred by pairing two of the exact same Legendary species.' }
    ],
    proTips: [
      'Catch high-level wild Boss Pals to unlock easier breeding combinations for rare high-tier Pals.'
    ],
    relatedToolIds: ['palworld-breeding-calculator', 'palworld-breeding-path-finder', 'palworld-work-speed-calculator']
  },

  // 50. Palworld Breeding Path Finder
  {
    id: 'palworld-breeding-path-finder',
    slug: 'palworld-breeding-path-finder',
    name: 'Palworld Breeding Path & Trait Chain Finder',
    gameId: 'palworld',
    categoryId: 'planners',
    icon: 'GitMerge',
    shortDescription: 'Find the shortest 1-step and 2-step breeding chains to transfer god passives from early Pals to end-game Pals.',
    description: 'Multi-generational breeding tree finder. Discover the fastest route to bridge passive skills (like Artisan, Swift, Musclehead, or Runner) from early starter Pals (Lamball, Chikipi, Cattiva) all the way to late-game meta Pals.',
    badge: 'Genetic Tree',
    rating: 4.97,
    reviewsCount: 3950,
    userCount: '140k+ trainers',
    featured: true,
    tags: ['palworld', 'breeding path finder', 'trait passing', 'breeding tree', 'god traits', 'breeding chain'],
    seoTitle: 'Palworld Breeding Path Finder – Shortest Breeding Chains & Trees',
    metaDescription: 'Find multi-step breeding paths to transfer passive traits from starter Pals to end-game meta Pals in Palworld.',
    h1: 'Palworld Breeding Path & Trait Tree Finder',
    canonicalPath: '/tools/palworld-breeding-path-finder',
    howToGuide: {
      overview: 'Route genetic passives across multiple generations to breed perfect endgame Pals.',
      steps: [
        { title: 'Select Starting Pal', description: 'Choose your starter Pal that holds good passive traits.' },
        { title: 'Select Target Goal Pal', description: 'Choose the final Pal you want to hatch with those traits.' },
        { title: 'Follow the Breeding Chain', description: 'View step-by-step intermediate pairings to reach the goal.' }
      ]
    },
    formulaExplained: {
      title: 'Multi-Step Breeding Graph',
      details: 'Traverses the Palworld breeding graph using breadth-first search (BFS) to find optimal 1-step and 2-step CombiRank transitions.',
      mathSnippet: 'Path = StartPal → [IntermediatePal] → GoalPal'
    },
    faqs: [
      { question: 'How many passives can an egg inherit from its parents?', answer: 'An offspring can inherit up to 4 passive skills combined from both parents, with a small chance of rolling random mutations.' }
    ],
    proTips: [
      'Breed parents that only possess the exact 4 desired passives (and zero unwanted passives) for the highest chance of a 4-passive clean roll.'
    ],
    relatedToolIds: ['palworld-breeding-calculator', 'palworld-reverse-breeding-calculator', 'palworld-iv-calculator']
  },

  // 51. Palworld IV / Stats Calculator
  {
    id: 'palworld-iv-calculator',
    slug: 'palworld-iv-calculator',
    name: 'Palworld IV & Genetic Talent Calculator',
    gameId: 'palworld',
    categoryId: 'calculators',
    icon: 'Award',
    shortDescription: 'Calculate hidden 0% to 30% IV talent bonuses for HP, Attack, and Defense after subtracting passive buffs.',
    description: 'Calculate your Pal\'s hidden Individual Values (IVs / Talents) ranging from +0% to +30% across HP, Attack, and Defense. Accurately isolates passive skills (Musclehead, Ferocious, Burly Body, Legend) and Statue of Power soul upgrades.',
    badge: 'Genetics',
    rating: 4.96,
    reviewsCount: 3820,
    userCount: '135k+ trainers',
    featured: false,
    tags: ['palworld', 'iv calculator', 'talents', 'stat calculator', 'musclehead', 'ferocious', 'pal souls'],
    seoTitle: 'Palworld IV Calculator – 0% to 30% Genetic Talent Evaluator',
    metaDescription: 'Calculate exact Palworld IV talent percentages (+0% to +30%) for HP, Attack, and Defense after passive skill and statue soul deductions.',
    h1: 'Palworld IV & Genetic Talent Calculator',
    canonicalPath: '/tools/palworld-iv-calculator',
    howToGuide: {
      overview: 'Evaluate whether your hatched or captured Pal has god-tier 30/30/30 IVs.',
      steps: [
        { title: 'Select Pal & Level', description: 'Choose your Pal species and input its current level.' },
        { title: 'Input In-Game Stats', description: 'Enter HP, Attack, and Defense shown on your summary screen.' },
        { title: 'Select Passives & Souls', description: 'Select any active passive skills and Statue of Power soul upgrades to isolate raw IV talents.' }
      ]
    },
    formulaExplained: {
      title: 'Palworld Stat Scaling & IV Formula',
      details: 'Stat = (Base_Stat × Level_Scaling × (1 + IV_Talent / 100)) × Passive_Multipliers × Soul_Multiplier × Condensation_Multiplier',
      mathSnippet: 'IV% = (Raw_Stat / (Base × Scaling) - 1) × 100'
    },
    faqs: [
      { question: 'What is the maximum IV roll in Palworld?', answer: 'The maximum IV talent in Palworld is +30% bonus for HP, +30% Attack, and +30% Defense (known as a 100% 30/30/30 God Roll).' }
    ],
    proTips: [
      'Breeding two parents with 30% IVs gives the highest probability of hatching 30% IV offspring.'
    ],
    relatedToolIds: ['palworld-breeding-calculator', 'palworld-damage-calculator', 'palworld-condensation-calculator']
  },

  // 52. Palworld Damage Calculator
  {
    id: 'palworld-damage-calculator',
    slug: 'palworld-damage-calculator',
    name: 'Palworld Combat & Active Skill Damage Calculator',
    gameId: 'palworld',
    categoryId: 'calculators',
    icon: 'Sword',
    shortDescription: 'Simulate combat damage incorporating STAB, 2x elemental weaknesses, mounted buffs, and headshots.',
    description: 'Realistic Palworld combat and raid damage simulator. Computes damage output for player weapons and Pal active skills factoring in elemental advantages (2.0x super effective / 0.5x resisted), STAB same-type bonuses (+20%), mount elemental infusions (+50%), and critical headshots.',
    badge: 'Combat Math',
    rating: 4.95,
    reviewsCount: 3410,
    userCount: '125k+ trainers',
    featured: false,
    tags: ['palworld', 'damage calculator', 'combat damage', 'active skill power', 'elemental weakness', 'headshot damage'],
    seoTitle: 'Palworld Damage Calculator – Active Skills, Elements & Headshots',
    metaDescription: 'Calculate Palworld combat damage for weapons and Pal active skills with STAB, elemental weaknesses, mounted infusions, and critical hits.',
    h1: 'Palworld Combat & Active Skill Damage Simulator',
    canonicalPath: '/tools/palworld-damage-calculator',
    howToGuide: {
      overview: 'Calculate how much damage your team deals to Alpha Bosses and Tower Leaders.',
      steps: [
        { title: 'Input Attack & Skill Power', description: 'Enter your Pal or Player total Attack and the Active Skill Power (e.g., 140).' },
        { title: 'Set Target Defense', description: 'Input target boss defense.' },
        { title: 'Toggle Combat Buffs', description: 'Enable 2x elemental advantage, STAB (+20%), Mount Infusion (+50%), and Headshot multipliers.' }
      ]
    },
    formulaExplained: {
      title: 'Palworld Damage Calculation',
      details: 'Damage = (Attacker_Atk × Skill_Power / Target_Def) × 0.5 × Element_Multiplier × STAB × Mount_Bonus × Crit × Headshot',
      mathSnippet: 'DMG = (Atk × Power / Def) × 0.5 × Multipliers'
    },
    faqs: [
      { question: 'What elements counter what in Palworld?', answer: 'Fire counters Grass & Ice; Grass counters Ground; Ground counters Electric; Electric counters Water; Water counters Fire; Dragon counters Dark; Dark counters Neutral.' }
    ],
    proTips: [
      'Riding an elemental mount Pal converts your player weapon damage into elemental damage and boosts it by +50%.'
    ],
    relatedToolIds: ['palworld-iv-calculator', 'palworld-capture-calculator', 'palworld-work-speed-calculator']
  },

  // 53. Palworld Capture Chance Calculator
  {
    id: 'palworld-capture-calculator',
    slug: 'palworld-capture-calculator',
    name: 'Palworld Capture Chance & Sphere Calculator',
    gameId: 'palworld',
    categoryId: 'calculators',
    icon: 'Target',
    shortDescription: 'Calculate exact capture odds with Pal Sphere tiers, low HP scaling, status ailments, and Lifmunk Effigies.',
    description: 'Accurate Pal Sphere capture probability simulator. Calculates single-throw capture rates and cumulative throw requirements based on target remaining HP %, Pal Sphere power (Pal, Mega, Giga, Hyper, Ultra, Legendary, Ultimate), Lifmunk Effigy statue levels (0–10), status conditions (Frozen, Shocked, Asleep), and Back Attacks.',
    badge: 'Capture',
    rating: 4.97,
    reviewsCount: 4210,
    userCount: '150k+ trainers',
    featured: true,
    tags: ['palworld', 'capture calculator', 'catch rate', 'pal spheres', 'legendary sphere', 'lifmunk effigy', 'back attack'],
    seoTitle: 'Palworld Capture Chance Calculator – Pal Sphere & Catch Rate Math',
    metaDescription: 'Calculate exact Palworld capture probability for Pal Spheres with target HP %, Lifmunk statue bonuses, status effects, and back attacks.',
    h1: 'Palworld Capture Probability & Sphere Calculator',
    canonicalPath: '/tools/palworld-capture-calculator',
    howToGuide: {
      overview: 'Maximize your capture odds before wasting high-tier Legendary Spheres.',
      steps: [
        { title: 'Select Pal Sphere Tier', description: 'Choose Pal, Mega, Giga, Hyper, Ultra, Legendary, or Ultimate Sphere.' },
        { title: 'Set Target HP & Boss Tier', description: 'Adjust remaining target HP slider and boss difficulty.' },
        { title: 'Enable Catch Modifiers', description: 'Set your Lifmunk Effigy level (0–10), status effect, and Back Attack bonus.' }
      ]
    },
    formulaExplained: {
      title: 'Palworld Capture Formula',
      details: 'Catch_Rate = Base_Rate × Sphere_Power × (1 + (Max_HP - Current_HP)/Max_HP × 2.5) × Effigy_Buff × Status_Buff × Back_Bonus',
      mathSnippet: 'Rate = Base × Sphere × HP_Factor × Effigy × Status × Back'
    },
    faqs: [
      { question: 'Do Lifmunk Effigies increase capture chance?', answer: 'Yes! Upgrading your capture power at the Statue of Power using Lifmunk Effigies grants up to +50% capture multiplier at level 10.' }
    ],
    proTips: [
      'Sneaking behind an Alpha Boss or legendary Pal grants an automatic +25% Back Attack capture bonus.'
    ],
    relatedToolIds: ['palworld-damage-calculator', 'palworld-crafting-calculator', 'palworld-tech-point-calculator']
  },

  // 54. Palworld Work Speed Calculator
  {
    id: 'palworld-work-speed-calculator',
    slug: 'palworld-work-speed-calculator',
    name: 'Palworld Work Speed & Crafting Duration Calculator',
    gameId: 'palworld',
    categoryId: 'calculators',
    icon: 'Wrench',
    shortDescription: 'Calculate max work speed with Artisan (+50%), Work Slave (+30%), Serious (+20%), and Statue Souls.',
    description: 'Work speed optimization tool. Calculate total character work speed and task completion seconds across Handiwork, Mining, Kindling, and Crafting with the "God Worker" passive trait combination (Artisan + Work Slave + Serious + Conceited = +110%) and Statue of Power soul upgrades.',
    badge: 'God Worker',
    rating: 4.96,
    reviewsCount: 3780,
    userCount: '130k+ trainers',
    featured: false,
    tags: ['palworld', 'work speed calculator', 'artisan', 'work slave', 'serious', 'handiwork', 'anubis work speed'],
    seoTitle: 'Palworld Work Speed Calculator – Artisan & Crafting Speed Math',
    metaDescription: 'Calculate maximum Palworld Work Speed with Artisan, Work Slave, Serious, Conceited passives, and Statue of Power souls.',
    h1: 'Palworld Work Speed & Crafting Time Calculator',
    canonicalPath: '/tools/palworld-work-speed-calculator',
    howToGuide: {
      overview: 'Build the ultimate crafting Pal and calculate real-time production durations.',
      steps: [
        { title: 'Set Work Suitability Level', description: 'Choose Handiwork or Mining Lv. 1 to Lv. 5.' },
        { title: 'Select Work Passives', description: 'Toggle Artisan (+50%), Work Slave (+30%), Serious (+20%), and Conceited (+10%).' },
        { title: 'View Crafting Time', description: 'See effective units/sec and exact seconds to complete crafting jobs.' }
      ]
    },
    formulaExplained: {
      title: 'Work Speed & Suitability Scaling',
      details: '• Work Speed = Base × (1 + Passive_Bonuses + Soul_Bonuses)\n• Suitability Speed Multiplier = 3^(Suitability_Level - 1)\n• Completion Time = Task_Work_Units / Effective_Rate_Per_Second',
      mathSnippet: 'Rate = (WorkSpeed / 100) × 3^(Level - 1) × 2.5'
    },
    faqs: [
      { question: 'What is the highest possible Handiwork level in Palworld?', answer: 'Anubis has Base Handiwork Lv. 4. Through 4-star Pal Essence Condensation, its Handiwork increases to Lv. 5 (81x base speed).' }
    ],
    proTips: [
      'Feed your base workers Salads (+30% Work Speed for 10 minutes) for a huge passive production boost.'
    ],
    relatedToolIds: ['palworld-base-team-calculator', 'palworld-crafting-calculator', 'palworld-material-calculator']
  },

  // 55. Palworld Base Team Calculator
  {
    id: 'palworld-base-team-calculator',
    slug: 'palworld-base-team-calculator',
    name: 'Palworld Base Team & Worker Suitability Calculator',
    gameId: 'palworld',
    categoryId: 'planners',
    icon: 'Users',
    shortDescription: 'Optimize your 15 to 20 Pal base roster to ensure max-tier coverage across all base work skills.',
    description: 'Base roster planner for Palworld. Build and balance your automated working team across 15–20 Pal base slots to ensure maximum tier coverage for Mining Lv. 4 (Astegon), Handiwork Lv. 4 (Anubis), Kindling Lv. 4 (Jormuntide Ignis), and Watering Lv. 4 (Jormuntide).',
    badge: 'Base Meta',
    rating: 4.97,
    reviewsCount: 4120,
    userCount: '145k+ trainers',
    featured: true,
    tags: ['palworld', 'base team calculator', 'base optimizer', 'anubis base', 'jormuntide ignis', 'mining base', 'automated base'],
    seoTitle: 'Palworld Base Team Calculator – 15-20 Worker Roster Optimizer',
    metaDescription: 'Optimize your 15 to 20 Pal base working roster in Palworld to ensure max coverage across Mining, Kindling, Watering, and Handiwork.',
    h1: 'Palworld Base Team & Worker Suitability Optimizer',
    canonicalPath: '/tools/palworld-base-team-calculator',
    howToGuide: {
      overview: 'Create a fully automated base that never runs out of ingots, cakes, or electricity.',
      steps: [
        { title: 'Set Base Capacity', description: 'Choose 15 Pals (Base Lv. 15) or 20 Pals (Base Lv. 20).' },
        { title: 'Assign Worker Pals', description: 'Add S-tier pals like Anubis, Jormuntide Ignis, Astegon, and Lyleen.' },
        { title: 'Check Skill Coverage', description: 'Ensure all 10 work suitabilities have high-tier active worker coverage.' }
      ]
    },
    formulaExplained: {
      title: 'Base Coverage Matrix',
      details: 'Aggregates all 10 work suitabilities across your assigned roster, highlighting peak skill levels and missing production capabilities.',
      mathSnippet: 'Max_Coverage = Max(Suitabilities across Assigned Pals)'
    },
    faqs: [
      { question: 'Which Pals are best for a dedicated mining base?', answer: 'Astegon and Blazamut possess Mining Lv. 4, allowing them to rapidly clear both Ore and Coal deposits without manual player intervention.' }
    ],
    proTips: [
      'Use Pals with nocturnal work habits (like Helzephyr or Astegon) so your base continues transporting and mining through the night.'
    ],
    relatedToolIds: ['palworld-work-speed-calculator', 'palworld-crafting-calculator', 'palworld-material-calculator']
  },

  // 56. Palworld Crafting Calculator
  {
    id: 'palworld-crafting-calculator',
    slug: 'palworld-crafting-calculator',
    name: 'Palworld Crafting & Batch Production Calculator',
    gameId: 'palworld',
    categoryId: 'planners',
    icon: 'Hammer',
    shortDescription: 'Calculate total raw materials and production time for crafting Spheres, Ammo, Armor, and Cakes.',
    description: 'Production queue and crafting timer calculator. Compute exact raw material requirements and completion time for batch crafting Legendary Spheres, Pal Metal Armor, Rocket Ammo, and Breeding Cakes with multiple Handiwork workers.',
    badge: 'Crafting',
    rating: 4.94,
    reviewsCount: 2950,
    userCount: '105k+ trainers',
    featured: false,
    tags: ['palworld', 'crafting calculator', 'batch crafting', 'legendary sphere crafting', 'cake crafting', 'ammo crafting'],
    seoTitle: 'Palworld Crafting Calculator – Batch Production & Craft Times',
    metaDescription: 'Calculate raw materials and crafting time for batch production in Palworld: Spheres, Pal Metal Armor, Ammo, and Breeding Cakes.',
    h1: 'Palworld Crafting & Batch Production Calculator',
    canonicalPath: '/tools/palworld-crafting-calculator',
    howToGuide: {
      overview: 'Plan batch crafting queues and determine how many Handiwork pals are needed to finish quickly.',
      steps: [
        { title: 'Select Blueprint', description: 'Choose Legendary Spheres, Pal Metal Armor, Rocket Ammo, or Cakes.' },
        { title: 'Set Batch Quantity', description: 'Enter how many items you want to produce.' },
        { title: 'Assign Handiwork Workforce', description: 'Set Handiwork level and number of helping Pals to calculate completion time.' }
      ]
    },
    formulaExplained: {
      title: 'Batch Production Equation',
      details: '• Total_Work_Units = Blueprint_Units × Quantity\n• Total_Team_Speed = Worker_Speed × Worker_Count\n• Craft_Time_Seconds = Total_Work_Units / Total_Team_Speed',
      mathSnippet: 'Time = (Units × Qty) / (Worker_Speed × Count)'
    },
    faqs: [
      { question: 'Why does Cake take so long to craft?', answer: 'Cake requires 2,000 work units. Using a Kindling Lv. 4 Pal (like Jormuntide Ignis) reduces baking time from over 15 minutes to under 30 seconds.' }
    ],
    proTips: [
      'Keep your crafting benches directly next to material storage chests to minimize Pal walking and transport delays.'
    ],
    relatedToolIds: ['palworld-material-calculator', 'palworld-work-speed-calculator', 'palworld-base-team-calculator']
  },

  // 57. Palworld Material Calculator
  {
    id: 'palworld-material-calculator',
    slug: 'palworld-material-calculator',
    name: 'Palworld Material & Resource Decomposition Calculator',
    gameId: 'palworld',
    categoryId: 'planners',
    icon: 'Box',
    shortDescription: 'Deconstruct Pal Metal, Refined Ingot, Polymer, Cement, and Plasteel into raw Ore, Coal, and Paldium.',
    description: 'Resource decomposition tree calculator. Input any number of advanced end-game materials (Pal Metal Ingot, Refined Ingot, Cement, Carbon Fiber, Polymer, Circuit Boards, Plasteel) to get an exact raw mining shopping list for Ore, Coal, Paldium, Wood, and Stone.',
    badge: 'Mining Tree',
    rating: 4.96,
    reviewsCount: 3620,
    userCount: '128k+ trainers',
    featured: false,
    tags: ['palworld', 'material calculator', 'pal metal ingot', 'refined ingot', 'ore calculator', 'coal calculator', 'paldium'],
    seoTitle: 'Palworld Material Calculator – Raw Ore, Coal & Paldium Breakdown',
    metaDescription: 'Deconstruct Pal Metal Ingots, Plasteel, Polymers, and Cement into exact raw mining counts for Ore, Coal, Paldium, and Stone.',
    h1: 'Palworld Material & Resource Decomposition Calculator',
    canonicalPath: '/tools/palworld-material-calculator',
    howToGuide: {
      overview: 'Convert high-tier construction plans into an exact raw mining checklist.',
      steps: [
        { title: 'Input Advanced Items', description: 'Enter quantities for Pal Metal, Refined Ingots, Cement, Polymers, or Plasteel.' },
        { title: 'View Raw Material Shopping List', description: 'See total Ore, Coal, Paldium Fragments, Bone, and Oil needed.' },
        { title: 'Plan Mining Expeditions', description: 'Gather exact material amounts without running short.' }
      ]
    },
    formulaExplained: {
      title: 'Resource Conversion Ratios',
      details: '• 1 Pal Metal Ingot = 4 Ore + 2 Paldium Fragments\n• 1 Refined Ingot = 2 Ore + 2 Coal\n• 1 Cement = 50 Stone + 1 Bone + 1 Pal Fluids\n• 1 Plasteel = 10 Ore + 5 Paldium + 5 Crude Oil',
      mathSnippet: 'Total_Ore = Σ (Ingot_Qty × Ore_Ratio)'
    },
    faqs: [
      { question: 'Where is the best place to farm High Quality Pal Oil?', answer: 'Defeat or capture Dumud, Woolipop, or Mammorest in the central bamboo groves, or buy directly from Wandering Merchants at Duneshelter.' }
    ],
    proTips: [
      'Convert excess Wood into Charcoal in the furnace to craft cheap Carbon Fiber without wasting mined Coal.'
    ],
    relatedToolIds: ['palworld-crafting-calculator', 'palworld-base-team-calculator', 'palworld-work-speed-calculator']
  },

  // 58. Palworld Condensation Cost Calculator
  {
    id: 'palworld-condensation-calculator',
    slug: 'palworld-condensation-calculator',
    name: 'Palworld Condensation & Star Rank Calculator',
    gameId: 'palworld',
    categoryId: 'planners',
    icon: 'Star',
    shortDescription: 'Track Pal Essence Condenser sacrifices (4 → 16 → 32 → 64 = 116 total), +20% stats, and +1 work levels.',
    description: 'Pal Essence Condenser progression tracker. Calculate remaining Pal duplicates (4 for 1★, 16 for 2★, 32 for 3★, 64 for 4★ = 116 total Pals), +20% HP/Atk/Def stat gains, partner skill enhancements, and breeding egg/cake requirements.',
    badge: '116-Pal Matrix',
    rating: 4.97,
    reviewsCount: 4310,
    userCount: '152k+ trainers',
    featured: true,
    tags: ['palworld', 'condensation calculator', 'pal essence condenser', 'star rank', '4 star pal', 'pal duplicates', 'cake requirements'],
    seoTitle: 'Palworld Condensation Calculator – 116 Pal Essence Matrix',
    metaDescription: 'Track Pal Essence Condenser requirements (4, 16, 32, 64 = 116 total Pals) for 4-star maxing, +20% stats, and +1 work suitability levels.',
    h1: 'Palworld Condensation & Star Rank Matrix Calculator',
    canonicalPath: '/tools/palworld-condensation-calculator',
    howToGuide: {
      overview: 'Plan the exact breeding roadmap to upgrade your Pal to maximum 4-star rank.',
      steps: [
        { title: 'Select Target Pal', description: 'Choose which Pal you are condensing in the Pal Essence Condenser.' },
        { title: 'Set Current & Target Star Rank', description: 'Select 0 to 4 stars.' },
        { title: 'View Breeding Budget', description: 'See how many duplicate Pals, eggs, and cakes are required to reach the goal.' }
      ]
    },
    formulaExplained: {
      title: 'Condensation Progression Tiers',
      details: '• Rank 1 (★): 4 Pals (+5% Stats, Partner Skill Lv. 2)\n• Rank 2 (★★): 16 Pals (+10% Stats, Partner Skill Lv. 3)\n• Rank 3 (★★★): 32 Pals (+15% Stats, Partner Skill Lv. 4)\n• Rank 4 (★★★★): 64 Pals (+20% Stats, Partner Skill Lv. 5 & +1 to ALL Work Suitability Levels)',
      mathSnippet: 'Total_Pals = 4 + 16 + 32 + 64 = 116 Pals'
    },
    faqs: [
      { question: 'What happens at 4-star condensation rank?', answer: 'At 4 stars (116 total Pals), the Pal gains +20% HP/Atk/Def, maxes its Partner Skill to Lv. 5, and increases ALL its base Work Suitability levels by +1 (e.g. Handiwork 4 becomes Handiwork 5).' }
    ],
    proTips: [
      'Use multiple breeding pens simultaneously to hatch 116 duplicate eggs in just a few play sessions.'
    ],
    relatedToolIds: ['palworld-breeding-calculator', 'palworld-iv-calculator', 'palworld-work-speed-calculator']
  },

  // 59. Palworld Technology Point Calculator
  {
    id: 'palworld-tech-point-calculator',
    slug: 'palworld-tech-point-calculator',
    name: 'Palworld Technology & Ancient Tech Point Calculator',
    gameId: 'palworld',
    categoryId: 'planners',
    icon: 'Cpu',
    shortDescription: 'Plan Tech Point unlocks from level 1–55, Fast Travel Statues, and Ancient Tech Points from Alpha Bosses.',
    description: 'Technology tree and Ancient Tech Points budget planner. Calculate regular Technology Points gained from leveling (1–55) and Great Eagle Fast Travel Statues, plus Ancient Tech Points earned from first-time Alpha Field Bosses, Sealed Realm Dungeons, and Syndicate Towers.',
    badge: 'Tech Tree',
    rating: 4.95,
    reviewsCount: 3120,
    userCount: '110k+ trainers',
    featured: false,
    tags: ['palworld', 'technology calculator', 'ancient tech points', 'tech tree', 'alpha boss points', 'fast travel points'],
    seoTitle: 'Palworld Technology Point Calculator – Regular & Ancient Tech Planner',
    metaDescription: 'Calculate regular Technology Points from level 1 to 55 and Ancient Tech Points from Alpha Bosses and Dungeons in Palworld.',
    h1: 'Palworld Technology & Ancient Tech Point Calculator',
    canonicalPath: '/tools/palworld-tech-point-calculator',
    howToGuide: {
      overview: 'Plan your tech tree unlocks and track where to find missing Ancient Tech Points.',
      steps: [
        { title: 'Input Level & Statues', description: 'Enter current character level and unlocked Fast Travel statues.' },
        { title: 'Input Defeated Alpha Bosses', description: 'Enter first-time clears for field bosses and dungeons.' },
        { title: 'Toggle Blueprint Checklist', description: 'Select desired blueprints to see remaining points balance.' }
      ]
    },
    formulaExplained: {
      title: 'Technology Point Acquisition',
      details: '• Regular Tech Points = (Level × ~3.6) + Fast_Travel_Statues\n• Ancient Tech Points = Alpha_Boss_First_Clears + Dungeon_First_Clears + Syndicate_Towers (25 pts)',
      mathSnippet: 'Ancient_Points = Alpha_Bosses + Dungeons + Towers'
    },
    faqs: [
      { question: 'How do you get Ancient Technology Points in Palworld?', answer: 'Defeat any Alpha Field Boss (marked on the map) or Dungeon Boss for the first time (+1 point each), or defeat Syndicate Tower Leaders (+5 points each).' }
    ],
    proTips: [
      'Dungeon end chests frequently drop High Grade Technical Manuals, which grant bonus permanent Tech Points upon consumption.'
    ],
    relatedToolIds: ['palworld-crafting-calculator', 'palworld-capture-calculator', 'palworld-base-team-calculator']
  },
  {
    id: 'crk-team-builder',
    slug: 'crk-team-builder',
    name: 'Cookie Run: Kingdom Team Builder & Meta Comp Simulator',
    gameId: 'crk',
    categoryId: 'generators',
    icon: 'Users',
    shortDescription: 'Build and simulate Arena & World Exploration comps with position locks, treasure synergies, and meta team presets.',
    description: 'Interactive team builder for Cookie Run: Kingdom. Select Front, Middle, and Rear cookies, pair them with 3 Treasures (Old Pilgrim Scroll, Jelly Watch, Whistle), calculate overall team power and skill synergy, and test against meta comps.',
    badge: 'Arena & PvE',
    rating: 4.96,
    reviewsCount: 3840,
    userCount: '150k+ players',
    featured: true,
    tags: ['cookie run kingdom', 'team builder', 'arena comps', 'meta cookies', 'treasures', 'synergy'],
    seoTitle: 'Cookie Run: Kingdom Team Builder – Arena & PvE Comp Simulator',
    metaDescription: 'Optimize your Cookie Run: Kingdom team compositions for Arena, World Exploration, and Guild Battles with treasure bonuses and skill synergies.',
    h1: 'Cookie Run: Kingdom Team Builder & Synergy Calculator',
    canonicalPath: '/tools/crk-team-builder',
    howToGuide: {
      overview: 'Assign 5 cookies by position (Front, Middle, Rear) and select 3 Treasures to calculate total combat power and skill synergies.',
      steps: [
        { title: 'Select Cookies', description: 'Choose Front tanks/chargers, Middle DPS/support, and Rear healers/buffers.' },
        { title: 'Equip Treasures', description: 'Select 3 Treasures (e.g. Old Pilgrim\'s Scroll, Squishy Jelly Watch, Feather).' },
        { title: 'Review Synergies', description: 'Check Cooldown reduction, ATK% boosts, shield overlays, and meta preset recommendations.' }
      ]
    },
    formulaExplained: {
      title: 'Combat Power & Synergy Formula',
      details: 'Total Power = Sum(Cookie Base Power) × (1 + Treasure ATK Boost + Skill Buff Multipliers). Cooldown reduction reduces base skill start timer and cycle interval.\n\nWorked Example 1: A team with 500k base power and +20% ATK from a level 12 Old Pilgrim\'s Scroll results in 600k total combat power.\nWorked Example 2: Equipping a level 12 Squishy Jelly Watch (-25% CD) reduces a 10s base skill cooldown to exactly 7.5 seconds.',
      mathSnippet: 'Team_Power = Sum(Cookie_Power) × (1 + Treasure_Buffs)'
    },
    faqs: [
      { question: 'What is the standard team setup in CRK?', answer: 'Most comps use 1–2 Front (Tank/Charge), 2 Middle (Magic/Ranged/Ambush), and 1–2 Rear (Healing/Support) along with the Squishy Jelly Watch for CD reduction.' },
      { question: 'Do Treasures affect individual cookie stats?', answer: 'Yes, most Treasures apply global buffs to your entire team\'s ATK, DEF, or Crit, while some like the Whistle target specific highest-ATK cookies.' },
      { question: 'Which cookies should I put in the Front?', answer: 'Cookies with high HP and Defense, usually of the Defense or Charge class, such as Hollyberry, Crimson Coral, or Financier Cookie.' }
    ],
    proTips: [
      'Always equip Squishy Jelly Watch (Common or Epic version) to cycle skills faster in Arena before enemy burst damage.'
    ],
    relatedToolIds: ['crk-topping-optimizer', 'crk-upgrade-planner', 'crk-pity-planner']
  },
  {
    id: 'crk-topping-optimizer',
    slug: 'crk-topping-optimizer',
    name: 'Cookie Run: Kingdom Topping Set & Sub-stat Optimizer',
    gameId: 'crk',
    categoryId: 'calculators',
    icon: 'Sparkles',
    shortDescription: 'Optimize Topping sets (Swift Chocolate, Searing Raspberry, Solid Almond) and target exact Arena CD thresholds.',
    description: 'Calculate topping set bonuses (2-set & 5-set), target crucial Cooldown % start thresholds (e.g., 24.1% CD for 3s skill start), and evaluate DMG Resist sub-stats for high-tier PvP.',
    badge: 'Topping Builds',
    rating: 4.94,
    reviewsCount: 3210,
    userCount: '130k+ players',
    featured: true,
    tags: ['cookie run kingdom', 'topping optimizer', 'swift chocolate', 'solid almond', 'searing raspberry', 'cooldown threshold'],
    seoTitle: 'Cookie Run: Kingdom Topping Optimizer – Set Bonuses & CD Thresholds',
    metaDescription: 'Optimize your Cookie Run: Kingdom topping builds. Calculate 2-set & 5-set bonuses, Cooldown start thresholds, and DMG Resist sub-stat targets.',
    h1: 'Cookie Run: Kingdom Topping Set & Sub-stat Optimizer',
    canonicalPath: '/tools/crk-topping-optimizer',
    howToGuide: {
      overview: 'Configure 5 topping slots with main stats and sub-stat rolls to hit optimal cooldown or damage resistance breakpoints.',
      steps: [
        { title: 'Choose Cookie & Target', description: 'Select your Cookie class and primary goal (Full CD, Full DMG Resist, Full ATK).' },
        { title: 'Input Topping Stats', description: 'Enter main stat bonuses and sub-stat roll percentages.' },
        { title: 'Check Breakpoints', description: 'Verify if your total Cooldown % reaches early skill activation thresholds.' }
      ]
    },
    formulaExplained: {
      title: 'Topping Set Bonus & Cooldown Threshold Math',
      details: 'Total Stat Boost = Main Stat Sum + Substat Sum + Set Bonus (5-set Swift Chocolate grants +5% CD, 5-set Solid Almond grants +5% DMG Resist).\n\nWorked Example 1: 5x Swift Chocolate (+3% CD each) with a +5% set bonus gives 15% + 5% = 20% total Cooldown bonus.\nWorked Example 2: To hit a 3s start on a 15s skill, you typically need 22.3% total Cooldown (including substat rolls).',
      mathSnippet: 'Total_Bonus = Main_Stats + Sub_Stats + Set_Bonus'
    },
    faqs: [
      { question: 'What is the minimum Cooldown for a 3-second Arena start?', answer: 'Most 4-second base CD skills require 24.1% total Cooldown (including Jelly Watch) to start cast at 3 seconds into the match.' },
      { question: 'Is DMG Resist better than Defense?', answer: 'Yes! DMG Resist (Solid Almond) is a flat percentage reduction of all incoming damage and is significantly more effective than raw Defense in high-tier PvP.' },
      { question: 'Can I mix topping sets?', answer: 'Yes, but you usually lose the powerful 5-piece set bonus. Some builds use a 3+2 mix to gain two smaller set bonuses if they can\'t reach specific substat goals.' }
    ],
    proTips: [
      'Prioritize DMG Resist sub-stats (up to 48.5% total cap) on all Arena cookies to survive burst damage comps.'
    ],
    relatedToolIds: ['crk-team-builder', 'crk-upgrade-planner']
  },
  {
    id: 'crk-production-chain-planner',
    slug: 'crk-production-chain-planner',
    name: 'Cookie Run: Kingdom Production Chain & Trade Planner',
    gameId: 'crk',
    categoryId: 'planners',
    icon: 'Layers',
    shortDescription: 'Plan kingdom production buildings, calculate raw resource to goods time, and fulfill Tree of Wishes & Train queues.',
    description: 'Calculate crafting chains across Woodshop, Quarry, Bakery, Jam House, and Jellies. Estimate total crafting duration, raw material throughput, and Gold profit for Tree of Wishes and Bear Jelly Trains.',
    badge: 'Kingdom Economy',
    rating: 4.92,
    reviewsCount: 2890,
    userCount: '95k+ players',
    featured: false,
    tags: ['cookie run kingdom', 'production planner', 'tree of wishes', 'bear jelly train', 'woodshop', 'bakery', 'crafting chain'],
    seoTitle: 'Cookie Run: Kingdom Production Chain Planner – Kingdom Goods & Crafting',
    metaDescription: 'Optimize Cookie Run: Kingdom craft queues, raw material requirements, and production time for Tree of Wishes and Bear Jelly Train trade.',
    h1: 'Cookie Run: Kingdom Production Chain & Trade Planner',
    canonicalPath: '/tools/crk-production-chain-planner',
    howToGuide: {
      overview: 'Select target manufactured goods to compute required raw materials, total craft duration, and gold rewards.',
      steps: [
        { title: 'Select Target Goods', description: 'Choose items needed for Tree of Wishes or Bear Jelly Train.' },
        { title: 'Configure Kingdom Buffs', description: 'Adjust Sugar Gnome Research Lab speed upgrades.' },
        { title: 'View Crafting Queue', description: 'See complete breakdown of base resources (Roll Cake Wood, Sugar Cubes, Jelly Jam).' }
      ]
    },
    formulaExplained: {
      title: 'Crafting Time & Material Bottleneck Calculation',
      details: 'Craft Time = Base Item Time × (1 - Gnome Research Reduction %). Raw materials recursively calculated from sub-items in building trees.\n\nWorked Example 1: A 10-minute Roll Cake Wood craft with a 10% research speed bonus takes exactly 9 minutes.\nWorked Example 2: Crafting one Jam Pie requires 3x Flour and 2x Jelly Jam, which in turn require 15 minutes of base processing time.',
      mathSnippet: 'Craft_Time = Base_Time × (1 - Research_Buff%)'
    },
    faqs: [
      { question: 'Should I upgrade production buildings to max level early?', answer: 'Be cautious! Higher tier goods require complex crafting chains and can lock your Bear Jelly Train requests if you lack stock.' },
      { question: 'How do I unlock more building slots?', answer: 'You can purchase extra production slots using Crystals, allowing you to queue more items while you are away from the game.' },
      { question: 'What is the best way to spend Gold?', answer: 'Prioritize expanding your Kingdom territory and upgrading your Castle level, then focus on research lab upgrades.' }
    ],
    proTips: [
      'Keep a stockpile of 30+ basic items (Roll Cake Wood, Sugar Cubes, Jelly Beans) so advanced recipes never freeze production.'
    ],
    relatedToolIds: ['crk-event-timers', 'crk-upgrade-planner']
  },
  {
    id: 'crk-upgrade-planner',
    slug: 'crk-upgrade-planner',
    name: 'Cookie Run: Kingdom Cookie EXP & Skill Upgrade Planner',
    gameId: 'crk',
    categoryId: 'calculators',
    icon: 'ArrowLeftRight',
    shortDescription: 'Calculate EXP Jellies needed for Cookie Level 1–80, Skill Powders by class, and Promotion soulstone costs.',
    description: 'Complete EXP Jelly and Skill Powder upgrade calculator. Compute exact Lv 1–10 EXP Jellies required from level 1 to 80, Skill Powder counts (Refined & Pristine), and Soulstone/Soulcore promotion matrices.',
    badge: 'Level & Skill',
    rating: 4.95,
    reviewsCount: 3500,
    userCount: '140k+ players',
    featured: true,
    tags: ['cookie run kingdom', 'upgrade planner', 'exp jellies', 'skill powders', 'soulstones', 'level 80'],
    seoTitle: 'Cookie Run: Kingdom EXP Jelly & Skill Powder Upgrade Planner',
    metaDescription: 'Calculate exact EXP Jellies, Skill Powders, and Soulstones required to upgrade cookies to Level 80 and Skill Level 80 in CRK.',
    h1: 'Cookie Run: Kingdom EXP Jelly & Skill Powder Upgrade Planner',
    canonicalPath: '/tools/crk-upgrade-planner',
    howToGuide: {
      overview: 'Input current cookie level, skill level, and target level to view detailed EXP Jelly and Skill Powder requirements.',
      steps: [
        { title: 'Enter Current & Target Level', description: 'Specify starting level and desired target level (up to 80).' },
        { title: 'Select Cookie Class', description: 'Choose Charge, Defense, Magic, Ambush, Ranged, Bomber, Support, or Healing for Skill Powders.' },
        { title: 'View Resource Breakdown', description: 'See exact counts for Level 1–10 EXP Jellies and Refined/Pristine Skill Powders.' }
      ]
    },
    formulaExplained: {
      title: 'EXP & Powder Scaling Matrix',
      details: 'EXP EXP(Lv) increases exponentially per bracket. Skill Powders transition from Regular (Lv 1-20) -> Refined (Lv 21-40) -> Pristine (Lv 41-80).\n\nWorked Example 1: Leveling from 1 to 60 requires approx 2.5M EXP points, while 60 to 80 requires an additional 10M+ EXP.\nWorked Example 2: One talent upgrade from Level 79 to 80 requires 20 Pristine Skill Powders and 150,000 Mora.',
      mathSnippet: 'Total_EXP = Sum(EXP_Cost_Per_Level)'
    },
    faqs: [
      { question: 'How many EXP Jellies are needed for Level 1 to 80?', answer: 'Upgrading a cookie from Level 1 to Level 80 requires approximately 12.8 million total EXP points (or ~20,000 Level 4 EXP Jellies).' },
      { question: 'Where is the best place to farm Skill Powders?', answer: 'The Daily Bounties in the World Exploration menu are the primary source of Skill Powders, rotating by class every day.' },
      { question: 'What are Soulcores used for?', answer: 'Soulcores are used for the Ascension system (stars 6–10) once a cookie has reached 5-star Promotion.' }
    ],
    proTips: [
      'Use the Hall of Ancient Heroes to boost secondary cookies to your top 5 Paragon level without consuming EXP Jellies.'
    ],
    relatedToolIds: ['crk-team-builder', 'crk-topping-optimizer', 'crk-pity-planner']
  },
  {
    id: 'crk-pity-planner',
    slug: 'crk-pity-planner',
    name: 'Cookie Run: Kingdom Gacha Pity & Gem Budget Planner',
    gameId: 'crk',
    categoryId: 'calculators',
    icon: 'Calculator',
    shortDescription: 'Calculate net pulls, pity progress (250 hard pity), probability odds, and days needed to save Crystals.',
    description: 'Calculate total gacha pulls from Crystals, Cookie Cutters (Special/Standard), and Fate Tickets. Track 250 Nether-Gacha & Featured Banner hard pity thresholds, projected Mileage Points, and Crystal income.',
    badge: 'Gacha & Crystals',
    rating: 4.93,
    reviewsCount: 3100,
    userCount: '120k+ players',
    featured: false,
    tags: ['cookie run kingdom', 'pity planner', 'gacha calculator', 'crystals', 'cookie cutters', 'mileage points'],
    seoTitle: 'Cookie Run: Kingdom Gacha Pity & Gem Budget Planner',
    metaDescription: 'Calculate gacha pulls, net pity progress, featured cookie probability, and Crystal saving timelines in Cookie Run: Kingdom.',
    h1: 'Cookie Run: Kingdom Gacha Pity & Gem Budget Planner',
    canonicalPath: '/tools/crk-pity-planner',
    howToGuide: {
      overview: 'Enter your stored Crystals and Cutters to calculate total pulls and probability of hitting 250 hard pity.',
      steps: [
        { title: 'Input Currency', description: 'Enter current Crystals, Special Cutters, and Standard Cutters.' },
        { title: 'Select Banner Type', description: 'Choose Featured Epic/Super Epic or Nether-Gacha (Ancient/Beast).' },
        { title: 'Analyze Odds', description: 'View probability curves, guaranteed pity milestone dates, and mileage returns.' }
      ]
    },
    formulaExplained: {
      title: 'Pity & Probability Formula',
      details: 'Pulls = (Crystals / 300) + Cutters. Cumulative Probability P(At least 1 success) = 1 - (1 - Drop_Rate)^Pulls. Hard pity triggers at 250 pulls.\n\nWorked Example 1: 30,000 Crystals provide 100 pulls, giving a ~45% chance of pulling a featured Epic (0.582% rate) before pity.\nWorked Example 2: Reaching 250 pulls guarantees the featured Ancient/Beast cookie, regardless of previous RNG outcomes.',
      mathSnippet: 'P(Success) = 1 - (1 - Rate)^Pulls'
    },
    faqs: [
      { question: 'How many Crystals are needed for 250 hard pity?', answer: '250 pulls cost 75,000 Crystals (at 300 Crystals per pull), assuming no Cookie Cutters are used.' },
      { question: 'Does pity reset if I pull the cookie early?', answer: 'For standard banners, no, the hard pity counter at 250 is usually for a one-time guarantee or reward cycle. Check the specific banner rules for Nether-Gacha.' },
      { question: 'What is the "Soulstone" rate?', answer: 'Featured cookies have a separate rate for individual Soulstones (usually ~8%), which help you promote the cookie even if you don\'t pull the full character.' }
    ],
    proTips: [
      'Save Mileage Points for Treasure Tickets or Soulstones of top-tier Epic cookies instead of standard gacha pulls.'
    ],
    relatedToolIds: ['crk-upgrade-planner', 'crk-event-timers']
  },
  {
    id: 'crk-event-timers',
    slug: 'crk-event-timers',
    name: 'Cookie Run: Kingdom Guild Battle & Event Reset Timers',
    gameId: 'crk',
    categoryId: 'trackers',
    icon: 'Clock',
    shortDescription: 'Live countdowns for Guild Battle boss rotations, Kingdom Pass resets, stamina jelly refill, and fountain alarms.',
    description: 'Stay on top of Cookie Run: Kingdom daily and weekly resets. Track Guild Battle bosses (Red Velvet Dragon, Avatar of Destiny, Living Abyss), Kingdom Pass deadlines, and set custom alarms for Stamina Jelly overflow.',
    badge: 'Timers & Resets',
    rating: 4.91,
    reviewsCount: 2650,
    userCount: '85k+ players',
    featured: false,
    tags: ['cookie run kingdom', 'event timers', 'guild battle reset', 'stamina jelly timer', 'fountain of abundance', 'daily reset'],
    seoTitle: 'Cookie Run: Kingdom Event Timers & Guild Battle Reset Clock',
    metaDescription: 'Track live Cookie Run: Kingdom daily resets, Guild Battle boss rotations, stamina jelly refill timers, and kingdom event countdowns.',
    h1: 'Cookie Run: Kingdom Event Timers & Guild Battle Reset Clock',
    canonicalPath: '/tools/crk-event-timers',
    howToGuide: {
      overview: 'Monitor server reset times and set alerts so your stamina jellies and production buildings never sit full.',
      steps: [
        { title: 'Select Server Region', description: 'Choose Pure Vanilla, Hollyberry, or Dark Cacao server time zone.' },
        { title: 'View Live Countdown', description: 'Track Guild Battle ticket resets, Daily Quests, and Kingdom Pass ending.' },
        { title: 'Set Stamina Alarm', description: 'Input your current Stamina Jellies to calculate exact full-cap timestamp.' }
      ]
    },
    formulaExplained: {
      title: 'Stamina Regeneration Rate',
      details: 'Stamina regenerates at 1 Jelly every 5 minutes (or faster with Gnome Lab research). Full cap refill time = (Max_Cap - Current_Jellies) × 5 min.\n\nWorked Example 1: If you have 50/150 stamina, you need 100 jellies, which will take 500 minutes (8h 20m) to refill.\nWorked Example 2: Leveling up often provides a flat +20-50 Stamina bonus that can overflow your current cap.',
      mathSnippet: 'Refill_Time_Minutes = (Max - Current) × 5'
    },
    faqs: [
      { question: 'When does the daily reset occur in CRK?', answer: 'The daily reset occurs at 00:00 KST (15:00 UTC / 10:00 AM EST).' },
      { question: 'How often do Guild Battle tickets refresh?', answer: 'You receive 3 Guild Battle tickets every day at the daily reset time.' },
      { question: 'What are Fountain of Abundance rewards based on?', answer: 'The rewards scale with your Fountain level and your Castle level. Collect them regularly as the storage cap fills every 8–12 hours.' }
    ],
    proTips: [
      'Use all 3 Guild Battle attempts daily before weekly tallying begins to maximize Guild Trophies and Heroic Medals.'
    ],
    relatedToolIds: ['crk-team-builder', 'crk-production-chain-planner']
  },
  {
    id: 'afkj-daily-boss-planner',
    slug: 'afkj-daily-boss-planner',
    name: 'AFK Journey Dream Realm & Daily Boss Team Planner',
    gameId: 'afkj',
    categoryId: 'generators',
    icon: 'Swords',
    shortDescription: 'Plan meta team comps for Snow Stalker, Necrodrakon, Skyclops, King Croaker, and Lone Wolf Dream Realm bosses.',
    description: 'Optimize Dream Realm and Primal Lord boss scores in AFK Journey. Select daily boss targets, configure artifact spells (Starshard, Evocation), view faction counters, and simulate high-rank damage comps.',
    badge: 'Dream Realm',
    rating: 4.97,
    reviewsCount: 4120,
    userCount: '160k+ players',
    featured: true,
    tags: ['afk journey', 'dream realm', 'boss planner', 'necrodrakon', 'snow stalker', 'skyclops', 'king croaker'],
    seoTitle: 'AFK Journey Daily Boss Team Planner – Dream Realm Meta Comps',
    metaDescription: 'Optimize AFK Journey Dream Realm boss damage. Best team comps, Artifact selection, and positioning for Snow Stalker, Necrodrakon, and King Croaker.',
    h1: 'AFK Journey Dream Realm & Daily Boss Team Planner',
    canonicalPath: '/tools/afkj-daily-boss-planner',
    howToGuide: {
      overview: 'Choose today’s Dream Realm boss to view meta team lineups, artifact pairings, and positioning advice.',
      steps: [
        { title: 'Select Dream Realm Boss', description: 'Choose Snow Stalker, Necrodrakon, Skyclops, King Croaker, or Lone Wolf.' },
        { title: 'Equip Spell Artifact', description: 'Pair with Starshard Spell, Evocation Spell, or Crescent Spell.' },
        { title: 'View Damage Benchmarks', description: 'Check target DPS thresholds for Top 1% and Top 5% leaderboard ranks.' }
      ]
    },
    formulaExplained: {
      title: 'Dream Realm Damage & Multipliers',
      details: 'Damage Output = (Base Hero DPS × True Damage Buffs) × (1 + Faction Advantage 15%) × Artifact Burst Multipliers.\n\nWorked Example 1: A team with 10M base DPS and a 15% Faction advantage deals 11.5M damage before artifact bonuses.\nWorked Example 2: Adding a level 10 Starshard spell (+20% damage) increases total output to 11.5M * 1.2 = 13.8M damage.',
      mathSnippet: 'Total_Damage = Base_DPS × Faction_Buff × Artifact_Multiplier'
    },
    faqs: [
      { question: 'Which heroes are best for Dream Realm in AFK Journey?', answer: 'Odie, Marilee, Korin, Smokey & Meerky, Reinier, and Koko form the core of most top-tier Dream Realm compositions.' },
      { question: 'When does the Dream Realm boss reset?', answer: 'Dream Realm bosses rotate every 24 hours at the daily server reset time.' },
      { question: 'Does positioning matter in Dream Realm?', answer: 'Yes! Placing heroes like Smokey & Meerky so their aura covers the entire team is crucial for sustaining through the boss\'s enraged phase.' }
    ],
    proTips: [
      'Upgrade Odie and Marilee to Mythic+ (+10 Exclusive Weapon) immediately for execute mechanic and true damage shred.'
    ],
    relatedToolIds: ['afkj-team-builder', 'afkj-ascension-planner', 'afkj-resource-planner']
  },
  {
    id: 'afkj-ascension-planner',
    slug: 'afkj-ascension-planner',
    name: 'AFK Journey Hero Ascension & Acorn Calculator',
    gameId: 'afkj',
    categoryId: 'calculators',
    icon: 'Sparkles',
    shortDescription: 'Calculate hero soul sigils, duplicate copies, and faction acorns (Lightbearer, Wilder, Mauler, Graveborn) to Supreme+.',
    description: 'Plan hero ascension paths from Elite to Supreme+ and Paragon tiers. Compute duplicate copy requirements, faction acorn costs (Mauler, Wilder, Lightbearer, Graveborn Acorns), and Omniacorn counts for Celestials/Hypogeans.',
    badge: 'Ascension & Acorns',
    rating: 4.95,
    reviewsCount: 3680,
    userCount: '145k+ players',
    featured: true,
    tags: ['afk journey', 'ascension planner', 'acorn calculator', 'supreme plus', 'mythic plus', 'soul sigils'],
    seoTitle: 'AFK Journey Ascension & Faction Acorn Calculator',
    metaDescription: 'Calculate hero duplicates, soul sigils, and faction acorns required to reach Mythic+ and Supreme+ in AFK Journey.',
    h1: 'AFK Journey Hero Ascension & Acorn Calculator',
    canonicalPath: '/tools/afkj-ascension-planner',
    howToGuide: {
      overview: 'Input starting hero tier and target tier to calculate required dupes, sigils, and faction acorns.',
      steps: [
        { title: 'Select Faction & Hero Tier', description: 'Choose S-Level or A-Level hero and current tier (Epic, Mythic, Supreme).' },
        { title: 'Set Target Tier', description: 'Select desired target tier (e.g. Supreme+ or Paragon 1).' },
        { title: 'View Material Breakdown', description: 'Check required S/A-level copies, Faction Acorns, and Omniacorns.' }
      ]
    },
    formulaExplained: {
      title: 'Hero Duplicate & Acorn Requirements',
      details: 'S-Level Hero to Supreme+: 8 Copies + 350 Faction Acorns. A-Level Hero to Supreme+: 64 Copies + 200 Faction Acorns.\n\nWorked Example 1: To take an S-Level Vala from Epic to Mythic+, you need 4 total copies and 150 Faction Acorns.\nWorked Example 2: An A-Level Odie requires 40 copies to reach Mythic+ and a total of 64 copies to reach Supreme+.',
      mathSnippet: 'Supreme_Plus = Target_Tier_Copies + Faction_Acorns'
    },
    faqs: [
      { question: 'How many copies of an S-Level hero are needed for Supreme+?', answer: 'Upgrading an S-Level hero from Epic to Supreme+ requires 8 total copies and 350 Faction Acorns.' },
      { question: 'How do I get more Faction Acorns?', answer: 'Faction Acorns are primarily obtained through Noble Path rewards, Legend Trial progression, and Summoning bonuses.' },
      { question: 'What is the benefit of Supreme+ rank?', answer: 'Supreme+ unlocks the hero\'s final skill enhancement and provides a significant boost to all base attributes, essential for high-tier Arena play.' }
    ],
    proTips: [
      'Prioritize ascending S-tier supports (Smokey, Rowan) and core DPS (Eironn, Carolina) to Mythic+ to unlock their Exclusive Weapons.'
    ],
    relatedToolIds: ['afkj-daily-boss-planner', 'afkj-resource-planner', 'afkj-summon-planner']
  },
  {
    id: 'afkj-resource-planner',
    slug: 'afkj-resource-planner',
    name: 'AFK Journey Hero Essence (Dust) & Leveling Planner',
    gameId: 'afkj',
    categoryId: 'calculators',
    icon: 'Calculator',
    shortDescription: 'Calculate Hero Dust, Gold, and EXP required to reach Resonance Level 240+ and Season Level 500+.',
    description: 'Calculate Hero Essence (Dust) bottlenecks, Gold, and EXP costs across Resonance Levels. Input your daily AFK rewards rate, Fast Rewards multiplier, and Noble Path gains to calculate days until your next Resonance Wall unlock.',
    badge: 'Dust & Leveling',
    rating: 4.94,
    reviewsCount: 3340,
    userCount: '135k+ players',
    featured: false,
    tags: ['afk journey', 'hero essence', 'dust planner', 'resonance level', 'fast rewards', 'gold exp'],
    seoTitle: 'AFK Journey Hero Essence (Dust) & Resonance Level Planner',
    metaDescription: 'Calculate Hero Essence (Dust), EXP, and Gold needed for Resonance Level upgrades in AFK Journey.',
    h1: 'AFK Journey Hero Essence & Leveling Resource Planner',
    canonicalPath: '/tools/afkj-resource-planner',
    howToGuide: {
      overview: 'Input current Resonance Level and daily AFK income to project days required to cross dust walls.',
      steps: [
        { title: 'Enter Current & Target Resonance', description: 'Specify starting Resonance Level and target level (e.g., 240 or Season 500).' },
        { title: 'Input Daily AFK Rate', description: 'Enter hourly Hero Essence income and Instant AFK attempts.' },
        { title: 'View Time to Level Up', description: 'Analyze exact dust wall timestamps and gold budget.' }
      ]
    },
    formulaExplained: {
      title: 'Resonance Dust Wall Math',
      details: 'Dust Walls occur every 10 Resonance levels (e.g., Lv 220 -> 240). Total Days = (Target_Dust - Current_Dust) / Daily_Dust_Generation.\n\nWorked Example 1: If you need 20,000 Hero Essence and generate 200 per hour (4,800/day), it will take approx 4.16 days to reach your goal.\nWorked Example 2: Using 2 hours of "Instant AFK" provides a flat 400 Essence boost, reducing the timer by about 4 hours.',
      mathSnippet: 'Days_To_Target = Deficit_Dust / Daily_AFK_Dust'
    },
    faqs: [
      { question: 'Should I buy Hero Essence in the shop for Gold daily?', answer: 'Yes! Always buy the daily 800 Gold Hero Essence in the Emporium shop to speed up Resonance level progression.' },
      { question: 'How do I increase my hourly Hero Essence rate?', answer: 'Push further in the AFK Stage campaign; every 5–10 stages usually increases your passive income rate.' },
      { question: 'What is the Resonance Wall?', answer: 'A Resonance Wall occurs every 10 levels (e.g., 220, 230, 240) where you must spend a large amount of Hero Essence to advance all heroes simultaneously.' }
    ],
    proTips: [
      'Save Instant AFK claims for after pushing high AFK Stage campaign levels to maximize dust yield per hour.'
    ],
    relatedToolIds: ['afkj-ascension-planner', 'afkj-season-tracker']
  },
  {
    id: 'afkj-summon-planner',
    slug: 'afkj-summon-planner',
    name: 'AFK Journey Starlight & Wishlist Gacha Summon Planner',
    gameId: 'afkj',
    categoryId: 'calculators',
    icon: 'Sparkles',
    shortDescription: 'Calculate net pulls, pity counters (40 rate-up pity), wishlist odds, and Stargaze banner budgets.',
    description: 'Calculate total gacha summons from Rate-Up Letters, Invite Letters, Starlight Letters, and Diamonds. Plan Wishlist rosters (5 heroes per faction), compute 40-pull hard pity guarantees, and track Celestial/Hypogean Stargaze odds.',
    badge: 'Gacha & Pity',
    rating: 4.93,
    reviewsCount: 2980,
    userCount: '110k+ players',
    featured: false,
    tags: ['afk journey', 'summon planner', 'wishlist gacha', 'stargaze banner', 'rate up invite letter', 'diamonds'],
    seoTitle: 'AFK Journey Gacha Summon & Wishlist Pity Planner',
    metaDescription: 'Calculate Rate-Up invite pulls, Wishlist odds, 40-pull hard pity, and Stargaze banner costs in AFK Journey.',
    h1: 'AFK Journey Gacha Summon & Wishlist Pity Planner',
    canonicalPath: '/tools/afkj-summon-planner',
    howToGuide: {
      overview: 'Enter stored Diamonds and Invite Letters to evaluate pity progress and wishlist pull distributions.',
      steps: [
        { title: 'Input Currency & Letters', description: 'Enter Diamonds, Rate-Up Letters, Epic Letters, and Stargaze Crystals.' },
        { title: 'Select Banner Type', description: 'Choose All-Hero Banner (40 Pity), Rate-Up Banner, or Stargaze Station.' },
        { title: 'Review Odds & Guaranteed Pulls', description: 'View total pull capacity and probability of hitting target ascension dupes.' }
      ]
    },
    formulaExplained: {
      title: 'Pity & Wishlist Rate Math',
      details: 'All-Hero Banner: 2.05% S-Level drop rate, 40-pull hard pity. Wishlist restricts S-Level pool to your 10 selected heroes (5 per faction slot).\n\nWorked Example 1: 12,000 Diamonds provide 40 pulls (at 300 each), which guarantees at least one S-Level hero on the All-Hero banner.\nWorked Example 2: With 20 Invite Letters and 6,000 Diamonds, you have 40 total pulls, triggering the hard pity reset.',
      mathSnippet: 'Net_Pulls = (Diamonds / 300) + Invite_Letters'
    },
    faqs: [
      { question: 'How does the Wishlist work in AFK Journey?', answer: 'You must fill all 5 S-Level slots per faction on your Wishlist so all S-Level summons drop exclusively from your selected heroes.' },
      { question: 'Is the Rate-Up banner better than the All-Hero banner?', answer: 'The Rate-Up banner is better for targeting a specific new hero, but the All-Hero banner has a better S-Level rate for general roster growth.' },
      { question: 'What are Starlight Letters used for?', answer: 'Starlight Letters are used for the Stellar Station to pull for rare Celestial and Hypogean heroes like Reinier or Scarlita.' }
    ],
    proTips: [
      'Never leave empty slots on your Wishlist, or non-wishlist S-Level heroes will randomly drop instead.'
    ],
    relatedToolIds: ['afkj-ascension-planner', 'afkj-team-builder']
  },
  {
    id: 'afkj-team-builder',
    slug: 'afkj-team-builder',
    name: 'AFK Journey 5v5 Tactical Grid Team Builder',
    gameId: 'afkj',
    categoryId: 'generators',
    icon: 'Users',
    shortDescription: 'Build and test 5v5 battle grid team comps with faction synergy buffs, role balance, and artifact spells.',
    description: 'Interactive tactical grid team builder for AFK Journey. Place heroes on Frontline, Midline, and Backline tiles, trigger faction synergies (3-hero, 4-hero, 5-hero +15%-22% ATK/HP buffs), pair Artifact spells, and evaluate team counters.',
    badge: 'Grid Comps',
    rating: 4.96,
    reviewsCount: 3950,
    userCount: '155k+ players',
    featured: true,
    tags: ['afk journey', 'team builder', 'tactical grid', 'faction synergy', 'eironn comp', 'pvp arena'],
    seoTitle: 'AFK Journey 5v5 Tactical Grid Team Builder & Faction Synergy',
    metaDescription: 'Build tactical 5v5 team lineups in AFK Journey. Calculate faction synergy buffs, position tiles, and artifact spell pairings.',
    h1: 'AFK Journey 5v5 Tactical Grid Team Builder',
    canonicalPath: '/tools/afkj-team-builder',
    howToGuide: {
      overview: 'Drag and place 5 heroes onto the 3x5 battlefield grid to optimize tile positioning and faction synergy.',
      steps: [
        { title: 'Select 5 Heroes', description: 'Choose Tanks (Thoran, Antandra), DPS (Eironn, Odie), and Supports (Smokey, Hewynn).' },
        { title: 'Position on Grid', description: 'Assign tiles (Frontline tanks, Backline mages/marksmans).' },
        { title: 'Verify Faction Buffs', description: 'Check +15% to +22% HP/ATK bonus from faction matches.' }
      ]
    },
    formulaExplained: {
      title: 'Faction Synergy Buff Calculation',
      details: '3 Same Faction = +10% HP/ATK | 3+2 Dual Faction = +15% HP/ATK | 4 Same = +18% HP/ATK | 5 Same = +22% HP/ATK. Celestials/Hypogeans act as wildcards.\n\nWorked Example 1: A team with 3 Wilders and 2 Maulers receives a +15% HP/ATK synergy bonus.\nWorked Example 2: A full 5-hero Graveborn team receives the maximum +22% synergy bonus, greatly increasing Thoran\'s durability.',
      mathSnippet: 'Team_Power = Base_Power × (1 + Faction_Synergy_Buff%)'
    },
    faqs: [
      { question: 'What is the top meta PvP comp in AFK Journey?', answer: 'The "Eironn Burst Comp" (Eironn, Carolina, Arden, Thoran, Damian) dominates Arena by instantly pulling and freezing the enemy team.' },
      { question: 'How do Celestial and Hypogean heroes affect synergies?', answer: 'They act as wildcards, filling the requirement for whatever faction has the most members currently on the field.' },
      { question: 'What is the best artifact for Arena?', answer: 'The Confining Spell is highly rated for disrupting enemy backline casters, while the Ironwall Spell is better for defensive stall comps.' }
    ],
    proTips: [
      'Place Thoran in front of your primary DPS hero so his Soul Retaliation skill absorbs deadly initial damage.'
    ],
    relatedToolIds: ['afkj-daily-boss-planner', 'afkj-ascension-planner']
  },
  {
    id: 'afkj-season-tracker',
    slug: 'afkj-season-tracker',
    name: 'AFK Journey Season Progression & Quest Tracker',
    gameId: 'afkj',
    categoryId: 'trackers',
    icon: 'Clock',
    shortDescription: 'Track season resonance level, season artifacts, talent trees, daily resets, and event countdowns.',
    description: 'Stay ahead in AFK Journey seasonal updates (Song of Strife, Waves of Intrigue). Track Season Resonance cap, Season Talent Tree points, Supreme Arena resets, District Quests, and World Boss schedules.',
    badge: 'Season Progress',
    rating: 4.92,
    reviewsCount: 2710,
    userCount: '90k+ players',
    featured: false,
    tags: ['afk journey', 'season tracker', 'song of strife', 'waves of intrigue', 'season resonance', 'supreme arena'],
    seoTitle: 'AFK Journey Season Progression & Daily Reset Tracker',
    metaDescription: 'Track AFK Journey seasonal events, Season Resonance level caps, talent tree points, and daily server resets.',
    h1: 'AFK Journey Season Progression & Event Tracker',
    canonicalPath: '/tools/afkj-season-tracker',
    howToGuide: {
      overview: 'Monitor seasonal quest deadlines, Supreme Arena tallying times, and season level milestones.',
      steps: [
        { title: 'Select Season Chapter', description: 'Choose Song of Strife or current active season event.' },
        { title: 'Track Season Level', description: 'Record current Season Resonance Level (1 to 500+).' },
        { title: 'View Event Countdown', description: 'Track live countdowns for World Bosses and Supreme Arena reset.' }
      ]
    },
    formulaExplained: {
      title: 'Season Talent & Level Scaling',
      details: 'Season Resonance levels stack on top of base Resonance. Season Talents unlock specialized combat passives for Season PvP and PvE.\n\nWorked Example 1: Reaching Season Level 200 adds a flat +15% stat bonus to your base Resonance level attributes.\nWorked Example 2: Investing 50 points into the Season Talent tree can unlock a 10% damage reduction passive for all Wilder heroes in season-specific modes.',
      mathSnippet: 'Total_Stats = Base_Resonance_Stats + Season_Level_Stats'
    },
    faqs: [
      { question: 'What happens to Season Levels when a season ends?', answer: 'Season Levels reset at the start of a new season, but permanent rewards, titles, and cosmetics remain unlocked.' },
      { question: 'Do I keep my Season Levels after the season ends?', answer: 'No, Season Levels reset to 1 at the start of a new season, but you receive permanent rewards based on your peak progress.' },
      { question: 'What are District Quests?', answer: 'District Quests are seasonal missions that grant high amounts of Season Essence and are required to progress the seasonal story arc.' }
    ],
    proTips: [
      'Complete District Quests as soon as they unlock to maximize Season Essence drops and push Season Resonance.'
    ],
    relatedToolIds: ['afkj-resource-planner', 'afkj-daily-boss-planner']
  },
  {
    id: 'mogo-sticker-tracker',
    slug: 'mogo-sticker-tracker',
    name: 'Monopoly GO Album Sticker & Duplicate Vault Tracker',
    gameId: 'mogo',
    categoryId: 'trackers',
    icon: 'Sparkles',
    shortDescription: 'Track active album sets (1–21), missing 4★/5★ stickers, gold duplicates, and vault star value (800-Star Wild Vault).',
    description: 'Complete sticker album completion and duplicate vault tracker for Monopoly GO. Check off stickers across all 21 sets, calculate total star value for the 800-Star Wild Sticker Vault, and flag tradeable 4-star and 5-star duplicates.',
    badge: 'Sticker Album',
    rating: 4.98,
    reviewsCount: 5240,
    userCount: '210k+ players',
    featured: true,
    tags: ['monopoly go', 'sticker tracker', 'album tracker', 'gold stickers', 'wild sticker', 'duplicate vault'],
    seoTitle: 'Monopoly GO Sticker Tracker & Duplicate Vault Calculator',
    metaDescription: 'Track your Monopoly GO sticker album sets, missing 4★ and 5★ cards, gold duplicates, and 800-star vault exchange progress.',
    h1: 'Monopoly GO Album Sticker & Duplicate Vault Tracker',
    canonicalPath: '/tools/mogo-sticker-tracker',
    howToGuide: {
      overview: 'Mark owned and duplicate stickers across Sets 1 to 21 to view completion percentage and total vault stars.',
      steps: [
        { title: 'Select Album Set', description: 'Choose Sets 1 through 21 (e.g. Monopoly Games / Marvel GO).' },
        { title: 'Check Off Stickers', description: 'Toggle owned stickers and input duplicate count (+1, +2, +3).' },
        { title: 'View Vault Stars', description: 'Check remaining stars required for the 800-Star Wild Sticker Vault.' }
      ]
    },
    formulaExplained: {
      title: 'Vault Star Value Math',
      details: 'Vault Stars = Sum(Duplicate_Count × Sticker_Star_Rating). 1-star duplicate = 1 pt, 5-star duplicate = 5 pts. Gold stickers yield double star value.\n\nWorked Example 1: Having 10x 1-star duplicates and 2x 5-star duplicates gives 10*1 + 2*5 = 20 vault stars.\nWorked Example 2: A single 5-star Gold duplicate is worth 10 stars towards your 800-star Wild Vault goal.',
      mathSnippet: 'Total_Stars = Sum(Dupes × Star_Rating)'
    },
    faqs: [
      { question: 'When is the best time to open the 800-Star Vault in Monopoly GO?', answer: 'Open the 800-Star Vault during a Sticker Boom flash event (+50% extra stickers per pack) to maximize new cards and wild sticker value.' },
      { question: 'Do Gold stickers count for more stars?', answer: 'Yes, Gold stickers are worth double their star rating when traded in for vault rewards (e.g., a 4-star Gold is worth 8 stars).' },
      { question: 'What is a Wild Sticker?', answer: 'A Wild Sticker allows you to choose ANY missing sticker from your current album, including Gold stickers, to complete a set.' }
    ],
    proTips: [
      'Save your 5-star duplicates for Golden Blitz trading windows or 1:1 direct trades rather than turning them into vault stars.'
    ],
    relatedToolIds: ['mogo-trade-matching', 'mogo-event-timers', 'mogo-free-dice-links']
  },
  {
    id: 'mogo-trade-matching',
    slug: 'mogo-trade-matching',
    name: 'Monopoly GO Safe Exchange Trade Matcher & Value Calculator',
    gameId: 'mogo',
    categoryId: 'calculators',
    icon: 'ArrowLeftRight',
    shortDescription: 'Calculate fair trade ratios (5★ for 5★, 15★ for 5★), verify Golden Blitz values, and follow anti-scam safe exchange.',
    description: 'Verify fair sticker trade offers in Monopoly GO. Match your duplicate 4-star and 5-star stickers with missing cards, calculate star trading exchange rates, and follow official Safe Exchange in-game protocols.',
    badge: 'Safe Trading',
    rating: 4.96,
    reviewsCount: 4180,
    userCount: '175k+ players',
    featured: true,
    tags: ['monopoly go', 'trade matching', 'safe exchange', 'golden blitz', '5 star trade', 'sticker trade ratio'],
    seoTitle: 'Monopoly GO Sticker Trade Matcher & Fair Value Calculator',
    metaDescription: 'Find fair sticker trades in Monopoly GO. Calculate 4★/5★ trade values, Golden Blitz exchange ratios, and avoid sticker scams.',
    h1: 'Monopoly GO Safe Exchange Trade Matcher',
    canonicalPath: '/tools/mogo-trade-matching',
    howToGuide: {
      overview: 'Input offered stickers and requested stickers to evaluate trade fairness and star equivalency.',
      steps: [
        { title: 'Select Offered Stickers', description: 'Choose duplicates you are willing to send (e.g. 2x 4-star cards or 15 stars).' },
        { title: 'Select Requested Card', description: 'Choose the missing 5-star card or Golden Blitz card you need.' },
        { title: 'Check Fairness Index', description: 'Review market ratio rating and turn on in-game Safe Exchange toggle.' }
      ]
    },
    formulaExplained: {
      title: 'Sticker Trade Value Index',
      details: '1x 5★ Regular = 1x 5★ Regular OR ~15-20 Stars | 1x 5★ Gold = 2x 5★ Regular (during Golden Blitz event).\n\nWorked Example 1: Trading a Room to Rent (4-star) for 12 stars is considered a standard fair trade ratio (3:1).\nWorked Example 2: During Golden Blitz, you can trade 1x 5-star Gold sticker for 2x 5-star Regular stickers or approx 30-40 stars.',
      mathSnippet: 'Trade_Fairness = Offered_Star_Value / Target_Market_Value'
    },
    faqs: [
      { question: 'How does Safe Exchange work in Monopoly GO?', answer: 'When sending a sticker trade, toggle "Make an exchange!" in-game so both players must accept the proposal before stickers leave your inventory.' },
      { question: 'Can you trade Gold stickers anytime?', answer: 'No, Gold stickers can only be traded during limited-time "Golden Blitz" events, and only specific Gold stickers are tradeable each time.' },
      { question: 'What is a fair star price for a 5-star sticker?', answer: 'The market rate usually fluctuates between 15 and 25 stars for a single non-gold 5-star sticker depending on rarity and demand.' }
    ],
    proTips: [
      'Always use in-game Safe Exchange when trading with players outside your trusted friends list.'
    ],
    relatedToolIds: ['mogo-sticker-tracker', 'mogo-free-dice-links']
  },
  {
    id: 'mogo-free-dice-links',
    slug: 'mogo-free-dice-links',
    name: 'Monopoly GO Verified Free Dice Links & Daily Claim Tracker',
    gameId: 'mogo',
    categoryId: 'trackers',
    icon: 'Gift',
    shortDescription: 'Active verified daily free dice rolls, partner event tokens, and interactive "Claimed" checklist.',
    description: 'Get verified daily free dice links for Monopoly GO. Updated multiple times daily with official Scopely reward links (25 Free Dice, 30 Free Dice + Pink Pack, Partner Tokens) and an interactive account claim tracker.',
    badge: 'Free Dice',
    rating: 4.99,
    reviewsCount: 8900,
    userCount: '350k+ players',
    featured: true,
    tags: ['monopoly go', 'free dice links', 'daily dice', 'free rolls', 'partner tokens', 'dice claimer'],
    seoTitle: 'Monopoly GO Free Dice Links (Today) – Verified Rolls Tracker',
    metaDescription: 'Claim active verified daily free dice links for Monopoly GO. Interactive checklist to track claimed 25 & 30 free dice rolls.',
    h1: 'Monopoly GO Verified Free Dice Links & Daily Claim Tracker',
    canonicalPath: '/tools/mogo-free-dice-links',
    howToGuide: {
      overview: 'Click active dice links to claim free rolls directly in your Monopoly GO app and mark them as claimed.',
      steps: [
        { title: 'Check Active Links', description: 'View today’s tested and verified free dice links.' },
        { title: 'Click Claim Link', description: 'Tap link to launch Monopoly GO and claim 25–30 free rolls.' },
        { title: 'Mark as Claimed', description: 'Toggle checkbox so you don\'t re-open claimed links.' }
      ]
    },
    formulaExplained: {
      title: 'Free Dice Generation Schedule',
      details: 'Scopely releases 2 to 4 official free dice links daily via social channels, yielding 50–100 extra dice rolls per day.\n\nWorked Example 1: Claiming 3 active links of 25 dice each gives you a total of 75 rolls for your daily tournament push.\nWorked Example 2: If a special event is active, a link might provide 30 dice plus 200 Partner Tokens.',
      mathSnippet: 'Daily_Free_Dice = Sum(Active_Verified_Link_Values)'
    },
    faqs: [
      { question: 'Why do some Monopoly GO dice links say "Already Claimed"?', answer: 'Each free dice link can only be redeemed once per Monopoly GO user ID. If you previously claimed it on social media, it will show as claimed.' },
      { question: 'How long do free dice links last?', answer: 'Most links are valid for approximately 48 to 72 hours before they expire and become unusable.' },
      { question: 'Can I get banned for using these links?', answer: 'No, these links are official rewards generated by Scopely (the game developer) and distributed through verified social media channels.' }
    ],
    proTips: [
      'Bookmark this page and check back at 12 PM EST and 8 PM EST for newly published reward links.'
    ],
    relatedToolIds: ['mogo-event-timers', 'mogo-sticker-tracker']
  },
  {
    id: 'mogo-event-timers',
    slug: 'mogo-event-timers',
    name: 'Monopoly GO Flash Event Timers & Schedule Clock',
    gameId: 'mogo',
    categoryId: 'trackers',
    icon: 'Clock',
    shortDescription: 'Live countdowns for High Roller, Wheel Boost, Golden Blitz, Mega Heist, Sticker Boom, and Solo Milestones.',
    description: 'Stay on top of Monopoly GO daily flash events and banner tournaments. Track High Roller (+500x multiplier), Wheel Boost (2x spins), Sticker Boom (+50% stickers), Landmark Rush, and Golden Blitz schedules.',
    badge: 'Event Schedule',
    rating: 4.95,
    reviewsCount: 3820,
    userCount: '160k+ players',
    featured: false,
    tags: ['monopoly go', 'event timers', 'high roller', 'wheel boost', 'sticker boom', 'golden blitz', 'flash events'],
    seoTitle: 'Monopoly GO Flash Event Timers & Today’s Schedule',
    metaDescription: 'Track live Monopoly GO daily flash events: High Roller, Wheel Boost, Sticker Boom, Mega Heist, and Golden Blitz countdowns.',
    h1: 'Monopoly GO Flash Event Timers & Schedule Clock',
    canonicalPath: '/tools/mogo-event-timers',
    howToGuide: {
      overview: 'Monitor active and upcoming flash event boost windows to stack Wheel Boost and High Roller.',
      steps: [
        { title: 'View Active Boosts', description: 'See currently active flash events and remaining duration.' },
        { title: 'Check Upcoming Schedule', description: 'Plan dice spending around Sticker Boom and Wheel Boost times.' },
        { title: 'Set Event Reminders', description: 'Prepare saved dice for High Roller 500x multiplier windows.' }
      ]
    },
    formulaExplained: {
      title: 'Flash Event Stacking Synergy',
      details: 'Stacking Wheel Boost (2x spins) + Color Wheel Rush yields 4 spins per full hotel board clear, doubling sticker pack output.\n\nWorked Example 1: Completing a set of hotels during Wheel Boost gives 2 spins. If Color Wheel Rush is also active, you get 2 + 2 = 4 spins per set.\nWorked Example 2: Rolling with a 500x multiplier during High Roller (5 mins) can yield 50,000+ points in a single session if you hit the right tiles.',
      mathSnippet: 'Wheel_Spin_Yield = Base_Spins × Wheel_Boost_Multiplier'
    },
    faqs: [
      { question: 'How long do Monopoly GO flash events last once activated?', answer: 'Flash events trigger upon logging into the game during their active schedule window and run for 5 to 30 minutes.' },
      { question: 'What is High Roller?', answer: 'High Roller is a flash event that increases your maximum roll multiplier up to 1000x, allowing for massive point gains in tournaments.' },
      { question: 'What is a Sticker Boom?', answer: 'Sticker Boom is a flash event that grants 50% more stickers from every pack you open while the timer is active.' }
    ],
    proTips: [
      'Log into Monopoly GO during overlapping Wheel Boost and Sticker Boom windows for maximum sticker pack gains.'
    ],
    relatedToolIds: ['mogo-free-dice-links', 'mogo-upgrade-cost-planner']
  },
  {
    id: 'mogo-shield-finder',
    slug: 'mogo-shield-finder',
    name: 'Monopoly GO Landmark Shield Defense & Risk Calculator',
    gameId: 'mogo',
    categoryId: 'calculators',
    icon: 'Shield',
    shortDescription: 'Calculate shield capacity (3-5 max), rebuild costs vs shield maintenance, and Bank Heist cash protection.',
    description: 'Protect your board cash and landmarks in Monopoly GO. Track shield capacity, calculate rebuilding costs after Shutdown attacks versus rolling for full shield replenishment, and optimize stored cash balance before Bank Heists.',
    badge: 'Shield Defense',
    rating: 4.91,
    reviewsCount: 2450,
    userCount: '80k+ players',
    featured: false,
    tags: ['monopoly go', 'shield finder', 'landmark defense', 'bank heist protection', 'shutdown rebuild', 'shields'],
    seoTitle: 'Monopoly GO Landmark Shield Defense & Risk Calculator',
    metaDescription: 'Calculate shield defense costs, landmark rebuild economics, and Bank Heist cash loss risk in Monopoly GO.',
    h1: 'Monopoly GO Landmark Shield Defense & Risk Calculator',
    canonicalPath: '/tools/mogo-shield-finder',
    howToGuide: {
      overview: 'Input current shields and board landmark stage to calculate repair costs versus dice needed to refill shields.',
      steps: [
        { title: 'Enter Shield Count', description: 'Input current active shields (0 to 5 max).' },
        { title: 'Enter Stored Cash', description: 'Input unspent cash balance to calculate Bank Heist loss exposure.' },
        { title: 'Evaluate Rebuild Strategy', description: 'Determine whether to leave board empty or maintain full shields.' }
      ]
    },
    formulaExplained: {
      title: 'Bank Heist & Shutdown Protection Math',
      details: 'Large Bank Heist steals ~15-25% of unspent cash. Rebuilding a destroyed landmark costs 50% of its original upgrade cash.\n\nWorked Example 1: If your landmark upgrade costs 10 Million, repairing it after a Shutdown costs exactly 5 Million.\nWorked Example 2: Holding 100 Million cash with 0 shields puts you at risk of losing 25 Million in a single Mega Heist.',
      mathSnippet: 'Rebuild_Cost = Base_Upgrade_Cost × 0.50'
    },
    faqs: [
      { question: 'Is it better to leave landmarks unbuilt to avoid Shutdowns?', answer: 'Yes! If you do not have enough cash to complete the entire board in one sitting, keep cash stored or complete board instantly to prevent attackers from destroying landmarks.' },
      { question: 'How do I get more shields?', answer: 'Land on the Shield tiles scattered around the board. If your shields are full, landing on a shield tile refunds the dice used for that roll.' },
      { question: 'Do shields protect against Bank Heists?', answer: 'No, shields only protect your Landmarks from Shutdown attacks. Your stored cash can still be stolen during a Bank Heist regardless of your shield count.' }
    ],
    proTips: [
      'Always roll on 1x multiplier until you land on Shield tiles to refill your shields efficiently without wasting dice.'
    ],
    relatedToolIds: ['mogo-upgrade-cost-planner', 'mogo-event-timers']
  },
  {
    id: 'mogo-upgrade-cost-planner',
    slug: 'mogo-upgrade-cost-planner',
    name: 'Monopoly GO Board Upgrade & Net Worth Cost Planner',
    gameId: 'mogo',
    categoryId: 'calculators',
    icon: 'Calculator',
    shortDescription: 'Calculate total board completion cash (25 house upgrades), Builder\'s Bash discounts, and net worth milestone levels.',
    description: 'Calculate exact cash required to upgrade landmarks and complete boards in Monopoly GO. Compute board completion costs (Board 1 to 500+), calculate Builder\'s Bash discount savings (-30% / -50%), and plan Net Worth level milestone rewards.',
    badge: 'Board Upgrade',
    rating: 4.94,
    reviewsCount: 3150,
    userCount: '125k+ players',
    featured: true,
    tags: ['monopoly go', 'upgrade cost planner', 'board cost', 'builders bash', 'landmark cost', 'net worth level'],
    seoTitle: 'Monopoly GO Board Upgrade Cost & Builder’s Bash Calculator',
    metaDescription: 'Calculate cash required to complete Monopoly GO boards, landmark upgrade costs, and Builder\'s Bash discount savings.',
    h1: 'Monopoly GO Board Upgrade & Net Worth Cost Planner',
    canonicalPath: '/tools/mogo-upgrade-cost-planner',
    howToGuide: {
      overview: 'Enter your current board number and net worth to calculate total cash needed to complete the board.',
      steps: [
        { title: 'Input Board Number', description: 'Select board level (e.g. Board 50 or Board 150).' },
        { title: 'Apply Builder\'s Bash', description: 'Toggle -30% or -50% flash event discount.' },
        { title: 'View Cash Requirement', description: 'See complete cash breakdown for all 5 landmarks and 25 house upgrades.' }
      ]
    },
    formulaExplained: {
      title: 'Board Upgrade Cost Formula',
      details: 'Total Board Cost = Base_Board_Cash × (1.12)^Board_Number × (1 - Discount_Percent). Completing 25 house upgrades spawns hotels on all tiles.\n\nWorked Example 1: If Board 10 costs 10M, Board 11 will cost approx 11.2M due to the 12% escalation factor.\nWorked Example 2: During a 50% Builder\'s Bash, a board that normally costs 100M can be completed for just 50M cash.',
      mathSnippet: 'Final_Board_Cost = Base_Cost × (1.12)^Board_Num × (1 - Discount%)'
    },
    faqs: [
      { question: 'What is Builder\'s Bash in Monopoly GO?', answer: 'Builder\'s Bash is a flash event that reduces landmark upgrade cash costs by 30% to 50%, allowing you to clear boards for far less cash.' },
      { question: 'How many upgrades are needed per board?', answer: 'Each board has 5 landmarks, and each landmark requires 5 upgrade levels, totaling 25 upgrades to progress to the next map.' },
      { question: 'Does Net Worth affect board costs?', answer: 'Directly, no. Board costs are tied to your current Board Number, though higher Net Worth unlocks permanent landmark cost reduction bonuses.' }
    ],
    proTips: [
      'Save your cash and upgrade boards exclusively during Builder\'s Bash or Landmark Rush flash events for bonus dice rewards.'
    ],
    relatedToolIds: ['mogo-event-timers', 'mogo-shield-finder']
  },
  {
    id: 'sk-damage-calc',
    slug: 'sk-damage-calc',
    name: 'Seven Knights Re:BIRTH Damage Output Calculator',
    gameId: 'sk',
    categoryId: 'calculators',
    icon: 'Swords',
    shortDescription: 'Calculate skill damage, crit multipliers, and resistance shred for PvE boss raids.',
    description: 'Calculate your hero damage output in Seven Knights Re:BIRTH. Analyze skill coefficients, critical damage multipliers, enemy defense shred, and damage resistance for optimal raid loadouts.',
    badge: 'Damage Calc',
    rating: 4.95,
    reviewsCount: 3500,
    userCount: '130k+ players',
    featured: true,
    tags: ['seven knights rebirth', 'damage calculator', 'pve raid', 'skill coefficients', 'dmg shred'],
    seoTitle: 'Seven Knights Re:BIRTH Damage Output Calculator',
    metaDescription: 'Calculate Seven Knights Re:BIRTH hero damage. Analyze skill coefficients, crit multipliers, and DEF shred for raid boss loadouts.',
    h1: 'Seven Knights Re:BIRTH Damage Output Calculator',
    canonicalPath: '/tools/sk-damage-calc',
    howToGuide: {
      overview: 'Configure hero stats and skill coefficients to simulate damage output against various boss resistance profiles.',
      steps: [
        { title: 'Input Hero Stats', description: 'Enter hero level, ATK, and crit damage.' },
        { title: 'Add Skill Multipliers', description: 'Input active skill coefficients.' },
        { title: 'Apply Resistance Shred', description: 'Enter enemy defense rating and defense shred percentage.' }
      ]
    },
    formulaExplained: {
      title: 'Damage Output Calculation',
      details: 'Total Damage = (Hero ATK × Skill Coefficient) × (1 + Crit DMG) × (1 - Enemy DEF Shred).\n\nWorked Example 1: A hero with 3,000 ATK and a 200% skill coefficient deals 6,000 base damage before modifiers.\nWorked Example 2: If the same hit crits with 100% Crit DMG bonus, total damage becomes 6,000 * (1 + 1.0) = 12,000.',
      mathSnippet: 'Dmg = (ATK × Coeff) × CritMult × DEFShred'
    },
    faqs: [
      { question: 'What is the maximum damage limit in raids?', answer: 'Damage limit depends on boss difficulty; focusing on defense shred is usually more impactful than raw ATK once base stats are optimized.' },
      { question: 'Does Crit Rate or Crit DMG matter more?', answer: 'Crit Rate is essential to ensure your hits actually crit, but once you reach a high enough rate, stacking Crit DMG provides the biggest boost to your overall DPS.' },
      { question: 'How does defense shred interact with defense?', answer: 'Defense shred reduces the enemy\'s armor value by a percentage, making your hits penetrate deeper and deal more raw damage.' }
    ],
    proTips: [
      'Prioritize defense shred for bosses with high innate damage reduction.'
    ],
    relatedToolIds: ['sk-team-builder', 'sk-gear-manager']
  },
  {
    id: 'sk-gear-manager',
    slug: 'sk-gear-manager',
    name: 'Seven Knights Re:BIRTH Gear Sell/Keep Valuation Tool',
    gameId: 'sk',
    categoryId: 'calculators',
    icon: 'Shield',
    shortDescription: 'Evaluate gear stats (sub-stats, set bonuses) to decide whether to sell, craft, or keep for hero builds.',
    description: 'Determine the value of your gear. Input base stats, sub-stats, and set bonuses to evaluate if gear should be sold for materials or kept for end-game hero builds.',
    badge: 'Gear Valuation',
    rating: 4.92,
    reviewsCount: 2800,
    userCount: '100k+ players',
    featured: false,
    tags: ['seven knights rebirth', 'gear valuation', 'sell or keep', 'gear stats'],
    seoTitle: 'Seven Knights Re:BIRTH Gear Sell/Keep Valuation Tool',
    metaDescription: 'Evaluate your Seven Knights Re:BIRTH gear stats. Determine whether to sell, upgrade, or keep gear pieces based on sub-stats and sets.',
    h1: 'Seven Knights Re:BIRTH Gear Sell/Keep Valuation Tool',
    canonicalPath: '/tools/sk-gear-manager',
    howToGuide: {
      overview: 'Enter gear piece stats to receive a keep/sell recommendation based on current meta gear standards.',
      steps: [
        { title: 'Input Gear Details', description: 'Select slot, base stat, and sub-stat values.' },
        { title: 'Check Set Bonus', description: 'Input gear set.' },
        { title: 'View Valuation', description: 'Receive recommendation: Keep, Sell, or Upgrade.' }
      ]
    },
    formulaExplained: {
      title: 'Gear Utility Scoring',
      details: 'Utility Score = Sum(Weighted Substat Values) + Set Bonus Synergy Score. High scores indicate priority keeping.\n\nWorked Example 1: A piece of gear with two Gold-tier ATK rolls (weight 10 each) scores 20 points, placing it in the "Keep" category.\nWorked Example 2: A piece with flat HP and low-tier resistance rolls scores under 5 points, resulting in a "Sell" recommendation.',
      mathSnippet: 'Score = Σ(Substat_Weight) + Set_Score'
    },
    faqs: [
      { question: 'What stats should I prioritize for DPS gear?', answer: 'Focus on Crit Rate, Crit Damage, and ATK sub-stats for all DPS heroes.' },
      { question: 'Should I keep gear with flat stats?', answer: 'Generally, percentage-based stats are significantly better than flat stats for end-game progression, so flat-stat gear is usually safe to sell.' },
      { question: 'What is a "God Roll" for gear?', answer: 'A "God Roll" is a piece of gear where all sub-stats are the highest possible tier and perfectly match the hero\'s role (e.g., all offensive stats for a DPS).' }
    ],
    proTips: [
      'Sell gear with poor sub-stats early on; don\'t waste upgrade gold on non-meta pieces.'
    ],
    relatedToolIds: ['sk-damage-calc', 'sk-shop-optimizer']
  },
  {
    id: 'sk-team-builder',
    slug: 'sk-team-builder',
    name: 'Seven Knights Re:BIRTH 5v5 Team Builder',
    gameId: 'sk',
    categoryId: 'generators',
    icon: 'Users',
    shortDescription: 'Build 5v5 teams with optimized positioning, role balancing, and hero synergies.',
    description: 'Construct 5v5 teams for Arena and PvE. Balance front-line tanks with back-line support and DPS, optimizing for faction bonuses and skill synergies.',
    badge: 'Team Builder',
    rating: 4.96,
    reviewsCount: 4200,
    userCount: '170k+ players',
    featured: true,
    tags: ['seven knights rebirth', 'team builder', 'arena comps', 'synergy'],
    seoTitle: 'Seven Knights Re:BIRTH 5v5 Team Builder',
    metaDescription: 'Build optimized Seven Knights Re:BIRTH teams. Balance roles, calculate synergies, and optimize positioning for Arena and PvE.',
    h1: 'Seven Knights Re:BIRTH 5v5 Team Builder',
    canonicalPath: '/tools/sk-team-builder',
    howToGuide: {
      overview: 'Arrange 5 heroes on the 5v5 team slots to achieve maximum synergy and role balance.',
      steps: [
        { title: 'Select Heroes', description: 'Choose 5 heroes covering Tank, DPS, Support, and Utility roles.' },
        { title: 'Check Role Balance', description: 'Ensure you have adequate healing/shielding and front-line protection.' },
        { title: 'Review Synergies', description: 'Verify skill synergy and party-wide buffs.' }
      ]
    },
    formulaExplained: {
      title: 'Team Power & Synergy',
      details: 'Total Team Power = Sum(Hero Power) × (1 + Synergy Buff Multiplier). Effective teams maximize buff uptime.\n\nWorked Example 1: A team with 100k total power receiving a 10% Faction synergy bonus results in 110k effective team power.\nWorked Example 2: Pairing a high-ATK DPS with a support that grants a 50% ATK buff results in a 1.5x damage multiplier for your primary damage dealer.',
      mathSnippet: 'Team_Power = Sum(Power) × Synergy'
    },
    faqs: [
      { question: 'What is the best team for early game?', answer: 'A balanced team of 1 tank, 2 DPS, 1 support, and 1 utility hero is generally recommended.' },
      { question: 'How do hero positions affect the match?', answer: 'Front-row heroes are targeted more frequently by standard attacks, so place your tankiest heroes there to protect your back-line DPS.' },
      { question: 'What are faction synergy bonuses?', answer: 'Faction synergies are triggered when multiple heroes from the same faction (e.g., Seven Knights, Dark Knights) are used together, granting team-wide stat boosts.' }
    ],
    proTips: [
      'Experiment with position order; some heroes have passive buffs tied to their position in the lineup.'
    ],
    relatedToolIds: ['sk-damage-calc', 'sk-gacha-planner']
  },
  {
    id: 'sk-ruby-calc',
    slug: 'sk-ruby-calc',
    name: 'Seven Knights Re:BIRTH Ruby Efficiency Calculator',
    gameId: 'sk',
    categoryId: 'calculators',
    icon: 'Coins',
    shortDescription: 'Plan ruby farming, evaluate daily ruby income, and prioritize ruby spending.',
    description: 'Optimize your ruby economy. Track daily ruby income sources, calculate efficiency of ruby spending in shop vs summons, and plan for upcoming featured banner pulls.',
    badge: 'Ruby Planner',
    rating: 4.93,
    reviewsCount: 3100,
    userCount: '120k+ players',
    featured: false,
    tags: ['seven knights rebirth', 'ruby calculator', 'economy', 'spending optimization'],
    seoTitle: 'Seven Knights Re:BIRTH Ruby Efficiency Calculator',
    metaDescription: 'Plan your Seven Knights Re:BIRTH ruby economy. Calculate income, optimize spending, and plan banner pulls.',
    h1: 'Seven Knights Re:BIRTH Ruby Efficiency Calculator',
    canonicalPath: '/tools/sk-ruby-calc',
    howToGuide: {
      overview: 'Track ruby sources and set spending priorities to maximize progression efficiency.',
      steps: [
        { title: 'Input Ruby Income', description: 'Enter daily/weekly ruby sources (dailies, arena, login).' },
        { title: 'Set Spending Priorities', description: 'Define must-buy items vs optional summons.' },
        { title: 'View Efficiency', description: 'Receive spending recommendations based on your current goal.' }
      ]
    },
    formulaExplained: {
      title: 'Ruby Spend Efficiency',
      details: 'Efficiency = (Item Value / Ruby Cost). Prioritize items with Efficiency Score > 1.5.\n\nWorked Example 1: Buying a 10+1 summon for 3,000 rubies (approx 272 per hero) is more efficient than single pulls (300 each).\nWorked Example 2: A limited-time growth pack that provides materials worth 5,000 rubies for only 2,000 rubies has an efficiency score of 2.5.',
      mathSnippet: 'Efficiency = Value / Cost'
    },
    faqs: [
      { question: 'Is it better to spend rubies on gear summons or hero summons?', answer: 'Generally, prioritize hero summons to fill out your roster before heavily investing in gear.' },
      { question: 'How can I earn free rubies fast?', answer: 'Complete all daily and weekly missions, participate in Arena rankings, and climb the Tower of Abyss for the highest ruby income.' },
      { question: 'Should I spend rubies on shop refreshes?', answer: 'Only refresh the shop if you are looking for specific high-tier progression materials and have rubies to spare.' }
    ],
    proTips: [
      'Save rubies for meta-defining hero banners.'
    ],
    relatedToolIds: ['sk-shop-optimizer', 'sk-gacha-planner']
  },
  {
    id: 'sk-shop-optimizer',
    slug: 'sk-shop-optimizer',
    name: 'Seven Knights Re:BIRTH Shop Value Optimizer',
    gameId: 'sk',
    categoryId: 'calculators',
    icon: 'ShoppingCart',
    shortDescription: 'Compare shop pack values, identify efficient bundles, and plan resource purchases.',
    description: 'Maximize your resources. Compare the value of different shop bundles, identify the most efficient purchase options for rubies, materials, and hero growth items.',
    badge: 'Shop Value',
    rating: 4.91,
    reviewsCount: 2600,
    userCount: '90k+ players',
    featured: false,
    tags: ['seven knights rebirth', 'shop optimizer', 'pack value', 'resource purchase'],
    seoTitle: 'Seven Knights Re:BIRTH Shop Value Optimizer',
    metaDescription: 'Maximize value in Seven Knights Re:BIRTH. Compare shop bundles and identify the most efficient resource purchases.',
    h1: 'Seven Knights Re:BIRTH Shop Value Optimizer',
    canonicalPath: '/tools/sk-shop-optimizer',
    howToGuide: {
      overview: 'Compare bundle contents and costs to find the best value for your real-money or ruby purchases.',
      steps: [
        { title: 'Input Shop Bundle', description: 'Enter bundle cost and contents (e.g. rubies, materials, summon tickets).' },
        { title: 'Compare Values', description: 'View cost per unit of resource.' },
        { title: 'Optimize Purchase', description: 'Prioritize bundles with lowest cost per unit.' }
      ]
    },
    formulaExplained: {
      title: 'Bundle Value Index',
      details: 'Value Index = (Resource Quantity / Bundle Price). Higher index is better.\n\nWorked Example 1: A $10 pack containing 3,000 rubies has a value index of 300 per dollar.\nWorked Example 2: A $20 pack containing 5,000 rubies and 10 summon tickets (worth 3,000 rubies) has a value index of 400 per dollar.',
      mathSnippet: 'ValueIndex = Qty / Price'
    },
    faqs: [
      { question: 'Are daily shop refreshes worth it?', answer: 'Yes, if you are actively farming for specific growth materials.' },
      { question: 'Which bundles should F2P players buy?', answer: 'Focus on high-efficiency monthly cards or seasonal event passes that offer long-term ruby and material generation.' },
      { question: 'What is the "First Purchase" bonus?', answer: 'Many ruby packs offer double the amount of rubies for the first purchase, making them exceptionally high-value for new players.' }
    ],
    proTips: [
      'Focus on packs that offer long-term progression materials rather than just immediate, temporary boosts.'
    ],
    relatedToolIds: ['sk-ruby-calc', 'sk-gear-manager']
  },
  {
    id: 'sk-gacha-planner',
    slug: 'sk-gacha-planner',
    name: 'Seven Knights Re:BIRTH Gacha Summon Planner',
    gameId: 'sk',
    categoryId: 'calculators',
    icon: 'Sparkles',
    shortDescription: 'Plan summon budgets, track pity counts, and calculate pull probabilities for featured banners.',
    description: 'Plan your gacha pulls. Track your pity progress, calculate the number of summons needed for a featured hero, and estimate probabilities for successful pulls based on current ruby reserves.',
    badge: 'Gacha Planner',
    rating: 4.94,
    reviewsCount: 3200,
    userCount: '140k+ players',
    featured: true,
    tags: ['seven knights rebirth', 'gacha planner', 'pity tracker', 'summons'],
    seoTitle: 'Seven Knights Re:BIRTH Gacha Summon Planner',
    metaDescription: 'Plan Seven Knights Re:BIRTH pulls. Track pity, calculate summon needs, and estimate success probabilities.',
    h1: 'Seven Knights Re:BIRTH Gacha Summon Planner',
    canonicalPath: '/tools/sk-gacha-planner',
    howToGuide: {
      overview: 'Input ruby/ticket counts to track pity and determine probability of pulling featured heroes.',
      steps: [
        { title: 'Input Resources', description: 'Enter total rubies and summon tickets.' },
        { title: 'Track Pity', description: 'Enter current pull count toward pity.' },
        { title: 'Calculate Success', description: 'View probability of success and remaining summons to pity.' }
      ]
    },
    formulaExplained: {
      title: 'Summon Probability',
      details: 'Probability = 1 - (1 - Featured_Rate)^Summons. Pity resets upon successful featured pull.\n\nWorked Example 1: With a featured rate of 1%, making 100 pulls gives you a ~63.4% chance of getting the hero before pity.\nWorked Example 2: To guarantee a 5-star, you must reach the hard pity threshold (usually 180 pulls), which resets the counter upon success.',
      mathSnippet: 'P(Success) = 1 - (1 - Rate)^Summons'
    },
    faqs: [
      { question: 'What is the hard pity rate for featured heroes?', answer: 'Check in-game banner details for the specific hard pity threshold.' },
      { question: 'Does pity carry over between banners?', answer: 'In Seven Knights Re:BIRTH, pity usually only carries over between banners of the exact same type. Check the rules for each specific limited-time banner.' },
      { question: 'What happens if I pull the hero before pity?', answer: 'The pity counter resets to zero immediately upon pulling the featured hero, regardless of how many pulls were remaining.' }
    ],
    proTips: [
      'Always aim to have enough resources for hard pity before starting major pulls on a new banner.'
    ],
    relatedToolIds: ['sk-team-builder', 'sk-ruby-calc']
  },
  ...COIN_MASTER_TOOLS,
  ...EXTRA_TOOLS,
  ...EXTRA_TOOLS_PART_2,
  ...EXTRA_TOOLS_PART_3
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find((t) => t.slug === slug || t.id === slug);
}

export function getGameById(id: string): GameInfo | undefined {
  return GAMES.find((g) => g.id === id || g.slug === id);
}

export function getCategoryById(id: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.id === id || c.slug === id);
}


