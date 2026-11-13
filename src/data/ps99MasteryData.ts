/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// PS99 Cumulative XP formula: floor(1/4 * sum_{i=1}^{L-1} floor(i + 300 * 2^(i / 7)))
export function getCumulativeXp(level: number): number {
  if (level <= 1) return 0;
  if (level > 99) level = 99;
  let xp = 0;
  for (let i = 1; i < level; i++) {
    xp += Math.floor(i + 300 * Math.pow(2, i / 7));
  }
  return Math.floor(xp / 4);
}

// Precomputed 1 to 99 cumulative table
export const PS99_MASTERY_XP_TABLE: number[] = Array.from({ length: 100 }, (_, lvl) =>
  lvl === 0 ? 0 : getCumulativeXp(lvl)
);

export const PS99_MAX_MASTERY_XP = PS99_MASTERY_XP_TABLE[99]; // 13,034,431

export interface MasteryActionOption {
  id: string;
  name: string;
  xpPerAction: number;
  unit: string;
}

export interface MasteryTrack {
  id: string;
  name: string;
  iconName: string;
  description: string;
  actions: MasteryActionOption[];
  perks: {
    level: number;
    perk: string;
  }[];
}

export const PS99_MASTERY_TRACKS: MasteryTrack[] = [
  {
    id: 'eggs',
    name: 'Eggs Mastery',
    iconName: 'Egg',
    description: 'Hatch normal and exclusive eggs to gain mastery XP and unlock auto-hatch speed, cheaper eggs, and free hatches.',
    actions: [
      { id: 'normal-egg', name: 'Normal Egg', xpPerAction: 0.4, unit: 'eggs' },
      { id: 'exclusive-egg', name: 'Exclusive Egg', xpPerAction: 25000, unit: 'exclusive eggs' }
    ],
    perks: [
      { level: 50, perk: 'Faster Egg Hatching speed + increased hatch luck' },
      { level: 75, perk: 'Reduced coin cost when opening eggs' },
      { level: 85, perk: 'Massive auto-hatch speed boost' },
      { level: 92, perk: 'Bonus chance to hatch Golden and Rainbow variants directly' },
      { level: 96, perk: 'Maximum hatch speed cap increased' },
      { level: 99, perk: 'Free Egg Hatching: eggs no longer consume coins' }
    ]
  },
  {
    id: 'fishing',
    name: 'Fishing Mastery',
    iconName: 'Fish',
    description: 'Cast your line in fishing spots across the world to boost catch rates and unlock Corrum/Huge fishing odds.',
    actions: [
      { id: 'fishing-cast', name: 'Fishing Cast', xpPerAction: 25, unit: 'casts' }
    ],
    perks: [
      { level: 50, perk: 'Faster bite times and increased shard drop rates' },
      { level: 75, perk: 'Deep water fishing unlocked with better rod luck' },
      { level: 85, perk: 'Increased chance to reel in Magic Shards & Chests' },
      { level: 92, perk: 'Substantially reduced catch struggle mini-game resistance' },
      { level: 96, perk: 'Higher odds for secret and rare fish catches' },
      { level: 99, perk: 'Doubled fishing yields and max Huge Poseidon catch chance' }
    ]
  },
  {
    id: 'superior-chests',
    name: 'Superior Mini Chests',
    iconName: 'Package',
    description: 'Break naturally spawning Superior Mini Chests in endgame breakable areas for 3,000 XP per chest.',
    actions: [
      { id: 'superior-chest', name: 'Superior Mini Chest', xpPerAction: 3000, unit: 'chests' }
    ],
    perks: [
      { level: 50, perk: 'Increased Superior Mini Chest spawn frequency' },
      { level: 75, perk: 'Higher drop rate of diamond bags from mini chests' },
      { level: 85, perk: 'Rare item loot table enhanced for Superior Chests' },
      { level: 92, perk: 'Supercharged break speed against mini chests' },
      { level: 96, perk: 'Maximum diamond multiplier on chest breaks' },
      { level: 99, perk: 'Superior Chests yield doubled item drops and bonus gems' }
    ]
  },
  {
    id: 'breakables',
    name: 'Breakables Mastery',
    iconName: 'Hammer',
    description: 'Break coins, crates, safes, and vaults in any world zone (1 XP gained per 3 breakables destroyed).',
    actions: [
      { id: 'breakables', name: 'Breakables Destroyed', xpPerAction: 1 / 3, unit: 'breakables' }
    ],
    perks: [
      { level: 50, perk: 'Bonus currency drops from broken objects' },
      { level: 75, perk: 'Critical break chance increased across all zones' },
      { level: 85, perk: 'Increased safe and vault spawn frequency' },
      { level: 92, perk: 'Explosive chain-reaction break damage boosted' },
      { level: 96, perk: 'Endgame zone break speed boosted' },
      { level: 99, perk: 'Breakables drop permanent doubled bonus currency' }
    ]
  },
  {
    id: 'boost-exchange',
    name: 'Boost Exchange',
    iconName: 'ArrowRightLeft',
    description: 'Exchange Millionaire Bucks at the Boost Exchange kiosk in the Trading Plaza (30 XP per Millionaire Bucks).',
    actions: [
      { id: 'millionaire-bucks', name: 'Millionaire Bucks Exchanged', xpPerAction: 30, unit: 'Millionaire Bucks' }
    ],
    perks: [
      { level: 50, perk: 'Discount on exchange fees for currency swaps' },
      { level: 75, perk: 'Unlocked high-tier trade voucher exchange limits' },
      { level: 85, perk: 'Faster boost exchange refill cooldowns' },
      { level: 92, perk: 'Additional rare boost bundle options unlocked' },
      { level: 96, perk: 'Bonus Millionaire Bucks awarded per successful trade' },
      { level: 99, perk: 'Maximum exchange rate discount with zero penalty fees' }
    ]
  },
  {
    id: 'potions',
    name: 'Potions Mastery',
    iconName: 'FlaskConical',
    description: 'Drink and upgrade potions to gain mastery XP, prolong potion buff durations, and unlock automatic brewing.',
    actions: [
      { id: 'drink-t1', name: 'Drink Tier 1', xpPerAction: 2, unit: 'potions' },
      { id: 'drink-t2', name: 'Drink Tier 2', xpPerAction: 3, unit: 'potions' },
      { id: 'drink-t3', name: 'Drink Tier 3', xpPerAction: 6, unit: 'potions' },
      { id: 'drink-t4', name: 'Drink Tier 4', xpPerAction: 10, unit: 'potions' },
      { id: 'drink-t5', name: 'Drink Tier 5', xpPerAction: 18, unit: 'potions' },
      { id: 'drink-t6', name: 'Drink Tier 6', xpPerAction: 30, unit: 'potions' },
      { id: 'drink-t7', name: 'Drink Tier 7', xpPerAction: 65, unit: 'potions' },
      { id: 'drink-t8', name: 'Drink Tier 8', xpPerAction: 90, unit: 'potions' },
      { id: 'drink-t9', name: 'Drink Tier 9', xpPerAction: 135, unit: 'potions' },
      { id: 'drink-t10', name: 'Drink Tier 10', xpPerAction: 180, unit: 'potions' },
      { id: 'drink-t11', name: 'Drink Tier 11', xpPerAction: 0, unit: 'potions' },
      { id: 'upgrade-t1', name: 'Upgrade T1 → T2', xpPerAction: 10, unit: 'potions' },
      { id: 'upgrade-t2', name: 'Upgrade T2 → T3', xpPerAction: 25, unit: 'potions' },
      { id: 'upgrade-t3', name: 'Upgrade T3 → T4', xpPerAction: 45, unit: 'potions' },
      { id: 'upgrade-t4', name: 'Upgrade T4 → T5', xpPerAction: 70, unit: 'potions' },
      { id: 'upgrade-t5', name: 'Upgrade T5 → T6', xpPerAction: 100, unit: 'potions' },
      { id: 'upgrade-t6', name: 'Upgrade T6 → T7', xpPerAction: 140, unit: 'potions' },
      { id: 'upgrade-t7', name: 'Upgrade T7 → T8', xpPerAction: 190, unit: 'potions' },
      { id: 'upgrade-t8', name: 'Upgrade T8 → T9', xpPerAction: 300, unit: 'potions' },
      { id: 'upgrade-t9', name: 'Upgrade T9 → T10', xpPerAction: 470, unit: 'potions' },
      { id: 'upgrade-t10', name: 'Upgrade T10 → T11', xpPerAction: 0, unit: 'potions' }
    ],
    perks: [
      { level: 50, perk: 'Upgraded potion buff durations extended' },
      { level: 75, perk: 'Cost discount when upgrading high-tier potions' },
      { level: 85, perk: 'Doubled potion duration on Tier 7+ potions' },
      { level: 92, perk: 'Free extra potion active slot unlocked' },
      { level: 96, perk: 'Potion craft output has chance to duplicate' },
      { level: 99, perk: 'Auto-brew potions with zero combine failures' }
    ]
  },
  {
    id: 'enchants',
    name: 'Enchants Mastery',
    iconName: 'BookOpen',
    description: 'Upgrade enchant books to gain mastery XP, expand book loadout effectiveness, and unlock high-tier fusions.',
    actions: [
      { id: 'upgrade-b1', name: 'Upgrade Book T1 → T2', xpPerAction: 15, unit: 'books' },
      { id: 'upgrade-b2', name: 'Upgrade Book T2 → T3', xpPerAction: 35, unit: 'books' },
      { id: 'upgrade-b3', name: 'Upgrade Book T3 → T4', xpPerAction: 65, unit: 'books' },
      { id: 'upgrade-b4', name: 'Upgrade Book T4 → T5', xpPerAction: 90, unit: 'books' },
      { id: 'upgrade-b5', name: 'Upgrade Book T5 → T6', xpPerAction: 120, unit: 'books' },
      { id: 'upgrade-b6', name: 'Upgrade Book T6 → T7', xpPerAction: 160, unit: 'books' },
      { id: 'upgrade-b7', name: 'Upgrade Book T7 → T8', xpPerAction: 210, unit: 'books' },
      { id: 'upgrade-b8', name: 'Upgrade Book T8 → T9', xpPerAction: 320, unit: 'books' },
      { id: 'upgrade-b9', name: 'Upgrade Book T9 → T10', xpPerAction: 0, unit: 'books' }
    ],
    perks: [
      { level: 50, perk: 'Equipped enchant book power boosted' },
      { level: 75, perk: 'Enchant upgrade diamond cost reduced' },
      { level: 85, perk: 'Increased soft-cap threshold for stacked enchants' },
      { level: 92, perk: 'Bonus free enchant slot unlock eligibility' },
      { level: 96, perk: 'Chance to craft upgraded enchant books for free' },
      { level: 99, perk: 'Auto-upgrade enchant books in bulk without limits' }
    ]
  },
  {
    id: 'economy',
    name: 'Economy Mastery',
    iconName: 'Store',
    description: 'Buy items from vending machines and merchants across the world (Treehouse Merchant awards 10x XP).',
    actions: [
      { id: 'vend-basic', name: 'Basic Vending Machine', xpPerAction: 20, unit: 'purchases' },
      { id: 'vend-rare', name: 'Rare Vending Machine', xpPerAction: 45, unit: 'purchases' },
      { id: 'vend-epic', name: 'Epic Vending Machine', xpPerAction: 80, unit: 'purchases' },
      { id: 'vend-legendary', name: 'Legendary Vending Machine', xpPerAction: 135, unit: 'purchases' },
      { id: 'vend-mythical', name: 'Mythical Vending Machine', xpPerAction: 180, unit: 'purchases' },
      { id: 'vend-exotic', name: 'Exotic Vending Machine', xpPerAction: 300, unit: 'purchases' },
      { id: 'vend-divine', name: 'Divine Vending Machine', xpPerAction: 630, unit: 'purchases' },
      { id: 'vend-superior', name: 'Superior Vending Machine', xpPerAction: 1000, unit: 'purchases' },
      { id: 'vend-treehouse-basic', name: 'Treehouse Merchant (Basic ×10)', xpPerAction: 200, unit: 'purchases' },
      { id: 'vend-treehouse-sup', name: 'Treehouse Merchant (Superior ×10)', xpPerAction: 10000, unit: 'purchases' }
    ],
    perks: [
      { level: 50, perk: 'Vending machine stock restock speed doubled' },
      { level: 75, perk: 'Discount on all merchant diamond purchases' },
      { level: 85, perk: 'Bonus merchant inventory slots unlocked' },
      { level: 92, perk: 'Merchant stock includes rare secret keys and bags' },
      { level: 96, perk: 'Maximum vending machine price discount' },
      { level: 99, perk: 'Instant restocks for all vending machines' }
    ]
  },
  {
    id: 'fruit',
    name: 'Fruit Mastery',
    iconName: 'Apple',
    description: 'Consume apples, bananas, oranges, and pineapples, or craft Rainbow and Shiny fruits.',
    actions: [
      { id: 'eat-normal', name: 'Eat Normal Fruit', xpPerAction: 20, unit: 'fruits' },
      { id: 'eat-rainbow', name: 'Eat Rainbow Fruit', xpPerAction: 50, unit: 'fruits' },
      { id: 'craft-rainbow', name: 'Craft Rainbow Fruit', xpPerAction: 30, unit: 'crafts' },
      { id: 'craft-shiny', name: 'Craft Shiny Fruit', xpPerAction: 90, unit: 'crafts' }
    ],
    perks: [
      { level: 50, perk: 'Fruit duration extended' },
      { level: 75, perk: 'Fruit stack limit increased' },
      { level: 85, perk: 'Rainbow fruit power multiplier amplified' },
      { level: 92, perk: 'Auto-eat fruit queue unlocked' },
      { level: 96, perk: 'Chance to not consume fruits when eating' },
      { level: 99, perk: 'Infinite fruit duration while farming zones' }
    ]
  },
  {
    id: 'keys',
    name: 'Keys Mastery',
    iconName: 'Key',
    description: 'Use Crystal, MVP, Tech, Void, Fantasy, Secret, and Treasure Hideout keys at chests and chambers.',
    actions: [
      { id: 'key-crystal', name: 'Crystal Key', xpPerAction: 100, unit: 'keys' },
      { id: 'key-mvp', name: 'MVP Key', xpPerAction: 100, unit: 'keys' },
      { id: 'key-tech', name: 'Tech Key', xpPerAction: 150, unit: 'keys' },
      { id: 'key-void', name: 'Void Key', xpPerAction: 200, unit: 'keys' },
      { id: 'key-fantasy', name: 'Fantasy Key', xpPerAction: 250, unit: 'keys' },
      { id: 'key-secret', name: 'Secret Key', xpPerAction: 400, unit: 'keys' },
      { id: 'key-treasure', name: 'Treasure Hideout Key', xpPerAction: 1000, unit: 'keys' }
    ],
    perks: [
      { level: 50, perk: 'Higher chance to receive top-tier loot from chests' },
      { level: 75, perk: 'Small chance to preserve key after opening a chest' },
      { level: 85, perk: 'Increased Huge pet chance from Secret Key doors' },
      { level: 92, perk: 'Doubled diamond payouts from Tech and Void chests' },
      { level: 96, perk: 'Bonus key drop rate from breaking area breakables' },
      { level: 99, perk: 'Treasure Hideout cooldown halved & boosted Huge odds' }
    ]
  },
  {
    id: 'digging',
    name: 'Digging Mastery',
    iconName: 'Pickaxe',
    description: 'Mine blocks in the Fossil Digsite and Advanced Digsite to discover fossils, diamond bags, and Huge fossils.',
    actions: [
      { id: 'dig-dirt', name: 'Dirt (Regular)', xpPerAction: 5, unit: 'blocks' },
      { id: 'dig-stone', name: 'Stone (Regular)', xpPerAction: 7, unit: 'blocks' },
      { id: 'dig-hard-stone', name: 'Hard Stone (Regular)', xpPerAction: 9, unit: 'blocks' },
      { id: 'dig-deep-stone', name: 'Deep Stone (Regular)', xpPerAction: 13, unit: 'blocks' },
      { id: 'dig-earth-core', name: 'Earth Core (Regular)', xpPerAction: 15, unit: 'blocks' },
      { id: 'dig-adv-1', name: 'Advanced Digsite (Tier 1)', xpPerAction: 10, unit: 'blocks' },
      { id: 'dig-adv-2', name: 'Advanced Digsite (Tier 2)', xpPerAction: 15, unit: 'blocks' },
      { id: 'dig-adv-3', name: 'Advanced Digsite (Tier 3)', xpPerAction: 20, unit: 'blocks' },
      { id: 'dig-adv-4', name: 'Advanced Digsite (Tier 4)', xpPerAction: 25, unit: 'blocks' },
      { id: 'dig-adv-5', name: 'Advanced Digsite (Tier 5)', xpPerAction: 35, unit: 'blocks' }
    ],
    perks: [
      { level: 50, perk: 'Faster digging speed through hard stone' },
      { level: 75, perk: 'Increased spawn of diamond clusters in digsites' },
      { level: 85, perk: 'Magic Shard drop frequency boosted' },
      { level: 92, perk: 'Doubled fossil chest yields in deep layers' },
      { level: 96, perk: 'Advanced shovel dig power boosted' },
      { level: 99, perk: 'Maximum Huge Fossil Dragon excavation odds' }
    ]
  },
  {
    id: 'gifts',
    name: 'Gifts Mastery',
    iconName: 'Gift',
    description: 'Open Gift Bundles, Seed/Gift Bags, Mini Chests, Charm Stones, and timed Free Gift tiers.',
    actions: [
      { id: 'gift-seed-bag', name: 'Seed / Gift Bag', xpPerAction: 15, unit: 'bags' },
      { id: 'gift-bundle', name: 'Gift Bundle', xpPerAction: 20, unit: 'bundles' },
      { id: 'gift-large-bag', name: 'Large Gift Bag', xpPerAction: 25, unit: 'bags' },
      { id: 'gift-large-bundle', name: 'Large Gift Bundle', xpPerAction: 35, unit: 'bundles' },
      { id: 'gift-charm-stone', name: 'Charm Stone', xpPerAction: 65, unit: 'stones' },
      { id: 'gift-mini-chest', name: 'Mini Chest', xpPerAction: 90, unit: 'chests' },
      { id: 'gift-rainbow-mini', name: 'Rainbow Mini Chest', xpPerAction: 135, unit: 'chests' },
      { id: 'gift-free-1-4', name: 'Free Gifts (Tiers 1–4)', xpPerAction: 85, unit: 'claims' },
      { id: 'gift-free-5-8', name: 'Free Gifts (Tiers 5–8)', xpPerAction: 135, unit: 'claims' },
      { id: 'gift-free-9-10', name: 'Free Gifts (Tiers 9–10)', xpPerAction: 250, unit: 'claims' },
      { id: 'gift-free-11-12', name: 'Free Gifts (Tiers 11–12)', xpPerAction: 650, unit: 'claims' }
    ],
    perks: [
      { level: 50, perk: 'Higher tier rewards from opened gift bags' },
      { level: 75, perk: 'Bonus diamonds awarded per opened gift bundle' },
      { level: 85, perk: 'Timed free gifts timer countdown accelerated' },
      { level: 92, perk: 'Charm Stones yield higher chance of Overload charms' },
      { level: 96, perk: 'Double loot rolls on Mini Chests' },
      { level: 99, perk: 'Bulk gift opening without animation delay' }
    ]
  },
  {
    id: 'pets',
    name: 'Pets Mastery',
    iconName: 'PawPrint',
    description: 'Use the Gold Machine (0.01 XP) and Rainbow Machine (0.04 XP), or enroll pets in the Daycare (10/20/30 XP).',
    actions: [
      { id: 'pet-gold-machine', name: 'Gold Machine (per pet)', xpPerAction: 0.01, unit: 'pets' },
      { id: 'pet-rainbow-machine', name: 'Rainbow Machine (per pet)', xpPerAction: 0.04, unit: 'pets' },
      { id: 'pet-daycare-normal', name: 'Daycare Normal (per pet)', xpPerAction: 10, unit: 'pets' },
      { id: 'pet-daycare-golden', name: 'Daycare Golden (per pet)', xpPerAction: 20, unit: 'pets' },
      { id: 'pet-daycare-rainbow', name: 'Daycare Rainbow (per pet)', xpPerAction: 30, unit: 'pets' }
    ],
    perks: [
      { level: 50, perk: 'Bonus Daycare diamond rewards' },
      { level: 60, perk: 'Gold Machine Discount: −1 pet for golding (9 normal per gold)' },
      { level: 75, perk: 'Pet movement and target speed boosted' },
      { level: 85, perk: 'Additional Daycare enrollment slot unlocked' },
      { level: 90, perk: 'Rainbow Machine Discount: −1 pet for rainbowing (9 gold per rainbow)' },
      { level: 92, perk: 'Pet damage scaling bonus across all equipped pets' },
      { level: 96, perk: 'Chance for instant Daycare collection with no waiting' },
      { level: 99, perk: 'Both Machines Discount: −2 pets for both (8 normal per gold, 8 gold per rainbow)' }
    ]
  },
  {
    id: 'fusing',
    name: 'Fusing Mastery',
    iconName: 'Sparkle',
    description: 'Fuse pets in the Fuse Machine across Normal (0.5 XP), Golden (1.0 XP), and Rainbow (1.5 XP) tiers.',
    actions: [
      { id: 'fuse-normal', name: 'Fuse Normal (per pet)', xpPerAction: 0.5, unit: 'pets' },
      { id: 'fuse-golden', name: 'Fuse Golden (per pet)', xpPerAction: 1.0, unit: 'pets' },
      { id: 'fuse-rainbow', name: 'Fuse Rainbow (per pet)', xpPerAction: 1.5, unit: 'pets' }
    ],
    perks: [
      { level: 50, perk: 'Higher probability of crafting Mythical tier fused pets' },
      { level: 75, perk: 'Bonus stat multipliers on successful pet fusions' },
      { level: 85, perk: 'Chance to retain one input pet after fusing' },
      { level: 92, perk: 'Expanded fusion slot capacity' },
      { level: 96, perk: 'Bonus chance to yield Golden/Rainbow fused pets' },
      { level: 99, perk: 'Bulk auto-fuse unlocked with maximum outcome luck' }
    ]
  }
];

export const PS99_MILESTONE_LEVELS = [50, 75, 85, 92, 96, 99];
