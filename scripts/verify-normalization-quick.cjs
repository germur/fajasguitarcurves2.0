const Client = require('shopify-buy');
require('dotenv').config();

const domain = '92542c-b5.myshopify.com';
const storefrontAccessToken = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '04c58a7586c413051625b8a9aedd0416';

const client = Client.buildClient({
  domain,
  storefrontAccessToken,
  apiVersion: '2024-01'
});

async function run() {
  const handle = 'post-quirurgica';
  console.log('Fetching collection to verify normalization logic:', handle);
  
  try {
    const collection = await client.collection.fetchByHandle(handle);
    if (!collection || !collection.products) {
      console.log('Collection not found');
      return;
    }
    
    // SIMULATING THE NORMALIZATION LOGIC
    const normalized = collection.products.map((p) => {
      const firstImage = p.images && p.images[0];
      return {
        id: p.id,
        title: p.title,
        // Check what we get from accessing .src vs .url on the SDK object
        imageDebug: {
          originalSrc: firstImage ? firstImage.src : 'N/A',
          originalUrl: firstImage ? firstImage.url : 'N/A',
          normalizedUrl: firstImage ? (firstImage.src || firstImage.url) : 'N/A'
        }
      };
    });
    
    console.log('--- Verification Output ---');
    if (normalized.length > 0) {
      console.log('Product 0 Image Debug:', JSON.stringify(normalized[0].imageDebug, null, 2));
    } else {
      console.log('No products found to verify');
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
