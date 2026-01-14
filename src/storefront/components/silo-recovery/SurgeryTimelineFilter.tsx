interface SurgeryTimelineFilterProps {
    activeStage: 'stage1' | 'stage2' | 'stage3' | 'bbl';
    onStageChange: (stage: 'stage1' | 'stage2' | 'stage3' | 'bbl') => void;
}

export function SurgeryTimelineFilter({ activeStage, onStageChange }: SurgeryTimelineFilterProps) {
    const filters = [
        {
            id: 'stage2',
            label: 'Stage 2',
            subLabel: 'Alta Compresión',
            badge: '🛡️ Recuperación'
        },
        {
            id: 'stage3',
            label: 'Stage 3',
            subLabel: 'Mantenimiento',
            badge: '⏳ Uso Diario'
        },
        {
            id: 'bbl',
            label: 'Guitar / BBL',
            subLabel: 'Cintura XS - Cadera XL',
            badge: '🍑 Caderas Anchas'
        }
    ] as const;

    return (
        <div className="w-full py-12 bg-[#F9F8F6]">
            <div className="max-w-4xl mx-auto px-4">
                <p className="text-center text-xs font-bold tracking-widest text-[#3E322C]/60 uppercase mb-10">
                    ¿Qué buscas lograr hoy?
                </p>

                {/* Container de Filtros */}
                <div className="flex justify-between items-center relative">

                    {/* Línea gris de fondo */}
                    <div className="absolute top-[14px] left-0 w-full h-0.5 bg-gray-200 -z-10"></div>

                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => onStageChange(filter.id)}
                            className="group flex flex-col items-center focus:outline-none w-1/3 relative"
                        >
                            <div className={`
                                w-8 h-8 rounded-full border-4 border-[#F9F8F6] transition-all duration-500 z-10 flex items-center justify-center
                                ${activeStage === filter.id ? 'bg-[#3E322C] scale-125 shadow-xl' : 'bg-gray-300 group-hover:bg-[#3E322C]/50'}
                            `}>
                                {activeStage === filter.id && <div className="w-3 h-3 bg-[#E0E5DF] rounded-full animate-pulse"></div>}
                            </div>

                            <span className={`mt-4 text-sm md:text-base font-bold transition-colors duration-300 ${activeStage === filter.id ? 'text-[#3E322C]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                {filter.label}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 hidden md:block">{filter.subLabel}</span>

                            {activeStage === filter.id && (
                                <span className="absolute -bottom-12 text-xs text-[#3E322C] bg-[#E0E5DF] px-3 py-1 rounded-full animate-fade-in-up font-bold shadow-sm whitespace-nowrap border border-[#3E322C]/10">
                                    {filter.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
