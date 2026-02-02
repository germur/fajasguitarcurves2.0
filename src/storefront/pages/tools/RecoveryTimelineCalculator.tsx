import { MaesPlaceholder } from '../../components/maes/MaesPlaceholder';
import { useTranslation } from 'react-i18next';

export default function RecoveryTimelineCalculator() {
    const { t } = useTranslation();

    return (
        <MaesPlaceholder
            title={t('pages.recovery_calc.title')}
            type="Tool"
            objective={t('pages.recovery_calc.objective')}
            tags={["Money Page", "Lead Magnet", "Calculator"]}
        />
    );
}
