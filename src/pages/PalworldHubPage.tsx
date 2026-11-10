/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, ArrowRight, ShieldCheck, Zap, 
  Target, Award, Heart, Sword, Layers, Box, Wrench, Users, Hammer, GitMerge, Cpu,
  Dna, Activity, Workflow
} from 'lucide-react';
import { TOOLS } from '../data/gamesAndTools';
import SEOHead from '../components/SEOHead';
import { PalSphereIcon } from '../components/GameIcons';
import AdLayout from '../components/ads/AdLayout';

interface PalworldHubPageProps {
  onNavigate: (path: string) => void;
}

const PALWORLD_TOOL_ICONS: Record<string, React.ReactNode> = {
  'palworld-breeding-calculator': <Dna className="w-5 h-5" />,
  'palworld-reverse-breeding-calculator': <GitMerge className="w-5 h-5" />,
  'palworld-breeding-path-finder': <Workflow className="w-5 h-5" />,
  'palworld-iv-calculator': <Activity className="w-5 h-5" />,
  'palworld-damage-calculator': <Sword className="w-5 h-5" />,
  'palworld-capture-calculator': <Target className="w-5 h-5" />,
  'palworld-work-speed-calculator': <Zap className="w-5 h-5" />,
  'palworld-base-team-calculator': <Users className="w-5 h-5" />,
  'palworld-crafting-calculator': <Hammer className="w-5 h-5" />,
  'palworld-material-calculator': <Box className="w-5 h-5" />,
  'palworld-condensation-calculator': <Layers className="w-5 h-5" />,
  'palworld-tech-point-calculator': <Cpu className="w-5 h-5" />
};

export default function PalworldHubPage({ onNavigate }: PalworldHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const palworldTools = useMemo(() => {
    return TOOLS.filter(tool => tool.gameId === 'palworld');
  }, []);

  const filteredTools = useMemo(() => {
    return palworldTools.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        selectedCategory === 'all' || tool.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [palworldTools, searchQuery, selectedCategory]);

  const categories = [
    { id: 'all', name: 'All Tools', count: palworldTools.length },
    { id: 'calculators', name: 'Breeding & Stats', count: palworldTools.filter(t => t.categoryId === 'calculators').length },
    { id: 'trackers', name: 'Base & Automation', count: palworldTools.filter(t => t.categoryId === 'trackers').length }
  ];

  return (
    <>
      <SEOHead
        title="Palworld Calculators & Breeding Tools – Verified v0.3.5 Mechanics"
        description="Comprehensive Palworld calculators: official CombiRank breeding outcomes, reverse breeding parents, 0-30% IV appraisal, damage math, capture rates, and base team automation."
        canonicalPath="/games/palworld"
      />

      <div className="space-y-12">
        {/* Hub Top Banner Ad Slot */}
        <AdLayout.HubTop currentPath="/palworld" />

        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('/tools')} className="hover:text-white transition-colors">Games</button>
          <span>/</span>
          <span className="text-cyan-400">Palworld Tools</span>
        </nav>

        {/* Hero Section */}
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-cyan-950/40 via-zinc-900 to-emerald-950/40 border border-cyan-500/20 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400">
              <PalSphereIcon className="w-4 h-4 text-cyan-400" />
              Palworld v0.3.5 & Sakurajima Verified Tools
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3 sm:gap-4 flex-wrap">
              <span className="p-2 sm:p-2.5 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 shadow-lg inline-flex items-center justify-center shrink-0">
                <PalSphereIcon className="w-8 h-8 sm:w-11 sm:h-11 text-cyan-400" />
              </span>
              <span>Palworld Breeding, IV & Base Automation Suite</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Official CombiRank breeding calculators, parent-to-child combinations, reverse breeding lookups, 
              0-30% IV appraisal evaluations, combat damage mathematics, and base worker suitability optimizers.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">Game Version</div>
                <div className="text-lg font-bold text-white font-mono">v0.3.5 / 1.0+</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">Breeding System</div>
                <div className="text-lg font-bold text-cyan-400 font-mono">CombiRank</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">Calculation Speed</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">Instant 0ms</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">Formulas</div>
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
              placeholder="Search breeding, IV, reverse, damage, capture, work speed..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span>{category.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  selectedCategory === category.id ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
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
                className="group p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-900 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl hover:shadow-cyan-500/5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                      {PALWORLD_TOOL_ICONS[tool.id] || <PalSphereIcon className="w-5 h-5 text-cyan-400 group-hover:text-black" />}
                    </div>
                    {tool.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-mono">Client-Side Instant</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
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
