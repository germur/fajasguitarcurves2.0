import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useStore } from '../hooks/useStoreContext';

// Define the interface for menu items



export function GlassNavbar() {
    const { cartCount, toggleCart, toggleSearch } = useStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // 'shop' or null
    const [announcementIndex, setAnnouncementIndex] = useState(0);
    const location = useLocation();

    // Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close Mobile Menu on Route Change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    // Announcement Slider Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setAnnouncementIndex(prev => (prev === 0 ? 1 : 0));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const announcements = [
        "🇺🇸 Envíos Gratis a todo USA en órdenes +$100",
        "💬 Asesoría de Talla por Expertas en WhatsApp"
    ];




    return (
        <>
            {/* Top Bar Announcement */}
            <div className={`
                fixed top-0 left-0 w-full z-[60] h-[32px] bg-[#1A1A1A] text-white flex items-center justify-center overflow-hidden transition-transform duration-300
                ${isScrolled ? '-translate-y-full' : 'translate-y-0'} 
            `}>
                <p
                    key={announcementIndex}
                    className="text-[10px] md:text-xs font-mono tracking-widest uppercase animate-fade-in text-center px-4"
                >
                    {announcements[announcementIndex]}
                </p>
            </div>

            {/* Main Nav Container - Always White for Readability */}
            <nav
                className={`
                    fixed left-0 w-full z-50 transition-all duration-300 ease-in-out group flex items-center bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100 text-stone-900
                    ${isScrolled ? 'top-0 h-20' : 'top-[32px] h-24'}
                `}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
                    <div className="flex justify-between items-center h-full">

                        {/* 1. Left (Desktop Nav - MEGA MENU TRIGGER) */}
                        <div className="hidden md:flex gap-8 h-full items-center pl-2">
                            {/* THE TRIGGER */}
                            <div
                                className="h-full flex items-center cursor-pointer group"
                                onMouseEnter={() => setActiveDropdown('shop')}
                            >
                                <span className="flex items-center gap-1 font-bold text-xs tracking-[0.15em] hover:text-[#D4AF37] transition-colors uppercase">
                                    SHOP <ChevronDown size={14} />
                                </span>
                            </div>



                            {/* OTHER LINKS */}
                            <Link to="/pages/our-story" className="font-bold text-xs tracking-[0.15em] hover:text-[#D4AF37] transition-colors uppercase">
                                Our Story
                            </Link>
                            <div
                                className="h-full flex items-center cursor-pointer group relative"
                                onMouseEnter={() => setActiveDropdown('tools')}
                            >
                                <span className="flex items-center gap-1 font-bold text-xs tracking-[0.15em] hover:text-[#D4AF37] transition-colors uppercase">
                                    TOOLS <ChevronDown size={14} />
                                </span>
                                {/* Tools Dropdown (Mini) */}
                                <div className={`
                                    absolute top-full left-0 w-64 bg-white border border-stone-100 shadow-xl py-4
                                    transform transition-all duration-300 origin-top
                                    ${activeDropdown === 'tools' ? 'opacity-100 visible scale-y-100' : 'opacity-0 invisible scale-y-95'}
                                `}>
                                    <Link to="/tools/recovery-timeline" className="block px-6 py-3 text-xs font-bold text-stone-600 hover:bg-stone-50 hover:text-[#A35944] uppercase tracking-wider">
                                        Recovery Calculator
                                    </Link>
                                    <Link to="/tools/guitar-ratio" className="block px-6 py-3 text-xs font-bold text-stone-600 hover:bg-stone-50 hover:text-[#A35944] uppercase tracking-wider">
                                        Guitar Ratio Test
                                    </Link>
                                    <Link to="/tools/stage1-vs-stage2" className="block px-6 py-3 text-xs font-bold text-stone-600 hover:bg-stone-50 hover:text-[#A35944] uppercase tracking-wider">
                                        Stage 1 vs Stage 2
                                    </Link>
                                </div>
                            </div>

                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="p-2 -ml-2"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>

                        {/* 2. Center (Logo) */}
                        <div className="flex-shrink-0 flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                            <Link to="/" className="font-serif text-2xl tracking-tighter font-bold transition-colors">
                                <img
                                    src="/assets/guitar-curves-logo.png"
                                    alt="Guitar Curves"
                                    className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-8 md:h-10' : 'h-12 md:h-16'}`}
                                />
                            </Link>
                        </div>

                        {/* 3. Right (Actions) */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link to="/pages/guia-de-tallas" className="hidden lg:flex bg-[#D4AF37] text-white text-[10px] font-bold tracking-widest uppercase px-5 py-2 rounded-full hover:bg-[#B49286] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap">
                                ENCUENTRA TU TALLA 📐
                            </Link>
                            <button
                                onClick={toggleSearch}
                                className="hover:opacity-70 transition-opacity"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            <button
                                onClick={toggleCart}
                                className="relative hover:opacity-70 transition-opacity"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-[#B49286] rounded-full flex items-center justify-center text-[8px] font-bold text-white ring-2 ring-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Mobile Actions (Right) */}
                        <div className="flex md:hidden items-center space-x-4">
                            <button onClick={toggleSearch} className="text-stone-900">
                                <Search className="w-5 h-5" />
                            </button>
                            <button onClick={toggleCart} className="relative">
                                <ShoppingBag className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-[#B49286] rounded-full flex items-center justify-center text-[8px] font-bold text-white ring-2 ring-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>

                    </div>
                </div>

                {/* MEGA MENU DROPDOWN (VISUAL BOUTIQUE) */}
                <div
                    className={`
                        absolute top-full left-0 w-full bg-white border-t border-stone-100 shadow-xl overflow-hidden transition-all duration-500 ease-out text-stone-900 z-50
                        ${activeDropdown === 'shop' ? 'max-h-[600px] opacity-100 visible translate-y-0' : 'max-h-0 opacity-0 invisible -translate-y-2'}
                    `}
                    onMouseEnter={() => { }} // Keep open on hover
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    <div className="max-w-7xl mx-auto px-8 py-12">
                        <div className="grid grid-cols-12 gap-8">

                            {/* COL 1: BY COLLECTION (The Silos) */}
                            <div className="col-span-3 border-r border-stone-100 pr-8">
                                <h4 className="font-serif text-lg mb-6 text-stone-400 italic">By Collection</h4>
                                <ul className="space-y-6">
                                    <li className="group/item">
                                        <Link to="/collections/recovery" className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveDropdown(null)}>
                                            <div className="w-10 h-10 bg-stone-100 rounded-lg overflow-hidden group-hover/item:ring-2 ring-[#D4AF37] transition-all">
                                                <img src="/assets/recovery-hands.png" className="w-full h-full object-cover" alt="Recovery" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-[#2C2420] group-hover/item:text-[#D4AF37] transition-colors">Recovery Room</p>
                                                <p className="text-[10px] text-stone-400 uppercase tracking-wide">Post-Quirúrgico & Médico</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="group/item">
                                        <Link to="/collections/sculpt" className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveDropdown(null)}>
                                            <div className="w-10 h-10 bg-stone-100 rounded-lg overflow-hidden group-hover/item:ring-2 ring-[#D4AF37] transition-all">
                                                <img src="/assets/sculpt-nav-menu.jpg" className="w-full h-full object-cover" alt="Sculpt" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-[#2C2420] group-hover/item:text-[#D4AF37] transition-colors">Sculpt Studio</p>
                                                <p className="text-[10px] text-stone-400 uppercase tracking-wide">Uso Diario & Estético</p>
                                            </div>
                                        </Link>
                                    </li>

                                </ul>
                            </div>

                            {/* COL 2: BY GOAL (Solutions) */}
                            <div className="col-span-3 border-r border-stone-100 pr-8 pl-4">
                                <h4 className="font-serif text-lg mb-6 text-stone-400 italic">Shop by Goal</h4>
                                <ul className="space-y-3">
                                    {[
                                        { label: 'Stage 2 (Alta Compresión)', href: '/collections/recovery?tag=Stage+2' },
                                        { label: 'Stage 3 (Mantenimiento)', href: '/collections/recovery?tag=Stage+3' },
                                        { label: 'BBL Protection', href: '/collections/recovery?tag=BBL' },
                                        { label: 'Levanta Cola', href: '/collections/sculpt?tag=Butt+Lifter' },
                                        { label: 'Cintura de Avispa', href: '/collections/sculpt?tag=Waist+Trainer' }
                                    ].map((item) => (
                                        <li key={item.label}>
                                            <Link
                                                to={item.href}
                                                className="text-sm font-medium text-stone-600 hover:text-[#D4AF37] hover:translate-x-1 transition-all cursor-pointer block"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 pt-6 border-t border-stone-100">
                                    <Link to="/pages/guia-de-tallas" className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:underline uppercase tracking-wider" onClick={() => setActiveDropdown(null)}>
                                        HACER QUIZ DE TALLA <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>

                            {/* COL 3 & 4: FEATURED VISUALS (Skims Effect) */}
                            <div className="col-span-6 grid grid-cols-2 gap-4 pl-4">

                                {/* Visual Card 1: New In */}
                                <Link to="/collections/sculpt" className="relative h-48 bg-stone-100 rounded-xl overflow-hidden group cursor-pointer" onClick={() => setActiveDropdown(null)}>
                                    <img src="/assets/sewing-detail.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="New In" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                                        <span className="text-white text-xs font-bold uppercase tracking-widest mb-1">New In</span>
                                        <p className="text-white font-serif text-xl">The Guitar Cut™</p>
                                    </div>
                                </Link>

                                {/* Visual Card 2: Sale */}
                                <Link to="/collections/sculpt" className="relative h-48 bg-[#F5F3F0] rounded-xl overflow-hidden group cursor-pointer flex items-center justify-center p-6 text-center" onClick={() => setActiveDropdown(null)}>
                                    <div>
                                        <h5 className="font-serif text-2xl text-[#2C2420] mb-2">Sale</h5>
                                        <p className="text-xs text-stone-500 mb-4">Hasta 40% OFF en referencias seleccionadas</p>
                                        <span className="inline-block bg-[#2C2420] text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors">
                                            Ver Ofertas
                                        </span>
                                    </div>
                                </Link>

                            </div>

                        </div>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU OVERLAY */}
            <div
                className={`
                    fixed inset-0 z-[70] bg-white transform transition-transform duration-500 ease-in-out md:hidden flex flex-col
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="flex justify-between items-center p-6 border-b border-stone-100 text-stone-900">
                    <span className="font-serif text-xl font-bold text-[#2C2420]">GUITAR CURVES</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-stone-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 flex-1 overflow-y-auto">
                    <nav className="space-y-8">

                        {/* 1. SHOP SECTION */}
                        <div>
                            <h4 className="font-serif text-2xl text-[#2C2420] mb-4">Shop</h4>
                            <div className="space-y-4 pl-2 border-l-2 border-stone-100">
                                <Link to="/collections/recovery" className="block p-2 hover:bg-stone-50 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="font-bold text-base text-[#2C2420]">Recovery Room</div>
                                    <div className="text-xs text-stone-500">Post-Quirúrgico & Stage 1, 2, 3</div>
                                </Link>
                                <Link to="/collections/sculpt" className="block p-2 hover:bg-stone-50 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="font-bold text-base text-[#2C2420]">Sculpt Studio</div>
                                    <div className="text-xs text-stone-500">Fajas de Uso Diario & Waist Trainers</div>
                                </Link>

                            </div>
                        </div>

                        {/* 2. TOOLS SECTION */}
                        <div>
                            <h4 className="font-serif text-2xl text-[#2C2420] mb-4">Tools</h4>
                            <div className="space-y-3 pl-2 border-l-2 border-stone-100">
                                <Link to="/tools/recovery-timeline" className="block text-sm font-medium text-stone-600 hover:text-[#D4AF37]" onClick={() => setIsMobileMenuOpen(false)}>
                                    Recovery Calculator
                                </Link>
                                <Link to="/tools/guitar-ratio" className="block text-sm font-medium text-stone-600 hover:text-[#D4AF37]" onClick={() => setIsMobileMenuOpen(false)}>
                                    Guitar Ratio Test
                                </Link>
                                <Link to="/tools/stage1-vs-stage2" className="block text-sm font-medium text-stone-600 hover:text-[#D4AF37]" onClick={() => setIsMobileMenuOpen(false)}>
                                    Stage 1 vs Stage 2
                                </Link>
                            </div>
                        </div>

                        {/* 3. BRAND SECTION */}
                        <div>
                            <h4 className="font-serif text-2xl text-[#2C2420] mb-4">Brand</h4>
                            <div className="space-y-3 pl-2 border-l-2 border-stone-100">
                                <Link to="/pages/our-story" className="block text-sm font-medium text-stone-600 hover:text-[#D4AF37]" onClick={() => setIsMobileMenuOpen(false)}>
                                    Our Story
                                </Link>
                                <Link to="/pages/faq" className="block text-sm font-medium text-stone-600 hover:text-[#D4AF37]" onClick={() => setIsMobileMenuOpen(false)}>
                                    Preguntas Frecuentes
                                </Link>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="pt-4">
                            <Link
                                to="/fit-finder"
                                className="w-full bg-[#D4AF37] text-white font-bold uppercase tracking-widest text-xs py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#B49286] transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Encuentra tu Talla <ArrowRight size={16} />
                            </Link>
                        </div>

                    </nav>
                </div>

                {/* Guitar Member section removed as per request */}
            </div>
        </>
    );
}
