
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SeoHead } from './components/SeoHead';

export function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center font-sans px-6">
            <SeoHead title="Page Not Found | Guitar Curves" description="The page you are looking for does not exist." />
            <div className="text-center max-w-lg">
                <span className="text-6xl mb-6 block">🤔</span>
                <h1 className="font-serif text-4xl font-bold text-[#2C2420] mb-4">
                    {t('pages.404.title', 'Página no encontrada')}
                </h1>
                <p className="text-stone-500 mb-8 text-lg">
                    {t('pages.404.desc', 'Lo sentimos, la página que buscas no existe o ha sido movida.')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="bg-[#2C2420] text-white px-8 py-3 rounded-full font-bold hover:bg-[#D1AB66] transition-colors"
                    >
                        {t('common.actions.back_home', 'Ir al Inicio')}
                    </Link>
                    <Link
                        to="/colecciones/todo"
                        className="bg-white border border-stone-200 text-[#2C2420] px-8 py-3 rounded-full font-bold hover:border-[#2C2420] transition-colors"
                    >
                        {t('common.actions.shop_all', 'Ver Productos')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
