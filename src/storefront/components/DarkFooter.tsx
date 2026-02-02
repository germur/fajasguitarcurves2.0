
import { LocalizedLink as Link } from './LocalizedLink';
import { ArrowRight, Instagram, Globe, CreditCard, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function DarkFooter() {
    const { t } = useTranslation();
    const [isSeoOpen, setIsSeoOpen] = useState(false);

    return (
        <footer className="bg-[#1A1A1A] text-gray-400 py-20 font-sans border-t border-[#D4AF37]/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent [background-size:20px_20px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* MAIN GRID: 4 STRATEGIC COLUMNS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

                    {/* COL 1: THE BRAND (Trust Anchor) */}
                    <div className="space-y-8">
                        <div>
                            <img src="/assets/logo-guitar-curves-final.png" alt="Guitar Curves" className="h-12 w-auto object-contain brightness-0 invert opacity-90" />
                        </div>
                        <p className="text-xs leading-relaxed text-gray-400 font-medium tracking-wide max-w-xs">
                            {t('footer.description')}
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/fajasguitarrascurves/?igsh=bDJ6ZGx4YTgyNXV4#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                                <Instagram size={16} />
                            </a>
                            <a href="https://www.tiktok.com/@guitarcurvesfajas" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                                {/* Custom TikTok Icon (Lucide doesn't have it) */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* COL 2: SHOP (The Silos) */}
                    <div>
                        <h3 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px] text-[#A35944]">{t('footer.explore')}</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li>
                                <Link to="/nosotros" className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                                    {t('nav.our_story')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/colecciones/recuperacion-postquirurgica" className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                                    {t('collections.recovery')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/colecciones/moldeo-y-estetica" className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                                    {t('collections.sculpt')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/colecciones/brasieres-y-postura" className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                                    {t('collections.bras')}
                                </Link>
                            </li>
                            <li className="pt-2">
                                <Link to="/pages/bbl-recovery-kit" className="text-[#D4AF37] hover:underline underline-offset-4 decoration-[#D4AF37]">
                                    BBL Survival Kit ™
                                </Link>
                            </li>
                            <li>
                                <Link to="/instituto" className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                                    Instituto (Educación)
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* COL 3: SUPPORT (Help Center) */}
                    <div>
                        <h3 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px] text-[#A35944]">{t('footer.support')}</h3>
                        <ul className="space-y-4 text-sm font-medium">

                            <li>
                                <Link to="/devoluciones" className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                                    {t('footer.links.returns')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/calculadora-de-tallas" className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                                    {t('footer.links.fit_finder')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/pages/wholesale" className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                                    {t('footer.links.wholesale')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/contacto" className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                                    {t('footer.links.contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* COL 4: THE CLUB (Community) */}
                    <div>
                        <h3 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px] text-[#A35944]">{t('footer.join_club')}</h3>
                        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                            {t('footer.newsletter_desc')}
                        </p>
                        <form className="relative" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder={t('footer.email_placeholder')}
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                            />
                            <button type="submit" className="absolute right-2 top-2 p-1.5 bg-[#D4AF37] rounded text-[#3E322C] hover:bg-white transition-colors">
                                <ArrowRight size={16} />
                            </button>
                        </form>
                        <p className="text-[10px] text-gray-600 mt-3">{t('footer.no_spam')}</p>
                    </div>

                </div>

                {/* SEO ACCORDION (INVISIBLE) */}
                <div className="border-t border-gray-800 pt-8 mb-8 group">
                    <button
                        onClick={() => setIsSeoOpen(!isSeoOpen)}
                        className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest mb-4 hover:text-[#D4AF37] transition-colors w-full text-left"
                    >
                        {t('footer.seo_title')}
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isSeoOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isSeoOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-50'}`}>
                        <p className="text-xs text-gray-500 text-justify leading-relaxed max-w-4xl">
                            {t('footer.seo_text')}
                        </p>
                    </div>
                </div>

                {/* BOTTOM BAR: LEGAL & PAYMENT */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center text-[11px] text-gray-600 font-medium">
                        <span>{t('footer.rights')}</span>
                        <div className="flex gap-4">
                            <Link to="/privacidad" className="hover:text-gray-400 transition-colors">{t('footer.privacy')}</Link>
                            <Link to="/terminos" className="hover:text-gray-400 transition-colors">{t('footer.terms')}</Link>
                        </div>
                    </div>

                    <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simulated Payment Icons using Text/Divs for now, or could use generic CreditCard icon */}
                        <div className="flex gap-2 items-center text-white/40">
                            <CreditCard size={18} />
                            <span className="text-[10px] tracking-widest uppercase">{t('footer.secure_payment')}</span>
                        </div>
                        <div className="h-4 w-px bg-white/10 mx-2"></div>
                        <div className="flex gap-2 items-center text-white/40">
                            <Globe size={14} />
                            <span className="text-[10px] tracking-widest uppercase">COL / USA</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
