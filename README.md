# GamingToolsHub.com

**GamingToolsHub.com** is a modern, fast, mobile-first web platform for gaming calculators, generators, converters, trackers, and decision utilities.

---

## 🚀 Features & Architecture

- **Zero-Latency Client-Side Computations:** All mathematical algorithms, voxel rasterization, and physics simulations execute in the user's browser.
- **Scalable `game-data.json` Schema:** Easily scale from the initial 7 tools up to 50–100+ tools with a single unified data schema.
- **Comprehensive SEO Strategy:**
  - Dynamic page titles & meta descriptions
  - Open Graph & Twitter Social cards
  - Canonical URL management
  - Rich Schema.org JSON-LD structured data (`WebApplication`, `FAQPage`, `BreadcrumbList`)
  - Dedicated H1s, Step-by-Step guides, formulas explained, pro tips, and FAQ accordions for each tool.
- **Premium Dark Gaming Aesthetic:** Clean high-contrast dark theme with emerald/cyan/purple glowing accents, accessible UI, and mobile touch support.
- **Independent Trademark Notice:** Clear legal notices distinguishing the site from game publishers.

---

## 🛠️ Included Initial Tools

1. **Minecraft Circle & Ellipse Generator** (`/tools/minecraft-circle-generator`)
   - Interactive voxel canvas rasterizer (Bresenham variation)
   - Radius/Diameter, Outline vs Filled, Thin (1-block) vs Thick (2-block)
   - Real-time block count and stack calculator
   - PNG blueprint and coordinate list export
2. **Minecraft Nether Portal Calculator** (`/tools/minecraft-nether-portal-calculator`)
   - Overworld $\leftrightarrow$ Nether 8:1 scaling with floor rounding
   - 128-block linking sphere conflict validator
   - One-click `/tp` commands
3. **Minecraft XP & Leveling Calculator** (`/tools/minecraft-xp-calculator`)
   - Exact vanilla XP curve formulas (Levels 0-16, 17-31, 32+)
   - Mob kill equivalents (Endermen, Blazes, Guardians, Ores, Smelting)
   - Visual XP progress bar
4. **Minecraft Coordinate & Chunk Converter** (`/tools/minecraft-coordinate-converter`)
   - Block to Chunk X/Z and sub-chunk (0-15) offset
   - Region file name identifier (`r.X.Z.mca`) for world save editing
   - 3D Euclidean distance and travel time estimator (walking vs elytra vs Nether highway)
5. **Minecraft Enchantment & Anvil Optimizer** (`/tools/minecraft-enchantment-calculator`)
   - Calculates optimal binary combine tree to prevent "Too Expensive!" (40+ level cap)
   - Detects mutually exclusive enchantments
   - Prior Work Penalty (PWP) tracker
6. **Esports & Gaming Team Balancer** (`/tools/team-generator`)
   - Skill MMR / Rank balancer (1-10) with partitioned variance minimization
   - 2 to 8 teams, role tags (IGL, DPS, Tank, Support, Flex)
   - Formatted Discord markdown export and coin flip draft picker
7. **Gaming Decision Wheel & Drop Chooser** (`/tools/gaming-decision-wheel`)
   - Custom HTML5 physics wheel with cubic bezier deceleration
   - Presets for Battle Royale hot drops, game picker, roles, and forfeits
   - Confetti winner celebration and elimination mode

---

## 📁 Project Structure

```
├── /index.html                          # Entry point with SEO meta & fonts
├── /metadata.json                       # Applet descriptor
├── /package.json                        # Dependencies and build scripts
├── /src
│   ├── /components
│   │   ├── Breadcrumbs.tsx              # Breadcrumb navigation + JSON-LD
│   │   ├── Footer.tsx                   # Footer & independent disclaimer
│   │   ├── Navbar.tsx                   # Navigation & quick search trigger
│   │   ├── SearchModal.tsx              # Global Cmd+K instant search modal
│   │   ├── SEOHead.tsx                  # Dynamic meta tag & JSON-LD manager
│   │   ├── ToolCard.tsx                 # High-contrast gaming tool card
│   │   └── /tools
│   │       ├── GamingDecisionWheel.tsx
│   │       ├── MinecraftCircleGenerator.tsx
│   │       ├── MinecraftCoordinateConverter.tsx
│   │       ├── MinecraftEnchantmentCalculator.tsx
│   │       ├── MinecraftNetherPortalCalculator.tsx
│   │       ├── MinecraftXpCalculator.tsx
│   │       └── TeamGenerator.tsx
│   ├── /data
│   │   ├── game-data.json               # Scalable games & categories registry
│   │   └── gamesAndTools.ts             # Complete tool models & SEO metadata
│   ├── /pages
│   │   ├── AboutPage.tsx
│   │   ├── CategoriesPage.tsx
│   │   ├── DisclaimerPage.tsx
│   │   ├── GamesPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── PrivacyPolicyPage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── TermsPage.tsx
│   │   └── ToolsDirectoryPage.tsx
│   ├── App.tsx                          # Core client-side router
│   ├── index.css                        # Tailwind v4 & custom gaming styling
│   └── main.tsx                         # React entry point
└── /vite.config.ts                      # Vite configuration
```

---

## ➕ Adding New Tools (Scalable to 100+ Tools)

To add a new tool:
1. Open `src/data/gamesAndTools.ts` (or `src/data/game-data.json`).
2. Add a new tool definition with its `slug`, `name`, `seoTitle`, `metaDescription`, `howToGuide`, `faqs`, etc.
3. Create your interactive tool component in `src/components/tools/YourNewTool.tsx`.
4. Register the component in `src/pages/ToolDetailPage.tsx`.
5. The new tool will automatically appear in the Tools Directory, Category pages, Game pages, and Global Search!

---

## 💻 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

---

## 🌐 Deploying to GitHub Pages or Vercel

### Deploying to GitHub Pages
1. Build the production static assets:
   ```bash
   npm run build
   ```
2. The output will be generated inside the `/dist` directory.
3. Deploy the `/dist` folder to your `gh-pages` branch or configure GitHub Actions with:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

### Deploying to Vercel
1. Import the repository into Vercel.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Click **Deploy**.
