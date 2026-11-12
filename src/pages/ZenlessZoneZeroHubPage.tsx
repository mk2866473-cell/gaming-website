/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Flame, Search, Award, ShieldCheck, Layers, TrendingUp, 
  Trophy, HelpCircle, ChevronDown, ChevronUp, Lightbulb, 
  Binary, Compass, Crosshair, Sparkles, Target, Coins, 
  Users, ArrowRight, Gauge, Coffee, Scale, Zap
} from 'lucide-react';
import { TOOLS } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { AdLayout } from '../components/ads/AdLayout';
import { ZzzIcon } from '../components/GameIcons';
import HubCodesBanner from '../components/HubCodesBanner';

interface ZenlessZoneZeroHubPageProps {
  onNavigate: (path: string) => void;
}

export default function ZenlessZoneZeroHubPage({ onNavigate }: ZenlessZoneZeroHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const zzzTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'zzz');
  }, []);

  const categories = [
    { id: 'all', name: `All ZZZ Tools (${zzzTools.length || 6})` },
    { id: 'discs', name: 'Drive Discs & Weapons (Discs, W-Engines)' },
    { id: 'gacha', name: 'Gacha & Bangboos (Polychrome, Bangboo Synergy)' },
    { id: 'combat', name: 'Combat & Progression (Daze Multiplier, Battery Planner)' },
  ];

  const filteredTools = useMemo(() => {
    return zzzTools.filter(tool => {
      const matchQuery =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchCategory = true;
      if (selectedCategory === 'discs') {
        matchCategory = ['zzz-drive-disc-optimizer', 'zzz-w-engine-comparison-tool'].includes(tool.id);
      } else if (selectedCategory === 'gacha') {
        matchCategory = ['zzz-polychrome-pity-calculator', 'zzz-bangboo-synergy-selector'].includes(tool.id);
      } else if (selectedCategory === 'combat') {
        matchCategory = ['zzz-daze-stun-calculator', 'zzz-inter-knot-battery-planner'].includes(tool.id);
      }

      return matchQuery && matchCategory;
    });
  }, [zzzTools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Zenless Zone Zero Hub', path: '/zenless-zone-zero' }
  ];

  const zzzFaqs = [
    {
      question: 'How does the Disorder reaction work in Zenless Zone Zero?',
      answer: 'Disorder triggers when an enemy already afflicted with an Anomaly (such as Burn or Shock) is hit by a different attribute Anomaly (such as Assault or Corruption). Disorder immediately consumes all remaining ticks of the initial DoT effect and detonates them in a single massive burst multiplied by your triggering agent\'s Anomaly Proficiency.'
    },
    {
      question: 'Do Bangboos require Polychromes to summon in ZZZ?',
      answer: 'No! The Bangboo Channel exclusively requires Boopons, which cannot be purchased with real money or Polychromes. Boopons are awarded 100% free through events, Hollow Zero bounties, and progression, and you can guarantee any chosen S-Rank Bangboo at 80 pity with zero 50/50 risk.'
    },
    {
      question: 'What is the soft pity threshold for S-Rank Agents in Zenless Zone Zero?',
      answer: 'Hard pity is 90 pulls, but soft pity begins around pull 75. Between pulls 75 and 89, the base 0.6% S-Rank drop rate increases dramatically, meaning most players pull their S-Rank agent around 77–82 pulls.'
    },
    {
      question: 'How high can Stun Agents increase an enemy\'s damage vulnerability?',
      answer: 'Base Stun Multiplier across all enemies is 150% (enemies take 1.5x damage when stunned). Von Lycaon increases this to 185% (+35%), while Qingyi can stack Subjugation up to 20 times to increase the Stun Multiplier to an incredible 230% (+80%), giving your hypercarry massive burst damage.'
    },
    {
      question: 'Is it better to pull a Signature S-Rank W-Engine or use an A-Rank at R5?',
      answer: 'Craftable A-Rank W-Engines at Modification Rank 5 (such as Starlight Engine R5 or Weeping Gemini R5) deliver within 15% to 20% of R1 Signature S-Ranks. For F2P and low-spender players, saving Polychromes for new characters is widely recommended over chasing weapon banners.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Zenless Zone Zero Calculators & Build Tools 2026 – Drive Discs, Pity & Daze Guide"
        description="Comprehensive suite of 6 Zenless Zone Zero tools: Drive Disc Set & Anomaly Build Optimizer, Polychrome & Master Tape Banner Pity Calculator, Daze & Stun Multiplier Calculator, Bangboo Synergy Selector, Inter-Knot Battery Planner, and W-Engine Side-by-Side Comparison Tool."
        canonicalPath="/games/zenless-zone-zero"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Dynamic Game Codes Banner */}
        <HubCodesBanner hubPath="/games/zenless-zone-zero" onNavigate={onNavigate} />

        {/* Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-b from-purple-950/70 via-slate-900 to-slate-950 border border-purple-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-3 shadow-xl shrink-0">
                  <ZzzIcon className="w-full h-full" />
                </div>
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="font-bold uppercase tracking-wider text-amber-400">
                      New Eridu Tactical Suite
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-purple-400">HoYoverse Verified Mechanics</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-400">6 Strategy Engines</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    Zenless Zone Zero <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-amber-400">Calculators & Build Tools</span>
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    Dominate Hollow Zero and Shiyu Defense. Optimize 4-Piece + 2-Piece Drive Discs, calculate Anomaly Proficiency & Disorder bursts, simulate 90-pull Agent pity, maximize Daze multipliers up to 230%, select synergistic Bangboos, and compare W-Engines.
                  </p>
                </div>
              </div>

              {/* Quick Metrics Card */}
              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0 bg-slate-950/80 border border-purple-500/30 rounded-2xl p-4 shadow-xl">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Calculators</span>
                  <span className="text-2xl font-black text-purple-400">6 Tools</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Updated for v1.4+</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Agent Pity</span>
                  <span className="text-2xl font-black text-amber-400">90 Hard</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Soft at ~75 pulls</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Max Stun Multi</span>
                  <span className="text-2xl font-black text-cyan-400">230%</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Qingyi Subjugation</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Bangboos</span>
                  <span className="text-2xl font-black text-emerald-400">100% Free</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Boopons Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hub Top Banner Ad Slot */}
        <AdLayout.HubTop />

        {/* Search & Category Filter Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ZZZ tools (e.g. drive disc, pity, daze, bangboo, battery, w-engine)..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-1.5 self-center sm:self-auto">
              <span>Showing <strong>{filteredTools.length}</strong> of <strong>{zzzTools.length}</strong> tools</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white font-bold border-purple-400 shadow-md shadow-purple-500/10'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Available Zenless Zone Zero Calculators & Guides
            </h2>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, idx) => (
                <React.Fragment key={tool.id}>
                  {idx === 4 && <div className="col-span-full"><AdLayout.HubInFeed /></div>}
                  <ToolCard
                    tool={tool}
                    onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
                  />
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <Flame className="w-10 h-10 text-purple-500/40 mx-auto" />
              <p className="text-base text-slate-300 font-semibold">No Zenless Zone Zero tools match your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-xl text-xs font-bold transition-colors"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>

        {/* Comprehensive Guide & Mechanics Deep-Dive */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="space-y-2 border-b border-slate-800 pb-6">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" /> Zenless Zone Zero Combat & Systems Theorycrafting
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Shiyu Defense & Hollow Zero Mastery Principles
            </h2>
            <p className="text-sm text-slate-400 max-w-3xl">
              Key mathematical mechanics and resource habits to conquer high-tier Critical Nodes and maximize your account power.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-300">
            {/* Guide Card 1 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 font-black">
                1
              </div>
              <h3 className="font-bold text-white text-base">The 4-Pc + 2-Pc Disc Allocation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Partitions 1, 2, and 3 have fixed main stats (HP, ATK, DEF). Partitions 4, 5, and 6 are crucial: run CRIT or Anomaly Proficiency on 4, Elemental DMG or PEN on 5, and Anomaly Buildup or Impact on 6.
              </p>
            </div>

            {/* Guide Card 2 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 font-black">
                2
              </div>
              <h3 className="font-bold text-white text-base">Disorder Detonation Cycles</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Applying a different Anomaly while an existing Anomaly is active instantly cashes out all remaining ticks of the first DoT into an immediate burst scaled by the triggering agent's Anomaly Proficiency.
              </p>
            </div>

            {/* Guide Card 3 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-black">
                3
              </div>
              <h3 className="font-bold text-white text-base">230% Stun Vulnerability Multiplier</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                While enemies take 150% damage during standard stuns, Qingyi's Subjugation stacks boost this to 230%, and Lycaon pushes it to 185%, turning your stun window into an overwhelming damage cascade.
              </p>
            </div>

            {/* Guide Card 4 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-black">
                4
              </div>
              <h3 className="font-bold text-white text-base">100% Free Bangboo Selection</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Never worry about spending Polychromes on Bangboos! Boopons are 100% free through gameplay. You can select your desired S-Rank Bangboo and guarantee them with zero 50/50 risk.
              </p>
            </div>

            {/* Guide Card 5 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 font-black">
                5
              </div>
              <h3 className="font-bold text-white text-base">The Coff Cafe Daily Habit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Always visit Coff Cafe on Sixth Street every single day. Drinking coffee restores +60 Battery Charge (+60 Inter-Knot EXP) and awards bonus drops on targeted upgrade materials.
              </p>
            </div>

            {/* Guide Card 6 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 font-black">
                6
              </div>
              <h3 className="font-bold text-white text-base">R5 Craftable W-Engines vs Signatures</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A-Rank craftable W-Engines like Starlight Engine R5 or Weeping Gemini R5 deliver within 15–20% of R1 Signature S-Ranks, allowing F2P players to save precious Polychromes for new characters.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-purple-400">
            <HelpCircle className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {zzzFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-slate-950/60 border border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-200 hover:text-purple-300 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-purple-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Related Game Hubs */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-purple-400" />
            Explore More Action & Gacha Game Hubs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div 
              onClick={() => onNavigate('/wuthering-waves')}
              className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">Wuthering Waves Hub</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Echo Tuning Evaluator, 80 Pity, S0-S6 Dupes & Sonata Builder.</p>
            </div>

            <div 
              onClick={() => onNavigate('/once-human')}
              className="bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-4 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">Once Human Hub</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Blueprint Stars, Acid Farm, Cradle Planner & Tactical Map.</p>
            </div>

            <div 
              onClick={() => onNavigate('/genshin')}
              className="bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-4 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors">Genshin Impact Hub</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Wish Pity, Resin Timers, Artifact CV & Ascension Planners.</p>
            </div>
          </div>
        </div>

        {/* Hub Above Footer Banner Ad Slot */}
        <AdLayout.HubAboveFooter />
      </div>
    </>
  );
}
