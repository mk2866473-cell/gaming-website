/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { QaEntry, getQaEntriesByGame } from '../data/qaData';
import { TOOLS } from '../data/gamesAndTools';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import { getGameIcon } from '../components/GameIcons';
import { 
  HelpCircle, Sparkles, Calculator, ArrowRight, ArrowLeft, CheckCircle2, BookOpen
} from 'lucide-react';

interface QaDetailPageProps {
  entry: QaEntry;
  onNavigate: (path: string) => void;
}

export default function QaDetailPage({ entry, onNavigate }: QaDetailPageProps) {
  const currentPath = `/qa/${entry.gameSlug}/${entry.slug}`;

  // Find related tool data
  const relatedTool = TOOLS.find((t) => t.id === entry.relatedToolId);
  const relatedToolPath = relatedTool ? relatedTool.canonicalPath || `/tools/${relatedTool.slug}` : `/tools/robux-to-usd-calculator`;
  const relatedToolLabel = relatedTool ? relatedTool.name : `${entry.gameName} Calculator`;

  // Find other questions for the same game
  const sameGameEntries = getQaEntriesByGame(entry.gameSlug).filter((q) => q.slug !== entry.slug);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Q&A', path: '/qa' },
    { name: `${entry.gameName} Q&A`, path: `/qa/${entry.gameSlug}` },
    { name: entry.question, path: currentPath }
  ];

  // Split explanation by double newline into paragraphs
  const explanationParagraphs = entry.explanation
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <SEOHead
        title={`${entry.question} | ${entry.gameName} Q&A | GamingToolsHub`}
        description={entry.shortAnswer}
        canonicalPath={currentPath}
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-8 sm:space-y-10">
        {/* Top Banner Ad Slot */}
        <AdLayout.ToolTop />

        {/* Top Layout Grid: Main Content + Desktop Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {/* Header / Hero */}
            <div className="relative rounded-3xl bg-gradient-to-br from-violet-950/70 via-indigo-950/60 to-[#0c122e] border border-violet-500/40 p-6 sm:p-8 overflow-hidden shadow-2xl space-y-5">
              <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <button
                  type="button"
                  onClick={() => onNavigate(`/qa/${entry.gameSlug}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-violet-300 hover:text-white bg-violet-950/80 border border-violet-500/40 px-3 py-1 rounded-full transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{entry.gameName} Q&A Hub</span>
                </button>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#070b19]/90 border border-violet-500/40 p-2.5 flex items-center justify-center shadow-xl shrink-0">
                    {getGameIcon(entry.gameSlug, 'w-full h-full')}
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">
                      {entry.gameName} Question
                    </span>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                      {entry.question}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlighted Short Answer Box */}
            <div className="rounded-2xl bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-[#0c122e] border border-emerald-500/50 p-5 sm:p-7 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-extrabold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Quick Answer</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {entry.shortAnswer}
              </p>
            </div>

            {/* In-content Ad Slot */}
            <AdLayout.ToolMidContent />

            {/* Full Explanation Section */}
            <section className="bg-[#0c122e] border border-indigo-900/60 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-indigo-950/80 pb-3">
                <BookOpen className="w-5 h-5 text-violet-400" />
                <h2 className="text-xl font-bold text-white">Detailed Explanation</h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                {explanationParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Worked Example Box */}
            <section className="rounded-2xl bg-violet-950/30 border border-violet-500/40 p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-violet-300">
                <Sparkles className="w-5 h-5 text-violet-400 shrink-0" />
                <h2 className="text-lg font-bold text-white">Worked Example</h2>
              </div>

              <div className="bg-[#070b19] border border-violet-500/30 rounded-xl p-4 sm:p-5 font-mono text-sm text-slate-200 leading-relaxed">
                {entry.workedExample}
              </div>
            </section>

            {/* Try the Calculator CTA Button */}
            <section className="bg-gradient-to-r from-violet-950/80 via-indigo-950/70 to-[#0c122e] border border-violet-500/50 rounded-2xl p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div className="space-y-1 max-w-md">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Interactive Precision Tool
                </div>
                <h3 className="text-lg font-bold text-white">
                  Need custom calculations?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Calculate exact custom amounts, developer taxes, or DevEx payouts with our live calculator.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate(relatedToolPath)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all shadow-lg shadow-violet-950/50 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Try the {relatedToolLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </section>

            {/* More Game Questions Section */}
            {sameGameEntries.length > 0 && (
              <section className="space-y-4 pt-4">
                <div className="flex items-center justify-between border-b border-indigo-950/80 pb-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-violet-400" />
                    <span>More {entry.gameName} Questions</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sameGameEntries.slice(0, 4).map((q) => (
                    <button
                      key={q.slug}
                      type="button"
                      onClick={() => onNavigate(`/qa/${q.gameSlug}/${q.slug}`)}
                      className="p-4 rounded-xl bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/50 text-left transition-all group flex flex-col justify-between cursor-pointer"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                        {q.question}
                      </h4>
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-violet-400 group-hover:text-cyan-300">
                        <span>Read Answer</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Desktop Right Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <AdLayout.ToolSidebar1 />
            <AdLayout.ToolSidebar2 />
          </aside>
        </div>

        {/* Bottom Banner Ad Slot */}
        <AdLayout.ToolAboveFooter />
      </div>

      <AdLayout.ToolMobileSticky currentPath={currentPath} />
    </>
  );
}
