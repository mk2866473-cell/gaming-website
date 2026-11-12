/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Crosshair, Search, Sliders, ArrowRight, Star, ShieldCheck, Zap, 
  Trophy, Award, Compass, Timer, MousePointer, Shield, Sword, Layers
} from 'lucide-react';
import { TOOLS, ToolItem } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { getGameIcon } from '../components/GameIcons';
import AdLayout from '../components/ads/AdLayout';

interface FortniteHubPageProps {
  onNavigate: (path: string) => void;
}

export default function FortniteHubPage({ onNavigate }: FortniteHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  const fortniteTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === 'fortnite');
  }, []);

  const categories = [
    { id: 'all', name: 'All Fortnite Tools (10)' },
    { id: 'xp', name: 'Battle Pass & XP (Level 100/200, XP Calc, Pacing)' },
    { id: 'aim', name: 'Aim & Sensitivity (Converter, eDPI, Pro Meta)' },
    { id: 'combat', name: 'Combat & Survival (Damage, Fall Dmg, Storm Timer)' }
  ];

  const filteredTools = useMemo(() => {
    return fortniteTools.filter(tool => {
      const matchQuery =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchCategory = true;
      if (selectedSubCategory === 'xp') {
        matchCategory = ['fortnite-xp-calculator', 'fortnite-battle-pass-calculator', 'fortnite-level-calculator', 'fortnite-xp-required-calculator'].includes(tool.id);
      } else if (selectedSubCategory === 'aim') {
        matchCategory = ['fortnite-sensitivity-converter', 'fortnite-edpi-calculator'].includes(tool.id);
      } else if (selectedSubCategory === 'combat') {
        matchCategory = ['fortnite-damage-calculator', 'fortnite-fall-damage-calculator', 'fortnite-distance-calculator', 'fortnite-session-timer'].includes(tool.id);
      }

      return matchQuery && matchCategory;
    });
  }, [fortniteTools, searchQuery, selectedSubCategory]);

  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    { name: 'Fortnite Tools', path: '/fortnite' }
  ];

  return (
    <>
      <SEOHead
        title="Fortnite Calculators & Tools – Battle Pass XP, Sensitivity & Damage"
        description="Comprehensive suite of 10+ Fortnite tools: Battle Pass XP Pacing to Level 200, 80k XP Leveling, Mouse Sensitivity Converter, eDPI Pro calculator, Weapon Damage, Fall Damage height math & Storm Timers."
        canonicalPath="/games/fortnite"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Hub Top Banner Ad Slot */}
        <AdLayout.HubTop currentPath="/fortnite" />

        {/* Breadcrumb & Hero Header */}
        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="relative rounded-3xl bg-gradient-to-br from-amber-950/60 via-zinc-900 to-zinc-950 border border-amber-500/30 p-6 sm:p-10 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                <Crosshair className="w-3.5 h-3.5 text-amber-400" />
                <span>Dedicated Fortnite Battle Royale & Creative Suite</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="p-2 sm:p-2.5 rounded-2xl bg-amber-950/80 border border-amber-500/40 shadow-lg inline-flex items-center justify-center shrink-0">
                  {getGameIcon('fortnite', 'w-8 h-8 sm:w-11 sm:h-11')}
                </span>
                <span>Fortnite Calculators & Aim Utilities</span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                Precision Battle Pass pacing calculators, 80k XP curve planners, cross-game mouse sensitivity converters, weapon TTK simulators, and tournament storm circle timers.
              </p>

              {/* Quick Search */}
              <div className="pt-2 max-w-lg">
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-zinc-950/90 border border-zinc-700/80 rounded-xl shadow-lg">
                  <Search className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search XP, battle pass, sensitivity, damage, storm..."
                    className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-xs text-zinc-400 hover:text-white">
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedSubCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedSubCategory === cat.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-lg shadow-amber-950/30 font-bold'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Fortnite Tools Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              Available Fortnite Utilities ({filteredTools.length})
            </h2>
            <span className="text-xs font-mono text-zinc-400">
              100% Client-Side Engine
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>

        {/* Fortnite Meta Mechanics Guide */}
        <section className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">
              Current Fortnite Battle Royale Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-2">
              <span className="font-bold text-amber-400 text-sm block">Battle Pass & Leveling Formula</span>
              <p className="text-zinc-400">
                • <strong>80k XP per Level:</strong> Fortnite standardizes exactly 80,000 XP per level from Level 1 to 1000.
              </p>
              <p className="text-zinc-400">
                • <strong>Battle Pass Caps:</strong> Level 100 for base tier rewards, Level 150 for Super Level Styles, and Level 200 for full bonus unlocks.
              </p>
              <p className="text-zinc-400">
                • <strong>Creative XP Limit:</strong> Creative maps award approx 400,000 XP per day before diminishing returns.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-2">
              <span className="font-bold text-cyan-400 text-sm block">Movement, Aim & Fall Physics</span>
              <p className="text-zinc-400">
                • <strong>Safe Fall Limit:</strong> Falling up to 3 building tiles (approx 15.3 meters) deals 0 damage. Falls $\ge 4.5$ tiles are fatal.
              </p>
              <p className="text-zinc-400">
                • <strong>eDPI Pro Meta:</strong> Top competitive pro players maintain 45 to 75 eDPI for balanced building and pump shotgun precision.
              </p>
              <p className="text-zinc-400">
                • <strong>Zero Build Overshield:</strong> Adds 50 auto-recharging shield over standard 100 HP + 100 Shield (250 EHP total).
              </p>
            </div>
          </div>
        </section>

        {/* Hub Above Footer Banner Ad Slot */}
        <AdLayout.HubAboveFooter />
      </div>
    </>
  );
}
