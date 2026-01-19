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




// --- SILO 1: RECOVERY ROOM (19 Products) ---
const recoveryProducts: StoreProduct[] = [
    {
        id: "faja-etapa-2-media-pierna",
        title: "Faja Etapa 2 Media Pierna - Post Lipo y Tummy Tuck (Alta Compresión)",
        price: 120,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop", // Placeholder
        category: "Recovery Room",
        tags: ["Stage 2", "Post Lipo", "High Compression"]
    },
    {
        id: "faja-etapa-2-con-mangas-y-bra",
        title: "Faja Etapa 2 con Mangas y Brasier - Cobertura de Brazos y Espalda",
        price: 135,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 2", "Post Lipo", "Arm Compression"]
    },
    {
        id: "faja-etapa-2-tira-gruesa",
        title: "Faja Etapa 2 Tira Gruesa Media Pierna - Soporte de Espalda y Hombros Acolchados",
        price: 125,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 2", "Post Lipo", "High Back"]
    },
    {
        id: "faja-con-brasier-media-pierna-7-varillas",
        title: "Faja Etapa 3 Media Pierna con Brasier - 7 Varillas de Soporte",
        price: 140,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 3", "Post Lipo", "High Compression"]
    },
    {
        id: "faja-etapa-3-pierna-larga-con-brasier-7-varillas",
        title: "Faja Etapa 3 Pierna Larga con Brasier - 7 Varillas de Soporte",
        price: 145,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 3", "Post Lipo", "Knee Length"]
    },
    {
        id: "faja-tira-gruesa-7-varillas-media-pierna",
        title: "Faja Etapa 3 Tira Gruesa Media Pierna - 7 Varillas y Espalda Alta",
        price: 138,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 3", "Post Lipo", "High Back"]
    },
    {
        id: "faja-etapa-3-mangas-y-bra-media-pierna",
        title: "Faja Etapa 3 con Mangas y Brasier - Media Pierna (Alta Compresión BBL)",
        price: 150,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 3", "BBL", "Post Lipo", "Arm Compression"]
    },
    {
        id: "faja-etapa-3-mangas-bra-pierna-larga",
        title: "Faja Etapa 3 Cuerpo Completo con Mangas y Brasier - Lipo 360 & Brazos (Alta Compresión)",
        price: 160,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 3", "Full Body", "Lipo 360"]
    },
    {
        id: "faja-tira-delgada-media-pierna",
        title: "Faja Reloj de Arena Tira Delgada - Especial BBL (Cintura Pequeña / Cadera Grande)",
        price: 130,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 2", "Guitar Shape", "BBL"]
    },
    {
        id: "faja-pierna-larga-tira-delgada",
        title: "Faja Reloj de Arena Pierna Larga - Tira Delgada y Alta Compresión (Stage 3)",
        price: 145,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 3", "Guitar Shape", "BBL"]
    },
    {
        id: "faja-stage-3-media-pierna",
        title: "Faja Reloj de Arena Stage 3 Media Pierna - Alta Compresión (Especial BBL)",
        price: 140,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 3", "Guitar Shape", "BBL"]
    },
    {
        id: "fajas-pierna-larga-con-bra",
        title: "Faja Reloj de Arena Pierna Larga con Brasier - Etapa 3 (Especial BBL)",
        price: 155,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 3", "Guitar Shape", "BBL"]
    },
    {
        id: "faja-etapa-3-tira-gruesa-media-pierna",
        title: "Faja Reloj de Arena Etapa 3 Tira Gruesa - Media Pierna y Alta Compresión",
        price: 142,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 3", "Guitar Shape", "High Compression"]
    },
    {
        id: "faja-etapa-3-pierna-larga-tira-gruesa",
        title: "Faja Reloj de Arena Pierna Larga - Tira Gruesa y Alta Compresión (Stage 3)",
        price: 148,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 3", "Guitar Shape", "High Compression"]
    },
    {
        id: "faja-cierre-lateral-media-pierna",
        title: "Faja Reloj de Arena Etapa 3 Cierre Lateral - Media Pierna (Vientre Plano)",
        price: 135,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 3", "Guitar Shape", "Side Zipper"]
    },
    {
        id: "faja-reloj-de-arena-etapa-3",
        title: "Faja Reloj de Arena Etapa 3: Especial BBL y Cadera Ancha",
        price: 140,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 3", "Guitar Shape", "BBL"]
    },
    {
        id: "faja-mangas-media-pierna",
        title: "Faja Reloj de Arena con Mangas y Brasier - Media Pierna (Post Lipo de Brazos)",
        price: 150,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Stage 2", "Arm Compression", "Post Lipo"]
    },
    {
        id: "faja-corta-tira-delgada",
        title: "Faja Body Postparto \"Snap Back\" Tira Delgada - Alta Compresión",
        price: 95,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Post-Partum", "Stage 1", "High Compression"]
    },
    {
        id: "faja-alta-compresion-con-bra-corta",
        title: "Faja Corta Alta Compresión con Brasier - Soporte Diario",
        price: 85,
        image: "https://images.unsplash.com/photo-1615211913495-927dcc75d26f?q=80&w=800&auto=format&fit=crop",
        category: "Recovery Room",
        tags: ["Post-Partum", "Stage 1", "Short"]
    }
];

// --- SILO 2: SCULPT STUDIO (17 Products) ---
const sculptProducts: StoreProduct[] = [
    {
        id: "cinturilla-extrema-reloj-arena",
        title: "Cinturilla Extrema Reloj de Arena - 14 Varillas y Cierre Frontal",
        price: 65,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Waist Trainer", "Gym", "Latex", "Daily Use"]
    },
    {
        id: "faja-cinturilla-avispa",
        title: "Faja Cinturilla de Avispa 7 Varillas - Waist Trainer Reductora",
        price: 55,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Waist Trainer", "Daily Use"]
    },
    {
        id: "chaleco-corset-reductor",
        title: "Chaleco Corset Reductor de Alta Compresión: 14 Varillas y Soporte de Espalda",
        price: 75,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Waist Trainer", "Posture", "High Back"]
    },
    {
        id: "faja-chaleco-reductor-bra",
        title: "Faja Chaleco Reductor con Brasier - 8 Varillas y Tiras Removibles (Alta Compresión)",
        price: 80,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Waist Trainer", "High Back", "Bra Included"]
    },
    {
        id: "bodysuit-panty-strapless",
        title: "Bodysuit Panty Strapless: Control de Abdomen Invisible (Tiras Removibles)",
        price: 50,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Strapless", "Invisible", "Daily Use"]
    },
    {
        id: "faja-strapless-pierna-larga",
        title: "Faja Strapless Pierna Larga - Ultra Realce de Glúteos",
        price: 110,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Strapless", "Butt Lifter", "Knee Length"]
    },
    {
        id: "faja-strapless-reloj-arena",
        title: "Faja Strapless Reloj de Arena Media Pierna - Alta Compresión (Ideal para Vestidos)",
        price: 115,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Strapless", "Guitar Shape", "Special Occasion"]
    },
    {
        id: "leggins-deportivos-faja",
        title: "Leggins Deportivos con Faja Interna y Control de Abdomen (Neopreno)",
        price: 65,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Leggings", "Gym", "Activewear"]
    },
    {
        id: "body-panty-reductor",
        title: "Body Panty Reductor con Cierre Frontal - Control Abdominal y Cintura (Tiras Delgadas)",
        price: 60,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Daily Use", "Light Compression"]
    },
    // Shorts
    {
        id: "faja-short-levanta-cola",
        title: "Faja Short Levanta Cola Talle Alto - Broches y Ultra Realce",
        price: 45,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Butt Lifter", "Short", "Daily Use"]
    },
    {
        id: "short-levanta-cola-cintura",
        title: "Short Levanta Cola a la Cintura - Broches Frontales y Control Abdominal",
        price: 42,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Butt Lifter", "Short", "Daily Use"]
    },
    {
        id: "short-levanta-cola-invisible",
        title: "Short Levanta Cola Invisible de Talle Alto - Ultra Realce y Control (Anti-Enrollamiento)",
        price: 48,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Butt Lifter", "Invisible", "Seamless"]
    },
    {
        id: "short-bbl-ultra-realce",
        title: "Short BBL ultra realce piernas largas + cremallera lateral",
        price: 55,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Butt Lifter", "BBL", "Knee Length"]
    },
    {
        id: "short-cachetero-levanta-cola",
        title: "Short Cachetero Levanta Cola - Invisible con Varillas (Ultra Realce y Control)",
        price: 40,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Butt Lifter", "Short", "Invisible"]
    },
    {
        id: "short-levanta-cola-ultra-realce",
        title: "Short Levanta Cola \"Ultra Realce\" - Control de Abdomen y Definición de Curvas",
        price: 45,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Butt Lifter", "Daily Use"]
    },
    {
        id: "short-levanta-cola-broches",
        title: "Short Levanta Cola con Broches Frontales - Ultra Realce y Cintura de Avispa",
        price: 50,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Butt Lifter", "Daily Use", "Waist Control"]
    },
    {
        id: "short-levanta-cola-invisible-2", // Duplicate name in list, distinct ID
        title: "Short Levanta Cola Invisible de Talle Alto - Ultra Realce y Control (Anti-Enrollamiento)",
        price: 48,
        image: "/assets/essentials-flatlay.jpg",
        category: "Sculpt Studio",
        tags: ["Butt Lifter", "Invisible"]
    }
];

// --- SILO 3: BRASIERES (3 Products) ---
const brasierProducts: StoreProduct[] = [
    {
        id: "brasier-post-operatorio-mangas",
        title: "Brasier Post Operatorio con Mangas - Compresión de Brazos y Soporte de Espalda",
        price: 55,
        image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop",
        category: "Brasieres",
        tags: ["Post-Op Bra", "Arm Compression"],
        badge: "Máximo Control",
        benefit: "Elimina la inflamación en brazos y espalda alta mientras corrige tu postura."
    },
    {
        id: "brasier-post-operatorio-postura",
        title: "Brasier Post Operatorio Corrector de Postura - Espalda Alta y Soporte Diario",
        price: 50,
        image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop",
        category: "Brasieres",
        tags: ["Post-Op Bra", "Posture", "High Back"],
        badge: "Best Seller",
        benefit: "Soporte criss-cross en espalda que alivia el peso inmediatamente."
    },
    {
        id: "brasier-alto-cubrimiento",
        title: "Brasier de Alto Cubrimiento y Soporte de Espalda - Corrector de Postura",
        price: 48,
        image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop",
        category: "Brasieres",
        tags: ["Post-Op Bra", "Daily Use"],
        badge: "Uso Diario",
        benefit: "Invisible bajo la ropa, ideal para mantener los resultados a largo plazo."
    }
];


export const RAW_CATALOG = [
    ...recoveryProducts,
    ...sculptProducts,
    ...brasierProducts
];

// Re-export specific getters based on new logic
export function getAllProducts(): StoreProduct[] {
    return RAW_CATALOG;
}

export function getProductById(id: string): StoreProduct | undefined {
    return RAW_CATALOG.find(p => p.id === id || p.handle === id || p.id.split('/').pop() === id);
}

// Updated Getters to match new Tags
export function getPostSurgicalProducts(): StoreProduct[] {
    return RAW_CATALOG.filter(p => p.category === "Recovery Room");
}

export function getDailyUseProducts(): StoreProduct[] {
    return RAW_CATALOG.filter(p => p.category === "Sculpt Studio");
}

// "Guitar Curves" was a specific silo, but now it seems unified into Recovery or Sculpt depending on the item.
// Based on the user's list, "Guitar Shape" is a tag in Recovery Room.
export function getGuitarCurvesProducts(): StoreProduct[] {
    return RAW_CATALOG.filter(p => p.tags?.includes("Guitar Shape") || p.tags?.includes("BBL"));
}

// New Getter for Facelifted Silo 3
export function getBrasieresProducts(): StoreProduct[] {
    return RAW_CATALOG.filter(p => p.category === "Brasieres" || p.tags?.includes("Post-Op Bra"));
}

// Deprecated or Empty
export function getAccessoriesProducts(): StoreProduct[] {
    return []; // No foams/boards in the new list
}

export function getMaternityProducts(): StoreProduct[] {
    return RAW_CATALOG.filter(p => p.tags?.includes("Post-Partum"));
}

