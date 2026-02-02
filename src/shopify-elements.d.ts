export { };

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'shopify-store': any;
            'shopify-context': any;
            'shopify-data': any;
            'shopify-list-context': any;
            'shopify-media': any;
            'shopify-money': any;
        }
    }
}
