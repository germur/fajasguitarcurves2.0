
const fetch = require('node-fetch');

async function debugProductExtended() {
    const handle = 'faja-etapa-2-con-mangas-y-bra';
    const storeDomain = '92542c-b5.myshopify.com';
    const storeToken = '04c58a7586c413051625b8a9aedd0416';
    const endpoint = `https://${storeDomain}/api/2024-01/graphql.json`;

    const query = `
    query getProductExtended($handle: String!) {
        productByHandle(handle: $handle) {
            title
            images(first: 50) {
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
        console.log(`Fetching extended data for: ${handle}...`);
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storeToken,
            },
            body: JSON.stringify({ query, variables: { handle } })
        });

        const json = await response.json();
        const p = json.data.productByHandle;

        if (p) {
            console.log(`\n=== IMAGES (${p.images.edges.length}) ===`);
            p.images.edges.forEach((img, i) => {
                console.log(`[${i}] Alt: "${img.node.altText}" | URL: ${img.node.url}`);
            });

            console.log(`\n=== COLOR VARIANTS ===`);
            // Helper to group by color
            const colors = {};
            p.variants.edges.forEach(v => {
                const colorOpt = v.node.selectedOptions.find(o => o.name.toLowerCase().includes('color') || o.name.toLowerCase().includes('cor'));
                if (colorOpt) {
                    const color = colorOpt.value;
                    if (!colors[color]) colors[color] = { count: 0, image: null };
                    colors[color].count++;
                    if (v.node.image) colors[color].image = v.node.image.url;
                }
            });

            Object.keys(colors).forEach(c => {
                console.log(`Color: "${c}" | Variants: ${colors[c].count} | Image Assigned: ${colors[c].image ? 'YES' : 'NO'} (${colors[c].image})`);
            });

        } else {
            console.log("Product not found.");
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

debugProductExtended();
