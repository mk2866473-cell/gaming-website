/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, Search, Award, ShieldCheck, Layers, TrendingUp, 
  Trophy, HelpCircle, ChevronDown, ChevronUp, Lightbulb, 
  Binary, Compass, Crosshair, Sparkles, Target, Coins, 
  Users, ArrowRight, CheckCircle2, Shield
} from 'lucide-react';
import { TOOLS } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { AdLayout } from '../components/ads/AdLayout';
import { WuwaIcon } from '../components/GameIcons';

interface WutheringWavesHubPageProps {
  onNavigate: (path: string) => void;
}

export default function WutheringWavesHubPage({ onNavigate }: WutheringWavesHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const wuwaTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'wuwa');
  }, []);

  const categories = [
    { id: 'all', name: `All Wuthering Waves Tools (${wuwaTools.length || 6})` },
    { id: 'echoes', name: 'Echoes & Sonata (Tuning Evaluator, Team Synergy)' },
    { id: 'gacha', name: 'Gacha & Convene (80 Pity Planner, S0-S6 Dupes)' },
    { id: 'progression', name: 'Progression & Economy (Ascension Mats, Shell Credits)' },
  ];

  const filteredTools = useMemo(() => {
    return wuwaTools.filter(tool => {
      const matchQuery =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchCategory = true;
      if (selectedCategory === 'echoes') {
        matchCategory = ['wuwa-echo-tuning-evaluator', 'wuwa-sonata-synergy-builder'].includes(tool.id);
      } else if (selectedCategory === 'gacha') {
        matchCategory = ['wuwa-pity-pull-planner', 'wuwa-resonance-chain-calculator'].includes(tool.id);
      } else if (selectedCategory === 'progression') {
        matchCategory = ['wuwa-ascension-material-calculator', 'wuwa-shell-credit-optimizer'].includes(tool.id);
      }

      return matchQuery && matchCategory;
    });
  }, [wuwaTools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Wuthering Waves Hub', path: '/wuthering-waves' }
  ];

  const wuwaFaqs = [
    {
      question: 'What is the optimal 5-piece Echo Cost distribution in Wuthering Waves?',
      answer: 'The universal endgame standard is the 4-3-3-1-1 setup (totaling 12 Echo Cost). This provides one 4-Cost Overlord Echo (Crit Rate or Crit DMG main stat), two 3-Cost Elite Echoes (Elemental DMG Bonus main stats), and two 1-Cost Common Echoes (ATK% main stats), activating your 5-piece Sonata effect.'
    },
    {
      question: 'Is the Weapon Event Convene really 100% guaranteed in Wuthering Waves?',
      answer: 'Yes! Unlike other gacha games, Wuthering Waves has NO 50/50 mechanic on the weapon banner. When you reach 80 hard pity on the Weapon Event Convene, you are 100% guaranteed to receive the featured 5-star signature weapon.'
    },
    {
      question: 'How do Outro Deepen buffs interact with standard elemental damage bonuses?',
      answer: 'Outro Skill Deepen buffs (such as Mortefi\'s +38% Heavy Attack Deepen or Sanhua\'s +38% Basic Attack Deepen) are separate multiplicative damage layers. Unlike additive ATK% or Elemental DMG% bonuses, Deepen multiplies your final damage output directly, making it the most potent amplifier in the game.'
    },
    {
      question: 'Why do theorycrafters recommend the "Level 80 / Forte 8" stopping point?',
      answer: 'Ascending from Level 80 to 90 and leveling Forte skills from 8 to 10 consumes over 52% of an entire character\'s Shell Credit and Waveplate budget, but provides only an 8% to 11% DPS increase. Stopping sub-DPS and support resonators at 80/80 with Forte Lv8 saves over 2.6M credits and 1,800 Waveplates per character.'
    },
    {
      question: 'Can you purchase 5-Star duplicate sequence wavebands without pulling from the gacha?',
      answer: 'Yes. The Afterglow Coral shop allows players to purchase up to 2 duplicate Sequence Wavebands per featured banner for 270 Afterglow Corals each, allowing you to secure vital early spikes like Jinhsi S1 or Changli S2 using currency saved from duplicate 4-star and 5-star pulls.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Wuthering Waves Calculators & Build Tools 2026 – Echo Tuning, Pity & Sonata Guide"
        description="Comprehensive suite of 6 Wuthering Waves tools: Echo Tuning Sub-Stat Evaluator with God-Roll scores, 80 Hard Pity & Astrite Farming Planner, Resonance Chain S0-S6 DPS multipliers, Resonator Ascension & Forte Material Calculator, Shell Credit Spend Optimizer, and Team Rotation & Sonata Effect Synergy Builder."
        canonicalPath="/wuthering-waves"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-b from-cyan-950/70 via-slate-900 to-slate-950 border border-cyan-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5 shadow-sm">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" /> Wuthering Waves Official Tools Hub
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/80 border border-blue-500/30 text-blue-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> KURO GAMES Verified Formulas
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300">
                    6 Tools Available
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight flex items-center gap-3 sm:gap-4 flex-wrap">
                  <span className="p-2 sm:p-2.5 rounded-2xl bg-teal-950/80 border border-teal-500/40 shadow-lg inline-flex items-center justify-center shrink-0">
                    <WuwaIcon className="w-8 h-8 sm:w-11 sm:h-11 text-teal-400" />
                  </span>
                  <span>Wuthering Waves <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">Calculators & Build Tools</span></span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Master the SOL3 v2.0 meta. Evaluate 5-substat Echo rolls, plan Astrite for 100% guaranteed weapon pulls, calculate S0–S6 duplicate damage spikes, estimate Waveplate ascension timelines, and build optimal Concerto rotations.
                </p>
              </div>

              {/* Quick Metrics Card */}
              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0 bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-4 shadow-xl">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Calculators</span>
                  <span className="text-2xl font-black text-cyan-400">6 Tools</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Updated for v2.0</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Weapon Banner</span>
                  <span className="text-2xl font-black text-amber-400">100% Pity</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Zero 50/50 Loss</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Echo Setup</span>
                  <span className="text-2xl font-black text-emerald-400">4-3-3-1-1</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">5-Pc Sonata</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Sequence Nodes</span>
                  <span className="text-2xl font-black text-purple-400">S0 to S6</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Coral Shop Calc</span>
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
                placeholder="Search Wuthering Waves tools (e.g. echo, pity, jinhsi, changli, credits)..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-1.5 self-center sm:self-auto">
              <span>Showing <strong>{filteredTools.length}</strong> of <strong>{wuwaTools.length}</strong> tools</span>
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
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/10'
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
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Available Wuthering Waves Calculators & Guides
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
              <Zap className="w-10 h-10 text-cyan-500/40 mx-auto" />
              <p className="text-base text-slate-300 font-semibold">No Wuthering Waves tools match your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold transition-colors"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>

        {/* Comprehensive Guide & Mechanics Deep-Dive */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="space-y-2 border-b border-slate-800 pb-6">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" /> Wuthering Waves Mechanics & Theorycrafting
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Endgame Mastery Guide: Echoes, Concerto & Energy Economy
            </h2>
            <p className="text-sm text-slate-400 max-w-3xl">
              Essential mechanical principles to dominate Tower of Adversity (Hazard Zone) and maximize your account progression efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-300">
            {/* Guide Card 1 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-black">
                1
              </div>
              <h3 className="font-bold text-white text-base">The 4-3-3-1-1 Echo Structure</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Echo costs total 12 maximum capacity. Run one 4-Cost Overlord (Crit Rate or Crit DMG), two 3-Cost Elites (matching Elemental DMG Bonus), and two 1-Cost Commons (ATK%). Never break your 5-piece Sonata effect!
              </p>
            </div>

            {/* Guide Card 2 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 font-black">
                2
              </div>
              <h3 className="font-bold text-white text-base">Multiplicative Outro Deepen</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unlike additive ATK% and Elemental DMG%, Outro Deepen buffs (e.g. Mortefi +38% Heavy Deepen, Sanhua +38% Basic Deepen) form a distinct multiplicative damage layer that multiplies your entire hypercarry burst.
              </p>
            </div>

            {/* Guide Card 3 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-black">
                3
              </div>
              <h3 className="font-bold text-white text-base">The 100% Guaranteed Weapon Banner</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Wuthering Waves has eliminated the 50/50 on the Weapon Event Convene. Pulling signature 5-star weapons at 80 pity is completely risk-free and often provides higher account value than chasing duplicate sequence copies.
              </p>
            </div>

            {/* Guide Card 4 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 font-black">
                4
              </div>
              <h3 className="font-bold text-white text-base">The Level 80 / Forte 8 Stopping Rule</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pushing from 80 to 90 and upgrading Forte skills from 8 to 10 eats over 52% of your Shell Credits and Waveplates for a mere 8–11% DPS increase. Park sub-DPS and support resonators at 80 to fund two full teams!
              </p>
            </div>

            {/* Guide Card 5 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 font-black">
                5
              </div>
              <h3 className="font-bold text-white text-base">Afterglow Coral Shop Strategy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Save 270 Afterglow Corals from lost 50/50s and 4-star duplicate pulls to purchase up to 2 featured sequence wavebands in the shop, securing vital early spikes like Jinhsi S1 or Changli S2 without spending Astrite.
              </p>
            </div>

            {/* Guide Card 6 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 font-black">
                6
              </div>
              <h3 className="font-bold text-white text-base">Tuning Refund Recycling Strategy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tune an Echo only to +5 or +10 first. If neither of the initial two rolls yields Crit Rate or Crit DMG, stop and recycle the piece into the next candidate to recoup 70% of invested Echo XP and save hundreds of Tuners!
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400">
            <HelpCircle className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {wuwaFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-slate-950/60 border border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-200 hover:text-cyan-300 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
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
            <Compass className="w-5 h-5 text-cyan-400" />
            Explore More Action & Gacha Game Hubs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div 
              onClick={() => onNavigate('/the-first-descendant')}
              className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">The First Descendant Hub</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Weapon Module DPS, Reactor Rolls, Void Shards & Boss loot.</p>
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
