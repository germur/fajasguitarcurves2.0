
import { fetchCollectionByHandle } from '../src/lib/shopify-client';

async function listUniqueTags() {
    const handle = 'sculpt-studio';
    console.log(`Fetching tags from '${handle}'...`);

    try {
        const products = await fetchCollectionByHandle(handle);

        // Flatten all tags
        const allTags = products.flatMap(p => p.tags || []);

        // Unique and Sort
        const uniqueTags = [...new Set(allTags)].sort();

        console.log(`\nFound ${uniqueTags.length} Unique Tags:`);
        console.log("---------------------------------------------------");
        uniqueTags.forEach(t => console.log(`• ${t}`));
        console.log("---------------------------------------------------");

    } catch (e) {
        console.error(e);
    }
}

listUniqueTags();
