/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QA_ENTRIES, getQaGames, QaEntry } from '../data/qaData';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import { getGameIcon } from '../components/GameIcons';
import { HelpCircle, ArrowRight, Search, Sparkles, MessageSquare } from 'lucide-react';

interface QaIndexPageProps {
  onNavigate: (path: string) => void;
}

export default function QaIndexPage({ onNavigate }: QaIndexPageProps) {
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const games = getQaGames();

  const filteredEntries = QA_ENTRIES.filter((entry) => {
    const matchesGame = selectedGame === 'all' || entry.gameSlug === selectedGame;
    const matchesQuery =
      searchQuery.trim() === '' ||
      entry.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.gameName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGame && matchesQuery;
  });

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Q&A', path: '/qa' }
  ];

  return (
    <>
      <SEOHead
        title="Game Q&A — Quick Answers to Gaming Questions | GamingToolsHub"
        description="Clear, calculated answers to common gaming questions, exchange rates, currency values, and mechanics across major games."
        canonicalPath="/qa"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Top Ad Slot */}
        <AdLayout.HubTop />

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-violet-950/70 via-indigo-950/60 to-[#0c122e] border border-violet-500/40 p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300 text-xs font-mono font-bold">
              <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
              <span>Verified Knowledge Base</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Game Q&A — Quick Answers to Gaming Questions
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              Clear, calculated answers to common gaming questions, exchange rates, currency values, and game mechanics. Select a game hub or search below.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions (e.g., 1000 Robux, DevEx)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#070b19] border border-indigo-900/80 focus:border-violet-500 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Game Hub Navigation Cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-950/80 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              <span>Game Q&A Hubs</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              {games.length} Game{games.length !== 1 ? 's' : ''} Available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => setSelectedGame('all')}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                selectedGame === 'all'
                  ? 'bg-violet-950/80 border-violet-500/80 text-white shadow-lg'
                  : 'bg-[#0c122e] border-indigo-900/60 hover:border-violet-500/40 text-slate-300 hover:text-white'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0 text-violet-300">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold">All Games</div>
                <div className="text-xs font-mono text-slate-400">{QA_ENTRIES.length} Questions</div>
              </div>
            </button>

            {games.map((game) => {
              const isActive = selectedGame === game.slug;
              return (
                <button
                  key={game.slug}
                  type="button"
                  onClick={() => {
                    setSelectedGame(game.slug);
                    onNavigate(`/qa/${game.slug}`);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-violet-950/80 border-violet-500/80 text-white shadow-lg'
                      : 'bg-[#0c122e] border-indigo-900/60 hover:border-violet-500/40 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#070b19] border border-indigo-900/80 p-2 flex items-center justify-center shrink-0">
                    {getGameIcon(game.slug, 'w-full h-full')}
                  </div>
                  <div>
                    <div className="text-sm font-bold truncate">{game.name}</div>
                    <div className="text-xs font-mono text-slate-400">{game.count} Questions</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* In-feed Ad Slot */}
        <AdLayout.HubInFeed />

        {/* Questions Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-950/80 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              <span>Questions & Answers</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              Showing {filteredEntries.length} of {QA_ENTRIES.length}
            </span>
          </div>

          {filteredEntries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEntries.map((entry: QaEntry) => (
                <button
                  key={`${entry.gameSlug}-${entry.slug}`}
                  type="button"
                  onClick={() => onNavigate(`/qa/${entry.gameSlug}/${entry.slug}`)}
                  className="p-5 rounded-2xl bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/50 text-left transition-all group flex flex-col justify-between shadow-sm cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#070b19] border border-indigo-900/80 p-1 flex items-center justify-center shrink-0">
                        {getGameIcon(entry.gameSlug, 'w-full h-full')}
                      </div>
                      <span className="text-xs font-mono text-violet-400 font-bold uppercase tracking-wider">
                        {entry.gameName} Q&A
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors leading-snug">
                      {entry.question}
                    </h3>

                    <div className="bg-[#070b19] border border-indigo-950/80 p-3 rounded-xl text-xs text-slate-300 leading-relaxed">
                      {entry.shortAnswer}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-violet-400 group-hover:text-cyan-300 pt-2 border-t border-indigo-950/60">
                    <span>Read Full Answer & Example</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-[#0c122e] border border-indigo-900/60 rounded-2xl p-8 text-center space-y-2">
              <div className="text-sm font-bold text-slate-200">
                No questions found matching your search query.
              </div>
              <p className="text-xs text-slate-400">
                Try searching for keywords like &quot;Robux&quot;, &quot;USD&quot;, or &quot;DevEx&quot;.
              </p>
            </div>
          )}
        </section>

        {/* Above Footer Ad Slot */}
        <AdLayout.HubAboveFooter />
      </div>

      <AdLayout.MobileAnchor currentPath="/qa" />
    </>
  );
}
