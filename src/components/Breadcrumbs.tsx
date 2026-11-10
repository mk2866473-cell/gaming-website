/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export default function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-zinc-400">
        <li>
          <a
            href="/"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                onNavigate('/');
              }
            }}
            className="flex items-center gap-1 hover:text-cyan-300 transition-colors py-1"
          >
            <Home className="w-3.5 h-3.5 text-zinc-500" />
            <span>Home</span>
          </a>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={item.path + idx}>
              <li className="text-zinc-600">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                {isLast ? (
                  <span className="text-zinc-200 font-medium truncate max-w-[200px] sm:max-w-none inline-block" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <a
                    href={item.path}
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                        e.preventDefault();
                        onNavigate(item.path);
                      }
                    }}
                    className="hover:text-cyan-300 transition-colors py-1 truncate max-w-[150px] sm:max-w-none inline-block"
                  >
                    {item.name}
                  </a>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
