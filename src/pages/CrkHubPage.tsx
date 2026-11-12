/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Users,
  Shield,
  Layers,
  Calculator,
  Clock,
  HelpCircle,
  BookOpen,
  Check,
  Share2,
  ChevronDown,
  ChevronUp,
  Search,
  Award,
  Info
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../data/gamesAndTools';
import { CrkIcon } from '../components/GameIcons';
import HubCodesBanner from '../components/HubCodesBanner';

interface CrkHubPageProps {
  onNavigate: (path: string) => void;
}

export default function CrkHubPage({ onNavigate }: CrkHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter tools for Cookie Run: Kingdom
  const crkTools = useMemo(() => {
    return TOOLS.filter(
      (t) => t.gameId === 'crk' || t.tags.includes('cookie run kingdom') || t.tags.includes('crk')
    );
  }, []);

  const filteredTools = useMemo(() => {
    return crkTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || tool.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [crkTools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Cookie Run: Kingdom', path: '/cookie-run-kingdom' }
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const faqs = [
    {
      question: 'What is the current Meta Arena Team composition in CRK?',
      answer: 'Top Arena comps feature Beast & Ancient tier cookies like Mystic Flour, Golden Cheese, and Frost Queen paired with fast-start tanks (Financier, Elder Faerie) and burst DPS (Crème Brûlée). Equip the Squishy Jelly Watch for CD reduction.'
    },
    {
      question: 'How do Topping Set Bonuses work in Cookie Run: Kingdom?',
      answer: 'Equipping 5 of the same topping grants a 5-set bonus (+5% Cooldown for Swift Chocolate, +5% DMG Resist for Solid Almond, +5% ATK for Searing Raspberry). Target at least 24.1% total CD for 3-second skill start in Arena.'
    },
    {
      question: 'How many EXP Jellies are required to upgrade a Cookie from Level 1 to 80?',
      answer: 'Upgrading a Cookie from Level 1 to Level 80 requires approximately 12.8 million total EXP, which translates to roughly 20,000 Level 4 EXP Jellies.'
    },
    {
      question: 'What is the hard pity threshold on Gacha Banners?',
      answer: 'Featured Epic banners and Ancient/Beast Nether-Gacha banners have a 250 pull hard pity guarantee. 250 pulls require 75,000 Crystals (or equivalent Special Cookie Cutters).'
    }
  ];

  return (
    <div className="space-y-8 font-sans text-slate-100">
      <SEOHead
        title="Cookie Run: Kingdom Tools Hub 2026 – Team Builder, Topping Optimizer & Upgrade Planner"
        description="Suite of 6 Cookie Run: Kingdom interactive tools: Team Builder with meta comps, Topping Optimizer with CD thresholds, Production Chain Planner, Cookie & Skill Upgrade Calculator, Gacha Pity Planner, and Event Timers."
        canonicalPath="/games/cookie-run-kingdom"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Dynamic Game Codes Banner */}
      <HubCodesBanner hubPath="/games/cookie-run-kingdom" onNavigate={onNavigate} />

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-slate-900 to-zinc-950 border border-amber-500/20 p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-3 shadow-xl shrink-0">
                <CrkIcon className="w-full h-full" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider text-amber-400">
                    Cookie Run Kingdom Hub
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400">6 Specialized Tools</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-emerald-400">Arena & Topping Engine</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Cookie Run: Kingdom <span className="text-amber-400">Toolkit & Strategy Hub</span>
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                  Master your Kingdom economy, simulate Arena comp synergies, optimize topping sub-stats for fast skill starts, and calculate gacha pity.
                </p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 self-start md:self-center px-4 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-white font-medium text-xs transition-colors border border-zinc-700 shadow-md"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Hub'}</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-800/80">
            <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
              <div className="text-xs text-zinc-400">Supported Cookies</div>
              <div className="text-lg font-bold text-amber-400">100+ Cookies</div>
            </div>
            <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
              <div className="text-xs text-zinc-400">Max Cookie Level</div>
              <div className="text-lg font-bold text-amber-400">Level 80</div>
            </div>
            <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
              <div className="text-xs text-zinc-400">Gacha Hard Pity</div>
              <div className="text-lg font-bold text-emerald-400">250 Pulls</div>
            </div>
            <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
              <div className="text-xs text-zinc-400">Accuracy & Patch</div>
              <div className="text-lg font-bold text-amber-300">v5.2 Updated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search CRK tools (e.g. Team Builder, Toppings, EXP, Pity)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Tools ({crkTools.length})
            </button>
            <button
              onClick={() => setSelectedCategory('generators')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'generators'
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Comps & Generators
            </button>
            <button
              onClick={() => setSelectedCategory('calculators')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'calculators'
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Calculators
            </button>
            <button
              onClick={() => setSelectedCategory('planners')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'planners'
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Economy Planners
            </button>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Cookie Run: Kingdom Tools ({filteredTools.length})
          </h2>
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
          <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
            <Info className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">No Cookie Run: Kingdom tools match your filter.</p>
          </div>
        )}
      </div>

      {/* Mechanics Breakdown Guide */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          Cookie Run: Kingdom Mechanics & Strategy Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-300 leading-relaxed">
          <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              1. Team Positioning & Role Locks
            </h3>
            <p>
              Cookies are split into 3 positions: Front (Charge/Defense), Middle (Magic/Ranged/Ambush/Bomber), and Rear (Healing/Support). Front tanks draw aggro while Rear healers maintain party shields.
            </p>
          </div>

          <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              2. Topping Sub-stats & Start Breakpoints
            </h3>
            <p>
              Arena battles require high Cooldown reduction (e.g., 24.1% CD on 15s base skills) to trigger skill casts at 3 seconds into the match before enemy burst damage land.
            </p>
          </div>

          <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              3. Kingdom Crafting & Tree of Wishes
            </h3>
            <p>
              Manage resource chains (Woodshop, Bakery, Jam House). Crafting higher tier items yields huge Gold profits on Tree of Wishes Burning Times.
            </p>
          </div>

          <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-amber-400" />
              4. Gacha Hard Pity & Mileage Returns
            </h3>
            <p>
              Banners guarantee featured target cookies at 250 pulls (75,000 Crystals). Each pull rewards 20 Mileage Points for Treasure Tickets or Soulstones.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-zinc-950/60 border border-zinc-800 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full text-left p-4 text-xs sm:text-sm font-bold text-white flex items-center justify-between gap-4"
              >
                <span>{faq.question}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                )}
              </button>
              {openFaqIndex === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 border-t border-zinc-800/80 leading-relaxed">
                  {faq.answer}
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
