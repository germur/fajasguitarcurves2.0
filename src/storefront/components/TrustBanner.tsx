import { Shield, Truck, RefreshCcw, HeartHandshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function TrustBanner() {
    const { t } = useTranslation();

    return (
        <div className="py-16 bg-stone-50 border-t border-stone-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Item 1 */}
                    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-sm border border-stone-100/50 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#F5EDDF] text-[#D4AF37] rounded-full flex items-center justify-center">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-lg text-[#2C2420] mb-1">{t('components.trust_banner.medical_grade')}</h3>
                            <p className="text-sm text-stone-500">{t('components.trust_banner.medical_grade_desc')}</p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-sm border border-stone-100/50 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#F5EDDF] text-[#D4AF37] rounded-full flex items-center justify-center">
                            <Truck size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-lg text-[#2C2420] mb-1">{t('components.trust_banner.fast_shipping')}</h3>
                            <p className="text-sm text-stone-500">{t('components.trust_banner.fast_shipping_desc')}</p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-sm border border-stone-100/50 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#F5EDDF] text-[#D4AF37] rounded-full flex items-center justify-center">
                            <RefreshCcw size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-lg text-[#2C2420] mb-1">{t('components.trust_banner.perfect_fit')}</h3>
                            <p className="text-sm text-stone-500">{t('components.trust_banner.perfect_fit_desc')}</p>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-sm border border-stone-100/50 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#F5EDDF] text-[#D4AF37] rounded-full flex items-center justify-center">
                            <HeartHandshake size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-lg text-[#2C2420] mb-1">{t('components.trust_banner.expert_support')}</h3>
                            <p className="text-sm text-stone-500">{t('components.trust_banner.expert_support_desc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
