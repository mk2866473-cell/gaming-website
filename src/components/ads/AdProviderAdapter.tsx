/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ADS_CONFIG, AdPlacementConfig, AdPlacementId } from '../../config/adsConfig';

interface AdProviderAdapterProps {
  placementId: AdPlacementId;
  config: AdPlacementConfig;
}

interface ProviderScriptRecord {
  key: string;
  scriptUrl: string;
  ownerSlotId: string;
  status: 'loading' | 'loaded' | 'error';
  adIframeSrc?: string;
  listeners: Set<(record: ProviderScriptRecord) => void>;
}

/**
 * Module-level registry ensuring each ad provider script URL/key is injected
 * at most ONCE per page load. Additional slots sharing the same key reuse this
 * registry entry instead of injecting duplicate <script> tags.
 */
export const PROVIDER_SCRIPT_REGISTRY = new Map<string, ProviderScriptRecord>();

function parseAdsterraConfig(customHtml?: string): {
  adKey: string;
  scriptUrl: string;
  width: number;
  height: number;
} {
  if (!customHtml) {
    return { adKey: '', scriptUrl: '', width: 728, height: 90 };
  }
  const keyMatch = customHtml.match(/'key'\s*:\s*['"]([^'"]+)['"]/i);
  const srcMatch = customHtml.match(/<script[^>]+src=["']([^"']+)["']/i);
  const widthMatch =
    customHtml.match(/'width'\s*:\s*(\d+)/i) || customHtml.match(/width=["']?(\d+)/i);
  const heightMatch =
    customHtml.match(/'height'\s*:\s*(\d+)/i) || customHtml.match(/height=["']?(\d+)/i);

  return {
    adKey: keyMatch ? keyMatch[1] : '',
    scriptUrl: srcMatch ? srcMatch[1] : '',
    width: widthMatch ? parseInt(widthMatch[1], 10) : 728,
    height: heightMatch ? parseInt(heightMatch[1], 10) : 90,
  };
}

function scheduleAfterWindowLoadAndIdle(onReady: () => void): () => void {
  let cancelled = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let idleId: number | null = null;

  const scheduleIdleOrFallback = () => {
    if (cancelled) return;
    if (typeof window !== 'undefined' && typeof (window as Window & { requestIdleCallback?: unknown }).requestIdleCallback === 'function') {
      idleId = (window as Window & {
        requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback(
        () => {
          if (!cancelled) onReady();
        },
        { timeout: 1500 }
      );
    } else {
      timeoutId = setTimeout(() => {
        if (!cancelled) onReady();
      }, 1500);
    }
  };

  if (typeof document !== 'undefined' && document.readyState === 'complete') {
    scheduleIdleOrFallback();
  } else if (typeof window !== 'undefined') {
    const onLoad = () => {
      window.removeEventListener('load', onLoad);
      scheduleIdleOrFallback();
    };
    window.addEventListener('load', onLoad, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', onLoad);
      if (timeoutId !== null) clearTimeout(timeoutId);
      if (
        idleId !== null &&
        typeof (window as Window & { cancelIdleCallback?: unknown }).cancelIdleCallback === 'function'
      ) {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
    };
  }

  return () => {
    cancelled = true;
    if (timeoutId !== null) clearTimeout(timeoutId);
    if (
      idleId !== null &&
      typeof window !== 'undefined' &&
      typeof (window as Window & { cancelIdleCallback?: unknown }).cancelIdleCallback === 'function'
    ) {
      (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
    }
  };
}

/**
 * AdProviderAdapter
 *
 * Manages deferred ad injection and script deduplication:
 * - Never injects ad scripts during initial render (protects LCP / first paint)
 * - Uses IntersectionObserver (rootMargin: "300px") per slot
 * - First-viewport slots wait for window `load` + requestIdleCallback (or 1.5s fallback)
 * - Deduplicates provider script injections via PROVIDER_SCRIPT_REGISTRY (max 1 per key)
 * - Strictly contained inside the parent AdSlot's reserved dimensions
 */
export default function AdProviderAdapter({ placementId, config }: AdProviderAdapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [shouldInject, setShouldInject] = useState(false);

  // 1. Observe viewport proximity (rootMargin: "300px") and defer injection until after load/idle
  useEffect(() => {
    if (!ADS_CONFIG.enabled) return;
    const node = containerRef.current;
    if (!node) return;

    let cancelScheduled: (() => void) | null = null;
    let triggered = false;

    const triggerLoad = () => {
      if (triggered) return;
      triggered = true;
      cancelScheduled = scheduleAfterWindowLoadAndIdle(() => {
        setShouldInject(true);
      });
    };

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              observer.disconnect();
              triggerLoad();
              break;
            }
          }
        },
        { rootMargin: '300px' }
      );
      observer.observe(node);

      return () => {
        observer.disconnect();
        if (cancelScheduled) cancelScheduled();
      };
    }

    // Fallback when IntersectionObserver is unavailable
    triggerLoad();
    return () => {
      if (cancelScheduled) cancelScheduled();
    };
  }, [placementId]);

  // 2. Dynamic global SDK loader for Monetag / Ezoic / Mediavine (only when triggered)
  useEffect(() => {
    if (!shouldInject || !ADS_CONFIG.enabled) return;

    if (ADS_CONFIG.provider === 'monetag' && ADS_CONFIG.monetag.scriptUrl) {
      const registryKey = `monetag:${ADS_CONFIG.monetag.scriptUrl}`;
      if (!PROVIDER_SCRIPT_REGISTRY.has(registryKey) && !document.getElementById('monetag-global-sdk')) {
        PROVIDER_SCRIPT_REGISTRY.set(registryKey, {
          key: registryKey,
          scriptUrl: ADS_CONFIG.monetag.scriptUrl,
          ownerSlotId: placementId,
          status: 'loading',
          listeners: new Set(),
        });
        const script = document.createElement('script');
        script.id = 'monetag-global-sdk';
        script.src = ADS_CONFIG.monetag.scriptUrl;
        if (ADS_CONFIG.monetag.siteId) {
          script.dataset.zone = ADS_CONFIG.monetag.siteId;
        }
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        document.head.appendChild(script);
      }
    }

    if (ADS_CONFIG.provider === 'ezoic' && ADS_CONFIG.ezoic.publisherId) {
      const src = `//go.ezoic.net/detroitchicago/gnum.js?id=${ADS_CONFIG.ezoic.publisherId}`;
      const registryKey = `ezoic:${src}`;
      if (!PROVIDER_SCRIPT_REGISTRY.has(registryKey) && !document.getElementById('ezoic-global-sdk')) {
        PROVIDER_SCRIPT_REGISTRY.set(registryKey, {
          key: registryKey,
          scriptUrl: src,
          ownerSlotId: placementId,
          status: 'loading',
          listeners: new Set(),
        });
        const script = document.createElement('script');
        script.id = 'ezoic-global-sdk';
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
      }
    }

    if (ADS_CONFIG.provider === 'mediavine' && ADS_CONFIG.mediavine.siteId) {
      const src = `//scripts.mediavine.com/tags/${ADS_CONFIG.mediavine.siteId}.js`;
      const registryKey = `mediavine:${src}`;
      if (!PROVIDER_SCRIPT_REGISTRY.has(registryKey) && !document.getElementById('mediavine-global-sdk')) {
        PROVIDER_SCRIPT_REGISTRY.set(registryKey, {
          key: registryKey,
          scriptUrl: src,
          ownerSlotId: placementId,
          status: 'loading',
          listeners: new Set(),
        });
        const script = document.createElement('script');
        script.id = 'mediavine-global-sdk';
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, [shouldInject, placementId]);

  // 3. Inject customHtml (Adsterra invoke.js) once per ad key/URL after viewport + load/idle
  useEffect(() => {
    if (!shouldInject || !config.customHtml || !iframeRef.current) return;
    const iframe = iframeRef.current;
    const { adKey, scriptUrl } = parseAdsterraConfig(config.customHtml);
    const registryKey = adKey || scriptUrl || placementId;
    const existingRecord = PROVIDER_SCRIPT_REGISTRY.get(registryKey);

    const writeIsolatedFrame = (innerHtml: string, onRendered?: (doc: Document) => void) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;
        doc.open();
        doc.write(`<!DOCTYPE html>
<html>
  <head>
    <base target="_blank">
    <meta charset="utf-8">
    <style>
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    ${innerHtml}
  </body>
</html>`);
        doc.close();
        if (onRendered) onRendered(doc);
      } catch (e) {
        console.warn('Ad iframe write warning:', e);
      }
    };

    // Additional slots with an already-registered key reuse the registry instead of injecting another <script>
    if (existingRecord) {
      const applyReusedAd = (rec: ProviderScriptRecord) => {
        if (rec.adIframeSrc && iframeRef.current) {
          iframeRef.current.src = rec.adIframeSrc;
        }
      };

      if (existingRecord.status === 'loaded') {
        applyReusedAd(existingRecord);
        return;
      }

      if (existingRecord.status === 'loading') {
        existingRecord.listeners.add(applyReusedAd);
        return () => {
          existingRecord.listeners.delete(applyReusedAd);
        };
      }

      return;
    }

    // First slot for this key/URL registers it and injects the provider script ONCE
    if (!existingRecord) {
      const record: ProviderScriptRecord = {
        key: registryKey,
        scriptUrl,
        ownerSlotId: placementId,
        status: 'loading',
        listeners: new Set(),
      };
      PROVIDER_SCRIPT_REGISTRY.set(registryKey, record);

      writeIsolatedFrame(config.customHtml, (doc) => {
        const scripts = doc.getElementsByTagName('script');
        const extScript = Array.from(scripts).find((s) => Boolean(s.src));

        const finalizeRecord = () => {
          const innerAdFrame = doc.querySelector('iframe[src]') as HTMLIFrameElement | null;
          record.status = 'loaded';
          if (innerAdFrame?.src) {
            record.adIframeSrc = innerAdFrame.src;
          }
          record.listeners.forEach((listener) => listener(record));
          record.listeners.clear();
        };

        if (extScript) {
          extScript.addEventListener('load', () => {
            setTimeout(finalizeRecord, 150);
          }, { once: true });
          extScript.addEventListener('error', () => {
            record.status = 'error';
            record.listeners.clear();
          }, { once: true });
        } else {
          finalizeRecord();
        }
      });
    }
  }, [shouldInject, config.customHtml, placementId]);

  // Custom HTML / Adsterra slot
  if (config.customHtml) {
    const parsed = parseAdsterraConfig(config.customHtml);
    const targetWidth =
      parsed.width || (placementId.includes('sidebar') ? 300 : 728);
    const targetHeight =
      parsed.height || (placementId.includes('sidebar') ? 250 : 90);
    const isHorizontalBanner = targetWidth === 728 && targetHeight === 90;

    return (
      <div
        ref={containerRef}
        data-ad-deferred={shouldInject ? 'injected' : 'waiting'}
        className="w-full h-full flex justify-center items-center overflow-hidden"
      >
        {shouldInject && (
          <div
            className={
              isHorizontalBanner
                ? 'w-[728px] h-[90px] scale-[0.44] md:scale-100 origin-center flex items-center justify-center flex-shrink-0'
                : 'flex items-center justify-center flex-shrink-0'
            }
          >
            <iframe
              ref={iframeRef}
              title={`Ad-${placementId}`}
              width={targetWidth}
              height={targetHeight}
              style={{
                border: 'none',
                overflow: 'hidden',
                width: `${targetWidth}px`,
                maxWidth: '100%',
                height: `${targetHeight}px`,
                display: 'block',
              }}
              scrolling="no"
            />
          </div>
        )}
      </div>
    );
  }

  // Fallback non-customHtml container (stays strictly inside parent's reserved box)
  return (
    <div
      ref={containerRef}
      data-ad-deferred={shouldInject ? 'injected' : 'waiting'}
      className="w-full h-full flex items-center justify-center overflow-hidden text-center select-none"
    >
      {shouldInject && (
        <div
          id={`monetag-zone-${config.monetagZoneId || placementId}`}
          data-monetag-zone={config.monetagZoneId || '12040443'}
          className="w-full h-full flex justify-center items-center"
        />
      )}
    </div>
  );
}
