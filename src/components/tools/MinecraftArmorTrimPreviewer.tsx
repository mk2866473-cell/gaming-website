/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Shield, Layers, Hammer, Info, Sparkles } from 'lucide-react';
import {
  ARMOR_PIECES,
  ARMOR_TRIM_PATTERNS,
  ARMOR_TRIM_MATERIALS,
  ARMOR_TRIM_COMBINATIONS_PER_PIECE,
  ArmorPieceId,
  calculateArmorTrimSetCost
} from '../../data/minecraftBatch2Data';

interface ArmorBaseOption {
  id: string;
  name: string;
  fill: string;
  stroke: string;
  matchingMaterialId?: string;
}

const BASE_ARMOR_OPTIONS: ArmorBaseOption[] = [
  { id: 'netherite', name: 'Netherite', fill: '#443B3D', stroke: '#2A2325', matchingMaterialId: 'netherite' },
  { id: 'diamond', name: 'Diamond', fill: '#33A8B5', stroke: '#1E6B75', matchingMaterialId: 'diamond' },
  { id: 'iron', name: 'Iron', fill: '#B8B8B8', stroke: '#6E6E6E', matchingMaterialId: 'iron' },
  { id: 'gold', name: 'Gold', fill: '#D9A726', stroke: '#876410', matchingMaterialId: 'gold' },
  { id: 'chainmail', name: 'Chainmail', fill: '#7B828A', stroke: '#4A4F55' },
  { id: 'leather', name: 'Leather', fill: '#8B5733', stroke: '#57341C' },
  { id: 'turtle', name: 'Turtle Shell (Helmet)', fill: '#3A8E42', stroke: '#225927' }
];

function renderArmorTrimSilhouette(
  pieceId: ArmorPieceId,
  patternId: string,
  baseFill: string,
  baseStroke: string,
  trimHex: string
): React.ReactNode {
  // Deterministic pattern accent variant index so each pattern renders a distinguishable trim motif on the silhouette
  const patternIndex = ARMOR_TRIM_PATTERNS.findIndex((p) => p.id === patternId);
  const variant = Math.max(0, patternIndex) % 4;

  switch (pieceId) {
    case 'helmet':
      return (
        <svg viewBox="0 0 120 120" className="w-40 h-40" role="img" aria-label="Stylised helmet trim preview">
          {/* Base helmet silhouette */}
          <path
            d="M22,42 C22,22 38,14 60,14 C82,14 98,22 98,42 L98,84 L78,84 L78,60 L42,60 L42,84 L22,84 Z"
            fill={baseFill}
            stroke={baseStroke}
            strokeWidth="3"
          />
          {/* Trim overlay */}
          <path d="M22,38 H98 V46 H22 Z" fill={trimHex} />
          <path d="M54,14 H66 V40 H54 Z" fill={trimHex} />
          {variant === 0 && <path d="M24,74 H40 V82 H24 Z M80,74 H96 V82 H80 Z" fill={trimHex} />}
          {variant === 1 && <path d="M32,24 L46,34 L36,36 Z M88,24 L74,34 L84,36 Z" fill={trimHex} />}
          {variant === 2 && <rect x="44" y="54" width="32" height="6" fill={trimHex} />}
          {variant === 3 && <path d="M22,52 H34 V78 H22 Z M86,52 H98 V78 H86 Z" fill={trimHex} />}
        </svg>
      );
    case 'chestplate':
      return (
        <svg viewBox="0 0 120 120" className="w-40 h-40" role="img" aria-label="Stylised chestplate trim preview">
          {/* Base chestplate silhouette */}
          <path
            d="M16,24 L38,16 L48,26 L72,26 L82,16 L104,24 L108,54 L88,58 L88,104 L32,104 L32,58 L12,54 Z"
            fill={baseFill}
            stroke={baseStroke}
            strokeWidth="3"
          />
          {/* Shoulder trim */}
          <path d="M18,24 L38,17 L44,29 L22,36 Z M102,24 L82,17 L76,29 L98,36 Z" fill={trimHex} />
          {/* Chest motif */}
          {variant === 0 && <path d="M44,44 H76 V52 H64 V86 H56 V52 H44 Z" fill={trimHex} />}
          {variant === 1 && <path d="M40,42 L60,64 L80,42 L80,54 L60,76 L40,54 Z" fill={trimHex} />}
          {variant === 2 && <path d="M34,42 H86 V48 H34 Z M34,62 H86 V68 H34 Z M34,82 H86 V88 H34 Z" fill={trimHex} />}
          {variant === 3 && <path d="M48,38 L72,38 L66,64 L74,90 L46,90 L54,64 Z" fill={trimHex} />}
          <rect x="32" y="96" width="56" height="6" fill={trimHex} />
        </svg>
      );
    case 'leggings':
      return (
        <svg viewBox="0 0 120 120" className="w-40 h-40" role="img" aria-label="Stylised leggings trim preview">
          {/* Base leggings silhouette */}
          <path
            d="M28,16 H92 V54 L88,104 H64 L60,56 L56,104 H32 L28,54 Z"
            fill={baseFill}
            stroke={baseStroke}
            strokeWidth="3"
          />
          {/* Waistband trim */}
          <rect x="28" y="18" width="64" height="8" fill={trimHex} />
          {/* Knee & shin trim */}
          {variant === 0 && (
            <>
              <rect x="32" y="54" width="22" height="7" fill={trimHex} />
              <rect x="66" y="54" width="22" height="7" fill={trimHex} />
              <rect x="33" y="92" width="22" height="7" fill={trimHex} />
              <rect x="65" y="92" width="22" height="7" fill={trimHex} />
            </>
          )}
          {variant === 1 && (
            <>
              <rect x="38" y="40" width="8" height="58" fill={trimHex} />
              <rect x="74" y="40" width="8" height="58" fill={trimHex} />
            </>
          )}
          {variant === 2 && (
            <>
              <polygon points="32,48 54,60 32,72" fill={trimHex} />
              <polygon points="88,48 66,60 88,72" fill={trimHex} />
            </>
          )}
          {variant === 3 && (
            <>
              <rect x="32" y="64" width="23" height="8" fill={trimHex} />
              <rect x="65" y="64" width="23" height="8" fill={trimHex} />
              <rect x="52" y="28" width="16" height="10" fill={trimHex} />
            </>
          )}
        </svg>
      );
    case 'boots':
      return (
        <svg viewBox="0 0 120 120" className="w-40 h-40" role="img" aria-label="Stylised boots trim preview">
          {/* Base left & right boot silhouettes */}
          <path
            d="M16,42 H48 V78 L54,84 V98 H12 V82 L16,76 Z"
            fill={baseFill}
            stroke={baseStroke}
            strokeWidth="3"
          />
          <path
            d="M72,42 H104 V76 L108,82 V98 H66 V84 L72,78 Z"
            fill={baseFill}
            stroke={baseStroke}
            strokeWidth="3"
          />
          {/* Cuff & toe trim */}
          <rect x="16" y="44" width="32" height="8" fill={trimHex} />
          <rect x="72" y="44" width="32" height="8" fill={trimHex} />
          {variant % 2 === 0 ? (
            <>
              <rect x="12" y="88" width="42" height="6" fill={trimHex} />
              <rect x="66" y="88" width="42" height="6" fill={trimHex} />
            </>
          ) : (
            <>
              <rect x="24" y="60" width="16" height="22" fill={trimHex} />
              <rect x="80" y="60" width="16" height="22" fill={trimHex} />
            </>
          )}
        </svg>
      );
  }
}

export default function MinecraftArmorTrimPreviewer() {
  const [pieceId, setPieceId] = useState<ArmorPieceId>('chestplate');
  const [patternId, setPatternId] = useState<string>('silence');
  const [materialId, setMaterialId] = useState<string>('amethyst');
  const [baseArmorId, setBaseArmorId] = useState<string>('netherite');

  const selectedPiece = ARMOR_PIECES.find((p) => p.id === pieceId) ?? ARMOR_PIECES[1];
  const selectedPattern =
    ARMOR_TRIM_PATTERNS.find((p) => p.id === patternId) ?? ARMOR_TRIM_PATTERNS[0];
  const selectedMaterial =
    ARMOR_TRIM_MATERIALS.find((m) => m.id === materialId) ?? ARMOR_TRIM_MATERIALS[0];
  const selectedBaseArmor =
    BASE_ARMOR_OPTIONS.find((b) => b.id === baseArmorId) ?? BASE_ARMOR_OPTIONS[0];

  const isSameMaterialPalette = selectedBaseArmor.matchingMaterialId === selectedMaterial.id;
  const fullSetCost = useMemo(() => calculateArmorTrimSetCost(4, 1), []);

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Top Metadata Line (Zero-Pill Clean Text) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-800 text-xs text-zinc-400">
          <span>
            Java 1.21.x · {ARMOR_TRIM_PATTERNS.length} Trim Patterns · {ARMOR_TRIM_MATERIALS.length} Trim Materials
          </span>
          <span className="font-mono tabular-nums text-emerald-400 font-semibold">
            {ARMOR_TRIM_PATTERNS.length} × {ARMOR_TRIM_MATERIALS.length} = {ARMOR_TRIM_COMBINATIONS_PER_PIECE} combinations per piece
          </span>
        </div>

        {/* Workspace Grid: Preview Left + Selectors Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Stylised Preview Panel */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Stylised Preview
              </h3>
              <span className="text-xs font-mono tabular-nums text-zinc-400">
                {selectedMaterial.hex}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-5 rounded-xl bg-[#101214] border border-zinc-800/80 space-y-3">
              {renderArmorTrimSilhouette(
                pieceId,
                selectedPattern.id,
                selectedBaseArmor.fill,
                selectedBaseArmor.stroke,
                selectedMaterial.hex
              )}

              <div className="text-center space-y-1 px-4">
                <div className="text-base font-bold text-white">
                  {selectedPattern.name} Trim · {selectedPiece.name}
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-zinc-300">
                  <span
                    className="w-3.5 h-3.5 rounded-sm border border-white/25 inline-block shrink-0"
                    style={{ backgroundColor: selectedMaterial.hex }}
                  />
                  <span>{selectedMaterial.name}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums text-zinc-400">{selectedMaterial.hex}</span>
                </div>
                {selectedPiece.id === 'helmet' && (
                  <p className="text-xs text-emerald-400">
                    Turtle Shell counts as a helmet for armor trims.
                  </p>
                )}
              </div>
            </div>

            {/* Required Disclaimer */}
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                This is a stylised preview, not a pixel-exact in-game texture render. In-game trims use a shaded palette (darker when the trim material matches the armour material).
              </span>
            </div>

            {isSameMaterialPalette && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200">
                Matching material selected ({selectedBaseArmor.name} armour + {selectedMaterial.name} trim): in-game, Minecraft applies a darker shaded palette so the trim stays visible against the same material.
              </div>
            )}
          </div>

          {/* Selectors Right */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Armour Piece */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-white">1. Armour Piece</h3>
                <span className="text-xs text-zinc-400">Turtle Shell counts as a helmet</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ARMOR_PIECES.map((piece) => {
                  const active = piece.id === pieceId;
                  return (
                    <button
                      key={piece.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setPieceId(piece.id)}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                        active
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white'
                      }`}
                    >
                      {piece.name}
                    </button>
                  );
                })}
              </div>

              {/* Base armour backdrop selector for preview */}
              <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-400 mr-1">Base Armour Shade:</span>
                {BASE_ARMOR_OPTIONS.filter(
                  (opt) => opt.id !== 'turtle' || pieceId === 'helmet'
                ).map((opt) => {
                  const active = opt.id === baseArmorId;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setBaseArmorId(opt.id)}
                      className={`px-2.5 py-1 rounded-md border text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                        active
                          ? 'bg-zinc-800 border-emerald-500/70 text-white font-semibold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-xs border border-white/20"
                        style={{ backgroundColor: opt.fill }}
                      />
                      {opt.id === 'turtle' ? 'Turtle Shell' : opt.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Trim Pattern (18) */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-white">2. Trim Pattern (18)</h3>
                <span className="text-xs font-mono text-emerald-400">{selectedPattern.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {ARMOR_TRIM_PATTERNS.map((pat) => {
                  const active = pat.id === patternId;
                  return (
                    <button
                      key={pat.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setPatternId(pat.id)}
                      className={`px-2.5 py-2 rounded-lg border text-xs font-semibold truncate transition-colors cursor-pointer ${
                        active
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white'
                      }`}
                    >
                      {pat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Trim Material (11) */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-white">3. Trim Material (11)</h3>
                <span className="text-xs font-mono tabular-nums text-cyan-300">
                  {selectedMaterial.name} · {selectedMaterial.hex}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {ARMOR_TRIM_MATERIALS.map((mat) => {
                  const active = mat.id === materialId;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setMaterialId(mat.id)}
                      className={`px-3 py-2 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 cursor-pointer ${
                        active
                          ? 'bg-emerald-500/15 border-emerald-500 text-white font-semibold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-sm border border-white/25 shrink-0"
                        style={{ backgroundColor: mat.hex }}
                      />
                      <span className="truncate">{mat.name}</span>
                      <span className="ml-auto text-[11px] font-mono tabular-nums text-zinc-400 shrink-0">
                        {mat.hex}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Pattern Rules: (a) How to Apply + (b) Duplication Recipe + Full Set Cost */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
          {/* (a) How to apply it */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Hammer className="w-4 h-4 text-emerald-400" />
              (a) How to Apply ({selectedPattern.name} Armor Trim)
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Use a <strong className="text-white">Smithing Table</strong>: place the{' '}
              <strong className="text-emerald-300">{selectedPattern.name} Smithing Template</strong> +{' '}
              <strong className="text-white">{selectedPiece.name}</strong> +{' '}
              <strong className="text-cyan-300">{selectedMaterial.name}</strong>.
            </p>
            <ul className="space-y-1 text-xs text-zinc-400">
              <li>• Template and trim material are consumed; <strong className="text-zinc-200">no XP cost</strong>.</li>
              <li>• Existing enchantments, durability, and custom name are kept.</li>
              <li>• Armor trims are <strong className="text-zinc-200">cosmetic only</strong> (no stat bonuses).</li>
            </ul>
          </div>

          {/* (b) Duplication recipe + Full Set Cost */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              (b) Duplication Recipe ({selectedPattern.name})
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Crafting Table: <strong className="text-cyan-300">7 Diamonds</strong> +{' '}
              <strong className="text-white">1 {selectedPattern.name} Template (top-middle)</strong> +{' '}
              <strong className="text-emerald-300">1 {selectedPattern.matchingBlock} (centre)</strong> →{' '}
              <strong className="text-white">2 Templates</strong>.
            </p>
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg px-3 py-2.5 text-xs text-zinc-200 space-y-1">
              <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Full Set Cost (4 Pieces)
              </div>
              <p className="tabular-nums">
                Starting from 1 template, a full 4-piece set needs {fullSetCost.duplicationCrafts} duplication crafts = {fullSetCost.diamondsNeeded} diamonds + {fullSetCost.matchingBlocksNeeded} matching blocks ({selectedPattern.matchingBlock}) (each craft is net +1 template).
              </p>
            </div>
          </div>
        </div>

        {/* Complete 18-Pattern Matching Block Reference */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-white">
              All 18 Armor Trim Patterns &amp; Duplication Matching Blocks
            </h3>
            <span className="text-xs text-zinc-400">Click any pattern to select it</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            {ARMOR_TRIM_PATTERNS.map((pat) => {
              const active = pat.id === patternId;
              return (
                <button
                  key={pat.id}
                  type="button"
                  onClick={() => setPatternId(pat.id)}
                  className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-emerald-500/15 border-emerald-500 text-white'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="font-bold truncate">{pat.name}</div>
                  <div className="text-[11px] text-zinc-400 truncate">{pat.matchingBlock}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
