import { Truck, RefreshCw, ShieldCheck, CreditCard } from 'lucide-react';

export function InfiniteMarquee() {
    return (
        <div className="bg-black text-white py-3 overflow-hidden border-y border-white/10 relative z-20">
            <div className="flex animate-marquee whitespace-nowrap">
                <MarqueeContent />
                <MarqueeContent /> {/* Duplicate for seamless loop */}
                <MarqueeContent /> {/* Triplicate for safety on wide screens */}
            </div>
        </div>
    );
}

function MarqueeContent() {
    return (
        <div className="flex items-center gap-12 mx-6 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase opacity-80">
            <span className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#D1AB66]" />
                Envíos Gratis USA 🇺🇸
            </span>
            <span className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#D1AB66]" />
                Certified Stage 2
            </span>
            <span className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-[#D1AB66]" />
                Cambios sin Estrés
            </span>
            <span className="flex items-center gap-3">
                <span className="text-lg">🇨🇴</span>
                Diseño Colombiano
            </span>
            <span className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-[#D1AB66]" />
                Pago en 4 cuotas
            </span>
            {/* Divider */}
            <span className="text-[#D1AB66]">•</span>
        </div>
    );
}
