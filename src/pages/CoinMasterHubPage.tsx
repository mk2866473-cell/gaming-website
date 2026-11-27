/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { Search, ShieldCheck, Zap, Layers, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import ToolCard from '../components/ToolCard';
import { COIN_MASTER_TOOLS } from '../data/coinMasterData';
import { CmIcon } from '../components/GameIcons';
import HubCodesBanner from '../components/HubCodesBanner';

interface CoinMasterHubPageProps {
  onNavigate: (path: string) => void;
}

export default function CoinMasterHubPage({ onNavigate }: CoinMasterHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredTools = useMemo(() => {
    return COIN_MASTER_TOOLS.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [searchQuery]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Coin Master', path: '/coin-master' }
  ];

  const faqs = [
    {
      q: 'How are Coin Master village construction costs calculated?',
      a: 'Village upgrade costs follow exponential tier scaling with a base village cost curve multiplied by 5 buildings per village and 5 star upgrades per building, adjusting for 20% Village Master discount events.'
    },
    {
      q: 'Are the Coin Master free spin links updated daily?',
      a: 'Yes, our free spin links aggregate verified daily rewards released by Moon Active across official social channels, providing 25-50 spins and millions of coins with zero verification walls.'
    },
    {
      q: 'Which pet should be fed during high spin multiplier events?',
      a: 'Foxy is always prioritized during Raid events to guarantee digging up the 4th chest with up to 108% bonus coins. Tiger should be active during Attack Madness events for maximum shield-piercing payouts.'
    }
  ];

  return (
    <div className="space-y-8 font-sans text-slate-100">
      <SEOHead
        title="Coin Master Tools Hub 2026 – Village Cost Calculator, Spins & Card Tracker"
        description="Suite of 5 verified Coin Master interactive tools: Village Cost Calculator, Verified Free Spin Links, Card Set Tracker, Event Timer Planner, and Companion Pet Timer."
        canonicalPath="/games/coin-master"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Dynamic Game Codes Banner */}
      <HubCodesBanner hubPath="/games/coin-master" onNavigate={onNavigate} />

      {/* Unified Hub Header */}
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8 flex items-start gap-4">
          <div className="w-12 h-12 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
            <CmIcon className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
              Coin Master Toolkit & Strategy Hub
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed">
              Maximize village construction efficiency, claim daily verified spin links, complete high-yield card sets, and optimize pet timers for legendary raids.
            </p>
            <div className="text-xs font-mono text-[var(--muted)] tabular-nums">
              {COIN_MASTER_TOOLS.length} tools
            </div>
          </div>
        </div>
      </div>

      {/* Search & Tool Directory */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Search Coin Master tools"
            placeholder="Search Coin Master village costs, card tracker, pet timer, spin links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-[var(--muted)] focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

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
      </div>

      {/* Verified Strategy FAQ */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Coin Master Tactical FAQs</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-950/60">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-zinc-200 hover:text-white cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-[var(--muted)]" />}
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
