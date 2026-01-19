
const fetch = require('node-fetch');

async function debugProduct() {
    // Suspected handle for "Thick strip mid-leg"
    const handle = 'faja-tira-gruesa-7-varillas-media-pierna';
    const storeDomain = '92542c-b5.myshopify.com';
    const storeToken = '04c58a7586c413051625b8a9aedd0416';
    const endpoint = `https://${storeDomain}/api/2024-01/graphql.json`;

    const query = `
    query getProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
            id
            title
            handle
            tags
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
        console.log("Product Data:");
        console.log(JSON.stringify(json.data.productByHandle, null, 2));

    } catch (error) {
        console.error("Error fetching:", error);
    }
}

debugProduct();
