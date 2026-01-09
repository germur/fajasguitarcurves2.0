import { Link } from 'react-router-dom';
import { ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export function SizingKiller() {
    return (
        <section className="bg-[#FAF9F6] py-24 border-t border-stone-200">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="font-serif text-4xl text-[#2C2420] mb-6">Confused about sizing?</h2>
                <p className="text-stone-500 mb-10 text-lg">Most brands force you to choose between your waist and your hips. We measure both using our proprietary Ratio Calculator.</p>

                <Link
                    to="/store/solutions"
                    className="inline-block bg-[#2C2420] text-[#F5EDDF] px-10 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-black transition-all shadow-xl"
                >
                    TAKE THE 30-SEC FIT QUIZ
                </Link>

                <div className="flex justify-center gap-12 mt-16 border-t border-stone-200 pt-12">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-[#B49286]">
                            <ArrowLeftRight size={20} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wide text-stone-600">Free Exchanges</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-[#B49286]">
                            <CheckCircle2 size={20} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wide text-stone-600">Fit Guarantee</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
