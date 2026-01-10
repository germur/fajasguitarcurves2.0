import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function SiloBentoGrid() {
    return (
        <section className="py-20 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2420] mb-8 text-center md:text-left">
                    Shop by Collection
                </h2>

                {/* Bento Grid Layout - Mobile First (Stacked -> Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[1200px] md:h-[600px]">

                    {/* 1. Recovery (Large - 2x2) */}
                    <Link to="/medical" className="group relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1605289982774-9a6fef564df8?q=80&w=800&auto=format&fit=crop" // Placeholder: Clinical/Clean look
                            alt="Medical Recovery"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <span className="bg-[#A35944] text-xs font-bold px-2 py-1 rounded mb-2 inline-block">MOST IMPORTANT</span>
                            <h3 className="font-serif text-3xl font-bold mb-1">Medical Recovery</h3>
                            <p className="text-sm text-stone-200 mb-3">Stage 1 & Stage 2 Kits</p>
                            <span className="inline-flex items-center gap-2 text-sm font-bold border-b border-white pb-1">Shop Now <ArrowUpRight size={14} /></span>
                        </div>
                    </Link>

                    {/* 2. Waist Training (Medium - 1x2 Tall) */}
                    <Link to="/cinturillas" className="group relative md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=600&auto=format&fit=crop" // Placeholder: Sporty/Waist focus
                            alt="Waist Training"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="font-serif text-2xl font-bold mb-1">Waist Trainers</h3>
                            <p className="text-xs text-stone-200 mb-3">Extreme Snatching (7-15 Bones)</p>
                            <span className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">Explore</span>
                        </div>
                    </Link>

                    {/* 3. Shorts/Levanta Cola (Small - 1x1) */}
                    <Link to="/shorts" className="group relative md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1542272617-08f08637533d?q=80&w=600&auto=format&fit=crop" // Placeholder: Jeans fit
                            alt="Levanta Cola Shorts"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-bold text-lg mb-0 relative z-10">Levanta Cola Shorts</h3>
                        </div>
                    </Link>

                    {/* 4. Lifestyle / Invisible (Small - 1x1) */}
                    <Link to="/lifestyle" className="group relative md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop" // Placeholder: Elegant dress
                            alt="Invisible Collection"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-bold text-lg mb-0 relative z-10">Secret Weapons</h3>
                            <p className="text-[10px] text-stone-200">Invisible Daily Use</p>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}
