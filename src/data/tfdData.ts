/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SocketPolarity = 'none' | 'almandine' | 'malachite' | 'cerulean' | 'rutile' | 'xantic';

export interface PolarityInfo {
  id: SocketPolarity;
  name: string;
  symbol: string;
  color: string;
  bgColor: string;
}

export const POLARITIES: PolarityInfo[] = [
  { id: 'none', name: 'None', symbol: '◯', color: 'text-slate-400', bgColor: 'bg-slate-800' },
  { id: 'almandine', name: 'Almandine', symbol: '⬟', color: 'text-red-400', bgColor: 'bg-red-950/60 border-red-500/40' },
  { id: 'malachite', name: 'Malachite', symbol: '◆', color: 'text-emerald-400', bgColor: 'bg-emerald-950/60 border-emerald-500/40' },
  { id: 'cerulean', name: 'Cerulean', symbol: '▲', color: 'text-cyan-400', bgColor: 'bg-cyan-950/60 border-cyan-500/40' },
  { id: 'rutile', name: 'Rutile', symbol: '✦', color: 'text-amber-400', bgColor: 'bg-amber-950/60 border-amber-500/40' },
  { id: 'xantic', name: 'Xantic', symbol: '★', color: 'text-purple-400', bgColor: 'bg-purple-950/60 border-purple-500/40' },
];

export interface TfdWeapon {
  id: string;
  name: string;
  category: 'General Rounds' | 'Special Rounds' | 'Impact Rounds' | 'High-Power Rounds';
  baseAtk: number;
  critRate: number; // percentage, e.g. 20 means 20%
  critDamage: number; // multiplier, e.g. 1.5 means 1.5x
  fireRate: number; // RPM
  reloadSpeed: number; // seconds
  magazineSize: number;
  icon: string;
  description: string;
}

export const PRESET_WEAPONS: TfdWeapon[] = [
  {
    id: 'thunder-cage',
    name: 'Thunder Cage',
    category: 'General Rounds',
    baseAtk: 165,
    critRate: 20,
    critDamage: 1.6,
    fireRate: 666,
    reloadSpeed: 1.4,
    magazineSize: 32,
    icon: 'Zap',
    description: 'Ultimate SMG. Causes Electric shockwaves on enemy kill. Extremely high mobility and crit potential.'
  },
  {
    id: 'enduring-legacy',
    name: 'Enduring Legacy',
    category: 'General Rounds',
    baseAtk: 245,
    critRate: 20,
    critDamage: 1.7,
    fireRate: 590,
    reloadSpeed: 2.5,
    magazineSize: 115,
    icon: 'Flame',
    description: 'Ultimate Machine Gun. Applies Fire Resistance debuff to Void Intercept bosses with massive magazine.'
  },
  {
    id: 'tamer',
    name: 'Tamer',
    category: 'General Rounds',
    baseAtk: 290,
    critRate: 10,
    critDamage: 1.5,
    fireRate: 625,
    reloadSpeed: 2.6,
    magazineSize: 100,
    icon: 'Crosshair',
    description: 'Rare Machine Gun meta favorite. High raw Firearm ATK for raw damage builds.'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'General Rounds',
    baseAtk: 140,
    critRate: 5,
    critDamage: 1.3,
    fireRate: 923,
    reloadSpeed: 1.2,
    magazineSize: 45,
    icon: 'Gauge',
    description: 'Ultimate Submachine Gun with blisteringly high RPM. Decreases Non-Attribute / Toxic resistance on hit.'
  },
  {
    id: 'gregs-reversed-fate',
    name: 'Greg\'s Reversed Fate',
    category: 'Special Rounds',
    baseAtk: 285,
    critRate: 20,
    critDamage: 2.0,
    fireRate: 300,
    reloadSpeed: 1.8,
    magazineSize: 30,
    icon: 'Bomb',
    description: 'Ultimate Tactical Rifle. Calls down bombardment orbital strikes on hit when enemies have max shields.'
  },
  {
    id: 'secret-garden',
    name: 'Secret Garden',
    category: 'Special Rounds',
    baseAtk: 260,
    critRate: 50,
    critDamage: 2.2,
    fireRate: 320,
    reloadSpeed: 1.6,
    magazineSize: 28,
    icon: 'Sparkles',
    description: 'Ultimate Tactical Rifle with insane 50% base Crit Rate. Perfect synergy for Dimension skills.'
  },
  {
    id: 'nazeistras-devotion',
    name: 'Nazeistra\'s Devotion',
    category: 'Impact Rounds',
    baseAtk: 380,
    critRate: 15,
    critDamage: 2.0,
    fireRate: 150,
    reloadSpeed: 1.5,
    magazineSize: 12,
    icon: 'Target',
    description: 'Ultimate Hand Cannon. Reduces enemy DEF on weak point hits by 30% for colossal burst damage.'
  },
  {
    id: 'custom',
    name: 'Custom Weapon',
    category: 'General Rounds',
    baseAtk: 200,
    critRate: 15,
    critDamage: 1.5,
    fireRate: 600,
    reloadSpeed: 2.0,
    magazineSize: 40,
    icon: 'Sliders',
    description: 'Enter your custom weapon base stats.'
  }
];

export interface TfdModule {
  id: string;
  name: string;
  polarity: SocketPolarity;
  baseCost: number;
  maxLevel: number;
  category: 'ATK' | 'Crit' | 'Fire Rate' | 'Magazine' | 'Element' | 'Utility';
  description: string;
  statEffects: (level: number) => {
    atkPercent?: number;
    critRatePercent?: number;
    critDamagePercent?: number;
    fireRatePercent?: number;
    magazinePercent?: number;
    reloadSpeedPercent?: number; // negative is faster reload
    elementalDamagePercent?: number;
  };
}

export const TFD_MODULES: TfdModule[] = [
  {
    id: 'rifling-reinforcement',
    name: 'Rifling Reinforcement',
    polarity: 'almandine',
    baseCost: 6,
    maxLevel: 10,
    category: 'ATK',
    description: 'Increases Firearm ATK.',
    statEffects: (level) => ({
      atkPercent: 12 + level * 3.6 // +48% at max level
    })
  },
  {
    id: 'action-and-reaction',
    name: 'Action and Reaction',
    polarity: 'almandine',
    baseCost: 6,
    maxLevel: 10,
    category: 'ATK',
    description: 'Greatly increases Firearm ATK but increases Recoil.',
    statEffects: (level) => ({
      atkPercent: 15 + level * 4.6 // +61% at max level
    })
  },
  {
    id: 'better-insight',
    name: 'Better Insight',
    polarity: 'cerulean',
    baseCost: 6,
    maxLevel: 10,
    category: 'Crit',
    description: 'Increases Firearm Critical Hit Rate.',
    statEffects: (level) => ({
      critRatePercent: 10 + level * 2.9 // +39% at max level
    })
  },
  {
    id: 'better-concentration',
    name: 'Better Concentration',
    polarity: 'cerulean',
    baseCost: 6,
    maxLevel: 10,
    category: 'Crit',
    description: 'Increases Firearm Critical Hit Damage.',
    statEffects: (level) => ({
      critDamagePercent: 12 + level * 6.2 // +74% at max level
    })
  },
  {
    id: 'fire-rate-up',
    name: 'Fire Rate UP',
    polarity: 'malachite',
    baseCost: 6,
    maxLevel: 7,
    category: 'Fire Rate',
    description: 'Increases Fire Rate.',
    statEffects: (level) => ({
      fireRatePercent: 5 + level * 3.5 // +29.5% at max level
    })
  },
  {
    id: 'expand-general-rounds',
    name: 'Expand General Rounds',
    polarity: 'rutile',
    baseCost: 6,
    maxLevel: 7,
    category: 'Magazine',
    description: 'Increases Magazine Size.',
    statEffects: (level) => ({
      magazinePercent: 6 + level * 4.7 // +38.9% at max level
    })
  },
  {
    id: 'reloader-master',
    name: 'Fighter\'s Reload',
    polarity: 'rutile',
    baseCost: 5,
    maxLevel: 5,
    category: 'Utility',
    description: 'Decreases Reload Speed duration.',
    statEffects: (level) => ({
      reloadSpeedPercent: -(5 + level * 4) // -25% reload time at max level
    })
  },
  {
    id: 'fire-enhancement',
    name: 'Fire Enhancement',
    polarity: 'xantic',
    baseCost: 6,
    maxLevel: 10,
    category: 'Element',
    description: 'Adds Fire Damage based on Firearm ATK.',
    statEffects: (level) => ({
      elementalDamagePercent: 8 + level * 2.2 // +30% elemental damage at max level
    })
  },
  {
    id: 'electric-enhancement',
    name: 'Electric Enhancement',
    polarity: 'xantic',
    baseCost: 6,
    maxLevel: 10,
    category: 'Element',
    description: 'Adds Electric Damage based on Firearm ATK.',
    statEffects: (level) => ({
      elementalDamagePercent: 8 + level * 2.2 // +30% at max level
    })
  },
  {
    id: 'concentration-priority',
    name: 'Concentration Priority',
    polarity: 'cerulean',
    baseCost: 6,
    maxLevel: 10,
    category: 'Crit',
    description: 'Massive Critical Damage increase, slight reload penalty.',
    statEffects: (level) => ({
      critDamagePercent: 20 + level * 10, // +120% at max level
      reloadSpeedPercent: 5 + level * 1.5 // +20% reload penalty
    })
  }
];

export interface ModuleSlot {
  slotIndex: number;
  moduleId: string | null;
  level: number;
  socketPolarity: SocketPolarity;
}

export function calculateModuleCost(module: TfdModule | undefined, level: number, socketPolarity: SocketPolarity, globalCatalystToggle: boolean): number {
  if (!module) return 0;
  // Base cost increases slightly with levels in TFD
  const currentBaseCost = module.baseCost + Math.floor(level / 2);
  
  // Polarity check: match = halve rounded up, mismatch = +10% rounded up, none = standard
  const effectiveSocket = globalCatalystToggle && socketPolarity === 'none' ? module.polarity : socketPolarity;

  if (effectiveSocket !== 'none') {
    if (effectiveSocket === module.polarity) {
      return Math.ceil(currentBaseCost / 2);
    } else {
      return Math.ceil(currentBaseCost * 1.1);
    }
  }

  // If global catalyst toggle is on, halve cost
  if (globalCatalystToggle) {
    return Math.ceil(currentBaseCost / 2);
  }

  return currentBaseCost;
}

export const TFD_FAQS = [
  {
    question: 'How is True Average DPS calculated in The First Descendant?',
    answer: 'True Raw DPS is calculated using the official game formula: (Base ATK * (1 + (Crit Rate % * Crit Damage Multiplier))) * (Fire Rate / 60). Sustained DPS takes magazine capacity and reload speed into account: (Mag Size * Avg Damage Per Shot) / ((Mag Size / (Fire Rate / 60)) + Reload Time).'
  },
  {
    question: 'What does an Energy Activator do to Weapon Module Capacity?',
    answer: 'Applying an Energy Activator permanently increases a weapon\'s maximum Module Capacity by +20 (raising max capacity from 50 to 70 at Level 40).'
  },
  {
    question: 'How do Crystallization Catalysts halve module costs?',
    answer: 'Assigning a Crystallization Catalyst changes a module slot\'s Polarity (Almandine, Malachite, Cerulean, Rutile, Xantic). When a module\'s polarity matches the slot polarity, its capacity cost is halved (rounded up).'
  },
  {
    question: 'Which modules yield the highest DPS increase in TFD?',
    answer: 'Rifling Reinforcement (+48% ATK) and Action & Reaction (+61% ATK) provide the largest flat base damage boost. For weapons with high base Crit Rate (like Thunder Cage or Secret Garden), stacking Better Insight (+39% Crit Rate) and Better Concentration (+74% Crit Damage) yields exponential DPS multipliers.'
  }
];
