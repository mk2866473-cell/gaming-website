/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Swords, Search, Award, ShieldCheck, Layers, TrendingUp, 
  Trophy, HelpCircle, ChevronDown, ChevronUp, Lightbulb, 
  Binary, Compass, Crosshair, Sparkles, Target, Coins, 
  Users, ArrowRight, ShieldAlert, Crown, Package, Flame
} from 'lucide-react';
import { TOOLS } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { AdLayout } from '../components/ads/AdLayout';
import { TypeSoulIcon } from '../components/GameIcons';
import HubCodesBanner from '../components/HubCodesBanner';

interface TypeSoulHubPageProps {
  onNavigate: (path: string) => void;
}

export default function TypeSoulHubPage({ onNavigate }: TypeSoulHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const typeSoulTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'typesoul');
  }, []);

  const categories = [
    { id: 'all', name: `All Type Soul Tools (${typeSoulTools.length || 6})` },
    { id: 'builds', name: 'Stats & Combos (Tree Allocator, Combo Gauge)' },
    { id: 'progression', name: 'Grades & Evolution (Grade Calculator, Bankai Tracker)' },
    { id: 'gacha', name: 'Clans & Raids (Clan Reroll, True Hogyoku Drops)' },
  ];

  const filteredTools = useMemo(() => {
    return typeSoulTools.filter(tool => {
      const matchQuery =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchCategory = true;
      if (selectedCategory === 'builds') {
        matchCategory = ['type-soul-stat-planner', 'type-soul-combo-gauge'].includes(tool.id);
      } else if (selectedCategory === 'progression') {
        matchCategory = ['type-soul-grade-calculator', 'type-soul-evolution-tracker'].includes(tool.id);
      } else if (selectedCategory === 'gacha') {
        matchCategory = ['type-soul-clan-buff-simulator', 'type-soul-raid-drop-checker'].includes(tool.id);
      }

      return matchQuery && matchCategory;
    });
  }, [typeSoulTools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Roblox Type Soul Hub', path: '/type-soul' }
  ];

  const typeSoulFaqs = [
    {
      question: 'How do you reach Elite Grade (60 Points) in Type Soul?',
      answer: 'Reaching Elite Grade requires progressing through Trainee, Junior, Semi-Grade 2, Grade 2, Semi-Grade 1, Grade 1, and Semi-Special Grade. You must accumulate Division Duty quests, Mission Board points, and secure at least 65 Player Grips and 10 Raid victories.'
    },
    {
      question: 'How does the Hybrid Lockout Warning work in Type Soul?',
      answer: 'Investing 40 or more points into any single stat (e.g. 40 Kendo) permanently designates that tree as your Primary Master path, locking you out of 40+ master skills in all other trees. To build a true dual hybrid, stay at 30/30 (e.g. 30 Kendo / 30 Speed).'
    },
    {
      question: 'What are the exact requirements for Bankai / Resurrección Stage 2?',
      answer: 'Stage 2 requires exactly 26 Player Grips, 15 Faction Raid wins (in Karakura Town or Soul Society), and 1 successful completion of the Hollow Parry mini-game. Dying to enemy players can reset your grips count, so caution is advised.'
    },
    {
      question: 'What is the drop rate of True Hogyoku in Type Soul raids?',
      answer: 'True Hogyoku has an estimated 0.1% drop rate (1 in 1,000 chests) from standard Karakura Town and Faction Raids, while Clan Wars offer double chest rewards.'
    },
    {
      question: 'Which Clan is considered the best in Roblox Type Soul?',
      answer: 'For Kendo and melee physical builds, Zaraki (+25% Posture, +15% Slash DMG, Berserker poise) is top tier. For speed and general mobility, Kurosaki and Shihoin dominate, while Cifer is the undisputed king of Arrancar builds.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Roblox Type Soul Calculators & Build Tools 2026 – Bankai, Stats & Clans Guide"
        description="Comprehensive suite of 6 Roblox Type Soul tools: Stat Skill Tree Allocator with hybrid lockout warnings, Grade Progression Requirement Calculator, Shikai/Bankai/Resurrección Evolution Stage Tracker, Raid Reward & True Hogyoku Drop Rate Checker, Clan Rarity & Buff Simulator, and Abilities Combo Gauge."
        canonicalPath="/games/type-soul"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Dynamic Game Codes Banner */}
        <HubCodesBanner hubPath="/games/type-soul" onNavigate={onNavigate} />

        {/* Breadcrumb & Hero Header */}
        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8 space-y-5">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4 max-w-3xl">
                <div className="w-12 h-12 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                  <TypeSoulIcon className="w-7 h-7" />
                </div>
                <div className="space-y-2 min-w-0">
                  <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
                    Roblox Type Soul Calculators & Build Tools
                  </h1>
                  <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-2xl">
                    Dominate Hueco Mundo, Soul Society, and Karakura Town. Allocate 60-point Elite Grade stats, calculate promotion requirements, track Bankai/Resurrección stages, simulate 0.5% Mythical clans, check True Hogyoku raid drops, and test True Combo guard breaks.
                  </p>
                  <p className="text-xs font-mono text-[var(--muted)] tabular-nums">
                    {typeSoulTools.length} tools
                  </p>
                </div>
              </div>

              {/* Quick Metrics Card */}
              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
                <div className="bg-[var(--bg)] p-3 rounded-xl border border-[var(--border)] text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-soft)] block">Elite Grade</span>
                  <span className="text-xl font-bold text-amber-400 font-mono">60 PTS</span>
                  <span className="text-[10px] text-[var(--muted)] block mt-0.5">Max Stat Cap</span>
                </div>
                <div className="bg-[var(--bg)] p-3 rounded-xl border border-[var(--border)] text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-soft)] block">Mythical Clans</span>
                  <span className="text-xl font-bold text-purple-400 font-mono">0.5% Rate</span>
                  <span className="text-[10px] text-[var(--muted)] block mt-0.5">Kurosaki, Zaraki</span>
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
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
              <input
                type="text"
                aria-label="Search Type Soul tools"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Type Soul tools (e.g. stat tree, bankai, grade, clan, raid, combo)..."
                className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-[12px] pl-10 pr-4 py-2.5 text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-all"
              />
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-1.5 self-center sm:self-auto">
              <span>Showing <strong>{filteredTools.length}</strong> of <strong>{typeSoulTools.length}</strong> tools</span>
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
                    ? 'bg-red-600 text-white font-bold border-red-400 shadow-md shadow-red-600/10'
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
              <Sparkles className="w-5 h-5 text-red-400" />
              Available Roblox Type Soul Calculators & Guides
            </h2>
          </div>

          {filteredTools.length > 0 ? (
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
          ) : (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <Swords className="w-10 h-10 text-red-500/40 mx-auto" />
              <p className="text-base text-slate-300 font-semibold">No Type Soul tools match your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-red-300 rounded-xl text-xs font-bold transition-colors"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>

        {/* Comprehensive Guide & Mechanics Deep-Dive */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="space-y-2 border-b border-slate-800 pb-6">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" /> Type Soul Combat & Progression Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Endgame Mastery Guide: Stats, Bankai & Raids
            </h2>
            <p className="text-sm text-slate-400 max-w-3xl">
              Essential knowledge to conquer Ranked 1v1s, defeat Zanpakuto Spirit Bosses, and navigate Grade promotions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-300">
            {/* Guide Card 1 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-800 flex items-center justify-center text-red-400 font-black">
                1
              </div>
              <h3 className="font-bold text-white text-base">The 40-Point Master Lockout</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Investing 40 or more points into any single stat tree locks that path as your Master specialty, permanently barring you from reaching 40+ master skills in other trees. For pure hybrids, stay at 30/30!
              </p>
            </div>

            {/* Guide Card 2 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 font-black">
                2
              </div>
              <h3 className="font-bold text-white text-base">Bankai Stage 2 Grip Survival</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stage 2 demands 26 Grips and 15 Raids. Player deaths can wipe your grip counter, so avoid high-danger public servers and farm grips in Hueco Mundo during off-peak hours.
              </p>
            </div>

            {/* Guide Card 3 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 font-black">
                3
              </div>
              <h3 className="font-bold text-white text-base">Spirit Boss Wall Cheese</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Defeating your Zanpakuto spirit can be brutal. Back yourself into a corner pillar so the AI cannot flash-step behind your guard, and execute heavy unguardable moves on recovery.
              </p>
            </div>

            {/* Guide Card 4 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-black">
                4
              </div>
              <h3 className="font-bold text-white text-base">True Hogyoku Raid Farming</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                With a 0.1% drop rate, True Hogyoku requires consistent raid farming. Prioritize Clan Wars for double chest yields, and use Hogyoku Fragments (0.5%) for intermediate transformations.
              </p>
            </div>

            {/* Guide Card 5 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 font-black">
                5
              </div>
              <h3 className="font-bold text-white text-base">Mythical Clan Synergies</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Match your Clan with your build: Zaraki (+25% Posture, +15% Slash) is the undisputed King of Kendo, Kurosaki dominates Speed/Kido, and Cifer provides Arrancars with aerial flight and Lanza buffs.
              </p>
            </div>

            {/* Guide Card 6 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 font-black">
                6
              </div>
              <h3 className="font-bold text-white text-base">100 Posture Guard Breaks</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Attacks like Kendo Split Gate and Hakuda Earth Splitter deal 40–55 Posture Damage. Chaining Flowing Water into Split Gate breaks full 100 Posture, leaving opponents vulnerable to execution.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-red-400">
            <HelpCircle className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {typeSoulFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-slate-950/60 border border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-200 hover:text-red-300 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-red-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[var(--muted)] shrink-0 ml-2" />
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
            <Compass className="w-5 h-5 text-red-400" />
            Explore More Action & RPG Game Hubs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div 
              onClick={() => onNavigate('/zenless-zone-zero')}
              className="bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-4 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">Zenless Zone Zero Hub</span>
                <ArrowRight className="w-4 h-4 text-[var(--muted)] group-hover:text-purple-400 transition-colors" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Drive Disc Optimizer, 90 Pity, Daze Multipliers & Bangboos.</p>
            </div>

            <div 
              onClick={() => onNavigate('/wuthering-waves')}
              className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">Wuthering Waves Hub</span>
                <ArrowRight className="w-4 h-4 text-[var(--muted)] group-hover:text-cyan-400 transition-colors" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Echo Tuning Evaluator, 80 Pity, S0-S6 Dupes & Sonata Builder.</p>
            </div>

            <div 
              onClick={() => onNavigate('/the-first-descendant')}
              className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">The First Descendant Hub</span>
                <ArrowRight className="w-4 h-4 text-[var(--muted)] group-hover:text-cyan-400 transition-colors" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Weapon Module DPS, Reactor Rolls, Void Shards & Boss loot.</p>
            </div>
          </div>
        </div>

        {/* Hub Above Footer Banner Ad Slot */}
        <AdLayout.HubAboveFooter />
      </div>
    </>
  );
}
