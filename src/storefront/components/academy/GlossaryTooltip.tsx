import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

interface GlossaryTooltipProps {
    term: string;
    definition: string;
}

export function GlossaryTooltip({ term, definition }: GlossaryTooltipProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className="relative inline-block border-b-2 border-dotted border-[#D1AB66] cursor-help font-medium text-[#2C2420]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {term}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-4 bg-[#2C2420] text-[#F5EDDF] text-sm rounded-xl shadow-xl z-50 pointer-events-none"
                    >
                        <div className="flex items-center gap-2 mb-2 border-b border-white/20 pb-1">
                            <Info className="w-3 h-3 text-[#D1AB66]" />
                            <span className="font-bold uppercase tracking-wider text-[10px]">Medical Definition</span>
                        </div>
                        <p className="leading-relaxed">
                            {definition}
                        </p>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#2C2420]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
}
