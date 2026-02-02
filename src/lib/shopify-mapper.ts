/**
 * Shopify Mapper - "The Translator"
 * 
 * This utility bridges the gap between your specific Shopify Tags
 * and the rich structured data required by the Design OS logic.
 */

// Lógica de traducción interna
const SILO_DATA = {
    es: {
        names: {
            RECOVERY: "Postquirúrgicas",
            SCULPT: "Reloj de Arena",
            ESSENTIALS: "Brasieres"
        },
        descriptions: {
            RECOVERY: "Acelera tu recuperación con ingeniería textil colombiana de grado médico. Diseñadas específicamente para procesos de Etapa 2 y Etapa 3, nuestras fajas ofrecen la compresión exacta para reducir la inflamación, prevenir la fibrosis y proteger tus resultados de Lipo 360, BBL o Tummy Tuck. Sin oprimir glúteos ni caderas, solo el soporte que tu cirujano recomienda.",
            SCULPT: "Moldea una silueta de impacto con nuestras cinturillas y fajas de alta compresión. Diseñadas para el Cuerpo Guitarra, estas prendas logran una reducción máxima de cintura mientras realzan tus curvas naturales sin aplastarlas. El equilibrio perfecto entre una cintura de avispa y la comodidad que necesitas para destacar tu figura todos los días.",
            ESSENTIALS: "El soporte profesional que tu busto y espalda necesitan. Desde brasieres postoperatorios con corrector de postura hasta complementos esenciales para tu faja, cada prenda está fabricada con telas hipoalergénicas que cuidan tu piel. Soporte diario, estabilidad y descanso sin sacrificar la discreción bajo tu ropa."
        }
    },
    en: {
        names: {
            RECOVERY: "Post-Surgery",
            SCULPT: "Hourglass Sculpt",
            ESSENTIALS: "Bras & Essentials"
        },
        descriptions: {
            RECOVERY: "Accelerate your recovery with medical-grade Colombian textile engineering. Designed specifically for Stage 2 and Stage 3 processes, our fajas offer the exact compression needed to reduce inflammation, prevent fibrosis, and protect your Lipo 360, BBL, or Tummy Tuck results. No flattening of glutes or hips, just the support your surgeon recommends.",
            SCULPT: "Sculpt a stunning silhouette with our waist trainers and high-compression fajas. Designed for the Guitar Body, these garments achieve maximum waist reduction while enhancing your natural curves without flattening them. The perfect balance between a wasp waist and the comfort you need to stand out every day.",
            ESSENTIALS: "The professional support your bust and back need. From post-op bras with posture correctors to essential add-ons for your faja, every garment is made with hypoallergenic fabrics that care for your skin. Daily support, stability, and rest without sacrificing discretion under your clothes."
        }
    }
};

export const getSiloData = (lang: string = 'es') => {
    return SILO_DATA[lang as keyof typeof SILO_DATA] || SILO_DATA['es'];
};

// Backwards compatibility (Deprecated but kept to prevent immediate breakages until updated)
export const SILO_NAMES = SILO_DATA.es.names;
export const SILO_DESCRIPTIONS = SILO_DATA.es.descriptions;


export class ShopifyMapper {
    /**
     * Maps a raw Shopify Product Node to our specific Section Data schema
     */
    static mapProduct(shopifyProduct: any, siloType = 'standard', lang = 'es') {
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
            // Primary Image: Prefer URL string for compatibility
            image: (images[0] as any)?.url || images[0] || '',
            images: images,         // Now contains objects { url, altText }

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
                stage: this.getRecoveryStage(tags, lang),
                compression: this.getCompressionLevel(tags, lang),
                occasion: this.getOccasion(tags, lang),
                features: this.getFeaturesFromTags(tags, ['Cierre', 'Broches', 'Espalda Alta', 'Strapless', 'Short', 'Levanta Cola'])
            };
        } else if (siloType === 'sculpt') {
            return {
                ...mapped,
                stage: this.getRecoveryStage(tags, lang),
                compression: this.getCompressionLevel(tags, lang),
                occasion: this.getOccasion(tags, lang),
                features: this.getFeaturesFromTags(tags, ['Strapless', 'Levanta Cola', 'Latex', 'Invisible', 'Cierre', 'Broches'])
            };
        }

        if (siloType === 'guitar') {
            return {
                ...mapped,
                buttLift: this.getButtLiftLevel(tags, lang),
                bodyType: tags.includes('Plus Size') ? 'Plus Size' : (lang === 'en' ? 'Guitar/BBL' : 'Guitar/BBL'),
                compression: this.getCompressionLevel(tags, lang),
                techView: '',
                tags: tags.filter((t: string) => ['Espalda Alta', 'Silicone Lace'].includes(t))
            };
        }

        if (siloType === 'universal') {
            return {
                ...mapped,
                stage: this.getRecoveryStage(tags, lang),
                compression: this.getCompressionLevel(tags, lang),
                category: this.getCategory(tags, lang),
                occasion: this.getOccasion(tags, lang),
                features: this.getFeaturesFromTags(tags, [])
            };
        }

        if (siloType === 'essentials') {
            return {
                ...mapped,
                badge: tags.includes('Corrector de Postura') ? (lang === 'en' ? 'Posture Corrector' : 'Corrector Postura') : (lang === 'en' ? 'Medical Support' : 'Soporte Médico'),
                benefit: this.getEssentialsBenefit(tags, lang),
                stage: this.getRecoveryStage(tags, lang),
                compression: this.getCompressionLevel(tags, lang),
                features: this.getFeaturesFromTags(tags, ['Espalda Alta', 'Mangas', 'Cierre Frontal', 'Soporte'])
            };
        }

        return mapped;
    }

    // --- Helper Logic (The "Brain") ---

    static getCategory(tags: string[], lang = 'es') {


        // Helper to find original tag by lower match

        // Note: We return the raw tag usually, but for i18n we might want to map it?
        // Current logic returns the Shopify tag found.
        // If we want to translate the CATEGORY name displayed to user:
        // We really should return a generic key and translate in UI, OR map here.
        // Let's try basic mapping if specific tags found.

        // For now, returning the raw tag is risky if the tag is mixed language. 
        // But assumed tags are standardized. 
        // Let's implement basic translation based on detection.

        const match = this.detectCategory(tags);
        if (lang === 'en' && match) {
            // Map common Spanish tags to English
            const map: Record<string, string> = {
                'Cinturilla': 'Waist Trainer',
                'Faja Short': 'Short Faja',
                'Faja Etapa 2': 'Stage 2 Faja',
                'Faja Etapa 1': 'Stage 1 Faja',
                'Brasier': 'Bra',
                'Tabla': 'Board',
                'Espuma': 'Foam',
                'Chaleco': 'Vest'
            };
            // flexible matching for the returned string
            const key = Object.keys(map).find(k => match.includes(k));
            if (key) return map[key];
        }

        return match || (lang === 'en' ? 'Various' : 'Varios');
    }

    static detectCategory(tags: string[]) {
        const lowerTags = tags.map(t => t.toLowerCase());
        const findTag = (keyword: string) => {
            const index = lowerTags.findIndex(t => t.includes(keyword));
            return index !== -1 ? tags[index] : null;
        };

        const tier1 = [
            'faja etapa', 'faja post', 'faja chaleco', 'faja short',
            'cinturilla', 'corset', 'chaleco', 'body moldeador',
            'mallas', 'faja de mantenimiento', 'faja con brasier',
            'full body shaper'
        ];

        for (const k of tier1) {
            const match = findTag(k);
            if (match) return match;
        }

        const tier2 = ['faja', 'short', 'brasier', 'tabla'];
        for (const k of tier2) {
            const match = findTag(k);
            if (match) return match;
        }
        return null;
    }

    static getRecoveryStage(tags: string[], lang = 'es') {
        if (tags.some(t => t === 'Stage 1' || t.includes('Etapa 1'))) return lang === 'en' ? 'Stage 1' : 'Etapa 1';
        if (tags.some(t => t === 'Stage 2' || t.includes('Etapa 2'))) return lang === 'en' ? 'Stage 2' : 'Etapa 2';
        if (tags.some(t => t === 'Stage 3' || t.includes('Etapa 3'))) return lang === 'en' ? 'Stage 3' : 'Etapa 3';
        return '';
    }

    static getOccasion(tags: string[], lang = 'es') {
        // GOLDEN LIST
        if (tags.some(t => t === 'Uso Deportivo' || t.includes('Deportivo') || t.includes('Gym'))) return lang === 'en' ? 'Sports / Gym' : 'Uso Deportivo';
        if (tags.some(t => t === 'Uso Diario' || t.includes('Cintura de Avispa'))) return lang === 'en' ? 'Daily Use' : 'Uso Diario';
        if (tags.some(t => t === 'Faja Invisible' || t === 'Strapless' || t.includes('Invisible'))) return lang === 'en' ? 'Dress / Invisible' : 'Vestido / Invisible';
        if (tags.some(t => t === 'Faja Postoperatoria' || t.includes('Post-Op') || t.includes('BBL') || t.includes('Post-Quirúrgico'))) return lang === 'en' ? 'Post-Op / BBL' : 'Post-Op / BBL';
        if (tags.some(t => t === 'Oficina' || t.includes('Soporte de Espalda'))) return lang === 'en' ? 'Office Support' : 'Oficina';

        // FALLBACK
        const lowerTags = tags.map(t => t.toLowerCase());
        if (lowerTags.includes('daily')) return lang === 'en' ? 'Daily Use' : 'Uso Diario';

        return '';
    }

    static getCompressionLevel(tags: string[], lang = 'es') {
        if (tags.some(t => t === 'Alta Compresión' || t === 'High Compression')) return lang === 'en' ? 'High' : 'Alta';
        if (tags.some(t => t === 'Baja Compresión' || t === 'Light Compression')) return lang === 'en' ? 'Low' : 'Baja';
        if (tags.some(t => t === 'Media Compresión' || t === 'Medium Compression')) return lang === 'en' ? 'Medium' : 'Media';
        return '';
    }

    static getButtLiftLevel(tags: string[], lang = 'es') {
        const lowerTags = tags.map(t => t.toLowerCase());
        if (lowerTags.some(t => t.includes('ultra realce') || t.includes('butt lifter'))) return lang === 'en' ? 'Ultra Lift' : 'Ultra Realce';
        if (lowerTags.some(t => t.includes('natural'))) return 'Natural';
        return lang === 'en' ? 'Invisible' : 'Invisible';
    }

    static getEssentialsBenefit(tags: string[], lang = 'es') {
        if (tags.some(t => t.toLowerCase().includes('postura')))
            return lang === 'en' ? "Corrects posture and relieves back pain instantly." : "Corrige tu postura y alivia el dolor de espalda inmediatamente.";
        if (tags.some(t => t.toLowerCase().includes('mangas')))
            return lang === 'en' ? "Total arm and back control with maximum softness." : "Control total de brazos y espalda con máxima suavidad.";
        return lang === 'en' ? "Certified medical support and rest for your bust." : "Soporte médico certificado y descanso para tu busto.";
    }

    static getFeaturesFromTags(tags: string[], _keywords: string[]) {
        const LOWER_SYSTEM_TAGS = [
            'best seller', 'más vendido', 'new arrival', 'nuevo', 'sale', 'oferta',
            'gym', 'activewear', 'arm shaper', 'body moldeador', 'lipo 360',
            'full body', 'guitar shape', 'bbl', 'special occasion',
            'daily use', 'workout', 'post op', 'surgery', 'leggings',
            'butt lifter', 'levanta cola', 'invisible', 'seamless', 'powernet', 'strapless',
            'full body shaper', 'high back', 'high compression', 'light compression', 'medium compression',
            'knee length', 'post lipo', 'stage 1', 'stage 2', 'stage 3', 'waist trainer', 'daily use',
            'braquioplastia', 'post-op', 'post surgery'
        ];

        return tags.filter(tag => {
            const t = tag.toLowerCase();
            if (LOWER_SYSTEM_TAGS.some(sys => t === sys || t.includes(sys))) return false;
            return true;
        });
    }
}
