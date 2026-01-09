import { CheckCircle2, Factory, BarChart3, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen font-sans pb-20">
            {/* Hero */}
            <div className="bg-[#2C2420] text-[#F5EDDF] py-24 px-6 text-center">
                <span className="inline-block px-3 py-1 bg-[#D1AB66] text-[#2C2420] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                    Our Manifesto
                </span>
                <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8">
                    The Engineering <br /> of Curves.
                </h1>
                <p className="text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
                    Why we stopped designing "shapewear" and started building surgical-grade body architecture.
                </p>
            </div>

            {/* The Problem Section */}
            <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    <div className="absolute -inset-4 bg-red-50 rounded-3xl transform -rotate-2" />
                    <img
                        src="https://images.unsplash.com/photo-1596451990171-85577f480351?q=80&w=800&auto=format&fit=crop"
                        alt="Generic Faja Problem"
                        className="relative rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500 grayscale hover:grayscale-0"
                    />
                    <div className="absolute top-8 right-8 bg-red-600 text-white p-4 rounded-lg shadow-lg rotate-3">
                        <span className="block text-2xl font-bold">The Gap.</span>
                        <span className="text-xs font-medium">Why 90% of fajas roll down.</span>
                    </div>
                </div>
                <div>
                    <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2 block">The Industry Flaw</span>
                    <h2 className="font-serif text-4xl font-bold text-[#2C2420] mb-6">
                        Designed for Cylinders, <br /> Not Hourglasses.
                    </h2>
                    <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                        Standard manufacturing relies on "The Tube Method". It's cheaper to sew a straight tube of elastic fabric.
                        But your body isn't a tube. When a curvy woman puts on a tube, physics fights back.
                        The fabric rolls down at the waist and cuts into the hips. It's not you. It's the geometry.
                    </p>

                    <div className="grid grid-cols-2 gap-6 mt-8">
                        {['Waist Gap', 'Rolling Down', 'Hip Dips', 'Friction Burns'].map((item) => (
                            <div key={item} className="flex items-center gap-2 text-stone-500 font-medium line-through decoration-red-400 decoration-2">
                                <span className="w-2 h-2 bg-red-400 rounded-full" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* The Solution (Guitar Tech) */}
            <div className="bg-[#FAF9F6] py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-[#D1AB66] font-bold uppercase tracking-widest text-xs mb-2 block">Our Innovation</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2420]">
                            Guitar Tech™ Architecture
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-[#2C2420] rounded-2xl flex items-center justify-center text-[#D1AB66] mb-6">
                                <Factory className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl text-[#2C2420] mb-4">Golden Ratio Sizing</h3>
                            <p className="text-stone-500 leading-relaxed">
                                We added the "Ratio" variable. We calculate the difference between waist and hip radius, creating a garment that is 14 inches usually, smaller at the waist than the hips.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 bg-[#D1AB66] text-[#2C2420] font-bold text-xs rounded-bl-2xl">PATENTED</div>
                            <div className="w-16 h-16 bg-[#2C2420] rounded-2xl flex items-center justify-center text-[#D1AB66] mb-6">
                                <BarChart3 className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl text-[#2C2420] mb-4">Comfort-First Zones</h3>
                            <p className="text-stone-500 leading-relaxed">
                                High compression where you need snatching (Red Zone). Zero compression where you need volume (Green Zone).
                                No more flattened BBLs.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-[#2C2420] rounded-2xl flex items-center justify-center text-[#D1AB66] mb-6">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl text-[#2C2420] mb-4">Community Tested</h3>
                            <p className="text-stone-500 leading-relaxed">
                                Every prototype is tested not on mannequins, but on real post-op patients in various stages of recovery.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-[#2C2420] py-20 text-[#F5EDDF]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-5xl font-bold font-serif mb-2">10k+</div>
                        <div className="text-sm uppercase tracking-widest text-[#D1AB66]">Snatched Waists</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold font-serif mb-2">0</div>
                        <div className="text-sm uppercase tracking-widest text-[#D1AB66]">Faja Burns</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold font-serif mb-2">98%</div>
                        <div className="text-sm uppercase tracking-widest text-[#D1AB66]">Retention Rate</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold font-serif mb-2">24/7</div>
                        <div className="text-sm uppercase tracking-widest text-[#D1AB66]">Support Access</div>
                    </div>
                </div>
            </div>

            <div className="text-center py-20 px-6">
                <CheckCircle2 className="w-12 h-12 text-[#D1AB66] mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-[#2C2420] mb-4 font-serif">Ready to feel the difference?</h2>
                <button className="bg-[#A35944] text-white px-8 py-4 rounded-full font-bold hover:bg-[#2C2420] transition-colors">
                    SHOP THE SIGNATURE COLLECTION
                </button>
            </div>

        </div>
    );
}
