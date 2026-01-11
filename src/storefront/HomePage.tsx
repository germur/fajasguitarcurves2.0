import { SeoHead } from './components/SeoHead';
import { HomeHero } from './components/home/HomeHero';
import { SiloBentoGrid } from './components/home/SiloBentoGrid';
import { BestSellersCarousel } from './components/home/BestSellersCarousel';
import { InfiniteMarquee } from './components/home/InfiniteMarquee';
import { BeforeAfterSlider } from './components/home/BeforeAfterSlider';
import { ShopTheLook } from './components/home/ShopTheLook';
import { SocialProofWall } from './components/home/SocialProofWall';
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

            {/* 2. SECTION 1: SEMANTIC HERO (Recover/Sculpt Router) */}
            <HomeHero />

            {/* 3. SECTION 2: TRUST BAR (Infinite Marquee) */}
            <InfiniteMarquee />

            {/* 4. SECTION 3: VISUAL NAVIGATION (Bento Grid) */}
            <SiloBentoGrid />

            {/* 5. SECTION 4: PROBLEM/SOLUTION (Interactive Slider) */}
            <BeforeAfterSlider />


            {/* 6. SECTION 5: SHOP THE LOOK (Interactive Hotspots) */}
            <ShopTheLook />

            {/* 7. SECTION 6: SOCIAL PROOF (Wall of Curves) */}
            <SocialProofWall />

            {/* 8. SECTION 7: LOS MANGOS BAJITOS (Best Sellers) */}
            <BestSellersCarousel />

        </div>
    );
}
