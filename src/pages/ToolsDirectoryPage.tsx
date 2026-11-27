/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { TOOLS, GAMES, CATEGORIES, ToolItem, getGameById } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import BrandLogo from '../components/BrandLogo';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface ToolsDirectoryPageProps {
  onNavigate: (path: string) => void;
}

export default function ToolsDirectoryPage({ onNavigate }: ToolsDirectoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const parseParams = () => {
    try {
      const hash = window.location.hash || '';
      const queryPart = hash.includes('?') ? hash.split('?')[1] : window.location.search.replace(/^\?/, '');
      const params = new URLSearchParams(queryPart);
      return {
        game: params.get('game') || 'all',
        category: params.get('category') || params.get('cat') || 'all'
      };
    } catch {
      return { game: 'all', category: 'all' };
    }
  };

  const initial = parseParams();
  const [selectedGame, setSelectedGame] = useState<string>(initial.game);
  const [selectedCategory, setSelectedCategory] = useState<string>(initial.category);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'name'>('popularity');

  useEffect(() => {
    const handleLocation = () => {
      const p = parseParams();
      if (p.game !== selectedGame) setSelectedGame(p.game);
      if (p.category !== selectedCategory) setSelectedCategory(p.category);
    };
    window.addEventListener('hashchange', handleLocation);
    window.addEventListener('popstate', handleLocation);
    return () => {
      window.removeEventListener('hashchange', handleLocation);
      window.removeEventListener('popstate', handleLocation);
    };
  }, [selectedGame, selectedCategory]);

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const q = searchQuery.toLowerCase().trim();
      const game = getGameById(tool.gameId);
      const matchSearch =
        q === '' ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.tags.some(t => t.toLowerCase().includes(q)) ||
        tool.gameId.toLowerCase().includes(q) ||
        (game && (
          game.name.toLowerCase().includes(q) ||
          (game.shortName && game.shortName.toLowerCase().includes(q)) ||
          game.slug.toLowerCase().includes(q)
        ));

      const matchGame = selectedGame === 'all' || tool.gameId === selectedGame;
      const matchCategory = selectedCategory === 'all' || tool.categoryId === selectedCategory;

      return matchSearch && matchGame && matchCategory;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b.reviewsCount - a.reviewsCount; // default popularity
    });
  }, [searchQuery, selectedGame, selectedCategory, sortBy]);

  const breadcrumbs = [
    { name: 'All Tools', path: '/tools' }
  ];

  return (
    <>
      <SEOHead
        title="Gaming Tools & Calculators Directory – All Utilities"
        description="Search and explore our entire directory of gaming calculators, voxel circle generators, nether portal linkers, XP estimators, and team balancers."
        canonicalPath="/tools"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-8">
        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <BrandLogo size="lg" className="!rounded-[12px] shrink-0" />
              <div className="space-y-2 min-w-0">
                <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
                  All Gaming Tools &amp; Calculators
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-3xl">
                  Explore our full catalog of verified theorycrafting utilities across Minecraft, Palworld, Genshin Impact, FPS, Pokémon GO, Fortnite, and Roblox.
                </p>
                <p className="text-xs font-mono text-[var(--muted)] tabular-nums">
                  {filteredTools.length} tools
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-4 sm:p-5 space-y-4">
          {/* Search Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[var(--primary-light)] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                aria-label="Filter tools by name, keyword, or mechanics tag"
                placeholder="Filter tools by name, keyword, or mechanics tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg pl-9 pr-3 py-2 text-xs text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/30 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--muted)] whitespace-nowrap">Sort:</span>
              <select
                aria-label="Sort tools"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[var(--bg)] border border-[var(--border)] rounded-lg px-2.5 py-2 text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)] cursor-pointer"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Game Filter */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-indigo-950/80 text-xs">
            <span className="text-slate-400 font-medium mr-1 text-[11px] uppercase tracking-wider font-mono">Game:</span>
            <button
              onClick={() => setSelectedGame('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedGame === 'all'
                  ? 'bg-violet-600 text-white font-semibold shadow-sm shadow-violet-950/50'
                  : 'bg-[#070b19] border border-indigo-950 text-slate-400 hover:text-white hover:bg-[#121c45]'
              }`}
            >
              All Games
            </button>
            {GAMES.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedGame === game.id
                    ? 'bg-violet-600 text-white font-semibold shadow-sm shadow-violet-950/50'
                    : 'bg-[#070b19] border border-indigo-950 text-slate-400 hover:text-white hover:bg-[#121c45]'
                }`}
              >
                {game.shortName || game.name}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-indigo-950/80 text-xs">
            <span className="text-slate-400 font-medium mr-1 text-[11px] uppercase tracking-wider font-mono">Category:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-cyan-600 text-white font-semibold shadow-sm shadow-cyan-950/50'
                  : 'bg-[#070b19] border border-indigo-950 text-slate-400 hover:text-white hover:bg-[#121c45]'
              }`}
            >
              All Types
            </button>
            {CATEGORIES.filter(c => c.id !== 'randomizers').map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-600 text-white font-semibold shadow-sm shadow-cyan-950/50'
                    : 'bg-[#070b19] border border-indigo-950 text-slate-400 hover:text-white hover:bg-[#121c45]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Results Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
                onNavigateToGame={(gameSlug) => onNavigate(`/games?game=${gameSlug}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] space-y-3">
            <p className="text-base text-[var(--text)] font-medium">No tools found matching your active filters.</p>
            <p className="text-xs text-[var(--muted)]">Try adjusting your search query, or reset game and category filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGame('all');
                setSelectedCategory('all');
              }}
              className="mt-2 px-4 py-1.5 text-xs font-semibold text-violet-400 bg-[#070b19] border border-indigo-900/60 hover:bg-[#121c45] hover:border-violet-500/50 rounded-lg transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
