import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FibrosisBible() {
    const { t } = useTranslation();

    return (
        <article className="max-w-3xl mx-auto px-6 py-20 font-sans text-stone-800">
            <header className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 bg-[#F5EDDF] text-[#A35944] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    <Shield size={14} />
                    {t('pages.blog.fibrosis.badge')}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-[#2C2420] mb-6 leading-tight">
                    {t('pages.blog.fibrosis.title')}
                </h1>
                <p className="text-xl text-stone-500 font-light max-w-2xl mx-auto">
                    {t('pages.blog.fibrosis.description')}
                </p>
            </header>

            <div className="prose prose-stone prose-lg mx-auto">
                <p>
                    {t('pages.blog.fibrosis.content.p1')}
                </p>
                <p>
                    {t('pages.blog.fibrosis.content.p2_prefix')} <span className="font-bold text-[#2C2420]">{t('pages.blog.fibrosis.content.p2_bold')}</span> {t('pages.blog.fibrosis.content.p2_suffix')}
                </p>

                {/* INTERNAL LINK - SEO CLUSTER STRATEGY */}
                <div className="my-10 p-8 bg-[#FAF9F6] border-l-4 border-[#D4AF37] rounded-r-xl">
                    <h3 className="font-serif text-2xl text-[#2C2420] mb-3">{t('pages.blog.fibrosis.content.solution.title')}</h3>
                    <p className="mb-6 text-stone-600">
                        {t('pages.blog.fibrosis.content.solution.desc')}
                    </p>
                    <Link
                        to="/colecciones/recuperacion?tag=Etapa+2"
                        className="inline-flex items-center gap-2 bg-[#2C2420] text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-[#D4AF37] transition-colors"
                    >
                        {t('pages.blog.fibrosis.content.solution.cta')}
                    </Link>
                </div>

                <p>
                    {t('pages.blog.fibrosis.content.p3')}
                </p>
            </div>
        </article>
    );
}
