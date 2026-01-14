import { Shield, Truck, RefreshCcw, HeartHandshake } from 'lucide-react';

export function TrustBanner() {
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
                            <h3 className="font-serif font-bold text-lg text-[#2C2420] mb-1">Medical Grade</h3>
                            <p className="text-sm text-stone-500">Certified compression for post-op safety.</p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-sm border border-stone-100/50 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#F5EDDF] text-[#D4AF37] rounded-full flex items-center justify-center">
                            <Truck size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-lg text-[#2C2420] mb-1">Fast Shipping</h3>
                            <p className="text-sm text-stone-500">Worldwide delivery via DHL & FedEx.</p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-sm border border-stone-100/50 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#F5EDDF] text-[#D4AF37] rounded-full flex items-center justify-center">
                            <RefreshCcw size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-lg text-[#2C2420] mb-1">Perfect Fit</h3>
                            <p className="text-sm text-stone-500">Free exchanges if the size isn't perfect.</p>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-sm border border-stone-100/50 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#F5EDDF] text-[#D4AF37] rounded-full flex items-center justify-center">
                            <HeartHandshake size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-lg text-[#2C2420] mb-1">Expert Support</h3>
                            <p className="text-sm text-stone-500">Free sizing advice from our specialists.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
