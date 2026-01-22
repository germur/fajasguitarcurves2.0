import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIG ---
const BASE_URL = 'https://fajasguitarcurves.com';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_FILE = path.resolve(__dirname, '../public/sitemap.xml');

// --- ROUTES ---
// --- ROUTES ---
const STATIC_ROUTES = [
  '/',
  '/',
  '/nosotros',
  '/contacto',
  '/calculadora-de-tallas',
  '/privacidad',
  '/terminos',
  '/devoluciones',
  '/colecciones/recuperacion-postquirurgica',
  '/colecciones/moldeo-y-estetica',
  '/colecciones/fajas-reloj-de-arena',
  '/colecciones/brasieres-y-postura',
  '/colecciones/todo',
  '/herramientas',
  '/glosario',
  '/nuestra-historia',
];

// Granular SEO Routes (Spanish)
const GRANULAR_ROUTES = [
  // Recuperación (Silo: recuperacion-postquirurgica)
  // Actually, granular routes in Router are still /colecciones/:silo/:filter ??
  // No, Router has: path: 'colecciones/:silo/:filter',
  // But also: path: 'colecciones/recuperacion-postquirurgica' (Fixed)
  // And granulars: /colecciones/recuperacion-postquirurgica/etapa-1 ??
  // In `CollectionPage`, we support generic /colecciones/:silo/:filter.
  // We matched `recuperacion` to `recuperacion-postquirurgica` in redirection but internal Links might need updates?
  // User asked for: /colecciones/recuperacion-postquirurgica
  // Granular: /colecciones/recuperacion-postquirurgica/etapa-1
  // We should list them here as they will be the canonicals.

  '/colecciones/recuperacion-postquirurgica/etapa-1',
  '/colecciones/recuperacion-postquirurgica/etapa-2',
  '/colecciones/recuperacion-postquirurgica/etapa-3',
  '/colecciones/recuperacion-postquirurgica/post-parto',
  '/colecciones/recuperacion-postquirurgica/lipo-360',
  '/colecciones/recuperacion-postquirurgica/espalda-alta',
  '/colecciones/recuperacion-postquirurgica/media-pierna', // SEO long-tail

  // Moldeo (Silo: moldeo-y-estetica)
  '/colecciones/moldeo-y-estetica/shorts',
  '/colecciones/moldeo-y-estetica/strapless',
  '/colecciones/moldeo-y-estetica/cinturillas',
  '/colecciones/moldeo-y-estetica/cinturillas-reductoras', // Alias/SEO
  '/colecciones/moldeo-y-estetica/uso-diario',

  // Brasieres
  '/colecciones/brasieres-y-postura/post-quirurgica',
  '/colecciones/brasieres-y-postura/uso-diario',
  '/colecciones/brasieres-y-postura/deportivo',

  // Herramientas
  '/herramientas/calculadora-reloj-de-arena',
  '/herramientas/comparador-de-etapas',
  '/herramientas/linea-de-tiempo-recuperacion',

  // Guías
  '/guias/manual-espuma-lipo',
  '/guias/solucion-problemas',

  // Artículos
  '/articulos/biblia-fibrosis',
  '/articulos/anatomia-faja',
  '/articulos/linea-tiempo-inflamacion',
  '/articulos/tallas-asimetricas',
  '/articulos/lipo-brazos-espalda',
  '/articulos/snatch-test',
  '/articulos/rutina-manana',
  '/articulos/mitos-waist-training',
  '/articulos/postparto-vs-lipo',
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
