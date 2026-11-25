/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { Search, Copy, Check, AlertTriangle, Gamepad2, X } from 'lucide-react';
import {
  CheatCategory,
  GTA6_CHEATS,
  GTA6_CHEAT_CATEGORIES,
  GTA6_CHEATS_LAST_CHECKED,
  GTA6_HOW_TO_ENTER,
  GTA6_CHEAT_PENALTIES,
  filterGta6Cheats
} from '../../data/gta6Data';

export default function Gta6CheatCodeFinder() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | CheatCategory>('All');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const statusCounts = useMemo(() => {
    let verified = 0;
    let unconfirmed = 0;
    let undiscovered = 0;
    for (const cheat of GTA6_CHEATS) {
      if (cheat.inputStatus === 'verified') verified += 1;
      else if (cheat.inputStatus === 'unconfirmed') unconfirmed += 1;
      else undiscovered += 1;
    }
    return {
      total: GTA6_CHEATS.length,
      verified,
      unconfirmed,
      undiscovered
    };
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<'All' | CheatCategory, number> = {
      All: GTA6_CHEATS.length,
      Player: 0,
      Combat: 0,
      Vehicle: 0,
      Environment: 0,
      Filters: 0
    };
    for (const cheat of GTA6_CHEATS) {
      counts[cheat.category] += 1;
    }
    return counts;
  }, []);

  const filteredCheats = useMemo(() => {
    return filterGta6Cheats(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const handleCopy = async (cheatName: string, wordInput: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(wordInput);
      }
      setCopiedKey(cheatName);
      window.setTimeout(() => {
        setCopiedKey((prev) => (prev === cheatName ? null : prev));
      }, 1800);
    } catch {
      setCopiedKey(cheatName);
      window.setTimeout(() => {
        setCopiedKey((prev) => (prev === cheatName ? null : prev));
      }, 1800);
    }
  };

  const categoryTabs: ('All' | CheatCategory)[] = ['All', ...GTA6_CHEAT_CATEGORIES];

  return (
    <div className="space-y-8 bg-[#0c122e] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="space-y-2.5 border-b border-indigo-900/60 pb-6">
        <div className="text-xs font-mono font-bold text-rose-400 flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 shrink-0" />
          <span>Grand Theft Auto VI · PS5 &amp; Xbox Series X|S</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          GTA 6 Cheat Code Finder
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          All {statusCounts.total} GTA 6 cheats for PS5 and Xbox Series X|S — search by name, filter by category, copy the D-pad input.
        </p>
        <p className="text-xs font-mono tabular-nums text-slate-400">
          {statusCounts.total} cheats · {statusCounts.verified} inputs verified · {statusCounts.unconfirmed} unconfirmed · {statusCounts.undiscovered} not yet discovered · Last checked: {GTA6_CHEATS_LAST_CHECKED}
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cheats by name or effect (e.g., $250,000, tank, infinite ammo, weather)..."
            aria-label="Search GTA 6 cheats"
            className="w-full bg-[#070b19] border border-indigo-900/80 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-400 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Cheat Categories">
          {categoryTabs.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'bg-[#070b19] border border-indigo-900/70 text-slate-300 hover:text-white hover:border-rose-400/50'
                }`}
              >
                {cat} ({categoryCounts[cat]})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs font-mono tabular-nums text-slate-400">
        Showing {filteredCheats.length} of {statusCounts.total} cheats
      </div>

      {/* Cheat Cards Grid */}
      {filteredCheats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCheats.map((cheat) => {
            const isCopied = copiedKey === cheat.name;
            const hasSequence =
              (cheat.inputStatus === 'verified' || cheat.inputStatus === 'unconfirmed') &&
              cheat.input !== null &&
              cheat.inputArrows !== null;

            return (
              <div
                key={cheat.name}
                className="bg-[#070b19] border border-indigo-950 rounded-2xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-white leading-snug">
                      {cheat.name}
                    </h3>
                    <span className="text-[11px] font-mono text-rose-300 shrink-0">
                      {cheat.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {cheat.effect}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Unlock: {cheat.unlock}
                  </p>
                </div>

                {/* Input Area */}
                <div className="pt-3 border-t border-indigo-950/80 space-y-2">
                  {hasSequence ? (
                    <>
                      <div className="flex items-center justify-between gap-3">
                        <code
                          aria-label={`D-pad arrow sequence for ${cheat.name}`}
                          className="px-3 py-2 rounded-lg bg-[#0c122e] border border-indigo-900/80 font-mono tabular-nums text-xs sm:text-sm font-bold text-cyan-300 tracking-wider overflow-x-auto"
                        >
                          {cheat.inputArrows}
                        </code>

                        <button
                          type="button"
                          onClick={() => handleCopy(cheat.name, cheat.input!)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            isCopied
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#121c45] hover:bg-rose-500 border border-indigo-800 hover:border-rose-400 text-slate-100'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-400 leading-relaxed">
                        {cheat.input}
                      </div>

                      {cheat.inputStatus === 'unconfirmed' && (
                        <div className="text-xs font-medium text-amber-300">
                          Unconfirmed — reported by one source so far
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="px-3 py-2 rounded-lg bg-[#0c122e]/60 border border-indigo-950 text-xs font-mono text-slate-400 inline-block">
                      Input not yet discovered
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-12 px-4 text-center rounded-2xl bg-[#070b19] border border-indigo-950 text-sm text-slate-300">
          No cheats match — try a different name or category.
        </div>
      )}

      {/* How to Enter Cheats */}
      <div className="pt-2 border-t border-indigo-900/60 space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white">
          How to enter cheats in GTA 6
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {GTA6_HOW_TO_ENTER.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>

      {/* Before You Cheat Warning Box */}
      <div className="rounded-2xl bg-amber-500/10 border border-amber-500/35 p-5 space-y-2.5">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <h3>Before you cheat</h3>
        </div>
        <ul className="space-y-1.5 text-xs sm:text-sm text-amber-100/90 leading-relaxed list-disc list-inside">
          {GTA6_CHEAT_PENALTIES.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
