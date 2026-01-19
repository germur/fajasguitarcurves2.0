
const fetch = require('node-fetch');

async function debugProduct() {
    const handle = 'faja-etapa-2-con-mangas-y-bra';
    const storeDomain = '92542c-b5.myshopify.com';
    const storeToken = '04c58a7586c413051625b8a9aedd0416';
    const endpoint = `https://${storeDomain}/api/2024-01/graphql.json`;

    const query = `
    query getProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
            id
            title
            handle
            images(first: 20) {
                edges {
                    node {
                        url
                        altText
                    }
                }
            }
            options {
                name
                values
            }
            variants(first: 20) {
                edges {
                    node {
                        title
                        image {
                            url
                        }
                        selectedOptions {
                            name
                            value
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
        if (json.data && json.data.productByHandle) {
            const p = json.data.productByHandle;
            console.log("Product Title:", p.title);
            console.log("Images Count:", p.images.edges.length);
            p.images.edges.forEach((img, i) => {
                console.log(`Image ${i}: Alt="${img.node.altText}" URL=${img.node.url}`);
            });
            console.log("Variants Count:", p.variants.edges.length);
            p.variants.edges.forEach((v, i) => {
                const imgUrl = v.node.image ? v.node.image.url : "NO IMAGE";
                console.log(`Variant ${i} (${v.node.title}): Image=${imgUrl}`);
            });
        } else {
            console.log("Product not found or error in data", json);
        }

    } catch (error) {
        console.error("Error fetching:", error);
    }
}

debugProduct();
