import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIG ---
const BASE_URL = 'https://fajasguitarcurves.com';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_FILE = path.resolve(__dirname, '../public/sitemap.xml');

// --- ROUTES ---
const STATIC_ROUTES = [
    '/',
    '/about',
    '/contact',
    '/fit-finder',
    '/privacy-policy',
    '/terms-of-service',
    '/returns',
    '/collections/recovery',
    '/collections/sculpt',
    '/collections/bras',
    '/products/faja-reloj-de-arena-post-lipo',
    '/products/faja-short-levanta-cola',
    '/products/faja-etapa-2-media-pierna'
];

// Granular SEO Routes (Derived from our Logic)
const GRANULAR_ROUTES = [
    // Recovery
    '/collections/recovery/stage-1',
    '/collections/recovery/stage-2',
    '/collections/recovery/stage-3',
    // Sculpt
    '/collections/sculpt/shorts',
    '/collections/sculpt/strapless',
    '/collections/sculpt/cinturillas',
    // Bras
    '/collections/bras/post-quirurgica',
    '/collections/bras/uso-diario',
    '/collections/bras/deportivo'
];

function generateSitemap() {
    const allRoutes = [...STATIC_ROUTES, ...GRANULAR_ROUTES];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>`;

    fs.writeFileSync(TARGET_FILE, sitemap);
    console.log(`✅ Sitemap generated at ${TARGET_FILE} with ${allRoutes.length} URLs`);
}

generateSitemap();
