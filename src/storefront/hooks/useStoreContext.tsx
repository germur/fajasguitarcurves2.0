
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getAllProducts, type StoreProduct } from '../data/store-data';
import { shopifyClient } from '../../lib/shopify-client';

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

export function StoreProvider({ children }: { children: ReactNode }) {
    // Initialize products directly
    const [products] = useState<StoreProduct[]>(getAllProducts());

    // Initialize cart from localStorage or Shopify
    const [cart, setCart] = useState<CartItem[]>([]);
    const [shopifyCartId, setShopifyCartId] = useState<string | null>(() => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('shopify_cart_id');
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    // Initialize Shopify Cart
    useEffect(() => {
        const initCart = async () => {
            if (shopifyCartId) {
                try {
                    const existingCart = await shopifyClient.checkout.fetch(shopifyCartId);
                    if (!existingCart || existingCart.completedAt) {
                        createNewCart();
                    } else {
                        updateLocalCartState(existingCart);
                    }
                } catch (e) {
                    console.error('Error fetching Shopify cart:', e);
                    createNewCart();
                }
            } else {
                createNewCart();
            }
        };

        initCart();
    }, [shopifyCartId]);

    const createNewCart = async () => {
        try {
            const newCart = await shopifyClient.checkout.create();
            setShopifyCartId(newCart.id as string);
            localStorage.setItem('shopify_cart_id', newCart.id as string);
            updateLocalCartState(newCart);
        } catch (e) {
            console.error('Error creating Shopify cart:', e);
        }
    };

    const updateLocalCartState = (shopifyCart: any) => {
        const items = shopifyCart.lineItems.map((item: any) => ({
            product: {
                id: item.variableValues?.lineItems?.[0]?.variantId || item.id, // Storefront API mapping might vary
                title: item.title,
                price: parseFloat(item.variant.price.amount),
                image: item.variant.image?.src || '',
                category: 'Shopify Product'
            } as StoreProduct,
            quantity: item.quantity,
            selectedSize: item.variant.title,
            lineId: item.id // Important for updates/removes
        }));
        setCart(items);
    };

    const addToCart = async (product: StoreProduct, size: string) => {
        if (!shopifyCartId) return;

        // Note: In a real implementation we need the Variant ID, not just product ID.
        // For now, we assume product.id IS the variant ID or we have logic to find it.
        // This is a crucial gap in Phase 22.

        setIsCartOpen(true);

        try {
            // Mocking variant ID fetch logic for demo
            const variantId = product.id; // Assuming ID passed IS variant ID for now

            const lineItemsToAdd = [
                {
                    variantId: variantId,
                    quantity: 1,
                    customAttributes: [{ key: "Size", value: size }]
                }
            ];

            const updatedCart = await shopifyClient.checkout.addLineItems(shopifyCartId, lineItemsToAdd);
            updateLocalCartState(updatedCart);
        } catch (e) {
            console.error('Error adding to Shopify cart:', e);
            alert('Could not add to cart. Check console.');
        }
    };

    // UI State Helpers
    const toggleCart = () => setIsCartOpen(prev => !prev);
    const toggleSearch = () => setIsSearchOpen(prev => !prev);
    const toggleLogin = () => setIsLoginOpen(prev => !prev);

    // Mock User Logic (Placeholder)
    const [user, setUser] = useState<User | null>(null);
    const login = () => {
        setUser({
            name: "Sofia Rodriguez",
            email: "sofia@example.com",
            measurements: { waist: 28, hips: 42, torso: 'Short' },
            recoveryStage: 1
        });
        setIsLoginOpen(false);
    };
    const logout = () => {
        setUser(null);
    };

    const removeFromCart = async (productId: string, size: string) => {
        // We need the lineItemId, stored in our local cart state mapping
        const item = cart.find(i => i.product.id === productId && i.selectedSize === size);
        if (!item || !('lineId' in item)) return;

        try {
            // @ts-ignore
            const updatedCart = await shopifyClient.checkout.removeLineItems(shopifyCartId, [item.lineId]);
            updateLocalCartState(updatedCart);
        } catch (e) {
            console.error('Error removing from Shopify cart:', e);
        }
    };

    const updateQuantity = async (productId: string, size: string, delta: number) => {
        const item = cart.find(i => i.product.id === productId && i.selectedSize === size);
        if (!item || !('lineId' in item)) return;

        const newQty = item.quantity + delta;
        if (newQty < 0) return;

        try {
            const lineItemsToUpdate = [
                {
                    // @ts-ignore
                    id: item.lineId,
                    quantity: newQty
                }
            ];
            const updatedCart = await shopifyClient.checkout.updateLineItems(shopifyCartId, lineItemsToUpdate);
            updateLocalCartState(updatedCart);
        } catch (e) {
            console.error('Error updating quantity:', e);
        }
    };

    const checkout = async () => {
        if (!shopifyCartId) return;
        try {
            const currentCart = await shopifyClient.checkout.fetch(shopifyCartId);
            if (currentCart && currentCart.webUrl) {
                window.location.href = currentCart.webUrl;
            }
        } catch (e) {
            console.error('Error diverting to checkout:', e);
        }
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
