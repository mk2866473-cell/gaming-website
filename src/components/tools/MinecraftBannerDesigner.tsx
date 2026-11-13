/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useId } from 'react';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  ScrollText,
  Package
} from 'lucide-react';

export interface BannerColor {
  id: string;
  name: string;
  hex: string;
  textDark: boolean;
}

export const BANNER_COLORS: BannerColor[] = [
  { id: 'white', name: 'White', hex: '#F9FFFE', textDark: true },
  { id: 'orange', name: 'Orange', hex: '#F9801D', textDark: true },
  { id: 'magenta', name: 'Magenta', hex: '#C74EBD', textDark: false },
  { id: 'light_blue', name: 'Light Blue', hex: '#3AB3DA', textDark: true },
  { id: 'yellow', name: 'Yellow', hex: '#FED83D', textDark: true },
  { id: 'lime', name: 'Lime', hex: '#80C71F', textDark: true },
  { id: 'pink', name: 'Pink', hex: '#F38BAA', textDark: true },
  { id: 'gray', name: 'Gray', hex: '#474F52', textDark: false },
  { id: 'light_gray', name: 'Light Gray', hex: '#9D9D97', textDark: true },
  { id: 'cyan', name: 'Cyan', hex: '#169C9C', textDark: false },
  { id: 'purple', name: 'Purple', hex: '#8932B8', textDark: false },
  { id: 'blue', name: 'Blue', hex: '#3C44AA', textDark: false },
  { id: 'brown', name: 'Brown', hex: '#835432', textDark: false },
  { id: 'green', name: 'Green', hex: '#5E7C16', textDark: false },
  { id: 'red', name: 'Red', hex: '#B02E26', textDark: false },
  { id: 'black', name: 'Black', hex: '#1D1D21', textDark: false }
];

export interface BannerPatternDef {
  id: string;
  name: string;
  requiresItem: boolean;
  patternItemLabel?: string;
  obtainInfo?: string;
}

export const BANNER_PATTERNS: BannerPatternDef[] = [
  // Dye-only patterns in the loom (32)
  { id: 'stripe_bottom', name: 'Base / Bottom Stripe', requiresItem: false },
  { id: 'stripe_top', name: 'Chief / Top Stripe', requiresItem: false },
  { id: 'stripe_left', name: 'Pale Dexter', requiresItem: false },
  { id: 'stripe_right', name: 'Pale Sinister', requiresItem: false },
  { id: 'stripe_center', name: 'Pale', requiresItem: false },
  { id: 'stripe_middle', name: 'Fess', requiresItem: false },
  { id: 'stripe_downright', name: 'Bend', requiresItem: false },
  { id: 'stripe_downleft', name: 'Bend Sinister', requiresItem: false },
  { id: 'small_stripes', name: 'Paly', requiresItem: false },
  { id: 'cross', name: 'Saltire', requiresItem: false },
  { id: 'straight_cross', name: 'Cross', requiresItem: false },
  { id: 'diagonal_left', name: 'Per Bend Sinister (Top Left)', requiresItem: false },
  { id: 'diagonal_right', name: 'Per Bend (Top Right)', requiresItem: false },
  { id: 'diagonal_up_left', name: 'Per Bend Inverted (Bottom Left)', requiresItem: false },
  { id: 'diagonal_up_right', name: 'Per Bend Sinister Inverted (Bottom Right)', requiresItem: false },
  { id: 'half_vertical', name: 'Half Vertical (Left)', requiresItem: false },
  { id: 'half_vertical_right', name: 'Half Vertical (Right)', requiresItem: false },
  { id: 'half_horizontal', name: 'Half Horizontal (Top)', requiresItem: false },
  { id: 'half_horizontal_bottom', name: 'Half Horizontal (Bottom)', requiresItem: false },
  { id: 'square_bottom_left', name: 'Base Dexter Canton (Bottom Left)', requiresItem: false },
  { id: 'square_bottom_right', name: 'Base Sinister Canton (Bottom Right)', requiresItem: false },
  { id: 'square_top_left', name: 'Chief Dexter Canton (Top Left)', requiresItem: false },
  { id: 'square_top_right', name: 'Chief Sinister Canton (Top Right)', requiresItem: false },
  { id: 'triangle_bottom', name: 'Chevron', requiresItem: false },
  { id: 'triangle_top', name: 'Inverted Chevron', requiresItem: false },
  { id: 'triangles_bottom', name: 'Base Indented', requiresItem: false },
  { id: 'triangles_top', name: 'Chief Indented', requiresItem: false },
  { id: 'circle', name: 'Roundel', requiresItem: false },
  { id: 'rhombus', name: 'Lozenge', requiresItem: false },
  { id: 'border', name: 'Bordure', requiresItem: false },
  { id: 'gradient', name: 'Gradient', requiresItem: false },
  { id: 'gradient_up', name: 'Base Gradient', requiresItem: false },

  // Banner-pattern item patterns (10)
  {
    id: 'curly_border',
    name: 'Bordure Indented',
    requiresItem: true,
    patternItemLabel: 'Bordure Indented Pattern',
    obtainInfo: 'Crafted with Paper + Vines'
  },
  {
    id: 'bricks',
    name: 'Field Masoned',
    requiresItem: true,
    patternItemLabel: 'Field Masoned Pattern',
    obtainInfo: 'Crafted with Paper + Bricks'
  },
  {
    id: 'flower',
    name: 'Flower Charge',
    requiresItem: true,
    patternItemLabel: 'Flower Charge Pattern',
    obtainInfo: 'Crafted with Paper + Oxeye Daisy'
  },
  {
    id: 'creeper',
    name: 'Creeper Charge',
    requiresItem: true,
    patternItemLabel: 'Creeper Charge Pattern',
    obtainInfo: 'Crafted with Paper + Creeper Head'
  },
  {
    id: 'skull',
    name: 'Skull Charge',
    requiresItem: true,
    patternItemLabel: 'Skull Charge Pattern',
    obtainInfo: 'Crafted with Paper + Wither Skeleton Skull'
  },
  {
    id: 'mojang',
    name: 'Thing',
    requiresItem: true,
    patternItemLabel: 'Thing Pattern',
    obtainInfo: 'Crafted with Paper + Enchanted Golden Apple'
  },
  {
    id: 'globe',
    name: 'Globe',
    requiresItem: true,
    patternItemLabel: 'Globe Pattern',
    obtainInfo: 'NOT craftable: buy the pattern from a master cartographer villager for 8 emeralds'
  },
  {
    id: 'piglin',
    name: 'Snout',
    requiresItem: true,
    patternItemLabel: 'Snout Pattern',
    obtainInfo: 'NOT craftable: bastion remnant chest loot'
  },
  {
    id: 'flow',
    name: 'Flow',
    requiresItem: true,
    patternItemLabel: 'Flow Pattern',
    obtainInfo: 'NOT craftable: trial chambers ominous vault'
  },
  {
    id: 'guster',
    name: 'Guster',
    requiresItem: true,
    patternItemLabel: 'Guster Pattern',
    obtainInfo: 'NOT craftable: trial chambers vault'
  }
];

export interface BannerLayer {
  uid: number;
  patternId: string;
  colorId: string;
}

const MAX_SURVIVAL_LAYERS = 6;

const PRESETS: {
  name: string;
  baseColorId: string;
  layers: { patternId: string; colorId: string }[];
}[] = [
  {
    name: 'Emerald Creeper Crest (3 Layers)',
    baseColorId: 'green',
    layers: [
      { patternId: 'gradient_up', colorId: 'black' },
      { patternId: 'creeper', colorId: 'lime' },
      { patternId: 'border', colorId: 'black' }
    ]
  },
  {
    name: 'Trial Chamber Storm (3 Layers)',
    baseColorId: 'cyan',
    layers: [
      { patternId: 'triangles_bottom', colorId: 'blue' },
      { patternId: 'flow', colorId: 'light_blue' },
      { patternId: 'curly_border', colorId: 'white' }
    ]
  },
  {
    name: 'Royal Piglin Bastion (4 Layers)',
    baseColorId: 'black',
    layers: [
      { patternId: 'bricks', colorId: 'gray' },
      { patternId: 'stripe_middle', colorId: 'red' },
      { patternId: 'piglin', colorId: 'yellow' },
      { patternId: 'curly_border', colorId: 'orange' }
    ]
  },
  {
    name: 'Sunlit Flower Shield (3 Layers)',
    baseColorId: 'blue',
    layers: [
      { patternId: 'gradient', colorId: 'light_blue' },
      { patternId: 'flower', colorId: 'yellow' },
      { patternId: 'border', colorId: 'white' }
    ]
  }
];

function renderPatternShape(
  patternId: string,
  fill: string,
  uniqueKey: string
): React.ReactNode {
  switch (patternId) {
    case 'stripe_bottom':
      return <rect x="0" y="30" width="20" height="10" fill={fill} />;
    case 'stripe_top':
      return <rect x="0" y="0" width="20" height="10" fill={fill} />;
    case 'stripe_left':
      return <rect x="0" y="0" width="6.5" height="40" fill={fill} />;
    case 'stripe_right':
      return <rect x="13.5" y="0" width="6.5" height="40" fill={fill} />;
    case 'stripe_center':
      return <rect x="6.75" y="0" width="6.5" height="40" fill={fill} />;
    case 'stripe_middle':
      return <rect x="0" y="16" width="20" height="8" fill={fill} />;
    case 'stripe_downright':
      return <polygon points="0,0 5,0 20,35 20,40 15,40 0,5" fill={fill} />;
    case 'stripe_downleft':
      return <polygon points="15,0 20,0 20,5 5,40 0,40 0,35" fill={fill} />;
    case 'small_stripes':
      return (
        <g fill={fill}>
          <rect x="0" y="0" width="3" height="40" />
          <rect x="5.6" y="0" width="3" height="40" />
          <rect x="11.4" y="0" width="3" height="40" />
          <rect x="17" y="0" width="3" height="40" />
        </g>
      );
    case 'cross':
      return (
        <g fill={fill}>
          <polygon points="0,0 4.5,0 20,35.5 20,40 15.5,40 0,4.5" />
          <polygon points="15.5,0 20,0 20,4.5 4.5,40 0,40 0,35.5" />
        </g>
      );
    case 'straight_cross':
      return (
        <g fill={fill}>
          <rect x="7" y="0" width="6" height="40" />
          <rect x="0" y="17" width="20" height="6" />
        </g>
      );
    case 'diagonal_left':
      return <polygon points="0,0 20,0 0,40" fill={fill} />;
    case 'diagonal_right':
      return <polygon points="0,0 20,0 20,40" fill={fill} />;
    case 'diagonal_up_left':
      return <polygon points="0,0 0,40 20,40" fill={fill} />;
    case 'diagonal_up_right':
      return <polygon points="20,0 20,40 0,40" fill={fill} />;
    case 'half_vertical':
      return <rect x="0" y="0" width="10" height="40" fill={fill} />;
    case 'half_vertical_right':
      return <rect x="10" y="0" width="10" height="40" fill={fill} />;
    case 'half_horizontal':
      return <rect x="0" y="0" width="20" height="20" fill={fill} />;
    case 'half_horizontal_bottom':
      return <rect x="0" y="20" width="20" height="20" fill={fill} />;
    case 'square_bottom_left':
      return <rect x="0" y="30" width="10" height="10" fill={fill} />;
    case 'square_bottom_right':
      return <rect x="10" y="30" width="10" height="10" fill={fill} />;
    case 'square_top_left':
      return <rect x="0" y="0" width="10" height="10" fill={fill} />;
    case 'square_top_right':
      return <rect x="10" y="0" width="10" height="10" fill={fill} />;
    case 'triangle_bottom':
      return <polygon points="0,40 10,26 20,40" fill={fill} />;
    case 'triangle_top':
      return <polygon points="0,0 20,0 10,14" fill={fill} />;
    case 'triangles_bottom':
      return (
        <polygon
          points="0,40 2.5,35 5,40 7.5,35 10,40 12.5,35 15,40 17.5,35 20,40"
          fill={fill}
        />
      );
    case 'triangles_top':
      return (
        <polygon
          points="0,0 2.5,5 5,0 7.5,5 10,0 12.5,5 15,0 17.5,5 20,0"
          fill={fill}
        />
      );
    case 'circle':
      return <circle cx="10" cy="20" r="5.5" fill={fill} />;
    case 'rhombus':
      return <polygon points="10,10 17,20 10,30 3,20" fill={fill} />;
    case 'border':
      return (
        <path
          d="M0,0 H20 V40 H0 Z M2.8,2.8 V37.2 H17.2 V2.8 Z"
          fillRule="evenodd"
          fill={fill}
        />
      );
    case 'gradient':
      return (
        <>
          <defs>
            <linearGradient id={`grad-down-${uniqueKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fill} stopOpacity="1" />
              <stop offset="85%" stopColor={fill} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="20" height="40" fill={`url(#grad-down-${uniqueKey})`} />
        </>
      );
    case 'gradient_up':
      return (
        <>
          <defs>
            <linearGradient id={`grad-up-${uniqueKey}`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={fill} stopOpacity="1" />
              <stop offset="85%" stopColor={fill} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="20" height="40" fill={`url(#grad-up-${uniqueKey})`} />
        </>
      );
    case 'curly_border':
      return (
        <path
          d="M0,0 H20 V40 H0 Z M2.5,2.5 L5,5 L7.5,2.5 L10,5 L12.5,2.5 L15,5 L17.5,2.5 L17.5,5 L15,7.5 L17.5,10 L15,12.5 L17.5,15 L15,17.5 L17.5,20 L15,22.5 L17.5,25 L15,27.5 L17.5,30 L15,32.5 L17.5,35 L17.5,37.5 L15,35 L12.5,37.5 L10,35 L7.5,37.5 L5,35 L2.5,37.5 L2.5,35 L5,32.5 L2.5,30 L5,27.5 L2.5,25 L5,22.5 L2.5,20 L5,17.5 L2.5,15 L5,12.5 L2.5,10 L5,7.5 L2.5,5 Z"
          fillRule="evenodd"
          fill={fill}
        />
      );
    case 'bricks':
      return (
        <g fill={fill}>
          {[0, 8, 16, 24, 32].map((y) => (
            <React.Fragment key={`row-a-${y}`}>
              <rect x="0" y={y} width="9" height="3.2" />
              <rect x="10.5" y={y} width="9.5" height="3.2" />
            </React.Fragment>
          ))}
          {[4, 12, 20, 28, 36].map((y) => (
            <React.Fragment key={`row-b-${y}`}>
              <rect x="0" y={y} width="4" height="3.2" />
              <rect x="5.5" y={y} width="9" height="3.2" />
              <rect x="16" y={y} width="4" height="3.2" />
            </React.Fragment>
          ))}
        </g>
      );
    case 'flower':
      return (
        <g fill={fill}>
          <rect x="8.5" y="13" width="3" height="3" />
          <rect x="8.5" y="24" width="3" height="3" />
          <rect x="3" y="18.5" width="3" height="3" />
          <rect x="14" y="18.5" width="3" height="3" />
          <rect x="5" y="15" width="3" height="3" />
          <rect x="12" y="15" width="3" height="3" />
          <rect x="5" y="22" width="3" height="3" />
          <rect x="12" y="22" width="3" height="3" />
          <rect x="8.5" y="18.5" width="3" height="3" opacity="0.45" />
        </g>
      );
    case 'creeper':
      return (
        <g fill={fill}>
          {/* Left & Right Eyes */}
          <rect x="4" y="13" width="4" height="4" />
          <rect x="12" y="13" width="4" height="4" />
          {/* Center Nose */}
          <rect x="8" y="17" width="4" height="3" />
          {/* Mouth */}
          <rect x="6" y="19" width="8" height="4" />
          <rect x="6" y="23" width="2.5" height="3.5" />
          <rect x="11.5" y="23" width="2.5" height="3.5" />
        </g>
      );
    case 'skull':
      return (
        <g fill={fill}>
          {/* Cranium */}
          <rect x="5" y="11" width="10" height="8" rx="1" />
          {/* Jaw */}
          <rect x="6.5" y="19" width="7" height="3" />
          {/* Eye sockets cut visually via opacity or path */}
          <path
            d="M4,25 L7,23 L10,25.5 L13,23 L16,25 L13,27.5 L16,30 L13.5,31.5 L10,28.5 L6.5,31.5 L4,30 L7,27.5 Z"
          />
        </g>
      );
    case 'mojang':
      return (
        <path
          d="M5,14 C3,14 2.5,16.5 4.2,17.8 L6.2,19.4 C5.2,21.5 6.8,24.5 10,24.5 C13.2,24.5 14.8,21.5 13.8,19.4 L15.8,17.8 C17.5,16.5 17,14 15,14 C13.5,14 12.6,15.5 12.2,16.8 C11.5,16.3 10.8,16 10,16 C9.2,16 8.5,16.3 7.8,16.8 C7.4,15.5 6.5,14 5,14 Z M8,20.2 A2,2 0 1,1 12,20.2 A2,2 0 1,1 8,20.2 Z"
          fillRule="evenodd"
          fill={fill}
        />
      );
    case 'globe':
      return (
        <path
          d="M10,12 A8,8 0 1,0 10,28 A8,8 0 1,0 10,12 Z M6,15 H9 V18 H6 Z M11,16 H15 V20 H11 Z M7,21 H11 V25 H7 Z"
          fillRule="evenodd"
          fill={fill}
        />
      );
    case 'piglin':
      return (
        <path
          d="M4,15 H16 V25 H4 Z M6,18 V22 H8.2 V18 Z M11.8,18 V22 H14 V18 Z"
          fillRule="evenodd"
          fill={fill}
        />
      );
    case 'flow':
      return (
        <g fill={fill}>
          <path d="M2,5 H11 V8 H5 V14 H2 Z" />
          <path d="M18,5 H12 V8 H15 V17 H18 Z" />
          <path d="M6,15 H14 V25 H6 Z M9,18 V22 H11 V18 Z" fillRule="evenodd" />
          <path d="M2,35 H8 V32 H5 V23 H2 Z" />
          <path d="M18,35 H9 V32 H15 V26 H18 Z" />
        </g>
      );
    case 'guster':
      return (
        <g fill={fill}>
          {/* Breeze / gust eyes & swirl motif */}
          <rect x="4" y="13" width="4.5" height="3" />
          <rect x="11.5" y="13" width="4.5" height="3" />
          <rect x="3" y="19" width="14" height="2.5" />
          <rect x="5" y="23.5" width="10" height="2.5" />
          <rect x="7.5" y="28" width="5" height="2.5" />
        </g>
      );
    default:
      return null;
  }
}

export default function MinecraftBannerDesigner() {
  const reactUid = useId().replace(/:/g, '');
  const [baseColorId, setBaseColorId] = useState<string>('green');
  const [layers, setLayers] = useState<BannerLayer[]>([
    { uid: 1, patternId: 'gradient_up', colorId: 'black' },
    { uid: 2, patternId: 'creeper', colorId: 'lime' },
    { uid: 3, patternId: 'border', colorId: 'black' }
  ]);
  const [nextUid, setNextUid] = useState<number>(4);

  // Controls for adding a new layer
  const [selectedPatternId, setSelectedPatternId] = useState<string>('stripe_bottom');
  const [selectedLayerColorId, setSelectedLayerColorId] = useState<string>('white');

  const baseColor =
    BANNER_COLORS.find((c) => c.id === baseColorId) ?? BANNER_COLORS[0];

  const handleAddLayer = () => {
    if (layers.length >= MAX_SURVIVAL_LAYERS) return;
    setLayers((prev) => [
      ...prev,
      {
        uid: nextUid,
        patternId: selectedPatternId,
        colorId: selectedLayerColorId
      }
    ]);
    setNextUid((n) => n + 1);
  };

  const handleRemoveLayer = (uid: number) => {
    setLayers((prev) => prev.filter((l) => l.uid !== uid));
  };

  const handleMoveLayer = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= layers.length) return;
    setLayers((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[target];
      next[target] = temp;
      return next;
    });
  };

  const handleUpdateLayer = (
    uid: number,
    patch: Partial<Pick<BannerLayer, 'patternId' | 'colorId'>>
  ) => {
    setLayers((prev) =>
      prev.map((l) => (l.uid === uid ? { ...l, ...patch } : l))
    );
  };

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setBaseColorId(preset.baseColorId);
    let uidCounter = nextUid;
    const newLayers = preset.layers.map((l) => ({
      uid: uidCounter++,
      patternId: l.patternId,
      colorId: l.colorId
    }));
    setNextUid(uidCounter);
    setLayers(newLayers);
  };

  const handleClearLayers = () => {
    setLayers([]);
  };

  // Aggregate dyes and non-consumed pattern items needed
  const dyeCounts = layers.reduce<Record<string, number>>((acc, layer) => {
    acc[layer.colorId] = (acc[layer.colorId] || 0) + 1;
    return acc;
  }, {});

  const requiredPatternItems = Array.from(
    new Set(
      layers
        .map((l) => BANNER_PATTERNS.find((p) => p.id === l.patternId))
        .filter((p): p is BannerPatternDef => Boolean(p?.requiresItem))
        .map((p) => p.id)
    )
  ).map((id) => BANNER_PATTERNS.find((p) => p.id === id)!);

  const selectedPatternDef =
    BANNER_PATTERNS.find((p) => p.id === selectedPatternId) ?? BANNER_PATTERNS[0];

  return (
    <div className="space-y-6">
      {/* Survival Loom Rules Notice */}
      <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 leading-relaxed">
          <span className="font-bold text-emerald-300">Survival Loom Limits:</span>{' '}
          Banners can hold up to <strong className="text-white">6 pattern layers</strong> in Survival mode using a Loom.{' '}
          In Java Edition, <strong className="text-white">banner pattern items are not consumed</strong> when applied in a loom — keep your crafted or looted pattern items to reuse forever.
        </div>
      </div>

      {/* Presets Row */}
      <div className="flex flex-wrap items-center gap-2 bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mr-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Presets:
        </span>
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => applyPreset(preset)}
            className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 hover:text-emerald-300 text-zinc-300 transition-colors cursor-pointer"
          >
            {preset.name}
          </button>
        ))}
        <button
          type="button"
          onClick={handleClearLayers}
          className="ml-auto text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear Layers
        </button>
      </div>

      {/* Designer Workspace: Preview (Left) + Controls (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Live Banner Preview */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl flex flex-col items-center space-y-4">
          <div className="w-full flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Live Banner Preview
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-emerald-400">
              {layers.length} / {MAX_SURVIVAL_LAYERS} layers
            </span>
          </div>

          <div className="w-full flex items-center justify-center py-4 bg-zinc-950/90 border border-zinc-800/80 rounded-xl">
            <svg
              viewBox="-3 -6 26 50"
              className="w-44 sm:w-48 h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.65)]"
              role="img"
              aria-label={`${baseColor.name} Minecraft banner preview with ${layers.length} layers`}
            >
              <defs>
                <clipPath id={`banner-clip-${reactUid}`}>
                  <rect x="0" y="0" width="20" height="40" />
                </clipPath>
              </defs>

              {/* Wooden Stand Pole & Top Crossbar */}
              <rect x="9" y="-5" width="2" height="48" fill="#6B4A2B" />
              <rect x="-1.5" y="-2.2" width="23" height="2.2" rx="0.4" fill="#8C6239" />
              <rect x="-1.5" y="-2.2" width="23" height="0.7" fill="#A6784B" />

              {/* Banner Cloth Container */}
              <g clipPath={`url(#banner-clip-${reactUid})`}>
                {/* Base Dye Color */}
                <rect x="0" y="0" width="20" height="40" fill={baseColor.hex} />

                {/* Stacked Pattern Layers in Order */}
                {layers.map((layer) => {
                  const layerColor =
                    BANNER_COLORS.find((c) => c.id === layer.colorId) ?? BANNER_COLORS[0];
                  return (
                    <g key={layer.uid}>
                      {renderPatternShape(
                        layer.patternId,
                        layerColor.hex,
                        `${reactUid}-${layer.uid}`
                      )}
                    </g>
                  );
                })}

                {/* Subtle Fabric Shading & Border Highlight */}
                <rect
                  x="0"
                  y="0"
                  width="20"
                  height="40"
                  fill="none"
                  stroke="#000000"
                  strokeOpacity="0.25"
                  strokeWidth="0.6"
                />
                <rect
                  x="0"
                  y="0"
                  width="20"
                  height="2"
                  fill="#000000"
                  fillOpacity="0.12"
                />
              </g>
            </svg>
          </div>

          <div className="w-full text-center text-xs text-zinc-400">
            Base: <span className="font-semibold text-white">{baseColor.name} Banner</span>
          </div>
        </div>

        {/* Right: Base Color + Layer Builder */}
        <div className="lg:col-span-8 space-y-5">
          {/* 1. Base Banner Colour Picker */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">1. Choose Base Banner Colour</h3>
              <span className="text-xs font-mono text-zinc-300">{baseColor.name}</span>
            </div>
            <div className="grid grid-cols-8 sm:grid-cols-16 gap-2">
              {BANNER_COLORS.map((color) => {
                const active = color.id === baseColorId;
                return (
                  <button
                    key={color.id}
                    type="button"
                    title={color.name}
                    onClick={() => setBaseColorId(color.id)}
                    className={`aspect-square rounded-lg border-2 transition-transform cursor-pointer relative ${
                      active
                        ? 'border-emerald-400 scale-110 ring-2 ring-emerald-400/40 z-10'
                        : 'border-zinc-700 hover:border-zinc-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Base colour ${color.name}`}
                  />
                );
              })}
            </div>
          </div>

          {/* 2. Add Layer Panel */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">2. Add Loom Layer (Max 6)</h3>
              <span className="text-xs text-zinc-400">
                {MAX_SURVIVAL_LAYERS - layers.length} slot(s) left
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pattern Dropdown */}
              <div>
                <label
                  htmlFor="banner-pattern-select"
                  className="text-xs font-semibold text-zinc-300 block mb-1.5"
                >
                  Pattern (In-Game Name &amp; ID)
                </label>
                <select
                  id="banner-pattern-select"
                  value={selectedPatternId}
                  onChange={(e) => setSelectedPatternId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-lg text-xs text-white focus:outline-none"
                >
                  <optgroup label="Dye-Only Loom Patterns (32)">
                    {BANNER_PATTERNS.filter((p) => !p.requiresItem).map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.id})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Requires Banner Pattern Item (10)">
                    {BANNER_PATTERNS.filter((p) => p.requiresItem).map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.id}) [Pattern Item]
                      </option>
                    ))}
                  </optgroup>
                </select>
                {selectedPatternDef.requiresItem && (
                  <p className="mt-1.5 text-[11px] text-amber-300 font-medium">
                    Requires {selectedPatternDef.patternItemLabel}:{' '}
                    <span className="text-zinc-300">{selectedPatternDef.obtainInfo}</span>
                  </p>
                )}
              </div>

              {/* Layer Dye Color Selector */}
              <div>
                <span className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Layer Dye Colour:{' '}
                  <span className="text-emerald-300 font-mono">
                    {BANNER_COLORS.find((c) => c.id === selectedLayerColorId)?.name}
                  </span>
                </span>
                <div className="grid grid-cols-8 gap-1.5">
                  {BANNER_COLORS.map((color) => {
                    const active = color.id === selectedLayerColorId;
                    return (
                      <button
                        key={color.id}
                        type="button"
                        title={color.name}
                        onClick={() => setSelectedLayerColorId(color.id)}
                        className={`h-7 rounded border-2 cursor-pointer transition-transform ${
                          active
                            ? 'border-emerald-400 scale-105 ring-1 ring-emerald-400/50'
                            : 'border-zinc-700 hover:border-zinc-400'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Layer dye ${color.name}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddLayer}
              disabled={layers.length >= MAX_SURVIVAL_LAYERS}
              className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                layers.length >= MAX_SURVIVAL_LAYERS
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
              }`}
            >
              <Plus className="w-4 h-4" />
              {layers.length >= MAX_SURVIVAL_LAYERS
                ? 'Survival Limit Reached (Max 6 Layers)'
                : `Add Layer ${layers.length + 1}: ${selectedPatternDef.name}`}
            </button>
          </div>

          {/* 3. Active Layers List */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white">
              3. Active Layers (Bottom to Top)
            </h3>

            {layers.length === 0 ? (
              <p className="text-xs text-zinc-400 py-4 text-center bg-zinc-950 rounded-lg border border-zinc-800">
                No pattern layers yet. Your banner is a plain {baseColor.name} Banner. Add up to 6 layers above!
              </p>
            ) : (
              <div className="space-y-2">
                {layers.map((layer, index) => {
                  const pat = BANNER_PATTERNS.find((p) => p.id === layer.patternId);
                  const col = BANNER_COLORS.find((c) => c.id === layer.colorId);
                  return (
                    <div
                      key={layer.uid}
                      className="flex flex-wrap sm:flex-nowrap items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-lg p-2.5"
                    >
                      <span className="text-xs font-mono font-bold text-emerald-400 w-6 text-center">
                        #{index + 1}
                      </span>
                      <span
                        className="w-5 h-5 rounded border border-zinc-600 flex-shrink-0"
                        style={{ backgroundColor: col?.hex }}
                        title={col?.name}
                      />
                      <div className="flex-1 min-w-[160px] grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <select
                          value={layer.patternId}
                          onChange={(e) =>
                            handleUpdateLayer(layer.uid, { patternId: e.target.value })
                          }
                          aria-label={`Layer ${index + 1} pattern`}
                          className="px-2 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-xs text-white focus:outline-none"
                        >
                          {BANNER_PATTERNS.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.id})
                            </option>
                          ))}
                        </select>
                        <select
                          value={layer.colorId}
                          onChange={(e) =>
                            handleUpdateLayer(layer.uid, { colorId: e.target.value })
                          }
                          aria-label={`Layer ${index + 1} dye colour`}
                          className="px-2 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-xs text-white focus:outline-none"
                        >
                          {BANNER_COLORS.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} Dye
                            </option>
                          ))}
                        </select>
                      </div>
                      {pat?.requiresItem && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-700/50">
                          Pattern Item
                        </span>
                      )}
                      <div className="flex items-center gap-1 ml-auto">
                        <button
                          type="button"
                          onClick={() => handleMoveLayer(index, -1)}
                          disabled={index === 0}
                          className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 disabled:opacity-30 cursor-pointer"
                          title="Move layer down (earlier)"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveLayer(index, 1)}
                          disabled={index === layers.length - 1}
                          className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 disabled:opacity-30 cursor-pointer"
                          title="Move layer up (later)"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveLayer(layer.uid)}
                          className="p-1.5 rounded bg-zinc-900 hover:bg-rose-950/70 border border-zinc-700 hover:border-rose-700 text-zinc-400 hover:text-rose-300 cursor-pointer"
                          title="Delete layer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step-by-Step Loom Crafting Recipe */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <ScrollText className="w-4 h-4 text-emerald-400" />
            Step-by-Step Survival Loom Crafting Guide
          </h3>

          <ol className="space-y-3">
            {/* Base Banner Craft */}
            <li className="flex items-start gap-3 bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                1
              </span>
              <div className="space-y-1 text-xs">
                <div className="font-bold text-white flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded border border-zinc-600 inline-block"
                    style={{ backgroundColor: baseColor.hex }}
                  />
                  Craft Base {baseColor.name} Banner
                </div>
                <p className="text-zinc-400">
                  Crafting Table: <strong className="text-zinc-200">6× {baseColor.name} Wool</strong> (top 2 rows) +{' '}
                  <strong className="text-zinc-200">1× Stick</strong> (bottom-center slot).
                </p>
              </div>
            </li>

            {/* Each Loom Layer Step */}
            {layers.map((layer, idx) => {
              const pat = BANNER_PATTERNS.find((p) => p.id === layer.patternId);
              const col = BANNER_COLORS.find((c) => c.id === layer.colorId);
              return (
                <li
                  key={layer.uid}
                  className="flex items-start gap-3 bg-zinc-950 border border-zinc-800 rounded-lg p-3.5"
                >
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 2}
                  </span>
                  <div className="space-y-1 text-xs flex-1">
                    <div className="font-bold text-white flex flex-wrap items-center gap-2">
                      <span>
                        Loom Step {idx + 1}: Apply <span className="text-emerald-300">{pat?.name}</span>{' '}
                        <span className="text-zinc-500 font-mono">({pat?.id})</span>
                      </span>
                    </div>
                    <p className="text-zinc-300">
                      Inputs:{' '}
                      <strong className="text-white">
                        {idx === 0 ? `${baseColor.name} Banner` : `Banner from Step ${idx + 1}`}
                      </strong>{' '}
                      + <strong className="text-cyan-300">1× {col?.name} Dye</strong>
                      {pat?.requiresItem ? (
                        <>
                          {' '}
                          +{' '}
                          <strong className="text-amber-300">
                            {pat.patternItemLabel} (not consumed in Java)
                          </strong>
                        </>
                      ) : (
                        <> (select pattern directly in the Loom — no pattern item needed)</>
                      )}
                    </p>
                    {pat?.requiresItem && (
                      <p className="text-[11px] text-amber-200/90 bg-amber-950/30 border border-amber-800/40 rounded px-2 py-1 inline-block mt-1">
                        Pattern Item Source: {pat.obtainInfo}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Shopping List / Materials Summary */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Package className="w-4 h-4 text-cyan-400" />
            Materials Needed
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2">
              <span className="text-zinc-300">{baseColor.name} Wool</span>
              <span className="font-mono font-bold text-white">6</span>
            </div>
            <div className="flex justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2">
              <span className="text-zinc-300">Stick</span>
              <span className="font-mono font-bold text-white">1</span>
            </div>
            {Object.entries(dyeCounts).map(([colorId, count]) => {
              const col = BANNER_COLORS.find((c) => c.id === colorId);
              return (
                <div
                  key={colorId}
                  className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2"
                >
                  <span className="flex items-center gap-2 text-zinc-300">
                    <span
                      className="w-3 h-3 rounded border border-zinc-600"
                      style={{ backgroundColor: col?.hex }}
                    />
                    {col?.name} Dye
                  </span>
                  <span className="font-mono font-bold text-cyan-300">{count}</span>
                </div>
              );
            })}
          </div>

          {requiredPatternItems.length > 0 && (
            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Banner Pattern Items (Reusable in Java)
              </h4>
              <ul className="space-y-1.5 text-[11px] text-zinc-300">
                {requiredPatternItems.map((pat) => (
                  <li
                    key={pat.id}
                    className="bg-zinc-950 border border-zinc-800 rounded-lg p-2"
                  >
                    <div className="font-semibold text-white">{pat.patternItemLabel}</div>
                    <div className="text-zinc-400">{pat.obtainInfo}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
