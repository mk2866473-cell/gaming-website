/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import BrandLogo from './BrandLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#050814] border-t border-indigo-950/80 pt-14 pb-12 mt-24 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-indigo-950/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3.5 pr-6">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="sm" />
              <span className="text-base font-extrabold text-white">
                GamingTools<span className="text-violet-400 font-mono">Hub</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Precision calculators, voxel generators, breeding simulators, and battle math for Minecraft, Palworld, Genshin Impact, FPS, Roblox, Fortnite, and Pokémon GO. Engineered for instant browser-based execution with zero tracking.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              100% Client-Side Math · Verified Mechanics 2026
            </div>
          </div>

          {/* Game Hubs Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5 font-mono">
              Game Hubs
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/minecraft')} className="hover:text-cyan-300 transition-colors text-left">
                  Minecraft Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/roblox')} className="hover:text-cyan-300 transition-colors text-left">
                  Roblox Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/fortnite')} className="hover:text-cyan-300 transition-colors text-left">
                  Fortnite Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/pokemongo')} className="hover:text-cyan-300 transition-colors text-left">
                  Pokémon GO Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/games/palworld')} className="hover:text-cyan-300 transition-colors text-left">
                  Palworld Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/coin-master')} className="hover:text-cyan-300 transition-colors text-left">
                  Coin Master Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/seven-knights-rebirth')} className="hover:text-cyan-300 transition-colors text-left">
                  Seven Knights Re:BIRTH
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/monopoly-go')} className="hover:text-cyan-300 transition-colors text-left">
                  Monopoly GO! Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/games')} className="hover:text-violet-400 transition-colors text-left text-slate-500 hover:text-slate-300">
                  All 23 Game Hubs →
                </button>
              </li>
            </ul>
          </div>

          {/* Categories & Directory */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5 font-mono">
              Browse Directory
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/tools')} className="hover:text-violet-400 transition-colors text-left font-semibold text-slate-200">
                  Complete Tools Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools?category=calculators')} className="hover:text-cyan-300 transition-colors text-left">
                  Math & XP Calculators
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools?category=generators')} className="hover:text-cyan-300 transition-colors text-left">
                  Voxel & Crosshair Generators
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools?category=converters')} className="hover:text-cyan-300 transition-colors text-left">
                  Sensitivity & Unit Converters
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/categories')} className="hover:text-cyan-300 transition-colors text-left">
                  All Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/games')} className="hover:text-cyan-300 transition-colors text-left">
                  All Supported Games
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5 font-mono">
              Information & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-violet-400 transition-colors">
                  About the Project
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy')} className="hover:text-violet-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms')} className="hover:text-violet-400 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/disclaimer')} className="hover:text-violet-400 transition-colors">
                  Disclaimer & Trademarks
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Clear Independent Publisher Disclaimer */}
        <div className="pt-6 space-y-4 text-[11px] leading-relaxed text-slate-500">
          <div className="p-4 rounded-xl bg-[#080d21] border border-indigo-950/80">
            <p className="font-semibold text-slate-300 mb-1">
              Independent Community Resource
            </p>
            <p>
              GamingToolsHub.com is an independent community gaming reference toolkit. Minecraft is a trademark of Mojang AB / Microsoft. Palworld is a trademark of Pocketpair Inc. Roblox is a trademark of Roblox Corporation. Fortnite is a trademark of Epic Games, Inc. Pokémon GO is a trademark of Niantic, Inc. and The Pokémon Company. Genshin Impact is a trademark of Cognosphere / HoYoverse. All game assets, mechanics names, and trademarks belong to their respective copyright holders.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-slate-500">
            <span>© {new Date().getFullYear()} GamingTools Hub. All rights reserved.</span>
            <span>Accurate game mathematics for builders and competitive gamers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
