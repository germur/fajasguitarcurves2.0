// Standalone script, no imports to avoid TS/ESM issues
const domain = '92542c-b5.myshopify.com';
const storefrontAccessToken = '04c58a7586c413051625b8a9aedd0416';

async function debugTags() {
  console.log("🔍 Fetching products from " + domain + "...");

  // Query MORE products to find all unique tags
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
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      return;
    }

    const products = json.data.products.edges;

    console.log(`\n📦 Found ${products.length} products. Scanning for UNIQUE tags...\n`);

    // Aggregate Unique Tags
    const allTags = new Set();
    products.forEach(({ node }) => {
      node.tags.forEach(t => allTags.add(t));
    });

    const roundedTags = Array.from(allTags).sort();

    console.log("✅ COMPLETE TAG LIST (Copy this for SEO mapping):");
    console.log("------------------------------------------------");
    roundedTags.forEach(t => console.log(`- "${t}"`));
    console.log("------------------------------------------------");


  } catch (error) {
    console.error("❌ Error fetching:", error);
  }
}

debugTags();
