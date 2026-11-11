/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CodesPageData, GameCode, DailyLink } from '../data/codesData';
import SEOHead from '../components/SEOHead';
import AdLayout from '../components/ads/AdLayout';
import { 
  Copy, Check, Clock, ShieldCheck, HelpCircle, 
  ArrowRight, ExternalLink, AlertTriangle, Gift, Sparkles, ChevronDown 
} from 'lucide-react';

interface CodesDetailPageProps {
  pageData: CodesPageData;
  onNavigate: (path: string) => void;
}

export default function CodesDetailPage({ pageData, onNavigate }: CodesDetailPageProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleCopy = (code: string) => {
    try {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => {
        setCopiedCode(null);
      }, 2000);
    } catch (err) {
      // Fallback
      setCopiedCode(code);
      setTimeout(() => {
        setCopiedCode(null);
      }, 2000);
    }
  };

  // Derive page H1 and SEO Title based on kind & slug
  let pageH1 = '';
  let seoTitle = '';

  if (pageData.kind === 'links') {
    if (pageData.slug === 'monopoly-go') {
      pageH1 = 'Monopoly GO Free Dice Links Today';
    } else if (pageData.slug === 'coin-master') {
      pageH1 = 'Coin Master Free Spins Links Today';
    } else {
      pageH1 = `${pageData.gameName} Free Links Today`;
    }
    seoTitle = `${pageH1} (November 2026) | GamingToolsHub`;
  } else {
    pageH1 = `${pageData.gameName} Codes (November 2026)`;
    seoTitle = `${pageData.gameName} Codes — All Active Codes (November 2026) | GamingToolsHub`;
  }

  const currentPath = `/codes/${pageData.slug}`;
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Codes', path: '/codes' },
    { name: pageData.gameName, path: currentPath }
  ];

  // Derive FAQs based on kind
  const faqs = pageData.kind === 'links'
    ? [
        {
          q: 'Are these links safe?',
          a: 'Yes, only official reward links published directly by the game creators are listed here. Third-party sites or external generators promising thousands of free dice or spins are unauthorized scams that can compromise your account.'
        },
        {
          q: 'How often do new links appear?',
          a: 'New reward links are released by the game developers daily across their official social media channels, and this page is updated each day with every working link.'
        },
        {
          q: 'Why did my link not work?',
          a: 'Each reward link can only be claimed once per player account. If you already claimed it from another source or an in-game notification, it will show as already redeemed. In addition, daily links typically expire within 48 to 72 hours of release.'
        }
      ]
    : [
        {
          q: `Are these ${pageData.gameName} codes free?`,
          a: `Yes, all redeem codes listed for ${pageData.gameName} are 100% free official developer rewards. You never have to pay or complete external offers to claim them.`
        },
        {
          q: 'How often are new codes released?',
          a: `Game developers usually release new ${pageData.gameName} codes during major content updates, community milestones, seasonal celebrations, and game maintenance events. This page is updated as soon as a new code drops.`
        },
        {
          q: 'Why did my code not work?',
          a: `Codes are case-sensitive and must be entered exactly as shown.${pageData.note ? ` Note: ${pageData.note}` : ''} Additionally, codes may expire without prior notice or may only be claimed once per account.`
        }
      ];

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={pageData.intro}
        canonicalPath={currentPath}
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* 1. Top Banner Ad Slot */}
        <AdLayout.ToolTop />

        {/* 2. Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-br from-violet-950/70 via-indigo-950/60 to-[#0c122e] border border-violet-500/40 p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300 text-xs font-mono font-bold">
                <Gift className="w-3.5 h-3.5 text-violet-400" />
                <span>{pageData.kind === 'links' ? 'Daily Free Rewards' : 'Verified Working Codes'}</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Official Developer Codes
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {pageH1}
            </h1>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Last checked: <strong className="text-slate-200">{pageData.lastChecked}</strong></span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
              {pageData.intro}
            </p>
          </div>
        </div>

        {/* 3. Main Content Section based on `kind` */}
        {pageData.kind === 'codes' && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-950/80 pb-3">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Active {pageData.gameName} Codes</span>
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {pageData.codes.length} Available
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click the Copy button to copy exact code capitalization directly to your clipboard.
                </p>
              </div>
            </div>

            {/* Code List Rows */}
            <div className="space-y-3">
              {pageData.codes.map((item: GameCode) => {
                const isCopied = copiedCode === item.code;
                return (
                  <div
                    key={item.code}
                    className="bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/50 rounded-2xl p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <code className="font-mono font-extrabold text-sm sm:text-base text-violet-300 bg-violet-950/80 border border-violet-500/40 px-3 py-1.5 rounded-xl select-all tracking-wide">
                        {item.code}
                      </code>
                      <div className="text-xs sm:text-sm text-slate-200 font-medium">
                        {item.reward}
                        {item.expires && (
                          <span className="block sm:inline sm:ml-2 text-[11px] font-mono text-amber-400">
                            (Expires: {item.expires})
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.code)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 self-end sm:self-auto cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                          : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-950/50'
                      }`}
                      title={`Copy ${item.code}`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Unconfirmed codes box (if present) */}
            {pageData.unconfirmed && pageData.unconfirmed.length > 0 && (
              <div className="mt-8 rounded-2xl bg-amber-950/20 border border-amber-500/40 p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-300">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <h3 className="text-base font-bold text-white">
                    Unconfirmed codes — may not work
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  These codes have mixed community reports or may have recently reached their redemption limit, but are still worth trying:
                </p>
                <div className="space-y-2.5">
                  {pageData.unconfirmed.map((item: GameCode) => {
                    const isCopied = copiedCode === item.code;
                    return (
                      <div
                        key={item.code}
                        className="bg-[#090d18] border border-amber-500/30 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                      >
                        <div className="flex items-center gap-3">
                          <code className="font-mono font-bold text-sm text-amber-300 bg-amber-950/60 border border-amber-500/40 px-2.5 py-1 rounded-lg select-all">
                            {item.code}
                          </code>
                          <span className="text-xs text-slate-300">{item.reward}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.code)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 self-end sm:self-auto cursor-pointer ${
                            isCopied
                              ? 'bg-emerald-500 text-black'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {pageData.kind === 'status' && (
          <section className="space-y-6">
            <div className="rounded-2xl bg-slate-900/90 border border-indigo-900/80 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Current Code Status</h2>
                  <span className="text-xs font-mono text-slate-400">Updated {pageData.lastChecked}</span>
                </div>
              </div>
              <div className="bg-[#070b19] border border-indigo-950 p-4 rounded-xl text-xs sm:text-sm text-slate-300 leading-relaxed">
                There are no active {pageData.gameName} coupon codes right now. The last code expired on 14 September 2026. New codes are usually released every few weeks — this page is updated the day a new code drops, so check back soon.
              </div>

              {pageData.note && (
                <div className="rounded-xl bg-violet-950/30 border border-violet-500/40 p-4 space-y-1.5">
                  <div className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span>Free reward you can still claim</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pageData.note}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {pageData.kind === 'links' && (
          <section className="space-y-6">
            {pageData.linksNote && (
              <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-indigo-200 leading-relaxed">
                {pageData.linksNote}
              </div>
            )}

            <div className="space-y-3">
              {pageData.links && pageData.links.length > 0 ? (
                pageData.links.map((link: DailyLink, idx: number) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/60 rounded-2xl p-4 sm:p-5 transition-all flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs">
                        🎁
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {link.label}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 font-mono">
                          Released: {link.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                      <span>Claim</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))
              ) : (
                <div className="bg-[#0c122e] border border-indigo-900/60 rounded-2xl p-8 text-center space-y-2">
                  <div className="text-sm font-bold text-slate-200">
                    Today&apos;s links are being added — they refresh every day, so check back in a little while.
                  </div>
                  <p className="text-xs text-slate-400">
                    Links are verified directly against official game social drops to prevent spam or expired redirects.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. In-content Banner Ad Slot (after codes list) */}
        <AdLayout.ToolMidContent />

        {/* 5. How to Redeem Steps */}
        <section className="bg-[#0c122e] border border-indigo-900/60 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 border-b border-indigo-950/80 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              How to Redeem {pageData.gameName} Codes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pageData.redeemSteps.map((step: string, idx: number) => (
              <div
                key={idx}
                className="bg-[#070b19] border border-indigo-950/80 rounded-xl p-4 flex items-start gap-3.5"
              >
                <span className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-300 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* Note Box if present and not status */}
          {pageData.note && pageData.kind !== 'status' && (
            <div className="rounded-xl bg-violet-950/30 border border-violet-500/40 p-4 text-xs sm:text-sm text-violet-200 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Important Requirement:</strong>
                {pageData.note}
              </div>
            </div>
          )}
        </section>

        {/* 6. FAQ Section */}
        <section className="bg-[#0c122e] border border-indigo-900/60 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-indigo-950/80 pb-3">
            <HelpCircle className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#070b19] border border-indigo-950/80 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-violet-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-indigo-950/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. Bottom Navigation Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Related Tool Card */}
          <button
            type="button"
            onClick={() => onNavigate(pageData.relatedToolPath)}
            className="p-5 rounded-2xl bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-violet-500/50 text-left transition-all group flex flex-col justify-between shadow-sm cursor-pointer"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 block mb-1">
                Related Precision Tool
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                {pageData.relatedToolLabel}
              </h3>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-violet-400 group-hover:text-cyan-300">
              <span>Open Tool</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Game Hub Card */}
          <button
            type="button"
            onClick={() => onNavigate(pageData.gameHubPath)}
            className="p-5 rounded-2xl bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-cyan-500/50 text-left transition-all group flex flex-col justify-between shadow-sm cursor-pointer"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-1">
                Game Suite
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                Visit {pageData.gameName} Hub
              </h3>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
              <span>View All Tools</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Back to Codes Directory Card */}
          <button
            type="button"
            onClick={() => onNavigate('/codes')}
            className="p-5 rounded-2xl bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 hover:border-purple-500/50 text-left transition-all group flex flex-col justify-between shadow-sm cursor-pointer"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 block mb-1">
                All Games
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                All Game Codes Directory
              </h3>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-purple-400 group-hover:text-cyan-300">
              <span>Browse Codes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </section>

        {/* 8. Above Footer Banner Ad Slot */}
        <AdLayout.ToolAboveFooter />
      </div>
    </>
  );
}
