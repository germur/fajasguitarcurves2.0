import React, { useState, useMemo } from 'react';
import { Ruler, Info, ArrowRight, RotateCcw, AlertCircle, ChevronLeft } from 'lucide-react';
import type { Unit, Recommendation, Measurements } from './types';
import { SIZE_DATA } from './constants';
import ProgressBar from './ProgressBar';
import { useTranslation } from 'react-i18next';

const GuitarFitFinder: React.FC = () => {
    const { t } = useTranslation();
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
                msg: t('components.guitar_fit_finder.logic.underflow_msg')
            };
            if (w > 51) return {
                size: '', displayLabel: '', line: '', description: '', badgeText: '', badgeColor: '', borderColor: '',
                type: 'overflow',
                msg: t('components.guitar_fit_finder.logic.overflow_msg')
            };
            return null;
        }

        // Logic: Compare Hip to Standard Max
        const isGuitar = h > baseSize.stdHipMax;

        // Determine Line based on Measurement
        let result: Recommendation = {
            size: baseSize.label,
            displayLabel: baseSize.label,
            line: t('components.guitar_fit_finder.logic.standard_line'),
            description: t('components.guitar_fit_finder.logic.standard_desc', { hip: h.toFixed(1) }),
            badgeText: t('components.guitar_fit_finder.logic.standard_badge'),
            badgeColor: 'bg-stone-200 text-stone-700',
            borderColor: 'border-stone-300',
            image: '/assets/shape-pear.png'
        };

        if (isGuitar) {
            // Guitar Curves Detected
            result.line = t('components.guitar_fit_finder.logic.guitar_line');
            result.displayLabel = baseSize.dualLabel || baseSize.label;
            result.description = t('components.guitar_fit_finder.logic.guitar_desc', { hip: h.toFixed(1), max: baseSize.stdHipMax });
            result.badgeText = t('components.guitar_fit_finder.logic.guitar_badge');
            result.badgeColor = 'bg-[#D1AB66]/10 text-[#A35944] border-[#D1AB66]/30';
            result.borderColor = 'border-[#D1AB66]';
            result.isGuitar = true;
            result.image = '/assets/shape-hourglass.png';
        } else if ((h - w) <= 6) {
            // Apple Shape Detected (Less than 6 inch difference)
            result.image = '/assets/shape-apple.png';
            result.description = t('components.guitar_fit_finder.logic.apple_desc');
        }

        return result;
    }, [measurements, unit, t]);

    const changeStep = (direction: number) => {
        setError(null);
        if (direction === 1) {
            if (step === 1 && !measurements.waist) { setError(t('components.guitar_fit_finder.steps.error_waist')); return; }
            if (step === 2 && !measurements.hip) { setError(t('components.guitar_fit_finder.steps.error_hip')); return; }
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
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{type === 'waist' ? t('components.guitar_fit_finder.steps.prev') : t('components.guitar_fit_finder.steps.next')}</span>
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
                    placeholder={unit === 'in' ? (type === 'waist' ? t('components.guitar_fit_finder.steps.placeholder_waist_in') : t('components.guitar_fit_finder.steps.placeholder_hip_in')) : (type === 'waist' ? t('components.guitar_fit_finder.steps.placeholder_waist_cm') : t('components.guitar_fit_finder.steps.placeholder_hip_cm'))}
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
                {t('components.guitar_fit_finder.steps.continue')} <ArrowRight size={18} />
            </button>
        </div>
    );

    return (
        <div className="font-sans text-[#2C2420] max-w-md mx-auto my-6 px-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden relative min-h-[600px] flex flex-col transition-all duration-500 text-center">

                {/* Header Branding */}
                <div className="bg-[#2C2420] p-4 text-center">
                    <h2 className="text-[#F5EDDF] text-xs font-bold tracking-[0.3em] uppercase">{t('components.guitar_fit_finder.header.brand')}</h2>
                    <p className="text-[#D1AB66] text-[9px] font-bold uppercase tracking-widest mt-0.5">{t('components.guitar_fit_finder.header.subtitle')}</p>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col items-center">
                    {step > 0 && step < 3 && <ProgressBar step={step} totalSteps={3} />}

                    <div className={`flex-1 flex flex-col w-full transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>

                        {/* STEP 0: INTRO */}
                        {step === 0 && (
                            <div className="text-center space-y-6 flex-1 flex flex-col justify-center items-center">
                                <div className="w-24 h-24 bg-[#FAF9F6] rounded-full mx-auto flex items-center justify-center shadow-inner mb-2 border border-stone-100">
                                    <Ruler size={40} className="text-[#D1AB66]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-[#2C2420] mb-3">{t('components.guitar_fit_finder.intro.title')}</h3>
                                    <p className="text-stone-500 text-sm px-2 leading-relaxed">
                                        {t('components.guitar_fit_finder.intro.desc')}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center gap-3 w-full">
                                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{t('components.guitar_fit_finder.intro.units_label')}</p>
                                    <div className="flex bg-stone-50 p-1.5 rounded-full w-full border border-stone-100">
                                        <button
                                            onClick={() => setUnit('cm')}
                                            className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${unit === 'cm' ? 'bg-[#2C2420] text-white shadow-md' : 'text-stone-400 hover:text-[#2C2420]'}`}
                                        >
                                            {t('components.guitar_fit_finder.intro.unit_cm')}
                                        </button>
                                        <button
                                            onClick={() => setUnit('in')}
                                            className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${unit === 'in' ? 'bg-[#2C2420] text-white shadow-md' : 'text-stone-400 hover:text-[#2C2420]'}`}
                                        >
                                            {t('components.guitar_fit_finder.intro.unit_in')}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => changeStep(1)}
                                    className="w-full bg-[#D1AB66] hover:bg-[#c49a4a] text-[#2C2420] font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl transform transition hover:-translate-y-1 flex items-center justify-center gap-3 mt-auto"
                                >
                                    {t('components.guitar_fit_finder.intro.cta')} <ArrowRight size={20} />
                                </button>
                            </div>
                        )}

                        {/* STEP 1: WAIST */}
                        {step === 1 && renderMeasurementInput('waist', t('components.guitar_fit_finder.steps.waist_label'), t('components.guitar_fit_finder.steps.waist_info'))}

                        {/* STEP 2: HIP */}
                        {step === 2 && renderMeasurementInput('hip', t('components.guitar_fit_finder.steps.hip_label'), t('components.guitar_fit_finder.steps.hip_info'))}

                        {/* STEP 3: RESULTS */}
                        {step === 3 && recommendation && !recommendation.type && (
                            <div className="text-center animate-fade-in flex-1 flex flex-col pt-4 items-center">
                                <div className="mb-2">
                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border ${recommendation.badgeColor} ${recommendation.borderColor}`}>
                                        {recommendation.badgeText}
                                    </span>
                                </div>

                                {recommendation.image && (
                                    <div className="w-32 h-44 mx-auto mb-6 relative">
                                        <div className="absolute inset-0 bg-[#D1AB66]/10 rounded-full blur-xl scale-75"></div>
                                        <img src={recommendation.image} alt="Body Shape" className="w-full h-full object-contain relative z-10 drop-shadow-lg" />
                                    </div>
                                )}

                                <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">{t('components.guitar_fit_finder.results.recommended_label')}</h3>
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
                                        {t('components.guitar_fit_finder.results.add_to_cart')} <ArrowRight size={20} />
                                    </button>

                                    <button
                                        onClick={handleRestart}
                                        className="flex items-center justify-center gap-2 w-full py-3 text-stone-400 text-[10px] font-bold uppercase tracking-widest hover:text-[#2C2420] transition-colors"
                                    >
                                        <RotateCcw size={14} /> {t('components.guitar_fit_finder.results.restart')}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Out of Range Handling */}
                        {step === 3 && recommendation?.type && (
                            <div className="text-center py-12 px-6 flex-1 flex flex-col justify-center items-center animate-fade-in">
                                <AlertCircle size={64} className="text-stone-200 mb-6" />
                                <h3 className="text-2xl font-serif font-bold text-[#362904] mb-4">{t('components.guitar_fit_finder.results.out_of_range_title')}</h3>
                                <p className="text-stone-500 text-sm mb-10 leading-relaxed">{recommendation.msg}</p>
                                <button
                                    onClick={handleRestart}
                                    className="w-full bg-[#362904] text-white font-bold py-5 rounded-2xl shadow-lg"
                                >
                                    {t('components.guitar_fit_finder.results.retry')}
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
