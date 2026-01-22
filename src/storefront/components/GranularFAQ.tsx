import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Generic FAQ Content for now - can be made dynamic by silo later
const faqs = [
    {
        question: "¿Cómo sé cuál es mi talla correcta?",
        answer: "Nuestras fajas son de grado médico y tienen una compresión muy alta. Te recomendamos usar nuestra calculadora 'Guitar Ratio' o la tabla de medidas. Si estás entre dos tallas, siempre elige la más grande para tu comodidad inicial."
    },
    {
        question: "¿Esta prenda sirve para uso diario?",
        answer: "Sí, la mayoría de nuestra colección Sculpt está diseñada para ser invisible bajo la ropa diaria. Las prendas de Recovery Stage 2 también pueden usarse diariamente una vez que tu doctor lo autorice (generalmente después de la semana 6)."
    },
    {
        question: "¿Hacen envíos internacionales?",
        answer: "Sí, enviamos a todo el mundo desde nuestro centro de distribución principal. Los tiempos de envío varían entre 3-7 días hábiles dependiendo de tu ubicación."
    },
    {
        question: "¿Cuál es la política de cambios?",
        answer: "Ofrecemos garantía de satisfacción 'Perfect Fit'. Si tu faja no te queda, tienes 30 días para cambiarla por otra talla, siempre que la prenda esté en su empaque original y sin uso (por higiene)."
    }
];

export function GranularFAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="py-20 bg-white max-w-4xl mx-auto px-6 border-t border-stone-100">
            <div className="mb-12 text-center">
                <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-4 block">
                    Centro de Soporte
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420]">
                    Preguntas Frecuentes
                </h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-stone-100 last:border-0"
                    >
                        <button
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full py-6 flex justify-between items-center text-left hover:text-[#D4AF37] transition-colors group"
                        >
                            <span className="text-lg font-medium text-[#2C2420] group-hover:text-[#D4AF37]">
                                {faq.question}
                            </span>
                            <span className="ml-4 text-[#D4AF37]">
                                {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                            </span>
                        </button>

                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <p className="pb-8 text-stone-500 leading-relaxed pr-8 font-light">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
