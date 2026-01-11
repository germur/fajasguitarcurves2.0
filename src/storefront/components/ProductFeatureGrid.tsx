import { Droplets, Clock, Zap, Hourglass } from 'lucide-react';

export function ProductFeatureGrid() {
    const features = [
        {
            icon: <Hourglass size={20} />,
            title: "Corte Guitarra™",
            desc: "Cintura XS + Cadera XL"
        },
        {
            icon: <Droplets size={20} />,
            title: "Vitamina E",
            desc: "Nutre tu piel"
        },
        {
            icon: <Zap size={20} />,
            title: "Powernet",
            desc: "Compresión Inteligente"
        },
        {
            icon: <Clock size={20} />,
            title: "Uso 24/7",
            desc: "Ultra Confort"
        }
    ];

    return (
        <div className="py-2 space-y-6">

            {/* 1. VISUAL GRID */}
            <div className="grid grid-cols-2 gap-3">
                {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9F6] border border-transparent hover:border-[#D4AF37]/50 transition-all duration-300 group">
                        <div className="text-[#D4AF37] bg-white p-2 rounded-full shadow-sm group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                            {feature.icon}
                        </div>
                        <div>
                            <h4 className="font-bold text-xs text-[#2C2420]">{feature.title}</h4>
                            <p className="text-[10px] text-stone-500 leading-tight mt-0.5">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. COMPRESSION METER */}
            <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-3 text-stone-400">
                    <span>Suave</span>
                    <span className="text-[#2C2420]">Alta Compresión</span>
                    <span>Extrema</span>
                </div>
                <div className="relative h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    {/* Background segments for visual separation */}
                    <div className="absolute inset-0 flex">
                        <div className="w-1/5 border-r border-white/50"></div>
                        <div className="w-1/5 border-r border-white/50"></div>
                        <div className="w-1/5 border-r border-white/50"></div>
                        <div className="w-1/5 border-r border-white/50"></div>
                    </div>
                    {/* Active Bar (85% for High Compression) */}
                    <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B89225] w-[85%] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)] animate-pulse-slow"></div>
                </div>
                <p className="text-[10px] text-stone-500 mt-2 text-center italic">
                    "Firme pero flexible. Ideal para Stage 2."
                </p>
            </div>

        </div>
    );
}
