import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SeoHead } from './components/SeoHead';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

export function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF9F6] px-6 text-center">
            <SeoHead title={t('pages.404.seo_title')} />

            <div className="mb-8 font-serif text-9xl font-bold text-[#D1AB66] opacity-20 select-none">
                404
            </div>

            <h1 className="font-serif text-4xl font-bold text-[#2C2420] mb-4 -mt-20 relative z-10">
                <Trans i18nKey="pages.404.title" components={{ br: <br /> }} />
            </h1>

            <p className="text-stone-500 max-w-md mx-auto mb-8 text-lg">
                {t('pages.404.description')}
            </p>
            <Link
                to="/"
                className="flex items-center justify-center gap-2 bg-[#2C2420] text-white px-8 py-3 rounded-full font-bold hover:bg-[#D1AB66] hover:text-[#2C2420] transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> {t('pages.404.cta_shop')}
            </Link>
            <Link
                to="/tools/calculator"
                className="flex items-center justify-center gap-2 bg-stone-200 text-[#2C2420] px-8 py-3 rounded-full font-bold hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
                🩺 {t('pages.404.cta_calc')}
            </Link>
        </div>
    );
}
