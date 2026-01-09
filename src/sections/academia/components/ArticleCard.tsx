import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export interface Article {
    id: string;
    title: string;
    author: string;
    category: string;
    readTime: string;
    image: string;
    excerpt: string;
}

interface ArticleCardProps {
    article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-stone-100">
                <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium tracking-wide text-stone-800 rounded-full uppercase">
                        {article.category}
                    </span>
                </div>
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center space-x-2 text-stone-500 text-xs mb-3 font-medium">
                    <span className="flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" />
                        Medical Journal
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                    </span>
                </div>

                <h3 className="text-xl font-serif text-stone-900 mb-2 leading-snug group-hover:text-[#B49286] transition-colors">
                    {article.title}
                </h3>

                <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                    <span className="text-xs text-stone-500 font-medium">
                        By {article.author}
                    </span>
                    <span className="flex items-center text-xs font-bold text-[#B49286] group-hover:translate-x-1 transition-transform">
                        READ MANUAL <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                </div>
            </div>
        </div>
    );
}
