import { useEffect } from 'react';

interface SeoProps {
    title: string;
    description?: string;
    type?: 'website' | 'product' | 'article';
    image?: string;
    schema?: Record<string, unknown>;
}

export function SeoHead({ title, description, type = 'website', image, schema }: SeoProps) {
    useEffect(() => {
        // Update Title
        document.title = title;

        // Helper to update or create meta tag
        const updateMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        const updateOgMeta = (property: string, content: string) => {
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Update Meta Description
        if (description) {
            updateMeta('description', description);
            updateOgMeta('og:description', description);
        }

        // Update OG Tags
        updateOgMeta('og:title', title);
        updateOgMeta('og:type', type);
        if (image) {
            updateOgMeta('og:image', image);
        }

        // Update JSON-LD Schema (with unique ID for reliable updates)
        if (schema) {
            const schemaId = 'gc-product-schema';
            let script = document.getElementById(schemaId) as HTMLScriptElement | null;
            if (!script) {
                script = document.createElement('script');
                script.setAttribute('id', schemaId);
                script.setAttribute('type', 'application/ld+json');
                document.head.appendChild(script);
            }
            script.textContent = JSON.stringify(schema);
            console.log('[SEO] Product schema injected:', schema['@type']);
        }

        // Cleanup function (optional, but good practice to reset if needed)
        return () => {
            // We might typically reset to a default title, but for SPA navigation, 
            // the next page will overwrite this effect immediately.
        };
    }, [title, description, type, image, schema]);

    return null; // This component handles side effects only
}
