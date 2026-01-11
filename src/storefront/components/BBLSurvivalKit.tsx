
import { useState } from 'react';
import { motion } from 'framer-motion';

// Datos de los productos del Kit
// Datos de los productos del Kit (Updated for Faja + Bra Strategy)
const essentials = [
    { id: 1, name: "Faja Stage 2 Guitar Curves", price: 120, required: true, desc: "La base de tu moldeamiento." },
    { id: 2, name: "Brasier Post-Operatorio (Soporte Espalda)", price: 55, required: false, desc: "Protege tu postura y asegura tus implantes." },
];

export function BBLSurvivalKit() {
    // Estado inicial: Todos seleccionados para maximizar venta (Nesting Instinct)
    const [selectedItems, setSelectedItems] = useState(essentials.map(i => i.id));

    const toggleItem = (id: number) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    // Cálculo de total
    const total = essentials
        .filter(item => selectedItems.includes(item.id))
        .reduce((acc, item) => acc + item.price, 0);

    // Descuento dinámico por llevar ambos (Faja + Bra)
    const discount = selectedItems.length >= 2 ? 0.15 : 0;
    const finalPrice = total * (1 - discount);

    return (
        <section className="py-16 bg-white max-w-4xl mx-auto px-4" id="bundle-builder">

            {/* Header SEO */}
            <div className="text-center mb-12">
                <h2 className="font-serif text-4xl text-[#3E322C] mb-4">El Dúo de Recuperación</h2>
                <p className="text-gray-500">Agrega el Brasier a tu Faja y obtén un <span className="text-[#D4AF37] font-bold">15% OFF</span> inmediato.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

                {/* COLUMNA IZQUIERDA: La Lista de Chequeo */}
                <div className="md:col-span-2 space-y-4">
                    {essentials.map((item) => (
                        <motion.div
                            key={item.id}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedItems.includes(item.id)
                                ? 'border-[#3E322C] bg-[#F9F8F6]'
                                : 'border-gray-100 bg-white'
                                }`}
                            onClick={() => toggleItem(item.id)}
                        >
                            {/* Custom Checkbox UI */}
                            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${selectedItems.includes(item.id) ? 'bg-[#3E322C] border-[#3E322C]' : 'border-gray-300'
                                }`}>
                                {selectedItems.includes(item.id) && <span className="text-white text-xs">✓</span>}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                                    <span className="font-mono text-sm">${item.price}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}

                    <div className="bg-red-50 p-4 rounded-lg mt-6 border border-red-100">
                        <p className="text-xs text-red-800 font-bold">
                            ⚠️ Advertencia Médica:
                        </p>
                        <p className="text-xs text-red-700 leading-tight mt-1">
                            No te sientes directamente en el inodoro o sofá durante 8 semanas. Usa el Cojín BBL o tu transferencia de grasa podría morir por la presión.
                        </p>
                    </div>
                </div>

                {/* COLUMNA DERECHA: El Resumen Sticky */}
                <div className="relative">
                    <div className="sticky top-24 bg-[#3E322C] text-white p-6 rounded-2xl shadow-2xl">
                        <h3 className="font-serif text-xl mb-6 border-b border-white/20 pb-4">Tu Kit BBL</h3>

                        <div className="space-y-2 mb-6 text-sm">
                            <div className="flex justify-between text-gray-300">
                                <span>Subtotal</span>
                                <span>${total.toFixed(0)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-[#D4AF37] font-bold">
                                    <span>Descuento (15%)</span>
                                    <span>-${(total * discount).toFixed(0)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/20">
                                <span>Total</span>
                                <span>${finalPrice.toFixed(0)}</span>
                            </div>
                        </div>

                        <button className="w-full bg-white text-[#3E322C] py-4 rounded-xl font-bold tracking-widest hover:bg-[#D4AF37] hover:text-white transition-colors">
                            AGREGAR AL CARRITO
                        </button>

                        <p className="text-center text-[10px] text-gray-400 mt-4">
                            *Envío prioritario incluido hoy.
                        </p>
                        <p className="text-center text-[10px] text-gray-500 mt-2 italic">
                            Basado en protocolos de recuperación de Miami y Colombia.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
