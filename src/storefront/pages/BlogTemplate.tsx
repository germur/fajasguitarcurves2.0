import { GlassNavbar } from '../components/GlassNavbar';
import { Clock, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

export default function BlogTemplate() {
    const { t } = useTranslation();

    const renderTips = () => {
        const tips = t('pages.blog.template.tips', { returnObjects: true }) as Array<{ title: string, desc: string }>;
        return tips.map((tip, index) => (
            <div key={index} className="mb-8">
                <h3 className="mt-8">{tip.title}</h3>
                <p>
                    <Trans defaults={tip.desc} components={{ strong: <strong /> }} />
                </p>
            </div>
        ));
    };

    return (
        <div className="font-sans text-[#3E322C] bg-white">
            <GlassNavbar />

            <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* COLUMNA IZQUIERDA: CONTENIDO (70%) */}
                <article className="lg:col-span-2">
                    {/* Header del Artículo */}
                    <header className="mb-10 text-center lg:text-left">
                        <span className="bg-stone-100 text-stone-500 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                            {t('pages.blog.template.badge')}
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl mt-6 mb-6 leading-tight text-[#3E322C]">
                            {t('pages.blog.template.title')}
                        </h1>
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-stone-400 font-medium">
                            <span>{t('pages.blog.template.author')}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> {t('pages.blog.template.read_time')}</span>
                        </div>
                    </header>

                    <img
                        src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2694&auto=format&fit=crop"
                        alt="Recovery Massage"
                        className="w-full h-96 object-cover rounded-2xl mb-12 shadow-md"
                    />

                    {/* Cuerpo del Texto */}
                    <div className="prose prose-lg prose-headings:font-serif prose-headings:text-[#3E322C] prose-p:text-stone-600 prose-a:text-[#D4AF37] max-w-none">
                        <p className="lead text-xl text-stone-800 font-medium leading-relaxed">
                            {t('pages.blog.template.intro')}
                        </p>

                        {renderTips()}

                        <blockquote className="border-l-4 border-[#D4AF37] pl-6 italic text-stone-500 my-8 bg-stone-50 py-4 pr-4 rounded-r-lg">
                            {t('pages.blog.template.quote')}
                        </blockquote>

                    </div>
                </article>

                {/* COLUMNA DERECHA: SIDEBAR STICKY (30%) */}
                <aside className="hidden lg:block">
                    <div className="sticky top-32 space-y-8">

                        {/* Widget: Fit Finder (Captación) */}
                        <div className="bg-[#3E322C] text-white p-8 rounded-2xl text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                            <Calculator size={32} className="mx-auto text-[#D4AF37] mb-4" />
                            <h3 className="font-serif text-2xl mb-3">{t('pages.blog.template.sidebar.calc_title')}</h3>
                            <p className="text-sm text-gray-300 mb-6 leading-relaxed">{t('pages.blog.template.sidebar.calc_desc')}</p>
                            <Link to="/calculadora-de-tallas" className="block bg-white text-[#3E322C] py-3.5 rounded-xl font-bold text-xs tracking-[0.2em] hover:bg-[#D4AF37] transition-all hover:-translate-y-1 shadow-lg">
                                {t('pages.blog.template.sidebar.calc_cta')}
                            </Link>
                        </div>

                        {/* Widget: Top Sellers */}
                        <div className="border border-stone-200 rounded-2xl p-6 bg-white shadow-sm">
                            <h4 className="font-bold uppercase text-[10px] tracking-[0.2em] text-[#D4AF37] mb-6 pb-2 border-b border-stone-100">
                                {t('pages.blog.template.sidebar.rec_title')}
                            </h4>
                            <div className="space-y-6">
                                {/* Product 1 */}
                                <Link to="/products/hourglass-foundation" className="flex gap-4 items-center group">
                                    <div className="w-16 h-20 bg-stone-100 rounded-lg overflow-hidden">
                                        <img src="/api/placeholder/100/120" className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#3E322C] group-hover:text-[#D4AF37] transition-colors leading-tight mb-1">{t('pages.blog.template.sidebar.rec_product')}</p>
                                        <p className="text-xs text-stone-500">$109.00</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                </aside>

            </div>

        </div>
    );
}
