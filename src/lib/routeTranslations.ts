/**
 * Route Translation Map
 * Maps Spanish URL segments to English and vice versa for i18n URL localization.
 */

// Spanish → English mapping
export const esEnMap: Record<string, string> = {
    // Collections
    'colecciones': 'collections',
    'todo': 'all',
    'recuperacion-postquirurgica': 'post-surgery-recovery', // Legacy? Kept just in case
    'moldeo-y-estetica': 'sculpting-shapewear',
    'brasieres-y-postura': 'bras-and-posture',
    'fajas-reloj-de-arena': 'hourglass-fajas', // Legacy?

    // Core Storefront
    'carrito': 'cart',
    'pago': 'checkout',

    // Pages (Direct Matches)
    'nosotros': 'about',
    'contacto': 'contact',
    'envios': 'shipping',
    'devoluciones': 'returns',
    'privacidad': 'privacy',
    'terminos': 'terms',
    'cuenta': 'account',
    'calculadora-de-tallas': 'fit-finder',
    'laboratorio': 'lab',

    // Landing / Marketing
    'mayoristas': 'wholesale',
    'esenciales': 'essentials',
    'garantia-de-ajuste': 'fit-guarantee',
    'nuestra-historia': 'our-story',
    'post-quirurgico': 'post-surgery',
    'moldeo-reloj-de-arena': 'hourglass-sculpting',
    'kit-supervivencia-bbl': 'bbl-survival-kit',

    // Tools & Resources segments
    'herramientas': 'tools',
    'test-ratio': 'ratio-quiz',
    'comparador': 'comparator',
    'cronograma': 'timeline',
    'recursos': 'resources',
    'lista-bbl': 'bbl-checklist',
    'glosario': 'glossary',
    'vs-genericas': 'vs-generic',
    'comunidad': 'community',
    'diarios': 'diaries',
    'estilo': 'lifestyle',
    'novias': 'brides',

    // Blog segments
    'articulos': 'articles',
    'anatomia-faja': 'anatomy-faja', // Assuming en slug is same or similar
    'biblia-fibrosis': 'fibrosis-bible',
    'prueba-ajuste': 'snatch-test',
    'mitos-waist-training': 'waist-training-myths', // Check router
    'mitos-cinturillas': 'waist-training-myths',
    'postparto-vs-lipo': 'postpartum-vs-lipo',
    'tallas-asimetricas': 'sizing-asymmetric',
    'cronograma-inflamacion': 'inflammation-timeline',
    'rutina-manana': 'morning-routine',
    'lipo-brazos-espalda': 'arm-back-lipo',

    // Guides
    'guias': 'guides',
    'solucion-problemas': 'troubleshooting',
    'uso-espuma': 'lipo-foam',

    // General
    'productos': 'products',
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
