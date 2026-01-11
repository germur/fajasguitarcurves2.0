import { RatioCalculatorModal } from './RatioCalculatorModal';

export function CollectionHero() {
    // Placeholder video 
    const VIDEO_URL = "https://videos.pexels.com/video-files/6989931/6989931-hd_1080_1920_25fps.mp4"; // Fashion/Curve video

    return (
        <div className="relative h-[80vh] w-full overflow-hidden">
            {/* Background Video */}
            {/* Background Image - Luxury/Shape Context */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1600&auto=format&fit=crop"
                    alt="Colección Guitar Curves"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420] via-[#2C2420]/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start text-[#F5EDDF]">
                <div className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <span className="inline-block px-3 py-1 border border-[#D1AB66] text-[#D1AB66] rounded-full text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md">
                        Colección Signature
                    </span>
                </div>

                <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 max-w-4xl leading-[0.9] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    La Curva <br />
                    <span className="text-[#D1AB66] italic">Guitarra.</span>
                </h1>

                <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-xl font-light leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    Ingeniería para el radio cintura-cadera de 0.7. La única faja diseñada para preservar tu proyección mientras define tu cintura.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    <RatioCalculatorModal />
                </div>
            </div>
        </div>
    );
}
