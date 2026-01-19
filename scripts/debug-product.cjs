
const fetch = require('node-fetch');

async function debugProduct() {
    const handle = 'faja-etapa-2-mangas-bra';
    const storeDomain = '92542c-b5.myshopify.com';
    const storeToken = '04c58a7586c413051625b8a9aedd0416';
    const endpoint = `https://${storeDomain}/api/2024-01/graphql.json`;

    const query = `
    query getProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
            id
            title
            handle
            descriptionHtml
            tags
            priceRange {
                minVariantPrice {
                    amount
                    currencyCode
                }
            }
            images(first: 5) {
                edges {
                    node {
                        url
                        altText
                    }
                }
            }
            variants(first: 100) {
                edges {
                    node {
                        id
                        title
                        availableForSale
                        selectedOptions {
                            name
                            value
                        }
                        image {
                            url
                        }
                        price {
                            amount
                            currencyCode
                        }
                    }
                }
            }
        }
    }`;

    try {
        console.log(`Fetching handle: ${handle}...`);
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storeToken,
            },
            body: JSON.stringify({ query, variables: { handle } })
        });

        const json = await response.json();
        console.log("Response Status:", response.status);
        console.log("Full JSON Response:");
        console.log(JSON.stringify(json, null, 2));

    } catch (error) {
        console.error("Error fetching:", error);
    }
}

debugProduct();
