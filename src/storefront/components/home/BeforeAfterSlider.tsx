import { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { MoveHorizontal } from "lucide-react";

export function BeforeAfterSlider() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    };

    const handleMouseDown = () => { isDragging.current = true; };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging.current) handleMove(e.clientX);
    };

    // Touch support
    const handleTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX);
    }

    useEffect(() => {
        const handleWindowUp = () => { isDragging.current = false; };
        window.addEventListener('mouseup', handleWindowUp);
        return () => window.removeEventListener('mouseup', handleWindowUp);
    }, []);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Text Context */}
                    <div className="w-full md:w-1/3 order-2 md:order-1">
                        <span className="text-[#A35944] font-bold tracking-widest text-xs uppercase mb-4 block">
                            Transformación Real
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-[#2C2420] font-bold mb-6 leading-tight">
                            No es magia, es <br />Ingeniería Textil.
                        </h2>
                        <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                            Olvídate del "Hip Dip" y la flacidez. Nuestra tecnología de alta compresión redistribuye el tejido para crear una silueta de reloj de arena instantánea, sin cirugía.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Corrige Hip Dips al instante",
                                "Aplana el abdomen bajo (FUPA)",
                                "Levanta los glúteos naturalmente"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium text-[#2C2420]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#D1AB66]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="/colecciones/moldeo-y-estetica" className="inline-block px-8 py-4 bg-[#2C2420] text-[#F5EDDF] rounded-full font-bold text-sm tracking-widest uppercase hover:bg-stone-800 transition-all">
                            Descubrir Sculpt Studio
                        </Link>
                    </div>

                    {/* Slider Component */}
                    <div className="w-full md:w-2/3 h-[500px] md:h-[600px] relative rounded-3xl overflow-hidden shadow-2xl order-1 md:order-2 select-none cursor-ew-resize"
                        ref={containerRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleTouchMove}
                    >
                        {/* Image: After (Full Width) */}
                        <img
                            src="/assets/slider-after-final.png"
                            alt="Resultado BBL con Faja Guitar Curves Stage 2 y cintura de avispa"
                            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                        />
                        <div className="absolute top-6 right-6 bg-[#2C2420] text-[#F5EDDF] px-3 py-1 text-xs font-bold rounded uppercase">
                            Con Faja
                        </div>

                        {/* Image: Before (Clipped) */}
                        <div
                            className="absolute inset-0 w-full h-full bg-stone-200 overflow-hidden pointer-events-none border-r-2 border-white"
                            style={{ width: `${sliderPosition}%` }}
                        >
                            {/* Use a slightly less flattering pose or plain clothing for 'Before' contrast */}
                            <img
                                src="/assets/slider-before.png"
                                alt="Cuerpo en recuperación sin compresión post-quirúrgica"
                                className="absolute inset-0 w-full h-full object-cover object-center"
                            />
                            <div className="absolute top-6 left-6 bg-white/80 text-stone-600 px-3 py-1 text-xs font-bold rounded uppercase backdrop-blur-sm">
                                Sin Faja
                            </div>
                        </div>

                        {/* Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#2C2420]">
                                <MoveHorizontal size={20} />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
