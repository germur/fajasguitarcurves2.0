// Imports removed or commented out to avoid unused variable errors
// import medicalData from './sources/medical.json';
// import guitarData from './sources/guitar.json';
// import lifestyleData from './sources/lifestyle.json';
// import maternityData from './sources/maternity.json';
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
    variants?: {
        id: string;
        title: string;
        available: boolean;
        price: number;
        image?: string;
        selectedOptions: { name: string; value: string }[];
        // Legacy fallback
        size?: string;
    }[];
    options?: {
        name: string;
        values: string[];
    }[];
    benefit?: string;
    badge?: string;
    handle?: string;
}




// --- SILO 1: RECOVERY ROOM (Mock Data Removed) ---
export const recoveryProducts: StoreProduct[] = [];

// --- SILO 2: SCULPT STUDIO (Mock Data Removed) ---
export const sculptProducts: StoreProduct[] = [];

// --- SILO 3: BRASIERES (Mock Data Removed) ---
export const brasierProducts: StoreProduct[] = [];


export const RAW_CATALOG: StoreProduct[] = [];

// Re-export specific getters based on new logic
export function getAllProducts(): StoreProduct[] {
    return RAW_CATALOG;
}

export function getProductById(id: string): StoreProduct | undefined {
    return RAW_CATALOG.find(p => p.id === id || p.handle === id || p.id.split('/').pop() === id);
}

// Updated Getters to match new Tags
export function getPostSurgicalProducts(): StoreProduct[] {
    return [];
}

export function getDailyUseProducts(): StoreProduct[] {
    return [];
}

export function getGuitarCurvesProducts(): StoreProduct[] {
    return [];
}

export function getBrasieresProducts(): StoreProduct[] {
    return [];
}

export function getAccessoriesProducts(): StoreProduct[] {
    return [];
}

export function getMaternityProducts(): StoreProduct[] {
    return [];
}

