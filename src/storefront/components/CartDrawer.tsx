
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../hooks/useStoreContext';
import { Trash2, Lock, ArrowRight, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from './LocalizedLink';



export function CartDrawer() {
    const {
        cart,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,

        cartTotal,
        checkout
    } = useStore();

    const { t } = useTranslation();
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
                                <div className="flex justify-between items-center">
                                    <h2 className="font-serif text-2xl text-[#3E322C]">{t('components.cart.your_bag')} ({cart.length})</h2>
                                    <button onClick={toggleCart} className="text-gray-400 hover:text-black p-2">✕</button>
                                </div>
                            </div>

                            {/* BLOCK 2: PRODUCT LIST (Clear & Editable) */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Lock className="text-gray-400" />
                                        </div>
                                        <p className="text-gray-500">{t('components.cart.bag_empty')}</p>
                                        <button onClick={toggleCart} className="text-[#3E322C] font-bold border-b border-[#3E322C]">
                                            {t('components.cart.explore_collection')}
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
                                                    <p className="text-xs text-gray-500 mt-1">{t('components.cart.size')}: {item.selectedSize}</p>

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

                                {cart.some(item => item.product.title.includes('Stage 1') || item.product.category?.includes('Recovery')) && (
                                    <div className="mt-6 p-4 bg-[#F9F4E8] border border-[#D4AF37]/30 rounded-xl relative overflow-hidden">
                                        <div className="relative z-10 flex gap-4 items-start">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm shrink-0">
                                                ⏳
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#2C2420] text-sm mb-1">{t('components.cart.stage1_upsell_title')}</h4>
                                                {t('components.cart.stage1_upsell_desc')}
                                                <Link
                                                    to="/tools/stage1-vs-stage2"
                                                    onClick={toggleCart}
                                                    className="text-[10px] font-bold text-[#D4AF37] underline hover:text-[#2C2420] transition-colors"
                                                >
                                                    {t('components.cart.stage1_vs_stage2')} &rarr;
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}


                            </div>

                            {/* BLOCK 4: FOOTER & CHECKOUT */}
                            {cart.length > 0 && (
                                <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] space-y-4">
                                    <div className="flex justify-between items-center text-lg font-bold text-[#3E322C]">
                                        <span>{t('components.cart.subtotal')}</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>



                                    <button
                                        onClick={checkout}
                                        className="w-full bg-[#3E322C] text-white py-4 rounded-xl font-bold tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-2 group shadow-xl active:scale-[0.98]"
                                    >
                                        <Lock size={16} />
                                        {t('components.cart.checkout')}
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    <div className="flex justify-center flex-col items-center gap-2">
                                        <p className="text-[10px] text-gray-400">
                                            {t('components.cart.secure_transaction')}
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
