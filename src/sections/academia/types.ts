// Need to create this to fix import error in AcademiaView.tsx
export interface Article {
    id: string;
    slug: string;
    title: string;
    category: string;
    summary: string;
    readTime: string;
    content: string;
    toc?: string[];
}

export interface LocalProvider {
    id: string;
    name: string;
    specialty: string;
    location: string;
    rating: number;
    image: string;
}
