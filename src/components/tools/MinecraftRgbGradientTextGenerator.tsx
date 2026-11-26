/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Palette,
  Plus,
  Trash2,
  ArrowLeftRight,
  Copy,
  Check,
  Bold,
  Italic,
  Info
} from 'lucide-react';
import { generateGradientOutputs, normalizeHex } from '../../data/minecraftBatch2Data';

interface GradientPreset {
  id: string;
  label: string;
  text: string;
  stops: string[];
  bold: boolean;
  italic: boolean;
}

const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: 'hello',
    label: 'HELLO (#FF0000 → #0000FF)',
    text: 'HELLO',
    stops: ['#FF0000', '#0000FF'],
    bold: false,
    italic: false
  },
  {
    id: 'gradient',
    label: 'GRADIENT (#FF5500 → #5500FF)',
    text: 'GRADIENT',
    stops: ['#FF5500', '#5500FF'],
    bold: false,
    italic: false
  },
  {
    id: 'emerald-sky',
    label: 'Emerald to Sky (3-Stop)',
    text: 'SURVIVAL REALM',
    stops: ['#55FF55', '#55FFFF', '#5555FF'],
    bold: true,
    italic: false
  },
  {
    id: 'rainbow',
    label: 'Spectrum (5-Stop)',
    text: 'MINECRAFT SMP',
    stops: ['#FF5555', '#FFAA00', '#55FF55', '#55FFFF', '#FF55FF'],
    bold: true,
    italic: false
  }
];

export default function MinecraftRgbGradientTextGenerator() {
  const [text, setText] = useState<string>('HELLO');
  const [stops, setStops] = useState<string[]>(['#FF0000', '#0000FF']);
  const [hexDrafts, setHexDrafts] = useState<Record<number, string>>({});
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const outputs = useMemo(
    () => generateGradientOutputs(text, stops, { bold, italic }),
    [text, stops, bold, italic]
  );

  const visibleCount = useMemo(() => Array.from(text).length, [text]);
  const coloredCount = useMemo(
    () => outputs.characters.filter((c) => !c.isSpace).length,
    [outputs.characters]
  );

  const handleStopColorChange = (index: number, rawColor: string) => {
    const normalized = normalizeHex(rawColor);
    setStops((prev) => prev.map((s, i) => (i === index ? normalized : s)));
    setHexDrafts((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const handleHexInputChange = (index: number, value: string) => {
    setHexDrafts((prev) => ({ ...prev, [index]: value }));
    const cleaned = value.trim().replace(/^#/, '');
    if (/^[0-9A-Fa-f]{6}$/.test(cleaned)) {
      setStops((prev) => prev.map((s, i) => (i === index ? `#${cleaned.toUpperCase()}` : s)));
    }
  };

  const handleHexInputBlur = (index: number) => {
    const draft = hexDrafts[index];
    if (draft !== undefined) {
      const normalized = normalizeHex(draft, stops[index]);
      setStops((prev) => prev.map((s, i) => (i === index ? normalized : s)));
      setHexDrafts((prev) => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
    }
  };

  const handleAddStop = () => {
    if (stops.length >= 5) return;
    const defaultExtras = ['#55FF55', '#FFAA00', '#FF55FF'];
    const nextColor = defaultExtras[(stops.length - 2) % defaultExtras.length];
    setStops((prev) => [...prev, nextColor]);
    setHexDrafts({});
  };

  const handleRemoveStop = (index: number) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, i) => i !== index));
    setHexDrafts({});
  };

  const handleReverseStops = () => {
    setStops((prev) => [...prev].reverse());
    setHexDrafts({});
  };

  const applyPreset = (preset: GradientPreset) => {
    setText(preset.text);
    setStops(preset.stops);
    setBold(preset.bold);
    setItalic(preset.italic);
    setHexDrafts({});
  };

  const handleCopy = (id: string, value: string) => {
    if (!value) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value);
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1500);
  };

  const renderCopyButton = (id: string, value: string, disabled = false) => {
    const isCopied = copiedId === id;
    return (
      <button
        type="button"
        disabled={disabled || !value}
        onClick={() => handleCopy(id, value)}
        className={`px-3 py-1.5 rounded-lg border text-xs font-bold shrink-0 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
          disabled || !value
            ? 'bg-zinc-900/50 border-zinc-800 text-zinc-600 cursor-not-allowed'
            : isCopied
              ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 cursor-pointer'
              : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-emerald-500/60 hover:text-white cursor-pointer'
        }`}
      >
        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {isCopied ? 'Copied' : 'Copy'}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Presets Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Palette className="w-4 h-4 text-emerald-400" />
            <span>Quick Presets</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {GRADIENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 text-xs font-medium text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Per-Character Coloured Preview */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-zinc-400">
              Live Per-Character Preview
            </span>
            <span className="text-xs font-mono tabular-nums text-zinc-400">
              {visibleCount} chars · {coloredCount} coloured · {stops.length} stops
            </span>
          </div>

          <div
            className="min-h-[64px] flex items-center justify-center rounded-lg bg-[#111214] border border-zinc-800/80 px-4 py-4 overflow-x-auto"
            aria-live="polite"
          >
            {outputs.characters.length === 0 ? (
              <span className="text-sm text-zinc-500">
                Type text below to preview your Minecraft RGB gradient
              </span>
            ) : (
              <span
                className={`font-mono text-2xl sm:text-3xl tracking-wide whitespace-pre ${
                  bold ? 'font-bold' : 'font-normal'
                } ${italic ? 'italic' : ''}`}
              >
                {outputs.characters.map((item) => (
                  <span
                    key={item.index}
                    style={item.hex ? { color: item.hex } : undefined}
                    title={item.hex ? `${item.char} → ${item.hex}` : 'Space (uncoloured)'}
                  >
                    {item.char}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>

        {/* Text Input & Formatting Toggles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          <div className="lg:col-span-8 space-y-2">
            <label htmlFor="mc-rgb-text-input" className="block text-xs font-semibold text-zinc-300">
              Text to Colour
            </label>
            <input
              id="mc-rgb-text-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter chat message, nickname, item name, or scoreboard title..."
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="lg:col-span-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBold((v) => !v)}
              aria-pressed={bold}
              className={`flex-1 px-3 py-2.5 rounded-xl border text-xs font-bold whitespace-nowrap shrink-0 transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                bold
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <Bold className="w-3.5 h-3.5" />
              Bold {bold ? 'On' : 'Off'}
            </button>
            <button
              type="button"
              onClick={() => setItalic((v) => !v)}
              aria-pressed={italic}
              className={`flex-1 px-3 py-2.5 rounded-xl border text-xs font-bold whitespace-nowrap shrink-0 transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                italic
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <Italic className="w-3.5 h-3.5" />
              Italic {italic ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Colour Stops (2-5) */}
        <div className="space-y-3 pt-2 border-t border-zinc-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-white">Colour Stops (2–5)</h3>
              <p className="text-xs text-zinc-400">
                Multi-stop gradients interpolate piecewise in RGB between consecutive stops.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReverseStops}
                className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 hover:border-zinc-500 text-xs font-semibold text-zinc-200 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                Reverse
              </button>
              <button
                type="button"
                onClick={handleAddStop}
                disabled={stops.length >= 5}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors ${
                  stops.length >= 5
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed'
                    : 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/25 cursor-pointer'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                Add Stop ({stops.length}/5)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {stops.map((stopHex, index) => {
              const displayHex = hexDrafts[index] !== undefined ? hexDrafts[index] : stopHex;
              return (
                <div
                  key={index}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-400 tabular-nums">
                      Stop {index + 1}
                    </span>
                    {stops.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStop(index)}
                        aria-label={`Remove colour stop ${index + 1}`}
                        className="text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      aria-label={`Colour picker for stop ${index + 1}`}
                      value={stopHex}
                      onChange={(e) => handleStopColorChange(index, e.target.value)}
                      className="w-9 h-9 rounded-lg border border-zinc-700 bg-transparent cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      aria-label={`Hex value for stop ${index + 1}`}
                      value={displayHex}
                      onChange={(e) => handleHexInputChange(index, e.target.value)}
                      onBlur={() => handleHexInputBlur(index)}
                      maxLength={7}
                      className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono tabular-nums text-white uppercase focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Outputs */}
        <div className="space-y-3 pt-2 border-t border-zinc-800">
          <h3 className="text-sm font-bold text-white">Copyable Minecraft Gradient Formats</h3>

          {/* (a) &#RRGGBB per character */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-emerald-400">
                (a) &amp;#RRGGBB Per Character (Spigot / Essentials / Chat Plugins)
              </span>
              {renderCopyButton('amp-hex', outputs.ampersandHex)}
            </div>
            <pre className="text-xs font-mono text-zinc-200 bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all select-all">
              {outputs.ampersandHex || '—'}
            </pre>
          </div>

          {/* (b) §x per character */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-cyan-400">
                (b) §x Per Character (§x§R§R§G§G§B§B Legacy Hex Sequence)
              </span>
              {renderCopyButton('section-x', outputs.sectionX)}
            </div>
            <pre className="text-xs font-mono text-zinc-200 bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all select-all">
              {outputs.sectionX || '—'}
            </pre>
          </div>

          {/* (c) MiniMessage per-character <#RRGGBB> */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-violet-400">
                (c1) MiniMessage Per-Character (&lt;#RRGGBB&gt;)
              </span>
              {renderCopyButton('minimessage-char', outputs.miniMessagePerChar)}
            </div>
            <pre className="text-xs font-mono text-zinc-200 bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all select-all">
              {outputs.miniMessagePerChar || '—'}
            </pre>
          </div>

          {/* (c2) MiniMessage single <gradient:#START:#END> (2-stop only) */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-violet-400">
                (c2) MiniMessage &lt;gradient:#START:#END&gt; Tag (2-Stop Only)
              </span>
              {renderCopyButton('minimessage-grad', outputs.miniMessageGradient ?? '', !outputs.miniMessageGradient)}
            </div>
            {outputs.miniMessageGradient ? (
              <pre className="text-xs font-mono text-zinc-200 bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all select-all">
                {outputs.miniMessageGradient}
              </pre>
            ) : (
              <p className="text-xs text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                Single &lt;gradient:#START:#END&gt; output is available for 2-stop gradients (currently {stops.length} stops). Use the per-character &lt;#RRGGBB&gt; MiniMessage output above for 3–5 stops.
              </p>
            )}
          </div>

          {/* (d) JSON chat-component array */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-amber-400">
                (d) JSON Chat-Component Array (/tellraw, /title, Lore)
              </span>
              {renderCopyButton('json-array', outputs.jsonChatArray)}
            </div>
            <pre className="text-xs font-mono text-zinc-200 bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all select-all">
              {outputs.jsonChatArray}
            </pre>
          </div>
        </div>

        {/* Per-character breakdown */}
        {outputs.characters.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-300">Per-Character Colour Breakdown</h3>
              <span className="text-xs text-zinc-500">Spaces count for position, no colour code emitted</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {outputs.characters.slice(0, 48).map((item) => (
                <div
                  key={item.index}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 flex items-center gap-1.5 text-xs font-mono tabular-nums"
                >
                  <span
                    className={`font-bold ${bold ? 'font-extrabold' : ''} ${italic ? 'italic' : ''}`}
                    style={item.hex ? { color: item.hex } : { color: '#71717A' }}
                  >
                    {item.isSpace ? '␠' : item.char}
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    {item.hex ?? 'space'}
                  </span>
                </div>
              ))}
              {outputs.characters.length > 48 && (
                <span className="text-xs text-zinc-500 self-center px-2">
                  +{outputs.characters.length - 48} more characters
                </span>
              )}
            </div>
          </div>
        )}

        {/* Mechanics Note */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-start gap-2.5 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            For each character i of n characters, interpolation uses t = i / (n − 1) (with t = 0 when n = 1) and rounds each RGB channel independently. Spaces advance the position index i so the gradient flows smoothly across words without emitting colour codes on whitespace.
          </span>
        </div>
      </div>
    </div>
  );
}
