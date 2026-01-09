/**
 * Shopify Storefront API Audit Script
 * Usage: node scripts/shopify_audit.js <STORE_DOMAIN> <ACCESS_TOKEN>
 * Example: node scripts/shopify_audit.js my-store.myshopify.com 04c58a7586c413051625b8a9aedd0416
 */

const args = process.argv.slice(2);
const storeDomain = args[0];
const accessToken = args[1];

if (!storeDomain || !accessToken) {
  console.error('Error: Please provide Store Domain and Access Token.');
  console.error('Usage: node scripts/shopify_audit.js <STORE_DOMAIN> <ACCESS_TOKEN>');
  process.exit(1);
}

// Ensure protocol
const url = storeDomain.startsWith('http') ? storeDomain : `https://${storeDomain}`;
const endpoint = `${url}/api/2023-10/graphql.json`;

const query = `
{
  shop {
    name
    description
    paymentSettings {
      currencyCode
    }
  }
  products(first: 5) {
    edges {
      node {
        id
        title
        handle
        productType
        tags
        collections(first: 5) {
            edges {
                node {
                    title
                }
            }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
  collections(first: 10) {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
}
`;

async function auditStore() {
  console.log(`🔌 Connecting to ${endpoint}...`);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error('❌ GraphQL Errors:', JSON.stringify(json.errors, null, 2));
      process.exit(1);
    }

    const data = json.data;
    console.log('\n✅ Connection Successful!');
    console.log(`🏪 Shop Name: ${data.shop.name}`);
    console.log(`💰 Currency: ${data.shop.currencyCode}`);

    console.log('\n📦 Sample Products Found:');
    data.products.edges.forEach(({ node }) => {
      console.log(`   - [${node.productType}] ${node.title}`);
      console.log(`     Tags: ${node.tags.join(', ')}`);
      const collections = node.collections.edges.map(e => e.node.title).join(', ');
      console.log(`     In Collections: ${collections}`);
    });

    console.log('\n📂 Collections Found:');
    data.collections.edges.forEach(({ node }) => {
      console.log(`   - ${node.title} (${node.handle})`);
    });

  } catch (error) {
    console.error('❌ Connection Failed:', error.message);
  }
}

auditStore();
