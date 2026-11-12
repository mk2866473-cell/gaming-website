/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Crosshair, Shield, Award, Sparkles, Target, Zap, 
  Search, Sliders, ChevronRight, CheckCircle2, Flame,
  Compass, Radio, Ship, Trophy, ArrowRight, Check, Share2,
  Star, ChevronDown, ChevronUp, Binary, Lightbulb, Info,
  ShieldCheck, Layers, BookOpen
} from 'lucide-react';
import { TOOLS, ToolItem } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import { getGameIcon } from '../components/GameIcons';

interface HelldiversHubPageProps {
  onNavigate: (path: string) => void;
}

const HELLDIVERS_FAQS = [
  {
    question: "How does Armor Penetration (AP) work against Terminids and Automatons in Helldivers 2?",
    answer: "Every enemy limb has an armor rating from 1 (unarmored) to 6 (heavy vehicle armor). If your weapon AP equals the enemy armor, you deal 50% damage with white hitmarkers. If weapon AP exceeds enemy armor, you deal 100% full damage with red hitmarkers. If weapon AP is lower, bullets ricochet dealing 0% damage."
  },
  {
    question: "What is the fastest way to farm Super Credits for free Warbonds in 2026?",
    answer: "Run Trivial (Difficulty 1) missions on open flat planets like Crimsica or Estanu. Bring light armor and a Jump Pack or Jetpack, sprint between Points of Interest (POIs), open cargo containers with grenades, and grab the 10-100 Super Credit piles. Force abandon without extracting to keep all collected credits instantly."
  },
  {
    question: "What are the caps on Medals, Samples, and Requisition Slips?",
    answer: "The hard caps are: 250 Warbond Medals, 50,000 Requisition Slips, 500 Common Samples, 250 Rare Samples, and 100 Super Uranium Samples. Once capped, any additional rewards are forfeited until spent."
  },
  {
    question: "How do Planet Liberation rates work during Major Orders?",
    answer: "Planetary liberation uses a decay mechanic where enemies inflict an hourly resistance percentage (typically 1.0% to 2.5%/hr). Helldivers gain liberation by completing 3-mission operations. Winning operations on Level 9 Helldive yields the highest squad impact multiplier."
  }
];

export default function HelldiversHubPage({ onNavigate }: HelldiversHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter Helldivers 2 tools
  const helldiversTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'helldivers2' || t.gameId === 'helldivers-2' || t.slug.startsWith('helldivers-2'));
  }, []);

  const tagsList = useMemo(() => {
    return [
      { id: 'all', label: 'All 16 Tools' },
      { id: 'combat', label: 'Combat & Damage' },
      { id: 'armory', label: 'Armor & Recoil' },
      { id: 'logistics', label: 'Medals & Super Credits' },
      { id: 'stratagems', label: 'Stratagems & War Map' }
    ];
  }, []);

  const filteredTools = useMemo(() => {
    return helldiversTools.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedTag === 'combat') {
        return tool.id.includes('damage') || tool.id.includes('dps') || tool.id.includes('ttk') || tool.id.includes('enemy');
      }
      if (selectedTag === 'armory') {
        return tool.id.includes('armor') || tool.id.includes('recoil');
      }
      if (selectedTag === 'logistics') {
        return tool.id.includes('super-credits') || tool.id.includes('warbond') || tool.id.includes('sample') || tool.id.includes('ship') || tool.id.includes('xp');
      }
      if (selectedTag === 'stratagems') {
        return tool.id.includes('stratagem') || tool.id.includes('major-order');
      }

      return true;
    });
  }, [helldiversTools, searchQuery, selectedTag]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Helldivers 2 Utilities', path: '/helldivers-2' }
  ];

  return (
    <div className="min-h-screen bg-[#05070f] text-zinc-100 font-sans pb-16">
      <SEOHead
        title="Helldivers 2 Utilities Hub - 16 Free Calculators, Recoil & War Maps 2026"
        description="Official Helldivers 2 Utilities Hub 2026. 16 free calculators: Recoil Pattern Visualizer, Enemy Weakness Matrix, Armor Tier List, Super Credits Farm, Warbond Medals, and Galactic War Map."
        canonicalPath="/games/helldivers-2"
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop currentPath="/helldivers-2" />

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-[#090d1a] via-[#070a14] to-[#05070f] border-b border-zinc-800/80 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE900]/10 border border-[#FFE900]/30 text-[#FFE900] text-xs font-mono font-bold uppercase tracking-widest">
                <Crosshair className="w-3.5 h-3.5 animate-pulse" />
                Super Earth Logistics Hub (2026 Verified)
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-wide uppercase flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="p-2 sm:p-2.5 rounded-2xl bg-yellow-950/80 border border-yellow-500/40 shadow-lg inline-flex items-center justify-center shrink-0">
                  {getGameIcon('helldivers-2', 'w-8 h-8 sm:w-11 sm:h-11')}
                </span>
                <span>Helldivers 2 <span className="text-[#FFE900]">Utilities & Calculators</span></span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                All 16 official Helldivers 2 tactical calculators: Recoil pattern visualizers, enemy weakness counter matrix, armor tier lists, super credits farm planners, and live galactic war map trackers.
              </p>
            </div>

            {/* Quick Stat Card */}
            <div className="bg-zinc-950/80 border-2 border-[#FFE900]/40 rounded-2xl p-5 shadow-2xl shrink-0 space-y-2 text-center min-w-[220px]">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">AVAILABLE TOOLS</span>
              <div className="text-3xl font-black text-[#FFE900] font-mono">16 Utilities</div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">✓ 100% Free & Updated 2026</span>
            </div>
          </div>

          {/* Search & Tag Filter Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                aria-label="Search Helldivers 2 tools"
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search 16 Helldivers 2 tools (e.g. Recoil, Armor, Super Credits, Enemies)..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE900] transition"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {tagsList.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition border ${
                    selectedTag === tag.id
                      ? 'bg-[#FFE900] text-black border-[#FFE900] shadow'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main 8-Col Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-base font-black uppercase text-white tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFE900]" />
                Helldivers 2 Tactical Tools ({filteredTools.length})
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                Click any tool to open instantly
              </span>
            </div>

            {filteredTools.length === 0 ? (
              <div className="p-12 text-center bg-zinc-950/60 rounded-2xl border border-zinc-800 space-y-3">
                <p className="text-sm font-bold text-zinc-400">No Helldivers 2 tools matching "{searchQuery}"</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedTag('all'); }}
                  className="px-4 py-2 rounded-xl bg-[#FFE900] text-black font-black uppercase text-xs cursor-pointer"
                >
                  Reset Search & Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTools.map((tool, idx) => (
                  <React.Fragment key={tool.id}>
                    {idx === 9 && <AdLayout.HubInFeed />}
                    <ToolCard 
                      tool={tool} 
                      onSelectTool={(slug) => onNavigate(`/tools/${slug}`)} 
                    />
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Helldivers 2 Tactical Guide */}
            <section className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                <BookOpen className="w-5 h-5 text-[#FFE900]" />
                <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
                  Super Earth Combat Mechanics & Armor Penetration
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/60 border border-zinc-800/90 rounded-xl p-4 flex gap-3.5">
                  <span className="w-7 h-7 rounded-lg bg-[#FFE900]/10 border border-[#FFE900]/30 text-[#FFE900] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                    AP
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-200 mb-1">Armor Penetration Match</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      White hitmarkers indicate glancing hits dealing 50% damage. Red hitmarkers indicate full overmatching penetration (100% damage).
                    </p>
                  </div>
                </div>

                <div className="bg-black/60 border border-zinc-800/90 rounded-xl p-4 flex gap-3.5">
                  <span className="w-7 h-7 rounded-lg bg-[#FFE900]/10 border border-[#FFE900]/30 text-[#FFE900] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                    RC
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-200 mb-1">Recoil & Ergonomics</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Crouching reduces weapon spread by 30%. Prone reduces recoil by 50%. The Engineering Kit armor passive grants an additional 30% reduction.
                    </p>
                  </div>
                </div>
              </div>
            </section>



            {/* Pro Tips Section */}
            <section className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
                  Tactical Operational Tips
                </h2>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FFE900] font-bold mt-0.5">•</span>
                  <span><strong>Hulk eye slit vulnerability:</strong> Hulks have Armor 4 on the visor eye slit. Two direct shots from an Anti-Materiel Rifle (AMR) or Autocannon will destroy them instantly.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FFE900] font-bold mt-0.5">•</span>
                  <span><strong>Charger leg strip tactic:</strong> Heavy anti-tank weapons (Quasar, EAT, Recoilless) strip Charger front leg armor with one direct hit, exposing weak flesh to primary fire.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FFE900] font-bold mt-0.5">•</span>
                  <span><strong>Spend before hitting caps:</strong> Medals stop accumulating once you hit the 250 cap. Spend them across any available Warbond pages immediately.</span>
                </li>
              </ul>
            </section>



            {/* Click-to-Expand Interactive FAQs Accordion */}
            <section className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800">
                <Info className="w-5 h-5 text-[#FFE900]" />
                <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3 pt-2">
                {HELLDIVERS_FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-zinc-800 rounded-xl overflow-hidden bg-black/60 transition"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/80 transition"
                      >
                        <span className="font-semibold text-xs sm:text-sm text-zinc-200 flex items-center gap-2">
                          <span className="text-[#FFE900] font-bold">Q{idx + 1}.</span>
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#FFE900] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-1 border-t border-zinc-800/80 text-xs sm:text-sm text-zinc-400 leading-relaxed bg-zinc-900/30">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right 4-Col Sticky Desktop Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-24 space-y-4">
              
              {/* Tool / Game Overview Card */}
              <div className="bg-zinc-950/90 border-2 border-[#FFE900]/30 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#FFE900]" />
                    <span className="font-bold text-sm text-white uppercase tracking-wider">Super Earth Command</span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="px-2.5 py-1 text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-1 transition cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-black p-2.5 rounded-xl border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 block">Game</span>
                    <span className="font-bold text-[#FFE900]">Helldivers 2</span>
                  </div>
                  <div className="bg-black p-2.5 rounded-xl border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 block">Tools</span>
                    <span className="font-bold text-white">16 Utilities</span>
                  </div>
                  <div className="bg-black p-2.5 rounded-xl border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 block">Rating</span>
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> 4.98 / 5.0
                    </span>
                  </div>
                  <div className="bg-black p-2.5 rounded-xl border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 block">Active Divers</span>
                    <span className="font-mono font-bold text-emerald-400">180k+ Squads</span>
                  </div>
                </div>
              </div>

              {/* Placement: Desktop Sidebar Ad Banner */}
              <AdLayout.Sidebar />

              {/* Armor Penetration Benchmarks Card */}
              <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs">
                <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-zinc-800">
                  <Shield className="w-4 h-4 text-[#FFE900]" />
                  Armor Penetration (AP) Tiers
                </h3>

                <div className="space-y-2 font-mono">
                  <div className="flex justify-between p-2 rounded-lg bg-black border border-zinc-800">
                    <span className="text-zinc-300">AP 1 (Unarmored)</span>
                    <span className="text-zinc-400 font-bold">Scavengers / Troopers</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-black border border-zinc-800">
                    <span className="text-zinc-300">AP 2 (Light Armor)</span>
                    <span className="text-zinc-400 font-bold">Warriors / Hunters</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-black border border-zinc-800">
                    <span className="text-zinc-300">AP 3 (Medium Armor)</span>
                    <span className="text-cyan-400 font-bold">Hive Guards / Devastators</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-black border border-zinc-800">
                    <span className="text-zinc-300">AP 4 (Heavy Armor)</span>
                    <span className="text-amber-400 font-bold">Hulk Visor / Bile Titan Body</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-black border border-zinc-800">
                    <span className="text-zinc-300">AP 5–6 (Tank Armor)</span>
                    <span className="text-red-400 font-bold">Charger Behemoth / Factory Strider</span>
                  </div>
                </div>
              </div>

              {/* Resource Caps Quick Card */}
              <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs">
                <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-zinc-800">
                  <Trophy className="w-4 h-4 text-[#FFE900]" />
                  Maximum Resource Caps
                </h3>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between p-1.5 rounded bg-black border border-zinc-800/80">
                    <span className="text-zinc-300">Warbond Medals</span>
                    <span className="text-[#FFE900] font-bold">250 Medals</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-black border border-zinc-800/80">
                    <span className="text-zinc-300">Requisition Slips</span>
                    <span className="text-amber-400 font-bold">50,000 Slips</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-black border border-zinc-800/80">
                    <span className="text-zinc-300">Super Uranium Samples</span>
                    <span className="text-purple-400 font-bold">100 Samples</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-black border border-zinc-800/80">
                    <span className="text-zinc-300">Common / Rare Samples</span>
                    <span className="text-emerald-400 font-bold">500 / 250</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Hub Above Footer Banner Ad Slot */}
        <AdLayout.HubAboveFooter />
      </div>
    </div>
  );
}
