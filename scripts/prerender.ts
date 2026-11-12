/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { TOOLS, GAMES, CATEGORIES, getGameById, getCategoryById, getGamePath } from '../src/data/gamesAndTools';
import { 
  getToolWorkedExamples, 
  getToolDeepDive, 
  getEnhancedToolFaqs, 
  getEnhancedToolSeoTitle 
} from '../src/utils/toolSeoContent';
import { CODES_PAGES, CodesPageData } from '../src/data/codesData';
import { QA_ENTRIES, getQaGames, getQaEntriesByGame, QaEntry } from '../src/data/qaData';

const DIST_DIR = path.resolve('dist');
const BASE_TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');
const DOMAIN = 'https://gamingtoolshub.com';

if (!fs.existsSync(BASE_TEMPLATE_PATH)) {
  console.error('Error: dist/index.html does not exist. Run vite build first!');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(BASE_TEMPLATE_PATH, 'utf-8');

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Clean up any legacy directory-based tool folders so only clean .html files exist
function cleanSubdirectories(parentDirPath: string) {
  if (!fs.existsSync(parentDirPath)) return;
  const entries = fs.readdirSync(parentDirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      fs.rmSync(path.join(parentDirPath, entry.name), { recursive: true, force: true });
    }
  }
}

cleanSubdirectories(path.join(DIST_DIR, 'tools'));
cleanSubdirectories(path.join(DIST_DIR, 'games'));

function writeHtmlForRoute(routePath: string, htmlContent: string) {
  const cleanPath = routePath.replace(/^\//, '').replace(/\/$/, '');

  if (cleanPath === '') {
    // Keep dist/index.html as the clean Vite SPA template so React mounts cleanly on root visit
    return;
  }

  // 1. Write the clean URL static HTML file: dist/cleanPath.html
  // (e.g. dist/tools/robux-tax-calculator.html or dist/about.html)
  // GitHub Pages natively serves /tools/robux-tax-calculator via /tools/robux-tax-calculator.html
  // with HTTP 200 and WITHOUT any trailing slash 301 redirect!
  const targetHtmlFile = path.join(DIST_DIR, `${cleanPath}.html`);
  const parentDir = path.dirname(targetHtmlFile);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }
  fs.writeFileSync(targetHtmlFile, htmlContent, 'utf-8');

  // 2. For directory hub routes like /tools, /games, /categories, ALSO write index.html inside the directory
  // so that if someone visits with a trailing slash (e.g. /tools/), it also resolves directly!
  if (['tools', 'games', 'categories'].includes(cleanPath)) {
    const dirPath = path.join(DIST_DIR, cleanPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(path.join(dirPath, 'index.html'), htmlContent, 'utf-8');
  }
}

function renderNavHeader(activePath: string = ''): string {
  return `
    <header class="sticky top-0 z-50 w-full border-b border-indigo-900/60 bg-[#070b19]/95 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 gap-4">
          <a href="/" class="flex items-center gap-2.5 group">
            <span class="w-9 h-9 rounded-xl bg-[#0c122e] border border-indigo-900/60 flex items-center justify-center font-black text-violet-400 text-sm">🎮</span>
            <span class="font-extrabold text-base tracking-tight text-white">GamingTools<span class="text-violet-400">Hub</span></span>
          </a>
          <nav class="hidden md:flex items-center gap-6 text-xs text-slate-300">
            <a href="/tools" class="hover:text-violet-400 transition-colors ${activePath === '/tools' ? 'text-violet-400 font-bold' : ''}">All Tools</a>
            <a href="/games" class="hover:text-violet-400 transition-colors ${activePath === '/games' ? 'text-violet-400 font-bold' : ''}">Games</a>
            <a href="/categories" class="hover:text-violet-400 transition-colors ${activePath === '/categories' ? 'text-violet-400 font-bold' : ''}">Categories</a>
            <a href="/games/minecraft" class="hover:text-violet-400 transition-colors ${activePath.includes('minecraft') ? 'text-violet-400 font-bold' : ''}">Minecraft</a>
            <a href="/games/roblox" class="hover:text-violet-400 transition-colors ${activePath.includes('roblox') ? 'text-violet-400 font-bold' : ''}">Roblox</a>
            <a href="/games/fortnite" class="hover:text-violet-400 transition-colors ${activePath.includes('fortnite') ? 'text-violet-400 font-bold' : ''}">Fortnite</a>
            <a href="/games/pokemongo" class="hover:text-violet-400 transition-colors ${activePath.includes('pokemongo') ? 'text-violet-400 font-bold' : ''}">Pokémon GO</a>
            <a href="/games/palworld" class="hover:text-violet-400 transition-colors ${activePath.includes('palworld') ? 'text-violet-400 font-bold' : ''}">Palworld</a>
          </nav>
        </div>
      </div>
    </header>
  `;
}

function renderFooter(): string {
  return `
    <footer class="border-t border-slate-800/80 bg-[#060910] py-12 text-xs text-slate-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center font-black text-violet-400 text-xs">G</span>
            <span class="font-bold text-white text-sm">GamingToolsHub</span>
          </div>
          <p class="text-slate-500 leading-relaxed text-xs">High-performance gaming calculators, circle generators, nether portal math, and conversion engines built for precision gameplay with zero server lag.</p>
        </div>
        <div>
          <h4 class="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Game Hubs</h4>
          <ul class="space-y-2">
            <li><a href="/games/minecraft" class="hover:text-violet-400 transition-colors">Minecraft Tools & Circle Generator</a></li>
            <li><a href="/games/roblox" class="hover:text-violet-400 transition-colors">Roblox Robux Tax & DevEx</a></li>
            <li><a href="/games/fortnite" class="hover:text-violet-400 transition-colors">Fortnite Battle Pass XP & Sens</a></li>
            <li><a href="/games/pokemongo" class="hover:text-violet-400 transition-colors">Pokémon GO CP, IV & Evolutions</a></li>
            <li><a href="/games/palworld" class="hover:text-violet-400 transition-colors">Palworld Breeding & Stats</a></li>
            <li><a href="/games/genshin" class="hover:text-violet-400 transition-colors">Genshin Impact Wish Pity & Resin</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Popular Calculators</h4>
          <ul class="space-y-2">
            <li><a href="/tools/minecraft-circle-generator" class="hover:text-violet-400 transition-colors">Minecraft Circle Generator</a></li>
            <li><a href="/tools/minecraft-3d-portal-linker" class="hover:text-violet-400 transition-colors">Nether Portal 3D Linker</a></li>
            <li><a href="/tools/roblox-tax-calculator" class="hover:text-violet-400 transition-colors">Robux 30% Tax Calculator</a></li>
            <li><a href="/tools/robux-to-usd-calculator" class="hover:text-violet-400 transition-colors">DevEx USD Cashout Calculator</a></li>
            <li><a href="/tools/pokemon-go-cp-calculator" class="hover:text-violet-400 transition-colors">Pokémon GO CP Calculator</a></li>
            <li><a href="/tools/palworld-breeding-calculator" class="hover:text-violet-400 transition-colors">Palworld Breeding Calculator</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Information & Legal</h4>
          <ul class="space-y-2">
            <li><a href="/about" class="hover:text-violet-400 transition-colors">About Us</a></li>
            <li><a href="/privacy" class="hover:text-violet-400 transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" class="hover:text-violet-400 transition-colors">Terms of Service</a></li>
            <li><a href="/disclaimer" class="hover:text-violet-400 transition-colors">Disclaimer & Trademark Notices</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 pt-6 text-center text-slate-500">
        <p>© 2026 GamingToolsHub. All rights reserved. Gaming tools engineered for speed and accuracy.</p>
      </div>
    </footer>
  `;
}

function renderPageTemplate(
  routePath: string,
  title: string,
  description: string,
  bodyContent: string,
  jsonLd?: any,
  overrideCanonicalPath?: string
) {
  let pageHtml = baseTemplate;
  const canonicalPath = overrideCanonicalPath !== undefined ? overrideCanonicalPath : (routePath === '/' ? '/' : routePath);
  const canonicalUrl = `${DOMAIN}${canonicalPath}`;

  pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  pageHtml = pageHtml.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  pageHtml = pageHtml.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta name="twitter:description" content=".*?" \/>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );

  if (jsonLd) {
    const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`;
    pageHtml = pageHtml.replace('</head>', `${jsonLdScript}\n</head>`);
  }

  // Inject Pre-rendered Content into <div id="root"></div>
  pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${bodyContent}</div>`);

  writeHtmlForRoute(routePath, pageHtml);
}

/**
 * 1. Pre-render All Tool Pages (Keep exactly as already working)
 */
let renderedCount = 0;

TOOLS.forEach(tool => {
  const enhancedTitle = getEnhancedToolSeoTitle(tool);
  const fullTitle = `${enhancedTitle} | GamingToolsHub`;
  const canonicalUrl = `${DOMAIN}/tools/${tool.slug}`;
  const game = getGameById(tool.gameId);
  const gameName = game?.name || 'Gaming';
  const gamePath = getGamePath(tool.gameId);
  const workedExamples = getToolWorkedExamples(tool);
  const deepDive = getToolDeepDive(tool);
  const enhancedFaqs = getEnhancedToolFaqs(tool);

  // Construct JSON-LD Structured Data
  const jsonLdSchemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.name,
      url: canonicalUrl,
      applicationCategory: 'GameApplication',
      operatingSystem: 'All Modern Browsers',
      description: tool.metaDescription,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: DOMAIN
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: gameName,
          item: `${DOMAIN}${gamePath}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: tool.name,
          item: canonicalUrl
        }
      ]
    }
  ];

  if (enhancedFaqs.length > 0) {
    jsonLdSchemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: enhancedFaqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(jsonLdSchemas, null, 2)}\n</script>`;

  // Build rich pre-rendered HTML body content
  const prerenderedBody = `
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-violet-500 selection:text-black">
      <div>
        <!-- Static Top Navigation Header -->
        <header class="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080c14]/95 backdrop-blur-md">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 gap-4">
              <a href="/" class="flex items-center gap-2.5 group">
                <span class="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center font-black text-violet-400 text-sm">G</span>
                <span class="font-extrabold text-base tracking-tight text-white">GamingTools<span class="text-violet-400">Hub</span></span>
              </a>
              <nav class="hidden md:flex items-center gap-6 text-xs text-slate-300">
                <a href="/tools" class="hover:text-violet-400">All Tools</a>
                <a href="/games/minecraft" class="hover:text-violet-400">Minecraft</a>
                <a href="/games/roblox" class="hover:text-violet-400">Roblox</a>
                <a href="/games/fortnite" class="hover:text-violet-400">Fortnite</a>
                <a href="/games/pokemongo" class="hover:text-violet-400">Pokémon GO</a>
                <a href="/games/palworld" class="hover:text-violet-400">Palworld</a>
              </nav>
            </div>
          </div>
        </header>

        <!-- Main Tool Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div class="space-y-10">
            <!-- Breadcrumbs -->
            <nav aria-label="Breadcrumb" class="mb-4">
              <ol class="flex items-center flex-wrap gap-1.5 text-xs text-zinc-400">
                <li><a href="/" class="hover:text-violet-400 transition-colors py-1">Home</a></li>
                <li class="text-zinc-600">/</li>
                <li><a href="${gamePath}" class="hover:text-violet-400 transition-colors py-1">${escapeHtml(gameName)}</a></li>
                <li class="text-zinc-600">/</li>
                <li><span class="text-zinc-200 font-medium">${escapeHtml(tool.name)}</span></li>
              </ol>
            </nav>

            <!-- H1 & Description -->
            <div class="pb-4 border-b border-zinc-800">
              <div class="flex items-center gap-2 mb-2 text-xs font-mono">
                <a href="${gamePath}" class="text-slate-300 hover:text-violet-400 font-semibold">${escapeHtml(gameName)}</a>
                <span class="text-slate-600">·</span>
                <span class="text-violet-400">${escapeHtml(tool.badge || 'Universal')}</span>
                <span class="text-slate-600">·</span>
                <span class="text-slate-500">Verified Engine</span>
              </div>
              <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">${escapeHtml(tool.h1 || enhancedTitle)}</h1>
              <p class="text-xs sm:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">${escapeHtml(tool.description)}</p>
            </div>

            <!-- Interactive Tool Launchpad -->
            <div id="interactive-tool-launcher" class="bg-[#0c122e] border border-indigo-900/60 rounded-2xl p-6 sm:p-8 space-y-4">
              <div class="flex items-center justify-between border-b border-indigo-900/40 pb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold">
                    ⚡
                  </div>
                  <div>
                    <h2 class="text-base sm:text-lg font-bold text-white">${escapeHtml(tool.name)} Engine</h2>
                    <p class="text-xs text-slate-400">Precision Client-Side Calculator • Zero Server Lag</p>
                  </div>
                </div>
                <span class="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">Verified Math</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Precision client-side calculation engine. All formulas execute locally in your browser with instantaneous response times, zero server roundtrips, and complete data privacy.
              </p>
              <div class="pt-2">
                <div class="w-full sm:w-auto inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-violet-600/20 border border-violet-500/40 text-violet-300 text-xs sm:text-sm font-semibold">
                  <span class="inline-block w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse"></span>
                  <span>Interactive Engine Ready</span>
                </div>
              </div>
            </div>

            <!-- How to Use Step-by-Step Guide -->
            <section class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 class="text-lg sm:text-xl font-bold text-white">How to Use the ${escapeHtml(tool.name)}</h2>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">${escapeHtml(tool.howToGuide.overview)}</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                ${tool.howToGuide.steps.map((step, idx) => `
                  <div class="bg-[#090d16] border border-slate-800/90 rounded-xl p-4 flex gap-3.5">
                    <span class="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">${idx + 1}</span>
                    <div>
                      <h3 class="text-xs font-bold text-slate-200 mb-1">${escapeHtml(step.title)}</h3>
                      <p class="text-xs text-slate-400 leading-relaxed">${escapeHtml(step.description)}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Formula & Algorithm Explained -->
            <section class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 class="text-lg sm:text-xl font-bold text-white">${escapeHtml(tool.formulaExplained.title)}</h2>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed whitespace-pre-line">${escapeHtml(tool.formulaExplained.details)}</p>
              ${tool.formulaExplained.mathSnippet ? `
                <div class="bg-[#090d16] border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <code>${escapeHtml(tool.formulaExplained.mathSnippet)}</code>
                </div>
              ` : ''}
            </section>

            <!-- 3 to 5 Worked Real-World Examples & Scenarios -->
            <section class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 class="text-lg sm:text-xl font-bold text-white">Worked Real-World Examples & Scenarios (${workedExamples.length})</h2>
              <div class="space-y-5">
                ${workedExamples.map((ex, idx) => `
                  <div class="bg-[#090d16] border border-slate-800/90 rounded-xl p-5 space-y-3.5">
                    <h3 class="text-sm font-bold text-slate-100 flex items-center gap-2">
                      <span class="w-5 h-5 rounded-md bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs flex items-center justify-center font-mono">${idx + 1}</span>
                      ${escapeHtml(ex.title)}
                    </h3>
                    <p class="text-xs text-slate-400 leading-relaxed"><strong class="text-slate-300">Scenario: </strong>${escapeHtml(ex.scenario)}</p>
                    <div class="text-xs font-mono text-cyan-300/90 bg-cyan-950/20 border border-cyan-800/30 rounded-lg p-3">
                      <span class="text-[10px] text-cyan-400 uppercase tracking-wider block mb-1 font-sans font-semibold">Calculation:</span>
                      <code>${escapeHtml(ex.calculation)}</code>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div class="bg-violet-950/20 border border-violet-500/30 rounded-lg p-3">
                        <span class="text-[10px] uppercase font-bold text-violet-400 tracking-wider block mb-0.5">In-Game Result</span>
                        <span class="text-xs text-slate-200 font-semibold">${escapeHtml(ex.result)}</span>
                      </div>
                      <div class="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3">
                        <span class="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-0.5">Pro Strategy</span>
                        <span class="text-xs text-slate-300">${escapeHtml(ex.takeaway)}</span>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Technical Mechanics Deep Dive -->
            <section class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
              <h2 class="text-lg sm:text-xl font-bold text-white">${escapeHtml(deepDive.title)}</h2>
              <div class="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-4 text-xs sm:text-sm text-indigo-200 leading-relaxed font-medium">
                ${escapeHtml(deepDive.summary)}
              </div>
              <div class="space-y-3.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                ${deepDive.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
              </div>
            </section>

            <!-- Frequently Asked Questions -->
            <section class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 class="text-lg sm:text-xl font-bold text-white">Frequently Asked Questions (${enhancedFaqs.length})</h2>
              <div class="space-y-3">
                ${enhancedFaqs.map(faq => `
                  <div class="bg-[#090d16] border border-slate-800 rounded-xl p-4">
                    <h3 class="text-xs sm:text-sm font-semibold text-slate-200">${escapeHtml(faq.question)}</h3>
                    <div class="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">${escapeHtml(faq.answer)}</div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Game Knowledge Hub Linking Card -->
            <section class="bg-gradient-to-r from-[#0d1627] to-[#0a101d] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 class="text-lg sm:text-xl font-bold text-white">Explore all ${escapeHtml(gameName)} Calculators & Tools</h2>
              <p class="text-xs text-slate-400 max-w-xl">Access the full suite of ${escapeHtml(gameName)} utilities, builders, conversion charts, and calculators in our dedicated game center.</p>
              <a href="${gamePath}" class="inline-block px-4 py-2 bg-violet-500 text-black font-semibold text-xs rounded-xl hover:bg-violet-400 transition-all">Visit ${escapeHtml(gameName)} Hub →</a>
            </section>
          </div>
        </main>

        <!-- Static Footer -->
        <footer class="border-t border-slate-800/80 bg-[#060910] py-8 text-center text-xs text-slate-500">
          <p>© 2026 GamingToolsHub. Built for high-performance precision gaming calculations.</p>
        </footer>
      </div>
    </div>
  `;

  // Inject meta tags and prerendered body into base template
  let pageHtml = baseTemplate;

  // Replace Title
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);

  // Replace Meta Description
  pageHtml = pageHtml.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${escapeHtml(tool.metaDescription)}" />`
  );

  // Replace Canonical Link
  pageHtml = pageHtml.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace OpenGraph Title & Description & URL
  pageHtml = pageHtml.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${escapeHtml(tool.metaDescription)}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // Replace Twitter Title & Description
  pageHtml = pageHtml.replace(
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta name="twitter:description" content=".*?" \/>/i,
    `<meta name="twitter:description" content="${escapeHtml(tool.metaDescription)}" />`
  );

  // Inject JSON-LD Schema before </head>
  pageHtml = pageHtml.replace('</head>', `${jsonLdScript}\n</head>`);

  // Inject Pre-rendered Content into <div id="root"></div>
  pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${prerenderedBody}</div>`);

  writeHtmlForRoute(`/tools/${tool.slug}`, pageHtml);
  renderedCount++;
});

console.log(`Successfully pre-rendered ${renderedCount} tool pages with clean URLs and rich SEO content!`);

/**
 * 2. Pre-render Listing and Static Pages with Full Content
 */

// 2.1 Pre-render /tools (All Tools Directory)
function generateToolsDirectoryHtml(): string {
  let sectionsHtml = '';
  GAMES.forEach(game => {
    const gameTools = TOOLS.filter(t => t.gameId === game.id);
    if (gameTools.length === 0) return;
    
    sectionsHtml += `
      <section class="space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span>${escapeHtml(game.name)}</span>
              <span class="text-xs font-mono font-medium text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/20">${gameTools.length} Tools</span>
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-0.5">${escapeHtml(game.description)}</p>
          </div>
          <a href="/games/${game.slug}" class="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1">Hub Page →</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${gameTools.map(tool => `
            <a href="/tools/${tool.slug}" class="group bg-[#0e1422] border border-slate-800 hover:border-violet-500/50 rounded-xl p-4 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="text-xs font-mono font-semibold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">${escapeHtml(tool.badge || 'Tool')}</span>
                  <span class="text-[11px] text-slate-500 font-mono">${escapeHtml(tool.userCount || '10k+')} users</span>
                </div>
                <h3 class="text-sm font-bold text-white group-hover:text-violet-400 transition-colors mb-1.5">${escapeHtml(tool.name)}</h3>
                <p class="text-xs text-slate-400 leading-relaxed line-clamp-2">${escapeHtml(tool.shortDescription || tool.description)}</p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-violet-400">
                <span>Launch Calculator</span>
                <span>→</span>
              </div>
            </a>
          `).join('')}
        </div>
      </section>
    `;
  });

  return `
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-violet-500 selection:text-black">
      <div>
        ${renderNavHeader('/tools')}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-zinc-400">
              <li><a href="/" class="hover:text-violet-400 transition-colors">Home</a></li>
              <li class="text-zinc-600">/</li>
              <li><span class="text-zinc-200 font-medium">All Tools</span></li>
            </ol>
          </nav>
          <div class="pb-6 border-b border-zinc-800">
            <span class="text-xs font-mono text-violet-400 uppercase tracking-widest font-semibold block mb-2">Comprehensive Directory</span>
            <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">All Gaming Calculators, Generators & Precision Tools</h1>
            <p class="text-sm sm:text-base text-zinc-400 mt-3 max-w-3xl leading-relaxed">
              Explore our complete library of over ${TOOLS.length} specialized gaming calculators, voxel circle generators, nether portal 3D coordinate translators, XP pacers, and economic converters. Engineered with client-side computation for instantaneous results, zero latency, and 100% data privacy.
            </p>
            <div class="flex flex-wrap gap-2 pt-4">
              <a href="/games/minecraft" class="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200">Minecraft (${TOOLS.filter(t => t.gameId === 'minecraft').length})</a>
              <a href="/games/roblox" class="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200">Roblox (${TOOLS.filter(t => t.gameId === 'roblox').length})</a>
              <a href="/games/fortnite" class="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200">Fortnite (${TOOLS.filter(t => t.gameId === 'fortnite').length})</a>
              <a href="/games/pokemongo" class="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200">Pokémon GO (${TOOLS.filter(t => t.gameId === 'pokemongo').length})</a>
              <a href="/games/palworld" class="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200">Palworld (${TOOLS.filter(t => t.gameId === 'palworld').length})</a>
              <a href="/games/genshin" class="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200">Genshin Impact (${TOOLS.filter(t => t.gameId === 'genshin').length})</a>
            </div>
          </div>
          ${sectionsHtml}
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;
}

renderPageTemplate(
  '/tools',
  'All Gaming Calculators, Generators & Precision Utilities | GamingToolsHub',
  'Browse 100+ precision gaming calculators, circle generators, XP estimators, and converters for Minecraft, Roblox, Fortnite, Pokémon GO, and Palworld.',
  generateToolsDirectoryHtml()
);

// 2.2 Pre-render /games (Games Hubs Directory)
function generateGamesHubPageHtml(): string {
  const gamesCardsHtml = GAMES.map(game => {
    const gameTools = TOOLS.filter(t => t.gameId === game.id);
    const topTools = gameTools.slice(0, 4);
    return `
      <div class="bg-[#0e1422] border border-slate-800 hover:border-violet-500/40 rounded-2xl p-6 transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-mono font-bold text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-lg border border-violet-500/30">${gameTools.length} Calculators</span>
            <span class="text-xs font-mono text-slate-500 uppercase tracking-widest">${escapeHtml(game.shortName)}</span>
          </div>
          <h2 class="text-xl font-bold text-white mb-2">${escapeHtml(game.name)}</h2>
          <p class="text-xs text-slate-400 leading-relaxed mb-4">${escapeHtml(game.description)}</p>
          <div class="space-y-2 pt-2 border-t border-slate-800/70">
            <span class="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Featured Tools:</span>
            ${topTools.map(tool => `
              <a href="/tools/${tool.slug}" class="block text-xs font-medium text-slate-300 hover:text-violet-400 transition-colors py-0.5 truncate">
                • ${escapeHtml(tool.name)}
              </a>
            `).join('')}
          </div>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-800/80">
          <a href="/games/${game.slug}" class="w-full text-center block px-4 py-2 bg-violet-500/10 hover:bg-violet-500 text-violet-400 hover:text-black font-semibold text-xs rounded-xl transition-all">
            Open ${escapeHtml(game.name)} Hub (${gameTools.length} Tools) →
          </a>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-violet-500 selection:text-black">
      <div>
        ${renderNavHeader('/games')}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-zinc-400">
              <li><a href="/" class="hover:text-violet-400 transition-colors">Home</a></li>
              <li class="text-zinc-600">/</li>
              <li><span class="text-zinc-200 font-medium">Games</span></li>
            </ol>
          </nav>
          <div class="pb-6 border-b border-zinc-800">
            <span class="text-xs font-mono text-violet-400 uppercase tracking-widest font-semibold block mb-2">Game Knowledge Centers</span>
            <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Gaming Hubs & Tool Suites by Game</h1>
            <p class="text-sm sm:text-base text-zinc-400 mt-3 max-w-3xl leading-relaxed">
              Access comprehensive toolkits and math engines organized by game. Whether you are calculating 8:1 nether portal coordinates in Minecraft, calculating the 30% developer tax in Roblox, planning season Battle Pass XP in Fortnite, evaluating Pokémon GO PvP IV stat products, or finding Palworld CombiRank breeding combos.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${gamesCardsHtml}
          </div>
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;
}

renderPageTemplate(
  '/games',
  'Gaming Hubs & Tools by Game | GamingToolsHub',
  'Explore comprehensive toolkits, math engines, and converters organized by game: Minecraft, Roblox, Fortnite, Pokémon GO, and Palworld.',
  generateGamesHubPageHtml()
);

// 2.3 Pre-render /categories (Tools by Category)
function generateCategoriesPageHtml(): string {
  const categoriesHtml = CATEGORIES.map(category => {
    const categoryTools = TOOLS.filter(t => t.categoryId === category.id);
    return `
      <section class="space-y-4">
        <div class="border-b border-slate-800 pb-3">
          <div class="flex items-center gap-3">
            <h2 class="text-xl sm:text-2xl font-bold text-white">${escapeHtml(category.name)}</h2>
            <span class="text-xs font-mono font-medium text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/20">${categoryTools.length} Utilities</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">${escapeHtml(category.description)}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${categoryTools.map(tool => {
            const game = getGameById(tool.gameId);
            return `
              <a href="/tools/${tool.slug}" class="group bg-[#0e1422] border border-slate-800 hover:border-violet-500/50 rounded-xl p-4 transition-all flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="text-[11px] font-mono text-slate-400">${escapeHtml(game?.name || 'Universal')}</span>
                    <span class="text-xs font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">${escapeHtml(tool.badge || 'Tool')}</span>
                  </div>
                  <h3 class="text-sm font-bold text-white group-hover:text-violet-400 transition-colors mb-1.5">${escapeHtml(tool.name)}</h3>
                  <p class="text-xs text-slate-400 leading-relaxed line-clamp-2">${escapeHtml(tool.shortDescription || tool.description)}</p>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-violet-400">
                  <span>Open Tool</span>
                  <span>→</span>
                </div>
              </a>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }).join('');

  return `
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-violet-500 selection:text-black">
      <div>
        ${renderNavHeader('/categories')}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-zinc-400">
              <li><a href="/" class="hover:text-violet-400 transition-colors">Home</a></li>
              <li class="text-zinc-600">/</li>
              <li><span class="text-zinc-200 font-medium">Categories</span></li>
            </ol>
          </nav>
          <div class="pb-6 border-b border-zinc-800">
            <span class="text-xs font-mono text-violet-400 uppercase tracking-widest font-semibold block mb-2">Functionality Directory</span>
            <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Gaming Tools by Category – Calculators, Generators & Planners</h1>
            <p class="text-sm sm:text-base text-zinc-400 mt-3 max-w-3xl leading-relaxed">
              Browse precision gaming tools organized by operational function. Whether you need mathematical calculators for in-game economy, voxel blueprint generators for architectural projects, coordinate converters, progression planners, or randomized decision wheels, find the exact utility for your gaming session below.
            </p>
          </div>
          ${categoriesHtml}
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;
}

renderPageTemplate(
  '/categories',
  'Gaming Tools by Category – Calculators, Generators & Planners | GamingToolsHub',
  'Filter gaming tools by category: Calculators, Generators, Converters, Planners, and Trackers.',
  generateCategoriesPageHtml()
);

// 2.4 Pre-render Individual Game Hub Pages
function generateSingleGameHubHtml(gameId: string): string {
  const game = getGameById(gameId);
  if (!game) return '';
  const gameTools = TOOLS.filter(t => t.gameId === gameId);

  return `
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-violet-500 selection:text-black">
      <div>
        ${renderNavHeader(game.slug)}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-zinc-400">
              <li><a href="/" class="hover:text-violet-400 transition-colors">Home</a></li>
              <li class="text-zinc-600">/</li>
              <li><a href="/games" class="hover:text-violet-400 transition-colors">Games</a></li>
              <li class="text-zinc-600">/</li>
              <li><span class="text-zinc-200 font-medium">${escapeHtml(game.name)}</span></li>
            </ol>
          </nav>
          <div class="pb-6 border-b border-zinc-800">
            <div class="flex items-center gap-2 mb-2 text-xs font-mono">
              <span class="text-violet-400 font-bold bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">${gameTools.length} Verified Tools</span>
              <span class="text-slate-600">·</span>
              <span class="text-slate-400">Zero Server Lag</span>
              <span class="text-slate-600">·</span>
              <span class="text-slate-400">100% Free Client-Side</span>
            </div>
            <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">${escapeHtml(game.name)} Calculators, Generators & Blueprint Tools</h1>
            <p class="text-sm sm:text-base text-zinc-400 mt-3 max-w-3xl leading-relaxed">${escapeHtml(game.description)}</p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div class="bg-[#0e1422] border border-slate-800 rounded-xl p-3 text-center">
                <span class="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Calculators</span>
                <span class="text-lg font-bold text-white font-mono">${gameTools.length}</span>
              </div>
              <div class="bg-[#0e1422] border border-slate-800 rounded-xl p-3 text-center">
                <span class="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Accuracy</span>
                <span class="text-lg font-bold text-violet-400 font-mono">100% Exact</span>
              </div>
              <div class="bg-[#0e1422] border border-slate-800 rounded-xl p-3 text-center">
                <span class="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Execution</span>
                <span class="text-lg font-bold text-cyan-400 font-mono">Client-Side</span>
              </div>
              <div class="bg-[#0e1422] border border-slate-800 rounded-xl p-3 text-center">
                <span class="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Platform</span>
                <span class="text-lg font-bold text-indigo-400 font-mono">All Devices</span>
              </div>
            </div>
          </div>

          <!-- Tools Grid -->
          <section class="space-y-4">
            <h2 class="text-xl font-bold text-white">All ${escapeHtml(game.name)} Calculators & Utilities (${gameTools.length})</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              ${gameTools.map(tool => `
                <a href="/tools/${tool.slug}" class="group bg-[#0e1422] border border-slate-800 hover:border-violet-500/50 rounded-xl p-5 transition-all flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-2">
                      <span class="text-xs font-mono font-semibold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">${escapeHtml(tool.badge || 'Tool')}</span>
                      <span class="text-[11px] text-slate-500 font-mono">${escapeHtml(tool.userCount || '10k+')} users</span>
                    </div>
                    <h3 class="text-base font-bold text-white group-hover:text-violet-400 transition-colors mb-2">${escapeHtml(tool.name)}</h3>
                    <p class="text-xs text-slate-400 leading-relaxed line-clamp-3">${escapeHtml(tool.shortDescription || tool.description)}</p>
                  </div>
                  <div class="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-violet-400">
                    <span>Use ${escapeHtml(tool.name)}</span>
                    <span>→</span>
                  </div>
                </a>
              `).join('')}
            </div>
          </section>

          <!-- Hub Informative Section -->
          <section class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 class="text-lg sm:text-xl font-bold text-white">Why Use GamingToolsHub for ${escapeHtml(game.name)}?</h2>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our ${escapeHtml(game.name)} tool suite is designed from the ground up for technical players, survival builders, competitive gamers, and theorycrafters. Unlike slow ad-bloated sites, GamingToolsHub runs entirely inside your browser. No server requests, no tracking of personal coordinates or private calculation variables, and instant reactivity on desktop and mobile.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div class="bg-[#090d16] border border-slate-800/80 rounded-xl p-4">
                <h3 class="text-xs font-bold text-slate-200 mb-1">Instant Computation</h3>
                <p class="text-xs text-slate-400">Zero wait times. Formulas compute dynamically as you type with zero network lag.</p>
              </div>
              <div class="bg-[#090d16] border border-slate-800/80 rounded-xl p-4">
                <h3 class="text-xs font-bold text-slate-200 mb-1">Verified Game Math</h3>
                <p class="text-xs text-slate-400">Formulas cross-referenced against official patch notes and decompiled mechanics.</p>
              </div>
              <div class="bg-[#090d16] border border-slate-800/80 rounded-xl p-4">
                <h3 class="text-xs font-bold text-slate-200 mb-1">100% Free Forever</h3>
                <p class="text-xs text-slate-400">No paywalls, subscriptions, or feature locks. Free access for every gamer.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;
}

const gameHubConfigs: {
  id: string;
  slug: string;
  aliases: string[];
  title?: string;
  description?: string;
}[] = [
  {
    id: 'minecraft',
    slug: 'minecraft',
    aliases: ['/minecraft'],
    title: 'Minecraft Calculators, Generators & Blueprint Tools | GamingToolsHub',
    description: 'Pixel-perfect circle generators, 3D sphere planners, nether portal 8:1 linkers, XP formulas, and anvil cost calculators for Minecraft.',
  },
  {
    id: 'roblox',
    slug: 'roblox',
    aliases: ['/roblox'],
    title: 'Roblox Calculators – Robux Tax, DevEx & Blox Fruits Tools | GamingToolsHub',
    description: '30% Robux tax calculators, official DevEx cashout estimators, developer earnings, and Blox Fruits trading calculators.',
  },
  {
    id: 'fortnite',
    slug: 'fortnite',
    aliases: ['/fortnite'],
    title: 'Fortnite Battle Pass XP & Sensitivity Calculators | GamingToolsHub',
    description: 'Season level pacers, 80k XP Battle Pass target calculators, mouse sensitivity converters, and eDPI estimators for Fortnite.',
  },
  {
    id: 'pokemongo',
    slug: 'pokemongo',
    aliases: ['/pokemongo'],
    title: 'Pokémon GO CP, IV & Evolution Calculators | GamingToolsHub',
    description: 'Accurate CP multipliers, raid catch IV appraisals, Great League PvP stat product optimizers, and Stardust powerup cost planners.',
  },
  {
    id: 'palworld',
    slug: 'palworld',
    aliases: ['/palworld'],
    title: 'Palworld Breeding & Stat Calculators | GamingToolsHub',
    description: 'Breeding combination calculators, reverse lineage search, IV calculators, and condensation requirements for Palworld.',
  },
  {
    id: 'genshin',
    slug: 'genshin',
    aliases: ['/genshin'],
    title: 'Genshin Impact Calculators & Pity Planners | GamingToolsHub',
    description: 'Wish pity estimators, Primogem planners, resin refill timers, and artifact crit value calculators for Genshin Impact.',
  },
  {
    id: 'helldivers2',
    slug: 'helldivers-2',
    aliases: ['/helldivers-2', '/helldivers2'],
    title: 'Helldivers 2 Damage & Breakpoint Calculators | GamingToolsHub',
    description: 'Precision ballistics, weapon TTK, shots-to-kill breakpoints, and enemy weak spot multipliers for Helldivers 2.',
  },
  {
    id: 'ps99',
    slug: 'ps99',
    aliases: ['/ps99', '/pet-simulator-99'],
    title: 'Pet Simulator 99 Calculators & Tools | GamingToolsHub',
    description: 'Verified Pet Simulator 99 trading calculators: WFL trade calculators, Exclusive Daycare earnings, and RAP price alerts.',
  },
  {
    id: 'fps',
    slug: 'fps',
    aliases: ['/fps'],
    title: 'FPS & Aim Esports Calculators & Tools | GamingToolsHub',
    description: 'Universal mouse sensitivity converter, eDPI rankings, crosshair code generators, and reaction benchmarks.',
  },
  {
    id: 'esports',
    slug: 'esports',
    aliases: ['/esports'],
    title: 'Esports & Competitive Gaming Tools | GamingToolsHub',
    description: 'Team generators, MMR balancers, and scrim roster organizers for competitive FPS and MOBA games.',
  },
  {
    id: 'tfd',
    slug: 'the-first-descendant',
    aliases: ['/the-first-descendant', '/tfd'],
    title: 'The First Descendant Calculators & Tools | GamingToolsHub',
    description: 'Weapon DPS calculators, Descendant skill damage simulators, reactor checkers, and module capacity optimizers for The First Descendant.',
  },
  {
    id: 'oncehuman',
    slug: 'once-human',
    aliases: ['/once-human', '/oncehuman'],
    title: 'Once Human Calculators & Build Tools | GamingToolsHub',
    description: 'Blueprint star upgrades, acid farm calculators, weapon calibration tuning, and cradle override planners for Once Human.',
  },
  {
    id: 'wuwa',
    slug: 'wuthering-waves',
    aliases: ['/wuthering-waves', '/wuwa'],
    title: 'Wuthering Waves Calculators & Build Tools | GamingToolsHub',
    description: 'Echo tuning evaluator, 80 pity Astrite planner, resonance chain multipliers, and resonator ascension material calculators for Wuthering Waves.',
  },
  {
    id: 'zzz',
    slug: 'zenless-zone-zero',
    aliases: ['/zenless-zone-zero', '/zzz'],
    title: 'Zenless Zone Zero Calculators & Build Tools | GamingToolsHub',
    description: 'Drive disc build optimizer, polychrome banner pity planner, daze stun multiplier calculator, and W-engine comparison for Zenless Zone Zero.',
  },
  {
    id: 'typesoul',
    slug: 'type-soul',
    aliases: ['/type-soul', '/typesoul', '/roblox-type-soul'],
    title: 'Roblox Type Soul Calculators & Build Tools | GamingToolsHub',
    description: 'Stat skill tree allocator, grade requirements, Bankai/Resurrección trackers, raid drop checkers, and clan simulators for Roblox Type Soul.',
  },
  {
    id: 'bg3',
    slug: 'baldurs-gate-3',
    aliases: ['/baldurs-gate-3', '/bg3'],
    title: 'Baldur\'s Gate 3 Tools & Calculators | GamingToolsHub',
    description: 'Multiclass spell builder, d20 dice roll probability calculator, 3:1 alchemy recipe finder, and AC tank optimizer for Baldur\'s Gate 3.',
  },
  {
    id: 'lethalcompany',
    slug: 'lethal-company',
    aliases: ['/lethal-company', '/lethalcompany', '/content-warning', '/contentwarning'],
    title: 'Lethal Company & Content Warning Tools Hub | GamingToolsHub',
    description: 'Quota profit margin matrix, scrap value calculators, monster danger rating, and SpookTube views calculator for Lethal Company.',
  },
  {
    id: 'starfield',
    slug: 'starfield',
    aliases: ['/starfield'],
    title: 'Starfield Tools & Calculators | GamingToolsHub',
    description: 'Shipbuilder cost & cargo weight calculator, outpost supply line planner, 82-skill tree allocator, and planet scan checklist for Starfield.',
  },
  {
    id: 'enshrouded',
    slug: 'enshrouded',
    aliases: ['/enshrouded'],
    title: 'Enshrouded Tools & Calculators | GamingToolsHub',
    description: 'Flame altar upgrade costs, building block material requirements, survivor recipe finder, and comfort rested buff timer for Enshrouded.',
  },
  {
    id: 'nightingale',
    slug: 'nightingale',
    aliases: ['/nightingale'],
    title: 'Nightingale Tools & Calculators | GamingToolsHub',
    description: 'Realm card crafting matrix, minor card modifier simulator, gear score calculator, and material stats optimizer for Nightingale.',
  },
  {
    id: 'crk',
    slug: 'cookie-run-kingdom',
    aliases: ['/cookie-run-kingdom', '/crk'],
    title: 'Cookie Run: Kingdom Tools Hub | GamingToolsHub',
    description: 'Team builder, topping optimizer, production chain planner, cookie skill upgrade calculator, and gacha pity planner for Cookie Run: Kingdom.',
  },
  {
    id: 'afkj',
    slug: 'afk-journey',
    aliases: ['/afk-journey', '/afkj'],
    title: 'AFK Journey Tools Hub | GamingToolsHub',
    description: 'Dream realm daily boss planner, hero ascension & acorn calculator, hero essence dust planner, and wishlist summon calculator for AFK Journey.',
  },
  {
    id: 'mogo',
    slug: 'monopoly-go',
    aliases: ['/monopoly-go', '/mogo', '/monopolygo'],
    title: 'Monopoly GO Tools Hub | GamingToolsHub',
    description: 'Sticker tracker, trade matcher, verified daily free dice links, flash event schedule timers, and board upgrade cost planner for Monopoly GO.',
  },
  {
    id: 'sk',
    slug: 'seven-knights-rebirth',
    aliases: ['/seven-knights-rebirth', '/sk'],
    title: 'Seven Knights Re:BIRTH Tools Hub | GamingToolsHub',
    description: 'Damage calculator, gear sell/keep valuator, 5v5 team builder, ruby income planner, shop bundle optimizer, and gacha pity simulator.',
  },
  {
    id: 'cm',
    slug: 'coin-master',
    aliases: ['/coin-master', '/cm'],
    title: 'Coin Master Tools Hub | GamingToolsHub',
    description: 'Village cost calculator, verified free spin links, card set tracker, event timer planner, and companion pet timer for Coin Master.',
  },
  {
    id: 'growagarden',
    slug: 'grow-a-garden',
    aliases: ['/grow-a-garden', '/growagarden'],
    title: 'Grow a Garden Calculators & Tools | GamingToolsHub',
    description: 'Calculate crop Sheckle sell values, weight scaling factors, variant multipliers, environmental mutation brackets, and friend boost bonuses in Roblox Grow a Garden.',
  },
  {
    id: 'general',
    slug: 'general',
    aliases: ['/general'],
    title: 'Gaming Utilities & Decision Wheels | GamingToolsHub',
    description: 'Random decision makers, challenge pickers, drop spot randomizers, and team draft wheels for gaming nights.',
  }
];

gameHubConfigs.forEach(cfg => {
  const game = getGameById(cfg.id);
  const title = cfg.title || `${game?.name || cfg.id} Calculators & Tools | GamingToolsHub`;
  const description = cfg.description || game?.description || '';
  const canonicalPath = `/games/${cfg.slug}`;
  const html = generateSingleGameHubHtml(cfg.id);

  // 1. Render primary game hub path at /games/<slug>
  renderPageTemplate(`/games/${cfg.slug}`, title, description, html, undefined, canonicalPath);

  // 2. Render all alias paths with canonicalPath forced to /games/<slug>
  cfg.aliases.forEach(alias => {
    if (alias !== `/games/${cfg.slug}`) {
      renderPageTemplate(alias, title, description, html, undefined, canonicalPath);
    }
  });
});

// 2.5 Pre-render /about
function generateAboutPageHtml(): string {
  return `
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-violet-500 selection:text-black">
      <div>
        ${renderNavHeader()}
        <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-zinc-400">
              <li><a href="/" class="hover:text-violet-400 transition-colors">Home</a></li>
              <li class="text-zinc-600">/</li>
              <li><span class="text-zinc-200 font-medium">About Us</span></li>
            </ol>
          </nav>
          <div class="pb-6 border-b border-zinc-800">
            <span class="text-xs font-mono text-violet-400 uppercase tracking-widest font-semibold block mb-2">Our Mission</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">About GamingToolsHub</h1>
            <p class="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
              GamingToolsHub is an open, independent digital utility hub created for competitive players, survival architects, speedrunners, and developers who need instant, mathematically precise gaming calculations without the intrusive clutter of traditional gaming blogs.
            </p>
          </div>

          <div class="space-y-6 text-sm text-slate-300 leading-relaxed">
            <div class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-3">
              <h2 class="text-xl font-bold text-white">Why GamingToolsHub Exists</h2>
              <p>For years, gamers looking for simple calculators—like a Minecraft circle template, a 30% Robux tax calculation, or a Fortnite mouse sensitivity converter—have been subjected to slow-loading websites buried under endless clickbait text, intrusive popups, and broken math formulas.</p>
              <p>We built GamingToolsHub to change that standard: clean, modern interfaces, dark-mode by default, instant responsive calculations, and deep-dive technical documentation for players who want to understand the exact mathematical formulas driving their gameplay.</p>
            </div>

            <div class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 class="text-xl font-bold text-white">Core Architectural Principles</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div class="bg-[#090d16] border border-slate-800/80 rounded-xl p-4">
                  <h3 class="text-sm font-bold text-violet-400 mb-1">1. Client-Side Speed</h3>
                  <p class="text-xs text-slate-400">Every single calculator runs entirely in your browser using optimized JavaScript algorithms. There are no server roundtrips, meaning zero lag even on high-latency mobile connections.</p>
                </div>
                <div class="bg-[#090d16] border border-slate-800/80 rounded-xl p-4">
                  <h3 class="text-sm font-bold text-violet-400 mb-1">2. Absolute Data Privacy</h3>
                  <p class="text-xs text-slate-400">We do not store your private base coordinates, breeding combinations, user inputs, or inventory data on any database. Your game data remains strictly on your device.</p>
                </div>
                <div class="bg-[#090d16] border border-slate-800/80 rounded-xl p-4">
                  <h3 class="text-sm font-bold text-violet-400 mb-1">3. Verified Mathematical Accuracy</h3>
                  <p class="text-xs text-slate-400">All algorithms are verified against official game APIs, datamined files, and decompiled source code across Minecraft, Roblox, Fortnite, Pokémon GO, and Palworld.</p>
                </div>
                <div class="bg-[#090d16] border border-slate-800/80 rounded-xl p-4">
                  <h3 class="text-sm font-bold text-violet-400 mb-1">4. Community-First Development</h3>
                  <p class="text-xs text-slate-400">Every calculator is updated rapidly when new game patches release, ensuring our formulas reflect the latest meta, balance changes, and game versions.</p>
                </div>
              </div>
            </div>

            <div class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-3">
              <h2 class="text-xl font-bold text-white">Explore Our Gaming Centers</h2>
              <p>Jump directly into our specialized game centers to find the tools you need:</p>
              <div class="flex flex-wrap gap-2 pt-2">
                <a href="/games/minecraft" class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold">Minecraft Hub →</a>
                <a href="/games/roblox" class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold">Roblox Hub →</a>
                <a href="/games/fortnite" class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold">Fortnite Hub →</a>
                <a href="/games/pokemongo" class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold">Pokémon GO Hub →</a>
                <a href="/games/palworld" class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold">Palworld Hub →</a>
                <a href="/tools" class="px-3.5 py-1.5 bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded-lg text-xs font-semibold hover:bg-violet-500 hover:text-black">All Tools Directory →</a>
              </div>
            </div>
          </div>
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;
}

renderPageTemplate(
  '/about',
  'About GamingToolsHub – Precision Gaming Utilities',
  'Learn about GamingToolsHub: fast, accurate, client-side gaming calculators built by passionate gamers.',
  generateAboutPageHtml()
);

// 2.6 Pre-render /privacy
function generatePrivacyPolicyHtml(): string {
  return `
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-violet-500 selection:text-black">
      <div>
        ${renderNavHeader()}
        <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-zinc-400">
              <li><a href="/" class="hover:text-violet-400 transition-colors">Home</a></li>
              <li class="text-zinc-600">/</li>
              <li><span class="text-zinc-200 font-medium">Privacy Policy</span></li>
            </ol>
          </nav>
          <div class="pb-6 border-b border-zinc-800">
            <span class="text-xs font-mono text-violet-400 uppercase tracking-widest font-semibold block mb-2">Legal Compliance</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
            <p class="text-xs text-slate-500 mt-2 font-mono">Last updated: January 2026 • Effective Date: January 1, 2026</p>
          </div>

          <div class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">1. Commitment to Privacy</h2>
              <p>At GamingToolsHub (accessible at https://gamingtoolshub.com), the privacy of our visitors is of paramount importance. This Privacy Policy document outlines the types of information that is collected and recorded by GamingToolsHub and how we use it.</p>
            </section>

            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">2. Information We Do NOT Collect</h2>
              <p>GamingToolsHub is built on a client-side architecture. When you enter coordinates in our Nether Portal Linker, input Robux amounts into our Tax Calculator, configure mouse sensitivity, or search Palworld breeding lineages, that data is processed solely within your browser's local memory (RAM). We do NOT transmit, log, store, or sell your calculation inputs or game data.</p>
            </section>

            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">3. Cookies and Web Beacons</h2>
              <p>Like any other website, GamingToolsHub uses cookies to store information including visitors' preferences and the pages on the website that the visitor accessed or visited. The information is used to optimize user experience by customizing our web page content based on visitors' browser type and device configuration.</p>
            </section>

            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">4. Google Analytics & Log Files</h2>
              <p>GamingToolsHub follows a standard procedure of using log files and Google Analytics 4 (GA4). These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</p>
            </section>

            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">5. Advertising Partners</h2>
              <p>Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on GamingToolsHub. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
              <p>GamingToolsHub has no access to or control over these cookies that are used by third-party advertisers.</p>
            </section>

            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">6. Children's Information</h2>
              <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. GamingToolsHub does not knowingly collect any Personal Identifiable Information from children under the age of 13.</p>
            </section>

            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">7. Consent</h2>
              <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
            </section>
          </div>
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;
}

renderPageTemplate(
  '/privacy',
  'Privacy Policy | GamingToolsHub',
  'Privacy policy for GamingToolsHub. We do not store or sell your personal gaming calculations.',
  generatePrivacyPolicyHtml()
);

// 2.7 Pre-render /terms
function generateTermsPageHtml(): string {
  return `
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-violet-500 selection:text-black">
      <div>
        ${renderNavHeader()}
        <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-zinc-400">
              <li><a href="/" class="hover:text-violet-400 transition-colors">Home</a></li>
              <li class="text-zinc-600">/</li>
              <li><span class="text-zinc-200 font-medium">Terms of Service</span></li>
            </ol>
          </nav>
          <div class="pb-6 border-b border-zinc-800">
            <span class="text-xs font-mono text-violet-400 uppercase tracking-widest font-semibold block mb-2">Terms & Conditions</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Terms of Service</h1>
            <p class="text-xs text-slate-500 mt-2 font-mono">Last updated: January 2026 • Effective Date: January 1, 2026</p>
          </div>

          <div class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">1. Agreement to Terms</h2>
              <p>By accessing or using GamingToolsHub (https://gamingtoolshub.com), you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions of this agreement, you must discontinue using our tools and services immediately.</p>
            </section>

            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">2. Free & Permitted Personal Use</h2>
              <p>GamingToolsHub grants you a personal, non-exclusive, non-transferable, revocable license to access and use our calculators, circle generators, and utilities for personal, recreational, educational, and non-commercial purposes. You may use our tools during live gameplay, streaming broadcasts, or esports competitions.</p>
            </section>

            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">3. Accuracy of Calculations & Disclaimers</h2>
              <p>While we exert every reasonable effort to ensure mathematical accuracy, game formulas may be altered by game developers during software updates, balance patches, or network adjustments without prior notice. The tools and information on GamingToolsHub are provided on an "as is" and "as available" basis without warranties of any kind.</p>
            </section>

            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">4. Intellectual Property Rights</h2>
              <p>The code, design system, layouts, graphics, and original educational articles on GamingToolsHub are the intellectual property of GamingToolsHub. All third-party video game titles, characters, logos, and registered trademarks belong to their respective copyright and trademark owners.</p>
            </section>

            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">5. Limitation of Liability</h2>
              <p>Under no circumstances shall GamingToolsHub, its operators, or contributors be held liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use our tools, including in-game asset loss or calculation discrepancies.</p>
            </section>
          </div>
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;
}

renderPageTemplate(
  '/terms',
  'Terms of Service | GamingToolsHub',
  'Terms of service and acceptable usage guidelines for GamingToolsHub.',
  generateTermsPageHtml()
);

// 2.8 Pre-render /disclaimer
function generateDisclaimerPageHtml(): string {
  return `
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-violet-500 selection:text-black">
      <div>
        ${renderNavHeader()}
        <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-zinc-400">
              <li><a href="/" class="hover:text-violet-400 transition-colors">Home</a></li>
              <li class="text-zinc-600">/</li>
              <li><span class="text-zinc-200 font-medium">Disclaimer & Trademarks</span></li>
            </ol>
          </nav>
          <div class="pb-6 border-b border-zinc-800">
            <span class="text-xs font-mono text-violet-400 uppercase tracking-widest font-semibold block mb-2">Legal Notices</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Disclaimer & Trademark Notices</h1>
            <p class="text-xs text-slate-500 mt-2 font-mono">Last updated: January 2026</p>
          </div>

          <div class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">Independent Fan & Community Resource</h2>
              <p>GamingToolsHub is an independent gaming resource created for informational, educational, and computational assistance. GamingToolsHub is NOT affiliated with, sponsored by, endorsed by, or approved by any video game developer or publisher mentioned on this site.</p>
            </section>

            <section class="space-y-3">
              <h2 class="text-lg font-bold text-white">Trademark Disclosures</h2>
              <ul class="space-y-2 list-disc list-inside text-slate-400">
                <li><strong class="text-slate-200">Minecraft:</strong> Minecraft is a registered trademark of Mojang AB and Microsoft Corporation. GamingToolsHub is not an official Minecraft product and is not approved by or associated with Mojang or Microsoft.</li>
                <li><strong class="text-slate-200">Roblox:</strong> Roblox, Robux, and the Roblox logo are registered trademarks of Roblox Corporation. GamingToolsHub is not associated with or endorsed by Roblox Corporation.</li>
                <li><strong class="text-slate-200">Fortnite:</strong> Fortnite and Unreal Engine are registered trademarks of Epic Games, Inc. in the United States and elsewhere.</li>
                <li><strong class="text-slate-200">Pokémon GO:</strong> Pokémon and Pokémon character names are trademarks of Nintendo, Creatures Inc., and GAME FREAK inc. Pokémon GO is developed and published by Niantic, Inc.</li>
                <li><strong class="text-slate-200">Palworld:</strong> Palworld is developed and published by Pocketpair, Inc. All game assets and character names are trademarks of Pocketpair, Inc.</li>
                <li><strong class="text-slate-200">Genshin Impact:</strong> Genshin Impact is a registered trademark of HoYoverse / Cognosphere Pte. Ltd.</li>
              </ul>
            </section>

            <section class="space-y-2">
              <h2 class="text-lg font-bold text-white">Fair Use Statement</h2>
              <p>The use of game titles, character names, and gameplay terminology on GamingToolsHub is strictly for descriptive, identificatory, and educational reference under the doctrine of Fair Use (17 U.S. Code § 107).</p>
            </section>
          </div>
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;
}

renderPageTemplate(
  '/disclaimer',
  'Disclaimer | GamingToolsHub',
  'Legal disclaimer and trademark notices for GamingToolsHub.',
  generateDisclaimerPageHtml()
);

// 2.9 Pre-render / (Homepage)
function generateHomePageHtml(): string {
  const featuredTools = TOOLS.filter(t => t.featured || ['minecraft-circle-generator', 'minecraft-3d-portal-linker', 'roblox-tax-calculator', 'palworld-breeding-calculator', 'pokemon-go-cp-calculator', 'universal-mouse-sensitivity-converter'].includes(t.slug)).slice(0, 6);

  const gameHubsCards = GAMES.map(g => {
    const count = TOOLS.filter(t => t.gameId === g.id).length;
    return `
      <a href="/games/${g.slug}" class="group bg-[#0e1422] border border-slate-800 hover:border-violet-500/50 rounded-xl p-4 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-mono font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">${count} Tools</span>
          <span class="text-xs text-slate-500">→</span>
        </div>
        <h3 class="text-sm font-bold text-white group-hover:text-violet-400 transition-colors">${escapeHtml(g.name)}</h3>
        <p class="text-xs text-slate-400 mt-1 line-clamp-2">${escapeHtml(g.tagline)}</p>
      </a>
    `;
  }).join('');

  return `
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-violet-500 selection:text-black">
      <div>
        ${renderNavHeader('/')}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12">
          <!-- Hero Section -->
          <div class="text-center max-w-3xl mx-auto pt-4 sm:pt-8 space-y-4">
            <span class="inline-block text-xs font-mono font-bold text-violet-400 bg-violet-500/10 border border-violet-500/30 px-3 py-1 rounded-full uppercase tracking-wider">Zero Lag • 100% Free • Verified Math</span>
            <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">Precision Gaming Calculators & Blueprint Generators</h1>
            <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
              Fast, browser-based gaming tools with instant client-side calculation. Pixel-perfect Minecraft circle builders, 8:1 nether portal linkers, 30% Robux tax models, Pokémon GO PvP rankings, and Palworld breeding calculators.
            </p>
            <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a href="/tools" class="px-5 py-2.5 bg-violet-500 hover:bg-violet-400 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-violet-500/20">Explore All ${TOOLS.length} Tools →</a>
              <a href="/games" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all border border-slate-700">Browse by Game</a>
            </div>
          </div>

          <!-- Featured Tools -->
          <section class="space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 class="text-xl font-bold text-white flex items-center gap-2">
                <span>Featured Gaming Utilities</span>
                <span class="text-xs font-mono font-medium text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/20">Popular</span>
              </h2>
              <a href="/tools" class="text-xs font-semibold text-violet-400 hover:text-violet-300">View All →</a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              ${featuredTools.map(tool => `
                <a href="/tools/${tool.slug}" class="group bg-[#0e1422] border border-slate-800 hover:border-violet-500/50 rounded-xl p-5 transition-all flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-2">
                      <span class="text-xs font-mono font-semibold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">${escapeHtml(tool.badge || 'Popular')}</span>
                      <span class="text-[11px] text-slate-500 font-mono">${escapeHtml(tool.userCount || '25k+')} users</span>
                    </div>
                    <h3 class="text-base font-bold text-white group-hover:text-violet-400 transition-colors mb-2">${escapeHtml(tool.name)}</h3>
                    <p class="text-xs text-slate-400 leading-relaxed line-clamp-3">${escapeHtml(tool.shortDescription || tool.description)}</p>
                  </div>
                  <div class="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-violet-400">
                    <span>Launch Calculator</span>
                    <span>→</span>
                  </div>
                </a>
              `).join('')}
            </div>
          </section>

          <!-- Game Hubs Grid -->
          <section class="space-y-4">
            <div class="border-b border-slate-800 pb-3">
              <h2 class="text-xl font-bold text-white">Popular Game Centers</h2>
              <p class="text-xs sm:text-sm text-slate-400 mt-0.5">Explore full tool suites organized by your favorite games.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              ${gameHubsCards}
            </div>
          </section>
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;
}

renderPageTemplate(
  '/',
  'GamingToolsHub - Precision Gaming Calculators, Generators & Utilities',
  'Fast gaming calculators and blueprint generators for Minecraft, Roblox, Fortnite, Pokémon GO, and Palworld. Instant math, zero server lag, and 100% free.',
  generateHomePageHtml()
);

/**
 * 2.5 Pre-render Game Codes Directory (/codes) & Detail Pages (/codes/:slug)
 */
function generateCodesIndexHtml(): string {
  const sorted = [...CODES_PAGES].sort((a, b) => {
    const kindOrder = { codes: 0, links: 1, status: 2 };
    if (kindOrder[a.kind] !== kindOrder[b.kind]) {
      return kindOrder[a.kind] - kindOrder[b.kind];
    }
    if (a.kind === 'codes' && b.kind === 'codes') {
      return b.codes.length - a.codes.length;
    }
    return a.gameName.localeCompare(b.gameName);
  });

  const cardsHtml = sorted.map(entry => {
    let badgeText = '';
    let badgeClass = '';
    if (entry.kind === 'codes') {
      badgeText = `${entry.codes.length} active codes`;
      badgeClass = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    } else if (entry.kind === 'links') {
      badgeText = 'Free daily links';
      badgeClass = 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
    } else {
      badgeText = 'Codes status';
      badgeClass = 'bg-amber-500/10 text-amber-300 border-amber-500/30';
    }

    return `
      <a href="/codes/${entry.slug}" class="block p-5 rounded-2xl bg-[#0c122e] border border-indigo-900/60 hover:border-violet-500/50 transition-all group">
        <div class="flex items-center justify-between gap-3 mb-3">
          <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${badgeClass}">
            ${badgeText}
          </span>
          <span class="text-[11px] font-mono text-slate-400">
            Checked ${escapeHtml(entry.lastChecked)}
          </span>
        </div>
        <h2 class="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
          ${escapeHtml(entry.gameName)}
        </h2>
        <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
          ${escapeHtml(entry.intro)}
        </p>
        <div class="pt-3 border-t border-indigo-950/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-amber-300">
          <span>View Codes & Guides</span>
          <span>→</span>
        </div>
      </a>
    `;
  }).join('');

  return `
    <div class="min-h-screen bg-[#070b19] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      <div>
        ${renderNavHeader('/codes')}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-slate-400">
              <li><a href="/" class="hover:text-white transition-colors">Home</a></li>
              <li class="text-slate-600">/</li>
              <li><span class="text-slate-200 font-medium">Game Codes</span></li>
            </ol>
          </nav>
          <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-[#0c122e] to-[#070b19] border border-amber-500/30">
            <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Game Codes — Free Redeem Codes & Daily Links
            </h1>
            <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Verified working redeem codes, 2x EXP boosts, stat resets and daily free reward links. Tested and checked daily with zero clickbait.
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            ${cardsHtml}
          </div>
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;
}

renderPageTemplate(
  '/codes',
  'Game Codes — Free Redeem Codes & Daily Links (November 2026) | GamingToolsHub',
  'Active redeem codes and free daily links for Blox Fruits, Type Soul, Monopoly GO and more. Verified and checked daily with zero spam.',
  generateCodesIndexHtml()
);

// Detail pages for each CODES_PAGES entry
CODES_PAGES.forEach(entry => {
  let pageTitle = `${entry.gameName} Codes — All Active Codes (November 2026) | GamingToolsHub`;
  let pageH1 = `${entry.gameName} Codes (November 2026)`;
  if (entry.kind === 'links') {
    let suffix = 'Free Links Today';
    if (entry.slug === 'monopoly-go') suffix = 'Free Dice Links Today';
    if (entry.slug === 'coin-master') suffix = 'Free Spins Links Today';
    pageH1 = `${entry.gameName} ${suffix}`;
    pageTitle = `${pageH1} (November 2026) | GamingToolsHub`;
  }

  const codesRowsHtml = entry.codes.map((c, i) => `
    <div class="p-3 sm:p-4 rounded-xl bg-[#080d22] border border-indigo-950/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="flex items-center gap-3 min-w-0">
        <span class="text-xs font-mono text-slate-500 w-5">${i + 1}</span>
        <code class="px-2.5 py-1 rounded-lg bg-[#070b19] border border-indigo-900/60 font-mono text-xs sm:text-sm font-bold text-amber-300 tracking-wider">
          ${escapeHtml(c.code)}
        </code>
        <span class="text-xs sm:text-sm text-slate-200">
          ${escapeHtml(c.reward)}
        </span>
      </div>
      <span class="text-[11px] font-mono text-slate-400">Verified Active</span>
    </div>
  `).join('');

  const stepsHtml = entry.redeemSteps.map((step, idx) => `
    <li class="flex items-start gap-3">
      <span class="w-6 h-6 rounded-lg bg-[#080d22] border border-indigo-900/70 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
        ${idx + 1}
      </span>
      <span class="text-xs sm:text-sm text-slate-300 leading-relaxed pt-0.5">
        ${escapeHtml(step)}
      </span>
    </li>
  `).join('');

  const detailBodyHtml = `
    <div class="min-h-screen bg-[#070b19] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      <div>
        ${renderNavHeader('/codes')}
        <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-slate-400">
              <li><a href="/" class="hover:text-white transition-colors">Home</a></li>
              <li class="text-slate-600">/</li>
              <li><a href="/codes" class="hover:text-white transition-colors">Codes</a></li>
              <li class="text-slate-600">/</li>
              <li><span class="text-slate-200 font-medium">${escapeHtml(entry.gameName)}</span></li>
            </ol>
          </nav>
          <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-[#0c122e] to-[#070b19] border border-amber-500/30">
            <div class="flex items-center gap-2 text-xs font-mono text-amber-300 mb-2">
              <span>● Last checked: ${escapeHtml(entry.lastChecked)}</span>
              <span>·</span>
              <span>${entry.codes.length} active codes</span>
            </div>
            <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              ${escapeHtml(pageH1)}
            </h1>
            <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              ${escapeHtml(entry.intro)}
            </p>
          </div>
          <div class="space-y-3">
            <h2 class="text-lg font-bold text-white">Active Codes (${entry.codes.length})</h2>
            <div class="space-y-2">
              ${codesRowsHtml}
            </div>
          </div>
          <div class="p-6 rounded-2xl bg-[#0c122e] border border-indigo-900/60 space-y-4">
            <h2 class="text-lg font-bold text-white">How to Redeem Codes</h2>
            <ol class="space-y-2.5">
              ${stepsHtml}
            </ol>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-indigo-950">
            <a href="${escapeHtml(entry.relatedToolPath)}" class="p-4 rounded-xl bg-[#0c122e] border border-indigo-900/60 hover:border-violet-500/50 block text-xs">
              <span class="text-slate-400 block mb-1">Related Tool</span>
              <strong class="text-white hover:text-amber-300">${escapeHtml(entry.relatedToolLabel)} →</strong>
            </a>
            <a href="${escapeHtml(entry.gameHubPath)}" class="p-4 rounded-xl bg-[#0c122e] border border-indigo-900/60 hover:border-violet-500/50 block text-xs">
              <span class="text-slate-400 block mb-1">Game Center</span>
              <strong class="text-white hover:text-amber-300">${escapeHtml(entry.gameName)} Hub →</strong>
            </a>
            <a href="/codes" class="p-4 rounded-xl bg-[#0c122e] border border-indigo-900/60 hover:border-violet-500/50 block text-xs">
              <span class="text-slate-400 block mb-1">Directory</span>
              <strong class="text-white hover:text-amber-300">All Game Codes →</strong>
            </a>
          </div>
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;

  renderPageTemplate(
    `/codes/${entry.slug}`,
    pageTitle,
    `${entry.gameName} redeem codes (November 2026). ${entry.intro}`,
    detailBodyHtml
  );
});

/**
 * 2.6 Pre-render Game Q&A Directory (/qa), Game Hubs (/qa/:gameSlug), and Detail Pages (/qa/:gameSlug/:questionSlug)
 */
function generateQaIndexHtml(): string {
  const games = getQaGames();
  const cardsHtml = QA_ENTRIES.map(entry => `
    <a href="/qa/${entry.gameSlug}/${entry.slug}" class="block p-5 rounded-2xl bg-[#0c122e] border border-indigo-900/60 hover:border-violet-500/50 transition-all group">
      <div class="flex items-center gap-2 mb-2 text-xs font-mono text-violet-400 font-bold uppercase">
        <span>${escapeHtml(entry.gameName)} Q&A</span>
      </div>
      <h2 class="text-base font-bold text-white group-hover:text-violet-300 transition-colors mb-2">
        ${escapeHtml(entry.question)}
      </h2>
      <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed bg-[#070b19] p-3 rounded-xl border border-indigo-950">
        ${escapeHtml(entry.shortAnswer)}
      </p>
      <div class="mt-4 pt-3 border-t border-indigo-950 flex items-center justify-between text-xs font-semibold text-violet-400 group-hover:text-cyan-300">
        <span>Read Answer & Example</span>
        <span>→</span>
      </div>
    </a>
  `).join('');

  return `
    <div class="min-h-screen bg-[#070b19] text-slate-100 flex flex-col justify-between selection:bg-violet-600 selection:text-white">
      <div>
        ${renderNavHeader('/qa')}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-slate-400">
              <li><a href="/" class="hover:text-white transition-colors">Home</a></li>
              <li class="text-slate-600">/</li>
              <li><span class="text-slate-200 font-medium">Q&A</span></li>
            </ol>
          </nav>
          <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-950/70 via-indigo-950/60 to-[#0c122e] border border-violet-500/40">
            <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Game Q&A — Quick Answers to Gaming Questions
            </h1>
            <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Clear, calculated answers to common gaming questions, rates, and mechanics across major games.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            ${cardsHtml}
          </div>
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;
}

renderPageTemplate(
  '/qa',
  'Game Q&A — Quick Answers to Gaming Questions | GamingToolsHub',
  'Clear, calculated answers to common gaming questions, exchange rates, currency values, and mechanics across major games.',
  generateQaIndexHtml()
);

// Pre-render each game Q&A hub (/qa/:gameSlug)
const qaGamesList = getQaGames();
qaGamesList.forEach(game => {
  const gameEntries = getQaEntriesByGame(game.slug);
  const gameCardsHtml = gameEntries.map(entry => `
    <a href="/qa/${entry.gameSlug}/${entry.slug}" class="block p-5 rounded-2xl bg-[#0c122e] border border-indigo-900/60 hover:border-violet-500/50 transition-all group">
      <h2 class="text-base font-bold text-white group-hover:text-violet-300 transition-colors mb-2">
        ${escapeHtml(entry.question)}
      </h2>
      <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed bg-[#070b19] p-3 rounded-xl border border-indigo-950">
        ${escapeHtml(entry.shortAnswer)}
      </p>
      <div class="mt-4 pt-3 border-t border-indigo-950 flex items-center justify-between text-xs font-semibold text-violet-400 group-hover:text-cyan-300">
        <span>Read Full Explanation</span>
        <span>→</span>
      </div>
    </a>
  `).join('');

  const hubHtml = `
    <div class="min-h-screen bg-[#070b19] text-slate-100 flex flex-col justify-between selection:bg-violet-600 selection:text-white">
      <div>
        ${renderNavHeader('/qa')}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-slate-400">
              <li><a href="/" class="hover:text-white transition-colors">Home</a></li>
              <li class="text-slate-600">/</li>
              <li><a href="/qa" class="hover:text-white transition-colors">Q&A</a></li>
              <li class="text-slate-600">/</li>
              <li><span class="text-slate-200 font-medium">${escapeHtml(game.name)} Q&A</span></li>
            </ol>
          </nav>
          <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-950/70 via-indigo-950/60 to-[#0c122e] border border-violet-500/40">
            <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              ${escapeHtml(game.name)} Questions & Answers
            </h1>
            <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Quick, accurate answers to top ${escapeHtml(game.name)} questions, currency calculations, and game mechanics.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${gameCardsHtml}
          </div>
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;

  renderPageTemplate(
    `/qa/${game.slug}`,
    `${game.name} Questions & Answers | GamingToolsHub`,
    `Get fast, verified answers to top ${game.name} questions, currency calculations, exchange rates, and game mechanics.`,
    hubHtml
  );
});

// Detail pages for each QA_ENTRIES entry (/qa/:gameSlug/:questionSlug)
QA_ENTRIES.forEach(entry => {
  const detailBodyHtml = `
    <div class="min-h-screen bg-[#070b19] text-slate-100 flex flex-col justify-between selection:bg-violet-600 selection:text-white">
      <div>
        ${renderNavHeader('/qa')}
        <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex items-center gap-1.5 text-xs text-slate-400">
              <li><a href="/" class="hover:text-white transition-colors">Home</a></li>
              <li class="text-slate-600">/</li>
              <li><a href="/qa" class="hover:text-white transition-colors">Q&A</a></li>
              <li class="text-slate-600">/</li>
              <li><a href="/qa/${entry.gameSlug}" class="hover:text-white transition-colors">${escapeHtml(entry.gameName)} Q&A</a></li>
              <li class="text-slate-600">/</li>
              <li><span class="text-slate-200 font-medium">${escapeHtml(entry.question)}</span></li>
            </ol>
          </nav>

          <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-950/70 via-indigo-950/60 to-[#0c122e] border border-violet-500/40">
            <span class="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider block mb-2">${escapeHtml(entry.gameName)} Question</span>
            <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              ${escapeHtml(entry.question)}
            </h1>
          </div>

          <div class="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-[#0c122e] border border-emerald-500/50 space-y-2">
            <span class="text-xs font-mono font-extrabold text-emerald-400 uppercase tracking-wider block">Quick Answer</span>
            <p class="text-base sm:text-lg font-bold text-white leading-relaxed">
              ${escapeHtml(entry.shortAnswer)}
            </p>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-[#0c122e] border border-indigo-900/60 space-y-4">
            <h2 class="text-xl font-bold text-white">Detailed Explanation</h2>
            <div class="space-y-4 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              ${escapeHtml(entry.explanation)}
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-violet-950/30 border border-violet-500/40 space-y-3">
            <h2 class="text-lg font-bold text-white">Worked Example</h2>
            <div class="p-4 rounded-xl bg-[#070b19] border border-violet-500/30 font-mono text-sm text-slate-200">
              ${escapeHtml(entry.workedExample)}
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-[#0c122e] border border-indigo-900/60 flex items-center justify-between">
            <div>
              <h3 class="text-base font-bold text-white">Interactive Precision Tool</h3>
              <p class="text-xs text-slate-400">Calculate custom amounts with live rates in our calculator tool.</p>
            </div>
            <a href="/tools/robux-calculator" class="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition-all">
              Try the Robux Calculator →
            </a>
          </div>
        </main>
      </div>
      ${renderFooter()}
    </div>
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: entry.question,
      text: entry.question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${entry.shortAnswer}\n\n${entry.explanation}\n\nWorked Example: ${entry.workedExample}`
      }
    }
  };

  renderPageTemplate(
    `/qa/${entry.gameSlug}/${entry.slug}`,
    `${entry.question} | ${entry.gameName} Q&A | GamingToolsHub`,
    entry.shortAnswer,
    detailBodyHtml,
    jsonLd
  );
});

console.log('Successfully pre-rendered all listing, codes, and Q&A pages with rich content!');

/**
 * 3. Generate Clean GitHub Pages 404.html (No Meta Refresh, No Redirect Loop)
 */
const clean404Html = `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 - Page Not Found | GamingToolsHub</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
    <style>
      body {
        margin: 0;
        background-color: #080c14;
        color: #f1f5f9;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: space-between;
      }
      header {
        border-bottom: 1px solid rgba(51, 65, 85, 0.8);
        background: rgba(8, 12, 20, 0.95);
        padding: 0 1.5rem;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        text-decoration: none;
        color: #fff;
        font-weight: 800;
        font-size: 1rem;
      }
      .brand-badge {
        width: 2rem;
        height: 2rem;
        border-radius: 0.5rem;
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        color: #34d399;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 0.875rem;
      }
      .brand-highlight {
        color: #34d399;
      }
      nav a {
        color: #cbd5e1;
        text-decoration: none;
        font-size: 0.875rem;
        margin-left: 1.25rem;
        transition: color 0.2s;
      }
      nav a:hover {
        color: #34d399;
      }
      main {
        max-width: 36rem;
        margin: 4rem auto;
        padding: 0 1.5rem;
        text-align: center;
      }
      .error-code {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 0.75rem;
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        color: #34d399;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 700;
        font-size: 1.125rem;
        margin-bottom: 1.5rem;
      }
      h1 {
        font-size: 2.25rem;
        font-weight: 800;
        color: #ffffff;
        margin: 0 0 1rem 0;
        letter-spacing: -0.025em;
      }
      p {
        font-size: 0.95rem;
        color: #94a3b8;
        line-height: 1.6;
        margin: 0 0 2rem 0;
      }
      .btn-group {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        justify-content: center;
      }
      .btn-primary {
        background: #10b981;
        color: #000000;
        font-weight: 700;
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        text-decoration: none;
        font-size: 0.875rem;
        transition: background 0.2s;
      }
      .btn-primary:hover {
        background: #34d399;
      }
      .btn-secondary {
        background: #1e293b;
        color: #ffffff;
        font-weight: 600;
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        text-decoration: none;
        font-size: 0.875rem;
        border: 1px solid #334155;
        transition: background 0.2s;
      }
      .btn-secondary:hover {
        background: #334155;
      }
      footer {
        border-top: 1px solid rgba(51, 65, 85, 0.8);
        background: #060910;
        padding: 2rem 1.5rem;
        text-align: center;
        font-size: 0.75rem;
        color: #64748b;
      }
    </style>
  </head>
  <body>
    <header>
      <a href="/" class="brand">
        <span class="brand-badge">G</span>
        <span>GamingTools<span class="brand-highlight">Hub</span></span>
      </a>
      <nav>
        <a href="/tools">All Tools</a>
        <a href="/games">Games</a>
        <a href="/">Home</a>
      </nav>
    </header>

    <main>
      <div class="error-code">404 • NOT FOUND</div>
      <h1>Page Not Found</h1>
      <p>The gaming tool or calculator URL you requested does not exist or has been moved. Explore our complete directory of 100+ precision gaming tools below.</p>
      <div class="btn-group">
        <a href="/tools" class="btn-primary">Browse All Tools →</a>
        <a href="/" class="btn-secondary">Return Home</a>
      </div>
    </main>

    <footer>
      <p>© 2026 GamingToolsHub. Built for precision gaming calculations with zero server lag.</p>
    </footer>
  </body>
</html>`;

fs.writeFileSync(path.join(DIST_DIR, '404.html'), clean404Html.trim(), 'utf-8');
console.log('Generated clean GitHub Pages 404.html without redirects!');
