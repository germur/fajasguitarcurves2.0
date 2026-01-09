import { useState } from 'react';
import { useStore } from './hooks/useStoreContext';
import { Lock, CreditCard, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CheckoutPage() {
    const { cart, cartTotal } = useStore();
    const [email, setEmail] = useState('');
    const shipping = cartTotal >= 200 ? 0 : 15;
    const finalTotal = cartTotal + shipping;

    // Simulate "Loading" state for processing
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Mock processing delay
        setTimeout(() => {
            alert('Order Placed Successfully! (Mock)');
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] font-sans pb-20">
            {/* Header */}
            <header className="bg-white border-b border-stone-100 py-6">
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                    <Link to="/store" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#2C2420] text-[#F5EDDF] flex items-center justify-center font-bold font-serif text-lg">G</div>
                        <span className="font-serif text-xl font-bold text-[#2C2420]">Checkout</span>
                    </Link>
                    <div className="flex items-center gap-2 text-stone-500 text-sm">
                        <Lock className="w-4 h-4" />
                        <span className="hidden sm:inline">Secure 256-bit Encryption</span>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                {/* Left Column: Guest & Shipping */}
                <div className="space-y-10 order-2 lg:order-1">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* 1. Contact */}
                        <section>
                            <h2 className="font-serif text-2xl font-bold text-[#2C2420] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-[#2C2420] text-white text-sm flex items-center justify-center font-sans">1</span>
                                Contact
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide text-stone-600 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border border-stone-200 rounded-lg p-3 text-[#2C2420] focus:ring-2 focus:ring-[#B49286] focus:outline-none transition-all"
                                        placeholder="isabella@example.com"
                                    />
                                    <p className="text-xs text-stone-400 mt-2 flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3" /> No account needed. Used for order updates only.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" id="news" className="rounded border-stone-300 text-[#2C2420] focus:ring-[#B49286]" />
                                    <label htmlFor="news" className="text-sm text-stone-600">Email me with new faja drops & recovery tips.</label>
                                </div>
                            </div>
                        </section>

                        {/* 2. Shipping */}
                        <section>
                            <h2 className="font-serif text-2xl font-bold text-[#2C2420] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-[#2C2420] text-white text-sm flex items-center justify-center font-sans">2</span>
                                Shipping
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wide text-stone-600 mb-2">Full Name</label>
                                    <input type="text" className="w-full border border-stone-200 rounded-lg p-3 focus:ring-2 focus:ring-[#B49286] focus:outline-none" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wide text-stone-600 mb-2">Address</label>
                                    <input type="text" className="w-full border border-stone-200 rounded-lg p-3 focus:ring-2 focus:ring-[#B49286] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide text-stone-600 mb-2">City</label>
                                    <input type="text" className="w-full border border-stone-200 rounded-lg p-3 focus:ring-2 focus:ring-[#B49286] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide text-stone-600 mb-2">Zip Code</label>
                                    <input type="text" className="w-full border border-stone-200 rounded-lg p-3 focus:ring-2 focus:ring-[#B49286] focus:outline-none" />
                                </div>
                            </div>
                        </section>

                        {/* 3. Payment Mock */}
                        <section>
                            <h2 className="font-serif text-2xl font-bold text-[#2C2420] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-[#2C2420] text-white text-sm flex items-center justify-center font-sans">3</span>
                                Payment
                            </h2>
                            <div className="border border-stone-200 rounded-lg p-6 bg-stone-50 text-center">
                                <div className="flex justify-center mb-4 text-stone-300">
                                    <CreditCard className="w-12 h-12" />
                                </div>
                                <p className="text-stone-500 text-sm mb-4">Payment processing is handled securely via Stripe/Shopify.</p>
                                <button type="submit" disabled={isProcessing} className="w-full bg-[#2C2420] text-white py-4 rounded-lg font-bold text-lg hover:bg-black transition-colors disabled:opacity-50">
                                    {isProcessing ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
                                </button>
                            </div>
                        </section>
                    </form>
                </div>

                {/* Right Column: Order Summary (Sticky) */}
                <div className="order-1 lg:order-2">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 sticky top-10">
                        <h3 className="font-serif text-xl font-bold text-[#2C2420] mb-6">Order Summary</h3>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2">
                            {cart.map((item) => (
                                <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4">
                                    <div className="w-16 h-20 bg-stone-100 rounded-md overflow-hidden shrink-0">
                                        <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-sm text-[#2C2420] line-clamp-2">{item.product.title}</h4>
                                            <span className="font-bold text-sm text-[#2C2420]">${(item.product.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <p className="text-xs text-stone-500 mt-1">Size: {item.selectedSize}</p>
                                        <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-stone-100 text-sm">
                            <div className="flex justify-between text-stone-600">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-stone-600">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? <span className="text-[#A35944] font-bold">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-[#2C2420] text-xl font-bold pt-4 border-t border-stone-100">
                                <span>Total</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}
