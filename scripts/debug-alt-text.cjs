


// Mock the client to run in node (since import.meta.env is not available)
// Use the token from the file we saw earlier
const storefrontAccessToken = '04c58a7586c413051625b8a9aedd0416';
const domain = '92542c-b5.myshopify.com';

async function debugProduct() {
  const handle = 'faja-stage-3-media-pierna';

  const query = `
    {
      product(handle: "${handle}") {
        id
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

  console.log("\n--- IMAGES ---");
  p.images.edges.forEach((edge, i) => {
    console.log(`[${i}] Alt: "${edge.node.altText || 'null'}" \n    URL: ${edge.node.url}`);
  });

  console.log("\n--- VARIANTS ---");
  p.variants.edges.forEach(edge => {
    const v = edge.node;
    const color = v.selectedOptions.find(o => o.name === 'Color')?.value;
    console.log(`Variant: ${v.title} (Color: ${color})`);
    console.log(`  Linked Image Alt: ${v.image?.altText || 'null'}`);
    console.log(`  Linked Image URL: ${v.image?.url || 'null'}`);
  });
}

debugProduct();
