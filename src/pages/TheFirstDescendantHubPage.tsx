/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Cpu, Search, ArrowRight, Star, ShieldCheck, Zap, 
  Coins, Layers, TrendingUp, Trophy, HelpCircle, ChevronDown, 
  ChevronUp, Lightbulb, Binary, Compass, Crosshair, Clock, Boxes, Shield
} from 'lucide-react';
import { TOOLS } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { AdLayout } from '../components/ads/AdLayout';
import { getGameIcon } from '../components/GameIcons';

interface TheFirstDescendantHubPageProps {
  onNavigate: (path: string) => void;
}

export default function TheFirstDescendantHubPage({ onNavigate }: TheFirstDescendantHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const tfdTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'tfd');
  }, []);

  const categories = [
    { id: 'all', name: `All TFD Tools (${tfdTools.length || 8})` },
    { id: 'damage', name: 'Weapon & Skill Damage (DPS, Skill, Reactor)' },
    { id: 'builds', name: 'Builds & Colossi (Components, Weakness Matrix)' },
    { id: 'farming', name: 'Farming & Timers (Amorphous, Kuiper, Invasions)' }
  ];

  const filteredTools = useMemo(() => {
    return tfdTools.filter(tool => {
      const matchQuery =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchCategory = true;
      if (selectedCategory === 'damage') {
        matchCategory = ['tfd-weapon-dps-calculator', 'tfd-skill-damage-simulator', 'tfd-reactor-checker'].includes(tool.id);
      } else if (selectedCategory === 'builds') {
        matchCategory = ['tfd-component-optimizer', 'tfd-colossus-weakness-calculator'].includes(tool.id);
      } else if (selectedCategory === 'farming') {
        matchCategory = ['tfd-amorphous-tracker', 'tfd-gold-kuiper-calculator', 'tfd-invasion-timer'].includes(tool.id);
      }

      return matchQuery && matchCategory;
    });
  }, [tfdTools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'The First Descendant Hub', path: '/the-first-descendant' }
  ];

  const tfdFaqs = [
    {
      question: 'How do Energy Activators and Crystallization Catalysts expand weapon builds?',
      answer: 'Applying an Energy Activator permanently increases weapon module capacity by +20 (from 50 to 70 at Lv 40). Each Crystallization Catalyst polarizes a module slot, halving (rounded up) the capacity cost of any module with a matching socket polarity icon.'
    },
    {
      question: 'What is the difference between Skill Power and Skill Power Modifier in TFD?',
      answer: 'Skill Power is the flat base power inherited from your Descendant and equipped Reactor. Skill Power Modifier is the percentage multiplier applied to that flat number. For high base multiplier skills (Lepic Overkill), stack Skill Power Boost; for low base multiplier skills (Bunny Lightning Emission), flat Skill Power Modifier increases damage dramatically.'
    },
    {
      question: 'Why is Reactor 160% Weapon Mounting mandatory for endgame builds?',
      answer: 'Ultimate Reactors have an optimization condition that requires holding a specific Ultimate Weapon in your hands during combat. Fulfilling this condition multiplies total Skill Power by 1.6× (+160%), which is vital for clearing Hard Mode Void Intercept boss battles.'
    },
    {
      question: 'How do you stall a Colossus frenzy enrage using the grapple hook?',
      answer: 'When a Colossus part flashes yellow, fire your grapple hook at it and HOLD ON. Do not hit the break button! Hanging onto the yellow armor piece freezes the boss in place for up to 10 seconds and prevents its rage bar from filling.'
    },
    {
      question: 'What is the fastest way to farm Gold and Kuiper Shards in The First Descendant?',
      answer: 'Sterile Land Block Kuiper Mining and Echo Swamp Abandoned Refinery are the two fastest farming loops. Running these areas with an Electric mobbing Bunny produces over 400,000 Kuiper Shards and 3.5 Million Gold per hour.'
    }
  ];

  return (
    <>
      <SEOHead
        title="The First Descendant Calculators & Build Tools 2026 – DPS, Skills & Colossus Guide"
        description="Comprehensive suite of 8 The First Descendant tools: Weapon DPS Calculator, Descendant Skill Damage Simulator, Reactor Perfect-Roll Checker, Amorphous Material Tracker, Component Set Optimizer, Gold & Kuiper Leveling Calculator, Daily Invasion Timer, and Colossus Weakness Matrix."
        canonicalPath="/games/the-first-descendant"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Breadcrumb & Hero Header */}
        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="relative rounded-3xl bg-gradient-to-br from-cyan-950/70 via-slate-900 to-violet-950/80 border border-cyan-500/30 p-6 sm:p-10 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                {getGameIcon('tfd', 'w-4 h-4')}
                <span>The First Descendant Engineering Suite • 2026 Season Meta</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="p-2 sm:p-2.5 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 shadow-lg inline-flex items-center justify-center shrink-0">
                  {getGameIcon('tfd', 'w-8 h-8 sm:w-11 sm:h-11')}
                </span>
                <span>The First Descendant Calculators & Tools</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Complete verified suite of 8 professional The First Descendant tools: True Raw & Sustained Weapon DPS, Descendant Skill Damage Simulator, Reactor Perfect-Roll God-Score Checker, Amorphous Drop & Void Shard Tracker, External Component Set Optimizer, Gold/Kuiper Leveling Calculator, Daily Invasion & Boss Mechanics Timer, and Colossus Weakness & Resistance Matrix.
              </p>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-cyan-500/20 rounded-xl p-3">
                  <div className="text-xl font-bold text-cyan-400 font-mono">8 Tools</div>
                  <div className="text-xs text-slate-400">Complete TFD Suite</div>
                </div>
                <div className="bg-slate-900/80 border border-cyan-500/20 rounded-xl p-3">
                  <div className="text-xl font-bold text-violet-400 font-mono">160%</div>
                  <div className="text-xs text-slate-400">Reactor Mounting Multiplier</div>
                </div>
                <div className="bg-slate-900/80 border border-cyan-500/20 rounded-xl p-3">
                  <div className="text-xl font-bold text-amber-400 font-mono">70 Cap</div>
                  <div className="text-xs text-slate-400">Energy Activator Max</div>
                </div>
                <div className="bg-slate-900/80 border border-cyan-500/20 rounded-xl p-3">
                  <div className="text-xl font-bold text-emerald-400 font-mono">07:00 UTC</div>
                  <div className="text-xs text-slate-400">Daily Invasion Reset</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hub Top Banner Ad Slot */}
        <AdLayout.HubTop />

        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search TFD tools (e.g., DPS, Lepic, Reactor, Amorphous, Kuiper, Gluttony, Slayer)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-950/40'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid with Desktop Sidebar Ad Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>The First Descendant Calculators & Tool Suite</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredTools.length} of {tfdTools.length} tools
              </span>
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-3">
                <p className="text-slate-400 text-sm">No The First Descendant tools match your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Desktop Right Sidebar Tips Placement */}
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>Pro Build Tips (2026 Meta)</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>DEF Cap Diminishing Returns:</strong> DEF scaling drops significantly after 30,000. Prioritize Max HP components for 3x effective survival.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Reactor Mounting:</strong> Keep your named Ultimate weapon held in hand; holstered weapons do not activate the 160% bonus!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Colossus Grapple:</strong> Hold onto flashing yellow armor plates to freeze the Colossus and stall wipe meters for up to 10 seconds.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Game Mechanics & Formulas Explainer Section */}
        <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Binary className="w-4 h-4" />
            <span>Core Game Mechanics & Verified Theorycrafting Math</span>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            How The First Descendant Mathematical Formulas Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Crosshair className="w-4 h-4" />
                <h3>Weapon True DPS Formula</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                True raw burst DPS accounts for fire rate and critical strike expectation:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl font-mono text-[11px] text-cyan-300 border border-slate-800/80">
                BurstDPS = BaseATK × [1 + (CritRate × CritDMG)] × (RPM / 60)
              </div>
              <p className="text-[11px] text-slate-400">
                Sustained DPS subtracts reload downtime: (MagSize × AvgShot) / (DepletionSecs + ReloadSecs).
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-violet-300 font-bold text-sm">
                <Zap className="w-4 h-4" />
                <h3>Skill Power Scaling Math</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Total skill power combines character base with 1.6× reactor mounting:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl font-mono text-[11px] text-violet-300 border border-slate-800/80">
                SkillPower = (BaseSP + ReactorSP × 1.6) × (1 + Boost%)
              </div>
              <p className="text-[11px] text-slate-400">
                Hit Damage multiplies by (BaseModifier + FlatMod%) and elemental bonuses.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Coins className="w-4 h-4" />
                <h3>Module Economy Scaling</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upgrading modules from Lv 0 to 10 follows a steep progression curve:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl font-mono text-[11px] text-amber-300 border border-slate-800/80">
                Levels 7 to 10 = ~63% of Total Kuiper & Gold Cost
              </div>
              <p className="text-[11px] text-slate-400">
                Maxing an Ultimate module requires 312,000 Kuiper and 3,120,000 Gold.
              </p>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            The First Descendant Player Guide & Mechanics FAQ
          </h2>

          <div className="space-y-3">
            {tfdFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white hover:text-cyan-300 transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4">
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
