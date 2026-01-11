import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "¿Por qué necesito un brasier especial después de mi cirugía?",
        answer: "Después de una mamoplastia o levantamiento, tus tejidos necesitan soporte constante para evitar la flacidez mientras sanan. Nuestros brasieres de grado médico proporcionan la compresión exacta para reducir la inflamación, evitar la retención de líquidos y asegurar que tus implantes se asienten en la posición correcta."
    },
    {
        question: "¿Cuánto tiempo debo usar el brasier post-quirúrgico?",
        answer: "La mayoría de los cirujanos recomiendan el uso continuo (24/7) durante las primeras 6 semanas. Después de este periodo, puedes pasar a usarlo durante el día o la noche según la recomendación médica. Nuestros diseños son tan cómodos que muchas clientes los siguen usando como brasier diario por el soporte de espalda que ofrecen."
    },
    {
        question: "¿Cómo ayuda con la postura?",
        answer: "El peso de los implantes puede causar dolor de espalda y hombros encorvados. Nuestros brasieres cuentan con un refuerzo en 'X' o soporte alto en la espalda que te obliga suavemente a mantener los hombros atrás y la columna alineada, aliviando la tensión inmediatamente."
    },
    {
        question: "¿Los brasieres tienen varillas?",
        answer: "No. Durante la recuperación, las varillas (aros metálicos) están prohibidas porque pueden lastimar las incisiones o alterar la forma del implante. Nuestra tecnología 'Wireless Support' levanta y sostiene el busto usando cortes inteligentes en la tela de alta compresión, sin necesidad de metales incómodos."
    }
];

export function EssentialsFAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white max-w-4xl mx-auto px-6">
            <div className="mb-16 text-center">
                <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-4 block">
                    Education Hub
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#3E322C]">
                    Preguntas Frecuentes de Recuperación
                </h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-gray-100 last:border-0"
                    >
                        <button
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full py-6 flex justify-between items-center text-left hover:text-[#D4AF37] transition-colors group"
                        >
                            <span className="text-lg font-medium text-[#3E322C] group-hover:text-[#D4AF37]">
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
                                    <p className="pb-8 text-gray-500 leading-relaxed pr-8">
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
