/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Gift,
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
import { MonopolyGoIcon } from '../components/GameIcons';

interface MonopolyGoHubPageProps {
  onNavigate: (path: string) => void;
}

export default function MonopolyGoHubPage({ onNavigate }: MonopolyGoHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter tools for Monopoly GO
  const mogoTools = useMemo(() => {
    return TOOLS.filter(
      (t) => t.gameId === 'mogo' || t.tags.includes('monopoly go') || t.tags.includes('mogo')
    );
  }, []);

  const filteredTools = useMemo(() => {
    return mogoTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || tool.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [mogoTools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Monopoly GO!', path: '/monopoly-go' }
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
      question: 'When is the best time to open the 800-Star Vault in Monopoly GO?',
      answer: 'Always open the 800-Star Vault during a Sticker Boom flash event (+50% extra stickers per pack) to maximize new 4-star and 5-star cards along with the Wild Sticker.'
    },
    {
      question: 'How do Safe Exchange sticker trades work?',
      answer: 'When sending a sticker trade, toggle "Make an exchange!" in-game so both players must accept the trade proposal before stickers leave your inventory, protecting against sticker scams.'
    },
    {
      question: 'How often are new free dice links released?',
      answer: 'Scopely releases 2 to 4 official free dice links daily via social channels, yielding 50 to 100 extra free dice rolls per day.'
    },
    {
      question: 'What is Builder\'s Bash and how much cash does it save?',
      answer: 'Builder\'s Bash is a daily flash event that reduces landmark upgrade cash costs by 30% to 50%, allowing you to clear full boards for significantly less cash.'
    }
  ];

  return (
    <div className="space-y-8 font-sans text-slate-100">
      <SEOHead
        title="Monopoly GO Tools Hub 2026 – Free Dice Links, Sticker Tracker & Trade Matcher"
        description="Comprehensive suite of 6 Monopoly GO tools: Album Sticker & Duplicate Vault Tracker, Safe Exchange Trade Matcher, Verified Daily Free Dice Links, Flash Event Timers, Shield Finder, and Board Upgrade Cost Planner."
        canonicalPath="/monopoly-go"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950 via-slate-900 to-zinc-950 border border-red-500/20 p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center p-3 shadow-xl shrink-0">
                <MonopolyGoIcon className="w-full h-full" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider text-red-400">
                    Monopoly GO Album & Dice Engine
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400">6 Specialized Tools</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-emerald-400">Daily Verified Links</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Monopoly GO! <span className="text-red-400">Toolkit & Strategy Hub</span>
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                  Claim verified daily free dice rolls, track sticker album vault stars, evaluate safe exchange trade ratios, and calculate Builder's Bash board upgrades.
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
              <div className="text-xs text-zinc-400">Daily Free Dice</div>
              <div className="text-lg font-bold text-red-400">50–100 Rolls</div>
            </div>
            <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
              <div className="text-xs text-zinc-400">Wild Sticker Vault</div>
              <div className="text-lg font-bold text-amber-400">800 Stars</div>
            </div>
            <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
              <div className="text-xs text-zinc-400">Trade Security</div>
              <div className="text-lg font-bold text-emerald-400">Safe Exchange</div>
            </div>
            <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
              <div className="text-xs text-zinc-400">Update Status</div>
              <div className="text-lg font-bold text-red-300">Live & Tested</div>
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
              placeholder="Search Monopoly GO tools (e.g. Free Dice, Sticker Tracker, Trade Matcher, High Roller)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-red-500 text-white font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Tools ({mogoTools.length})
            </button>
            <button
              onClick={() => setSelectedCategory('trackers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'trackers'
                  ? 'bg-red-500 text-white font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Trackers & Links
            </button>
            <button
              onClick={() => setSelectedCategory('calculators')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'calculators'
                  ? 'bg-red-500 text-white font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Calculators
            </button>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-400" />
            Monopoly GO Tools ({filteredTools.length})
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
            <p className="text-zinc-400 text-sm">No Monopoly GO tools match your search filter.</p>
          </div>
        )}
      </div>

      {/* Strategy Guide */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-red-400" />
          Monopoly GO High-Multiplier Strategy Guide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-300 leading-relaxed">
          <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-red-300 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-red-400" />
              1. Daily Free Dice Link Redemption
            </h3>
            <p>
              Claim official reward links daily to collect 50 to 100 bonus dice rolls. Links expire after a few days, so redeem them regularly.
            </p>
          </div>

          <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-red-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-red-400" />
              2. Flash Event Stacking (Wheel Boost + High Roller)
            </h3>
            <p>
              Log into the game during overlapping flash event windows. Stacking Wheel Boost (2x spins) with Sticker Boom (+50% cards) yields quadruple sticker rewards.
            </p>
          </div>

          <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-red-300 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-red-400" />
              3. Builder's Bash & Board Upgrades
            </h3>
            <p>
              Avoid spending cash on individual landmark upgrades throughout the day. Save cash and upgrade full boards exclusively during Builder's Bash (-30% / -50% cash cost).
            </p>
          </div>

          <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-red-300 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-red-400" />
              4. Safe Exchange Sticker Trading
            </h3>
            <p>
              Never trade valuable 5-star cards without activating in-game Safe Exchange. This forces both players to confirm the trade proposal before cards transfer.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-red-400" />
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
                  <ChevronUp className="w-4 h-4 text-red-400 shrink-0" />
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
