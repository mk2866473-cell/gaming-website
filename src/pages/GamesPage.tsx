/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Gamepad2, ArrowRight, Box, Crosshair, Swords, Compass } from 'lucide-react';
import { GAMES, TOOLS, getGamePath } from '../data/gamesAndTools';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import ToolCard from '../components/ToolCard';
import { getGameIcon } from '../components/GameIcons';
import BrandLogo from '../components/BrandLogo';
import AdLayout from '../components/ads/AdLayout';
import HubCodesBanner from '../components/HubCodesBanner';

interface GamesPageProps {
  selectedGameSlug?: string | null;
  onNavigate: (path: string) => void;
}

export default function GamesPage({ selectedGameSlug, onNavigate }: GamesPageProps) {
  const activeGame = GAMES.find(g => g.slug === selectedGameSlug || g.id === selectedGameSlug);
  const displayedTools = TOOLS.filter(t => !activeGame || t.gameId === activeGame.id);
  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    ...(activeGame ? [{ name: activeGame.name, path: getGamePath(activeGame.id) }] : [])
  ];

  return (
    <>
      <SEOHead
        title={activeGame ? `${activeGame.name} Calculators & Tools` : 'Browse Gaming Tools by Game'}
        description={activeGame ? activeGame.description : 'Find calculators, generators, and tools sorted by game: Minecraft, FPS esports, RPGs, and party games.'}
        canonicalPath="/games"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-8">
        {/* Hub Top Banner Ad Slot */}
        <AdLayout.HubTop />

        {/* Dynamic Game Codes Banner if viewing a specific game like Genshin Impact */}
        {activeGame && (
          <HubCodesBanner hubPath={getGamePath(activeGame.id)} onNavigate={onNavigate} />
        )}

        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0">
              {activeGame ? (
                <div className="w-12 h-12 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                  {getGameIcon(activeGame.id, 'w-7 h-7')}
                </div>
              ) : (
                <BrandLogo size="lg" className="!rounded-[12px] shrink-0" />
              )}
              <div className="space-y-2 min-w-0">
                <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight leading-tight">
                  {activeGame ? `${activeGame.name} Calculators & Tools` : 'Browse Calculators by Game'}
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed max-w-3xl">
                  {activeGame ? activeGame.description : 'Select your favorite game to find tailored calculators and utilities.'}
                </p>
                <p className="text-xs font-mono text-[var(--muted)] tabular-nums">
                  {activeGame ? `${displayedTools.length} tools` : `${displayedTools.length} tools across ${GAMES.length} games`}
                </p>
              </div>
            </div>
            {activeGame && (
              <button
                type="button"
                onClick={() => onNavigate('/games')}
                className="text-xs font-semibold text-[var(--primary-light)] hover:text-[var(--accent)] self-start transition-colors shrink-0"
              >
                ← View All Games
              </button>
            )}
          </div>
        </div>

        {/* Game selection cards if no game selected */}
        {!activeGame && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GAMES.map((game) => {
              const count = TOOLS.filter(t => t.gameId === game.id).length;
              return (
                <div
                  key={game.id}
                  onClick={() => onNavigate(getGamePath(game.id))}
                  className="group bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/50 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-950/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#070b19] border border-indigo-950 flex items-center justify-center group-hover:border-violet-500/50 transition-colors">
                        {getGameIcon(game.id, 'w-5 h-5')}
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-300 bg-[#070b19] px-2 py-0.5 rounded border border-indigo-950">
                        {count} {count === 1 ? 'Tool' : 'Tools'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-indigo-950/80 flex items-center justify-between text-xs font-semibold text-violet-400 group-hover:text-cyan-300 transition-colors">
                    <span>View Tools</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tools belonging to active game (or all tools) */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">
            {activeGame ? `${activeGame.name} Utilities (${TOOLS.filter(t => t.gameId === activeGame.id).length})` : 'All Available Game Tools'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.filter(t => !activeGame || t.gameId === activeGame.id).map((tool, idx) => (
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

        {/* Hub Above Footer Banner Ad Slot */}
        <AdLayout.HubAboveFooter />
      </div>
    </>
  );
}
