/**
 * Shopify Mapper - "The Translator"
 * 
 * This utility bridges the gap between your specific Shopify Tags
 * and the rich structured data required by the Design OS logic.
 */

// Lógica de traducción interna
export const SILO_NAMES = {
    RECOVERY: "Postquirúrgicas",
    SCULPT: "Reloj de Arena",
    ESSENTIALS: "Brasieres"
};

export const SILO_DESCRIPTIONS = {
    RECOVERY: "Acelera tu recuperación con ingeniería textil colombiana de grado médico. Diseñadas específicamente para procesos de Etapa 2 y Etapa 3, nuestras fajas ofrecen la compresión exacta para reducir la inflamación, prevenir la fibrosis y proteger tus resultados de Lipo 360, BBL o Tummy Tuck. Sin oprimir glúteos ni caderas, solo el soporte que tu cirujano recomienda.",
    SCULPT: "Moldea una silueta de impacto con nuestras cinturillas y fajas de alta compresión. Diseñadas para el Cuerpo Guitarra, estas prendas logran una reducción máxima de cintura mientras realzan tus curvas naturales sin aplastarlas. El equilibrio perfecto entre una cintura de avispa y la comodidad que necesitas para destacar tu figura todos los días.",
    ESSENTIALS: "El soporte profesional que tu busto y espalda necesitan. Desde brasieres postoperatorios con corrector de postura hasta complementos esenciales para tu faja, cada prenda está fabricada con telas hipoalergénicas que cuidan tu piel. Soporte diario, estabilidad y descanso sin sacrificar la discreción bajo tu ropa."
};

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
        // UPDATED: Return objects with { url, altText } instead of just strings to enable Alt Matching
        let images: { url: string; altText: string }[] | string[] = [];
        if (shopifyProduct.images?.edges) {
            // Raw GraphQL
            images = shopifyProduct.images.edges.map((edge: any) => ({
                url: edge.node.url,
                altText: edge.node.altText || ''
            }));
        } else if (Array.isArray(shopifyProduct.images)) {
            // SDK or Simple Array - Ensure we keep metadata if available
            images = shopifyProduct.images.map((img: any) => {
                const url = img.url || img.src || (typeof img === 'string' ? img : '');
                const altText = img.altText || img.alt || '';
                return { url, altText };
            }).filter((img: any) => img.url);
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
            // Primary Image: Prefer URL string for compatibility, but keep objects in array
            image: (images[0] as any)?.url || images[0] || '',
            images: images,         // Now contains objects { url, altText }

            // Compatibility for SculptProductCard
            // Compatibility for SculptProductCard
            imageProduct: (images[0] as any)?.url || images[0] || '',
            imageResult: (images[1] as any)?.url || images[1] || (images[0] as any)?.url || images[0] || '',

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
                category: this.getCategory(tags), // RESTORED: ProductType is empty, must infer from tags
                occasion: this.getOccasion(tags),
                features: this.getFeaturesFromTags(tags, [])
            };
        }

        if (siloType === 'essentials') {
            return {
                ...mapped,
                badge: tags.includes('Corrector de Postura') ? 'Corrector Postura' : 'Soporte Médico', // Dynamic Badge
                benefit: this.getEssentialsBenefit(tags),
                stage: this.getRecoveryStage(tags),
                compression: this.getCompressionLevel(tags),
                features: this.getFeaturesFromTags(tags, ['Espalda Alta', 'Mangas', 'Cierre Frontal', 'Soporte'])
            };
        }

        return mapped;
    }

    // --- Helper Logic (The "Brain") ---

    // RESTORED & PROPERLY DYNAMIC: Extract Exact Category Tag
    static getCategory(tags: string[]) {
        const lowerTags = tags.map(t => t.toLowerCase());

        // Helper to find original tag by lower match
        const findTag = (keyword: string) => {
            const index = lowerTags.findIndex(t => t.includes(keyword));
            return index !== -1 ? tags[index] : null;
        };

        // 1. HIGH SPECIFICITY (Return exact tag like "Faja Etapa 3")
        const tier1 = [
            'faja etapa', 'faja post', 'faja chaleco', 'faja short',
            'cinturilla', 'corset', 'chaleco', 'body moldeador',
            'mallas', 'faja de mantenimiento', 'faja con brasier',
            'full body shaper' // Map this -> 'Faja Completa' if we want, but better to skip if user hates English.
            // REMOVED: 'body' (too broad, catches 'Full Body'), 'leggings', 'set'
        ];

        // Anti-Pattern: If we match "Full Body", we strictly ignore it so we don't display it
        // actually, logic below ignores checks keywords. If I don't check for 'full body', it won't return it.

        for (const k of tier1) {
            const match = findTag(k);
            if (match) {
                // Double check: If the matched tag is PURELY English, ignore it?
                // No, just don't include English keywords in Tier 1.
                // "body" matched "Full Body". Removing "body" fixes it.
                return match;
            }
        }

        // 2. GENERIC TYPES
        const tier2 = ['faja', 'short', 'brasier', 'tabla'];
        // REMOVED: 'bra' (use 'brasier')

        for (const k of tier2) {
            const match = findTag(k);
            if (match) return match;
        }

        return 'Varios';
    }

    static getRecoveryStage(tags: string[]) {
        if (tags.some(t => t === 'Stage 1' || t.includes('Etapa 1'))) return 'Etapa 1';
        if (tags.some(t => t === 'Stage 2' || t.includes('Etapa 2'))) return 'Etapa 2';
        if (tags.some(t => t === 'Stage 3' || t.includes('Etapa 3'))) return 'Etapa 3';
        return ''; // No default if not found
    }

    static getOccasion(tags: string[]) {
        // 1. GOLDEN LIST (Official Spanish Tags from CSV)
        // These are the specific tags the user wants to see
        if (tags.includes('Uso Deportivo') || tags.includes('Faja de Neopreno')) return 'Uso Deportivo';
        if (tags.includes('Uso Diario') || tags.includes('Cintura de Avispa')) return 'Uso Diario';
        if (tags.includes('Faja Invisible') || tags.includes('Strapless')) return 'Vestido / Invisible';
        if (tags.includes('Faja Postoperatoria') || tags.includes('Recuperación BBL')) return 'Post-Op / BBL';
        if (tags.includes('Oficina') || tags.includes('Soporte de Espalda')) return 'Oficina';
        if (tags.includes('Faja con Brasier') || tags.includes('Post-Quirúrgico')) return 'Post-Quirúrgico';

        // 2. FALLBACK (Legacy/English cleanup)
        // Kept silently to ensure UI doesn't break if API sends old data
        const lowerTags = tags.map(t => t.toLowerCase());
        if (lowerTags.includes('gym') || lowerTags.includes('workout') || lowerTags.includes('activewear')) return 'Uso Deportivo';
        if (lowerTags.includes('dress') || lowerTags.includes('wedding') || lowerTags.includes('boda') || lowerTags.includes('novia')) return 'Vestido / Invisible';
        if (lowerTags.includes('daily') || lowerTags.includes('jeans')) return 'Uso Diario';
        if (tags.includes('BBL') || lowerTags.includes('guitar shape') || lowerTags.includes('lipo 360')) return 'Post-Op / BBL';

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

    static getEssentialsBenefit(tags: string[]) {
        if (tags.some(t => t.toLowerCase().includes('postura'))) return "Corrige tu postura y alivia el dolor de espalda inmediatamente.";
        if (tags.some(t => t.toLowerCase().includes('mangas'))) return "Control total de brazos y espalda con máxima suavidad.";
        return "Soporte médico certificado y descanso para tu busto.";
    }

    static getFeaturesFromTags(tags: string[], _keywords: string[]) {
        // dynamic BLACKLIST approach:
        // We want to show ALL unique tags from the inventory as features, 
        // EXCEPT for those we have already categorized into 'Category', 'Stage', 'Compression', 'Occasion'.
        // and internal system tags.

        const LOWER_SYSTEM_TAGS = [
            // Internal / Status (Keep these blocked)
            'best seller', 'más vendido', 'new arrival', 'nuevo', 'sale', 'oferta',

            // LEGACY / GARBAGE TO HIDE (User Explicit Request)
            'gym', 'activewear', 'arm shaper', 'body moldeador', 'lipo 360',
            'full body', 'guitar shape', 'bbl', 'special occasion',
            'daily use', 'workout', 'post op', 'surgery', 'leggings',
            'butt lifter', 'levanta cola', 'invisible', 'seamless', 'powernet', 'strapless',

            // NEWLY IDENTIFIED LEAKS (From Browser Inspection)
            'full body shaper', 'high back', 'high compression', 'light compression',
            'knee length', 'post lipo', 'stage 3', 'waist trainer', 'braquioplastia' // User might want Braquioplastia? It's Spanish. Keep it? 
            // The user complained about "Tags in English". Braquioplastia is Spanish. 
            // I will block the English ones: High Back, High Compression, Knee Length, Light Compression, Post Lipo, Stage 3, Waist Trainer.
        ];

        return tags.filter(tag => {
            const t = tag.toLowerCase();
            // Filter out system tags
            if (LOWER_SYSTEM_TAGS.some(sys => t === sys || t.includes(sys))) return false;

            // Keep everything else as a "Feature"
            return true;
        });
    }
}
