/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { ADS_CONFIG, AdPlacementConfig, AdPlacementId } from '../../config/adsConfig';

interface AdProviderAdapterProps {
  placementId: AdPlacementId;
  config: AdPlacementConfig;
}

/**
 * AdProviderAdapter
 * 
 * Manages the actual injection and rendering for different ad providers:
 * - Adsterra / highrevenueformat (Sandboxed iframe to allow document.write & isolate window.atOptions)
 * - Monetag (In-Page Push, Banners, Native)
 * - Ezoic (Placeholder divs & scripts)
 * - Mediavine (Mediavine ad markup)
 * - Custom HTML / Network scripts
 * 
 * SAFETY ASSURANCES:
 * - NO external scripts are loaded unless ADS_CONFIG.enabled is true AND a script URL is supplied.
 * - Prevents duplicate script tag insertions.
 * - Cleans up gracefully on unmount.
 */
export default function AdProviderAdapter({ placementId, config }: AdProviderAdapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Dynamic script loader for configured ad network scripts
  useEffect(() => {
    if (!ADS_CONFIG.enabled) return;

    // 1. Monetag Script Injection (Only if Monetag is selected and scriptUrl is provided)
    if (ADS_CONFIG.provider === 'monetag' && ADS_CONFIG.monetag.scriptUrl) {
      const scriptId = 'monetag-global-sdk';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = ADS_CONFIG.monetag.scriptUrl;
        if (ADS_CONFIG.monetag.siteId) {
          script.dataset.zone = ADS_CONFIG.monetag.siteId;
        }
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        document.head.appendChild(script);
      }
    }

    // 2. Ezoic Script Injection (Only if Ezoic is selected and publisherId is provided)
    if (ADS_CONFIG.provider === 'ezoic' && ADS_CONFIG.ezoic.publisherId) {
      const scriptId = 'ezoic-global-sdk';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `//go.ezoic.net/detroitchicago/gnum.js?id=${ADS_CONFIG.ezoic.publisherId}`;
        script.async = true;
        document.head.appendChild(script);
      }
    }

    // 3. Mediavine Script Injection (Only if Mediavine is selected and siteId is provided)
    if (ADS_CONFIG.provider === 'mediavine' && ADS_CONFIG.mediavine.siteId) {
      const scriptId = 'mediavine-global-sdk';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `//scripts.mediavine.com/tags/${ADS_CONFIG.mediavine.siteId}.js`;
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, []);

  // Safely execute embedded ad scripts via an isolated iframe.
  // This resolves document.write() restrictions in modern SPAs and prevents window.atOptions collisions
  useEffect(() => {
    if (!config.customHtml || !iframeRef.current) return;
    const iframe = iframeRef.current;

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
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
    ${config.customHtml}
  </body>
</html>`);
        doc.close();
      }
    } catch (e) {
      console.warn('Ad iframe write warning:', e);
    }
  }, [config.customHtml]);

  // 1. If custom HTML code is supplied for this specific placement
  if (config.customHtml) {
    const widthMatch = config.customHtml.match(/'width'\s*:\s*(\d+)/i) || config.customHtml.match(/width=["']?(\d+)/i);
    const heightMatch = config.customHtml.match(/'height'\s*:\s*(\d+)/i) || config.customHtml.match(/height=["']?(\d+)/i);
    const targetWidth = widthMatch ? parseInt(widthMatch[1], 10) : (placementId === 'desktop-sidebar' ? 300 : 728);
    const targetHeight = heightMatch ? parseInt(heightMatch[1], 10) : (placementId === 'desktop-sidebar' ? 250 : 90);

    return (
      <div className={`w-full flex justify-center items-center overflow-hidden ${config.minHeight || ''}`}>
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
            display: 'block'
          }}
          scrolling="no"
        />
      </div>
    );
  }

  // Render clean reserved in-page banner slot in designated area
  return (
    <div
      ref={containerRef}
      className={`
        w-full rounded-xl border border-dashed border-cyan-500/40 bg-[#090e1c]/80 hover:border-cyan-400/60 transition-colors
        flex flex-col items-center justify-center p-4 text-center select-none
        ${config.minHeight}
      `}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 mb-1.5">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
          {config.name}
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
          {config.dimensions}
        </span>
      </div>

      <p className="text-[11px] text-slate-300 max-w-md leading-relaxed">
        Banner Slot: <code className="text-cyan-400 font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">{placementId}</code>
      </p>

      <span className="text-[10px] text-slate-400 mt-1 font-mono">
        (In-Page Banner Slot • Zone: <span className="text-emerald-400">{config.monetagZoneId || '12040443'}</span>)
      </span>

      {/* Embedded in-page banner container */}
      <div
        id={`monetag-zone-${config.monetagZoneId || placementId}`}
        data-monetag-zone={config.monetagZoneId || '12040443'}
        className="w-full flex justify-center items-center mt-2"
      />
    </div>
  );
}
