import { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PainSolutionSlider() {
    const { t } = useTranslation();
    // 50% split by default
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    // Image Mocks - Updated to more reliable URLs
    const BAD_IMAGE = "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=800&auto=format&fit=crop"; // Better mock for "Before"
    const GOOD_IMAGE = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop";   // Better mock for "After"

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        setSliderPosition((x / rect.width) * 100);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
        setSliderPosition((x / rect.width) * 100);
    };

    const problems = t('components.pain_solution_slider.problems', { returnObjects: true }) as string[];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-[#D1AB66] font-bold uppercase tracking-widest text-xs mb-2 block">{t('components.pain_solution_slider.badge')}</span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2420] mb-4">
                        {t('components.pain_solution_slider.title')}
                    </h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">
                        {t('components.pain_solution_slider.desc')}
                    </p>
                </div>

                {/* Interactive Slider */}
                <div
                    className="relative w-full max-w-5xl mx-auto aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden cursor-ew-resize shadow-2xl select-none"
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                    onMouseMove={handleMouseMove}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    onTouchMove={handleTouchMove}
                >
                    {/* RIGHT Image (The SOLUTION/Good) - Background Layer */}
                    <div className="absolute inset-0">
                        <img src={GOOD_IMAGE} alt="Guitar Curves Fit" className="w-full h-full object-cover object-center" />
                        <div className="absolute top-8 right-8 bg-[#D1AB66] text-[#2C2420] px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                            <CheckCircle2 size={18} /> {t('components.pain_solution_slider.guitar_fit')}
                        </div>
                    </div>

                    {/* LEFT Image (The PAIN/Bad) - Clipped Layer */}
                    <div
                        className="absolute inset-0 overflow-hidden border-r-4 border-white"
                        style={{ width: `${sliderPosition}%` }}
                    >
                        <img src={BAD_IMAGE} alt="Faja Genérica" className="w-full h-full object-cover object-center grayscale brightness-75" />
                        <div className="absolute top-8 left-8 bg-stone-800 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                            <XCircle size={18} className="text-red-500" /> {t('components.pain_solution_slider.generic_faja')}
                        </div>

                        {/* Pain Points Overlay (Only visible on Left side) */}
                        <div className="absolute bottom-10 left-10 text-white max-w-xs md:max-w-sm drop-shadow-lg hidden md:block">
                            <h3 className="font-bold text-2xl mb-2">{t('components.pain_solution_slider.problem_title')}</h3>
                            <ul className="space-y-1 text-sm opacity-90">
                                {problems.map((problem, i) => (
                                    <li key={i}>❌ {problem}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-transparent cursor-ew-resize flex items-center justify-center"
                        style={{ left: `calc(${sliderPosition}% - 2px)` }}
                    >
                        <div className="w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-[#2C2420] z-10 scale-110">
                            <ArrowLeftRight size={20} />
                        </div>
                    </div>

                    {/* Solution Overlay (Only visible when uncovered on Right side) */}
                    <div
                        className="absolute bottom-10 right-10 text-[#2C2420] max-w-xs md:max-w-sm bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl transition-opacity duration-300"
                        style={{ opacity: sliderPosition < 50 ? 1 : 0, pointerEvents: 'none' }}
                    >
                        <h3 className="font-bold text-xl mb-2 text-[#D1AB66]">{t('components.pain_solution_slider.solution_title')}</h3>
                        <p className="text-sm leading-relaxed">
                            {t('components.pain_solution_slider.solution_text_1')} <br />
                            {t('components.pain_solution_slider.solution_text_2')}
                            <strong> {t('components.pain_solution_slider.solution_emphasis')}</strong>
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}
