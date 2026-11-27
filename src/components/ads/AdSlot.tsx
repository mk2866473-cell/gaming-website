/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useLayoutEffect, useState } from 'react';
import { ADS_CONFIG, AdPlacementId, isPlacementEnabled } from '../../config/adsConfig';
import AdProviderAdapter from './AdProviderAdapter';
import { X } from 'lucide-react';

export interface AdSlotProps {
  /** Unique placement ID from ADS_CONFIG or slot name */
  placement?: AdPlacementId;
  slotId?: AdPlacementId;
  /** Current URL path to enforce policy checks (e.g. privacy/terms) */
  currentPath?: string;
  /** Optional custom CSS classes */
  className?: string;
  /** Optional custom label override */
  label?: string;
  /** Optional custom React children (e.g. direct sponsor component) */
  children?: React.ReactNode;
}

const BANNER_RESERVED_CLASS = 'w-full h-[50px] md:h-[90px] overflow-hidden';
const SIDEBAR_RESERVED_CLASS = 'w-full max-w-[300px] mx-auto h-[250px] overflow-hidden';
const MOBILE_STICKY_RESERVED_CLASS = 'w-full h-[50px] overflow-hidden';

/**
 * Placement ID -> fixed reserved size classes.
 * Applied to the outer reserved wrapper div from first paint so empty or slow
 * ad slots never collapse or shift surrounding content.
 */
export const RESERVED_SLOT_CLASSES: Record<string, string> = {
  // Banner placements (320x50 mobile / 728x90 desktop)
  'tool-top': BANNER_RESERVED_CLASS,
  'tool-after-result': BANNER_RESERVED_CLASS,
  'tool-mid-content': BANNER_RESERVED_CLASS,
  'tool-above-footer': BANNER_RESERVED_CLASS,
  'home-top': BANNER_RESERVED_CLASS,
  'home-above-footer': BANNER_RESERVED_CLASS,
  'hub-top': BANNER_RESERVED_CLASS,
  'hub-infeed': BANNER_RESERVED_CLASS,
  'hub-above-footer': BANNER_RESERVED_CLASS,
  'header-banner': BANNER_RESERVED_CLASS,
  'calculator-results': BANNER_RESERVED_CLASS,
  'in-article-banner': BANNER_RESERVED_CLASS,
  'faq-banner': BANNER_RESERVED_CLASS,
  'content-bottom': BANNER_RESERVED_CLASS,

  // Sidebar placements (300x250)
  'tool-sidebar-1': SIDEBAR_RESERVED_CLASS,
  'tool-sidebar-2': SIDEBAR_RESERVED_CLASS,
  'desktop-sidebar': SIDEBAR_RESERVED_CLASS,
  'desktop-sidebar-2': SIDEBAR_RESERVED_CLASS,

  // Sticky mobile placements (50px bar height)
  'tool-mobile-sticky': MOBILE_STICKY_RESERVED_CLASS,
  'mobile-anchor': MOBILE_STICKY_RESERVED_CLASS,
};

const STICKY_STYLE_ID = 'gth-mobile-sticky-shell-padding';
const ACTIVE_STICKY_SLOTS = new Set<symbol>();

function syncMobileStickyShellPadding() {
  if (typeof document === 'undefined') return;

  if (ACTIVE_STICKY_SLOTS.size > 0) {
    if (!document.getElementById(STICKY_STYLE_ID)) {
      const styleEl = document.createElement('style');
      styleEl.id = STICKY_STYLE_ID;
      styleEl.textContent = `
@media (max-width: 767px) {
  body.has-mobile-ad-sticky {
    padding-bottom: calc(50px + env(safe-area-inset-bottom, 0px)) !important;
  }
}`;
      document.head.appendChild(styleEl);
    }
    document.body.classList.add('has-mobile-ad-sticky');
  } else {
    document.body.classList.remove('has-mobile-ad-sticky');
  }
}

/**
 * Reusable, network-independent ad container.
 *
 * Complies with:
 * - Better Ads Standards & IAB specifications
 * - Fixed height reservation from first paint (zero CLS)
 * - Safe isolation from calculator buttons & inputs
 * - Completely disabled by default (returns null when disabled)
 */
export default function AdSlot({
  placement,
  slotId,
  currentPath,
  className = '',
  label,
  children,
}: AdSlotProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const targetPlacement = (slotId || placement) as AdPlacementId;
  const isEnabled = Boolean(targetPlacement && isPlacementEnabled(targetPlacement, currentPath));
  const isMobileSticky =
    targetPlacement === 'mobile-anchor' || targetPlacement === 'tool-mobile-sticky';
  const config = targetPlacement ? ADS_CONFIG.placements[targetPlacement] : undefined;

  // Reserve matching 50px (+ safe-area inset) bottom padding on the page shell
  // while a mobile sticky bar is mounted and not dismissed so content is never overlapped.
  useLayoutEffect(() => {
    if (!isEnabled || !config || !isMobileSticky || isDismissed) return;
    const token = Symbol(targetPlacement);
    ACTIVE_STICKY_SLOTS.add(token);
    syncMobileStickyShellPadding();

    return () => {
      ACTIVE_STICKY_SLOTS.delete(token);
      syncMobileStickyShellPadding();
    };
  }, [isEnabled, config, isMobileSticky, isDismissed, targetPlacement]);

  // If placement is disabled, return null immediately.
  if (!isEnabled || !config || isDismissed) {
    return null;
  }

  const reservedSizeClass =
    RESERVED_SLOT_CLASSES[targetPlacement] || BANNER_RESERVED_CLASS;

  // Special presentation for Mobile Sticky / Anchor Ad (only rendered when enabled)
  if (isMobileSticky) {
    return (
      <aside
        id={targetPlacement}
        data-ad-placement={targetPlacement}
        data-ad-slot={targetPlacement}
        aria-label="Mobile Advertisement"
        role="complementary"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#080d18]/95 backdrop-blur-md border-t border-slate-800 shadow-2xl h-[calc(50px+env(safe-area-inset-bottom,0px))] pb-[env(safe-area-inset-bottom,0px)] flex items-center justify-center px-2"
      >
        <div
          data-ad-wrapper={targetPlacement}
          className={`relative bg-[#090d18] flex justify-center items-center ${reservedSizeClass}`}
        >
          <span className="sr-only">{label || ADS_CONFIG.disclosureLabel}</span>
          <div className="w-[728px] h-[90px] scale-[0.44] sm:scale-[0.55] origin-center flex items-center justify-center flex-shrink-0">
            {children || <AdProviderAdapter placementId={targetPlacement} config={config} />}
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Close advertisement"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 p-1 text-slate-400 hover:text-white rounded bg-slate-800/80 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    );
  }

  // Standard in-page display ad containers
  return (
    <aside
      id={targetPlacement}
      data-ad-placement={targetPlacement}
      data-ad-slot={targetPlacement}
      aria-label="Advertisement"
      role="complementary"
      className={`w-full select-none ${className}`}
    >
      {/* Standard IAB disclosure label */}
      <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-1 text-center flex items-center justify-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>{label || ADS_CONFIG.disclosureLabel}</span>
      </div>

      {/* Primary reserved ad wrapper with fixed height to eliminate CLS */}
      <div
        data-ad-wrapper={targetPlacement}
        className={`rounded-xl bg-[#090d18] border border-slate-800/90 shadow-md flex justify-center items-center ${reservedSizeClass}`}
      >
        {children ? (
          <div className="w-full h-full flex justify-center items-center overflow-hidden">
            {children}
          </div>
        ) : (
          <AdProviderAdapter placementId={targetPlacement} config={config} />
        )}
      </div>
    </aside>
  );
}
