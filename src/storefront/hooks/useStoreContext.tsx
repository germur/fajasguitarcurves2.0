
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getAllProducts, type StoreProduct } from '../data/store-data';
import { shopifyClient, createCart, fetchCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, updateCartLines } from '../../lib/shopify-client';

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
    lineId?: string; // Added optional property for TS check
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
                    const existingCart = await fetchCart(shopifyCartId);
                    if (!existingCart) {
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
        try {
            const newCart = await createCart();
            if (newCart) {
                setShopifyCartId(newCart.id as string);
                localStorage.setItem('shopify_cart_id', newCart.id as string);
                updateLocalCartState(newCart);
            }
        } catch (e) {
            console.error('Error creating Shopify cart:', e);
        }
    };

    const updateLocalCartState = (shopifyCart: any) => {
        if (!shopifyCart || !shopifyCart.lines) return;

        const edges = shopifyCart.lines.edges || [];

        const items = edges.map((edge: any) => {
            const item = edge.node;
            const variant = item.merchandise;

            // Handle potential missing data gracefully
            if (!variant) return null;

            return {
                product: {
                    id: variant.product?.id || variant.id,
                    title: variant.product?.title || variant.title || 'Unknown Product',
                    price: parseFloat(variant.price?.amount || '0'),
                    image: variant.image?.url || '',
                    category: 'Shopify Product'
                } as StoreProduct,
                quantity: item.quantity,
                selectedSize: variant.title === 'Default Title' ? 'One Size' : variant.title,
                lineId: item.id // Important for updates/removes
            };
        }).filter(Boolean) as CartItem[]; // Filter out nulls

        setCart(items);
    };

    const addToCart = async (product: StoreProduct, size: string) => {
        setIsCartOpen(true);

        let targetCartId = shopifyCartId;

        if (!targetCartId) {
            try {
                const newCart = await createCart();
                if (newCart) {
                    targetCartId = newCart.id;
                    setShopifyCartId(newCart.id);
                    localStorage.setItem('shopify_cart_id', newCart.id);
                } else {
                    throw new Error("Failed to create initialized cart");
                }
            } catch (e) {
                console.error("Cart creation failed on add", e);
                return;
            }
        }

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
                    merchandiseId: variantId,
                    quantity: 1,
                    attributes: [{ key: "Size", value: size }]
                }
            ];

            const updatedCart = await apiAddToCart(targetCartId!, lineItemsToAdd);
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
        if (!shopifyCartId) return;
        // We need the lineItemId, stored in our local cart state mapping
        const item = cart.find(i => i.product.id === productId && i.selectedSize === size);
        // @ts-ignore - lineId is added in custom mapping
        if (!item || !item.lineId) return;

        try {
            // @ts-ignore
            const updatedCart = await apiRemoveFromCart(shopifyCartId, [item.lineId]);
            updateLocalCartState(updatedCart);
        } catch (e) {
            console.error('Error removing from Shopify cart:', e);
        }
    };

    const updateQuantity = async (productId: string, size: string, delta: number) => {
        if (!shopifyCartId) return;
        const item = cart.find(i => i.product.id === productId && i.selectedSize === size);
        // @ts-ignore
        if (!item || !item.lineId) return;

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
            const updatedCart = await updateCartLines(shopifyCartId, lineItemsToUpdate);
            updateLocalCartState(updatedCart);
        } catch (e) {
            console.error('Error updating quantity:', e);
        }
    };

    const checkout = async () => {
        if (!shopifyCartId) return;
        try {
            const currentCart = await fetchCart(shopifyCartId);
            if (currentCart && currentCart.checkoutUrl) {
                // NETLIFY PROXY STRATEGY (Status 200)
                // We use the relative path so Netlify intercepts it via netlify.toml proxy rules.
                // We MUST append auto_redirect=false to prevent Shopify from redirecting back to primary domain.
                try {
                    const url = new URL(currentCart.checkoutUrl);
                    // Force relative path to trigger Netlify Proxy
                    const relativePath = url.pathname + url.search;

                    // Add params to inner URL
                    const params = new URLSearchParams(url.search);
                    params.set('auto_redirect', 'false');
                    params.set('skip_shop_pay', 'true');

                    window.location.href = `${url.pathname}?${params.toString()}`;
                } catch (e) {
                    console.error("Error constructing proxy URL, falling back to absolute", e);
                    window.location.href = currentCart.checkoutUrl;
                }
            } else {
                console.error("No checkout URL found in cart");
                alert("Error iniciando el pago. Por favor intenta de nuevo.");
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
