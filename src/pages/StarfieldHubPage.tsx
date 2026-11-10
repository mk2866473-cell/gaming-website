/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Rocket, Search, Award, ShieldCheck, Layers, TrendingUp, 
  Trophy, HelpCircle, ChevronDown, ChevronUp, Lightbulb, 
  Binary, Compass, Sparkles, Target, Flame, GitMerge, 
  Shield, Crosshair, Users, Eye, BookOpen, AlertTriangle, 
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { TOOLS } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { AdLayout } from '../components/ads/AdLayout';
import { StarfieldIcon } from '../components/GameIcons';

interface StarfieldHubPageProps {
  onNavigate: (path: string) => void;
}

export default function StarfieldHubPage({ onNavigate }: StarfieldHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const starfieldTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'starfield');
  }, []);

  const categories = [
    { id: 'all', name: `All Starfield Tools (${starfieldTools.length || 6})` },
    { id: 'ships', name: 'Ships & Logistics (Shipbuilder, Cargo Links)' },
    { id: 'character', name: 'Builds & Crew (Skill Allocator, Crew Buffs)' },
    { id: 'combat', name: 'Combat & Survey (Weapon Mods, Planet Survey)' },
  ];

  const filteredTools = useMemo(() => {
    return starfieldTools.filter(tool => {
      const matchQuery =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchCategory = true;
      if (selectedCategory === 'ships') {
        matchCategory = ['starfield-ship-builder-calculator', 'starfield-outpost-supply-planner', 'starfield-outpost-calculator'].includes(tool.id);
      } else if (selectedCategory === 'character') {
        matchCategory = ['starfield-skill-tree-allocator', 'starfield-crew-buff-calculator'].includes(tool.id);
      } else if (selectedCategory === 'combat') {
        matchCategory = ['starfield-weapon-mod-calculator', 'starfield-planet-survey-checklist'].includes(tool.id);
      }

      return matchQuery && matchCategory;
    });
  }, [starfieldTools, searchQuery, selectedCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Starfield', path: '/starfield' }
  ];

  const faqs = [
    {
      q: 'How do ship classes (Class A, B, and C) work in Starfield?',
      a: 'Ships in Starfield are categorized by reactor class: Class A ships are light fighters with highest base top speed (150 m/s), low reactor power (up to 29), and smaller mass. Class B ships balance speed (140 m/s) with medium reactors (up to 39 power). Class C vessels are heavy dreadnoughts and freight haulers with 40 base reactor power, massive deflector shields, 4,000+ cargo hold capacity, but capped at 130 m/s base speed. Flying Class B requires Piloting Rank 3, while Class C requires Piloting Rank 4.'
    },
    {
      q: 'Why is Bessel III-b considered the most valuable outpost moon in the galaxy?',
      a: 'Bessel III-b (in the Bessel System) possesses an extraordinary local-to-Universal Time (UT) ratio of 1:57 (1 hour resting on Bessel III-b advances 57 hours of Universal Time!). Furthermore, landing precisely on the intersection of Mountain, Desert, and Hills biomes allows you to extract Iron, Aluminum, Nickel, and Cobalt within a single outpost radius. Crafting Adaptive Frames here generates tens of thousands of XP and millions in vendor credits in minutes.'
    },
    {
      q: 'Do crew member skills stack with other crew members or player perks?',
      a: 'Crew skills do NOT stack with other crew members sharing the exact same skill (the highest rank applies; for example, Omari Hassan\'s Shield Systems 3 overrides Vasco\'s Shield Systems 2). However, crew skills DO stack additively with the player\'s personal skill perks! For instance, Sam Coe\'s Piloting 4 (+1 Engine Power) and Vasco\'s Aneutronic Fusion 1 (+1 Reactor Power) grant 2 free auxiliary power pips to your ship.'
    },
    {
      q: 'How does the Bethesda weapon damage and armor mitigation formula operate?',
      a: 'Armor in Starfield uses a diminishing returns mitigation curve: Damage Mitigation % = TargetArmor / (TargetArmor + 100). For example, 100 armor mitigates 50% damage; 200 armor mitigates 66.7% damage. Equipping Armor-Piercing rounds and maxing the Armor Penetration perk ignores up to 75% of enemy armor, dramatically amplifying true DPS against level 80+ pirate bosses.'
    },
    {
      q: 'How do you find 100% missing marine creatures on ocean-covered planets like Jemison?',
      a: 'If your hand scanner displays "Biome Complete (0%)" on Jemison, you have completed all terrestrial flora and fauna in that region. The remaining un-scanned wildlife are aquatic species located in the ocean! Fast-travel or land your ship in a biome marked "(Coast)", such as "Coniferous Forest (Coast)", and walk directly to the shoreline to scan aquatic creatures swimming in the ocean water.'
    },
    {
      q: 'Who pays the most credits for completed 100% Planet Survey Slates?',
      a: 'Vladimir Sall on The Eye space station (in orbit above Jemison) pays exactly 2.0x (double) the credit payout offered by any Trade Authority or standard vendor across the Settled Systems for 100% surveyed planet slates.'
    }
  ];

  return (
    <div className="space-y-8">
      <SEOHead
        title="Starfield Tools & Calculators 2026 – Shipbuilder, Outpost Supply, Skills & Survey Suite"
        description="Official suite of 6 Starfield tools: Ship Modules Cost & Cargo Weight Calculator, Outpost Resource Supply Line Planner, 82-Skill Tree Allocator, Planet Scan Flora/Fauna Checklist, Weapon Modding Damage Multiplier, and Crew Assignment Buff Calculator."
        canonicalPath="/starfield"
        breadcrumbs={breadcrumbs}
      />

      {/* Hub Top Banner Ad Slot */}
      <AdLayout.HubTop />

      {/* NASA-Punk Starfield Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-cyan-950/70 via-slate-900 to-slate-950 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center p-3 shadow-xl shrink-0">
                <StarfieldIcon className="w-full h-full" />
              </div>
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider text-cyan-400">
                    Constellation Navigation Hub
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-emerald-400">Bethesda Verified Engine</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-amber-400">Shattered Space Ready</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-serif">
                  Starfield <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400">Tools & Calculators</span>
                </h1>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Official theorycrafting suite for Constellation captains and outpost industrialists. Calculate Class A/B/C starship builds, mobility ratings, inter-system Helium-3 freight logistics, 82-skill tree tier allocation, 100% planetary survey slates, 10× sneak attack weapon engineering, and 8-officer crew synergy buffs.
                </p>
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex sm:flex-col gap-3 shrink-0">
              <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-4 text-center min-w-[140px]">
                <div className="text-2xl font-black text-cyan-400">6 Tools</div>
                <div className="text-xs text-slate-400 uppercase font-medium mt-0.5">Dedicated Suite</div>
              </div>
              <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 text-center min-w-[140px]">
                <div className="text-2xl font-black text-amber-400">Class C CAD</div>
                <div className="text-xs text-slate-400 uppercase font-medium mt-0.5">Shipbuilder Engine</div>
              </div>
            </div>
          </div>

          {/* Quick Jump Bar */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Featured Tools:
            </span>
            {starfieldTools.map(t => (
              <button
                key={t.id}
                onClick={() => onNavigate(`/tools/${t.slug}`)}
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 transition-colors"
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Category Filter Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Starfield tools (Shipbuilder, Cargo Links, Skill Tree, Flora/Fauna, Weapon Mods, Crew)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool, idx) => (
            <React.Fragment key={tool.id}>
              {idx === 3 && <div className="col-span-full"><AdLayout.HubInFeed /></div>}
              <ToolCard
                tool={tool}
                onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
              />
            </React.Fragment>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
            <Compass className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="font-medium">No tools found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 px-4 py-1.5 text-xs font-semibold bg-cyan-500 text-slate-950 rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Deep-Dive Mechanics & Endgame Strategy Guide */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Starfield Master Strategy & Endgame Systems Guide
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Advanced theorycrafting on ship design, outpost network fabrication, and stealth sniper damage curves
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-4">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Rocket className="w-4 h-4 text-cyan-400" /> 1. The Class C Dreadnought & 100 Mobility Golden Ratio
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A common misconception in Starfield ship design is that heavy Class C dreadnoughts must sacrifice turning agility. By combining a 40-power reactor (e.g. Pinch 8Z or SF40 Sheared Flow) with 4x SAL-6830 or Poseidon DT230 engines, you generate over 35,000 Maneuvering Thrust.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                This allows maintaining a perfect <strong className="text-cyan-300">100 Mobility rating</strong> even while carrying 3,500+ cargo and 1,600 shield health! Adding 6x Vanguard Obliterator particle projectors (which deal equal damage to shields and hull) destroys enemy fleets in seconds while evading incoming missile locks.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GitMerge className="w-4 h-4 text-amber-400" /> 2. Bessel III-b Quad-Deposit Frame Automation
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bessel III-b is universally acclaimed as the single greatest outpost location in the galaxy. Its 1:57 local-to-UT hour time ratio means waiting 24 local hours on a stool advances over 1,300 hours of galaxy simulation time, immediately filling hundreds of Solid Storage Containers with hundreds of thousands of Iron, Aluminum, Nickel, and Cobalt.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Routing these into Simple Fabricators to mass-produce Adaptive Frames and Iso-Centric Magnets provides infinite crafting XP, propelling characters from level 20 to level 100 in under an hour without cheats or mods.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-emerald-400" /> 3. The 10× Sneak Attack Concealment Sniper Meta
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Starfield's physical combat ceiling is reached through suppressed ballistic rifles. Equipping an <strong className="text-white">Advanced Hard Target (.50 Cal)</strong> with Long Barrel, High Powered receiver, and Depleted Uranium ammo achieves 520+ base damage per bullet.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                When paired with Rank 4 Stealth (+3.0x sneak) and Rank 4 Concealment (+4.0x ranged sneak), suppressed sniper headshots achieve a staggering <strong className="text-emerald-400">10.0× damage multiplier</strong>, hitting for over 5,200 damage in a single trigger pull—one-shotting Terrormorphs and level 98 Starborn guardians instantly.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" /> 4. The Supreme 8-Officer Fleet Crew Roster
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                By investing into Rank 4 Ship Command (Social Tree), your ship supports 8 active crew members. The optimal combat and exploration crew synergy is:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 text-xs">
                <li><strong className="text-cyan-300">Sam Coe:</strong> Piloting 4 (+1 Engine Power, +30% top speed) & Payloads 2 (+20% cargo capacity).</li>
                <li><strong className="text-cyan-300">Vasco:</strong> Aneutronic Fusion 1 (+1 permanent Reactor Power pip).</li>
                <li><strong className="text-cyan-300">Omari Hassan:</strong> Shield Systems 3 (+60% max shield health and rapid recharge).</li>
                <li><strong className="text-cyan-300">Barrett:</strong> Starship Engineering 4 (+25% system repair speed) & Particle Beams 3 (+15% damage).</li>
                <li><strong className="text-cyan-300">Sarah Morgan:</strong> Astrodynamics 4 (-50% grav jump fuel).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Starfield Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Everything you need to know about ship design, outpost cargo lines, skill allocation, and survey slates
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white hover:text-cyan-400 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base">{faq.q}</span>
                {openFaqIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-cyan-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                )}
              </button>

              {openFaqIndex === index && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                  {faq.a}
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
