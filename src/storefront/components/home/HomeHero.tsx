import { useState } from 'react';
import { ArrowRight, Activity, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomeHero() {
    const [mode, setMode] = useState<'recover' | 'sculpt'>('recover');

    return (
        <div className="relative w-full h-[calc(100vh-110px)] min-h-[600px] overflow-hidden bg-[#FAF9F6]">
            {/* Background Media - Semantic Change */}
            <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
                {/* Layer 1: Cool/Clinical (Recover) */}
                <div className={`absolute inset-0 bg-[#E8EAEB] transition-opacity duration-700 ${mode === 'recover' ? 'opacity-100' : 'opacity-0'}`}>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/assets/hourglass-hero-bg.jpg"
                        className="w-full h-full object-cover opacity-80 mix-blend-multiply grayscale"
                    >
                        <source src="/assets/gc-animation.mp4" type="video/mp4" />
                    </video>
                    {/* Clinical Blue/White Overlay - Lighter for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F5F7FA]/95 via-[#F5F7FA]/70 to-transparent" />
                </div>

                {/* Layer 2: Warm/Sculpt (Sculpt) */}
                <div className={`absolute inset-0 bg-[#B49286] transition-opacity duration-700 ${mode === 'sculpt' ? 'opacity-100' : 'opacity-0'}`}>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/assets/hourglass-hero-bg.jpg"
                        className="w-full h-full object-cover opacity-60 mix-blend-multiply"
                    >
                        <source src="/assets/gc-animation.mp4" type="video/mp4" />
                    </video>
                    {/* Warm Gold/Cacao Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8C7A6B]/90 via-[#B49286]/40 to-transparent mix-blend-overlay" />
                </div>
            </div>

            {/* Glassmorphism Content Container */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">

                {/* The Semantic Router Switch */}
                <div className="mb-8 p-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full inline-flex relative">
                    <div
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-500 ease-out
                        ${mode === 'recover' ? 'left-1' : 'left-[calc(50%+4px)]'}`}
                    />
                    <button
                        onClick={() => setMode('recover')}
                        className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center gap-2
                        ${mode === 'recover' ? 'text-[#2C2420]' : 'text-white/70 hover:text-white'}`}
                    >
                        <Activity className="w-3 h-3" />
                        Recover
                    </button>
                    <button
                        onClick={() => setMode('sculpt')}
                        className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center gap-2
                         ${mode === 'sculpt' ? 'text-[#2C2420]' : 'text-stone-400 hover:text-[#2C2420]'}`}
                    >
                        <Sparkles className="w-3 h-3" />
                        Sculpt
                    </button>
                </div>

                {/* Dynamic Copy */}
                <div className="max-w-2xl transition-all duration-700 transform">
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#2C2420] leading-[0.9] mb-6">
                        {mode === 'recover' ? (
                            <>
                                Recuperación <br />
                                <span className="italic font-light">Médica Certificada</span>
                            </>
                        ) : (
                            <>
                                La Silueta <br />
                                <span className="italic font-light text-[#FFFBF0] drop-shadow-md">Guitarra Definitiva</span>
                            </>
                        )}
                    </h1>

                    <p className={`text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed ${mode === 'recover' ? 'text-[#2C2420]' : 'text-[#F5EDDF]'}`}>
                        {mode === 'recover'
                            ? "Ingeniería textil diseñada para proteger tu inversión quirúrgica (BBL & Lipo). Compresión segura Stage 2."
                            : "Esculpe tu cintura y realza tus curvas naturales con tecnología invisible de alta compresión."
                        }
                    </p>

                    {/* Dynamic CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to={mode === 'recover' ? "/collections/recovery" : "/collections/sculpt"}
                            className={`group px-8 py-4 rounded-full flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-xl
                            ${mode === 'recover'
                                    ? 'bg-[#2C2420] text-white hover:bg-stone-800'
                                    : 'bg-[#F5EDDF] text-[#2C2420] hover:bg-white'}`}
                        >
                            {mode === 'recover' ? "Explorar Kit Stage 2" : "Ver Colección Hourglass"}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            to="/fit-finder"
                            className={`px-8 py-4 rounded-full flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 border backdrop-blur-sm
                            ${mode === 'recover'
                                    ? 'border-[#2C2420]/30 text-[#2C2420] hover:bg-[#2C2420]/5'
                                    : 'border-white/30 text-white hover:bg-white/10'}`}
                        >
                            Calcular mi Talla
                        </Link>
                    </div>
                </div>

                {/* Floating Badge (Trust Signal) */}
                <div className={`absolute bottom-12 right-6 md:right-12 backdrop-blur-xl border p-4 rounded-2xl max-w-xs transition-opacity duration-1000 hidden md:block
                    ${mode === 'recover'
                        ? 'bg-white/60 border-white/40 text-stone-800'
                        : 'bg-black/30 border-white/20 text-white'}`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">
                            {mode === 'recover' ? "Doctor Recommended" : "Trending Now"}
                        </span>
                    </div>
                    <p className="text-xs font-medium leading-relaxed">
                        {mode === 'recover'
                            ? "\"Es vital mantener la compresión constante durante las primeras 8 semanas para evitar seromas.\""
                            : "\"El efecto de reloj de arena es instantáneo y la comodidad permite usarla todo el día.\""}
                    </p>
                </div>

            </div>
        </div>
    );
}
