/**
 * Sync Store Data
 * Fetches real data from Shopify and hydrates the Design OS JSON files.
 * Transforms Tags -> Structured Data using ShopifyMapper logic.
 */

import fs from 'fs';
import path from 'path';

// Fix for __dirname in ESM
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const CONFIG = {
    domain: 'fajasguitarcurves.com',
    token: '04c58a7586c413051625b8a9aedd0416', // Provided by user
    silos: [
        {
            id: 'medical-hub',
            collectionHandle: 'post-operatoria',
            type: 'medical',
            targetFile: 'product/sections/medical-hub/data.json'
        },
        {
            id: 'guitar-curves',
            collectionHandle: 'reloj-de-arena',
            type: 'guitar',
            targetFile: 'product/sections/guitar-curves/data.json'
        },
        {
            id: 'lifestyle',
            collectionHandle: 'uso-diario',
            type: 'lifestyle',
            targetFile: 'product/sections/lifestyle/data.json'
        }
    ]
};

// --- Embedded Mapper Logic for Node Script (Duplicating critical logic to avoid import module issues in standalone script) ---
const Mapper = {
    mapProduct(p, type) {
        const tags = p.tags || [];
        const base = {
            id: p.id,
            title: p.title,
            price: parseFloat(p.priceRange?.minVariantPrice?.amount || '0'),
            image: p.images?.edges?.[0]?.node?.url || '',
            tags: tags,
            isBestSeller: tags.some(t => t.toLowerCase().includes('best') || t.toLowerCase().includes('vendido'))
        };

        if (type === 'medical') {
            return {
                ...base,
                stage: tags.some(t => t.match(/etapa.*1/i)) ? 'Stage 1' : tags.some(t => t.match(/etapa.*3/i)) ? 'Stage 3' : 'Stage 2',
                compression: 'Alta', // Defaulting for visualizer
                features: tags.slice(0, 3)
            };
        }
        if (type === 'guitar') {
            return {
                ...base,
                buttLift: tags.some(t => t.match(/natural/i)) ? 'Natural' : 'Ultra Realce',
                bodyType: 'Guitar/BBL',
                compression: 'Alta',
                features: tags.slice(0, 2),
                techView: base.image // Fallback
            };
        }
        if (type === 'lifestyle') {
            const isOffice = tags.some(t => t.match(/daily/i) || t.match(/diario/i) || t.match(/postur/i));
            return {
                ...base,
                occasion: isOffice ? 'office' : (tags.some(t => t.match(/novia/i)) ? 'wedding' : 'date_night'),
                usageDuration: isOffice ? '8-12 Hours (Office)' : '4-6 Hours (Event)',
                comfortLevel: isOffice ? 90 : 60,
                invisibility: 'High'
            };
        }
        return base;
    }
};

async function fetchCollection(handle) {
    const query = `
    {
      collectionByHandle(handle: "${handle}") {
        title
        products(first: 10) {
          edges {
            node {
              id
              title
              tags
              priceRange { minVariantPrice { amount } }
              images(first: 1) { edges { node { url } } }
            }
          }
        }
      }
    }
    `;

    const response = await fetch(`https://${CONFIG.domain}/api/2023-10/graphql.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': CONFIG.token,
        },
        body: JSON.stringify({ query }),
    });

    const json = await response.json();
    return json.data?.collectionByHandle?.products?.edges?.map(e => e.node) || [];
}

async function run() {
    console.log('🔄 Starting Data Sync...');

    for (const silo of CONFIG.silos) {
        console.log(`\n📦 Syncing Silo: ${silo.id} (Collection: ${silo.collectionHandle})...`);

        try {
            // 1. Fetch
            const rawProducts = await fetchCollection(silo.collectionHandle);
            console.log(`   Found ${rawProducts.length} products.`);

            if (rawProducts.length === 0) {
                console.warn('   ⚠️ No products found! Skipping file update.');
                continue;
            }

            // 2. Map
            const mappedProducts = rawProducts.map(p => Mapper.mapProduct(p, silo.type));

            // 3. Read existing file
            const filePath = path.join(process.cwd(), silo.targetFile);
            let currentData = {};
            if (fs.existsSync(filePath)) {
                currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            }

            // 4. Merge (Replace products, keep other keys)
            const newData = {
                ...currentData,
                products: mappedProducts
            };

            // 5. Write
            fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
            console.log(`   ✅ Updated ${silo.targetFile}`);

        } catch (e) {
            console.error(`   ❌ Error syncing ${silo.id}:`, e.message);
        }
    }
    console.log('\n✨ Sync Complete!');
}

run();
