/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Terminal,
  Copy,
  Check,
  AlertTriangle,
  Plus,
  Trash2,
  Info
} from 'lucide-react';
import {
  MINECRAFT_LEGACY_COLORS,
  MINECRAFT_FORMAT_CODES,
  MotdLineConfig,
  LegacyFormatCode,
  generateMotdOutputs,
  buildMotdPreviewChars,
  normalizeHex
} from '../../data/minecraftBatch2Data';

type MotdFormatKey = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'obfuscated';

const CODE_TO_KEY: Record<LegacyFormatCode, MotdFormatKey> = {
  l: 'bold',
  o: 'italic',
  n: 'underline',
  m: 'strikethrough',
  k: 'obfuscated'
};

const OBFUSCATED_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&';

interface MotdPreset {
  id: string;
  label: string;
  line1: MotdLineConfig;
  line2: MotdLineConfig;
}

const DEFAULT_LINE_1: MotdLineConfig = {
  text: 'My Server',
  useGradient: false,
  colorCode: 'a',
  gradientStops: ['#55FF55', '#55FFFF'],
  formats: {
    bold: true,
    italic: false,
    underline: false,
    strikethrough: false,
    obfuscated: false
  }
};

const DEFAULT_LINE_2: MotdLineConfig = {
  text: 'Season 2',
  useGradient: false,
  colorCode: 'e',
  gradientStops: ['#FFFF55', '#FFAA00'],
  formats: {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    obfuscated: false
  }
};

const MOTD_PRESETS: MotdPreset[] = [
  {
    id: 'classic',
    label: 'My Server (Green Bold + Yellow)',
    line1: DEFAULT_LINE_1,
    line2: DEFAULT_LINE_2
  },
  {
    id: 'gradient-smp',
    label: 'Hex Gradient SMP',
    line1: {
      text: 'EMERALD REALMS SMP',
      useGradient: true,
      colorCode: 'a',
      gradientStops: ['#55FF55', '#55FFFF', '#5555FF'],
      formats: { bold: true, italic: false, underline: false, strikethrough: false, obfuscated: false }
    },
    line2: {
      text: '1.21 Survival · No Grief · Join Now',
      useGradient: false,
      colorCode: '7',
      gradientStops: ['#AAAAAA', '#FFFFFF'],
      formats: { bold: false, italic: false, underline: false, strikethrough: false, obfuscated: false }
    }
  },
  {
    id: 'maintenance',
    label: 'Maintenance Notice',
    line1: {
      text: 'Server Maintenance in Progress',
      useGradient: false,
      colorCode: 'c',
      gradientStops: ['#FF5555', '#FFAA00'],
      formats: { bold: true, italic: false, underline: false, strikethrough: false, obfuscated: false }
    },
    line2: {
      text: 'Whitelisted — Back Online Soon',
      useGradient: false,
      colorCode: '6',
      gradientStops: ['#FFAA00', '#FFFF55'],
      formats: { bold: false, italic: true, underline: false, strikethrough: false, obfuscated: false }
    }
  }
];

export default function MinecraftMotdGenerator() {
  const [line1, setLine1] = useState<MotdLineConfig>(DEFAULT_LINE_1);
  const [line2, setLine2] = useState<MotdLineConfig>(DEFAULT_LINE_2);
  const [activeLineTab, setActiveLineTab] = useState<1 | 2>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [obfuscateTick, setObfuscateTick] = useState<number>(0);

  const outputs = useMemo(() => generateMotdOutputs(line1, line2), [line1, line2]);
  const previewLine1 = useMemo(() => buildMotdPreviewChars(line1), [line1]);
  const previewLine2 = useMemo(() => buildMotdPreviewChars(line2), [line2]);

  const hasObfuscated = line1.formats.obfuscated || line2.formats.obfuscated;

  useEffect(() => {
    if (!hasObfuscated) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setObfuscateTick((t) => (t + 1) % 10000);
    }, 90);
    return () => window.clearInterval(timer);
  }, [hasObfuscated]);

  const updateLine = (lineNum: 1 | 2, updater: (prev: MotdLineConfig) => MotdLineConfig) => {
    if (lineNum === 1) {
      setLine1(updater);
    } else {
      setLine2(updater);
    }
  };

  const handleCopy = (id: string, value: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value);
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1500);
  };

  const renderPreviewLine = (chars: ReturnType<typeof buildMotdPreviewChars>, lineIdx: number) => {
    if (chars.length === 0) {
      return <span className="text-zinc-600 italic">Empty line</span>;
    }
    return chars.map((item, idx) => {
      const displayChar =
        item.obfuscated && item.char !== ' '
          ? OBFUSCATED_GLYPHS[(obfuscateTick * 7 + idx * 13 + lineIdx * 29) % OBFUSCATED_GLYPHS.length]
          : item.char;

      const decoParts: string[] = [];
      if (item.underline) decoParts.push('underline');
      if (item.strikethrough) decoParts.push('line-through');

      return (
        <span
          key={idx}
          style={{
            color: item.color,
            textDecorationLine: decoParts.length > 0 ? decoParts.join(' ') : undefined
          }}
          className={`${item.bold ? 'font-bold' : 'font-normal'} ${item.italic ? 'italic' : ''}`}
        >
          {displayChar}
        </span>
      );
    });
  };

  const renderCopyButton = (id: string, value: string) => {
    const isCopied = copiedId === id;
    return (
      <button
        type="button"
        onClick={() => handleCopy(id, value)}
        className={`px-3 py-1.5 rounded-lg border text-xs font-bold shrink-0 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
          isCopied
            ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
            : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-emerald-500/60 hover:text-white'
        }`}
      >
        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {isCopied ? 'Copied' : 'Copy'}
      </button>
    );
  };

  const renderLineEditor = (lineNum: 1 | 2, config: MotdLineConfig, visibleCount: number) => {
    const overRecommended = visibleCount > 59;
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor={`motd-line-${lineNum}`} className="text-sm font-bold text-white">
            Line {lineNum} Text
          </label>
          <span
            className={`text-xs font-mono tabular-nums ${
              overRecommended ? 'text-amber-400 font-semibold' : 'text-zinc-400'
            }`}
          >
            {visibleCount} visible characters
          </span>
        </div>

        <input
          id={`motd-line-${lineNum}`}
          type="text"
          value={config.text}
          onChange={(e) =>
            updateLine(lineNum, (prev) => ({ ...prev, text: e.target.value }))
          }
          placeholder={`Enter MOTD Line ${lineNum} text...`}
          className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-emerald-500"
        />

        {overRecommended && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Line {lineNum} has {visibleCount} visible characters. Lines past 59 visible characters may wrap or clip depending on the player&apos;s GUI scale and server list width.
            </span>
          </div>
        )}

        {/* Colour Mode Switch */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <span className="text-xs font-semibold text-zinc-300">Line {lineNum} Colour Mode</span>
          <div className="inline-flex rounded-lg bg-zinc-900 p-1 border border-zinc-800">
            <button
              type="button"
              onClick={() =>
                updateLine(lineNum, (prev) => ({ ...prev, useGradient: false }))
              }
              className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                !config.useGradient
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              16 Legacy Colours
            </button>
            <button
              type="button"
              onClick={() =>
                updateLine(lineNum, (prev) => ({ ...prev, useGradient: true }))
              }
              className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                config.useGradient
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Hex Gradient (§x)
            </button>
          </div>
        </div>

        {!config.useGradient ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {MINECRAFT_LEGACY_COLORS.map((color) => {
              const selected = config.colorCode === color.code;
              return (
                <button
                  key={color.code}
                  type="button"
                  onClick={() =>
                    updateLine(lineNum, (prev) => ({ ...prev, colorCode: color.code }))
                  }
                  aria-pressed={selected}
                  className={`px-2.5 py-2 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 cursor-pointer ${
                    selected
                      ? 'bg-emerald-500/15 border-emerald-500 text-white font-semibold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-sm border border-white/20 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="truncate">{color.name}</span>
                  <span className="ml-auto text-[11px] font-mono text-zinc-400 shrink-0">
                    §{color.code}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2.5 bg-zinc-900/70 border border-zinc-800 rounded-xl p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-zinc-300">
                Line {lineNum} Gradient Stops ({config.gradientStops.length}/5)
              </span>
              <button
                type="button"
                disabled={config.gradientStops.length >= 5}
                onClick={() =>
                  updateLine(lineNum, (prev) => {
                    if (prev.gradientStops.length >= 5) return prev;
                    const extras = ['#5555FF', '#FF55FF', '#FFAA00'];
                    const nextHex = extras[(prev.gradientStops.length - 2) % extras.length];
                    return { ...prev, gradientStops: [...prev.gradientStops, nextHex] };
                  })
                }
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold whitespace-nowrap flex items-center gap-1 ${
                  config.gradientStops.length >= 5
                    ? 'border-zinc-800 text-zinc-600 cursor-not-allowed'
                    : 'border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/15 cursor-pointer'
                }`}
              >
                <Plus className="w-3 h-3" />
                Add Stop
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {config.gradientStops.map((stopHex, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5"
                >
                  <input
                    type="color"
                    aria-label={`Line ${lineNum} gradient stop ${idx + 1}`}
                    value={stopHex}
                    onChange={(e) => {
                      const val = normalizeHex(e.target.value);
                      updateLine(lineNum, (prev) => ({
                        ...prev,
                        gradientStops: prev.gradientStops.map((s, sIdx) => (sIdx === idx ? val : s))
                      }));
                    }}
                    className="w-7 h-7 rounded border border-zinc-700 bg-transparent cursor-pointer shrink-0"
                  />
                  <span className="text-xs font-mono tabular-nums text-zinc-200">{stopHex}</span>
                  {config.gradientStops.length > 2 && (
                    <button
                      type="button"
                      aria-label={`Remove line ${lineNum} gradient stop ${idx + 1}`}
                      onClick={() =>
                        updateLine(lineNum, (prev) => ({
                          ...prev,
                          gradientStops: prev.gradientStops.filter((_, sIdx) => sIdx !== idx)
                        }))
                      }
                      className="ml-auto text-zinc-500 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formatting Toggles */}
        <div className="space-y-2 pt-1">
          <span className="block text-xs font-semibold text-zinc-300">
            Formatting (emitted after colour code)
          </span>
          <div className="flex flex-wrap gap-2">
            {MINECRAFT_FORMAT_CODES.map((fmt) => {
              const key = CODE_TO_KEY[fmt.code];
              const active = config.formats[key];
              return (
                <button
                  key={fmt.code}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    updateLine(lineNum, (prev) => ({
                      ...prev,
                      formats: { ...prev.formats, [key]: !prev.formats[key] }
                    }))
                  }
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <span>{fmt.name}</span>
                  <span className="font-mono text-[11px] opacity-80">§{fmt.code}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Presets Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Quick Presets</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {MOTD_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setLine1(preset.line1);
                  setLine2(preset.line2);
                }}
                className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 text-xs font-medium text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Minecraft Server-List Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">
              Live Minecraft Multiplayer Server-List Preview
            </span>
            <span className="text-xs font-mono tabular-nums text-zinc-400">
              L1: {outputs.line1VisibleCount} · L2: {outputs.line2VisibleCount} visible chars
            </span>
          </div>

          <div className="rounded-xl bg-[#101010] border border-zinc-800 p-4 sm:p-5">
            <div className="flex items-start gap-3.5 max-w-2xl">
              {/* Server Icon Tile (64x64 geometric grass-block style) */}
              <div
                aria-hidden="true"
                className="w-16 h-16 shrink-0 rounded-md overflow-hidden border border-zinc-700 bg-[#5C3D24] flex flex-col"
              >
                <div className="h-4 bg-[#4E9F3D] border-b-2 border-[#3C7A2E]" />
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-sm bg-[#62D26F]/25 border border-[#62D26F]/50" />
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm font-semibold text-white truncate">
                    Minecraft Server
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-xs tabular-nums text-zinc-400">20/100</span>
                    <div className="flex items-end gap-0.5 h-3.5" aria-hidden="true">
                      <span className="w-1 h-1.5 bg-emerald-400 rounded-xs" />
                      <span className="w-1 h-2 bg-emerald-400 rounded-xs" />
                      <span className="w-1 h-2.5 bg-emerald-400 rounded-xs" />
                      <span className="w-1 h-3 bg-emerald-400 rounded-xs" />
                      <span className="w-1 h-3.5 bg-emerald-400 rounded-xs" />
                    </div>
                  </div>
                </div>

                <div className="font-mono text-sm sm:text-[15px] leading-snug whitespace-pre-wrap break-words">
                  <div>{renderPreviewLine(previewLine1, 1)}</div>
                  <div>{renderPreviewLine(previewLine2, 2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Line Selector Tabs */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveLineTab(1)}
            className={`px-4 py-2 rounded-xl border text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              activeLineTab === 1
                ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
            }`}
          >
            Edit Line 1 ({outputs.line1VisibleCount} chars)
          </button>
          <button
            type="button"
            onClick={() => setActiveLineTab(2)}
            className={`px-4 py-2 rounded-xl border text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              activeLineTab === 2
                ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
            }`}
          >
            Edit Line 2 ({outputs.line2VisibleCount} chars)
          </button>
        </div>

        {activeLineTab === 1
          ? renderLineEditor(1, line1, outputs.line1VisibleCount)
          : renderLineEditor(2, line2, outputs.line2VisibleCount)}

        {/* Copyable Outputs */}
        <div className="space-y-3 pt-2 border-t border-zinc-800">
          <h3 className="text-sm font-bold text-white">Copyable MOTD Outputs</h3>

          {/* (a) server.properties */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-emerald-400">
                (a) server.properties (every § escaped as \u00A7)
              </span>
              {renderCopyButton('server-properties', outputs.serverProperties)}
            </div>
            <pre className="text-xs font-mono text-zinc-200 bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all select-all">
              {outputs.serverProperties}
            </pre>
          </div>

          {/* (b) § form */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-cyan-400">
                (b) § Section-Sign Format
              </span>
              {renderCopyButton('section-form', outputs.sectionForm)}
            </div>
            <pre className="text-xs font-mono text-zinc-200 bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all select-all">
              {outputs.sectionForm || '—'}
            </pre>
          </div>

          {/* (c) Plugin & form */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-violet-400">
                (c) Plugin &amp; Format (Spigot / Paper / BungeeCord / Velocity configs)
              </span>
              {renderCopyButton('plugin-amp', outputs.pluginAmpForm)}
            </div>
            <pre className="text-xs font-mono text-zinc-200 bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all select-all">
              {outputs.pluginAmpForm || '—'}
            </pre>
          </div>
        </div>

        {/* Colour & Format Order Rule */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-start gap-2.5 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            Minecraft colour codes reset active formatting, so every colour code (§a or §x§R§R§G§G§B§B) is emitted before format codes (§l, §o, §n, §m, §k), and Line 1 and Line 2 are joined with a literal \n.
          </span>
        </div>
      </div>
    </div>
  );
}
