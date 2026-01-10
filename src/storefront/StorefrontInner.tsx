import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { useStore } from './hooks/useStoreContext';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { LoginDrawer } from './components/LoginDrawer';

export function StorefrontInner() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartCount, toggleCart, toggleSearch, toggleLogin, user } = useStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll state for header styling
    const [isScrolled, setIsScrolled] = useState(false);

    // Add scroll listener
    if (typeof window !== 'undefined') {
        window.onscroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
    }

    const handleUserClick = () => {
        if (user) {
            navigate('/store/account');
        } else {
            toggleLogin();
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] font-sans text-stone-900 pt-[calc(30px+80px)]"> {/* Padding for Fixed Header + TopBar */}
            <CartDrawer />
            <SearchModal />
            <LoginDrawer />

            {/* TOP BAR: Conversion Driver */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-[#2C2420] text-[#F5EDDF] text-[10px] md:text-xs py-2 text-center font-bold tracking-widest uppercase">
                <span>Envíos y Cambios Gratis en USA 🇺🇸 | Habla con una Experta 👩‍⚕️</span>
            </div>

            {/* Mobile Menu Drawer */}
            <div
                className={`
                    fixed inset-0 z-[60] transform transition-transform duration-300 md:hidden
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="absolute inset-0 bg-[#2C2420]/90 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                <div className="relative w-3/4 max-w-sm h-full bg-white shadow-xl flex flex-col p-6">
                    <div className="flex justify-between items-center mb-8">
                        <Link to="/store" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#2C2420] text-[#F5EDDF] flex items-center justify-center font-bold font-serif text-lg">G</div>
                            <span className="font-serif text-lg font-bold text-[#2C2420]">Guitar Curves</span>
                        </Link>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-stone-500">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-4 text-lg font-medium text-stone-600">
                        <Link to="/store/medical" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#A35944]">Línea Médica</Link>
                        <Link to="/store/guitar-curves" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#A35944]">Signature</Link>
                        <Link to="/store/lifestyle" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#A35944]">Uso Diario</Link>
                        <Link to="/store/solutions" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#A35944]">Soluciones</Link>
                        <Link to="/store/institute" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#A35944]">El Instituto</Link>
                    </nav>
                </div>
            </div>

            {/* Global Header */}
            <header
                className={`fixed top-[30px] left-0 right-0 z-40 transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 border-stone-200' : 'bg-[#FAF9F6] py-4 border-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

                    {/* 1. Mobile & Search */}
                    <div className="flex items-center gap-4 w-1/4">
                        <button
                            className="md:hidden p-2 -ml-2 text-stone-600 hover:text-stone-900"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <button
                            onClick={toggleSearch}
                            className="p-2 text-stone-500 hover:text-[#B49286] transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </div>

                    {/* 2. Logo (Centered) */}
                    <div className="flex justify-center w-2/4">
                        <Link to="/store" className="flex flex-col items-center group">
                            <div className={`transition-all duration-300 ${isScrolled ? 'scale-75' : 'scale-100'}`}>
                                <div className="w-8 h-8 rounded-full bg-[#2C2420] text-[#F5EDDF] flex items-center justify-center font-bold font-serif text-lg">G</div>
                            </div>
                            <span className={`font-serif font-bold tracking-[0.2em] text-[#2C2420] mt-1 transition-all duration-300 ${isScrolled ? 'text-xs' : 'text-sm'}`}>
                                GUITAR CURVES
                            </span>
                        </Link>
                    </div>

                    {/* 3. Actions (User & Cart) */}
                    <div className="flex justify-end items-center gap-2 md:gap-4 w-1/4">
                        <button
                            onClick={handleUserClick}
                            className="hidden sm:block p-2 text-stone-500 hover:text-[#B49286] transition-colors"
                        >
                            <User className="w-5 h-5" />
                        </button>
                        <button
                            onClick={toggleCart}
                            className="relative p-2 text-stone-900 hover:text-[#B49286] transition-colors"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-0 w-4 h-4 bg-[#B49286] text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation (Mega Menu Strip) */}
                <div className={`hidden md:flex justify-center border-t border-stone-100 transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
                    <nav className="flex items-center space-x-8 h-full">
                        <NavLink to="/store/medical" label="Línea Médica" active={location.pathname.includes('/medical')} />
                        <NavLink to="/store/guitar-curves" label="Signature" active={location.pathname.includes('/guitar-curves')} />
                        <NavLink to="/store/lifestyle" label="Uso Diario" active={location.pathname.includes('/lifestyle')} />
                        <NavLink to="/store/solutions" label="Soluciones" active={location.pathname.includes('/solutions')} />
                        <NavLink to="/store/institute" label="El Instituto" active={location.pathname.includes('/institute')} />
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <Outlet />
            </main>

            {/* Global Footer */}
            <footer className="bg-[#2C2420] text-[#F5EDDF] pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
                        <div>
                            <h3 className="font-serif text-xl font-bold mb-4">Fajas Guitar Curves</h3>
                            <p className="text-stone-400 text-sm leading-relaxed">
                                Redefiniendo la recuperación post-quirúrgica con precisión médica y estética de alta moda.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#B49286]">Tienda</h4>
                            <ul className="space-y-2 text-sm text-stone-400">
                                <li><Link to="/store/medical" className="hover:text-white transition-colors">Grado Médico</Link></li>
                                <li><Link to="/store/guitar-curves" className="hover:text-white transition-colors">Guitar Curves</Link></li>
                                <li><Link to="/store/lifestyle" className="hover:text-white transition-colors">Uso Diario</Link></li>
                                <li><Link to="/store/solutions" className="hover:text-white transition-colors">Soluciones</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#B49286]">Info Médica</h4>
                            <ul className="space-y-2 text-sm text-stone-400">
                                <li><Link to="/store/institute" className="hover:text-white transition-colors">Guía de Etapas</Link></li>
                                <li><Link to="/store/institute" className="hover:text-white transition-colors">Aprobación Médica</Link></li>
                                <li><Link to="/store/medical" className="hover:text-white transition-colors">Encuentra tu Talla</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#B49286]">Soporte</h4>
                            <ul className="space-y-2 text-sm text-stone-400">
                                <li><Link to="/store/shipping" className="hover:text-white transition-colors cursor-pointer">Rastear Orden</Link></li>
                                <li><Link to="/store/returns" className="hover:text-white transition-colors cursor-pointer">Portal de Retornos</Link></li>
                                <li><Link to="/store/about" className="hover:text-white transition-colors">Contáctanos</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#B49286]">Local</h4>
                            <p className="text-stone-400 text-sm mb-3">📍 Visita nuestro Showroom en Brooklyn</p>
                            <div className="w-full h-32 bg-stone-800 rounded-lg overflow-hidden relative group cursor-pointer">
                                {/* Pseudomap */}
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop"
                                    alt="Map"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-[#B49286] text-white text-[10px] font-bold px-2 py-1 rounded">CÓMO LLEGAR</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
                        <p>&copy; 2026 Fajas Guitar Curves. All rights reserved.</p>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <Link to="/store/privacy" className="hover:text-white cursor-pointer">Política de Privacidad</Link>
                            <Link to="/store/terms" className="hover:text-white cursor-pointer">Términos de Servicio</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
    return (
        <Link
            to={to}
            className={`
        text-sm font-medium transition-colors
        ${active ? 'text-[#B49286]' : 'text-stone-500 hover:text-stone-900'}
      `}
        >
            {label}
        </Link>
    )
}
