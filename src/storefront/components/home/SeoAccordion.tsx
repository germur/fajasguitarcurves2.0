import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function SeoAccordion() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="bg-[#FAF9F6] border-t border-stone-200 py-12">
            <div className="max-w-4xl mx-auto px-6">

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between text-[#2C2420] font-bold text-lg md:text-xl py-4 border-b border-stone-300 focus:outline-none"
                >
                    <span>{t('components.seo_accordion.title')}</span>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                    <div className="prose prose-stone max-w-none text-sm md:text-base text-stone-600 space-y-4">
                        <p dangerouslySetInnerHTML={{ __html: t('components.seo_accordion.intro') }} />

                        <h3 className="text-[#2C2420] font-bold">{t('components.seo_accordion.stages_title')}</h3>
                        <ul className="list-disc pl-5">
                            <li dangerouslySetInnerHTML={{ __html: t('components.seo_accordion.stage_1') }} />
                            <li dangerouslySetInnerHTML={{ __html: t('components.seo_accordion.stage_2') }} />
                            <li dangerouslySetInnerHTML={{ __html: t('components.seo_accordion.stage_3') }} />
                        </ul>

                        <h3 className="text-[#2C2420] font-bold">{t('components.seo_accordion.shipping_title')}</h3>
                        <p dangerouslySetInnerHTML={{ __html: t('components.seo_accordion.shipping_text') }} />

                        <p className="text-xs italic mt-4">
                            {t('components.seo_accordion.keywords')}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
