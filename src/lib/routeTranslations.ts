/**
 * Route Translation Map
 * Maps Spanish URL segments to English and vice versa for i18n URL localization.
 */

// Spanish → English mapping
export const esEnMap: Record<string, string> = {
    // Collections
    'colecciones': 'collections',
    'todo': 'all',
    'recuperacion-postquirurgica': 'post-surgery-recovery',
    'moldeo-y-estetica': 'sculpting-shapewear',
    'brasieres-y-postura': 'bras-and-posture',
    'fajas-reloj-de-arena': 'hourglass-fajas',

    // Pages
    'nosotros': 'about',
    'contacto': 'contact',
    'carrito': 'cart',
    'pago': 'checkout',
    'envios': 'shipping',
    'privacidad': 'privacy',
    'terminos': 'terms',
    'devoluciones': 'returns',
    'cuenta': 'account',
    'nuestra-historia': 'our-story',
    'rastreo': 'tracking',
    'calculadora-de-tallas': 'fit-finder',
    'laboratorio': 'lab',

    // Tools
    'herramientas': 'tools',
    'linea-de-tiempo-recuperacion': 'recovery-timeline',
    'comparador-de-etapas': 'stage-comparator',
    'calculadora-reloj-de-arena': 'hourglass-calculator',

    // Guides
    'guias': 'guides',
    'manual-espuma-lipo': 'lipo-foam-manual',
    'solucion-problemas': 'troubleshooting',

    // Articles/Blog
    'articulos': 'articles',
    'biblia-fibrosis': 'fibrosis-bible',
    'anatomia-faja': 'anatomy-of-faja',
    'linea-tiempo-inflamacion': 'inflammation-timeline',
    'tallas-asimetricas': 'sizing-asymmetric',
    'lipo-brazos-espalda': 'arm-back-lipo',
    'rutina-manana': 'morning-routine',
    'mitos-waist-training': 'waist-training-myths',
    'postparto-vs-lipo': 'postpartum-vs-lipo',

    // Gallery/Resources
    'galeria': 'gallery',
    'novias-curvas': 'curvy-brides',
    'glosario': 'glossary',
    'comparar': 'compare',
    'vs-genericas': 'vs-generic',
    'recursos': 'resources',
    'checklist-bbl': 'bbl-checklist',
    'historias': 'stories',
    'diarios-recuperacion': 'recovery-diaries',

    // Products
    'producto': 'products',
    'products': 'products', // Keep as-is

    // Pages subpath
    'pages': 'pages',
};

// English → Spanish (reverse mapping)
export const enEsMap: Record<string, string> = Object.fromEntries(
    Object.entries(esEnMap).map(([es, en]) => [en, es])
);

/**
 * Translate a full path from Spanish to English
 */
export function translatePathToEnglish(path: string): string {
    if (!path || path === '/') return path;

    // Remove /es or /en prefix if present to get clean path
    const cleanPath = path.replace(/^\/(es|en)/, '');
    if (!cleanPath || cleanPath === '/') return '/';

    const segments = cleanPath.split('/').filter(Boolean);
    const translated = segments.map(seg => esEnMap[seg] || seg);
    return '/' + translated.join('/');
}

/**
 * Translate a full path from English to Spanish
 */
export function translatePathToSpanish(path: string): string {
    if (!path || path === '/') return path;

    // Remove /en or /es prefix if present
    const cleanPath = path.replace(/^\/(en|es)/, '');
    if (!cleanPath || cleanPath === '/') return '/';

    const segments = cleanPath.split('/').filter(Boolean);
    const translated = segments.map(seg => enEsMap[seg] || seg);
    return '/' + translated.join('/');
}

/**
 * Get the localized path based on current language context
 * @param path - The source path (typically in Spanish)
 * @param isEnglish - Whether the current context is English
 */
export function getLocalizedPath(path: string, isEnglish: boolean): string {
    if (isEnglish) {
        // Translate path to English and add /en prefix
        const englishPath = translatePathToEnglish(path);
        return `/en${englishPath === '/' ? '' : englishPath}`;
    } else {
        // Assume Spanish context
        const spanishPath = translatePathToSpanish(path);
        return `/es${spanishPath === '/' ? '' : spanishPath}`;
    }
    return path;
}
