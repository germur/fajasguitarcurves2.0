import { StoreProvider } from './hooks/useStoreContext';
import { StorefrontInner } from './StorefrontInner'; // We will extract the inner content to a new component to avoid context issues or just wrap the return

export function StorefrontLayout() {
    return (
        <StoreProvider>
            <StorefrontInner />
        </StoreProvider>
    );
}


