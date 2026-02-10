
import { motion } from 'framer-motion';
import { LocalizedLink as Link } from '../components/LocalizedLink';
import { SeoHead } from '@/storefront/components/SeoHead';
import { useTranslation, Trans } from 'react-i18next';

export default function OurStoryPage() {
    const { t } = useTranslation();
    return (
        <div className="bg-[#FAF9F6] font-sans text-[#3E322C]">
            <SeoHead
                title={t('pages.our_story.seo.title')}
                description={t('pages.our_story.seo.description')}

                schema={{
                    type: 'article',
                    data: {
                        name: "Nuestra Historia - Guitar Curves",
                        description: "La historia de ingeniería textil detrás de Guitar Curves."
                    },
                    breadcrumbs: [
                        { name: 'Home', item: '/' },
                        { name: 'Nuestra Historia', item: '/pages/our-story' }
                    ]
                }}
            />

            {/* 1. HERO CINEMÁTICO */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                {/* Fallback to Image since video is not generated */}
                <div className="absolute inset-0 w-full h-full bg-[#1a1a1a]">
                    <img
                        src="/assets/sewing-detail.png"
                        alt="Sewing Detail"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>

                <div className="relative z-20 text-center text-white px-4">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="font-serif text-5xl md:text-7xl mb-4"
                    >
                        <Trans i18nKey="pages.our_story.hero.title">
                            La Ingeniería<br />Detrás de la Curva
                        </Trans>
                    </motion.h1>
                    <p className="text-xl font-light tracking-widest uppercase">{t('pages.our_story.hero.subtitle')}</p>
                </div>
            </section>

            {/* 2. THE FOUNDER (Split Layout) */}
            <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Video con marco desplazado estilo editorial */}
                    <div className="absolute inset-0 border-2 border-[#D4AF37] translate-x-4 translate-y-4"></div>
                    <video
                        src="/assets/nelly-video.mp4"
                        controls
                        preload="metadata"
                        playsInline
                        className="relative z-10 w-full h-auto shadow-xl object-cover"
                    />
                </motion.div>

                <div className="space-y-6">
                    <h2 className="font-serif text-4xl leading-tight">
                        <Trans i18nKey="pages.our_story.founder.quote">
                            "No diseñamos para maniquíes. <span className="italic text-[#D4AF37]">Diseñamos para mujeres reales.</span>"
                        </Trans>
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-600">
                        {t('pages.our_story.founder.p1')}
                    </p>
                    <p className="text-lg leading-relaxed text-gray-600">
                        {t('pages.our_story.founder.p2')}
                    </p>
                    <div className="pt-4">
                        <p className="font-serif text-2xl italic text-[#D4AF37]">{t('pages.our_story.founder.name')}</p>
                        <p className="text-xs uppercase tracking-widest text-gray-400">{t('pages.our_story.founder.role')}</p>
                    </div>
                </div>
            </section>

            {/* 3. THE "MADE IN COLOMBIA" BADGE */}
            <section className="bg-[#3E322C] text-white py-24">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <div className="flex justify-center mb-8">
                        <span className="text-6xl">🇨🇴</span>
                    </div>
                    <h3 className="font-serif text-3xl mb-6">{t('pages.our_story.badge.title')}</h3>
                    <p className="text-xl font-light leading-relaxed opacity-90">
                        {t('pages.our_story.badge.desc')}
                    </p>
                </div>
            </section>

            {/* 3.5 THE "GUITAR CUT" SECRET (Autoridad Técnica) */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl text-[#3E322C]">{t('pages.our_story.secret.title')}</h2>
                        <p className="text-gray-500 mt-4 max-w-3xl mx-auto leading-relaxed">
                            {t('pages.our_story.secret.desc')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-[#F2F2F2] rounded-full mx-auto flex items-center justify-center text-2xl">⏳</div>
                            <h4 className="font-bold text-xl">{t('pages.our_story.secret.fit_title')}</h4>
                            <p className="text-sm text-gray-500">{t('pages.our_story.secret.fit_desc')}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-[#F2F2F2] rounded-full mx-auto flex items-center justify-center text-2xl">🩺</div>
                            <h4 className="font-bold text-xl">{t('pages.our_story.secret.med_title')}</h4>
                            <p className="text-sm text-gray-500">{t('pages.our_story.secret.med_desc')}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-[#F2F2F2] rounded-full mx-auto flex items-center justify-center text-2xl">🌿</div>
                            <h4 className="font-bold text-xl">{t('pages.our_story.secret.skin_title')}</h4>
                            <p className="text-sm text-gray-500">{t('pages.our_story.secret.skin_desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. MANIFESTO (Valores) */}
            <section className="bg-[#2C2420] py-12 overflow-hidden whitespace-nowrap">
                <div className="animate-marquee inline-block">
                    <span className="text-4xl md:text-6xl font-bold text-white/10 uppercase mx-8">CONFIDENCE • RECOVERY • CURVES • POWER •</span>
                    <span className="text-4xl md:text-6xl font-bold text-white/10 uppercase mx-8">CONFIDENCE • RECOVERY • CURVES • POWER •</span>
                    <span className="text-4xl md:text-6xl font-bold text-white/10 uppercase mx-8">CONFIDENCE • RECOVERY • CURVES • POWER •</span>
                    <span className="text-4xl md:text-6xl font-bold text-white/10 uppercase mx-8">CONFIDENCE • RECOVERY • CURVES • POWER •</span>
                </div>
            </section>


            {/* 6. CTA FINAL */}
            <section className="py-24 bg-[#F9F8F6] text-center">
                <h2 className="font-serif text-4xl mb-6">{t('pages.our_story.cta.title')}</h2>
                <p className="text-xl text-gray-600 mb-8">{t('pages.our_story.cta.desc')}</p>
                <Link to="/fit-finder" className="inline-block bg-[#D4AF37] text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-[#B49286] transition-colors shadow-lg">
                    {t('pages.our_story.cta.button')}
                </Link>
            </section>

        </div>
    );
}
