import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQItemProps {
    question: string;
    answer: string;
}

export function FAQSection() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Using returnObjects: true to get array from translation file
    // Fallback to empty array if not found to prevent crashes
    const faqItems = (t('components.faq.items', { returnObjects: true }) as FAQItemProps[]) || [];

    // Inject Schema Markup for SEO
    useEffect(() => {
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": Array.isArray(faqItems) ? faqItems.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            })) : []
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schemaData);
        script.id = 'faq-schema';
        document.head.appendChild(script);

        return () => {
            const existing = document.getElementById('faq-schema');
            if (existing) document.head.removeChild(existing);
        };
    }, [faqItems]);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="max-w-3xl mx-auto py-12 px-4">
            <div className="text-center mb-10">
                <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase mb-4 block">{t('components.faq.subtitle')}</span>
                <h2 className="font-serif text-3xl text-[#2C2420]">{t('components.faq.title')}</h2>
            </div>

            <div className="space-y-4">
                {Array.isArray(faqItems) && faqItems.map((item, index) => (
                    <div
                        key={index}
                        className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 bg-white ${openIndex === index ? 'border-[#D4AF37] shadow-md' : 'hover:border-gray-300'
                            }`}
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center p-5 text-left bg-white focus:outline-none"
                        >
                            <span className="font-bold text-[#2C2420] pr-8 text-lg">{item.question}</span>
                            <ChevronDown
                                className={`text-[#D4AF37] transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                                    }`}
                                size={20}
                            />
                        </button>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed border-l-4 border-[#D4AF37] ml-5 mb-5 pl-4">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
