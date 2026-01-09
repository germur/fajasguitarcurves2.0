import { useState } from 'react';
import { X, Ruler, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function RatioCalculatorModal() {
    const [step, setStep] = useState<'input' | 'result'>('input');
    const [waist, setWaist] = useState<string>('');
    const [hips, setHips] = useState<string>('');
    const [result, setResult] = useState<'guitar' | 'standard' | null>(null);

    const calculateRatio = () => {
        const w = parseFloat(waist);
        const h = parseFloat(hips);

        if (isNaN(w) || isNaN(h)) return;

        const difference = h - w;

        // Logic: > 10 inch difference suggests Guitar Fit
        if (difference >= 10) {
            setResult('guitar');
        } else {
            setResult('standard');
        }
        setStep('result');
    };

    const reset = () => {
        setStep('input');
        setWaist('');
        setHips('');
        setResult(null);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#2C2420] text-white rounded-full px-8 py-6 font-bold tracking-widest hover:bg-black/90 transition-all shadow-xl">
                    FIND YOUR FIT <Ruler className="ml-2 w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#FAF9F6] border-none max-w-md p-0 overflow-hidden rounded-3xl">
                <div className="p-8">
                    {step === 'input' ? (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="font-serif text-3xl text-[#2C2420] mb-2">The Ratio Test</h2>
                                <p className="text-stone-500 text-sm">Enter your measurements to see if you qualify for the Guitar Tech™ engineering.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-stone-600">Waist (Inches)</label>
                                    <input
                                        type="number"
                                        value={waist}
                                        onChange={(e) => setWaist(e.target.value)}
                                        className="w-full bg-white border border-stone-200 rounded-xl p-4 text-lg font-bold text-[#2C2420] focus:ring-2 focus:ring-[#B49286] focus:outline-none transition-all"
                                        placeholder="e.g. 28"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-stone-600">Hips (Inches)</label>
                                    <input
                                        type="number"
                                        value={hips}
                                        onChange={(e) => setHips(e.target.value)}
                                        className="w-full bg-white border border-stone-200 rounded-xl p-4 text-lg font-bold text-[#2C2420] focus:ring-2 focus:ring-[#B49286] focus:outline-none transition-all"
                                        placeholder="e.g. 40"
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={calculateRatio}
                                disabled={!waist || !hips}
                                className="w-full bg-[#2C2420] text-white py-6 rounded-xl font-bold tracking-wider hover:bg-black disabled:opacity-50"
                            >
                                CALCULATE <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
                            {result === 'guitar' ? (
                                <>
                                    <div className="w-20 h-20 bg-[#D1AB66]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-10 h-10 text-[#D1AB66]" />
                                    </div>
                                    <h2 className="font-serif text-3xl text-[#2C2420]">You are a Guitar Curve</h2>
                                    <p className="text-stone-600 text-sm max-w-xs mx-auto">
                                        Your {hips}" hips and {waist}" waist create a difference of {parseFloat(hips) - parseFloat(waist)}". Standard fajas will flatten you.
                                    </p>
                                    <div className="bg-[#D1AB66]/10 p-4 rounded-xl border border-[#D1AB66]/20">
                                        <p className="font-bold text-[#8C6B3D] text-sm">RECOMM ENDATION: GUITAR FIT (Stage 2)</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AlertCircle className="w-10 h-10 text-stone-400" />
                                    </div>
                                    <h2 className="font-serif text-3xl text-[#2C2420]">Standard Fit</h2>
                                    <p className="text-stone-600 text-sm max-w-xs mx-auto">
                                        Your measurements show a more athletic or standard proportion. The Guitar fit might be too loose in the hips for you.
                                    </p>
                                    <div className="bg-stone-100 p-4 rounded-xl">
                                        <p className="font-bold text-stone-600 text-sm">RECOMMENDATION: EVERYDAY SCULPT</p>
                                    </div>
                                </>
                            )}

                            <Button
                                onClick={reset}
                                variant="ghost"
                                className="text-stone-400 hover:text-[#2C2420] text-xs font-bold tracking-widest mt-4"
                            >
                                RECALCULATE
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
