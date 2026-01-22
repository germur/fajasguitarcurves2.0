import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductHotspot {
    id: number;
    x: number; // Percentage from left
    y: number; // Percentage from top
    productName: string;
    price: string;
    link: string;
    image: string;
}

const HOTSPOTS: ProductHotspot[] = [
    {
        id: 1,
        x: 45,
        y: 40,
        productName: "Faja Etapa 2 Media Pierna",
        price: "$120.00",
        link: "/productos/faja-etapa-2-media-pierna",
        image: "/assets/faja-popup-final.jpg"
    },
    {
        id: 2,
        x: 60,
        y: 65,
        productName: "Brasier Post-Op",
        price: "$50.00",
        link: "/productos/brasier-post-operatorio-postura",
        image: "/assets/brasier-post-op.jpg"
    }
];

export function ShopTheLook() {
    const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

    return (
        <section className="py-24 bg-[#E8EAEB]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* 1. The Interactive Image */}
                    <div className="w-full md:w-1/2 relative group">
                        <div className="relative rounded-xl overflow-hidden shadow-2xl">
                            <img
                                src="/assets/stage2-faja-bra.jpg"
                                alt="Kit Guitarra Completo - Faja y Brasier"
                                className="w-full h-[600px] object-cover"
                            />

                            {/* Hotspots */}
                            {HOTSPOTS.map((spot) => (
                                <div
                                    key={spot.id}
                                    className="absolute"
                                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                                >
                                    {/* Pulse Effect */}
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>

                                    {/* Button */}
                                    <button
                                        className={`relative w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 ${activeHotspot === spot.id ? 'bg-[#2C2420] text-white' : 'text-[#2C2420]'}`}
                                        onMouseEnter={() => setActiveHotspot(spot.id)}
                                        onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                                    >
                                        <Plus size={16} />
                                    </button>

                                    {/* Tooltip Card */}
                                    <div
                                        className={`
                                            absolute z-20 top-10 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-lg shadow-xl
                                            transition-all duration-300 origin-top
                                            ${activeHotspot === spot.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                                        `}
                                    >
                                        <div className="aspect-square rounded-md overflow-hidden mb-2 bg-stone-100">
                                            <img src={spot.image} alt={spot.productName} className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-serif font-bold text-sm text-[#2C2420] leading-tight">{spot.productName}</h4>
                                        <p className="text-xs text-[#B49286] font-bold mt-1">{spot.price}</p>
                                        <Link to={spot.link} className="block mt-2 text-center text-[10px] uppercase font-bold tracking-widest bg-[#2C2420] text-white py-1.5 rounded hover:bg-[#A35944] transition-colors">
                                            Ver Producto
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. The Context/Copy */}
                    <div className="w-full md:w-1/2 md:pl-12">
                        <span className="text-[#B49286] font-bold tracking-widest text-xs uppercase mb-4 block">
                            Estilo Curado
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-[#2C2420] font-bold mb-6 leading-tight">
                            El "Kit Guitarra" <br />Completo.
                        </h2>
                        <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                            No es solo una faja, es un sistema de escultura corporal. Combina tu <strong>Faja Stage 2</strong> con el <strong>Brasier Post-Operatorio</strong> para un soporte completo de espalda y máxima definición.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/pages/bbl-recovery-kit" className="px-8 py-4 bg-[#2C2420] text-[#F5EDDF] rounded-full font-bold text-sm tracking-widest uppercase hover:bg-stone-800 transition-all text-center">
                                comprar el kit
                            </Link>
                            <Link to="/colecciones/recuperacion" className="px-8 py-4 border border-[#2C2420] text-[#2C2420] rounded-full font-bold text-sm tracking-widest uppercase hover:bg-stone-100 transition-all text-center">
                                ver colección
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
