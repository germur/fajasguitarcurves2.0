import ReturnsPolicy from '../components/policies/ReturnsPolicy';
import { SeoHead } from '../components/SeoHead';
import { useTranslation } from 'react-i18next';

export default function FitGuaranteePage() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-[#F9F8F6] pt-40 pb-20">
            <SeoHead
                title={t('pages.fit_guarantee.seo.title')}
                description={t('pages.fit_guarantee.seo.description')}
            />
            <ReturnsPolicy />
        </div>
    );
}
