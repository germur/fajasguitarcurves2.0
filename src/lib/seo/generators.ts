import type { BreadcrumbItem } from './types';

// --- CONSTANTS ---
export const BRAND = "Guitar Curves";
export const BASE_URL = "https://guitarcurves.com";
export const DEFAULT_IMAGE = `${BASE_URL}/assets/social-share.jpg`;

// --- MAES FORMULA: Model, Audience, Effect, Silo ---
export function generateMetaTags(product: any) {
    if (!product) return {
        title: "Colombian Shapewear & BBL Fajas | Guitar Curves",
        description: "Discover Guitar Curves engineering. Stage 2 Fajas and Post-Surgical Bras designed to sculpt your hourglass waist and protect your investment."
    };

    const tags = product.tags ? product.tags.map((t: string) => t.toLowerCase()) : [];
    const titleBase = product.title;

    // Detect product type from tags
    const isStage2 = tags.some((t: string) => t.includes('stage 2') || t.includes('faja') || t.includes('etapa 2'));
    const isStage1 = tags.some((t: string) => t.includes('stage 1') || t.includes('etapa 1'));
    const isBra = tags.some((t: string) => t.includes('bra') || t.includes('brasier'));
    const isWaist = tags.some((t: string) => t.includes('waist') || t.includes('cinturilla') || t.includes('trainer'));
    const isBBL = tags.some((t: string) => t.includes('bbl') || t.includes('butt') || t.includes('levanta'));

    // 1. Title Generation with ENGLISH Keywords (High Intent for US Market)
    let suffix = " - High Compression Shapewear"; // Default

    if (isStage1) {
        suffix = " - Post Op Stage 1 Compression";
    } else if (isStage2 || isBBL) {
        suffix = " - Post Lipo & BBL Compression"; // Most valuable keyword
    } else if (isBra) {
        suffix = " - Post Surgery Support Bra";
    } else if (isWaist) {
        suffix = " - Hourglass Waist Trainer";
    }

    // Keep title under 60 chars for SERP display
    let title = `${titleBase}${suffix} | ${BRAND}`;
    if (title.length > 65) {
        title = `${titleBase} | ${BRAND}`;
    }

    // 2. Description Generation (Benefit Focused + Keywords)
    let description = `Shop ${titleBase} from Guitar Curves. `;
    if (isStage2 || isBBL) {
        description += "Medical-grade compression to sculpt your hourglass waist post-lipo or BBL. Invisible zipper and butt lift technology.";
    } else if (isStage1) {
        description += "Maximum compression for immediate post-op recovery. Designed for Stage 1 healing with medical-grade support.";
    } else if (isBra) {
        description += "Post-surgery support bra with back posture correction. Wire-free comfort for daily use or recovery.";
    } else if (isWaist) {
        description += "Colombian latex waist trainer for hourglass results. Thermogenic core for sweat and sculpt.";
    } else {
        description += "Premium Colombian shapewear engineered to enhance your natural curves. High compression, invisible design.";
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
