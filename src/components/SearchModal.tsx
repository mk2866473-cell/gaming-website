/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ArrowRight, Gamepad2, Sparkles, Filter } from 'lucide-react';
import { TOOLS, GAMES, ToolItem, GameInfo, getGamePath, getGameById } from '../data/gamesAndTools';
import { getGameIcon } from './GameIcons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (slug: string) => void;
  onNavigate?: (path: string) => void;
}

const POPULAR_SEARCH_PRESETS = [
  { label: 'Coin Master', query: 'Coin Master' },
  { label: 'Seven Knights', query: 'Seven Knights' },
  { label: 'Monopoly GO!', query: 'Monopoly GO' },
  { label: "Baldur's Gate 3", query: 'Baldur' },
  { label: 'Palworld', query: 'Palworld' },
  { label: 'Minecraft', query: 'Minecraft' },
  { label: 'Roblox', query: 'Roblox' },
  { label: 'Fortnite', query: 'Fortnite' },
  { label: 'Pokémon GO', query: 'Pokemon' },
  { label: 'Helldivers 2', query: 'Helldivers' },
  { label: 'Lethal Company', query: 'Lethal' }
];

export default function SearchModal({ isOpen, onClose, onSelectTool, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search results for both Games and Tools
  const { matchedGames, matchedTools } = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) {
      return {
        matchedGames: [],
        matchedTools: TOOLS.slice(0, 8)
      };
    }

    // 1. Search all 23 Games
    const games = GAMES.filter((g) => {
      return (
        g.name.toLowerCase().includes(q) ||
        (g.shortName && g.shortName.toLowerCase().includes(q)) ||
        g.slug.toLowerCase().includes(q) ||
        g.id.toLowerCase().includes(q) ||
        (g.tagline && g.tagline.toLowerCase().includes(q)) ||
        (g.description && g.description.toLowerCase().includes(q))
      );
    });

    // 2. Search all Tools with full game context
    const tools = TOOLS.filter((tool) => {
      const game = getGameById(tool.gameId);
      const gameName = game ? game.name.toLowerCase() : '';
      const gameShortName = game?.shortName ? game.shortName.toLowerCase() : '';
      const gameSlug = game ? game.slug.toLowerCase() : '';

      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        tool.gameId.toLowerCase().includes(q) ||
        tool.slug.toLowerCase().includes(q) ||
        gameName.includes(q) ||
        gameShortName.includes(q) ||
        gameSlug.includes(q)
      );
    });

    return {
      matchedGames: games,
      matchedTools: tools
    };
  }, [query]);

  const handleOpenGame = (gameId: string) => {
    const path = getGamePath(gameId);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
    onClose();
  };

  const handleOpenTool = (slug: string) => {
    onSelectTool(slug);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0c122e] border border-indigo-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-indigo-950 bg-[#080d21] flex-shrink-0">
          <Search className="w-5 h-5 text-violet-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all games & tools (Coin Master, Seven Knights, Monopoly, Minecraft, etc.)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (matchedGames.length > 0) {
                  handleOpenGame(matchedGames[0].id);
                } else if (matchedTools.length > 0) {
                  handleOpenTool(matchedTools[0].slug);
                }
              }
            }}
            className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200 mr-2"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-300 bg-[#070b19] border border-indigo-900/60 rounded">
            ESC
          </kbd>
        </div>

        {/* Quick Filter Presets */}
        <div className="px-3.5 py-2 bg-[#070b19] border-b border-indigo-950/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0 text-xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0 mr-1">
            <Filter className="w-3 h-3 text-violet-400" />
            <span>Games:</span>
          </span>
          {POPULAR_SEARCH_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setQuery(preset.query)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border flex-shrink-0 ${
                query.toLowerCase() === preset.query.toLowerCase()
                  ? 'bg-violet-600 text-white border-violet-500 shadow-sm shadow-violet-950/50'
                  : 'bg-[#0c122e] text-slate-300 border-indigo-900/60 hover:border-violet-500/50 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-3 flex-1">
          {/* 1. MATCHED GAME HUBS */}
          {matchedGames.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-violet-400 px-2 py-1 font-mono flex items-center justify-between">
                <span>Game Hubs ({matchedGames.length})</span>
                <span className="text-slate-400 font-sans normal-case text-[10px]">Direct Hub Page</span>
              </div>

              {matchedGames.map((game) => {
                const count = TOOLS.filter((t) => t.gameId === game.id).length;
                return (
                  <div
                    key={game.id}
                    onClick={() => handleOpenGame(game.id)}
                    className="group flex items-center justify-between p-3 rounded-xl bg-[#080d21] hover:bg-[#121c45] border border-indigo-900/70 hover:border-violet-500/60 cursor-pointer transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#0c122e] border border-indigo-950 flex items-center justify-center flex-shrink-0 group-hover:border-violet-500/50 transition-colors">
                        {getGameIcon(game.id, 'w-4 h-4')}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                            {game.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950/60 text-violet-300 border border-violet-800/40">
                            {count} Tools
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {game.tagline || game.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 group-hover:text-cyan-300 flex-shrink-0 ml-3">
                      <span className="hidden sm:inline">Open Hub</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 2. MATCHED TOOLS */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1 font-mono flex items-center justify-between">
              <span>
                {query.trim() === '' ? 'Quick Access Calculators' : `Matching Tools (${matchedTools.length})`}
              </span>
              {query.trim() !== '' && (
                <span className="text-slate-400 font-sans normal-case text-[10px]">
                  Total {matchedTools.length} results
                </span>
              )}
            </div>

            {matchedTools.length === 0 && matchedGames.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs space-y-2">
                <p>No gaming tools or hubs found for "{query}".</p>
                <p className="text-slate-500 text-[11px]">
                  Try searching "Coin Master", "Seven Knights", "Monopoly", "Palworld", or "Minecraft".
                </p>
              </div>
            ) : (
              matchedTools.map((tool) => {
                const game = getGameById(tool.gameId);
                return (
                  <div
                    key={tool.id}
                    onClick={() => handleOpenTool(tool.slug)}
                    className="group flex items-center justify-between p-3 rounded-xl bg-[#080d21] hover:bg-[#121c45] border border-indigo-950 hover:border-violet-500/50 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#0c122e] border border-indigo-950 flex items-center justify-center flex-shrink-0 group-hover:border-indigo-800 transition-colors">
                        {getGameIcon(tool.gameId, 'w-4 h-4')}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                            {tool.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                            {game?.shortName || game?.name || tool.gameId}
                          </span>
                          {tool.badge && (
                            <span className="text-[10px] font-medium text-violet-400 font-mono">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {tool.shortDescription}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all flex-shrink-0 ml-3" />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[#080d21] border-t border-indigo-950 flex justify-between items-center text-[11px] text-slate-400 flex-shrink-0">
          <span>GamingToolsHub • All 23 Supported Games Searchable</span>
          <span>Press ESC to close</span>
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
