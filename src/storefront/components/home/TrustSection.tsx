import { ShieldCheck, Layers, RefreshCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function TrustSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-white border-t border-stone-100">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2420] mb-4">
                        {t('components.trust_section.title')}
                    </h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">
                        {t('components.trust_section.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-[#2C2420]">

                    {/* Item 1: Design BBL Safe */}
                    <div className="p-8 bg-[#FAF9F6] rounded-3xl border border-stone-100 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                            <ShieldCheck size={32} className="text-[#D1AB66]" />
                        </div>
                        <h3 className="font-bold text-xl mb-3">{t('components.trust_section.bbl_safe_title')}</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">
                            {t('components.trust_section.bbl_safe_desc')}
                        </p>
                    </div>

                    {/* Item 2: Compresión Médica */}
                    <div className="p-8 bg-[#FAF9F6] rounded-3xl border border-stone-100 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                            <Layers size={32} className="text-[#D1AB66]" />
                        </div>
                        <h3 className="font-bold text-xl mb-3">{t('components.trust_section.medical_title')}</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">
                            {t('components.trust_section.medical_desc')}
                        </p>
                    </div>

                    {/* Item 3: Fit Garantizado */}
                    <div className="p-8 bg-[#FAF9F6] rounded-3xl border border-stone-100 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                            <RefreshCcw size={32} className="text-[#D1AB66]" />
                        </div>
                        <h3 className="font-bold text-xl mb-3">{t('components.trust_section.fit_title')}</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">
                            {t('components.trust_section.fit_desc')}
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}
