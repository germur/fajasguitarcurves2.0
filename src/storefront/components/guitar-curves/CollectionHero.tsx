import { RatioCalculatorModal } from './RatioCalculatorModal';

export function CollectionHero() {
    // Placeholder video 
    const VIDEO_URL = "https://videos.pexels.com/video-files/6989931/6989931-hd_1080_1920_25fps.mp4"; // Fashion/Curve video

    return (
        <div className="relative h-[80vh] w-full overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0">
                <video
                    src={VIDEO_URL}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420] via-transparent to-transparent opacity-90"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start text-[#F5EDDF]">
                <div className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <span className="inline-block px-3 py-1 border border-[#D1AB66] text-[#D1AB66] rounded-full text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md">
                        Signature Collection
                    </span>
                </div>

                <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 max-w-4xl leading-[0.9] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    The Guitar <br />
                    <span className="text-[#D1AB66] italic">Curve.</span>
                </h1>

                <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-xl font-light leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    Engineered for the 0.7 waist-to-hip ratio. The only faja designed to preserve your projection while snatching your waist.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    <RatioCalculatorModal />
                </div>
            </div>
        </div>
    );
}
