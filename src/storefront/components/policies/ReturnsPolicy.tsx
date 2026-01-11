import { MessageCircle, Package, Sparkles } from 'lucide-react';

export default function ReturnsPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 font-sans text-[#3E322C]">

            {/* HERO */}
            <div className="text-center mb-16">
                <h1 className="font-serif text-4xl md:text-5xl mb-4">Garantía de Ajuste</h1>
                <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
                    Nuestra Garantía de Ajuste Perfecto: Sabemos que comprar fajas online puede generar dudas. Por eso, tienes <strong>30 días</strong> desde que recibes tu pedido para solicitar un cambio de talla.
                </p>
            </div>

            {/* THE PROCESS GRID */}
            <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
                {/* Línea conectora (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>

                {[
                    { icon: <MessageCircle size={32} />, title: "1. Contáctanos", desc: "Envíanos foto de cómo te queda (si deseas) y solicita el cambio." },
                    { icon: <Package size={32} />, title: "2. Envíala", desc: "Usa la etiqueta prepagada que te daremos. Empaca con cuidado." },
                    { icon: <Sparkles size={32} />, title: "3. Recibe", desc: "En cuanto la recibamos, tu nueva talla sale disparada hacia ti." }
                ].map((step, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
                        <div className="w-16 h-16 bg-[#F9F8F6] rounded-full flex items-center justify-center text-[#D4AF37] mx-auto mb-4 border-2 border-[#D4AF37]">
                            {step.icon}
                        </div>
                        <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>

            {/* WARNING CARD (UX Writing clave) */}
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl mb-12 flex items-start gap-4">
                <div className="text-red-400 text-2xl">⚠️</div>
                <div>
                    <h4 className="font-bold text-red-800 uppercase text-xs tracking-widest mb-2">Política de Higiene Estricta</h4>
                    <p className="text-sm text-red-900/80 leading-relaxed">
                        Por regulaciones de salud estrictas, la prenda debe devolverse en su empaque original, con todas las etiquetas puestas y, lo más importante, <strong>sin marcas de uso (desodorante, cremas, fluidos)</strong>. Te recomendamos probarte siempre la faja sobre tu propia ropa interior. Si la prenda pasa nuestra inspección de higiene, te enviaremos tu nueva talla en tiempo récord.
                    </p>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center">
                <a href="https://wa.me/xxxx" className="inline-block bg-[#3E322C] text-white px-8 py-4 rounded-xl font-bold tracking-widest hover:bg-black transition-transform transform hover:-translate-y-1 shadow-xl">
                    INICIAR UN CAMBIO AHORA
                </a>
                <p className="text-xs text-gray-400 mt-4">Tiempo de respuesta promedio: 2 horas.</p>
            </div>

        </div>
    );
}
