/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ToolItem } from '../data/gamesAndTools';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  tool?: ToolItem;
  breadcrumbs?: Array<{ name: string; path: string }>;
}

export default function SEOHead({
  title,
  description,
  canonicalPath = '',
  tool,
  breadcrumbs
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title.includes('GamingToolsHub') ? title : `${title} | GamingToolsHub`;
    document.title = formattedTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update OpenGraph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', formattedTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const fullUrl = `https://gamingtoolshub.com${canonicalPath}`;
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullUrl);

    // 4. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // 5. Inject Structured Data JSON-LD
    const schemas: any[] = [];

    // Base WebApplication Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool ? tool.name : 'GamingToolsHub',
      url: fullUrl,
      applicationCategory: 'GameApplication',
      operatingSystem: 'All Modern Browsers',
      description: description,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    });

    // FAQPage Schema if tool has FAQs
    if (tool && tool.faqs && tool.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: tool.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      });
    }

    // BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: `https://gamingtoolshub.com${b.path}`
        }))
      });
    }

    // Insert or replace script tag
    let scriptTag = document.getElementById('seo-json-ld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-json-ld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemas);

  }, [title, description, canonicalPath, tool, breadcrumbs]);

  return null;
}
