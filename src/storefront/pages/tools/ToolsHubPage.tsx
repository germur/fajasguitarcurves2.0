

import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Calculator, Ruler, Layers } from 'lucide-react';
import { SeoHead } from '../../components/SeoHead';

const TOOLS = [
    {
        id: 'recovery-calc',
        title: "Calculadora de Recuperación",
        description: "Descubre exactamente en qué etapa de recuperación estás y qué faja necesitas usar hoy.",
        icon: <Activity className="w-8 h-8 text-white" />,
        link: "/tools/recovery-timeline",
        bgImage: "/assets/tool-recovery.png",
        status: "Active",
        cta: "Calcular Etapa"
    },
    {
        id: 'guitar-ratio',
        title: "Guitar Ratio Finder",
        description: "¿Eres una 'Falsa S' o una 'Verdadera Guitarra'? Analiza tus medidas con nuestro algoritmo.",
        icon: <Calculator className="w-8 h-8 text-white" />,
        link: "/tools/guitar-ratio",
        bgImage: "/assets/tool-ratio.jpg",
        status: "Active",
        cta: "Iniciar Test"
    },
    {
        id: 'stage-comparator',
        title: "Comparador Stage 1 vs 2",
        description: "La guía visual definitiva para saber cuándo y por qué cambiar de etapa.",
        icon: <Layers className="w-8 h-8 text-white" />,
        link: "/tools/stage1-vs-stage2",
        bgImage: "/assets/tool-comparator.jpg",
        status: "Active",
        cta: "Ver Comparativa"
    }
];

export default function ToolsHubPage() {
    return (
        <div className="min-h-screen bg-[#FAF9F6] font-sans">
            <SeoHead
                title="The Body Lab | Herramientas Fajas Guitar Curves"
                description="Centro de tecnología y herramientas para identificar tu cuerpo y optimizar tu recuperación."
            />

            {/* Header */}
            <header className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-6 animate-fade-in">
                    Technology Center
                </span>
                <h1 className="font-serif text-5xl md:text-6xl text-[#2C2420] mb-6 animate-fade-in delay-100">
                    The Body Lab
                </h1>
                <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-200">
                    Herramientas de precisión diseñadas para acompañarte en cada paso de tu transformación. Sin adivinanzas, solo datos.
                </p>
            </header>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-32">
                <div className="grid md:grid-cols-3 gap-8">
                    {TOOLS.map((tool) => (
                        <Link
                            key={tool.id}
                            to={tool.link}
                            className="group relative h-[500px] rounded-[2rem] overflow-hidden border border-stone-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={tool.bgImage}
                                    alt={tool.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420] via-[#2C2420]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="mb-auto pt-4">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-colors duration-500">
                                        {tool.icon}
                                    </div>
                                </div>

                                <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                    <h2 className="font-serif text-3xl text-white mb-3">
                                        {tool.title}
                                    </h2>
                                    <p className="text-white/70 mb-8 line-clamp-3 group-hover:text-white transition-colors">
                                        {tool.description}
                                    </p>

                                    <div className="inline-flex items-center gap-3 text-white font-bold tracking-widest text-xs uppercase group/btn">
                                        {tool.cta}
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-[#2C2420] transition-colors">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Coming Soon Card (Optional Placeholder) */}
                    <div className="relative h-[500px] rounded-[2rem] border border-dashed border-stone-300 bg-stone-50 flex flex-col items-center justify-center text-center p-8 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                        <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center mb-6">
                            <Ruler className="text-stone-400" />
                        </div>
                        <h3 className="font-serif text-2xl text-stone-400 mb-2">Quiz de Fibrosis</h3>
                        <p className="text-sm text-stone-400 max-w-xs">
                            Herramienta de diagnóstico avanzado para detectar irregularidades post-quirúrgicas.
                        </p>
                        <span className="mt-6 px-4 py-1.5 bg-stone-200 text-stone-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                            Próximamente
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
