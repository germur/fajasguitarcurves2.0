import medicalData from './sources/medical.json';
import guitarData from './sources/guitar.json';
import lifestyleData from './sources/lifestyle.json';
// painPointsData and academiaData can be imported when we decide how to merge them
// import painPointsData from './sources/pain-points.json';
// import academiaData from './sources/academia.json';

export interface StoreProduct {
    id: string;
    title: string;
    price: number;
    image: string;
    images?: string[];
    description?: string;
    category?: string;
    tags?: string[];
    features?: string[];
    stage?: string;
    compression?: string;
    bodyType?: string;
}

interface RawProduct {
    id: string;
    title: string;
    price: number | string;
    image?: string;
    images?: string[];
    description?: string;
    [key: string]: unknown;
}

function normalizeProducts(products: RawProduct[], category: string): StoreProduct[] {
    return products.map(p => ({
        ...p,
        category,
        image: p.image || '',
        price: typeof p.price === 'string' ? parseFloat(p.price.replace('$', '')) : p.price,
        images: p.images || (p.image ? [p.image] : []),
        description: p.description || "High-performance compression garment designed for recovery and contouring."
    }));
}

const medicalProducts = normalizeProducts(medicalData.products, "Medical Hub");
const guitarProducts = normalizeProducts(guitarData.products, "Guitar Curves");
const lifestyleProducts = normalizeProducts(lifestyleData.products, "Lifestyle");

export const RAW_CATALOG = [
    ...medicalProducts,
    ...guitarProducts,
    ...lifestyleProducts
];

export function getAllProducts(): StoreProduct[] {
    return RAW_CATALOG;
}

export function getProductById(id: string): StoreProduct | undefined {
    // Handle both raw IDs and possibly encoded ones
    return RAW_CATALOG.find(p => p.id === id || p.id.split('/').pop() === id);
}

export function getRelatedProducts(category: string, currentId: string, limit = 4): StoreProduct[] {
    return RAW_CATALOG
        .filter(p => p.category === category && p.id !== currentId)
        .slice(0, limit);
}

// --- Silo Getters ---

export function getPostSurgicalProducts(): StoreProduct[] {
    // Medical Hub / Post-Quirurgica
    return RAW_CATALOG.filter(p => p.category === "Medical Hub" || p.tags?.includes("Post Surgery"));
}

export function getDailyUseProducts(): StoreProduct[] {
    // Lifestyle / Uso Diario
    return RAW_CATALOG.filter(p => p.category === "Lifestyle" || p.tags?.includes("Daily Use"));
}

export function getGuitarCurvesProducts(): StoreProduct[] {
    // Guitar Curves / Levanta Cola / BBL
    return RAW_CATALOG.filter(p => p.category === "Guitar Curves");
}

export function getAccessoriesProducts(): StoreProduct[] {
    // Supplies / Accessories
    return RAW_CATALOG.filter(p => p.tags?.includes("Supplies") || p.category === "Supplies");
}

export function getMaternityProducts(): StoreProduct[] {
    // Maternity - Currently empty or placeholder
    return RAW_CATALOG.filter(p => p.tags?.includes("Maternity"));
}
