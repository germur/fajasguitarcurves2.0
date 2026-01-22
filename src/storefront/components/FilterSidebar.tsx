import { useState, useMemo } from 'react';
import { X, Filter, ChevronDown, ChevronUp, Dumbbell, ShoppingBag, HeartPulse, Activity, Sparkles, Scissors, Layers, CheckCircle2 } from 'lucide-react';

interface FilterSidebarProps {
    products: any[];
    activeFilters: Record<string, string[]>;
    onFilterChange: (category: string, value: string) => void;
}

export function FilterSidebar({ products, activeFilters, onFilterChange }: FilterSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        stage: true,
        compression: true,
        category: true, // NEW
        occasion: true,
        features: false,
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Calculate Available Options based on current products
    const counts = useMemo(() => {
        const c: Record<string, Record<string, number>> = {
            stage: {},
            compression: {},
            category: {}, // NEW
            occasion: {},
            features: {}
        };

        products.forEach(p => {
            if (p.stage) c.stage[p.stage] = (c.stage[p.stage] || 0) + 1;
            if (p.compression) c.compression[p.compression] = (c.compression[p.compression] || 0) + 1;
            if (p.category) c.category[p.category] = (c.category[p.category] || 0) + 1; // NEW
            if (p.occasion) c.occasion[p.occasion] = (c.occasion[p.occasion] || 0) + 1;
            if (p.features && Array.isArray(p.features)) {
                p.features.forEach((f: string) => c.features[f] = (c.features[f] || 0) + 1);
            }
        });
        return c;
    }, [products]);

    // --- ICON HELPER ---
    const getIconForOption = (option: string) => {
        const lower = option.toLowerCase();
        if (lower.includes('gym')) return <Dumbbell size={14} className="text-stone-400" />;
        if (lower.includes('daily') || lower.includes('jeans')) return <ShoppingBag size={14} className="text-stone-400" />;
        if (lower.includes('stage')) return <HeartPulse size={14} className="text-stone-400" />;
        if (lower.includes('bra')) return <Layers size={14} className="text-stone-400" />;
        if (lower.includes('alta') || lower.includes('high')) return <Activity size={14} className="text-[#A35944]" />;
        if (lower.includes('media') || lower.includes('medium')) return <Activity size={14} className="text-[#D4AF37]" />;
        if (lower.includes('dress') || lower.includes('special')) return <Sparkles size={14} className="text-stone-400" />;
        if (lower.includes('post-op')) return <Scissors size={14} className="text-stone-400" />;
        return <CheckCircle2 size={14} className="text-stone-300" />;
    };

    // Helper to render a checkbox group (Refactored to Premium Pills)
    const renderFilterGroup = (title: string, category: string, options: string[]) => {
        const isExpanded = expandedSections[category];

        return (
            <div className="border-b border-stone-100 py-6">
                <button
                    onClick={() => toggleSection(category)}
                    className="flex items-center justify-between w-full text-left mb-3 group"
                >
                    <h4 className="font-bold text-[#2C2420] uppercase text-xs tracking-widest group-hover:text-[#D4AF37] transition-colors">{title}</h4>
                    {isExpanded ? <ChevronUp size={14} className="text-stone-400" /> : <ChevronDown size={14} className="text-stone-400" />}
                </button>

                {isExpanded && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {options.map(opt => {
                            const count = counts[category][opt] || 0;
                            const isSelected = activeFilters[category]?.includes(opt);
                            const isDisabled = count === 0 && !isSelected;

                            return (
                                <label
                                    key={opt}
                                    className={`
                                        cursor-pointer select-none px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border
                                        flex items-center gap-2
                                        ${isDisabled ? 'opacity-40 grayscale cursor-not-allowed bg-stone-50 border-stone-100 text-stone-300' : ''}
                                        ${isSelected
                                            ? 'bg-[#2C2420] border-[#2C2420] text-white shadow-md'
                                            : 'bg-white border-stone-200 text-stone-600 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                                        }
                                    `}
                                >
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isSelected}
                                        onChange={() => !isDisabled && onFilterChange(category, opt)}
                                        disabled={isDisabled}
                                    />
                                    {getIconForOption(opt)}
                                    <span>{opt}</span>
                                    {(!isDisabled) && <span className={`${isSelected ? 'text-stone-400' : 'text-stone-300'} text-[10px]`}>({count})</span>}
                                </label>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    // --- DYNAMIC OPTION GENERATION ---
    const getDynamicOptions = (category: string) => {
        return Object.keys(counts[category] || {}).sort();
    };

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-[#2C2420] text-white py-3 rounded-lg font-bold text-sm tracking-widest uppercase"
                >
                    <Filter size={16} /> Filtrar Resultados
                </button>
            </div>

            {/* Sidebar Container */}
            <div className={`
                fixed inset-0 z-50 bg-white transform transition-transform duration-300 lg:static lg:transform-none lg:w-64 lg:block lg:z-auto
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 h-full overflow-y-auto lg:p-0 lg:border-r lg:border-stone-100 lg:pr-8">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between mb-8 lg:hidden">
                        <h3 className="font-serif text-2xl text-[#2C2420]">Filtros</h3>
                        <button onClick={() => setIsOpen(false)} className="p-2 bg-stone-100 rounded-full">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Filter Sections - ONLY RENDER IF OPTIONS EXIST */}
                    <div className="space-y-1">
                        {/* 1. TIPO DE PRENDA (Category) - Most Important */}
                        {getDynamicOptions('category').length > 0 && renderFilterGroup('Tipo de Prenda', 'category', getDynamicOptions('category'))}

                        {/* 2. Primary Filters */}
                        {getDynamicOptions('occasion').length > 0 && renderFilterGroup('Uso / Actividad', 'occasion', getDynamicOptions('occasion'))}
                        {getDynamicOptions('compression').length > 0 && renderFilterGroup('Nivel de Compresión', 'compression', getDynamicOptions('compression'))}
                        {getDynamicOptions('stage').length > 0 && renderFilterGroup('Etapa Post-Op', 'stage', getDynamicOptions('stage'))}

                        {/* 3. Secondary Features */}
                        {getDynamicOptions('features').length > 0 && renderFilterGroup('Características', 'features', getDynamicOptions('features'))}
                    </div>

                    {/* Clear Button */}
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 w-full py-2 text-xs text-stone-500 hover:text-[#D4AF37] underline block text-center"
                    >
                        Limpiar todos los filtros
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
