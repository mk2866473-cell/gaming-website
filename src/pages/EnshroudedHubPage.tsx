import React, { useState, useMemo } from 'react';
import {
  Flame,
  Hammer,
  Boxes,
  HelpCircle,
  BookOpen,
  Check,
  Share2,
  Star,
  ChevronDown,
  ChevronUp,
  Binary,
  Lightbulb,
  Compass,
  Info,
  ShieldCheck,
  Sparkles,
  Layers,
  Castle,
  Search,
  Users,
  Bed,
  Wind
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../data/gamesAndTools';
import { EnshroudedIcon } from '../components/GameIcons';

interface EnshroudedHubPageProps {
  onNavigate: (path: string) => void;
}

export default function EnshroudedHubPage({ onNavigate }: EnshroudedHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter tools for Enshrouded
  const enshroudedTools = useMemo(() => {
    return TOOLS.filter(
      (t) => t.gameId === 'enshrouded' || t.tags.includes('enshrouded')
    );
  }, []);

  const filteredTools = useMemo(() => {
    return enshroudedTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || tool.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [enshroudedTools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Enshrouded', path: '/enshrouded' }
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
      question: 'How do you upgrade your Flame Altar Level in Enshrouded?',
      answer: 'Flame Altars are upgraded at your base using Sparks (found at Flame Shrines) plus regional sacrifice materials (Resin, Red Mushrooms, Bones, Animal Fur, Liquid Shroud) and Elixir Well boss heads (Fell Thunderbrute, Scavenger Matron, Fell Wyvern).'
    },
    {
      question: 'How does Comfort score increase Rested Buff duration?',
      answer: 'Enclosure under a roof gives a baseline 5 minutes of Rested duration. Every 1 point of Comfort adds +1 minute to the timer ($5\text{m base} + \text{Comfort Score}$). High-tier beds, hearths, and rugs grant the highest Comfort values.'
    },
    {
      question: 'How many skill points can you get in Enshrouded?',
      answer: 'Reaching the Level 35 character cap yields 34 skill points. Destroying all 25 Shroud Roots across Embervale awards +25 permanent bonus skill points, for a total of 59 Skill Points.'
    },
    {
      question: 'Which glider is the fastest in Enshrouded?',
      answer: 'The Ghost Glider is the pinnacle endgame glider, offering 25 m/s flight velocity and a minimal stamina drain rate of only 2 stamina per second.'
    }
  ];

  return (
    <div className="space-y-8 font-sans text-slate-100">
      <SEOHead
        title="Enshrouded Tools Hub 2026 – Flame Altar, Building Blocks, Skill Tree & Rested Buff Calculators"
        description="Comprehensive suite of 6 Enshrouded tools: Flame Altar Upgrade Cost Calculator, Building Block Material Requirements, Survivor Recipe Finder, Comfort Rested Buff Timer, Skill Tree Planner, and Glider Tier Upgrader."
        canonicalPath="/games/enshrouded"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Unified Hub Header */}
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <EnshroudedIcon className="w-7 h-7" />
            </div>
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
                Enshrouded Tools Hub
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed">
                Calculate Flame Altar sacrifice costs and Shroud passage levels, estimate building block materials, search Survivor NPC recipes, optimize house Comfort for Rested buff timers, plan circular skill trees, and upgrade gliders.
              </p>
              <div className="text-xs font-mono text-[var(--muted)] tabular-nums">
                {enshroudedTools.length} tools
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl p-3.5 shrink-0">
            <div className="text-center px-3 py-1 border-r border-[var(--border)] font-mono">
              <div className="text-lg font-bold text-amber-400">Lvl 6</div>
              <div className="text-[11px] text-[var(--muted)] uppercase">Flame Altar</div>
            </div>
            <div className="text-center px-3 py-1 font-mono">
              <div className="text-lg font-bold text-purple-400">59 Pts</div>
              <div className="text-[11px] text-[var(--muted)] uppercase">Skill Cap</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search Enshrouded tools"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g., flame altar, blocks, survivor, comfort, skill tree, glider)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-[var(--muted)] focus:outline-none focus:border-amber-500 font-sans"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All 6 Tools' },
              { id: 'calculators', label: 'Calculators' },
              { id: 'builders', label: 'Planners & Builders' },
              { id: 'trackers', label: 'Trackers & Database' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, idx) => (
          <React.Fragment key={tool.id}>
            {idx === 3 && <div className="col-span-full"><AdLayout.HubInFeed /></div>}
            <ToolCard key={tool.id} tool={tool} onSelectTool={(slug) => onNavigate(`/tools/${slug}`)} />
          </React.Fragment>
        ))}
      </div>

      {/* Mechanics Overview */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Enshrouded Survival & Crafting Mechanics Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 font-sans leading-relaxed">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2 font-mono">
              <Flame className="w-4 h-4" /> Flame Altar Passage Levels
            </h3>
            <p>
              Upgrading your Flame Altar is mandatory to survive deadly Red Shroud zones across Revelwood, Nomad Highlands, and Kindlewastes. Each altar level unlocks higher Shroud passage immunity and expands your base build boundary up to 160×160 meters.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-2 font-mono">
              <Bed className="w-4 h-4" /> House Comfort & Rested Buffs
            </h3>
            <p>
              Placing diverse furniture (Palm Beds, Armchairs, Carved Tables, Hearths, Bear Rugs) increases your home Comfort Score. The Rested Buff grants up to +50% Stamina Regeneration, lasting 5 minutes base + 1 minute per Comfort point.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-cyan-400 text-sm flex items-center gap-2 font-mono">
              <Sparkles className="w-4 h-4" /> Circular Skill Tree & Shroud Roots
            </h3>
            <p>
              Enshrouded features a circular 12-class skill tree. Leveling up to Level 35 awards 34 skill points, while clearing Shroud Roots awards up to +25 bonus points for a total budget of 59 Skill Points.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-purple-400 text-sm flex items-center gap-2 font-mono">
              <Wind className="w-4 h-4" /> Glider & Grappling Hook Upgrades
            </h3>
            <p>
              Upgrading from the Basic Glider (10 m/s) to the Ghost Glider (25 m/s, 2 stamina/sec drain) drastically expands exploration reach. Pair Ghost Glider with Double Jump for ground takeoff!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/80 transition"
                >
                  <span className="font-semibold text-xs sm:text-sm text-slate-200 flex items-center gap-2">
                    <span className="text-amber-400 font-bold font-mono">Q{idx + 1}.</span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--muted)] flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 pt-1 border-t border-slate-800/80 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans bg-slate-900/30">
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
    </div>
  );
}
