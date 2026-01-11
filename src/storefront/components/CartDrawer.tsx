
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../hooks/useStoreContext';
import { Trash2, Lock, ArrowRight, Smartphone, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

// Mock Upsells for the "Smart Cart" strategy
const UPSELLS = [
    {
        id: 'upsell-soap',
        name: "Jabón Neutro Fajas",
        price: 12,
        image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=200&auto=format&fit=crop",
        desc: "Cuida las fibras elásticas."
    },
    {
        id: 'upsell-extender',
        name: "Extensor de 3 Hileras",
        price: 8,
        image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=200&auto=format&fit=crop",
        desc: "Ajuste gradual sin presión."
    },
    {
        id: 'upsell-foam',
        name: "Lipo Foam 360",
        price: 30,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop",
        desc: "Evita marcas en la piel."
    }
];

export function CartDrawer() {
    const {
        cart,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
        addToCart,
        cartTotal,
        checkout
    } = useStore();

    const [isAnimating, setIsAnimating] = useState(false);
    const freeShippingThreshold = 150;

    // Cálculos en tiempo real
    const progress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
    const remaining = freeShippingThreshold - cartTotal;
    const isFreeShipping = cartTotal >= freeShippingThreshold;

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

    const handleAddUpsell = (item: typeof UPSELLS[0]) => {
        // Construct a StoreProduct object compatible with our context
        addToCart({
            id: item.id,
            title: item.name,
            price: item.price,
            image: item.image,
            category: 'Accessories',
            description: item.desc
        }, 'Universal');
    };

    if (!isAnimating && !isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end font-sans">
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        {/* Backdrop (Blur) */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={toggleCart}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        />

                        {/* Drawer Slide-in */}
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full z-50"
                        >

                            {/* BLOCK 1: HEADER "GAMIFICADO" (Free Shipping Bar) */}
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-serif text-2xl text-[#3E322C]">Tu Bolsa ({cart.length})</h2>
                                    <button onClick={toggleCart} className="text-gray-400 hover:text-black p-2">✕</button>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#3E322C]">
                                        {isFreeShipping ? (
                                            <span className="text-green-600 flex items-center gap-1">
                                                <Check size={14} /> ¡Envío Gratis Desbloqueado!
                                            </span>
                                        ) : (
                                            <span>Faltan ${remaining.toFixed(0)} para Envío Gratis ✈️</span>
                                        )}
                                        {isFreeShipping && <span>✈️</span>}
                                    </div>
                                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                                            className={`h-full transition-all duration-500 ${isFreeShipping ? 'bg-green-500' : 'bg-[#D4AF37]'}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* BLOCK 2: PRODUCT LIST (Clear & Editable) */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Lock className="text-gray-400" />
                                        </div>
                                        <p className="text-gray-500">Tu bolsa está vacía.</p>
                                        <button onClick={toggleCart} className="text-[#3E322C] font-bold border-b border-[#3E322C]">
                                            Explorar Colección
                                        </button>
                                    </div>
                                ) : (
                                    cart.map((item, index) => (
                                        <div key={`${item.product.id}-${item.selectedSize}-${index}`} className="flex gap-4">
                                            <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                                                <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900 leading-tight">{item.product.title}</h3>
                                                    <p className="text-xs text-gray-500 mt-1">Talla: {item.selectedSize}</p>

                                                    {/* Error de Talla (Simulated Logic) - If Faja is XS but Board is L? Too complex for now, but placeholder logic */}
                                                    {/* {item.selectedSize === 'XS' && <p className="text-[10px] text-orange-500 mt-1 font-bold">¿Segura de la talla?</p>} */}
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center border border-gray-200 rounded-md bg-white">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                                                            className="px-2 py-1 text-gray-400 hover:text-black hover:bg-gray-50 rounded-l-md transition-colors"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-xs px-2 font-mono font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                                                            className="px-2 py-1 text-gray-400 hover:text-black hover:bg-gray-50 rounded-r-md transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold text-[#3E322C]">${(item.product.price * item.quantity).toFixed(0)}</span>
                                                        <button
                                                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}

                                {/* BLOCK 3: THE "ONE-CLICK" UPSELL */}
                                {cart.length > 0 && (
                                    <div className="mt-8 pt-8 border-t border-dashed border-gray-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                Olvidados frecuentemente
                                            </p>
                                            <span className="text-[10px] bg-[#D4AF37] text-white px-2 py-0.5 rounded-full font-bold">
                                                Completa tu Kit
                                            </span>
                                        </div>

                                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
                                            {UPSELLS.map((up) => {
                                                // Don't show if already in cart
                                                if (cart.some(c => c.product.title === up.name)) return null;

                                                return (
                                                    <div key={up.id} className="min-w-[140px] border border-gray-100 rounded-xl p-3 bg-white hover:border-[#D4AF37] transition-all cursor-pointer group shadow-sm">
                                                        <div className="h-20 bg-gray-50 rounded-lg mb-2 overflow-hidden relative">
                                                            <img src={up.image} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                                                            <div className="absolute top-1 right-1 bg-white/80 backdrop-blur rounded px-1.5 py-0.5 text-[8px] font-bold">
                                                                +${up.price}
                                                            </div>
                                                        </div>
                                                        <p className="text-xs font-bold truncate text-[#3E322C]">{up.name}</p>
                                                        <p className="text-[10px] text-gray-400 truncate mb-2">{up.desc}</p>

                                                        <button
                                                            onClick={() => handleAddUpsell(up)}
                                                            className="w-full bg-gray-50 text-gray-600 text-[10px] font-bold py-1.5 rounded hover:bg-[#3E322C] hover:text-white transition-colors flex items-center justify-center gap-1"
                                                        >
                                                            AÑADIR +
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* BLOCK 4: FOOTER & CHECKOUT */}
                            {cart.length > 0 && (
                                <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] space-y-4">
                                    <div className="flex justify-between items-center text-lg font-bold text-[#3E322C]">
                                        <span>Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>

                                    {isFreeShipping && (
                                        <p className="text-xs text-green-600 font-medium text-center bg-green-50 py-2 rounded-lg border border-green-100">
                                            ¡Te estás ahorrando $25 de envío hoy!
                                        </p>
                                    )}

                                    <button
                                        onClick={checkout}
                                        className="w-full bg-[#3E322C] text-white py-4 rounded-xl font-bold tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-2 group shadow-xl active:scale-[0.98]"
                                    >
                                        <Lock size={16} />
                                        FINALIZAR COMPRA
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    <div className="flex justify-center flex-col items-center gap-2">
                                        <p className="text-[10px] text-gray-400">
                                            🔒 Transacción Segura SSL &bull; Envíos discretos desde Miami, FL
                                        </p>
                                    </div>
                                </div>
                            )}

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
