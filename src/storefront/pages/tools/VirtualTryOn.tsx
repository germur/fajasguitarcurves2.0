import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, Camera, ArrowRight, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- TYPES ---
type TryOnStep = 'UPLOAD' | 'SELECT_PRODUCT' | 'PROCESSING' | 'RESULT';

const PRODUCTS = [
    { id: 'faja-stage-2', name: 'Faja Reloj de Arena (Stage 2)', img: '/assets/stage2-faja-bra.jpg' },
    { id: 'cinturilla', name: 'Cinturilla Extrema', img: '/assets/essentials-flatlay.jpg' },
    { id: 'sculpt-bodysuit', name: 'Sculpt Bodysuit', img: '/assets/recovery-hands.png' }
];

export default function VirtualTryOn() {
    const [step, setStep] = useState<TryOnStep>('UPLOAD');
    const [userImage, setUserImage] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [sliderPos, setSliderPos] = useState(50);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- HANDLERS ---
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setUserImage(ev.target?.result as string);
                setStep('SELECT_PRODUCT');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProcess = () => {
        setStep('PROCESSING');
        // Simulate AI Processing time
        setTimeout(() => {
            setStep('RESULT');
        }, 3500);
    };

    // --- RENDERERS ---

    const renderUpload = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="max-w-xl mx-auto text-center"
        >
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-stone-100">
                <div className="w-20 h-20 bg-[#F9F4E8] rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37]">
                    <Camera size={32} />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl text-[#2C2420] mb-4">Probador Virtual I.A.</h1>
                <p className="text-stone-600 mb-8 max-w-sm mx-auto">
                    Sube una foto de cuerpo completo y deja que nuestra Inteligencia Artificial te muestre cómo te quedará tu faja.
                </p>

                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#D4AF37]/30 rounded-2xl p-8 cursor-pointer hover:bg-[#F9F4E8] transition-colors group"
                >
                    <Upload className="mx-auto text-stone-400 group-hover:text-[#D4AF37] mb-4 transition-colors" />
                    <p className="font-bold text-[#2C2420]">Sube tu foto aquí</p>
                    <p className="text-xs text-stone-500 mt-2">JPG, PNG (Max 5MB)</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                </div>

                <div className="mt-6 flex justify-center gap-4 text-[10px] text-stone-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Sparkles size={10} /> Privado & Seguro</span>
                    <span className="flex items-center gap-1"><Sparkles size={10} /> Borrado en 24h</span>
                </div>
            </div>
        </motion.div>
    );

    const renderSelectProduct = () => (
        <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl mx-auto"
        >
            <button onClick={() => setStep('UPLOAD')} className="text-xs text-stone-500 mb-4 hover:text-[#2C2420] flex items-center gap-2">&larr; Cambiar foto</button>

            <h2 className="font-serif text-3xl text-[#2C2420] text-center mb-8">Elige tu Faja</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PRODUCTS.map(p => (
                    <div
                        key={p.id}
                        onClick={() => setSelectedProduct(p.id)}
                        className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${selectedProduct === p.id ? 'border-[#D4AF37] shadow-lg scale-105' : 'border-transparent shadow-sm hover:shadow-md'}`}
                    >
                        <div className="h-40 bg-stone-200">
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 text-center">
                            <p className="font-bold text-sm text-[#2C2420] leading-tight">{p.name}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 text-center">
                <button
                    onClick={handleProcess}
                    disabled={!selectedProduct}
                    className="px-10 py-4 bg-[#2C2420] text-white font-bold tracking-widest uppercase rounded-full hover:bg-[#D4AF37] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                >
                    Generar Probador
                </button>
            </div>
        </motion.div>
    );

    const renderProcessing = () => (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center"
        >
            <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 border-4 border-stone-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#D4AF37] rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-[#D4AF37] animate-pulse" size={32} />
                </div>
            </div>
            <h2 className="font-serif text-2xl text-[#2C2420] mb-2 animate-pulse">La IA está trabajando...</h2>
            <p className="text-stone-500 text-sm">Escaneando silueta • Ajustando compresión • Renderizando</p>
        </motion.div>
    );

    const renderResult = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl md:text-3xl text-[#2C2420]">Tu Resultado</h2>
                <button
                    onClick={() => {
                        setStep('UPLOAD');
                        setUserImage(null);
                        setSelectedProduct(null);
                    }}
                    className="text-xs font-bold text-[#2C2420] bg-white px-4 py-2 rounded-full shadow-sm hover:bg-stone-50 flex items-center gap-2"
                >
                    <RefreshCcw size={14} /> Nueva Prueba
                </button>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative aspect-[3/4] md:aspect-video select-none">

                {/* AFTER IMAGE (Background) - In a real implementation, this comes from API */}
                <div className="absolute inset-0">
                    <img
                        src="/assets/slider-after-final.png" // Fallback simulation
                        alt="Resultado After"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[#2C2420] text-white text-xs font-bold px-3 py-1 rounded">
                        Con Guitar Curves
                    </div>
                </div>

                {/* BEFORE IMAGE (Foreground - Clipped) */}
                <div
                    className="absolute inset-0 border-r-2 border-white overflow-hidden bg-stone-100"
                    style={{ width: `${sliderPos}%` }}
                >
                    {userImage ? (
                        <img
                            src={userImage}
                            alt="Tu foto original"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400">Error cargando imagen</div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur text-stone-600 text-xs font-bold px-3 py-1 rounded">
                        Original
                    </div>
                </div>

                {/* SLIDER HANDLE */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-transparent cursor-grab active:cursor-grabbing z-10"
                    style={{ left: `${sliderPos}%` }}
                    onMouseDown={(e) => {
                        const slider = e.currentTarget.parentElement;
                        const handleMove = (ev: MouseEvent) => {
                            if (!slider) return;
                            const rect = slider.getBoundingClientRect();
                            const x = Math.max(0, Math.min(ev.clientX - rect.left, rect.width));
                            setSliderPos((x / rect.width) * 100);
                        };
                        const handleUp = () => {
                            window.removeEventListener('mousemove', handleMove);
                            window.removeEventListener('mouseup', handleUp);
                        };
                        window.addEventListener('mousemove', handleMove);
                        window.addEventListener('mouseup', handleUp);
                    }}
                    onTouchMove={(e) => {
                        const slider = e.currentTarget.parentElement;
                        if (!slider) return;
                        const rect = slider.getBoundingClientRect();
                        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                        setSliderPos((x / rect.width) * 100);
                    }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#2C2420] cursor-grab">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 absolute"><path d="m9 18 6-6-6-6" /></svg>
                    </div>
                </div>

            </div>

            <div className="mt-8 text-center max-w-lg mx-auto">
                <p className="text-stone-500 mb-6 italic">
                    *Esta es una simulación basada en IA. El resultado real puede variar según la compresión elegida.
                </p>
                <Link
                    to={selectedProduct === 'faja-stage-2' ? '/collections/recovery' : '/collections/bras'}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-white font-bold uppercase tracking-widest rounded-full hover:bg-[#2C2420] transition-all shadow-xl"
                >
                    Comprar este Look <ArrowRight size={18} />
                </Link>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <AnimatePresence mode='wait'>
                    {step === 'UPLOAD' && renderUpload()}
                    {step === 'SELECT_PRODUCT' && renderSelectProduct()}
                    {step === 'PROCESSING' && renderProcessing()}
                    {step === 'RESULT' && renderResult()}
                </AnimatePresence>
            </div>
        </div>
    );
}
