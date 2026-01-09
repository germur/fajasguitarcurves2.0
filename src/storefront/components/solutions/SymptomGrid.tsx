import { useState } from 'react';
import { ArrowDownToLine, Minimize2, Flame, CircleOff, BoxSelect, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Icon Map
const iconMap: Record<string, any> = {
    ArrowDownToLine,
    Minimize2,
    Flame,
    CircleOff,
    BoxSelect
};

interface Symptom {
    id: string;
    label: string;
    description: string;
    icon: string;
    painPoint: string;
    techSolution: {
        title: string;
        description: string;
    }
}

interface SymptomGridProps {
    symptoms: Symptom[];
    onSelect: (symptom: Symptom) => void;
}

export function SymptomGrid({ symptoms, onSelect }: SymptomGridProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
            {symptoms.map((symptom, idx) => {
                const Icon = iconMap[symptom.icon] || ArrowRight;
                const isLarge = idx === 0 || idx === 3; // Make some cards span 2 cols for Bento feel

                return (
                    <motion.button
                        key={symptom.id}
                        onClick={() => onSelect(symptom)}
                        onMouseEnter={() => setHoveredId(symptom.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`
                            relative rounded-3xl p-8 text-left transition-all duration-300 overflow-hidden group
                            ${isLarge ? 'md:col-span-2 bg-[#2C2420] text-[#F5EDDF]' : 'bg-white text-[#2C2420] border border-stone-100'}
                        `}
                        whileHover={{ scale: 1.02 }}
                    >
                        {/* Background Gradient for Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-[#D1AB66]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isLarge ? 'bg-white/10' : 'bg-stone-100'}`}>
                                    <Icon className={`w-6 h-6 ${isLarge ? 'text-[#D1AB66]' : 'text-[#2C2420]'}`} />
                                </div>
                                <h3 className="font-serif text-2xl font-bold mb-2">{symptom.label}</h3>
                                <p className={`text-sm ${isLarge ? 'text-stone-300' : 'text-stone-500'}`}>
                                    {symptom.painPoint}
                                </p>
                            </div>

                            {/* Tech Solution Reveal */}
                            <div className="mt-4">
                                <AnimatePresence mode="wait">
                                    {hoveredId === symptom.id ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="flex items-center gap-2"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-[#D1AB66]" />
                                            <span className={`font-bold text-sm ${isLarge ? 'text-white' : 'text-[#2C2420]'}`}>
                                                {symptom.techSolution.title}
                                            </span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2 opacity-50"
                                        >
                                            <span className="text-xs uppercase font-bold tracking-widest">See Science Fix</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
}
