interface SurgeryTimelineFilterProps {
    activeStage: string;
    onStageChange: (stage: string) => void;
}

export function SurgeryTimelineFilter({ activeStage, onStageChange }: SurgeryTimelineFilterProps) {
    const filters = [
        {
            id: 'etapa2',
            label: 'Etapa 2',
            subLabel: 'Alta Compresión',
            badge: '🛡️ Recuperación'
        },
        {
            id: 'etapa3',
            label: 'Etapa 3',
            subLabel: 'Mantenimiento',
            badge: '⏳ Uso Diario'
        },
        {
            id: 'post-lipo',
            label: 'Post Lipo',
            subLabel: 'Lipo 360 / Abdo',
            badge: '💉 Cirugía'
        },
        {
            id: 'bbl',
            label: 'BBL',
            subLabel: 'Brazilian Butt Lift',
            badge: '🍑 Glúteos'
        },
        {
            id: 'reloj-arena',
            label: 'Reloj de Arena',
            subLabel: 'Cintura de Avispa',
            badge: '⌛ Moldeo'
        }
    ] as const;

    return (
        <div className="w-full py-8 bg-[#F9F8F6]">
            <div className="max-w-6xl mx-auto px-4">
                <p className="text-center text-xs font-bold tracking-widest text-[#3E322C]/60 uppercase mb-8">
                    ¿Qué buscas lograr hoy?
                </p>

                {/* Grid Layout instead of Timeline */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    {filters.map((filter) => {
                        const isActive = activeStage === filter.id;
                        return (
                            <button
                                key={filter.id}
                                onClick={() => onStageChange(filter.id)}
                                className={`
                                    relative group flex flex-col items-center p-4 rounded-xl transition-all duration-300
                                    ${isActive ? 'bg-white shadow-lg ring-1 ring-[#3E322C]/10 scale-105' : 'hover:bg-white/50 hover:shadow-sm'}
                                `}
                            >
                                <div className={`
                                    w-12 h-12 rounded-full mb-3 flex items-center justify-center text-lg shadow-sm transition-colors
                                    ${isActive ? 'bg-[#3E322C] text-white' : 'bg-[#E0E5DF] text-[#3E322C] group-hover:bg-[#D4AF37] group-hover:text-white'}
                                `}>
                                    {/* Iconic representation based on ID could go here, for now using First Letter or specific icon mapping if needed. 
                                        Using the badge emoji as main icon or just simple circle logic? 
                                        Let's use the Badge emoji for visual intuition.
                                    */}
                                    {filter.badge.split(' ')[0]}
                                </div>

                                <span className={`text-sm font-bold transition-colors ${isActive ? 'text-[#3E322C]' : 'text-gray-500'}`}>
                                    {filter.label}
                                </span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                                    {filter.subLabel}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
