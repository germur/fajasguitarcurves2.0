import { Link } from 'react-router-dom';
import { ArrowRight, Activity } from 'lucide-react';

const HERO_VIDEO_MOCK = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop";
// Note: In production we'd use a real Cloudinaire or S3 URL for the poster and video
const VIDEO_URL = "https://videos.pexels.com/video-files/4440847/4440847-hd_1920_1080_30fps.mp4";

export function HomeHero() {
    return (
        <div className="relative h-[90vh] w-full overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0">
                <video
                    src={VIDEO_URL}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={HERO_VIDEO_MOCK}
                    className="w-full h-full object-cover"
                />
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420] via-transparent to-transparent opacity-90"></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center text-[#F5EDDF]">

                {/* Badge */}
                <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <span className="inline-block px-3 py-1 border border-[#F5EDDF]/30 rounded-full text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md">
                        CALIDAD MÉDICA Y CONFORT SUPERIOR
                    </span>
                </div>

                {/* H1 SEO Optimized */}
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-5xl leading-[0.95] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    Fajas Colombianas Guitar Curves: <br />
                    La Solución para Cintura Pequeña y Cadera Grande
                </h1>

                {/* Subtitle BLUF (Bottom Line Up Front) */}
                <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl font-light leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    Olvídate de las fajas que te aplastan los glúteos. Nuestra tecnología se adapta a tus curvas extremas y recuperación BBL.
                </p>

                {/* Dual Path CTA */}
                <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>

                    {/* Path 1: Shop Body Type (Primary) - Pulse Effect */}
                    <Link
                        to="/guitar-curves"
                        className="group relative bg-[#D32F2F] text-white px-8 py-5 rounded-full font-bold text-sm tracking-widest hover:bg-[#B71C1C] transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl overflow-hidden"
                    >
                        {/* Pulse Ring */}
                        <span className="absolute inset-0 rounded-full animate-ping bg-[#D32F2F] opacity-20 group-hover:opacity-0"></span>

                        <ArrowRight size={18} />
                        <span>COMPRAR POR TIPO DE CUERPO</span>
                    </Link>

                    {/* Path 2: Fit Finder (Secondary) */}
                    <Link
                        to="/fit-finder"
                        className="group bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-5 rounded-full font-bold text-sm tracking-widest hover:bg-white hover:text-[#2C2420] transition-all flex items-center justify-center gap-3"
                    >
                        <span>CALCULAR MI TALLA</span>
                        <Activity size={16} />
                    </Link>
                </div>

            </div>
        </div>
    );
}
