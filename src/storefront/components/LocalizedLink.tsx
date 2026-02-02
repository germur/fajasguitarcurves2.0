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
 * Source paths are expected to be in Spanish (the canonical form).
 */
function localizePathForEnglish(path: string): string {
    if (!path || path.startsWith('http') || path.startsWith('/en')) {
        return path;
    }

    // Translate Spanish slugs to English
    const englishPath = translatePathToEnglish(path);
    return `/en${englishPath === '/' ? '' : englishPath}`;
}

export const LocalizedLink = forwardRef<HTMLAnchorElement, LinkProps>(
    function LocalizedLink({ to, ...props }, ref) {
        const location = useLocation();
        const isEn = location.pathname.startsWith('/en');

        // Handle string paths
        if (typeof to === 'string') {
            const localizedTo = isEn ? localizePathForEnglish(to) : to;
            return <Link ref={ref} to={localizedTo} {...props} />;
        }

        // Handle object paths (e.g., { pathname: '/foo', search: '?bar=1' })
        if (typeof to === 'object' && to.pathname) {
            const localizedTo = {
                ...to,
                pathname: isEn ? localizePathForEnglish(to.pathname) : to.pathname
            };
            return <Link ref={ref} to={localizedTo} {...props} />;
        }

        return <Link ref={ref} to={to} {...props} />;
    }
);

export default LocalizedLink;

