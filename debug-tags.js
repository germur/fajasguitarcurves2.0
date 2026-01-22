
// import { shopifyClient } from './src/lib/shopify-client.ts';

async function fetchTags() {
    const query = `
    {
        products(first: 50) {
            edges {
                node {
                    title
                    tags
                    productType
                }
            }
        }
    }`;

    try {
        const payload = {
            query: query
        }

        const response = await fetch('https://92542c-b5.myshopify.com/api/2024-01/graphql.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': '04c58a7586c413051625b8a9aedd0416'
            },
            body: JSON.stringify(payload)
        });

        const json = await response.json();

        if (json.errors) {
            console.error(json.errors);
            return;
        }

        json.data.products.edges.forEach(edge => {
            console.log(`\nProduct: ${edge.node.title}`);
            console.log(`Tags: ${JSON.stringify(edge.node.tags)}`);
            console.log(`ProductType: ${edge.node.productType}`); // Also check productType
        });

    } catch (e) {
        console.error(e);
    }
}

fetchTags();
