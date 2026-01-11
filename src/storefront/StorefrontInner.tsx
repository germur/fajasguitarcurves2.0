import { Outlet, useLocation } from 'react-router-dom';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { LoginDrawer } from './components/LoginDrawer';
import { GlassNavbar } from './components/GlassNavbar';
import { DarkFooter } from './components/DarkFooter';

import { ScrollToTop } from './components/ScrollToTop';

export function StorefrontInner() {
    const location = useLocation();
    return (
        <div className="min-h-screen bg-[#FAF9F6] font-sans text-stone-900">
            <ScrollToTop />
            <CartDrawer />
            <SearchModal />
            <LoginDrawer />

            {/* THE GLASS RIBBON NAVBAR - Handles its own fixed positioning */}
            <GlassNavbar />

            {/* Main Content */}
            <main className={location.pathname === '/' ? '' : 'pt-24 md:pt-32'}>
                <Outlet />
            </main>

            {/* Global Footer (The Trust Foundation) */}
            <DarkFooter />
        </div>
    );
}
