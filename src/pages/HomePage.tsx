/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Zap, ArrowRight, ChevronDown, ChevronUp,
  Shield, Compass, Calculator, Shapes,
  ArrowLeftRight, Layers, Clock, Dices, Check
} from 'lucide-react';
import { TOOLS, GAMES, ToolItem, getGamePath } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import { getGameIcon } from '../components/GameIcons';
import AdLayout from '../components/ads/AdLayout';
import BrandLogo from '../components/BrandLogo';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch?: () => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  // 1. Popular Tools (same curated featured selection logic)
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

  // 2. Curated Game Hubs with runtime-computed tool counts
  const popularGames = useMemo(() => {
    return [
      {
        id: 'ps99',
        name: 'Pet Simulator 99',
        subtitle: 'Values & Trading Suite',
        description: 'WFL trade calculator, exclusive daycare diamond yields, enchant diminishing returns, and live RAP alerts.',
        count: TOOLS.filter(t => t.gameId === 'ps99').length,
        path: '/ps99',
        icon: getGameIcon('ps99', 'w-5 h-5')
      },
      {
        id: 'helldivers2',
        name: 'Helldivers 2',
        subtitle: 'Galactic War & Ballistics',
        description: 'Recoil pattern visualizers, enemy weakness counter matrix, armor tier lists, super credit farm, and war trackers.',
        count: TOOLS.filter(t => t.gameId === 'helldivers2' || t.gameId === 'helldivers-2').length,
        path: '/helldivers-2',
        icon: getGameIcon('helldivers-2', 'w-5 h-5')
      },
      {
        id: 'minecraft',
        name: 'Minecraft',
        subtitle: 'Java & Bedrock Parity',
        description: 'Voxel circle generators, 3D Nether portal linkers, XP levels, redstone timings, and villager discounts.',
        count: TOOLS.filter(t => t.gameId === 'minecraft').length,
        path: getGamePath('minecraft'),
        icon: getGameIcon('minecraft', 'w-5 h-5')
      },
      {
        id: 'roblox',
        name: 'Roblox',
        subtitle: 'DevEx & Trading',
        description: 'Robux to USD DevEx converter ($0.0038 rate), official 30% tax models, and Blox Fruits trading value evaluators.',
        count: TOOLS.filter(t => t.gameId === 'roblox').length,
        path: getGamePath('roblox'),
        icon: getGameIcon('roblox', 'w-5 h-5')
      },
      {
        id: 'growagarden',
        name: 'Grow a Garden',
        subtitle: 'Crop Values & Hatching Odds',
        description: 'Calculate crop Sheckle sell values with weight scaling, variant multipliers, mutation brackets, and pet egg odds.',
        count: TOOLS.filter(t => t.gameId === 'growagarden' || t.gameId === 'grow-a-garden').length,
        path: getGamePath('growagarden'),
        icon: getGameIcon('growagarden', 'w-5 h-5')
      },
      {
        id: 'fortnite',
        name: 'Fortnite',
        subtitle: 'Chapter 5 & Zero Build',
        description: 'V-Bucks to real currency, weapon DPS & Zero Build TTK, Battle Pass XP curves, and storm phase timers.',
        count: TOOLS.filter(t => t.gameId === 'fortnite').length,
        path: getGamePath('fortnite'),
        icon: getGameIcon('fortnite', 'w-5 h-5')
      },
      {
        id: 'pokemongo',
        name: 'Pokémon GO',
        subtitle: 'Season of Max Out',
        description: 'Official CPM Combat Power calculators, IV appraisal, PvP league rank builders, and Level 50 XL candy budgets.',
        count: TOOLS.filter(t => t.gameId === 'pokemongo').length,
        path: getGamePath('pokemongo'),
        icon: getGameIcon('pokemongo', 'w-5 h-5')
      },
      {
        id: 'palworld',
        name: 'Palworld',
        subtitle: 'v0.3.5 & Sakurajima',
        description: 'Official CombiRank breeding calculators, reverse breeding, 0–30% IV talent appraisal, and base team optimizers.',
        count: TOOLS.filter(t => t.gameId === 'palworld').length,
        path: getGamePath('palworld'),
        icon: getGameIcon('palworld', 'w-5 h-5')
      },
      {
        id: 'tfd',
        name: 'The First Descendant',
        subtitle: 'Weapon DPS & Colossus Suite',
        description: 'True raw burst DPS, 160% reactor mount calculator, 4-piece component optimizer, and void boss enrage timers.',
        count: TOOLS.filter(t => t.gameId === 'tfd').length,
        path: '/the-first-descendant',
        icon: getGameIcon('tfd', 'w-5 h-5')
      },
      {
        id: 'oncehuman',
        name: 'Once Human',
        subtitle: 'Post-Apocalyptic Survival & Meta',
        description: 'Blueprint star upgrades, automated Acid farming, Cradle planner, calibrations, and tactical crate checklist.',
        count: TOOLS.filter(t => t.gameId === 'oncehuman').length,
        path: '/once-human',
        icon: getGameIcon('oncehuman', 'w-5 h-5')
      },
      {
        id: 'cm',
        name: 'Coin Master',
        subtitle: 'Village & Spin Strategy',
        description: 'Village cost progression charts, free spin link directory, card set collection tracker, and pet food timers.',
        count: TOOLS.filter(t => t.gameId === 'cm').length,
        path: '/coin-master',
        icon: getGameIcon('cm', 'w-5 h-5')
      },
      {
        id: 'sk',
        name: 'Seven Knights Re:BIRTH',
        subtitle: '5v5 Tactical Suite',
        description: 'Damage multipliers, 5v5 team synergy builder, gear sell/keep valuation, and gacha summon planners.',
        count: TOOLS.filter(t => t.gameId === 'sk').length,
        path: '/seven-knights-rebirth',
        icon: getGameIcon('sk', 'w-5 h-5')
      },
      {
        id: 'mogo',
        name: 'Monopoly GO!',
        subtitle: 'Stickers & Dice Tracker',
        description: 'Album sticker tracker, duplicate star vault counter, verified daily free dice links, and shield finders.',
        count: TOOLS.filter(t => t.gameId === 'mogo').length,
        path: '/monopoly-go',
        icon: getGameIcon('mogo', 'w-5 h-5')
      },
      {
        id: 'bg3',
        name: "Baldur's Gate 3",
        subtitle: 'Tactical D&D 5e Theorycrafting',
        description: 'Multiclass spell slot progressions, d20 advantage math, alchemy recipe extracts, and companion approval.',
        count: TOOLS.filter(t => t.gameId === 'bg3').length,
        path: '/baldurs-gate-3',
        icon: getGameIcon('bg3', 'w-5 h-5')
      },
      {
        id: 'gtaonline',
        name: 'GTA Online',
        subtitle: 'Businesses, Heists & Cooldowns',
        description: 'Nightclub Warehouse, Acid Lab profit, Cayo Perico payouts, Heist Splits, Business ROI payback, and Cooldown Planner.',
        count: TOOLS.filter(t => t.gameId === 'gtaonline').length,
        path: '/games/gta-online',
        icon: getGameIcon('gtaonline', 'w-5 h-5')
      },
      {
        id: 'gta6',
        name: 'Grand Theft Auto VI',
        subtitle: 'Cheat Codes & D-Pad Inputs',
        description: 'Search GTA 6 cheats for PS5 and Xbox Series X|S, filter by category, check unlock challenges, and copy D-pad inputs.',
        count: TOOLS.filter(t => t.gameId === 'gta6').length,
        path: '/games/gta-6',
        icon: getGameIcon('gta6', 'w-5 h-5')
      }
    ];
  }, []);

  // 3. Categories with runtime-computed tool counts
  const categoryCards = useMemo(() => {
    return [
      {
        id: 'calculators',
        name: 'Calculators',
        description: 'Game-specific calculations, stats, damage, XP, CP and more.',
        count: TOOLS.filter(t => t.categoryId === 'calculators').length,
        icon: <Calculator className="w-5 h-5 text-[var(--primary-light)]" />
      },
      {
        id: 'generators',
        name: 'Generators',
        description: 'Blueprints, circles, layouts, teams and other generators.',
        count: TOOLS.filter(t => t.categoryId === 'generators').length,
        icon: <Shapes className="w-5 h-5 text-[var(--accent)]" />
      },
      {
        id: 'converters',
        name: 'Converters',
        description: 'Coordinates, sensitivity, DPI/eDPI and other conversions.',
        count: TOOLS.filter(t => t.categoryId === 'converters').length,
        icon: <ArrowLeftRight className="w-5 h-5 text-[var(--primary-light)]" />
      },
      {
        id: 'planners',
        name: 'Planners',
        description: 'Breeding, builds, resources, progression and planning tools.',
        count: TOOLS.filter(t => t.categoryId === 'planners').length,
        icon: <Layers className="w-5 h-5 text-[var(--accent)]" />
      },
      {
        id: 'trackers',
        name: 'Trackers',
        description: 'Session, progression and game-related tracking utilities.',
        count: TOOLS.filter(t => t.categoryId === 'trackers').length,
        icon: <Clock className="w-5 h-5 text-[var(--primary-light)]" />
      },
      {
        id: 'gaming-utilities',
        name: 'Gaming Utilities',
        description: "Useful tools that don't fit a single calculator category.",
        count: TOOLS.filter(t => t.categoryId === 'gaming-utilities').length,
        icon: <Dices className="w-5 h-5 text-[var(--accent)]" />
      }
    ];
  }, []);

  const homeFaqs = [
    {
      q: 'Do all calculators run locally in the browser?',
      a: 'Yes. All mathematical models, voxel generation algorithms, CombiRank breeding calculators, sensitivity conversions, and damage formulas execute client-side using native JavaScript and HTML5 Canvas. Your calculations are instant with zero server latency.'
    },
    {
      q: 'Are the formulas verified against current official game patches?',
      a: 'Yes. All utilities reflect verified theorycrafting formulas: Minecraft 1.21.x Tricky Trials, Palworld v0.3.5 / Sakurajima update, Pokémon GO Level 50 CPM tables, Genshin Impact 5.x banner soft pity curves, Fortnite Chapter 5 weapon dynamics, and official Roblox DevEx $0.0038 rates.'
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
        {/* 1. HERO (Brand Lockup + Violet Glow + Grid + CTAs + Stats) */}
        {/* ========================================================= */}
        <section className="relative pt-8 sm:pt-14 pb-10 sm:pb-12 text-center overflow-hidden rounded-[var(--radius)]">
          {/* Signature Pure-CSS Radial Violet Glow + Faint 40px Masked Grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 18%, rgba(139, 92, 246, 0.18) 0%, transparent 72%)'
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(35, 42, 82, 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(35, 42, 82, 0.35) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 100%)'
            }}
          />

          <div className="max-w-3xl mx-auto px-4">
            {/* Brand Lockup */}
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-5 text-center sm:text-left">
              <BrandLogo size="lg" className="!w-14 !h-14 sm:!w-16 sm:!h-16 !rounded-2xl shrink-0" />
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text)] leading-none">
                  GamingTools<span className="text-[var(--primary-light)]">Hub</span>
                </h1>
                <p className="text-sm sm:text-lg font-medium text-[var(--text-soft)] mt-1.5">
                  Free Gaming Calculators &amp; Tools
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-2xl mx-auto mb-7 leading-relaxed">
              Precision browser-based calculators, voxel generators, breeding planners, and conversion utilities engineered for instant execution while you play.
            </p>

            {/* Primary CTA + Quiet Secondary Link */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
              <a
                href="/tools"
                onClick={(e) => handleLinkClick(e, '/tools')}
                className="btn-primary px-6 py-2.5 inline-flex items-center justify-center gap-2 text-sm font-semibold no-underline"
              >
                <span>Browse All Tools</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/codes"
                onClick={(e) => handleLinkClick(e, '/codes')}
                className="text-sm font-medium text-[var(--text-soft)] hover:text-[var(--primary-light)] transition-colors inline-flex items-center gap-1.5 py-2 px-3 no-underline"
              >
                <span>Today&apos;s Game Codes →</span>
              </a>
            </div>

            {/* Runtime-Computed Stats Line */}
            <p className="mt-6 text-xs sm:text-sm text-[var(--muted)] tabular-nums">
              {TOOLS.length} free tools · {GAMES.length} games · No sign-up
            </p>
          </div>
        </section>

        {/* Home Top Banner Ad Slot */}
        <AdLayout.HomeTop />

        {/* ========================================================= */}
        {/* 2. POPULAR TOOLS                                          */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--border)] pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary-light)] mb-1">
                MOST USED
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight">
                Popular Tools
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-soft)] mt-1">
                High-accuracy calculators and generators for key competitive titles
              </p>
            </div>

            <a
              href="/tools"
              onClick={(e) => handleLinkClick(e, '/tools')}
              className="text-xs font-semibold text-[var(--primary-light)] hover:text-[var(--accent)] flex items-center gap-1 self-start sm:self-auto transition-colors no-underline"
            >
              <span>View All Tools →</span>
            </a>
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
        </section>

        {/* ========================================================= */}
        {/* 3. BROWSE BY GAME                                         */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--border)] pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary-light)] mb-1">
                ALL GAMES
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight">
                Browse by Game
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-soft)] mt-1">
                Curated theorycrafting hubs and calculator suites with live tool counts
              </p>
            </div>
            <a
              href="/games"
              onClick={(e) => handleLinkClick(e, '/games')}
              className="text-xs font-semibold text-[var(--primary-light)] hover:text-[var(--accent)] flex items-center gap-1 self-start sm:self-auto transition-colors no-underline"
            >
              <span>View All {GAMES.length} Games →</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularGames.map(game => (
              <a
                key={game.id}
                href={game.path}
                onClick={(e) => handleLinkClick(e, game.path)}
                className="group bg-[var(--surface)] hover:bg-[var(--surface-raised)] border border-[var(--border)] hover:border-[var(--primary)] rounded-[var(--radius)] p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] text-left no-underline"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] group-hover:border-[var(--primary)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.35)] flex items-center justify-center transition-all duration-200">
                      {game.icon}
                    </div>
                    <span className="text-[11px] font-mono text-[var(--primary-light)] bg-[rgba(139,92,246,0.15)] px-2.5 py-0.5 rounded-full tabular-nums">
                      {game.count} Tools
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--text)] group-hover:text-[var(--primary-light)] transition-colors">
                    {game.name}
                  </h3>
                  <div className="text-[11px] text-[var(--muted)] font-mono mt-0.5 mb-2">
                    {game.subtitle}
                  </div>
                  <p className="text-xs text-[var(--text-soft)] line-clamp-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[var(--primary-light)] group-hover:text-[var(--accent)] transition-colors">
                  <span>Open Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. CODES STRIP                                            */}
        {/* ========================================================= */}
        <section className="bg-[var(--surface)] border border-[var(--border)] border-t-2 border-t-[var(--primary)] rounded-[var(--radius)] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary-light)] mb-1">
                FRESH CODES
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] tracking-tight">
                Working game codes, checked and dated
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-soft)] mt-1">
                Verified active redeem codes, free rewards, and expiration notes updated regularly.
              </p>
            </div>

            <a
              href="/codes"
              onClick={(e) => handleLinkClick(e, '/codes')}
              className="btn-primary px-5 py-2.5 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold no-underline shrink-0"
            >
              <span>See Codes</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. BROWSE BY CATEGORY                                     */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--border)] pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary-light)] mb-1">
                BY DISCIPLINE
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight">
                Browse by Category
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-soft)] mt-1">
                Explore utilities organized by functional purpose and theorycrafting discipline
              </p>
            </div>
            <a
              href="/categories"
              onClick={(e) => handleLinkClick(e, '/categories')}
              className="text-xs font-semibold text-[var(--primary-light)] hover:text-[var(--accent)] flex items-center gap-1 self-start sm:self-auto transition-colors no-underline"
            >
              <span>All Categories →</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryCards.map(category => (
              <a
                key={category.id}
                href={`/tools?category=${category.id}`}
                onClick={(e) => handleLinkClick(e, `/tools?category=${category.id}`)}
                className="group bg-[var(--surface)] hover:bg-[var(--surface-raised)] border border-[var(--border)] hover:border-[var(--primary)] rounded-[var(--radius)] p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex flex-col justify-between text-left no-underline"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] group-hover:border-[var(--primary)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.35)] flex items-center justify-center transition-all duration-200">
                      {category.icon}
                    </div>
                    <span className="text-[11px] font-mono text-[var(--primary-light)] bg-[rgba(139,92,246,0.15)] px-2.5 py-0.5 rounded-full tabular-nums">
                      {category.count} Tools
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--text)] group-hover:text-[var(--primary-light)] transition-colors mb-1.5">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[var(--primary-light)] group-hover:text-[var(--accent)] transition-colors">
                  <span>View Tools</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. PROOF STRIP — WHY GAMINGTOOLS HUB                      */}
        {/* ========================================================= */}
        <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary-light)] mb-1">
              BUILT FOR SPEED
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-3 tracking-tight">
              Why Gamers Choose GamingTools Hub
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-soft)] leading-relaxed">
              Engineered for instant reference while you play—every calculator runs directly in your browser with verified patch math and zero sign-up barriers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-[var(--border)]">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center text-[var(--primary-light)]">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--text)]">0ms Server Latency</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                All math, voxel canvas generators, and simulation engines run client-side on your device without server delay.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--text)]">Verified Theorycrafting</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Formulas are grounded in official game mechanics, verified patch notes, and empirical testing.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center text-[var(--primary-light)]">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--text)]">100% Free Access</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Every calculator, planner, and blueprint generator is completely free to use with zero subscriptions or login walls.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--text)]">Desktop &amp; Mobile Ready</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Responsive layouts built for dual-monitor gaming setups, tablets, and mobile phones.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. FAQ                                                    */}
        {/* ========================================================= */}
        <section className="space-y-4 max-w-4xl mx-auto">
          <div className="border-b border-[var(--border)] pb-3 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary-light)] mb-1">
              QUESTIONS
            </p>
            <h2 className="text-xl font-bold text-[var(--text)] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Everything you need to know about formulas and calculation mechanics
            </p>
          </div>

          <div className="space-y-2">
            {homeFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[var(--border)] rounded-[var(--radius)] overflow-hidden bg-[var(--surface)]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-medium text-[var(--text)] hover:text-[var(--primary-light)] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[var(--primary-light)] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[var(--muted)] flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-[var(--text-soft)] leading-relaxed border-t border-[var(--border)] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. CLOSING CTA BAND                                       */}
        {/* ========================================================= */}
        <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-8 sm:p-12 text-center space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary-light)]">
            START CALCULATING
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
            Your next session, calculated.
          </h2>
          <div>
            <a
              href="/tools"
              onClick={(e) => handleLinkClick(e, '/tools')}
              className="btn-primary px-6 py-2.5 inline-flex items-center justify-center gap-2 text-sm font-semibold no-underline"
            >
              <span>Browse All Tools</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* 9. HOMEPAGE BOTTOM BANNER AD */}
        <section aria-label="Advertisement" className="max-w-4xl mx-auto pt-2 pb-6">
          <AdLayout.HomeAboveFooter />
        </section>
      </div>
    </>
  );
}
