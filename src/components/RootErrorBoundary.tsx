
import { useRouteError } from 'react-router-dom';
import { useEffect } from 'react';

export function RootErrorBoundary() {
    const error: any = useRouteError();

    useEffect(() => {
        // Check if the error is a chunk load error (deployment mismatch)
        // "Failed to fetch dynamically imported module" or "Importing a module script failed"
        const message = error?.message || '';
        const isChunkError =
            message.includes('dynamically imported module') ||
            message.includes('Importing a module script failed') ||
            message.includes('missing') ||
            error?.name === 'ChunkLoadError';

        if (isChunkError) {
            console.log('🔄 Version Mismatch Detected. Reloading App...');
            // Double check to prevent infinite reload loops if it's persistent (optional, but good practice)
            const lastReload = sessionStorage.getItem('chunk_reload');
            if (!lastReload || Date.now() - parseInt(lastReload) > 10000) {
                sessionStorage.setItem('chunk_reload', Date.now().toString());
                window.location.reload();
            }
        }
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] p-4 text-center">
            <div className="max-w-md">
                <h1 className="text-3xl font-serif text-[#2C2420] mb-4">Actualizando...</h1>
                <p className="text-stone-600 mb-6">
                    Hemos lanzado una nueva versión. Si esta pantalla no desaparece en unos segundos, por favor recarga manualmente.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-[#D4AF37] text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#B49286] transition-colors"
                >
                    Recargar Ahora
                </button>
                {/* Debug Info: EXPOSED */}
                <div className="mt-8 bg-red-50 p-4 rounded text-left border border-red-200">
                    <p className="text-xs text-red-800 font-bold mb-1">Error Técnico:</p>
                    <p className="text-[11px] text-red-600 font-mono break-all">
                        {error?.message || JSON.stringify(error) || 'Unknown Error'}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-2">
                        {error?.stack?.slice(0, 150)}...
                    </p>
                </div>
            </div>
        </div>
    );
}
