import React, { useState, useMemo } from 'react';
import {
  Boxes,
  Terminal,
  ShoppingCart,
  HelpCircle,
  BookOpen,
  AlertTriangle,
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
  Video,
  Film,
  Users,
  Search,
  TrendingUp,
  ShieldAlert,
  Rocket
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import ToolCard from '../components/ToolCard';
import { TOOLS, ToolItem } from '../data/gamesAndTools';
import { LethalCompanyIcon } from '../components/GameIcons';

interface LethalCompanyHubPageProps {
  onNavigate: (path: string) => void;
}

export default function LethalCompanyHubPage({ onNavigate }: LethalCompanyHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter tools for Lethal Company & Content Warning
  const lethalTools = useMemo(() => {
    return TOOLS.filter(
      (t) => t.gameId === 'lethalcompany' || t.tags.includes('lethal company') || t.tags.includes('content warning')
    );
  }, []);

  const filteredTools = useMemo(() => {
    return lethalTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || tool.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [lethalTools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Lethal Company', path: '/lethal-company' }
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
      question: 'When is the best time to sell scrap in Lethal Company?',
      answer: 'Always wait until 0 Days Left (Deadline Day) when the Company Building pays 100% full buying rate. Selling on Days 1, 2, or 3 severely reduces scrap value (30% to 77%).'
    },
    {
      question: 'How is the overtime cash bonus calculated in Lethal Company?',
      answer: 'The Company awards an overtime cash bonus using the formula: Overtime Cash = Floor((Excess Scrap Sold) / 5) + (Days Remaining * $15). Selling surplus scrap above target grants 20% in direct shop credits.'
    },
    {
      question: 'What is the most cost-effective ship upgrade in Lethal Company?',
      answer: 'The Standard Teleporter ($375) provides the highest return on investment. It allows instant retrieval of deceased crew members back to the ship, completely eliminating the $20 corpse recovery penalty fee per player.'
    },
    {
      question: 'How do you maximize video views in Content Warning?',
      answer: 'Film at least 3 distinct monster species in a single video, record player screams and ragdoll falls, film face-to-camera intro/outro greetings (+1,200 views), and extract the camera safely.'
    }
  ];

  return (
    <div className="space-y-8 font-mono text-slate-100">
      <SEOHead
        title="Lethal Company & Content Warning Tools Hub 2026 – Quota, Bestiary & SpookTube Calculators"
        description="Complete suite of 5 tools for Lethal Company and Content Warning: Quota Profit Margin Matrix, Monster Danger Rating, Store Item Budget Planner, Ship Upgrade ROI, and SpookTube Views Calculator."
        canonicalPath="/games/lethal-company"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* Industrial Dark Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-amber-950/80 via-slate-900 to-slate-950 border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-3 shadow-xl shrink-0">
                <LethalCompanyIcon className="w-full h-full" />
              </div>
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider text-amber-400">
                    Industrial Survival Matrix
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400">5 Tactical Engines</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-emerald-400">The Company Verified</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Lethal Company & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Content Warning Hub</span>
                </h1>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  Optimize company deadline sales, evaluate monster spawn weights across Titan and Artifice, plan terminal store purchases with daily discounts, calculate ship upgrade ROI, and boost SpookTube viral video views.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl">
              <div className="text-center px-4 py-2 border-r border-slate-800">
                <div className="text-2xl font-black text-amber-400">100%</div>
                <div className="text-[11px] text-slate-400 font-semibold uppercase">Deadline Rate</div>
              </div>
              <div className="text-center px-4 py-2 border-r border-slate-800">
                <div className="text-2xl font-black text-emerald-400">5 Tools</div>
                <div className="text-[11px] text-slate-400 font-semibold uppercase">Calculators</div>
              </div>
              <div className="text-center px-4 py-2">
                <div className="text-2xl font-black text-purple-400">SpookTube</div>
                <div className="text-[11px] text-slate-400 font-semibold uppercase">Content Warning</div>
              </div>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g., quota, monster, store, teleporter, spooktube)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-sans"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All 5 Tools' },
              { id: 'calculators', label: 'Calculators' },
              { id: 'planners', label: 'Planners' },
              { id: 'trackers', label: 'Trackers & Bestiary' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 border-amber-400 text-black font-bold'
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
            <ToolCard tool={tool} onSelectTool={(slug) => onNavigate(`/tools/${slug}`)} />
          </React.Fragment>
        ))}
      </div>

      {/* Mechanics Guide Section */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Lethal Company & Content Warning Mechanics Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 font-sans leading-relaxed">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2 font-mono">
              <TrendingUp className="w-4 h-4" /> 4-Day Quota Cycle Strategy
            </h3>
            <p>
              Scrap value at the Company Building scales exponentially based on the deadline countdown: <strong>Day 1 (30%)</strong>, <strong>Day 2 (57%)</strong>, <strong>Day 3 (77%)</strong>, and <strong>Deadline Day 0 (100%)</strong>. Selling early incurs a severe cash penalty. Always hoard scrap on the ship until 0 Days Left.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-red-400 text-sm flex items-center gap-2 font-mono">
              <ShieldAlert className="w-4 h-4" /> Moon Power Caps & Monsters
            </h3>
            <p>
              Each moon limits entity counts using Indoor and Outdoor Power Caps. Early moons like Experimentation cap at 4 indoor power, whereas endgame moons like <strong>Titan (18 power)</strong> and <strong>Artifice (30 power)</strong> spawn Jesters, Coil-Heads, and Old Birds in swarms.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-cyan-400 text-sm flex items-center gap-2 font-mono">
              <Rocket className="w-4 h-4" /> Corpse Recovery & Teleporter ROI
            </h3>
            <p>
              When crew members perish, the Company deducts a $20 body recovery penalty fee per lost corpse. Purchasing the <strong>Standard Teleporter ($375)</strong> allows instant body retrieval, paying for itself after recovering 18–19 corpses.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-purple-400 text-sm flex items-center gap-2 font-mono">
              <Video className="w-4 h-4" /> SpookTube Content Warning Virality
            </h3>
            <p>
              Content Warning requires meeting subscriber view thresholds across 3-day diving cycles. Filming multiple unique monster species, recording teammate screams/ragdolls, and using Reporter Microphones generates massive view multipliers.
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
                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
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
