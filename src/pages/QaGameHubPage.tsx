/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { getQaEntriesByGame, QaEntry } from '../data/qaData';
import { GAMES } from '../data/gamesAndTools';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import { getGameIcon } from '../components/GameIcons';
import { HelpCircle, ArrowRight, MessageSquare, ArrowLeft } from 'lucide-react';

interface QaGameHubPageProps {
  gameSlug: string;
  onNavigate: (path: string) => void;
}

export default function QaGameHubPage({ gameSlug, onNavigate }: QaGameHubPageProps) {
  const entries = getQaEntriesByGame(gameSlug);
  const gameInfo = GAMES.find((g) => g.slug === gameSlug || g.id === gameSlug);
  const gameName = entries.length > 0 ? entries[0].gameName : gameInfo ? gameInfo.name : gameSlug;

  const currentPath = `/qa/${gameSlug}`;
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Q&A', path: '/qa' },
    { name: `${gameName} Q&A`, path: currentPath }
  ];

  return (
    <>
      <SEOHead
        title={`${gameName} Questions & Answers | GamingToolsHub`}
        description={`Get fast, verified answers to top ${gameName} questions, currency calculations, exchange rates, and game mechanics.`}
        canonicalPath={currentPath}
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Top Ad Slot */}
        <AdLayout.HubTop currentPath={currentPath} />

        {/* Hub Header */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-12 h-12 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                {getGameIcon(gameSlug, 'w-7 h-7')}
              </div>
              <div className="space-y-2 min-w-0">
                <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
                  {gameName} Questions &amp; Answers
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-3xl">
                  Quick, accurate answers to the most searched {gameName} questions, rates, and values.
                </p>
                <p className="text-xs font-mono text-[var(--muted)] tabular-nums">
                  {entries.length} questions
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/qa')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary-light)] hover:text-[var(--accent)] transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Game Q&amp;A Hubs</span>
            </button>
          </div>
        </div>

        {/* In-feed Ad Slot */}
        <AdLayout.HubInFeed />

        {/* Question Cards Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-950/80 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-violet-400" />
              <span>{gameName} Q&A Articles ({entries.length})</span>
            </h2>
          </div>

          {entries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entries.map((entry: QaEntry) => (
                <button
                  key={entry.slug}
                  type="button"
                  onClick={() => onNavigate(`/qa/${gameSlug}/${entry.slug}`)}
                  className="p-5 rounded-2xl bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/50 text-left transition-all group flex flex-col justify-between shadow-sm cursor-pointer"
                >
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors leading-snug">
                      {entry.question}
                    </h3>

                    <div className="bg-[#070b19] border border-indigo-950/80 p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed">
                      {entry.shortAnswer}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-violet-400 group-hover:text-cyan-300 pt-2 border-t border-indigo-950/60">
                    <span>Read Full Explanation & Worked Example</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-[#0c122e] border border-indigo-900/60 rounded-2xl p-8 text-center space-y-2">
              <div className="text-sm font-bold text-slate-200">
                No questions found for {gameName} yet.
              </div>
              <p className="text-xs text-slate-400">
                Check back soon as new questions are added daily.
              </p>
            </div>
          )}
        </section>

        {/* Above Footer Ad Slot */}
        <AdLayout.HubAboveFooter />
      </div>

      <AdLayout.MobileAnchor currentPath={currentPath} />
    </>
  );
}
