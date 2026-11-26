/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LegacyMinecraftColor {
  code: string;
  name: string;
  hex: string;
  textDark: boolean;
}

export const MINECRAFT_LEGACY_COLORS: LegacyMinecraftColor[] = [
  { code: '0', name: 'Black', hex: '#000000', textDark: false },
  { code: '1', name: 'Dark Blue', hex: '#0000AA', textDark: false },
  { code: '2', name: 'Dark Green', hex: '#00AA00', textDark: false },
  { code: '3', name: 'Dark Aqua', hex: '#00AAAA', textDark: false },
  { code: '4', name: 'Dark Red', hex: '#AA0000', textDark: false },
  { code: '5', name: 'Dark Purple', hex: '#AA00AA', textDark: false },
  { code: '6', name: 'Gold', hex: '#FFAA00', textDark: true },
  { code: '7', name: 'Gray', hex: '#AAAAAA', textDark: true },
  { code: '8', name: 'Dark Gray', hex: '#555555', textDark: false },
  { code: '9', name: 'Blue', hex: '#5555FF', textDark: false },
  { code: 'a', name: 'Green', hex: '#55FF55', textDark: true },
  { code: 'b', name: 'Aqua', hex: '#55FFFF', textDark: true },
  { code: 'c', name: 'Red', hex: '#FF5555', textDark: false },
  { code: 'd', name: 'Light Purple', hex: '#FF55FF', textDark: true },
  { code: 'e', name: 'Yellow', hex: '#FFFF55', textDark: true },
  { code: 'f', name: 'White', hex: '#FFFFFF', textDark: true }
];

export type LegacyFormatCode = 'l' | 'o' | 'n' | 'm' | 'k';

export interface LegacyFormatOption {
  code: LegacyFormatCode;
  name: string;
}

export const MINECRAFT_FORMAT_CODES: LegacyFormatOption[] = [
  { code: 'l', name: 'Bold' },
  { code: 'o', name: 'Italic' },
  { code: 'n', name: 'Underline' },
  { code: 'm', name: 'Strikethrough' },
  { code: 'k', name: 'Obfuscated' }
];

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export function normalizeHex(hex: string, fallback = '#FFFFFF'): string {
  const cleaned = hex.trim().replace(/^#/, '').toUpperCase();
  if (/^[0-9A-F]{6}$/.test(cleaned)) {
    return `#${cleaned}`;
  }
  if (/^[0-9A-F]{3}$/.test(cleaned)) {
    return `#${cleaned[0]}${cleaned[0]}${cleaned[1]}${cleaned[1]}${cleaned[2]}${cleaned[2]}`;
  }
  return fallback;
}

export function hexToRgb(hex: string): RgbColor {
  const norm = normalizeHex(hex);
  return {
    r: parseInt(norm.slice(1, 3), 16),
    g: parseInt(norm.slice(3, 5), 16),
    b: parseInt(norm.slice(5, 7), 16)
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clampByte = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toByteHex = (v: number) => clampByte(v).toString(16).toUpperCase().padStart(2, '0');
  return `#${toByteHex(r)}${toByteHex(g)}${toByteHex(b)}`;
}

/**
 * Piecewise linear RGB interpolation across 2-5 colour stops.
 * Each channel = round(start + (end - start) * localT).
 */
export function interpolateStops(stops: string[], t: number): string {
  const safeStops = stops.length > 0 ? stops.map((s) => normalizeHex(s)) : ['#FFFFFF'];
  if (safeStops.length === 1) {
    return safeStops[0];
  }
  const clampedT = Math.max(0, Math.min(1, t));
  const segments = safeStops.length - 1;
  const scaled = clampedT * segments;
  const segIndex = Math.min(Math.floor(scaled), segments - 1);
  const localT = scaled - segIndex;

  const start = hexToRgb(safeStops[segIndex]);
  const end = hexToRgb(safeStops[segIndex + 1]);

  return rgbToHex(
    Math.round(start.r + (end.r - start.r) * localT),
    Math.round(start.g + (end.g - start.g) * localT),
    Math.round(start.b + (end.b - start.b) * localT)
  );
}

/**
 * Formats #RRGGBB into Minecraft §x§R§R§G§G§B§B sequence.
 */
export function toSectionHex(hex: string): string {
  const digits = normalizeHex(hex).slice(1).split('');
  return `§x${digits.map((d) => `§${d}`).join('')}`;
}

export interface GradientCharacter {
  char: string;
  index: number;
  t: number;
  isSpace: boolean;
  hex: string | null;
}

/**
 * Shared gradient math:
 * - per character i of n visible characters, t = i / (n - 1) (n = 1 -> t = 0)
 * - spaces count for position (index i and length n) but receive no colour code
 */
export function computeGradientCharacters(text: string, stops: string[]): GradientCharacter[] {
  const chars = Array.from(text);
  const n = chars.length;
  return chars.map((char, index) => {
    const isSpace = char === ' ' || char === '\t' || char === '\n' || char === '\r';
    const t = n <= 1 ? 0 : index / (n - 1);
    return {
      char,
      index,
      t,
      isSpace,
      hex: isSpace ? null : interpolateStops(stops, t)
    };
  });
}

export interface GradientOutputs {
  characters: GradientCharacter[];
  ampersandHex: string;
  sectionX: string;
  miniMessagePerChar: string;
  miniMessageGradient: string | null;
  jsonChatArray: string;
}

export function generateGradientOutputs(
  text: string,
  stops: string[],
  options: { bold?: boolean; italic?: boolean } = {}
): GradientOutputs {
  const bold = Boolean(options.bold);
  const italic = Boolean(options.italic);
  const normalizedStops = (stops.length >= 2 ? stops : ['#FF0000', '#0000FF']).slice(0, 5).map((s) => normalizeHex(s));
  const characters = computeGradientCharacters(text, normalizedStops);

  const formatAmp = `${bold ? '&l' : ''}${italic ? '&o' : ''}`;
  const formatSec = `${bold ? '§l' : ''}${italic ? '§o' : ''}`;

  const ampersandHex = characters
    .map((item) => (item.isSpace || !item.hex ? item.char : `&${item.hex}${formatAmp}${item.char}`))
    .join('');

  const sectionX = characters
    .map((item) => (item.isSpace || !item.hex ? item.char : `${toSectionHex(item.hex)}${formatSec}${item.char}`))
    .join('');

  const miniPrefix = `${bold ? '<bold>' : ''}${italic ? '<italic>' : ''}`;
  const miniSuffix = `${italic ? '</italic>' : ''}${bold ? '</bold>' : ''}`;
  const miniPerCharBody = characters
    .map((item) => (item.isSpace || !item.hex ? item.char : `<${item.hex}>${item.char}`))
    .join('');
  const miniMessagePerChar = characters.length > 0 ? `${miniPrefix}${miniPerCharBody}${miniSuffix}` : '';

  const miniMessageGradient =
    normalizedStops.length === 2
      ? `${miniPrefix}<gradient:${normalizedStops[0]}:${normalizedStops[1]}>${text}</gradient>${miniSuffix}`
      : null;

  const jsonComponents = characters.map((item) => {
    if (item.isSpace || !item.hex) {
      return { text: item.char };
    }
    const entry: { text: string; color: string; bold?: boolean; italic?: boolean } = {
      text: item.char,
      color: item.hex
    };
    if (bold) entry.bold = true;
    if (italic) entry.italic = true;
    return entry;
  });

  return {
    characters,
    ampersandHex,
    sectionX,
    miniMessagePerChar,
    miniMessageGradient,
    jsonChatArray: JSON.stringify(jsonComponents)
  };
}

export interface MotdFormatState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  obfuscated: boolean;
}

export interface MotdLineConfig {
  text: string;
  useGradient: boolean;
  colorCode: string;
  gradientStops: string[];
  formats: MotdFormatState;
}

export function buildMotdFormatSection(formats: MotdFormatState): string {
  return (
    (formats.bold ? '§l' : '') +
    (formats.italic ? '§o' : '') +
    (formats.underline ? '§n' : '') +
    (formats.strikethrough ? '§m' : '') +
    (formats.obfuscated ? '§k' : '')
  );
}

/**
 * Encodes one MOTD line using § codes.
 * Because a Minecraft colour code clears active formatting, the colour code is always emitted BEFORE format codes.
 */
export function encodeMotdLineSection(line: MotdLineConfig): string {
  if (!line.text) {
    return '';
  }
  const formatSec = buildMotdFormatSection(line.formats);
  if (!line.useGradient) {
    const validColor = MINECRAFT_LEGACY_COLORS.find((c) => c.code === line.colorCode)?.code ?? 'f';
    return `§${validColor}${formatSec}${line.text}`;
  }
  const gradChars = computeGradientCharacters(line.text, line.gradientStops);
  return gradChars
    .map((item) => (item.isSpace || !item.hex ? item.char : `${toSectionHex(item.hex)}${formatSec}${item.char}`))
    .join('');
}

export interface MotdOutputs {
  serverProperties: string;
  sectionForm: string;
  pluginAmpForm: string;
  line1VisibleCount: number;
  line2VisibleCount: number;
}

export function generateMotdOutputs(line1: MotdLineConfig, line2: MotdLineConfig): MotdOutputs {
  const s1 = encodeMotdLineSection(line1);
  const s2 = encodeMotdLineSection(line2);
  const sectionForm = line2.text.length > 0 ? `${s1}\\n${s2}` : s1;
  const serverProperties = `motd=${sectionForm.replace(/§/g, '\\u00A7')}`;
  const pluginAmpForm = sectionForm.replace(/§/g, '&');

  return {
    serverProperties,
    sectionForm,
    pluginAmpForm,
    line1VisibleCount: Array.from(line1.text).length,
    line2VisibleCount: Array.from(line2.text).length
  };
}

export interface MotdPreviewChar {
  char: string;
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  obfuscated: boolean;
}

export function buildMotdPreviewChars(line: MotdLineConfig): MotdPreviewChar[] {
  const solidHex = MINECRAFT_LEGACY_COLORS.find((c) => c.code === line.colorCode)?.hex ?? '#FFFFFF';
  if (!line.useGradient) {
    return Array.from(line.text).map((char) => ({
      char,
      color: solidHex,
      ...line.formats
    }));
  }
  return computeGradientCharacters(line.text, line.gradientStops).map((item) => ({
    char: item.char,
    color: item.hex ?? solidHex,
    ...line.formats
  }));
}

// =============================================================================
// Armor Trim Data (Java 1.21.x)
// =============================================================================

export type ArmorPieceId = 'helmet' | 'chestplate' | 'leggings' | 'boots';

export interface ArmorPieceDef {
  id: ArmorPieceId;
  name: string;
  note?: string;
}

export const ARMOR_PIECES: ArmorPieceDef[] = [
  { id: 'helmet', name: 'Helmet', note: 'Turtle Shell counts as a helmet' },
  { id: 'chestplate', name: 'Chestplate' },
  { id: 'leggings', name: 'Leggings' },
  { id: 'boots', name: 'Boots' }
];

export interface ArmorTrimPatternDef {
  id: string;
  name: string;
  matchingBlock: string;
}

export const ARMOR_TRIM_PATTERNS: ArmorTrimPatternDef[] = [
  { id: 'sentry', name: 'Sentry', matchingBlock: 'Cobblestone' },
  { id: 'vex', name: 'Vex', matchingBlock: 'Cobblestone' },
  { id: 'wild', name: 'Wild', matchingBlock: 'Mossy Cobblestone' },
  { id: 'coast', name: 'Coast', matchingBlock: 'Cobblestone' },
  { id: 'dune', name: 'Dune', matchingBlock: 'Sandstone' },
  { id: 'wayfinder', name: 'Wayfinder', matchingBlock: 'Terracotta' },
  { id: 'raiser', name: 'Raiser', matchingBlock: 'Terracotta' },
  { id: 'shaper', name: 'Shaper', matchingBlock: 'Terracotta' },
  { id: 'host', name: 'Host', matchingBlock: 'Terracotta' },
  { id: 'ward', name: 'Ward', matchingBlock: 'Cobbled Deepslate' },
  { id: 'silence', name: 'Silence', matchingBlock: 'Cobbled Deepslate' },
  { id: 'tide', name: 'Tide', matchingBlock: 'Prismarine' },
  { id: 'snout', name: 'Snout', matchingBlock: 'Blackstone' },
  { id: 'rib', name: 'Rib', matchingBlock: 'Netherrack' },
  { id: 'eye', name: 'Eye', matchingBlock: 'End Stone' },
  { id: 'spire', name: 'Spire', matchingBlock: 'Purpur Block' },
  { id: 'flow', name: 'Flow', matchingBlock: 'Breeze Rod' },
  { id: 'bolt', name: 'Bolt', matchingBlock: 'Block of Copper' }
];

export interface ArmorTrimMaterialDef {
  id: string;
  name: string;
  hex: string;
}

export const ARMOR_TRIM_MATERIALS: ArmorTrimMaterialDef[] = [
  { id: 'iron', name: 'Iron Ingot', hex: '#ECECEC' },
  { id: 'copper', name: 'Copper Ingot', hex: '#B4684D' },
  { id: 'gold', name: 'Gold Ingot', hex: '#DEB12D' },
  { id: 'lapis', name: 'Lapis Lazuli', hex: '#416E97' },
  { id: 'emerald', name: 'Emerald', hex: '#11A036' },
  { id: 'diamond', name: 'Diamond', hex: '#6EECD2' },
  { id: 'netherite', name: 'Netherite Ingot', hex: '#625859' },
  { id: 'redstone', name: 'Redstone Dust', hex: '#971607' },
  { id: 'amethyst', name: 'Amethyst Shard', hex: '#9A5CC6' },
  { id: 'quartz', name: 'Nether Quartz', hex: '#E3D4C4' },
  { id: 'resin', name: 'Resin Brick', hex: '#FC7812' }
];

export const ARMOR_TRIM_COMBINATIONS_PER_PIECE =
  ARMOR_TRIM_PATTERNS.length * ARMOR_TRIM_MATERIALS.length; // 18 * 11 = 198

export interface ArmorTrimSetCost {
  pieceCount: number;
  startingTemplates: number;
  duplicationCrafts: number;
  diamondsNeeded: number;
  matchingBlocksNeeded: number;
  trimMaterialsNeeded: number;
}

/**
 * Each duplication craft uses 7 diamonds + 1 template (top-middle) + 1 matching block (centre) -> 2 templates (net +1 template).
 */
export function calculateArmorTrimSetCost(pieceCount = 4, startingTemplates = 1): ArmorTrimSetCost {
  const safePieces = Math.max(1, pieceCount);
  const safeStarting = Math.max(1, startingTemplates);
  const duplicationCrafts = Math.max(0, safePieces - safeStarting);
  return {
    pieceCount: safePieces,
    startingTemplates: safeStarting,
    duplicationCrafts,
    diamondsNeeded: duplicationCrafts * 7,
    matchingBlocksNeeded: duplicationCrafts,
    trimMaterialsNeeded: safePieces
  };
}

// =============================================================================
// Potion Effect Duration Converter Data (Java Edition)
// =============================================================================

export type PotionVariantKey = 'base' | 'extended' | 'level2';

export interface PotionDurationPreset {
  id: string;
  name: string;
  isInstant?: boolean;
  baseSeconds: number | null;
  extendedSeconds: number | null;
  level2Seconds: number | null;
  note?: string;
}

export const POTION_DURATION_PRESETS: PotionDurationPreset[] = [
  { id: 'fire_resistance', name: 'Fire Resistance', baseSeconds: 180, extendedSeconds: 480, level2Seconds: null },
  { id: 'regeneration', name: 'Regeneration', baseSeconds: 45, extendedSeconds: 90, level2Seconds: 22 },
  { id: 'strength', name: 'Strength', baseSeconds: 180, extendedSeconds: 480, level2Seconds: 90 },
  { id: 'swiftness', name: 'Swiftness', baseSeconds: 180, extendedSeconds: 480, level2Seconds: 90 },
  { id: 'night_vision', name: 'Night Vision', baseSeconds: 180, extendedSeconds: 480, level2Seconds: null },
  { id: 'invisibility', name: 'Invisibility', baseSeconds: 180, extendedSeconds: 480, level2Seconds: null },
  { id: 'water_breathing', name: 'Water Breathing', baseSeconds: 180, extendedSeconds: 480, level2Seconds: null },
  { id: 'leaping', name: 'Leaping', baseSeconds: 180, extendedSeconds: 480, level2Seconds: 90 },
  { id: 'slow_falling', name: 'Slow Falling', baseSeconds: 90, extendedSeconds: 240, level2Seconds: null },
  { id: 'poison', name: 'Poison', baseSeconds: 45, extendedSeconds: 90, level2Seconds: 21 },
  { id: 'weakness', name: 'Weakness', baseSeconds: 90, extendedSeconds: 240, level2Seconds: null },
  {
    id: 'slowness',
    name: 'Slowness',
    baseSeconds: 90,
    extendedSeconds: 240,
    level2Seconds: 20,
    note: 'Level II = Slowness IV'
  },
  { id: 'turtle_master', name: 'Turtle Master', baseSeconds: 20, extendedSeconds: 40, level2Seconds: 20 },
  { id: 'oozing', name: 'Oozing', baseSeconds: 180, extendedSeconds: null, level2Seconds: null },
  { id: 'weaving', name: 'Weaving', baseSeconds: 180, extendedSeconds: null, level2Seconds: null },
  { id: 'infestation', name: 'Infestation', baseSeconds: 180, extendedSeconds: null, level2Seconds: null },
  { id: 'wind_charging', name: 'Wind Charging', baseSeconds: 180, extendedSeconds: null, level2Seconds: null },
  {
    id: 'healing',
    name: 'Healing',
    isInstant: true,
    baseSeconds: null,
    extendedSeconds: null,
    level2Seconds: null,
    note: 'Instant — no duration (lingering cloud applies 1/2 potency; tipped arrows apply full strength)'
  },
  {
    id: 'harming',
    name: 'Harming',
    isInstant: true,
    baseSeconds: null,
    extendedSeconds: null,
    level2Seconds: null,
    note: 'Instant — no duration (lingering cloud applies 1/2 potency; tipped arrows apply full strength)'
  }
];

export interface PotionDeliveryFormDef {
  id: 'drinkable' | 'splash' | 'lingering' | 'arrow';
  name: string;
  multiplier: number;
  multiplierLabel: string;
}

export const POTION_DELIVERY_FORMS: PotionDeliveryFormDef[] = [
  { id: 'drinkable', name: 'Drinkable Potion', multiplier: 1.0, multiplierLabel: '×1.0' },
  { id: 'splash', name: 'Splash Potion', multiplier: 1.0, multiplierLabel: '×1.0 (same as drinkable)' },
  { id: 'lingering', name: 'Lingering Potion', multiplier: 0.25, multiplierLabel: '×1/4' },
  { id: 'arrow', name: 'Tipped Arrow', multiplier: 0.125, multiplierLabel: '×1/8 (min 1 tick)' }
];

export interface PotionDeliveryResult {
  id: PotionDeliveryFormDef['id'];
  name: string;
  multiplierLabel: string;
  ticks: number;
  seconds: number;
  mmss: string;
}

export function formatPotionMmSs(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const mins = Math.floor(safe / 60);
  const rem = Number((safe - mins * 60).toFixed(4));
  if (Number.isInteger(rem)) {
    return `${mins}:${String(rem).padStart(2, '0')}`;
  }
  const [whole, frac] = rem.toString().split('.');
  return `${mins}:${whole.padStart(2, '0')}.${frac}`;
}

export function computePotionDeliveryDurations(durationSeconds: number): PotionDeliveryResult[] {
  const safeSeconds = Math.max(0, Number.isFinite(durationSeconds) ? durationSeconds : 0);
  return POTION_DELIVERY_FORMS.map((form) => {
    if (safeSeconds <= 0) {
      return {
        id: form.id,
        name: form.name,
        multiplierLabel: form.multiplierLabel,
        ticks: 0,
        seconds: 0,
        mmss: '0:00'
      };
    }
    const rawTicks = Number((safeSeconds * 20 * form.multiplier).toFixed(9));
    const ticks = Math.max(1, Math.floor(rawTicks));
    const seconds = ticks / 20;
    return {
      id: form.id,
      name: form.name,
      multiplierLabel: form.multiplierLabel,
      ticks,
      seconds,
      mmss: formatPotionMmSs(seconds)
    };
  });
}

// =============================================================================
// Block Gradient Generator Data (45 Common Blocks — Average Texture Colours)
// =============================================================================

export interface GradientBlockDef {
  name: string;
  hex: string;
}

export const BLOCK_GRADIENT_PALETTE: GradientBlockDef[] = [
  { name: 'White Concrete', hex: '#CFD5D6' },
  { name: 'Black Concrete', hex: '#080A0F' },
  { name: 'White Wool', hex: '#EAEDED' },
  { name: 'Black Wool', hex: '#16161B' },
  { name: 'Snow Block', hex: '#F9FEFE' },
  { name: 'Block of Quartz', hex: '#ECE6DF' },
  { name: 'Smooth Quartz Block', hex: '#EDE6E0' },
  { name: 'Diorite', hex: '#C1C1C1' },
  { name: 'Polished Diorite', hex: '#C5C5C6' },
  { name: 'Clay', hex: '#A1A7B4' },
  { name: 'Smooth Stone', hex: '#A0A0A0' },
  { name: 'Stone', hex: '#7E7E7E' },
  { name: 'Stone Bricks', hex: '#7C7C7C' },
  { name: 'Cobblestone', hex: '#848484' },
  { name: 'Gravel', hex: '#858180' },
  { name: 'Andesite', hex: '#89898A' },
  { name: 'Light Gray Wool', hex: '#8E8F87' },
  { name: 'Gray Wool', hex: '#3F4548' },
  { name: 'Gray Concrete', hex: '#373A3E' },
  { name: 'Cobbled Deepslate', hex: '#515153' },
  { name: 'Deepslate Bricks', hex: '#4B4B4B' },
  { name: 'Obsidian', hex: '#150E23' },
  { name: 'Oak Planks', hex: '#A58651' },
  { name: 'Spruce Planks', hex: '#755631' },
  { name: 'Dark Oak Planks', hex: '#442C15' },
  { name: 'Birch Planks', hex: '#C2B17A' },
  { name: 'Jungle Planks', hex: '#A47654' },
  { name: 'Dirt', hex: '#8A6346' },
  { name: 'Granite', hex: '#986A59' },
  { name: 'Terracotta', hex: '#985E44' },
  { name: 'Sand', hex: '#DBD0A4' },
  { name: 'End Stone', hex: '#DCE09F' },
  { name: 'Netherrack', hex: '#632828' },
  { name: 'Red Wool', hex: '#A12823' },
  { name: 'Red Concrete', hex: '#8E2121' },
  { name: 'Blue Wool', hex: '#353A9E' },
  { name: 'Blue Concrete', hex: '#2D2F8F' },
  { name: 'Green Wool', hex: '#556E1C' },
  { name: 'Yellow Wool', hex: '#F9C629' },
  { name: 'Prismarine', hex: '#68A596' },
  { name: 'Block of Gold', hex: '#F7D345' },
  { name: 'Block of Diamond', hex: '#71EEE5' },
  { name: 'Block of Emerald', hex: '#39CE63' },
  { name: 'Block of Iron', hex: '#DDDDDD' },
  { name: 'Tuff', hex: '#6F6F69' }
];

function roundHalfToEven(n: number): number {
  const floor = Math.floor(n);
  const diff = n - floor;
  if (Math.abs(diff - 0.5) < 1e-9) {
    return floor % 2 === 0 ? floor : floor + 1;
  }
  return Math.round(n);
}

export interface BlockGradientStep {
  stepNumber: number;
  block: GradientBlockDef;
  targetRgb: RgbColor;
  targetHex: string;
  isEndpoint: boolean;
}

export function generateBlockGradient(
  startName: string,
  endName: string,
  steps: number
): BlockGradientStep[] {
  const safeSteps = Math.max(3, Math.min(20, Math.round(steps)));
  const startBlock =
    BLOCK_GRADIENT_PALETTE.find((b) => b.name === startName) ?? BLOCK_GRADIENT_PALETTE[0];
  const endBlock =
    BLOCK_GRADIENT_PALETTE.find((b) => b.name === endName) ?? BLOCK_GRADIENT_PALETTE[1];

  const startRgb = hexToRgb(startBlock.hex);
  const endRgb = hexToRgb(endBlock.hex);

  const used = new Set<string>([startBlock.name, endBlock.name]);
  const result: BlockGradientStep[] = new Array(safeSteps);

  // Endpoints are always exact start & end blocks
  result[0] = {
    stepNumber: 1,
    block: startBlock,
    targetRgb: startRgb,
    targetHex: startBlock.hex,
    isEndpoint: true
  };
  result[safeSteps - 1] = {
    stepNumber: safeSteps,
    block: endBlock,
    targetRgb: endRgb,
    targetHex: endBlock.hex,
    isEndpoint: true
  };

  for (let i = 1; i < safeSteps - 1; i++) {
    const t = i / (safeSteps - 1);
    const targetRgb: RgbColor = {
      r: roundHalfToEven(startRgb.r + (endRgb.r - startRgb.r) * t),
      g: roundHalfToEven(startRgb.g + (endRgb.g - startRgb.g) * t),
      b: roundHalfToEven(startRgb.b + (endRgb.b - startRgb.b) * t)
    };
    const targetHex = rgbToHex(targetRgb.r, targetRgb.g, targetRgb.b);

    let bestBlock: GradientBlockDef = startBlock;
    let bestD2 = Number.POSITIVE_INFINITY;

    for (const candidate of BLOCK_GRADIENT_PALETTE) {
      if (used.has(candidate.name)) continue;
      const cRgb = hexToRgb(candidate.hex);
      const d2 =
        (cRgb.r - targetRgb.r) ** 2 +
        (cRgb.g - targetRgb.g) ** 2 +
        (cRgb.b - targetRgb.b) ** 2;
      if (d2 < bestD2) {
        bestD2 = d2;
        bestBlock = candidate;
      }
    }

    used.add(bestBlock.name);
    result[i] = {
      stepNumber: i + 1,
      block: bestBlock,
      targetRgb,
      targetHex,
      isEndpoint: false
    };
  }

  return result;
}


