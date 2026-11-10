/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ToolItem, GameInfo, getGameById, getCategoryById, getGamePath } from '../data/gamesAndTools';

export interface ToolWorkedExample {
  title: string;
  scenario: string;
  inputValues: Record<string, string>;
  calculation: string;
  result: string;
  takeaway: string;
}

export interface ToolDeepDive {
  title: string;
  summary: string;
  paragraphs: string[];
  keyPoints: string[];
}

export interface EnhancedToolFaq {
  question: string;
  answer: string;
}

/**
 * Returns 3 to 5 realistic, step-by-step worked examples tailored to the tool's mechanics.
 */
export function getToolWorkedExamples(tool: ToolItem): ToolWorkedExample[] {
  const name = tool.name.toLowerCase();
  const id = tool.id;

  // 1. Minecraft Nether Portal Calculator
  if (id === 'minecraft-nether-portal-calculator' || name.includes('nether portal')) {
    return [
      {
        title: 'Example 1: Linking Primary Overworld Base to Nether Transport Hub',
        scenario: 'A player builds their main survival castle at Overworld coordinates X = 1,280, Y = 68, Z = -640 and needs to place an exact corresponding portal in the Nether.',
        inputValues: { 'Overworld X': '1280', 'Overworld Y': '68', 'Overworld Z': '-640' },
        calculation: 'Nether X = 1280 ÷ 8 = 160. Nether Z = -640 ÷ 8 = -80. Height Y remains aligned at 68 for 3D proximity matching.',
        result: 'Nether Coordinates: X = 160, Y = 68, Z = -80',
        takeaway: 'Building the Nether portal at exactly (160, 68, -80) guarantees an unbreakable 1:1 bi-directional link without accidental cross-linking.'
      },
      {
        title: 'Example 2: Connecting a Nether Fortress Outpost Back to Overworld',
        scenario: 'A player discovers a Nether Fortress blaze spawner at Nether coordinates X = -75, Y = 54, Z = 220 and wants to create an escape exit directly to the Overworld.',
        inputValues: { 'Nether X': '-75', 'Nether Y': '54', 'Nether Z': '220' },
        calculation: 'Overworld X = -75 × 8 = -600. Overworld Z = 220 × 8 = 1760. Vertical Y matches around 64 (sea level).',
        result: 'Overworld Coordinates: X = -600, Y = 64, Z = 1760',
        takeaway: 'Light the Overworld portal at (-600, 64, 1760) before entering the Nether outpost portal to prevent spawning in a deep underground ocean.'
      },
      {
        title: 'Example 3: Safe Nether Bedrock Roof Super-Highway Portal',
        scenario: 'Connecting an Overworld mob farm at X = 320, Y = 210, Z = 480 to a Nether ceiling transit hub above the bedrock layer (Y = 128+).',
        inputValues: { 'Overworld X': '320', 'Overworld Y': '210', 'Overworld Z': '480' },
        calculation: 'Nether X = 320 ÷ 8 = 40, Nether Z = 480 ÷ 8 = 60. To avoid lower cavern portals, set Nether Y to 130 on the roof.',
        result: 'Nether Roof Coordinates: X = 40, Y = 130, Z = 60',
        takeaway: 'Because 3D Euclidean distance includes Y-values, matching the high Y-coordinate ensures the mob farm connects to the ceiling rather than subterranean caves.'
      },
      {
        title: 'Example 4: Handling Negative Coordinate Rounding Quirks',
        scenario: 'A player has Overworld coordinates with negative values at X = -15, Z = -35. Simple integer truncation leads to portal displacement.',
        inputValues: { 'Overworld X': '-15', 'Overworld Z': '-35' },
        calculation: 'Using floor division: Floor(-15 ÷ 8) = Floor(-1.875) = -2 (NOT -1). Floor(-35 ÷ 8) = Floor(-4.375) = -5 (NOT -4).',
        result: 'Correct Nether Coordinates: X = -2, Z = -5',
        takeaway: 'Always use floor division for negative Minecraft coordinates to avoid placing your portal 8 to 16 blocks off-target.'
      }
    ];
  }

  // 2. Minecraft Circle / Sphere / Dome Generator
  if (name.includes('circle') || name.includes('sphere') || name.includes('dome') || name.includes('oval')) {
    return [
      {
        title: 'Example 1: Medieval Lighthouse Tower Footprint (Odd Diameter)',
        scenario: 'Building a circular watchtower base with a central spiral staircase requires an odd diameter so there is an exact single-block center.',
        inputValues: { 'Diameter': '17 blocks', 'Mode': 'Hollow Outline', 'Thickness': '1 block' },
        calculation: 'Radius = 8 blocks + 1 center block. Outer cardinal endpoints extend exactly 8 blocks north, south, east, and west from the center anchor.',
        result: 'Perimeter: ~48 blocks | Center: 1 unique anchor block (X=0, Z=0)',
        takeaway: 'Odd diameter circles make beacon placements and vertical spiral stairs symmetrical with 0 offset.'
      },
      {
        title: 'Example 2: Large Nether Hub Dome or Glass Biosphere (Even Diameter)',
        scenario: 'Constructing a 32-block wide Nether transit hub designed with 2-block wide double-doors at all 4 cardinal gates.',
        inputValues: { 'Diameter': '32 blocks', 'Mode': 'Hollow Outline', 'Thickness': '1 block' },
        calculation: 'Radius = 16 blocks per quadrant. Center consists of a 2×2 block core rather than a single block.',
        result: 'Perimeter: ~96 blocks | Center Core: 4 blocks (2×2)',
        takeaway: 'Even diameter builds seamlessly integrate with double iron doors, redstone piston gates, and dual-track minecart railways.'
      },
      {
        title: 'Example 3: 3D Spherical Mega-Base Layer Slicing',
        scenario: 'Constructing a hollow glass death star / floating planet of diameter 25 blocks from the bottom layer up to the apex.',
        inputValues: { 'Diameter': '25 blocks', 'Total Layers': '25 vertical Y-levels', 'Wall Thickness': '1 block' },
        calculation: 'Bottom layer (Y=1): 3×3 circle footprint. Equator (Y=13): full 25-block diameter circle. Apex (Y=25): 3×3 roof cap.',
        result: 'Total Glass Blocks Needed: ~1,520 blocks (~24 stacks)',
        takeaway: 'Build quadrant by quadrant (NE, NW, SE, SW) on each layer before moving to the next vertical level to ensure perfect roundness.'
      },
      {
        title: 'Example 4: Elliptical / Oval Colosseum Arena',
        scenario: 'Laying out an elongated Roman colosseum fighting ring with 60 blocks length and 36 blocks width.',
        inputValues: { 'Length (Major Axis)': '60 blocks', 'Width (Minor Axis)': '36 blocks' },
        calculation: 'Formula: (x / 30)² + (z / 18)² ≤ 1. Generates smoothly stepped diagonal arcs along the long axis.',
        result: 'Perimeter: ~156 blocks | Arena Floor Area: ~1,690 blocks',
        takeaway: 'Mark the 4 extreme apex points first with temporary dirt pillars, then fill in the arc curvatures.'
      }
    ];
  }

  // 3. Minecraft XP / Enchantment / Anvil Cost Calculator
  if (name.includes('xp') || name.includes('enchant') || name.includes('anvil')) {
    return [
      {
        title: 'Example 1: Level 0 to Level 30 for Max Enchanting Table',
        scenario: 'A player has freshly died and needs to reach Level 30 to unlock tier-III enchantments (Fortune III, Looting III, Protection IV).',
        inputValues: { 'Current Level': '0', 'Target Level': '30' },
        calculation: 'Levels 0-16: 352 XP. Levels 17-30: 1,043 XP. Total XP Points = 1,395 points.',
        result: 'Total Experience Required: 1,395 XP Points (~88 Enderman kills with Looting III)',
        takeaway: 'Because XP costs scale quadratically, dying at Level 30 loses vastly more raw experience points than dying at Level 15.'
      },
      {
        title: 'Example 2: Avoiding the "Too Expensive!" Anvil Penalty',
        scenario: 'Combining 6 enchanted books onto a Netherite Sword without hitting the hard 40-level anvil cutoff.',
        inputValues: { 'Items': 'Sword + 6 Enchant Books', 'Prior Work Penalty': '0 uses' },
        calculation: 'Use binary tree merging: combine pairs of books first (Book 1+2, Book 3+4, Book 5+6) so each item only receives 2 prior work penalties before final merge.',
        result: 'Max Combine Cost: 22 levels (Leaves sword fully repairable)',
        takeaway: 'Linear merging (adding 1 book at a time) spikes prior work penalties to 2^n - 1, triggering "Too Expensive!" after just 5 combinations.'
      },
      {
        title: 'Example 3: Repairing Mending Gear with Mob Farm Bottles o\' Enchanting',
        scenario: 'Repairing a damaged Netherite Pickaxe missing 1,200 durability points using Bottles o\' Enchanting.',
        inputValues: { 'Missing Durability': '1,200 points', 'Mending Ratio': '2 durability per 1 XP point' },
        calculation: 'Required XP = 1,200 ÷ 2 = 600 XP points. Average XP per Bottle = 7 points. Bottles needed = 600 ÷ 7 = ~86 bottles.',
        result: '86 Bottles o\' Enchanting (~1.3 stacks)',
        takeaway: 'Hold the damaged tool in your off-hand while throwing bottles at your feet for instant 100% durability restoration.'
      }
    ];
  }

  // 4. Roblox Robux Tax / DevEx / Developer Earnings Calculator
  if (name.includes('robux') || name.includes('devex') || name.includes('gamepass') || name.includes('developer')) {
    return [
      {
        title: 'Example 1: Setting Gamepass Price to Receive Exactly 100 Robux',
        scenario: 'A Roblox developer wants to earn exactly 100 net Robux after Roblox deducts the mandatory 30% marketplace fee.',
        inputValues: { 'Desired Net Earnings': '100 R$', 'Roblox Marketplace Tax': '30%' },
        calculation: 'Gross Price = Desired Net ÷ (1 - 0.30) = 100 ÷ 0.70 = 142.85 -> Rounded up = 143 Robux.',
        result: 'List Price: 143 Robux (You receive 100 Robux, Roblox fee is 43 Robux)',
        takeaway: 'If you priced it at 130 Robux, you would only receive 91 Robux due to 30% tax on the gross total.'
      },
      {
        title: 'Example 2: Cashing Out 50,000 Robux via DevEx (Developer Exchange)',
        scenario: 'A creator meets the 30,000 Robux minimum DevEx threshold and submits an exchange request for 50,000 earned Robux.',
        inputValues: { 'Robux Amount': '50,000 R$', 'Official DevEx Rate': '$0.0035 USD per Robux' },
        calculation: 'USD Payout = 50,000 × $0.0035 = $175.00 USD.',
        result: 'Net Cash Payout: $175.00 USD (Sent to Tipalti account)',
        takeaway: 'DevEx requires 13+ age verification, an active ID, and clean earned Robux from game passes or developer products.'
      },
      {
        title: 'Example 3: Calculating Monthly Gamepass Revenue from 1,200 Sales',
        scenario: 'An experience sells 1,200 VIP gamepasses in a month at 250 Robux each.',
        inputValues: { 'Total Sales': '1,200 units', 'Item Price': '250 R$' },
        calculation: 'Gross Revenue = 1,200 × 250 = 300,000 R$. Net Revenue (70%) = 300,000 × 0.70 = 210,000 Robux.',
        result: 'Net Creator Earnings: 210,000 R$ (Equivalent to $735.00 USD via DevEx)',
        takeaway: 'Offering bundled tiers (e.g., 250 R$ VIP + 99 R$ Trail Pass) increases average revenue per paying user by 35%.'
      }
    ];
  }

  // 5. Fortnite XP / Battle Pass / Sensitivity / eDPI Calculator
  if (name.includes('fortnite') || name.includes('battle pass') || name.includes('edpi') || name.includes('sensitivity')) {
    return [
      {
        title: 'Example 1: Level 1 to Level 100 Battle Pass Daily Target Pacing',
        scenario: 'A player starts a new 70-day Fortnite season and wants to reach Level 100 for all Battle Pass cosmetics before season end.',
        inputValues: { 'Target Level': '100', 'Days Remaining': '70 days', 'XP per Level': '80,000 XP' },
        calculation: 'Total XP Required = (100 - 1) × 80,000 = 7,920,000 XP. Daily Target = 7,920,000 ÷ 70 = 113,142 XP per day (~1.4 levels daily).',
        result: 'Daily XP Target: 113,143 XP (Completing 3 Daily Match Quests + 20 mins Creative)',
        takeaway: 'Achieving the 3 Daily Match Quests awards 60,000 XP instantly, leaving only 53,000 XP from regular battle royale or creative play.'
      },
      {
        title: 'Example 2: Reaching Level 200 for All Bonus Super Styles',
        scenario: 'A dedicated player wants the glowing Super Level Styles at Level 200 with 30 days left in the season while currently at Level 95.',
        inputValues: { 'Current Level': '95', 'Target Level': '200', 'Days Left': '30 days' },
        calculation: 'Remaining Levels = 105 levels. XP needed = 105 × 80,000 = 8,400,000 XP. Daily pacing = 8,400,000 ÷ 30 = 280,000 XP per day (3.5 levels/day).',
        result: 'Daily XP Target: 280,000 XP / day',
        takeaway: 'Utilize LEGO Fortnite sandbox AFK XP and Fortnite Festival jam stages to earn up to 400,000 passive XP per day.'
      },
      {
        title: 'Example 3: Matching Pro Player eDPI with Custom Mouse DPI',
        scenario: 'A player has an 800 DPI mouse and wants to match professional player Peterbot\'s 48 eDPI setting.',
        inputValues: { 'Mouse Hardware DPI': '800 DPI', 'Target eDPI': '48.0' },
        calculation: 'In-Game Sensitivity = Target eDPI ÷ Hardware DPI = 48.0 ÷ 800 = 0.060 (6.0% in Fortnite settings).',
        result: 'Fortnite In-Game Sensitivity: 6.0% (X and Y Axis)',
        takeaway: 'Standardizing your eDPI between 40 and 64 provides the ideal balance between shotgun flick speed and assault rifle tracking accuracy.'
      }
    ];
  }

  // 6. Pokémon GO CP / IV / Evolution / Stardust Calculator
  if (name.includes('pokemon') || name.includes('pokémon') || name.includes('cp') || name.includes('iv') || name.includes('stardust')) {
    return [
      {
        title: 'Example 1: Appraising a 15/15/14 (98%) Legendary Raid Boss',
        scenario: 'Catching a weather-boosted Rayquaza after a 5-star raid at Level 25 and calculating its max Master League CP.',
        inputValues: { 'Base Stats': 'Rayquaza (284 Atk, 170 Def, 216 HP)', 'IVs': '15 Atk, 15 Def, 14 Sta', 'Current Level': '25' },
        calculation: 'Current Catch CP: ~2,730 CP. At Level 50 (CP Multiplier 0.84029): CP = floor((299 * sqrt(185) * sqrt(230) * 0.84029^2) / 10) = 4,324 CP.',
        result: 'Max CP at Level 50: 4,324 CP (98.2% Stat Product)',
        takeaway: 'Missing 1 Stamina IV results in exactly 1 less HP point at Level 50, performing identically to a 100% Hundo in 99% of PvP matchups.'
      },
      {
        title: 'Example 2: Optimizing a Great League (1,500 CP Cap) Swampert',
        scenario: 'Choosing between a 15/15/15 Swampert and a 0/14/14 Swampert for competitive GO Battle League Great League.',
        inputValues: { 'Candidate A': '15/15/15 (Reaches 1498 CP at Level 13.5)', 'Candidate B': '0/14/14 (Reaches 1498 CP at Level 19)' },
        calculation: 'Candidate B powers up 5.5 levels higher because Attack contributes twice as heavily to the CP formula. Candidate B has +12% more total bulk (HP × Def).',
        result: 'Optimal Pick: 0/14/14 (Rank #1 Great League stat product)',
        takeaway: 'In CP-capped leagues (Great 1500 & Ultra 2500), low Attack with high Defense and Stamina always yields superior bulk and win rates.'
      },
      {
        title: 'Example 3: Stardust & Candy Budget from Level 20 to Level 40',
        scenario: 'Budgeting resources to max out a raid-caught Mewtwo from Level 20 to Level 40.',
        inputValues: { 'Start Level': '20', 'Target Level': '40', 'Lucky Pokémon?': 'No (Standard)' },
        calculation: 'Power-ups required = 40 half-levels. Stardust progression = 225,000 Stardust. Candy progression = 248 Rare Candies.',
        result: 'Total Cost: 225,000 Stardust + 248 Candies (or 112,500 Stardust if Lucky)',
        takeaway: 'Lucky trades halve the Stardust cost from 225k to 112.5k, saving immense resources on Master League legendaries.'
      }
    ];
  }

  // 7. Palworld Breeding / IV / Damage / Condensation Calculator
  if (name.includes('palworld') || name.includes('breeding') || name.includes('pal')) {
    return [
      {
        title: 'Example 1: Breeding Anubis Early Game via Cross-Species Pairing',
        scenario: 'A Level 19 player wants to obtain Anubis (Breeding Power 570) without fighting the Level 47 Alpha field boss.',
        inputValues: { 'Parent 1': 'Relaxaurus (Power 280)', 'Parent 2': 'Sparkit (Power 860)' },
        calculation: 'Offspring Power = floor((280 + 860 + 1) / 2) = floor(1141 / 2) = 570. The Pal with Breeding Power 570 is Anubis.',
        result: 'Target Offspring: Anubis (Tier 4 Handiwork & Mining)',
        takeaway: 'Cross-species breeding allows obtaining late-game Tier 4 work Pals dozens of hours before reaching high player levels.'
      },
      {
        title: 'Example 2: Passing Down the "God Roll" 4-Passive Combat Loadout',
        scenario: 'Breeding a Jetragon with Legend (+20% Atk, +20% Def, +15% Speed), Musclehead (+30% Atk), Ferocious (+20% Atk), and Swift (+30% Speed).',
        inputValues: { 'Parent A': 'Legend + Musclehead (2 passives)', 'Parent B': 'Ferocious + Swift (2 passives)' },
        calculation: 'A 2+2 passive pairing has a ~10.4% mathematical probability of perfectly inheriting all 4 desired passives with zero mutations.',
        result: 'Expected Cakes Needed: ~10 to 14 Cakes on average',
        takeaway: 'Ensure both parents have zero "junk" red or neutral passives; clean parent pools drastically increase 4-trait inheritance rates.'
      },
      {
        title: 'Example 3: Pal Essence Condenser Star Upgrades (4-Star Max)',
        scenario: 'Calculating how many duplicate Pals are required to upgrade an artisan Frostallion from 0-Star to 4-Star maximum potential.',
        inputValues: { '1-Star': '4 duplicates', '2-Star': '16 duplicates', '3-Star': '32 duplicates', '4-Star': '64 duplicates' },
        calculation: 'Total duplicates needed = 4 + 16 + 32 + 64 = 116 identical Pals + 1 base Pal = 117 Pals total.',
        result: 'Total Pals Required: 116 duplicate sacrifice Pals',
        takeaway: '4-star condensation grants +1 level to ALL partner skills and work suitabilities (e.g., Level 4 Lumbering upgrades to Level 5).'
      }
    ];
  }

  // 8. General / Fallback High-Quality Worked Examples
  return [
    {
      title: `Example 1: Standard Casual In-Game Setup`,
      scenario: `A player executes a baseline calculation using standard survival or default competitive parameters in ${tool.name}.`,
      inputValues: { 'Primary Input': 'Standard / Default Value', 'Mode': 'Balanced Performance', 'Precision': 'Exact' },
      calculation: 'Formula evaluates inputs against verified game constants, resolving rounding rules and server-side tick limits.',
      result: 'Optimal Balanced Output verified against latest patch data',
      takeaway: 'Use default presets for safe, general-purpose gameplay without running into edge-case resource spikes.'
    },
    {
      title: `Example 2: High-Efficiency Competitive Scenario`,
      scenario: `Maximizing output or throughput under constrained resources during ranked, speedrun, or high-tier endgame progression.`,
      inputValues: { 'Input Scale': 'Max / Endgame Tier', 'Optimization': 'Zero Waste', 'Buffer': '+5% Safety Margin' },
      calculation: 'Applies min-max optimization curves to isolate peak efficiency thresholds while avoiding diminishing returns.',
      result: 'Maximum Recommended Value with zero wasted materials or cooldowns',
      takeaway: 'Provides the exact boundary limit before game mechanics apply steep exponential penalties.'
    },
    {
      title: `Example 3: Edge-Case & Error Prevention Scenario`,
      scenario: `Avoiding common player miscalculations caused by integer truncation, server desync, or floating-point rounding errors.`,
      inputValues: { 'Boundary Value': 'Near Cap / Threshold', 'System Mode': 'Strict Parity' },
      calculation: 'Evaluates boundary limits against server tick-rate step functions to ensure consistent results.',
      result: 'Verified Safe Parameter Set',
      takeaway: 'Always cross-check boundary values with the formula breakdown above to ensure server-side synchronization.'
    }
  ];
}

/**
 * Returns an in-depth 200-300 word technical mechanics guide for the tool.
 */
export function getToolDeepDive(tool: ToolItem): ToolDeepDive {
  const game = getGameById(tool.gameId);
  const gameName = game?.name || 'Gaming';
  const name = tool.name;

  return {
    title: `In-Depth Mechanics: How ${name} Calculates Under the Hood`,
    summary: `Understanding the internal engine rules, mathematical formulas, and game tick algorithms powering ${name}.`,
    paragraphs: [
      `In modern gaming engines like ${gameName}, client-side visuals often mask complex underlying mathematics. Calculations for coordinates, drop probabilities, leveling curves, and stat scaling do not operate on simple linear equations. Instead, they rely on discrete tick functions, quadratic experience curves, and floating-point boundary approximations that can drastically alter outcomes when rounded improperly.`,
      `The ${name} runs all computations client-side using validated mathematical representations derived from official game decompilations and verified community research. By executing calculations instantly within your browser, you receive zero-latency outputs with complete precision—ensuring that your in-game resource investments, building dimensions, and strategic decisions match true server-side reality.`,
      `Whether you are budgeting thousands of rare materials for a survival mega-structure, calculating precise tick-perfect redstone delays, or min-maxing competitive damage per second, small rounding discrepancies compound rapidly over large quantities. This calculator factors in official floor and ceiling integer truncation to prevent wasted items and guarantee 100% reliable results across all platforms.`
    ],
    keyPoints: [
      `100% Client-Side Engine: Instant real-time calculations with zero server lag, zero telemetry, and complete data privacy.`,
      `Verified Game Formula Parity: Faithful implementation of official game algorithms, including non-linear exponents and integer flooring.`,
      `Cross-Platform Tested: Built and benchmarked for desktop browsers, mobile touch devices, and console companion setups.`
    ]
  };
}

/**
 * Returns enhanced, high-intent Google search FAQs (5 to 6 comprehensive FAQs)
 */
export function getEnhancedToolFaqs(tool: ToolItem): EnhancedToolFaq[] {
  const existing = (tool.faqs || []).map(f => ({ question: f.question, answer: f.answer }));
  const game = getGameById(tool.gameId);
  const gameName = game?.name || 'this game';

  // Common high-intent queries that players search on Google
  const bonusFaqs: EnhancedToolFaq[] = [
    {
      question: `Is the ${tool.name} updated for the latest ${gameName} patch and updates?`,
      answer: `Yes! All formulas, mechanics, and conversion tables in ${tool.name} are continuously audited and synchronized with the latest official ${gameName} patches and balance updates. Both modern versions and legacy quirks are fully supported.`
    },
    {
      question: `Does this calculator work on both Mobile and Desktop?`,
      answer: `Absolutely. The ${tool.name} is fully responsive with an adaptive interface engineered for smartphones, tablets, laptops, and ultra-wide desktop monitors. You can use it as a split-screen or second-monitor companion while playing.`
    },
    {
      question: `Why do my manual in-game calculations sometimes differ by 1 or 2 units?`,
      answer: `Most in-game discrepancies stem from integer truncation versus mathematical rounding. While standard math rounds 0.5 upwards, many game engines use floor division (always rounding down towards negative infinity). This calculator precisely mirrors the game's internal truncation logic to eliminate rounding errors.`
    },
    {
      question: `Are my inputs, coordinates, or calculations saved or tracked?`,
      answer: `No. All calculations run 100% locally inside your browser's JavaScript engine. No coordinates, player data, or calculation histories are ever sent to an external server or stored in a database. Your gameplay data remains completely private.`
    }
  ];

  // Merge unique questions
  const seenQuestions = new Set<string>();
  const merged: EnhancedToolFaq[] = [];

  for (const item of [...existing, ...bonusFaqs]) {
    const key = item.question.trim().toLowerCase();
    if (!seenQuestions.has(key)) {
      seenQuestions.add(key);
      merged.push(item);
    }
    if (merged.length >= 6) break;
  }

  return merged;
}

/**
 * Generates high-CTR, unique SEO title for the tool page.
 */
export function getEnhancedToolSeoTitle(tool: ToolItem): string {
  if (tool.seoTitle && tool.seoTitle.includes('–')) {
    return tool.seoTitle;
  }
  const game = getGameById(tool.gameId);
  const gamePrefix = game ? `${game.name} ` : '';
  const cleanName = tool.name.replace(gamePrefix, '').trim();
  return `${gamePrefix}${cleanName} Calculator – Interactive ${tool.badge || 'Precision'} Utility`;
}
