import GuitarFitFinder from './components/calculator/GuitarFitFinder';
import { SeoHead } from './components/SeoHead';
import { Star, ChevronDown, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function FitFinderPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-[#FAF9F6] pb-20">
            <SeoHead
                title={t('pages.fit_finder.seo.title')}
                description={t('pages.fit_finder.seo.description')}
                schema={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "GuitarFitFinder",
                    "applicationCategory": "LifestyleApplication",
                    "operatingSystem": "Web",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            />

            {/* 1. HERO SECTION: The Promise */}
            <header className="bg-[#2C2420] text-[#F5EDDF] pt-12 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src="/assets/atelier-workshop.png" className="w-full h-full object-cover" alt="Background" />
                </div>

                <div className="max-w-xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#D1AB66]/20 border border-[#D1AB66]/30 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-[#D1AB66] animate-pulse"></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#D1AB66]">{t('pages.fit_finder.hero.badge')}</span>
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 leading-tight">
                        {t('pages.fit_finder.hero.title_line1')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1AB66] to-[#F5EDDF]">{t('pages.fit_finder.hero.title_highlight')}</span> <br />
                        {t('pages.fit_finder.hero.title_line2')}
                    </h1>

                    <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-8">
                        {t('pages.fit_finder.hero.subtitle')}
                    </p>


                </div>
            </header>

            {/* 2. CALCULATOR MODULE (Overlapping Hero) */}
            <main className="-mt-16 px-4 relative z-20">
                <GuitarFitFinder />
            </main>

            {/* 3. SOCIAL PROOF */}
            <section className="max-w-md mx-auto px-6 mt-8 mb-16">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 relative">
                    <div className="flex gap-1 mb-3 text-[#D1AB66]">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-sm text-[#2C2420] leading-relaxed italic mb-4">
                        {t('pages.fit_finder.social_proof.quote')}
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center font-bold text-xs text-stone-500">MG</div>
                        <div>
                            <p className="text-xs font-bold text-[#2C2420]">{t('pages.fit_finder.social_proof.author')}</p>
                            <p className="text-[10px] text-stone-400 uppercase tracking-wider">{t('pages.fit_finder.social_proof.label')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. EDUCATIONAL ACCORDION */}
            <section className="max-w-md mx-auto px-6 mb-20">
                <FAQAccordion />
            </section>

            {/* Footer Note */}
            <div className="text-center text-stone-300 text-[10px] mt-8 px-6 max-w-lg mx-auto pb-10">
                <p>{t('pages.fit_finder.footer_note')}</p>
            </div>
        </div>
    );
}

function FAQAccordion() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <PlayCircle size={20} className="text-[#D1AB66]" />
                    <span className="font-bold text-sm text-[#2C2420]">{t('components.faq_accordion.title')}</span>
                </div>
                <ChevronDown size={20} className={`text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="p-5 border-t border-stone-100 bg-[#FAF9F6]">
                    <div className="aspect-video bg-stone-200 rounded-lg mb-4 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1544435216-7788c03531b7?q=80&w=400" className="w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold border border-white/30">{t('components.faq_accordion.video_cta')}</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm text-stone-600 font-bold">
                            {t('components.faq_accordion.intro')}
                        </p>
                        <div className="text-sm text-stone-500 bg-white p-3 rounded-lg border border-stone-100">
                            <strong>{t('components.faq_accordion.waist_label')}</strong> {t('components.faq_accordion.waist_text')} <em>{t('components.faq_accordion.waist_tip')}</em>
                        </div>
                        <div className="text-sm text-stone-500 bg-white p-3 rounded-lg border border-stone-100">
                            <strong>{t('components.faq_accordion.hip_label')}</strong> {t('components.faq_accordion.hip_text')}
                        </div>
                        <p className="text-xs text-stone-400 italic">
                            {t('components.faq_accordion.note')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
