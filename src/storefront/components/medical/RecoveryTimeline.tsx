import { Feather, Hourglass, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export type Stage = 'Stage 1' | 'Stage 2' | 'Supplies';

interface TimelineProps {
    activeStage: Stage;
    onStageChange: (stage: Stage) => void;
}

export function RecoveryTimeline({ activeStage, onStageChange }: TimelineProps) {
    const stages = [
        { id: 'Stage 1', label: 'THE HEALING FAJA', sub: 'Weeks 1-2', icon: Feather, color: 'bg-blue-50 text-blue-500' },
        { id: 'Stage 2', label: 'THE SCULPTING FAJA', sub: 'Weeks 3+', icon: Hourglass, color: 'bg-[#D1AB66]/10 text-[#D1AB66]' },
        { id: 'Supplies', label: 'RECOVERY KIT', sub: 'Essential Add-ons', icon: Plus, color: 'bg-green-50 text-green-500' }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-sm border border-stone-100 p-2 md:p-3 relative overflow-hidden">
                {stages.map((stage) => {
                    const isActive = activeStage === stage.id;
                    const Icon = stage.icon;

                    return (
                        <button
                            key={stage.id}
                            onClick={() => onStageChange(stage.id as Stage)}
                            className={`
                                relative flex-1 flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                                ${isActive ? 'bg-[#FAF9F6] shadow-inner' : 'hover:bg-stone-50'}
                            `}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isActive ? stage.color : 'bg-stone-100 text-stone-400'}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${isActive ? 'text-[#A35944]' : 'text-stone-400'}`}>
                                    {stage.sub}
                                </span>
                                <span className={`font-serif font-bold text-lg md:text-xl block leading-none ${isActive ? 'text-[#2C2420]' : 'text-stone-300'}`}>
                                    {stage.label}
                                </span>
                            </div>

                            {/* Active Indicator Line (Mobile: Left, Desktop: Bottom) */}
                            {isActive && (
                                <motion.div
                                    layoutId="timeline-indicator"
                                    className="absolute left-0 top-2 bottom-2 w-1 md:w-auto md:h-1 md:top-auto md:bottom-0 md:left-4 md:right-4 bg-[#D1AB66] rounded-full"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
