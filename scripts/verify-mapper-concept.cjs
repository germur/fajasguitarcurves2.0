// Mock logic from src/lib/shopify-mapper.ts (Manual Sync for Verification)
function getOccasion(tags) {
    const lowerTags = tags.map(t => t.toLowerCase());

    // 1. GOLDEN LIST (Official Spanish Tags from CSV)
    if (tags.includes('Uso Deportivo') || tags.includes('Faja de Neopreno')) return 'Uso Deportivo';
    if (tags.includes('Uso Diario') || tags.includes('Cintura de Avispa')) return 'Uso Diario';
    if (tags.includes('Faja Invisible') || tags.includes('Strapless')) return 'Vestido / Invisible';
    if (tags.includes('Faja Postoperatoria') || tags.includes('Recuperación BBL')) return 'Post-Op / BBL';
    if (tags.includes('Oficina') || tags.includes('Soporte de Espalda')) return 'Oficina';
    if (tags.includes('Faja con Brasier') || tags.includes('Post-Quirúrgico')) return 'Post-Quirúrgico';

    // 2. FALLBACK (Legacy/English cleanup)
    if (lowerTags.includes('gym') || lowerTags.includes('workout') || lowerTags.includes('activewear')) return 'Uso Deportivo';
    if (lowerTags.includes('dress') || lowerTags.includes('wedding') || lowerTags.includes('boda') || lowerTags.includes('novia')) return 'Vestido / Invisible';
    if (lowerTags.includes('daily') || lowerTags.includes('jeans')) return 'Uso Diario';
    if (tags.includes('BBL') || lowerTags.includes('guitar shape') || lowerTags.includes('lipo 360')) return 'Post-Op / BBL';

    return 'UNKNOWN';
}

// Test Cases - Mixing CSV Tags (Priority) and Old Tags (Fallback)
const testCases = [
    // GOLDEN LIST TESTS (Must pass strict)
    { tags: ['Uso Deportivo', 'Faja de Neopreno'], expected: 'Uso Deportivo' },
    { tags: ['Uso Diario', 'Cintura de Avispa'], expected: 'Uso Diario' },
    { tags: ['Faja Postoperatoria', 'Stage 2'], expected: 'Post-Op / BBL' },
    { tags: ['Faja Invisible', 'Strapless'], expected: 'Vestido / Invisible' },

    // LEGACY FALLBACK TESTS (Must still work but map to new names)
    { tags: ['Gym', 'Activewear'], expected: 'Uso Deportivo' },
    { tags: ['Jeans', 'Daily Use'], expected: 'Uso Diario' },
    { tags: ['BBL'], expected: 'Post-Op / BBL' }
];

console.log("--- Verifying Mapping Logic ---");
let passed = 0;
testCases.forEach(tc => {
    const result = getOccasion(tc.tags);
    const isPass = result === tc.expected;
    if (isPass) passed++;
    console.log(`Tags: [${tc.tags.join(', ')}] -> "${result}" ${isPass ? '✅' : '❌ (Expected: ' + tc.expected + ')'}`);
});

console.log(`\nResult: ${passed}/${testCases.length} Passed`);
if (passed === testCases.length) {
    console.log("SUCCESS: Logic is sound.");
} else {
    console.error("FAILURE: Check logic.");
    process.exit(1);
}
