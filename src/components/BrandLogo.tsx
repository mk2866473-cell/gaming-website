/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

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

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-[#0c122e] border border-indigo-900/60 shadow-sm transition-all duration-200 group-hover:border-violet-500/70 group-hover:bg-[#121c45] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] ${sizeClasses[size]} ${className}`}
    >
      <img
        src="/logo.svg"
        alt="GamingToolsHub"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
