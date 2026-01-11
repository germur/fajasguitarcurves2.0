import { Plus } from 'lucide-react';
import { useState } from 'react';

export function WaistTrainingLab() {
    // Basic state for active hotspot interaction (optional for MVP, but nice for polish)
    const [activePoint, setActivePoint] = useState<number | null>(null);

    const points = [
        { id: 1, top: '30%', left: '40%', label: '14 Varillas Flexibles', desc: 'Acero espiral que no se entierra.' },
        { id: 2, top: '50%', left: '50%', label: 'Látex Térmico', desc: 'Aumenta la sudoración localizada.' },
        { id: 3, top: '70%', left: '45%', label: '3 Hileras', desc: 'Ajuste progresivo mientras reduces.' },
    ];

    return (
        <section className="bg-stone-50 text-stone-900 py-0 md:py-20 lg:py-0 overflow-hidden">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

                {/* Text Side */}
                <div className="p-12 lg:p-24 flex flex-col justify-center order-2 lg:order-1 relative z-10 bg-stone-50">
                    <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">The Science of Curves</span>

                    <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-none text-stone-900">
                        Entrena tu Cintura:<br />
                        <span className="text-stone-500">El Reto de 28 Días</span>
                    </h2>

                    <p className="text-stone-600 mb-8 max-w-md leading-relaxed border-l border-[#D4AF37] pl-6">
                        Nuestras cinturillas no solo moldean al instante. El uso constante (6-8 horas diarias) ayuda a la <strong className="text-stone-900">memoria muscular</strong> y la termogénesis para resultados permanentes.
                    </p>

                    <div className="grid grid-cols-2 gap-8 mt-4">
                        <div>
                            <h4 className="text-2xl font-serif text-[#D4AF37]">4cm</h4>
                            <p className="text-[10px] uppercase tracking-widest text-stone-500">Reducción Instantánea</p>
                        </div>
                        <div>
                            <h4 className="text-2xl font-serif text-[#D4AF37]">100%</h4>
                            <p className="text-[10px] uppercase tracking-widest text-stone-500">Control de Postura</p>
                        </div>
                    </div>
                </div>

                {/* Interactive Image Side */}
                <div className="relative h-[500px] lg:h-auto bg-stone-200 order-1 lg:order-2">
                    <img
                        src="https://images.unsplash.com/photo-1559599238-308793637427?q=80&w=1200&auto=format&fit=crop"
                        alt="Waist Trainer Detail"
                        className="w-full h-full object-cover opacity-90"
                    />

                    {/* Hotspots */}
                    {points.map((p) => (
                        <div
                            key={p.id}
                            className="absolute z-20"
                            style={{ top: p.top, left: p.left }}
                        >
                            <button
                                onClick={() => setActivePoint(activePoint === p.id ? null : p.id)}
                                className={`w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:scale-110 transition-transform ${activePoint === p.id ? 'scale-110 rotate-45' : ''}`}
                            >
                                <Plus size={16} />
                            </button>

                            {/* Tooltip */}
                            <div className={`absolute left-10 top-0 w-48 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg transform transition-all duration-300 origin-left ${activePoint === p.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                <h5 className="font-bold text-[#D4AF37] text-xs uppercase mb-1">{p.label}</h5>
                                <p className="text-[10px] text-gray-300 leading-tight">{p.desc}</p>
                            </div>
                        </div>
                    ))}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-l from-[#111] via-transparent to-transparent pointer-events-none"></div>
                </div>

            </div>
        </section>
    );
}
