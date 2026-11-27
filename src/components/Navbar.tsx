/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Menu, X, ChevronDown, Box, Gamepad2, Swords, Compass, 
  Calculator, Shapes, ArrowLeftRight, Layers, Clock, Dices, ArrowRight,
  Sparkles, Crosshair, HelpCircle
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { TOOLS, getPrimaryGames, getGamePath } from '../data/gamesAndTools';
import { 
  MinecraftIcon,
  RobloxIcon,
  FortniteIcon,
  PokeballIcon, 
  PalSphereIcon,
  GenshinIcon,
  HelldiversIcon,
  Ps99Icon,
  TfdIcon,
  OnceHumanIcon,
  WuwaIcon,
  ZzzIcon,
  TypeSoulIcon,
  Bg3Icon,
  LethalCompanyIcon,
  StarfieldIcon,
  EnshroudedIcon,
  NightingaleIcon,
  CrkIcon,
  AfkjIcon,
  MonopolyGoIcon,
  SkIcon,
  CmIcon,
  GrowAGardenIcon,
  GtaOnlineIcon,
  Gta6Icon
} from './GameIcons';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

const GAME_NAV_ICONS: Record<string, React.ReactNode> = {
  minecraft: <MinecraftIcon className="w-4 h-4" />,
  roblox: <RobloxIcon className="w-4 h-4" />,
  fortnite: <FortniteIcon className="w-4 h-4" />,
  pokemongo: <PokeballIcon className="w-4 h-4 text-rose-400" />,
  palworld: <PalSphereIcon className="w-4 h-4 text-cyan-400" />,
  genshin: <GenshinIcon className="w-4 h-4" />,
  growagarden: <GrowAGardenIcon className="w-4 h-4 text-emerald-400" />,
  ps99: <Ps99Icon className="w-4 h-4" />,
  helldivers2: <HelldiversIcon className="w-4 h-4" />,
  tfd: <TfdIcon className="w-4 h-4" />,
  oncehuman: <OnceHumanIcon className="w-4 h-4" />,
  wuwa: <WuwaIcon className="w-4 h-4" />,
  zzz: <ZzzIcon className="w-4 h-4" />,
  typesoul: <TypeSoulIcon className="w-4 h-4" />,
  bg3: <Bg3Icon className="w-4 h-4" />,
  lethalcompany: <LethalCompanyIcon className="w-4 h-4" />,
  starfield: <StarfieldIcon className="w-4 h-4" />,
  enshrouded: <EnshroudedIcon className="w-4 h-4" />,
  nightingale: <NightingaleIcon className="w-4 h-4" />,
  crk: <CrkIcon className="w-4 h-4 text-amber-400" />,
  afkj: <AfkjIcon className="w-4 h-4 text-purple-400" />,
  mogo: <MonopolyGoIcon className="w-4 h-4 text-red-400" />,
  sk: <SkIcon className="w-4 h-4 text-blue-400" />,
  cm: <CmIcon className="w-4 h-4 text-amber-400" />,
  gtaonline: <GtaOnlineIcon className="w-4 h-4" />,
  gta6: <Gta6Icon className="w-4 h-4" />
};

export default function Navbar({ currentPath, onNavigate, onOpenSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileGamesOpen, setMobileGamesOpen] = useState(true);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  const gamesRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const gamesTimerRef = useRef<NodeJS.Timeout | null>(null);
  const categoriesTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleGamesMouseEnter = () => {
    if (gamesTimerRef.current) clearTimeout(gamesTimerRef.current);
    if (categoriesTimerRef.current) clearTimeout(categoriesTimerRef.current);
    setCategoriesOpen(false);
    setGamesOpen(true);
  };

  const handleGamesMouseLeave = () => {
    if (gamesTimerRef.current) clearTimeout(gamesTimerRef.current);
    gamesTimerRef.current = setTimeout(() => {
      setGamesOpen(false);
    }, 150);
  };

  const handleCategoriesMouseEnter = () => {
    if (categoriesTimerRef.current) clearTimeout(categoriesTimerRef.current);
    if (gamesTimerRef.current) clearTimeout(gamesTimerRef.current);
    setGamesOpen(false);
    setCategoriesOpen(true);
  };

  const handleCategoriesMouseLeave = () => {
    if (categoriesTimerRef.current) clearTimeout(categoriesTimerRef.current);
    categoriesTimerRef.current = setTimeout(() => {
      setCategoriesOpen(false);
    }, 150);
  };

  // Close menus on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (gamesRef.current && !gamesRef.current.contains(target)) {
        setGamesOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(target)) {
        setCategoriesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setGamesOpen(false);
        setCategoriesOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (gamesTimerRef.current) clearTimeout(gamesTimerRef.current);
      if (categoriesTimerRef.current) clearTimeout(categoriesTimerRef.current);
    };
  }, []);

  const handleLinkClick = (path: string) => {
    if (gamesTimerRef.current) clearTimeout(gamesTimerRef.current);
    if (categoriesTimerRef.current) clearTimeout(categoriesTimerRef.current);
    onNavigate(path);
    setMobileMenuOpen(false);
    setGamesOpen(false);
    setCategoriesOpen(false);
  };

  // Curated Games list derived from centralized source of truth
  const gamesList = getPrimaryGames().map(game => ({
    name: game.name,
    path: getGamePath(game.id),
    count: TOOLS.filter(t => t.gameId === game.id).length,
    icon: GAME_NAV_ICONS[game.id] || <Gamepad2 className="w-4 h-4 text-violet-400" />
  }));

  // Categories list for dropdown
  const categoriesList = [
    {
      name: 'Calculators',
      path: '/tools?category=calculators',
      description: 'Game-specific calculations, stats, damage & XP',
      count: TOOLS.filter(t => t.categoryId === 'calculators').length,
      icon: <Calculator className="w-4 h-4 text-violet-400" />
    },
    {
      name: 'Generators',
      path: '/tools?category=generators',
      description: 'Blueprints, circles, layouts & brackets',
      count: TOOLS.filter(t => t.categoryId === 'generators').length,
      icon: <Shapes className="w-4 h-4 text-cyan-400" />
    },
    {
      name: 'Converters',
      path: '/tools?category=converters',
      description: 'Coordinates, sensitivity & DPI/eDPI conversions',
      count: TOOLS.filter(t => t.categoryId === 'converters').length,
      icon: <ArrowLeftRight className="w-4 h-4 text-purple-400" />
    },
    {
      name: 'Planners',
      path: '/tools?category=planners',
      description: 'Breeding, builds, resources & progression',
      count: TOOLS.filter(t => t.categoryId === 'planners').length,
      icon: <Layers className="w-4 h-4 text-cyan-400" />
    },
    {
      name: 'Trackers',
      path: '/tools?category=trackers',
      description: 'Session, progression & game tracking utilities',
      count: TOOLS.filter(t => t.categoryId === 'trackers').length,
      icon: <Clock className="w-4 h-4 text-violet-400" />
    },
    {
      name: 'Gaming Utilities',
      path: '/tools?category=gaming-utilities',
      description: "Useful tools that don't fit a single category",
      count: TOOLS.filter(t => t.categoryId === 'gaming-utilities').length,
      icon: <Dices className="w-4 h-4 text-cyan-400" />
    }
  ];

  const isGamesActive = currentPath.startsWith('/games') || 
    currentPath.startsWith('/minecraft') || 
    currentPath.startsWith('/roblox') || 
    currentPath.startsWith('/fortnite') || 
    currentPath.startsWith('/pokemongo') || 
    currentPath.startsWith('/palworld');

  const isCategoriesActive = currentPath.startsWith('/categories') || currentPath.includes('category=');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[rgba(7,11,25,0.85)] backdrop-blur-[12px] shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* 1. Brand Logo & Site Name: GamingToolsHub */}
          <div className="flex items-center gap-8 flex-shrink-0">
            <button
              onClick={() => handleLinkClick('/')}
              aria-label="GamingToolsHub Home"
              className="flex items-center gap-3 group text-left rounded-lg p-0.5"
            >
              <BrandLogo size="md" />
              <div>
                <span className="text-base sm:text-lg font-black tracking-tight text-[var(--text)] flex items-center">
                  GamingTools<span className="text-[var(--primary-light)] font-mono ml-0.5">Hub</span>
                </span>
                <span className="text-[10px] text-[var(--muted)] font-mono block -mt-0.5 tracking-wide">
                  Precision Gaming Utilities
                </span>
              </div>
            </button>

            {/* 2. Scalable Main Navigation (Desktop) */}
            <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
              {/* Games Dropdown */}
              <div 
                className="relative" 
                ref={gamesRef}
                onMouseEnter={handleGamesMouseEnter}
                onMouseLeave={handleGamesMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    setGamesOpen(prev => !prev);
                    setCategoriesOpen(false);
                  }}
                  aria-expanded={gamesOpen}
                  aria-haspopup="true"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    gamesOpen || isGamesActive
                      ? 'bg-[var(--surface-raised)] text-[var(--text)] font-semibold border border-[var(--primary)]/40 shadow-sm'
                      : 'text-[var(--text-soft)] hover:text-[var(--primary-light)] hover:bg-[var(--surface-raised)]'
                  }`}
                >
                  <span>Games</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${gamesOpen ? 'rotate-180 text-[var(--primary-light)]' : 'text-[var(--muted)]'}`} />
                </button>

                {/* Games Menu - 2 Column Mega Grid to ensure all games fit beautifully & scroll cleanly */}
                {gamesOpen && (
                  <div 
                    className="absolute top-full left-0 pt-1.5 w-[580px] max-w-[92vw] z-50 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl py-2 overflow-hidden flex flex-col max-h-[calc(100vh-80px)]">
                      <div className="px-4 py-2 text-[10px] uppercase font-mono tracking-wider text-[var(--muted)] font-semibold border-b border-[var(--border)] flex items-center justify-between">
                        <span>All Game Suites ({gamesList.length} Games)</span>
                        <span className="text-[var(--accent)] font-sans font-medium text-[11px]">Instant Calculator Suites</span>
                      </div>

                      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 overflow-y-auto max-h-[380px]">
                        {gamesList.map(game => (
                          <button
                            key={game.name}
                            onClick={() => handleLinkClick(game.path)}
                            className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[var(--surface-raised)] flex items-center justify-between text-xs transition-colors group border border-transparent hover:border-[var(--primary)]/40"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              <div className="w-6 h-6 rounded bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--primary)]/50">
                                {game.icon}
                              </div>
                              <span className="text-[var(--text-soft)] group-hover:text-[var(--primary-light)] font-medium truncate">
                                {game.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-[var(--muted)] group-hover:text-[var(--primary-light)] flex-shrink-0 bg-[var(--bg)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                              {game.count}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-2 px-3 border-t border-[var(--border)] bg-[var(--bg)]">
                        <button
                          onClick={() => handleLinkClick('/games')}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--primary-light)] hover:text-[var(--accent)] hover:bg-[var(--surface-raised)] flex items-center justify-between transition-colors"
                        >
                          <span>Explore All Game Directories & Hubs</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Categories Dropdown */}
              <div 
                className="relative" 
                ref={categoriesRef}
                onMouseEnter={handleCategoriesMouseEnter}
                onMouseLeave={handleCategoriesMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    setCategoriesOpen(prev => !prev);
                    setGamesOpen(false);
                  }}
                  aria-expanded={categoriesOpen}
                  aria-haspopup="true"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    categoriesOpen || isCategoriesActive
                      ? 'bg-[var(--surface-raised)] text-[var(--text)] font-semibold border border-[var(--primary)]/40 shadow-sm'
                      : 'text-[var(--text-soft)] hover:text-[var(--primary-light)] hover:bg-[var(--surface-raised)]'
                  }`}
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${categoriesOpen ? 'rotate-180 text-[var(--primary-light)]' : 'text-[var(--muted)]'}`} />
                </button>

                {/* Categories Menu */}
                {categoriesOpen && (
                  <div 
                    className="absolute top-full left-0 pt-1.5 w-72 z-50 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl py-1.5">
                      <div className="px-3.5 py-1.5 text-[10px] uppercase font-mono tracking-wider text-[var(--muted)] font-semibold border-b border-[var(--border)]">
                        Functional Categories
                      </div>

                      <div className="p-1 space-y-0.5">
                        {categoriesList.map(cat => (
                          <button
                            key={cat.name}
                            onClick={() => handleLinkClick(cat.path)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--surface-raised)] flex items-center justify-between text-xs transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--primary)]/50">
                                {cat.icon}
                              </div>
                              <div>
                                <div className="text-[var(--text-soft)] group-hover:text-[var(--primary-light)] font-medium">
                                  {cat.name}
                                </div>
                                <div className="text-[10px] text-[var(--muted)] line-clamp-1">
                                  {cat.description}
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-[var(--muted)] group-hover:text-[var(--primary-light)] ml-2">
                              {cat.count}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-1 mt-1 border-t border-[var(--border)] p-1.5">
                        <button
                          onClick={() => handleLinkClick('/categories')}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--primary-light)] hover:text-[var(--accent)] hover:bg-[var(--surface-raised)] flex items-center justify-between transition-colors"
                        >
                          <span>All Categories Overview</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Codes Nav Link */}
              <button
                onClick={() => handleLinkClick('/codes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  currentPath.startsWith('/codes')
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-950/40'
                    : 'text-[var(--text-soft)] hover:text-[var(--primary-light)] hover:bg-[var(--surface-raised)]'
                }`}
              >
                <span>🎁</span>
                <span>Codes</span>
              </button>

              {/* Q&A Nav Link */}
              <button
                onClick={() => handleLinkClick('/qa')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  currentPath.startsWith('/qa')
                    ? 'bg-[var(--primary)] text-white font-semibold shadow-md shadow-violet-950/50'
                    : 'text-[var(--text-soft)] hover:text-[var(--primary-light)] hover:bg-[var(--surface-raised)]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-[var(--primary-light)]" />
                <span>Q&A</span>
              </button>

              {/* All Tools Link */}
              <button
                onClick={() => handleLinkClick('/tools')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  currentPath === '/tools'
                    ? 'bg-[var(--primary)] text-white font-semibold shadow-md shadow-violet-950/50'
                    : 'text-[var(--text-soft)] hover:text-[var(--primary-light)] hover:bg-[var(--surface-raised)]'
                }`}
              >
                All Tools
              </button>
            </nav>
          </div>

          {/* 3. Search Bar (Highly Visible on Desktop) & Mobile Toggle */}
          <div className="flex items-center gap-2.5 flex-1 max-w-xs sm:max-w-sm justify-end">
            <button
              onClick={onOpenSearch}
              aria-label="Search gaming tools (Ctrl+K)"
              className="field w-full max-w-[280px] sm:max-w-[320px] flex items-center justify-between px-3 py-2 hover:border-[var(--primary)] text-[var(--muted)] hover:text-[var(--text)] text-xs transition-all shadow-inner group"
              title="Search gaming tools (Ctrl+K / ⌘K)"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-[var(--primary-light)] flex-shrink-0 group-hover:scale-105 transition-transform" />
                <span className="truncate text-[var(--muted)] group-hover:text-[var(--text)]">Search gaming tools...</span>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-soft)] bg-[var(--bg)] border border-[var(--border)] rounded flex-shrink-0 ml-1.5">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--primary-light)] hover:border-[var(--primary)] flex-shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Professional Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--bg)] px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Mobile Search Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            aria-label="Search gaming tools"
            className="field w-full flex items-center justify-between px-3.5 py-2.5 text-[var(--text-soft)] hover:border-[var(--primary)] text-xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[var(--primary-light)]" />
              <span>Search gaming tools...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[var(--bg)] border border-[var(--border)] rounded text-[var(--muted)]">
              ⌘K
            </kbd>
          </button>

          {/* Codes Primary Mobile Button */}
          <button
            onClick={() => handleLinkClick('/codes')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              currentPath.startsWith('/codes')
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-950/40'
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">🎁</span>
              <span>Game Codes & Free Links</span>
            </div>
            <span className="text-[10px] font-mono bg-[#070b19] px-2 py-0.5 rounded text-amber-400 border border-amber-500/30">
              Active
            </span>
          </button>

          {/* Q&A Primary Mobile Button */}
          <button
            onClick={() => handleLinkClick('/qa')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              currentPath.startsWith('/qa')
                ? 'bg-violet-600 text-white shadow-md shadow-violet-950/50'
                : 'bg-[#0c122e] border border-indigo-900/60 text-slate-200 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-violet-400" />
              <span>Game Q&A Base</span>
            </div>
            <span className="text-[10px] font-mono bg-[#070b19] px-2 py-0.5 rounded text-cyan-400 border border-indigo-900/40">
              Answers
            </span>
          </button>

          {/* All Tools Primary Mobile Button */}
          <button
            onClick={() => handleLinkClick('/tools')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              currentPath === '/tools'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-950/50'
                : 'bg-[#0c122e] border border-indigo-900/60 text-slate-200 hover:text-white'
            }`}
          >
            <span>All Tools Directory</span>
            <span className="text-[10px] font-mono bg-[#070b19] px-2 py-0.5 rounded text-cyan-400 border border-indigo-900/40">
              {TOOLS.length} Tools
            </span>
          </button>

          {/* Games Accordion */}
          <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
            <button
              onClick={() => setMobileGamesOpen(!mobileGamesOpen)}
              aria-expanded={mobileGamesOpen}
              className="w-full p-3 text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-soft)]"
            >
              <span>Games</span>
              <ChevronDown className={`w-4 h-4 text-[var(--muted)] transition-transform ${mobileGamesOpen ? 'rotate-180 text-[var(--primary-light)]' : ''}`} />
            </button>

            {mobileGamesOpen && (
              <div className="px-2 pb-2 space-y-1 border-t border-[var(--border)] pt-1.5">
                {gamesList.map(item => (
                  <button
                    key={item.name}
                    onClick={() => handleLinkClick(item.path)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-soft)] hover:bg-[var(--surface-raised)] hover:text-[var(--primary-light)] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--muted)]">{item.count}</span>
                  </button>
                ))}
                <button
                  onClick={() => handleLinkClick('/games')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[var(--primary-light)] hover:text-[var(--accent)] flex items-center justify-between border-t border-[var(--border)] mt-1 pt-1.5"
                >
                  <span>More Games →</span>
                </button>
              </div>
            )}
          </div>

          {/* Categories Accordion */}
          <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
            <button
              onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
              aria-expanded={mobileCategoriesOpen}
              className="w-full p-3 text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-soft)]"
            >
              <span>Categories</span>
              <ChevronDown className={`w-4 h-4 text-[var(--muted)] transition-transform ${mobileCategoriesOpen ? 'rotate-180 text-[var(--primary-light)]' : ''}`} />
            </button>

            {mobileCategoriesOpen && (
              <div className="px-2 pb-2 space-y-1 border-t border-indigo-950/80 pt-1.5">
                {categoriesList.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => handleLinkClick(cat.path)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-[#121c45] hover:text-white flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      {cat.icon}
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{cat.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
