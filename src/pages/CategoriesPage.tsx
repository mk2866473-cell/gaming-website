/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers, ArrowRight, Calculator, Shapes, ArrowLeftRight, Dices, Users, Clock } from 'lucide-react';
import { CATEGORIES, TOOLS } from '../data/gamesAndTools';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import ToolCard from '../components/ToolCard';

interface CategoriesPageProps {
  selectedCategoryId?: string | null;
  onNavigate: (path: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  calculators: <Calculator className="w-5 h-5 text-violet-400" />,
  generators: <Shapes className="w-5 h-5 text-cyan-400" />,
  converters: <ArrowLeftRight className="w-5 h-5 text-violet-400" />,
  planners: <Layers className="w-5 h-5 text-cyan-400" />,
  trackers: <Clock className="w-5 h-5 text-purple-400" />,
  'gaming-utilities': <Dices className="w-5 h-5 text-cyan-400" />,
  randomizers: <Dices className="w-5 h-5 text-violet-400" />
};

export default function CategoriesPage({ selectedCategoryId, onNavigate }: CategoriesPageProps) {
  const activeCat = CATEGORIES.find(c => c.id === selectedCategoryId || c.slug === selectedCategoryId);
  const breadcrumbs = [
    { name: 'Categories', path: '/categories' },
    ...(activeCat ? [{ name: activeCat.name, path: `/categories?cat=${activeCat.id}` }] : [])
  ];

  return (
    <>
      <SEOHead
        title={activeCat ? `${activeCat.name} – Gaming Tools & Utilities` : 'Gaming Tool Categories'}
        description={activeCat ? activeCat.description : 'Explore tools by category: Calculators, Generators, Converters, Decision Wheels, and Trackers.'}
        canonicalPath={activeCat ? `/categories?cat=${activeCat.id}` : '/categories'}
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-8">
        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-950/80">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {activeCat ? `${activeCat.name}` : 'Browse Tools by Category'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {activeCat ? activeCat.description : 'Find gaming tools structured by functional type.'}
              </p>
            </div>
            {activeCat && (
              <button
                onClick={() => onNavigate('/categories')}
                className="text-xs font-semibold text-violet-400 hover:text-cyan-300 self-start sm:self-auto transition-colors"
              >
                ← View All Categories
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {CATEGORIES.filter(c => c.id !== 'randomizers').map((cat) => {
            const isSelected = activeCat?.id === cat.id;
            const count = TOOLS.filter(t => t.categoryId === cat.id).length;
            const icon = CATEGORY_ICONS[cat.id];
            return (
              <button
                key={cat.id}
                onClick={() => onNavigate(`/categories?cat=${cat.id}`)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-violet-600 border-violet-500 text-white font-semibold shadow-md shadow-violet-950/50'
                    : 'bg-[#0c122e] border-indigo-900/60 text-slate-300 hover:border-violet-500/50 hover:text-white hover:bg-[#121c45]'
                }`}
              >
                {icon && <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">{icon}</span>}
                <span>{cat.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#070b19] border border-indigo-950 text-slate-400">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Tools */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.filter(t => !activeCat || t.categoryId === activeCat.id).map((tool) => (
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
