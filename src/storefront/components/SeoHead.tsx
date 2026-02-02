
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SeoProps {
    title: string;
    description?: string;
    type?: 'website' | 'product' | 'article';
    image?: string;
    schema?: Record<string, unknown>;
}

import { translatePathToEnglish, translatePathToSpanish } from '../../lib/routeTranslations';

export function SeoHead({ title, description, type = 'website', image, schema }: SeoProps) {
    const { i18n } = useTranslation();
    const location = useLocation();

    // current language
    const currentLang = i18n.language;
    const isEn = currentLang === 'en';

    // Path logic for Canonical and Hreflang
    // 1. Determine the "Source of Truth" path (The Spanish Path)
    const currentPath = location.pathname;
    const spanishPath = currentPath.startsWith('/en')
        ? translatePathToSpanish(currentPath)
        : currentPath;

    // 2. Generate the English equivalent
    // We pass the clean Spanish path to translate it
    const englishPath = translatePathToEnglish(spanishPath);

    // Domain hardcoded for now (could be env var)
    const baseUrl = 'https://guitarcurves.com';

    // 3. Construct Full URLs
    const esUrl = `${baseUrl}${spanishPath === '/' ? '' : spanishPath}`;
    const enUrl = `${baseUrl}/en${englishPath === '/' ? '' : englishPath}`;

    // Canonical is the current page's definitive URL
    const canonicalUrl = isEn ? enUrl : esUrl;

    return (
        <Helmet>
            {/* Basic Meta */}
            <html lang={currentLang} />
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* OG Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            {image && <meta property="og:image" content={image} />}

            {/* i18n & Canonical */}
            <link rel="canonical" href={canonicalUrl} />
            <link rel="alternate" href={esUrl} hrefLang="es" />
            <link rel="alternate" href={enUrl} hrefLang="en" />
            <link rel="alternate" href={esUrl} hrefLang="x-default" />

            {/* Schema JSON-LD */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
}
