/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GachaGameType = 'wuwa' | 'zzz';

export interface StatDefinition {
  id: string;
  name: string;
  unit: '%' | 'flat';
  minRoll: number;
  maxRoll: number;
  defaultWeight: number; // 0.0 to 1.0
  isCrit: boolean;
}

export const WUWA_MAIN_STATS = [
  'Crit Rate %', 'Crit DMG %', 'Havoc DMG %', 'Spectro DMG %', 'Electro DMG %', 
  'Aero DMG %', 'Fusion DMG %', 'Glacio DMG %', 'ATK %', 'Energy Regen %', 'HP %', 'DEF %'
];

export const WUWA_SUB_STATS: StatDefinition[] = [
  { id: 'crit_rate', name: 'Crit. Rate', unit: '%', minRoll: 6.3, maxRoll: 10.5, defaultWeight: 1.0, isCrit: true },
  { id: 'crit_dmg', name: 'Crit. DMG', unit: '%', minRoll: 12.6, maxRoll: 21.0, defaultWeight: 1.0, isCrit: true },
  { id: 'atk_pct', name: 'ATK %', unit: '%', minRoll: 6.4, maxRoll: 11.6, defaultWeight: 0.85, isCrit: false },
  { id: 'energy_regen', name: 'Energy Regen', unit: '%', minRoll: 6.8, maxRoll: 12.4, defaultWeight: 0.8, isCrit: false },
  { id: 'flat_atk', name: 'Flat ATK', unit: 'flat', minRoll: 30, maxRoll: 60, defaultWeight: 0.4, isCrit: false },
  { id: 'skill_dmg_pct', name: 'Resonance Skill DMG %', unit: '%', minRoll: 6.4, maxRoll: 11.6, defaultWeight: 0.75, isCrit: false },
  { id: 'liberation_dmg_pct', name: 'Resonance Liberation DMG %', unit: '%', minRoll: 6.4, maxRoll: 11.6, defaultWeight: 0.75, isCrit: false },
  { id: 'basic_dmg_pct', name: 'Basic Attack DMG %', unit: '%', minRoll: 6.4, maxRoll: 11.6, defaultWeight: 0.6, isCrit: false },
  { id: 'heavy_dmg_pct', name: 'Heavy Attack DMG %', unit: '%', minRoll: 6.4, maxRoll: 11.6, defaultWeight: 0.6, isCrit: false },
  { id: 'hp_pct', name: 'HP %', unit: '%', minRoll: 6.4, maxRoll: 11.6, defaultWeight: 0.1, isCrit: false },
  { id: 'def_pct', name: 'DEF %', unit: '%', minRoll: 7.2, maxRoll: 13.0, defaultWeight: 0.0, isCrit: false },
  { id: 'flat_hp', name: 'Flat HP', unit: 'flat', minRoll: 320, maxRoll: 580, defaultWeight: 0.0, isCrit: false },
  { id: 'flat_def', name: 'Flat DEF', unit: 'flat', minRoll: 40, maxRoll: 70, defaultWeight: 0.0, isCrit: false },
];

export const ZZZ_MAIN_STATS = [
  'Crit Rate %', 'Crit DMG %', 'Physical DMG %', 'Fire DMG %', 'Ice DMG %', 
  'Electric DMG %', 'Ether DMG %', 'ATK %', 'Anomaly Proficiency', 'Energy Regen %', 'Impact %', 'HP %', 'DEF %'
];

export const ZZZ_SUB_STATS: StatDefinition[] = [
  { id: 'crit_rate', name: 'Crit Rate', unit: '%', minRoll: 2.4, maxRoll: 4.8, defaultWeight: 1.0, isCrit: true },
  { id: 'crit_dmg', name: 'Crit DMG', unit: '%', minRoll: 4.8, maxRoll: 9.6, defaultWeight: 1.0, isCrit: true },
  { id: 'atk_pct', name: 'ATK %', unit: '%', minRoll: 3.0, maxRoll: 6.0, defaultWeight: 0.85, isCrit: false },
  { id: 'anomaly_prof', name: 'Anomaly Proficiency', unit: 'flat', minRoll: 9, maxRoll: 18, defaultWeight: 0.8, isCrit: false },
  { id: 'pen_ratio', name: 'PEN Ratio', unit: '%', minRoll: 2.4, maxRoll: 4.8, defaultWeight: 0.75, isCrit: false },
  { id: 'flat_atk', name: 'Flat ATK', unit: 'flat', minRoll: 19, maxRoll: 38, defaultWeight: 0.4, isCrit: false },
  { id: 'hp_pct', name: 'HP %', unit: '%', minRoll: 3.0, maxRoll: 6.0, defaultWeight: 0.1, isCrit: false },
  { id: 'def_pct', name: 'DEF %', unit: '%', minRoll: 4.8, maxRoll: 9.6, defaultWeight: 0.0, isCrit: false },
  { id: 'flat_hp', name: 'Flat HP', unit: 'flat', minRoll: 112, maxRoll: 224, defaultWeight: 0.0, isCrit: false },
  { id: 'flat_def', name: 'Flat DEF', unit: 'flat', minRoll: 15, maxRoll: 30, defaultWeight: 0.0, isCrit: false },
];

export interface ArchetypePreset {
  id: string;
  name: string;
  description: string;
  statWeights: Record<string, number>;
}

export const WUWA_PRESETS: ArchetypePreset[] = [
  {
    id: 'dps_crit',
    name: 'Main DPS (Crit Carry - Jiyan/Yinlin/Jinhsi/Changli)',
    description: 'Prioritizes maximum Crit Rate, Crit DMG, and ATK%.',
    statWeights: { crit_rate: 1.0, crit_dmg: 1.0, atk_pct: 0.85, energy_regen: 0.7, flat_atk: 0.4 }
  },
  {
    id: 'sub_dps',
    name: 'Sub-DPS / Burst Buffer (Sanhua/Mortefi)',
    description: 'Balances Crit stats with Energy Regen for fast skill rotations.',
    statWeights: { energy_regen: 1.0, crit_rate: 0.9, crit_dmg: 0.9, atk_pct: 0.75 }
  },
  {
    id: 'healer_support',
    name: 'Healer / Support (Verina/Baizhi)',
    description: 'Focuses on HP% scaling and maximum Energy Regeneration.',
    statWeights: { energy_regen: 1.0, hp_pct: 0.9, flat_hp: 0.5, atk_pct: 0.5 }
  }
];

export const ZZZ_PRESETS: ArchetypePreset[] = [
  {
    id: 'crit_attacker',
    name: 'Attack Carry (Ellen Joe / Zhu Yuan / Soldier 11)',
    description: 'Focuses on double Crit (Crit Rate & Crit DMG) and ATK%.',
    statWeights: { crit_rate: 1.0, crit_dmg: 1.0, atk_pct: 0.85, pen_ratio: 0.75, flat_atk: 0.4 }
  },
  {
    id: 'anomaly_specialist',
    name: 'Anomaly Specialist (Grace / Piper / Jane Doe)',
    description: 'Prioritizes Anomaly Proficiency and ATK% over Crit.',
    statWeights: { anomaly_prof: 1.0, atk_pct: 0.9, pen_ratio: 0.8, flat_atk: 0.5 }
  },
  {
    id: 'stun_impact',
    name: 'Stunner / Daze Agent (Anby / Lycaon / Koleda)',
    description: 'Focuses on Impact, Energy Regen, and survival stats.',
    statWeights: { atk_pct: 0.8, flat_atk: 0.5, hp_pct: 0.6, def_pct: 0.5 }
  }
];

export interface GachaPityInfo {
  game: GachaGameType;
  gameName: string;
  hardPity: number;
  softPityStart: number;
  currencyName: string;
  pullCost: number; // 160 per pull
}

export const GACHA_PITY_CONFIG: Record<GachaGameType, GachaPityInfo> = {
  wuwa: {
    game: 'wuwa',
    gameName: 'Wuthering Waves',
    hardPity: 80,
    softPityStart: 65,
    currencyName: 'Astrite / Radiant Tides',
    pullCost: 160
  },
  zzz: {
    game: 'zzz',
    gameName: 'Zenless Zone Zero',
    hardPity: 90,
    softPityStart: 75,
    currencyName: 'Polychrome / Master Tapes',
    pullCost: 160
  }
};

export const GACHA_GEAR_FAQS = [
  {
    question: 'How is the Echo & Drive Disc Build Score calculated?',
    answer: 'Build Score measures the quality of your 4 sub-stats compared to a theoretical 100% max-rolled piece. Each sub-stat value is normalized against its maximum possible single/multi roll and multiplied by its weighted priority score (e.g. Crit Rate = 1.0, DEF = 0.0).'
  },
  {
    question: 'What is considered a "God Roll" Echo in Wuthering Waves?',
    answer: 'In Wuthering Waves, a 5-substat Echo with both Crit Rate (>8.5%) and Crit DMG (>17.0%) alongside ATK% or Energy Regen achieves an SSS Tier score (>90% perfection).'
  },
  {
    question: 'How does soft pity work in Wuthering Waves and Zenless Zone Zero?',
    answer: 'In Wuthering Waves, soft pity begins around pull 65 (hard pity at 80). In Zenless Zone Zero, soft pity starts around pull 75 (hard pity at 90). The 5-star drop probability increases dramatically with each pull past soft pity.'
  }
];
