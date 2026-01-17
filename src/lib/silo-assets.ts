
// Helper to map Silos to Visual Assets for the Split Hero Layout

export const SiloAssets: Record<string, {
    image: string;
    title: string;
    subtitle: string;
    subCollections: { label: string; path: string }[]
}> = {
    'recovery': {
        image: '/assets/essentials-flatlay.jpg', // Medical/Clean vibe
        title: 'Recovery Studio',
        subtitle: 'Medical Grade Compression',
        subCollections: [
            { label: 'Stage 1', path: '/collections/recovery/stage-1' },
            { label: 'Stage 2', path: '/collections/recovery/stage-2' },
            { label: 'Stage 3', path: '/collections/recovery/stage-3' },
            { label: 'Boards & Foams', path: '/collections/recovery/boards' }
        ]
    },
    'sculpt': {
        image: '/assets/group-sculpt-hero.jpg', // Body/Shape vibe
        title: 'Sculpt Collection',
        subtitle: 'Ingeniería Invisible',
        subCollections: [
            { label: 'Shorts', path: '/collections/sculpt/shorts' },
            { label: 'Waist Trainers', path: '/collections/sculpt/waist' },
            { label: 'Strapless', path: '/collections/sculpt/strapless' },
            { label: 'High Compression', path: '/collections/sculpt/high-compression' }
        ]
    },
    'bras': {
        image: '/assets/essentials-flatlay.jpg', // Reusing essentials for now
        title: 'Support Essentials',
        subtitle: 'Post-Op & Daily Use',
        subCollections: [
            { label: 'Post-Op', path: '/collections/bras/post-op-bra' },
            { label: 'Corrector de Postura', path: '/collections/bras/corrector' },
            { label: 'Daily Use', path: '/collections/bras/daily' }
        ]
    },
    'default': {
        image: '/assets/fajas-real-duo.jpg', // Updated to Real Photo per user request
        title: 'The Collection',
        subtitle: 'Premium Shapewear',
        subCollections: []
    }
};

export function getSiloAsset(silo: string) {
    return SiloAssets[silo] || SiloAssets['default'];
}
