/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, ArrowRight, ShieldCheck, Zap, 
  Target, Award, Heart, Sword, Layers, Box, Wrench, Users, Hammer, GitMerge, Cpu,
  Dna, Activity, Workflow, Dices, Egg
} from 'lucide-react';
import { TOOLS } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
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
  'palworld-tech-point-calculator': <Cpu className="w-5 h-5" />,
  'palworld-passive-inheritance-calculator': <Dices className="w-5 h-5" />,
  'palworld-egg-incubation-calculator': <Egg className="w-5 h-5" />
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
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8 space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <PalSphereIcon className="w-7 h-7 text-cyan-400" />
            </div>
            <div className="space-y-2 min-w-0">
              <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
                Palworld Breeding, IV & Base Automation Suite
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-3xl">
                Official CombiRank breeding calculators, parent-to-child combinations, reverse breeding lookups, 
                0-30% IV appraisal evaluations, combat damage mathematics, and base worker suitability optimizers.
              </p>
              <p className="text-xs font-mono text-[var(--muted)] tabular-nums">
                {palworldTools.length} tools
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <div className="text-xs text-[var(--text-soft)] font-medium">Game Version</div>
              <div className="text-lg font-bold text-[var(--text)] font-mono">v0.3.5 / 1.0+</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <div className="text-xs text-[var(--text-soft)] font-medium">Breeding System</div>
              <div className="text-lg font-bold text-cyan-400 font-mono">CombiRank</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <div className="text-xs text-[var(--text-soft)] font-medium">Calculation Speed</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">Instant 0ms</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <div className="text-xs text-[var(--text-soft)] font-medium">Formulas</div>
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
              aria-label="Search Palworld tools"
              placeholder="Search breeding, IV, reverse, damage, capture, work speed..."
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
