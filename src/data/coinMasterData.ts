/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ToolItem } from './types';

export const COIN_MASTER_TOOLS: ToolItem[] = [
  {
    id: 'cm-village-calculator',
    slug: 'cm-village-calculator',
    name: 'Village Cost Calculator',
    gameId: 'cm',
    categoryId: 'calculators',
    icon: 'Zap',
    shortDescription: 'Calculate the total coins required to complete your current or future village levels.',
    description: 'Accurately estimate village build costs in Coin Master. Plan your coin savings for "Village Master" or "Village Mania" events and see how much you need to reach higher milestones.',
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 120,
    userCount: '5.2K players',
    featured: true,
    tags: ['coin master', 'village', 'coins', 'upgrade cost', 'calculator'],
    seoTitle: 'Coin Master Village Cost Calculator – Village Build & Upgrade Costs',
    metaDescription: 'Calculate total coin requirements for Coin Master villages. Get exact costs per upgrade item and planning tips for Village Mania events.',
    h1: 'Coin Master Village Cost Calculator',
    canonicalPath: '/tools/cm-village-calculator',
    howToGuide: {
      overview: 'Input your current village level to see the estimated total cost and individual item prices.',
      steps: [
        { title: 'Current Level', description: 'Enter the level of the village you are currently building or planning.' },
        { title: 'View Costs', description: 'See the total coins required and the average cost per item (out of 25).' },
        { title: 'Plan for Events', description: 'Use the data to decide if you have enough coins to start during a discount event.' }
      ]
    },
    formulaExplained: {
      title: 'Exponential Village Cost Scaling',
      details: 'Coin Master village costs scale exponentially as level increases. The formula approximates the base cost growth per level, with significant spikes at level 100 and 200 milestones.\n\nWorked Example 1: Village 100 costs approximately 1.5 Billion coins to complete from scratch.\nWorked Example 2: Village 200 costs approximately 18 Billion coins. During a 20% Village Mania event, this drops to 14.4 Billion.',
      mathSnippet: 'Cost = Base * Growth^(Level - 1)'
    },
    faqs: [
      { question: 'What is the cheapest way to build a village?', answer: 'Wait for a "Village Mania" (20-65% discount) or "Village Master" (extra rewards) event before spending coins.' },
      { question: 'How many items are in each village?', answer: 'Every village has 5 main items, each with 5 upgrade stars, totaling 25 items to complete the level.' },
      { question: 'Should I build items one by one?', answer: 'No, it is safer to save enough coins to build the entire village at once to avoid repair costs from being attacked.' }
    ],
    proTips: [
      'Never leave a partially built village overnight to avoid being raided and losing coins on repairs.',
      'Only start building once you have enough coins to complete all 25 items in one session.'
    ],
    relatedToolIds: ['cm-free-spin-links', 'cm-pet-timer']
  },
  {
    id: 'cm-free-spin-links',
    slug: 'cm-free-spin-links',
    name: 'Free Spin Links & Daily Rewards',
    gameId: 'cm',
    categoryId: 'trackers',
    icon: 'Gift',
    shortDescription: 'Get the latest verified free spin links and daily gift rewards for Coin Master.',
    description: 'A dedicated directory for daily Coin Master free spins and coin links. All links are sourced from official social media channels and verified to ensure they are safe and active.',
    badge: 'Daily Updated',
    rating: 4.9,
    reviewsCount: 520,
    userCount: '21K+ users',
    featured: true,
    tags: ['coin master', 'spins', 'links', 'free rewards', 'daily spins'],
    seoTitle: 'Coin Master Free Spin Links – Verified Daily Rewards 2026',
    metaDescription: 'Access daily verified Coin Master free spin links. Get 25, 50, and 100 free spins today with our updated link directory.',
    h1: 'Coin Master Free Spin Links & Daily Rewards',
    canonicalPath: '/tools/cm-free-spin-links',
    howToGuide: {
      overview: 'Browse the list of active links and click "Claim" to open Coin Master and receive your reward.',
      steps: [
        { title: 'Check Date', description: 'Look for links dated "Today" or "Yesterday" for the best success rate.' },
        { title: 'Click Claim', description: 'Click the claim button to be redirected to the game app or site.' },
        { title: 'Collect Reward', description: 'The reward will be automatically added to your Coin Master account.' }
      ]
    },
    formulaExplained: {
      title: 'Link Verification System',
      details: 'Links are aggregated from official Coin Master Facebook, Instagram, and Twitter pages. Our system checks for duplicates and expiry times.\n\nWorked Example 1: A "25 Spins" link usually lasts 3 days. If 5 links are active today, you can claim 125 total spins.\nWorked Example 2: Some links provide "10 Spins + 1 Million Coins". These are best claimed during Viking Quest events.',
      mathSnippet: 'SuccessRate = (ActiveLinks / TotalDailyLinks) * 100'
    },
    faqs: [
      { question: 'Do free spin links expire?', answer: 'Yes, most Coin Master links expire within 48 to 72 hours.' },
      { question: 'Can I use the same link twice?', answer: 'No, each link can only be claimed once per game account.' },
      { question: 'Why does a link say "Invitation Expired"?', answer: 'This usually means the link has reached its time limit or you have already claimed it from another source.' }
    ],
    proTips: [
      'Open the links on the device where you have Coin Master installed for a seamless experience.',
      'Check back multiple times a day as new links are released at different hours.'
    ],
    relatedToolIds: ['cm-village-calculator', 'cm-event-planner']
  },
  {
    id: 'cm-card-tracker',
    slug: 'cm-card-tracker',
    name: 'Card Set Tracker & Missing Cards',
    gameId: 'cm',
    categoryId: 'trackers',
    icon: 'BookOpen',
    shortDescription: 'Track your card collection and manage missing cards to complete sets for spins.',
    description: 'Interactive card set tracker for Coin Master. Mark cards as collected, track your progress through hundreds of sets, and identify exactly which rare cards you need to complete your collection.',
    badge: 'New Tool',
    rating: 4.7,
    reviewsCount: 150,
    userCount: '3.4K players',
    featured: false,
    tags: ['coin master', 'cards', 'stickers', 'card sets', 'collection'],
    seoTitle: 'Coin Master Card Set Tracker – Track Missing Rare Cards',
    metaDescription: 'Manage your Coin Master card collection. Track missing gold cards and rare stickers to maximize your spin rewards.',
    h1: 'Coin Master Card Set Tracker',
    canonicalPath: '/tools/cm-card-tracker',
    howToGuide: {
      overview: 'Select a card set and click on cards to toggle their collection status. Your progress is saved automatically.',
      steps: [
        { title: 'Select Set', description: 'Browse or search for the set you are currently working on.' },
        { title: 'Mark Cards', description: 'Click a card to mark it as owned. The progress bar will update instantly.' },
        { title: 'Identify Gaps', description: 'Filter by "Missing" to see which cards you should request from friends or trade.' }
      ]
    },
    formulaExplained: {
      title: 'Collection Progress Math',
      details: 'Completion percentage is calculated based on the number of owned cards versus the total cards in each set (usually 9).\n\nWorked Example 1: Owning 6 out of 9 cards in the "Statues" set results in a 66.7% completion score.\nWorked Example 2: Completing the "Pets" set (9/9) grants a reward of 1,000 spins and 5,000 pet XP.',
      mathSnippet: 'Progress% = (Owned / Total) * 100'
    },
    faqs: [
      { question: 'What are Gold Cards?', answer: 'Gold cards are rare cards that can only be traded during special "Gold Trade" events.' },
      { question: 'Which card sets give the most spins?', answer: 'Higher level sets like "Alice", "Sherlock", and "Oz" offer thousands of spins upon completion.' },
      { question: 'Can I trade any card at any time?', answer: 'No, standard cards can be traded with friends at any time, but Gold cards require a specific event to be active.' }
    ],
    proTips: [
      'Join Facebook card trading groups to find players who have the duplicates you need.',
      'Keep your gold cards until a Gold Trade event for the specific set is active.'
    ],
    relatedToolIds: ['cm-free-spin-links', 'cm-event-planner']
  },
  {
    id: 'cm-event-planner',
    slug: 'cm-event-planner',
    name: 'Event Timer & Strategy Planner',
    gameId: 'cm',
    categoryId: 'trackers',
    icon: 'Clock',
    shortDescription: 'Plan your spin spending around active events like Raid Master and Village Mania.',
    description: 'Optimize your gameplay by tracking active and upcoming Coin Master events. Learn when to bet high, when to save coins, and how to maximize rewards during special seasonal events.',
    rating: 4.6,
    reviewsCount: 210,
    userCount: '4.1K players',
    tags: ['coin master', 'events', 'raids', 'timer', 'strategy'],
    seoTitle: 'Coin Master Event Timer – Raid Master & Village Mania Schedule',
    metaDescription: 'Stay updated on Coin Master events. Schedule your spins for Raid Master, Attack Master, and Village Mania for 2026.',
    h1: 'Coin Master Event Timer Planner',
    canonicalPath: '/tools/cm-event-planner',
    howToGuide: {
      overview: 'Check the active event list to see current boosts and time remaining.',
      steps: [
        { title: 'Identify Event', description: 'Look for Raid Master, Attack Master, or seasonal specials.' },
        { title: 'Check Timer', description: 'Note the time remaining to ensure you finish your progress tiers.' },
        { title: 'Adjust Betting', description: 'Increase your spin multiplier during high-reward events like Raid Master.' }
      ]
    },
    formulaExplained: {
      title: 'Event ROI Calculation',
      details: 'Different events have different Return on Investment (ROI). This tool helps you prioritize events that offer the highest spin-to-point ratios.\n\nWorked Example 1: In "Raid Master", reaching a 1000-spin milestone might require 800 spins of betting, yielding a 125% ROI.\nWorked Example 2: During "Viking Quest", you spend coins instead of spins. Completing all 10 stages usually costs ~20 Billion coins at high levels.',
      mathSnippet: 'Efficiency = RewardSpins / SpinsSpent'
    },
    faqs: [
      { question: 'When does the next Village Mania start?', answer: 'Events usually rotate every 2-4 days. Check our live tracker for current status.' },
      { question: 'Is Attack Master better than Raid Master?', answer: 'Raid Master is generally better for players with high-level pets (Foxy) as raid rewards are more consistent.' },
      { question: 'What is the "Set Blast" event?', answer: 'Set Blast grants 30-100% extra rewards for completing any card set while the event is active.' }
    ],
    proTips: [
      'Save your spins until an event starts; spinning during "dead time" is inefficient.',
      'Combine Village Mania with a completed card set for a massive coin boost.'
    ],
    relatedToolIds: ['cm-pet-timer', 'cm-village-calculator']
  },
  {
    id: 'cm-pet-timer',
    slug: 'cm-pet-timer',
    name: 'Pet Food Timer & Cooldown Tracker',
    gameId: 'cm',
    categoryId: 'trackers',
    icon: 'PawPrint',
    shortDescription: 'Track your pet food duration and free activation cooldowns for Foxy, Tiger, and Rhino.',
    description: 'Ensure your pets are always active when you raid or attack. This tool tracks the 4-hour food duration and the 24-hour free activation cooldown for all Coin Master pets.',
    badge: 'Essential',
    rating: 4.5,
    reviewsCount: 110,
    userCount: '2.8K players',
    tags: ['coin master', 'pets', 'timer', 'cooldown', 'foxy'],
    seoTitle: 'Coin Master Pet Timer – Food Duration & Cooldown Tracker',
    metaDescription: 'Track Coin Master pet food timers and free activation cooldowns. Maximize your Foxy and Tiger bonuses.',
    h1: 'Coin Master Pet Timer',
    canonicalPath: '/tools/cm-pet-timer',
    howToGuide: {
      overview: 'Set your pet food timer when you feed a pet to receive a notification or visual warning when it expires.',
      steps: [
        { title: 'Select Pet', description: 'Choose between Foxy (Raids), Tiger (Attacks), or Rhino (Defense).' },
        { title: 'Start Timer', description: 'Input current remaining time or start a fresh 4-hour countdown.' },
        { title: 'Track Cooldown', description: 'Mark when you used your daily free 15-minute activation.' }
      ]
    },
    formulaExplained: {
      title: 'Pet Bonus Mechanics',
      details: 'Pets provide a percentage bonus to raid/attack results. Foxy gives up to 100%+ extra coins on raids at max level.\n\nWorked Example 1: A Level 10 Foxy provides a 60% raid bonus. A 10 Million coin raid becomes 16 Million with Foxy active.\nWorked Example 2: Tiger at Level 5 gives a 40% attack bonus. A 1 Million coin attack becomes 1.4 Million.',
      mathSnippet: 'FinalLoot = BaseLoot * (1 + PetBonus%)'
    },
    faqs: [
      { question: 'How long does pet food last?', answer: 'One pet food treat provides 4 hours of active bonus time.' },
      { question: 'What is the free pet activation?', answer: 'Every 24 hours, you get one free activation that lasts for 15 minutes.' },
      { question: 'Which pet is best for beginners?', answer: 'Foxy is the most useful pet for all levels as raids are the primary way to earn large amounts of coins.' }
    ],
    proTips: [
      'Only feed Foxy when you have a significant amount of spins (50+) to ensure you get several raids.',
      'Rhino is best kept for defensive backup if you are holding a large coin balance.'
    ],
    relatedToolIds: ['cm-event-planner', 'cm-village-calculator']
  }
];
