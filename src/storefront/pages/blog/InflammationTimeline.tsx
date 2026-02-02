import { MaesPlaceholder } from '../../components/maes/MaesPlaceholder';
import { useTranslation } from 'react-i18next';

export default function InflammationTimeline() {
    const { t } = useTranslation();

    return (
        <MaesPlaceholder
            title={t('pages.blog.inflammation.title')}
            type="Article"
            objective={t('pages.blog.inflammation.objective')}
            tags={["Authority Cluster", "Chart", "Data"]}
        />
    );
}
