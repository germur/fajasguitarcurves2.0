import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { BentoGrid } from './components/home/BentoGrid';
import { BestSellersCarousel } from './components/home/BestSellersCarousel';
import { SocialProofCarousel } from './components/home/SocialProofCarousel';
import { SizingKiller } from './components/home/SizingKiller';
import { VisualizerSlider } from '../sections/guitar-curves/components/VisualizerSlider'; // Reuse existing component

// Using direct URLs for stability in demo
const HERO_VIDEO_MOCK = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"; // Placeholder for video

export function HomePage() {
    return (
        <div className="animate-fade-in">
            {/* 1. Hero Section (Golden Sculpt) */}
            <div className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0">
                    <video
                        src="https://videos.pexels.com/video-files/4440847/4440847-hd_1920_1080_30fps.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={HERO_VIDEO_MOCK}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420] via-transparent to-transparent opacity-90"></div>
                </div>

                <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center text-[#F5EDDF]">
                    <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <span className="inline-block px-3 py-1 border border-[#F5EDDF]/30 rounded-full text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md">
                            Engineered for Curves
                        </span>
                    </div>

                    <h1 className="font-serif text-5xl md:text-8xl font-bold mb-6 max-w-4xl leading-[0.9] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        Stop Sizing Up <br />
                        <span className="text-[#B49286] italic">For Your Hips.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-xl font-light leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        The first medical-grade faja engineered for the 0.7 waist-to-hip ratio. No waist gaps. No flattened glutes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                        <Link
                            to="/store/guitar-curves"
                            className="bg-[#D1AB66] text-[#2C2420] px-8 py-5 rounded-full font-bold text-sm tracking-widest hover:bg-[#c49a50] transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl shadow-[#D1AB66]/20"
                        >
                            SHOP GUITAR FIT <ArrowRight size={16} />
                        </Link>
                        <Link
                            to="/store/solutions"
                            className="bg-transparent border border-white/30 text-white px-8 py-5 rounded-full font-bold text-sm tracking-widest hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-sm"
                        >
                            FIND YOUR STAGE
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                        <div className="flex text-[#D1AB66]">
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                        </div>
                        <span className="text-sm font-medium text-stone-300 border-l border-white/20 pl-3 ml-1">
                            Doctor Recommended | 10,000+ Snatched Dolls
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. Bento Grid (Silos) */}
            <BentoGrid />

            {/* 3. The "Guitar Tech" Visualizer (Reused Component) */}
            <section className="bg-white">
                <VisualizerSlider />
            </section>

            {/* 4. Best Sellers (Viral Favorites) */}
            <BestSellersCarousel />

            {/* 5. Sizing Anxiety Killer */}
            {/* 5. Sizing Anxiety Killer */}
            <SizingKiller />

            {/* 6. Social Proof */}
            <SocialProofCarousel />

        </div>
    );
}
