import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SeoHead } from './components/SeoHead';

export function NotFoundPage() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF9F6] px-6 text-center">
            <SeoHead title="Página No Encontrada | Fajas Guitar Curves" />

            <div className="mb-8 font-serif text-9xl font-bold text-[#D1AB66] opacity-20 select-none">
                404
            </div>

            <h1 className="font-serif text-4xl font-bold text-[#2C2420] mb-4 -mt-20 relative z-10">
                Esta página se perdió...<br />pero tu cintura no debería.
            </h1>

            <p className="text-stone-500 max-w-md mx-auto mb-8 text-lg">
                Te perdiste, pero no pierdas tu figura. Calcula tu talla exacta mientras arreglamos esto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/"
                    className="flex items-center justify-center gap-2 bg-[#2C2420] text-white px-8 py-3 rounded-full font-bold hover:bg-[#D1AB66] hover:text-[#2C2420] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Volver a la Tienda
                </Link>
                <Link
                    to="/tools/calculator"
                    className="flex items-center justify-center gap-2 bg-stone-200 text-[#2C2420] px-8 py-3 rounded-full font-bold hover:bg-[#D4AF37] hover:text-white transition-colors"
                >
                    🩺 Calcular mi Talla
                </Link>
            </div>
        </div>
    );
}
