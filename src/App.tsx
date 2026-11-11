/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';

// Pages
import HomePage from './pages/HomePage';
import MinecraftHubPage from './pages/MinecraftHubPage';
import RobloxHubPage from './pages/RobloxHubPage';
import FortniteHubPage from './pages/FortniteHubPage';
import PokemonGoHubPage from './pages/PokemonGoHubPage';
import PalworldHubPage from './pages/PalworldHubPage';
import HelldiversHubPage from './pages/HelldiversHubPage';
import Ps99HubPage from './pages/Ps99HubPage';
import TheFirstDescendantHubPage from './pages/TheFirstDescendantHubPage';
import OnceHumanHubPage from './pages/OnceHumanHubPage';
import WutheringWavesHubPage from './pages/WutheringWavesHubPage';
import ZenlessZoneZeroHubPage from './pages/ZenlessZoneZeroHubPage';
import TypeSoulHubPage from './pages/TypeSoulHubPage';
import Bg3HubPage from './pages/Bg3HubPage';
import LethalCompanyHubPage from './pages/LethalCompanyHubPage';
import StarfieldHubPage from './pages/StarfieldHubPage';
import EnshroudedHubPage from './pages/EnshroudedHubPage';
import NightingaleHubPage from './pages/NightingaleHubPage';
import CrkHubPage from './pages/CrkHubPage';
import AfkjHubPage from './pages/AfkjHubPage';
import MonopolyGoHubPage from './pages/MonopolyGoHubPage';
import SevenKnightsHubPage from './pages/SevenKnightsHubPage';
import CoinMasterHubPage from './pages/CoinMasterHubPage';
import ToolsDirectoryPage from './pages/ToolsDirectoryPage';
import ToolDetailPage from './pages/ToolDetailPage';
import GamesPage from './pages/GamesPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import DisclaimerPage from './pages/DisclaimerPage';
import NotFoundPage from './pages/NotFoundPage';
import CodesIndexPage from './pages/CodesIndexPage';
import CodesDetailPage from './pages/CodesDetailPage';

import { getToolBySlug } from './data/gamesAndTools';
import { getCodesPageBySlug } from './data/codesData';
import AdLayout from './components/ads/AdLayout';

export default function App() {
  // Parse current route from window.location (clean HTML5 pathname) without any page-load history rewrites
  const getInitialPath = (): string => {
    // 1. Handle GitHub Pages 404 SPA redirect stored in sessionStorage (if any)
    if (typeof window !== 'undefined' && window.sessionStorage?.redirect) {
      const redirectUrl = window.sessionStorage.redirect;
      delete window.sessionStorage.redirect;
      try {
        const url = new URL(redirectUrl);
        return (url.pathname + url.search) || '/';
      } catch {
        // ignore and fallback
      }
    }

    // 2. Handle GitHub Pages query parameter (?p=/tools/slug or ?/tools/slug)
    const search = typeof window !== 'undefined' ? window.location.search : '';
    if (search && search.startsWith('?/')) {
      const decoded = decodeURIComponent(search.slice(1).replace(/~and~/g, '&'));
      return decoded || '/';
    }
    const searchParams = new URLSearchParams(search);
    if (searchParams.has('p')) {
      return searchParams.get('p') || '/';
    }

    // 3. Backward compatibility: if user hits a legacy hash URL (#/tools/slug)
    if (typeof window !== 'undefined' && window.location.hash && window.location.hash.startsWith('#')) {
      const hashPath = window.location.hash.replace(/^#\/?/, '/');
      if (hashPath && hashPath !== '/') {
        return hashPath;
      }
    }

    // 4. Standard clean URL pathname + search query
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    return `${path}${search}` || '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialPath());
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Sync route on popstate and hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(getInitialPath());
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Track page views in Google Analytics on route change
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: currentRoute,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [currentRoute]);

  // Programmatic navigate function using HTML5 clean URLs (No hash!)
  const navigate = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (window.location.pathname + window.location.search !== cleanPath) {
      window.history.pushState(null, '', cleanPath);
    }
    setCurrentRoute(cleanPath);
    window.scrollTo(0, 0);
  };

  // Route resolver
  const renderCurrentPage = () => {
    const rawPath = currentRoute.split('?')[0];
    const cleanRoute = (rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '')) || '/';
    const queryString = currentRoute.includes('?') ? currentRoute.split('?')[1] : '';
    const queryParams = new URLSearchParams(queryString);

    // 1. Home
    if (cleanRoute === '/' || cleanRoute === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      );
    }

    // 2. Dedicated Minecraft Hub
    if (cleanRoute === '/minecraft' || cleanRoute === '/games/minecraft') {
      return <MinecraftHubPage onNavigate={navigate} />;
    }

    // 3. Dedicated Roblox Hub
    if (cleanRoute === '/roblox' || cleanRoute === '/games/roblox') {
      return <RobloxHubPage onNavigate={navigate} />;
    }

    // 4. Dedicated Fortnite Hub
    if (cleanRoute === '/fortnite' || cleanRoute === '/games/fortnite') {
      return <FortniteHubPage onNavigate={navigate} />;
    }

    // 5. Dedicated Pokémon GO Hub
    if (cleanRoute === '/pokemongo' || cleanRoute === '/games/pokemongo') {
      return <PokemonGoHubPage onNavigate={navigate} />;
    }

    // 6. Dedicated Palworld Hub
    if (cleanRoute === '/games/palworld' || cleanRoute === '/palworld' || cleanRoute === '/games/palworld/') {
      return <PalworldHubPage onNavigate={navigate} />;
    }

    // 7. Dedicated Genshin Impact Hub / Filter
    if (cleanRoute === '/genshin' || cleanRoute === '/games/genshin') {
      return <GamesPage selectedGameSlug="genshin" onNavigate={navigate} />;
    }

    // 7.1 Dedicated Helldivers 2 Hub / Filter
    if (cleanRoute === '/helldivers-2' || cleanRoute === '/games/helldivers-2' || cleanRoute === '/helldivers2') {
      return <HelldiversHubPage onNavigate={navigate} />;
    }

    // 7.2 Dedicated Pet Simulator 99 Hub
    if (cleanRoute === '/ps99' || cleanRoute === '/pet-simulator-99' || cleanRoute === '/games/ps99' || cleanRoute === '/games/pet-simulator-99') {
      return <Ps99HubPage onNavigate={navigate} />;
    }

    // 7.3 Dedicated The First Descendant Hub
    if (cleanRoute === '/tfd' || cleanRoute === '/the-first-descendant' || cleanRoute === '/games/tfd' || cleanRoute === '/games/the-first-descendant') {
      return <TheFirstDescendantHubPage onNavigate={navigate} />;
    }

    // 7.4 Dedicated Once Human Hub
    if (cleanRoute === '/once-human' || cleanRoute === '/oncehuman' || cleanRoute === '/games/once-human' || cleanRoute === '/games/oncehuman') {
      return <OnceHumanHubPage onNavigate={navigate} />;
    }

    // 7.5 Dedicated Wuthering Waves Hub
    if (cleanRoute === '/wuthering-waves' || cleanRoute === '/wuwa' || cleanRoute === '/games/wuthering-waves' || cleanRoute === '/games/wuwa') {
      return <WutheringWavesHubPage onNavigate={navigate} />;
    }

    // 7.6 Dedicated Zenless Zone Zero Hub
    if (cleanRoute === '/zenless-zone-zero' || cleanRoute === '/zzz' || cleanRoute === '/games/zenless-zone-zero' || cleanRoute === '/games/zzz') {
      return <ZenlessZoneZeroHubPage onNavigate={navigate} />;
    }

    // 7.7 Dedicated Roblox Type Soul Hub
    if (cleanRoute === '/type-soul' || cleanRoute === '/typesoul' || cleanRoute === '/roblox-type-soul' || cleanRoute === '/games/type-soul' || cleanRoute === '/games/typesoul') {
      return <TypeSoulHubPage onNavigate={navigate} />;
    }

    // 7.8 Dedicated Baldur's Gate 3 Hub
    if (cleanRoute === '/baldurs-gate-3' || cleanRoute === '/bg3' || cleanRoute === '/games/baldurs-gate-3' || cleanRoute === '/games/bg3') {
      return <Bg3HubPage onNavigate={navigate} />;
    }

    // 7.9 Dedicated Lethal Company & Content Warning Hub
    if (cleanRoute === '/lethal-company' || cleanRoute === '/lethalcompany' || cleanRoute === '/content-warning' || cleanRoute === '/contentwarning' || cleanRoute === '/games/lethal-company' || cleanRoute === '/games/lethalcompany' || cleanRoute === '/games/content-warning') {
      return <LethalCompanyHubPage onNavigate={navigate} />;
    }

    // 7.10 Dedicated Starfield Hub
    if (cleanRoute === '/starfield' || cleanRoute === '/games/starfield') {
      return <StarfieldHubPage onNavigate={navigate} />;
    }

    // 7.11 Dedicated Enshrouded Hub
    if (cleanRoute === '/enshrouded' || cleanRoute === '/games/enshrouded') {
      return <EnshroudedHubPage onNavigate={navigate} />;
    }

    // 7.12 Dedicated Nightingale Hub
    if (cleanRoute === '/nightingale' || cleanRoute === '/games/nightingale') {
      return <NightingaleHubPage onNavigate={navigate} />;
    }

    // 7.13 Dedicated Cookie Run: Kingdom Hub
    if (cleanRoute === '/cookie-run-kingdom' || cleanRoute === '/crk' || cleanRoute === '/games/cookie-run-kingdom' || cleanRoute === '/games/crk') {
      return <CrkHubPage onNavigate={navigate} />;
    }

    // 7.14 Dedicated AFK Journey Hub
    if (cleanRoute === '/afk-journey' || cleanRoute === '/afkj' || cleanRoute === '/games/afk-journey' || cleanRoute === '/games/afkj') {
      return <AfkjHubPage onNavigate={navigate} />;
    }

    // 7.15 Dedicated Monopoly GO Hub
    if (cleanRoute === '/monopoly-go' || cleanRoute === '/mogo' || cleanRoute === '/monopolygo' || cleanRoute === '/games/monopoly-go' || cleanRoute === '/games/mogo') {
      return <MonopolyGoHubPage onNavigate={navigate} />;
    }

    // 7.16 Dedicated Seven Knights Re:BIRTH Hub
    if (cleanRoute === '/seven-knights-rebirth' || cleanRoute === '/sk' || cleanRoute === '/games/seven-knights-rebirth' || cleanRoute === '/games/sk') {
      return <SevenKnightsHubPage onNavigate={navigate} />;
    }

    // 7.17 Dedicated Coin Master Hub
    if (cleanRoute === '/coin-master' || cleanRoute === '/cm' || cleanRoute === '/games/coin-master' || cleanRoute === '/games/cm') {
      return <CoinMasterHubPage onNavigate={navigate} />;
    }

    // 8. Individual Tool Page (/tools/:slug)
    if (cleanRoute.startsWith('/tools/')) {
      const slug = cleanRoute.replace('/tools/', '').replace(/\/$/, '');
      const tool = getToolBySlug(slug);
      if (tool) {
        return <ToolDetailPage tool={tool} onNavigate={navigate} />;
      }
      return <NotFoundPage onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />;
    }

    // 9. Tools Directory (/tools)
    if (cleanRoute === '/tools') {
      return <ToolsDirectoryPage onNavigate={navigate} />;
    }

    // 10. Games Page (/games)
    if (cleanRoute === '/games') {
      const gameSlug = queryParams.get('game');
      if (gameSlug === 'minecraft') {
        return <MinecraftHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'roblox') {
        return <RobloxHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'fortnite') {
        return <FortniteHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'pokemongo') {
        return <PokemonGoHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'palworld') {
        return <PalworldHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'ps99' || gameSlug === 'pet-simulator-99') {
        return <Ps99HubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'tfd' || gameSlug === 'the-first-descendant') {
        return <TheFirstDescendantHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'oncehuman' || gameSlug === 'once-human') {
        return <OnceHumanHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'wuwa' || gameSlug === 'wuthering-waves') {
        return <WutheringWavesHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'zzz' || gameSlug === 'zenless-zone-zero') {
        return <ZenlessZoneZeroHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'typesoul' || gameSlug === 'type-soul' || gameSlug === 'roblox-type-soul') {
        return <TypeSoulHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'bg3' || gameSlug === 'baldurs-gate-3') {
        return <Bg3HubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'lethalcompany' || gameSlug === 'lethal-company') {
        return <LethalCompanyHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'starfield') {
        return <StarfieldHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'enshrouded') {
        return <EnshroudedHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'nightingale') {
        return <NightingaleHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'crk' || gameSlug === 'cookie-run-kingdom') {
        return <CrkHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'afkj' || gameSlug === 'afk-journey') {
        return <AfkjHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'mogo' || gameSlug === 'monopoly-go' || gameSlug === 'monopolygo') {
        return <MonopolyGoHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'sk' || gameSlug === 'seven-knights-rebirth') {
        return <SevenKnightsHubPage onNavigate={navigate} />;
      }
      if (gameSlug === 'cm' || gameSlug === 'coin-master') {
        return <CoinMasterHubPage onNavigate={navigate} />;
      }
      return <GamesPage selectedGameSlug={gameSlug} onNavigate={navigate} />;
    }

    // 6. Categories Page (/categories)
    if (cleanRoute === '/categories') {
      const catId = queryParams.get('cat');
      return <CategoriesPage selectedCategoryId={catId} onNavigate={navigate} />;
    }

    // 7. Informational pages
    if (cleanRoute === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (cleanRoute === '/privacy') {
      return <PrivacyPolicyPage onNavigate={navigate} />;
    }
    if (cleanRoute === '/terms') {
      return <TermsPage onNavigate={navigate} />;
    }
    if (cleanRoute === '/disclaimer') {
      return <DisclaimerPage onNavigate={navigate} />;
    }

    // 7.17 Game Codes (/codes and /codes/:slug)
    if (cleanRoute === '/codes') {
      return <CodesIndexPage onNavigate={navigate} />;
    }
    if (cleanRoute.startsWith('/codes/')) {
      const slug = cleanRoute.replace('/codes/', '').replace(/\/$/, '');
      const codesPage = getCodesPageBySlug(slug);
      if (codesPage) {
        return <CodesDetailPage pageData={codesPage} onNavigate={navigate} />;
      }
      return <NotFoundPage onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />;
    }

    // 8. 404
    return <NotFoundPage onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />;
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 flex flex-col justify-between selection:bg-violet-600 selection:text-white">
      <div>
        <Navbar
          currentPath={currentRoute}
          onNavigate={navigate}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {renderCurrentPage()}
        </main>
      </div>

      <Footer onNavigate={navigate} />

      {/* Global Mobile Sticky Anchor Ad */}
      <AdLayout.MobileAnchor currentPath={currentRoute} />

      {/* Global Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTool={(slug) => navigate(`/tools/${slug}`)}
        onNavigate={navigate}
      />
    </div>
  );
}
