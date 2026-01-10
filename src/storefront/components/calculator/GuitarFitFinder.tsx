import React, { useState, useMemo } from 'react';
import { Ruler, Info, ArrowRight, RotateCcw, AlertCircle, ChevronLeft } from 'lucide-react';
import type { Unit, Recommendation, Measurements } from './types';
import { SIZE_DATA } from './constants';
import ProgressBar from './ProgressBar';

const GuitarFitFinder: React.FC = () => {
    // 0:Intro, 1:Cintura, 2:Cadera, 3:Resultado
    const [step, setStep] = useState(0);
    const [measurements, setMeasurements] = useState<Measurements>({ waist: '', hip: '' });
    const [unit, setUnit] = useState<Unit>('in');
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Business Logic Engine
    const recommendation = useMemo((): Recommendation | null => {
        if (!measurements.waist || !measurements.hip) return null;

        let w = parseFloat(measurements.waist);
        let h = parseFloat(measurements.hip);

        if (isNaN(w) || isNaN(h)) return null;

        // Normalize to Inches for internal logic
        if (unit === 'cm') {
            w = w / 2.54;
            h = h / 2.54;
        }

        // Find Base Size by Waist
        const baseSize = SIZE_DATA.find(s => w >= s.waistMin && w <= s.waistMax);

        if (!baseSize) {
            if (w < 23) return {
                size: '', displayLabel: '', line: '', description: '', badgeText: '', badgeColor: '', borderColor: '',
                type: 'underflow',
                msg: 'Para cinturas menores a 23", contáctanos para nuestra línea Petite exclusiva.'
            };
            if (w > 51) return {
                size: '', displayLabel: '', line: '', description: '', badgeText: '', badgeColor: '', borderColor: '',
                type: 'overflow',
                msg: 'Para medidas superiores a 51", explora nuestra colección Plus Size personalizada.'
            };
            return null;
        }

        // Logic: Compare Hip to Standard Max
        const isGuitar = h > baseSize.stdHipMax;

        // Determine Line based on Measurement
        let result: Recommendation = {
            size: baseSize.label,
            displayLabel: baseSize.label,
            line: 'Línea Uso Diario (Standard Fit)',
            description: `Tu medida de cadera (${h.toFixed(1)}") entra en el rango estándar para tu cintura. Tu silueta es balanceada.`,
            badgeText: 'Ajuste Estándar',
            badgeColor: 'bg-stone-200 text-stone-700',
            borderColor: 'border-stone-300',
        };

        if (isGuitar) {
            // Guitar Curves Detected
            result.line = 'Línea Guitar Curves (Reloj de Arena)';
            result.displayLabel = baseSize.dualLabel || baseSize.label;
            result.description = `Tu cadera (${h.toFixed(1)}") excede el promedio estándar (${baseSize.stdHipMax}"). Necesitas el corte curvo Guitar Tech para evitar aplastamiento en glúteos.`;
            result.badgeText = '✨ Fit Guitarra Detectado';
            result.badgeColor = 'bg-[#D1AB66]/10 text-[#A35944] border-[#D1AB66]/30';
            result.borderColor = 'border-[#D1AB66]';
            result.isGuitar = true;
        }

        return result;
    }, [measurements, unit]);

    const changeStep = (direction: number) => {
        setError(null);
        if (direction === 1) {
            if (step === 1 && !measurements.waist) { setError('Por favor ingresa tu cintura.'); return; }
            if (step === 2 && !measurements.hip) { setError('Por favor ingresa tu cadera.'); return; }
        }

        setIsAnimating(true);
        setTimeout(() => {
            setStep(prev => prev + direction);
            setIsAnimating(false);
        }, 300);
    };

    const handleRestart = () => {
        setMeasurements({ waist: '', hip: '' });
        setStep(0);
        setError(null);
    };

    const renderMeasurementInput = (type: 'waist' | 'hip', label: string, info: string) => (
        <div className="space-y-8 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
                <button onClick={() => changeStep(-1)} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400">
                    <ChevronLeft size={24} />
                </button>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{type === 'waist' ? 'Paso 1' : 'Paso 2'}</span>
                <div className="w-10"></div>
            </div>

            <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-[#2C2420]">{label}</h3>
                <div className="bg-[#FAF9F6] p-4 rounded-2xl flex gap-3 text-left border border-stone-100">
                    <Info className="text-[#D1AB66] shrink-0 mt-0.5" size={18} />
                    <p className="text-xs text-stone-600 leading-relaxed">{info}</p>
                </div>
            </div>

            <div className="relative py-8">
                <input
                    type="number"
                    value={measurements[type]}
                    onChange={(e) => setMeasurements({ ...measurements, [type]: e.target.value })}
                    placeholder={unit === 'in' ? (type === 'waist' ? '30' : '40') : (type === 'waist' ? '76' : '102')}
                    className="w-full text-center text-7xl font-black py-4 border-b-4 border-stone-200 bg-transparent focus:outline-none focus:border-[#D1AB66] placeholder-stone-200 text-[#2C2420] transition-colors"
                    autoFocus
                />
                <span className="absolute right-10 top-1/2 -translate-y-1/2 text-stone-300 font-bold text-xl uppercase tracking-tighter">{unit}</span>
            </div>

            {error && <div className="text-red-500 text-xs text-center bg-red-50 p-3 rounded-xl flex items-center justify-center gap-2 animate-fade-in"><AlertCircle size={14} /> {error}</div>}

            <button
                onClick={() => changeStep(1)}
                className="w-full bg-[#2C2420] text-[#F5EDDF] font-bold py-5 rounded-2xl mt-auto shadow-lg hover:bg-black transition-all flex justify-center items-center gap-2"
            >
                Continuar <ArrowRight size={18} />
            </button>
        </div>
    );

    return (
        <div className="font-sans text-[#2C2420] max-w-md mx-auto my-6 px-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden relative min-h-[600px] flex flex-col transition-all duration-500">

                {/* Header Branding */}
                <div className="bg-[#2C2420] p-4 text-center">
                    <h2 className="text-[#F5EDDF] text-xs font-bold tracking-[0.3em] uppercase">Guitar Curves</h2>
                    <p className="text-[#D1AB66] text-[9px] font-bold uppercase tracking-widest mt-0.5">Calculadora de Talla</p>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col">
                    {step > 0 && step < 3 && <ProgressBar step={step} totalSteps={3} />}

                    <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>

                        {/* STEP 0: INTRO */}
                        {step === 0 && (
                            <div className="text-center space-y-6 flex-1 flex flex-col justify-center">
                                <div className="w-24 h-24 bg-[#FAF9F6] rounded-full mx-auto flex items-center justify-center shadow-inner mb-2 border border-stone-100">
                                    <Ruler size={40} className="text-[#D1AB66]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-[#2C2420] mb-3">Tu Talla Perfecta</h3>
                                    <p className="text-stone-500 text-sm px-2 leading-relaxed">
                                        Olvida las tablas genéricas. Analizamos la diferencia entre cintura y cadera para recomendarte el ajuste exacto.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center gap-3 w-full">
                                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Elige tus unidades</p>
                                    <div className="flex bg-stone-50 p-1.5 rounded-full w-full border border-stone-100">
                                        <button
                                            onClick={() => setUnit('cm')}
                                            className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${unit === 'cm' ? 'bg-[#2C2420] text-white shadow-md' : 'text-stone-400 hover:text-[#2C2420]'}`}
                                        >
                                            CM
                                        </button>
                                        <button
                                            onClick={() => setUnit('in')}
                                            className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${unit === 'in' ? 'bg-[#2C2420] text-white shadow-md' : 'text-stone-400 hover:text-[#2C2420]'}`}
                                        >
                                            Pulgadas
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => changeStep(1)}
                                    className="w-full bg-[#D1AB66] hover:bg-[#c49a4a] text-[#2C2420] font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl transform transition hover:-translate-y-1 flex items-center justify-center gap-3 mt-auto"
                                >
                                    CALCULAR MI TALLA <ArrowRight size={20} />
                                </button>
                            </div>
                        )}

                        {/* STEP 1: WAIST */}
                        {step === 1 && renderMeasurementInput('waist', 'Mide tu Cintura', 'Pasa la cinta por encima del ombligo, justo donde se hace el pliegue al inclinarte.')}

                        {/* STEP 2: HIP */}
                        {step === 2 && renderMeasurementInput('hip', 'Mide tu Cadera', 'Encuentra la parte más ancha de tus glúteos. No aprietes la cinta.')}

                        {/* STEP 3: RESULTS */}
                        {step === 3 && recommendation && !recommendation.type && (
                            <div className="text-center animate-fade-in flex-1 flex flex-col pt-4">
                                <div className="mb-2">
                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border ${recommendation.badgeColor} ${recommendation.borderColor}`}>
                                        {recommendation.badgeText}
                                    </span>
                                </div>

                                <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Tu Talla Recomendada</h3>
                                <div className="text-6xl font-black text-[#2C2420] mb-2 tracking-tighter">
                                    {recommendation.displayLabel}
                                </div>
                                <div className="text-[#D1AB66] font-serif font-bold text-xl mb-6">
                                    {recommendation.line}
                                </div>

                                <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-stone-100 text-left mb-8">
                                    <p className="text-sm text-stone-600 leading-relaxed font-medium">
                                        {recommendation.description}
                                    </p>
                                </div>

                                <div className="space-y-4 mt-auto">
                                    <button className="w-full bg-[#2C2420] hover:bg-black text-[#F5EDDF] font-bold py-5 rounded-2xl shadow-xl transition-all hover:scale-[1.02] flex justify-center items-center gap-2 active:scale-95">
                                        AGREGAR AL CARRITO - $110 <ArrowRight size={20} />
                                    </button>

                                    <button
                                        onClick={handleRestart}
                                        className="flex items-center justify-center gap-2 w-full py-3 text-stone-400 text-[10px] font-bold uppercase tracking-widest hover:text-[#2C2420] transition-colors"
                                    >
                                        <RotateCcw size={14} /> Calcular de nuevo
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Out of Range Handling */}
                        {step === 3 && recommendation?.type && (
                            <div className="text-center py-12 px-6 flex-1 flex flex-col justify-center items-center animate-fade-in">
                                <AlertCircle size={64} className="text-stone-200 mb-6" />
                                <h3 className="text-2xl font-serif font-bold text-[#362904] mb-4">Fuera de Rango Estándar</h3>
                                <p className="text-stone-500 text-sm mb-10 leading-relaxed">{recommendation.msg}</p>
                                <button
                                    onClick={handleRestart}
                                    className="w-full bg-[#362904] text-white font-bold py-5 rounded-2xl shadow-lg"
                                >
                                    Intentar de nuevo
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuitarFitFinder;
