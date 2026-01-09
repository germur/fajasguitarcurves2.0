import { Activity, ShieldCheck, Zap } from 'lucide-react'

interface StageSelectorProps {
    selectedStage: string
    onSelect: (stage: string) => void
}

export function StageSelector({ selectedStage, onSelect }: StageSelectorProps) {
    const stages = [
        {
            id: 'Stage 1',
            title: 'Stage 1: Recovery',
            desc: 'Weeks 1-2 • Low Compression',
            icon: ShieldCheck,
        },
        {
            id: 'Stage 2',
            title: 'Stage 2: Sculpting',
            desc: 'Weeks 3-8 • High Compression',
            icon: Zap,
            isBestSeller: true,
        },
        {
            id: 'Stage 3',
            title: 'Stage 3: Maintenance',
            desc: 'Month 3+ • Contour',
            icon: Activity,
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stages.map((stage) => {
                const isSelected = selectedStage === stage.id
                const Icon = stage.icon

                return (
                    <button
                        key={stage.id}
                        onClick={() => onSelect(stage.id)}
                        className={`
              relative p-4 rounded-lg border-2 text-left transition-all duration-200
              ${isSelected
                                ? 'border-[#D1AB66] bg-[#F5EDDF]'
                                : 'border-stone-200 hover:border-[#D1AB66]/50 bg-white'
                            }
            `}
                    >
                        {stage.isBestSeller && (
                            <span className="absolute -top-3 left-4 bg-[#D1AB66] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                BEST SELLER
                            </span>
                        )}
                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full ${isSelected ? 'bg-[#A35944] text-white' : 'bg-stone-100 text-stone-500'}`}>
                                <Icon size={20} />
                            </div>
                            <div>
                                <h3 className={`font-serif font-bold ${isSelected ? 'text-[#A35944]' : 'text-stone-800'}`}>
                                    {stage.title}
                                </h3>
                                <p className="text-xs text-stone-500 mt-1">{stage.desc}</p>
                            </div>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}
