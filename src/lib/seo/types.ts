export type SchemaType = 'product' | 'article' | 'tool' | 'collection' | 'organization' | 'website';

export interface BreadcrumbItem {
    name: string;
    item: string;
}

export interface SeoConfig {
    title: string;
    description: string;
    canonical?: string;
    image?: string;
    type?: 'website' | 'article' | 'product';
    schema?: {
        type: SchemaType;
        data: any; // Flexible to accommodate different schema structures
        breadcrumbs?: BreadcrumbItem[];
    };
    keywords?: string[];
}
