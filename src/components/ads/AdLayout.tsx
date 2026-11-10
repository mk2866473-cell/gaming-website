/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import AdSlot from './AdSlot';
import { isPlacementEnabled } from '../../config/adsConfig';

interface AdLayoutProps {
  currentPath?: string;
  className?: string;
}

/**
 * AdLayout
 * 
 * Reusable layout containers that encapsulate safe spacing, margins, and borders
 * for each designated placement across the site.
 * 
 * Each helper checks whether the placement is enabled before rendering any wrapping markup,
 * ensuring zero leftover margins or empty DOM nodes when ads are disabled.
 */
export const AdLayout = {
  /**
   * HOME PAGE SLOTS
   */
  HomeTop: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('home-top')) return null;
    return (
      <div className={`max-w-5xl mx-auto px-4 my-6 ${className}`}>
        <AdSlot placement="home-top" />
      </div>
    );
  },

  HomeAboveFooter: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('home-above-footer')) return null;
    return (
      <div className={`max-w-5xl mx-auto px-4 my-8 ${className}`}>
        <AdSlot placement="home-above-footer" />
      </div>
    );
  },

  /**
   * GAME HUB PAGE SLOTS
   */
  HubTop: ({ currentPath, className = '' }: AdLayoutProps) => {
    if (!isPlacementEnabled('hub-top', currentPath)) return null;
    return (
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 ${className}`}>
        <AdSlot placement="hub-top" currentPath={currentPath} />
      </div>
    );
  },

  HubInFeed: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('hub-infeed')) return null;
    return (
      <div className={`col-span-full py-4 my-2 flex justify-center ${className}`}>
        <AdSlot placement="hub-infeed" />
      </div>
    );
  },

  HubAboveFooter: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('hub-above-footer')) return null;
    return (
      <div className={`my-8 w-full max-w-4xl mx-auto ${className}`}>
        <AdSlot placement="hub-above-footer" />
      </div>
    );
  },

  /**
   * TOOL DETAIL PAGE SLOTS
   */
  ToolTop: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('tool-top')) return null;
    return (
      <div className={`w-full max-w-5xl mx-auto mb-6 ${className}`}>
        <AdSlot placement="tool-top" />
      </div>
    );
  },

  ToolAfterResult: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('tool-after-result')) return null;
    return (
      <div className={`mt-8 pt-6 border-t border-slate-800/80 ${className}`}>
        <AdSlot placement="tool-after-result" />
      </div>
    );
  },

  ToolMidContent: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('tool-mid-content')) return null;
    return (
      <div className={`my-6 pt-4 border-t border-slate-800/80 ${className}`}>
        <AdSlot placement="tool-mid-content" />
      </div>
    );
  },

  ToolAboveFooter: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('tool-above-footer')) return null;
    return (
      <div className={`my-8 w-full max-w-4xl mx-auto ${className}`}>
        <AdSlot placement="tool-above-footer" />
      </div>
    );
  },

  ToolSidebar1: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('tool-sidebar-1')) return null;
    return (
      <div className={`w-full flex justify-center ${className}`}>
        <AdSlot placement="tool-sidebar-1" />
      </div>
    );
  },

  ToolSidebar2: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('tool-sidebar-2')) return null;
    return (
      <div className={`w-full flex justify-center ${className}`}>
        <AdSlot placement="tool-sidebar-2" />
      </div>
    );
  },

  ToolMobileSticky: ({ currentPath }: { currentPath?: string }) => {
    if (!isPlacementEnabled('tool-mobile-sticky', currentPath)) return null;
    return <AdSlot placement="tool-mobile-sticky" currentPath={currentPath} />;
  },

  /**
   * Legacy and generic layout helpers
   */
  Header: ({ currentPath, className = '' }: AdLayoutProps) => {
    if (!isPlacementEnabled('header-banner', currentPath)) return null;

    return (
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 ${className}`}>
        <AdSlot placement="header-banner" currentPath={currentPath} />
      </div>
    );
  },

  Results: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('calculator-results')) return null;

    return (
      <div className={`mt-8 pt-6 border-t border-slate-800/80 ${className}`}>
        <AdSlot placement="calculator-results" />
      </div>
    );
  },

  Sidebar: ({ className = '' }: { className?: string }) => {
    const unit1Enabled = isPlacementEnabled('desktop-sidebar');
    const unit2Enabled = isPlacementEnabled('desktop-sidebar-2');
    if (!unit1Enabled && !unit2Enabled) return null;

    return (
      <div className={`space-y-2 ${className}`}>
        {unit1Enabled && <AdSlot placement="desktop-sidebar" />}
        {unit2Enabled && <AdSlot placement="desktop-sidebar-2" />}
      </div>
    );
  },

  MidArticle: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('in-article-banner')) return null;

    return (
      <div className={`my-6 pt-4 border-t border-slate-800/80 ${className}`}>
        <AdSlot placement="in-article-banner" />
      </div>
    );
  },

  PreFaq: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('faq-banner')) return null;

    return (
      <div className={`my-6 pt-4 border-t border-slate-800/80 ${className}`}>
        <AdSlot placement="faq-banner" />
      </div>
    );
  },

  Content: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('content-bottom')) return null;

    return (
      <div className={`my-8 w-full max-w-4xl mx-auto ${className}`}>
        <AdSlot placement="content-bottom" />
      </div>
    );
  },

  MobileAnchor: ({ currentPath }: { currentPath?: string }) => {
    if (!isPlacementEnabled('mobile-anchor', currentPath)) return null;

    return <AdSlot placement="mobile-anchor" currentPath={currentPath} />;
  },
};

export default AdLayout;
