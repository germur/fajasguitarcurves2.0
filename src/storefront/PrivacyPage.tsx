import { PolicyLayout } from './components/PolicyLayout';
import { SeoHead } from './components/SeoHead';
import { useTranslation } from 'react-i18next';

export function PrivacyPage() {
    const { t } = useTranslation();
    return (
        <>
            <SeoHead
                title={t('pages.privacy.seo.title')}
                description={t('pages.privacy.seo.description')}
            />
            <PolicyLayout title={t('pages.privacy.title')} lastUpdated="1 de Enero, 2026">

                <p className="lead">
                    {t('pages.privacy.intro')}
                </p>

                <h3>{t('pages.privacy.personalization_title')}</h3>
                <p className="bg-[#F5EDDF] p-6 rounded-lg border border-[#D1AB66]/30" dangerouslySetInnerHTML={{ __html: t('pages.privacy.personalization_desc') }} />

                <h3>{t('pages.privacy.collection_title')}</h3>
                <p>{t('pages.privacy.collection_desc')}</p>

                <h3>{t('pages.privacy.cookies_title')}</h3>
                <p>{t('pages.privacy.cookies_desc')}</p>

                <h3>{t('pages.privacy.security_title')}</h3>
                <p>{t('pages.privacy.security_desc')}</p>

                <h3>{t('pages.privacy.rights_title')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('pages.privacy.rights_desc') }} />

            </PolicyLayout>
        </>
    );
}
