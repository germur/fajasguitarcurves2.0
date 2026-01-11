
import { useState } from 'react';

const hotspots = [
    { id: 1, x: 50, y: 18, label: "Corrección Cervical", desc: "Mejora tu postura al instante." },
    { id: 2, x: 74, y: 45, label: "Cobertura de Axila", desc: "Control total de gorditos." },
    { id: 3, x: 50, y: 75, label: "Soporte Lumbar", desc: "Alivio sin varillas incómodas." }
];

export function AnatomyOfRecovery() {
    const [activeSpot, setActiveSpot] = useState<number | null>(null);

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">

                {/* Lado Izquierdo: Texto */}
                <div className="md:w-1/3 space-y-6">
                    <h2 className="text-3xl font-serif font-bold text-gray-900">
                        La Anatomía del <br /> Soporte Perfecto
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Tu busto y espalda necesitan tanta atención como tu cintura.
                        Descubre por qué nuestros brasieres son esenciales para tu recuperación.
                    </p>
                </div>

                {/* Lado Derecho: Imagen Interactiva */}
                <div className="md:w-2/3 relative h-[600px] w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <img
                        src="/assets/anatomy-back-view.jpg"
                        alt="Esquema soporte post-operatorio"
                        className="w-full h-full object-cover object-top bg-white"
                    />

                    {/* Renderizado de Hotspots */}
                    {hotspots.map((spot) => (
                        <div
                            key={spot.id}
                            className="absolute group"
                            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        >
                            {/* El Punto Pulsante */}
                            <button
                                onClick={() => setActiveSpot(activeSpot === spot.id ? null : spot.id)}
                                className="relative w-8 h-8 -ml-4 -mt-4 flex items-center justify-center"
                            >
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D4AF37] border-2 border-white"></span>
                            </button>

                            {/* La Tarjeta de Producto (Tooltip) */}
                            <div className={`absolute left-8 top-0 w-48 bg-white p-4 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 z-10 ${activeSpot === spot.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
                                }`}>
                                <h4 className="font-bold text-gray-900 text-sm mb-1">{spot.label}</h4>
                                <p className="text-xs text-gray-500 leading-snug">{spot.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
