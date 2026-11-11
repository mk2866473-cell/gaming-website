/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, ArrowRight, Search, ChevronDown, ChevronUp,
  Award, Shield, Swords, Layers, Box, Compass, Calculator,
  Shapes, ArrowLeftRight, Clock, Dices, Crosshair, Gamepad2, Check
} from 'lucide-react';
import { TOOLS, GAMES, CATEGORIES, ToolItem, getGamePath, getGameById } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import { getGameIcon } from '../components/GameIcons';
import AdLayout from '../components/ads/AdLayout';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export default function HomePage({ onNavigate, onOpenSearch }: HomePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [heroSearch, setHeroSearch] = useState<string>('');

  // 1. Popular Curated Games
  const popularGames = useMemo(() => {
    return [
      {
        id: 'ps99',
        name: 'Pet Simulator 99',
        subtitle: 'Values & Trading Suite',
        description: 'WFL trade calculator, exclusive daycare diamond yields, enchant diminishing returns, and live RAP scam alerts.',
        count: TOOLS.filter(t => t.gameId === 'ps99').length,
        path: '/ps99',
        icon: getGameIcon('ps99', 'w-5 h-5'),
        accent: 'border-sky-500/30 group-hover:border-sky-500/60'
      },
      {
        id: 'helldivers2',
        name: 'Helldivers 2',
        subtitle: 'Galactic War & Ballistics',
        description: 'Recoil pattern visualizers, enemy weakness counter matrix, armor tier lists, super credit farm, and war map trackers.',
        count: TOOLS.filter(t => t.gameId === 'helldivers2' || t.gameId === 'helldivers-2').length,
        path: '/helldivers-2',
        icon: getGameIcon('helldivers-2', 'w-5 h-5'),
        accent: 'border-amber-500/30 group-hover:border-amber-500/60'
      },
      {
        id: 'minecraft',
        name: 'Minecraft',
        subtitle: 'Java & Bedrock Parity',
        description: 'Voxel circle generators, 3D Nether portal linkers, XP levels, redstone timings, and villager discounts.',
        count: TOOLS.filter(t => t.gameId === 'minecraft').length,
        path: getGamePath('minecraft'),
        icon: getGameIcon('minecraft', 'w-5 h-5'),
        accent: 'border-emerald-500/30 group-hover:border-emerald-500/60'
      },
      {
        id: 'roblox',
        name: 'Roblox',
        subtitle: 'DevEx & Trading',
        description: 'Robux to USD DevEx converter ($0.0035 rate), official 30% tax models, and Blox Fruits trading value evaluators.',
        count: TOOLS.filter(t => t.gameId === 'roblox').length,
        path: getGamePath('roblox'),
        icon: getGameIcon('roblox', 'w-5 h-5'),
        accent: 'border-rose-500/30 group-hover:border-rose-500/60'
      },
      {
        id: 'fortnite',
        name: 'Fortnite',
        subtitle: 'Chapter 5 & Zero Build',
        description: 'V-Bucks to real currency, weapon DPS & Zero Build TTK, Battle Pass XP curves, and storm phase survival timers.',
        count: TOOLS.filter(t => t.gameId === 'fortnite').length,
        path: getGamePath('fortnite'),
        icon: getGameIcon('fortnite', 'w-5 h-5'),
        accent: 'border-amber-500/30 group-hover:border-amber-500/60'
      },
      {
        id: 'pokemongo',
        name: 'Pokémon GO',
        subtitle: 'Season of Max Out',
        description: 'Official CPM Combat Power calculators, IV appraisal, PvP league rank builders, and Level 50 XL candy budgets.',
        count: TOOLS.filter(t => t.gameId === 'pokemongo').length,
        path: getGamePath('pokemongo'),
        icon: getGameIcon('pokemongo', 'w-5 h-5'),
        accent: 'border-rose-500/30 group-hover:border-rose-500/60'
      },
      {
        id: 'palworld',
        name: 'Palworld',
        subtitle: 'v0.3.5 & Sakurajima',
        description: 'Official CombiRank breeding calculators, reverse breeding, 0–30% IV talent appraisal, and base team optimizers.',
        count: TOOLS.filter(t => t.gameId === 'palworld').length,
        path: getGamePath('palworld'),
        icon: getGameIcon('palworld', 'w-5 h-5'),
        accent: 'border-cyan-500/30 group-hover:border-cyan-500/60'
      },
      {
        id: 'tfd',
        name: 'The First Descendant',
        subtitle: 'Weapon DPS & Colossus Suite',
        description: 'True raw burst DPS, 160% reactor mount calculator, 4-piece component optimizer, and void boss enrage timers.',
        count: TOOLS.filter(t => t.gameId === 'tfd').length,
        path: '/the-first-descendant',
        icon: getGameIcon('tfd', 'w-5 h-5'),
        accent: 'border-cyan-500/30 group-hover:border-cyan-500/60'
      },
      {
        id: 'oncehuman',
        name: 'Once Human',
        subtitle: 'Post-Apocalyptic Survival & Meta',
        description: 'Blueprint star upgrades (29,600 XP), automated Acid farming, Cradle planner, calibrations & tactical crate checklist.',
        count: TOOLS.filter(t => t.gameId === 'oncehuman').length,
        path: '/once-human',
        icon: getGameIcon('oncehuman', 'w-5 h-5'),
        accent: 'border-purple-500/30 group-hover:border-purple-500/60'
      },
      {
        id: 'cm',
        name: 'Coin Master',
        subtitle: 'Village & Spin Strategy',
        description: 'Village cost progression charts, free spin link directory, card set collection tracker, and pet food timers.',
        count: TOOLS.filter(t => t.gameId === 'cm').length,
        path: '/coin-master',
        icon: getGameIcon('cm', 'w-5 h-5'),
        accent: 'border-amber-500/30 group-hover:border-amber-500/60'
      },
      {
        id: 'sk',
        name: 'Seven Knights Re:BIRTH',
        subtitle: '5v5 Tactical Suite',
        description: 'Damage multipliers, 5v5 team synergy builder, gear sell/keep valuation, and gacha summon planners.',
        count: TOOLS.filter(t => t.gameId === 'sk').length,
        path: '/seven-knights-rebirth',
        icon: getGameIcon('sk', 'w-5 h-5'),
        accent: 'border-blue-500/30 group-hover:border-blue-500/60'
      },
      {
        id: 'mogo',
        name: 'Monopoly GO!',
        subtitle: 'Stickers & Dice Tracker',
        description: 'Album sticker tracker, duplicate star vault counter, verified daily free dice links, and shield finders.',
        count: TOOLS.filter(t => t.gameId === 'mogo').length,
        path: '/monopoly-go',
        icon: getGameIcon('mogo', 'w-5 h-5'),
        accent: 'border-red-500/30 group-hover:border-red-500/60'
      },
      {
        id: 'bg3',
        name: "Baldur's Gate 3",
        subtitle: 'Tactical D&D 5e Theorycrafting',
        description: 'Multiclass spell slot progressions, d20 advantage math, alchemy recipe extracts, and companion approval.',
        count: TOOLS.filter(t => t.gameId === 'bg3').length,
        path: '/baldurs-gate-3',
        icon: getGameIcon('bg3', 'w-5 h-5'),
        accent: 'border-amber-500/30 group-hover:border-amber-500/60'
      }
    ];
  }, []);

  // 2. Curated Featured Tools (Exact 8 Strong Tools)
  const popularTools = useMemo(() => {
    const featuredIds = [
      'ps99-trade-calculator',
      'helldivers-2-recoil-visualizer',
      'helldivers-2-enemy-weakness-calculator',
      'helldivers-2-sample-ship-planner',
      'palworld-breeding-calculator',
      'minecraft-circle-generator',
      'pokemon-go-cp-calculator',
      'robux-to-usd-calculator',
      'fortnite-weapon-dps-calculator'
    ];
    return featuredIds
      .map(id => TOOLS.find(t => t.id === id || t.slug === id))
      .filter((t): t is ToolItem => Boolean(t));
  }, []);

  // 3. Recommended 6 Categories
  const categoryCards = useMemo(() => {
    return [
      {
        id: 'calculators',
        name: 'Calculators',
        description: 'Game-specific calculations, stats, damage, XP, CP and more.',
        count: TOOLS.filter(t => t.categoryId === 'calculators').length,
        icon: <Calculator className="w-5 h-5 text-violet-400" />
      },
      {
        id: 'generators',
        name: 'Generators',
        description: 'Blueprints, circles, layouts, teams and other generators.',
        count: TOOLS.filter(t => t.categoryId === 'generators').length,
        icon: <Shapes className="w-5 h-5 text-cyan-400" />
      },
      {
        id: 'converters',
        name: 'Converters',
        description: 'Coordinates, sensitivity, DPI/eDPI and other conversions.',
        count: TOOLS.filter(t => t.categoryId === 'converters').length,
        icon: <ArrowLeftRight className="w-5 h-5 text-purple-400" />
      },
      {
        id: 'planners',
        name: 'Planners',
        description: 'Breeding, builds, resources, progression and planning tools.',
        count: TOOLS.filter(t => t.categoryId === 'planners').length,
        icon: <Layers className="w-5 h-5 text-cyan-400" />
      },
      {
        id: 'trackers',
        name: 'Trackers',
        description: 'Session, progression and game-related tracking utilities.',
        count: TOOLS.filter(t => t.categoryId === 'trackers').length,
        icon: <Clock className="w-5 h-5 text-violet-400" />
      },
      {
        id: 'gaming-utilities',
        name: 'Gaming Utilities',
        description: "Useful tools that don't fit a single calculator category.",
        count: TOOLS.filter(t => t.categoryId === 'gaming-utilities').length,
        icon: <Dices className="w-5 h-5 text-cyan-400" />
      }
    ];
  }, []);

  // 4. Recently Added Tools
  const recentlyAddedTools = useMemo(() => {
    const recentIds = [
      'palworld-passive-skills-stacker',
      'minecraft-villager-trade-calculator',
      'valorant-edpi-calculator',
      'genshin-artifact-cv-calculator',
      'pokemon-go-mega-energy-calculator',
      'minecraft-elytra-rocket-calculator'
    ];
    return recentIds
      .map(id => TOOLS.find(t => t.id === id || t.slug === id))
      .filter((t): t is ToolItem => Boolean(t));
  }, []);

  // Search matches for hero: both Games and Tools
  const { matchedGames, matchedTools } = useMemo(() => {
    if (!heroSearch.trim()) return { matchedGames: [], matchedTools: [] };
    const q = heroSearch.toLowerCase().trim();

    const games = GAMES.filter(g => 
      g.name.toLowerCase().includes(q) ||
      (g.shortName && g.shortName.toLowerCase().includes(q)) ||
      g.slug.toLowerCase().includes(q) ||
      g.id.toLowerCase().includes(q) ||
      (g.tagline && g.tagline.toLowerCase().includes(q))
    ).slice(0, 3);

    const tools = TOOLS.filter(tool => {
      const g = getGameById(tool.gameId);
      const gName = g ? g.name.toLowerCase() : '';
      const gShort = g?.shortName ? g.shortName.toLowerCase() : '';
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.tags.some(t => t.toLowerCase().includes(q)) ||
        tool.gameId.toLowerCase().includes(q) ||
        gName.includes(q) ||
        gShort.includes(q)
      );
    }).slice(0, 6);

    return { matchedGames: games, matchedTools: tools };
  }, [heroSearch]);

  const homeFaqs = [
    {
      q: 'Do all calculators run locally in the browser?',
      a: 'Yes. All mathematical models, voxel generation algorithms, CombiRank breeding calculators, sensitivity conversions, and damage formulas execute client-side using native JavaScript and HTML5 Canvas. Your calculations are instant with zero server latency.'
    },
    {
      q: 'Are the formulas verified against current official game patches?',
      a: 'Yes. All utilities reflect verified theorycrafting formulas: Minecraft 1.21.x Tricky Trials, Palworld v0.3.5 / Sakurajima update, Pokémon GO Level 50 CPM tables, Genshin Impact 5.x banner soft pity curves, Fortnite Chapter 5 weapon dynamics, and official Roblox DevEx $0.0035 rates.'
    },
    {
      q: 'Are any downloads, plugins, or extensions required?',
      a: 'None. All calculations run directly in your web browser with zero downloads, plugins, or browser extensions needed.'
    },
    {
      q: 'Do I need an account, login, or Discord connection?',
      a: 'No accounts, sign-ins, or cookies are required. All tools and generators are 100% free and open for immediate use.'
    }
  ];

  return (
    <>
      <SEOHead
        title="GamingTools Hub – Precision Gaming Calculators & Digital Utilities"
        description="Precision gaming calculators and utilities for Minecraft, Palworld, Genshin Impact, FPS esports, Roblox, Fortnite, and Pokémon GO. 100% client-side with zero latency."
        canonicalPath="/"
      />

      <div className="space-y-16 sm:space-y-24">
        {/* ========================================================= */}
        {/* 1 & 2. HERO SECTION                                      */}
        {/* ========================================================= */}
        <section className="relative pt-4 sm:pt-10 pb-2 text-center">
          {/* Trust/Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-[#0c122e] border border-indigo-900/60 text-[11px] text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
            <span className="font-medium text-slate-300">Free • Browser-Based • Gaming Tools</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight sm:leading-tight mb-2.5">
            Gaming Calculators{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400">
              & Tools
            </span>
          </h1>

          {/* Supporting Headline */}
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-slate-200 tracking-tight mb-3">
            Calculate. Optimize. Play Better.
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            Free browser-based calculators, generators, planners and gaming utilities for Minecraft, Pokémon GO, Palworld, Fortnite, Roblox and more.
          </p>

          {/* ========================================================= */}
          {/* 3. MAIN SEARCH                                           */}
          {/* ========================================================= */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center gap-2 p-1.5 bg-[#0c122e] border border-indigo-900/70 rounded-xl shadow-2xl focus-within:border-violet-500/80 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
              <div className="flex items-center gap-2.5 flex-1 px-3 text-slate-400">
                <Search className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={e => setHeroSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      if (matchedGames.length > 0) {
                        onNavigate(getGamePath(matchedGames[0].id));
                        setHeroSearch('');
                      } else if (matchedTools.length > 0) {
                        onNavigate(`/tools/${matchedTools[0].slug}`);
                        setHeroSearch('');
                      } else if (heroSearch.trim()) {
                        onNavigate('/tools');
                      }
                    }
                  }}
                  placeholder="Search gaming tools, calculators and game suites (Coin Master, Seven Knights, Monopoly, etc.)..."
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              {heroSearch && (
                <button
                  onClick={() => setHeroSearch('')}
                  className="text-xs text-slate-400 hover:text-slate-200 pr-1.5"
                >
                  Clear
                </button>
              )}

              <button
                onClick={onOpenSearch}
                className="px-3 sm:px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 flex-shrink-0 shadow-sm shadow-violet-950/50"
                title="Open search modal (Ctrl+K / ⌘K)"
              >
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#070b19] rounded border border-indigo-900/60 text-slate-300">
                  ⌘K
                </kbd>
                <span>Search</span>
              </button>
            </div>

            {/* Live Search Instant Dropdown */}
            {heroSearch && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#0c122e] border border-indigo-900/80 rounded-xl shadow-2xl overflow-hidden z-30 text-left">
                {matchedGames.length > 0 || matchedTools.length > 0 ? (
                  <div className="divide-y divide-indigo-950/80 max-h-96 overflow-y-auto">
                    {/* Game Hub Matches */}
                    {matchedGames.length > 0 && (
                      <div className="bg-[#080d21] p-2 space-y-1">
                        <div className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
                          Game Hubs
                        </div>
                        {matchedGames.map(game => (
                          <div
                            key={game.id}
                            onClick={() => {
                              onNavigate(getGamePath(game.id));
                              setHeroSearch('');
                            }}
                            className="p-2.5 rounded-lg hover:bg-[#121c45] cursor-pointer flex items-center justify-between transition-colors group border border-indigo-950 hover:border-violet-500/50"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-7 h-7 rounded-lg bg-[#0c122e] border border-indigo-950 flex items-center justify-center flex-shrink-0">
                                {getGameIcon(game.id, 'w-3.5 h-3.5')}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                                    {game.name}
                                  </span>
                                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-violet-950/60 text-violet-300 border border-violet-800/40">
                                    {TOOLS.filter(t => t.gameId === game.id).length} Tools
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-400 line-clamp-1">
                                  {game.tagline || game.description}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-violet-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 flex-shrink-0 ml-2">
                              <span>Open Hub</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tool Matches */}
                    {matchedTools.map(tool => (
                      <div
                        key={tool.id}
                        onClick={() => {
                          onNavigate(`/tools/${tool.slug}`);
                          setHeroSearch('');
                        }}
                        className="p-3 hover:bg-[#121c45] cursor-pointer flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-[#070b19] border border-indigo-950 flex items-center justify-center flex-shrink-0">
                            {getGameIcon(tool.gameId, 'w-3.5 h-3.5')}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                              {tool.name}
                            </div>
                            <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {tool.shortDescription}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-3" />
                      </div>
                    ))}

                    <div className="p-2.5 bg-[#080d21] text-center">
                      <button
                        onClick={() => {
                          onNavigate('/tools');
                          setHeroSearch('');
                        }}
                        className="text-xs font-medium text-cyan-400 hover:text-violet-300"
                      >
                        Explore all tools in directory →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No calculators or games found matching "{heroSearch}".
                  </div>
                )}
              </div>
            )}

            {/* Primary CTA & Popular Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
              <button
                onClick={() => onNavigate('/tools')}
                className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-violet-950/50"
              >
                <span>Explore Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="hidden sm:inline-block w-px h-4 bg-indigo-950 mx-1" />

              <span className="text-slate-400 text-xs font-medium">Quick Access:</span>
              {[
                { label: 'Coin Master', path: '/coin-master' },
                { label: 'Seven Knights', path: '/seven-knights-rebirth' },
                { label: 'Monopoly GO!', path: '/monopoly-go' },
                { label: 'Palworld Breeding', path: '/tools/palworld-breeding-calculator' },
                { label: 'Circle Generator', path: '/tools/minecraft-circle-generator' },
                { label: 'Sensitivity 1:1', path: '/tools/universal-mouse-sensitivity-converter' },
                { label: 'DevEx Robux', path: '/tools/robux-to-usd-calculator' }
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.path)}
                  className="px-2 py-0.5 rounded bg-[#0c122e] border border-indigo-900/60 text-slate-300 hover:text-cyan-300 hover:border-violet-500/50 transition-colors text-xs"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Homepage Featured Cards: Free Codes & Game Q&A */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto">
              <button
                onClick={() => onNavigate('/codes')}
                className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-cyan-500/10 border border-amber-500/30 hover:border-amber-400/60 transition-all shadow-lg hover:shadow-amber-500/10 group flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                    🎁
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        Free Game Codes
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                        Daily Updates
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                      Free Game Codes — active redeem codes and daily free links, checked daily.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all flex-shrink-0">
                  <span>Browse</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>

              <button
                onClick={() => onNavigate('/qa')}
                className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-violet-500/10 via-indigo-500/5 to-cyan-500/10 border border-violet-500/30 hover:border-violet-400/60 transition-all shadow-lg hover:shadow-violet-500/10 group flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform text-violet-300">
                    ❓
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                        Game Q&A
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/40 font-semibold">
                        Instant Answers
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                      Game Q&A — quick answers to the gaming questions everyone searches.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-violet-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all flex-shrink-0">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Home Top Banner Ad Slot */}
        <AdLayout.HomeTop />

        {/* ========================================================= */}
        {/* 3. POPULAR GAMES                                         */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-950/80 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Popular Games
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Curated theorycrafting hubs and calculator suites for top competitive titles
              </p>
            </div>
            <button
              onClick={() => onNavigate('/tools')}
              className="text-xs font-semibold text-violet-400 hover:text-cyan-300 flex items-center gap-1 self-start sm:self-auto group transition-colors"
            >
              <span>View All Tools →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularGames.map(game => (
              <div
                key={game.id}
                onClick={() => onNavigate(game.path)}
                className={`group bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/60 rounded-xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-violet-950/20`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#070b19] border border-indigo-950 flex items-center justify-center">
                      {game.icon}
                    </div>
                    <span className="text-[11px] font-mono text-slate-300 bg-[#070b19] border border-indigo-950 px-2 py-0.5 rounded">
                      {game.count} Tools
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {game.name}
                  </h3>
                  <div className="text-[11px] text-violet-400 font-mono mb-2">
                    {game.subtitle}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-950/80 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-violet-400 transition-colors">
                  <span>Open Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. FEATURED TOOLS                                        */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-950/80 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold">
                  Curated Selection
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Featured Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Handpicked, high-accuracy calculators and generators for key competitive games
              </p>
            </div>

            <button
              onClick={() => onNavigate('/tools')}
              className="text-xs font-semibold text-violet-400 hover:text-cyan-300 flex items-center gap-1 self-start sm:self-auto group transition-colors"
            >
              <span>View All Tools →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
                onNavigateToGame={(gameSlug) => onNavigate(`/games?game=${gameSlug}`)}
              />
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('/tools')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/50 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all group"
            >
              <span>View All Tools →</span>
            </button>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. BROWSE BY CATEGORY                                    */}
        {/* ========================================================= */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-950/80 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Browse by Category
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Explore utilities organized by functional purpose and theorycrafting discipline
              </p>
            </div>
            <button
              onClick={() => onNavigate('/tools')}
              className="text-xs font-semibold text-violet-400 hover:text-cyan-300 flex items-center gap-1 self-start sm:self-auto group transition-colors"
            >
              <span>View All Tools →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {categoryCards.map(category => (
              <div
                key={category.id}
                onClick={() => onNavigate(`/tools?category=${category.id}`)}
                className="group bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/60 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-950/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#070b19] border border-indigo-950 flex items-center justify-center">
                      {category.icon}
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-300 bg-[#070b19] px-2 py-0.5 rounded border border-indigo-950">
                      {category.count} Tools
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-950/80 flex items-center justify-between text-xs font-semibold text-violet-400 group-hover:text-cyan-300">
                  <span className="inline-flex items-center gap-1.5 group-hover:underline">
                    View Tools
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. RECENTLY ADDED                                        */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-950/80 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Fresh Mechanics Updates
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Recently Added
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                New calculators calibrated for recent game balance expansions and patches
              </p>
            </div>

            <button
              onClick={() => onNavigate('/tools')}
              className="text-xs font-semibold text-violet-400 hover:text-cyan-300 flex items-center gap-1 self-start sm:self-auto group"
            >
              <span>View All Tools →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentlyAddedTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
                onNavigateToGame={(gameSlug) => onNavigate(`/games?game=${gameSlug}`)}
              />
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('/tools')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/50 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all group"
            >
              <span>View All Tools →</span>
            </button>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. SHORT "WHY GAMINGTOOLS HUB?" SECTION                  */}
        {/* ========================================================= */}
        <section className="bg-[#0c122e] border border-indigo-900/70 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono text-violet-400 font-semibold uppercase tracking-wider">
              Product Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1.5 mb-3 tracking-tight">
              Why Gamers Choose GamingTools Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Maintained by competitive players and software engineers. Unlike cluttered gaming wikis with disruptive popups and heavy ad scripts, GamingTools Hub is engineered like a fast SaaS application for instant reference while you play.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-indigo-950/80">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#070b19] border border-indigo-950 flex items-center justify-center text-violet-400">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">0ms Server Latency</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All math, voxel canvas generators, and simulation engines run client-side on your device without server delay.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#070b19] border border-indigo-950 flex items-center justify-center text-cyan-400">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Verified Theorycrafting</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Formulas are grounded in official game decompilations, verified patch notes, and empirical testing.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#070b19] border border-indigo-950 flex items-center justify-center text-violet-400">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">100% Free Access</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every calculator, planner, and blueprint generator is completely free to use with zero subscriptions, paywalls, or mandatory login walls.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#070b19] border border-indigo-950 flex items-center justify-center text-cyan-400">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Desktop & Mobile Interface</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Responsive layouts optimized for widescreen desktop monitors, dual battlestation setups, tablets, and mobile smartphones.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 9. FAQ                                                   */}
        {/* ========================================================= */}
        <section className="space-y-4 max-w-4xl mx-auto">
          <div className="border-b border-indigo-950/80 pb-3 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Everything you need to know about formulas and calculation mechanics</p>
          </div>

          <div className="space-y-2">
            {homeFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-indigo-900/60 rounded-xl overflow-hidden bg-[#0c122e]"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-violet-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-indigo-950/70 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 10. HOMEPAGE BOTTOM BANNER AD */}
        <section aria-label="Advertisement" className="max-w-4xl mx-auto pt-2 pb-6">
          <AdLayout.HomeAboveFooter />
        </section>
      </div>
    </>
  );
}
