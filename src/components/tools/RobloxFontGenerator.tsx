/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Type, Copy, Check, Info } from 'lucide-react';

export interface FontStyleDef {
  id: string;
  name: string;
  sample: string;
  mapChar: (ch: string) => string;
}

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';

function buildTableMapper(upperOut: string[], lowerOut: string[], digitOut?: string[]) {
  const map = new Map<string, string>();
  for (let i = 0; i < UPPER.length; i++) {
    if (upperOut[i]) map.set(UPPER[i], upperOut[i]);
  }
  for (let i = 0; i < LOWER.length; i++) {
    if (lowerOut[i]) map.set(LOWER[i], lowerOut[i]);
  }
  if (digitOut) {
    for (let i = 0; i < DIGITS.length; i++) {
      if (digitOut[i]) map.set(DIGITS[i], digitOut[i]);
    }
  }
  return (ch: string) => map.get(ch) ?? ch;
}

function rangeChars(startCode: number, count: number): string[] {
  return Array.from({ length: count }, (_, i) => String.fromCodePoint(startCode + i));
}

const BOLD_MAP = buildTableMapper(
  rangeChars(0x1d400, 26),
  rangeChars(0x1d41a, 26),
  rangeChars(0x1d7ce, 10)
);

const BOLD_SANS_MAP = buildTableMapper(
  rangeChars(0x1d5d4, 26),
  rangeChars(0x1d5ee, 26),
  rangeChars(0x1d7ec, 10)
);

const ITALIC_LOWER = rangeChars(0x1d44e, 26);
ITALIC_LOWER[7] = '\u210e'; // mathematical italic h
const ITALIC_MAP = buildTableMapper(rangeChars(0x1d434, 26), ITALIC_LOWER);

const BOLD_ITALIC_MAP = buildTableMapper(
  rangeChars(0x1d468, 26),
  rangeChars(0x1d482, 26)
);

const SCRIPT_UPPER = rangeChars(0x1d49c, 26);
// Standard Unicode Script uppercase codepoint exceptions in Letterlike Symbols
SCRIPT_UPPER[1] = '\u212c'; // B
SCRIPT_UPPER[4] = '\u2130'; // E
SCRIPT_UPPER[5] = '\u2131'; // F
SCRIPT_UPPER[7] = '\u210b'; // H
SCRIPT_UPPER[8] = '\u2110'; // I
SCRIPT_UPPER[11] = '\u2112'; // L
SCRIPT_UPPER[12] = '\u2133'; // M
SCRIPT_UPPER[17] = '\u211b'; // R

const SCRIPT_LOWER = rangeChars(0x1d4b6, 26);
SCRIPT_LOWER[4] = '\u212f'; // e
SCRIPT_LOWER[6] = '\u210a'; // g
SCRIPT_LOWER[14] = '\u2134'; // o

const SCRIPT_MAP = buildTableMapper(SCRIPT_UPPER, SCRIPT_LOWER);

const FRAKTUR_UPPER = rangeChars(0x1d504, 26);
FRAKTUR_UPPER[2] = '\u212d'; // C
FRAKTUR_UPPER[7] = '\u210c'; // H
FRAKTUR_UPPER[8] = '\u2111'; // I
FRAKTUR_UPPER[17] = '\u211c'; // R
FRAKTUR_UPPER[25] = '\u2128'; // Z

const FRAKTUR_MAP = buildTableMapper(FRAKTUR_UPPER, rangeChars(0x1d51e, 26));

const DOUBLE_UPPER = rangeChars(0x1d538, 26);
DOUBLE_UPPER[2] = '\u2102'; // C
DOUBLE_UPPER[7] = '\u210d'; // H
DOUBLE_UPPER[13] = '\u2115'; // N
DOUBLE_UPPER[15] = '\u2119'; // P
DOUBLE_UPPER[16] = '\u211a'; // Q
DOUBLE_UPPER[17] = '\u211d'; // R
DOUBLE_UPPER[25] = '\u2124'; // Z

const DOUBLE_STRUCK_MAP = buildTableMapper(
  DOUBLE_UPPER,
  rangeChars(0x1d552, 26),
  rangeChars(0x1d7d8, 10)
);

const MONO_MAP = buildTableMapper(
  rangeChars(0x1d670, 26),
  rangeChars(0x1d68a, 26),
  rangeChars(0x1d7f6, 10)
);

const BUBBLE_DIGITS = ['\u24ea', ...rangeChars(0x2460, 9)]; // ⓪ ①..⑨
const BUBBLE_MAP = buildTableMapper(
  rangeChars(0x24b6, 26),
  rangeChars(0x24d0, 26),
  BUBBLE_DIGITS
);

const SMALL_CAPS_LOWER = Array.from('ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ');
const SMALL_CAPS_MAP = buildTableMapper(Array.from(UPPER), SMALL_CAPS_LOWER);

const SQUARED_LETTERS = rangeChars(0x1f130, 26);
const SQUARED_MAP = buildTableMapper(SQUARED_LETTERS, SQUARED_LETTERS);

export const UNICODE_FONT_STYLES: FontStyleDef[] = [
  { id: 'bold', name: 'Bold', sample: '𝐑𝐨𝐛𝐥𝐨𝐱 𝟐𝟎𝟐𝟔', mapChar: BOLD_MAP },
  { id: 'italic', name: 'Italic', sample: '𝑅𝑜𝑏𝑙𝑜𝑥 2026', mapChar: ITALIC_MAP },
  { id: 'bold-italic', name: 'Bold Italic', sample: '𝑹𝒐𝒃𝒍𝒐𝒙 2026', mapChar: BOLD_ITALIC_MAP },
  { id: 'script', name: 'Script / Cursive', sample: 'ℛ𝑜𝒷𝓁𝑜𝓍 2026', mapChar: SCRIPT_MAP },
  { id: 'gothic', name: 'Gothic / Fraktur', sample: 'ℜ𝔬𝔟𝔩𝔬𝔵 2026', mapChar: FRAKTUR_MAP },
  { id: 'double-struck', name: 'Double-Struck', sample: 'ℝ𝕠𝕓𝕝𝕠𝕩 𝟚𝟘𝟚𝟞', mapChar: DOUBLE_STRUCK_MAP },
  { id: 'monospace', name: 'Monospace', sample: '𝚁𝚘𝚋𝚕𝚘𝚡 𝟸𝟶𝟸𝟼', mapChar: MONO_MAP },
  { id: 'bubble', name: 'Bubble / Circled', sample: 'Ⓡⓞⓑⓛⓞⓧ ②⓪②⑥', mapChar: BUBBLE_MAP },
  { id: 'small-caps', name: 'Small Caps', sample: 'Rᴏʙʟᴏx 2026', mapChar: SMALL_CAPS_MAP },
  { id: 'squared', name: 'Squared', sample: '🅁🄾🄱🄻🄾🅇 2026', mapChar: SQUARED_MAP },
  { id: 'bold-sans', name: 'Bold Sans', sample: '𝗥𝗼𝗯𝗹𝗼𝘅 𝟮𝟬𝟮𝟲', mapChar: BOLD_SANS_MAP }
];

export function convertToUnicodeFont(text: string, styleId: string): string {
  const style = UNICODE_FONT_STYLES.find((s) => s.id === styleId);
  if (!style) return text;
  return Array.from(text).map(style.mapChar).join('');
}

export default function RobloxFontGenerator() {
  const [inputText, setInputText] = useState<string>('Roblox Display 2026');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const styledOutputs = useMemo(() => {
    const source = inputText || 'Roblox Display 2026';
    return UNICODE_FONT_STYLES.map((style) => ({
      ...style,
      output: Array.from(source).map(style.mapChar).join('')
    }));
  }, [inputText]);

  const handleCopy = (id: string, value: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value);
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Input Box */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="rbx-font-input" className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
              <Type className="w-4 h-4" />
              Enter Your Roblox Display Name or Bio Text
            </label>
            <span className="text-[11px] font-mono text-zinc-400">
              {Array.from(inputText).length} chars · {UNICODE_FONT_STYLES.length} styles
            </span>
          </div>
          <input
            id="rbx-font-input"
            type="text"
            placeholder="Type display name or profile bio text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Output List */}
        <div className="grid grid-cols-1 gap-2.5">
          {styledOutputs.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 space-y-0.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                    {item.name}
                  </span>
                  <p className="text-base sm:text-lg text-white break-all">{item.output}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(item.id, item.output)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold shrink-0 cursor-pointer transition-colors flex items-center gap-1.5 ${
                    isCopied
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-violet-500/60 hover:text-white'
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {isCopied ? 'Copied' : 'Copy'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Important Display Name vs Username Note */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-start gap-2.5 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
          <span>
            These styled fonts are for display names and bios; regular usernames only allow letters, numbers and one underscore.
          </span>
        </div>
      </div>
    </div>
  );
}
