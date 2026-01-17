
// Mock Product Data
const product = {
    title: "Strapless Ultra Realce",
    images: [
        { url: "img_main.jpg" },       // Index 0 (Default/Beige)
        { url: "img_moka.jpg" },       // Index 1 (Moka)
        { url: "img_negro.jpg" },      // Index 2 (Negro)
        { url: "img_extra.jpg" }       // Index 3
    ],
    // Simulate that variants share images sometimes or have duplicates
    image: "img_main.jpg"
};

// Unique Colors extracted
const uniqueColors = ['Beige', 'Moka', 'Negro'];

// Logic from ProductDetailView.tsx useEffect
function testImageSwap(selectedColor, currentVariantImage) {
    console.log(`Testing Color: ${selectedColor}`);

    let variantImg = currentVariantImage;
    const activeProductImage = product.image; // "img_main.jpg"

    // Logic Block Start
    if (variantImg === activeProductImage) {
        const normalizedSelected = selectedColor?.trim().toLowerCase();
        const firstColor = uniqueColors[0]?.trim().toLowerCase();
        const isNotFirstColor = normalizedSelected && firstColor && normalizedSelected !== firstColor;

        if (isNotFirstColor) {
            // Map color index to image index
            const colorIndex = uniqueColors.findIndex(c => c?.toLowerCase().trim() === normalizedSelected);
            console.log(`  Color Index: ${colorIndex}`);

            let targetImage = null;
            const imgs = product.images;
            // The FIX: targetIndex = colorIndex (logic says >0 ? colorIndex : 1)
            const targetIndex = colorIndex > 0 ? colorIndex : 1;
            console.log(`  Target Image Index: ${targetIndex}`);

            if (Array.isArray(imgs) && imgs.length > targetIndex) {
                targetImage = imgs[targetIndex].url;
            }

            if (targetImage) variantImg = targetImage;
        }
    }
    // Logic Block End

    return variantImg;
}

let failed = false;

// Case 1: Select Moka (Index 1). 
// Variant image is duplicate of main (simulating the issue).
// Should pick images[1] ("img_moka.jpg")
const res1 = testImageSwap('Moka', "img_main.jpg");
if (res1 === "img_moka.jpg") {
    console.log("PASS: Moka matched to Index 1");
} else {
    console.error(`FAIL: Moka expected img_moka.jpg, got ${res1}`);
    failed = true;
}

// Case 2: Select Negro (Index 2).
// Variant image is duplicate of main.
// Should pick images[2] ("img_negro.jpg")
// PREVIOUS BUG: selectedIndex logic was falling back to [1] for everything or not mapped correctly.
const res2 = testImageSwap('Negro', "img_main.jpg");
if (res2 === "img_negro.jpg") {
    console.log("PASS: Negro matched to Index 2");
} else {
    console.error(`FAIL: Negro expected img_negro.jpg, got ${res2}`);
    failed = true;
}

if (failed) process.exit(1);
console.log("ALL IMAGE SWAP LOGIC TESTS PASSED");
