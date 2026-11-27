/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Swords,
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
import { AfkjIcon } from '../components/GameIcons';
import HubCodesBanner from '../components/HubCodesBanner';

interface AfkjHubPageProps {
  onNavigate: (path: string) => void;
}

export default function AfkjHubPage({ onNavigate }: AfkjHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter tools for AFK Journey
  const afkjTools = useMemo(() => {
    return TOOLS.filter(
      (t) => t.gameId === 'afkj' || t.tags.includes('afk journey') || t.tags.includes('afkj')
    );
  }, []);

  const filteredTools = useMemo(() => {
    return afkjTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || tool.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [afkjTools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'AFK Journey', path: '/afk-journey' }
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
      question: 'Which heroes are highest priority to ascend in AFK Journey?',
      answer: 'Core Meta Priorities: Odie and Marilee to Mythic+ (+10 EX Weapon) for Dream Realm, Smokey & Meerky for universal healing, Eironn for PvP burst initiation, and Thoran for frontline resurrection.'
    },
    {
      question: 'How do Faction Synergy Buffs work in AFK Journey?',
      answer: 'Deploying heroes of the same faction grants team-wide HP and ATK bonuses: 3 of same faction (+10%), 3+2 dual faction (+15%), 4 of same (+18%), and 5 of same (+22%). Celestials and Hypogeans act as faction wildcards.'
    },
    {
      question: 'How many Faction Acorns are needed for Supreme+?',
      answer: 'An S-Level hero requires 8 duplicate copies and 350 Faction Acorns to reach Supreme+. An A-Level hero requires 64 duplicate copies and 200 Faction Acorns.'
    },
    {
      question: 'What is the hard pity threshold on AFK Journey banners?',
      answer: 'The All-Hero Recruitment and Rate-Up Banners both guarantee an S-Level Hero at 40 pulls. Epic Recruitment guarantees an Epic at 30 pulls.'
    }
  ];

  return (
    <div className="space-y-8 font-sans text-slate-100">
      <SEOHead
        title="AFK Journey Tools Hub 2026 – Dream Realm Boss Planner, Ascension & Team Builder"
        description="Comprehensive suite of 6 AFK Journey tactical tools: Dream Realm Daily Boss Planner, Hero Ascension & Acorn Calculator, Hero Essence Dust Planner, Wishlist Summon Calculator, 5v5 Tactical Grid Team Builder, and Season Tracker."
        canonicalPath="/games/afk-journey"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Dynamic Game Codes Banner */}
      <HubCodesBanner hubPath="/games/afk-journey" onNavigate={onNavigate} />

      {/* Unified Hub Header */}
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                <AfkjIcon className="w-7 h-7" />
              </div>
              <div className="space-y-2 max-w-2xl">
                <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
                  AFK Journey Toolkit & Tactical Hub
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed">
                  Optimize Dream Realm daily boss scores, calculate hero duplicate sigils and faction acorns, project Hero Essence dust walls, and build 5v5 tactical grid comps.
                </p>
                <div className="text-xs font-mono text-[var(--muted)] tabular-nums">
                  {afkjTools.length} tools
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 self-start md:self-center px-4 py-2.5 rounded-xl bg-[var(--surface-raised)] hover:bg-zinc-700 text-[var(--text)] font-medium text-xs transition-colors border border-[var(--border)] shrink-0"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Hub'}</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[var(--border)]">
            <div className="bg-[var(--surface-raised)] p-3 rounded-xl border border-[var(--border)]">
              <div className="text-xs text-[var(--muted)]">Supported Heroes</div>
              <div className="text-lg font-bold text-purple-400">60+ Heroes</div>
            </div>
            <div className="bg-[var(--surface-raised)] p-3 rounded-xl border border-[var(--border)]">
              <div className="text-xs text-[var(--muted)]">Max Ascension</div>
              <div className="text-lg font-bold text-purple-400">Supreme+ / Paragon</div>
            </div>
            <div className="bg-[var(--surface-raised)] p-3 rounded-xl border border-[var(--border)]">
              <div className="text-xs text-[var(--muted)]">Gacha Hard Pity</div>
              <div className="text-lg font-bold text-emerald-400">40 Pulls</div>
            </div>
            <div className="bg-[var(--surface-raised)] p-3 rounded-xl border border-[var(--border)]">
              <div className="text-xs text-[var(--muted)]">Active Season</div>
              <div className="text-lg font-bold text-amber-300">Song of Strife</div>
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
              aria-label="Search AFK Journey tools"
              placeholder="Search AFK Journey tools (e.g. Dream Realm, Ascension, Dust, Wishlist, Grid)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[var(--muted)] focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-purple-500 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Tools ({afkjTools.length})
            </button>
            <button
              onClick={() => setSelectedCategory('generators')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'generators'
                  ? 'bg-purple-500 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Comps & Generators
            </button>
            <button
              onClick={() => setSelectedCategory('calculators')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'calculators'
                  ? 'bg-purple-500 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Calculators
            </button>
            <button
              onClick={() => setSelectedCategory('trackers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'trackers'
                  ? 'bg-purple-500 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Trackers
            </button>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            AFK Journey Tools ({filteredTools.length})
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
            <Info className="w-8 h-8 text-[var(--muted)] mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">No AFK Journey tools match your search filter.</p>
          </div>
        )}
      </div>

      {/* Strategy Guide */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-400" />
          AFK Journey Core Mechanics & Progression Guide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-300 leading-relaxed">
          <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-1.5">
              <Swords className="w-4 h-4 text-purple-400" />
              1. Dream Realm Meta & Execute Strategy
            </h3>
            <p>
              Dream Realm rewards scale exponentially with damage dealt. Heroes like Odie and Marilee possess true damage and execute skills that shred boss health bars when paired with Smokey & Meerky's aroma aura.
            </p>
          </div>

          <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              2. Faction Acorn Management
            </h3>
            <p>
              Acorns are consumed alongside hero duplicates during ascension. Save Lightbearer, Wilder, Mauler, and Graveborn Acorns for S-Level heroes ascending to Mythic+ and Supreme+.
            </p>
          </div>

          <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-purple-400" />
              3. Hero Essence (Dust) Walls
            </h3>
            <p>
              Resonance level progression encounters Dust Walls every 10 levels. Buy daily discounted Hero Essence from the Emporium shop for Gold and maximize Instant AFK claims after pushing AFK stages.
            </p>
          </div>

          <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400" />
              4. 5v5 Grid Positioning & Faction Buffs
            </h3>
            <p>
              Positioning heroes on tactical grid tiles allows tanks like Thoran to block assassins, while faction synergies grant up to +22% bonus HP and ATK for 5 matching faction heroes.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-400" />
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
                  <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[var(--muted)] shrink-0" />
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
