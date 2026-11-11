/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import { TOOLS } from '../src/data/gamesAndTools';
import { CODES_PAGES } from '../src/data/codesData';

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

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/tools', priority: '0.9', changefreq: 'daily' },
  { path: '/games', priority: '0.8', changefreq: 'weekly' },
  { path: '/categories', priority: '0.8', changefreq: 'weekly' },
  { path: '/games/minecraft', priority: '0.8', changefreq: 'weekly' },
  { path: '/games/roblox', priority: '0.8', changefreq: 'weekly' },
  { path: '/games/fortnite', priority: '0.8', changefreq: 'weekly' },
  { path: '/games/pokemongo', priority: '0.8', changefreq: 'weekly' },
  { path: '/games/palworld', priority: '0.8', changefreq: 'weekly' },
  { path: '/games/genshin', priority: '0.8', changefreq: 'weekly' },
  { path: '/games/helldivers-2', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms', priority: '0.5', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.5', changefreq: 'monthly' },
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

staticRoutes.forEach(route => {
  xml += '  <url>\n';
  xml += `    <loc>${domain}${route.path}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
  xml += `    <priority>${route.priority}</priority>\n`;
  xml += '  </url>\n';
});

TOOLS.forEach(tool => {
  xml += '  <url>\n';
  xml += `    <loc>${domain}/tools/${tool.slug}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.8</priority>\n';
  xml += '  </url>\n';
});

// 3. Add Game Codes Index and Detail Pages
xml += '  <url>\n';
xml += `    <loc>${domain}/codes</loc>\n`;
xml += `    <lastmod>${today}</lastmod>\n`;
xml += '    <changefreq>daily</changefreq>\n';
xml += '    <priority>0.9</priority>\n';
xml += '  </url>\n';

CODES_PAGES.forEach(page => {
  xml += '  <url>\n';
  xml += `    <loc>${domain}/codes/${page.slug}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '    <changefreq>daily</changefreq>\n';
  xml += '    <priority>0.8</priority>\n';
  xml += '  </url>\n';
});

xml += '</urlset>\n';

fs.writeFileSync('public/sitemap.xml', xml);
console.log('Generated robots.txt and sitemap.xml with', staticRoutes.length + TOOLS.length + 1 + CODES_PAGES.length, 'URLs!');
