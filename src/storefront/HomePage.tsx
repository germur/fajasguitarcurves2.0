import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from './components/SeoHead';
import { HomeHero } from './components/home/HomeHero';

// Lazy Load Below-the-fold components
const SiloBentoGrid = lazy(() => import('./components/home/SiloBentoGrid').then(module => ({ default: module.SiloBentoGrid })));
const InfiniteMarquee = lazy(() => import('./components/home/InfiniteMarquee').then(module => ({ default: module.InfiniteMarquee })));
const BeforeAfterSlider = lazy(() => import('./components/home/BeforeAfterSlider').then(module => ({ default: module.BeforeAfterSlider })));
const SocialProofWall = lazy(() => import('./components/home/SocialProofWall').then(module => ({ default: module.SocialProofWall })));

export function HomePage() {
    return (
        <div className="animate-fade-in font-sans">
            {/* 1. SEO METADATA */}
            <SeoHead
                title="Fajas Colombianas Guitar Curves | Cintura de Avispa & Post-Op"
                description="La única faja con 'Guitar Cut' diseñada para BBL y Lipo. Ingeniería colombiana que moldea tu cintura sin aplanar tus caderas. Envíos desde USA."
                schema={{
                    type: 'organization',
                    data: {
                        name: "Fajas Guitar Curves",
                        url: "https://guitarcurves.com",
                        logo: "https://guitarcurves.com/logo.png",
                        contactPoint: {
                            "@type": "ContactPoint",
                            "telephone": "+1-800-555-5555",
                            "contactType": "Customer Service",
                            "areaServed": "US",
                            "availableLanguage": "Spanish"
                        }
                    }
                }}
            />

            {/* 2. SECTION 1: SEMANTIC HERO (Recover/Sculpt Router) */}
            <HomeHero />

            {/* 🚨 URGENCY TICKER (Recovery Calculator) */}
            <div className="bg-[#A35944] text-white py-3 overflow-hidden">
                <div className="container mx-auto px-4 flex items-center justify-center gap-4 animate-fade-in-up">
                    <span className="text-xl">🩺</span>
                    <p className="font-bold text-sm md:text-base tracking-wide uppercase">
                        ¿Te operaste recientemente?
                        <Link to="/tools/calculator" className="underline ml-2 hover:text-[#D4AF37] transition-colors">
                            Calcula tu faja ideal según tu día post-op aquí
                        </Link>
                    </p>
                </div>
            </div>

            <Suspense fallback={<div className="h-96 flex items-center justify-center text-[#D4AF37]">Cargando experiencia...</div>}>
                {/* 3. SECTION 2: TRUST BAR (Infinite Marquee) */}
                <InfiniteMarquee />

                {/* 4. SECTION 3: VISUAL NAVIGATION (Bento Grid) */}
                <SiloBentoGrid />

                {/* 5. SECTION 4: PROBLEM/SOLUTION (Interactive Slider) */}
                <BeforeAfterSlider />

                {/* 7. SECTION 6: SOCIAL PROOF (Wall of Curves) */}
                <SocialProofWall />
            </Suspense>

        </div>
    );
}
