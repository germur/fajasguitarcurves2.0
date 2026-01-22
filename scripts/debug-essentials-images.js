
import fetch from 'node-fetch';

const storeDomain = '92542c-b5.myshopify.com';
const storeToken = '04c58a7586c413051625b8a9aedd0416';
const endpoint = `https://${storeDomain}/api/2024-01/graphql.json`;

const SILO_HANDLE = 'essentials';

const collectionQuery = `
query getCollection($handle: String!) {
    collectionByHandle(handle: $handle) {
        products(first: 10) {
            edges {
                node {
                    id
                    title
                    handle
                    images(first: 2) {
                        edges {
                            node {
                                url
                                altText
                            }
                        }
                    }
                }
            }
        }
    }
}`;

async function run() {
    console.log(`Fetching collection: ${SILO_HANDLE}...`);
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storeToken,
            },
            body: JSON.stringify({
                query: collectionQuery,
                variables: { handle: SILO_HANDLE }
            })
        });

        const { data, errors } = await response.json();

        if (errors) {
            console.error('Errors:', errors);
            return;
        }

        if (!data?.collectionByHandle) {
            console.log('Collection NOT found.');
            return;
        }

        const products = data.collectionByHandle.products.edges;
        console.log(`Found ${products.length} products.`);

        products.forEach(p => {
            const imgs = p.node.images.edges;
            console.log(`Product: ${p.node.title}`);
            console.log(`  Handle: ${p.node.handle}`);
            console.log(`  Image Count: ${imgs.length}`);
            if (imgs.length > 0) {
                console.log(`  First Image URL: ${imgs[0].node.url}`);
            } else {
                console.log(`  --> NO IMAGES FOUND <--`);
            }
            console.log('---');
        });

    } catch (e) {
        console.error('Fetch failed:', e);
    }
}

run();
