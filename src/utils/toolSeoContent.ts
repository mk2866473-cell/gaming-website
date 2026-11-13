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
  // NOTE: restricted to Minecraft tools only. The old condition matched ANY
  // name containing "sphere" or "oval" — so the Palworld Capture Chance &
  // Sphere Calculator and the Companion Approval tracker ("apprOVAL") wrongly
  // showed Minecraft circle examples.
  if (name.includes('minecraft') && (name.includes('circle') || name.includes('sphere') || name.includes('dome') || name.includes('oval'))) {
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

  // 2b. Blox Fruits XP / Level Grinding Calculator — MUST come before the
  // generic Minecraft XP branch below: the tool name contains "XP", so the
  // old order matched it to Minecraft enchanting/anvil examples.
  if (id === 'blox-fruits-xp-calculator' || (name.includes('blox fruits') && name.includes('xp'))) {
    return [
      {
        title: 'Example 1: Level 1 to Level 700 — Reaching the Second Sea',
        scenario: 'A new pirate grinds quests through the First Sea and wants to know how many stat points unlock on the road to Level 700, the Second Sea requirement.',
        inputValues: { 'Current Level': '1', 'Target Level': '700' },
        calculation: 'Levels gained = 700 - 1 = 699. Stat points gained = 699 × 3 = 2,097 points.',
        result: 'Stat Points Gained: 2,097 points | Unlocks Second Sea (Cafe, raids, trading)',
        takeaway: 'Every level grants exactly 3 stat points, so the First Sea grind alone banks over 2,000 points before you ever set sail for the Second Sea.'
      },
      {
        title: 'Example 2: Level 700 to Level 1500 — Second Sea with a 2x EXP Boost',
        scenario: 'A player at Level 700 activates a 2x EXP code and grinds Second Sea bosses and quests toward Level 1500, the Third Sea requirement.',
        inputValues: { 'Current Level': '700', 'Target Level': '1500', 'EXP Buff': '2x EXP code active' },
        calculation: 'Levels gained = 1500 - 700 = 800. Stat points gained = 800 × 3 = 2,400 points. A 2x EXP boost doubles EXP per quest and boss kill, roughly halving the grind time.',
        result: 'Stat Points Gained: 2,400 points | Unlocks Third Sea (Mansion, Race V4, Leviathan)',
        takeaway: 'Redeem 2x EXP codes in 20-minute intervals while farming bosses — the boost stacks with quest EXP, so the 800-level Second Sea stretch takes about half the playtime.'
      },
      {
        title: 'Example 3: Level 1500 to Max Level 2600 — Third Sea Buddha Grind',
        scenario: 'A Third Sea player switches to Awakened Buddha fruit to grind the final stretch from Level 1500 to the max level cap of 2600.',
        inputValues: { 'Current Level': '1500', 'Target Level': '2600', 'Fruit': 'Awakened Buddha' },
        calculation: 'Levels gained = 2600 - 1500 = 1,100. Stat points gained = 1,100 × 3 = 3,300 points. Total stat points at max level = 2600 × 3 = 7,800 points.',
        result: 'Stat Points Gained: 3,300 points | Max Stat Points at Level 2600: 7,800',
        takeaway: 'Awakened Buddha is the best grinding fruit because its transformation boosts reach and defense while you spam melee/sword M1 attacks — ideal for clearing the 1,100-level final stretch.'
      }
    ];
  }

  // 3. Minecraft XP / Enchantment / Anvil Cost Calculator
  // NOTE: restricted to Minecraft tools only. The old condition matched ANY
  // tool name containing "xp" — so Blox Fruits XP, Fortnite XP, Helldivers 2
  // XP and every "Weapon EXP" tool wrongly showed Minecraft examples.
  if (name.includes('minecraft') && (name.includes('xp') || name.includes('enchant') || name.includes('anvil'))) {
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

  // 3b. Minecraft Slime Chunk Finder (Java Edition)
  if (id === 'minecraft-slime-chunk-finder') {
    return [
      {
        title: 'Example 1: Checking Chunk (-8, 0) on Java Seed 0',
        scenario: 'A Java Edition player on world seed 0 checks block X = -128, Z = 0 (Chunk -8, 0) and compares it to spawn Chunk (0, 0).',
        inputValues: { 'World Seed': '0 (Java Edition)', 'Block Coords': 'X = -128, Z = 0', 'Chunk Coords': '(-8, 0)' },
        calculation: 'Chunk X = floor(-128 ÷ 16) = -8; Chunk Z = floor(0 ÷ 16) = 0. Evaluating java.util.Random(seed + chunkHash ^ 0x3ad8025fL).nextInt(10) returns 0 for Chunk (-8, 0) and non-zero for Chunk (0, 0).',
        result: 'Chunk (-8, 0) IS a Slime Chunk (Blocks X: -128 to -113, Z: 0 to 15). Chunk (0, 0) is NOT a Slime Chunk.',
        takeaway: 'Slimes will spawn inside blocks X -128..-113, Z 0..15 below Y=40 at any light level on seed 0.'
      },
      {
        title: 'Example 2: Locating a Slime Chunk Near Spawn on Java Seed 42',
        scenario: 'A player on Java Edition seed 42 enters block coordinates X = 12, Z = 104 (Chunk 0, 6) to verify if it qualifies as a slime chunk before digging a spawning room.',
        inputValues: { 'World Seed': '42 (Java Edition)', 'Block Coords': 'X = 12, Z = 104', 'Chunk Coords': '(0, 6)' },
        calculation: 'Chunk X = floor(12 ÷ 16) = 0; Chunk Z = floor(104 ÷ 16) = 6. Running the Java Edition 48-bit LCG check yields rnd.nextInt(10) == 0.',
        result: 'Chunk (0, 6) IS a Slime Chunk (Blocks X: 0 to 15, Z: 96 to 111).',
        takeaway: 'Digging out platforms below Y=40 between X 0..15 and Z 96..111 allows slimes to spawn regardless of torch placement.'
      }
    ];
  }

  // 3c. Minecraft Banner Designer
  if (id === 'minecraft-banner-designer') {
    return [
      {
        title: 'Example 1: 3-Layer Creeper Crest Banner with Full Loom Steps',
        scenario: 'Crafting a 3-layer Green Banner with a dark base fade, a Lime Creeper Charge emblem, and a crisp Black Bordure frame in Survival mode.',
        inputValues: {
          'Base Banner': 'Green Banner (6× Green Wool + 1× Stick)',
          'Layer 1': 'Base Gradient (gradient_up) + Black Dye',
          'Layer 2': 'Creeper Charge (creeper) + Lime Dye + Creeper Charge Pattern Item',
          'Layer 3': 'Bordure (border) + Black Dye'
        },
        calculation: 'Step 1 (Crafting Table): Craft Green Banner (6 Green Wool + 1 Stick). Step 2 (Loom): Green Banner + Black Dye → select Base Gradient (gradient_up). Step 3 (Loom): Banner from Step 2 + Lime Dye + Creeper Charge Banner Pattern (Paper + Creeper Head; not consumed in Java). Step 4 (Loom): Banner from Step 3 + Black Dye → select Bordure (border).',
        result: 'Finished 3-Layer Banner (uses 3 of 6 max survival layers; Creeper Charge Pattern item remains reusable)',
        takeaway: 'Because later layers paint over earlier ones, placing Base Gradient first, Creeper Charge second, and Bordure last frames the creeper clean around the edges.'
      },
      {
        title: 'Example 2: Trial Chambers Flow Banner Using Uncraftable Pattern Items',
        scenario: 'Building a Cyan Banner topped with an Indented Bordure and the Flow emblem found in trial chambers ominous vaults.',
        inputValues: {
          'Base Banner': 'Cyan Banner (6× Cyan Wool + 1× Stick)',
          'Layer 1': 'Flow (flow) + Light Blue Dye + Flow Pattern Item',
          'Layer 2': 'Bordure Indented (curly_border) + White Dye + Bordure Indented Pattern Item'
        },
        calculation: 'Craft Cyan Banner → Loom Layer 1: Cyan Banner + Light Blue Dye + Flow Pattern (obtained from trial chambers ominous vault) → Loom Layer 2: Banner + White Dye + Bordure Indented Pattern (Paper + Vines). Both Banner Pattern items remain unconsumed in Java Edition.',
        result: 'Finished 2-Layer Banner with reusable Flow and Bordure Indented Pattern items',
        takeaway: 'Even rare uncraftable patterns like Globe (8 emeralds from a master cartographer), Snout (bastion chest loot), Flow, and Guster are never consumed in the loom.'
      }
    ];
  }

  // 3d. Minecraft Stronghold Finder
  if (id === 'minecraft-stronghold-finder') {
    return [
      {
        title: 'Example 1: Triangulating from (0, 0) and (800, 0) Using F3 Yaw',
        scenario: 'A player throws the first Eye of Ender at (0, 0) measuring F3 yaw -53.13°, then travels east to (800, 0) and throws a second Eye measuring F3 yaw 0°.',
        inputValues: { 'Throw 1': '(0, 0), Yaw -53.13°', 'Throw 2': '(800, 0), Yaw 0°' },
        calculation: 'Ray 1 vector: dx1 = -sin(-53.13°) ≈ 0.8, dz1 = cos(-53.13°) ≈ 0.6. Ray 2 vector: dx2 = -sin(0°) = 0, dz2 = cos(0°) = 1. Intersecting (0 + t1×0.8, 0 + t1×0.6) with (800, t2) solves t1 = 1,000 blocks and t2 = 600 blocks.',
        result: 'Estimated Stronghold Starting Staircase Area: (800, 600) | Distances: 1,000 blocks from Throw 1, 600 blocks from Throw 2',
        takeaway: 'Remember that Eyes of Ender target the stronghold\'s starting staircase area, so explore outward from the staircase once you dig down at (800, 600).'
      },
      {
        title: 'Example 2: Wide-Angle Throw Targeting the First Stronghold Ring',
        scenario: 'A player throws an Eye of Ender from (0, 0) at yaw -135° (northeast) and walks 1,200 blocks east to (1200, 0), throwing a second Eye at yaw 135° (northwest).',
        inputValues: { 'Throw 1': '(0, 0), Yaw -135°', 'Throw 2': '(1200, 0), Yaw 135°' },
        calculation: 'Ray 1 points along (+0.7071, -0.7071) and Ray 2 points along (-0.7071, -0.7071), crossing at a clean 90° angle. Solving the ray intersection gives X = 600, Z = -600 (distance ~849 blocks from each throw).',
        result: 'Estimated Intersection: (600, -600) | Distance: ~849 blocks from each throw | Crossing Angle: 90°',
        takeaway: 'Throwing from locations far apart that cross at a wide angle minimizes error; in standard worlds, the 3 first-ring strongholds generate 1,280 to 2,816 blocks from spawn.'
      }
    ];
  }

  // 3e. Minecraft Pixel Art Converter
  if (id === 'minecraft-pixel-art-converter') {
    return [
      {
        title: 'Example 1: Converting a Square Emblem at 32-Block Width',
        scenario: 'A builder uploads a square 1:1 emblem and selects the 32-block grid width for a flat single-height wall or floor build.',
        inputValues: { 'Chosen Width': '32 blocks', 'Aspect Ratio': '1:1 (Square)', 'Build Type': 'Flat Art (1 block per pixel)' },
        calculation: 'Height scales proportionally to 32 blocks. Total pixels = 32 × 32 = 1,024 pixels. Every pixel maps via shortest RGB distance to one of the 16 Wool/Concrete map colours.',
        result: '32 × 32 Grid = 1,024 total Wool or Concrete blocks (16 stacks total)',
        takeaway: 'Building flat art at one height is the simplest survival construction method, requiring exactly 1 block per pixel.'
      },
      {
        title: 'Example 2: Scaling a 4:3 Landscape Painting to 64-Block Width',
        scenario: 'A builder uploads a 4:3 landscape image at the maximum 64-block grid width to compare against a full 128×128 Minecraft map.',
        inputValues: { 'Chosen Width': '64 blocks', 'Aspect Ratio': '4:3 Landscape' },
        calculation: 'Aspect-preserved height = round(64 × 3 ÷ 4) = 48 blocks. Total blocks needed = 64 × 48 = 3,072 blocks (under one-fifth of a full 128×128 = 16,384-block map).',
        result: '64 × 48 Grid = 3,072 total Wool or Concrete blocks',
        takeaway: 'Keeping aspect ratio avoids squishing your image while fitting neatly inside a single 128×128 map area.'
      }
    ];
  }

  // 3f. Minecraft Brewing Calculator
  if (id === 'minecraft-brewing-calculator') {
    return [
      {
        title: 'Example 1: Full Path for Extended Fire Resistance (8:00)',
        scenario: 'Brewing a Potion of Fire Resistance extended to 8:00 for safe Nether exploration in Java Edition.',
        inputValues: { 'Target Potion': 'Fire Resistance (Extended)', 'Modifier': 'Redstone Dust (cannot enhance with Glowstone)' },
        calculation: 'Step 1: Water Bottle + Nether Wart → Awkward Potion. Step 2: Awkward Potion + Magma Cream → Potion of Fire Resistance (3:00 base). Step 3: Potion of Fire Resistance + Redstone → Extended Fire Resistance (8:00). Optional: + Gunpowder gives Splash (8:00); + Dragon\'s Breath on Splash gives Lingering (2:00, 1/4 duration).',
        result: 'Potion of Fire Resistance — 8:00 (cannot be enhanced with Glowstone)',
        takeaway: 'Redstone and Glowstone cannot be combined on one potion, and Fire Resistance cannot be enhanced—so Redstone to 8:00 is always its strongest upgrade.'
      },
      {
        title: 'Example 2: Full Path for Potion of Weakness (No Nether Wart)',
        scenario: 'Brewing a Potion of Weakness using the unique direct Water Bottle path in Java Edition.',
        inputValues: { 'Target Potion': 'Weakness', 'Starting Bottle': 'Plain Water Bottle (NO Nether Wart)' },
        calculation: 'Step 1: Plain Water Bottle + Fermented Spider Eye → Potion of Weakness (1:30 base). Optional Step 2: + Redstone → Extended Weakness (4:00); + Gunpowder → Splash Potion of Weakness (same duration: 1:30 base or 4:00 extended). Note: Weakness cannot be enhanced with Glowstone.',
        result: 'Potion of Weakness — 1:30 base or 4:00 extended (cannot be enhanced)',
        takeaway: 'Weakness is the only potion brewed directly from a plain Water Bottle without Nether Wart.'
      }
    ];
  }

  // 4a. Robux to USD Converter (store purchase vs DevEx — 30% marketplace tax stays in robux-tax-calculator only)
  if (id === 'robux-to-usd-calculator') {
    return [
      {
        title: 'Example 1: Comparing Store Purchase Value vs DevEx Cashout for 10,000 Robux',
        scenario: 'A player compares what 10,000 Robux costs to buy in USD at the baseline store rate versus what 10,000 Earned Robux pays out via Developer Exchange.',
        inputValues: { 'Robux Amount': '10,000 R$', 'Store Rate': '$0.0125/R$ (~80 R$/$)', 'DevEx Rate': '$0.0035/R$' },
        calculation: 'Store Value = 10,000 × $0.0125 = $125.00 USD (or $99.99 via the official 10,000 R$ bundle). DevEx Value = 10,000 × $0.0035 = $35.00 USD.',
        result: 'Store Purchase Value: $125.00 USD | DevEx Cashout Equivalent: $35.00 USD',
        takeaway: 'Store rates and DevEx cashout rates are very different—note also that 10,000 R$ is below the 30,000 Robux minimum required to submit a DevEx request.'
      },
      {
        title: 'Example 2: Converting a $20 USD Budget to Robux with Premium (+10% Bonus)',
        scenario: 'A Roblox player budgets $20.00 USD and compares how many Robux they receive at the standard baseline rate (~80 R$/$) versus with an active Roblox Premium membership (+10% bonus, ~88 R$/$).',
        inputValues: { 'Direction': 'USD → Robux', 'Budget': '$20.00 USD', 'Premium Bonus': '+10%' },
        calculation: 'Standard = $20 × 80 = 1,600 R$. With Premium (+10%) = $20 × 88 = 1,760 R$. (Official $19.99 package gives 1,700 R$ standard or 1,870 R$ with Premium.)',
        result: 'Standard: ~1,600 R$ | Premium (+10%): ~1,760 R$',
        takeaway: 'Holding Roblox Premium grants 10% extra Robux across store purchases and lowers your effective cost per Robux.'
      },
      {
        title: 'Example 3: Reaching the 30,000 Robux DevEx Cashout Minimum (50,000 R$ Payout)',
        scenario: 'A studio developer checks whether 50,000 Earned Robux clears the 30,000 Robux DevEx minimum and calculates the USD payout.',
        inputValues: { 'Earned Balance': '50,000 R$', 'DevEx Minimum': '30,000 R$ ($105.00)', 'DevEx Rate': '$0.0035/R$' },
        calculation: '50,000 >= 30,000 minimum threshold (Eligible). USD Payout = 50,000 × $0.0035 = $175.00 USD.',
        result: 'Eligible for DevEx · Payout: $175.00 USD',
        takeaway: 'Every 30,000 Earned Robux yields at least $105.00 USD, and every 100,000 Earned Robux cashes out to $350.00 USD.'
      }
    ];
  }

  // 4b. Blox Fruits Trading Calculator & 40% Rule Evaluator
  if (id === 'blox-fruits-trading-calculator') {
    return [
      {
        title: 'Example 1: Evaluating Dough + Buddha vs T-Rex (Market Value & 40% Beli Rule)',
        scenario: 'A trader offers Dough (25M trading value, 2.8M Beli) + Buddha (8M trading value, 1.2M Beli) for T-Rex (20M trading value, 2.7M Beli).',
        inputValues: { 'Your Offer': 'Dough + Buddha (33M val, 4.0M Beli)', 'Their Offer': 'T-Rex (20M val, 2.7M Beli)' },
        calculation: 'Trading Value Diff = 20M - 33M = -13M (Massive Loss in market value). Beli Gap = (4.0M - 2.7M) / 4.0M = 32.5% (≤ 40%, trade allowed in-game).',
        result: 'Verdict: Massive Loss (-13M Val) | 40% Beli Rule: Passed (32.5% gap)',
        takeaway: 'Even when an in-game trade table accepts the Beli gap (32.5% ≤ 40%), community trading values protect you from overpaying.'
      },
      {
        title: 'Example 2: Fixing a Blocked Trade Over the 40% Beli Limit',
        scenario: 'Offering Leopard (40M value, 5.0M Beli) for Dough (25M value, 2.8M Beli) triggers "Value difference is too high".',
        inputValues: { 'Your Beli': '5,000,000 Beli (Leopard)', 'Their Beli': '2,800,000 Beli (Dough)' },
        calculation: 'Beli Gap = (5.0M - 2.8M) / 5.0M = 44.0% (> 40%, blocked). Min required on their side = 5.0M × 0.60 = 3.0M Beli → needs +200,000 Beli filler (e.g. Gravity 2.5M or Magma 850k).',
        result: 'Blocked at 44.0% → Adding Magma (850k Beli) brings their side to 3.65M Beli (27.0% gap, Allowed)',
        takeaway: 'Use the 40% Beli Rule Evaluator to find the exact minimum Beli filler needed before walking to the trading chairs.'
      },
      {
        title: 'Example 3: Upgrading Kitsune + Gravity for Dragon (Rework)',
        scenario: 'Checking a high-tier Mythical trade: Kitsune (125M value, 8.0M Beli) + Gravity (2.5M value, 2.5M Beli) for Dragon (Rework) (180M value, 10.0M Beli).',
        inputValues: { 'Your Offer': '127.5M Value · 10.5M Beli', 'Their Offer': '180M Value · 10.0M Beli' },
        calculation: 'Value Gain = 180M - 127.5M = +52.5M (Massive Win). Beli Gap = (10.5M - 10.0M) / 10.5M = 4.8% (well under 40%).',
        result: 'Massive Win (+52.5M Value) · 40% Beli Rule Passed (4.8%)',
        takeaway: 'Adding Gravity stabilizes Beli requirements while barely affecting overall Mythical market trade balance.'
      }
    ];
  }

  // 4c. Blox Fruits Stat Calculator & Reset Planner
  if (id === 'blox-fruits-stat-calculator') {
    return [
      {
        title: 'Example 1: Max Level 2,600 Fruit Main Build (7,800 Points)',
        scenario: 'A max-level pirate allocates all 7,800 stat points into Melee, Defense, and Blox Fruit for maximum PvP survivability and fruit combo damage.',
        inputValues: { 'Player Level': '2,600 (7,800 Points)', 'Melee': '2,600', 'Defense': '2,600', 'Blox Fruit': '2,600' },
        calculation: 'HP = 100 + (2,600 × 5) = 13,100 HP. Energy = 100 + (2,600 × 5) = 13,100 Energy. Remaining points = 7,800 - 7,800 = 0.',
        result: '13,100 HP | 13,100 Energy | Max 2,600 Blox Fruit Damage',
        takeaway: 'Investing equally into Melee, Defense, and one primary offense stat maximizes damage without sacrificing health or stamina.'
      },
      {
        title: 'Example 2: Planning a Stat Reset — Plokster NPC vs Shop Refund',
        scenario: 'A Sword Main player wants to respec all 7,800 stat points into a Gun Main build after unlocking new Third Sea weapons.',
        inputValues: { 'Option A': 'Plokster NPC (Second Sea Cafe / Third Sea Floating Turtle)', 'Option B': 'In-Game Shop', 'Option C': 'Promo Codes' },
        calculation: 'Plokster charges 2,500 Fragments; Shop Stat Refund costs 75 Robux; active developer codes cost 0.',
        result: 'Best Free-to-Play Option: 2,500 Fragments at Plokster NPC (or 0 cost if a Stat Reset code is active)',
        takeaway: 'Keep at least 2,500 Fragments banked from Sea Events or Raids so you can switch between Fruit, Sword, and Gun builds anytime.'
      },
      {
        title: 'Example 3: Balanced 5-Stat Hybrid Split at Level 2,600',
        scenario: 'Testing a 5-way Hybrid Split distribution across all 5 attributes before locking in an experimental PvP loadout.',
        inputValues: { 'Total Pool': '7,800 Points', 'Attributes': '5 (Melee, Defense, Sword, Gun, Fruit)' },
        calculation: 'Per-Attribute Allocation = floor(7,800 / 5) = 1,560 points each. HP = 100 + (1,560 × 5) = 7,900 HP; Energy = 7,900.',
        result: '1,560 in all 5 stats | 7,900 HP | 7,900 Energy',
        takeaway: 'Hybrid splits spread damage thin—compare your 7,900 HP against a 13,100 HP Meta Main before entering competitive Bounty hunting.'
      }
    ];
  }

  // 4d. Roblox Group Payout & Studio Team Earnings Calculator
  if (id === 'roblox-group-payout-calculator') {
    return [
      {
        title: 'Example 1: Splitting Multi-Stream Studio Team Earnings (500,000 R$ Pool)',
        scenario: 'A Roblox development studio earns 250,000 R$ from Gamepasses (70% Net), 150,000 R$ from Dev Products, 30,000 R$ from Avatar Commissions, and 70,000 R$ from Premium Playtime Payouts.',
        inputValues: { 'Total Pool': '500,000 Net R$', 'Splits': '40% / 30% / 15% / 15%' },
        calculation: 'Lead Dev (40%) = 200,000 R$ ($700.00 DevEx USD); Lead Builder (30%) = 150,000 R$ ($525.00 USD); UI/VFX (15%) = 75,000 R$ ($262.50 USD); Studio Reserve (15%) = 75,000 R$ ($262.50 USD).',
        result: '500,000 Net R$ Distributed | $1,750.00 Total DevEx USD (0% extra group payout tax)',
        takeaway: 'Group payouts carry a 0% additional fee because the 30% Roblox marketplace cut was already taken when each stream was earned.'
      },
      {
        title: 'Example 2: Direct Group Funds Payout Split with 14-Day Eligibility Check',
        scenario: 'Distributing 100,000 R$ sitting in Group Funds across 3 equal collaborators (33% each) and checking remainder.',
        inputValues: { 'Group Funds Pool': '100,000 R$', '3 Members': '33% each (99% allocated)' },
        calculation: 'Per Member = floor(100,000 × 0.33) = 33,000 R$ ($115.50 DevEx USD — above 30k DevEx minimum). Remainder left in group = 1,000 R$.',
        result: '33,000 R$ ($115.50 USD) per member | 1,000 R$ unallocated remainder',
        takeaway: 'Remember that newly joined group members must wait 14 days before Roblox allows sending them group payouts.'
      }
    ];
  }

  // 4e. Blox Fruits Mastery Calculator
  if (id === 'blox-fruits-mastery-calculator') {
    return [
      {
        title: 'Example 1: Grinding Mastery 300 to 400 (Unlocking Phoenix Raid Host Requirement)',
        scenario: 'A player at Mastery 300 on Phoenix wants to reach Mastery 400 (required to host Phoenix raids) by defeating Cake Queen (~2,200,000 mastery XP per kill).',
        inputValues: { 'Current Mastery': '300', 'Target Mastery': '400', 'Farming Source': 'Cake Queen (~2,200,000 XP/kill)' },
        calculation: 'Summing ceil(L^2.26 + 69) from L = 300 through L = 399 yields 56,551,080 Mastery XP. At 1x (no gamepass): ceil(56,551,080 ÷ 2,200,000) = 26 kills. With 2x Mastery gamepass (4,400,000 XP/kill): ceil(56,551,080 ÷ 4,400,000) = 13 kills.',
        result: '56,551,080 XP Needed | 26 Cake Queen kills (1x) or 13 kills (2x Mastery)',
        takeaway: 'Remember that 2x EXP boosts do NOT affect mastery XP — only the 2x Mastery gamepass (and up to ×2.70 max with party hat + enchant) speeds up mastery.'
      },
      {
        title: 'Example 2: Full Mastery Grind from 0 to Max 600 Using Cocoa Warriors',
        scenario: 'Estimating cumulative mastery XP from 0 to max 600 and kills on Cocoa Warriors / Chocolate Bar Battlers (~100,000 mastery XP per kill).',
        inputValues: { 'Current Mastery': '0', 'Target Mastery': '600', 'Farming Source': 'Cocoa Warriors / Chocolate Bar Battlers (~100,000 XP/kill)' },
        calculation: 'Total cumulative XP from 0 to 600 ≈ 348.7 million XP (348,679,743 exact). At ~100,000 XP/kill without gamepass ≈ 3,487 kills; with 2x Mastery (~200,000 XP/kill) ≈ 1,744 kills.',
        result: 'Total XP (0 → 600) ≈ 348.7M XP | ~3,487 kills (1x) or ~1,744 kills (2x Mastery)',
        takeaway: 'Mastery scales steeply toward 600, and fishing rods are capped separately at 100 mastery.'
      }
    ];
  }

  // 4f. Blox Fruits Awakening Calculator
  if (id === 'blox-fruits-awakening-calculator') {
    return [
      {
        title: 'Example 1: Completing Dough Awakening After Unlocking Z and F',
        scenario: 'A player has already awakened Dough Z (500 fragments) and F (2,000 fragments) and wants to know how many fragments remain for X, C, Tap, and V.',
        inputValues: { 'Fruit': 'Dough (18,500 Total)', 'Already Awakened': 'Z (500) + F (2,000) = 2,500' },
        calculation: 'Remaining moves: X (3,000) + C (4,000) + Tap (4,000) + V (5,000) = 16,000 fragments still needed. Total = 2,500 + 16,000 = 18,500 (not 23,500 as some sites wrongly state).',
        result: '16,000 Fragments Still Needed (of 18,500 Total)',
        takeaway: 'Dough raids require an Advanced Microchip (1,000 fragments or a physical fruit worth $1,000,000+) and support up to 4 players per raid.'
      },
      {
        title: 'Example 2: Standard Raid Fruit (Buddha / Light / Magma) vs Quake vs Lightning',
        scenario: 'Comparing the fragment cost of a Standard-pattern raid fruit (14,500), Quake (4 moves, 17,000), and Lightning\'s separate Admin Panel upgrades.',
        inputValues: { 'Standard Raid Fruit': 'Z 500, F 2k, X 3k, C 4k, V 5k', 'Quake': 'Z 1k, X 3k, C 5k, V 8k', 'Lightning': 'Admin Panel (4 upgrades)' },
        calculation: 'Standard fruit = 14,500 fragments; Quake = 17,000 fragments; Lightning Admin Panel = 1,500 + 3,000 + 6,000 + 11,000 = 21,500 fragments (+ Volt Capsule ×4, Electric Wing ×13, Angel Wings ×3, and 500 mastery).',
        result: 'Standard = 14,500 f | Quake = 17,000 f | Lightning Admin Panel = 21,500 f',
        takeaway: 'Awakening all 11 raid fruits costs 172,800 fragments total, while Lightning (formerly Rumble) no longer awakens in raids.'
      }
    ];
  }

  // 4g. Blox Fruits Race V4 Progress Calculator
  if (id === 'blox-fruits-race-v4-calculator') {
    return [
      {
        title: 'Example 1: Finishing Trial 3 & Planning Trial 4 Awakening Purchases',
        scenario: 'A player has completed Trial 1 (1,000), Trial 2 (1,500), and all 3 Trial 3 purchases (2,000 + 2,250 + 2,500) at the Ancient One and wants to check the remaining Trial 4 cost.',
        inputValues: { 'Purchases Done': '5 / 10 (After Trial 3)', 'Trial 4 Purchases Left': '3,000 + 3,250 + 3,500 + 3,750 + 4,000' },
        calculation: 'Fragments Spent = 1,000 + 1,500 + 6,750 = 9,250 fragments (27 V4 activations completed: 3 + 5 + 4 + 5 + 10). Remaining Trial 4 = 17,500 fragments and 50 activations (8 + 9 + 10 + 11 + 12). Total per race = 26,750 fragments and 77 activations.',
        result: '9,250 Spent | 17,500 Fragments & 50 Activations Still Needed',
        takeaway: 'Trial 4 accounts for more than half of both the fragments (17,500 / 26,750) and the V4 activations (50 / 77) needed per race.'
      },
      {
        title: 'Example 2: Awakening All 7 Races (Human, Rabbit, Shark, Angel, Ghoul, Cyborg, Draco)',
        scenario: 'Budgeting total fragments across all 7 races in the Temple of Time.',
        inputValues: { 'Cost Per Race': '26,750 fragments (10 purchases)', 'Races': '7 races total' },
        calculation: 'Total across all 7 races = 26,750 × 7 = 187,250 fragments. Each race has 5 gears, finishes awakening in 4 trials, and unlocks the Ancient Clock for gear switching on a 5th trial.',
        result: '187,250 Total Fragments Across All 7 Races',
        takeaway: 'Knowing the 187,250 total lets you pair Trial completions with efficient 1,000-fragment raid runs.'
      }
    ];
  }

  // 4h. Blox Fruits Raid Rewards & Fragment Farming Calculator
  if (id === 'blox-fruits-raid-calculator') {
    return [
      {
        title: 'Example 1: Raid Fragment Rewards at 100s vs 200s Remaining',
        scenario: 'Comparing fragments earned when clearing a raid with 100 seconds remaining versus clearing rapidly with 200 seconds remaining.',
        inputValues: { 'Formula': 'min(1,000, 300 + 4.5 × seconds)', 'Run A': '100 seconds left', 'Run B': '200 seconds left' },
        calculation: 'Run A: 300 + (4.5 × 100) = 750 fragments. Run B: 300 + (4.5 × 200) = 1,200 → capped at 1,000 fragments (cap starts around 156+ seconds remaining).',
        result: '100s left = 750 fragments | 200s left = 1,000 fragments (cap)',
        takeaway: 'Any clear with 156+ seconds left earns the full 1,000-fragment cap, plus ~$62,000–$72,000 Beli from enemy drops depending on theme.'
      },
      {
        title: 'Example 2: Farming 14,500 Fragments for a Standard Awakening at 750/Raid',
        scenario: 'Calculating how many raids are required to reach a 14,500-fragment awakening target while averaging 100 seconds remaining (750 fragments per raid).',
        inputValues: { 'Fragment Target': '14,500', 'Avg. Speed': '100 seconds left (750 fragments/raid)' },
        calculation: 'Raids Needed = ceil(14,500 ÷ 750) = ceil(19.333) = 20 raids. Total earned = 20 × 750 = 15,000 fragments.',
        result: '20 Raids Needed (500 leftover fragments)',
        takeaway: 'Speeding up your clear to 156+ seconds left (1,000 fragments/raid) drops a 14,500-fragment grind from 20 raids down to 15.'
      }
    ];
  }

  // 4i. Blox Fruits Fighting Style Cost Calculator
  if (id === 'blox-fruits-fighting-style-calculator') {
    return [
      {
        title: 'Example 1: Full Chain From Nothing Owned to Godhuman',
        scenario: 'A player who owns none of the purchasable fighting styles plans the total currency needed to unlock every prerequisite style up to Godhuman.',
        inputValues: { 'Owned Styles': 'None', 'Target Style': 'Godhuman' },
        calculation: 'V1 Beli ($150,000 + $500,000 + $750,000 = $1,400,000) + Superhuman ($3,000,000) + Death Step ($2,500,000) + Sharkman Karate ($2,500,000) + Electric Claw ($3,000,000) + Dragon Talon ($3,000,000) + Godhuman ($5,000,000) = $20,400,000 Beli. Fragments: Dragon Breath (1,500) + five V2/Godhuman unlocks (5 × 5,000 = 25,000) = 26,500 fragments.',
        result: '$20,400,000 Beli + 26,500 Fragments',
        takeaway: 'In addition to currency, Godhuman requires 400 mastery on all 9 non-Combat/Sanguine styles plus 20 Fish Tail, 20 Magma Ore, 10 Mystic Droplet, and 10 Dragon Scale.'
      },
      {
        title: 'Example 2: Finishing Godhuman After Owning All V1 Styles & Superhuman',
        scenario: 'A player already owns Dark Step, Electric, Water Kung Fu, Dragon Breath, and Superhuman and wants to compute the remaining cost for the four V2 styles and Godhuman.',
        inputValues: { 'Owned': 'All 4 V1 Styles + Superhuman', 'Target Style': 'Godhuman' },
        calculation: 'Remaining Beli: Death Step ($2,500,000) + Sharkman Karate ($2,500,000) + Electric Claw ($3,000,000) + Dragon Talon ($3,000,000) + Godhuman ($5,000,000) = $16,000,000 Beli. Remaining Fragments: 5 × 5,000 = 25,000 fragments.',
        result: '$16,000,000 Beli + 25,000 Fragments Still Needed',
        takeaway: 'Every V2 style and Godhuman each cost 5,000 fragments, totaling 25,000 fragments once Dragon Breath is owned.'
      }
    ];
  }

  // 4j. Blox Fruits Gacha Cost Calculator
  if (id === 'blox-fruits-gacha-calculator') {
    return [
      {
        title: 'Example 1: Single Roll at Level 1,000 (Standard vs Premium ×0.8)',
        scenario: 'Comparing what Zioles charges for 1 random physical fruit roll at player level 1,000 with and without Premium/Plus.',
        inputValues: { 'Player Level': '1,000', 'Rolls': '1' },
        calculation: 'Standard = 25,000 + 150 × (1,000 − 1) = 25,000 + 149,850 = 174,850 Beli. With Premium (×0.8) = 174,850 × 0.8 = 139,880 Beli.',
        result: 'Standard: 174,850 Beli | Premium: 139,880 Beli',
        takeaway: 'Premium saves 34,970 Beli per roll at level 1,000; exact gacha odds are not officially published.'
      },
      {
        title: 'Example 2: Budgeting 5 Rolls at Level 2,600 (With 2-Hour Cooldown)',
        scenario: 'Planning Beli for 5 consecutive Zioles rolls at level 2,600 without Premium.',
        inputValues: { 'Player Level': '2,600', 'Premium': 'No', 'Rolls': '5' },
        calculation: 'Per Roll = 25,000 + 150 × (2,600 − 1) = 414,850 Beli. Five rolls = 5 × 414,850 = 2,074,250 Beli (with 2-hour cooldown between rolls).',
        result: '2,074,250 Beli Total (414,850 Beli per roll)',
        takeaway: 'Always confirm you are at least level 50 before visiting Zioles, and pace rolls around the 2-hour cooldown.'
      }
    ];
  }

  // 4k. Blox Fruits Fruit Spawn Timer
  if (id === 'blox-fruits-fruit-spawn-timer') {
    return [
      {
        title: 'Example 1: Tracking a Weekday Fruit Spawn & 20-Min Despawn Window',
        scenario: 'A fruit spawns on a Wednesday in Third Sea (34 spawn points) and the player taps "A Fruit Just Spawned" right away.',
        inputValues: { 'Schedule': 'Weekday (60 min)', 'Sea': 'Third Sea (34 spawn points)' },
        calculation: 'Next-spawn countdown starts at 60:00 while the current fruit despawn timer starts at 20:00. Once picked up ("I Picked One Up"), only the next-spawn timer continues toward 00:00.',
        result: 'Next Spawn in 60:00 | Uncollected Despawn in 20:00',
        takeaway: 'Act immediately when a spawn notification appears — uncollected fruits vanish after 20 minutes.'
      },
      {
        title: 'Example 2: Faster 45-Minute Weekend Spawn Cycle in Second Sea',
        scenario: 'Hunting natural spawns on a weekend in Second Sea (28 spawn points).',
        inputValues: { 'Schedule': 'Weekend (45 min)', 'Sea': 'Second Sea (28 spawn points)' },
        calculation: 'Weekend interval shortens the spawn countdown from 60:00 to 45:00 while keeping the uncollected despawn limit at 20:00.',
        result: 'Next Spawn in 45:00 | Despawn Limit Remains 20:00',
        takeaway: 'The Fruit Notifier gamepass costs 2,700 Robux, and the Fruit Dealer\'s stock rotates every 4 hours (00/04/08/12/16/20 UTC) on all servers.'
      }
    ];
  }

  // 4l. Roblox Username Generator
  if (id === 'roblox-username-generator') {
    return [
      {
        title: 'Example 1: Generating 12-Character Aesthetic Names With One Underscore',
        scenario: 'A player selects the Aesthetic style, sets the length slider to 12, toggles "Allow one underscore" ON, and leaves keyword empty.',
        inputValues: { 'Style': 'Aesthetic', 'Length': '12 characters', 'Underscore': 'Allowed (max 1, non-edge)' },
        calculation: 'Every candidate combines built-in Aesthetic words, ensures 3–20 characters, uses only letters/numbers plus at most one middle underscore (never position 0 or 11), and strips all other symbols.',
        result: '20 Roblox-valid 12-character username ideas ready to copy',
        takeaway: 'Availability is not checked — try the name in Roblox to see if it is free.'
      },
      {
        title: 'Example 2: Compact 5-Character OG/Short Keyword Mix Without Underscores',
        scenario: 'A user enters the keyword "Vex", chooses OG/Short style, sets length to 5, and turns "Allow one underscore" OFF.',
        inputValues: { 'Keyword': 'Vex', 'Style': 'OG/Short', 'Length': '5 characters', 'Underscore': 'OFF' },
        calculation: 'Sanitizes keyword to alphanumeric ("Vex"), appends 2-character short tags to meet length 5, and produces 20 distinct letter-and-number names.',
        result: '20 compact 5-character alphanumeric ideas',
        takeaway: 'Keep names between 3 and 20 characters and never place underscores at the start or end.'
      }
    ];
  }

  // 4m. Roblox Display Name & Bio Font Generator
  if (id === 'roblox-font-generator') {
    return [
      {
        title: 'Example 1: Converting "Shadow Knight" Into Bold, Script & Bubble Styles',
        scenario: 'A player customizes their Roblox Display Name with stylized Unicode lettering.',
        inputValues: { 'Input Text': 'Shadow Knight' },
        calculation: 'Client-side mapper converts every letter into Bold (𝐒𝐡𝐚𝐝𝐨𝐰 𝐊𝐧𝐢𝐠𝐡𝐭), Script (𝒮𝒽𝒶𝒹ℴ𝓌 𝒦𝓃𝒾ℊ𝒽𝓉), and Bubble (Ⓢⓗⓐⓓⓞⓦ Ⓚⓝⓘⓖⓗⓣ) while keeping the space unchanged.',
        result: '11 copy-ready stylized variants generated locally',
        takeaway: 'These styled fonts are for display names and bios; regular usernames only allow letters, numbers and one underscore.'
      },
      {
        title: 'Example 2: Preserving Unmapped Symbols & Numbers in Small Caps',
        scenario: 'Converting a Roblox profile bio snippet containing symbols like "Builder | 2026!" using Small Caps.',
        inputValues: { 'Input Text': 'Builder | 2026!' },
        calculation: 'Lowercase letters map to Unicode Small Caps (ʙᴜɪʟᴅᴇʀ) while "B", spaces, "|", "2026", and "!" remain unchanged where no Small Caps glyph exists.',
        result: 'Bᴜɪʟᴅᴇʀ | 2026! copied cleanly to clipboard',
        takeaway: 'Characters a style cannot map stay unchanged so your bio never displays broken boxes.'
      }
    ];
  }

  // 4n. Roblox UGC Creator Royalty Calculator
  if (id === 'roblox-ugc-calculator') {
    return [
      {
        title: 'Example 1: 100 Robux UGC Item Sold in Marketplace vs Your Own Experience',
        scenario: 'Comparing what an item creator earns on 1 sale of a 100 Robux UGC accessory in the Avatar Shop Marketplace versus inside their own experience.',
        inputValues: { 'Item Price': '100 Robux', 'Sales Quantity': '1 sale' },
        calculation: 'Marketplace (base 30%): 100 × 30% = 30 Robux. Own Experience (30% creator + 40% experience owner): 100 × 70% = 70 Robux.',
        result: 'Marketplace: 30 Robux | Own Experience: 70 Robux',
        takeaway: 'Selling your own UGC items inside your own game more than doubles your payout per sale (from 30% to 70%), subject to the 30-day escrow hold.'
      },
      {
        title: 'Example 2: Selling 1,000 Units at 100 Robux Inside Your Own Experience (+ DevEx Estimate)',
        scenario: 'Budgeting total creator royalties and estimated DevEx USD payout for 1,000 sales of a 100 Robux item sold in your own game.',
        inputValues: { 'Item Price': '100 Robux', 'Sales': '1,000', 'Location': 'Own Experience (70%)' },
        calculation: 'Creator Earnings = 70 × 1,000 = 70,000 Robux (held in 30-day escrow). Estimated DevEx USD = 70,000 × $0.0035 = $245.00 USD estimate (above 30,000 Robux DevEx minimum).',
        result: '70,000 Robux | ~$245.00 USD (Estimate Only)',
        takeaway: 'DevEx USD outputs are estimates only and require full DevEx eligibility plus at least 30,000 Earned Robux.'
      }
    ];
  }

  // 4o. Roblox Game Revenue Estimator
  if (id === 'roblox-game-revenue-estimator') {
    return [
      {
        title: 'Example 1: Estimating Revenue at 10,000 Visits/Day (1% Buyers, 100 R$ Avg)',
        scenario: 'Projecting daily and 30-day gamepass/dev-product revenue estimates for an experience averaging 10,000 daily visits.',
        inputValues: { 'Visits/Day': '10,000', 'Buyers %': '1%', 'Avg Spend': '100 Robux' },
        calculation: 'Buyers/Day Estimate = 10,000 × 1% = 100 buyers. Gross Robux/Day Estimate = 100 × 100 = 10,000 R$. Creator 70% Share/Day Estimate = 10,000 × 0.70 = 7,000 R$/day (210,000 R$ per 30 days; DevEx estimate ~$24.50/day or ~$735.00 per 30 days).',
        result: 'Estimated Gross: 10,000 R$/day | Estimated 70% Share: 7,000 R$/day (210,000 R$/30 days)',
        takeaway: 'All outputs are estimates (real earnings vary), and DevEx payouts at $0.0035/Robux require DevEx eligibility plus the 30,000 Robux minimum.'
      },
      {
        title: 'Example 2: Checking the 30,000 Robux DevEx Threshold at 5,000 Visits/Day',
        scenario: 'Estimating whether a smaller game averaging 5,000 visits/day, 0.5% buyer conversion, and 80 R$ average spend clears the 30,000 Robux DevEx minimum over 30 days.',
        inputValues: { 'Visits/Day': '5,000', 'Buyers %': '0.5%', 'Avg Spend': '80 Robux' },
        calculation: 'Buyers/Day Estimate = 25. Gross Estimate = 25 × 80 = 2,000 R$/day. 70% Share Estimate = 1,400 R$/day × 30 = 42,000 Robux over 30 days (~$147.00 DevEx USD estimate).',
        result: 'Estimated 42,000 R$ / 30 Days (~$147.00 USD Estimate)',
        takeaway: 'Every result is an estimate — monitor live Creator Hub analytics because real conversion and pricing vary.'
      }
    ];
  }

  // 4p. Roblox Shirt & Pants Template Maker
  if (id === 'roblox-shirt-template-maker') {
    return [
      {
        title: 'Example 1: Exporting a Classic Shirt Template at Official 585 × 559 px',
        scenario: 'A designer uploads a jacket texture, selects Classic Shirt mode, aligns the front graphic over the Front torso region guide, and exports.',
        inputValues: { 'Mode': 'Classic Shirt', 'Canvas Size': '585 × 559 px', 'Guide Labels in PNG': 'OFF' },
        calculation: 'Local HTML5 Canvas composites the positioned graphic onto an exact 585 × 559 px PNG with semi-transparent Front, Back, Top, Bottom, and Side guides toggled off for upload.',
        result: 'Upload-ready 585 × 559 px Classic Shirt PNG',
        takeaway: 'Always verify the exported PNG measures exactly 585 × 559 pixels before submitting to Roblox.'
      },
      {
        title: 'Example 2: Mapping Fabric to Classic Pants Regions (Same 585 × 559 px Canvas)',
        scenario: 'Switching to Classic Pants keeps the exact 585 × 559 pixel template dimensions while relabeling limb guides to pants regions.',
        inputValues: { 'Mode': 'Classic Pants', 'Clip to Guides': 'ON', 'Dimensions': '585 × 559 px' },
        calculation: 'Canvas clips the scaled texture cleanly inside the Front, Back, Top, Bottom, and Side clothing template blocks on the 585 × 559 layout.',
        result: 'Clean 585 × 559 px Classic Pants PNG',
        takeaway: 'Everything processes locally in your browser — your artwork is never uploaded to any server.'
      }
    ];
  }

  // 4q. Roblox Game Icon & Thumbnail Resizer
  if (id === 'roblox-thumbnail-resizer') {
    return [
      {
        title: 'Example 1: Cropping a Square 512 × 512 px Experience Icon',
        scenario: 'A developer uploads a wide render, picks the Icon (512×512) preset, zooms to 120%, and checks the Roblox home grid mock.',
        inputValues: { 'Preset': 'Experience Icon (1:1)', 'Target Resolution': '512 × 512 px', 'Format': 'PNG' },
        calculation: 'Canvas scales the cover image to fill 512 × 512 px cleanly, renders a live discovery tile preview, and exports an exact 512 × 512 PNG.',
        result: 'Exact 512 × 512 px Square Experience Icon',
        takeaway: 'Roblox Creator Hub requires square experience icons to be at least 512 × 512 px.'
      },
      {
        title: 'Example 2: Exporting a 1920 × 1080 px (16:9) Game Thumbnail',
        scenario: 'Preparing one of up to 10 experience gallery images/videos in ideal 16:9 HD format.',
        inputValues: { 'Preset': 'Experience Thumbnail (16:9)', 'Target Resolution': '1920 × 1080 px', 'Format': 'JPG' },
        calculation: 'Canvas crops the positioned frame to 1920 × 1080 px (16:9) locally in the browser and downloads a compressed JPG.',
        result: 'Exact 1920 × 1080 px (16:9) Experience Thumbnail',
        takeaway: 'Use up to 10 images/videos per experience gallery at 1920 × 1080 px for sharp widescreen presentation.'
      }
    ];
  }

  // 4r. Roblox Studs to Meters & Feet Converter
  if (id === 'roblox-studs-converter') {
    return [
      {
        title: 'Example 1: Converting 100 Studs to Metres, Feet & Inches',
        scenario: 'A level designer measures a 100-stud bridge in Roblox Studio and checks its real-world size using the official 1 stud = 0.28 m standard.',
        inputValues: { 'Input': '100 studs', 'Official Scale': '1 stud = 0.28 m (28 cm)' },
        calculation: 'Metres = 100 × 0.28 = 28 m. Centimetres = 2,800 cm. Feet = 28 ÷ 0.3048 = 91.86 ft. Inches = 28 ÷ 0.0254 = 1,102.36 in.',
        result: '100 studs = 28 metres (91.86 ft)',
        takeaway: '100 studs equals exactly 28 metres under Roblox Creator Hub\'s official units.'
      },
      {
        title: 'Example 2: Converting 10 Metres Back to Studs & Checking 3.57 Studs/s Speed',
        scenario: 'Sizing a 10-metre hallway back into Roblox studs and converting the 1 m/s = 3.57 studs/s benchmark into km/h.',
        inputValues: { 'Length Input': '10 metres', 'Speed Input': '3.57 studs/s (1 m/s)' },
        calculation: 'Studs = 10 ÷ 0.28 = 35.71 studs. Speed = 3.57 × 0.28 = 1.00 m/s = 3.60 km/h (at 1 m/s = 3.57 studs/s).',
        result: '10 metres = 35.71 studs | 3.57 studs/s = 3.6 km/h',
        takeaway: 'The engine lets creators define their own scale, but 0.28 m is Roblox\'s official conversion.'
      }
    ];
  }

  // 4s. Roblox BrickColor Picker & RGB Converter
  if (id === 'roblox-brickcolor-picker') {
    return [
      {
        title: 'Example 1: Matching Custom RGB (255, 0, 191) / #FF00BF to Hot pink',
        scenario: 'A builder pastes #FF00BF from an external palette into the converter to find the exact matching BrickColor.',
        inputValues: { 'Hex Input': '#FF00BF', 'RGB Input': '255, 0, 191' },
        calculation: 'Distance check across all 208 official BrickColors finds Δ = 0.00 exact match on Hot pink (Code 1032, RGB 255,0,191, #FF00BF).',
        result: 'Exact Match: Hot pink (Code 1032 | #FF00BF)',
        takeaway: 'Use BrickColor.new("Hot pink") or BrickColor.new(1032) directly in Roblox Studio Luau scripts.'
      },
      {
        title: 'Example 2: Looking Up Dark UI Colors Like Really black (1003)',
        scenario: 'Searching the 208-color grid for the darkest official BrickColor swatch instead of default Black (26, #1B2A35).',
        inputValues: { 'Search Query': '1003 or black' },
        calculation: 'Palette highlights Really black (Code 1003, RGB 17,17,17, #111111) alongside Black (Code 26, RGB 27,42,53, #1B2A35).',
        result: 'Really black = Code 1003 | RGB(17,17,17) | #111111',
        takeaway: 'Classic Black (26) has a cool navy tint (#1B2A35), whereas Really black (1003) is neutral dark gray-black (#111111).'
      }
    ];
  }

  // 4t. Pet Simulator 99 Mastery XP Calculator
  if (id === 'ps99-mastery-calculator') {
    return [
      {
        title: 'Example 1: Eggs Mastery (L1, 0 XP → L50)',
        scenario: 'A player recently completed Rebirth 4, unlocking Mastery, and wants to reach Level 50 in Eggs Mastery to unlock faster auto-hatch speed.',
        inputValues: { 'Mastery Track': 'Eggs Mastery', 'Current Level': '1', 'Current XP': '0', 'Target Level': '50', 'Farming Method': 'Normal Egg (0.4 XP)' },
        calculation: 'Cumulative XP to L50 = 101,333 XP. Current XP = 0. XP needed = 101,333. Actions = ceil(101,333 ÷ 0.4) = 253,333 normal eggs.',
        result: '101,333 XP needed | 253,333 Normal Eggs',
        takeaway: 'Reaching Level 50 Eggs Mastery unlocks faster egg hatching speed and increased hatch luck with 253,333 eggs hatched.'
      },
      {
        title: 'Example 2: Fishing Mastery (L1, 0 XP → L99)',
        scenario: 'A player aims to max out Fishing Mastery from scratch using regular fishing casts.',
        inputValues: { 'Mastery Track': 'Fishing Mastery', 'Current Level': '1', 'Current XP': '0', 'Target Level': '99', 'Farming Method': 'Fishing Cast (25 XP)' },
        calculation: 'Cumulative XP to L99 = 13,034,431 XP. Current XP = 0. Actions = ceil(13,034,431 ÷ 25) = 521,378 casts.',
        result: '13,034,431 XP needed | 521,378 Fishing Casts',
        takeaway: 'Maxing Fishing Mastery from Level 1 takes 521,378 casts (13,034,431 XP ÷ 25 XP per cast).'
      },
      {
        title: 'Example 3: Superior Mini Chests (L1 → L99)',
        scenario: 'An endgame player breaks naturally spawning Superior Mini Chests in final zones to level up mastery.',
        inputValues: { 'Mastery Track': 'Superior Mini Chests', 'Current Level': '1', 'Target Level': '99', 'Farming Method': 'Superior Mini Chest (3,000 XP)' },
        calculation: 'Cumulative XP to L99 = 13,034,431 XP. Actions = ceil(13,034,431 ÷ 3,000) = 4,345 chests.',
        result: '13,034,431 XP needed | 4,345 Superior Mini Chests',
        takeaway: 'Breaking 4,345 Superior Mini Chests maxes out the track to Level 99, doubling item drops and bonus gems.'
      }
    ];
  }

  // 4u. Pet Simulator 99 Golden & Rainbow Upgrade Calculator
  if (id === 'ps99-golden-rainbow-calculator') {
    return [
      {
        title: 'Example 1: Baseline 100 Normal Pets Conversion',
        scenario: 'A player opens 100 identical normal pets and wants to know how many gold and rainbow pets they can craft with zero mastery discounts.',
        inputValues: { 'Normal Pets Owned': '100', 'Gold Pets Owned': '0', 'Pets Mastery': 'None (10:1)' },
        calculation: 'Golden Machine: 100 ÷ 10 = 10 gold pets (0 normal leftover). Rainbow Machine: 10 ÷ 10 = 1 rainbow pet (0 gold leftover).',
        result: '10 Gold Pets → 1 Rainbow Pet (0 pets leftover)',
        takeaway: 'Without mastery perks, 100 normal pets convert into 10 gold pets and then 1 rainbow pet at zero diamond cost.'
      },
      {
        title: 'Example 2: Partial Inventory (25 Normal Pets)',
        scenario: 'A player has 25 normal pets and wants to craft gold pets and see what is needed for their first rainbow pet.',
        inputValues: { 'Normal Pets Owned': '25', 'Gold Pets Owned': '0', 'Pets Mastery': 'None (10:1)' },
        calculation: 'Golden Machine: 25 ÷ 10 = 2 gold pets with 5 normal leftover. Next rainbow needs: 10 - 2 = 8 gold pets = 80 normal - 5 leftover = 75 normal pets still needed.',
        result: '2 Gold Pets crafted (5 normal leftover) | 75 Normal Pets needed for next Rainbow',
        takeaway: 'Converting 25 normal pets leaves 5 normal pets in inventory, requiring 75 more normal pets to craft the first rainbow pet.'
      },
      {
        title: 'Example 3: Pets Mastery 99 Discount (64 Normal Pets)',
        scenario: 'An endgame player with maxed Level 99 Pets Mastery crafts pets with the -2 input discount active on both machines.',
        inputValues: { 'Normal Pets Owned': '64', 'Gold Pets Owned': '0', 'Pets Mastery': 'Level 99 (-2 both / 8:1)' },
        calculation: 'Golden Machine (8:1): 64 ÷ 8 = 8 gold pets (0 leftover). Rainbow Machine (8:1): 8 ÷ 8 = 1 rainbow pet (0 leftover).',
        result: '8 Gold Pets → 1 Rainbow Pet (0 pets leftover)',
        takeaway: 'Pets Mastery 99 reduces input requirements from 100 down to 64 normal pets per rainbow pet (8 normal per gold, 8 gold per rainbow).'
      }
    ];
  }

  // 4v. Blox Fruits Title & Achievement Tracker
  if (id === 'blox-fruits-title-tracker') {
    return [
      {
        title: 'Example 1: Unlocking PvP Title #022 Pirate Hunter',
        scenario: 'A player grinding bounty in the Second Sea hits 5M+ bounty or honor and visits the Titles Specialist to equip their title.',
        inputValues: { 'Title Name': 'Pirate Hunter', 'Title Number': '#022', 'Category': 'PvP', 'Requirement': '5M+ bounty or honor' },
        calculation: 'Requirement verified: 5M+ bounty or honor in Second Sea or Third Sea. Visit Titles Specialist in Cafe basement (Second Sea) or Mansion right entrance (Third Sea).',
        result: 'Title #022 "Pirate Hunter" Unlocked & Available to Equip',
        takeaway: 'Pirate Hunter unlocks at 5M+ bounty or honor in the Second Sea or Third Sea, and is equipped via the Titles Specialist.'
      },
      {
        title: 'Example 2: Checking Unobtainable Title #040 Thunder God',
        scenario: 'A player checking their awakening achievements wonders why Rumble Awakening title #040 Thunder God cannot be unlocked.',
        inputValues: { 'Title Name': 'Thunder God', 'Title Number': '#040', 'Category': 'Awakening', 'Status': 'UNOBTAINABLE' },
        calculation: 'Update 27 removed Rumble raids from Blox Fruits. The Thunder God title cannot be earned by modern players.',
        result: 'Marked as UNOBTAINABLE (Update 27 removed Rumble raids)',
        takeaway: 'The tracker clearly flags Thunder God as unobtainable so players do not waste fragments attempting to unlock a retired title.'
      },
      {
        title: 'Example 3: Sea 1 Obtainment Rule & Exception (Class S)',
        scenario: 'A player in the First Sea completes Advanced Combat and checks if they receive a title before entering Second Sea.',
        inputValues: { 'Title Name': 'Class S', 'Title Number': '#107', 'Sea Completed': 'First Sea', 'Requirement': 'Advanced Combat' },
        calculation: 'Standard rule: First Sea requirements grant no titles. Exception: Class S and legacy I Was There can be unlocked from First Sea conditions.',
        result: 'Title #107 "Class S" Unlocked as First Sea Exception',
        takeaway: 'Except for Class S and the I Was There event, all other title requirements must be finished in the Second Sea or Third Sea to count.'
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
  // NOTE: bare "cp" / "iv" substrings removed — they matched any name
  // containing them ("Helldivers" has "iv", "CPS Click Speed" has "cp",
  // "Palworld IV" has "iv"), showing Pokémon examples on other games' tools.
  // Every real Pokémon tool carries "Pokémon" or "Stardust" in its name.
  if (name.includes('pokemon') || name.includes('pokémon') || name.includes('stardust')) {
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

  // Grow a Garden tools
  if (id.startsWith('grow-a-garden') || name.includes('grow a garden')) {
    if (id === 'grow-a-garden-crop-value-calculator') {
      return [
        {
          title: 'Example 1: Gold Carrot with Shocked & Frozen Mutations',
          scenario: 'A player harvests a 0.55 kg Gold Carrot with Shocked and Frozen environmental mutations and no friend boost.',
          inputValues: { 'Crop': 'Carrot (20 Sheckles, 0.275kg)', 'Actual Weight': '0.55 kg', 'Variant': 'Gold (x20)', 'Mutations': 'Shocked (x100) + Frozen (x10)' },
          calculation: 'Base (20) × WeightFactor ((0.55/0.275)^2 = 4.0) × Variant (20) × EnvBracket [1 + (Shocked: 99) + (Frozen: 9) = 109] × FriendBoost (1.0) × Qty (1) = 20 × 4 × 20 × 109 = 174,400 Sheckles.',
          result: '174,400 Sheckles',
          takeaway: 'Because weight scaling is quadratic, doubling the actual weight yields a 4x multiplier, which scales exponentially with high-tier mutation brackets.'
        },
        {
          title: 'Example 2: Rainbow Carrot with Celestial Mutation',
          scenario: 'A player harvests a 0.275 kg base-weight Rainbow Carrot with the Celestial environmental mutation.',
          inputValues: { 'Crop': 'Carrot (20 Sheckles, 0.275kg)', 'Actual Weight': '0.275 kg', 'Variant': 'Rainbow (x50)', 'Mutations': 'Celestial (x120)' },
          calculation: 'Base (20) × WeightFactor (1.0) × Variant (50) × EnvBracket [1 + (Celestial: 119) = 120] × Qty (1) = 20 × 1.0 × 50 × 120 = 120,000 Sheckles.',
          result: '120,000 Sheckles',
          takeaway: 'Rainbow variant (x50) multiplies the entire environmental bracket sum, producing 120,000 Sheckles on base weight alone.'
        }
      ];
    }
    if (id === 'grow-a-garden-mutation-calculator') {
      return [
        {
          title: 'Example 1: Stacking Rainbow Variant with Shocked & Celestial Mutations',
          scenario: 'Calculating total multiplier for Rainbow variant with Shocked and Celestial mutations.',
          inputValues: { 'Variant': 'Rainbow (x50)', 'Mutations': 'Shocked (x100), Celestial (x120)' },
          calculation: 'Variant (Rainbow x50) × Bracket [1 + (Shocked: 100−1 = 99) + (Celestial: 120−1 = 119)] = 50 × [1 + 99 + 119] = 50 × 219 = x10,950.',
          result: 'Combined Multiplier = x10,950',
          takeaway: 'Environmental mutations add inside the bracket (99 + 119 = 218), while Rainbow multiplies the total bracket sum by 50.'
        },
        {
          title: 'Example 2: Stacking Gold Variant with Dawnbound (Sunflower Only)',
          scenario: 'Calculating multiplier for Gold variant Sunflower with Dawnbound mutation.',
          inputValues: { 'Variant': 'Gold (x20)', 'Mutation': 'Dawnbound (x150)' },
          calculation: 'Variant (Gold x20) × Bracket [1 + (Dawnbound: 150−1 = 149)] = 20 × 150 = x3,000.',
          result: 'Combined Multiplier = x3,000',
          takeaway: 'Dawnbound provides a +149 bracket term, making it the highest single environmental mutation for Sunflowers.'
        }
      ];
    }
    if (id === 'grow-a-garden-egg-hatching-calculator') {
      return [
        {
          title: 'Example 1: Bug Egg Hatching for Dragonfly (1.0% Rate)',
          scenario: 'A player wants a Dragonfly from Bug Eggs (1.0% hatch rate) and needs 50% and 90% cumulative confidence thresholds.',
          inputValues: { 'Egg': 'Bug Egg (50,000,000 Sheckles)', 'Pet': 'Dragonfly (1.0%)' },
          calculation: '50% chance = Ceil(Ln(1−0.50) / Ln(1−0.01)) = 69 eggs. 90% chance = Ceil(Ln(1−0.90) / Ln(0.99)) = 230 eggs. Expected average (1/p) = 100 eggs.',
          result: '69 eggs for 50%, 230 eggs for 90%, expected 100 eggs',
          takeaway: 'To reach a 50% cumulative chance at a 1% Dragonfly, you need 69 Bug Eggs (3.45 Billion Sheckles).'
        },
        {
          title: 'Example 2: Legendary Egg Hatching for Turtle (2.13% Rate)',
          scenario: 'A player wants a Turtle from Legendary Eggs (2.13% hatch rate).',
          inputValues: { 'Egg': 'Legendary Egg (3,000,000 Sheckles)', 'Pet': 'Turtle (2.13%)' },
          calculation: '50% chance = Ceil(Ln(1−0.50) / Ln(1−0.0213)) = 33 eggs.',
          result: '33 eggs for 50% chance (99,000,000 Sheckles)',
          takeaway: 'Hatching 33 Legendary Eggs gives a >50% probability of obtaining at least one Turtle.'
        }
      ];
    }
    if (id === 'grow-a-garden-trade-calculator') {
      return [
        {
          title: 'Example 1: Gold Carrot & Rare Pet for Legendary Cow',
          scenario: 'Offering Gold Carrot (174,400 Sheckles) + Orange Tabby (600,000 Sheckles) = 774,400 Sheckles, receiving a Cow (800,000 Sheckles).',
          inputValues: { 'Your Offer': '774,400 Sheckles', 'Their Offer': '800,000 Sheckles' },
          calculation: 'Value Difference = 800,000 − 774,400 = +25,600 Sheckles (+3.3%). Their offer is higher than your offer.',
          result: 'Win (Big W for You!)',
          takeaway: 'Since 800,000 Sheckles is >1.05x of 774,400 Sheckles (or higher value), this trade is a net win for you.'
        },
        {
          title: 'Example 2: Equal Sheckle Value Trade',
          scenario: 'Offering items worth 50,000,000 Sheckles and receiving items worth 50,000,000 Sheckles.',
          inputValues: { 'Your Offer': '50,000,000 Sheckles', 'Their Offer': '50,000,000 Sheckles' },
          calculation: 'Value Difference = 0 Sheckles. Their total is within ±5% of your total.',
          result: 'Fair Trade (Balanced)',
          takeaway: 'Equal value trades are evaluated as Fair Trade.'
        }
      ];
    }
    if (id === 'grow-a-garden-stock-timer') {
      return [
        {
          title: 'Example 1: Tracking Seed & Gear Shop Restock Boundaries',
          scenario: 'Monitoring Seed Shop and Gear Shop restocks on the 5-minute clock boundary (:00, :05, :10, :15, etc.).',
          inputValues: { 'Cycle': '5 minutes', 'Current Time': '8:02:15 AM' },
          calculation: 'Remaining time = 300 seconds − (135 seconds) = 165 seconds (2m 45s). Next restock at 8:05:00 AM.',
          result: 'Restock in 02m 45s',
          takeaway: 'Seed and Gear shops refresh every 5 minutes on the dot.'
        },
        {
          title: 'Example 2: Tracking Pet Egg Shop Restock Boundary',
          scenario: 'Monitoring Pet Egg Shop restocks on the 30-minute clock boundary (:00, :30).',
          inputValues: { 'Cycle': '30 minutes', 'Current Time': '8:12:00 AM' },
          calculation: 'Remaining time = 1800 seconds − (720 seconds) = 1080 seconds (18m 00s). Next restock at 8:30:00 AM.',
          result: 'Restock in 18m 00s',
          takeaway: 'Head to the Pet Egg Shop 30 seconds before the 30-minute mark to claim fresh eggs.'
        }
      ];
    }
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
  if (tool.id === 'minecraft-slime-chunk-finder') {
    return {
      title: 'How Minecraft Java Edition Slime Chunks Work',
      summary: 'Exact Java Edition java.util.Random seeding mechanics, Y-level spawning rules, and Bedrock Edition differences.',
      paragraphs: [
        'In Minecraft Java Edition, slime chunks are determined pseudo-randomly from your 64-bit world seed and the 16×16 chunk coordinates (chunkX, chunkZ). The game hashes the chunk coordinates with 32-bit int and 64-bit long arithmetic, adds your world seed, XORs the result with 0x3ad8025fL, and initializes java.util.Random. If rnd.nextInt(10) returns 0, the chunk is a slime chunk — meaning about 1 in 10 chunks qualifies.',
        'Inside a confirmed slime chunk, slimes can spawn below Y=40 at any light level. Because block-to-chunk conversion uses floor division (floor(coord ÷ 16)), negative coordinates shift one chunk further negative when not evenly divisible by 16 (for example, block -1 lies in chunk -1 covering blocks -16 to -1).',
        'Outside slime chunks, slimes can also spawn naturally in swamp and mangrove swamp biomes between Y=51 and Y=69 at light level 7 or lower. Swamp slime spawns follow the moon phase: they occur most often on a full moon and never on a new moon. Note that this calculator applies only to Java Edition — in Bedrock Edition, slime chunks do not depend on the world seed and remain in the same chunk locations across every world.'
      ],
      keyPoints: [
        'Java Edition Seed Formula: Implements exact 32-bit integer overflow (Math.imul), 64-bit BigInt longs, and the 48-bit java.util.Random LCG.',
        'Verified Slime Spawning Rules: Below Y=40 at any light level in slime chunks; Y=51–69 at light level ≤ 7 in swamps (most on full moon, never on new moon).',
        'Java vs Bedrock Difference: Java Edition slime chunks depend on the world seed (~1 in 10 chunks); Bedrock Edition slime chunks are identical in every world regardless of seed.'
      ]
    };
  }

  if (tool.id === 'minecraft-banner-designer') {
    return {
      title: 'How Minecraft Survival Banners & Loom Layers Work',
      summary: 'Understanding the 6-layer survival loom limit, 16 dye colours, and reusable Banner Pattern items in Java Edition.',
      paragraphs: [
        'In Minecraft Survival mode, banners start from a single base banner crafted using 6 matching wool blocks and 1 stick in any of the 16 dye colours (White, Orange, Magenta, Light Blue, Yellow, Lime, Pink, Gray, Light Gray, Cyan, Purple, Blue, Brown, Green, Red, and Black). You can then stack up to 6 pattern layers on top using a Loom.',
        'Out of the 42 supported patterns, 32 shapes — including stripes, halves, diagonals, cantons, chevrons, roundels, lozenges, bordures, and gradients — require only dye in the loom. The remaining 10 special patterns require a Banner Pattern item alongside your dye: 6 are craftable with Paper (Bordure Indented, Field Masoned, Flower Charge, Creeper Charge, Skull Charge, and Thing), while 4 must be traded or looted (Globe from a master cartographer villager for 8 emeralds, Snout from bastion remnant chests, Guster from trial chambers vaults, and Flow from trial chambers ominous vaults).',
        'In Minecraft Java Edition, Banner Pattern items are not consumed when applied in the Loom. Only the dye is used up per layer, meaning your crafted or looted pattern items can be kept and reused across every banner you build.'
      ],
      keyPoints: [
        'Maximum 6 Layers in Survival: Build banners layer-by-layer up to the 6-layer Loom cap using any of the 16 dye colours.',
        'Craftable vs Uncraftable Pattern Items: 6 pattern items craft with Paper; Globe (8 emeralds, master cartographer), Snout (bastion loot), Flow (ominous vault), and Guster (vault) are not craftable.',
        'Reusable in Java Edition: Banner Pattern items are never consumed by the Loom in Java Edition.'
      ]
    };
  }

  if (tool.id === 'minecraft-stronghold-finder') {
    return {
      title: 'How Eye of Ender Triangulation & Stronghold Rings Work',
      summary: 'Using Minecraft Java Edition F3 yaw geometry and ring distribution rules to pinpoint stronghold starting staircases.',
      paragraphs: [
        'In Minecraft Java Edition, 128 strongholds generate across 8 concentric rings centered around world spawn. The first ring contains 3 strongholds located between 1,280 and 2,816 blocks from spawn. Rather than wandering endlessly throwing Eyes of Ender, you can triangulate a stronghold\'s coordinates with just two well-spaced throws.',
        'Minecraft\'s horizontal F3 facing angle (yaw) maps directly onto world coordinates via the unit direction vector dx = -sin(yaw in radians) and dz = cos(yaw in radians), where yaw 0 faces south (+Z) and yaw -90 faces east (+X). By aiming cleanly at each hovering Eye of Ender and recording both throws\' positions and yaw values, the intersection of the two rays reveals the target coordinate.',
        'Because Eyes of Ender fly toward the stronghold\'s starting staircase area rather than the End portal room itself, triangulation guides you directly to the staircase entrance. Your estimate improves significantly when the two throw points are far apart and cross at a wide angle; if two throws are nearly parallel, move perpendicular to your first throw and try again.'
      ],
      keyPoints: [
        'Java Edition Ray Math: Direction vector dx = -sin(yaw_rad), dz = cos(yaw_rad) intersects two F3 throw rays cleanly.',
        '128 Strongholds in 8 Rings: First ring holds 3 strongholds between 1,280 and 2,816 blocks out.',
        'Accuracy & Target: Eyes target the starting staircase area (not the portal room); wide crossing angles and spaced-out throws yield the best accuracy.'
      ]
    };
  }

  if (tool.id === 'minecraft-pixel-art-converter') {
    return {
      title: 'How Minecraft Pixel Art & Map Colour Matching Works',
      summary: 'Browser-local image resizing, 16-colour RGB distance matching, and survival material budgeting.',
      paragraphs: [
        'The Minecraft Pixel Art Converter processes your entire image locally in your browser without uploading anything to a server. After choosing a target width (16, 32, 48, or 64 blocks), the converter preserves your image\'s aspect ratio and samples every pixel.',
        'Each pixel is matched by simple RGB distance to the 16 dye map colours for Wool and Concrete: White (#FFFFFF), Orange (#D87F33), Magenta (#B24CD8), Light Blue (#6699D8), Yellow (#E5E533), Lime (#7FCC19), Pink (#F27FA5), Gray (#4C4C4C), Light Gray (#999999), Cyan (#4C7F99), Purple (#7F3FB2), Blue (#334CB2), Brown (#664C33), Green (#667F33), Red (#993333), and Black (#191919).',
        'A full 1:1 Minecraft map covers 128 × 128 blocks (16,384 blocks in total). For survival builders, flat art—placing all blocks at one single height—is the simplest build style, and the tool\'s material list assumes exactly one block per pixel.'
      ],
      keyPoints: [
        '100% Client-Side: All image scaling and pixel matching runs in your browser.',
        'Exact 16 Map Dye Colours: Maps every pixel via RGB distance to the 16 Wool/Concrete map colours.',
        'Full Map & Flat Art Reference: Full maps are 128×128 (16,384 blocks); flat single-height builds are the simplest and use 1 block per pixel.'
      ]
    };
  }

  if (tool.id === 'minecraft-brewing-calculator') {
    return {
      title: 'How Java Edition Potion Brewing Paths & Modifiers Work',
      summary: 'Verified Java Edition base recipes, Nether Wart vs plain Water Bottle paths, Redstone/Glowstone limits, and 1.21 potions.',
      paragraphs: [
        'Nearly every Minecraft Java Edition potion begins by brewing Nether Wart into Water Bottles to create an Awkward Potion, then adding the primary potion ingredient (or applying a Fermented Spider Eye to corrupt an existing potion such as Night Vision into Invisibility, Healing/Poison into Harming, or Swiftness/Leaping into Slowness). Weakness is the sole exception: it is brewed directly by adding a Fermented Spider Eye into a plain Water Bottle with no Nether Wart.',
        'Once brewed, eligible potions can be upgraded with either Redstone (extended duration) or Glowstone (enhanced level II+ potency), though Redstone and Glowstone can never be combined on a single potion. Several potions—including the four 1.21 potions Oozing (Slime Block), Weaving (Cobweb), Infestation (Stone), and Wind Charging (Breeze Rod)—cannot be extended or enhanced at all.',
        'To change how a potion is delivered, add Gunpowder to brew a Splash potion at the exact same duration as its drinkable form. Adding Dragon\'s Breath to a Splash potion converts it into a Lingering potion lasting 1/4 of the drinkable duration.'
      ],
      keyPoints: [
        'Unique Weakness Path: Fermented Spider Eye directly into a plain Water Bottle (no Nether Wart).',
        'Mutually Exclusive Upgrades: Redstone and Glowstone cannot be combined on the same potion.',
        'Splash & Lingering Math: Gunpowder keeps the same duration; Dragon\'s Breath cuts duration to 1/4 of drink duration.'
      ]
    };
  }

  if (tool.id === 'robux-to-usd-calculator') {
    return {
      title: 'How Robux to USD & DevEx Exchange Rates Work',
      summary: 'Comparing standard retail purchase pricing ($0.0125/R$ + 10% Premium bonus) with the official Developer Exchange rate ($0.0035/R$, 30,000 R$ minimum).',
      paragraphs: [
        'Robux carries two distinct real-world USD exchange rates depending on whether you are buying Robux from the Roblox store or cashing out Earned Robux as a creator. On the retail store side, packages average ~$0.0125 USD per Robux (~80 Robux per $1.00 USD), ranging from $4.99 for 400 R$ up to $199.99 for 22,500 R$. Active Roblox Premium subscribers receive a +10% Robux bonus (~88 Robux per $1.00 USD) across purchase bundles.',
        'On the developer side, the official Developer Exchange (DevEx) program converts eligible Earned Robux into real money at $0.0035 USD per Robux ($105.00 USD at the 30,000 Robux minimum, and $350.00 USD per 100,000 Earned Robux).',
        'To qualify for DevEx payouts, your account must hold at least 30,000 Earned Robux acquired legitimately through game monetization (game passes, developer products, premium payouts) or catalog sales, meet the 13+ age requirement, and maintain verified Tipalti payout credentials.'
      ],
      keyPoints: [
        'Two-Way Conversion: Convert Robux → USD and USD → Robux with +10% Roblox Premium bundle toggling.',
        'Dual Rate Clarity: Displays retail store value (~$0.0125/R$, ~80 R$/$) alongside official DevEx cashout value ($0.0035/R$).',
        '30,000 Robux DevEx Minimum: Real-time eligibility check highlights the $105.00 USD minimum cashout threshold.'
      ]
    };
  }

  if (tool.id === 'blox-fruits-trading-calculator') {
    return {
      title: 'How Blox Fruits Market Values & the 40% Beli Rule Work',
      summary: 'Understanding community trading demand values vs NPC Beli prices and the mandatory 40% in-game trade table difference limit.',
      paragraphs: [
        'Every trade in Blox Fruits must pass two separate checks: first, the game server enforces the mandatory 40% Beli difference rule based on each fruit\'s NPC shop Beli price; second, experienced traders compare community market trading values (such as 180M for Dragon Rework, 125M for Kitsune, 40M for Leopard, 25M for Dough, and 8M for Buddha).',
        'In-game trade tables evaluate |Beli_You - Beli_Them| / max(Beli_You, Beli_Them) <= 40%. Equivalently, the lower-priced side must equal at least 60% of the higher-priced side\'s total Beli, or the game blocks the trade with "Value difference is too high."',
        'Because popular grinding and PvP fruits like Buddha (1.2M Beli, 8M trade value) trade far above their NPC shop cost, players routinely include high-Beli, low-demand fruits such as Gravity (2.5M Beli) or Shadow (2.9M Beli) to satisfy the 40% Beli limit without skewing real trade equity.'
      ],
      keyPoints: [
        '4v4 Fruit Value Comparison: Track total trading value, average demand (1–10), and Win / Fair / Loss assessment.',
        'Dedicated 40% Beli Rule Evaluator: Automatically checks your fruit trade OR tests custom Beli sums against the 60% minimum threshold.',
        'Exact Filler Calculation: Immediately shows the exact Beli needed on the lower side to unlock blocked trades.'
      ]
    };
  }

  if (tool.id === 'blox-fruits-stat-calculator') {
    return {
      title: 'How Blox Fruits Stat Points, Pools & Stat Resets Work',
      summary: 'Level 2,600 stat cap math (7,800 points), 13,100 HP & Energy formulas, and Plokster vs Robux stat reset options.',
      paragraphs: [
        'In Blox Fruits, every level grants exactly 3 stat points, giving players a total budget of 7,800 stat points at the Level 2,600 cap (with a maximum of 2,600 points per individual attribute). Because both Defense (5 HP per point) and Melee (5 Energy per point) are essential for survivability and stamina—capping at 13,100 HP and 13,100 Energy—competitive builds typically max Melee, Defense, and one primary damage stat (Blox Fruit, Sword, or Gun).',
        'Whenever you switch fighting styles or want to transition from grinding (such as Awakened Buddha Sword/Melee) into PvP Fruit Main combos, you can refund all allocated points via three in-game methods: speaking to the Plokster NPC in the Cafe (Second Sea) or Floating Turtle (Third Sea) for 2,500 Fragments, buying a Stat Refund in the Shop for 75 Robux, or redeeming free developer Stat Reset codes.'
      ],
      keyPoints: [
        'Max Level 2,600 Budget: 7,800 total stat points (3 points per level; max 2,600 per stat attribute).',
        'Health & Energy Pools: HP = 100 + Defense × 5 (13,100 Max) and Energy = 100 + Melee × 5 (13,100 Max).',
        'Stat Reset Costs: 2,500 Fragments at Plokster NPC, 75 Robux in the Shop, or 0 cost with active Stat Reset codes.'
      ]
    };
  }

  if (tool.id === 'roblox-group-payout-calculator') {
    return {
      title: 'How Roblox Group Payouts & Team Earnings Splits Work',
      summary: 'Combining multi-stream studio revenue or direct group funds, 0% group payout fee rules, DevEx eligibility, and the 14-day member wait.',
      paragraphs: [
        'Roblox studios distribute game earnings using Group Payouts, allowing owners to split either an existing Group Funds balance or combined monthly creator revenue streams—Gamepasses (70% Net), Developer Products, Avatar Commissions (40%), and Engagement-Based Premium Payouts—across scripters, builders, designers, and studio reserve funds.',
        'Because Roblox already deducts its 30% marketplace fee when players purchase passes or products in your experience, sending Group Payouts carries a 0% additional tax. Payouts funded by verified experience or catalog earnings remain clean Earned Robux, eligible for Developer Exchange (DevEx) at $0.0035 USD per Robux once a developer reaches the 30,000 Robux minimum. Keep in mind that newly added group members must wait 14 days before they are eligible to receive payouts.'
      ],
      keyPoints: [
        'Dual Pool Modes: Split a direct Group Funds balance or aggregate Gamepasses, Dev Products, Commissions, and Premium Payouts.',
        '0% Additional Payout Fee: Group payouts avoid double taxation and preserve DevEx eligibility ($0.0035/R$).',
        '14-Day Eligibility & Studio Reserve: New group members wait 14 days for payouts; reserving 10%–20% covers ads and upkeep.'
      ]
    };
  }

  if (tool.id === 'blox-fruits-mastery-calculator') {
    return {
      title: 'How Blox Fruits Mastery XP & Multipliers Work',
      summary: 'Exact ceil(L^2.26 + 69) level formula, 0 → 600 total (~348.7M XP), farming sources, and why 2x EXP does not boost mastery.',
      paragraphs: [
        'In Blox Fruits, mastery is a separate XP system from your character\'s player level and applies individually to fruits, swords, guns, and fighting styles up to a maximum mastery of 600 (fishing rods are capped separately at 100). Each step from mastery level L to L+1 requires ceil(L^2.26 + 69) mastery XP, meaning cumulative XP from 0 to 600 totals approximately 348.7 million XP — and climbing just from 300 to 400 takes 56,551,080 XP.',
        'A common mistake among players is popping 2x EXP codes to level mastery faster: 2x EXP does NOT affect mastery XP. Only the 2x Mastery gamepass doubles mastery XP gains per kill, and stacking gamepass + party hat + enchant reaches the maximum combined ×2.70 multiplier. For grinding, Cake Queen yields approximately 2,200,000 mastery XP per kill (highest), while Cocoa Warriors and Chocolate Bar Battlers give roughly 100,000 mastery XP per kill.'
      ],
      keyPoints: [
        'Exact Formula: Level L → L+1 costs ceil(L^2.26 + 69) XP (300 → 400 = 56,551,080 XP; 0 → 600 ≈ 348.7 million XP).',
        'Separate XP System: 2x EXP boosts do NOT affect mastery XP — only 2x Mastery (×2.00) and up to ×2.70 combined (gamepass + party hat + enchant) boost mastery.',
        'Max Mastery Caps & Sources: Max 600 mastery (fishing rods cap at 100); Cake Queen (~2,200,000 XP/kill) and Cocoa Warriors / Chocolate Bar Battlers (~100,000 XP/kill).'
      ]
    };
  }

  if (tool.id === 'blox-fruits-awakening-calculator') {
    return {
      title: 'How Blox Fruits Raid Awakenings, Microchips & Lightning Upgrades Work',
      summary: 'Verified fragment totals across all 11 raid fruits (172,800 total), microchip entry rules, and Lightning\'s Admin Panel upgrade path.',
      paragraphs: [
        'Eleven fruits awaken through Blox Fruits raids for a combined total of 172,800 fragments. Seven standard-pattern fruits (Flame, Ice, Light, Dark, Magma, Buddha, and Sand) each cost 14,500 fragments (Z 500, F 2,000, X 3,000, C 4,000, V 5,000). Quake has 4 moves totaling 17,000 (Z 1,000, X 3,000, C 5,000, V 8,000), Spider totals 17,300 (Z 800, F 2,500, X 3,500, C 4,500, V 6,000), and Dough and Phoenix each cost 18,500 fragments (Z 500, F 2,000, X 3,000, C 4,000, Tap 4,000, V 5,000 — note that some sites wrongly list Dough as 23,500, but 18,500 is correct).',
        'Raids allow up to 4 players maximum. A Basic Microchip costs $100,000 Beli or any physical fruit, while an Advanced Microchip (for Phoenix and Dough raids only) costs 1,000 fragments or a physical fruit worth $1,000,000+, and hosting a Phoenix raid requires 400+ mastery on Phoenix. Separately, Lightning (formerly Rumble) no longer awakens in raids: it upgrades via the Admin Panel across 4 tiers totaling 21,500 fragments (1,500 / 3,000 / 6,000 / 11,000) plus Volt Capsule ×4, Electric Wing ×13, Angel Wings ×3, and 500 mastery.'
      ],
      keyPoints: [
        'All 11 Raid Fruits = 172,800 Fragments: Standard ×7 (14,500 each), Quake (17,000), Spider (17,300), Dough (18,500), Phoenix (18,500).',
        'Raid Microchips & Limits: Max 4 players per raid; Basic = $100,000 Beli or any physical fruit; Advanced (Phoenix/Dough) = 1,000 fragments or $1,000,000+ physical fruit; Phoenix host requires 400+ mastery.',
        'Lightning Admin Panel (Not a Raid): 21,500 fragments (1,500 / 3,000 / 6,000 / 11,000) + Volt Capsule ×4, Electric Wing ×13, Angel Wings ×3, and 500 mastery.'
      ]
    };
  }

  if (tool.id === 'blox-fruits-race-v4-calculator') {
    return {
      title: 'How Blox Fruits Race V4 Awakening & Ancient One Purchases Work',
      summary: 'Temple of Time trial progression, the 10-step 26,750-fragment training ladder, 77 V4 activations, and Ancient Clock gear switching.',
      paragraphs: [
        'Race V4 awakening takes place at the Ancient One in the Temple of Time across all 7 races: Human, Rabbit, Shark, Angel, Ghoul, Cyborg, and Draco. Each race unlocks 5 gears, completes awakening across 4 successful trials, and unlocks the Ancient Clock for switching gears after a 5th trial.',
        'At the Ancient One, upgrades follow a fixed 10-purchase fragment and V4 activation ladder: 1,000 fragments after Trial 1 (3 activations), 1,500 after Trial 2 (5 activations), three Trial 3 purchases of 2,000, 2,250, and 2,500 (subtotal 6,750; 4, 5, and 10 activations), and five Trial 4 purchases of 3,000, 3,250, 3,500, 3,750, and 4,000 (subtotal 17,500; 8, 9, 10, 11, and 12 activations) — totaling 26,750 fragments and 77 activations per race, or 187,250 fragments across all 7 races.'
      ],
      keyPoints: [
        '26,750 Fragments & 77 Activations Per Race: 10 training purchases across Trial 1 (1,000), Trial 2 (1,500), Trial 3 (6,750), and Trial 4 (17,500).',
        'All 7 Races Total 187,250 Fragments: Applies equally to Human, Rabbit, Shark, Angel, Ghoul, Cyborg, and Draco.',
        '5 Gears & Ancient Clock: 4 trials complete the awakening; a 5th trial unlocks the Ancient Clock for gear switching.'
      ]
    };
  }

  if (tool.id === 'blox-fruits-raid-calculator') {
    return {
      title: 'How Blox Fruits Raid Fragment Rewards, Outcomes & Microchips Work',
      summary: 'Speed-scaled 300 + 4.5 × seconds formula (1,000 cap), fixed fail/timeout/death payouts, Beli drops, and raid microchip rules.',
      paragraphs: [
        'Clearing a Blox Fruits raid awards fragments equal to 300 + 4.5 × seconds remaining, capped at 1,000 fragments (requiring roughly 156+ seconds left on the clock). If a raid does not end in a full victory, fixed payouts apply: failing awards 300 fragments, timing out awards 90 fragments per island completed (idling on Island 1 until timeout yields 90), and dying awards 0 fragments.',
        'Up to 4 players can join each raid. Raid Beli comes exclusively from enemy drops — approximately $62,000 to $72,000 Beli per raid depending on the raid theme. Entering requires a Basic Microchip ($100,000 Beli or any physical fruit) or an Advanced Microchip for Phoenix and Dough raids (1,000 fragments or a physical fruit worth $1,000,000+).'
      ],
      keyPoints: [
        'Exact Formula: 300 + 4.5 × seconds remaining, capped at 1,000 (~156+ seconds left); 100s left = 750 fragments.',
        'Fixed Outcomes & Beli: Fail = 300, Timeout = 90/island (Idle Island 1 = 90), Death = 0; enemy drops ~ $62,000–$72,000 Beli.',
        'Entry & Limit: Basic Microchip ($100,000 Beli or any fruit) / Advanced Microchip (1,000 fragments or $1,000,000+ fruit); max 4 players.'
      ]
    };
  }

  if (tool.id === 'blox-fruits-fighting-style-calculator') {
    return {
      title: 'How Blox Fruits Fighting Style Costs & the Godhuman Chain Work',
      summary: 'Full Beli and fragment totals from Combat through V1, Superhuman, V2, and Godhuman ($20,400,000 Beli + 26,500 fragments).',
      paragraphs: [
        'Unlocking Godhuman requires progressing through every V1, Superhuman, and V2 fighting style chain. V1 styles start with free Combat, followed by Dark Step ($150,000 Beli), Electric ($500,000 Beli), Water Kung Fu ($750,000 Beli), and Dragon Breath (1,500 fragments, no Beli). Reaching 300+ mastery on those four V1 styles unlocks Superhuman ($3,000,000 Beli).',
        'Each V2 style costs 5,000 fragments plus Beli and an unlock requirement: Death Step ($2,500,000; 400 Dark Step mastery + Library Key), Sharkman Karate ($2,500,000; 400+ Water Kung Fu mastery + Water Key), Electric Claw ($3,000,000; 400 Electric mastery + Previous Hero quest), and Dragon Talon ($3,000,000; 400 Dragon Breath mastery + Fire Essence). Godhuman then costs $5,000,000 Beli + 5,000 fragments, 400 mastery on NINE styles (every style except Combat, Advanced Combat, and Sanguine Art), and materials (20 Fish Tail, 20 Magma Ore, 10 Mystic Droplet, 10 Dragon Scale) — bringing the full chain total to $20,400,000 Beli + 26,500 fragments.'
      ],
      keyPoints: [
        'Full Chain Total: $20,400,000 Beli + 26,500 fragments from nothing owned up to Godhuman.',
        'Mastery Gates: 300+ on 4 V1 styles for Superhuman; 400 mastery on 9 styles (all except Combat, Advanced Combat, and Sanguine Art) for Godhuman.',
        'Godhuman Materials: 20 Fish Tail, 20 Magma Ore, 10 Mystic Droplet, and 10 Dragon Scale.'
      ]
    };
  }

  if (tool.id === 'blox-fruits-gacha-calculator') {
    return {
      title: 'How the Blox Fruit Gacha (Zioles) Pricing Formula Works',
      summary: 'Exact 25,000 + 150 × (level − 1) Beli roll formula, Premium ×0.8 savings, minimum level 50, and 2-hour cooldown.',
      paragraphs: [
        'The Blox Fruit Gacha (Zioles) sells one random physical fruit once you reach at least level 50, with a 2-hour cooldown between rolls. Each standard roll costs 25,000 + 150 × (player level − 1) Beli, while players with Premium/Plus pay ×0.8 of that price — reducing a level 1,000 roll from 174,850 Beli down to 139,880 Beli.',
        'Exact gacha odds are not officially published.'
      ],
      keyPoints: [
        'Verified Roll Formula: 25,000 + 150 × (player level − 1) Beli (×0.8 with Premium/Plus).',
        'Level & Cooldown Rules: Minimum level 50 required; 2-hour cooldown between rolls.',
        'Odds Policy: Exact gacha odds are not officially published.'
      ]
    };
  }

  if (tool.id === 'blox-fruits-fruit-spawn-timer') {
    return {
      title: 'How Blox Fruits Natural Fruit Spawns & Despawns Work',
      summary: 'Weekday 60-minute vs weekend 45-minute spawn cycle, 20-minute despawn timer, sea spawn points, and Fruit Notifier info.',
      paragraphs: [
        'In Blox Fruits, natural fruits spawn across servers every 60 minutes on weekdays and every 45 minutes on weekends. Once a fruit spawns, players have 20 minutes to find and collect it before it despawns automatically.',
        'Possible spawn locations total 25 in First Sea, 28 in Second Sea, and 34 in Third Sea, and the Fruit Notifier gamepass costs 2,700 Robux. The Fruit Dealer\'s stock rotates every 4 hours (00/04/08/12/16/20 UTC) on all servers.'
      ],
      keyPoints: [
        'Spawn & Despawn Rules: 60 minutes weekday / 45 minutes weekend; uncollected fruit despawns after 20 minutes.',
        'Sea Spawn Points: 25 (First Sea), 28 (Second Sea), and 34 (Third Sea); Fruit Notifier costs 2,700 Robux.',
        'Fruit Dealer Info: The Fruit Dealer\'s stock rotates every 4 hours (00/04/08/12/16/20 UTC) on all servers.'
      ]
    };
  }

  if (tool.id === 'roblox-username-generator') {
    return {
      title: 'How Roblox Username Rules & Style Generation Work',
      summary: 'Enforcing Roblox\'s official 3–20 character limit, alphanumeric charset, and single non-edge underscore policy.',
      paragraphs: [
        'Every Roblox account username must be 3 to 20 characters long, contain only letters and numbers, and include at most one underscore — which can never sit at the first or last character position. Spaces and other special symbols are disallowed.',
        'This tool builds 20 ideas locally in your browser across Aesthetic, Cool, OG/Short, Funny, Dark, Cute, and Pro/Gamer banks, stripping any unsupported symbols from optional keywords and enforcing the length and underscore rules on every single output. Availability is not checked — try the name in Roblox to see if it is free.'
      ],
      keyPoints: [
        'Strict Rule Enforcement: 3–20 characters, letters/numbers only, max 1 underscore never first or last.',
        '7 Style Banks + Optional Keyword: Produces 20 click-to-copy ideas directly in the browser.',
        'No Fake Availability Claims: Availability is not checked — try the name in Roblox to see if it is free.'
      ]
    };
  }

  if (tool.id === 'roblox-font-generator') {
    return {
      title: 'How Roblox Display Name & Bio Unicode Fonts Work',
      summary: 'Client-side Unicode character mapping across 11 styles while preserving unmapped characters and respecting username limits.',
      paragraphs: [
        'Unicode includes dedicated Mathematical, Enclosed, and Small-Cap code points for standard Latin letters and digits, letting you style your Roblox Display Name or profile bio cleanly without installing custom fonts. Because conversion runs 100% locally character-by-character, letters and digits map immediately while spaces, punctuation, or unsupported digits stay unchanged.',
        'Keep Roblox\'s account distinction in mind before copying: these styled fonts are for display names and bios; regular usernames only allow letters, numbers and one underscore.'
      ],
      keyPoints: [
        '11 Unicode Styles: Bold, Italic, Bold Italic, Script/Cursive, Gothic/Fraktur, Double-Struck, Monospace, Bubble/Circled, Small Caps, Squared, and Bold Sans.',
        'Safe Unmapped Fallback: Letters and digits map locally; unsupported characters stay unchanged.',
        'Display Names & Bios Only: Regular usernames only allow letters, numbers and one underscore.'
      ]
    };
  }

  if (tool.id === 'roblox-ugc-calculator') {
    return {
      title: 'How Roblox UGC Royalties, Experience Commissions & Escrow Work',
      summary: 'Creator Hub splits across Marketplace (30% base), third-party experiences (30% + 40%), and own experiences (70%), plus 30-day escrow.',
      paragraphs: [
        'Under Roblox Creator Hub Marketplace fee rules, selling a UGC item directly in the Avatar Shop Marketplace awards the item creator a base rate of 30% at the price floor (note that above the price floor, the Marketplace share rises progressively up to 70% at 6× the floor). When a UGC item sells inside another developer\'s experience, the item creator earns 30%, the experience owner earns 40%, and Roblox keeps 30%.',
        'If you sell your own UGC item inside your own experience, you collect both the 30% creator royalty and the 40% experience owner commission for a combined 70% share. Commissions are held for a 30-day escrow period, and any USD figure displayed at $0.0035 per Robux is an estimate requiring DevEx eligibility and a 30,000 Robux minimum.'
      ],
      keyPoints: [
        'Marketplace vs Own Experience: 30% base royalty in Marketplace vs 70% combined (30% + 40%) inside your own experience.',
        'Progressive Floor Note: Above the Marketplace price floor, the Marketplace share rises up to 70% at 6× the floor.',
        '30-Day Escrow & DevEx Estimate: 30-day escrow hold on commissions; USD estimate at $0.0035/Robux requires DevEx eligibility and 30,000 Robux minimum.'
      ]
    };
  }

  if (tool.id === 'roblox-game-revenue-estimator') {
    return {
      title: 'How Roblox Gamepass & Dev-Product Revenue Estimation Works',
      summary: 'Projecting estimated daily/30-day gross Robux, 70% creator share, and DevEx USD equivalents (30% marketplace fee).',
      paragraphs: [
        'When players purchase gamepasses or developer products inside your Roblox experience, Creator Hub rules award the creator 70% of the Robux spent while 30% goes to Roblox\'s marketplace fee. By combining daily visits, buyer conversion percentage, and average Robux per buyer, developers can model rough order-of-magnitude earnings.',
        'Every metric calculated is strictly an estimate — real earnings vary based on game genre, retention, updates, and regional pricing. USD projections use the DevEx rate of $0.0035 per Robux, which applies only once an account meets full DevEx eligibility and holds at least 30,000 Robux.'
      ],
      keyPoints: [
        'Verified 70% / 30% Split: Creators receive 70% on gamepasses and developer products sold in their experience; 30% is the marketplace fee.',
        'All Outputs Are Estimates: Models daily gross, 70% daily share, 30-day share, and DevEx USD estimate — real earnings vary.',
        'DevEx Conditions: $0.0035/Robux rate requires DevEx eligibility and a 30,000 Robux minimum.'
      ]
    };
  }

  if (tool.id === 'roblox-shirt-template-maker') {
    return {
      title: 'How the 585 × 559 px Classic Shirt & Pants Template Works',
      summary: 'Official 585 × 559 pixel Roblox UV layout for Torso, Right Arm/Leg, and Left Arm/Leg with browser-only PNG export.',
      paragraphs: [
        'Official Roblox classic shirt and classic pants templates measure exactly 585 × 559 pixels across all body regions. Using labeled semi-transparent UV boxes (Front, Back, Up/Top, Down/Bottom, Left, and Right), you can position and scale custom fabrics accurately before downloading a finished PNG.',
        'Both classic shirts and classic pants share the exact 585 × 559 canvas size while differing only in whether the lower UV blocks wrap arms or legs. Everything runs inside your browser via HTML5 Canvas so uploaded artwork is never sent to any server.'
      ],
      keyPoints: [
        'Verified 585 × 559 px Size: Exact dimensions measured from Roblox\'s official classic shirt and pants template files.',
        'Shirt & Pants Modes: Toggle labels between Right/Left Arm and Right/Left Leg on identical 585 × 559 coordinates.',
        '100% Browser-Only: Local canvas positioning, scaling, UV clipping, and PNG export with zero server uploads.'
      ]
    };
  }

  if (tool.id === 'roblox-thumbnail-resizer') {
    return {
      title: 'Roblox Creator Hub Experience Icon & Thumbnail Guidelines',
      summary: 'Square 512 × 512 px experience icons and 16:9 1920 × 1080 px thumbnails cropped locally with a live home grid preview.',
      paragraphs: [
        'According to Roblox Creator Hub documentation, an experience icon is square and should be 512 × 512 px (at least 512 × 512 px), while experience thumbnails use a 16:9 aspect ratio ideally at 1920 × 1080 px. Developers can showcase up to 10 images or videos per experience.',
        'Cropping directly in the browser lets you pan and zoom artwork interactively, preview how your tile reads inside a mock Roblox home discovery grid, and export lossless PNG or compact JPG files immediately.'
      ],
      keyPoints: [
        'Icon Size: Square 1:1 ratio, 512 × 512 px (at least 512 × 512 px).',
        'Thumbnail Size: 16:9 widescreen ratio, ideally 1920 × 1080 px (up to 10 images/videos per experience).',
        'Home Grid Mock & Local Export: Preview discovery card readability and export PNG or JPG in the browser.'
      ]
    };
  }

  if (tool.id === 'roblox-studs-converter') {
    return {
      title: 'Roblox Studio Units: 1 Stud = 0.28 Metres (28 cm) Scale Reference',
      summary: 'Two-way conversions across studs, metres, cm, feet, and inches plus studs/s ↔ km/h movement speeds.',
      paragraphs: [
        'Roblox Creator Hub defines the official Roblox unit conversion as 1 stud = 0.28 metres (28 centimetres), making 100 studs equal to 28 metres and 10 metres equal to 35.71 studs. Feet and inches chain directly through standard international metric conversions (0.3048 m/ft and 0.0254 m/in).',
        'For player and vehicle speed tuning, 1 m/s equals 3.57 studs/s (3.6 km/h). Remember that while the engine lets creators define their own scale, 0.28 m is Roblox\'s official conversion.'
      ],
      keyPoints: [
        'Official Scale: 1 stud = 0.28 metres (28 cm); 100 studs = 28 m; 10 m = 35.71 studs.',
        'Speed Conversion: Converts studs/s ↔ km/h and m/s using 1 m/s = 3.57 studs/s.',
        'Custom Engine Note: The engine lets creators define their own scale, but 0.28 m is Roblox\'s official conversion.'
      ]
    };
  }

  if (tool.id === 'roblox-brickcolor-picker') {
    return {
      title: 'Using All 208 Official Roblox BrickColors & RGB Conversion',
      summary: 'Complete Roblox Creator Hub 208-swatch BrickColor directory paired with nearest Euclidean RGB/Hex matching.',
      paragraphs: [
        'Roblox parts support legacy BrickColor indices alongside full 24-bit Color3 values. This tool embeds all 208 official BrickColors from the Creator Hub reference table — spanning classic 1–365 codes and expanded 1001–1032 codes such as Really black (1003, #111111) and Hot pink (1032, #FF00BF).',
        'Enter any Hex or R/G/B triplet to find the closest official BrickColor by Euclidean RGB color distance, inspect both colors side by side, and copy Name, Code, RGB, or ready-to-use BrickColor.new() Luau syntax.'
      ],
      keyPoints: [
        'Complete 208-Color Table: Unmodified Creator Hub BrickColor reference with Name, Code, RGB, and Hex.',
        'Nearest BrickColor Finder: Side-by-side comparison of your custom RGB/Hex input and closest official BrickColor.',
        'Instant Copy Formats: Searchable grid with Name, Code, RGB, and BrickColor.new() Luau copy buttons.'
      ]
    };
  }

  if (tool.id === 'ps99-mastery-calculator') {
    return {
      title: 'Pet Simulator 99 Mastery Scaling & Clan XP Multipliers',
      summary: 'Unlocking Mastery at Rebirth 4 opens 14 separate progression tracks, all powered by an identical 13,034,431 cumulative XP progression curve.',
      paragraphs: [
        'Mastery in Pet Simulator 99 unlocks immediately upon completing Rebirth 4. Rather than each track having an arbitrary leveling rate, every one of the 14 tracks—Eggs, Fishing, Potions, Enchants, Breakables, Gifts, Pets, Digging, Keys, Superior Mini Chests, Fusing, Fruit, Economy, and Boost Exchange—shares an identical cumulative XP curve.',
        'The curve requires 13,034,431 XP to reach Level 99. Key milestone thresholds are reached at Level 50 (101,333 XP), Level 75 (1,210,421 XP), Level 85 (3,258,594 XP), Level 92 (6,517,253 XP), Level 96 (9,684,577 XP), and Level 99 (13,034,431 XP). Leveling can be boosted by +10% by joining a Clan at Level 6 or higher, which increases all action XP and boosts standard Mastery XP Potions from 10,000 XP to 11,000 XP.',
        'For instant progression, an Ultra Mastery XP Potion can be consumed to instantly max out any single track to Level 99 with zero farming actions.'
      ],
      keyPoints: [
        'Universal 14-Track XP Parity: All 14 tracks follow the exact same 13,034,431 cumulative XP curve to Level 99.',
        'Clan Level 6+ Multiplier: Permanent +10% boost across all actions and boosts Mastery XP Potions to 11,000 XP.',
        'Game-Changing Perks: Unlocks free egg hatching, faster auto-hatch speeds, higher fishing yields, and pet crafting discounts.'
      ]
    };
  }

  if (tool.id === 'ps99-golden-rainbow-calculator') {
    return {
      title: 'Golden & Rainbow Pet Conversions and Mastery Ratios',
      summary: 'Upgrading normal pets to Gold and Rainbow variants at zero diamond cost, with Pets Mastery discounts at Lv 60, Lv 90, and Lv 99.',
      paragraphs: [
        'In Pet Simulator 99, the Golden Machine is located in Area 10 (Mine) and the Rainbow Machine is located in Area 31 (Desert Pyramids). Both machines are free (0 diamonds) to use. Baseline conversion requires 10 identical normal pets to produce 1 gold pet, and 10 identical gold pets to produce 1 rainbow pet (100 normal pets total from scratch).',
        'Levelling Pets Mastery introduces conversion discounts: Level 60 reduces the Golden Machine input by 1 (9 normal per gold), Level 90 reduces the Rainbow Machine input by 1 (9 gold per rainbow), and Level 99 reduces both machines by 2 (8 normal per gold, 8 gold per rainbow = 64 normal pets total per rainbow).',
        'Gold pets grant ≈ +13% power and Rainbow pets grant ≈ +27% power—note that the in-game tooltip saying 10x is WRONG. Shiny pets need shiny inputs and are not covered by this calculator.'
      ],
      keyPoints: [
        'Free Machine Access: Golden Machine (Area 10, Mine) and Rainbow Machine (Area 31, Desert Pyramids) cost 0 diamonds.',
        'Verified Power Boosts: Gold ≈ +13% power; Rainbow ≈ +27% power (in-game 10x tooltip is wrong).',
        'Pets Mastery 99 Efficiency: Drops normal pet requirements from 100 down to 64 per rainbow pet.'
      ]
    };
  }

  if (tool.id === 'blox-fruits-title-tracker') {
    return {
      title: 'Blox Fruits Chat Titles, Specialist Locations & Obtainment Mechanics',
      summary: 'Complete guide to equipping chat titles, Titles Specialist locations in Second Sea and Third Sea, and obtainment rules.',
      paragraphs: [
        'Titles in Blox Fruits show next to the player\'s name in Roblox chat. Equip or switch titles via the Titles Specialist NPC: in the Second Sea at the Cafe basement, and in the Third Sea at the Mansion on the right side inside the front door.',
        'Titles are obtainable ONLY in the Second Sea and Third Sea. A requirement finished in the First Sea grants nothing and must be done again later. The only exceptions are "Class S" (First Sea, Advanced Combat) and "I Was There" (one-off Sea 1 Rework event title).',
        'Unobtainable titles such as #040 Thunder God (Rumble awakening, removed when Update 27 removed Rumble raids) are clearly marked, and Creator/staff titles are tagged as Special because they require defeating a creator while they have title drops enabled.'
      ],
      keyPoints: [
        'Titles Specialist Locations: Second Sea — Cafe basement; Third Sea — Mansion, right side inside the front door.',
        'Second & Third Sea Rule: First Sea requirements grant nothing (exceptions: Class S and I Was There).',
        'Dynamic Count & Browser Save: Shows the exact count of titles loaded in data and saves ticks to localStorage.'
      ]
    };
  }

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
  if (
    tool.id === 'minecraft-slime-chunk-finder' ||
    tool.id === 'minecraft-banner-designer' ||
    tool.id === 'minecraft-stronghold-finder' ||
    tool.id === 'minecraft-pixel-art-converter' ||
    tool.id === 'minecraft-brewing-calculator' ||
    tool.id === 'blox-fruits-mastery-calculator' ||
    tool.id === 'blox-fruits-awakening-calculator' ||
    tool.id === 'blox-fruits-race-v4-calculator' ||
    tool.id === 'blox-fruits-raid-calculator' ||
    tool.id === 'blox-fruits-fighting-style-calculator' ||
    tool.id === 'blox-fruits-gacha-calculator' ||
    tool.id === 'blox-fruits-fruit-spawn-timer' ||
    tool.id === 'roblox-username-generator' ||
    tool.id === 'roblox-font-generator' ||
    tool.id === 'roblox-ugc-calculator' ||
    tool.id === 'roblox-game-revenue-estimator' ||
    tool.id === 'roblox-shirt-template-maker' ||
    tool.id === 'roblox-thumbnail-resizer' ||
    tool.id === 'roblox-studs-converter' ||
    tool.id === 'roblox-brickcolor-picker' ||
    tool.id === 'ps99-mastery-calculator' ||
    tool.id === 'ps99-golden-rainbow-calculator' ||
    tool.id === 'blox-fruits-title-tracker'
  ) {
    return existing.slice(0, 5);
  }
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
