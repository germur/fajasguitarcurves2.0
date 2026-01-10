import { SeoHead } from './components/SeoHead';
import { HomeHero } from './components/home/HomeHero';
import { TrustBar } from './components/home/TrustBar';
import { PainSolutionSlider } from './components/home/PainSolutionSlider';
import { SiloBentoGrid } from './components/home/SiloBentoGrid';
import { BestSellersCarousel } from './components/home/BestSellersCarousel';
import { SizeQuizCTA } from './components/home/SizeQuizCTA';
import { SeoAccordion } from './components/home/SeoAccordion';
import { SocialProofCarousel } from './components/home/SocialProofCarousel'; // Reuse existing

export function HomePage() {
    return (
        <div className="animate-fade-in font-sans">
            {/* Schema for Organization */}
            <SeoHead
                title="Fajas Guitar Curves | Post-Surgery & Waist Training"
                description="Medical-grade fajas aligned with your recovery stage. Designed for the 0.7 waist-to-hip ratio. Doctor recommended in USA."
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Fajas Guitar Curves",
                    "url": "https://fajasguitarcurves.com",
                    "logo": "https://fajasguitarcurves.com/logo.png", // Mock
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+1-800-555-5555",
                        "contactType": "Customer Service"
                    }
                }}
            />

            {/* 1. HERO: The Promise (Video) */}
            <HomeHero />

            {/* 2. TRUST: Immediate Authority */}
            <TrustBar />

            {/* 3. PAIN/SOLUTION: The Gap vs Snatch Story */}
            <PainSolutionSlider />

            {/* 4. NAVIGATION: Access to Silos (Bento) */}
            <SiloBentoGrid />

            {/* 5. COMMERCE: Viral Favorites (Top Products) */}
            <BestSellersCarousel />

            {/* 6. CONVERSION TOOL: Fit Quiz */}
            <SizeQuizCTA />

            {/* 7. SOCIAL PROOF (Real Results) */}
            <SocialProofCarousel />

            {/* 8. SEO LEGACY: Collapsible Content */}
            <SeoAccordion />

        </div>
    );
}
