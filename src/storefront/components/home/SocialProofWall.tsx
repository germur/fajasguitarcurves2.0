import { TikTokEmbed } from 'react-social-media-embed';

const TIKTOK_VIDEOS = [
    "https://www.tiktok.com/@guitarcurvesfajas/video/7575416353687915790",
    "https://www.tiktok.com/@guitarcurvesfajas/video/7118737786706005294",
    "https://www.tiktok.com/@guitarcurvesfajas/video/7582782758284545294"
];

export function SocialProofWall() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[#A35944] font-bold tracking-widest text-xs uppercase mb-4 block">
                        Resultados Reales
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#2C2420] font-bold mb-4">
                        Wall of Curves
                    </h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">
                        Únete a miles de mujeres mostrando sus resultados en TikTok.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TIKTOK_VIDEOS.map((url, i) => (
                        <div key={i} className="flex justify-center" style={{ minHeight: '580px' }}>
                            <TikTokEmbed url={url} width={325} />
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="https://www.tiktok.com/@fajasguitarcurves"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-[#2C2420] text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-stone-800 transition-all"
                    >
                        Ver más en TikTok
                    </a>
                </div>

            </div>
        </section>
    );
}
