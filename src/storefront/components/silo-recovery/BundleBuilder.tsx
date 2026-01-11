import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRecoveryProducts } from '../../hooks/useRecoveryProducts';
import { useStore } from '../../hooks/useStoreContext';

export function BundleBuilder() {
    // Reusing the hook but we should ideally filter for 'Accessories' or specific tags
    // For now, let's grab everything and filter by 'Accesorios' or specific product types if available.
    // If not, we can try to find products that look like accessories based on title.
    const { products } = useRecoveryProducts();
    const { addToCart, toggleCart } = useStore();
    const navigate = useNavigate();

    // Filter for Accessories/Bundle items
    // Logic: Look for "Tabla", "Foam", "Orinal", "Bra" in title or tags
    const bundleItems = products.filter(p => {
        const title = p.title.toLowerCase();
        return title.includes('tabla') || title.includes('foam') || title.includes('orinal') || title.includes('bra');
    }).slice(0, 3);

    // Fallback if no real bundle items found yet
    // Strict Mode: Show nothing or empty message if no data.
    const displayItems = bundleItems;

    const handleAdd = (item: any) => {
        // Logic: If it's a "Simple" product (1 variant, e.g. One Size board), add it.
        // If it's a "Complex" product (Sizes), go to product page.

        if (item.variants && item.variants.length === 1) {
            const variantTitle = item.variants[0].title;
            addToCart(item, variantTitle);
            toggleCart();
        } else {
            // Complex product -> Redirect
            const handle = item.handle || item.id.split('/').pop();
            navigate(`/products/${handle}`);
        }
    };

    return (
        <div className="py-24 bg-[#F9F8F6] border-t border-[#3E322C]/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <span className="text-xs font-bold tracking-widest text-[#A35944] uppercase mb-2 block">Post-Op Essentials</span>
                        <h2 className="text-3xl font-serif text-[#3E322C] mb-2">Doctor's Orders: The Kit</h2>
                        <p className="text-sm text-gray-500">Los cirujanos recomiendan complementar tu faja con estos accesorios.</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-[#3E322C] font-bold text-xs uppercase tracking-widest hover:text-[#A35944] transition-colors border-b border-[#3E322C] pb-1">
                        Ver todo el Kit <Plus size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayItems.map((item) => (
                        <div key={item.id} className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-6 border border-gray-100">
                            <div className="w-24 h-24 bg-[#F9F8F6] shrink-0 overflow-hidden rounded-2xl">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover mix-blend-multiply" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-[#3E322C] leading-tight text-lg">{item.title}</h3>
                                </div>
                                <p className="text-xs text-gray-400 mb-4">{item.description || 'Accesorio esencial'}</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-mono text-sm font-bold text-[#A35944]">${item.price}</span>
                                    <button
                                        onClick={() => handleAdd(item)}
                                        className="bg-[#3E322C] text-white p-2.5 rounded-full hover:bg-[#A35944] transition-colors shadow-lg active:scale-90 transform"
                                        title="Agregar al carrito"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="md:hidden mt-12 w-full flex justify-center items-center gap-2 text-[#3E322C] font-bold text-xs uppercase tracking-widest hover:text-[#A35944] transition-colors border border-[#3E322C]/20 py-4 rounded-xl">
                    Ver todo el Kit <Plus size={16} />
                </button>
            </div>
        </div>
    );
}
