import { MapPin, Star, ShieldCheck, ExternalLink } from 'lucide-react';

export interface LocalProvider {
    id: string;
    name: string;
    city: string;
    type: string;
    rating: number;
    reviewCount: number;
    image: string;
    recommendedProduct: string;
}

interface LocalProviderCardProps {
    provider: LocalProvider;
}

export function LocalProviderCard({ provider }: LocalProviderCardProps) {
    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-[#B49286]/30 transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
            <div className="flex flex-col sm:flex-row h-full">
                {/* Image - Left on mobile, maybe adjust layout? Sticking to vertical card for now as requested by grid */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-stone-100">
                    <div className="absolute top-4 left-4 z-10">
                        <span className="flex items-center px-2 py-1 bg-[#B49286] text-white text-xs font-bold tracking-wide rounded-md">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            VERIFIED
                        </span>
                    </div>
                    <img
                        src={provider.image}
                        alt={provider.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <span className="text-xs font-bold text-[#B49286] uppercase tracking-wider block mb-1">
                                {provider.type}
                            </span>
                            <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#B49286] transition-colors leading-tight">
                                {provider.name}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-bold text-stone-900">{provider.rating}</span>
                        <span className="text-xs text-stone-500">({provider.reviewCount} reviews)</span>
                    </div>

                    <div className="flex items-center text-stone-500 text-sm mb-4">
                        <MapPin className="w-4 h-4 mr-1 text-[#B49286]" />
                        {provider.city}
                    </div>

                    <div className="mt-auto pt-4 border-t border-stone-100 bg-stone-50/50 -mx-5 -mb-5 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-[10px] uppercase text-stone-400 font-bold block mb-0.5">Recommended</span>
                                <span className="text-xs font-medium text-stone-700 block truncate max-w-[150px]" title={provider.recommendedProduct}>
                                    {provider.recommendedProduct}
                                </span>
                            </div>
                            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-900 text-white group-hover:bg-[#B49286] transition-colors">
                                <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
