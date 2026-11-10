/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ToolItem, GameInfo } from './types';

export const EXTRA_GAMES: GameInfo[] = [
  {
    id: 'genshin',
    slug: 'genshin',
    name: 'Genshin Impact',
    shortName: 'Genshin',
    tagline: 'Wish pity, resin timer, artifact CV & ascension planners',
    description: 'Verified theorycrafting calculators for Genshin Impact travelers: 90-hard / 74-soft wish pity odds, 200 resin cap timers, artifact Crit Value (CV) roll scoring, and talent mora budgets.',
    color: 'from-cyan-950/60 to-zinc-950',
    borderColor: 'border-cyan-500/30',
    accentColor: 'text-cyan-400',
    icon: 'Compass',
    badge: '10 Tools Available'
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
    badge: '10 Tools Available'
  }
];

export const EXTRA_TOOLS: ToolItem[] = [
  // ================= GENSHIN IMPACT (10 TOOLS) =================
  {
    id: 'genshin-pity-calculator',
    slug: 'genshin-pity-calculator',
    name: 'Genshin Impact Wish & Pity Calculator',
    gameId: 'genshin',
    categoryId: 'calculators',
    icon: 'Sparkles',
    shortDescription: 'Calculate 5-star wish pull odds, soft pity threshold (74+), and Primogems needed.',
    description: 'Official probability distribution for Character Event and Weapon banners. Calculates exact Primogems and Intertwined Fates needed factoring in 50/50 guarantee and soft pity acceleration starting at pull 74.',
    badge: 'Patch 5.x',
    rating: 4.96,
    reviewsCount: 312,
    userCount: '19.4K',
    featured: true,
    tags: ['genshin', 'pity', 'wishes', 'primogems', 'fates', '5-star'],
    seoTitle: 'Genshin Impact Wish Pity Calculator – 50/50 & Primogem Odds',
    metaDescription: 'Calculate exact Primogem and Fate requirements for Genshin 5-star characters. Accounts for soft pity (pull 74) and 50/50 guarantee.',
    h1: 'Genshin Impact Wish & Pity Calculator',
    canonicalPath: '/tools/genshin-pity-calculator',
    howToGuide: {
      overview: 'Enter your current banner pity count and available Primogems to calculate guaranteed 5-star acquisition chance.',
      steps: [
        { title: 'Current Pity', description: 'Enter number of pulls made since your last 5-star character (0–89).' },
        { title: 'Guarantee Status', description: 'Select whether your next 5-star is guaranteed or on the 50/50 coin flip.' },
        { title: 'Inventory Input', description: 'Input your available Primogems and Intertwined Fates.' }
      ]
    },
    formulaExplained: {
      title: 'Genshin Soft Pity Curve',
      details: 'Base 5-star rate is 0.600%. Starting at pull 74, soft pity increases the rate by approximately ~6.0% per pull until reaching 100% at pull 90.\n\nWorked Example 1: At 75 pity, your chance of a 5-star is approx 12.6% (0.6% + 2 * 6%).\nWorked Example 2: To guarantee a 5-star from 0 pity, you need 90 pulls (14,400 Primogems). If you lose the 50/50, you need 180 pulls (28,800 Primogems) for the featured character.',
      mathSnippet: 'P(pull < 74) = 0.006; P(pull >= 74) = 0.006 + 0.06 * (pull - 73)'
    },
    faqs: [
      { question: 'When does soft pity start in Genshin?', answer: 'Character Event banners enter soft pity at pull 74, where 5-star drop probability surges dramatically.' },
      { question: 'How many Primogems guarantee a featured character?', answer: 'In the worst-case scenario with a lost 50/50, 180 pulls (28,800 Primogems) guarantee the featured character.' },
      { question: 'Does pity carry over between banners?', answer: 'Yes, pity and your 50/50 guarantee carry over between banners of the same type (e.g., Character Event Banner 1 and 2).' }
    ],
    proTips: ['Most 5-star characters are obtained between pulls 75 and 81 due to soft pity stacking.'],
    relatedToolIds: ['genshin-resin-calculator', 'genshin-artifact-cv-calculator']
  },
  {
    id: 'genshin-resin-calculator',
    slug: 'genshin-resin-calculator',
    name: 'Genshin Impact Resin Refill & Cap Timer',
    gameId: 'genshin',
    categoryId: 'trackers',
    icon: 'Clock',
    shortDescription: 'Track Original Resin replenishment (1 per 8 min) up to the 200 cap with exact refill time.',
    description: 'Real-time Resin tracker and scheduling calculator. Calculates the precise clock time your Original Resin reaches 200 cap or 160 threshold for condensed resin craft runs.',
    badge: 'Cap 200',
    rating: 4.93,
    reviewsCount: 240,
    userCount: '14.2K',
    tags: ['genshin', 'resin', 'condensed resin', 'timer', 'farming'],
    seoTitle: 'Genshin Resin Calculator – 200 Cap Refill Timer & Schedule',
    metaDescription: 'Accurate Genshin Impact resin recovery timer. Calculates time to cap at 200 resin and optimal condensed crafting.',
    h1: 'Genshin Impact Resin Refill & Cap Timer',
    canonicalPath: '/tools/genshin-resin-calculator',
    howToGuide: {
      overview: 'Input your current in-game Original Resin count to see exact hours and minutes until full regeneration.',
      steps: [
        { title: 'Input Resin', description: 'Enter current resin amount (0–200).' },
        { title: 'Target Amount', description: 'Set desired resin target (e.g., 40 for boss, 160 for 4 condensed, 200 for cap).' }
      ]
    },
    formulaExplained: {
      title: 'Resin Replenishment Rate',
      details: 'Original Resin regenerates at a constant 1 unit every 8 minutes (480 seconds), producing 180 Resin per 24-hour cycle.\n\nWorked Example 1: If you have 0 resin, it will take 160 minutes (2h 40m) to reach 20 resin for a Ley Line/Domain run.\nWorked Example 2: To go from 0 to 200 (the cap), it takes 1,600 minutes, which is exactly 26 hours and 40 minutes.',
      mathSnippet: 'MinutesRemaining = (TargetResin - CurrentResin) * 8'
    },
    faqs: [
      { question: 'What is the maximum Original Resin limit?', answer: 'The maximum Original Resin limit is 200 resin as of Version 4.7+.' },
      { question: 'How do I get more Resin quickly?', answer: 'You can use Fragile Resin (restores 60) or Transient Resin from the Serenitea Pot. You can also spend Primogems for a "refill" up to 6 times per day.' },
      { question: 'What is Condensed Resin?', answer: 'Condensed Resin is crafted at a crafting bench using 40 Original Resin and 1 Crystal Core. It allows you to claim double rewards from Ley Lines and Domains in a single run.' }
    ],
    proTips: ['Craft Condensed Resin (40 Original Resin + 1 Crystal Core) to double domain efficiency and save farming time.'],
    relatedToolIds: ['genshin-pity-calculator', 'genshin-artifact-cv-calculator']
  },
  {
    id: 'genshin-artifact-cv-calculator',
    slug: 'genshin-artifact-cv-calculator',
    name: 'Genshin Artifact Crit Value (CV) Calculator',
    gameId: 'genshin',
    categoryId: 'calculators',
    icon: 'Award',
    shortDescription: 'Calculate Crit Value (CV) for artifacts: Crit Rate × 2 + Crit DMG with tier grading.',
    description: 'Evaluates artifact quality using the official theorycrafting CV standard. Grades artifacts into SSS (God roll 50+ CV), SS (40+ CV), S (30+ CV), and A (20+ CV) categories.',
    badge: 'Theorycrafting',
    rating: 4.98,
    reviewsCount: 480,
    userCount: '28.1K',
    featured: true,
    tags: ['genshin', 'artifacts', 'crit value', 'cv', 'theorycraft'],
    seoTitle: 'Genshin Artifact CV Calculator – Crit Value & Roll Quality Score',
    metaDescription: 'Calculate Crit Value (CV = CR*2 + CD) for Genshin Impact artifacts. Identifies god-roll artifacts with verified substat grading.',
    h1: 'Genshin Artifact Crit Value (CV) Calculator',
    canonicalPath: '/tools/genshin-artifact-cv-calculator',
    howToGuide: {
      overview: 'Enter your artifact Crit Rate % and Crit DMG % substats to score its roll tier.',
      steps: [
        { title: 'Crit Rate', description: 'Enter the Crit Rate % substat (e.g. 10.5).' },
        { title: 'Crit DMG', description: 'Enter the Crit DMG % substat (e.g. 21.8).' }
      ]
    },
    formulaExplained: {
      title: 'Crit Value Mathematical Formula',
      details: 'Crit Value standardizes 1% Crit Rate as worth 2% Crit DMG due to artifact roll distribution.\n\nWorked Example 1: An artifact with 10% Crit Rate and 20% Crit DMG has a CV of (10 * 2) + 20 = 40.0 (SS Tier).\nWorked Example 2: An artifact with 3.5% Crit Rate and 14% Crit DMG has a CV of (3.5 * 2) + 14 = 21.0 (A Tier).',
      mathSnippet: 'CV = (CritRate * 2) + CritDMG'
    },
    faqs: [
      { question: 'What is considered a good Crit Value in Genshin?', answer: '30+ CV is considered very strong (S-tier), while 40+ CV is a rare god roll (SS-tier).' },
      { question: 'Does CV include the main stat?', answer: 'Standard CV calculation typically only includes substats. For Circlets, we usually ignore the main stat unless comparing two different main stats (like CR vs CD).' },
      { question: 'Why is Crit Rate multiplied by 2?', answer: 'In artifact rolls, the maximum possible Crit DMG roll is exactly twice the maximum possible Crit Rate roll (7.8% vs 3.9%). Doubling the rate balances the two stats for easy comparison.' }
    ],
    proTips: ['Circlets with Crit main stat should calculate CV using only the opposite Crit substat.'],
    relatedToolIds: ['genshin-pity-calculator', 'genshin-damage-calculator']
  },
  {
    id: 'genshin-damage-calculator',
    slug: 'genshin-damage-calculator',
    name: 'Genshin Impact Damage & Defense Multiplier',
    gameId: 'genshin',
    categoryId: 'calculators',
    icon: 'Sword',
    shortDescription: 'Calculate skill damage with ATK scaling, Crit DMG, enemy defense reduction, and elemental RES.',
    description: 'Computes outbound combat damage for normal attacks and elemental bursts using the complete Genshin damage formula including enemy DEF multiplier and resistance shred.',
    rating: 4.91,
    reviewsCount: 189,
    userCount: '11.8K',
    tags: ['genshin', 'damage', 'defense', 'res shred', 'atk'],
    seoTitle: 'Genshin Impact Damage Calculator – Skill Multipliers & DEF Shred',
    metaDescription: 'Accurate Genshin Impact damage formula calculator. Calculates outbound attack numbers against enemy level and resistances.',
    h1: 'Genshin Impact Damage & Defense Multiplier',
    canonicalPath: '/tools/genshin-damage-calculator',
    howToGuide: {
      overview: 'Input character ATK, ability talent percentage, DMG Bonus %, Crit DMG, and enemy level to calculate non-crit and critical hit damage.',
      steps: [
        { title: 'Attack & Talent', description: 'Enter total ATK and skill talent multiplier percentage.' },
        { title: 'Crit & Bonus', description: 'Enter total Damage Bonus % and Crit DMG %.' }
      ]
    },
    formulaExplained: {
      title: 'Full Damage Pipeline',
      details: 'Outgoing = ATK * Talent% * (1 + DmgBonus) * EnemyDefMult * EnemyResMult * (1 + CritDMG).\n\nWorked Example 1: A character with 2000 ATK, 100% Talent, and 50% DMG bonus against a same-level enemy (0.5 DefMult) deals 2000 * 1 * 1.5 * 0.5 = 1500 non-crit damage.\nWorked Example 2: If that same hit crits with 150% Crit DMG, the damage becomes 1500 * (1 + 1.5) = 3750.',
      mathSnippet: 'EnemyDefMult = (CharLvl + 100) / ((CharLvl + 100) + (EnemyLvl + 100) * (1 - DefReduction))'
    },
    faqs: [
      { question: 'How much does enemy DEF reduce damage?', answer: 'Against an equal-level enemy with 0% defense shred, enemy defense halves (50%) outbound damage.' },
      { question: 'What is the difference between Base DMG and Final DMG?', answer: 'Base DMG is (ATK * Talent%), while Final DMG is the result after all multipliers like DMG Bonus, Crits, and Enemy Defense/Resistances are applied.' },
      { question: 'Does defense reduction (Def Shred) make a big difference?', answer: 'Yes! Reducing enemy defense from 50% to 25% (via 50% Def Shred) results in a massive 33% increase in total damage dealt.' }
    ],
    proTips: ['Elemental RES shred below 0% is halved in effectiveness but still yields substantial overall DPS gains.'],
    relatedToolIds: ['genshin-artifact-cv-calculator', 'genshin-elemental-reaction-calculator']
  },
  {
    id: 'genshin-elemental-reaction-calculator',
    slug: 'genshin-elemental-reaction-calculator',
    name: 'Genshin Elemental Reaction Multiplier Calculator',
    gameId: 'genshin',
    categoryId: 'calculators',
    icon: 'Flame',
    shortDescription: 'Calculate Vaporize, Melt, Aggravate, Spread, Hyperbloom, and Swirl damage multipliers with EM.',
    description: 'Comprehensive Elemental Reaction calculation matrix. Determines amplifying multipliers (1.5x / 2.0x) and transformative reaction base damage from character Elemental Mastery (EM).',
    rating: 4.95,
    reviewsCount: 220,
    userCount: '13.6K',
    tags: ['genshin', 'elemental reaction', 'melt', 'vaporize', 'hyperbloom', 'em'],
    seoTitle: 'Genshin Elemental Reaction Calculator – Vaporize, Melt & Hyperbloom',
    metaDescription: 'Calculate exact damage bonuses for Genshin Impact elemental reactions including Forward/Reverse Melt and Hyperbloom from EM.',
    h1: 'Genshin Elemental Reaction Multiplier Calculator',
    canonicalPath: '/tools/genshin-elemental-reaction-calculator',
    howToGuide: {
      overview: 'Select reaction type and enter your character Elemental Mastery (EM) to compute the reaction bonus percentage.',
      steps: [
        { title: 'Reaction Type', description: 'Choose Vaporize (Pyro->Hydro / Hydro->Pyro), Melt, or Dendro reactions.' },
        { title: 'Elemental Mastery', description: 'Enter character total EM value.' }
      ]
    },
    formulaExplained: {
      title: 'Amplifying Reaction EM Formula',
      details: 'Amplifying reactions (Melt/Vaporize) receive bonus damage based on Elemental Mastery.\n\nWorked Example 1: With 200 EM, your Vaporize/Melt bonus is approx 36%. A 1.5x Reverse Vaporize becomes 1.5 * (1 + 0.36) = 2.04x total multiplier.\nWorked Example 2: For transformative reactions like Swirl, 200 EM provides approx 158% bonus damage to the base reaction damage.',
      mathSnippet: 'AmpMultiplier = BaseMultiplier * (1 + (2.78 * EM / (EM + 1400)) + ReactionBonus)'
    },
    faqs: [
      { question: 'What is the difference between Forward and Reverse Vaporize?', answer: 'Hydro triggered on Pyro is Forward (2.0x base), while Pyro triggered on Hydro is Reverse (1.5x base).' },
      { question: 'Which reactions scale best with high EM?', answer: 'Transformative reactions like Bloom, Hyperbloom, and Burgeon scale the most aggressively with EM, as their entire damage base is derived from EM and Level.' },
      { question: 'Is there an EM cap for reactions?', answer: 'There is no hard cap, but there are diminishing returns. After 800–1000 EM, the bonus percentage increases much more slowly per point.' }
    ],
    proTips: ['Hyperbloom and Burgeon scale quadratically with character Level 90 and pure Elemental Mastery.'],
    relatedToolIds: ['genshin-damage-calculator', 'genshin-pity-calculator']
  },
  {
    id: 'genshin-ascension-calculator',
    slug: 'genshin-ascension-calculator',
    name: 'Genshin Character Ascension & Mora Planner',
    gameId: 'genshin',
    categoryId: 'planners',
    icon: 'Layers',
    shortDescription: 'Calculate Hero\'s Wit EXP books, regional specialties, world boss gems, and Mora to level 90.',
    description: 'Calculates the complete resource investment to level a Genshin Impact character from level 1 to 90, including 421 Hero\'s Wit books and 2,092,530 Mora.',
    rating: 4.89,
    reviewsCount: 165,
    userCount: '10.5K',
    tags: ['genshin', 'ascension', 'mora', 'heros wit', 'level 90'],
    seoTitle: 'Genshin Character Ascension Calculator – Mora & Hero\'s Wit',
    metaDescription: 'Plan character leveling from 1 to 90 with exact Hero\'s Wit, Ascension gemstones, and Mora requirements.',
    h1: 'Genshin Character Ascension & Mora Planner',
    canonicalPath: '/tools/genshin-ascension-calculator',
    howToGuide: {
      overview: 'Choose starting level and target level to see total materials required.',
      steps: [
        { title: 'Current Level', description: 'Select starting level (e.g. Level 1 or 70).' },
        { title: 'Target Level', description: 'Select desired milestone (e.g. Level 80 ascended or Level 90).' }
      ]
    },
    formulaExplained: {
      title: 'Level 1 to 90 EXP Pacing',
      details: 'Total EXP required is 8,362,650 EXP, equivalent to 418.1 Hero\'s Wit books (20,000 EXP each) plus 1.6M EXP from 80 to 90.\n\nWorked Example 1: Leveling from 1 to 80 requires 249 Hero\'s Wit and 1,287,905 Mora.\nWorked Example 2: The final push from 80 to 90 requires 172 Hero\'s Wit (over 40% of the total!) and 684,600 Mora.',
      mathSnippet: 'TotalMora = (TotalExp / 5) + AscensionMoraCosts'
    },
    faqs: [
      { question: 'Is Level 90 worth it for all characters?', answer: 'Level 90 is critical for HP-scaling, DEF-scaling, and Transformative reaction characters (Dendro, Anemo, Electro). ATK-scaling characters can stop at 80 ascended.' },
      { question: 'How much Mora is needed for a full Level 90 character?', answer: 'Approximately 2.1 million Mora is needed just for leveling (1 to 90), excluding talent costs and weapon costs.' },
      { question: 'What are the Ascension phases?', answer: 'Characters must ascend at levels 20, 40, 50, 60, 70, and 80. Each ascension unlocks the next level cap and grants a specific stat bonus.' }
    ],
    proTips: ['Stopping at Level 80 Ascended (80/90) saves 172 Hero\'s Wit and 680,000 Mora.'],
    relatedToolIds: ['genshin-talent-calculator', 'genshin-resin-calculator']
  },
  {
    id: 'genshin-talent-calculator',
    slug: 'genshin-talent-calculator',
    name: 'Genshin Impact Talent Material & Crown Calculator',
    gameId: 'genshin',
    categoryId: 'planners',
    icon: 'Award',
    shortDescription: 'Calculate Talent Books (Teaching/Guide/Philosophies), weekly boss drops, and Crowns to Level 10.',
    description: 'Calculates exact talent material costs to level Normal Attack, Skill, and Burst talents from 1 to 10, including Crowns of Insight and weekly boss drops.',
    rating: 4.92,
    reviewsCount: 178,
    userCount: '11.2K',
    tags: ['genshin', 'talents', 'crown of insight', 'books', 'materials'],
    seoTitle: 'Genshin Talent Material Calculator – Talent Books & Crown Planner',
    metaDescription: 'Calculate talent book, weekly boss drops, and Mora costs for triple-crowning characters in Genshin Impact.',
    h1: 'Genshin Impact Talent Material & Crown Calculator',
    canonicalPath: '/tools/genshin-talent-calculator',
    howToGuide: {
      overview: 'Set current talent level and target talent level to get the shopping list of talent domain books.',
      steps: [
        { title: 'Select Current & Target', description: 'Choose talent level range (1–10).' }
      ]
    },
    formulaExplained: {
      title: 'Talent Level 1 to 10 Cost',
      details: 'One single talent to Level 10 requires 3 Teachings, 21 Guides, 38 Philosophies, 6 Weekly Boss Drops, 1 Crown, and 1,652,500 Mora.\n\nWorked Example 1: To get a talent from Level 1 to 6 (standard budget build), you need 3 Teachings, 21 Guides, and 122,500 Mora.\nWorked Example 2: Triple-crowning (all 3 talents to 10) costs 4,957,500 Mora and 114 Philosophies.',
      mathSnippet: 'TripleCrown = 3 * SingleTalentLvl10'
    },
    faqs: [
      { question: 'How many Crowns of Insight are needed to triple-crown?', answer: 'Triple-crowning a character requires 3 Crowns of Insight and ~4.95 million Mora.' },
      { question: 'When do I start needing Weekly Boss drops?', answer: 'Weekly boss materials are required starting from Talent Level 7 up to Level 10.' },
      { question: 'Can I get talent materials on any day?', answer: 'No, specific talent books are only available in domains on certain days of the week. All books are available on Sundays.' }
    ],
    proTips: ['Crafting lower-tier talent books with Xingqiu refunds 25% of crafted materials.'],
    relatedToolIds: ['genshin-ascension-calculator', 'genshin-resin-calculator']
  },
  {
    id: 'genshin-energy-recharge-calculator',
    slug: 'genshin-energy-recharge-calculator',
    name: 'Genshin Energy Recharge (ER) & Burst Threshold',
    gameId: 'genshin',
    categoryId: 'calculators',
    icon: 'Zap',
    shortDescription: 'Calculate required Energy Recharge % to cast Elemental Bursts consistently every rotation.',
    description: 'Models energy particle generation, Favonius procs, off-field particle absorption penalties (0.6x multiplier), and burst energy cost (40/60/70/80/90).',
    rating: 4.94,
    reviewsCount: 204,
    userCount: '12.9K',
    tags: ['genshin', 'energy recharge', 'er', 'favonius', 'burst rotation'],
    seoTitle: 'Genshin Energy Recharge Calculator – ER Needs & Burst Rotation',
    metaDescription: 'Find your team ER requirements for seamless burst rotations. Factors in particle generation and off-field energy penalty.',
    h1: 'Genshin Energy Recharge (ER) & Burst Threshold',
    canonicalPath: '/tools/genshin-energy-recharge-calculator',
    howToGuide: {
      overview: 'Select character Burst Cost and particle generation to compute recommended ER % threshold.',
      steps: [
        { title: 'Burst Cost', description: 'Choose burst cost (40, 60, 70, 80, or 90 energy).' },
        { title: 'Favonius Weapons', description: 'Input number of Favonius procs per 20-second rotation.' }
      ]
    },
    formulaExplained: {
      title: 'Particle Energy Calculation',
      details: 'Same-element particles give 3.0 energy on-field and 1.8 off-field. Clear Favonius particles give 2.0 energy on-field and 1.2 off-field.\n\nWorked Example 1: A character with 80 burst cost receiving 10 same-element particles on-field (30 energy) needs 80 / 30 = 2.66x (266%) ER to burst in one cycle.\nWorked Example 2: Adding a Favonius proc (6 energy on-field) reduces the requirement to 80 / (30 + 6) = 2.22x (222%) ER.',
      mathSnippet: 'RequiredER = (BurstCost - FlatEnergy) / GeneratedEnergy * 100'
    },
    faqs: [
      { question: 'Why does Xiangling need 200%+ ER?', answer: 'Xiangling has an 80-cost burst and generates few particles while staying mostly off-field, where particles provide 40% less energy.' },
      { question: 'Does ER affect energy from flat sources?', answer: 'No, flat energy restoration (like Raiden\'s Burst or Venti\'s Ascension 4) is NOT increased by the character\'s Energy Recharge percentage.' },
      { question: 'What is the base Energy Recharge of every character?', answer: 'Every character starts with 100% base Energy Recharge.' }
    ],
    proTips: ['Equipping a Favonius weapon on your support reduces the entire team ER requirement by 15–25%.'],
    relatedToolIds: ['genshin-damage-calculator', 'genshin-artifact-cv-calculator']
  },
  {
    id: 'genshin-weapon-enhancement-calculator',
    slug: 'genshin-weapon-enhancement-calculator',
    name: 'Genshin Weapon EXP & Mystic Ore Calculator',
    gameId: 'genshin',
    categoryId: 'planners',
    icon: 'Hammer',
    shortDescription: 'Calculate Mystic Enhancement Ores and Mora needed to level 4-star and 5-star weapons to 90.',
    description: 'Calculates the exact number of Mystic Enhancement Ores (10,000 EXP each) and Mora required to ascend and enhance weapons through all refinement stages.',
    rating: 4.88,
    reviewsCount: 142,
    userCount: '9.3K',
    tags: ['genshin', 'weapon', 'mystic ore', 'enhancement', 'level 90'],
    seoTitle: 'Genshin Weapon EXP Calculator – Mystic Ore & Mora Requirements',
    metaDescription: 'Calculate Mystic Enhancement Ores and Mora required to level 4-star and 5-star weapons to level 90.',
    h1: 'Genshin Weapon EXP & Mystic Ore Calculator',
    canonicalPath: '/tools/genshin-weapon-enhancement-calculator',
    howToGuide: {
      overview: 'Choose weapon rarity (4-star or 5-star) and current level to compute ore and Mora requirements.',
      steps: [
        { title: 'Weapon Rarity', description: 'Select 4-Star or 5-Star weapon.' },
        { title: 'Target Level', description: 'Set target level (e.g. 90).' }
      ]
    },
    formulaExplained: {
      title: 'Weapon EXP Tier Scaling',
      details: 'A 5-star weapon requires 9,064,450 EXP (~907 Mystic Enhancement Ores), while a 4-star weapon requires 6,042,975 EXP (~605 Ores).\n\nWorked Example 1: To level a 5-star weapon from 1 to 80, you need approx 658 Mystic Ores and 753k Mora.\nWorked Example 2: The final stretch from 80 to 90 for a 4-star weapon costs 165 Mystic Ores and 238k Mora.',
      mathSnippet: 'OreCount = Ceiling(TotalExp / 10000)'
    },
    faqs: [
      { question: 'What is the daily blacksmith ore crafting limit?', answer: 'Blacksmiths can forge a maximum of 30 Mystic Enhancement Ores per day using Crystal Chunks.' },
      { question: 'How much Mora do I need to max a 5-star weapon?', answer: 'Leveling a 5-star weapon to 90 costs approximately 1.13 million Mora total (leveling + ascension fees).' },
      { question: 'Does weapon rarity change the Ascension material types?', answer: 'Yes, 5-star weapons typically require slightly more materials per ascension tier compared to 4-star weapons.' }
    ],
    proTips: ['Daily weapon forging cap is 300,000 EXP (30 Mystic Ores) per day across all cities.'],
    relatedToolIds: ['genshin-ascension-calculator', 'genshin-resin-calculator']
  },
  {
    id: 'genshin-serenitea-pot-calculator',
    slug: 'genshin-serenitea-pot-calculator',
    name: 'Genshin Serenitea Pot Realm Currency Calculator',
    gameId: 'genshin',
    categoryId: 'planners',
    icon: 'Box',
    shortDescription: 'Calculate Realm Currency hourly generation (up to 30/hr at 20,000 Adeptal Energy) and shop value.',
    description: 'Calculates Realm Currency accumulation rates based on Adeptal Energy thresholds, storage tub cap timers, and weekly Transient Resin purchasing budget.',
    rating: 4.87,
    reviewsCount: 135,
    userCount: '8.8K',
    tags: ['genshin', 'serenitea pot', 'realm currency', 'adeptal energy', 'transient resin'],
    seoTitle: 'Genshin Serenitea Pot Calculator – Realm Currency & Tub Timer',
    metaDescription: 'Calculate hourly Realm Currency income and storage cap fill times in Genshin Impact Serenitea Pot.',
    h1: 'Genshin Serenitea Pot Realm Currency Calculator',
    canonicalPath: '/tools/genshin-serenitea-pot-calculator',
    howToGuide: {
      overview: 'Input your realm Adeptal Energy to compute currency generation per hour and days to cap.',
      steps: [
        { title: 'Adeptal Energy', description: 'Enter current Adeptal Energy (e.g. 20,000 for Fit for a King tier).' }
      ]
    },
    formulaExplained: {
      title: 'Currency Generation Formula',
      details: 'At maximum 20,000 Adeptal Energy, Realm Currency accumulates at 30 coins per hour (720 coins per 24 hours), filling the 2,400 cap in 80 hours (3.33 days).\n\nWorked Example 1: To buy the weekly Transient Resin (1,200 coins), you need 40 hours of generation at the 20k energy tier.\nWorked Example 2: If you have 10,000 energy, you earn 22 coins/hour. It will take 109 hours (4.5 days) to fill your 2,400 capacity tub.',
      mathSnippet: 'WeeklyCoins = 30 * 24 * 7 = 5,040'
    },
    faqs: [
      { question: 'What should I prioritize buying with Realm Currency?', answer: 'Always buy Transient Resin (1,200 coins) weekly, followed by Hero\'s Wit and Mystic Enhancement Ores.' },
      { question: 'Does Adeptal Energy increase the load limit?', answer: 'No, Adeptal Energy is based on the items you place, but the Load Limit is a fixed hardware constraint per area.' },
      { question: 'How do I reach 20,000 Adeptal Energy fastest?', answer: 'Place high-energy outdoor items like statues or buildings, and use multiple realm islands if unlocked.' }
    ],
    proTips: ['Crafting duplicate 4-star folding screens or fences provides high Adeptal Energy per load limit.'],
    relatedToolIds: ['genshin-resin-calculator', 'genshin-pity-calculator']
  },

  // ================= FPS & AIM ESPORTS (10 TOOLS) =================
  {
    id: 'universal-mouse-sensitivity-converter',
    slug: 'universal-mouse-sensitivity-converter',
    name: 'Universal Mouse Sensitivity & 1:1 Aim Converter',
    gameId: 'fps',
    categoryId: 'converters',
    icon: 'Crosshair',
    shortDescription: 'Convert mouse sensitivity 1:1 between Valorant, CS2, Apex, Overwatch 2, Fortnite, and R6 Siege.',
    description: 'Mathematical 1:1 cross-game sensitivity converter. Preserves muscle memory and exact cm/360 turn distance across all major competitive first-person shooter titles.',
    badge: 'Pro Verified',
    rating: 4.99,
    reviewsCount: 620,
    userCount: '34.5K',
    featured: true,
    tags: ['fps', 'sensitivity', 'valorant', 'cs2', 'apex', 'overwatch', 'aim'],
    seoTitle: 'Universal Mouse Sensitivity Converter – Valorant to CS2 & Apex 1:1',
    metaDescription: 'Convert mouse sensitivity between Valorant, CS2, Overwatch, Apex, and Fortnite with exact 1:1 cm/360 muscle memory matching.',
    h1: 'Universal Mouse Sensitivity & 1:1 Aim Converter',
    canonicalPath: '/tools/universal-mouse-sensitivity-converter',
    howToGuide: {
      overview: 'Select your source game and target game, then enter your sensitivity to get the mathematically identical value.',
      steps: [
        { title: 'Source Game', description: 'Choose your current game (e.g., Valorant or CS2).' },
        { title: 'Current Sensitivity', description: 'Enter your in-game sensitivity value.' },
        { title: 'Target Game', description: 'Choose the game you are switching to.' }
      ]
    },
    formulaExplained: {
      title: 'Yaw Multiplier Conversion',
      details: 'Yaw values: Valorant = 0.07°, Source/CS2/Apex = 0.022°, Overwatch = 0.0066°. Conversion factor CS2 to Valorant is 1 / 3.181818. Worked Examples: 1. CS2 to Valorant: CS2 Sens 2.0. Valorant Sens = 2.0 / 3.1818 = 0.628. 2. Valorant to Overwatch: Val Sens 0.5. Overwatch Sens = (0.5 * 0.07) / 0.0066 = 5.303.',
      mathSnippet: 'TargetSens = (SourceSens * SourceYaw) / TargetYaw'
    },
    faqs: [
      { question: 'What is the conversion between Valorant and CS2?', answer: 'Divide CS2 sensitivity by 3.1818 to get Valorant sensitivity (or multiply Valorant sensitivity by 3.1818).' },
      { question: 'Does FOV affect sensitivity conversion?', answer: 'This tool uses cm/360 matching, which is independent of FOV. However, your *perceived* sensitivity may change if FOV differs between games.' },
      { question: 'What is "cm/360"?', answer: 'It is the physical distance (in centimeters) your mouse must travel on the mousepad to complete a full 360-degree rotation in-game.' }
    ],
    proTips: ['Maintaining consistent cm/360 across all tactical and arena shooters builds permanent flick muscle memory.'],
    relatedToolIds: ['valorant-edpi-calculator', 'crosshair-generator', 'headshot-percentage-calculator']
  },
  {
    id: 'valorant-edpi-calculator',
    slug: 'valorant-edpi-calculator',
    name: 'Valorant eDPI & Pro Sensitivity Benchmark',
    gameId: 'fps',
    categoryId: 'converters',
    icon: 'Target',
    shortDescription: 'Calculate eDPI (DPI × In-Game Sensitivity) and compare against VCT professional tier ranges.',
    description: 'Calculates exact effective DPI (eDPI) and benchmarks your sensitivity against the top 100 VCT pros. The average professional VCT eDPI is 240–280.',
    rating: 4.96,
    reviewsCount: 380,
    userCount: '22.1K',
    tags: ['valorant', 'edpi', 'sensitivity', 'dpi', 'pro settings', 'vct'],
    seoTitle: 'Valorant eDPI Calculator – Compare with VCT Pro Players',
    metaDescription: 'Calculate your Valorant eDPI and see where you rank compared to professional VCT tournament players.',
    h1: 'Valorant eDPI & Pro Sensitivity Benchmark',
    canonicalPath: '/tools/valorant-edpi-calculator',
    howToGuide: {
      overview: 'Enter your mouse hardware DPI and in-game sensitivity to calculate eDPI and turn distance.',
      steps: [
        { title: 'Mouse DPI', description: 'Enter mouse sensor DPI (e.g. 400, 800, 1600).' },
        { title: 'In-game Sens', description: 'Enter Valorant sensitivity (e.g. 0.35).' }
      ]
    },
    formulaExplained: {
      title: 'eDPI Mathematical Formula',
      details: 'eDPI standardizes mouse speed regardless of hardware DPI. Worked Examples: 1. Low DPI: 400 DPI * 0.6 Sens = 240 eDPI. 2. High DPI: 1600 DPI * 0.15 Sens = 240 eDPI. Both have identical in-game speed.',
      mathSnippet: 'eDPI = MouseDPI * InGameSensitivity'
    },
    faqs: [
      { question: 'What is a normal eDPI for Valorant?', answer: 'The median pro eDPI is ~260. A standard low-to-medium range is 200–320 eDPI (approx. 40–65 cm/360).' },
      { question: 'Does a higher DPI mean better accuracy?', answer: 'Higher DPI (e.g. 1600) reduces input latency slightly and provides smoother movement, but only if you lower your in-game sensitivity to match your preferred eDPI.' },
      { question: 'What eDPI does TenZ use?', answer: 'TenZ frequently changes settings, but often fluctuates between 280 and 320 eDPI (800 DPI * 0.35 to 0.4 Sens).' }
    ],
    proTips: ['Running 1600 DPI with lower in-game sensitivity reduces sensor input latency compared to 400 DPI.'],
    relatedToolIds: ['universal-mouse-sensitivity-converter', 'headshot-percentage-calculator']
  },
  {
    id: 'crosshair-generator',
    slug: 'crosshair-generator',
    name: 'Crosshair Generator & Live Code Previewer',
    gameId: 'fps',
    categoryId: 'generators',
    icon: 'Crosshair',
    shortDescription: 'Design crosshairs with live canvas preview: inner lines, outer lines, center dot, outlines, and export code.',
    description: 'Visual crosshair builder and code generator with real-time target preview, color picker, opacity sliders, center dot, outlines, and one-click code export for Valorant and CS2.',
    badge: 'Interactive',
    rating: 4.97,
    reviewsCount: 512,
    userCount: '27.8K',
    featured: true,
    tags: ['fps', 'crosshair', 'generator', 'valorant', 'cs2', 'aim'],
    seoTitle: 'Crosshair Generator – Design & Preview Crosshair Codes',
    metaDescription: 'Design and preview custom crosshairs with instant canvas rendering. Export shareable crosshair codes.',
    h1: 'Crosshair Generator & Live Code Previewer',
    canonicalPath: '/tools/crosshair-generator',
    howToGuide: {
      overview: 'Adjust sliders for length, thickness, gap, and color to generate your crosshair and export the import code.',
      steps: [
        { title: 'Dimensions', description: 'Set inner line length, thickness, and center offset gap.' },
        { title: 'Style Options', description: 'Toggle center dot and outer borders/outlines.' }
      ]
    },
    formulaExplained: {
      title: 'Crosshair Geometry Vectoring',
      details: 'Renders 4 directional line segments (North, East, South, West) around a center origin with customizable gap offset. Worked Examples: 1. Inner Lines: Length 4, Thickness 2, Gap 2. Creates a compact cross with a small center opening. 2. Dot Only: Length 0, Center Dot Enabled. Creates a single pixel or square point.',
      mathSnippet: 'Offset = CenterGap + LineLength'
    },
    faqs: [
      { question: 'What crosshair color has the highest visibility?', answer: 'Cyan (#00FFFF) and Green (#00FF00) have the highest contrast against character models and map walls.' },
      { question: 'How do I import a crosshair code?', answer: 'In Valorant settings, go to Crosshair > Primary and click the "Import Profile Code" button (down arrow icon) to paste your code.' },
      { question: 'What are "Outlines" for?', answer: 'Outlines add a black border around your crosshair lines, ensuring they remain visible even when aiming at very bright surfaces like the sky or white walls.' }
    ],
    proTips: ['Smaller crosshairs (lengths 3–4, thickness 1–2, gap 1–2) allow more precise long-distance headshot alignment.'],
    relatedToolIds: ['universal-mouse-sensitivity-converter', 'headshot-percentage-calculator']
  },
  {
    id: 'valorant-economy-calculator',
    slug: 'valorant-economy-calculator',
    name: 'Valorant Economy & Credit Predictor',
    gameId: 'fps',
    categoryId: 'calculators',
    icon: 'Layers',
    shortDescription: 'Predict next round credits based on loss streaks, win bonuses (3000 creds), and plant bonuses.',
    description: 'Calculates team bank balances, loss streak progression (1900 / 2400 / 2900 credits), spike plant bonuses (+300), and full-buy viability (Vandal + Heavy Shields + Abilities = 3900 creds).',
    rating: 4.91,
    reviewsCount: 198,
    userCount: '13.1K',
    tags: ['valorant', 'economy', 'credits', 'buy round', 'eco', 'vandal'],
    seoTitle: 'Valorant Economy Calculator – Next Round Credit Predictor',
    metaDescription: 'Predict Valorant next round credits, loss streak scaling, and full-buy thresholds for tactical matches.',
    h1: 'Valorant Economy & Credit Predictor',
    canonicalPath: '/tools/valorant-economy-calculator',
    howToGuide: {
      overview: 'Enter current round outcome and consecutive losses to know exactly how much credits your team receives next round.',
      steps: [
        { title: 'Outcome', description: 'Select Round Win or Round Loss.' },
        { title: 'Loss Streak', description: 'Enter consecutive round losses (1, 2, or 3+).' }
      ]
    },
    formulaExplained: {
      title: 'Valorant Credit Distribution',
      details: 'Round Win = 3,000 creds. Loss 1 = 1,900 creds. Loss 2 = 2,400 creds. Loss 3+ = 2,900 creds. Spike Plant bonus = +300 creds to entire attacking team. Worked Examples: 1. First Loss: 1,900 credits. 2. Third Loss + Plant: 2,900 + 300 = 3,200 credits.',
      mathSnippet: 'LossCreds = Min(2900, 1900 + (LossStreak - 1) * 500) + SpikePlantBonus'
    },
    faqs: [
      { question: 'How much does a full rifle buy cost in Valorant?', answer: 'Vandal (2,900) + Heavy Shields (1,000) + Abilities (~400–600) = 4,300–4,500 total credits.' },
      { question: 'What is the maximum credits a player can hold?', answer: 'A player can hold a maximum of 9,000 credits in Valorant.' },
      { question: 'Do I get more credits for a knife kill?', answer: 'No, unlike CS:GO, Valorant does not grant bonus credits for specific weapon kills; rewards are based on round outcome and plant status.' }
    ],
    proTips: ['If losing gives you 2,400+ credits next round and you currently have 1,500+, you can half-buy and still full-buy next round.'],
    relatedToolIds: ['universal-mouse-sensitivity-converter', 'ttk-time-to-kill-calculator']
  },
  {
    id: 'headshot-percentage-calculator',
    slug: 'headshot-percentage-calculator',
    name: 'Headshot % & Weapon Accuracy Tracker',
    gameId: 'fps',
    categoryId: 'calculators',
    icon: 'Target',
    shortDescription: 'Calculate headshot kill percentage, hits ratio, and performance percentile rating.',
    description: 'Calculates true Headshot Percentage (HS%) from match statistics using both Kill-based (HS Kills / Total Kills) and Hit-based (Head Hits / Total Hits) formulas.',
    rating: 4.92,
    reviewsCount: 230,
    userCount: '15.7K',
    tags: ['fps', 'headshot percentage', 'hs%', 'accuracy', 'aim'],
    seoTitle: 'Headshot % Calculator – True HS% & Accuracy Analytics',
    metaDescription: 'Calculate your true Headshot Percentage and accuracy ranking across FPS games and compare to Immortal/Radiant benchmarks.',
    h1: 'Headshot % & Weapon Accuracy Tracker',
    canonicalPath: '/tools/headshot-percentage-calculator',
    howToGuide: {
      overview: 'Enter your total kills and headshot kills or hit counts to evaluate your mechanical accuracy.',
      steps: [
        { title: 'Total Kills/Hits', description: 'Enter match or career total count.' },
        { title: 'Headshots', description: 'Enter headshot count.' }
      ]
    },
    formulaExplained: {
      title: 'Headshot Percentage Formula',
      details: 'Evaluates precision percentile relative to competitive tier benchmarks (Gold: ~15%, Diamond: ~22%, Radiant: ~30%+). Worked Examples: 1. Match Stats: 20 Kills, 5 HS Kills. HS% = (5/20) * 100 = 25%. 2. Pro Level: 100 Hits, 35 Head Hits. HS% = 35%.',
      mathSnippet: 'HS% = (HeadshotHits / TotalHits) * 100'
    },
    faqs: [
      { question: 'What is a good headshot percentage in tactical shooters?', answer: 'Above 20% is solid; above 28% indicates elite mechanical crosshair placement.' },
      { question: 'Does HS% count if the enemy doesn\'t die?', answer: 'In some games, HS% only counts kills (HS Kills / Total Kills), while in others it counts every individual bullet hit (Head Hits / Total Hits).' },
      { question: 'How do I improve my headshot percentage?', answer: 'Focus on "Crosshair Placement" — always keeping your crosshair at head-height where an enemy is likely to appear, minimizing required adjustment time.' }
    ],
    proTips: ['Keeping crosshair at chin height when clearing corners eliminates vertical mouse adjustment before shooting.'],
    relatedToolIds: ['crosshair-generator', 'ttk-time-to-kill-calculator']
  },
  {
    id: 'ttk-time-to-kill-calculator',
    slug: 'ttk-time-to-kill-calculator',
    name: 'Weapon Time-To-Kill (TTK) Comparison',
    gameId: 'fps',
    categoryId: 'calculators',
    icon: 'Zap',
    shortDescription: 'Compare weapon damage, fire rate (RPM), shots-to-kill (STK), and millisecond TTK against health pools.',
    description: 'Calculates theoretical Time-To-Kill (TTK) in milliseconds based on weapon fire rate (RPM), per-bullet damage, headshot multipliers, and target armor.',
    rating: 4.94,
    reviewsCount: 265,
    userCount: '16.9K',
    tags: ['fps', 'ttk', 'time to kill', 'dps', 'rpm', 'damage'],
    seoTitle: 'Weapon TTK Calculator – Time-To-Kill & Shots-to-Kill (STK)',
    metaDescription: 'Calculate weapon Time-To-Kill (TTK in milliseconds) and shots to kill across varying armor tiers.',
    h1: 'Weapon Time-To-Kill (TTK) Comparison',
    canonicalPath: '/tools/ttk-time-to-kill-calculator',
    howToGuide: {
      overview: 'Enter weapon fire rate (RPM), bullet damage, and enemy health to see millisecond elimination time.',
      steps: [
        { title: 'Rate of Fire', description: 'Enter Rounds Per Minute (RPM) e.g., 600 or 800.' },
        { title: 'Damage & Health', description: 'Enter single-shot damage and target total HP pool.' }
      ]
    },
    formulaExplained: {
      title: 'Time-To-Kill Mathematical Formula',
      details: 'First bullet hits instantaneously at 0 ms. Subsequent bullets take (60 / RPM) seconds each. Worked Examples: 1. Vandal (600 RPM): 3 shots to kill. TTK = (3-1) * (60/600) = 0.20s (200ms). 2. Phantom (660 RPM): 4 shots to kill. TTK = (4-1) * (60/660) = 0.27s (272ms).',
      mathSnippet: 'TTK = (Ceiling(TotalHealth / BulletDamage) - 1) * (60000 / RPM) ms'
    },
    faqs: [
      { question: 'Why does first bullet not add delay to TTK?', answer: 'The first bullet fires on trigger pull (0 ms delay); TTK only measures the interval for remaining shots needed to eliminate the target.' },
      { question: 'What is "Effective TTK"?', answer: 'Effective TTK accounts for bullet travel time (in games with projectiles) and network latency (ping), which adds to the theoretical minimum time.' },
      { question: 'Which gun has the fastest TTK in Valorant?', answer: 'One-tap weapons like the Vandal, Guardian, or Operator have an instantaneous TTK of 0ms if the first shot is a headshot.' }
    ],
    proTips: ['High fire-rate weapons are significantly more forgiving if a player misses the initial burst.'],
    relatedToolIds: ['universal-mouse-sensitivity-converter', 'headshot-percentage-calculator']
  },
  {
    id: 'fov-aspect-ratio-calculator',
    slug: 'fov-aspect-ratio-calculator',
    name: 'FOV & Aspect Ratio Stretched Converter',
    gameId: 'fps',
    categoryId: 'converters',
    icon: 'Compass',
    shortDescription: 'Convert Field of View (FOV) between 4:3 Stretched, 16:9, and 16:10 with horizontal & vertical angles.',
    description: 'Calculates horizontal vs vertical Field of View (vFOV vs hFOV) and simulates 4:3 stretched resolution character model widening factors.',
    rating: 4.90,
    reviewsCount: 180,
    userCount: '12.4K',
    tags: ['fps', 'fov', 'aspect ratio', 'stretched', '4:3', '16:9'],
    seoTitle: 'FOV & Aspect Ratio Converter – 4:3 Stretched & Horizontal FOV',
    metaDescription: 'Convert Field of View between vertical and horizontal angles across 4:3 stretched and 16:9 monitors.',
    h1: 'FOV & Aspect Ratio Stretched Converter',
    canonicalPath: '/tools/fov-aspect-ratio-calculator',
    howToGuide: {
      overview: 'Enter your in-game FOV and aspect ratio to compute the exact true horizontal and vertical visual angles.',
      steps: [
        { title: 'FOV Angle', description: 'Enter game FOV setting.' },
        { title: 'Aspect Ratio', description: 'Select 16:9, 16:10, 4:3, or 21:9 Ultrawide.' }
      ]
    },
    formulaExplained: {
      title: 'Trigonometric FOV Expansion',
      details: 'hFOV = 2 * atan(tan(vFOV / 2) * (AspectRatioWidth / AspectRatioHeight)). Worked Examples: 1. 103 hFOV (16:9) to Vertical: vFOV is approx 71 degrees. 2. 4:3 Stretched: Character models are stretched by 33.3% relative to 16:9.',
      mathSnippet: 'hFOV = 2 * Math.atan(Math.tan((vFOV * PI / 180) / 2) * (16 / 9)) * 180 / PI'
    },
    faqs: [
      { question: 'Why do pros play 4:3 stretched?', answer: 'Stretching 4:3 onto a 16:9 screen expands character models horizontally by 33%, making targets visually wider to hit.' },
      { question: 'Does a higher FOV help with aim?', answer: 'Higher FOV provides better peripheral vision but makes targets appear smaller. Most tactical shooters prefer 90-103 hFOV, while arena shooters often use 110+.' },
      { question: 'What is "Native" resolution?', answer: 'Native is the aspect ratio of your physical monitor, typically 16:9 for most modern gaming displays.' }
    ],
    proTips: ['In games like CS2, 4:3 stretched also makes enemy models appear to move faster across the screen horizontally.'],
    relatedToolIds: ['universal-mouse-sensitivity-converter', 'dpi-cm-360-calculator']
  },
  {
    id: 'reaction-time-benchmark',
    slug: 'reaction-time-benchmark',
    name: 'Reaction Time Benchmark & Millisecond Tier',
    gameId: 'fps',
    categoryId: 'trackers',
    icon: 'Zap',
    shortDescription: 'Interactive millisecond click reaction benchmark with esports percentile rankings.',
    description: 'Interactive visual stimulus test. Measures reaction delay in milliseconds (ms) across multiple trials and grades performance from Casual (280ms+) to Esports Pro (<170ms).',
    badge: 'Live Test',
    rating: 4.97,
    reviewsCount: 750,
    userCount: '41.2K',
    featured: true,
    tags: ['fps', 'reaction time', 'benchmark', 'esports', 'aim test'],
    seoTitle: 'Gamer Reaction Time Test – Millisecond Speed Benchmark',
    metaDescription: 'Measure your visual reaction time in milliseconds. Compare your score to average human and esports pro benchmarks.',
    h1: 'Reaction Time Benchmark & Millisecond Tier',
    canonicalPath: '/tools/reaction-time-benchmark',
    howToGuide: {
      overview: 'Wait for the screen to turn green, then click as fast as possible to record your reaction time.',
      steps: [
        { title: 'Ready', description: 'Click Start and wait for color transition.' },
        { title: 'Trigger', description: 'Click instantly when green appears.' }
      ]
    },
    formulaExplained: {
      title: 'Human Visual Processing Latency',
      details: 'Visual signal requires ~50ms from retina to visual cortex, ~80ms decision processing, and ~40ms motor signal to fingertip muscle. Worked Examples: 1. Pro Tier: 150-180ms. 2. Average Human: 230-260ms. 3. Fatigued/Casual: 300ms+.',
      mathSnippet: 'AverageReaction = Sum(Trials) / TrialCount'
    },
    faqs: [
      { question: 'What is average human reaction time?', answer: 'The human median visual reaction time is ~240–260 milliseconds on a standard 60Hz display.' },
      { question: 'How can I lower my reaction time?', answer: 'Consistent sleep, hydration, and using high-refresh rate monitors (144Hz+) can shave 10-20ms off your recorded time.' },
      { question: 'Does age affect reaction time?', answer: 'Yes, peak reaction speed typically occurs in the early 20s and gradually slows by ~2-6ms per decade thereafter.' }
    ],
    proTips: ['Switching from a 60Hz to a 240Hz monitor lowers displayed input latency by approximately 12–14 milliseconds.'],
    relatedToolIds: ['cps-click-speed-test', 'universal-mouse-sensitivity-converter']
  },
  {
    id: 'cps-click-speed-test',
    slug: 'cps-click-speed-test',
    name: 'CPS Click Speed Test (Clicks Per Second)',
    gameId: 'fps',
    categoryId: 'trackers',
    icon: 'Zap',
    shortDescription: 'Measure Clicks Per Second (CPS) with 5-second, 10-second timer, jitter click, and butterfly click mode.',
    description: 'Interactive CPS counter measuring clicking velocity over 1, 5, or 10-second intervals. Detects standard, jitter clicking, and butterfly clicking patterns.',
    badge: 'Live Test',
    rating: 4.95,
    reviewsCount: 580,
    userCount: '36.8K',
    tags: ['minecraft', 'roblox', 'cps', 'click speed', 'butterfly click', 'jitter'],
    seoTitle: 'CPS Test – Clicks Per Second Speed & Technique Counter',
    metaDescription: 'Test your clicking speed in CPS (Clicks Per Second) with live counter and technique analytics.',
    h1: 'CPS Click Speed Test (Clicks Per Second)',
    canonicalPath: '/tools/cps-click-speed-test',
    howToGuide: {
      overview: 'Click as rapidly as possible inside the interactive target area until the timer expires.',
      steps: [
        { title: 'Select Duration', description: 'Choose 5-second or 10-second test.' },
        { title: 'Click Fast', description: 'Click repeatedly using regular, jitter, or butterfly technique.' }
      ]
    },
    formulaExplained: {
      title: 'CPS Calculation Formula',
      details: 'CPS measures the total number of verified pointer-down clicks divided by the elapsed seconds. Worked Examples: 1. 50 clicks in 5s = 10.0 CPS. 2. 120 clicks in 10s = 12.0 CPS.',
      mathSnippet: 'CPS = TotalClicks / ElapsedSeconds'
    },
    faqs: [
      { question: 'What is a good CPS score for Minecraft PvP?', answer: 'Standard clicking reaches 6–8 CPS; jitter clicking reaches 10–13 CPS; butterfly clicking on optical switches reaches 15–20+ CPS.' },
      { question: 'What is "Butterfly Clicking"?', answer: 'A technique using two fingers to alternate clicks on the same button, effectively doubling potential speed.' },
      { question: 'Can CPS be too high?', answer: 'Some servers may kick players for "Auto-clicker" detection if their CPS exceeds a certain threshold (often 20+ CPS) without natural variance.' }
    ],
    proTips: ['Butterfly clicking involves alternating index and middle fingers on a single mouse switch with low debounce time.'],
    relatedToolIds: ['reaction-time-benchmark', 'universal-mouse-sensitivity-converter']
  },
  {
    id: 'dpi-cm-360-calculator',
    slug: 'dpi-cm-360-calculator',
    name: 'Mouse DPI to cm/360 Turn Distance Calculator',
    gameId: 'fps',
    categoryId: 'converters',
    icon: 'Compass',
    shortDescription: 'Calculate exact physical mousepad distance (cm or inches) required to complete a full 360° turn.',
    description: 'Computes physical mouse pad travel distance required for a complete 360-degree rotation. Identifies whether your mousepad is large enough for your sensitivity profile.',
    rating: 4.93,
    reviewsCount: 215,
    userCount: '14.8K',
    tags: ['fps', 'cm/360', 'mousepad', 'dpi', 'sensitivity', 'turn distance'],
    seoTitle: 'cm/360 Calculator – Physical Mousepad Distance for 360° Turn',
    metaDescription: 'Calculate the exact physical distance in centimeters or inches needed to complete a 360 rotation on your mousepad.',
    h1: 'Mouse DPI to cm/360 Turn Distance Calculator',
    canonicalPath: '/tools/dpi-cm-360-calculator',
    howToGuide: {
      overview: 'Enter mouse DPI and in-game sensitivity to see the physical centimeters of mousepad travel needed.',
      steps: [
        { title: 'DPI & Sens', description: 'Enter hardware DPI and game sensitivity.' }
      ]
    },
    formulaExplained: {
      title: 'cm/360 Travel Distance Formula',
      details: 'Counts = 360 / (InGameSens * m_yaw). Distance = (Counts / DPI) * 2.54 cm. Worked Examples: 1. Valorant: 800 DPI, 0.5 Sens. cm/360 = (360 / (0.5 * 0.07 * 800)) * 2.54 = 32.65 cm. 2. CS2: 400 DPI, 2.0 Sens. cm/360 = (360 / (2.0 * 0.022 * 400)) * 2.54 = 51.95 cm.',
      mathSnippet: 'cm360 = (360 / (Sens * Yaw * DPI)) * 2.54'
    },
    faqs: [
      { question: 'What is considered high vs low cm/360?', answer: 'Below 25 cm/360 is high sensitivity; 25–45 cm/360 is medium; above 45 cm/360 is low sensitivity.' },
      { question: 'Is low sensitivity better for aiming?', answer: 'Generally, yes for precision. It allows for larger arm movements for coarse aiming while leaving micro-adjustments to the wrist/fingers.' },
      { question: 'How big of a mousepad do I need?', answer: 'Measure your cm/360. Your mousepad should ideally be wide enough to accommodate at least a 180-degree turn without lifting the mouse.' }
    ],
    proTips: ['Low sensitivity (40–55 cm/360) provides greater micro-adjustment stability in tactical shooters like Valorant and CS2.'],
    relatedToolIds: ['universal-mouse-sensitivity-converter', 'valorant-edpi-calculator']
  }
];
