import type { BreadcrumbItem } from './types';

// --- CONSTANTS ---
export const BRAND = "Guitar Curves";
export const BASE_URL = "https://guitarcurves.com";
export const DEFAULT_IMAGE = `${BASE_URL}/assets/social-share.jpg`;

// --- MAES FORMULA: Model, Audience, Effect, Silo ---
export function generateMetaTags(product: any) {
    if (!product) return {
        title: "Fajas Colombianas Guitar Curves | Cintura de Avispa & BBL",
        description: "Descubre la ingeniería textil de Guitar Curves. Fajas Stage 2 y Brasieres Post-Quirúrgicos diseñados para moldear tu cintura y proteger tu inversión."
    };

    const tags = product.tags ? product.tags.map((t: string) => t.toLowerCase()) : [];
    const isStage2 = tags.some((t: string) => t.includes('stage 2') || t.includes('faja'));
    const isBra = tags.some((t: string) => t.includes('bra') || t.includes('brasier'));
    const isWaist = tags.some((t: string) => t.includes('waist') || t.includes('cinturilla'));

    // 1. Title Generation (High Intent)
    let title = `${product.title} | ${BRAND}`;
    if (isStage2) title = `Faja Stage 2 Reloj de Arena: ${product.title} | ${BRAND}`;
    if (isBra) title = `Brasier Post-Quirúrgico: ${product.title} | ${BRAND}`;
    if (isWaist) title = `Waist Trainer & Cinturilla: ${product.title} | ${BRAND}`;

    // 2. Description Generation (Benefit Focused)
    let description = `${product.title} de Guitar Curves. `;
    if (isStage2) description += "Compresión médica alta para moldear cintura de avispa post-lipo o BBL. Zipper invisible y soporte glúteo.";
    else if (isBra) description += "Soporte de espalda y corrección de postura sin aros. Ideal para uso diario o post-operatorio.";
    else description += "Ingeniería invisible para realzar tus curvas naturales. Calidad colombiana premium.";

    return { title, description };
}

// --- UNIVERSAL COMMERCE PROTOCOL (SCHEMA) ---

export function generateProductSchema(product: any, url: string) {
    return {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "image": product.images?.map((img: any) => img.src) || [],
        "description": product.description || `Compra ${product.title} en Guitar Curves.`,
        "sku": product.id,
        "brand": {
            "@type": "Brand",
            "name": BRAND
        },
        "offers": {
            "@type": "Offer",
            "url": url,
            "priceCurrency": "USD",
            "price": product.priceRange?.minVariantPrice?.amount || "0",
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
