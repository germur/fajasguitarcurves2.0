
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getAllProducts, type StoreProduct } from '../data/store-data';

interface User {
    name: string;
    email: string;
    avatar?: string;
    measurements?: {
        waist: number;
        hips: number;
        torso: 'Short' | 'Long';
    };
    recoveryStage?: number; // 1 or 2
}

interface CartItem {
    product: StoreProduct;
    quantity: number;
    selectedSize: string;
}

interface StoreContextType {
    products: StoreProduct[];
    cart: CartItem[];
    addToCart: (product: StoreProduct, size: string) => void;
    removeFromCart: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, delta: number) => void;
    cartTotal: number;
    cartCount: number;
    isCartOpen: boolean;
    toggleCart: () => void;
    checkout: () => Promise<void>;
    isSearchOpen: boolean;
    toggleSearch: () => void;
    // User / Login
    user: User | null;
    isLoginOpen: boolean;
    toggleLogin: () => void;
    login: () => void; // Mock login
    logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'fajas-gc-cart';

export function StoreProvider({ children }: { children: ReactNode }) {
    // Initialize products directly
    const [products] = useState<StoreProduct[]>(getAllProducts());

    // Initialize cart from localStorage
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === 'undefined') return [];
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to load cart', e);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    // Initialize user from localStorage
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window === 'undefined') return null;
        try {
            const saved = localStorage.getItem('fajas-gc-user');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error('Failed to load user', e);
            return null;
        }
    });

    // Persist cart changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (e) {
            console.error('Failed to save cart', e);
        }
    }, [cart]);

    const addToCart = (product: StoreProduct, size: string) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id && item.selectedSize === size);
            if (existing) {
                return prev.map(item =>
                    (item.product.id === product.id && item.selectedSize === size)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1, selectedSize: size }];
        });
        setIsCartOpen(true); // Open drawer on add
    };

    const removeFromCart = (productId: string, size: string) => {
        setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
    };

    const updateQuantity = (productId: string, size: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.product.id === productId && item.selectedSize === size) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const toggleCart = () => setIsCartOpen(prev => !prev);
    const toggleSearch = () => setIsSearchOpen(prev => !prev);
    const toggleLogin = () => setIsLoginOpen(prev => !prev);

    const login = () => {
        // Mock User
        const mockUser: User = {
            name: "Isabella",
            email: "isabella@example.com",
            measurements: {
                waist: 28,
                hips: 42,
                torso: 'Short'
            },
            recoveryStage: 2
        };
        setUser(mockUser);
        localStorage.setItem('fajas-gc-user', JSON.stringify(mockUser));
        setIsLoginOpen(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('fajas-gc-user');
    };

    const checkout = async () => {
        console.log('Proceeding to checkout with items:', cart);
        // TODO: Implement Shopify Storefront API checkout mutation here
        alert('Checkout functionality coming soon! (Shopify Integration)');
    };

    const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <StoreContext.Provider value={{
            products,
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            cartTotal,
            cartCount,
            isCartOpen,
            toggleCart,
            checkout,
            isSearchOpen,
            toggleSearch,
            user,
            isLoginOpen,
            toggleLogin,
            login,
            logout
        }}>
            {children}
        </StoreContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
