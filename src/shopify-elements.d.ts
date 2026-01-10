import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'shopify-store': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                'store-domain'?: string;
                'public-access-token'?: string;
                url?: string;
                'access-token'?: string;
            }, HTMLElement>;
            'shopify-product-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                handle?: string;
                variant?: string;
            }, HTMLElement>;
            'shopify-context': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'shopify-cart-link': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'shopify-list-context': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                type?: string;
                query?: string;
                first?: string;
            }, HTMLElement>;
            'shopify-data': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                query?: string;
            }, HTMLElement>;
            'shopify-media': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                query?: string;
            }, HTMLElement>;
            'shopify-money': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                query?: string;
            }, HTMLElement>;
            'shopify-variant-selector': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
