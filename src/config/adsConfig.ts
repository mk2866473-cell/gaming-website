/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * GAMINGTOOLS HUB — CENTRAL ADVERTISING CONFIGURATION
 * ============================================================================
 * 
 * This file is the single source of truth for all advertising on GamingTools Hub.
 * It is completely ad-network-independent and decoupled from calculator logic.
 * 
 * SAFETY RULES IMPLEMENTED:
 * 1. ALL AD PLACEMENTS ARE DISABLED BY DEFAULT (enabled: false).
 * 2. When disabled, ad components return null, reserving zero space and executing zero scripts.
 * 3. No third-party network scripts are loaded until explicitly configured.
 * 4. Never displays fake ads, fake images, or misleading dummy text.
 * 5. Designed for seamless switching between Monetag, Ezoic, Mediavine, or custom providers.
 */

export type AdPlacementId =
  | 'header-banner'
  | 'calculator-results'
  | 'in-article-banner'
  | 'faq-banner'
  | 'desktop-sidebar'
  | 'desktop-sidebar-2'
  | 'content-bottom'
  | 'mobile-anchor'
  | 'home-top'
  | 'home-above-footer'
  | 'hub-top'
  | 'hub-infeed'
  | 'hub-above-footer'
  | 'tool-top'
  | 'tool-after-result'
  | 'tool-mid-content'
  | 'tool-above-footer'
  | 'tool-sidebar-1'
  | 'tool-sidebar-2'
  | 'tool-mobile-sticky'
  | (string & {});

export type AdProvider = 'none' | 'monetag' | 'ezoic' | 'mediavine' | 'adsterra' | 'custom';

export interface AdPlacementConfig {
  /** Master toggle for this individual placement */
  enabled: boolean;
  /** Unique placement identifier */
  id: AdPlacementId;
  /** Human-readable name */
  name: string;
  /** Standard IAB / Provider target dimensions */
  dimensions: string;
  /** Mobile fallback dimensions */
  mobileDimensions: string;
  /** Purpose and placement notes */
  description: string;
  /** Minimum height reserved when enabled to prevent Cumulative Layout Shift (CLS) */
  minHeight: string;
  /** Custom HTML/script code or zone ID for this specific placement */
  customHtml?: string;
  /** Monetag specific Zone ID or Tag ID if using Monetag */
  monetagZoneId?: string;
  /** Ezoic placeholder ID if using Ezoic (e.g., 101, 102) */
  ezoicPlaceholderId?: number;
}

export interface MonetagProviderConfig {
  /** Your Monetag script tag URL (e.g., //alwingulla.com/88/tag.min.js or provided JS) */
  scriptUrl?: string;
  /** Monetag publisher ID or site token */
  siteId?: string;
  /** Optional custom in-page ad tag snippet */
  inPageSnippet?: string;
}

export interface EzoicProviderConfig {
  /** Ezoic property ID or integration script tag */
  publisherId?: string;
}

export interface MediavineProviderConfig {
  /** Mediavine site script / ID */
  siteId?: string;
}

export interface SiteAdsConfig {
  /**
   * GLOBAL MASTER SWITCH
   * When FALSE, NO ads render anywhere on the site, and NO ad scripts load.
   * DEFAULT: false (All placements disabled by default).
   */
  enabled: boolean;

  /**
   * Active ad provider
   * Options: 'none' | 'monetag' | 'ezoic' | 'mediavine' | 'custom'
   * DEFAULT: 'none'
   */
  provider: AdProvider;

  /**
   * Standard compliance label rendered above display units (IAB / Better Ads Standard)
   */
  disclosureLabel: string;

  /**
   * Routes where ads must NEVER be shown (e.g. legal and policy pages)
   */
  disallowedRoutes: string[];

  /**
   * Individual Placement Configurations
   * ALL DISABLED BY DEFAULT.
   */
  placements: Record<AdPlacementId, AdPlacementConfig>;

  /**
   * Provider specific configuration blocks
   */
  monetag: MonetagProviderConfig;
  ezoic: EzoicProviderConfig;
  mediavine: MediavineProviderConfig;
}

export const ADS_CONFIG: SiteAdsConfig = {
  // 1. MASTER TOGGLE - Live Adsterra ads enabled across the website
  enabled: true,

  // 2. ACTIVE PROVIDER ('adsterra')
  provider: 'adsterra',

  // 3. IAB DISCLOSURE LABEL
  disclosureLabel: 'ADVERTISEMENT',

  // 4. DISALLOWED ROUTES (Privacy, terms, and disclaimer are ad-free for policy compliance)
  disallowedRoutes: ['/privacy', '/terms', '/disclaimer'],

  // 5. INDIVIDUAL IN-PAGE PLACEMENT DEFINITIONS - Configured with Adsterra 728x90 and 300x250 codes
  placements: {
    'header-banner': {
      enabled: true,
      id: 'header-banner',
      name: 'Header Banner',
      dimensions: '728 × 90',
      mobileDimensions: '320 × 50 / 300 × 50',
      description: 'Horizontal banner below main navigation.',
      minHeight: 'min-h-[90px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 101,
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'calculator-results': {
      enabled: true,
      id: 'calculator-results',
      name: 'Calculator Results Banner',
      dimensions: '728 × 90',
      mobileDimensions: '300 × 250',
      description: 'Positioned safely below calculator results.',
      minHeight: 'min-h-[100px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 102,
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'in-article-banner': {
      enabled: true,
      id: 'in-article-banner',
      name: 'In-Article Mid-Content Banner',
      dimensions: '728 × 90',
      mobileDimensions: '300 × 250',
      description: 'Positioned mid-way through deep-dive mechanics and worked examples.',
      minHeight: 'min-h-[90px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 106,
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'faq-banner': {
      enabled: true,
      id: 'faq-banner',
      name: 'Pre-FAQ Mid Banner',
      dimensions: '728 × 90',
      mobileDimensions: '300 × 250',
      description: 'Positioned between technical guides and FAQ sections.',
      minHeight: 'min-h-[90px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 107,
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'desktop-sidebar': {
      enabled: true,
      id: 'desktop-sidebar',
      name: 'Desktop Sidebar Unit 1',
      dimensions: '300 × 250',
      mobileDimensions: '300 × 250',
      description: 'Primary sidebar unit positioned below the Tool Overview.',
      minHeight: 'min-h-[250px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 103,
      customHtml: `<script>
  atOptions = {
    'key' : '42f8bd9e9814ff95da353115f98de70b',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/42f8bd9e9814ff95da353115f98de70b/invoke.js"></script>`,
    },
    'desktop-sidebar-2': {
      enabled: true,
      id: 'desktop-sidebar-2',
      name: 'Desktop Sidebar Unit 2',
      dimensions: '300 × 250',
      mobileDimensions: '300 × 250',
      description: 'Secondary sidebar unit stacked with Unit 1.',
      minHeight: 'min-h-[250px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 108,
      customHtml: `<script>
  atOptions = {
    'key' : '42f8bd9e9814ff95da353115f98de70b',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/42f8bd9e9814ff95da353115f98de70b/invoke.js"></script>`,
    },
    'content-bottom': {
      enabled: true,
      id: 'content-bottom',
      name: 'Content Bottom Banner',
      dimensions: '728 × 90',
      mobileDimensions: '300 × 250 / 320 × 50',
      description: 'Positioned after guides and FAQs and before Related Tools.',
      minHeight: 'min-h-[90px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 104,
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'mobile-anchor': {
      enabled: true,
      id: 'mobile-anchor',
      name: 'Mobile Anchor Banner',
      dimensions: '728 × 90',
      mobileDimensions: '320 × 50 / 728 × 90',
      description: 'Sticky bottom horizontal banner on mobile screens only.',
      minHeight: 'min-h-[50px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 105,
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'home-top': {
      enabled: true,
      id: 'home-top',
      name: 'Home Top Banner',
      dimensions: '728 × 90',
      mobileDimensions: '320 × 50 / 300 × 50',
      description: 'Banner slot below the header/hero top area on the home page.',
      minHeight: 'min-h-[90px]',
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'home-above-footer': {
      enabled: true,
      id: 'home-above-footer',
      name: 'Home Above Footer Banner',
      dimensions: '728 × 90',
      mobileDimensions: '300 × 250 / 320 × 50',
      description: 'Banner slot just above the footer on the home page.',
      minHeight: 'min-h-[90px]',
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'hub-top': {
      enabled: true,
      id: 'hub-top',
      name: 'Hub Top Banner',
      dimensions: '728 × 90',
      mobileDimensions: '320 × 50 / 300 × 50',
      description: 'Banner slot at the top of game hub pages.',
      minHeight: 'min-h-[90px]',
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'hub-infeed': {
      enabled: true,
      id: 'hub-infeed',
      name: 'Hub In-Feed Banner',
      dimensions: '728 × 90',
      mobileDimensions: '300 × 250',
      description: 'In-feed banner slot inside the tools grid after roughly 8-12 tool cards.',
      minHeight: 'min-h-[100px]',
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'hub-above-footer': {
      enabled: true,
      id: 'hub-above-footer',
      name: 'Hub Above Footer Banner',
      dimensions: '728 × 90',
      mobileDimensions: '300 × 250 / 320 × 50',
      description: 'Banner slot just above the footer on game hub pages.',
      minHeight: 'min-h-[90px]',
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'tool-top': {
      enabled: true,
      id: 'tool-top',
      name: 'Tool Top Banner',
      dimensions: '728 × 90',
      mobileDimensions: '320 × 50 / 300 × 50',
      description: 'Top of page banner slot on tool detail pages.',
      minHeight: 'min-h-[90px]',
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'tool-after-result': {
      enabled: true,
      id: 'tool-after-result',
      name: 'Tool After Result Banner',
      dimensions: '728 × 90',
      mobileDimensions: '300 × 250',
      description: 'Banner slot immediately after tool result/output area.',
      minHeight: 'min-h-[100px]',
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'tool-mid-content': {
      enabled: true,
      id: 'tool-mid-content',
      name: 'Tool Mid-Content Banner',
      dimensions: '728 × 90',
      mobileDimensions: '300 × 250',
      description: 'Mid-content banner slot around worked-examples/FAQ sections.',
      minHeight: 'min-h-[90px]',
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'tool-above-footer': {
      enabled: true,
      id: 'tool-above-footer',
      name: 'Tool Above Footer Banner',
      dimensions: '728 × 90',
      mobileDimensions: '300 × 250 / 320 × 50',
      description: 'Banner slot just above the footer on tool detail pages.',
      minHeight: 'min-h-[90px]',
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
    'tool-sidebar-1': {
      enabled: true,
      id: 'tool-sidebar-1',
      name: 'Tool Sidebar Unit 1',
      dimensions: '300 × 250',
      mobileDimensions: '300 × 250',
      description: 'First sticky sidebar banner slot (300x250) positioned above first text block.',
      minHeight: 'min-h-[250px]',
      customHtml: `<script>
  atOptions = {
    'key' : '42f8bd9e9814ff95da353115f98de70b',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/42f8bd9e9814ff95da353115f98de70b/invoke.js"></script>`,
    },
    'tool-sidebar-2': {
      enabled: true,
      id: 'tool-sidebar-2',
      name: 'Tool Sidebar Unit 2',
      dimensions: '300 × 250',
      mobileDimensions: '300 × 250',
      description: 'Second sticky sidebar banner slot (300x250) positioned between text blocks.',
      minHeight: 'min-h-[250px]',
      customHtml: `<script>
  atOptions = {
    'key' : '42f8bd9e9814ff95da353115f98de70b',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/42f8bd9e9814ff95da353115f98de70b/invoke.js"></script>`,
    },
    'tool-mobile-sticky': {
      enabled: true,
      id: 'tool-mobile-sticky',
      name: 'Tool Mobile Sticky Banner',
      dimensions: '728 × 90',
      mobileDimensions: '320 × 50 / 728 × 90',
      description: 'Sticky bottom horizontal banner slot on tool pages, visible only on mobile widths.',
      minHeight: 'min-h-[50px]',
      customHtml: `<script>
  atOptions = {
    'key' : 'e20f7802b1df62108e7bafb1dd32a3b5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e20f7802b1df62108e7bafb1dd32a3b5/invoke.js"></script>`,
    },
  },

  // 6. ADSTERRA / MONETAG / EZOIC ADAPTERS
  monetag: {
    scriptUrl: '',
    siteId: '',
    inPageSnippet: '',
  },

  // 7. EZOIC CONFIGURATION ADAPTER
  ezoic: {
    publisherId: '',   // e.g. "123456"
  },

  // 8. MEDIAVINE CONFIGURATION ADAPTER
  mediavine: {
    siteId: '',        // e.g. "my-gaming-tools"
  },
};

/**
 * Helper to check whether a specific ad placement is permitted to render
 */
export function isPlacementEnabled(
  placementId: AdPlacementId,
  currentPath?: string
): boolean {
  // 1. Check global master switch
  if (!ADS_CONFIG.enabled) return false;

  // 2. Check individual placement toggle
  const placement = ADS_CONFIG.placements[placementId];
  if (!placement || !placement.enabled) return false;

  // 3. Check disallowed route compliance
  if (currentPath) {
    const cleanPath = currentPath.split('?')[0].toLowerCase();
    const isDisallowed = ADS_CONFIG.disallowedRoutes.some(
      route => cleanPath === route || cleanPath.startsWith(`${route}/`)
    );
    if (isDisallowed) return false;
  }

  return true;
}

/**
 * Check if ads in general are permitted on a given path
 */
export function isAdAllowedOnPath(currentPath: string): boolean {
  if (!ADS_CONFIG.enabled) return false;
  const cleanPath = currentPath.split('?')[0].toLowerCase();
  return !ADS_CONFIG.disallowedRoutes.some(
    route => cleanPath === route || cleanPath.startsWith(`${route}/`)
  );
}
