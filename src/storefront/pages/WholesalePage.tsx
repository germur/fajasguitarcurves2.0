import { TrendingUp, ShieldCheck, Camera, Truck, Users } from 'lucide-react';
import { GlassNavbar } from '../components/GlassNavbar';
import { SeoHead } from '../components/SeoHead';
import { useTranslation } from 'react-i18next';

export default function WholesalePage() {
    const { t } = useTranslation();

    return (
        <div className="font-sans text-[#3E322C] bg-white">
            <SeoHead
                title={t('pages.wholesale.seo.title')}
                description={t('pages.wholesale.seo.description')}
            />
            <GlassNavbar />

            {/* 1. HERO SECTION */}
            <section className="relative bg-[#3E322C] text-white py-32 px-6 text-center overflow-hidden">
                {/* Patrón de fondo sutil */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]"></div>

                <div className="relative z-10 max-w-4xl mx-auto pt-10">
                    <span className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
                        {t('pages.wholesale.hero.badge')}
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
                        <div dangerouslySetInnerHTML={{ __html: t('pages.wholesale.hero.title') }} />
                    </h1>
                    <p className="text-xl text-stone-300 mb-10 max-w-2xl mx-auto font-light">
                        {t('pages.wholesale.hero.desc')}
                    </p>
                    <a href="#apply-form" className="inline-block bg-[#D4AF37] text-white px-10 py-4 rounded-xl font-bold tracking-widest hover:bg-white hover:text-[#3E322C] transition-all shadow-xl">
                        {t('pages.wholesale.hero.btn')}
                    </a>
                </div>
            </section>

            {/* 2. STATS & AUTHORITY */}
            <section className="bg-stone-50 py-12 border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <h3 className="text-4xl font-bold text-[#3E322C]">50+</h3>
                        <p className="text-xs uppercase tracking-widest text-stone-500 mt-2">{t('pages.wholesale.stats.clinics')}</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-[#3E322C]">100%</h3>
                        <p className="text-xs uppercase tracking-widest text-stone-500 mt-2">{t('pages.wholesale.stats.made_in')}</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-[#3E322C]">24h</h3>
                        <p className="text-xs uppercase tracking-widest text-stone-500 mt-2">{t('pages.wholesale.stats.dispatch')}</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-[#3E322C]">Low</h3>
                        <p className="text-xs uppercase tracking-widest text-stone-500 mt-2">{t('pages.wholesale.stats.minima')}</p>
                    </div>
                </div>
            </section>

            {/* 3. BENEFITS GRID */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-12">
                        <h2 className="font-serif text-4xl mb-6 text-[#3E322C]">{t('pages.wholesale.benefits.title')}</h2>

                        <div className="flex gap-6">
                            <div className="w-14 h-14 bg-[#F9F8F6] rounded-full flex items-center justify-center shrink-0 border border-[#D4AF37]/30 text-[#D4AF37]">
                                <ShieldCheck size={28} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-[#3E322C]">{t('pages.wholesale.benefits.quality_title')}</h4>
                                <p className="text-stone-600 mt-2 leading-relaxed">{t('pages.wholesale.benefits.quality_desc')}</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-14 h-14 bg-[#F9F8F6] rounded-full flex items-center justify-center shrink-0 border border-[#D4AF37]/30 text-[#D4AF37]">
                                <TrendingUp size={28} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-[#3E322C]">{t('pages.wholesale.benefits.profit_title')}</h4>
                                <p className="text-stone-600 mt-2 leading-relaxed">{t('pages.wholesale.benefits.profit_desc')}</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-14 h-14 bg-[#F9F8F6] rounded-full flex items-center justify-center shrink-0 border border-[#D4AF37]/30 text-[#D4AF37]">
                                <Camera size={28} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-[#3E322C]">{t('pages.wholesale.benefits.content_title')}</h4>
                                <p className="text-stone-600 mt-2 leading-relaxed">{t('pages.wholesale.benefits.content_desc')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-stone-200 h-[600px] rounded-2xl overflow-hidden shadow-2xl relative group">
                        {/* Placeholder para foto aspiracional de clínica */}
                        <img
                            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"
                            alt="Luxury Spa Interior"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl max-w-sm text-center">
                                <p className="text-white font-serif text-2xl italic">{t('pages.wholesale.testimonial.quote')}</p>
                                <p className="text-white/80 text-xs uppercase tracking-widest mt-4">Dr. Partners Network</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. APPLICATION FORM (Simple HTML for Shopify) */}
            <section id="apply-form" className="bg-[#F9F8F6] py-24 px-6">
                <div className="max-w-2xl mx-auto bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-stone-100">
                    <div className="text-center mb-10">
                        <Users className="mx-auto text-[#D4AF37] mb-4" size={40} />
                        <h2 className="font-serif text-4xl mb-4 text-[#3E322C]">{t('pages.wholesale.form.title')}</h2>
                        <p className="text-stone-500">{t('pages.wholesale.form.desc')}</p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-stone-600">{t('pages.wholesale.form.name_label')}</label>
                                <input type="text" className="w-full border border-stone-200 p-4 rounded-lg bg-stone-50 focus:bg-white focus:border-[#D4AF37] outline-none transition-all" placeholder="Tu Nombre Completo" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-stone-600">{t('pages.wholesale.form.business_label')}</label>
                                <input type="text" className="w-full border border-stone-200 p-4 rounded-lg bg-stone-50 focus:bg-white focus:border-[#D4AF37] outline-none transition-all" placeholder="Clínica / Spa / Boutique" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-stone-600">{t('pages.wholesale.form.type_label')}</label>
                            <div className="relative">
                                <select className="w-full border border-stone-200 p-4 rounded-lg bg-stone-50 focus:bg-white focus:border-[#D4AF37] outline-none transition-all appearance-none cursor-pointer">
                                    <option>Cirujano Plástico / Clínica</option>
                                    <option>Spa / Estética</option>
                                    <option>Boutique de Ropa</option>
                                    <option>Vendedor Independiente</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-stone-600">{t('pages.wholesale.form.social_label')}</label>
                            <input type="text" placeholder="@tu_usuario_instagram" className="w-full border border-stone-200 p-4 rounded-lg bg-stone-50 focus:bg-white focus:border-[#D4AF37] outline-none transition-all" />
                        </div>

                        <button type="submit" className="w-full bg-[#3E322C] text-white py-4 rounded-xl font-bold tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                            <Truck size={18} /> {t('pages.wholesale.form.submit_btn')}
                        </button>
                    </form>
                </div>
            </section>
        </div >
    );
}
