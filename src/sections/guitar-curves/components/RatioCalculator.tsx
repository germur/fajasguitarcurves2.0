import { useState } from 'react'
import { Ruler, X, Check } from 'lucide-react'

interface RatioCalculatorProps {
    isOpen: boolean
    onClose: () => void
}

export function RatioCalculator({ isOpen, onClose }: RatioCalculatorProps) {
    const [waist, setWaist] = useState('')
    const [hip, setHip] = useState('')
    const [result, setResult] = useState<'standard' | 'guitar' | null>(null)

    if (!isOpen) return null

    const calculateRatio = () => {
        const w = parseFloat(waist)
        const h = parseFloat(hip)
        if (isNaN(w) || isNaN(h)) return

        const diff = h - w
        setResult(diff >= 10 ? 'guitar' : 'standard')
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#F5EDDF] rounded-2xl w-full max-w-md shadow-2xl border-2 border-[#D1AB66] relative overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-[#2C2420] hover:bg-[#D1AB66]/20 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    <div className="text-center mb-6">
                        <span className="inline-block p-3 bg-[#D1AB66]/20 rounded-full text-[#A35944] mb-3">
                            <Ruler size={24} />
                        </span>
                        <h2 className="font-serif text-3xl text-[#2C2420] font-bold">The Ratio Test</h2>
                        <p className="text-stone-600 mt-2">
                            Don't guess. Let Math find your perfect fit.
                        </p>
                    </div>

                    {!result ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-[#2C2420] mb-1">Waist (in)</label>
                                <input
                                    type="number"
                                    value={waist}
                                    onChange={(e) => setWaist(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-[#D1AB66] focus:ring-2 focus:ring-[#A35944] outline-none"
                                    placeholder="e.g. 28"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#2C2420] mb-1">Hips (in)</label>
                                <input
                                    type="number"
                                    value={hip}
                                    onChange={(e) => setHip(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-[#D1AB66] focus:ring-2 focus:ring-[#A35944] outline-none"
                                    placeholder="e.g. 40"
                                />
                            </div>

                            <div className="p-4 bg-white/50 rounded-lg text-xs text-stone-500 flex gap-2">
                                <span>💡</span>
                                <p>Tip: Measure your waist at the narrowest point and hips at the widest point including glutes.</p>
                            </div>

                            <button
                                onClick={calculateRatio}
                                disabled={!waist || !hip}
                                className="w-full bg-[#2C2420] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#A35944] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Calculate Fit
                            </button>
                        </div>
                    ) : (
                        <div className="text-center animate-in fade-in zoom-in duration-300">
                            {result === 'guitar' ? (
                                <>
                                    <div className="w-20 h-20 bg-[#D1AB66] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg ring-4 ring-[#F5EDDF]">
                                        ⌛
                                    </div>
                                    <h3 className="font-serif text-2xl text-[#A35944] font-bold mb-2">
                                        You are a Guitar Curve!
                                    </h3>
                                    <p className="text-stone-700 mb-6">
                                        With a <strong>{(parseFloat(hip) - parseFloat(waist)).toFixed(1)} inch</strong> difference, standard fajas will gap at your waist. You need our <strong>Guitar Fit</strong> technology.
                                    </p>
                                    <button className="w-full bg-[#A35944] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#A35944]/30 hover:shadow-xl hover:-translate-y-1 transition-all">
                                        Shop Guitar Collection
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-stone-200 text-stone-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check size={40} />
                                    </div>
                                    <h3 className="font-serif text-2xl text-stone-700 font-bold mb-2">
                                        Standard Fit
                                    </h3>
                                    <p className="text-stone-600 mb-6">
                                        Your curves are balanced perfectly for our Standard Fit collection.
                                    </p>
                                    <button className="w-full bg-stone-800 text-white py-4 rounded-xl font-bold hover:bg-stone-900 transition-all">
                                        Shop Standard Collection
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => setResult(null)}
                                className="mt-4 text-sm text-stone-500 underline"
                            >
                                Recalculate
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
