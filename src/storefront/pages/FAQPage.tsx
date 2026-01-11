import { Search, Package, Ruler, Stethoscope, Shirt, ArrowRight } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { Link } from 'react-router-dom';

export default function FAQPage() {
    return (
        <div className="bg-[#F9F8F6] min-h-screen font-sans">

            {/* BLOCK 1: SEARCH HERO */}
            <div className="bg-[#2C2420] text-white pt-12 pb-24 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h1 className="font-serif text-3xl md:text-5xl mb-4">Centro de Ayuda</h1>
                    <p className="text-white/80 mb-8 font-light">Estamos aquí para resolver tus dudas antes, durante y después de tu compra.</p>

                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="¿Tienes dudas sobre tu talla o envío?"
                            className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 focus:ring-4 focus:ring-[#D4AF37]/50 focus:outline-none shadow-xl transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" />
                    </div>
                </div>
            </div>

            {/* BLOCK 2: VISUAL CATEGORIES */}
            <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Card 1: Talla */}
                    <Link to="/pages/guia-de-tallas" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group border border-transparent hover:border-[#D4AF37]/30">
                        <div className="w-12 h-12 bg-[#F9F8F6] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors">
                            <Ruler className="text-[#3E322C] group-hover:text-white" />
                        </div>
                        <h3 className="font-serif text-xl text-[#3E322C] mb-2">Talla y Ajuste</h3>
                        <p className="text-sm text-gray-500 mb-4">Encuentra tu Fit perfecto y aprende a medirte correctamente.</p>
                        <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            Ver Guía <ArrowRight size={12} />
                        </span>
                    </Link>

                    {/* Card 2: Envíos */}
                    <Link to="/shipping" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group border border-transparent hover:border-[#D4AF37]/30">
                        <div className="w-12 h-12 bg-[#F9F8F6] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors">
                            <Package className="text-[#3E322C] group-hover:text-white" />
                        </div>
                        <h3 className="font-serif text-xl text-[#3E322C] mb-2">Envíos y Cambios</h3>
                        <p className="text-sm text-gray-500 mb-4">Tiempos de entrega, rastreo y nuestra garantía de satisfacción.</p>
                        <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            Leer Política <ArrowRight size={12} />
                        </span>
                    </Link>

                    {/* Card 3: Médicas */}
                    <Link to="/collections/recovery" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group border border-transparent hover:border-[#D4AF37]/30">
                        <div className="w-12 h-12 bg-[#F9F8F6] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors">
                            <Stethoscope className="text-[#3E322C] group-hover:text-white" />
                        </div>
                        <h3 className="font-serif text-xl text-[#3E322C] mb-2">Dudas Médicas</h3>
                        <p className="text-sm text-gray-500 mb-4">Stage 1 vs Stage 2, uso de tablas y recuperación post-op.</p>
                        <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            Consultar <ArrowRight size={12} />
                        </span>
                    </Link>

                    {/* Card 4: Cuidados */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group border border-transparent hover:border-[#D4AF37]/30 cursor-pointer">
                        <div className="w-12 h-12 bg-[#F9F8F6] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors">
                            <Shirt className="text-[#3E322C] group-hover:text-white" />
                        </div>
                        <h3 className="font-serif text-xl text-[#3E322C] mb-2">Cuidado de Prenda</h3>
                        <p className="text-sm text-gray-500 mb-4">Cómo lavar y cuidar tu faja para mantener la compresión.</p>
                        <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            Ver Tips <ArrowRight size={12} />
                        </span>
                    </div>

                </div>
            </div>

            {/* BLOCK 3: TOP QUESTIONS */}
            <div className="pb-24">
                <FAQSection /> {/* This components holds the Schema and the Questions */}
            </div>

            {/* CTA FOOTER */}
            <div className="bg-white py-12 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h3 className="font-serif text-2xl text-[#3E322C] mb-4">¿No encontraste lo que buscabas?</h3>
                    <p className="text-gray-500 mb-8">Nuestro equipo de expertas en fajas está disponible por WhatsApp.</p>
                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-colors shadow-lg hover:shadow-green-200"
                    >
                        Chatear con Experta
                    </a>
                </div>
            </div>

        </div>
    );
}
