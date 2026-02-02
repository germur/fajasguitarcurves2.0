import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function WaistTrainingLab() {
    const { t } = useTranslation();
    // Basic state for active hotspot interaction (optional for MVP, but nice for polish)
    const [activePoint, setActivePoint] = useState<number | null>(null);

    const points = t('components.waist_training_lab.points', { returnObjects: true }) as Array<{
        label: string;
        desc: string;
    }>;

    return (
        <section className="bg-stone-50 text-stone-900 py-0 md:py-20 lg:py-0 overflow-hidden">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

                {/* Text Side */}
                <div className="p-12 lg:p-24 flex flex-col justify-center order-2 lg:order-1 relative z-10 bg-stone-50">
                    <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                        {t('components.waist_training_lab.science_title')}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-none text-stone-900">
                        {t('components.waist_training_lab.title_line1')}<br />
                        <span className="text-stone-500">{t('components.waist_training_lab.title_line2')}</span>
                    </h2>

                    <p
                        className="text-stone-600 mb-8 max-w-md leading-relaxed border-l border-[#D4AF37] pl-6"
                        dangerouslySetInnerHTML={{ __html: t('components.waist_training_lab.description') }}
                    ></p>

                    <div className="grid grid-cols-2 gap-8 mt-4">
                        <div>
                            <h4 className="text-2xl font-serif text-[#D4AF37]">14</h4>
                            <p className="text-[10px] uppercase tracking-widest text-stone-500">
                                {t('components.waist_training_lab.feature_1')}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-2xl font-serif text-[#D4AF37]">100%</h4>
                            <p className="text-[10px] uppercase tracking-widest text-stone-500">
                                {t('components.waist_training_lab.feature_2')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interactive Image Side */}
                <div className="relative h-[500px] lg:h-auto bg-stone-200 order-1 lg:order-2">
                    <img
                        src="/assets/cinturilla-extrema.jpg"
                        alt="Faja Real: Detalle de Latex y Varillas"
                        className="w-full h-full object-cover opacity-100 shadow-2xl"
                    />

                    {/* Hotspots */}
                    {points.map((p: any, index: number) => {
                        // Hardcoded positions mapping since translation file doesn't have coordinates
                        const positions = [
                            { top: '30%', left: '40%' },
                            { top: '50%', left: '50%' },
                            { top: '70%', left: '45%' }
                        ];
                        const pos = positions[index] || { top: '50%', left: '50%' };
                        const id = index + 1;

                        return (
                            <div
                                key={id}
                                className="absolute z-20"
                                style={{ top: pos.top, left: pos.left }}
                            >
                                <button
                                    onClick={() => setActivePoint(activePoint === id ? null : id)}
                                    className={`w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:scale-110 transition-transform ${activePoint === id ? 'scale-110 rotate-45' : ''}`}
                                >
                                    <Plus size={16} />
                                </button>

                                {/* Tooltip */}
                                <div className={`absolute left-10 top-0 w-48 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg transform transition-all duration-300 origin-left ${activePoint === id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                    <h5 className="font-bold text-[#D4AF37] text-xs uppercase mb-1">{p.label}</h5>
                                    <p className="text-[10px] text-gray-300 leading-tight">{p.desc}</p>
                                </div>
                            </div>
                        );
                    })}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-l from-[#111] via-transparent to-transparent pointer-events-none"></div>
                </div>

            </div>
        </section>
    );
}
