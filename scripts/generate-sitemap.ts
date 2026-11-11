/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import { GAMES, TOOLS } from '../src/data/gamesAndTools';
import { CODES_PAGES } from '../src/data/codesData';
import { QA_ENTRIES, getQaGames } from '../src/data/qaData';

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// 1. Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://gamingtoolshub.com/sitemap.xml
`;
fs.writeFileSync('public/robots.txt', robotsTxt);

// 2. Generate sitemap.xml
const domain = 'https://gamingtoolshub.com';
const today = new Date().toISOString().split('T')[0];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const urlMap = new Map<string, SitemapUrl>();

function addUrl(loc: string, priority: string, changefreq: string) {
  if (!loc || loc.includes('?')) return;
  if (!urlMap.has(loc)) {
    urlMap.set(loc, {
      loc,
      lastmod: today,
      changefreq,
      priority
    });
  }
}

// 1. Static Routes (8 static pages)
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/tools', priority: '0.9', changefreq: 'daily' },
  { path: '/games', priority: '0.8', changefreq: 'weekly' },
  { path: '/categories', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms', priority: '0.5', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.5', changefreq: 'monthly' },
];

staticRoutes.forEach(route => {
  addUrl(`${domain}${route.path}`, route.priority, route.changefreq);
});

// 2. Data-Driven Game Hubs (26 games with tools)
GAMES.forEach(game => {
  const hasTools = TOOLS.some(t => t.gameId === game.id);
  if (hasTools) {
    addUrl(`${domain}/games/${game.slug}`, '0.8', 'weekly');
  }
});

// 3. Tool Entries (230 tools)
TOOLS.forEach(tool => {
  addUrl(`${domain}/tools/${tool.slug}`, '0.8', 'weekly');
});

// 4. Game Codes Index and Detail Pages
addUrl(`${domain}/codes`, '0.9', 'daily');
CODES_PAGES.forEach(page => {
  addUrl(`${domain}/codes/${page.slug}`, '0.8', 'daily');
});

// 5. Game Q&A Index, Game Hubs, and Question Detail Pages
addUrl(`${domain}/qa`, '0.9', 'daily');
const qaGames = getQaGames();
qaGames.forEach(game => {
  addUrl(`${domain}/qa/${game.slug}`, '0.8', 'daily');
});
QA_ENTRIES.forEach(entry => {
  addUrl(`${domain}/qa/${entry.gameSlug}/${entry.slug}`, '0.8', 'daily');
});

// 6. Build XML Output
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

urlMap.forEach(item => {
  xml += '  <url>\n';
  xml += `    <loc>${item.loc}</loc>\n`;
  xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
  xml += `    <priority>${item.priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>\n';

fs.writeFileSync('public/sitemap.xml', xml);
console.log('Generated robots.txt and sitemap.xml with', urlMap.size, 'URLs!');
