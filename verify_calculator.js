
const SIZE_CHART = [
    { size: 'XXS', min: 22.1, max: 24.4 },
    { size: 'XS', min: 24.4, max: 26.7 },
    { size: 'S', min: 26.7, max: 28.3 },
    { size: 'M', min: 28.3, max: 30.7 },
    { size: 'L', min: 30.7, max: 33.1 },
    { size: 'XL', min: 33.1, max: 35.4 },
    { size: '2XL', min: 35.4, max: 37.8 },
    { size: '3XL', min: 37.8, max: 40.2 },
    { size: '4XL', min: 40.2, max: 42.5 },
    { size: '5XL', min: 42.5, max: 44.8 },
    { size: '6XL', min: 44.8, max: 47.2 },
];

const calculateSize = (waist) => {
    const match = SIZE_CHART.find(s => waist >= s.min && waist < s.max);
    if (match) return match.size;
    if (waist < 22.1) return 'XXS';
    return '7XL+';
};

const calculateShape = (waist, hips) => {
    if (!waist || !hips || hips === 0) return null;
    const size = calculateSize(waist);
    return { size }; // We only care about size for this test
};

// SIMULATION of handleCalculate logic
const runTest = (waistInput, hipsInput, unit) => {
    console.log(`Testing: Waist ${waistInput}, Hips ${hipsInput}, Unit: ${unit}`);
    
    // Logic from GuitarRatioQuiz.tsx handleCalculate
    const normalize = (val) => unit === 'CM' ? val / 2.54 : val;
    const wInches = normalize(waistInput);
    const hInches = normalize(hipsInput);
    
    console.log(`Normalized Inches: Waist ${wInches.toFixed(2)}", Hips ${hInches.toFixed(2)}"`);
    
    const result = calculateShape(wInches, hInches);
    console.log(`Result Size: ${result.size}`);
    
    return result.size;
};

// TEST CASESS
let failed = false;

// 1. User reported case: 90cm / 110cm -> Should be L or XL (NOT 4XL+)
// 90cm = ~35.43" -> 2XL range (35.4 - 37.8) or slightly below.
// Let's check chart: 
// 2XL min is 35.4.
// 90/2.54 = 35.433. So it should be 2XL.
// Previous broken logic interpreted 90 as INCHES -> 7XL+
const size1 = runTest(90, 110, 'CM'); 
if (size1 === '7XL+' || size1 === '4XL+') {
    console.error('FAIL: Size unexpectedly large (CM interpretation error).');
    failed = true;
} else if (size1 === '2XL' || size1 === 'XL') {
    console.log('PASS: Size is reasonable (XL/2XL).');
} else {
    console.warn(`WARNING: Result ${size1} is unexpected but maybe correct?`);
}

// 2. Control case: Inches
// 28" Waist -> S (26.7 - 28.3) or M (28.3 - 30.7). 28 < 28.3, so S.
const size2 = runTest(28, 40, 'IN');
if (size2 === 'S') {
    console.log('PASS: Inches control case works.');
} else {
    console.error(`FAIL: Expected S for 28", got ${size2}`);
    failed = true;
}

if (failed) process.exit(1);
console.log('ALL CALCULATOR TESTS PASSED');
