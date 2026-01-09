import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeOff, Layers } from 'lucide-react';

export function OutfitSilo() {
    const [mode, setMode] = useState<'dress' | 'jeans'>('dress');

    return (
        <div className="bg-stone-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative min-h-[600px] flex items-center">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-stone-700 to-transparent" />

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">

                {/* Control Panel */}
                <div>
                    <span className="inline-block px-3 py-1 bg-[#D1AB66] text-[#2C2420] text-[10px] uppercase font-bold tracking-widest rounded-full mb-6">
                        The Invisibility Test
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                        Zero Lines.<br />
                        <span className="text-stone-400">Zero Worries.</span>
                    </h2>
                    <p className="text-stone-300 mb-8 max-w-md text-lg font-light leading-relaxed">
                        See how our "Seamless Tech" creates a flawless foundation under your most unforgiving outfits.
                    </p>

                    <div className="flex bg-white/10 p-1 rounded-xl w-fit backdrop-blur-sm">
                        <button
                            onClick={() => setMode('dress')}
                            className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${mode === 'dress' ? 'bg-[#D1AB66] text-[#2C2420] shadow-lg' : 'text-stone-400 hover:text-white'}`}
                        >
                            <EyeOff className="w-4 h-4" /> Under Dress
                        </button>
                        <button
                            onClick={() => setMode('jeans')}
                            className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${mode === 'jeans' ? 'bg-[#D1AB66] text-[#2C2420] shadow-lg' : 'text-stone-400 hover:text-white'}`}
                        >
                            <Layers className="w-4 h-4" /> Under Jeans
                        </button>
                    </div>
                </div>

                {/* Visualizer Frame */}
                <div className="relative h-[500px] rounded-2xl bg-stone-800 border border-stone-700 overflow-hidden shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            {/* Placeholder for Dynamic Images */}
                            {mode === 'dress' ? (
                                <div className="w-full h-full bg-stone-800 flex flex-col items-center justify-center p-8 text-center relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop"
                                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                                        alt="Silk Dress"
                                    />
                                    <div className="relative z-10 bg-black/50 p-4 rounded-xl backdrop-blur-md border border-white/10">
                                        <p className="font-serif text-2xl mb-2 text-white">Silk Dress Test</p>
                                        <p className="text-sm text-stone-300">Result: No visible panty lines.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-full bg-stone-800 flex flex-col items-center justify-center p-8 text-center relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop"
                                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                                        alt="Tight Jeans"
                                    />
                                    <div className="relative z-10 bg-black/50 p-4 rounded-xl backdrop-blur-md border border-white/10">
                                        <p className="font-serif text-2xl mb-2 text-white">Skinny Jean Test</p>
                                        <p className="text-sm text-stone-300">Result: Smooth hip transition.</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Overlay UI */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm animate-pulse">
                            LIVE PREVIEW
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}
