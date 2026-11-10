/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Gamepad2, Terminal } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function BrandLogo({ className = '', size = 'md' }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div
      className={`relative flex items-center justify-center bg-[#0c122e] border border-indigo-900/60 shadow-sm transition-all duration-200 group-hover:border-violet-500/70 group-hover:bg-[#121c45] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] ${sizeClasses[size]} ${className}`}
    >
      {/* Corner precision dot */}
      <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
      <Gamepad2 className={`${iconSizes[size]} text-violet-400 group-hover:text-cyan-300 transition-colors`} />
    </div>
  );
}
