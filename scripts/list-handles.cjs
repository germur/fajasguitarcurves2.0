
const fetch = require('node-fetch');

async function listAllHandles() {
    const storeDomain = '92542c-b5.myshopify.com';
    const storeToken = '04c58a7586c413051625b8a9aedd0416';
    const endpoint = `https://${storeDomain}/api/2024-01/graphql.json`;

    const query = `
    query getAllProducts {
        products(first: 250) {
            edges {
                node {
                    title
                    handle
                }
            }
        }
    }`;

    try {
        console.log(`Fetching all products...`);
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storeToken,
            },
            body: JSON.stringify({ query })
        });

        const json = await response.json();
        const products = json.data?.products?.edges || [];

        console.log("\nFOUND HANDLES:");
        products.forEach(p => {
            console.log(`- ${p.node.handle}  [${p.node.title}]`);
        });

    } catch (error) {
        console.error("Error fetching:", error);
    }
}

listAllHandles();
