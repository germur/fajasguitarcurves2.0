import { CheckCircle2, Factory, BarChart3, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

export default function AboutPage() {
    const { t } = useTranslation();

    const renderFeatures = () => {
        const features = t('pages.about.solution.features', { returnObjects: true }) as Array<{ title: string, desc: string }>;
        const icons = [Factory, BarChart3, Users];

        return features.map((feature, index) => {
            const Icon = icons[index];
            return (
                <div key={index} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                    {index === 1 && (
                        <div className="absolute top-0 right-0 p-4 bg-[#D1AB66] text-[#2C2420] font-bold text-xs rounded-bl-2xl">PATENTADO</div>
                    )}
                    <div className="w-16 h-16 bg-[#2C2420] rounded-2xl flex items-center justify-center text-[#D1AB66] mb-6">
                        <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl text-[#2C2420] mb-4">{feature.title}</h3>
                    <p className="text-stone-500 leading-relaxed">
                        {feature.desc}
                    </p>
                </div>
            );
        });
    };

    return (
        <div className="bg-white min-h-screen font-sans pb-20">
            {/* Hero */}
            <div className="bg-[#2C2420] text-[#F5EDDF] py-24 px-6 text-center">
                <span className="inline-block px-3 py-1 bg-[#D1AB66] text-[#2C2420] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                    {t('pages.about.hero.badge')}
                </span>
                <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8">
                    <Trans i18nKey="pages.about.hero.title_line1" /> <br /> <Trans i18nKey="pages.about.hero.title_line2" />
                </h1>
                <p className="text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
                    {t('pages.about.hero.description')}
                </p>
            </div>

            {/* The Problem Section */}
            <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    <div className="absolute -inset-4 bg-red-50 rounded-3xl transform -rotate-2" />
                    <img
                        src="/assets/about-problem-gap.jpg"
                        alt="El Problema del Hueco en la Cintura"
                        className="relative rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-8 right-8 bg-red-600 text-white p-4 rounded-lg shadow-lg rotate-3">
                        <span className="block text-2xl font-bold">{t('pages.about.problem.box_title')}</span>
                        <span className="text-xs font-medium">{t('pages.about.problem.box_subtitle')}</span>
                    </div>
                </div>
                <div>
                    <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2 block">{t('pages.about.problem.badge')}</span>
                    <h2 className="font-serif text-4xl font-bold text-[#2C2420] mb-6">
                        {t('pages.about.problem.title')}
                    </h2>
                    <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                        {t('pages.about.problem.text')}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mt-8">
                        {(t('pages.about.problem.list', { returnObjects: true }) as string[]).map((item) => (
                            <div key={item} className="flex items-center gap-2 text-stone-500 font-medium line-through decoration-red-400 decoration-2">
                                <span className="w-2 h-2 bg-red-400 rounded-full" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* The Solution (Guitar Tech) */}
            <div className="bg-[#FAF9F6] py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-[#D1AB66] font-bold uppercase tracking-widest text-xs mb-2 block">{t('pages.about.solution.badge')}</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2420]">
                            {t('pages.about.solution.title')}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {renderFeatures()}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-[#2C2420] py-20 text-[#F5EDDF]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-5xl font-bold font-serif mb-2">10k+</div>
                        <div className="text-sm uppercase tracking-widest text-[#D1AB66]">{t('pages.about.stats.sculpted')}</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold font-serif mb-2">0</div>
                        <div className="text-sm uppercase tracking-widest text-[#D1AB66]">{t('pages.about.stats.chafing')}</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold font-serif mb-2">98%</div>
                        <div className="text-sm uppercase tracking-widest text-[#D1AB66]">{t('pages.about.stats.retention')}</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold font-serif mb-2">24/7</div>
                        <div className="text-sm uppercase tracking-widest text-[#D1AB66]">{t('pages.about.stats.support')}</div>
                    </div>
                </div>
            </div>

            <div className="text-center py-20 px-6">
                <CheckCircle2 className="w-12 h-12 text-[#D1AB66] mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-[#2C2420] mb-4 font-serif">{t('pages.about.footer.title')}</h2>
                <Link to="/colecciones/todo" className="inline-block bg-[#A35944] text-white px-8 py-4 rounded-full font-bold hover:bg-[#2C2420] transition-colors">
                    {t('pages.about.footer.cta')}
                </Link>
            </div>

        </div>
    );
}
