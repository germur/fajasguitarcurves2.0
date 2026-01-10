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
        const price = parseFloat(shopifyProduct.priceRange?.minVariantPrice?.amount || '0');

        // Base Object
        const mapped = {
            id: shopifyProduct.id,
            title: title,
            price: price,
            image: shopifyProduct.images?.edges?.[0]?.node?.url || '',
            tags: tags,
            isBestSeller: tags.includes('Best Seller') || tags.includes('Más Vendido'),
        };

        // Silo-Specific Logic
        if (siloType === 'medical') {
            return {
                ...mapped,
                stage: this.getRecoveryStage(tags),
                compression: this.getCompressionLevel(tags),
                features: this.getFeaturesFromTags(tags, ['Cierre', 'Broches', 'Espalda Alta'])
            };
        }

        if (siloType === 'guitar') {
            return {
                ...mapped,
                buttLift: this.getButtLiftLevel(tags),
                bodyType: tags.includes('Plus Size') ? 'Plus Size' : 'Guitar/BBL',
                compression: this.getCompressionLevel(tags),
                techView: '', // Placeholder for now, requires specific metafield later
                tags: tags.filter((t: string) => ['Espalda Alta', 'Silicone Lace'].includes(t))
            };
        }

        if (siloType === 'lifestyle') {
            return {
                ...mapped,
                occasion: this.getOccasionFromTags(tags),
                usageDuration: this.getUsageDuration(tags),
                comfortLevel: this.getComfortScore(tags),
                invisibility: tags.includes('Seamless') || tags.includes('Invisible') ? 'Ultra' : 'Medium',
            };
        }

        return mapped;
    }

    // --- Helper Logic (The "Brain") ---

    static getRecoveryStage(tags: string[]) {
        if (tags.some(t => t.match(/etapa.*1/i))) return 'Stage 1';
        if (tags.some(t => t.match(/etapa.*3/i))) return 'Stage 3';
        return 'Stage 2'; // Default safe bet for Post-Op if unspecified
    }

    static getCompressionLevel(tags: string[]) {
        if (tags.some(t => t.match(/alta.*compresion/i) || t.match(/high.*compression/i))) return 'Alta';
        if (tags.some(t => t.match(/media/i))) return 'Media';
        if (tags.some(t => t.match(/baja/i))) return 'Baja';
        return 'Alta'; // Brand standard
    }

    static getButtLiftLevel(tags: string[]) {
        if (tags.some(t => t.match(/ultra.*realce/i) || t.match(/butt.*lifter/i))) return 'Ultra Realce';
        if (tags.some(t => t.match(/natural/i))) return 'Natural';
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
        // Extract specific tech features present in tags
        return tags.filter(tag => keywords.some(k => tag.toLowerCase().includes(k.toLowerCase())));
    }
}
