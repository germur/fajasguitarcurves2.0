
const domain = '92542c-b5.myshopify.com';
const token = '04c58a7586c413051625b8a9aedd0416';

// 1. Test "Todo" (All Products)
const queryAll = `
{
  products(first: 5) {
    edges {
      node {
        title
        handle
      }
    }
  }
}
`;

// 2. Test Tag "Stage 2"
// Note: Shopify tags are strictly case sensitive usually.
const queryTags = `
{
  products(first: 5, query: "tag:Stage 2") {
    edges {
      node {
        title
        tags
      }
    }
  }
}
`;

// 3. Test Collection "post-quirurgica" + Tag "Stage 2" validation
// Does a product in this collection actually HAVE this tag?
const queryCollection = `
{
  collectionByHandle(handle: "post-quirurgica") {
    products(first: 50) {
      edges {
        node {
          title
          tags
        }
      }
    }
  }
}
`;

async function fetchShopify(label, q) {
    console.log(`\n--- TESTING: ${label} ---`);
    try {
        const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': token
            },
            body: JSON.stringify({ query: q })
        });
        const json = await response.json();
        if (json.errors) {
            console.log("ERRORS:", JSON.stringify(json.errors, null, 2));
        } else {
            console.log("SUCCESS. First few results:");
            // Deep log to see tags
            const data = json.data.products || json.data.collectionByHandle?.products;
            if (data && data.edges) {
                data.edges.slice(0, 3).forEach(e => {
                    console.log(JSON.stringify(e.node, null, 2));
                });
                console.log(`Total count in fetch: ${data.edges.length}`);
            } else {
                console.log("No Data Found");
            }
        }
    } catch (e) {
        console.error("Fetch Failed", e);
    }
}

async function run() {
    await fetchShopify("ALL PRODUCTS (For 'todo' page)", queryAll);
    await fetchShopify("TAG SEARCH: 'Stage 2'", queryTags);
    await fetchShopify("COLLECTION CONTENT (Check tags)", queryCollection);
}

run();
