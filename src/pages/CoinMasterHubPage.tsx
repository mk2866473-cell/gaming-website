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
        canonicalPath="/coin-master"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/70 via-zinc-900 to-black border border-amber-500/30 p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="relative z-10 space-y-4">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-3 shadow-xl shrink-0">
              <CmIcon className="w-full h-full" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                  Viking Raid Suite
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-zinc-400">5 Tactical Engines</span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-emerald-400">100% Free & Verified</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Coin Master <span className="text-amber-400">Toolkit & Strategy Hub</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mt-1 leading-relaxed">
                Maximize village construction efficiency, claim daily verified spin links, complete high-yield card sets, and optimize pet timers for legendary raids.
              </p>
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
            placeholder="Search Coin Master village costs, card tracker, pet timer, spin links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
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
                {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
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
