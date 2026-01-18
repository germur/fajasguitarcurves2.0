import type { BreadcrumbItem } from './types';

// --- CONSTANTS ---
export const BRAND = "Guitar Curves";
export const BASE_URL = "https://guitarcurves.com";
export const DEFAULT_IMAGE = `${BASE_URL}/assets/social-share.jpg`;

// --- MAES FORMULA + MIAMI STYLE: Hybrid Spanglish for Dual-Market SEO ---
export function generateMetaTags(product: any) {
    if (!product) return {
        title: "Colombian Shapewear & BBL Fajas | Guitar Curves",
        description: "Discover Guitar Curves engineering. Stage 2 Fajas and Post-Surgical Bras designed to sculpt your hourglass waist and protect your investment."
    };

    const titleBase = product.title;
    const lowerTitle = titleBase.toLowerCase();

    // 1. MIAMI STYLE: Map Spanish product names to English keywords
    // Format: "Faja Reloj de Arena (Hourglass Body Shaper) | Guitar Curves"
    let englishKeyword = "";

    if (lowerTitle.includes("reloj de arena")) englishKeyword = "Hourglass Body Shaper";
    else if (lowerTitle.includes("etapa 2") || lowerTitle.includes("stage 2")) englishKeyword = "Stage 2 Post-Op Faja";
    else if (lowerTitle.includes("etapa 1") || lowerTitle.includes("stage 1")) englishKeyword = "Stage 1 Compression";
    else if (lowerTitle.includes("cinturilla")) englishKeyword = "Waist Trainer Corset";
    else if (lowerTitle.includes("levanta cola")) englishKeyword = "Butt Lifter Short";
    else if (lowerTitle.includes("brasier") || lowerTitle.includes("bra")) englishKeyword = "Post-Surgical Bra";
    else if (lowerTitle.includes("short")) englishKeyword = "Compression Short";
    else if (lowerTitle.includes("faja")) englishKeyword = "Colombian Shapewear";
    else englishKeyword = "High Compression Shapewear";

    // 2. Build hybrid title - avoid duplication if English keyword already present
    let title: string;
    if (lowerTitle.includes(englishKeyword.toLowerCase())) {
        title = `${titleBase} | ${BRAND}`;
    } else {
        title = `${titleBase} (${englishKeyword}) | ${BRAND}`;
    }

    // Truncate if too long for SERP (max ~60 chars visible)
    if (title.length > 65) {
        title = `${titleBase} | ${BRAND}`;
    }

    // 3. Description - English focused with Spanish flavor
    const price = product.price || product.priceRange?.minVariantPrice?.amount || '';
    const priceStr = price ? ` Price: $${price} USD.` : '';

    let description = `Buy ${titleBase}. `;
    if (lowerTitle.includes("etapa 2") || lowerTitle.includes("stage 2") || lowerTitle.includes("bbl")) {
        description += `Authentic Colombian Fajas for BBL & Lipo recovery. Medical-grade compression.${priceStr}`;
    } else if (lowerTitle.includes("etapa 1") || lowerTitle.includes("stage 1")) {
        description += `Post-op Stage 1 compression for immediate recovery. Medical-grade support.${priceStr}`;
    } else if (lowerTitle.includes("cinturilla") || lowerTitle.includes("waist")) {
        description += `Colombian latex waist trainer for hourglass results. Thermogenic core.${priceStr}`;
    } else if (lowerTitle.includes("brasier") || lowerTitle.includes("bra")) {
        description += `Post-surgery support bra with posture correction. Wire-free daily comfort.${priceStr}`;
    } else {
        description += `Premium Colombian shapewear. High compression, invisible design.${priceStr}`;
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
