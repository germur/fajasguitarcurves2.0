import type { SizeRow } from './types';

/**
 * Master sizing table synthesized from technical research.
 * All measurements are stored in INCHES as base source.
 */
export const SIZE_DATA: SizeRow[] = [
    { label: 'XS', dualLabel: 'XS/S', waistMin: 24, waistMax: 26, stdHipMax: 36, guitarHipMax: 40 },
    { label: 'S', dualLabel: 'S/M', waistMin: 26, waistMax: 29, stdHipMax: 39, guitarHipMax: 43 },
    { label: 'M', dualLabel: 'M/L', waistMin: 30, waistMax: 33, stdHipMax: 42, guitarHipMax: 47 },
    { label: 'L', dualLabel: 'L/XL', waistMin: 33, waistMax: 37, stdHipMax: 45, guitarHipMax: 50 },
    { label: 'XL', dualLabel: 'XL/2XL', waistMin: 37, waistMax: 40, stdHipMax: 48, guitarHipMax: 54 },
    { label: '2XL', dualLabel: '2XL/3XL', waistMin: 40, waistMax: 44, stdHipMax: 51, guitarHipMax: 57 },
    { label: '3XL', dualLabel: '3XL/4XL', waistMin: 44, waistMax: 47, stdHipMax: 54, guitarHipMax: 60 },
    { label: '4XL', dualLabel: '4XL/5XL', waistMin: 48, waistMax: 51, stdHipMax: 57, guitarHipMax: 63 }
];
