/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check, Info } from 'lucide-react';

export type UsernameStyle =
  | 'Aesthetic'
  | 'Cool'
  | 'OG/Short'
  | 'Funny'
  | 'Dark'
  | 'Cute'
  | 'Pro/Gamer';

export const USERNAME_STYLES: UsernameStyle[] = [
  'Aesthetic',
  'Cool',
  'OG/Short',
  'Funny',
  'Dark',
  'Cute',
  'Pro/Gamer'
];

const WORD_BANKS: Record<UsernameStyle, { prefixes: string[]; roots: string[]; suffixes: string[] }> = {
  Aesthetic: {
    prefixes: ['velvet', 'lunar', 'solis', 'soft', 'mist', 'pastel', 'serene', 'ivy', 'clover', 'aura', 'satin', 'pearl'],
    roots: ['bloom', 'cloud', 'dream', 'sky', 'moon', 'petals', 'star', 'glow', 'fern', 'honey', 'halo', 'rain'],
    suffixes: ['ia', 'ly', 'xo', 'ry', 'core', 'leaf', 'ray', 'eve', 'skies', 'dew', 'muse', '07']
  },
  Cool: {
    prefixes: ['nova', 'apex', 'frost', 'hyper', 'zen', 'pulse', 'drift', 'vortex', 'kairo', 'aero', 'prime', 'volt'],
    roots: ['blaze', 'storm', 'strike', 'rush', 'crest', 'edge', 'wave', 'forge', 'spark', 'flash', 'shift', 'peak'],
    suffixes: ['x', '77', '99', 'zone', 'flow', 'hq', 'v2', 'arc', 'zero', 'zen', 'rex', 'lux']
  },
  'OG/Short': {
    prefixes: ['ka', 'zy', 'vo', 'xe', 'ri', 'ty', 'ny', 'lo', 'q', 'az', 'ki', 'vy'],
    roots: ['rix', 'zen', 'vex', 'kox', 'lux', 'syn', 'pax', 'nyx', 'jor', 'dak', 'taz', 'riv'],
    suffixes: ['o', 'x', 'z', 'a', '1', '7', '9', 'io', 'ux', 'ex', 'er', 'on']
  },
  Funny: {
    prefixes: ['soggy', 'chunky', 'sneaky', 'bouncing', 'toasty', 'grumpy', 'wobbly', 'derpy', 'sleepy', 'tiny', 'crispy', 'dizzy'],
    roots: ['noodle', 'waffle', 'potato', 'taco', 'pickle', 'goose', 'banana', 'frog', 'goblin', 'muffin', 'beans', 'toast'],
    suffixes: ['boi', 'plz', 'man', 'bro', 'lol', 'boss', 'chef', 'king', '404', '64', 'club', 'jr']
  },
  Dark: {
    prefixes: ['void', 'grim', 'obsidian', 'shade', 'raven', 'noct', 'crimson', 'ash', 'onyx', 'hex', 'dread', 'umbra'],
    roots: ['reaper', 'fang', 'hollow', 'thorn', 'shadow', 'curse', 'eclipse', 'cinder', 'wraith', 'crypt', 'gloom', 'bane'],
    suffixes: ['ix', '66', 'soul', 'veil', 'nox', 'vile', 'fall', 'born', 'grave', 'x9', 'abyss', 'grim']
  },
  Cute: {
    prefixes: ['berry', 'mochi', 'peachy', 'daisy', 'boba', 'cherry', 'bunny', 'sugar', 'cozy', 'sunny', 'lilac', 'puff'],
    roots: ['muffin', 'kitten', 'bear', 'panda', 'latte', 'cookie', 'sprout', 'cupcake', 'bee', 'star', 'blossom', 'pebble'],
    suffixes: ['pie', 'uwu', 'bun', 'pop', 'jam', 'tea', 'cake', 'chu', 'luv', 'mini', '22', 'joy']
  },
  'Pro/Gamer': {
    prefixes: ['clutch', 'meta', 'turbo', 'pro', 'ranked', 'snipe', 'crit', 'blitz', 'ace', 'combo', 'titan', 'fps'],
    roots: ['striker', 'clutch', 'phantom', 'raider', 'carry', 'sniper', 'valor', 'grind', 'legend', 'quest', 'slayer', 'tactic'],
    suffixes: ['gg', 'yt', 'tv', 'pro', '999', '4k', 'op', 'ez', 'mvp', '01', '777', 'win']
  }
};

const ALPHANUM_FILL = 'abcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Validates exact Roblox username rules:
 * - 3 to 20 characters
 * - Letters and numbers only, plus at most one underscore
 * - Underscore never at the first or last position
 */
export function isValidRobloxUsername(name: string): boolean {
  if (name.length < 3 || name.length > 20) return false;
  if (!/^[A-Za-z0-9_]+$/.test(name)) return false;
  const underscores = (name.match(/_/g) || []).length;
  if (underscores > 1) return false;
  if (name.startsWith('_') || name.endsWith('_')) return false;
  return true;
}

function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sanitizeKeyword(raw: string): string {
  return raw.replace(/[^A-Za-z0-9]/g, '');
}

function fitUsernameToLength(
  left: string,
  right: string,
  targetLength: number,
  allowUnderscore: boolean,
  seed: number
): string {
  const clampedTarget = Math.max(3, Math.min(20, Math.floor(targetLength)));
  const useUnderscore = allowUnderscore && clampedTarget >= 3 && left.length >= 1 && right.length >= 1;

  let candidate = '';
  if (useUnderscore) {
    const maxBody = clampedTarget - 1;
    const minLeft = 1;
    const minRight = 1;
    let l = left.slice(0, Math.max(minLeft, Math.min(left.length, maxBody - minRight)));
    let r = right.slice(0, Math.max(minRight, maxBody - l.length));
    candidate = `${l}_${r}`;
    while (candidate.length < clampedTarget) {
      const ch = ALPHANUM_FILL[(seed + candidate.length * 7) % ALPHANUM_FILL.length];
      candidate = `${candidate}${ch}`;
    }
    if (candidate.length > clampedTarget) {
      candidate = candidate.slice(0, clampedTarget);
      if (candidate.endsWith('_')) {
        candidate = candidate.slice(0, -1) + ALPHANUM_FILL[seed % ALPHANUM_FILL.length];
      }
    }
  } else {
    candidate = `${left}${right}`.slice(0, clampedTarget);
    while (candidate.length < clampedTarget) {
      const ch = ALPHANUM_FILL[(seed + candidate.length * 11) % ALPHANUM_FILL.length];
      candidate = `${candidate}${ch}`;
    }
  }

  return candidate;
}

export function generateRobloxUsernames(
  style: UsernameStyle,
  keywordRaw: string,
  maxLength: number,
  allowUnderscore: boolean,
  count = 20,
  batchSeed = Date.now()
): string[] {
  const bank = WORD_BANKS[style] || WORD_BANKS.Cool;
  const keyword = sanitizeKeyword(keywordRaw);
  const targetLen = Math.max(3, Math.min(20, Math.floor(maxLength)));
  const results: string[] = [];
  const seen = new Set<string>();

  let attempt = 0;
  while (results.length < count && attempt < count * 40) {
    attempt++;
    const i = attempt + Math.abs(batchSeed);
    const prefix = bank.prefixes[i % bank.prefixes.length];
    const root = bank.roots[(i * 3 + Math.floor(i / 5)) % bank.roots.length];
    const suffix = bank.suffixes[(i * 7 + Math.floor(i / 3)) % bank.suffixes.length];
    const numTag = String(((i * 17 + 13) % 90) + 10);

    let left = '';
    let right = '';

    if (keyword) {
      const kwCap = capitalize(keyword.slice(0, Math.max(2, targetLen - 2)));
      const mode = attempt % 4;
      if (mode === 0) {
        left = kwCap;
        right = `${capitalize(root)}${suffix}`;
      } else if (mode === 1) {
        left = capitalize(prefix);
        right = `${kwCap}${numTag}`;
      } else if (mode === 2) {
        left = kwCap;
        right = `${capitalize(prefix)}${numTag}`;
      } else {
        left = capitalize(root);
        right = kwCap;
      }
    } else {
      const mode = attempt % 4;
      if (mode === 0) {
        left = capitalize(prefix);
        right = `${capitalize(root)}${suffix}`;
      } else if (mode === 1) {
        left = capitalize(prefix);
        right = `${capitalize(root)}${numTag}`;
      } else if (mode === 2) {
        left = capitalize(root);
        right = capitalize(suffix);
      } else {
        left = `${prefix}`;
        right = `${root}${numTag}`;
      }
    }

    const useUnderscoreHere = allowUnderscore && (attempt % 2 === 1);
    const candidate = fitUsernameToLength(left, right, targetLen, useUnderscoreHere, i);

    if (isValidRobloxUsername(candidate) && !seen.has(candidate.toLowerCase())) {
      seen.add(candidate.toLowerCase());
      results.push(candidate);
    }
  }

  let fallbackIdx = 0;
  while (results.length < count && fallbackIdx < 5000) {
    fallbackIdx++;
    const seed = Math.abs(batchSeed) + fallbackIdx;
    const baseChar = keyword ? keyword.charAt(0).toUpperCase() : ALPHANUM_FILL[seed % 26].toUpperCase();
    const secondChar = ALPHANUM_FILL[(seed * 7 + fallbackIdx) % ALPHANUM_FILL.length];
    const thirdChar = ALPHANUM_FILL[(seed * 13 + fallbackIdx * 3) % ALPHANUM_FILL.length];
    const left = `${baseChar}${secondChar}`;
    const right = `${thirdChar}${bank.suffixes[seed % bank.suffixes.length]}`;
    const candidate = fitUsernameToLength(
      left,
      right,
      targetLen,
      allowUnderscore && fallbackIdx % 2 === 1,
      seed
    );
    if (isValidRobloxUsername(candidate) && !seen.has(candidate.toLowerCase())) {
      seen.add(candidate.toLowerCase());
      results.push(candidate);
    }
  }

  return results;
}

export default function RobloxUsernameGenerator() {
  const [keyword, setKeyword] = useState<string>('');
  const [style, setStyle] = useState<UsernameStyle>('Aesthetic');
  const [length, setLength] = useState<number>(12);
  const [allowUnderscore, setAllowUnderscore] = useState<boolean>(true);
  const [names, setNames] = useState<string[]>(() =>
    generateRobloxUsernames('Aesthetic', '', 12, true, 20, 101)
  );
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const handleGenerate = () => {
    const next = generateRobloxUsernames(style, keyword, length, allowUnderscore, 20, Date.now());
    setNames(next);
  };

  const handleCopy = (name: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(name);
    }
    setCopiedName(name);
    window.setTimeout(() => setCopiedName(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <label htmlFor="rbx-user-keyword" className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
              Optional Keyword (Letters &amp; Numbers Only)
            </label>
            <input
              id="rbx-user-keyword"
              type="text"
              maxLength={16}
              placeholder="e.g. Kitsune, Shadow, Nova..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500"
            />
            <span className="text-[11px] text-zinc-400 block">
              Non-alphanumeric characters are automatically stripped to follow Roblox rules.
            </span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="rbx-user-length" className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Username Length: <span className="font-mono text-white text-sm">{length} chars</span>
              </label>
              <span className="text-[11px] font-mono text-zinc-400">3–20 allowed</span>
            </div>
            <input
              id="rbx-user-length"
              type="range"
              min={3}
              max={20}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value, 10))}
              className="w-full accent-cyan-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => setAllowUnderscore((v) => !v)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                  allowUnderscore
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Allow One Underscore: {allowUnderscore ? 'ON' : 'OFF'}
              </button>
              <span className="text-[11px] text-zinc-400 font-mono">Never first or last</span>
            </div>
          </div>
        </div>

        {/* Style Buttons */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
            Username Style
          </span>
          <div className="flex flex-wrap gap-2">
            {USERNAME_STYLES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  style === s
                    ? 'bg-rose-500/20 border-rose-500/70 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="button"
          onClick={handleGenerate}
          className="w-full py-3.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-rose-950/40"
        >
          <RefreshCw className="w-4 h-4" />
          Generate 20 Roblox Usernames
        </button>

        {/* 20 Generated Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-400" />
              20 Generated Ideas (Click Any Name to Copy)
            </span>
            <span className="font-mono text-[11px]">Style: {style} · {length} chars</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {names.map((name) => {
              const isCopied = copiedName === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleCopy(name)}
                  className={`px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isCopied
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                      : 'bg-zinc-950 border-zinc-800 hover:border-rose-500/50 text-white'
                  }`}
                >
                  <span className="font-mono text-xs font-bold truncate">{name}</span>
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Required single disclaimer line */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs text-zinc-300">
            <Info className="w-4 h-4 text-zinc-400 shrink-0" />
            <span>Availability is not checked — try the name in Roblox to see if it is free.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
