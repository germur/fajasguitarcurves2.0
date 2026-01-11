import { Ruler, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CurveCalculator() {
    return (
        <section className="py-20 bg-[#050505] text-white overflow-hidden relative">
            {/* Background Abstract Lines (Gold) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transform -rotate-12"></div>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transform rotate-12"></div>
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <div className="inline-flex items-center gap-2 text-[#D4AF37] border border-[#D4AF37]/30 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8 animate-pulse">
                    <Ruler size={14} />
                    Guitar Tech™ Sizing
                </div>

                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                    ¿Miedo a que no suba de las caderas?
                </h2>

                <p className="text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
                    Entendemos el problema: Cintura XS, Cadera XL. Usa nuestra calculadora especializada para encontrar tu talla exacta en nuestra horma "Guitarra".
                </p>

                <div className="flex justify-center">
                    <Link
                        to="/pages/calculator"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-[#050505] font-bold text-xs uppercase tracking-widest overflow-hidden hover:bg-white transition-colors duration-300"
                    >
                        <span className="relative z-10">Calcular mi Fit Guitarra</span>
                        <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />

                        {/* Button Glitch Effect layer could go here */}
                    </Link>
                </div>
            </div>
        </section>
    );
}
