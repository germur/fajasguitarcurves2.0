import type { BreadcrumbItem } from './types';

// --- CONSTANTS ---
export const BRAND = "Guitar Curves";
export const BASE_URL = "https://guitarcurves.com";
export const DEFAULT_IMAGE = `${BASE_URL}/assets/social-share.jpg`;

// --- MAES FORMULA + MIAMI STYLE: Hybrid Spanglish for Dual-Market SEO ---
// --- MAES FORMULA + MIAMI STYLE: Hybrid Spanglish for Dual-Market SEO ---
export function generateMetaTags(product: any, lang: string = 'es') {
    if (!product) return {
        title: "Colombian Shapewear & BBL Fajas | Guitar Curves",
        description: "Discover Guitar Curves engineering. Stage 2 Fajas and Post-Surgical Bras designed to sculpt your hourglass waist and protect your investment."
    };

    let titleBase = product.title;
    const lowerTitle = titleBase.toLowerCase();

    // 0. CLEAN UP
    titleBase = titleBase.replace(/\s*\(Alta Compresión\)/gi, '');
    titleBase = titleBase.replace(/\s*\(Especial BBL\)/gi, '');
    titleBase = titleBase.replace(/\s*\(High Compression\)/gi, '');
    titleBase = titleBase.trim();

    // 1. ENGLISH KEYWORD LOGIC (Only for ES)
    let englishKeyword = "";
    if (lang === 'es') {
        if (lowerTitle.includes("reloj de arena")) englishKeyword = "Hourglass Shaper";
        else if (lowerTitle.includes("chaleco") && lowerTitle.includes("brasier")) englishKeyword = "Vest Shaper + Bra";
        else if (lowerTitle.includes("chaleco")) englishKeyword = "Colombian Vest Shaper";
        else if (lowerTitle.includes("etapa 2") || lowerTitle.includes("stage 2")) englishKeyword = "Stage 2 Post-Op";
        else if (lowerTitle.includes("etapa 3") || lowerTitle.includes("stage 3")) englishKeyword = "Stage 3 BBL Faja";
        else if (lowerTitle.includes("etapa 1") || lowerTitle.includes("stage 1")) englishKeyword = "Stage 1 Post-Op";
        else if (lowerTitle.includes("cinturilla")) englishKeyword = "Waist Trainer";
        else if (lowerTitle.includes("levanta cola")) englishKeyword = "Butt Lifter";
        else if (lowerTitle.includes("brasier") || lowerTitle.includes("bra")) englishKeyword = "Post-Surgical Bra";
        else if (lowerTitle.includes("short")) englishKeyword = "Compression Short";
        else if (lowerTitle.includes("pierna larga")) englishKeyword = "Full Body Faja";
        else if (lowerTitle.includes("media pierna")) englishKeyword = "Mid-Thigh Faja";
        else if (lowerTitle.includes("faja")) englishKeyword = "Colombian Shapewear";
        else englishKeyword = "Body Shaper";
    }

    // 2. Build Title
    let title = lang === 'es' && englishKeyword
        ? `${titleBase} (${englishKeyword}) | ${BRAND}`
        : `${titleBase} | ${BRAND}`;

    // 3. Truncation
    if (title.length > 65) {
        let shortBase = titleBase
            .replace(/ - .*$/, '')
            .replace(/Reductor /gi, '')
            .replace(/Removibles?/gi, '')
            .replace(/con Brasier/gi, '+ Bra')
            .replace(/\s+/g, ' ')
            .trim();

        title = lang === 'es' && englishKeyword
            ? `${shortBase} (${englishKeyword}) | ${BRAND}`
            : `${shortBase} | ${BRAND}`;

        if (title.length > 65) {
            title = lang === 'es' && englishKeyword ? `${shortBase} (${englishKeyword})` : `${shortBase}`;
        }
    }

    // 3. Description - Targeted Medical vs Aesthetic Logic
    const price = product.price || product.priceRange?.minVariantPrice?.amount || '';
    const safeTags = Array.isArray(product.tags) ? product.tags : [];

    const isMedical =
        safeTags.some((t: string) => /Post-Op|Stage|Etapa|Surgery|Lipo|BBL/i.test(t)) ||
        /Etapa|Stage|Post-Op|Post-M|Postquir|Recovery/i.test(titleBase) ||
        (product.category && /Recovery/i.test(product.category));

    let description = "";

    if (lang === 'en') {
        if (isMedical) {
            description = `Looking for ${product.title}? Professional Stage 2 & 3 Post-Op Faja for BBL & Lipo recovery. Medical grade compression. Buy now for $${price}.`;
        } else {
            description = `Get the hourglass look with ${product.title}. Best Colombian Waist Trainer & Butt Lifter for daily use. High compression. Price: $${price}.`;
        }
    } else {
        if (isMedical) {
            description = `¿Buscas ${product.title}? Faja Postquirúrgica Profesional (Etapa 2 y 3) para recuperación de BBL y Lipo. Compresión médica certificada. Compra hoy por $${price}.`;
        } else {
            description = `Consigue una cintura de avispa con ${product.title}. La mejor faja colombiana y levanta cola para uso diario. Alta compresión. Precio: $${price}.`;
        }
    }

    return { title, description };
}

// --- UNIVERSAL COMMERCE PROTOCOL (SCHEMA) ---

export function generateProductSchema(product: any, url: string) {
    // Robust image extraction for Shopify's varying structures
    let images: string[] = [];
    if (product.images?.edges) {
        images = product.images.edges.map((edge: any) => edge.node?.url || edge.node?.src).filter(Boolean);
    } else if (Array.isArray(product.images)) {
        images = product.images.map((img: any) => img.url || img.src || (typeof img === 'string' ? img : '')).filter(Boolean);
    } else if (product.image) {
        images = [product.image];
    }

    return {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "image": images,
        "description": product.description || `Shop ${product.title} from Guitar Curves. Premium Colombian shapewear.`,
        "sku": product.id || product.handle,
        "brand": {
            "@type": "Brand",
            "name": BRAND
        },
        "offers": {
            "@type": "Offer",
            "url": url,
            "priceCurrency": "USD",
            "price": product.price || product.priceRange?.minVariantPrice?.amount || "0",
            "priceValidUntil": getFutureDate(),
            "availability": product.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition",
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "USD"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 2,
                        "unitCode": "d"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 3,
                        "maxValue": 5,
                        "unitCode": "d"
                    }
                }
            }
        },
        // E-E-A-T: Aggregate Rating (Placeholder - Integrate with real reviews later)
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "124"
        }
    };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.item.startsWith('http') ? item.item : `${BASE_URL}${item.item}`
        }))
    };
}

export function generateToolSchema(name: string, description: string, url: string) {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": name,
        "description": description,
        "url": url,
        "applicationCategory": "HealthApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "author": {
            "@type": "Organization",
            "name": BRAND,
            "url": BASE_URL
        }
    };
}

export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": BRAND,
        "url": BASE_URL,
        "logo": `${BASE_URL}/assets/logo-guitar-curves.png`,
        "sameAs": [
            "https://www.tiktok.com/@guitarcurvesfajas",
            "https://www.instagram.com/guitarcurves"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-800-555-0199",
            "contactType": "Customer Service",
            "areaServed": "US",
            "availableLanguage": ["English", "Spanish"]
        }
    };
}
export function getFutureDate() { const d = new Date(); d.setFullYear(d.getFullYear() + 1); return d.toISOString().split('T')[0]; }
