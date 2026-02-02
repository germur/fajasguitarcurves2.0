import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQItem {
    question: string;
    answer: string;
}

export function MedicalAccordions() {
    const { t } = useTranslation();

    // Get FAQs from translations
    const faqs = t('components.medical_accordions.faqs', { returnObjects: true }) as FAQItem[];

    return (
        <div className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold text-[#A35944] uppercase tracking-widest block mb-2">
                        {t('components.medical_accordions.knowledge_base')}
                    </span>
                    <h2 className="text-2xl font-serif text-[#2C2420]">
                        {t('components.medical_accordions.title')}
                    </h2>
                </div>

                <div className="space-y-4">
                    {Array.isArray(faqs) && faqs.map((faq, idx) => (
                        <details key={idx} className="group border-b border-gray-100 pb-4">
                            <summary className="flex justify-between items-center cursor-pointer list-none py-4 text-sm font-bold text-gray-700 hover:text-[#A35944] transition-colors uppercase tracking-wide">
                                {faq.question}
                                <span className="transition-transform group-open:rotate-180">
                                    <ChevronDown size={16} />
                                </span>
                            </summary>
                            <div className="text-gray-500 text-sm leading-relaxed mt-2 pl-4 border-l-2 border-[#D4AF37]/30 animate-fade-in">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
