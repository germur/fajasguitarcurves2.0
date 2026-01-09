import { X, Trash2, Plus, Minus, Lock, Check, Smartphone, ArrowRight } from 'lucide-react';
import { useStore } from '../hooks/useStoreContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UPSELL_PRODUCT = {
    id: 'mock-foam-1',
    title: '360° Lipo Foam Board',
    price: 35,
    image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=200&auto=format&fit=crop',
    category: 'Medical Hub'
};

export function CartDrawer() {
    const {
        cart,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
        addToCart,
        cartTotal
    } = useStore();

    const [isAnimating, setIsAnimating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isCartOpen) {
            requestAnimationFrame(() => setIsAnimating(true));
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isCartOpen]);

    const handleCheckout = () => {
        toggleCart();
        navigate('/store/checkout');
    };

    // Upsell logic is now handled directly in JSX to respect conditional rendering
    // const hasUpsell = cart.some(item => item.product.id === UPSELL_PRODUCT.id);
    // const hasFaja = cart.some(item => item.product.title.toLowerCase().includes('faja') || item.product.title.toLowerCase().includes('guitar'));
    // const showUpsell = !hasUpsell && hasFaja;

    if (!isAnimating && !isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            <div
                className={`
                    absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300
                    ${isCartOpen ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={toggleCart}
            />

            <div
                className={`
                    relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-out
                    ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-stone-100">
                    <h2 className="font-serif text-2xl font-bold text-[#2C2420]">Your Cart</h2>
                    <button
                        onClick={toggleCart}
                        className="p-2 -mr-2 text-stone-400 hover:text-[#2C2420] transition-colors rounded-full hover:bg-stone-100"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Free Shipping Progress */}
                <div className="px-6 py-3 bg-[#F5EDDF]/50 border-b border-[#F5EDDF]">
                    <div className="flex items-center gap-2 text-sm text-[#A35944] font-medium mb-2">
                        <Check className="w-4 h-4" />
                        <span>Free Shipping available on orders over $200</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#B49286] rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min(100, (cartTotal / 200) * 100)}%` }}
                        />
                    </div>
                </div>

                {/* Wallet Pay Buttons (Express) */}
                {cart.length > 0 && (
                    <div className="px-6 pt-6 pb-2 grid grid-cols-3 gap-3">
                        <button className="flex items-center justify-center py-2.5 rounded-lg bg-[#5A31F4] text-white hover:opacity-90 transition-opacity shadow-sm">
                            <span className="font-bold italic text-sm">Shop Pay</span>
                        </button>
                        <button className="flex items-center justify-center py-2.5 rounded-lg bg-black text-white hover:opacity-90 transition-opacity shadow-sm gap-1">
                            <span className="font-bold text-sm">Pay</span>
                        </button>
                        <button className="flex items-center justify-center py-2.5 rounded-lg bg-[#F2F2F2] text-black border border-stone-200 hover:bg-stone-200 transition-colors shadow-sm font-bold text-sm gap-1">
                            <span className="text-blue-500">G</span><span>Pay</span>
                        </button>
                    </div>
                )}

                {cart.length > 0 && <div className="text-center text-xs text-stone-400 my-2 font-medium">OR</div>}


                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-stone-500">
                            <div className="w-16 h-16 rounded-full bg-stone-100 mb-4 flex items-center justify-center">
                                <Lock className="w-8 h-8 text-stone-300" />
                            </div>
                            <p className="text-lg font-medium mb-1">Your cart is empty</p>
                            <button
                                onClick={toggleCart}
                                className="mt-6 text-[#B49286] font-bold hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6 pt-2">
                            {cart.map((item) => (
                                <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4">
                                    <div className="w-20 h-24 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-[#2C2420] line-clamp-2 text-sm md:text-base">{item.product.title}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                                                    className="text-stone-400 hover:text-red-500 transition-colors p-1 -mr-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-stone-500">Size: {item.selectedSize}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center border border-stone-200 rounded-full overflow-hidden h-8">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                                                    className="px-2 hover:bg-stone-50 text-stone-500 h-full flex items-center"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                                                    className="px-2 hover:bg-stone-50 text-stone-500 h-full flex items-center"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <span className="font-bold text-[#2C2420] text-sm">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Smart Upsell: Logic - Show if Stage 2 is in cart but Lipo Foam is not */}
                            {cart.some(item => (item.product.stage === 'Stage 2' || item.product.title.includes('Stage 2'))) &&
                                !cart.some(item => item.product.title.includes('Foam')) && (
                                    <div className="bg-[#FAF9F6] border border-[#D1AB66]/30 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <p className="text-[10px] uppercase font-bold text-[#A35944] mb-2 flex items-center gap-1">
                                            <Smartphone className="w-3 h-3" /> Doctor Recommended
                                        </p>
                                        <div className="flex gap-4">
                                            <div className="w-16 h-16 bg-white rounded-lg overflow-hidden shrink-0 border border-stone-100">
                                                <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop" alt="Lipo Foam 360" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm text-[#2C2420] leading-tight mb-1">360° Lipo Foam Board</h4>
                                                <p className="text-[10px] text-stone-500 mb-2 leading-tight">Prevents fibrosis and skin marks.</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-stone-500">$35.00</span>
                                                    <button
                                                        onClick={() => addToCart({
                                                            id: 'lipo-foam-upsell',
                                                            title: '360° Lipo Foam Board',
                                                            price: 35,
                                                            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop',
                                                            category: 'Medical Supplies'
                                                        }, 'One Size')}
                                                        className="text-[10px] font-bold bg-[#2C2420] text-white px-3 py-1.5 rounded-full hover:bg-black transition-colors"
                                                    >
                                                        QUICK ADD +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="border-t border-stone-100 p-6 bg-stone-50/50">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold text-[#2C2420]">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-stone-500 mb-6 text-center">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-[#A35944] text-white py-4 rounded-full font-bold text-lg tracking-wide hover:bg-[#D1AB66] transition-colors shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 group"
                        >
                            <Lock className="w-4 h-4" />
                            CHECKOUT SECURELY <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
