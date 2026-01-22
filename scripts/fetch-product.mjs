
const domain = '92542c-b5.myshopify.com';
const storefrontAccessToken = '04c58a7586c413051625b8a9aedd0416';

async function fetchProduct() {
    const handle = 'faja-stage-3-media-pierna';

    const query = `
    {
      product(handle: "${handle}") {
        id
        title
        images(first: 20) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              title
              image {
                url
                altText
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

    try {
        const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storefrontAccessToken
            },
            body: JSON.stringify({ query })
        });

        const json = await response.json();

        if (!json.data || !json.data.product) {
            console.log("No product found");
            return;
        }

        const p = json.data.product;
        console.log(`Product: ${p.title}`);

        console.log("\n--- IMAGES (in order) ---");
        p.images.edges.forEach((edge, i) => {
            console.log(`[${i}] Alt: "${edge.node.altText || 'null'}"`);
            console.log(`    URL: ${edge.node.url}`);
        });

        console.log("\n--- VARIANTS ---");
        p.variants.edges.forEach(edge => {
            const v = edge.node;
            const color = v.selectedOptions.find(o => o.name === 'Color' || o.name === 'Cor' || o.name === 'Colour')?.value;
            console.log(`Variant: ${v.title} (Color: ${color})`);
            console.log(`  Linked Image Alt: ${v.image?.altText || 'null'}`);
        });

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

fetchProduct();
