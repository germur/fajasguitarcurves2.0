
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

/**
 * Global Error Boundary specifically designed to catch ChunkLoadErrors.
 * When a new deployment happens, old chunks are deleted. Users with open tabs
 * allow the old index.html to request deleted chunks, causing a crash.
 * This boundary catches that error and forces a reload to get the new index.html.
 */
export class GlobalErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('GlobalErrorBoundary caught an error:', error, errorInfo);

        // Check if it's a ChunkLoadError (pattern: "Failed to fetch dynamically imported module")
        const isChunkError =
            error.message?.includes('Failed to fetch dynamically imported module') ||
            error.message?.includes('Importing a module script failed') ||
            error.name === 'ChunkLoadError';

        if (isChunkError) {
            console.warn('Chunk load error detected. Reloading page to fetch new version...');
            // Force a hard reload to get the new index.html which points to valid chunks
            window.location.reload();
        }
    }

    render() {
        if (this.state.hasError) {
            // For chunk errors, we reload immediately, so this UI might flash briefly or not at all.
            // For other errors, we can show a friendly fallback.
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
                    <h2 className="text-2xl font-bold mb-4">¡Ups! Algo salió mal.</h2>
                    <p className="mb-4 text-gray-600">Estamos actualizando la aplicación. Por favor, recarga la página.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                    >
                        Recargar Página
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
