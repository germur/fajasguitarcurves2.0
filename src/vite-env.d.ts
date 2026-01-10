/// <reference types="vite/client" />

declare module 'shopify-buy';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'shopify-store': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                'store-domain': string;
                'storefront-token'?: string;
                url?: string;
                country?: string;
                language?: string;
            }, HTMLElement>;
            'shopify-context': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                'context-id'?: string;
                type?: string;
                handle?: string;
            }, HTMLElement>;
            'shopify-product-context': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { handle?: string }, HTMLElement>;
            'shopify-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 'variant-id'?: string }, HTMLElement>;
            'shopify-list-context': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { type?: string; query?: string; first?: string }, HTMLElement>;
            'shopify-media': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { query?: string }, HTMLElement>;
            'shopify-data': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { query?: string }, HTMLElement>;
            'shopify-money': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { query?: string }, HTMLElement>;
            'shopify-variant-selector': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'shopify-image': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { query?: string }, HTMLElement>;
        }
    }
}
