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
    relatedToolId: 'robux-calculator'
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
    relatedToolId: 'robux-calculator'
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
    relatedToolId: 'robux-calculator'
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
    relatedToolId: 'robux-calculator'
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
    relatedToolId: 'robux-calculator'
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
    relatedToolId: 'robux-calculator'
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
    relatedToolId: 'robux-calculator'
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
    relatedToolId: 'robux-calculator'
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
    relatedToolId: 'robux-calculator'
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
    relatedToolId: 'robux-calculator'
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
    relatedToolId: 'robux-calculator'
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
    relatedToolId: 'robux-calculator'
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
