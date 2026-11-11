/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, ShieldCheck, Swords, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../data/gamesAndTools';
import { SkIcon } from '../components/GameIcons';
import HubCodesBanner from '../components/HubCodesBanner';

interface SevenKnightsHubPageProps {
  onNavigate: (path: string) => void;
}

export default function SevenKnightsHubPage({ onNavigate }: SevenKnightsHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const skTools = useMemo(() => {
    return TOOLS.filter(
      (t) => t.gameId === 'sk' || t.tags.includes('seven knights rebirth')
    );
  }, []);

  const filteredTools = useMemo(() => {
    return skTools.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [skTools, searchQuery]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Seven Knights Re:BIRTH', path: '/seven-knights-rebirth' }
  ];

  const faqs = [
    {
      q: 'How does the Seven Knights Re:BIRTH damage formula work?',
      a: 'Damage is calculated from Total Attack multiplied by Skill Damage %, modified by Critical Damage and Damage Amplification buffs, and divided by the target Armor rating reduction formula with defense penetration accounted for.'
    },
    {
      q: 'How does the 5v5 team builder position formation buffs?',
      a: 'Formations like Back 1 / Front 4 (Sniper Formation) provide +100% Backline Attack power, while Balance 2 / 3 divides offensive and defensive mitigation across DPS carries and frontline guardians like Rudy.'
    },
    {
      q: 'What is the hard pity threshold on Seven Knights Re:BIRTH banners?',
      a: 'Standard rate-up banners feature an 80-summon guarantee where players obtain the featured hero guaranteed if not pulled naturally through the 0.8% base rate.'
    }
  ];

  return (
    <div className="space-y-8 font-sans text-slate-100">
      <SEOHead
        title="Seven Knights Re:BIRTH Tools Hub 2026 – Damage Calc, Team Builder & Gacha Planner"
        description="Suite of 6 Seven Knights Re:BIRTH interactive tactical tools: Damage Calculator, Gear Sell/Keep Valuator, 5v5 Team Builder, Ruby Income Planner, Shop Bundle Optimizer, and Gacha Pity Simulator."
        canonicalPath="/seven-knights-rebirth"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Dynamic Game Codes Banner */}
      <HubCodesBanner hubPath="/games/seven-knights-rebirth" onNavigate={onNavigate} />

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950/70 via-zinc-900 to-black border border-blue-500/30 p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="relative z-10 space-y-4">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center p-3 shadow-xl shrink-0">
              <SkIcon className="w-full h-full" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400">
                  Seven Knights Tactical Command
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-zinc-400">6 Strategy Engines</span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-emerald-400">Re:BIRTH Engine Verified</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Seven Knights Re:BIRTH <span className="text-blue-400">Tactical Suite</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mt-1 leading-relaxed">
                Optimize skill damage, draft top-tier 5v5 arena formations, evaluate mythical gear rolls, manage ruby pity budgets, and analyze shop bundle value.
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
            placeholder="Search Seven Knights damage calculator, team builder, gear manager, ruby planner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
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
            No Seven Knights tools found matching your query.
          </div>
        )}
      </div>

      {/* Verified Strategy FAQ */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <HelpCircle className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white">Seven Knights Re:BIRTH Strategy FAQs</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-950/60">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-zinc-200 hover:text-white cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-blue-400" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
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
