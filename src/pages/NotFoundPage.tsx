/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Gamepad2, Search, Compass } from 'lucide-react';
import { TOOLS } from '../data/gamesAndTools';
import SEOHead from '../components/SEOHead';
import ToolCard from '../components/ToolCard';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export default function NotFoundPage({ onNavigate, onOpenSearch }: NotFoundPageProps) {
  return (
    <>
      <SEOHead
        title="404 Page Not Found – GamingToolsHub"
        description="The requested page could not be found on GamingToolsHub. Browse our popular calculators and utilities."
      />

      <div className="text-center py-12 max-w-2xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#0c122e] border border-indigo-900/60 text-violet-400 flex items-center justify-center mx-auto text-2xl font-mono font-extrabold shadow-xl">
          404
        </div>

        <h1 className="text-3xl font-extrabold text-white">
          Level Not Found!
        </h1>

        <p className="text-sm text-zinc-400 leading-relaxed">
          The coordinate or URL you are looking for does not exist or may have moved. Use search or explore our popular calculators below.
        </p>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('/')}
            className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs rounded-xl shadow-lg glow-violet transition-all"
          >
            Back to Home
          </button>
          <button
            onClick={onOpenSearch}
            className="px-5 py-2.5 bg-[#0c122e] hover:bg-[#121c45] border border-indigo-900/60 text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-2 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            Search All Tools
          </button>
        </div>

        <div className="pt-12 text-left">
          <h2 className="text-base font-bold text-white mb-4">
            Popular Gaming Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOOLS.slice(0, 4).map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
