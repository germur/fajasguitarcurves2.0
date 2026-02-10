import { LocalizedLink as Link } from '../LocalizedLink';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function SkimsBentoGrid() {
    const { t } = useTranslation();

    // Shared card styles for consistency
    const cardBaseClass = "relative group overflow-hidden rounded-[2rem] aspect-[3/4] w-full";
    const imageClass = "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105";
    const overlayClass = "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent";

    return (
        <section className="bg-white py-12 pb-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                    {/* 1. CARD 1: Guía de Tallas */}
                    <Link to="/colecciones/moldeo-y-estetica" className={cardBaseClass}>
                        <img
                            src="/assets/skims-grid-front.jpg"
                            alt="Fajas Guitar Curves"
                            className={imageClass}
                        />
                        <div className={overlayClass} />

                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                                {t('pages.home.bento.card1_badge')}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">
                                {t('pages.home.bento.card1_title')}
                            </h3>
                            <button className="flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                                {t('pages.home.bento.card1_cta')} <ArrowUpRight size={16} />
                            </button>
                        </div>
                    </Link>

                    {/* 2. CARD 2: Fajas Stage 2 */}
                    <Link to="/colecciones/recuperacion-postquirurgica?tag=Stage+2" className={cardBaseClass}>
                        <img
                            src="/assets/skims-grid-back.jpg"
                            alt="Fajas Stage 2"
                            className={`${imageClass} object-[center_20%]`}
                        />
                        <div className={overlayClass} />

                        <div className="absolute top-6 right-6">
                            <span className="bg-[#A35944] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                {t('pages.home.bento.card2_badge')}
                            </span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">
                                {t('pages.home.bento.card2_title')}
                            </h3>
                            <p className="text-white/80 text-xs mb-3">{t('pages.home.bento.card2_desc')}</p>
                            <span className="flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                                {t('pages.home.bento.card2_cta')} <ArrowUpRight size={16} />
                            </span>
                        </div>
                    </Link>

                    {/* 3. CARD 3: Brasieres Post-Op */}
                    <Link to="/colecciones/brasieres-y-postura" className={cardBaseClass}>
                        <img
                            src="/assets/skims-grid-group.jpg"
                            alt="Brasieres Post-Op"
                            className={imageClass}
                        />
                        <div className={overlayClass} />

                        <div className="absolute bottom-6 left-6 right-6">
                            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">
                                {t('pages.home.bento.card3_title')}
                            </h3>
                            <p className="text-white/80 text-xs mb-3">{t('pages.home.bento.card3_desc')}</p>
                            <span className="flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                                {t('pages.home.bento.card3_cta')} <ArrowUpRight size={16} />
                            </span>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}
