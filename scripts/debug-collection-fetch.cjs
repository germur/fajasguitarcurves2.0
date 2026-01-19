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
  const handle = 'post-quirurgica'; // or 'sculpt-studio'
  console.log('Fetching collection:', handle);
  
  try {
    const collection = await client.collection.fetchByHandle(handle);
    if (!collection) {
      console.log('Collection not found');
      return;
    }
    
    console.log('Product count:', collection.products.length);
    
    if (collection.products.length > 0) {
      const p = collection.products[0];
      console.log('First product ID:', p.id);
      console.log('First product title:', p.title);
      console.log('First product keys:', Object.keys(p));
      console.log('product.images type:', typeof p.images, Array.isArray(p.images));
      
      if (p.images && p.images.length > 0) {
        console.log('product.images[0] keys:', Object.keys(p.images[0]));
        console.log('product.images[0]:', JSON.stringify(p.images[0], null, 2));
      } else {
        console.log('No images array or empty');
      }
      
      // Check for other image fields
      console.log('product.image:', p.image);
      console.log('product.featuredImage:', p.featuredImage);
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
