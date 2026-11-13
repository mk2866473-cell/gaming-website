/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TitleCategory = 
  | 'Race'
  | 'PvP'
  | 'Awakening'
  | 'Level and mastery'
  | 'Raid'
  | 'Boss'
  | 'Sea'
  | 'Item'
  | 'Creator and staff'
  | 'Event'
  | 'Other';

export interface BloxFruitsTitle {
  number: string;
  idNumber: number;
  name: string;
  category: TitleCategory;
  requirement: string;
  obtainable: boolean;
  notes?: string;
  isSpecial?: boolean; // creator and staff titles tagged as Special
  colorType?: 'Normal' | 'Colored' | 'Red';
}

export const BLOX_FRUITS_TITLE_CATEGORIES: TitleCategory[] = [
  'Race',
  'PvP',
  'Awakening',
  'Level and mastery',
  'Raid',
  'Boss',
  'Sea',
  'Item',
  'Creator and staff',
  'Event',
  'Other'
];

export const BLOX_FRUITS_TITLES_DATA: BloxFruitsTitle[] = [
  // Race Category (#001 - #021)
  {
    number: '#001',
    idNumber: 1,
    name: 'The Unleashed',
    category: 'Race',
    requirement: 'unlock Human V2',
    obtainable: true
  },
  {
    number: '#002',
    idNumber: 2,
    name: 'Unmatched Speed',
    category: 'Race',
    requirement: 'unlock Rabbit V2',
    obtainable: true
  },
  {
    number: '#003',
    idNumber: 3,
    name: 'Sea Monster',
    category: 'Race',
    requirement: 'unlock Shark V2',
    obtainable: true
  },
  {
    number: '#004',
    idNumber: 4,
    name: 'Sacred Warrior',
    category: 'Race',
    requirement: 'unlock Angel V2',
    obtainable: true
  },
  {
    number: '#005',
    idNumber: 5,
    name: 'The Ghoul',
    category: 'Race',
    requirement: 'unlock Ghoul V2',
    obtainable: true
  },
  {
    number: '#006',
    idNumber: 6,
    name: 'The Cyborg',
    category: 'Race',
    requirement: 'unlock Cyborg V2',
    obtainable: true
  },
  {
    number: '#007',
    idNumber: 7,
    name: 'Elder Wyrm',
    category: 'Race',
    requirement: 'unlock Draco V2',
    obtainable: true
  },
  {
    number: '#008',
    idNumber: 8,
    name: 'Full Power',
    category: 'Race',
    requirement: 'unlock Human V3',
    obtainable: true
  },
  {
    number: '#009',
    idNumber: 9,
    name: 'Godspeed',
    category: 'Race',
    requirement: 'unlock Rabbit V3',
    obtainable: true
  },
  {
    number: '#010',
    idNumber: 10,
    name: 'Warrior of the Sea',
    category: 'Race',
    requirement: 'unlock Shark V3',
    obtainable: true
  },
  {
    number: '#011',
    idNumber: 11,
    name: 'Perfect Being',
    category: 'Race',
    requirement: 'unlock Angel V3',
    obtainable: true
  },
  {
    number: '#012',
    idNumber: 12,
    name: 'Hell Hound',
    category: 'Race',
    requirement: 'unlock Ghoul V3',
    obtainable: true
  },
  {
    number: '#013',
    idNumber: 13,
    name: 'War Machine',
    category: 'Race',
    requirement: 'unlock Cyborg V3',
    obtainable: true
  },
  {
    number: '#014',
    idNumber: 14,
    name: 'Berserker',
    category: 'Race',
    requirement: 'unlock Human V4',
    obtainable: true
  },
  {
    number: '#015',
    idNumber: 15,
    name: 'Ancient Flame',
    category: 'Race',
    requirement: 'unlock Draco V3',
    obtainable: true
  },
  {
    number: '#016',
    idNumber: 16,
    name: 'Thunderbolt',
    category: 'Race',
    requirement: 'unlock Rabbit V4',
    obtainable: true
  },
  {
    number: '#017',
    idNumber: 17,
    name: 'Leviathan',
    category: 'Race',
    requirement: 'unlock Shark V4',
    obtainable: true
  },
  {
    number: '#018',
    idNumber: 18,
    name: 'His Majesty',
    category: 'Race',
    requirement: 'unlock Angel V4',
    obtainable: true
  },
  {
    number: '#019',
    idNumber: 19,
    name: 'Nightwalker',
    category: 'Race',
    requirement: 'unlock Ghoul V4',
    obtainable: true
  },
  {
    number: '#020',
    idNumber: 20,
    name: 'Genesis',
    category: 'Race',
    requirement: 'unlock Cyborg V4',
    obtainable: true
  },
  {
    number: '#021',
    idNumber: 21,
    name: 'Primordial Guardian',
    category: 'Race',
    requirement: 'unlock Draco V4',
    obtainable: true
  },

  // PvP Category (#022 - #028, #137 - #143)
  {
    number: '#022',
    idNumber: 22,
    name: 'Pirate Hunter',
    category: 'PvP',
    requirement: '5M+ bounty or honor',
    obtainable: true,
    colorType: 'Colored'
  },
  {
    number: '#023',
    idNumber: 23,
    name: 'Bounty Hunter',
    category: 'PvP',
    requirement: '5M+ bounty or honor',
    obtainable: true,
    colorType: 'Colored'
  },
  {
    number: '#024',
    idNumber: 24,
    name: 'Warlord of the Sea',
    category: 'PvP',
    requirement: '10M+ bounty',
    obtainable: true,
    colorType: 'Colored'
  },
  {
    number: '#025',
    idNumber: 25,
    name: 'Emperor of the Sea',
    category: 'PvP',
    requirement: '20M+ bounty',
    obtainable: true,
    colorType: 'Colored'
  },
  {
    number: '#026',
    idNumber: 26,
    name: 'Empress of the Sea',
    category: 'PvP',
    requirement: '20M+ bounty (Pirates faction)',
    obtainable: true,
    colorType: 'Colored'
  },
  {
    number: '#027',
    idNumber: 27,
    name: 'Admiral',
    category: 'PvP',
    requirement: '10M+ honor (Marines faction)',
    obtainable: true,
    colorType: 'Colored'
  },
  {
    number: '#028',
    idNumber: 28,
    name: 'Fleet Admiral',
    category: 'PvP',
    requirement: '20M+ honor (Marines faction)',
    obtainable: true,
    colorType: 'Colored'
  },
  {
    number: '#137',
    idNumber: 137,
    name: 'Unstoppable Force',
    category: 'PvP',
    requirement: 'defeat 5 players without dying in the same server',
    obtainable: true
  },
  {
    number: '#138',
    idNumber: 138,
    name: 'Raging Demon',
    category: 'PvP',
    requirement: 'defeat 20 players without dying in the same server',
    obtainable: true,
    colorType: 'Colored',
    notes: 'Requires all 20 kills to award bounty or honor on the same server without dying.'
  },
  {
    number: '#139',
    idNumber: 139,
    name: 'The Protagonist',
    category: 'PvP',
    requirement: 'defeat 2 or more players at the exact same time',
    obtainable: true
  },
  {
    number: '#140',
    idNumber: 140,
    name: 'Coldblooded',
    category: 'PvP',
    requirement: 'defeat 10 players in the same server',
    obtainable: true
  },
  {
    number: '#141',
    idNumber: 141,
    name: 'Bloodthirsty',
    category: 'PvP',
    requirement: 'defeat 50 players in the same server',
    obtainable: true
  },
  {
    number: '#142',
    idNumber: 142,
    name: 'Apex Predator',
    category: 'PvP',
    requirement: 'defeat 100 players in the same server',
    obtainable: true
  },
  {
    number: '#143',
    idNumber: 143,
    name: 'Equal to the Heavens',
    category: 'PvP',
    requirement: 'reach 30M bounty or honor (maximum cap)',
    obtainable: true,
    colorType: 'Red',
    notes: 'Maximum bounty/honor tier in Blox Fruits.'
  },

  // Awakening Category (#029 - #043)
  {
    number: '#029',
    idNumber: 29,
    name: 'Enlightened One',
    category: 'Awakening',
    requirement: 'unlock any awakening',
    obtainable: true
  },
  {
    number: '#030',
    idNumber: 30,
    name: 'Awakened One',
    category: 'Awakening',
    requirement: 'fully awaken any Blox Fruit',
    obtainable: true
  },
  {
    number: '#031',
    idNumber: 31,
    name: 'Flame Emperor',
    category: 'Awakening',
    requirement: 'unlock Flame awakening',
    obtainable: true
  },
  {
    number: '#032',
    idNumber: 32,
    name: 'Ice King',
    category: 'Awakening',
    requirement: 'unlock Ice awakening',
    obtainable: true
  },
  {
    number: '#033',
    idNumber: 33,
    name: 'Sand Storm',
    category: 'Awakening',
    requirement: 'unlock Sand awakening',
    obtainable: true
  },
  {
    number: '#034',
    idNumber: 34,
    name: 'Dark Lord',
    category: 'Awakening',
    requirement: 'unlock Dark awakening',
    obtainable: true
  },
  {
    number: '#035',
    idNumber: 35,
    name: 'Light Speed',
    category: 'Awakening',
    requirement: 'unlock Light awakening',
    obtainable: true
  },
  {
    number: '#036',
    idNumber: 36,
    name: 'Magma Beast',
    category: 'Awakening',
    requirement: 'unlock Magma awakening',
    obtainable: true
  },
  {
    number: '#037',
    idNumber: 37,
    name: 'Quake Monarch',
    category: 'Awakening',
    requirement: 'unlock Quake awakening',
    obtainable: true
  },
  {
    number: '#038',
    idNumber: 38,
    name: 'Golden Buddha',
    category: 'Awakening',
    requirement: 'unlock Buddha awakening',
    obtainable: true
  },
  {
    number: '#039',
    idNumber: 39,
    name: 'Spider Web',
    category: 'Awakening',
    requirement: 'unlock Spider awakening',
    obtainable: true
  },
  {
    number: '#040',
    idNumber: 40,
    name: 'Thunder God',
    category: 'Awakening',
    requirement: 'Rumble awakening (UNOBTAINABLE, Update 27)',
    obtainable: false,
    notes: 'No longer obtainable since Update 27 removed Rumble raids.'
  },
  {
    number: '#041',
    idNumber: 41,
    name: 'Dough Commander',
    category: 'Awakening',
    requirement: 'defeat Cake Prince to unlock Dough raid access',
    obtainable: true
  },
  {
    number: '#042',
    idNumber: 42,
    name: 'Dough King',
    category: 'Awakening',
    requirement: 'defeat Dough King or fully awaken Dough fruit',
    obtainable: true
  },
  {
    number: '#043',
    idNumber: 43,
    name: 'Phoenix Rebirth',
    category: 'Awakening',
    requirement: 'unlock Phoenix awakening',
    obtainable: true
  },

  // Level and mastery Category (#086 - #098)
  {
    number: '#086',
    idNumber: 86,
    name: 'The Explorer',
    category: 'Level and mastery',
    requirement: 'reach level 800',
    obtainable: true
  },
  {
    number: '#087',
    idNumber: 87,
    name: 'The Adventurer',
    category: 'Level and mastery',
    requirement: 'reach level 1000',
    obtainable: true
  },
  {
    number: '#088',
    idNumber: 88,
    name: 'The Mercenary',
    category: 'Level and mastery',
    requirement: 'reach level 1200',
    obtainable: true
  },
  {
    number: '#089',
    idNumber: 89,
    name: 'The Viking',
    category: 'Level and mastery',
    requirement: 'reach level 1600',
    obtainable: true
  },
  {
    number: '#090',
    idNumber: 90,
    name: 'The Pioneer',
    category: 'Level and mastery',
    requirement: 'reach level 2000',
    obtainable: true
  },
  {
    number: '#091',
    idNumber: 91,
    name: 'The Glorious',
    category: 'Level and mastery',
    requirement: 'reach level 2400',
    obtainable: true
  },
  {
    number: '#092',
    idNumber: 92,
    name: 'The Master',
    category: 'Level and mastery',
    requirement: 'MAX mastery on any weapon',
    obtainable: true
  },
  {
    number: '#093',
    idNumber: 93,
    name: 'Sword Master',
    category: 'Level and mastery',
    requirement: 'reach MAX mastery (600) on any sword',
    obtainable: true
  },
  {
    number: '#094',
    idNumber: 94,
    name: 'Gun Master',
    category: 'Level and mastery',
    requirement: 'reach MAX mastery (600) on any gun',
    obtainable: true
  },
  {
    number: '#095',
    idNumber: 95,
    name: 'Fruit Master',
    category: 'Level and mastery',
    requirement: 'reach MAX mastery (600) on any Blox Fruit',
    obtainable: true
  },
  {
    number: '#096',
    idNumber: 96,
    name: 'Karate Master',
    category: 'Level and mastery',
    requirement: 'reach MAX mastery (600) on any fighting style',
    obtainable: true
  },
  {
    number: '#097',
    idNumber: 97,
    name: 'Godhuman',
    category: 'Level and mastery',
    requirement: 'unlock Godhuman fighting style',
    obtainable: true
  },
  {
    number: '#098',
    idNumber: 98,
    name: 'Superhuman',
    category: 'Level and mastery',
    requirement: 'unlock Superhuman fighting style',
    obtainable: true
  },

  // Raid Category (#060 - #065)
  {
    number: '#060',
    idNumber: 60,
    name: 'The Conqueror',
    category: 'Raid',
    requirement: 'complete any raid without dying',
    obtainable: true
  },
  {
    number: '#061',
    idNumber: 61,
    name: 'The Flash',
    category: 'Raid',
    requirement: 'complete any raid under 3 minutes',
    obtainable: true
  },
  {
    number: '#062',
    idNumber: 62,
    name: 'The Supersonic',
    category: 'Raid',
    requirement: 'complete any raid under 5 minutes',
    obtainable: true
  },
  {
    number: '#063',
    idNumber: 63,
    name: 'Last Hope',
    category: 'Raid',
    requirement: 'complete a raid as the last remaining player alive',
    obtainable: true
  },
  {
    number: '#064',
    idNumber: 64,
    name: 'Raid Hero',
    category: 'Raid',
    requirement: 'successfully clear 50 fruit raids',
    obtainable: true
  },
  {
    number: '#065',
    idNumber: 65,
    name: 'Law Breaker',
    category: 'Raid',
    requirement: 'complete an Order raid in the Second Sea',
    obtainable: true
  },

  // Boss Category (#070 - #076)
  {
    number: '#070',
    idNumber: 70,
    name: 'The Cursed One',
    category: 'Boss',
    requirement: 'defeat Darkbeard in the Second Sea',
    obtainable: true
  },
  {
    number: '#071',
    idNumber: 71,
    name: 'Slayer of God',
    category: 'Boss',
    requirement: 'defeat rip_indra True Form',
    obtainable: true,
    colorType: 'Colored'
  },
  {
    number: '#072',
    idNumber: 72,
    name: 'Dragon Slayer',
    category: 'Boss',
    requirement: 'defeat Dragon Boss on Hydra Island',
    obtainable: true
  },
  {
    number: '#073',
    idNumber: 73,
    name: 'Shadow Sovereign',
    category: 'Boss',
    requirement: 'defeat rip_indra in the Third Sea',
    obtainable: true
  },
  {
    number: '#074',
    idNumber: 74,
    name: 'Tyrant',
    category: 'Boss',
    requirement: 'defeat the Beautiful Pirate boss',
    obtainable: true
  },
  {
    number: '#075',
    idNumber: 75,
    name: 'The Fallen',
    category: 'Boss',
    requirement: 'get defeated by a raid boss',
    obtainable: true
  },
  {
    number: '#076',
    idNumber: 76,
    name: 'Terrorbringer',
    category: 'Boss',
    requirement: 'defeat 10 Terrorsharks in sea events',
    obtainable: true
  },

  // Sea Category (#080 - #085)
  {
    number: '#080',
    idNumber: 80,
    name: 'Beast Hunter',
    category: 'Sea',
    requirement: 'defeat 1 Sea Beast',
    obtainable: true
  },
  {
    number: '#081',
    idNumber: 81,
    name: 'The Beast',
    category: 'Sea',
    requirement: 'defeat 25 Sea Beasts',
    obtainable: true
  },
  {
    number: '#082',
    idNumber: 82,
    name: 'Serpent Slayer',
    category: 'Sea',
    requirement: 'defeat the Leviathan in Danger Level 6',
    obtainable: true
  },
  {
    number: '#083',
    idNumber: 83,
    name: 'Abyss Navigator',
    category: 'Sea',
    requirement: 'reach Danger Level 6 in the Third Sea waters',
    obtainable: true
  },
  {
    number: '#084',
    idNumber: 84,
    name: 'Ghost Ship Hunter',
    category: 'Sea',
    requirement: 'defeat 10 Ghost Ships in sea events',
    obtainable: true
  },
  {
    number: '#085',
    idNumber: 85,
    name: 'Tide Warrior',
    category: 'Sea',
    requirement: 'drown and die in the water',
    obtainable: true
  },

  // Item Category (#100 - #107)
  {
    number: '#100',
    idNumber: 100,
    name: 'Wicked Captain',
    category: 'Item',
    requirement: 'obtain Dark Coat from Darkbeard',
    obtainable: true
  },
  {
    number: '#101',
    idNumber: 101,
    name: 'True Triple Katana',
    category: 'Item',
    requirement: 'craft the True Triple Katana',
    obtainable: true
  },
  {
    number: '#102',
    idNumber: 102,
    name: 'Hallow Scythe',
    category: 'Item',
    requirement: 'obtain Hallow Scythe from Soul Reaper',
    obtainable: true
  },
  {
    number: '#103',
    idNumber: 103,
    name: 'Cursed Dual Katana',
    category: 'Item',
    requirement: 'craft Cursed Dual Katana at the Crypt Master',
    obtainable: true
  },
  {
    number: '#104',
    idNumber: 104,
    name: 'Dark Dagger',
    category: 'Item',
    requirement: 'obtain Dark Dagger from rip_indra True Form',
    obtainable: true
  },
  {
    number: '#105',
    idNumber: 105,
    name: 'Fox Lamp',
    category: 'Item',
    requirement: 'obtain Fox Lamp from Kitsune Island trials',
    obtainable: true
  },
  {
    number: '#106',
    idNumber: 106,
    name: 'Shark Anchor',
    category: 'Item',
    requirement: 'craft Shark Anchor at the Shark Hunter NPC',
    obtainable: true
  },
  {
    number: '#107',
    idNumber: 107,
    name: 'Class S',
    category: 'Item',
    requirement: 'obtain Advanced Combat in the First Sea (Exception)',
    obtainable: true,
    notes: 'Exception title: obtainable in First Sea upon completing Advanced Combat.'
  },

  // Creator and staff Category (#110 - #119, Tagged as Special)
  {
    number: '#110',
    idNumber: 110,
    name: 'Don Axiore Familia',
    category: 'Creator and staff',
    requirement: 'defeat content creator Axiore with title drops enabled',
    obtainable: true,
    isSpecial: true,
    notes: 'Special: Needs defeating creator Axiore while title drop toggle is active.'
  },
  {
    number: '#111',
    idNumber: 111,
    name: 'Kitt Katt',
    category: 'Creator and staff',
    requirement: 'defeat content creator Kitt Gaming with title drops enabled',
    obtainable: true,
    isSpecial: true,
    notes: 'Special: Needs defeating creator Kitt Gaming while title drop toggle is active.'
  },
  {
    number: '#112',
    idNumber: 112,
    name: 'Ace Squad',
    category: 'Creator and staff',
    requirement: 'defeat content creator TheGreatAce with title drops enabled',
    obtainable: true,
    isSpecial: true,
    notes: 'Special: Needs defeating creator TheGreatAce while title drop toggle is active.'
  },
  {
    number: '#113',
    idNumber: 113,
    name: 'Officially a Noob',
    category: 'Creator and staff',
    requirement: 'defeat content creator OfficialNoobie with title drops enabled',
    obtainable: true,
    isSpecial: true,
    notes: 'Special: Needs defeating creator OfficialNoobie while title drop toggle is active.'
  },
  {
    number: '#114',
    idNumber: 114,
    name: 'Water Gang',
    category: 'Creator and staff',
    requirement: 'defeat content creator Daigrock with title drops enabled',
    obtainable: true,
    isSpecial: true,
    notes: 'Special: Needs defeating creator Daigrock while title drop toggle is active.'
  },
  {
    number: '#115',
    idNumber: 115,
    name: 'Mafia Gang',
    category: 'Creator and staff',
    requirement: 'defeat content creator Bluxxy Gaming with title drops enabled',
    obtainable: true,
    isSpecial: true,
    notes: 'Special: Needs defeating creator Bluxxy Gaming while title drop toggle is active.'
  },
  {
    number: '#116',
    idNumber: 116,
    name: 'Team JC',
    category: 'Creator and staff',
    requirement: 'defeat content creator JCWK with title drops enabled',
    obtainable: true,
    isSpecial: true,
    notes: 'Special: Needs defeating creator JCWK while title drop toggle is active.'
  },
  {
    number: '#117',
    idNumber: 117,
    name: 'Nakama Forever',
    category: 'Creator and staff',
    requirement: 'defeat content creator MeEnyu with title drops enabled',
    obtainable: true,
    isSpecial: true,
    notes: 'Special: Needs defeating creator MeEnyu while title drop toggle is active.'
  },
  {
    number: '#118',
    idNumber: 118,
    name: 'El Krazy Editor',
    category: 'Creator and staff',
    requirement: 'defeat staff member Zioles with title drops enabled',
    obtainable: true,
    isSpecial: true,
    notes: 'Special: Needs defeating staff member Zioles while title drop toggle is active.'
  },
  {
    number: '#119',
    idNumber: 119,
    name: 'The Admin',
    category: 'Creator and staff',
    requirement: 'defeat an official developer or staff member with title drops enabled',
    obtainable: true,
    isSpecial: true,
    notes: 'Special: Needs defeating an official developer/staff member in-game.'
  },

  // Event Category (#125 - #128)
  {
    number: '#125',
    idNumber: 125,
    name: 'I Was There',
    category: 'Event',
    requirement: 'one-off Sea 1 Rework event live countdown participation (UNOBTAINABLE)',
    obtainable: false,
    notes: 'UNOBTAINABLE: Exclusive one-off title from the live Sea 1 Rework countdown.'
  },
  {
    number: '#126',
    idNumber: 126,
    name: 'Winter Warrior',
    category: 'Event',
    requirement: 'participate in the Christmas Holiday Event (UNOBTAINABLE)',
    obtainable: false,
    notes: 'UNOBTAINABLE: Limited-time holiday event title.'
  },
  {
    number: '#127',
    idNumber: 127,
    name: 'Halloween Phantom',
    category: 'Event',
    requirement: 'participate in the Halloween Event (UNOBTAINABLE)',
    obtainable: false,
    notes: 'UNOBTAINABLE: Limited-time seasonal event title.'
  },
  {
    number: '#128',
    idNumber: 128,
    name: 'Valentine Sweetheart',
    category: 'Event',
    requirement: 'participate in the Valentine Event (UNOBTAINABLE)',
    obtainable: false,
    notes: 'UNOBTAINABLE: Limited-time seasonal event title.'
  },

  // Other Category (#130, #135, #136, #150 - #152)
  {
    number: '#130',
    idNumber: 130,
    name: 'The Gambler',
    category: 'Other',
    requirement: 'spend over 5,000,000 Beli at the Blox Fruits Gacha',
    obtainable: true
  },
  {
    number: '#135',
    idNumber: 135,
    name: 'Risk Taker',
    category: 'Other',
    requirement: 'purchase a random fruit from the Blox Fruits Gacha (Dealer Cousin)',
    obtainable: true
  },
  {
    number: '#136',
    idNumber: 136,
    name: 'Luck of the Draw',
    category: 'Other',
    requirement: 'obtain a fruit worth more than $1,000,000 Beli from the Gacha',
    obtainable: true
  },
  {
    number: '#150',
    idNumber: 150,
    name: 'Wealthy',
    category: 'Other',
    requirement: 'accumulate 50,000,000 Beli in your balance',
    obtainable: true
  },
  {
    number: '#151',
    idNumber: 151,
    name: 'Millionaire',
    category: 'Other',
    requirement: 'accumulate 100,000,000 Beli in your balance',
    obtainable: true
  },
  {
    number: '#152',
    idNumber: 152,
    name: 'Fragment Hoarder',
    category: 'Other',
    requirement: 'accumulate 100,000 Fragments in your balance',
    obtainable: true
  }
];
