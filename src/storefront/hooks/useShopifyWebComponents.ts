import { useEffect, useState } from 'react';

const SHOPIFY_SCRIPT_URL = 'https://cdn.shopify.com/storefront/web-components.js';

export function useShopifyWebComponents() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Check if already exists
        if (document.querySelector(`script[src="${SHOPIFY_SCRIPT_URL}"]`)) {
            setLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.type = 'module';
        script.src = SHOPIFY_SCRIPT_URL;
        script.onload = () => setLoaded(true);
        document.head.appendChild(script);

        return () => {
            // Optional: Don't remove it as other components might need it in the session
        };
    }, []);

    return loaded;
}
