/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, Sliders, ArrowRight, ShieldCheck, Zap, 
  Target, Award, Heart, Sword, Layers, Box, Footprints, RefreshCw,
  TrendingUp, Dna, Coins, Activity, Gauge
} from 'lucide-react';
import { TOOLS } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import { PokeballIcon } from '../components/GameIcons';
import AdLayout from '../components/ads/AdLayout';
import HubCodesBanner from '../components/HubCodesBanner';

interface PokemonGoHubPageProps {
  onNavigate: (path: string) => void;
}

const POKEMON_TOOL_ICONS: Record<string, React.ReactNode> = {
  'pokemon-go-cp-calculator': <Gauge className="w-5 h-5" />,
  'pokemon-go-iv-calculator': <Activity className="w-5 h-5" />,
  'pokemon-go-evolution-cp-calculator': <Dna className="w-5 h-5" />,
  'pokemon-go-level-calculator': <TrendingUp className="w-5 h-5" />,
  'pokemon-go-stardust-calculator': <Coins className="w-5 h-5" />,
  'pokemon-go-candy-calculator': <Box className="w-5 h-5" />,
  'pokemon-go-power-up-cost-calculator': <Zap className="w-5 h-5" />,
  'pokemon-go-raid-damage-calculator': <Sword className="w-5 h-5" />,
  'pokemon-go-pvp-calculator': <Award className="w-5 h-5" />,
  'pokemon-go-catch-cp-calculator': <Target className="w-5 h-5" />
};

export default function PokemonGoHubPage({ onNavigate }: PokemonGoHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const pokemonGoTools = useMemo(() => {
    return TOOLS.filter(tool => tool.gameId === 'pokemongo');
  }, []);

  const filteredTools = useMemo(() => {
    return pokemonGoTools.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        selectedCategory === 'all' || tool.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [pokemonGoTools, searchQuery, selectedCategory]);

  const categories = [
    { id: 'all', name: 'All Tools', count: pokemonGoTools.length },
    { id: 'calculators', name: 'Calculators', count: pokemonGoTools.filter(t => t.categoryId === 'calculators').length },
    { id: 'trackers', name: 'Planners', count: pokemonGoTools.filter(t => t.categoryId === 'trackers').length }
  ];

  return (
    <>
      <SEOHead
        title="Pokémon GO Calculators & Tools – CP, IV, PvP & Stardust"
        description="Verified Pokémon GO calculators for trainers: official CPM Combat Power formulas, IV appraisal, Great/Ultra PvP rankers, raid TTW, and stardust budgets."
        canonicalPath="/games/pokemongo"
      />

      <div className="space-y-12">
        {/* Hub Top Banner Ad Slot */}
        <AdLayout.HubTop currentPath="/pokemongo" />

        {/* Dynamic Game Codes Banner */}
        <HubCodesBanner hubPath="/games/pokemongo" onNavigate={onNavigate} />

        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('/tools')} className="hover:text-white transition-colors">Games</button>
          <span>/</span>
          <span className="text-rose-400">Pokémon GO Tools</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8 space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <PokeballIcon className="w-7 h-7 text-rose-400" />
            </div>
            <div className="space-y-2 min-w-0">
              <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
                Pokémon GO CP, IV, PvP & Stardust Suite
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-3xl">
                Official CP multiplier formulas, 100% IV appraisal evaluations, Great/Ultra League stat product rankings, 
                Raid boss TTW simulators, and step-by-step Level 50 XL Candy power-up budgeting.
              </p>
              <p className="text-xs font-mono text-[var(--muted)] tabular-nums">
                {pokemonGoTools.length} tools
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <div className="text-xs text-[var(--text-soft)] font-medium">CPM Cap</div>
              <div className="text-lg font-bold text-[var(--text)] font-mono">Level 50 (51 Buddy)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <div className="text-xs text-[var(--text-soft)] font-medium">PvP Leagues</div>
              <div className="text-lg font-bold text-rose-400 font-mono">1500 / 2500 CP</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <div className="text-xs text-[var(--text-soft)] font-medium">Client Speed</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">Instant 0ms</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <div className="text-xs text-[var(--text-soft)] font-medium">Game Parity</div>
              <div className="text-lg font-bold text-blue-400 font-mono">100% Verified</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              aria-label="Search Pokémon GO tools"
              placeholder="Search CP, IV, PvP, evolution, stardust, raid damage..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span>{category.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  selectedCategory === category.id ? 'bg-black/20 text-white' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, idx) => (
            <React.Fragment key={tool.id}>
              {idx === 9 && <AdLayout.HubInFeed />}
              <ToolCard
                tool={tool}
                onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Hub Above Footer Banner Ad Slot */}
        <AdLayout.HubAboveFooter />
      </div>
    </>
  );
}
