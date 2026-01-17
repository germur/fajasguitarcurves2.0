/**
 * Shopify Mapper - "The Translator"
 * 
 * This utility bridges the gap between your specific Shopify Tags
 * and the rich structured data required by the Design OS logic.
 */

export class ShopifyMapper {
    /**
     * Maps a raw Shopify Product Node to our specific Section Data schema
     */
    static mapProduct(shopifyProduct: any, siloType = 'standard') {
        const tags = shopifyProduct.tags || [];
        const title = shopifyProduct.title;

        // PRICE MAPPING (Robust)
        let price = 0;
        if (shopifyProduct.priceRange?.minVariantPrice?.amount) {
            price = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount);
        } else if (shopifyProduct.variants && shopifyProduct.variants.length > 0) {
            // Unrolling SDK structure or simple array
            const v = shopifyProduct.variants[0];
            const val = v.price?.amount ?? v.price; // Handle { amount: "100" } or "100"
            price = parseFloat(val);
        }
        if (isNaN(price)) price = 0; // Final safety net

        // IMAGE MAPPING (Robust)
        let images: string[] = [];
        if (shopifyProduct.images?.edges) {
            // Raw GraphQL
            images = shopifyProduct.images.edges.map((edge: any) => edge.node.url);
        } else if (Array.isArray(shopifyProduct.images)) {
            // SDK or Simple Array
            images = shopifyProduct.images.map((img: any) => {
                const url = img.url || img.src || img;
                return typeof url === 'string' ? url : '';
            }).filter(Boolean);
        }

        // VARIANT MAPPING (Robust)
        const mapVariant = (v: any) => {
            const node = v.node || v; // Handle Edge or Direct Object
            return {
                id: node.id,
                title: node.title,
                available: node.availableForSale ?? node.available,
                price: parseFloat(node.price?.amount || node.price || '0'),
                image: node.image?.url || node.image?.src || '',
                selectedOptions: node.selectedOptions || [],
                size: node.title
            };
        };

        const rawVariants = shopifyProduct.variants?.edges || shopifyProduct.variants || [];
        const variants = rawVariants.map(mapVariant);

        // Base Object
        const mapped = {
            id: shopifyProduct.id,
            title: title,
            price: price, // Number
            image: images[0] || '', // Primary
            images: images,         // All images for galleries/hovers

            // Compatibility for SculptProductCard
            imageProduct: images[0] || '',
            imageResult: images[1] || images[0] || '',

            tags: tags,
            handle: shopifyProduct.handle,
            variants: variants,
            options: shopifyProduct.options || [],
            isBestSeller: tags.includes('Best Seller') || tags.includes('Más Vendido'),
        };

        // Silo-Specific Logic
        if (siloType === 'medical') {
            return {
                ...mapped,
                stage: this.getRecoveryStage(tags),
                compression: this.getCompressionLevel(tags),
                occasion: this.getOccasion(tags), // Added to populate Usage filters
                features: this.getFeaturesFromTags(tags, ['Cierre', 'Broches', 'Espalda Alta', 'Strapless', 'Short', 'Levanta Cola'])
            };
        } else if (siloType === 'sculpt') {
            return {
                ...mapped,
                stage: this.getRecoveryStage(tags), // Added for consistency
                compression: this.getCompressionLevel(tags),
                occasion: this.getOccasion(tags),
                features: this.getFeaturesFromTags(tags, ['Strapless', 'Levanta Cola', 'Latex', 'Invisible', 'Cierre', 'Broches'])
            };
        }

        if (siloType === 'guitar') {
            return {
                ...mapped,
                buttLift: this.getButtLiftLevel(tags),
                bodyType: tags.includes('Plus Size') ? 'Plus Size' : 'Guitar/BBL',
                compression: this.getCompressionLevel(tags),
                techView: '',
                tags: tags.filter((t: string) => ['Espalda Alta', 'Silicone Lace'].includes(t))
            };
        }

        if (siloType === 'universal') {
            return {
                ...mapped,
                stage: this.getRecoveryStage(tags),
                compression: this.getCompressionLevel(tags),
                occasion: this.getOccasion(tags),
                features: this.getFeaturesFromTags(tags, [
                    'Strapless', 'Espalda Alta', 'Cierre', 'Broches',
                    'Levanta Cola', 'Latex', 'Invisible', 'Short'
                ])
            };
        }

        return mapped;
    }

    // --- Helper Logic (The "Brain") ---

    static getRecoveryStage(tags: string[]) {
        if (tags.some(t => t === 'Stage 1')) return 'Stage 1';
        if (tags.some(t => t === 'Stage 2')) return 'Stage 2';
        if (tags.some(t => t === 'Stage 3')) return 'Stage 3';
        return ''; // No default if not found
    }

    static getOccasion(tags: string[]) {
        const lowerTags = tags.map(t => t.toLowerCase());

        // Exact matches from verified list
        if (lowerTags.includes('gym')) return 'gym';
        if (tags.includes('Post-Op Bra')) return 'bra';
        if (tags.includes('Special Occasion') || lowerTags.includes('dress') || lowerTags.includes('strapless')) return 'dress';
        if (tags.includes('Daily Use') || lowerTags.includes('jeans')) return 'jeans';
        if (tags.includes('BBL') || lowerTags.includes('guitar shape')) return 'bbl';

        return ''; // NO DEFAULT - Hide if not found
    }

    static getCompressionLevel(tags: string[]) {
        if (tags.includes('High Compression')) return 'Alta';
        if (tags.includes('Light Compression')) return 'Baja';
        if (tags.includes('Medium Compression')) return 'Media';
        return ''; // NO DEFAULT
    }

    static getButtLiftLevel(tags: string[]) {
        const lowerTags = tags.map(t => t.toLowerCase());
        if (lowerTags.some(t => t.includes('ultra realce') || t.includes('butt lifter'))) return 'Ultra Realce';
        if (lowerTags.some(t => t.includes('natural'))) return 'Natural';
        return 'Invisible';
    }

    static getOccasionFromTags(tags: string[]) {
        if (tags.some(t => t.match(/novia/i) || t.match(/wedding/i))) return 'wedding';
        if (tags.some(t => t.match(/postura/i) || t.match(/office/i))) return 'office';
        return 'date_night'; // Default fallback
    }

    static getUsageDuration(tags: string[]) {
        if (tags.some(t => t.match(/daily/i) || t.match(/diario/i))) return '8-12 Hours (Office)';
        if (tags.some(t => t.match(/event/i))) return '4-6 Hours (Event)';
        return '24 Hours (Second Skin)';
    }

    static getComfortScore(tags: string[]) {
        // Inverse to compression usually
        if (this.getCompressionLevel(tags) === 'Alta') return 60;
        if (this.getCompressionLevel(tags) === 'Media') return 85;
        return 95;
    }

    static getFeaturesFromTags(tags: string[], keywords: string[]) {
        // Expanded with verified tags
        const expandedKeywords = [
            ...keywords,
            'High Back', 'Espalda Alta',
            'Knee Length', 'Media Pierna',
            'Arm Compression', 'Mangas', 'Faja con Mangas',
            'Strapless', 'Tiras Removibles',
            'Side Zipper', 'Cierre Lateral', 'Cierre',
            'Seamless', 'Invisible',
            'Butt Lifter', 'Levanta Cola',
            'Short', 'Powernet', 'Latex',
            'Waist Trainer', 'Cinturilla', 'Trainer'
        ];

        return tags.filter(tag =>
            expandedKeywords.some(k => tag.toLowerCase().includes(k.toLowerCase()))
        );
    }
}
