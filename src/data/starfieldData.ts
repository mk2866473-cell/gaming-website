/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ManufacturedItem {
  id: string;
  name: string;
  tier: 1 | 2 | 3 | 4;
  description: string;
  category: 'simple' | 'advanced' | 'industrial' | 'superior';
  mass: number;
  value: number;
  components: Array<{ itemId: string; quantity: number }>;
}

export interface RawElement {
  id: string;
  name: string;
  symbol: string;
  type: 'solid' | 'liquid' | 'gas';
  rarity: 'common' | 'uncommon' | 'rare' | 'exotic' | 'unique';
}

export const RAW_ELEMENTS: Record<string, RawElement> = {
  Fe: { id: 'Fe', name: 'Iron', symbol: 'Fe', type: 'solid', rarity: 'common' },
  Al: { id: 'Al', name: 'Aluminum', symbol: 'Al', type: 'solid', rarity: 'common' },
  Cu: { id: 'Cu', name: 'Copper', symbol: 'Cu', type: 'solid', rarity: 'common' },
  Ni: { id: 'Ni', name: 'Nickel', symbol: 'Ni', type: 'solid', rarity: 'common' },
  Co: { id: 'Co', name: 'Cobalt', symbol: 'Co', type: 'solid', rarity: 'common' },
  Be: { id: 'Be', name: 'Beryllium', symbol: 'Be', type: 'solid', rarity: 'uncommon' },
  Ag: { id: 'Ag', name: 'Silver', symbol: 'Ag', type: 'solid', rarity: 'uncommon' },
  Au: { id: 'Au', name: 'Gold', symbol: 'Au', type: 'solid', rarity: 'rare' },
  Pb: { id: 'Pb', name: 'Lead', symbol: 'Pb', type: 'solid', rarity: 'common' },
  Li: { id: 'Li', name: 'Lithium', symbol: 'Li', type: 'solid', rarity: 'uncommon' },
  Dy: { id: 'Dy', name: 'Dysprosium', symbol: 'Dy', type: 'solid', rarity: 'rare' },
  Sb: { id: 'Sb', name: 'Antimony', symbol: 'Sb', type: 'solid', rarity: 'rare' },
  U:  { id: 'U',  name: 'Uranium', symbol: 'U', type: 'solid', rarity: 'uncommon' },
  Pu: { id: 'Pu', name: 'Plutonium', symbol: 'Pu', type: 'solid', rarity: 'exotic' },
  Cs: { id: 'Cs', name: 'Caesium', symbol: 'Cs', type: 'solid', rarity: 'exotic' },
  H2O: { id: 'H2O', name: 'Water', symbol: 'H2O', type: 'liquid', rarity: 'common' },
};

export const MANUFACTURED_ITEMS: Record<string, ManufacturedItem> = {
  // Tier 1 Simple Components
  adaptive_frame: {
    id: 'adaptive_frame',
    name: 'Adaptive Frame',
    tier: 1,
    description: 'Basic structural component used in outpost buildings, wind turbines, and storage.',
    category: 'simple',
    mass: 1.5,
    value: 12,
    components: [
      { itemId: 'Fe', quantity: 1 },
      { itemId: 'Al', quantity: 1 },
    ],
  },
  tau_rheostat: {
    id: 'tau_rheostat',
    name: 'Tau Grade Rheostat',
    tier: 1,
    description: 'Electrical resistance component used in power generators and fabricators.',
    category: 'simple',
    mass: 1.2,
    value: 16,
    components: [
      { itemId: 'Be', quantity: 1 },
      { itemId: 'Cu', quantity: 1 },
    ],
  },
  isocentered_magnet: {
    id: 'isocentered_magnet',
    name: 'Isocentered Magnet',
    tier: 1,
    description: 'Magnetic stabilizer used in advanced sensors and grav drives.',
    category: 'simple',
    mass: 1.8,
    value: 20,
    components: [
      { itemId: 'Co', quantity: 1 },
      { itemId: 'Ni', quantity: 1 },
    ],
  },
  reactive_gauge: {
    id: 'reactive_gauge',
    name: 'Reactive Gauge',
    tier: 1,
    description: 'Pressure monitoring component used in industrial extractors and reactors.',
    category: 'simple',
    mass: 1.4,
    value: 18,
    components: [
      { itemId: 'Al', quantity: 1 },
      { itemId: 'Cu', quantity: 1 },
    ],
  },
  zero_wire: {
    id: 'zero_wire',
    name: 'Zero Wire',
    tier: 1,
    description: 'Super-conductive wire used in high-tech research and communications.',
    category: 'simple',
    mass: 0.8,
    value: 22,
    components: [
      { itemId: 'Ag', quantity: 1 },
      { itemId: 'Cu', quantity: 1 },
    ],
  },
  austenitic_manifold: {
    id: 'austenitic_manifold',
    name: 'Austenitic Manifold',
    tier: 1,
    description: 'Corrosion-resistant fluid manifold for advanced outpost plumbing.',
    category: 'simple',
    mass: 2.0,
    value: 24,
    components: [
      { itemId: 'Fe', quantity: 1 },
      { itemId: 'Ni', quantity: 1 },
    ],
  },

  // Tier 2 Advanced Components
  comm_relay: {
    id: 'comm_relay',
    name: 'Comm Relay',
    tier: 2,
    description: 'Sub-space communication module required for cargo links and mission boards.',
    category: 'advanced',
    mass: 3.5,
    value: 48,
    components: [
      { itemId: 'isocentered_magnet', quantity: 1 },
      { itemId: 'tau_rheostat', quantity: 1 },
    ],
  },
  superconductor: {
    id: 'superconductor',
    name: 'Superconductor',
    tier: 2,
    description: 'Zero-resistance electrical conduit used in high-yield reactors and lasers.',
    category: 'advanced',
    mass: 2.8,
    value: 55,
    components: [
      { itemId: 'zero_wire', quantity: 1 },
      { itemId: 'Au', quantity: 1 },
    ],
  },
  microsecond_regulator: {
    id: 'microsecond_regulator',
    name: 'Microsecond Regulator',
    tier: 2,
    description: 'Precision timing chip used in automated fabricators and weapon mods.',
    category: 'advanced',
    mass: 2.2,
    value: 62,
    components: [
      { itemId: 'zero_wire', quantity: 1 },
      { itemId: 'Li', quantity: 1 },
    ],
  },
  control_rod: {
    id: 'control_rod',
    name: 'Control Rod',
    tier: 2,
    description: 'Neutron absorbing rod required for nuclear reactors and starship engines.',
    category: 'advanced',
    mass: 4.0,
    value: 70,
    components: [
      { itemId: 'isocentered_magnet', quantity: 1 },
      { itemId: 'Dy', quantity: 1 },
    ],
  },

  // Tier 3 Industrial Components
  positron_battery: {
    id: 'positron_battery',
    name: 'Positron Battery',
    tier: 3,
    description: 'High-density antimatter energy cell for heavy industrial defense turrets.',
    category: 'industrial',
    mass: 6.0,
    value: 140,
    components: [
      { itemId: 'comm_relay', quantity: 1 },
      { itemId: 'Sb', quantity: 1 },
    ],
  },
  nuclear_fuel_rod: {
    id: 'nuclear_fuel_rod',
    name: 'Nuclear Fuel Rod',
    tier: 3,
    description: 'Enriched nuclear energy core for outpost power hubs.',
    category: 'industrial',
    mass: 8.5,
    value: 180,
    components: [
      { itemId: 'control_rod', quantity: 1 },
      { itemId: 'U', quantity: 1 },
      { itemId: 'Pu', quantity: 1 },
    ],
  },
};

export interface ExtractorTier {
  id: string;
  name: string;
  baseRatePerMin: number;
  powerRequired: number;
}

export const EXTRACTOR_TIERS: ExtractorTier[] = [
  { id: 'standard', name: 'Extractor - Standard', baseRatePerMin: 1.0, powerRequired: 5 },
  { id: 'commercial', name: 'Extractor - Commercial', baseRatePerMin: 2.0, powerRequired: 10 },
  { id: 'industrial', name: 'Extractor - Industrial', baseRatePerMin: 3.5, powerRequired: 20 },
];

export interface RecipeBreakdown {
  targetItem: ManufacturedItem;
  targetQuantity: number;
  rawElementTotals: Record<string, number>;
  intermediateComponents: Array<{ itemId: string; name: string; quantity: number }>;
  totalMass: number;
  totalValue: number;
  extractionMinutes: number;
  containersNeeded: number;
}

/**
 * Recursively breaks down a manufactured item recipe tree into raw elements and intermediate components.
 */
export function calculateOutpostProduction(
  targetItemId: string,
  targetQuantity: number,
  extractorTierId: string,
  outpostPerkBonus: number = 0 // 0 to 80% (0.0 to 0.8)
): RecipeBreakdown | null {
  const targetItem = MANUFACTURED_ITEMS[targetItemId];
  if (!targetItem) return null;

  const rawElementTotals: Record<string, number> = {};
  const intermediateComponentsMap: Record<string, number> = {};

  function traverse(itemId: string, qtyNeeded: number) {
    if (RAW_ELEMENTS[itemId]) {
      rawElementTotals[itemId] = (rawElementTotals[itemId] || 0) + qtyNeeded;
      return;
    }

    const mItem = MANUFACTURED_ITEMS[itemId];
    if (mItem) {
      if (itemId !== targetItemId) {
        intermediateComponentsMap[itemId] = (intermediateComponentsMap[itemId] || 0) + qtyNeeded;
      }
      for (const sub of mItem.components) {
        traverse(sub.itemId, sub.quantity * qtyNeeded);
      }
    }
  }

  traverse(targetItemId, targetQuantity);

  const intermediateComponents = Object.entries(intermediateComponentsMap).map(([id, qty]) => ({
    itemId: id,
    name: MANUFACTURED_ITEMS[id]?.name || id,
    quantity: qty,
  }));

  const totalMass = targetItem.mass * targetQuantity;
  const totalValue = targetItem.value * targetQuantity;

  // Extractor rate math
  const extTier = EXTRACTOR_TIERS.find(t => t.id === extractorTierId) || EXTRACTOR_TIERS[0];
  const effectiveRatePerMin = extTier.baseRatePerMin * (1 + outpostPerkBonus);

  // Maximum required raw element quantity dictates slowest bottleneck time
  let maxRawQty = 0;
  Object.values(rawElementTotals).forEach(qty => {
    if (qty > maxRawQty) maxRawQty = qty;
  });

  const extractionMinutes = Math.ceil(maxRawQty / effectiveRatePerMin);

  // Solid Storage Containers capacity = 75 mass units each
  const totalRawMass = Object.entries(rawElementTotals).reduce((sum, [id, qty]) => {
    return sum + qty * 1.0; // Raw elements weigh ~1.0 mass unit each
  }, 0);
  const containersNeeded = Math.ceil(totalRawMass / 75);

  return {
    targetItem,
    targetQuantity,
    rawElementTotals,
    intermediateComponents,
    totalMass,
    totalValue,
    extractionMinutes,
    containersNeeded,
  };
}

export const STARFIELD_FAQS = [
  {
    question: 'How do Outpost Fabricators work in Starfield?',
    answer: 'Simple Fabricators, Advanced Fabricators, and Industrial Fabricators automatically pull raw elements or intermediate components from linked Storage Containers or Cargo Links and craft manufactured components continuously at 12 items/minute.'
  },
  {
    question: 'How do I increase raw element extraction rates?',
    answer: 'You can upgrade from Standard Extractors (1.0/min) to Commercial (2.0/min) or Industrial Extractors (3.5/min). Investing points into the Outpost Management skill further increases extraction speed by up to 80%.'
  },
  {
    question: 'What storage containers are required for Starfield outpost crafting?',
    answer: 'Solid Storage Containers store raw mineral elements (Iron, Aluminum, Copper, Cobalt). Warehouse Storage Containers store manufactured components (Adaptive Frames, Comm Relays).'
  }
];
