import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../../hooks/useStoreContext'; // Adjusted path
import { Link } from 'react-router-dom';

// Mock Data for "Viral Favorites"
const BEST_SELLERS = [
    {
        id: "p1",
        name: "Guitar Curves™ Stage 2",
        price: 145,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
        badges: ["Best Seller", "BBL Safe"]
    },
    {
        id: "p2",
        name: "360° Lipo Foam Board",
        price: 85,
        image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800&auto=format&fit=crop",
        badges: ["Medical Grade"]
    },
    {
        id: "p3",
        name: "Snatched Waist Trainer (Latex)",
        price: 65,
        image: "https://images.unsplash.com/photo-1596482552993-9bfa094d48a4?q=80&w=800&auto=format&fit=crop",
        badges: ["High Compression"]
    },
    {
        id: "p4",
        name: "Urinal Funnel (Post-Op)",
        price: 25,
        image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=800&auto=format&fit=crop",
        badges: ["Hygiene"]
    }
];

export function BestSellersCarousel() {
    const { toggleCart } = useStore();

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        // In a real app, this would add specific ID to cart
        toggleCart();
    };

    return (
        <section className="py-24 bg-[#FAF9F6] border-y border-stone-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[#B49286] font-bold tracking-widest text-xs uppercase mb-3 block">Shop The Hype</span>
                    <h2 className="font-serif text-4xl text-[#2C2420]">The Viral Favorites</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {BEST_SELLERS.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-stone-200">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Badges */}
                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                    {product.badges.map(badge => (
                                        <span key={badge} className="bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide text-[#2C2420]">
                                            {badge}
                                        </span>
                                    ))}
                                </div>

                                {/* Quick Add Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <button
                                        onClick={handleQuickAdd}
                                        className="w-full bg-[#2C2420] text-white py-3 rounded-lg font-bold text-sm shadow-lg hover:bg-black flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag className="w-4 h-4" /> Quick Add
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-serif text-lg text-[#2C2420] group-hover:underline decoration-[#B49286] underline-offset-4 decoration-2">{product.name}</h3>
                                    <span className="font-bold text-[#A35944]">${product.price}</span>
                                </div>
                                <p className="text-xs text-stone-400 mt-1">⭐️ 4.9 (120 Reviews)</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/store/guitar-curves" className="inline-flex items-center gap-2 border-b border-[#2C2420] pb-1 font-bold text-[#2C2420] hover:text-[#B49286] hover:border-[#B49286] transition-colors">
                        SHOP ALL BEST SELLERS <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
