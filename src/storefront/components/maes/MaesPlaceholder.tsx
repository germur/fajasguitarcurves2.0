import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, FileText, Wrench, MapPin, Video, Camera } from 'lucide-react';

interface MaesPlaceholderProps {
    title: string;
    type: 'Tool' | 'Guide' | 'Article' | 'Local' | 'Video' | 'Gallery' | 'Resource';
    objective: string;
    tags?: string[];
}

export function MaesPlaceholder({ title, type, objective, tags = [] }: MaesPlaceholderProps) {

    const getIcon = () => {
        switch (type) {
            case 'Tool': return <Wrench className="w-12 h-12 text-[#D4AF37]" />;
            case 'Local': return <MapPin className="w-12 h-12 text-[#D4AF37]" />;
            case 'Video': return <Video className="w-12 h-12 text-[#D4AF37]" />;
            case 'Gallery': return <Camera className="w-12 h-12 text-[#D4AF37]" />;
            default: return <FileText className="w-12 h-12 text-[#D4AF37]" />;
        }
    };

    return (
        <div className="min-h-[60vh] bg-[#FAF9F6] flex items-center justify-center p-8">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12 border border-stone-100 text-center relative overflow-hidden">

                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-2 bg-[#D4AF37]" />
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl" />

                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-stone-50 rounded-full border border-stone-100 ring-4 ring-white shadow-sm">
                        {getIcon()}
                    </div>
                </div>

                <div className="inline-block bg-[#2C2420] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                    MAES Asset: {type}
                </div>

                <h1 className="font-serif text-3xl md:text-4xl text-[#2C2420] mb-4">
                    {title}
                </h1>

                <p className="text-stone-500 text-lg mb-8 max-w-md mx-auto">
                    Este activo digital está en construcción. Es parte del ecosistema de crecimiento para capturar: <span className="font-bold text-[#D4AF37]">{objective}</span>.
                </p>

                {tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {tags.map(tag => (
                            <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-md border border-stone-200">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="p-6 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20 mb-8 mx-auto max-w-sm">
                    <div className="flex items-center gap-3 text-left">
                        <AlertCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                        <div>
                            <p className="text-xs font-bold text-[#2C2420] uppercase tracking-wide">Development Status</p>
                            <p className="text-xs text-stone-600">Pending Implementation in Phase 2.1</p>
                        </div>
                    </div>
                </div>

                <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#2C2420] hover:text-[#D4AF37] transition-colors border-b border-[#2C2420] hover:border-[#D4AF37] pb-0.5">
                    Volver al Inicio <ArrowRight size={14} />
                </Link>

            </div>
        </div>
    );
}
