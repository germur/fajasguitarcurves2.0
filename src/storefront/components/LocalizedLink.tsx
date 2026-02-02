/**
 * LocalizedLink - A wrapper around react-router-dom's Link that automatically
 * preserves the /en language prefix and translates URL slugs when navigating.
 */

import { Link, useLocation } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import { forwardRef } from 'react';
import { translatePathToEnglish } from '@/lib/routeTranslations';

/**
 * Translates a Spanish path to English and adds the /en prefix.
 */
function localizePathForEnglish(path: string): string {
    if (!path || path.startsWith('http') || path.startsWith('/en')) {
        return path;
    }
    const englishPath = translatePathToEnglish(path);
    return `/en${englishPath === '/' ? '' : englishPath}`;
}

/**
 * Ensures path has /es prefix for Spanish context if internal.
 */
function localizePathForSpanish(path: string): string {
    if (!path || path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
        return path;
    }
    // If it already has /es or /en (switching lang manually?), leave it.
    // Wait, if it has /en but we want /es? 
    // This function is for "I am in Spanish mode, and I want to link to X".
    // If X is '/en/something', it's an explicit link to English, so leave it.
    if (path.startsWith('/es') || path.startsWith('/en')) {
        return path;
    }

    // Otherwise prepend /es
    // Handle root carefully
    if (path === '/') return '/es';

    return `/es${path.startsWith('/') ? '' : '/'}${path}`;
}

export const LocalizedLink = forwardRef<HTMLAnchorElement, LinkProps>(
    function LocalizedLink({ to, ...props }, ref) {
        const location = useLocation();
        const isEn = location.pathname.startsWith('/en');

        let finalTo = to;

        if (typeof to === 'string') {
            finalTo = isEn ? localizePathForEnglish(to) : localizePathForSpanish(to);
        } else if (typeof to === 'object' && to.pathname) {
            finalTo = {
                ...to,
                pathname: isEn ? localizePathForEnglish(to.pathname) : localizePathForSpanish(to.pathname)
            };
        }

        return <Link ref={ref} to={finalTo} {...props} />;
    }
);

export default LocalizedLink;

