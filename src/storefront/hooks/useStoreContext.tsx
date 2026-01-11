
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
            // If no token is present, we can't use Shopify features.
            // In a real production app, we might fallback to a purely local cart.
            // For this demo, we'll just log a warning and avoid crashing.
            if (!shopifyClient.checkout) {
                console.warn("Shopify Client not initialized correctly (missing token?). Cart will not function.");
                return;
            }

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
                    // If fetch fails (e.g. invalid ID), create a new one
                    createNewCart();
                }
            } else {
                createNewCart();
            }
        };

        if (typeof window !== 'undefined') {
            initCart();
        }
    }, [shopifyCartId]);

    const createNewCart = async () => {
        if (!shopifyClient.checkout) return;
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
        if (!shopifyCart) return;
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
        if (!shopifyCartId) {
            console.error("No active Shopify Cart ID. Cannot add item.");
            // Try to recreate cart if missing
            if (shopifyClient.checkout) createNewCart().then(() => addToCart(product, size));
            return;
        }

        setIsCartOpen(true);

        try {
            let variantId: string | undefined = undefined;

            // 1. Try to find in local static data first
            if (product.variants && product.variants.length > 0) {
                const variant = product.variants.find(v => v.size === size);
                if (variant) {
                    variantId = variant.id;
                }
            }

            // 2. If not found locally, fetch real data from Shopify
            // This handles cases where JSON has Product ID but no Variant IDs
            if (!variantId && shopifyClient.product) {
                try {
                    // Try to fetch by ID (assuming product.id is a valid Shopify GID)
                    const shopifyProduct = await shopifyClient.product.fetch(product.id);

                    if (shopifyProduct && shopifyProduct.variants) {
                        // Find variant matching the size
                        const variant = shopifyProduct.variants.find((v: any) => {
                            // Match by variant title (e.g. "S", "Small")
                            if (v.title === size) return true;
                            // Or match by selected options (Name: Size, Value: S)
                            if (v.selectedOptions) {
                                return v.selectedOptions.some((opt: any) => opt.value === size);
                            }
                            return false;
                        });

                        if (variant) {
                            variantId = variant.id;
                            console.log(`Fetched real Variant ID for ${product.title} (${size}): ${variantId}`);
                        }
                    }
                } catch (fetchErr) {
                    console.warn(`Failed to fetch product ${product.id} from Shopify.`, fetchErr);
                }
            }

            if (!variantId) {
                // Fallback for demo/dev mode only: Use product ID if it looks like a mock
                if (!product.id.startsWith('gid://')) {
                    variantId = product.id; // Allow mock IDs for mock products
                } else {
                    console.error(`Could not find Variant ID for ${product.title} size ${size}`);
                    alert('Lo sentimos, no pudimos verificar el inventario para esta talla. Por favor intenta de nuevo.');
                    return;
                }
            }

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
            alert('Hubo un error al agregar el producto al carrito. Por favor intenta de nuevo.');
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
