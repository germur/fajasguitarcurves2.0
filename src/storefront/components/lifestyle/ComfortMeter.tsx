import { motion } from 'framer-motion';

export function ComfortMeter() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
                <span>Compression</span>
                <span>Flexibility</span>
            </div>

            <div className="h-2 bg-stone-100 rounded-full overflow-hidden relative">
                {/* Background Track */}
                <div className="absolute inset-0 bg-stone-200" />

                {/* Indicator 1: Compression (Medium) */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute top-0 left-0 h-full bg-[#D1AB66]"
                />
            </div>
            <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                <span className="text-[#D1AB66] font-bold">MEDIUM (6/10)</span>
                <span className="text-green-600 font-bold">MAXIMUM (10/10)</span>
            </div>
            <p className="text-xs text-stone-500 mt-2 italic">
                "Sitting-proof" design that moves with you.
            </p>
        </div>
    );
}
