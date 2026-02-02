import { Truck, RefreshCw, ShieldCheck, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    return (
        <div className="flex items-center gap-12 mx-6 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase opacity-80">
            <span className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#D1AB66]" />
                {t('pages.home.marquee.shipping')}
            </span>
            <span className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#D1AB66]" />
                {t('pages.home.marquee.certified')}
            </span>
            <span className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-[#D1AB66]" />
                {t('pages.home.marquee.returns')}
            </span>
            <span className="flex items-center gap-3">
                <span className="text-lg">🇨🇴</span>
                {t('pages.home.marquee.design')}
            </span>
            <span className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-[#D1AB66]" />
                {t('pages.home.marquee.payment')}
            </span>
            {/* Divider */}
            <span className="text-[#D1AB66]">•</span>
        </div>
    );
}
