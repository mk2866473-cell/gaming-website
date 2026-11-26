/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Verified GTA Online game data (Title Update 1.73).
 * Single source of truth imported by GTA Online calculators and tools.
 */

export type NightclubGoodsId =
  | 'south-american-imports'
  | 'pharmaceutical-research'
  | 'cash-creation'
  | 'cargo-and-shipments'
  | 'sporting-goods'
  | 'organic-produce'
  | 'printing-and-copying';

export interface NightclubGoodsItem {
  id: NightclubGoodsId;
  name: string;
  sourceBusiness: string;
  valuePerUnit: number;
  minutesPerUnitBase: number;
  minutesPerUnitUpgraded: number;
  capacityPerFloor: number;
}

export const NIGHTCLUB_MAX_FLOORS = 5;
export const NIGHTCLUB_MIN_FLOORS = 1;
export const NIGHTCLUB_MAX_TECHNICIANS = 5;
export const NIGHTCLUB_TONY_CUT_RATE = 0.1;
export const NIGHTCLUB_TONY_CUT_CAP = 100000;
export const NIGHTCLUB_MAX_CRATES_ALL_TYPES = 360;
export const NIGHTCLUB_MAX_GROSS_ALL_TYPES = 1931500;
export const NIGHTCLUB_MAX_NET_ALL_TYPES = 1831500;
export const NIGHTCLUB_TOP_5_HOURLY_UPGRADED = 50496;

export const NIGHTCLUB_GOODS: NightclubGoodsItem[] = [
  {
    id: 'south-american-imports',
    name: 'South American Imports',
    sourceBusiness: 'MC Cocaine Lockup',
    valuePerUnit: 27000,
    minutesPerUnitBase: 240,
    minutesPerUnitUpgraded: 120,
    capacityPerFloor: 2
  },
  {
    id: 'pharmaceutical-research',
    name: 'Pharmaceutical Research',
    sourceBusiness: 'MC Meth Lab',
    valuePerUnit: 11475,
    minutesPerUnitBase: 120,
    minutesPerUnitUpgraded: 60,
    capacityPerFloor: 4
  },
  {
    id: 'cash-creation',
    name: 'Cash Creation',
    sourceBusiness: 'MC Counterfeit Cash Factory',
    valuePerUnit: 4725,
    minutesPerUnitBase: 60,
    minutesPerUnitUpgraded: 30,
    capacityPerFloor: 8
  },
  {
    id: 'cargo-and-shipments',
    name: 'Cargo and Shipments',
    sourceBusiness: 'CEO Special Cargo / Hangar',
    valuePerUnit: 10000,
    minutesPerUnitBase: 140,
    minutesPerUnitUpgraded: 70,
    capacityPerFloor: 10
  },
  {
    id: 'sporting-goods',
    name: 'Sporting Goods',
    sourceBusiness: 'Bunker',
    valuePerUnit: 5000,
    minutesPerUnitBase: 80,
    minutesPerUnitUpgraded: 40,
    capacityPerFloor: 20
  },
  {
    id: 'organic-produce',
    name: 'Organic Produce',
    sourceBusiness: 'MC Weed Farm',
    valuePerUnit: 2025,
    minutesPerUnitBase: 40,
    minutesPerUnitUpgraded: 20,
    capacityPerFloor: 16
  },
  {
    id: 'printing-and-copying',
    name: 'Printing & Copying',
    sourceBusiness: 'MC Document Forgery Office',
    valuePerUnit: 1350,
    minutesPerUnitBase: 30,
    minutesPerUnitUpgraded: 15,
    capacityPerFloor: 12
  }
];

export const DEFAULT_NIGHTCLUB_ASSIGNED_IDS: NightclubGoodsId[] = [
  'south-american-imports',
  'pharmaceutical-research',
  'cash-creation',
  'cargo-and-shipments',
  'sporting-goods'
];

export interface NightclubCalculationInput {
  floors: number;
  equipmentUpgrade: boolean;
  activeHours: number;
  activeMinutesOverride?: number;
  assignedGoodsIds: NightclubGoodsId[];
}

export interface NightclubGoodsBreakdown {
  item: NightclubGoodsItem;
  assigned: boolean;
  minutesPerUnit: number;
  maxCapacity: number;
  unitsProduced: number;
  value: number;
  minutesToFull: number;
  isFull: boolean;
}

export interface NightclubCalculationResult {
  floors: number;
  activeMinutes: number;
  assignedCount: number;
  breakdown: NightclubGoodsBreakdown[];
  totalUnits: number;
  totalCapacity: number;
  grossValue: number;
  tonysCut: number;
  isTonysCutCapped: boolean;
  netPayout: number;
  grossPerHour: number;
  netPerHour: number;
}

export function calculateNightclubProfit(input: NightclubCalculationInput): NightclubCalculationResult {
  const floors = Math.min(NIGHTCLUB_MAX_FLOORS, Math.max(NIGHTCLUB_MIN_FLOORS, Math.round(input.floors || 1)));
  const rawMinutes =
    typeof input.activeMinutesOverride === 'number'
      ? Math.max(0, input.activeMinutesOverride)
      : Math.max(0, input.activeHours || 0) * 60;
  const activeMinutes = Math.round(rawMinutes * 1e6) / 1e6;

  const uniqueAssigned = Array.from(new Set(input.assignedGoodsIds)).slice(0, NIGHTCLUB_MAX_TECHNICIANS);
  const assignedSet = new Set<NightclubGoodsId>(uniqueAssigned);

  const breakdown: NightclubGoodsBreakdown[] = NIGHTCLUB_GOODS.map((item) => {
    const assigned = assignedSet.has(item.id);
    const minutesPerUnit = input.equipmentUpgrade ? item.minutesPerUnitUpgraded : item.minutesPerUnitBase;
    const maxCapacity = item.capacityPerFloor * floors;
    const unitsProduced = assigned
      ? Math.min(maxCapacity, Math.floor(activeMinutes / minutesPerUnit))
      : 0;
    const value = unitsProduced * item.valuePerUnit;
    const minutesToFull = maxCapacity * minutesPerUnit;
    const isFull = assigned && unitsProduced >= maxCapacity;

    return {
      item,
      assigned,
      minutesPerUnit,
      maxCapacity,
      unitsProduced,
      value,
      minutesToFull,
      isFull
    };
  });

  const totalUnits = breakdown.reduce((sum, row) => sum + row.unitsProduced, 0);
  const totalCapacity = breakdown
    .filter((row) => row.assigned)
    .reduce((sum, row) => sum + row.maxCapacity, 0);
  const grossValue = breakdown.reduce((sum, row) => sum + row.value, 0);
  const uncappedCut = grossValue * NIGHTCLUB_TONY_CUT_RATE;
  const tonysCut = Math.min(uncappedCut, NIGHTCLUB_TONY_CUT_CAP);
  const isTonysCutCapped = uncappedCut >= NIGHTCLUB_TONY_CUT_CAP;
  const netPayout = grossValue - tonysCut;

  const activeHoursEffective = activeMinutes > 0 ? activeMinutes / 60 : 0;
  const grossPerHour = activeHoursEffective > 0 ? grossValue / activeHoursEffective : 0;
  const netPerHour = activeHoursEffective > 0 ? netPayout / activeHoursEffective : 0;

  return {
    floors,
    activeMinutes,
    assignedCount: uniqueAssigned.length,
    breakdown,
    totalUnits,
    totalCapacity,
    grossValue,
    tonysCut,
    isTonysCutCapped,
    netPayout,
    grossPerHour,
    netPerHour
  };
}

/**
 * ACID LAB — Verified Title Update 1.73 constants
 */
export const ACID_LAB_MAX_CAPACITY = 160;
export const ACID_LAB_MIN_UNITS = 1;
export const ACID_LAB_INSTALLATION_COST = 750000;
export const ACID_LAB_EQUIPMENT_UPGRADE_COST = 250000;
export const ACID_LAB_UPGRADE_FOOLIGAN_JOBS_REQUIRED = 10;
export const ACID_LAB_SUPPLY_COST_PER_UNIT = 600;
export const ACID_LAB_DAILY_BOOST_MAX_UNITS = 80;

export const ACID_LAB_RATES = {
  standard: {
    valueUnnamed: 1485,
    valueNamed: 1559,
    secondsPerUnit: 135,
    supplyUnitsPerProduct: 2
  },
  upgraded: {
    valueUnnamed: 2095,
    valueNamed: 2199,
    secondsPerUnit: 90,
    supplyUnitsPerProduct: 1
  }
} as const;

export interface AcidLabCalculationInput {
  equipmentUpgrade: boolean;
  productNamed: boolean;
  unitsToProduce: number;
  suppliesBought: boolean;
}

export interface AcidLabCalculationResult {
  units: number;
  equipmentUpgrade: boolean;
  productNamed: boolean;
  suppliesBought: boolean;
  valuePerUnit: number;
  secondsPerUnit: number;
  supplyUnitsPerProduct: number;
  revenue: number;
  supplyUnitsNeeded: number;
  supplyCost: number;
  productionSeconds: number;
  productionMinutes: number;
  productionHours: number;
  netProfit: number;
  netProfitPerHour: number;
}

export function calculateAcidLabProfit(input: AcidLabCalculationInput): AcidLabCalculationResult {
  const units = Math.min(
    ACID_LAB_MAX_CAPACITY,
    Math.max(ACID_LAB_MIN_UNITS, Math.round(input.unitsToProduce || ACID_LAB_MAX_CAPACITY))
  );

  const profile = input.equipmentUpgrade ? ACID_LAB_RATES.upgraded : ACID_LAB_RATES.standard;
  const valuePerUnit = input.productNamed ? profile.valueNamed : profile.valueUnnamed;
  const secondsPerUnit = profile.secondsPerUnit;
  const supplyUnitsPerProduct = profile.supplyUnitsPerProduct;

  const revenue = units * valuePerUnit;
  const supplyUnitsNeeded = units * supplyUnitsPerProduct;
  const supplyCost = input.suppliesBought ? supplyUnitsNeeded * ACID_LAB_SUPPLY_COST_PER_UNIT : 0;

  const productionSeconds = units * secondsPerUnit;
  const productionMinutes = productionSeconds / 60;
  const productionHours = productionMinutes / 60;

  const netProfit = revenue - supplyCost;
  const netProfitPerHour = productionHours > 0 ? netProfit / productionHours : 0;

  return {
    units,
    equipmentUpgrade: input.equipmentUpgrade,
    productNamed: input.productNamed,
    suppliesBought: input.suppliesBought,
    valuePerUnit,
    secondsPerUnit,
    supplyUnitsPerProduct,
    revenue,
    supplyUnitsNeeded,
    supplyCost,
    productionSeconds,
    productionMinutes,
    productionHours,
    netProfit,
    netProfitPerHour
  };
}

/**
 * CAYO PERICO HEIST — Verified Title Update 1.73 constants
 */
export type CayoPrimaryTargetId =
  | 'sinsimito-tequila'
  | 'ruby-necklace'
  | 'bearer-bonds'
  | 'pink-diamond'
  | 'panther-statue'
  | 'madrazo-files';

export interface CayoPrimaryTarget {
  id: CayoPrimaryTargetId;
  name: string;
  normalValue: number;
  hardValue: number | null;
  secondaryBonusPercent: number;
  firstRunOnly?: boolean;
  eventsOnly?: boolean;
}

export const CAYO_PRIMARY_TARGETS: CayoPrimaryTarget[] = [
  {
    id: 'sinsimito-tequila',
    name: 'Sinsimito Tequila',
    normalValue: 400000,
    hardValue: 440000,
    secondaryBonusPercent: 20
  },
  {
    id: 'ruby-necklace',
    name: 'Ruby Necklace',
    normalValue: 560000,
    hardValue: 616000,
    secondaryBonusPercent: 10
  },
  {
    id: 'bearer-bonds',
    name: 'Bearer Bonds',
    normalValue: 616000,
    hardValue: 677600,
    secondaryBonusPercent: 5
  },
  {
    id: 'pink-diamond',
    name: 'Pink Diamond',
    normalValue: 910000,
    hardValue: 1001000,
    secondaryBonusPercent: 0
  },
  {
    id: 'panther-statue',
    name: 'Panther Statue',
    normalValue: 1900000,
    hardValue: 2090000,
    secondaryBonusPercent: 0,
    eventsOnly: true
  },
  {
    id: 'madrazo-files',
    name: 'Madrazo Files',
    normalValue: 1100000,
    hardValue: null,
    secondaryBonusPercent: 0,
    firstRunOnly: true
  }
];

export type CayoSecondaryLootId = 'cash' | 'weed' | 'cocaine' | 'artwork' | 'gold';

export interface CayoSecondaryLootItem {
  id: CayoSecondaryLootId;
  name: string;
  averageValuePerStack: number;
  bagSpacePercent: number;
}

export const CAYO_SECONDARY_LOOT: CayoSecondaryLootItem[] = [
  { id: 'cash', name: 'Cash', averageValuePerStack: 72900, bagSpacePercent: 25 },
  { id: 'weed', name: 'Weed', averageValuePerStack: 119475, bagSpacePercent: 37.5 },
  { id: 'cocaine', name: 'Cocaine', averageValuePerStack: 180225, bagSpacePercent: 50 },
  { id: 'artwork', name: 'Artwork', averageValuePerStack: 151875, bagSpacePercent: 50 },
  { id: 'gold', name: 'Gold', averageValuePerStack: 297750, bagSpacePercent: 66.7 }
];

export const CAYO_OFFICE_SAFE_MIN = 18000;
export const CAYO_OFFICE_SAFE_MAX = 99000;
export const CAYO_OFFICE_SAFE_DEFAULT = 50000;
export const CAYO_FENCING_FEE_PERCENT = 10;
export const CAYO_PAVEL_CUT_PERCENT = 2;
export const CAYO_REPEAT_SETUP_FEE = 100000;
export const CAYO_ELITE_NORMAL = 50000;
export const CAYO_ELITE_HARD = 100000;
export const CAYO_MIN_CUT_PERCENT = 15;
export const CAYO_CUT_STEP = 5;

export interface CayoCalculationInput {
  isFirstRun: boolean;
  primaryTargetId: CayoPrimaryTargetId;
  hardMode: boolean;
  secondaryStacks: Record<CayoSecondaryLootId, number>;
  officeSafeAmount: number;
  eliteChallenge: boolean;
  playerCount: number;
  cuts: number[];
}

export interface CayoPlayerPayout {
  playerIndex: number;
  isHost: boolean;
  cutPercent: number;
  shareBeforeElite: number;
  eliteBonus: number;
  payoutWithElite: number;
  setupFeeDeducted: number;
  finalProfitAfterSetup: number;
}

export interface CayoCalculationResult {
  isValidCuts: boolean;
  cutErrors: string[];
  isFirstRun: boolean;
  effectiveHardMode: boolean;
  primaryTarget: CayoPrimaryTarget;
  primaryValue: number;
  secondaryBaseTotal: number;
  secondaryBonusPercent: number;
  secondaryBonusAmount: number;
  secondaryTotalWithBonus: number;
  totalBagPercentUsed: number;
  maxCrewBagPercent: number;
  bagCapacityExceeded: boolean;
  officeSafeAmount: number;
  grossTake: number;
  fencingFee: number;
  pavelCut: number;
  totalFees: number;
  netTake: number;
  elitePerPlayer: number;
  setupFee: number;
  playerPayouts: CayoPlayerPayout[];
  unallocatedRemainder: number;
}

export function validatePlayerCuts(playerCount: number, cuts: number[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (playerCount === 1) {
    if (cuts.length !== 1 || cuts[0] !== 100) {
      errors.push('Solo run cut must be 100%.');
    }
    return { isValid: errors.length === 0, errors };
  }

  if (cuts.length !== playerCount) {
    errors.push(`Expected ${playerCount} player cuts.`);
    return { isValid: false, errors };
  }

  cuts.forEach((cut, idx) => {
    const label = idx === 0 ? 'Host' : `Player ${idx + 1}`;
    if (!Number.isInteger(cut) || cut % CAYO_CUT_STEP !== 0) {
      errors.push(`${label} cut (${cut}%) must be a multiple of ${CAYO_CUT_STEP}%.`);
    }
    if (cut < CAYO_MIN_CUT_PERCENT) {
      errors.push(`${label} cut (${cut}%) must be at least ${CAYO_MIN_CUT_PERCENT}%.`);
    }
  });

  const total = cuts.reduce((sum, c) => sum + c, 0);
  if (total !== 100) {
    errors.push(`Player cuts must total 100% (currently ${total}%).`);
  }

  return { isValid: errors.length === 0, errors };
}

export function calculateCayoPericoPayout(input: CayoCalculationInput): CayoCalculationResult {
  const playerCount = Math.min(4, Math.max(1, Math.round(input.playerCount || 1)));
  const activeCuts =
    playerCount === 1
      ? [100]
      : Array.from({ length: playerCount }, (_, idx) => input.cuts[idx] ?? 0);

  const cutValidation = validatePlayerCuts(playerCount, activeCuts);

  const primaryTarget = input.isFirstRun
    ? CAYO_PRIMARY_TARGETS.find((t) => t.id === 'madrazo-files')!
    : CAYO_PRIMARY_TARGETS.find((t) => t.id === input.primaryTargetId && !t.firstRunOnly) ||
      CAYO_PRIMARY_TARGETS[0];

  const effectiveHardMode = !input.isFirstRun && input.hardMode && primaryTarget.hardValue !== null;
  const primaryValue =
    effectiveHardMode && primaryTarget.hardValue !== null
      ? primaryTarget.hardValue
      : primaryTarget.normalValue;

  let secondaryBaseTotal = 0;
  let totalBagPercentUsed = 0;

  for (const loot of CAYO_SECONDARY_LOOT) {
    const stacks = Math.max(0, Number(input.secondaryStacks[loot.id] || 0));
    secondaryBaseTotal += Math.round(stacks * loot.averageValuePerStack);
    totalBagPercentUsed += stacks * loot.bagSpacePercent;
  }

  const secondaryBonusPercent = input.isFirstRun ? 0 : primaryTarget.secondaryBonusPercent;
  const secondaryBonusAmount = Math.floor((secondaryBaseTotal * secondaryBonusPercent) / 100);
  const secondaryTotalWithBonus = secondaryBaseTotal + secondaryBonusAmount;

  const maxCrewBagPercent = playerCount * 100;
  const bagCapacityExceeded = totalBagPercentUsed > maxCrewBagPercent + 1e-6;

  const officeSafeAmount = Math.max(0, Math.round(input.officeSafeAmount || 0));
  const grossTake = primaryValue + secondaryTotalWithBonus + officeSafeAmount;

  const fencingFee = input.isFirstRun
    ? 0
    : Math.floor((grossTake * CAYO_FENCING_FEE_PERCENT) / 100);
  const pavelCut = input.isFirstRun
    ? 0
    : Math.floor((grossTake * CAYO_PAVEL_CUT_PERCENT) / 100);
  const totalFees = fencingFee + pavelCut;
  const netTake = grossTake - totalFees;

  const elitePerPlayer = input.eliteChallenge
    ? effectiveHardMode
      ? CAYO_ELITE_HARD
      : CAYO_ELITE_NORMAL
    : 0;

  const setupFee = input.isFirstRun ? 0 : CAYO_REPEAT_SETUP_FEE;

  const playerPayouts: CayoPlayerPayout[] = activeCuts.map((cutPercent, idx) => {
    const isHost = idx === 0;
    const shareBeforeElite = Math.floor((netTake * cutPercent) / 100);
    const payoutWithElite = shareBeforeElite + elitePerPlayer;
    const setupFeeDeducted = isHost ? setupFee : 0;
    const finalProfitAfterSetup = payoutWithElite - setupFeeDeducted;
    return {
      playerIndex: idx + 1,
      isHost,
      cutPercent,
      shareBeforeElite,
      eliteBonus: elitePerPlayer,
      payoutWithElite,
      setupFeeDeducted,
      finalProfitAfterSetup
    };
  });

  const allocatedSum = playerPayouts.reduce((sum, p) => sum + p.shareBeforeElite, 0);
  const unallocatedRemainder = cutValidation.isValid ? Math.max(0, netTake - allocatedSum) : 0;

  return {
    isValidCuts: cutValidation.isValid,
    cutErrors: cutValidation.errors,
    isFirstRun: input.isFirstRun,
    effectiveHardMode,
    primaryTarget,
    primaryValue,
    secondaryBaseTotal,
    secondaryBonusPercent,
    secondaryBonusAmount,
    secondaryTotalWithBonus,
    totalBagPercentUsed: Math.round(totalBagPercentUsed * 100) / 100,
    maxCrewBagPercent,
    bagCapacityExceeded,
    officeSafeAmount,
    grossTake,
    fencingFee,
    pavelCut,
    totalFees,
    netTake,
    elitePerPlayer,
    setupFee,
    playerPayouts,
    unallocatedRemainder
  };
}

/**
 * HEIST SPLIT CALCULATOR — Verified preset payouts & NPC deductions
 */
export type HeistCategoryId = 'original' | 'doomsday' | 'casino' | 'custom';
export type HeistDifficulty = 'easy' | 'normal' | 'hard';

export interface OriginalHeistPreset {
  id: string;
  name: string;
  easy: number;
  normal: number;
  hard: number;
  setupCost: number;
  exactPlayers: number;
}

export const ORIGINAL_HEISTS: OriginalHeistPreset[] = [
  {
    id: 'fleeca-job',
    name: 'The Fleeca Job',
    easy: 100625,
    normal: 201250,
    hard: 251563,
    setupCost: 11500,
    exactPlayers: 2
  },
  {
    id: 'prison-break',
    name: 'The Prison Break',
    easy: 350000,
    normal: 700000,
    hard: 875000,
    setupCost: 25000,
    exactPlayers: 4
  },
  {
    id: 'humane-labs-raid',
    name: 'The Humane Labs Raid',
    easy: 472500,
    normal: 945000,
    hard: 1181250,
    setupCost: 25000,
    exactPlayers: 4
  },
  {
    id: 'series-a-funding',
    name: 'Series A Funding',
    easy: 353500,
    normal: 707000,
    hard: 883750,
    setupCost: 25000,
    exactPlayers: 4
  },
  {
    id: 'pacific-standard-job',
    name: 'The Pacific Standard Job',
    easy: 750000,
    normal: 1500000,
    hard: 1875000,
    setupCost: 25000,
    exactPlayers: 4
  }
];

export interface DoomsdayHeistPreset {
  id: string;
  name: string;
  normal: number;
  hard: number;
  setupCost: number;
}

export const DOOMSDAY_HEISTS: DoomsdayHeistPreset[] = [
  {
    id: 'doomsday-act-1',
    name: 'Act I: The Data Breaches',
    normal: 877500,
    hard: 1096875,
    setupCost: 65000
  },
  {
    id: 'doomsday-act-2',
    name: 'Act II: The Bogdan Problem',
    normal: 1282500,
    hard: 1603125,
    setupCost: 95000
  },
  {
    id: 'doomsday-act-3',
    name: 'Act III: The Doomsday Scenario',
    normal: 1620000,
    hard: 2025000,
    setupCost: 120000
  }
];

export const DOOMSDAY_ELITE_BONUS = 50000;

export interface CasinoVaultTarget {
  id: 'cash' | 'artwork' | 'gold' | 'diamonds';
  name: string;
  normal: number;
  hard: number;
  eventWeeksOnly?: boolean;
}

export const CASINO_VAULT_TARGETS: CasinoVaultTarget[] = [
  { id: 'cash', name: 'Cash', normal: 1480500, hard: 1628550 },
  { id: 'artwork', name: 'Artwork', normal: 1645000, hard: 1809500 },
  { id: 'gold', name: 'Gold', normal: 1809500, hard: 1990450 },
  { id: 'diamonds', name: 'Diamonds', normal: 2303000, hard: 2533300, eventWeeksOnly: true }
];

export const CASINO_SETUP_COST = 25000;
export const CASINO_LESTER_PERCENT = 5;
export const CASINO_ELITE_NORMAL = 50000;
export const CASINO_ELITE_HARD = 100000;

export interface CasinoCrewMember {
  id: string;
  name: string;
  cutPercent: number;
}

export const CASINO_GUNMEN: CasinoCrewMember[] = [
  { id: 'karl-abolaji', name: 'Karl Abolaji', cutPercent: 5 },
  { id: 'charlie-reed', name: 'Charlie Reed', cutPercent: 7 },
  { id: 'patrick-mcreary', name: 'Patrick McReary', cutPercent: 8 },
  { id: 'gustavo-mota', name: 'Gustavo Mota', cutPercent: 9 },
  { id: 'chester-mccoy-gunman', name: 'Chester McCoy', cutPercent: 10 }
];

export const CASINO_DRIVERS: CasinoCrewMember[] = [
  { id: 'karim-denz', name: 'Karim Denz', cutPercent: 5 },
  { id: 'zach-nelson', name: 'Zach Nelson', cutPercent: 6 },
  { id: 'taliana-martinez', name: 'Taliana Martinez', cutPercent: 7 },
  { id: 'eddie-toh', name: 'Eddie Toh', cutPercent: 9 },
  { id: 'chester-mccoy-driver', name: 'Chester McCoy', cutPercent: 10 }
];

export const CASINO_HACKERS: CasinoCrewMember[] = [
  { id: 'rickie-lukens', name: 'Rickie Lukens', cutPercent: 3 },
  { id: 'yohan-blair', name: 'Yohan Blair', cutPercent: 5 },
  { id: 'christian-feltz', name: 'Christian Feltz', cutPercent: 7 },
  { id: 'paige-harris', name: 'Paige Harris', cutPercent: 9 },
  { id: 'avi-schwartzman', name: 'Avi Schwartzman', cutPercent: 10 }
];

export interface HeistSplitDeductionLine {
  label: string;
  percent: number;
  amount: number;
}

export interface HeistSplitPlayerPayout {
  playerIndex: number;
  isHost: boolean;
  cutPercent: number;
  grossShare: number;
  setupDeducted: number;
  eliteBonus: number;
  finalTakeHome: number;
}

export interface HeistSplitInput {
  category: HeistCategoryId;
  originalHeistId?: string;
  doomsdayHeistId?: string;
  casinoTargetId?: CasinoVaultTarget['id'];
  casinoGunmanId?: string;
  casinoDriverId?: string;
  casinoHackerId?: string;
  difficulty: HeistDifficulty;
  eliteChallenge: boolean;
  customGross?: number;
  customSetupCost?: number;
  customExtraFeePercent?: number;
  playerCount: number;
  cuts: number[];
}

export interface HeistSplitResult {
  isValidCuts: boolean;
  cutErrors: string[];
  heistTitle: string;
  playerCount: number;
  grossTake: number;
  deductions: HeistSplitDeductionLine[];
  totalDeductions: number;
  netTake: number;
  setupCost: number;
  supportsElite: boolean;
  elitePerPlayer: number;
  playerPayouts: HeistSplitPlayerPayout[];
  unallocatedRemainder: number;
}

export function calculateHeistSplit(input: HeistSplitInput): HeistSplitResult {
  let heistTitle = 'Custom Heist';
  let grossTake = 0;
  let setupCost = 0;
  let playerCount = Math.min(4, Math.max(2, Math.round(input.playerCount || 2)));
  let supportsElite = false;
  let elitePerPlayer = 0;
  const deductions: HeistSplitDeductionLine[] = [];

  if (input.category === 'original') {
    const preset =
      ORIGINAL_HEISTS.find((h) => h.id === input.originalHeistId) || ORIGINAL_HEISTS[0];
    heistTitle = preset.name;
    playerCount = preset.exactPlayers;
    setupCost = preset.setupCost;
    grossTake =
      input.difficulty === 'easy'
        ? preset.easy
        : input.difficulty === 'hard'
        ? preset.hard
        : preset.normal;
  } else if (input.category === 'doomsday') {
    const preset =
      DOOMSDAY_HEISTS.find((h) => h.id === input.doomsdayHeistId) || DOOMSDAY_HEISTS[0];
    heistTitle = preset.name;
    setupCost = preset.setupCost;
    const diff = input.difficulty === 'hard' ? 'hard' : 'normal';
    grossTake = diff === 'hard' ? preset.hard : preset.normal;
    supportsElite = true;
    elitePerPlayer = input.eliteChallenge ? DOOMSDAY_ELITE_BONUS : 0;
  } else if (input.category === 'casino') {
    const target =
      CASINO_VAULT_TARGETS.find((t) => t.id === input.casinoTargetId) || CASINO_VAULT_TARGETS[0];
    const diff = input.difficulty === 'hard' ? 'hard' : 'normal';
    heistTitle = `Diamond Casino Heist (${target.name})`;
    setupCost = CASINO_SETUP_COST;
    grossTake = diff === 'hard' ? target.hard : target.normal;
    supportsElite = true;
    elitePerPlayer = input.eliteChallenge
      ? diff === 'hard'
        ? CASINO_ELITE_HARD
        : CASINO_ELITE_NORMAL
      : 0;

    const gunman =
      CASINO_GUNMEN.find((g) => g.id === input.casinoGunmanId) || CASINO_GUNMEN[0];
    const driver =
      CASINO_DRIVERS.find((d) => d.id === input.casinoDriverId) || CASINO_DRIVERS[0];
    const hacker =
      CASINO_HACKERS.find((h) => h.id === input.casinoHackerId) || CASINO_HACKERS[0];

    deductions.push({
      label: 'Lester',
      percent: CASINO_LESTER_PERCENT,
      amount: Math.floor((grossTake * CASINO_LESTER_PERCENT) / 100)
    });
    deductions.push({
      label: `Gunman (${gunman.name})`,
      percent: gunman.cutPercent,
      amount: Math.floor((grossTake * gunman.cutPercent) / 100)
    });
    deductions.push({
      label: `Driver (${driver.name})`,
      percent: driver.cutPercent,
      amount: Math.floor((grossTake * driver.cutPercent) / 100)
    });
    deductions.push({
      label: `Hacker (${hacker.name})`,
      percent: hacker.cutPercent,
      amount: Math.floor((grossTake * hacker.cutPercent) / 100)
    });
  } else {
    grossTake = Math.max(0, Math.round(input.customGross || 0));
    setupCost = Math.max(0, Math.round(input.customSetupCost || 0));
    const extraFeePct = Math.max(0, Math.min(100, Number(input.customExtraFeePercent || 0)));
    if (extraFeePct > 0) {
      deductions.push({
        label: 'Extra Fee',
        percent: extraFeePct,
        amount: Math.floor((grossTake * extraFeePct) / 100)
      });
    }
  }

  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const netTake = Math.max(0, grossTake - totalDeductions);

  const activeCuts = Array.from({ length: playerCount }, (_, idx) => input.cuts[idx] ?? 0);
  const cutValidation = validatePlayerCuts(playerCount, activeCuts);

  const playerPayouts: HeistSplitPlayerPayout[] = activeCuts.map((cutPercent, idx) => {
    const isHost = idx === 0;
    const grossShare = Math.floor((netTake * cutPercent) / 100);
    const setupDeducted = isHost ? setupCost : 0;
    const finalTakeHome = grossShare - setupDeducted + elitePerPlayer;
    return {
      playerIndex: idx + 1,
      isHost,
      cutPercent,
      grossShare,
      setupDeducted,
      eliteBonus: elitePerPlayer,
      finalTakeHome
    };
  });

  const allocatedSum = playerPayouts.reduce((sum, p) => sum + p.grossShare, 0);
  const unallocatedRemainder = cutValidation.isValid ? Math.max(0, netTake - allocatedSum) : 0;

  return {
    isValidCuts: cutValidation.isValid,
    cutErrors: cutValidation.errors,
    heistTitle,
    playerCount,
    grossTake,
    deductions,
    totalDeductions,
    netTake,
    setupCost,
    supportsElite,
    elitePerPlayer,
    playerPayouts,
    unallocatedRemainder
  };
}

/**
 * BUSINESS ROI / PAYBACK CALCULATOR — Verified current game version constants
 */
export type BusinessRoiPresetId =
  | 'acid-lab-standard'
  | 'acid-lab-upgraded'
  | 'nightclub-top5-upgraded'
  | 'bunker-no-upgrades'
  | 'bunker-upgraded'
  | 'custom';

export interface BusinessLocationOption {
  id: string;
  name: string;
  cost: number;
}

export const NIGHTCLUB_LOCATIONS: BusinessLocationOption[] = [
  { id: 'elysian-island', name: 'Elysian Island', cost: 1080000 },
  { id: 'lsia', name: 'LSIA', cost: 1135000 },
  { id: 'vespucci-canals', name: 'Vespucci Canals', cost: 1320000 },
  { id: 'cypress-flats', name: 'Cypress Flats', cost: 1370000 },
  { id: 'mission-row', name: 'Mission Row', cost: 1440000 },
  { id: 'la-mesa', name: 'La Mesa', cost: 1500000 },
  { id: 'strawberry', name: 'Strawberry', cost: 1525000 },
  { id: 'del-perro', name: 'Del Perro', cost: 1645000 },
  { id: 'downtown-vinewood', name: 'Downtown Vinewood', cost: 1670000 },
  { id: 'west-vinewood', name: 'West Vinewood', cost: 1700000 }
];

export const BUNKER_LOCATIONS: BusinessLocationOption[] = [
  { id: 'paleto-forest', name: 'Paleto Forest', cost: 1165000 },
  { id: 'raton-canyon', name: 'Raton Canyon', cost: 1450000 },
  { id: 'lago-zancudo', name: 'Lago Zancudo', cost: 1550000 },
  { id: 'chumash', name: 'Chumash', cost: 1650000 },
  { id: 'grapeseed', name: 'Grapeseed', cost: 1750000 },
  { id: 'route-68', name: 'Route 68', cost: 1950000 },
  { id: 'grand-senora-oilfields', name: 'Grand Senora Oilfields', cost: 2035000 },
  { id: 'grand-senora-desert', name: 'Grand Senora Desert', cost: 2120000 },
  { id: 'smoke-tree-road', name: 'Smoke Tree Road', cost: 2205000 },
  { id: 'thompson-scrapyard', name: 'Thompson Scrapyard', cost: 2290000 },
  { id: 'farmhouse', name: 'Farmhouse', cost: 2375000 }
];

export const ROI_ACID_LAB_STANDARD_SETUP = 750000;
export const ROI_ACID_LAB_STANDARD_NET_PER_HOUR = 7600;
export const ROI_ACID_LAB_UPGRADED_SETUP = 750000 + 250000;
export const ROI_ACID_LAB_UPGRADED_NET_PER_HOUR = 63960;

export const ROI_NIGHTCLUB_EQUIPMENT_UPGRADE_COST = 1425000;
export const ROI_NIGHTCLUB_EXTRA_TECHNICIANS_COST = 878000;
export const ROI_NIGHTCLUB_GROSS_PER_HOUR = 50496;
export const ROI_NIGHTCLUB_NET_PER_HOUR = 45446;

export const ROI_BUNKER_NO_UPGRADES_NET_PER_HOUR = 22500;
export const ROI_BUNKER_EQUIPMENT_UPGRADE_COST = 1155000;
export const ROI_BUNKER_STAFF_UPGRADE_COST = 598500;
export const ROI_BUNKER_UPGRADED_NET_PER_HOUR = 57857;

export interface BusinessRoiPresetMeta {
  id: BusinessRoiPresetId;
  name: string;
  shortLabel: string;
  locationType: 'none' | 'nightclub' | 'bunker';
  netPerHour: number | null;
  note?: string;
}

export const BUSINESS_ROI_PRESETS: BusinessRoiPresetMeta[] = [
  {
    id: 'acid-lab-standard',
    name: 'Acid Lab — Standard',
    shortLabel: 'Acid Lab (Standard)',
    locationType: 'none',
    netPerHour: ROI_ACID_LAB_STANDARD_NET_PER_HOUR
  },
  {
    id: 'acid-lab-upgraded',
    name: 'Acid Lab — Upgraded & Named',
    shortLabel: 'Acid Lab (Upgraded & Named)',
    locationType: 'none',
    netPerHour: ROI_ACID_LAB_UPGRADED_NET_PER_HOUR
  },
  {
    id: 'nightclub-top5-upgraded',
    name: 'Nightclub — Top-5 Technicians + Equipment Upgrade',
    shortLabel: 'Nightclub (Top-5 + Upgrade)',
    locationType: 'nightclub',
    netPerHour: ROI_NIGHTCLUB_NET_PER_HOUR,
    note: "This rate is the $50,496/hour gross of the Nightclub Profit Calculator with Tony's 10% applied."
  },
  {
    id: 'bunker-no-upgrades',
    name: 'Bunker — No Upgrades (Los Santos sales)',
    shortLabel: 'Bunker (No Upgrades)',
    locationType: 'bunker',
    netPerHour: ROI_BUNKER_NO_UPGRADES_NET_PER_HOUR
  },
  {
    id: 'bunker-upgraded',
    name: 'Bunker — Equipment + Staff Upgrades (Los Santos sales)',
    shortLabel: 'Bunker (Equip + Staff)',
    locationType: 'bunker',
    netPerHour: ROI_BUNKER_UPGRADED_NET_PER_HOUR
  },
  {
    id: 'custom',
    name: 'Custom Business',
    shortLabel: 'Custom',
    locationType: 'none',
    netPerHour: null
  }
];

export interface BusinessRoiComponentLine {
  label: string;
  amount: number;
}

export interface BusinessRoiInput {
  presetId: BusinessRoiPresetId;
  nightclubLocationId?: string;
  bunkerLocationId?: string;
  customSetupCost?: number;
  customNetPerHour?: number;
  otherCosts?: number;
  hoursPerDay: number;
}

export interface BusinessRoiResult {
  preset: BusinessRoiPresetMeta;
  components: BusinessRoiComponentLine[];
  presetSetupCost: number;
  otherCosts: number;
  totalSetupCost: number;
  netPerHour: number;
  hoursPerDay: number;
  paybackHours: number | null;
  paybackHoursFormatted: string;
  paybackDays: number | null;
  paybackDaysFormatted: string;
  weeklyProfit: number;
}

export function calculateBusinessRoi(input: BusinessRoiInput): BusinessRoiResult {
  const preset =
    BUSINESS_ROI_PRESETS.find((p) => p.id === input.presetId) || BUSINESS_ROI_PRESETS[0];

  const components: BusinessRoiComponentLine[] = [];
  let netPerHour = 0;

  if (preset.id === 'acid-lab-standard') {
    components.push({ label: 'Lab Installation', amount: ACID_LAB_INSTALLATION_COST });
    netPerHour = ROI_ACID_LAB_STANDARD_NET_PER_HOUR;
  } else if (preset.id === 'acid-lab-upgraded') {
    components.push({ label: 'Lab Installation', amount: ACID_LAB_INSTALLATION_COST });
    components.push({ label: 'Equipment Upgrade', amount: ACID_LAB_EQUIPMENT_UPGRADE_COST });
    netPerHour = ROI_ACID_LAB_UPGRADED_NET_PER_HOUR;
  } else if (preset.id === 'nightclub-top5-upgraded') {
    const loc =
      NIGHTCLUB_LOCATIONS.find((l) => l.id === input.nightclubLocationId) ||
      NIGHTCLUB_LOCATIONS[0];
    components.push({ label: `Nightclub (${loc.name})`, amount: loc.cost });
    components.push({ label: 'Equipment Upgrade', amount: ROI_NIGHTCLUB_EQUIPMENT_UPGRADE_COST });
    components.push({ label: 'Extra Technicians', amount: ROI_NIGHTCLUB_EXTRA_TECHNICIANS_COST });
    netPerHour = ROI_NIGHTCLUB_NET_PER_HOUR;
  } else if (preset.id === 'bunker-no-upgrades') {
    const loc =
      BUNKER_LOCATIONS.find((l) => l.id === input.bunkerLocationId) || BUNKER_LOCATIONS[0];
    components.push({ label: `Bunker (${loc.name})`, amount: loc.cost });
    netPerHour = ROI_BUNKER_NO_UPGRADES_NET_PER_HOUR;
  } else if (preset.id === 'bunker-upgraded') {
    const loc =
      BUNKER_LOCATIONS.find((l) => l.id === input.bunkerLocationId) || BUNKER_LOCATIONS[0];
    components.push({ label: `Bunker (${loc.name})`, amount: loc.cost });
    components.push({ label: 'Equipment Upgrade', amount: ROI_BUNKER_EQUIPMENT_UPGRADE_COST });
    components.push({ label: 'Staff Upgrade', amount: ROI_BUNKER_STAFF_UPGRADE_COST });
    netPerHour = ROI_BUNKER_UPGRADED_NET_PER_HOUR;
  } else {
    const customSetup = Math.max(0, Math.round(input.customSetupCost || 0));
    components.push({ label: 'Custom Setup Cost', amount: customSetup });
    netPerHour = Math.max(0, Math.round(input.customNetPerHour || 0));
  }

  const presetSetupCost = components.reduce((sum, c) => sum + c.amount, 0);
  const otherCosts = Math.max(0, Math.round(input.otherCosts || 0));
  const totalSetupCost = presetSetupCost + otherCosts;
  const hoursPerDay = Math.max(0, Number(input.hoursPerDay) || 0);

  const paybackHours = netPerHour > 0 ? totalSetupCost / netPerHour : null;
  const paybackDays =
    paybackHours !== null && hoursPerDay > 0 ? paybackHours / hoursPerDay : null;
  const weeklyProfit = Math.round(netPerHour * hoursPerDay * 7);

  return {
    preset,
    components,
    presetSetupCost,
    otherCosts,
    totalSetupCost,
    netPerHour,
    hoursPerDay,
    paybackHours,
    paybackHoursFormatted: paybackHours !== null ? paybackHours.toFixed(1) : '—',
    paybackDays,
    paybackDaysFormatted: paybackDays !== null ? paybackDays.toFixed(1) : '—',
    weeklyProfit
  };
}

/**
 * COOLDOWN PLANNER — Verified fixed cooldown durations & static reset rules
 */
export type CooldownActivityId =
  | 'cayo-perico-solo'
  | 'cayo-perico-crew'
  | 'payphone-hit'
  | 'security-contract'
  | 'fooligan-job'
  | 'auto-shop-contract'
  | 'dr-dre-vip-contract';

export interface CooldownActivity {
  id: CooldownActivityId;
  name: string;
  cooldownMinutes: number;
  note?: string;
}

export const COOLDOWN_ACTIVITIES: CooldownActivity[] = [
  {
    id: 'cayo-perico-solo',
    name: 'Cayo Perico Heist (solo finale)',
    cooldownMinutes: 144
  },
  {
    id: 'cayo-perico-crew',
    name: 'Cayo Perico Heist (crew finale)',
    cooldownMinutes: 48
  },
  {
    id: 'payphone-hit',
    name: 'Payphone Hit',
    cooldownMinutes: 10
  },
  {
    id: 'security-contract',
    name: 'Security Contract',
    cooldownMinutes: 5
  },
  {
    id: 'fooligan-job',
    name: 'Fooligan Job',
    cooldownMinutes: 48
  },
  {
    id: 'auto-shop-contract',
    name: 'Auto Shop Robbery Contract (same contract)',
    cooldownMinutes: 48,
    note: 'Three contracts sit on the board, so rotating contracts avoids the wait.'
  },
  {
    id: 'dr-dre-vip-contract',
    name: 'Dr. Dre VIP Contract (replay)',
    cooldownMinutes: 48
  }
];

export const COOLDOWN_STATIC_REFERENCES = [
  {
    label: 'Salvage Yard Robberies Cap',
    value: '3 per weekly reset'
  },
  {
    label: 'Weekly Reset Schedule',
    value: 'Thursdays at about 10:00 UTC'
  },
  {
    label: 'Acid Lab Production Boost Reset',
    value: 'Daily at 06:00 GMT'
  }
] as const;

export interface CooldownReadyResult {
  activity: CooldownActivity;
  finishedTime24: string;
  cooldownMinutes: number;
  readyTime24: string;
  dayOffset: number;
}

export function calculateCooldownReadyTime(
  activityId: CooldownActivityId,
  finishedTimeHHMM: string
): CooldownReadyResult {
  const activity =
    COOLDOWN_ACTIVITIES.find((a) => a.id === activityId) || COOLDOWN_ACTIVITIES[0];

  const match = /^(\d{1,2}):(\d{2})$/.exec((finishedTimeHHMM || '').trim());
  const rawHours = match ? Math.min(23, Math.max(0, parseInt(match[1], 10))) : 0;
  const rawMinutes = match ? Math.min(59, Math.max(0, parseInt(match[2], 10))) : 0;

  const startTotalMinutes = rawHours * 60 + rawMinutes;
  const readyTotalRaw = startTotalMinutes + activity.cooldownMinutes;
  const dayOffset = Math.floor(readyTotalRaw / 1440);
  const readyTotalMod = ((readyTotalRaw % 1440) + 1440) % 1440;

  const readyHours = Math.floor(readyTotalMod / 60);
  const readyMinutes = readyTotalMod % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  return {
    activity,
    finishedTime24: `${pad(rawHours)}:${pad(rawMinutes)}`,
    cooldownMinutes: activity.cooldownMinutes,
    readyTime24: `${pad(readyHours)}:${pad(readyMinutes)}`,
    dayOffset
  };
}

/**
 * BUNKER — Verified Title Update 1.73 base constants
 */
export const BUNKER_CONFIG = {
  capacityUnits: 100,
  valuePerUnitLocal: {
    noUpgrades: 5000,
    upgraded: 7000
  },
  losSantosSaleMultiplier: 1.5,
  minutesPerUnit: {
    noUpgrades: 10,
    upgraded: 7
  },
  supplyCostPerUnitBought: 3750,
  supplyBarCost: 75000,
  unitsPerSupplyBar: 20,
  singleVehicleMaxUnits: 25,
  upgradeCosts: {
    equipment: 1155000,
    staff: 598500
  }
} as const;

export type BunkerSaleDestination = 'local' | 'los-santos';

export interface BunkerCalculationInput {
  units: number;
  upgraded: boolean;
  destination: BunkerSaleDestination;
  suppliesBought: boolean;
}

export interface BunkerCalculationResult {
  units: number;
  upgraded: boolean;
  destination: BunkerSaleDestination;
  suppliesBought: boolean;
  unitValue: number;
  gross: number;
  supplyCost: number;
  net: number;
  productionMinutes: number;
  netPerHour: number;
  deliveryVehiclesLabel: string;
  deliveryVehiclesNote: string;
}

export function calculateBunkerProfit(input: BunkerCalculationInput): BunkerCalculationResult {
  const units = Math.min(
    BUNKER_CONFIG.capacityUnits,
    Math.max(0, Math.round(Number.isFinite(input.units) ? input.units : 0))
  );
  const baseUnitValue = input.upgraded
    ? BUNKER_CONFIG.valuePerUnitLocal.upgraded
    : BUNKER_CONFIG.valuePerUnitLocal.noUpgrades;
  const unitValue =
    baseUnitValue * (input.destination === 'los-santos' ? BUNKER_CONFIG.losSantosSaleMultiplier : 1);

  const gross = units * unitValue;
  const supplyCost = input.suppliesBought ? units * BUNKER_CONFIG.supplyCostPerUnitBought : 0;
  const net = gross - supplyCost;
  const minsPerUnit = input.upgraded
    ? BUNKER_CONFIG.minutesPerUnit.upgraded
    : BUNKER_CONFIG.minutesPerUnit.noUpgrades;
  const productionMinutes = units * minsPerUnit;
  const netPerHour = units === 0 ? 0 : Math.round(net / (productionMinutes / 60));

  let deliveryVehiclesLabel = '1 (guaranteed)';
  let deliveryVehiclesNote = 'Selling 25 units or fewer always uses a single delivery vehicle.';
  if (units === 0) {
    deliveryVehiclesLabel = '0 (no stock)';
    deliveryVehiclesNote = 'Add stock units to estimate delivery vehicle count.';
  } else if (units > BUNKER_CONFIG.singleVehicleMaxUnits) {
    const fewest = Math.ceil(units / 50);
    const most = Math.min(4, Math.ceil(units / 25));
    deliveryVehiclesLabel = fewest === most ? `${fewest}` : `${fewest}–${most}`;
    deliveryVehiclesNote = 'Depends on the delivery-vehicle type drawn.';
  }

  return {
    units,
    upgraded: input.upgraded,
    destination: input.destination,
    suppliesBought: input.suppliesBought,
    unitValue,
    gross,
    supplyCost,
    net,
    productionMinutes,
    netPerHour,
    deliveryVehiclesLabel,
    deliveryVehiclesNote
  };
}

/**
 * MC BUSINESSES — Verified Title Update 1.73 base constants
 */
export type McBusinessId = 'cocaine' | 'meth' | 'cash' | 'weed' | 'forgery';

export interface McBusinessPreset {
  id: McBusinessId;
  name: string;
  capacityUnits: number;
  valuePerUnitLocalBase: number;
  valuePerUnitLocalUpgraded: number;
  minutesPerUnitBase: number;
  minutesPerUnitUpgraded: number;
  fullStockSupplyCostBase: number;
  fullStockSupplyCostUpgraded: number;
}

export const MC_FAR_SALE_MULTIPLIER = 1.5;
export const MC_SUPPLY_BAR_COST = 75000;

export const MC_BUSINESSES: McBusinessPreset[] = [
  {
    id: 'cocaine',
    name: 'Cocaine Lockup',
    capacityUnits: 10,
    valuePerUnitLocalBase: 27000,
    valuePerUnitLocalUpgraded: 35000,
    minutesPerUnitBase: 50,
    minutesPerUnitUpgraded: 30,
    fullStockSupplyCostBase: 375000,
    fullStockSupplyCostUpgraded: 187500
  },
  {
    id: 'meth',
    name: 'Methamphetamine Lab',
    capacityUnits: 20,
    valuePerUnitLocalBase: 11475,
    valuePerUnitLocalUpgraded: 14875,
    minutesPerUnitBase: 30,
    minutesPerUnitUpgraded: 18,
    fullStockSupplyCostBase: 375000,
    fullStockSupplyCostUpgraded: 187500
  },
  {
    id: 'cash',
    name: 'Counterfeit Cash Factory',
    capacityUnits: 40,
    valuePerUnitLocalBase: 4725,
    valuePerUnitLocalUpgraded: 6125,
    minutesPerUnitBase: 12,
    minutesPerUnitUpgraded: 8,
    fullStockSupplyCostBase: 300000,
    fullStockSupplyCostUpgraded: 150000
  },
  {
    id: 'weed',
    name: 'Weed Farm',
    capacityUnits: 80,
    valuePerUnitLocalBase: 2025,
    valuePerUnitLocalUpgraded: 2625,
    minutesPerUnitBase: 6,
    minutesPerUnitUpgraded: 4,
    fullStockSupplyCostBase: 240000,
    fullStockSupplyCostUpgraded: 120000
  },
  {
    id: 'forgery',
    name: 'Document Forgery Office',
    capacityUnits: 60,
    valuePerUnitLocalBase: 1350,
    valuePerUnitLocalUpgraded: 1750,
    minutesPerUnitBase: 5,
    minutesPerUnitUpgraded: 3,
    fullStockSupplyCostBase: 180000,
    fullStockSupplyCostUpgraded: 90000
  }
];

export type McSaleDestination = 'local' | 'far';

export interface McBusinessCalculationInput {
  businessId: McBusinessId;
  stockPercent: number;
  upgraded: boolean;
  destination: McSaleDestination;
  suppliesBought: boolean;
}

export interface McBusinessCalculationResult {
  business: McBusinessPreset;
  stockPercent: number;
  units: number;
  unitValue: number;
  gross: number;
  supplyCost: number;
  net: number;
  productionMinutes: number;
  netPerHour: number;
}

export function calculateMcBusinessProfit(
  input: McBusinessCalculationInput
): McBusinessCalculationResult {
  const business = MC_BUSINESSES.find((b) => b.id === input.businessId) ?? MC_BUSINESSES[0];
  const stockPercent = Math.min(
    100,
    Math.max(0, Number.isFinite(input.stockPercent) ? input.stockPercent : 0)
  );
  const units = Math.floor((business.capacityUnits * stockPercent) / 100);
  const localVal = input.upgraded
    ? business.valuePerUnitLocalUpgraded
    : business.valuePerUnitLocalBase;
  const unitValue = localVal * (input.destination === 'far' ? MC_FAR_SALE_MULTIPLIER : 1);
  const gross = units * unitValue;

  const fullSupplyCost = input.upgraded
    ? business.fullStockSupplyCostUpgraded
    : business.fullStockSupplyCostBase;
  const supplyCost = input.suppliesBought
    ? Math.round((fullSupplyCost * units) / business.capacityUnits)
    : 0;
  const net = gross - supplyCost;

  const minsPerUnit = input.upgraded
    ? business.minutesPerUnitUpgraded
    : business.minutesPerUnitBase;
  const productionMinutes = units * minsPerUnit;
  const netPerHour = units === 0 ? 0 : Math.round(net / (productionMinutes / 60));

  return {
    business,
    stockPercent,
    units,
    unitValue,
    gross,
    supplyCost,
    net,
    productionMinutes,
    netPerHour
  };
}

/**
 * SPECIAL CARGO — Verified Title Update 1.73 base constants
 */
export type SpecialCargoWarehouseSize = 'small' | 'medium' | 'large';
export type SpecialCargoSourcingMethod = 1 | 2 | 3;

export const SPECIAL_CARGO_WAREHOUSE_CAPACITIES: Record<SpecialCargoWarehouseSize, number> = {
  small: 16,
  medium: 42,
  large: 111
};

export const SPECIAL_CARGO_SOURCE_MISSION_COSTS: Record<SpecialCargoSourcingMethod, number> = {
  1: 2000,
  2: 8000,
  3: 18000
};

// Full 111-entry lookup table mapping crates sold in ONE sale (1–111) -> per-crate sale value ($)
export const SPECIAL_CARGO_CRATE_VALUE_BY_COUNT: Record<number, number> = {
  1: 10000,
  2: 11000,
  3: 12000,
  4: 13000,
  5: 13000,
  6: 13500,
  7: 13500,
  8: 14000,
  9: 14000,
  10: 14500,
  11: 14500,
  12: 14500,
  13: 14500,
  14: 14500,
  15: 15000,
  16: 15000,
  17: 15000,
  18: 15000,
  19: 15000,
  20: 15500,
  21: 15500,
  22: 15500,
  23: 15500,
  24: 15500,
  25: 16000,
  26: 16000,
  27: 16000,
  28: 16000,
  29: 16000,
  30: 16500,
  31: 16500,
  32: 16500,
  33: 16500,
  34: 16500,
  35: 17000,
  36: 17000,
  37: 17000,
  38: 17000,
  39: 17000,
  40: 17500,
  41: 17500,
  42: 17500,
  43: 17500,
  44: 17500,
  45: 17750,
  46: 17750,
  47: 17750,
  48: 17750,
  49: 17750,
  50: 18000,
  51: 18000,
  52: 18000,
  53: 18000,
  54: 18000,
  55: 18000,
  56: 18000,
  57: 18000,
  58: 18000,
  59: 18000,
  60: 18250,
  61: 18250,
  62: 18250,
  63: 18250,
  64: 18250,
  65: 18250,
  66: 18250,
  67: 18250,
  68: 18250,
  69: 18250,
  70: 18500,
  71: 18500,
  72: 18500,
  73: 18500,
  74: 18500,
  75: 18500,
  76: 18500,
  77: 18500,
  78: 18500,
  79: 18500,
  80: 18750,
  81: 18750,
  82: 18750,
  83: 18750,
  84: 18750,
  85: 18750,
  86: 18750,
  87: 18750,
  88: 18750,
  89: 18750,
  90: 19000,
  91: 19000,
  92: 19000,
  93: 19000,
  94: 19000,
  95: 19000,
  96: 19000,
  97: 19000,
  98: 19000,
  99: 19000,
  100: 19500,
  101: 19500,
  102: 19500,
  103: 19500,
  104: 19500,
  105: 19500,
  106: 19500,
  107: 19500,
  108: 19500,
  109: 19500,
  110: 19500,
  111: 20000
};

export interface SpecialCargoCalculationInput {
  warehouseSize: SpecialCargoWarehouseSize;
  crates: number;
  sourcingMethod: SpecialCargoSourcingMethod;
}

export interface SpecialCargoCalculationResult {
  warehouseSize: SpecialCargoWarehouseSize;
  warehouseCapacity: number;
  crates: number;
  sourcingMethod: SpecialCargoSourcingMethod;
  perCrateValue: number;
  gross: number;
  sourcingCost: number;
  net: number;
  deliveryTrucks: number;
}

export function calculateSpecialCargoProfit(
  input: SpecialCargoCalculationInput
): SpecialCargoCalculationResult {
  const warehouseCapacity = SPECIAL_CARGO_WAREHOUSE_CAPACITIES[input.warehouseSize] ?? 111;
  const crates = Math.min(
    warehouseCapacity,
    Math.max(1, Math.round(Number.isFinite(input.crates) ? input.crates : 1))
  );
  const perCrateValue = SPECIAL_CARGO_CRATE_VALUE_BY_COUNT[crates] ?? 10000;
  const gross = crates * perCrateValue;

  let sourcingCost = 0;
  if (input.sourcingMethod === 3) {
    const rem = crates % 3;
    const remCost = rem === 1 ? 2000 : rem === 2 ? 8000 : 0;
    sourcingCost = Math.floor(crates / 3) * 18000 + remCost;
  } else if (input.sourcingMethod === 2) {
    sourcingCost = Math.floor(crates / 2) * 8000 + (crates % 2 === 1 ? 2000 : 0);
  } else {
    sourcingCost = crates * 2000;
  }

  const net = gross - sourcingCost;
  const deliveryTrucks = crates <= 9 ? 1 : crates <= 29 ? 2 : 3;

  return {
    warehouseSize: input.warehouseSize,
    warehouseCapacity,
    crates,
    sourcingMethod: input.sourcingMethod,
    perCrateValue,
    gross,
    sourcingCost,
    net,
    deliveryTrucks
  };
}

/**
 * HANGAR AIR FREIGHT — Verified Title Update 1.73 base constants
 */
export const HANGAR_CONFIG = {
  capacityCrates: 50,
  baseValuePerCrate: 30000,
  ronsCutPercent: 5
} as const;

export type HangarTierId = 'tier1' | 'tier2' | 'tier3';

export interface HangarTierDef {
  id: HangarTierId;
  label: string;
  types: string[];
  bonusRate: number;
  bonusStep: number;
}

export const HANGAR_CARGO_TIERS: HangarTierDef[] = [
  {
    id: 'tier1',
    label: 'Tier 1 (+35% per 25 crates)',
    types: ['Narcotics', 'Chemicals', 'Medical Supplies'],
    bonusRate: 35,
    bonusStep: 25
  },
  {
    id: 'tier2',
    label: 'Tier 2 (+12% per 10 crates)',
    types: ['Animal Materials', 'Art & Antiques', 'Jewelry & Gemstones'],
    bonusRate: 12,
    bonusStep: 10
  },
  {
    id: 'tier3',
    label: 'Tier 3 (+5% per 5 crates)',
    types: ['Tobacco & Alcohol', 'Counterfeit Goods'],
    bonusRate: 5,
    bonusStep: 5
  }
];

export interface HangarTierResult {
  tier: HangarTierDef;
  crates: number;
  bonusPct: number;
  tierGross: number;
}

export interface HangarCalculationInput {
  tier1Crates: number;
  tier2Crates: number;
  tier3Crates: number;
}

export interface HangarCalculationResult {
  tiers: HangarTierResult[];
  totalCrates: number;
  totalGross: number;
  ronsCut: number;
  sourcingCost: number;
  net: number;
}

export function calculateHangarCargoProfit(
  input: HangarCalculationInput
): HangarCalculationResult {
  const t1 = Math.min(HANGAR_CONFIG.capacityCrates, Math.max(0, Math.round(input.tier1Crates || 0)));
  const t2 = Math.min(
    HANGAR_CONFIG.capacityCrates - t1,
    Math.max(0, Math.round(input.tier2Crates || 0))
  );
  const t3 = Math.min(
    HANGAR_CONFIG.capacityCrates - t1 - t2,
    Math.max(0, Math.round(input.tier3Crates || 0))
  );

  const counts: Record<HangarTierId, number> = { tier1: t1, tier2: t2, tier3: t3 };

  const tiers: HangarTierResult[] = HANGAR_CARGO_TIERS.map((tier) => {
    const crates = counts[tier.id];
    const bonusPct = tier.bonusRate * Math.floor(crates / tier.bonusStep);
    const tierGross = Math.round((crates * HANGAR_CONFIG.baseValuePerCrate * (100 + bonusPct)) / 100);
    return {
      tier,
      crates,
      bonusPct,
      tierGross
    };
  });

  const totalCrates = t1 + t2 + t3;
  const totalGross = tiers.reduce((sum, r) => sum + r.tierGross, 0);
  const ronsCut = Math.round((totalGross * HANGAR_CONFIG.ronsCutPercent) / 100);
  const sourcingCost = 0;
  const net = totalGross - ronsCut;

  return {
    tiers,
    totalCrates,
    totalGross,
    ronsCut,
    sourcingCost,
    net
  };
}

/**
 * VEHICLE CARGO (IMPORT/EXPORT) — Verified Title Update 1.73 base constants
 */
export const VEHICLE_CARGO_CONFIG = {
  warehouseCapacityCars: 40,
  sourcingCost: 0
} as const;

export type VehicleCargoRangeId = 'standard' | 'mid' | 'top';
export type VehicleCargoSaleMode = 'private' | 'showroom' | 'specialist' | 'collection';
export type VehicleCargoCollectionSize = 2 | 3 | 4;

export interface VehicleCargoRangeDef {
  id: VehicleCargoRangeId;
  label: string;
  privateNet: number;
  showroomGross: number;
  showroomModCost: number;
  specialistGross: number;
  specialistModCost: number;
}

export const VEHICLE_CARGO_RANGES: VehicleCargoRangeDef[] = [
  {
    id: 'standard',
    label: 'Standard Range',
    privateNet: 15000,
    showroomGross: 26250,
    showroomModCost: 3750,
    specialistGross: 37500,
    specialistModCost: 7500
  },
  {
    id: 'mid',
    label: 'Mid Range',
    privateNet: 25000,
    showroomGross: 43750,
    showroomModCost: 6250,
    specialistGross: 62500,
    specialistModCost: 12500
  },
  {
    id: 'top',
    label: 'Top Range',
    privateNet: 40000,
    showroomGross: 70000,
    showroomModCost: 10000,
    specialistGross: 100000,
    specialistModCost: 20000
  }
];

export const VEHICLE_CARGO_COLLECTION_BONUSES: Record<VehicleCargoCollectionSize, number> = {
  2: 20000,
  3: 35000,
  4: 50000
};

export interface VehicleCargoCollectionDef {
  name: string;
  cars: VehicleCargoCollectionSize;
  bonus: number;
}

export const VEHICLE_CARGO_COLLECTIONS: VehicleCargoCollectionDef[] = [
  { name: 'Uninsurable', cars: 3, bonus: 35000 },
  { name: 'Birds of Paradise', cars: 4, bonus: 50000 },
  { name: 'Fading Power', cars: 2, bonus: 20000 },
  { name: 'No Direct Sunlight', cars: 3, bonus: 35000 },
  { name: 'Stay Declasse', cars: 3, bonus: 35000 },
  { name: 'Molten Metal', cars: 4, bonus: 50000 },
  { name: 'Pastel Perfection', cars: 3, bonus: 35000 },
  { name: 'Hip to be Square', cars: 4, bonus: 50000 },
  { name: 'Shades of Blue', cars: 4, bonus: 50000 },
  { name: 'End of Empires', cars: 2, bonus: 20000 }
];

export interface VehicleCargoRangeResult {
  range: VehicleCargoRangeDef;
  count: number;
  perCarGross: number;
  perCarModCost: number;
  gross: number;
  modCost: number;
  net: number;
}

export interface VehicleCargoCalculationInput {
  standardCount: number;
  midCount: number;
  topCount: number;
  saleMode: VehicleCargoSaleMode;
  collectionSize?: VehicleCargoCollectionSize;
}

export interface VehicleCargoCalculationResult {
  ranges: VehicleCargoRangeResult[];
  totalCars: number;
  saleMode: VehicleCargoSaleMode;
  collectionSize: VehicleCargoCollectionSize;
  sourcingCost: number;
  totalGross: number;
  totalModCosts: number;
  collectionBonus: number;
  totalNet: number;
}

export function calculateVehicleCargoProfit(
  input: VehicleCargoCalculationInput
): VehicleCargoCalculationResult {
  const cap = VEHICLE_CARGO_CONFIG.warehouseCapacityCars;
  const standard = Math.min(cap, Math.max(0, Math.round(input.standardCount || 0)));
  const mid = Math.min(cap - standard, Math.max(0, Math.round(input.midCount || 0)));
  const top = Math.min(cap - standard - mid, Math.max(0, Math.round(input.topCount || 0)));

  const counts: Record<VehicleCargoRangeId, number> = {
    standard,
    mid,
    top
  };

  const collectionSize: VehicleCargoCollectionSize = input.collectionSize ?? 4;
  const isCollection = input.saleMode === 'collection';

  const ranges: VehicleCargoRangeResult[] = VEHICLE_CARGO_RANGES.map((range) => {
    const count = counts[range.id];
    let perCarGross = 0;
    let perCarModCost = 0;

    if (input.saleMode === 'private') {
      perCarGross = range.privateNet;
      perCarModCost = 0;
    } else if (input.saleMode === 'showroom') {
      perCarGross = range.showroomGross;
      perCarModCost = range.showroomModCost;
    } else if (input.saleMode === 'specialist') {
      perCarGross = range.specialistGross;
      perCarModCost = range.specialistModCost;
    } else {
      // Collection sale pays Specialist NET value with $0 modification cost
      perCarGross = range.specialistGross - range.specialistModCost;
      perCarModCost = 0;
    }

    const gross = count * perCarGross;
    const modCost = count * perCarModCost;
    const net = gross - modCost;

    return {
      range,
      count,
      perCarGross,
      perCarModCost,
      gross,
      modCost,
      net
    };
  });

  const totalCars = standard + mid + top;
  const totalGross = ranges.reduce((sum, r) => sum + r.gross, 0);
  const totalModCosts = ranges.reduce((sum, r) => sum + r.modCost, 0);
  const collectionBonus =
    isCollection && totalCars > 0 ? VEHICLE_CARGO_COLLECTION_BONUSES[collectionSize] : 0;
  const totalNet = totalGross - totalModCosts + collectionBonus;

  return {
    ranges,
    totalCars,
    saleMode: input.saleMode,
    collectionSize,
    sourcingCost: VEHICLE_CARGO_CONFIG.sourcingCost,
    totalGross,
    totalModCosts,
    collectionBonus,
    totalNet
  };
}

