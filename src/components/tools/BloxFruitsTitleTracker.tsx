/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, Search, Filter, CheckSquare, Square, AlertTriangle, 
  Sparkles, RotateCcw, Copy, Check, Info, MapPin, Award, 
  ShieldAlert, ShieldCheck, Flame, ChevronRight, Zap
} from 'lucide-react';
import { 
  BLOX_FRUITS_TITLES_DATA, 
  BLOX_FRUITS_TITLE_CATEGORIES, 
  BloxFruitsTitle, 
  TitleCategory 
} from '../../data/bloxFruitsTitlesData';

const LOCAL_STORAGE_KEY = 'blox_fruits_unlocked_titles';

export default function BloxFruitsTitleTracker() {
  const [unlockedTitleNumbers, setUnlockedTitleNumbers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [obtainableFilter, setObtainableFilter] = useState<'all' | 'obtainable' | 'unobtainable'>('all');
  const [copied, setCopied] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unlockedTitleNumbers));
    } catch {
      // ignore
    }
  }, [unlockedTitleNumbers]);

  const toggleTitle = (titleNumber: string) => {
    setUnlockedTitleNumbers(prev => {
      if (prev.includes(titleNumber)) {
        return prev.filter(num => num !== titleNumber);
      } else {
        return [...prev, titleNumber];
      }
    });
  };

  const handleSelectAllFiltered = (titlesToSelect: BloxFruitsTitle[]) => {
    const numbersToAdd = titlesToSelect.map(t => t.number);
    setUnlockedTitleNumbers(prev => Array.from(new Set([...prev, ...numbersToAdd])));
  };

  const handleDeselectAllFiltered = (titlesToDeselect: BloxFruitsTitle[]) => {
    const numbersToRemove = new Set(titlesToDeselect.map(t => t.number));
    setUnlockedTitleNumbers(prev => prev.filter(num => !numbersToRemove.has(num)));
  };

  const handleResetAll = () => {
    if (window.confirm('Reset all tracked title progress?')) {
      setUnlockedTitleNumbers([]);
    }
  };

  // Dynamic counts derived strictly from loaded data — never hardcoded
  const totalTitlesCount = BLOX_FRUITS_TITLES_DATA.length;
  const obtainableTitles = useMemo(() => BLOX_FRUITS_TITLES_DATA.filter(t => t.obtainable), []);
  const unobtainableTitles = useMemo(() => BLOX_FRUITS_TITLES_DATA.filter(t => !t.obtainable), []);
  
  const totalObtainableCount = obtainableTitles.length;
  const totalUnobtainableCount = unobtainableTitles.length;

  const unlockedSet = useMemo(() => new Set(unlockedTitleNumbers), [unlockedTitleNumbers]);

  const unlockedObtainableCount = useMemo(() => {
    return obtainableTitles.filter(t => unlockedSet.has(t.number)).length;
  }, [obtainableTitles, unlockedSet]);

  const unlockedTotalCount = unlockedTitleNumbers.length;

  const progressPercent = totalObtainableCount > 0 
    ? Math.round((unlockedObtainableCount / totalObtainableCount) * 100) 
    : 0;

  // Next Easiest Titles (lowest-numbered unticked obtainable titles)
  const nextEasiestTitles = useMemo(() => {
    return obtainableTitles
      .filter(t => !unlockedSet.has(t.number) && !t.isSpecial)
      .slice(0, 4);
  }, [obtainableTitles, unlockedSet]);

  // Filtered titles list
  const filteredTitles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const queryNumeric = query.replace(/^#/, '');

    return BLOX_FRUITS_TITLES_DATA.filter(title => {
      // Category filter
      if (selectedCategory !== 'all' && title.category !== selectedCategory) {
        return false;
      }

      // Obtainability filter
      if (obtainableFilter === 'obtainable' && !title.obtainable) {
        return false;
      }
      if (obtainableFilter === 'unobtainable' && title.obtainable) {
        return false;
      }

      // Search match: name, number (#022 or 22), requirement, category
      if (query !== '') {
        const matchesName = title.name.toLowerCase().includes(query);
        const matchesRequirement = title.requirement.toLowerCase().includes(query);
        const matchesNumber = title.number.toLowerCase().includes(query) || 
          title.idNumber.toString() === queryNumeric;
        const matchesCategory = title.category.toLowerCase().includes(query);
        return matchesName || matchesRequirement || matchesNumber || matchesCategory;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, obtainableFilter]);

  const handleCopyProgress = () => {
    const summary = [
      `🏆 BLOX FRUITS TITLE PROGRESS REPORT`,
      `• Progress: ${unlockedObtainableCount} / ${totalObtainableCount} Obtainable Titles (${progressPercent}%)`,
      `• Total Unlocked: ${unlockedTotalCount} / ${totalTitlesCount} Titles Loaded`,
      `• Unlocked Titles:`,
      ...unlockedTitleNumbers.map(num => {
        const title = BLOX_FRUITS_TITLES_DATA.find(t => t.number === num);
        return `  - ${num} ${title ? title.name : ''}`;
      })
    ].join('\n');

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans text-slate-100">
      {/* Top Banner Card */}
      <div className="relative bg-gradient-to-r from-red-950/60 via-slate-900 to-amber-950/60 border-2 border-red-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-red-500/20 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-950 border border-red-500/50 rounded-xl text-red-400 shadow-lg">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded border border-red-500/30">
                BLOX FRUITS SEA 2 &amp; SEA 3 TRACKER
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mt-1">
                Blox Fruits Title &amp; Achievement Tracker
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetAll}
              className="p-2.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1 cursor-pointer"
              title="Reset all checkboxes"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyProgress}
              className="px-4 py-2.5 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-500 text-white transition font-mono flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Progress'}
            </button>
          </div>
        </div>

        {/* Live Progress Bar & Loaded Counts */}
        <div className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 text-xs">
            <div>
              <span className="text-slate-400 font-mono uppercase text-[11px] block">
                Obtainable Titles Progress
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {unlockedObtainableCount}{' '}
                <span className="text-lg text-slate-400 font-normal">/ {totalObtainableCount}</span>
              </span>
              <span className="text-slate-400 text-xs ml-2 font-mono">
                ({progressPercent}% complete)
              </span>
            </div>
            <div className="text-right text-slate-400 text-xs font-mono">
              <span className="text-white font-bold">{totalTitlesCount}</span> Titles Loaded{' '}
              <span className="text-slate-500">({totalUnobtainableCount} Unobtainable)</span>
            </div>
          </div>

          {/* Animated Bar */}
          <div className="w-full h-3 bg-slate-900 border border-slate-800 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Verified Specialist Locations & Sea Rule Notice */}
      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs space-y-3">
        <div className="flex items-center gap-2 font-bold text-amber-400 uppercase tracking-wide">
          <Info className="w-4 h-4 shrink-0" />
          <span>Titles Specialist Locations &amp; Verified Sea Obtainment Rules</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
          <div className="p-3 bg-[#0a0f1d] border border-slate-800 rounded-lg space-y-1">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" /> Second Sea Location:
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Equip and switch titles via the <strong className="text-white">Titles Specialist</strong> in the <span className="text-amber-300">Cafe basement</span>.
            </p>
          </div>
          <div className="p-3 bg-[#0a0f1d] border border-slate-800 rounded-lg space-y-1">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-400" /> Third Sea Location:
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Equip and switch titles in the <span className="text-amber-300">Mansion</span>, located on the right side immediately inside the front door.
            </p>
          </div>
        </div>
        <div className="p-2.5 bg-red-950/30 border border-red-500/20 rounded-lg text-[11px] text-slate-300 leading-relaxed">
          <strong className="text-red-400">Important Obtainment Rule:</strong> Titles are obtainable <strong className="text-white">ONLY in the Second Sea and Third Sea</strong>. A requirement finished in the First Sea grants nothing (you must repeat it in Sea 2 or 3). <span className="text-amber-300">Exceptions:</span> <em>"Class S"</em> (First Sea, Advanced Combat) and <em>"I Was There"</em> (one-off Sea 1 Rework event title).
        </div>
      </div>

      {/* Next Easiest Titles Hint Card */}
      {nextEasiestTitles.length > 0 && (
        <div className="p-5 bg-[#0e1422] border border-slate-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Recommended Next Titles (Lowest-Numbered Unticked)
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Quick Progression</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {nextEasiestTitles.map(title => (
              <div 
                key={title.number}
                className="p-3 bg-[#090d16] border border-slate-800 rounded-xl flex flex-col justify-between hover:border-amber-500/40 transition"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-amber-400">{title.number}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {title.category}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-white mb-1">{title.name}</div>
                  <div className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {title.requirement}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTitle(title.number)}
                  className="mt-3 w-full py-1.5 text-xs font-mono font-semibold rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" /> Mark Unlocked
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls & Filters Bar */}
      <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-5 space-y-4">
        {/* Search Input & Status Toggle */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search title by name or number (e.g. Pirate Hunter, #022, 138, Thunder God)..."
              className="w-full bg-[#090d16] border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Filter (Obtainable / Unobtainable) */}
          <div className="flex rounded-xl bg-[#090d16] border border-slate-700 p-1 shrink-0">
            <button
              type="button"
              onClick={() => setObtainableFilter('all')}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition cursor-pointer ${
                obtainableFilter === 'all' 
                  ? 'bg-red-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setObtainableFilter('obtainable')}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition cursor-pointer ${
                obtainableFilter === 'obtainable' 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Obtainable
            </button>
            <button
              type="button"
              onClick={() => setObtainableFilter('unobtainable')}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition cursor-pointer ${
                obtainableFilter === 'unobtainable' 
                  ? 'bg-rose-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Unobtainable
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>FILTER BY CATEGORY</span>
            <div className="space-x-2">
              <button
                type="button"
                onClick={() => handleSelectAllFiltered(filteredTitles)}
                className="text-amber-400 hover:underline cursor-pointer"
              >
                Select Filtered ({filteredTitles.length})
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => handleDeselectAllFiltered(filteredTitles)}
                className="text-slate-400 hover:underline cursor-pointer"
              >
                Deselect Filtered
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-[#090d16] text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              All Categories
            </button>
            {BLOX_FRUITS_TITLE_CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-[#090d16] text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Checklist Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span>SHOWING {filteredTitles.length} TITLES</span>
          <span>SAVED TO LOCAL STORAGE</span>
        </div>

        {filteredTitles.length === 0 ? (
          <div className="p-8 text-center bg-[#0e1422] border border-slate-800 rounded-2xl space-y-2">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
            <p className="text-white font-bold">No titles match your search or filter.</p>
            <p className="text-xs text-slate-400">
              Try adjusting your query, switching categories, or clearing the unobtainable filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredTitles.map(title => {
              const isChecked = unlockedSet.has(title.number);

              return (
                <div
                  key={title.number}
                  onClick={() => toggleTitle(title.number)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-red-950/20 border-red-500/50 shadow-sm'
                      : 'bg-[#0e1422] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Checkbox */}
                  <div className="pt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-red-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                    )}
                  </div>

                  {/* Title Content */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center flex-wrap gap-1.5">
                      <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-400 shrink-0">
                        {title.number}
                      </span>
                      <h3 className={`font-bold text-sm tracking-tight ${
                        title.colorType === 'Red' 
                          ? 'text-red-400 font-black' 
                          : title.colorType === 'Colored' 
                            ? 'text-sky-300' 
                            : 'text-white'
                      }`}>
                        {title.name}
                      </h3>
                      {title.isSpecial && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950 border border-purple-500/40 text-purple-300 font-semibold shrink-0">
                          Special
                        </span>
                      )}
                      {!title.obtainable && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-950 border border-rose-500/50 text-rose-300 font-semibold shrink-0 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> UNOBTAINABLE
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-300 leading-relaxed">
                      <span className="text-slate-400">Requirement: </span>
                      <strong className="text-slate-200">{title.requirement}</strong>
                    </div>

                    {title.notes && (
                      <div className="text-[11px] text-amber-400/90 font-mono italic">
                        {title.notes}
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#090d16] text-slate-400 border border-slate-800">
                        {title.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
