
const storefrontAccessToken = '04c58a7586c413051625b8a9aedd0416';
const domain = '92542c-b5.myshopify.com';

async function debugTags() {
  console.log("Fetching all products to analyze Tags...");
  const query = `
    {
      products(first: 250) {
        edges {
          node {
            title
            tags
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
    if (!json.data) {
      console.error("No data returned", json);
      return;
    }

    const products = json.data.products.edges.map(e => e.node);
    const tagCounts = {};

    products.forEach(p => {
      p.tags.forEach(t => {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      });
    });

    console.log("\n--- TOP TAGS FOUND IN SHOPIFY ---");
    Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50)
      .forEach(([tag, count]) => {
        console.log(`- "${tag}": ${count} products`);
      });

  } catch (e) {
    console.error("Error:", e);
  }
}

debugTags();
