import { SeoHead } from './components/SeoHead';
import { HomeHero } from './components/home/HomeHero';
import { SiloBentoGrid } from './components/home/SiloBentoGrid';
import { BestSellersCarousel } from './components/home/BestSellersCarousel';
import { TrustSection } from './components/home/TrustSection';
// import { TrustBar } from './components/home/TrustBar';
// import { PainSolutionSlider } from './components/home/PainSolutionSlider';
// import { SizeQuizCTA } from './components/home/SizeQuizCTA';
// import { SeoAccordion } from './components/home/SeoAccordion';
// import { SocialProofCarousel } from './components/home/SocialProofCarousel';

export function HomePage() {
    return (
        <div className="animate-fade-in font-sans">
            {/* 1. SEO METADATA */}
            <SeoHead
                title="Fajas Colombianas Guitar Curves: #1 para BBL & Cintura Avispa"
                description="¿Cintura pequeña y cadera grande? Nuestras Fajas Colombianas eliminan el hueco en la espalda. Ideales para BBL, Lipo y Uso Diario. Envíos desde USA."
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Fajas Guitar Curves",
                    "url": "https://guitarcurves.com",
                    "logo": "https://guitarcurves.com/logo.png",
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+1-800-555-5555",
                        "contactType": "Customer Service",
                        "areaServed": "US",
                        "availableLanguage": "Spanish"
                    }
                }}
            />

            {/* 2. SECTION 1: HERO (Above the Fold) */}
            <HomeHero />

            {/* 3. SECTION 2: DISTRIBUIDOR DE TRÁFICO (Silo Architecture) */}
            <SiloBentoGrid />

            {/* 4. SECTION 3: LOS MANGOS BAJITOS (Best Sellers) */}
            <BestSellersCarousel />

            {/* 5. SECTION 4: EDUCACIÓN & CONFIANZA (E-E-A-T) */}
            <TrustSection />

        </div>
    );
}
