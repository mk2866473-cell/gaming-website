/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Coins, Search, ArrowRight, Star, ShieldCheck, Zap, 
  Layers, TrendingUp, Trophy, HelpCircle, ChevronDown, 
  ChevronUp, Lightbulb, Binary, Compass, Crosshair, Clock, Droplet, Sparkles
} from 'lucide-react';
import { TOOLS } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { AdLayout } from '../components/ads/AdLayout';
import { OnceHumanIcon } from '../components/GameIcons';

interface OnceHumanHubPageProps {
  onNavigate: (path: string) => void;
}

export default function OnceHumanHubPage({ onNavigate }: OnceHumanHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const onceHumanTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'oncehuman');
  }, []);

  const categories = [
    { id: 'all', name: `All Once Human Tools (${onceHumanTools.length || 8})` },
    { id: 'blueprints', name: 'Weapons & Blueprints (Star Upgrades, Calibrations)' },
    { id: 'territory', name: 'Territory & Automation (Acid Farm, Deviance 5★)' },
    { id: 'builds', name: 'Builds & Endgame (Cradle Overrides, Memetics, Bosses)' },
    { id: 'maps', name: 'Tactical Maps & Checklist (Mystical Crates, Anchors)' }
  ];

  const filteredTools = useMemo(() => {
    return onceHumanTools.filter(tool => {
      const matchQuery =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchCategory = true;
      if (selectedCategory === 'blueprints') {
        matchCategory = ['once-human-blueprint-calculator', 'once-human-weapon-calibration-tool'].includes(tool.id);
      } else if (selectedCategory === 'territory') {
        matchCategory = ['once-human-acid-farm-calculator', 'once-human-deviance-optimizer'].includes(tool.id);
      } else if (selectedCategory === 'builds') {
        matchCategory = ['once-human-cradle-override-planner', 'once-human-memetic-specialization-planner', 'once-human-boss-loot-calculator'].includes(tool.id);
      } else if (selectedCategory === 'maps') {
        matchCategory = ['once-human-mystical-crate-map'].includes(tool.id);
      }

      return matchQuery && matchCategory;
    });
  }, [onceHumanTools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Once Human Hub', path: '/once-human' }
  ];

  const onceHumanFaqs = [
    {
      question: 'How much total Fragment XP is required to max a blueprint to 5-Star in Once Human?',
      answer: 'Upgrading a Legendary weapon blueprint from 1-Star to 5-Star requires exactly 29,600 total Fragment XP (1,600 XP for 2★, 4,000 XP for 3★, 8,000 XP for 4★, and 16,000 XP for 5★). Same-Name fragments award 2x double XP (160 XP per fragment).'
    },
    {
      question: 'What is the fastest way to farm Acid passively in Once Human?',
      answer: 'Build a territory base in a High-Pollution zone (such as Blackfell Oil Fields or 73 Source Extraction). Connect Water Pumps to pump Polluted Water, filter into Impure Acid via Osmosis Purifiers, and ferment into Pure Acid using Brewing Barrels with the Acid Brewery Master perk.'
    },
    {
      question: 'What are the best Memetic Specialization perks for making Energy Links?',
      answer: 'Combo Chipset (sells for 12,000 EL each to settlement vendors), Solar Drill (self-recharging infinite mining drill), and Sulfur Chemist (converts 5 Sulfur + 50 EL into 1 Pure Acid).'
    },
    {
      question: 'How do Prime War Silver Calamity Shields work?',
      answer: 'Prime War bosses spawn with an impenetrable Silver Calamity Shield that is immune to conventional firearms. Teams must deploy Gatling Turrets and fire Biomass Missiles or Red Plasma rounds to shatter the shield before small arms can deal damage.'
    },
    {
      question: 'Do Blueprint Star levels and Starchrom carry over after a season reset?',
      answer: 'Yes! All weapon/armor blueprints, blueprint star levels, Starchrom, and weapon mods are permanently preserved on your account across season wipes and scenario transfers.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Once Human Calculators & Build Tools 2026 – Blueprints, Acid Farm & Cradle Guide"
        description="Comprehensive suite of 8 Once Human tools: Blueprint Star Upgrade Calculator, Tactical Mystical Crate Map, Base Acid Farm & Power Grid Calculator, Weapon Calibration Tool, Cradle Override Build Planner, Deviance Mood & Energy Optimizer, Memetic Specialization Planner, and Boss Loot Matrix."
        canonicalPath="/once-human"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Breadcrumb & Hero Header */}
        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="relative rounded-3xl bg-gradient-to-br from-purple-950/70 via-slate-900 to-amber-950/80 border border-purple-500/30 p-6 sm:p-10 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
                <OnceHumanIcon className="w-4 h-4" />
                <span>Once Human Engineering Suite • 2026 Season Meta</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="p-2 sm:p-2.5 rounded-2xl bg-purple-950/80 border border-purple-500/40 shadow-lg inline-flex items-center justify-center shrink-0">
                  <OnceHumanIcon className="w-8 h-8 sm:w-11 sm:h-11 text-purple-400" />
                </span>
                <span>Once Human Calculators & Survival Tools</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Complete verified suite of 8 professional Once Human tools: 1★ to 5★ Blueprint Star Upgrade & Fragment XP Calculator, Interactive Tactical Map & Mystical Crate Checklist, Base Power Grid & Automated Acid Farming Calculator, Weapon Calibration & Stat Modifier Tool, Season Cradle Override Build Planner, Deviance Mood & Energy Recovery Optimizer, Memetic Specialization & Re-roll Planner, and Monolith Boss & Prime War Loot Matrix.
              </p>

              {/* Quick Metrics Bar */}
              <div className="pt-2 flex flex-wrap gap-4 sm:gap-6 text-xs font-mono">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-slate-400">Max Blueprint XP:</span>
                  <span className="text-amber-300 font-bold">29,600 XP</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-slate-400">Same-Name Bonus:</span>
                  <span className="text-purple-300 font-bold">160 XP (2x)</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">Active Cradle Nodes:</span>
                  <span className="text-emerald-300 font-bold">8 Slots</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hub Top Banner Ad Slot */}
        <AdLayout.HubTop />

        {/* Search & Category Filter Navigation */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, mechanics, blueprints, or materials..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="text-xs text-slate-400 font-mono self-end sm:self-center">
              Showing <span className="text-purple-400 font-bold">{filteredTools.length}</span> of {onceHumanTools.length} Once Human tools
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => (
              <React.Fragment key={tool.id}>
                {idx === 8 && <div className="col-span-full"><AdLayout.HubInFeed /></div>}
                <ToolCard
                  tool={tool}
                  onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
                />
              </React.Fragment>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="text-slate-400 text-sm">No Once Human tools match your filter.</div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-4"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Deep Dive & Mechanics Guide */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Once Human Mechanics & Meta Guide (2026)
              </h2>
              <p className="text-xs text-slate-400">
                Key progression mechanics, Starchrom priority, and territory automation best practices
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Coins className="w-4 h-4" />
                <span>Blueprint Star Upgrades</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Upgrading blueprints from 1★ to 5★ requires 29,600 XP total. Prioritize using Same-Name fragments for their 2x double XP value (160 XP). Unlocked blueprints and stars never wipe during seasonal resets.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Droplet className="w-4 h-4" />
                <span>Passive Acid Farming</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Settle in High-Pollution areas (Blackfell border). Run 8–16 Water Pumps into Reverse Osmosis Purifiers (1 Polluted Water → 0.5 Impure Acid), and ferment into Pure Acid with Brewing Barrels. Sell surplus Acid on vending machines for millions of Energy Links.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Zap className="w-4 h-4" />
                <span>Cradle Synergy & Prime Wars</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Match your 8 Cradle Overrides to your weapon Key Word (e.g., Transient Impact for Power Surge, Shrapnel Souvenir for AWM). For Prime Wars, bring Biomass Missiles to break the boss Silver Calamity Shield before firing conventional rounds.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-400">
                Verified answers to the most common Once Human questions
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {onceHumanFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-900/50 transition-colors"
                  >
                    <span className="text-sm font-semibold text-white pr-4">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Hub Above Footer Banner Ad Slot */}
        <AdLayout.HubAboveFooter />
      </div>
    </>
  );
}
