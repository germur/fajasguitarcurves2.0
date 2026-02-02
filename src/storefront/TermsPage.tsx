import { PolicyLayout } from './components/PolicyLayout';
import { SeoHead } from './components/SeoHead';
import { useTranslation } from 'react-i18next';

export function TermsPage() {
    const { t } = useTranslation();
    return (
        <>
            <SeoHead
                title={t('pages.terms.seo.title')}
                description={t('pages.terms.seo.description')}
            />
            <PolicyLayout title={t('pages.terms.title')} lastUpdated="1 de Enero, 2026">

                <p>{t('pages.terms.intro')}</p>

                <div className="bg-red-50 p-6 rounded-lg border border-red-100 my-8">
                    <h3 className="text-red-800 mt-0 flex items-center gap-2">
                        {t('pages.terms.disclaimer_title')}
                    </h3>
                    <p className="text-red-900 font-medium" dangerouslySetInnerHTML={{ __html: t('pages.terms.disclaimer_desc') }} />
                    <p className="text-red-900">
                        {t('pages.terms.disclaimer_note')}
                    </p>
                </div>

                <h3>{t('pages.terms.ip_title')}</h3>
                <p>{t('pages.terms.ip_desc')}</p>

                <h3>{t('pages.terms.payments_title')}</h3>
                <p>{t('pages.terms.payments_desc')}</p>

                <h3>{t('pages.terms.accuracy_title')}</h3>
                <p>{t('pages.terms.accuracy_desc')}</p>

                <h3>{t('pages.terms.changes_title')}</h3>
                <p>{t('pages.terms.changes_desc')}</p>

            </PolicyLayout>
        </>
    );
}
