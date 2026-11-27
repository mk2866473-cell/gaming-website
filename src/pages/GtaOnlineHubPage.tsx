/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../data/gamesAndTools';
import { getGameIcon } from '../components/GameIcons';
import HubCodesBanner from '../components/HubCodesBanner';

interface GtaOnlineHubPageProps {
  onNavigate: (path: string) => void;
}

export default function GtaOnlineHubPage({ onNavigate }: GtaOnlineHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const gtaTools = useMemo(() => {
    return TOOLS.filter((t) => t.gameId === 'gtaonline');
  }, []);

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return gtaTools;
    return gtaTools.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [gtaTools, searchQuery]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'GTA Online', path: '/games/gta-online' }
  ];

  const faqs = [
    {
      q: 'How is Tony\'s cut calculated on Nightclub Warehouse sales in GTA Online?',
      a: 'Tony takes 10% of the gross Nightclub Warehouse sale value, capped at $100,000 maximum. Any gross sale above $1,000,000 pays exactly $100,000 to Tony.'
    },
    {
      q: 'What are the top 5 Nightclub technicians to assign with the Equipment Upgrade?',
      a: 'Assigning technicians to South American Imports (MC Cocaine Lockup), Pharmaceutical Research (MC Meth Lab), Cash Creation (MC Counterfeit Cash Factory), Cargo and Shipments (CEO Special Cargo / Hangar), and Sporting Goods (Bunker) yields $50,496 of stock per active hour.'
    },
    {
      q: 'How much does a full 160-unit Acid Lab batch earn with the Equipment Upgrade and named product?',
      a: 'With the $250,000 Equipment Upgrade and named product ($2,199/unit), 160 units sell for $351,840 gross. Buying 160 supply units at $600 each ($96,000) yields $255,840 net profit over 240 minutes ($63,960/hour).'
    }
  ];

  return (
    <div className="space-y-8 font-sans text-slate-100">
      <SEOHead
        title="GTA Online Calculators & Tools – Nightclub, Acid Lab, Bunker, MC, Cargo & Heists"
        description="Verified Title Update 1.73 GTA Online calculators and utilities: Nightclub Warehouse, Acid Lab, Cayo Perico, Heist Splits, Business ROI, Cooldown Planner, Bunker, MC Businesses, Special Cargo, Hangar Air Freight, and Vehicle Cargo."
        canonicalPath="/games/gta-online"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Dynamic Game Codes Banner */}
      <HubCodesBanner hubPath="/games/gta-online" onNavigate={onNavigate} />

      {/* Breadcrumb & Hero Header */}
      <div>
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
              {getGameIcon('gtaonline', 'w-7 h-7')}
            </div>
            <div className="space-y-2 min-w-0">
              <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
                GTA Online Calculators &amp; Tools
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-3xl">
                Calculate Nightclub Warehouse, Acid Lab, Cayo Perico, Heist splits, Business ROI, Cooldowns, Bunker, MC Businesses, Special Cargo, Hangar Air Freight, and Vehicle Cargo payouts using standard Title Update 1.73 base values.
              </p>
              <p className="text-xs font-mono text-[var(--muted)] tabular-nums">
                {gtaTools.length} tools · Title Update 1.73
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
            aria-label="Search GTA Online tools"
            placeholder="Search GTA Online tools (Nightclub, Bunker, MC, Special Cargo, Hangar, Vehicle Cargo, Cayo Perico...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-[12px] pl-10 pr-4 py-3 text-xs text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => (
              <React.Fragment key={tool.id}>
                {idx === 3 && (
                  <div className="col-span-full">
                    <AdLayout.HubInFeed />
                  </div>
                )}
                <ToolCard
                  tool={tool}
                  onSelectTool={(slug) => onNavigate('/tools/' + slug)}
                />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-zinc-500 bg-zinc-900/40 border border-zinc-800 rounded-xl">
            No GTA Online tools found matching your query.
          </div>
        )}
      </div>

      {/* Verified Strategy FAQ */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <HelpCircle className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">GTA Online Business FAQs (Title Update 1.73)</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-950/60">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-zinc-200 hover:text-white cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[var(--muted)]" />
                )}
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
