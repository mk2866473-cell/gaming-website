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
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-rose-950/40 via-zinc-900 to-red-950/40 border border-rose-500/20 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-bold text-rose-400">
              <PokeballIcon className="w-4 h-4 text-rose-400" />
              Verified Pokémon GO Theorycrafting Suite
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3 sm:gap-4 flex-wrap">
              <span className="p-2 sm:p-2.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 shadow-lg inline-flex items-center justify-center shrink-0">
                <PokeballIcon className="w-8 h-8 sm:w-11 sm:h-11 text-rose-400" />
              </span>
              <span>Pokémon GO CP, IV, PvP & Stardust Suite</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Official CP multiplier formulas, 100% IV appraisal evaluations, Great/Ultra League stat product rankings, 
              Raid boss TTW simulators, and step-by-step Level 50 XL Candy power-up budgeting.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">CPM Cap</div>
                <div className="text-lg font-bold text-white font-mono">Level 50 (51 Buddy)</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">PvP Leagues</div>
                <div className="text-lg font-bold text-rose-400 font-mono">1500 / 2500 CP</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">Client Speed</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">Instant 0ms</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">Game Parity</div>
                <div className="text-lg font-bold text-blue-400 font-mono">100% Verified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search CP, IV, PvP, evolution, stardust, raid damage..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 transition-colors"
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
              <div
                onClick={() => onNavigate(tool.canonicalPath)}
                className="group p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-rose-500/50 hover:bg-zinc-900 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl hover:shadow-rose-500/5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all">
                      {POKEMON_TOOL_ICONS[tool.id] || <PokeballIcon className="w-5 h-5 text-rose-400 group-hover:text-white" />}
                    </div>
                    {tool.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-mono">Client-Side Instant</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-rose-400 group-hover:translate-x-1 transition-transform">
                    Launch Tool
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Hub Above Footer Banner Ad Slot */}
        <AdLayout.HubAboveFooter />
      </div>
    </>
  );
}
