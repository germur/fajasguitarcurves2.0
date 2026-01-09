import { useState } from 'react';
import { X, Package, ArrowRight } from 'lucide-react';
import { useStore } from '../hooks/useStoreContext';

export function LoginDrawer() {
    const { isLoginOpen, toggleLogin, login } = useStore();
    const [activeTab, setActiveTab] = useState<'login' | 'track'>('login');

    if (!isLoginOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#2C2420]/60 backdrop-blur-sm transition-opacity"
                onClick={toggleLogin}
            />

            {/* Panel */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-stone-100">
                    <h2 className="font-serif text-2xl text-[#2C2420] font-bold">
                        {activeTab === 'login' ? 'Welcome Back' : 'Track Order'}
                    </h2>
                    <button
                        onClick={toggleLogin}
                        className="p-2 -mr-2 text-stone-400 hover:text-[#2C2420] transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-stone-100">
                    <button
                        onClick={() => setActiveTab('login')}
                        className={`flex-1 py-4 text-sm font-bold tracking-wide transition-colors ${activeTab === 'login'
                            ? 'text-[#B49286] border-b-2 border-[#B49286]'
                            : 'text-stone-400 hover:text-stone-600'
                            }`}
                    >
                        LOGIN / REGISTER
                    </button>
                    <button
                        onClick={() => setActiveTab('track')}
                        className={`flex-1 py-4 text-sm font-bold tracking-wide transition-colors ${activeTab === 'track'
                            ? 'text-[#B49286] border-b-2 border-[#B49286]'
                            : 'text-stone-400 hover:text-stone-600'
                            }`}
                    >
                        TRACK ORDER
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {activeTab === 'login' ? (
                        <div className="space-y-6">
                            <p className="text-stone-500 text-sm leading-relaxed">
                                Access your <strong>Curve Profile</strong> to view saved measurements, recovery timeline, and size recommendations.
                            </p>

                            <div className="space-y-4">
                                <button className="w-full h-12 flex items-center justify-center gap-3 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors font-medium text-stone-700">
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                                    Continue with Google
                                </button>
                                <button className="w-full h-12 flex items-center justify-center gap-3 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors font-medium text-stone-700">
                                    <img src="https://www.svgrepo.com/show/448234/apple.svg" alt="Apple" className="w-5 h-5" />
                                    Continue with Apple
                                </button>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-stone-200"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-stone-400">Or continue with email</span>
                                </div>
                            </div>

                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); login(); }}>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full border border-stone-200 rounded-md px-4 py-3 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#B49286]"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Password</label>
                                    <input
                                        type="password"
                                        className="w-full border border-stone-200 rounded-md px-4 py-3 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#B49286]"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#B49286] text-white h-12 rounded-full font-bold tracking-wide hover:bg-[#A35944] transition-colors shadow-lg shadow-[#B49286]/20"
                                >
                                    SIGN IN
                                </button>
                            </form>

                            <div className="text-center pt-4">
                                <p className="text-xs text-stone-400">Don't have a profile?</p>
                                <button
                                    onClick={login}
                                    className="mt-2 text-[#B49286] font-bold text-sm hover:underline flex items-center justify-center gap-1 mx-auto"
                                >
                                    Create your Curve Profile <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 text-center">
                                <Package className="w-12 h-12 text-[#B49286] mx-auto mb-3" />
                                <h3 className="font-bold text-[#2C2420]">Guest Tracking</h3>
                                <p className="text-sm text-stone-500 mt-1">Enter your order ID to see real-time updates without logging in.</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Order ID</label>
                                    <input
                                        type="text"
                                        className="w-full border border-stone-200 rounded-md px-4 py-3 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#B49286]"
                                        placeholder="e.g. GC-12345"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full border border-stone-200 rounded-md px-4 py-3 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#B49286]"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <button className="w-full border border-[#2C2420] text-[#2C2420] h-12 rounded-full font-bold tracking-wide hover:bg-[#2C2420] hover:text-white transition-colors">
                                    TRACK ORDER
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
