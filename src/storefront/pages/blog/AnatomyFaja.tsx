import { MaesPlaceholder } from '../../components/maes/MaesPlaceholder';
import { useTranslation } from 'react-i18next';

export default function AnatomyFaja() {
    const { t } = useTranslation();

    return (
        <MaesPlaceholder
            title={t('pages.blog.anatomy.title')}
            type="Article"
            objective={t('pages.blog.anatomy.objective')}
            tags={["Authority Cluster", "Interactive Image", "Education"]}
        />
    );
}
