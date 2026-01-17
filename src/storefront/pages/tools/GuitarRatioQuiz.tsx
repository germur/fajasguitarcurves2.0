import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';

// --- TYPES & LOGIC ---

type QuizStep = 'INTRO' | 'MEASURE' | 'QUESTIONS' | 'CALCULATING' | 'GATE' | 'RESULT';
type BodyType = 'TRUE_GUITAR' | 'POTENTIAL_GUITAR' | 'ATHLETIC_CURVE' | null;

interface ShapeResult {
    type: BodyType;
    title: string;
    description: string;
    recommendedProductId: string;
    recommendationTitle: string;
    productImage: string;
    size: string;
}

// Logic provided by USER
// Standard Colombian Faja Sizing
const SIZE_CHART = [
    { size: 'XXS', min: 22.1, max: 24.4 },
    { size: 'XS', min: 24.4, max: 26.7 },
    { size: 'S', min: 26.7, max: 28.3 },
    { size: 'M', min: 28.3, max: 30.7 },
    { size: 'L', min: 30.7, max: 33.1 },
    { size: 'XL', min: 33.1, max: 35.4 },
    { size: '2XL', min: 35.4, max: 37.8 },
    { size: '3XL', min: 37.8, max: 40.2 },
    { size: '4XL', min: 40.2, max: 42.5 },
    { size: '5XL', min: 42.5, max: 44.8 },
    { size: '6XL', min: 44.8, max: 47.2 },
];

const calculateSize = (waist: number): string => {
    const match = SIZE_CHART.find(s => waist >= s.min && waist < s.max);
    if (match) return match.size;
    if (waist < 22.1) return 'XXS';
    return '7XL+';
};

const calculateShape = (waist: number, hips: number): ShapeResult | null => {
    if (!waist || !hips || hips === 0) return null;
    const ratio = waist / hips;
    const size = calculateSize(waist);

    if (ratio < 0.65) {
        return {
            type: "TRUE_GUITAR",
            title: `¡Eres una Verdadera Guitarra! (Talla ${size}) 🎸`,
            description: `Tu cintura es significativamente más pequeña que tus caderas (Ratio de Oro). Según tu cintura de ${waist.toFixed(1)}", tu talla ideal es ${size}, pero necesitas el corte 'Signature Guitar' para acomodar tus caderas de ${hips.toFixed(1)}".`,
            recommendedProductId: "cinturilla-extrema-con-cremallera-y-clips-14-varillas",
            recommendationTitle: "Faja Reloj de Arena Stage 3",
            productImage: "/assets/quiz-result-guitar.jpg",
            size: size
        };
    } else if (ratio >= 0.65 && ratio <= 0.75) {
        return {
            type: "POTENTIAL_GUITAR",
            title: `Eres una Potencial Guitarra (Talla ${size}) ⏳`,
            description: `Tienes curvas naturales. Tu talla base es ${size}. Eres una 'Falsa S': pequeña de frente, pero necesitas espacio atrás. Con la compresión adecuada en cintura, alcanzarás el Ratio Guitarra.`,
            recommendedProductId: "faja-etapa-2-con-mangas-y-bra",
            recommendationTitle: "Cinturilla Extrema Reloj de Arena",
            productImage: "/assets/essentials-flatlay.jpg",
            size: size
        };
    } else {
        return {
            type: "ATHLETIC_CURVE",
            title: `Silueta Atlética (Talla ${size}) 📏`,
            description: `Tienes una figura balanceada. Tu talla para alta compresión es ${size}. Tu objetivo es crear la ilusión de curva mediante High Compression.`,
            recommendedProductId: "leggins-deportivo-ideal-para-uso-diario",
            recommendationTitle: "Faja Cinturilla de Avispa",
            productImage: "/assets/essentials-flatlay.jpg",
            size: size
        };
    }
};

// --- VISUALIZER COMPONENT ---

const DynamicSilhouette = ({ waist, hips }: { waist: number, hips: number }) => {
    // Normalize logic for visualization ensuring hips are wider
    // Base width 100px. Hips fixed at 80px visual width? 
    // Let's make it relative.
    // Base width 100px. Hips fixed at 80px visual width? 
    // Let's make it relative.


    // Simple SVG Path manipulation
    // M = Start top left shoulder area
    // Q = Curve for Waist
    // Q = Curve for Hips

    // A simplified hourglass path generator
    const waistWidth = (waist / hips) * 80; // Scale relative to fixed hip visual
    const hipWidth = 90;

    // Smooth transition
    return (
        <div className="h-64 w-full flex items-center justify-center py-4 transition-all duration-500">
            <svg width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
                <defs>
                    <linearGradient id="bodyGradient" x1="100" y1="0" x2="100" y2="300">
                        <stop offset="0%" stopColor="#C8A688" />
                        <stop offset="100%" stopColor="#8D5F3C" />
                    </linearGradient>
                </defs>
                {/* Dynamic Path Construction */}
                <path
                    d={`
                        M 60 50 
                        Q 60 100, ${100 - waistWidth / 2} 130 
                        Q ${100 - hipWidth / 2} 180, ${100 - hipWidth / 2} 220 
                        L ${100 + hipWidth / 2} 220
                        Q ${100 + hipWidth / 2} 180, ${100 + waistWidth / 2} 130
                        Q 140 100, 140 50
                        Z
                    `}
                    fill="url(#bodyGradient)"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                />
            </svg>
        </div>
    );
};


// ... (imports remain)

interface QuizProps {
    mode?: 'standalone' | 'modal';
    onComplete?: (size: string) => void;
    onClose?: () => void;
}

export default function GuitarRatioQuiz({ mode = 'standalone', onComplete, onClose }: QuizProps) {
    const [step, setStep] = useState<QuizStep>('INTRO');

    // ... (rest of state remains)
    const [waist, setWaist] = useState<number>(28);
    const [hips, setHips] = useState<number>(40);
    const [unit, setUnit] = useState<'IN' | 'CM'>('IN');
    const [q3, setQ3] = useState('');
    const [q4, setQ4] = useState('');
    const [email, setEmail] = useState('');
    const [result, setResult] = useState<ShapeResult | null>(null);

    // Scroll top on step change (Disabled in modal to avoid jumping context)
    useEffect(() => {
        if (mode === 'standalone') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [step, mode]);


    const handleCalculate = () => {
        setStep('CALCULATING');

        // NORMALIZE TO INCHES FOR LOGIC
        // The sizing logic (calculateShape) expects Inches.
        // If user is in CM, we convert: 1 inch = 2.54 cm
        const normalize = (val: number) => unit === 'CM' ? val / 2.54 : val;

        const wInches = normalize(waist);
        const hInches = normalize(hips);

        const res = calculateShape(wInches, hInches);
        setResult(res);

        setTimeout(() => {
            setStep('GATE');
        }, 2000);
    };

    const handleUnlockResult = (e: React.FormEvent) => {
        e.preventDefault();
        // Validation logic...
        if (!email.includes('@')) {
            alert("Por favor ingresa un email válido");
            return;
        }
        console.log(">>> SIMULACIÓN: Enviando resultados a:", email);
        console.log(">>> PAYLOAD:", { email, measurements: { waist, hips }, result });

        // Skip alert in modal for smoother flow
        if (mode === 'standalone') {
            alert(`¡Gracias! (Simulación) Hemos "enviado" tu resultado a ${email}.`);
        }
        setStep('RESULT');
    };

    // --- RENDERERS ---

    const renderIntro = () => {
        // Compact intro for Modal
        if (mode === 'modal') {
            return (
                <div className="text-center space-y-6 animate-fade-in py-4">
                    <h2 className="font-serif text-2xl text-[#2C2420]">
                        ¿Cuál es tu Talla Real?
                    </h2>
                    <p className="text-sm text-stone-600">
                        Usa nuestra tecnología de escaneo biométrico manual para encontrar tu ajuste perfecto en 30 segundos.
                    </p>
                    <button
                        onClick={() => setStep('MEASURE')}
                        className="w-full py-4 bg-[#2C2420] text-white font-bold tracking-widest uppercase rounded-xl hover:bg-[#D4AF37] transition-all"
                    >
                        Comenzar Diagnóstico
                    </button>
                    <div className="flex justify-center gap-6 text-[10px] text-stone-400 uppercase tracking-widest border-t border-stone-100 pt-4">
                        <span>⏱ 1 Minuto</span>
                        <span>🎯 98% Precisión</span>
                    </div>
                </div>
            );
        }

        // Standard Intro
        return (
            <div className="text-center space-y-8 animate-fade-in max-w-2xl mx-auto">
                {/* ... existing standard intro code ... */}
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-4">
                    Herramienta de Diagnóstico
                </span>
                <h1 className="font-serif text-4xl md:text-5xl text-[#2C2420] leading-tight">
                    ¿Eres una Falsa S o una <span className="italic text-[#D4AF37]">Verdadera Guitarra</span>?
                </h1>
                <p className="text-lg text-stone-600 leading-relaxed max-w-xl mx-auto">
                    Olvídate de las tallas genéricas. Descubre tu <strong>"Guitar Ratio"</strong> único y entiende por qué las fajas tradicionales nunca te han quedado bien.
                </p>

                <button
                    onClick={() => setStep('MEASURE')}
                    className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-[#2C2420] px-10 font-medium text-white transition-all duration-300 hover:bg-[#D4AF37] hover:w-64 hover:justify-between"
                >
                    <span className="mr-0 font-bold tracking-widest uppercase text-xs group-hover:mr-4">Descubrir mi Silueta</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1" />
                </button>

                <div className="pt-12 grid grid-cols-3 gap-4 border-t border-stone-100 max-w-lg mx-auto">
                    <div className="text-center">
                        <p className="text-2xl font-serif text-[#D4AF37]">97%</p>
                        <p className="text-[10px] uppercase tracking-wide text-stone-500">Precisión</p>
                    </div>
                    <div className="text-center border-l border-stone-100">
                        <p className="text-2xl font-serif text-[#D4AF37]">2min</p>
                        <p className="text-[10px] uppercase tracking-wide text-stone-500">Duración</p>
                    </div>
                    <div className="text-center border-l border-stone-100">
                        <p className="text-2xl font-serif text-[#D4AF37]">+5k</p>
                        <p className="text-[10px] uppercase tracking-wide text-stone-500">Analizadas</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderMeasure = () => (
        <div className={`grid ${mode === 'modal' ? 'grid-cols-1' : 'md:grid-cols-2'} gap-8 items-center animate-fade-in`}>
            {/* Visualizer Column - Smaller in Modal */}
            <div className={`bg-stone-100 rounded-[2rem] p-6 flex flex-col items-center justify-center relative ${mode === 'modal' ? 'h-[250px]' : 'min-h-[400px]'}`}>
                {/* ... (Keep existing visualization logic) ... */}
                <div className="absolute top-6 left-6 bg-white/80 backdrop-blur px-4 py-2 rounded-lg text-xs font-mono text-stone-500">
                    Ratio Actual: <span className="text-[#2C2420] font-bold text-lg">{(waist / hips).toFixed(2)}</span>
                </div>
                <DynamicSilhouette waist={waist} hips={hips} />
            </div>

            {/* Controls Column */}
            <div className="space-y-6">
                {/* ... (Controls logic remains mostly same, maybe tighter spacing) ... */}
                <div>
                    <h2 className="font-serif text-2xl text-[#2C2420] mb-2">Tus Medidas</h2>
                    {mode === 'standalone' && <p className="text-stone-500 text-sm">Ajusta los deslizadores para coincidir con tu cuerpo real.</p>}
                </div>

                {/* Unit Selector */}
                <div className="flex bg-stone-100 rounded-lg p-1 w-fit mb-4">
                    <button onClick={() => setUnit('IN')} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${unit === 'IN' ? 'bg-white shadow text-[#2C2420]' : 'text-stone-400'}`}>IN</button>
                    <button onClick={() => setUnit('CM')} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${unit === 'CM' ? 'bg-white shadow text-[#2C2420]' : 'text-stone-400'}`}>CM</button>
                </div>

                {/* Range Sliders (Simplified for brevity in diff, keep logic) */}
                <div>
                    <div className="flex justify-between mb-2">
                        <span className="font-bold text-xs uppercase">1. Cintura</span>
                        <span className="font-serif text-xl text-[#D4AF37]">{waist} <span className="text-[10px] text-stone-400">{unit}</span></span>
                    </div>
                    <input type="range" min={unit === 'IN' ? 20 : 50} max={unit === 'IN' ? 50 : 130} value={waist} onChange={(e) => setWaist(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-lg accent-[#2C2420]" />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <span className="font-bold text-xs uppercase">2. Cadera</span>
                        <span className="font-serif text-xl text-[#D4AF37]">{hips} <span className="text-[10px] text-stone-400">{unit}</span></span>
                    </div>
                    <input type="range" min={unit === 'IN' ? 30 : 80} max={unit === 'IN' ? 70 : 180} value={hips} onChange={(e) => setHips(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-lg accent-[#2C2420]" />
                </div>

                <div className="pt-4">
                    <button
                        onClick={() => setStep('QUESTIONS')}
                        disabled={hips <= waist}
                        className="w-full py-4 bg-[#2C2420] text-white font-bold tracking-widest uppercase rounded-xl hover:bg-[#D4AF37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {hips <= waist ? 'La cadera debe ser mayor' : 'Continuar'}
                    </button>
                </div>
            </div>
        </div>
    );

    // ... (renderQuestions and renderCalculating remain similar, just ensuring container fits) ...
    const renderQuestions = () => (
        <div className="max-w-xl mx-auto animate-fade-in space-y-6">
            <h2 className="font-serif text-2xl text-center text-[#2C2420]">Diagnóstico Rápido</h2>

            {/* Q3 */}
            <div className={`bg-white ${mode === 'modal' ? 'p-4' : 'p-6'} rounded-2xl shadow-sm border border-stone-100`}>
                <p className="font-bold text-[#2C2420] mb-2 text-sm">Problema frecuente:</p>
                <p className="text-stone-600 text-xs mb-4">¿Te quedan bien de cadera pero grandes de cintura?</p>
                <div className="space-y-2">
                    {['Siempre me pasa', 'Frecuentemente', 'A veces', 'Rara vez'].map(opt => (
                        <button key={opt} onClick={() => setQ3(opt)} className={`w-full text-left px-4 py-2 rounded-lg border text-xs transition-all ${q3 === opt ? 'border-[#D4AF37] bg-[#D4AF37]/5 font-bold' : 'border-stone-200 text-stone-500'}`}>{opt}</button>
                    ))}
                </div>
            </div>

            {/* Q4 (Simplified for modal if needed, but keeping for logic) */}
            <div className={`bg-white ${mode === 'modal' ? 'p-4' : 'p-6'} rounded-2xl shadow-sm border border-stone-100`}>
                <p className="font-bold text-[#2C2420] mb-2 text-sm">Objetivo Principal:</p>
                <p className="text-stone-600 text-xs mb-4">¿Buscas realzar y levantar tus glúteos?</p>
                <div className="space-y-2">
                    {['Sí, ¡absolutamente!', 'Sí, pero me da miedo', 'No, solo compresión', 'Reducir caderas'].map(opt => (
                        <button key={opt} onClick={() => setQ4(opt)} className={`w-full text-left px-4 py-2 rounded-lg border text-xs transition-all ${q4 === opt ? 'border-[#D4AF37] bg-[#D4AF37]/5 font-bold' : 'border-stone-200 text-stone-500'}`}>{opt}</button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleCalculate}
                disabled={!q3 || !q4}
                className="w-full py-4 bg-[#2C2420] text-white font-bold tracking-widest uppercase rounded-xl hover:bg-[#D4AF37] transition-all disabled:opacity-50"
            >
                Calcular Resultado
            </button>
        </div>
    );

    // ... renderCalculating() same logic ...
    const renderCalculating = () => (
        <div className="min-h-[300px] flex flex-col items-center justify-center animate-fade-in text-center">
            <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin mb-6" />
            <h3 className="font-serif text-xl text-[#2C2420] mb-2">Analizando...</h3>
        </div>
    );

    // ... renderGate() ...
    const renderGate = () => (
        <div className="max-w-xl mx-auto animate-fade-in relative">
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-10 flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-white/50">
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                <h2 className="font-serif text-2xl text-[#2C2420] mb-2">¡Resultado Listo!</h2>
                <p className="text-sm text-stone-600 mb-6 max-w-xs mx-auto">
                    Ingresa tu email para desbloquear tu recomendación de talla personalizada.
                </p>

                <form onSubmit={handleUnlockResult} className="w-full max-w-sm space-y-3">
                    <input
                        type="email"
                        placeholder="Tu email..."
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl border border-stone-300 focus:border-[#D4AF37] outline-none text-center"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#2C2420] text-white font-bold tracking-widest uppercase rounded-xl hover:bg-[#D4AF37] transition-all"
                    >
                        Ver Mi Talla
                    </button>
                </form>
            </div>
            {/* Background blur placeholder from original code... */}
            <div className="filter blur-sm opacity-50 pointer-events-none select-none h-[300px]">
                {/* Visual placeholder content */}
                <div className="w-full h-full bg-stone-200/50 rounded-2xl"></div>
            </div>
        </div>
    );


    const renderResult = () => {
        if (!result) return null;
        const calculatedSize = result.size;

        return (
            <div className="animate-slide-up">
                {/* Result Header */}
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl text-[#2C2420] mb-4 leading-tight">
                        {result.title}
                    </h1>
                    <div className="inline-block p-4 bg-[#F9F4E8] rounded-xl border border-[#D4AF37]/20">
                        <p className="text-sm text-stone-700 italic">
                            "{result.description}"
                        </p>
                    </div>
                </div>

                {/* THE DECISION BOX */}
                <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-stone-100 flex flex-col items-center text-center">

                    <div className="flex w-full justify-between items-center mb-8 bg-stone-50 p-4 rounded-xl">
                        <div className="text-left">
                            <p className="text-[10px] uppercase tracking-wide text-stone-400">Ratio</p>
                            <p className="text-2xl font-serif text-[#2C2420]">{(waist / hips).toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-wide text-stone-400">Talla Ideal</p>
                            <p className="text-4xl font-serif text-[#D4AF37] font-bold">{calculatedSize}</p>
                        </div>
                    </div>

                    {mode === 'modal' ? (
                        // MODAL MODE: Apply Size Logic
                        <div className="w-full space-y-3">
                            <button
                                onClick={() => onComplete && onComplete(calculatedSize)}
                                className="w-full py-4 bg-[#D4AF37] text-white font-bold tracking-[0.2em] text-sm uppercase rounded-xl hover:bg-[#2C2420] transition-transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 size={18} /> Aplicar Talla {calculatedSize}
                            </button>
                            <button onClick={onClose} className="text-xs text-stone-400 underline hover:text-[#2C2420]">
                                Cancelar y cerrar
                            </button>
                        </div>
                    ) : (
                        // STANDALONE MODE: Product Link + Cross Sell
                        <div className="w-full space-y-4">
                            <Link
                                to={`/products/${result.recommendedProductId}`}
                                className="w-full py-4 bg-[#D4AF37] text-white font-bold tracking-widest uppercase rounded-xl hover:bg-[#2C2420] transition-all shadow-xl flex items-center justify-center gap-3"
                            >
                                Comprar esta Faja <ArrowRight size={18} />
                            </Link>
                            <Link
                                to="/tools/stage1-vs-stage2"
                                className="block text-xs font-bold text-[#2C2420] underline mt-4"
                            >
                                Ver Comparativa Stage 1 vs 2
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={mode === 'standalone' ? "min-h-screen bg-[#FAF9F6] pt-12 pb-24 px-4 sm:px-6" : "w-full max-w-lg mx-auto bg-white p-0 md:p-2"}>
            <div className={mode === 'standalone' ? "max-w-5xl mx-auto" : ""}>

                {/* Header (Back button) - Only show in Standalone OR if deep in modal steps */}
                {step !== 'RESULT' && step !== 'INTRO' && (
                    <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
                        <button onClick={() => setStep('INTRO')} className="text-xs font-bold text-stone-400 hover:text-[#2C2420] uppercase tracking-widest flex items-center gap-2">
                            &larr; Reiniciar
                        </button>
                        <div className="flex gap-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${(step === 'MEASURE' && i === 1) || (step === 'QUESTIONS' && i === 2) || (step === 'GATE' && i === 3) ? 'bg-[#D4AF37]' : 'bg-stone-200'}`} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Route to Standard Header in Standalone Only */}
                {mode === 'standalone' && step !== 'RESULT' && step === 'INTRO' && (
                    <div className="flex justify-between items-center mb-12 border-b border-stone-200 pb-6">
                        <Link to="/" className="text-xs font-bold text-stone-400 hover:text-[#2C2420] transition-colors uppercase tracking-widest flex items-center gap-2">
                            <ChevronRight className="rotate-180" size={14} /> Volver
                        </Link>
                    </div>
                )}

                {step === 'INTRO' && renderIntro()}
                {step === 'MEASURE' && renderMeasure()}
                {step === 'QUESTIONS' && renderQuestions()}
                {step === 'CALCULATING' && renderCalculating()}
                {step === 'GATE' && renderGate()}
                {step === 'RESULT' && renderResult()}
            </div>
        </div>
    );
}
