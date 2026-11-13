/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QaEntry {
  gameSlug: string;      // e.g. 'roblox'
  gameName: string;      // e.g. 'Roblox'
  question: string;
  slug: string;          // question slug
  shortAnswer: string;   // shown in the highlighted answer box
  explanation: string;   // 2-4 short paragraphs
  workedExample: string; // one worked example
  relatedToolId: string;
}

export const QA_ENTRIES: QaEntry[] = [
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How much is 1,000 Robux in USD?',
    slug: 'how-much-is-1000-robux-in-usd',
    shortAnswer: '1,000 Robux costs $12.50 USD at standard store rates, or cash out for $3.50 USD via DevEx.',
    explanation: `At the standard official Roblox store price of $0.0125 per Robux, 1,000 Robux costs $12.50 USD. The exact dollar price can vary slightly depending on your platform, country tax rate, or whether you purchase a Roblox Premium subscription, which grants a 10% bonus on Robux bundles.

For Roblox developers and creators using the Developer Exchange (DevEx) program, the conversion rate is different. Roblox pays $0.0035 USD per earned Robux, meaning 1,000 Robux translates to $3.50 USD when cashed out to real money.

To calculate custom Robux amounts, standard store purchases cost $1.25 per 100 Robux, while DevEx payouts deliver $0.35 per 100 Robux for eligible creators.`,
    workedExample: 'Store purchase: 1,000 × $0.0125 = $12.50 USD. DevEx cash-out: 1,000 × $0.0035 = $3.50 USD.',
    relatedToolId: 'robux-to-usd-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How much is 5,000 Robux in USD?',
    slug: 'how-much-is-5000-robux-in-usd',
    shortAnswer: '5,000 Robux costs $62.50 USD at standard store rates, or cash out for $17.50 USD via DevEx.',
    explanation: `Purchasing 5,000 Robux directly from the Roblox avatar shop or website costs $62.50 USD based on the standard $0.0125 per Robux baseline rate. Bulk gift cards or Premium bonus offers can lower the effective cost per Robux slightly.

If you are a Roblox game creator or UGC designer cashing out earned Robux through DevEx, 5,000 Robux equals $17.50 USD at the $0.0035 rate.

Note that to request a DevEx payout, creators must hold at least 30,000 earned Robux and have an active Roblox Premium membership.`,
    workedExample: 'Store purchase: 5,000 × $0.0125 = $62.50 USD. DevEx cash-out: 5,000 × $0.0035 = $17.50 USD.',
    relatedToolId: 'robux-to-usd-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How much is 10,000 Robux in USD?',
    slug: 'how-much-is-10000-robux-in-usd',
    shortAnswer: '10,000 Robux costs $125.00 USD at standard store rates, or cash out for $35.00 USD via DevEx.',
    explanation: `At standard retail pricing ($0.0125 per Robux), buying 10,000 Robux directly from Roblox requires $125.00 USD. Buying larger packages or holding an active Premium plan grants bonus Robux that lowers the cost per Robux.

For developers exchanging Robux back to real currency via Developer Exchange (DevEx), 10,000 Robux equals $35.00 USD based on the $0.0035 per Robux cash-out multiplier.

The difference between the purchase cost and cash-out payout reflects platform maintenance fees, server costs, and Roblox's revenue split with creators.`,
    workedExample: 'Store purchase: 10,000 × $0.0125 = $125.00 USD. DevEx cash-out: 10,000 × $0.0035 = $35.00 USD.',
    relatedToolId: 'robux-to-usd-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How much is 31,000 Robux in USD?',
    slug: 'how-much-is-31000-robux-in-usd',
    shortAnswer: '31,000 Robux costs $387.50 USD at standard store rates, or cash out for $108.50 USD via DevEx.',
    explanation: `Purchasing 31,000 Robux at the standard baseline rate of $0.0125 per Robux costs $387.50 USD. Players who buy bulk packages or hold Premium subscriptions get extra bonus Robux with their purchase.

Because 31,000 Robux exceeds the 30,000 Robux Developer Exchange threshold, eligible creators can cash this out via DevEx for $108.50 USD at the $0.0035 cash-out rate.

Developers must ensure all 31,000 Robux were earned legitimately through game passes, developer products, or UGC item sales to qualify for DevEx payout.`,
    workedExample: 'Store purchase: 31,000 × $0.0125 = $387.50 USD. DevEx cash-out: 31,000 × $0.0035 = $108.50 USD.',
    relatedToolId: 'robux-to-usd-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How much is 50,000 Robux in USD?',
    slug: 'how-much-is-50000-robux-in-usd',
    shortAnswer: '50,000 Robux costs $625.00 USD at standard store rates, or cash out for $175.00 USD via DevEx.',
    explanation: `At standard Roblox store rates ($0.0125 per Robux), 50,000 Robux has a retail store value of $625.00 USD. Buying large packs or official Roblox gift cards often grants bonus Robux.

For Roblox developers using DevEx to withdraw their hard-earned game revenue, 50,000 Robux converts to $175.00 USD using the official $0.0035 per Robux conversion rate.

DevEx payments are processed monthly via Tipalti to verified developer bank accounts or PayPal.`,
    workedExample: 'Store purchase: 50,000 × $0.0125 = $625.00 USD. DevEx cash-out: 50,000 × $0.0035 = $175.00 USD.',
    relatedToolId: 'robux-to-usd-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How much is 76,000 Robux in USD?',
    slug: 'how-much-is-76000-robux-in-usd',
    shortAnswer: '76,000 Robux costs $950.00 USD at standard store rates, or cash out for $266.00 USD via DevEx.',
    explanation: `Buying 76,000 Robux at the standard baseline store rate of $0.0125 per Robux equals $950.00 USD. Official store packages or Premium subscription tier bonuses lower the price per unit.

Creators cashing out 76,000 Robux through the Developer Exchange (DevEx) receive $266.00 USD at the $0.0035 per Robux rate.

Creators must satisfy account verification and tax reporting guidelines when submitting cash-out requests of this size.`,
    workedExample: 'Store purchase: 76,000 × $0.0125 = $950.00 USD. DevEx cash-out: 76,000 × $0.0035 = $266.00 USD.',
    relatedToolId: 'robux-to-usd-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How much is 100,000 Robux in USD?',
    slug: 'how-much-is-100000-robux-in-usd',
    shortAnswer: '100,000 Robux costs $1,250.00 USD at standard store rates, or cash out for $350.00 USD via DevEx.',
    explanation: `At standard store rates of $0.0125 per Robux, buying 100,000 Robux directly costs $1,250.00 USD. Heavy Robux buyers usually purchase $99.99 store tiers (10,000 Robux + 1,000 bonus) to maximize value.

For successful Roblox developers and studio owners, cashing out 100,000 Robux via DevEx pays out $350.00 USD at the official $0.0035 cash-out rate.

100,000 Robux is a common monthly benchmark for popular game developers and UGC creators.`,
    workedExample: 'Store purchase: 100,000 × $0.0125 = $1,250.00 USD. DevEx cash-out: 100,000 × $0.0035 = $350.00 USD.',
    relatedToolId: 'robux-to-usd-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'What is DevEx and how much Robux do you need to cash out?',
    slug: 'what-is-devex-and-how-much-robux-to-cash-out',
    shortAnswer: 'DevEx (Developer Exchange) lets eligible Roblox creators convert earned Robux to real money. You need at least 30,000 Robux ($105.00 USD) to request a cash-out.',
    explanation: `The Developer Exchange (DevEx) program is Roblox's official portal allowing game developers, UGC item creators, and shirt/pants designers to exchange earned Robux for real-world currency.

To be eligible for DevEx, creators must meet key requirements: be at least 13 years old, possess an active Roblox Premium membership, maintain a verified email address, submit a government-issued ID, and have an account in good standing.

The minimum threshold for cash-out is 30,000 earned Robux, which yields $105.00 USD at the standard DevEx exchange rate of $0.0035 USD per Robux. Robux acquired through trading, group payout transfers from non-earned sources, or gift cards do not qualify.`,
    workedExample: 'At 30,000 Robux: 30,000 × $0.0035 = $105.00 USD minimum cash-out.',
    relatedToolId: 'robux-to-usd-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How much Robux do you get for $5?',
    slug: 'how-much-robux-for-5-dollars',
    shortAnswer: 'For $5 you get about 400 Robux in the Roblox store (roughly 80 Robux per $1). With a Premium membership the same $5 works out to roughly 440 Robux worth of value.',
    explanation: `For $5 you get about 400 Robux in the Roblox store (roughly 80 Robux per $1). This baseline exchange rate applies when purchasing standard Robux packages directly on the platform.

With a Premium membership the same $5 works out to roughly 440 Robux worth of value. Active Premium subscribers receive an extra 10% bonus on Robux packages.

Calculating your Robux yield per dollar helps you plan purchases for avatar accessories, game passes, or developer products effectively.`,
    workedExample: 'Standard store: $5 × 80 Robux per $1 = 400 Robux. With Premium: 400 + 40 bonus = 440 Robux.',
    relatedToolId: 'robux-to-usd-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How much Robux do you get for $10?',
    slug: 'how-much-robux-for-10-dollars',
    shortAnswer: 'For $10 you get about 800 Robux in the Roblox store (roughly 80 Robux per $1). With Premium it works out to roughly 880 Robux worth of value.',
    explanation: `For $10 you get about 800 Robux in the Roblox store (roughly 80 Robux per $1). This standard package is one of the most popular purchase amounts on the Roblox site.

With Premium it works out to roughly 880 Robux worth of value. Roblox Premium subscribers get an automatic 10% bonus, granting 80 extra Robux for the same $10 spent.

Knowing the exact Robux output per $10 helps players compare standard gift cards and subscription bundles before spending.`,
    workedExample: 'Standard store: $10 × 80 Robux per $1 = 800 Robux. With Premium: 800 + 80 bonus = 880 Robux.',
    relatedToolId: 'robux-to-usd-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How much Robux do you get for $20?',
    slug: 'how-much-robux-for-20-dollars',
    shortAnswer: 'For $20 you get about 1,600 Robux in the Roblox store (roughly 80 Robux per $1). With Premium it works out to roughly 1,760 Robux worth of value.',
    explanation: `For $20 you get about 1,600 Robux in the Roblox store (roughly 80 Robux per $1). This mid-tier purchase is common for buying premium game passes, limited avatar gear, and private server access.

With Premium it works out to roughly 1,760 Robux worth of value. Premium members receive 160 bonus Robux through the 10% subscriber bonus.

Understanding how much Robux $20 yields ensures you maximize value across standard store tiers and active membership plans.`,
    workedExample: 'Standard store: $20 × 80 Robux per $1 = 1,600 Robux. With Premium: 1,600 + 160 bonus = 1,760 Robux.',
    relatedToolId: 'robux-to-usd-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How much Robux do you get for $50?',
    slug: 'how-much-robux-for-50-dollars',
    shortAnswer: 'For $50 you get about 4,000 Robux in the Roblox store (roughly 80 Robux per $1). With Premium it works out to roughly 4,400 Robux worth of value.',
    explanation: `For $50 you get about 4,000 Robux in the Roblox store (roughly 80 Robux per $1). Larger dollar bundles like $50 allow players to acquire rare items, UGC collectibles, and expensive game passes.

With Premium it works out to roughly 4,400 Robux worth of value. Subscribers enjoy 400 additional Robux thanks to the 10% Premium bonus multiplier.

Calculating the total currency returned per dollar spent helps players budget for major Roblox purchases efficiently.`,
    workedExample: 'Standard store: $50 × 80 Robux per $1 = 4,000 Robux. With Premium: 4,000 + 400 bonus = 4,400 Robux.',
    relatedToolId: 'robux-to-usd-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How much Robux do I actually receive after the marketplace fee?',
    slug: 'how-much-robux-do-i-receive-after-marketplace-fee',
    shortAnswer: 'Roblox takes a 30% marketplace fee on creator sales, so you receive 70% of the price. Sell an item for 1,000 Robux and you receive 700 Robux; sell for 350 and you receive 245.',
    explanation: `Roblox takes a 30% marketplace fee on creator sales, so you receive 70% of the price. This marketplace tax applies to game passes, developer products, shirt and pant sales, and UGC avatar items.

For example, if you sell an item for 1,000 Robux, Roblox takes 30% and you receive 700 Robux. Similarly, if you sell an item for 350 Robux, Roblox takes 30% and you receive 245 Robux.

Factoring in the 30% fee allows game developers and UGC creators to set prices accurately and hit desired revenue goals.`,
    workedExample: 'Selling at 1,000 Robux: 1,000 × 70% = 700 Robux received. Selling at 350 Robux: 350 × 70% = 245 Robux received.',
    relatedToolId: 'robux-tax-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'How long do pending Robux take to arrive?',
    slug: 'how-long-do-pending-robux-take',
    shortAnswer: 'Robux from sales are held as \'pending\' before they reach your balance — usually about 3 to 7 days. The hold is a safety check by Roblox, and the Robux are added automatically once it clears.',
    explanation: `Robux from sales are held as 'pending' before they reach your balance — usually about 3 to 7 days. This hold applies to game pass transactions, developer products, and clothing sales.

The hold is a safety check by Roblox, and the Robux are added automatically once it clears. This mandatory escrow period gives Roblox time to verify transaction safety and prevent unauthorized activity.

Creators can monitor pending Robux in their account transaction tab until the 3 to 7 day hold resolves and funds deposit to their main balance.`,
    workedExample: 'Item sold today: Funds held as pending for 3 to 7 days before automatically transferring to your main Robux balance.',
    relatedToolId: 'robux-tax-calculator'
  },
  {
    gameSlug: 'genshin',
    gameName: 'Genshin Impact',
    question: 'How many wishes guarantee a 5-star in Genshin Impact?',
    slug: 'how-many-wishes-guarantee-a-5-star',
    shortAnswer: 'A 5-star is guaranteed by the 90th wish at the latest — this is called hard pity. In Primogems that worst case costs 90 × 160 = 14,400 Primogems. Most players get a 5-star earlier, because the odds rise sharply after about 74 wishes (soft pity).',
    explanation: `A 5-star is guaranteed by the 90th wish at the latest — this is called hard pity. In Primogems that worst case costs 90 × 160 = 14,400 Primogems.

Most players get a 5-star earlier, because the odds rise sharply after about 74 wishes (soft pity). Between wishes 74 and 90, the probability of pulling a 5-star increases dramatically on each individual wish.

Tracking your wish count toward the 74 soft pity threshold and 90 hard pity limit helps you budget your Primogems effectively for featured banners.`,
    workedExample: 'Hard pity calculation: 90 wishes × 160 Primogems per wish = 14,400 Primogems max. Soft pity begins around wish 74.',
    relatedToolId: 'genshin-pity-calculator'
  },
  {
    gameSlug: 'genshin',
    gameName: 'Genshin Impact',
    question: 'How many Primogems do you need for 10 wishes?',
    slug: 'how-many-primogems-for-10-wishes',
    shortAnswer: 'One wish costs 160 Primogems, so a 10-wish pull costs 1,600 Primogems.',
    explanation: `One wish costs 160 Primogems, so a 10-wish pull costs 1,600 Primogems. This baseline conversion applies to both Intertwined Fates and Acquaint Fates in the Genshin Impact wish shop.

Performing a 10-wish pull guarantees at least one 4-star item or character, while consuming exactly 1,600 Primogems from your balance.

Knowing that 1 wish is 160 Primogems and 10 wishes require 1,600 Primogems makes it simple to plan banner savings goals.`,
    workedExample: '10 wishes × 160 Primogems per wish = 1,600 Primogems.',
    relatedToolId: 'genshin-pity-calculator'
  },
  {
    gameSlug: 'genshin',
    gameName: 'Genshin Impact',
    question: 'What are the odds of pulling a 5-star in Genshin Impact?',
    slug: 'what-are-the-odds-of-pulling-a-5-star',
    shortAnswer: 'The base chance of a 5-star character is 0.6% per wish. From about wish 74 the chance climbs quickly (soft pity), and a 5-star is guaranteed by wish 90. There is also a 50/50: half the time the 5-star is the featured character, otherwise you get a standard 5-star and the next one is guaranteed to be featured.',
    explanation: `The base chance of a 5-star character is 0.6% per wish. From about wish 74 the chance climbs quickly (soft pity), and a 5-star is guaranteed by wish 90.

There is also a 50/50: half the time the 5-star is the featured character, otherwise you get a standard 5-star and the next one is guaranteed to be featured.

Understanding the 0.6% base rate, the 74 soft pity ramp, the 90 hard pity cap, and the 50/50 guarantee rules ensures travelers can calculate exact banner odds.`,
    workedExample: 'Base odds: 0.6% per wish. Soft pity: increases after wish 74. Hard pity: 100% at wish 90. Banner 50/50: 50% featured, 50% standard (next 5-star 100% featured).',
    relatedToolId: 'genshin-pity-calculator'
  },
  {
    gameSlug: 'fortnite',
    gameName: 'Fortnite',
    question: 'How much XP do you need per level in Fortnite?',
    slug: 'how-much-xp-per-level-in-fortnite',
    shortAnswer: 'Each Fortnite level needs 80,000 XP. The amount is the same for every level — there is no increase as you level up.',
    explanation: `Each Fortnite level needs 80,000 XP. The amount is the same for every level — there is no increase as you level up.

Whether you are progressing from Level 1 to Level 2 or Level 99 to Level 100, the requirement remains constant at exactly 80,000 XP per level.

Because every single level requires 80,000 XP, players can calculate daily leveling targets and Battle Pass pacing with simple math.`,
    workedExample: 'Leveling 1 level = 80,000 XP. Leveling 5 levels = 5 × 80,000 = 400,000 XP.',
    relatedToolId: 'fortnite-xp-calculator'
  },
  {
    gameSlug: 'fortnite',
    gameName: 'Fortnite',
    question: 'How much XP do you need to reach level 100 in Fortnite?',
    slug: 'how-much-xp-to-reach-level-100-in-fortnite',
    shortAnswer: 'Reaching level 100 from level 1 takes 99 levels × 80,000 XP = 7,920,000 XP in total.',
    explanation: `Reaching level 100 from level 1 takes 99 levels × 80,000 XP = 7,920,000 XP in total. This represents the total experience needed to complete the standard Battle Pass tier rewards.

Since every individual level step costs 80,000 XP, multiplying 99 level increments yields the exact target of 7,920,000 XP.

Knowing the 7,920,000 XP milestone allows Battle Pass players to split XP requirements across weekly quests and daily match goals.`,
    workedExample: 'Level 1 to 100: 99 levels × 80,000 XP = 7,920,000 XP total.',
    relatedToolId: 'fortnite-xp-calculator'
  },
  {
    gameSlug: 'minecraft',
    gameName: 'Minecraft',
    question: 'How much XP do you need to reach level 30 in Minecraft?',
    slug: 'how-much-xp-to-reach-level-30-in-minecraft',
    shortAnswer: 'You need 1,395 XP points in total to reach level 30 from level 0. The final step from level 29 to 30 alone costs 107 XP points.',
    explanation: `Minecraft's XP curve is not flat — every level costs more points than the one before. Levels 1–16 are cheap, then the cost per level grows quickly: by the late 20s each single level costs over 100 points.

Level 30 matters because a full enchanting table setup (15 bookshelves) offers level-30 enchantments, and the table takes its 30 levels straight from your XP bar.`,
    workedExample: 'Total XP for level 30 = 2.5 × 30² − 40.5 × 30 + 360 = 1,395 points. Final level cost = 5 × 29 − 38 = 107 points.',
    relatedToolId: 'minecraft-xp-calculator'
  },
  {
    gameSlug: 'minecraft',
    gameName: 'Minecraft',
    question: 'How much XP do you need to reach level 50 in Minecraft?',
    slug: 'how-much-xp-to-reach-level-50-in-minecraft',
    shortAnswer: 'Reaching level 50 takes 5,345 XP points in total from level 0 — almost four times the cost of level 30.',
    explanation: `Past level 30 the XP curve steepens again: each level from the 30s upward costs 9 × current level − 158 points, so the last levels before 50 cost close to 300 points each.

Most players reach level 50 through XP farms or by defeating the Ender Dragon, rather than by mining and smelting alone.`,
    workedExample: 'Total XP for level 50 = 4.5 × 50² − 162.5 × 50 + 2,220 = 5,345 points. The step from level 49 to 50 alone = 9 × 49 − 158 = 283 points.',
    relatedToolId: 'minecraft-xp-calculator'
  },
  {
    gameSlug: 'minecraft',
    gameName: 'Minecraft',
    question: 'How many bookshelves do you need for a level 30 enchantment in Minecraft?',
    slug: 'how-many-bookshelves-for-level-30-enchantment-in-minecraft',
    shortAnswer: 'You need 15 bookshelves placed around the enchanting table to unlock level 30 enchantments.',
    explanation: `The enchanting table gains one level of power per valid bookshelf, up to a maximum of 15. The shelves must be one block away from the table with an air gap in between, and torches, carpets or snow in the gap block the power.

Fifteen is also the cap — adding more bookshelves does not raise the maximum level past 30.`,
    workedExample: '15 bookshelves need 45 books and 90 wood planks. The 45 books need 45 leather and 135 paper (from 135 sugar cane).',
    relatedToolId: 'minecraft-enchantment-calculator'
  },
  {
    gameSlug: 'minecraft',
    gameName: 'Minecraft',
    question: 'How many blocks do you need for a full beacon pyramid in Minecraft?',
    slug: 'how-many-blocks-for-a-full-beacon-pyramid-in-minecraft',
    shortAnswer: 'A full 4-layer beacon pyramid needs 164 blocks of iron, gold, emerald, diamond or netherite — in any mix.',
    explanation: `The pyramid is built in four square layers: 9×9 at the bottom, then 7×7, 5×5 and 3×3 on top, with the beacon placed on the very top centre. Only the full 4-layer pyramid unlocks the secondary powers, such as Regeneration.

Smaller pyramids still work: 1 layer (9 blocks) unlocks the basic effects, but the range and available powers grow with each layer.`,
    workedExample: '81 + 49 + 25 + 9 = 164 blocks. Built from iron alone, that is 164 × 9 = 1,476 iron ingots.',
    relatedToolId: 'minecraft-beacon-calculator'
  },
  {
    gameSlug: 'minecraft',
    gameName: 'Minecraft',
    question: 'How much XP does the Ender Dragon drop in Minecraft?',
    slug: 'how-much-xp-does-the-ender-dragon-drop',
    shortAnswer: 'The Ender Dragon drops 12,000 XP the first time you defeat it — enough to jump from level 0 to about level 68. Every later kill drops only 500 XP.',
    explanation: `The first dragon fight is the single biggest XP reward in the game. The 12,000 points fall as hundreds of XP orbs around the exit portal, so collect them before leaving the End.

Respawned dragons (summoned with four end crystals) are worth far less: 500 XP each, less than a good night in an XP farm.`,
    workedExample: "Level 68 needs 11,978 total XP, so the dragon's 12,000 XP lands just past level 68 starting from zero.",
    relatedToolId: 'minecraft-xp-calculator'
  },
  {
    gameSlug: 'pokemongo',
    gameName: 'Pokémon GO',
    question: 'How much XP do you need to reach level 40 in Pokémon GO?',
    slug: 'how-much-xp-to-reach-level-40-in-pokemon-go',
    shortAnswer: 'Reaching level 40 takes 20,000,000 XP in total. The final step from level 39 to 40 alone is 5,000,000 XP.',
    explanation: `Trainer levels are based on your lifetime XP total, so every catch, spin and friendship bonus counts toward the same 20 million. The curve is steep at the end: the last five levels (35–40) together cost more than everything before them.

Level 40 used to be the game's maximum level; it is now the halfway point of the level 50 climb.`,
    workedExample: 'Cumulative XP at level 39 = 15,000,000. 15,000,000 + 5,000,000 = 20,000,000 XP at level 40.',
    relatedToolId: 'pokemon-go-level-calculator'
  },
  {
    gameSlug: 'pokemongo',
    gameName: 'Pokémon GO',
    question: 'How much XP do you need to reach level 50 in Pokémon GO?',
    slug: 'how-much-xp-to-reach-level-50-in-pokemon-go',
    shortAnswer: 'Level 50 takes 176,000,000 lifetime XP — and from level 41 upward you must also finish special research tasks at each level, XP alone is not enough.',
    explanation: `Most of the climb is in the final ten levels: going from level 40 to level 50 needs 156 million XP, nearly eight times the entire road to level 40.

From level 41, each level also gates on Level-Up Research — tasks like catching a set number of Pokémon or earning medals — so a huge XP bank does not level you up until the tasks are done too.`,
    workedExample: '176,000,000 (level 50 total) − 20,000,000 (level 40 total) = 156,000,000 XP earned between levels 40 and 50.',
    relatedToolId: 'pokemon-go-level-calculator'
  },
  {
    gameSlug: 'pokemongo',
    gameName: 'Pokémon GO',
    question: 'How much XP do you get for evolving a Pokémon in Pokémon GO?',
    slug: 'how-much-xp-for-evolving-a-pokemon-in-pokemon-go',
    shortAnswer: 'Each evolution gives 500 XP — or 1,000 XP with a Lucky Egg running. A full 30-minute Lucky Egg session of back-to-back evolutions is worth roughly 60,000 XP.',
    explanation: `This is why players save cheap 12-candy evolutions (like Caterpie, Weedle and Pidgey) and evolve them in batches. The Lucky Egg doubles all XP for 30 minutes, so the whole session happens under one egg.

A typical session fits about 60 evolutions before the egg runs out, depending on how fast you tap through the animations.`,
    workedExample: '60 evolutions × 500 XP = 30,000 XP without an egg; 60 × 1,000 XP = 60,000 XP with a Lucky Egg.',
    relatedToolId: 'pokemon-go-evolution-cp-calculator'
  },
  {
    gameSlug: 'pokemongo',
    gameName: 'Pokémon GO',
    question: 'How many candies does Magikarp need to evolve in Pokémon GO?',
    slug: 'how-many-candies-does-magikarp-need-to-evolve',
    shortAnswer: 'Magikarp needs 400 candies to evolve into Gyarados — the most famous candy grind in the game.',
    explanation: `Most Pokémon evolve for 12, 25, 50 or 100 candies; Magikarp's 400 is a nod to the main-series games, where the useless fish becomes one of the strongest early Pokémon. A few others (Swablu, Wailmer, Noibat) also cost 400.

Magikarp is a 1 km buddy, so walking the whole evolution would take 400 km — catching is much faster, especially near water or during events.`,
    workedExample: 'At 3 candies per catch, 400 ÷ 3 = about 134 Magikarp. With a Pinap Berry (6 candies per catch), 400 ÷ 6 = about 67 catches.',
    relatedToolId: 'pokemon-go-candy-calculator'
  },
  {
    gameSlug: 'pokemongo',
    gameName: 'Pokémon GO',
    question: 'How much XP do you get for reaching Best Friends in Pokémon GO?',
    slug: 'how-much-xp-for-best-friends-in-pokemon-go',
    shortAnswer: 'Becoming Best Friends gives 100,000 XP — doubled to 200,000 XP if a Lucky Egg is running when the friendship levels up.',
    explanation: `Friendship levels pay out XP at each step: Good Friends 3,000 XP (1 day), Great Friends 10,000 XP (7 days), Ultra Friends 50,000 XP (30 days) and Best Friends 100,000 XP (90 days of interaction) — 163,000 XP across the whole ladder per friend.

Because the payout lands the moment you open a gift on the milestone day, experienced players save the final gift, start a Lucky Egg, and then open it.`,
    workedExample: '3,000 + 10,000 + 50,000 + 100,000 = 163,000 XP total per friend taken from zero to Best Friends.',
    relatedToolId: 'pokemon-go-level-calculator'
  },
  {
    gameSlug: 'grow-a-garden',
    gameName: 'Grow a Garden',
    question: 'How much more is a Rainbow crop worth in Grow a Garden?',
    slug: 'how-much-more-is-a-rainbow-crop-worth-in-grow-a-garden',
    shortAnswer: "A Rainbow crop is worth 50 times its normal value. Rainbow is a variant, so its ×50 multiplies the crop's full value after weight and mutations are counted.",
    explanation: `Every crop grows with one variant: Normal (×1), Silver (×5), Gold (×20) or Rainbow (×50) — plus the rarer Diamond and Jelly (×50) and Ember (×60). Rainbow is the strongest of the everyday variants and appears on only about 0.1% of crops.

Because the variant multiplies everything else, a Rainbow version of an already mutated crop is where the biggest Sheckle payouts in the game come from.`,
    workedExample: 'A crop worth 1,000 Sheckles at its base weight with no mutations sells for 1,000 × 50 = 50,000 Sheckles as a Rainbow.',
    relatedToolId: 'grow-a-garden-crop-value-calculator'
  },
  {
    gameSlug: 'grow-a-garden',
    gameName: 'Grow a Garden',
    question: 'How many Bug Eggs do you need to hatch a Dragonfly in Grow a Garden?',
    slug: 'how-many-bug-eggs-to-hatch-a-dragonfly-in-grow-a-garden',
    shortAnswer: 'The Dragonfly has a 1% hatch chance per Bug Egg, so you need about 69 eggs for a 50% chance and 230 eggs for a 90% chance. On average it takes 100 eggs.',
    explanation: `Each Bug Egg is an independent 1-in-100 roll — no egg brings you "closer", the chance simply compounds across many eggs. That is why even 50 eggs still leave you at only about a 39% chance of owning a Dragonfly.

The Dragonfly is chased because it turns a random crop Gold (×20) every few minutes, which pays for itself in a busy garden.`,
    workedExample: 'Chance after n eggs = 1 − 0.99^n. 69 eggs → about 50%. 230 eggs → about 90%. At 50,000,000 Sheckles per egg, 69 eggs cost 3,450,000,000 Sheckles if bought outright.',
    relatedToolId: 'grow-a-garden-egg-hatching-calculator'
  },
  {
    gameSlug: 'grow-a-garden',
    gameName: 'Grow a Garden',
    question: 'How much is a Shocked crop worth in Grow a Garden?',
    slug: 'how-much-is-a-shocked-crop-worth-in-grow-a-garden',
    shortAnswer: 'Shocked is a ×100 mutation. On its own it makes a crop worth 100 times its base value — a 20-Sheckle Carrot becomes 2,000 Sheckles.',
    explanation: `Shocked comes from lightning strikes during Thunderstorm weather. Environmental mutations like Shocked do not multiply each other — they add together inside one bracket: Shocked (×100) plus Frozen (×10) gives ×109, not ×1,000.

Shocked is the strongest everyday weather mutation; only rare event and pet mutations (Celestial ×120, Disco ×125, Dawnbound ×150) beat it.`,
    workedExample: 'Carrot, base value 20 Sheckles at its base weight of 0.275 kg: 20 × 100 = 2,000 Sheckles with Shocked alone.',
    relatedToolId: 'grow-a-garden-mutation-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'What level do you need to reach the Second Sea in Blox Fruits?',
    slug: 'what-level-to-reach-the-second-sea-in-blox-fruits',
    shortAnswer: 'You need level 700 to unlock the Second Sea in Blox Fruits, and you must defeat the Ice Admiral as part of the unlock quest.',
    explanation: `At level 700, talk to the Military Detective at the Prison island in the First Sea. He sends you to the Frozen Village to defeat the Ice Admiral; once he is beaten, you can travel to the Second Sea.

Most players grind the last levels at the Skylands and Prison islands, where quest XP is highest for that range.`,
    workedExample: "A level 650 player still needs 50 more levels before the Military Detective's quest becomes available.",
    relatedToolId: 'blox-fruits-xp-calculator'
  },
  {
    gameSlug: 'roblox',
    gameName: 'Roblox',
    question: 'What level do you need to reach the Third Sea in Blox Fruits?',
    slug: 'what-level-to-reach-the-third-sea-in-blox-fruits',
    shortAnswer: 'You need level 1500 to unlock the Third Sea in Blox Fruits, and you must have defeated Don Swan in the Second Sea.',
    explanation: `Level alone is not enough: Don Swan, the boss in the Kingdom of Rose, must be defeated first. After that, speak to Mr. Captain at the Green Zone dock, who takes you through to the Third Sea.

The Third Sea is the current endgame, holding the strongest bosses, raids and fruits in the game.`,
    workedExample: 'A level 1,450 player still needs 50 more levels — and the Don Swan kill — before Mr. Captain will take them to the Third Sea.',
    relatedToolId: 'blox-fruits-xp-calculator'
  },
  {
    gameSlug: 'minecraft',
    gameName: 'Minecraft',
    question: 'Why does the anvil say "Too Expensive" in Minecraft?',
    slug: 'why-does-the-anvil-say-too-expensive-in-minecraft',
    shortAnswer: 'In Survival mode the anvil refuses any job that would cost 40 or more XP levels — that is the "Too Expensive" limit. Creative mode has no limit.',
    explanation: `Every time an item goes on the anvil it gains a hidden "prior work penalty": 0, then 1, 3, 7, 15, 31 extra levels on each following use. After several combines or repairs, the penalty alone pushes the total cost past 40 and the item becomes unusable on the anvil.

Renaming an item is the exception — a rename-only job always stays cheap and does not hit the limit the same way.`,
    workedExample: 'An item that has already been worked on the anvil 5 times carries a 31-level penalty before the new job\'s own cost is even added.',
    relatedToolId: 'minecraft-anvil-cost-calculator'
  },
  {
    gameSlug: 'genshin',
    gameName: 'Genshin Impact',
    question: 'How long does it take for Original Resin to fully refill in Genshin Impact?',
    slug: 'how-long-for-original-resin-to-fully-refill-in-genshin-impact',
    shortAnswer: 'Original Resin refills at 1 point every 8 minutes, so a full 200 Resin takes 26 hours and 40 minutes from empty. You regenerate 180 Resin per day.',
    explanation: `Because the daily regeneration (180) is less than the cap (200), logging in once a day is not enough to avoid waste — some Resin overflows unless you spend it roughly every 24 hours or store it as Condensed Resin.

Fragile Resin items restore 60 Resin instantly and are best saved for heavy farming days, such as new artifact domains.`,
    workedExample: '200 × 8 minutes = 1,600 minutes = 26 hours 40 minutes for a completely full bar.',
    relatedToolId: 'genshin-resin-calculator'
  }
];

export function getQaEntry(gameSlug: string, questionSlug: string): QaEntry | undefined {
  return QA_ENTRIES.find(q => q.gameSlug === gameSlug && q.slug === questionSlug);
}

export function getQaEntriesByGame(gameSlug: string): QaEntry[] {
  return QA_ENTRIES.filter(q => q.gameSlug === gameSlug);
}

export function getQaGames(): { slug: string; name: string; count: number }[] {
  const gamesMap = new Map<string, { name: string; count: number }>();
  for (const entry of QA_ENTRIES) {
    const existing = gamesMap.get(entry.gameSlug);
    if (existing) {
      existing.count += 1;
    } else {
      gamesMap.set(entry.gameSlug, { name: entry.gameName, count: 1 });
    }
  }
  return Array.from(gamesMap.entries()).map(([slug, data]) => ({
    slug,
    name: data.name,
    count: data.count
  }));
}
