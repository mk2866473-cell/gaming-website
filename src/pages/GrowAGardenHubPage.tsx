/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Sprout, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../data/gamesAndTools';
import HubCodesBanner from '../components/HubCodesBanner';

interface GrowAGardenHubPageProps {
  onNavigate: (path: string) => void;
}

export default function GrowAGardenHubPage({ onNavigate }: GrowAGardenHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const growTools = useMemo(() => {
    return TOOLS.filter(
      (t) => t.gameId === 'growagarden' || t.tags.includes('grow a garden')
    );
  }, []);

  const filteredTools = useMemo(() => {
    return growTools.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [growTools, searchQuery]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Grow a Garden', path: '/games/grow-a-garden' }
  ];

  const faqs = [
    {
      q: 'How is crop value calculated in Roblox Grow a Garden?',
      a: 'Value = round( BaseValue × max(Weight ÷ BaseWeight, 0.95)² × Variant × max(1, 1 + Σ(Env − 1)) × (1 + FriendBoost%) × Quantity ). Environmental mutations add inside the bracket, while weight scaling uses a quadratic ratio capped at minimum 0.95.'
    },
    {
      q: 'How does environmental mutation stacking work?',
      a: 'Each environmental mutation adds its multiplier minus 1 into the environmental bracket sum Σ(Env − 1). For example, Shocked (×100) contributes +99, and Celestial (×120) contributes +119, giving a bracket of 1 + 99 + 119 = ×219.'
    },
    {
      q: 'What is the Wet + Chilled fusion rule?',
      a: 'If a crop receives both Wet (×2) and Chilled (×2) environmental mutations, they fuse into Frozen (×10). Frozen is counted once with a ×10 multiplier (+9 in the bracket sum) and Wet/Chilled are ignored.'
    }
  ];

  return (
    <div className="space-y-8 font-sans text-slate-100">
      <SEOHead
        title="Grow a Garden Calculators & Tools – Roblox Crop Value & Mutation Multipliers"
        description="Verified Roblox Grow a Garden calculators: Calculate exact crop Sheckle sell values, weight scaling factors, variant multipliers, environmental mutation brackets, and friend boost bonuses."
        canonicalPath="/games/grow-a-garden"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Dynamic Game Codes Banner */}
      <HubCodesBanner hubPath="/games/grow-a-garden" onNavigate={onNavigate} />

      {/* Breadcrumb & Hero Header */}
      <div>
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <Sprout className="w-7 h-7 text-emerald-400" />
            </div>
            <div className="space-y-2 min-w-0">
              <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
                Grow a Garden Calculators & Tools
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-3xl">
                Calculate crop values in Sheckles, weight scaling ratios, variant multipliers, environmental mutation stacking brackets, and friend boost bonuses.
              </p>
              <p className="text-xs font-mono text-[var(--muted)] tabular-nums">
                {growTools.length} tools
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Tool Directory */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Search Grow a Garden tools"
            placeholder="Search Grow a Garden crop value calculator, mutation stacking..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-[12px] pl-10 pr-4 py-3 text-xs text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => (
              <React.Fragment key={tool.id}>
                {idx === 3 && <div className="col-span-full"><AdLayout.HubInFeed /></div>}
                <ToolCard
                  tool={tool}
                  onSelectTool={(slug) => onNavigate('/tools/' + slug)}
                />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-zinc-500 bg-zinc-900/40 border border-zinc-800 rounded-xl">
            No Grow a Garden tools found matching your query.
          </div>
        )}
      </div>

      {/* Verified Strategy FAQ */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <HelpCircle className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Grow a Garden Strategy & Formula FAQs</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-950/60">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-zinc-200 hover:text-white cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-[var(--muted)]" />}
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
