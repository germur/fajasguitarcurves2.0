import { Star } from 'lucide-react';

const REVIEWS = [
    {
        id: 1,
        user: "Maria G.",
        type: "BBL Recovery",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
        text: "Literalmente me salvó la vida después de mi cirugía. La compresión es perfecta y no marca las piernas.",
        rating: 5
    },
    {
        id: 2,
        user: "Carolina R.",
        type: "Uso Diario",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
        text: "Increíble cómo me hace ver la cintura. La uso debajo de mis vestidos y nadie nota que la tengo puesta.",
        rating: 5
    },
    {
        id: 3,
        user: "Sofia L.",
        type: "Post-Parto",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
        text: "La calidad de la tela es superior a cualquier otra marca que he probado. Vale cada centavo.",
        rating: 5
    },
    {
        id: 4,
        user: "Valentina M.",
        type: "Guitar Curves",
        image: "https://images.unsplash.com/photo-1529139574466-a302d2d3f524?q=80&w=400&auto=format&fit=crop",
        text: "Me siento súper segura con ella. Define mis curvas exactamente como quería.",
        rating: 5
    }
];

export function SocialProofWall() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[#A35944] font-bold tracking-widest text-xs uppercase mb-4 block">
                        Resultados Reales
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#2C2420] font-bold mb-4">
                        Wall of Curves
                    </h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">
                        Únete a miles de mujeres que han transformado su silueta con nuestra ingeniería de compresión.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="group relative break-inside-avoid">
                            <div className="relative rounded-2xl overflow-hidden mb-4 shadow-md bg-[#FAF9F6]">
                                <img
                                    src={review.image}
                                    alt={review.user}
                                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <div className="flex gap-1 text-[#D1AB66] mb-2">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" />
                                        ))}
                                    </div>
                                    <p className="text-white text-sm font-medium leading-snug drop-shadow-md">
                                        "{review.text}"
                                    </p>
                                </div>
                            </div>
                            <div className="px-2">
                                <h4 className="font-bold text-[#2C2420] text-sm">{review.user}</h4>
                                <p className="text-xs text-[#B49286] uppercase tracking-wide">{review.type}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#FAF9F6] px-6 py-3 rounded-full border border-stone-200">
                        <div className="flex -space-x-3">
                            <div className="w-8 h-8 rounded-full bg-stone-300 border-2 border-white"></div>
                            <div className="w-8 h-8 rounded-full bg-stone-400 border-2 border-white"></div>
                            <div className="w-8 h-8 rounded-full bg-stone-500 border-2 border-white"></div>
                        </div>
                        <span className="text-xs font-bold text-[#2C2420] ml-2">4.9/5 basado en +2,500 reseñas</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
