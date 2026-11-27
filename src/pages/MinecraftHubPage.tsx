/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Box, Search, Sliders, ArrowRight, Star, ShieldCheck, Zap, 
  CircleDot, DoorOpen, Compass, Wrench, Layers, Flame, Sword, 
  SlidersHorizontal, Check
} from 'lucide-react';
import { TOOLS, ToolItem } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

import { getGameIcon } from '../components/GameIcons';
import AdLayout from '../components/ads/AdLayout';

interface MinecraftHubPageProps {
  onNavigate: (path: string) => void;
}

export default function MinecraftHubPage({ onNavigate }: MinecraftHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  const minecraftTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'minecraft');
  }, []);

  const categories = [
    { id: 'all', name: `All Minecraft Tools (${minecraftTools.length})` },
    { id: 'generators', name: 'Building & Geometry (Circle, Sphere, Dome, Oval)' },
    { id: 'converters', name: 'Portals & Coordinates (Nether 8:1, Distance)' },
    { id: 'calculators', name: 'Mechanics & Combat (XP, Anvil, Damage, Redstone)' },
    { id: 'trackers', name: 'Storage & Efficiency (Beacon, Fuel, Stacks)' }
  ];

  const filteredTools = useMemo(() => {
    return minecraftTools.filter(tool => {
      const matchQuery =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory = selectedSubCategory === 'all' || tool.categoryId === selectedSubCategory;
      return matchQuery && matchCategory;
    });
  }, [minecraftTools, searchQuery, selectedSubCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Minecraft Tools', path: '/minecraft' }
  ];

  return (
    <>
      <SEOHead
        title="Minecraft Calculators & Blueprint Generators – GamingToolsHub"
        description="Comprehensive suite of 15+ Minecraft calculators: 3D Sphere & Dome generator, Circle blueprints, Nether portal linker, Distance time calculator, XP planner, Anvil penalty optimizer, Beacon & Redstone tick math."
        canonicalPath="/games/minecraft"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Hub Top Banner Ad Slot */}
        <AdLayout.HubTop currentPath="/minecraft" />

        {/* Breadcrumb & Hero Header */}
        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                {getGameIcon('minecraft', 'w-7 h-7')}
              </div>
              <div className="space-y-2 min-w-0">
                <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
                  Minecraft Calculators & Blueprint Generators
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-3xl">
                  Precision voxel modeling tools, verified game mathematics, and efficiency calculators for survival builders, technical redstone engineers, and PvP fighters.
                </p>
                <p className="text-xs font-mono text-[var(--muted)] tabular-nums">
                  {minecraftTools.length} tools
                </p>
              </div>
            </div>

            {/* Quick Search */}
            <div className="max-w-lg">
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-[12px] focus-within:border-[var(--primary)] transition-colors">
                <Search className="w-4 h-4 text-[var(--primary-light)] flex-shrink-0" />
                <input
                  type="text"
                  aria-label="Search Minecraft tools"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search circle, nether, sphere, damage, fuel..."
                  className="w-full bg-transparent text-xs text-[var(--text)] placeholder-[var(--muted)] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-[var(--text-soft)] hover:text-[var(--text)]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedSubCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedSubCategory === cat.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-lg shadow-emerald-950/30 font-bold'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Minecraft Tools Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              Available Minecraft Utilities ({filteredTools.length})
            </h2>
            <span className="text-xs font-mono text-zinc-400">
              100% Client-Side Engine
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>

        {/* Java vs Bedrock Mechanics Highlight Section */}
        <section className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">
              Java vs. Bedrock Edition Mechanics Handled
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-2">
              <span className="font-bold text-emerald-400 text-sm block">Java Edition Standards</span>
              <p className="text-zinc-400">
                • <strong>Combat:</strong> Attack weapon recharge cooldowns, axe shield disabling (5s), and 1.5× jump critical damage multiplier.
              </p>
              <p className="text-zinc-400">
                • <strong>Redstone:</strong> Quasi-connectivity, 1-tick piston block spitting, and deterministic sub-tick execution.
              </p>
              <p className="text-zinc-400">
                • <strong>Nether Roof:</strong> Build limit extends to Y=256 above the bedrock ceiling (Y=128).
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-2">
              <span className="font-bold text-cyan-400 text-sm block">Bedrock Edition Standards</span>
              <p className="text-zinc-400">
                • <strong>Combat:</strong> Spam clicking supported without cooldown delay; Sharpness enchantment adds +1.25 damage/lvl.
              </p>
              <p className="text-zinc-400">
                • <strong>Redstone:</strong> Soft-inversion, non-deterministic random tick order for simultaneous components, pistons push tile entities.
              </p>
              <p className="text-zinc-400">
                • <strong>Nether Roof:</strong> Hard build limit at Y=128; portals must link below bedrock.
              </p>
            </div>
          </div>
        </section>

        {/* Hub Above Footer Banner Ad Slot */}
        <AdLayout.HubAboveFooter />
      </div>
    </>
  );
}
