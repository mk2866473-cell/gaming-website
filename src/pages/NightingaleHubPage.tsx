import React, { useState, useMemo } from 'react';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Boxes,
  Coins,
  HelpCircle,
  BookOpen,
  Check,
  Share2,
  ChevronDown,
  ChevronUp,
  Search,
  Layers,
  Scroll,
  Info,
  ShieldAlert
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../data/gamesAndTools';
import { NightingaleIcon } from '../components/GameIcons';

interface NightingaleHubPageProps {
  onNavigate: (path: string) => void;
}

export default function NightingaleHubPage({ onNavigate }: NightingaleHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter tools for Nightingale
  const nightingaleTools = useMemo(() => {
    return TOOLS.filter(
      (t) => t.gameId === 'nightingale' || t.tags.includes('nightingale')
    );
  }, []);

  const filteredTools = useMemo(() => {
    return nightingaleTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || tool.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [nightingaleTools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Nightingale', path: '/nightingale' }
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
      question: 'How do Realm Cards work in Nightingale?',
      answer: 'To open a Realm Portal, you combine a Biome Card (Forest, Swamp, Desert) with a Major Card (Abeyance, Antiquarian, Provisioner, Gloom, Hunt, Ascended Vaults). Biome Cards determine environment and flora/fauna, while Major Cards determine enemy difficulty, level scaling, boss encounters, and schematic traders.'
    },
    {
      question: 'What do Minor Realm Cards do?',
      answer: 'Minor Cards are played at Realmic Transmuters within an existing Realm to modify environmental weather, gravity, resource harvest yields (+50% to +100%), sprint stamina costs, and enemy aggro levels.'
    },
    {
      question: 'How is total Gear Score calculated in Nightingale?',
      answer: 'Your equipped Gear Score is the average across all 9 equipped equipment slots (Headgear, Top Coat, Leggings, Gloves, Boots, Cape, Mainhand Weapon, Offhand, Trinket). Upgrading items at workbenches (+1 to +3) and inserting Infusion slots raises item Gear Score.'
    },
    {
      question: 'What is Material Heritage in Nightingale crafting?',
      answer: 'Crafting materials (like Sun Giant Ingots vs Automaton Ingots, or Harpy Leather vs Carnute Hide) transfer their inherent stats directly into crafted weapons and armor. Choosing Sun Giant Ingots grants high Critical Damage (+25%), while Titan Ingots grant heavy Physical Damage.'
    }
  ];

  return (
    <div className="space-y-8 font-sans text-slate-100">
      <SEOHead
        title="Nightingale Tools Hub 2026 – Realm Card Matrix, Minor Cards, Gear Score & Material Stats"
        description="Comprehensive suite of 5 Nightingale gaslamp survival tools: Realm Card Crafting Matrix, Minor Card Modifier Simulator, Gear Score Tier Calculator, Resource Inherent Stats Optimizer, and Essence Trader Planner."
        canonicalPath="/nightingale"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-zinc-950 border border-emerald-500/20 p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center p-3 shadow-xl shrink-0">
                <NightingaleIcon className="w-full h-full" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider text-emerald-400">
                    Fae Realm Cartography
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400">5 Gaslamp Engines</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-teal-400">Inflexion Games Engine</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  Nightingale Tools Hub
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
                  Master the Fae Realms: Realm Card portal crafting matrix, Realmic Transmuter minor cards, equipped Gear Score gating, material heritage stats, and Essence Trader schematics.
                </p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="self-start sm:self-auto px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 transition-all flex items-center space-x-2 shadow-sm"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Hub'}</span>
            </button>
          </div>

          {/* Search & Category Filter Pills */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search Nightingale tools (e.g., realm cards, gear score, sun giant ingot)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
              {['all', 'calculators', 'simulators', 'optimizers', 'trackers'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" /> Nightingale Gaslamp Survival Utilities
          </h2>
          <span className="text-xs text-slate-400">
            Showing {filteredTools.length} of {nightingaleTools.length} tools
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, idx) => (
            <React.Fragment key={tool.id}>
              {idx === 3 && <div className="col-span-full"><AdLayout.HubInFeed /></div>}
              <ToolCard key={tool.id} tool={tool} onSelectTool={(slug) => onNavigate(`/tools/${slug}`)} />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Realm Mechanics Guide Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Nightingale Fae Realm & Crafting Guide</h3>
            <p className="text-xs text-slate-400">Key mechanics for surviving Fae portals and crafting high-tier gear score equipment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Scroll className="w-5 h-5" /> Realm Cards & Portal Power
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Realms are defined by combining <strong>Biome Cards</strong> (Forest, Swamp, Desert) with <strong>Major Cards</strong> (Antiquarian, Provisioner, Gloom, Hunt, Ascended Vaults). Major cards scale enemy level from Lv. 1 up to Lv. 160.
            </p>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-5 h-5" /> Gear Score & Portal Gating
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Portals enforce minimum Gear Score thresholds (e.g. GS 40+ for Provisioner, GS 100+ for Hunt, GS 180+ for Ascended Vaults). Upgrading items at workbenches (+1 to +3) and adding Infusions guarantees portal access.
            </p>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Boxes className="w-5 h-5" /> Material Heritage Crafting
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Crafting materials carry inherent stat traits into equipment. Using <strong>Sun Giant Ingots</strong> provides +25% Critical Damage, while <strong>Titan Bones</strong> provide +50 HP and +30% Melee Power.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-400">Common questions about Nightingale mechanics & tools</p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left font-semibold text-sm text-slate-200 flex items-center justify-between gap-4 hover:text-emerald-400"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-400 border-t border-slate-800/60 leading-relaxed">
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
  );
}
