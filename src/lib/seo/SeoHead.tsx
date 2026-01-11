import { Helmet } from 'react-helmet-async';
import type { SeoConfig } from './types';
import {
    generateProductSchema,
    generateBreadcrumbSchema,
    generateToolSchema,
    generateOrganizationSchema
} from './generators';

const BASE_URL = "https://guitarcurves.com";

interface SeoHeadProps extends SeoConfig {
    path: string; // Current URL path for canonical
}

export function SeoHead({
    title,
    description,
    image,
    type = 'website',
    schema,
    keywords = [],
    path
}: SeoHeadProps) {
    const url = `${BASE_URL}${path}`;
    const socialImage = image || `${BASE_URL}/assets/social-share.jpg`;

    // 1. Generate Primary Schema (Product, Tool, etc.)
    let primarySchema = null;
    if (schema?.type === 'product') {
        primarySchema = generateProductSchema(schema.data, url);
    } else if (schema?.type === 'tool') {
        primarySchema = generateToolSchema(schema.data.name, schema.data.description, url);
    }

    // 2. Generate Supporting Schemas
    const breadcrumbSchema = schema?.breadcrumbs ? generateBreadcrumbSchema(schema.breadcrumbs) : null;
    const orgSchema = generateOrganizationSchema();

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            {keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(', ')} />
            )}

            {/* Open Graph / Social */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={socialImage} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="Guitar Curves" />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={socialImage} />

            {/* JSON-LD Schemas */}
            <script type="application/ld+json">
                {JSON.stringify(orgSchema)}
            </script>

            {primarySchema && (
                <script type="application/ld+json">
                    {JSON.stringify(primarySchema)}
                </script>
            )}

            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
        </Helmet>
    );
}
