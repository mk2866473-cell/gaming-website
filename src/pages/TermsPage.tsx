/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export default function TermsPage({ onNavigate }: TermsPageProps) {
  const breadcrumbs = [{ name: 'Terms of Service', path: '/terms' }];

  return (
    <>
      <SEOHead
        title="Terms of Service – GamingToolsHub"
        description="Terms of service and usage guidelines for GamingToolsHub.com free gaming utilities."
        canonicalPath="/terms"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-4xl mx-auto space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight pb-3 border-b border-zinc-800">
          Terms of Service
        </h1>

        <p className="text-zinc-400">
          Last Updated: October 1, 2026
        </p>

        <section className="space-y-3 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using GamingToolsHub.com, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use the website.
          </p>
        </section>

        <section className="space-y-3 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-bold text-white">2. Free & Fair Use</h2>
          <p>
            All tools and calculators are provided for personal, community, and educational use free of charge. You may freely use the generated blueprints, circle coordinate outputs, and team rosters in your games, livestreams, and community esports tournaments.
          </p>
        </section>

        <section className="space-y-3 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-bold text-white">3. Disclaimer of Warranty</h2>
          <p>
            Tools and algorithms are provided "AS IS" without warranties of any kind. While we rigorously test all mathematical calculations against current game patches, game developers may modify formulas in future game updates.
          </p>
        </section>
      </div>
    </>
  );
}
