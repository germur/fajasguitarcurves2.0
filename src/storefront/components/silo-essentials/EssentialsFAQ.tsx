import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface FAQItem {
    question: string;
    answer: string;
}

export function EssentialsFAQ() {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    // Get FAQs from translations
    const faqs = t('components.essentials_faq.faqs', { returnObjects: true }) as FAQItem[];

    return (
        <section className="py-24 bg-white max-w-4xl mx-auto px-6">
            <div className="mb-16 text-center">
                <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-4 block">
                    {t('components.essentials_faq.education_hub')}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#3E322C]">
                    {t('components.essentials_faq.title')}
                </h2>
            </div>

            <div className="space-y-4">
                {Array.isArray(faqs) && faqs.map((faq, index) => (
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
