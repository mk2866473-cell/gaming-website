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
    <footer className="bg-[var(--bg)] border-t border-[var(--border)] pt-14 pb-12 mt-24 text-[var(--muted)] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[var(--border)]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3.5 pr-6">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="sm" />
              <span className="text-base font-extrabold text-[var(--text)] [font-family:var(--font-display)]">
                GamingTools<span className="text-[var(--primary-light)]">Hub</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-soft)] leading-relaxed">
              Precision calculators, voxel generators, breeding simulators, and battle math for Minecraft, Palworld, Genshin Impact, FPS, Roblox, Fortnite, and Pokémon GO. Engineered for instant browser-based execution with zero tracking.
            </p>
            <div className="flex items-center gap-3 pt-0.5">
              <a
                href="https://www.pinterest.com/mehrankhan1213"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GamingToolsHub on Pinterest"
                className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors inline-flex items-center justify-center p-1"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.176-4.068-2.845 0-4.516 2.135-4.516 4.34 0 .859.331 1.781.745 2.281a.3.3 0 0 1 .069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/mehrankhan121314"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GamingToolsHub on Instagram"
                className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors inline-flex items-center justify-center p-1"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
            <div className="text-[11px] text-[var(--muted)] font-mono">
              100% Client-Side Math · Verified Mechanics 2026
            </div>
          </div>

          {/* Game Hubs Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-3.5 [font-family:var(--font-display)]">
              Game Hubs
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('/minecraft')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Minecraft Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/roblox')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Roblox Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/fortnite')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Fortnite Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/pokemongo')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Pokémon GO Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/games/palworld')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Palworld Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/coin-master')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Coin Master Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/seven-knights-rebirth')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Seven Knights Re:BIRTH
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/monopoly-go')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Monopoly GO! Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/games')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  All 23 Game Hubs →
                </button>
              </li>
            </ul>
          </div>

          {/* Categories & Directory */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-3.5 [font-family:var(--font-display)]">
              Browse Directory
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('/tools')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left font-semibold">
                  Complete Tools Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools?category=calculators')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Math & XP Calculators
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools?category=generators')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Voxel & Crosshair Generators
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools?category=converters')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Sensitivity & Unit Converters
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/categories')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  All Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/games')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  All Supported Games
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-3.5 [font-family:var(--font-display)]">
              Information & Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('/about')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  About the Project
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/disclaimer')} className="text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors text-left">
                  Disclaimer & Trademarks
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Clear Independent Publisher Disclaimer */}
        <div className="pt-6 space-y-4 text-[11px] leading-relaxed text-[var(--muted)]">
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <p className="font-semibold text-[var(--text-soft)] mb-1">
              Independent Community Resource
            </p>
            <p>
              GamingToolsHub.com is an independent community gaming reference toolkit. Minecraft is a trademark of Mojang AB / Microsoft. Palworld is a trademark of Pocketpair Inc. Roblox is a trademark of Roblox Corporation. Fortnite is a trademark of Epic Games, Inc. Pokémon GO is a trademark of Niantic, Inc. and The Pokémon Company. Genshin Impact is a trademark of Cognosphere / HoYoverse. All game assets, mechanics names, and trademarks belong to their respective copyright holders.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[var(--muted)]">
            <span>© {new Date().getFullYear()} GamingTools Hub. All rights reserved.</span>
            <span>Accurate game mathematics for builders and competitive gamers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
