export type Unit = 'in' | 'cm';

export interface SizeRow {
    label: string;
    dualLabel: string;
    waistMin: number;
    waistMax: number;
    stdHipMax: number;
    guitarHipMax: number;
}

export interface Recommendation {
    size: string;
    displayLabel: string;
    line: string;
    description: string;
    badgeText: string;
    badgeColor: string;
    borderColor: string;
    isGuitar?: boolean;
    isStage2?: boolean;
    type?: 'success' | 'underflow' | 'overflow';
    msg?: string;
    image?: string;
}

export interface Measurements {
    waist: string;
    hip: string;
}
