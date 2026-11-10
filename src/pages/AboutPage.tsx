/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Zap, Shield, Globe, Award, Code2, Users, Sliders } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const breadcrumbs = [{ name: 'About', path: '/about' }];

  return (
    <>
      <SEOHead
        title="About GamingToolsHub – Fast & Privacy-Focused Gaming Utilities"
        description="Learn about GamingToolsHub.com, our mission to build zero-lag client-side gaming calculators, and our roadmap for future tools."
        canonicalPath="/about"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight pb-3 border-b border-zinc-800">
            About GamingToolsHub
          </h1>
          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            The modern, high-performance browser-based gaming toolkit created by gamers, for gamers.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Our Core Mission</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Eliminating Lag, Bloat, and Friction from Gaming Utilities
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Most gaming calculator websites on the internet are plagued by intrusive popups, slow page loads, forced account signups, and clunky mobile layouts. <strong>GamingToolsHub.com</strong> was engineered from scratch to change that.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Every tool on this platform runs 100% in your browser using modern Web APIs. Whether you are generating a 128-block circle blueprint in Minecraft, calculating Nether portal coordinates for your server highway, or balancing teams for a 5v5 scrim, your calculations execute in milliseconds without uploading your data anywhere.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-2">
            <Zap className="w-6 h-6 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Zero Server Latency</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No backend waiting times. Sliders and inputs calculate instantly on the client thread.
            </p>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Total Privacy</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No accounts, no email newsletters, no cookies tracking your gameplay history.
            </p>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-2">
            <Globe className="w-6 h-6 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Desktop & Mobile Interface</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Fully responsive and optimized for gaming PCs, dual monitors, tablets, and mobile smartphones with zero distortion.
            </p>
          </div>
        </div>

        {/* Scalability Roadmap */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">
            Architecture Ready for 50–100+ Tools
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            GamingToolsHub is built on a modular data-driven schema (`game-data.json`). We are constantly adding new calculators for RPGs, Battle Royales, sandbox games, and esports tournaments.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['Apex Sensitivity Converter', 'Rust Raid Cost Calculator', 'Valorant Crosshair Generator', 'Terraria Wing Flight Tracker', 'Path of Exile DPS Calc'].map((item) => (
              <span key={item} className="text-xs px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
