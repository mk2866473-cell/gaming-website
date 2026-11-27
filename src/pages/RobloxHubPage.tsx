/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Gamepad2, Search, Sliders, ArrowRight, Star, ShieldCheck, Zap, 
  DollarSign, Sparkles, Trophy, Percent, TrendingUp, Users, Sword, Layers
} from 'lucide-react';
import { TOOLS, ToolItem } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { getGameIcon } from '../components/GameIcons';
import AdLayout from '../components/ads/AdLayout';
import HubCodesBanner from '../components/HubCodesBanner';

interface RobloxHubPageProps {
  onNavigate: (path: string) => void;
}

export default function RobloxHubPage({ onNavigate }: RobloxHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  const robloxTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'roblox');
  }, []);

  const categories = [
    { id: 'all', name: 'All Roblox Tools' },
    { id: 'ps99', name: 'Pet Simulator 99 (PS99 Trade WFL)' },
    { id: 'economy', name: 'Robux & DevEx (Tax, USD Value, DevEx Cashout)' },
    { id: 'bloxfruits', name: 'Blox Fruits (Values, XP, Stats, Titles)' },
    { id: 'developer', name: 'Studio Developer (Gamepasses, Group Payouts, Team Splits, Premium)' }
  ];

  const filteredTools = useMemo(() => {
    return robloxTools.filter(tool => {
      const matchQuery =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchCategory = true;
      if (selectedSubCategory === 'ps99') {
        matchCategory = tool.id.includes('ps99') || tool.tags.includes('ps99');
      } else if (selectedSubCategory === 'economy') {
        matchCategory = ['robux-tax-calculator', 'robux-to-usd-calculator', 'roblox-devex-calculator'].includes(tool.id);
      } else if (selectedSubCategory === 'bloxfruits') {
        matchCategory = tool.id.startsWith('blox-fruits');
      } else if (selectedSubCategory === 'developer') {
        matchCategory = ['roblox-gamepass-revenue-calculator', 'roblox-group-payout-calculator', 'roblox-premium-payout-calculator'].includes(tool.id);
      }

      return matchQuery && matchCategory;
    });
  }, [robloxTools, searchQuery, selectedSubCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Roblox Tools', path: '/roblox' }
  ];

  return (
    <>
      <SEOHead
        title="Roblox Calculators & Blox Fruits Tools – GamingToolsHub"
        description="Comprehensive suite of 10+ Roblox calculators: Robux Tax (30%), DevEx USD Cashout ($0.0038/R$), Blox Fruits Trading Values & 40% Beli rule, XP Leveling to 2600, Stat builder, Gamepass Revenue & Team Splits."
        canonicalPath="/games/roblox"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Hub Top Banner Ad Slot */}
        <AdLayout.HubTop currentPath="/roblox" />

        {/* Dynamic Game Codes Banner */}
        <HubCodesBanner hubPath="/games/roblox" onNavigate={onNavigate} />

        {/* Breadcrumb & Hero Header */}
        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                {getGameIcon('roblox', 'w-7 h-7')}
              </div>
              <div className="space-y-2 min-w-0">
                <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
                  Roblox & Pet Simulator 99 Calculators
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-3xl">
                  Pet Simulator 99 Trade Value & WFL calculator, official 30% Robux tax calculations, Developer Exchange (DevEx) conversions, and verified Blox Fruits trade fairness & stat planners.
                </p>
                <p className="text-xs font-mono text-[var(--muted)] tabular-nums">
                  {robloxTools.length} tools
                </p>
              </div>
            </div>

            {/* Quick Search */}
            <div className="max-w-lg">
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-[12px] focus-within:border-[var(--primary)] transition-colors">
                <Search className="w-4 h-4 text-[var(--primary-light)] flex-shrink-0" />
                <input
                  type="text"
                  aria-label="Search Roblox tools"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search PS99 trade, huge cat, Robux tax, devex, blox fruits..."
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
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/60 shadow-lg shadow-rose-950/30 font-bold'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Roblox Tools Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              Available Roblox Utilities ({filteredTools.length})
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

        {/* Economy & Blox Fruits Mechanics Guide */}
        <section className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
            <ShieldCheck className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-bold text-white">
              Official Roblox Economy & Game Rules Handled
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-2">
              <span className="font-bold text-rose-400 text-sm block">Roblox Creator Economy Standards</span>
              <p className="text-zinc-400">
                • <strong>Marketplace Fee:</strong> Roblox deducts 30% from all avatar item, gamepass, and developer product sales. Creators keep exactly 70%.
              </p>
              <p className="text-zinc-400">
                • <strong>DevEx Exchange Rate:</strong> Official rate is $0.0038 USD per 1 Earned Robux ($380 per 100,000 R$).
              </p>
              <p className="text-zinc-400">
                • <strong>Pending Escrow:</strong> In-game revenue is held for 3–7 business days before clearing into group or personal accounts.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-2">
              <span className="font-bold text-amber-400 text-sm block">Blox Fruits Meta Rules</span>
              <p className="text-zinc-400">
                • <strong>Trade Difference Cap:</strong> In-game trade tables block trades where Beli values differ by more than 40% of the higher offer.
              </p>
              <p className="text-zinc-400">
                • <strong>Max Level:</strong> Level cap is 2600 with 7,800 total stat points (max 2600 per individual attribute).
              </p>
              <p className="text-zinc-400">
                • <strong>Trading Benchmarks:</strong> Track real community trading values for Kitsune, Dragon Rework, Leopard, and Dough.
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
