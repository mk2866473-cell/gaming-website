/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GameCode {
  code: string;
  reward: string;
  expires?: string;
}

export interface DailyLink {
  label: string;
  url: string;
  date: string;
}

export interface CodesPageData {
  slug: string;
  gameName: string;
  gameHubPath: string;
  kind: 'codes' | 'links' | 'status';
  intro: string;
  codes: GameCode[];
  unconfirmed?: GameCode[];
  links?: DailyLink[];
  linksNote?: string;
  redeemSteps: string[];
  note?: string;
  relatedToolPath: string;
  relatedToolLabel: string;
  lastChecked: string;
}

export const CODES_PAGES: CodesPageData[] = [
  // Entry A — Blox Fruits
  {
    slug: 'blox-fruits',
    gameName: 'Blox Fruits',
    gameHubPath: '/games/roblox',
    kind: 'codes',
    lastChecked: '11 November 2026',
    relatedToolPath: '/tools/blox-fruits-xp-calculator',
    relatedToolLabel: 'Blox Fruits XP Calculator',
    intro:
      'All active Blox Fruits codes in one place. Most give 2x EXP boosts or free stat resets — redeem them before they expire, and stack a 2x EXP code before a long grinding session.',
    codes: [
      { code: 'SUB2GAMERROBOT_EXP1', reward: '2x EXP for 30 minutes' },
      { code: 'EASTEREXP', reward: '2x EXP for 20 minutes' },
      { code: 'AXIORE', reward: '2x EXP for 20 minutes' },
      { code: 'THEGREATACE', reward: '2x EXP for 20 minutes' },
      { code: 'Starcodeheo', reward: '2x EXP for 20 minutes' },
      { code: 'Bluxxy', reward: '2x EXP for 20 minutes' },
      { code: 'SUB2OFFICIALNOOBIE', reward: '2x EXP for 20 minutes' },
      { code: 'Sub2NoobMaster123', reward: '2x EXP for 20 minutes' },
      { code: 'Sub2Daigrock', reward: '2x EXP for 20 minutes' },
      { code: 'Sub2CaptainMaui', reward: '2x EXP for 20 minutes' },
      { code: 'Enyu_is_Pro', reward: '2x EXP for 20 minutes' },
      { code: 'Magicbus', reward: '2x EXP for 20 minutes' },
      { code: 'JCWK', reward: '2x EXP for 20 minutes' },
      { code: 'TantaiGaming', reward: '2x EXP for 20 minutes' },
      { code: 'StrawHatMaine', reward: '2x EXP for 20 minutes' },
      { code: 'kittgaming', reward: '2x EXP for 20 minutes' },
      { code: 'SUB2GAMERROBOT_RESET1', reward: 'Free stat reset' },
      { code: 'KITT_RESET', reward: 'Free stat reset' },
      { code: 'Sub2UncleKizaru', reward: 'Free stat reset' },
      { code: 'BIGNEWS', reward: '"Big News" in-game title' },
      { code: 'FUDD10', reward: '1 Beli' },
      { code: 'fudd10_v2', reward: '2 Beli' },
      { code: 'CHANDLER', reward: '0 Beli (joke code)' }
    ],
    unconfirmed: [
      {
        code: 'LIGHTNINGABUSE',
        reward: '2x EXP for 20 minutes (trackers disagree — worth a try)'
      }
    ],
    redeemSteps: [
      'Open Blox Fruits and pick a side (Pirates or Marines).',
      'Tap the Settings gear icon.',
      "Select 'Redeem DLC Code' / Codes.",
      'Type or paste the code exactly as shown and press Redeem.'
    ]
  },

  // Entry B — Type Soul
  {
    slug: 'type-soul',
    gameName: 'Type Soul',
    gameHubPath: '/games/type-soul',
    kind: 'codes',
    lastChecked: '11 November 2026',
    relatedToolPath: '/tools/type-soul-grade-calculator',
    relatedToolLabel: 'Type Soul Grade Calculator',
    intro:
      'Working Type Soul codes for free rerolls, elixirs and more. Important: your character must be Semi-Grade 2 or higher, or codes will not redeem.',
    note: 'Codes only work once your character reaches Semi-Grade 2.',
    codes: [
      {
        code: 'vilhalloweencode',
        reward: 'Halloween bundle: Locked Powered Black Elixir, rerolls and Halloween items'
      },
      {
        code: 'waittypesoulistillneedyou',
        reward: '20 Locked Clan Rerolls, 15 Locked Element Rerolls, 10 Locked Weapon Rerolls'
      },
      {
        code: 'NglImmaTakeANapLmk',
        reward: '100 Locked Element Rerolls, 20 Locked Buddy Rolls, 100 Locked Weapon Rerolls, Locked Clothing Token'
      },
      {
        code: 'TrulyBeenATypeSoul',
        reward: 'Huge bundle: rerolls, 5,000 Kans, Hogyoku Fragments, elixirs and Soul Blessings'
      },
      {
        code: 'Cristi2026',
        reward: 'Reroll bundle (Flashstep Color, Weapon, Eye Color, Element, Clan)'
      },
      {
        code: 'PALACEUPDATE2060',
        reward: 'Large bundle: elixirs, 100 Locked Element/Weapon/Clan Rerolls, Skill Box Choosers, True Hogyoku'
      },
      {
        code: 'BalanceStage',
        reward: 'Free rewards (rerolls, elixirs, Skill Box items)'
      },
      {
        code: 'TypeBugIsMYFavouriteGame',
        reward: 'Free rewards (elixirs and rerolls)'
      }
    ],
    redeemSteps: [
      'Reach Semi-Grade 2 with your character.',
      'Tap the gift icon at the top of the screen.',
      'Enter the code exactly as shown.',
      'Press Redeem — rewards are added to your account.'
    ]
  },

  // Entry 1 — Genshin Impact
  {
    slug: 'genshin-impact',
    gameName: 'Genshin Impact',
    gameHubPath: '/games/genshin',
    kind: 'codes',
    lastChecked: '11 November 2026',
    relatedToolPath: '/tools/genshin-pity-calculator',
    relatedToolLabel: 'Genshin Impact Pity Calculator',
    intro:
      'Active Genshin Impact redeem codes for free Primogems, Mora and upgrade materials. You need Adventure Rank 10 or higher, and rewards arrive through in-game mail.',
    codes: [
      {
        code: 'PJ2KEBRAYSRM',
        reward: "60 Primogems, 5 Adventurer's Experience"
      },
      {
        code: 'NEEIJB764CA3',
        reward: "60 Primogems, 5 Adventurer's Experience"
      },
      {
        code: 'Y6JYMKV6JKSL',
        reward: "60 Primogems, 5 Adventurer's Experience"
      },
      {
        code: 'KeepUpWithMitya',
        reward: '3 Guide to Charity, 3 Kristallfold, 3 Energy-Replenishing Meal',
        expires: '16 November 2026'
      },
      {
        code: 'MIJIQ23V2437',
        reward:
          "10,000 Mora, 10 Adventurer's Experience, 5 Fine Enhancement Ore, 5 Jueyun Chili Chicken, 5 Stir-Fried Fish Noodles"
      },
      {
        code: 'PNKZ3WLNN8G6',
        reward:
          '5 Teachings of Charity, 5 Teachings of Fortitude, 5 Teachings of Glory'
      }
    ],
    redeemSteps: [
      'Reach Adventure Rank 10.',
      'In game: Paimon menu → Settings → Account → Redeem Code. Or use the official gift page genshin.hoyoverse.com/en/gift.',
      'Enter the code and confirm.',
      'Collect the rewards from your in-game mailbox.'
    ]
  },

  // Entry 2 — AFK Journey
  {
    slug: 'afk-journey',
    gameName: 'AFK Journey',
    gameHubPath: '/games/afk-journey',
    kind: 'codes',
    lastChecked: '11 November 2026',
    relatedToolPath: '/tools/afkj-team-builder',
    relatedToolLabel: 'AFK Journey Team Builder',
    intro:
      'Working AFK Journey promo codes for free Diamonds, Invite Letters and Gold. Codes are not case-sensitive, and rewards are sent to your in-game mailbox.',
    codes: [
      {
        code: 'AFKJ2YRS2026',
        reward: '20 Epic Invite Letters, 100,000 Gold'
      },
      {
        code: 'ZC1JJ3UU0N',
        reward: '1,000 Diamonds, 5 Epic Invite Letters, 20,000 Gold'
      },
      {
        code: '4iYTsNbdXC',
        reward: '1,000 Diamonds, 5 Epic Invite Letters, 20,000 Gold'
      },
      {
        code: 'HQC0ZFSC6QYTX',
        reward: '500 Diamonds, 5 Hamsters, 50,000 Gold'
      },
      {
        code: 'E8BESLBQZLZUD',
        reward: '500 Diamonds, 10 Hamsters, 50,000 Gold'
      },
      {
        code: 'HALLOWEEN2026',
        reward: '500 Diamonds, 10 Origami Hamsters, 50,000 Gold',
        expires: 'about 30 November 2026'
      },
      {
        code: 'AFKJ10',
        reward: '10 Summon Tickets'
      }
    ],
    redeemSteps: [
      'Tap your avatar in the top-left corner.',
      'Go to Settings → Services → Redeem Code.',
      'Enter the code and confirm.',
      'Rewards arrive through in-game mail.'
    ]
  },

  // Entry 3 — Zenless Zone Zero
  {
    slug: 'zenless-zone-zero',
    gameName: 'Zenless Zone Zero',
    gameHubPath: '/games/zenless-zone-zero',
    kind: 'codes',
    lastChecked: '11 November 2026',
    relatedToolPath: '/tools/zzz-drive-disc-optimizer',
    relatedToolLabel: 'ZZZ Drive Disc Optimizer',
    intro:
      'Active Zenless Zone Zero redeem codes for free Polychrome and Denny. You need Inter-Knot Level 5 or higher; rewards arrive by in-game Mail.',
    codes: [
      {
        code: 'INKSHIFT33',
        reward: '20 Polychrome, 2,222 Denny'
      },
      {
        code: 'LEVELUP33',
        reward: '20 Polychrome, 2,222 Denny'
      },
      {
        code: 'HOLLOWRUN33',
        reward: '20 Polychrome, 2,222 Denny'
      },
      {
        code: 'ZENLESSGIFT',
        reward:
          '50 Polychrome, 2 Official Investigator Logs, 3 W-Engine Power Supplies, 1 Bangboo Algorithm Module'
      }
    ],
    redeemSteps: [
      'Reach Inter-Knot Level 5.',
      'In game: More → Redemption Code. Or use zenless.hoyoverse.com/redemption.',
      'Enter the code and confirm.',
      'Collect rewards from in-game Mail.'
    ]
  },

  // Entry 4 — Wuthering Waves
  {
    slug: 'wuthering-waves',
    gameName: 'Wuthering Waves',
    gameHubPath: '/games/wuthering-waves',
    kind: 'codes',
    lastChecked: '11 November 2026',
    relatedToolPath: '/tools/wuwa-pity-pull-planner',
    relatedToolLabel: 'Wuthering Waves Pity Pull Planner',
    intro:
      'The one Wuthering Waves code confirmed working right now. New codes usually arrive with each version livestream — this page is updated as soon as they drop. You need Union Level 2 to redeem.',
    note:
      'The Version 3.8 livestream codes expired on 8 November 2026. The next batch is expected with the 3.9 livestream.',
    codes: [
      {
        code: 'WUTHERINGGIFT',
        reward:
          '50 Astrite, 2 Premium Resonance Potions, 2 Medium Revival Inhalers, 2 Medium Energy Bags, 10,000 Shell Credits'
      }
    ],
    redeemSteps: [
      'Reach Union Level 2.',
      'Open the Terminal → Settings → Other Settings.',
      'Select Redemption Code and enter the code.',
      'Rewards are delivered in game. (There is no official web redemption page.)'
    ]
  },

  // Entry 1 — Seven Knights Re:BIRTH
  {
    slug: 'seven-knights-rebirth',
    gameName: 'Seven Knights Re:BIRTH',
    gameHubPath: '/games/seven-knights-rebirth',
    kind: 'codes',
    lastChecked: '11 November 2026',
    relatedToolPath: '/tools/sk-ruby-calc',
    relatedToolLabel: 'Seven Knights Ruby Calculator',
    intro:
      'The latest confirmed Seven Knights Re:BIRTH coupon code. Codes for this game expire very fast — redeem immediately.',
    codes: [
      {
        code: 'SKRE300BIRTH',
        reward:
          '4-Star Legendary Accessory Selection Box, 300 Hero Summon Vouchers, 30 Pet Wish List Summon Vouchers, 3 Brilliant Skill Enhancement Stones, 3,000,000 Gold, 30 Chaos Essence',
        expires: '12 November 2026 — redeem fast'
      }
    ],
    redeemSteps: [
      'Android: in game, Settings → Coupon, enter the code.',
      'iOS: use the official Netmarble coupon website with your member code.',
      'Rewards are sent to your in-game mailbox.'
    ]
  },

  // Entry 2 — Pokémon GO
  {
    slug: 'pokemon-go',
    gameName: 'Pokémon GO',
    gameHubPath: '/games/pokemongo',
    kind: 'codes',
    lastChecked: '11 November 2026',
    relatedToolPath: '/tools/pokemon-go-iv-calculator',
    relatedToolLabel: 'Pokémon GO IV Calculator',
    intro:
      'Pokémon GO promo codes are rare and usually tied to brand events. These are the ones confirmed working now — codes are case-sensitive, and redemption happens on the Pokémon GO Web Store (there is no in-app code field anymore).',
    codes: [
      {
        code: 'ADIDASxPOKEMON',
        reward: 'adidas shoes avatar item',
        expires: '15 January 2027'
      },
      {
        code: 'LEGOxPOKEMONGOxBERRIES',
        reward:
          '10 Poké Balls, 5 Razz Berries, 5 Pinap Berries, 5 Nanab Berries'
      }
    ],
    unconfirmed: [
      {
        code: 'FENDIxFRGMTxPOKEMON',
        reward:
          'FENDI x FRGMT avatar hoodie (promotion officially ended — some players still report it working, worth a try)'
      }
    ],
    redeemSteps: [
      'Open the Pokémon GO Web Store offer redemption page: store.pokemongo.com/offer-redemption.',
      'Sign in with the same account you play with.',
      'Enter the code exactly as shown (case-sensitive).',
      'The items are added to your account in game.'
    ]
  },

  // Entry 3 — Cookie Run: Kingdom
  {
    slug: 'cookie-run-kingdom',
    gameName: 'Cookie Run: Kingdom',
    gameHubPath: '/games/cookie-run-kingdom',
    kind: 'status',
    lastChecked: '11 November 2026',
    relatedToolPath: '/tools/crk-team-builder',
    relatedToolLabel: 'Cookie Run: Kingdom Team Builder',
    intro:
      'Cookie Run: Kingdom coupon codes give free Crystals, Rainbow Cubes and Choco Chalks. Devsisters usually releases new coupons every few weeks.',
    codes: [],
    note:
      "Free reward you can still claim: the official Studio Kingdom website's Sugar Gnome gift gives 3,000 Crystals once per DevPlay account — no code needed.",
    redeemSteps: [
      'Find your DevPlay ID in game: Settings → Info.',
      'Open the official DevPlay coupon page: coupon.devplay.com.',
      'Enter your DevPlay ID and the code, then tap Claim Reward.',
      'Rewards appear in your in-game mailbox.'
    ]
  },

  // Entry 1 — Monopoly GO
  {
    slug: 'monopoly-go',
    gameName: 'Monopoly GO',
    gameHubPath: '/games/monopoly-go',
    kind: 'links',
    lastChecked: '11 November 2026',
    relatedToolPath: '/tools/mogo-free-dice-links',
    relatedToolLabel: 'Monopoly GO Free Dice Links',
    intro:
      'Monopoly GO has no type-in codes — instead, Scopely posts official free dice links on its social channels. Every link below is an official reward link, checked today.',
    linksNote:
      "How it works: tap a link on the phone or tablet where Monopoly GO is installed → the game opens → tap Collect on the 'Here's a gift for you!' pop-up. Each link works once per account, most give 25–75 free dice rolls, and they usually expire within 2–3 days. You must be Net Worth Level 15 (Sticker Album unlocked) or the link will not redeem. Beware: any site promising 1,000+ dice from one link is a scam — official links never give that much.",
    codes: [],
    links: [],
    redeemSteps: [
      'Tap an official link above on your device.',
      'Monopoly GO opens automatically.',
      'Tap Collect on the gift pop-up.',
      'The dice are added instantly. (Net Worth Level 15 required.)'
    ]
  },

  // Entry 2 — Coin Master
  {
    slug: 'coin-master',
    gameName: 'Coin Master',
    gameHubPath: '/games/coin-master',
    kind: 'links',
    lastChecked: '11 November 2026',
    relatedToolPath: '/tools/cm-village-calculator',
    relatedToolLabel: 'Coin Master Village Cost Calculator',
    intro:
      'Coin Master has no type-in codes — Moon Active posts official free spins links every day. Every link below is an official reward link, checked today.',
    linksNote:
      'How it works: Moon Active posts 3–8 new links daily. Each link usually gives 25, 50 or 100 free spins (sometimes coins or cards), works once per account, and expires after about 72 hours. Tap a link on the device where Coin Master is installed and the spins are added when the game opens. Only official reward links are listed here — links from random sites can be fake.',
    codes: [],
    links: [],
    redeemSteps: [
      'Tap an official link above on your device.',
      'Coin Master opens automatically.',
      'The spins are credited to your balance.',
      'Each link works once and expires in about 3 days.'
    ]
  }
];

export function getCodesPageBySlug(slug: string): CodesPageData | undefined {
  return CODES_PAGES.find(p => p.slug === slug);
}

export function getCodesPagesForHub(hubPath: string): CodesPageData[] {
  const norm = (p: string) => p.replace(/^\//, '').replace(/\/$/, '');
  const target = norm(hubPath);
  return CODES_PAGES.filter(p => {
    const pPath = norm(p.gameHubPath);
    return (
      pPath === target ||
      target.endsWith(pPath) ||
      pPath.endsWith(target) ||
      (target === 'roblox' && pPath.includes('roblox')) ||
      (target.includes('type-soul') && pPath.includes('type-soul'))
    );
  });
}
