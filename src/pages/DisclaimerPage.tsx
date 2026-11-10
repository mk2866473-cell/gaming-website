/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface DisclaimerPageProps {
  onNavigate: (path: string) => void;
}

export default function DisclaimerPage({ onNavigate }: DisclaimerPageProps) {
  const breadcrumbs = [{ name: 'Disclaimer', path: '/disclaimer' }];

  return (
    <>
      <SEOHead
        title="Disclaimer & Trademark Notice – GamingToolsHub"
        description="Official trademark and independent affiliation disclaimer for GamingToolsHub.com."
        canonicalPath="/disclaimer"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-4xl mx-auto space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight pb-3 border-b border-zinc-800">
          Disclaimer & Trademark Notice
        </h1>

        <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-5 flex items-start gap-3 text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-white mb-1">
              Independent Fan-Made Utilities Notice
            </p>
            <p className="text-zinc-300 text-xs">
              GamingToolsHub.com is an independent community website and is NOT affiliated with, sponsored by, or endorsed by any game publisher or company.
            </p>
          </div>
        </div>

        <section className="space-y-3 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-bold text-white">1. Minecraft Trademark Notice</h2>
          <p>
            Minecraft is a registered trademark of Mojang Synergies AB and Microsoft Corporation. GamingToolsHub.com is NOT an official Minecraft service or product and is NOT approved by or associated with Mojang or Microsoft. All Minecraft in-game mechanics and terminology referenced on this website are used strictly for fan informational and utility purposes under fair use.
          </p>
        </section>

        <section className="space-y-3 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-bold text-white">2. Other Games & Publishers</h2>
          <p>
            • <strong>Valorant & League of Legends:</strong> Registered trademarks of Riot Games, Inc.<br />
            • <strong>Counter-Strike 2 & Steam:</strong> Registered trademarks of Valve Corporation.<br />
            • <strong>Apex Legends:</strong> Registered trademark of Electronic Arts / Respawn Entertainment.<br />
            • <strong>Fortnite:</strong> Registered trademark of Epic Games, Inc.<br />
            • <strong>Overwatch:</strong> Registered trademark of Blizzard Entertainment, Inc.
          </p>
          <p className="text-zinc-400 text-xs pt-2">
            All other trademarks, game titles, and registered product names belong exclusively to their respective copyright and trademark owners.
          </p>
        </section>

        <section className="space-y-3 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-bold text-white">3. Non-Commercial Reference</h2>
          <p>
            GamingToolsHub is created by enthusiasts to provide helpful math calculators, rasterizers, and coordinate tools for players. We do not distribute copyrighted game files, textures, binaries, or proprietary game code.
          </p>
        </section>
      </div>
    </>
  );
}
