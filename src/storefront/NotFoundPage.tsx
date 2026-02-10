import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SeoHead } from './components/SeoHead';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function NotFoundPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // EMERGENY FAIL-SAFE: If this 404 is actually a lost checkout, redirect IMMEDIATELY
    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes('/cart/c/')) {
            // Extract parts manually to be safe
            // Format: /cart/c/<id> or /es/cart/c/<id>
            const parts = path.split('/cart/c/');
            if (parts.length > 1) {
                const cartId = parts[1].split('/')[0]; // Get ID before any trailing slash
                const searchParams = new URLSearchParams(window.location.search);
                const key = searchParams.get('key');

                if (cartId && key) {
                    const shopifyUrl = `https://92542c-b5.myshopify.com/cart/c/${cartId}?key=${key}&auto_redirect=false&edge_redirect=true&skip_shop_pay=true`;
                    window.location.replace(shopifyUrl);
                    return;
                }
            }
        }
    }, []);

    return (
        <div className="flex flex-col sm:flex-row gap-4">
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
        </div >
    );
}
