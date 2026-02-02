import { PolicyLayout } from './components/PolicyLayout';
import { SeoHead } from './components/SeoHead';
import { useTranslation, Trans } from 'react-i18next';

export function ReturnsPage() {
    const { t } = useTranslation();
    const schema = {
        "@context": "https://schema.org",
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
    };

    return (
        <>
            <SeoHead
                title={t('pages.returns.seo.title')}
                description={t('pages.returns.seo.description')}
                schema={schema}
            />
            <PolicyLayout title={t('pages.returns.title')} lastUpdated="1 de Enero, 2026">

                <p className="lead text-xl text-stone-600 mb-8">
                    {t('pages.returns.lead')}
                </p>
                <p>
                    <Trans i18nKey="pages.returns.guarantee">
                        Por eso, en Guitar Curves, eliminamos el riesgo de tu compra con nuestra <strong>Garantía de Ajuste Perfecto</strong>.
                    </Trans>
                </p>

                <hr className="my-12 border-stone-200" />

                <h3 className="flex items-center gap-2">
                    <span className="text-2xl">✨</span> {t('pages.returns.promise_title')}
                </h3>
                <p>
                    {t('pages.returns.promise_desc')}
                </p>

                <div className="bg-[#FFF8F0] p-8 rounded-2xl border border-[#D1AB66]/30 my-10">
                    <h3 className="text-[#A35944] mt-0 flex items-center gap-2">
                        <span className="text-2xl">⚠️</span> {t('pages.returns.hygiene_title')}
                    </h3>
                    <p className="font-medium">
                        {t('pages.returns.hygiene_intro')}
                    </p>
                    <ol>
                        {(t('pages.returns.hygiene_list', { returnObjects: true }) as string[]).map((item, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                    </ol>
                    <p className="text-sm font-bold text-red-600 mt-4">
                        {t('pages.returns.hygiene_warning')}
                    </p>
                </div>

                <h3>{t('pages.returns.how_to_title')}</h3>
                <p>
                    <Trans i18nKey="pages.returns.how_to_desc">
                        Tienes <strong>30 días</strong> a partir de la fecha de entrega para iniciar tu proceso.
                    </Trans>
                </p>
                <ol>
                    {(t('pages.returns.how_to_steps', { returnObjects: true }) as string[]).map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ol>

                <h3>{t('pages.returns.non_returnable_title')}</h3>
                <p>{t('pages.returns.non_returnable_intro')}</p>
                <ul>
                    {(t('pages.returns.non_returnable_list', { returnObjects: true }) as string[]).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                <h3>{t('pages.returns.refund_title')}</h3>
                <p>{t('pages.returns.refund_intro')}</p>
                <ul>
                    {(t('pages.returns.refund_list', { returnObjects: true }) as string[]).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                <hr className="my-12 border-stone-200" />

                <div className="text-center bg-stone-50 p-8 rounded-2xl">
                    <h3 className="mt-0">{t('pages.returns.help_title')}</h3>
                    <p>
                        {t('pages.returns.help_desc')}
                    </p>
                    <a href="mailto:soporte@guitarcurves.com" className="inline-block bg-[#2C2420] text-[#F5EDDF] px-6 py-3 rounded-full no-underline hover:bg-[#D1AB66] transition-colors">
                        {t('pages.returns.help_btn')}
                    </a>
                </div>

            </PolicyLayout>
        </>
    );
}
