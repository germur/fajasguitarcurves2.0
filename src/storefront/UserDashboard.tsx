import { useNavigate } from 'react-router-dom';
import { useStore } from './hooks/useStoreContext';
import { Ruler, Activity, ShoppingBag, LogOut, Edit2, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';

export function UserDashboard() {
    const { user, logout } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/store');
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#FAF9F6] pt-12 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="font-serif text-3xl md:text-4xl text-[#2C2420] font-bold">
                            Hello, {user.name}
                        </h1>
                        <p className="text-stone-500 mt-1">
                            Your silhouette is currently: <strong className="text-[#B49286]">Guitar Shape</strong>
                        </p>
                    </div>
                    <button
                        onClick={() => { logout(); navigate('/store'); }}
                        className="flex items-center text-sm font-bold text-stone-500 hover:text-red-500 transition-colors"
                    >
                        <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Measurements Card */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Fit Profile */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-6 w-full">
                                <div className="flex justify-between items-center">
                                    <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-[#2C2420]">
                                        <Ruler className="w-5 h-5 text-[#B49286]" />
                                        Fit Profile
                                    </h2>
                                    <button className="text-xs font-bold text-[#B49286] flex items-center hover:underline">
                                        <Edit2 className="w-3 h-3 mr-1" /> Edit
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-[#FAF9F6] p-4 rounded-xl text-center">
                                        <span className="block text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">Waist</span>
                                        <span className="text-2xl font-serif font-bold text-[#2C2420]">{user.measurements?.waist}"</span>
                                    </div>
                                    <div className="bg-[#FAF9F6] p-4 rounded-xl text-center">
                                        <span className="block text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">Hips</span>
                                        <span className="text-2xl font-serif font-bold text-[#2C2420]">{user.measurements?.hips}"</span>
                                    </div>
                                    <div className="bg-[#FAF9F6] p-4 rounded-xl text-center">
                                        <span className="block text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">Torso</span>
                                        <span className="text-xl font-serif font-bold text-[#2C2420]">{user.measurements?.torso}</span>
                                    </div>
                                </div>

                                <div className="bg-[#B49286]/10 border border-[#B49286]/20 p-4 rounded-xl">
                                    <p className="text-[#A35944] text-sm font-medium flex items-start gap-2">
                                        <TrendingUp className="w-4 h-4 shrink-0 mt-0.5" />
                                        <span>
                                            Based on your measurements, your ideal size for <strong className="font-bold">Stage 2</strong> is <strong className="font-bold underline">Medium (M)</strong>.
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Visual Avatar Placeholder */}
                            <div className="w-32 h-48 bg-stone-100 rounded-full flex items-center justify-center relative overflow-hidden border-4 border-white shadow-lg shrink-0">
                                <div className="absolute inset-0 bg-[#A35944]/10"></div>
                                <span className="text-4xl">🧘‍♀️</span>
                            </div>
                        </div>

                        {/* Order History */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
                            <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-[#2C2420] mb-6">
                                <ShoppingBag className="w-5 h-5 text-[#B49286]" />
                                Recent Orders
                            </h2>
                            <div className="space-y-4">
                                {/* Order 1 */}
                                <div className="flex items-center justify-between p-4 border border-stone-100 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-stone-200 rounded-lg overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=200" alt="Product" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#2C2420]">Medical Grade Compression</h4>
                                            <p className="text-xs text-stone-500">Order #GC-8832 • Aug 14</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded mb-1">Delivered</span>
                                        <p className="text-sm font-bold">$145.00</p>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-4 text-center text-xs font-bold text-stone-400 hover:text-[#B49286] uppercase tracking-wide">
                                View All Orders
                            </button>
                        </div>
                    </div>

                    {/* Sidebar / Recovery */}
                    <div className="space-y-8">
                        {/* Recovery Tracker */}
                        <div className="bg-[#2C2420] text-[#F5EDDF] rounded-2xl p-8 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-[#A35944] rounded-full filter blur-3xl opacity-20 transform translate-x-10 -translate-y-10"></div>

                            <h2 className="flex items-center gap-2 font-serif text-xl font-bold mb-6 relative z-10">
                                <Activity className="w-5 h-5 text-[#B49286]" />
                                Recovery Status
                            </h2>

                            <div className="mb-6 relative z-10">
                                <div className="flex justify-between text-xs uppercase tracking-widest font-bold text-[#B49286] mb-2">
                                    <span>Week 2</span>
                                    <span>Goal: 8 Weeks</span>
                                </div>
                                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="bg-[#B49286] w-1/4 h-full rounded-full shadow-[0_0_10px_#B49286]"></div>
                                </div>
                                <p className="text-sm mt-4 leading-relaxed text-stone-300">
                                    You are in the <strong>Inflammation Phase</strong>. Keep your compression consistent (23h/day) to prevent seromas.
                                </p>
                            </div>

                            <button className="w-full bg-white/10 backdrop-blur border border-white/20 text-white h-12 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors">
                                View Recovery Manual
                            </button>
                        </div>

                        {/* Quick Buy */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                            <h3 className="font-bold text-sm uppercase tracking-wider text-stone-500 mb-4">Recommended for You</h3>
                            <div className="flex gap-4 items-center mb-4">
                                <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                                    <img src="https://images.unsplash.com/photo-1616651181620-805fa6b3ba4a?q=80&w=200" alt="Arnica" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-serif font-bold text-[#2C2420] text-sm">Arnica Teas</p>
                                    <p className="text-xs text-stone-500">Anti-inflammatory</p>
                                </div>
                                <button className="ml-auto bg-[#FAF9F6] p-2 rounded-full text-[#2C2420] hover:bg-[#B49286] hover:text-white transition-colors">
                                    <ShoppingBag className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
