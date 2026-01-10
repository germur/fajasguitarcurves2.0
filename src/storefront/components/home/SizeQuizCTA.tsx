import { Ruler, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SizeQuizCTA() {
    return (
        <section className="py-20 bg-[#2C2420] text-[#F5EDDF] relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

                <div className="w-16 h-16 bg-[#D1AB66] rounded-full flex items-center justify-center text-[#2C2420] mx-auto mb-6 animate-pulse">
                    <Ruler size={32} />
                </div>

                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
                    Stop Guessing Your Size.
                </h2>
                <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto">
                    Sizes S, M, L don't mean anything here. We size by <strong>Hip & Waist Radius</strong>.
                    Take our 30-second quiz to find your medical-grade fit.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/fit-finder"
                        className="bg-[#D1AB66] text-[#2C2420] px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                        Find My Size Now <ArrowRight size={20} />
                    </Link>
                    <Link
                        to="/about"
                        className="bg-transparent border border-[#F5EDDF]/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
                    >
                        How We Measure
                    </Link>
                </div>

                <p className="mt-6 text-sm opacity-60">
                    98% Fit Accuracy • Free Exchanges
                </p>

            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D1AB66] rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A35944] rounded-full blur-[80px]"></div>
            </div>
        </section>
    );
}
