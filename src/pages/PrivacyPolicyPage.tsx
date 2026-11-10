/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

export default function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  const breadcrumbs = [{ name: 'Privacy Policy', path: '/privacy' }];

  return (
    <>
      <SEOHead
        title="Privacy Policy – GamingToolsHub"
        description="Our privacy policy explains how GamingToolsHub protects your data with 100% client-side computations."
        canonicalPath="/privacy"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-4xl mx-auto space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight pb-3 border-b border-zinc-800">
          Privacy Policy
        </h1>

        <p className="text-zinc-400">
          Last Updated: October 1, 2026
        </p>

        <section className="space-y-3 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-bold text-white">1. Client-Side Execution Guarantee</h2>
          <p>
            At GamingToolsHub.com, your privacy is our core design priority. All calculators, coordinate converters, circle generators, and randomizers run strictly inside your web browser. None of your input coordinates, player rosters, or game configurations are transmitted to or stored on external servers.
          </p>
        </section>

        <section className="space-y-3 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-bold text-white">2. Information We Do Not Collect</h2>
          <p>
            • We do NOT require user account creation or passwords.<br />
            • We do NOT collect your name, email address, or billing info.<br />
            • We do NOT track individual gameplay coordinates or personal identifiers.
          </p>
        </section>

        <section className="space-y-3 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-bold text-white">3. Local Storage</h2>
          <p>
            Some tools (like the Gaming Decision Wheel and Team Generator) may optionally use your browser's standard `localStorage` to save your custom options locally on your own device for convenience. You can clear this at any time by clearing your browser cache.
          </p>
        </section>
      </div>
    </>
  );
}
