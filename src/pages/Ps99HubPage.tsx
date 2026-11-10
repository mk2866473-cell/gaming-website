/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Search, Sliders, ArrowRight, Star, ShieldCheck, Zap, 
  Coins, Layers, TrendingUp, Trophy, Diamond, HelpCircle, ChevronDown, 
  ChevronUp, Lightbulb, Binary, Compass, ArrowRightLeft, ShieldAlert
} from 'lucide-react';
import { TOOLS, ToolItem } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import { getGameIcon } from '../components/GameIcons';

interface Ps99HubPageProps {
  onNavigate: (path: string) => void;
}

export default function Ps99HubPage({ onNavigate }: Ps99HubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const ps99Tools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'ps99');
  }, []);

  const categories = [
    { id: 'all', name: 'All PS99 Tools (8)' },
    { id: 'trading', name: 'Trading & Values (WFL, RAP Alerts)' },
    { id: 'farming', name: 'Farming & Economy (Daycare, Diamonds, Enchants)' },
    { id: 'progression', name: 'Progression & Clan (Mastery, Egg Hatching, Clan Battle)' }
  ];

  const filteredTools = useMemo(() => {
    return ps99Tools.filter(tool => {
      const matchQuery =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchCategory = true;
      if (selectedCategory === 'trading') {
        matchCategory = ['ps99-trade-calculator', 'ps99-rap-tracker'].includes(tool.id);
      } else if (selectedCategory === 'farming') {
        matchCategory = ['ps99-exclusive-daycare-calculator', 'ps99-diamond-grind-optimizer', 'ps99-enchant-builder'].includes(tool.id);
      } else if (selectedCategory === 'progression') {
        matchCategory = ['ps99-egg-hatching-calculator', 'ps99-mastery-calculator', 'ps99-clan-battle-calculator'].includes(tool.id);
      }

      return matchQuery && matchCategory;
    });
  }, [ps99Tools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Pet Simulator 99 Hub', path: '/ps99' }
  ];

  const ps99Faqs = [
    {
      question: 'What does WFL stand for in Pet Simulator 99?',
      answer: 'WFL stands for Win, Fair, or Lose. It is the community trading standard used to evaluate whether an exchange favors the player (+10% or more value = WIN), is balanced within market variance (±10% = FAIR), or results in a deficit (≤ -10% = LOSE).'
    },
    {
      question: 'Why is True Market Value different from booth RAP in PS99?',
      answer: 'RAP (Recent Average Price) can be artificially manipulated by bad actors who sell obscure items to alt accounts at astronomical prices in trading booths. True Market Value reflects genuine trading floor liquidity, actual buyer demand, and verified community values.'
    },
    {
      question: 'How do Golden, Rainbow, and Shiny variants affect pet values?',
      answer: 'Golden variants typically multiply base value by 1.25× (+25%), Rainbow variants multiply by 1.75× (+75%), Shiny variants multiply by 1.60× (+60%), and ultra-rare Shiny Rainbow variants yield a massive 2.80× (+180%) multiplier.'
    },
    {
      question: 'What is the baseline trading currency in Pet Simulator 99?',
      answer: 'Diamonds (Gems) are the primary currency, while the Huge Happy Rock and Huge Hell Rock serve as the baseline unit of account for trading high-tier Huges, Titanics, and top enchants.'
    },
    {
      question: 'Which enchants are essential for passive diamond farming?',
      answer: 'Chest Mimic combined with Super Magnet and Diamond Gift Hunter provides the highest sustainable diamond and gift bag farming rate in the final zone.'
    }
  ];

  const relatedRobloxTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'roblox' || t.tags.includes('roblox')).slice(0, 3);
  }, []);

  return (
    <>
      <SEOHead
        title="Pet Simulator 99 Calculators & Tools – WFL, RAP Tracker & Values 2026"
        description="Comprehensive suite of 8 Pet Simulator 99 calculators: WFL Trade Calculator, Exclusive Daycare Earnings, Enchant Builder & Diminishing Returns, Egg Hatching Odds, Mastery Planner, RAP Price Alerts, Clan Battles, and Diamond Grind Optimizer."
        canonicalPath="/ps99"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Hub Top Banner Ad Slot */}
        <AdLayout.HubTop currentPath="/ps99" />

        {/* Breadcrumb & Hero Header */}
        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="relative rounded-3xl bg-gradient-to-br from-sky-950/70 via-slate-900 to-indigo-950/80 border border-sky-500/30 p-6 sm:p-10 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-500/40 text-sky-300 text-xs font-mono font-bold">
                {getGameIcon('ps99', 'w-4 h-4')}
                <span>Dedicated Pet Simulator 99 Engineering Suite • 2026 Meta</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="p-2 sm:p-2.5 rounded-2xl bg-sky-950/80 border border-sky-500/40 shadow-lg inline-flex items-center justify-center shrink-0">
                  {getGameIcon('ps99', 'w-8 h-8 sm:w-11 sm:h-11')}
                </span>
                <span>Pet Simulator 99 Calculators & Utilities</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Complete suite of 8 professional Pet Simulator 99 tools: WFL trade evaluator, exclusive daycare passive diamonds, enchant diminishing returns, egg hatching odds, mastery progression, live RAP scam radar, clan battle point goals, and diamond farming optimizer.
              </p>

              {/* Quick Search */}
              <div className="pt-2 max-w-lg">
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl shadow-lg">
                  <Search className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search WFL, daycare, enchants, egg odds, mastery, RAP, clan..."
                    className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-xs text-slate-400 hover:text-white">
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/60 shadow-lg shadow-sky-950/30 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Pet Simulator 99 Tools Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <span>Available Pet Simulator 99 Tools ({filteredTools.length})</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              100% Client-Side Engine
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => (
              <React.Fragment key={tool.id}>
                {idx === 7 && <AdLayout.HubInFeed />}
                <ToolCard
                  tool={tool}
                  onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
                />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Key Mechanics & Trading Highlights Section */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Pet Simulator 99 Market & Farming Rules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>RAP Scam Defense</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Recent Average Price (RAP) can be artificially inflated when scammers buy their own items in booths for billions. Always cross-reference demand ratings (1-10) before trading high-RAP exclusives.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Star className="w-4 h-4" />
                <span>Variant Multipliers</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Golden adds +25% (1.25x), Rainbow adds +75% (1.75x), Shiny adds +60% (1.6x), and Shiny Rainbow adds a massive +180% (2.8x) value and breakable damage bonus.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Coins className="w-4 h-4" />
                <span>Passive Daycare Revenue</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Exclusive Daycare slots hold Huge and Titanic pets safely without loss risk, providing predictable daily diamond yields that pay off slot unlock costs within ~12 days.
              </p>
            </div>
          </div>
        </section>



        {/* Frequently Asked Questions */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Frequently Asked Questions ({ps99Faqs.length})
              </h2>
            </div>
            <span className="text-[11px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
              Updated 2026
            </span>
          </div>

          <div className="space-y-3">
            {ps99Faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-sky-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/80">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Hub Above Footer Banner Ad Slot */}
        <AdLayout.HubAboveFooter />

        {/* Related Roblox Tools */}
        {relatedRobloxTools.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-sky-400" />
              Related Roblox Economy & Trading Utilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedRobloxTools.map(relTool => (
                <ToolCard
                  key={relTool.id}
                  tool={relTool}
                  onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
