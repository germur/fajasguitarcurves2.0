import { Play } from 'lucide-react';

const REVIEWS = [
    {
        id: 1,
        handle: "@snatched_sarah",
        videoThumb: "https://images.unsplash.com/photo-1620932934088-fbdb2920e484?q=80&w=400&h=700&auto=format&fit=crop",
        quote: "Honestly, the waist compression is unlike anything I've tried.",
        verified: true
    },
    {
        id: 2,
        handle: "@postop_recovery_miami",
        videoThumb: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&h=700&auto=format&fit=crop",
        quote: "My clients heal 2x faster with the Stage 2 Guitar faja.",
        verified: true
    },
    {
        id: 3,
        handle: "@bbl_journey_2026",
        videoThumb: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&h=700&auto=format&fit=crop",
        quote: "No dents in my hips! The zero compression mesh is real.",
        verified: true
    },
    {
        id: 4,
        handle: "@dr_miami_nurse",
        videoThumb: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=700&auto=format&fit=crop",
        quote: "We recommend ONLY this brand for Lipo 360.",
        verified: true
    }
];

export function SocialProofCarousel() {
    return (
        <section className="py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#2C2420] mb-2">Real Results. Real Dolls.</h2>
                    <p className="text-stone-500">Join 10,000+ women who didn't compromise on their shape.</p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-[#FAF9F6] px-3 py-1 rounded-full text-xs font-bold text-[#2C2420] border border-stone-200">INSTAGRAM</span>
                    <span className="bg-[#FAF9F6] px-3 py-1 rounded-full text-xs font-bold text-[#2C2420] border border-stone-200">TIKTOK</span>
                </div>
            </div>

            {/* Scroll Container */}
            <div className="flex gap-6 overflow-x-auto px-6 pb-8 snap-x scrollbar-hide">
                {REVIEWS.map((review) => (
                    <div
                        key={review.id}
                        className="flex-none w-[280px] h-[500px] relative rounded-2xl overflow-hidden cursor-pointer group snap-center"
                    >
                        <img
                            src={review.videoThumb}
                            alt={review.handle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <Play className="w-8 h-8 text-white fill-white" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-orange-500 p-[1px]">
                                    <div className="w-full h-full bg-black rounded-full" />
                                </div>
                                <span className="text-xs font-bold">{review.handle}</span>
                                {review.verified && <span className="text-blue-400 text-[10px]">Verified</span>}
                            </div>
                            <p className="text-sm font-medium leading-relaxed">"{review.quote}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
