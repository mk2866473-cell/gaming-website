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
  Shield,
  Sparkles,
  Info,
  CheckCircle2,
  ScrollText,
  Package
} from 'lucide-react';
import {
  BANNER_COLORS,
  BANNER_PATTERNS,
  BannerLayer,
  BannerPatternDef
} from './MinecraftBannerDesigner';

const MAX_SURVIVAL_LAYERS = 6;

const SHIELD_PRESETS: {
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
    name: 'Royal Bastion Shield (4 Layers)',
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

/**
 * Renders the shared 42 banner patterns onto the wider, shorter shield face (20x32 internal cloth area).
 */
function renderShieldPatternShape(
  patternId: string,
  fill: string,
  uniqueKey: string
): React.ReactNode {
  switch (patternId) {
    case 'stripe_bottom':
      return <rect x="0" y="24" width="20" height="8" fill={fill} />;
    case 'stripe_top':
      return <rect x="0" y="0" width="20" height="8" fill={fill} />;
    case 'stripe_left':
      return <rect x="0" y="0" width="6.5" height="32" fill={fill} />;
    case 'stripe_right':
      return <rect x="13.5" y="0" width="6.5" height="32" fill={fill} />;
    case 'stripe_center':
      return <rect x="6.75" y="0" width="6.5" height="32" fill={fill} />;
    case 'stripe_middle':
      return <rect x="0" y="12.5" width="20" height="7" fill={fill} />;
    case 'stripe_downright':
      return <polygon points="0,0 5,0 20,27 20,32 15,32 0,5" fill={fill} />;
    case 'stripe_downleft':
      return <polygon points="15,0 20,0 20,5 5,32 0,32 0,27" fill={fill} />;
    case 'small_stripes':
      return (
        <g fill={fill}>
          <rect x="0" y="0" width="3" height="32" />
          <rect x="5.6" y="0" width="3" height="32" />
          <rect x="11.4" y="0" width="3" height="32" />
          <rect x="17" y="0" width="3" height="32" />
        </g>
      );
    case 'cross':
      return (
        <g fill={fill}>
          <polygon points="0,0 4.5,0 20,27.5 20,32 15.5,32 0,4.5" />
          <polygon points="15.5,0 20,0 20,4.5 4.5,32 0,32 0,27.5" />
        </g>
      );
    case 'straight_cross':
      return (
        <g fill={fill}>
          <rect x="7" y="0" width="6" height="32" />
          <rect x="0" y="13" width="20" height="6" />
        </g>
      );
    case 'diagonal_left':
      return <polygon points="0,0 20,0 0,32" fill={fill} />;
    case 'diagonal_right':
      return <polygon points="0,0 20,0 20,32" fill={fill} />;
    case 'diagonal_up_left':
      return <polygon points="0,0 0,32 20,32" fill={fill} />;
    case 'diagonal_up_right':
      return <polygon points="20,0 20,32 0,32" fill={fill} />;
    case 'half_vertical':
      return <rect x="0" y="0" width="10" height="32" fill={fill} />;
    case 'half_vertical_right':
      return <rect x="10" y="0" width="10" height="32" fill={fill} />;
    case 'half_horizontal':
      return <rect x="0" y="0" width="20" height="16" fill={fill} />;
    case 'half_horizontal_bottom':
      return <rect x="0" y="16" width="20" height="16" fill={fill} />;
    case 'square_bottom_left':
      return <rect x="0" y="23" width="10" height="9" fill={fill} />;
    case 'square_bottom_right':
      return <rect x="10" y="23" width="10" height="9" fill={fill} />;
    case 'square_top_left':
      return <rect x="0" y="0" width="10" height="9" fill={fill} />;
    case 'square_top_right':
      return <rect x="10" y="0" width="10" height="9" fill={fill} />;
    case 'triangle_bottom':
      return <polygon points="0,32 10,20 20,32" fill={fill} />;
    case 'triangle_top':
      return <polygon points="0,0 20,0 10,12" fill={fill} />;
    case 'triangles_bottom':
      return (
        <polygon
          points="0,32 2.5,27 5,32 7.5,27 10,32 12.5,27 15,32 17.5,27 20,32"
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
      return <circle cx="10" cy="16" r="5" fill={fill} />;
    case 'rhombus':
      return <polygon points="10,7 17,16 10,25 3,16" fill={fill} />;
    case 'border':
      return (
        <path
          d="M0,0 H20 V32 H0 Z M2.8,2.8 V29.2 H17.2 V2.8 Z"
          fillRule="evenodd"
          fill={fill}
        />
      );
    case 'gradient':
      return (
        <>
          <defs>
            <linearGradient id={`shield-grad-down-${uniqueKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fill} stopOpacity="1" />
              <stop offset="85%" stopColor={fill} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="20" height="32" fill={`url(#shield-grad-down-${uniqueKey})`} />
        </>
      );
    case 'gradient_up':
      return (
        <>
          <defs>
            <linearGradient id={`shield-grad-up-${uniqueKey}`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={fill} stopOpacity="1" />
              <stop offset="85%" stopColor={fill} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="20" height="32" fill={`url(#shield-grad-up-${uniqueKey})`} />
        </>
      );
    case 'curly_border':
      return (
        <path
          d="M0,0 H20 V32 H0 Z M2.5,2.5 L5,5 L7.5,2.5 L10,5 L12.5,2.5 L15,5 L17.5,2.5 L17.5,5 L15,7 L17.5,9.5 L15,12 L17.5,14.5 L15,17 L17.5,19.5 L15,22 L17.5,24.5 L15,27 L17.5,29.5 L15,27.5 L12.5,29.5 L10,27.5 L7.5,29.5 L5,27.5 L2.5,29.5 L2.5,27 L5,24.5 L2.5,22 L5,19.5 L2.5,17 L5,14.5 L2.5,12 L5,9.5 L2.5,7 L5,5 Z"
          fillRule="evenodd"
          fill={fill}
        />
      );
    case 'bricks':
      return (
        <g fill={fill}>
          {[0, 7, 14, 21, 28].map((y) => (
            <React.Fragment key={`s-row-a-${y}`}>
              <rect x="0" y={y} width="9" height="2.8" />
              <rect x="10.5" y={y} width="9.5" height="2.8" />
            </React.Fragment>
          ))}
          {[3.5, 10.5, 17.5, 24.5].map((y) => (
            <React.Fragment key={`s-row-b-${y}`}>
              <rect x="0" y={y} width="4" height="2.8" />
              <rect x="5.5" y={y} width="9" height="2.8" />
              <rect x="16" y={y} width="4" height="2.8" />
            </React.Fragment>
          ))}
        </g>
      );
    case 'flower':
      return (
        <g fill={fill}>
          <rect x="8.5" y="9" width="3" height="3" />
          <rect x="8.5" y="20" width="3" height="3" />
          <rect x="3" y="14.5" width="3" height="3" />
          <rect x="14" y="14.5" width="3" height="3" />
          <rect x="5" y="11" width="3" height="3" />
          <rect x="12" y="11" width="3" height="3" />
          <rect x="5" y="18" width="3" height="3" />
          <rect x="12" y="18" width="3" height="3" />
          <rect x="8.5" y="14.5" width="3" height="3" opacity="0.45" />
        </g>
      );
    case 'creeper':
      return (
        <g fill={fill}>
          <rect x="4" y="9.5" width="4" height="3.5" />
          <rect x="12" y="9.5" width="4" height="3.5" />
          <rect x="8" y="13" width="4" height="2.5" />
          <rect x="6" y="15" width="8" height="3.5" />
          <rect x="6" y="18.5" width="2.5" height="3" />
          <rect x="11.5" y="18.5" width="2.5" height="3" />
        </g>
      );
    case 'skull':
      return (
        <g fill={fill}>
          <rect x="5" y="8" width="10" height="7" rx="1" />
          <rect x="6.5" y="15" width="7" height="2.5" />
          <path d="M4,20.5 L7,18.5 L10,21 L13,18.5 L16,20.5 L13,22.5 L16,25 L13.5,26.5 L10,23.5 L6.5,26.5 L4,25 L7,22.5 Z" />
        </g>
      );
    case 'mojang':
      return (
        <path
          d="M5,10 C3,10 2.5,12.5 4.2,13.8 L6.2,15.4 C5.2,17.5 6.8,20.5 10,20.5 C13.2,20.5 14.8,17.5 13.8,15.4 L15.8,13.8 C17.5,12.5 17,10 15,10 C13.5,10 12.6,11.5 12.2,12.8 C11.5,12.3 10.8,12 10,12 C9.2,12 8.5,12.3 7.8,12.8 C7.4,11.5 6.5,10 5,10 Z M8,16.2 A2,2 0 1,1 12,16.2 A2,2 0 1,1 8,16.2 Z"
          fillRule="evenodd"
          fill={fill}
        />
      );
    case 'globe':
      return (
        <path
          d="M10,8.5 A7.5,7.5 0 1,0 10,23.5 A7.5,7.5 0 1,0 10,8.5 Z M6,11 H9 V14 H6 Z M11,12 H15 V16 H11 Z M7,17 H11 V21 H7 Z"
          fillRule="evenodd"
          fill={fill}
        />
      );
    case 'piglin':
      return (
        <path
          d="M4,11.5 H16 V20.5 H4 Z M6,14 V18 H8.2 V14 Z M11.8,14 V18 H14 V14 Z"
          fillRule="evenodd"
          fill={fill}
        />
      );
    case 'flow':
      return (
        <g fill={fill}>
          <path d="M2,4 H11 V7 H5 V12 H2 Z" />
          <path d="M18,4 H12 V7 H15 V14 H18 Z" />
          <path d="M6,12 H14 V20 H6 Z M9,14.5 V17.5 H11 V14.5 Z" fillRule="evenodd" />
          <path d="M2,28 H8 V25 H5 V18 H2 Z" />
          <path d="M18,28 H9 V25 H15 V20 H18 Z" />
        </g>
      );
    case 'guster':
      return (
        <g fill={fill}>
          <rect x="4" y="10" width="4.5" height="2.8" />
          <rect x="11.5" y="10" width="4.5" height="2.8" />
          <rect x="3" y="15.5" width="14" height="2.3" />
          <rect x="5" y="19.5" width="10" height="2.3" />
          <rect x="7.5" y="23.5" width="5" height="2.3" />
        </g>
      );
    default:
      return null;
  }
}

export default function MinecraftShieldDesigner() {
  const reactUid = useId().replace(/:/g, '');
  const [baseColorId, setBaseColorId] = useState<string>('green');
  const [layers, setLayers] = useState<BannerLayer[]>([
    { uid: 1, patternId: 'gradient_up', colorId: 'black' },
    { uid: 2, patternId: 'creeper', colorId: 'lime' },
    { uid: 3, patternId: 'border', colorId: 'black' }
  ]);
  const [nextUid, setNextUid] = useState<number>(4);

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

  const applyPreset = (preset: (typeof SHIELD_PRESETS)[number]) => {
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
      {/* Half-Resolution Shield Notice */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 leading-relaxed">
          <strong className="text-white">Shield Resolution Note:</strong>{' '}
          Shields render patterns at half the resolution of banners, so the in-game result looks slightly different.
        </div>
      </div>

      {/* Presets Row */}
      <div className="flex flex-wrap items-center gap-2 bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl">
        <span className="text-xs font-semibold text-zinc-400 mr-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Presets
        </span>
        {SHIELD_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => applyPreset(preset)}
            className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 hover:text-emerald-300 text-zinc-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            {preset.name}
          </button>
        ))}
        <button
          type="button"
          onClick={handleClearLayers}
          className="ml-auto text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear Layers
        </button>
      </div>

      {/* Designer Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Live Shield Preview (wider, shorter proportions than a banner) */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl flex flex-col items-center space-y-4">
          <div className="w-full flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Live Shield Preview
            </h3>
            <span className="text-xs font-mono tabular-nums text-emerald-400">
              {layers.length} / {MAX_SURVIVAL_LAYERS} layers
            </span>
          </div>

          <div className="w-full flex items-center justify-center py-5 bg-zinc-950/90 border border-zinc-800/80 rounded-xl">
            <svg
              viewBox="-3 -3 26 38"
              className="w-48 sm:w-52 h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.65)]"
              role="img"
              aria-label={`${baseColor.name} Minecraft shield preview with ${layers.length} layers`}
            >
              <defs>
                <clipPath id={`shield-clip-${reactUid}`}>
                  <rect x="0" y="0" width="20" height="32" />
                </clipPath>
              </defs>

              {/* Outer Wooden & Iron Shield Frame */}
              <rect x="-2" y="-2" width="24" height="36" rx="1.2" fill="#6F4C2A" stroke="#3B2714" strokeWidth="0.9" />
              {/* Vertical plank grain lines on outer frame */}
              <rect x="-1.2" y="-1.2" width="22.4" height="34.4" fill="none" stroke="#8C6239" strokeWidth="0.7" />
              {/* Iron corner brackets */}
              <rect x="-2" y="-2" width="3.5" height="3.5" fill="#9FA7AF" />
              <rect x="18.5" y="-2" width="3.5" height="3.5" fill="#9FA7AF" />
              <rect x="-2" y="30.5" width="3.5" height="3.5" fill="#9FA7AF" />
              <rect x="18.5" y="30.5" width="3.5" height="3.5" fill="#9FA7AF" />
              {/* Iron edge rivets */}
              <rect x="-1.8" y="14.5" width="1.2" height="3" fill="#B6BEC6" />
              <rect x="20.6" y="14.5" width="1.2" height="3" fill="#B6BEC6" />

              {/* Shield Pattern Face (wider, shorter proportions than banner) */}
              <g clipPath={`url(#shield-clip-${reactUid})`}>
                <rect x="0" y="0" width="20" height="32" fill={baseColor.hex} />

                {layers.map((layer) => {
                  const layerColor =
                    BANNER_COLORS.find((c) => c.id === layer.colorId) ?? BANNER_COLORS[0];
                  return (
                    <g key={layer.uid}>
                      {renderShieldPatternShape(
                        layer.patternId,
                        layerColor.hex,
                        `${reactUid}-${layer.uid}`
                      )}
                    </g>
                  );
                })}

                <rect
                  x="0"
                  y="0"
                  width="20"
                  height="32"
                  fill="none"
                  stroke="#000000"
                  strokeOpacity="0.3"
                  strokeWidth="0.7"
                />
              </g>
            </svg>
          </div>

          <div className="w-full text-center text-xs text-zinc-400">
            Base: <span className="font-semibold text-white">{baseColor.name} Banner + Shield</span>
          </div>
        </div>

        {/* Right: Base Colour + Layer Builder (reusing shared 16-dye & 42-pattern data) */}
        <div className="lg:col-span-8 space-y-5">
          {/* 1. Base Banner Colour Picker */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">1. Choose Base Banner Colour (16 Dyes)</h3>
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
              <span className="text-xs text-zinc-400 tabular-nums">
                {MAX_SURVIVAL_LAYERS - layers.length} slot(s) left
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="shield-pattern-select"
                  className="text-xs font-semibold text-zinc-300 block mb-1.5"
                >
                  Pattern (In-Game Name &amp; ID)
                </label>
                <select
                  id="shield-pattern-select"
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
              3. Active Pattern Layers (Bottom to Top)
            </h3>

            {layers.length === 0 ? (
              <p className="text-xs text-zinc-400 py-4 text-center bg-zinc-950 rounded-lg border border-zinc-800">
                No pattern layers yet. Combining a plain {baseColor.name} Banner gives a solid {baseColor.name} Shield.
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
                      <span className="text-xs font-mono font-bold text-emerald-400 w-6 text-center tabular-nums">
                        #{index + 1}
                      </span>
                      <span
                        className="w-5 h-5 rounded border border-zinc-600 shrink-0"
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
                        <span className="text-[11px] font-mono text-amber-300 shrink-0">
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

      {/* Exact 4-Step Shield Crafting Panel + Materials Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Steps Panel */}
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <ScrollText className="w-4 h-4 text-emerald-400" />
            Step-by-Step Patterned Shield Crafting Guide
          </h3>

          <ol className="space-y-3 text-xs">
            <li className="flex items-start gap-3 bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <div className="space-y-1">
                <div className="font-bold text-white">
                  1) Craft a banner: 6 wool of one colour + 1 stick.
                </div>
                <p className="text-zinc-400">
                  Use <strong className="text-zinc-200">6× {baseColor.name} Wool</strong> +{' '}
                  <strong className="text-zinc-200">1× Stick</strong> at a Crafting Table to make your {baseColor.name} Banner.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <div className="space-y-1.5 flex-1">
                <div className="font-bold text-white">
                  2) Add up to 6 pattern layers in a loom (1 dye per layer; the 10 special patterns also need their banner-pattern item).
                </div>
                {layers.length > 0 && (
                  <ul className="space-y-1 text-zinc-400">
                    {layers.map((layer, idx) => {
                      const pat = BANNER_PATTERNS.find((p) => p.id === layer.patternId);
                      const col = BANNER_COLORS.find((c) => c.id === layer.colorId);
                      return (
                        <li key={layer.uid}>
                          • Layer {idx + 1}: <strong className="text-zinc-200">{pat?.name}</strong>{' '}
                          <span className="font-mono text-zinc-500">({pat?.id})</span> +{' '}
                          <strong className="text-cyan-300">1× {col?.name} Dye</strong>
                          {pat?.requiresItem ? ` + ${pat.patternItemLabel}` : ''}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </li>

            <li className="flex items-start gap-3 bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <div className="space-y-1">
                <div className="font-bold text-white">
                  3) Craft a shield: 6 planks + 1 iron ingot.
                </div>
                <p className="text-zinc-400">
                  Make an unpatterned Shield on a Crafting Table using any 6 wood Planks and 1 Iron Ingot.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold flex items-center justify-center shrink-0">
                4
              </span>
              <div className="space-y-1">
                <div className="font-bold text-white">
                  4) Combine shield + banner in a crafting grid — the banner is consumed, the shield must have no pre-existing pattern, durability and enchantments are unchanged; a patterned shield cannot be repainted or washed in a cauldron.
                </div>
              </div>
            </li>
          </ol>
        </div>

        {/* Materials Summary */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Package className="w-4 h-4 text-cyan-400" />
            Materials Summary ({layers.length} Layers)
          </h3>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-xs text-emerald-200 leading-relaxed">
            One patterned shield from scratch with {layers.length} {layers.length === 1 ? 'layer' : 'layers'} = 6 planks + 1 iron ingot + 6 wool + 1 stick + {layers.length} {layers.length === 1 ? 'dye' : 'dyes'}.
          </div>

          <div className="space-y-2 text-xs tabular-nums">
            <div className="flex justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2">
              <span className="text-zinc-300">Planks (any wood)</span>
              <span className="font-mono font-bold text-white">6</span>
            </div>
            <div className="flex justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2">
              <span className="text-zinc-300">Iron Ingot</span>
              <span className="font-mono font-bold text-white">1</span>
            </div>
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
