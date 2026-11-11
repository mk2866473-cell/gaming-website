/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { getCodesPagesForHub } from '../data/codesData';
import { Gift, ArrowRight } from 'lucide-react';
import { getGameIcon } from './GameIcons';

interface HubCodesBannerProps {
  hubPath: string;
  onNavigate: (path: string) => void;
  className?: string;
}

export default function HubCodesBanner({ hubPath, onNavigate, className = '' }: HubCodesBannerProps) {
  const matchingEntries = getCodesPagesForHub(hubPath);

  if (matchingEntries.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {matchingEntries.map(entry => {
        let label = '';
        if (entry.kind === 'codes') {
          label = `${entry.gameName} Codes — ${entry.codes.length} active codes`;
        } else if (entry.kind === 'links') {
          label = `${entry.gameName} Codes — Free daily links`;
        } else {
          label = `${entry.gameName} Codes — Codes status`;
        }

        return (
          <button
            key={entry.slug}
            type="button"
            onClick={() => onNavigate(`/codes/${entry.slug}`)}
            className="w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-950/80 via-indigo-950/60 to-[#0c122e] border border-violet-500/40 hover:border-violet-400 text-left transition-all group shadow-lg hover:shadow-violet-950/40 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center p-2 text-violet-300 group-hover:scale-105 transition-transform flex-shrink-0">
                {getGameIcon(entry.slug, 'w-6 h-6')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                    🎁 CODES
                  </span>
                  <div className="text-sm sm:text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                    {label}
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Checked {entry.lastChecked} • Tap to view active redeem codes & rewards
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 group-hover:text-cyan-300 whitespace-nowrap">
              <span className="hidden sm:inline">View Codes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
