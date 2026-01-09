import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
    question: string;
    answer: string;
}

interface ExpertFAQProps {
    faqs: FAQ[];
}

export function ExpertFAQ({ faqs }: ExpertFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2420] mb-12 text-center">
                Ask The Expert
            </h2>
            <div className="space-y-4">
                {faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;

                    return (
                        <div key={idx} className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-50 transition-colors"
                            >
                                <span className={`font-serif font-bold text-lg ${isOpen ? 'text-[#D1AB66]' : 'text-[#2C2420]'}`}>
                                    {faq.question}
                                </span>
                                {isOpen ? (
                                    <Minus className="w-5 h-5 text-[#D1AB66]" />
                                ) : (
                                    <Plus className="w-5 h-5 text-stone-400" />
                                )}
                            </button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-stone-500 leading-relaxed border-t border-stone-50">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
            {/* Schema.org Injection will be handled in parent via Head */}
        </div>
    );
}
