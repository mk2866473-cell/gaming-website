/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../data/gamesAndTools';
import { getGameIcon } from '../components/GameIcons';
import HubCodesBanner from '../components/HubCodesBanner';
import { GTA6_CHEATS, GTA6_CHEATS_LAST_CHECKED } from '../data/gta6Data';

interface Gta6HubPageProps {
  onNavigate: (path: string) => void;
}

export default function Gta6HubPage({ onNavigate }: Gta6HubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const gta6Tools = useMemo(() => {
    return TOOLS.filter((t) => t.gameId === 'gta6');
  }, []);

  const cheatSummary = useMemo(() => {
    let verified = 0;
    let unconfirmed = 0;
    let undiscovered = 0;
    for (const c of GTA6_CHEATS) {
      if (c.inputStatus === 'verified') verified += 1;
      else if (c.inputStatus === 'unconfirmed') unconfirmed += 1;
      else undiscovered += 1;
    }
    return {
      total: GTA6_CHEATS.length,
      verified,
      unconfirmed,
      undiscovered
    };
  }, []);

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return gta6Tools;
    return gta6Tools.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [gta6Tools, searchQuery]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Grand Theft Auto VI', path: '/games/gta-6' }
  ];

  const faqs = [
    {
      q: 'How do you enter cheat codes in Grand Theft Auto VI (GTA 6)?',
      a: 'Finish the main story first, press Up on the D-pad to open your in-game phone, hold L1 (PS5) or LB (Xbox) and press R1 or RB, then enter the D-pad sequence. Sequences are identical on PS5 and Xbox Series X|S.'
    },
    {
      q: 'Why do GTA 6 cheats stay locked even if I know the D-pad sequence?',
      a: 'Every cheat in Grand Theft Auto VI stays locked until the credits roll after finishing the main story, and most cheats also require completing a specific unlock challenge first.'
    },
    {
      q: 'Do GTA 6 cheats disable trophies, achievements, and saving?',
      a: 'Yes. Activating a cheat disables trophies and achievements for the rest of that play session, and you cannot save the game while a cheat is active. Always make a clean save before using cheats.'
    }
  ];

  return (
    <div className="space-y-8 font-sans text-slate-100">
      <SEOHead
        title="Grand Theft Auto VI (GTA 6) Tools & Cheat Code Finder"
        description="Verified Grand Theft Auto VI (GTA 6) cheat codes and utilities for PS5 and Xbox Series X|S: search all 61 cheats, check unlock challenges, and copy verified D-pad inputs."
        canonicalPath="/games/gta-6"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Dynamic Game Codes Banner */}
      <HubCodesBanner hubPath="/games/gta-6" onNavigate={onNavigate} />

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950/70 via-zinc-900 to-black border border-rose-500/40 p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="relative z-10 space-y-4">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center p-3 shadow-xl shrink-0">
              {getGameIcon('gta6', 'w-full h-full')}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1 text-[11px] font-mono text-zinc-400">
                <span className="font-bold text-rose-400">Grand Theft Auto VI Hub</span>
                <span aria-hidden="true">·</span>
                <span>PS5 &amp; Xbox Series X|S</span>
                <span aria-hidden="true">·</span>
                <span>{cheatSummary.total} Cheats ({cheatSummary.verified} Verified)</span>
                <span aria-hidden="true">·</span>
                <span>Last checked: {GTA6_CHEATS_LAST_CHECKED}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Grand Theft Auto VI <span className="text-rose-400">Tools &amp; Cheats</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mt-1 leading-relaxed">
                Search all {cheatSummary.total} GTA 6 cheat codes, track unlock conditions, and copy verified D-pad sequences for PS5 and Xbox Series X|S.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Tool Directory */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search GTA 6 tools (Cheat Code Finder, D-pad codes...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => (
              <React.Fragment key={tool.id}>
                {idx === 3 && (
                  <div className="col-span-full">
                    <AdLayout.HubInFeed />
                  </div>
                )}
                <ToolCard
                  tool={tool}
                  onSelectTool={(slug) => onNavigate('/tools/' + slug)}
                />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-zinc-500 bg-zinc-900/40 border border-zinc-800 rounded-xl">
            No GTA 6 tools found matching your query.
          </div>
        )}
      </div>

      {/* Verified Strategy FAQ */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <HelpCircle className="w-5 h-5 text-rose-400" />
          <h2 className="text-lg font-bold text-white">Grand Theft Auto VI Cheat Code FAQs</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-950/60">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-zinc-200 hover:text-white cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-rose-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-500" />
                )}
              </button>
              {openFaqIndex === idx && (
                <div className="px-4 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hub Above Footer Banner Ad Slot */}
      <AdLayout.HubAboveFooter />
    </div>
  );
}
