/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { CODES_PAGES, CodesPageData } from '../data/codesData';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import { getGameIcon } from '../components/GameIcons';
import { Gift, ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';

interface CodesIndexPageProps {
  onNavigate: (path: string) => void;
}

export default function CodesIndexPage({ onNavigate }: CodesIndexPageProps) {
  // Sort: 'codes' first (most codes first), then 'links', then 'status'
  const sortedPages = useMemo(() => {
    return [...CODES_PAGES].sort((a, b) => {
      const order = { codes: 1, links: 2, status: 3 };
      if (order[a.kind] !== order[b.kind]) {
        return order[a.kind] - order[b.kind];
      }
      if (a.kind === 'codes' && b.kind === 'codes') {
        return b.codes.length - a.codes.length;
      }
      return a.gameName.localeCompare(b.gameName);
    });
  }, []);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Codes', path: '/codes' }
  ];

  return (
    <>
      <SEOHead
        title="Game Codes — Free Redeem Codes & Daily Links | GamingToolsHub"
        description="Browse verified, active redeem codes and free daily reward links for popular games including Blox Fruits, Type Soul, and more. Checked and updated daily."
        canonicalPath="/codes"
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Top Banner Ad */}
        <AdLayout.ToolTop />

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-violet-950/70 via-indigo-950/60 to-[#0c122e] border border-violet-500/40 p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Verified Developer Rewards • Updated Daily</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Game Codes — Free Redeem Codes & Daily Links
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Claim working developer coupon codes, free 2x EXP boosts, stat resets, spins, dice, and exclusive bundles. All codes are manually tested and verified daily with zero paywalls.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-[#070b19] px-2.5 py-1 rounded-lg border border-indigo-900/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Free Developer Codes
              </span>
              <span className="flex items-center gap-1.5 bg-[#070b19] px-2.5 py-1 rounded-lg border border-indigo-900/60">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Checked Daily
              </span>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-indigo-950/80 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Gift className="w-5 h-5 text-violet-400" />
              <span>Available Game Codes & Links</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              {sortedPages.length} Games Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sortedPages.map((page: CodesPageData) => {
              const activeCount = page.codes.length;
              let badgeColor = 'bg-violet-500/20 text-violet-300 border-violet-500/40';
              let badgeText = `${activeCount} Active Codes`;

              if (page.kind === 'links') {
                badgeColor = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
                badgeText = 'Free Daily Links';
              } else if (page.kind === 'status') {
                badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                badgeText = 'Codes Status';
              }

              return (
                <div
                  key={page.slug}
                  onClick={() => onNavigate(`/codes/${page.slug}`)}
                  className="group bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/60 rounded-2xl p-6 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-violet-950/30"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-lg border ${badgeColor}`}>
                        {badgeText}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {page.lastChecked}
                      </span>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-[#070b19] border border-indigo-950 flex items-center justify-center p-2.5 shrink-0 group-hover:border-violet-500/50 shadow-md">
                        {getGameIcon(page.slug, 'w-full h-full')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors truncate">
                          {page.gameName}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mt-1">
                          {page.intro}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-indigo-950/80 flex items-center justify-between text-xs font-semibold text-violet-400 group-hover:text-cyan-300 transition-colors">
                    <span>View {page.gameName} Codes</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mid-content Ad Slot */}
        <AdLayout.ToolMidContent />

        {/* Informative How Codes Work Section */}
        <section className="bg-[#0c122e] border border-indigo-900/60 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">How Game Redeem Codes & Daily Links Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#070b19] border border-indigo-950/80 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs font-mono">
                1
              </div>
              <h3 className="text-sm font-bold text-white">Official Releases</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Developers release promo codes on Twitter, Discord, and YouTube during game updates and player milestones.
              </p>
            </div>

            <div className="bg-[#070b19] border border-indigo-950/80 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 font-bold flex items-center justify-center text-xs font-mono">
                2
              </div>
              <h3 className="text-sm font-bold text-white">One-Click Copy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tap the Copy button next to any code to copy it with exact capitalization, ensuring no redemption errors.
              </p>
            </div>

            <div className="bg-[#070b19] border border-indigo-950/80 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs font-mono">
                3
              </div>
              <h3 className="text-sm font-bold text-white">Instant In-Game Claim</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Open your game, navigate to the redeem box, paste the code, and instantly receive your rewards.
              </p>
            </div>
          </div>
        </section>

        {/* Above Footer Banner Ad Slot */}
        <AdLayout.ToolAboveFooter />
      </div>
    </>
  );
}
