import { PolicyLayout } from './components/PolicyLayout';
import { SeoHead } from './components/SeoHead';
import { useTranslation, Trans } from 'react-i18next';

export function ShippingPage() {
    const { t } = useTranslation();
    const schema = {
        "@context": "https://schema.org",
        "@type": "MerchantReturnPolicy",
        "mainEntity": {
            "@type": "Service",
            "name": "Fast Shipping from USA",
            "serviceType": "Logistics",
            "provider": {
                "@type": "Organization",
                "name": "Fajas Guitar Curves",
                "url": "https://fajasguitarcurves.com"
            },
            "areaServed": "US"
        }
    };

    return (
        <>
            <SeoHead
                title={t('pages.shipping.seo.title')}
                description={t('pages.shipping.seo.description')}
                schema={schema}
            />
            <PolicyLayout title={t('pages.shipping.title')} lastUpdated="1 de Enero, 2026">

                <p className="lead text-xl text-stone-600 mb-8">
                    {t('pages.shipping.lead')}
                </p>

                <div className="bg-[#FFF8F0] p-6 rounded-xl border-l-4 border-[#D1AB66] my-8">
                    <p className="font-bold text-[#A35944] m-0">
                        {t('pages.shipping.highlight')}
                    </p>
                </div>

                <h3>{t('pages.shipping.processing_title')}</h3>
                <p>
                    {t('pages.shipping.processing_desc')}
                </p>

                <h3>{t('pages.shipping.options_title')}</h3>
                <p>{t('pages.shipping.options_desc')}</p>

                <table className="w-full text-left border-collapse my-6">
                    <thead>
                        <tr className="border-b border-stone-300">
                            <th className="py-2">{t('pages.shipping.table.type')}</th>
                            <th className="py-2">{t('pages.shipping.table.time')}</th>
                            <th className="py-2">{t('pages.shipping.table.cost')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-stone-100">
                            <td className="py-3 font-bold">{t('pages.shipping.table.standard')}</td>
                            <td className="py-3">{t('pages.shipping.table.standard_time')}</td>
                            <td className="py-3 text-green-700 font-bold">{t('pages.shipping.table.free')}</td>
                        </tr>
                        <tr className="border-b border-stone-100">
                            <td className="py-3 text-stone-600">{t('pages.shipping.table.standard')}</td>
                            <td className="py-3 text-stone-600">{t('pages.shipping.table.standard_time')}</td>
                            <td className="py-3 text-stone-600">$9.99</td>
                        </tr>
                        <tr className="border-b border-stone-100">
                            <td className="py-3 font-bold text-[#2C2420]">{t('pages.shipping.table.express')}</td>
                            <td className="py-3">{t('pages.shipping.table.express_time')}</td>
                            <td className="py-3">$24.99</td>
                        </tr>
                    </tbody>
                </table>

                <h3>{t('pages.shipping.tracking_title')}</h3>
                <p>
                    {t('pages.shipping.tracking_desc')}
                </p>

                <h3>{t('pages.shipping.issues_title')}</h3>
                <p>
                    <Trans i18nKey="pages.shipping.issues_lost">
                        <strong>Paquetes Perdidos:</strong> Aunque es muy raro, si tu paquete aparece como "Entregado" pero no lo tienes, espera 24 horas (a veces los escanean antes). Si sigue sin aparecer, contáctanos.
                    </Trans>
                </p>
                <p>
                    <Trans i18nKey="pages.shipping.issues_address">
                        <strong>Dirección Incorrecta:</strong> No nos hacemos responsables por paquetes enviados a direcciones ingresadas incorrectamente por el cliente. Por favor verifica tu dirección dos veces antes de pagar.
                    </Trans>
                </p>

            </PolicyLayout>
        </>
    );
}
