import { Trash2, Plus, Minus, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from './hooks/useStoreContext';
import { useNavigate, Link } from 'react-router-dom';

export function CartPage() {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        checkout
    } = useStore();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FAF9F6] pt-12 pb-24 px-6 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-stone-500 hover:text-[#2C2420] transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="font-serif text-3xl md:text-4xl text-[#2C2420] font-bold">Carrito de Compras</h1>
                </div>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                        <div className="w-20 h-20 bg-stone-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <Lock className="w-10 h-10 text-stone-300" />
                        </div>
                        <h2 className="text-xl font-bold text-[#2C2420] mb-2">Tu carrito está vacío</h2>
                        <p className="text-stone-500 mb-8 max-w-md mx-auto">
                            Parece que aún no has encontrado tu ajuste perfecto. Explora nuestras colecciones para encontrar tu curva ideal.
                        </p>
                        <Link
                            to="/"
                            className="inline-block bg-[#2C2420] text-white px-8 py-3 rounded-full font-bold hover:bg-[#A35944] transition-colors"
                        >
                            Volver a la Tienda
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item) => (
                                <div key={`${item.product.id}-${item.selectedSize}`} className="bg-white p-6 rounded-2xl shadow-sm flex gap-6">
                                    {/* Image */}
                                    <div className="w-24 h-32 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-lg text-[#2C2420] mb-1">{item.product.title}</h3>
                                                <p className="text-sm text-stone-500">Talla: {item.selectedSize}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                                                className="text-stone-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-end justify-between">
                                            <div className="flex items-center border border-stone-200 rounded-full overflow-hidden bg-white">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                                                    className="p-2 hover:bg-stone-50 text-stone-500"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="font-bold w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                                                    className="p-2 hover:bg-stone-50 text-stone-500"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-stone-400 mb-1">Total</p>
                                                <p className="font-bold text-xl text-[#2C2420]">
                                                    ${(item.product.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-2xl shadow-sm sticky top-24">
                                <h2 className="font-serif text-xl font-bold text-[#2C2420] mb-6">Resumen del Pedido</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-stone-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-stone-600">
                                        <span>Envío</span>
                                        <span className="text-sm italic">Calculado en el checkout</span>
                                    </div>
                                    <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                                        <span className="font-bold text-lg text-[#2C2420]">Total</span>
                                        <span className="font-bold text-2xl text-[#2C2420]">${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={checkout}
                                    className="w-full bg-[#A35944] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#D1AB66] transition-colors shadow-lg shadow-[#A35944]/20 flex items-center justify-center gap-2 mb-6"
                                >
                                    PAGAR AHORA
                                    <ArrowRight className="w-5 h-5" />
                                </button>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs text-stone-500">
                                        <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center shrink-0">
                                            <Lock className="w-3 h-3 text-[#B49286]" />
                                        </div>
                                        <span>Encriptación SSL Segura</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-stone-500">
                                        <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center shrink-0">
                                            <ArrowRight className="w-3 h-3 text-[#B49286]" />
                                        </div>
                                        <span>Devoluciones Gratis por 30 Días</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
