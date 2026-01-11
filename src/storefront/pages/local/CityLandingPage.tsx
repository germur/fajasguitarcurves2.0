import { MaesPlaceholder } from '../../components/maes/MaesPlaceholder';
import { useParams } from 'react-router-dom';

export default function CityLandingPage() {
    const { city } = useParams<{ city: string }>();
    return (
        <MaesPlaceholder
            title={`Fajas Colombianas en ${city || 'tú Ciudad'}`}
            type="Local"
            objective="SEO Local ('near me')"
            tags={["Technical", "Programmatic SEO", "Local"]}
        />
    );
}
