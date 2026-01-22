
const storefrontAccessToken = '04c58a7586c413051625b8a9aedd0416';
const domain = '92542c-b5.myshopify.com';

async function debugImages() {
    const handle = 'faja-stage-3-media-pierna';

    const query = `
    {
      product(handle: "${handle}") {
        title
        images(first: 50) {
          edges {
            node {
              url
              altText
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
    const p = json.data.product;

    console.log(`Product: ${p.title}`);
    console.log("--- IMAGES ---");
    p.images.edges.forEach((edge, i) => {
        console.log(`[${i}] Alt: "${edge.node.altText}"`);
    });
}

debugImages();
