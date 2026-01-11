import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../../lib/seo/SeoHead';
import {
    CheckCircle2,
    Info,
    MoveHorizontal
} from 'lucide-react';

export default function StageComparator() {
    const [sliderValue, setSliderValue] = useState(50);
    const [quizAnswers, setQuizAnswers] = useState<{ q1?: boolean, q2?: boolean, q3?: boolean }>({});
    const [quizResult, setQuizResult] = useState<'READY' | 'WAIT' | null>(null);

    // --- LOGIC ---

    const handleQuizAnswer = (q: 'q1' | 'q2' | 'q3', ans: boolean) => {
        const newAnswers = { ...quizAnswers, [q]: ans };
        setQuizAnswers(newAnswers);

        // Check if all answered
        if (newAnswers.q1 !== undefined && newAnswers.q2 !== undefined && newAnswers.q3 !== undefined) {
            // Logic: If 2 or more are YES, then READY
            const yesCount = Object.values(newAnswers).filter(v => v).length;
            setQuizResult(yesCount >= 2 ? 'READY' : 'WAIT');
        }
    };

    // --- RENDERERS ---

    const renderHero = () => (
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2C2420] text-white p-8 md:p-16 mb-20 shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold tracking-widest uppercase border border-[#D4AF37]/30">
                    Guía de Recuperación
                </span>
                <h1 className="font-serif text-4xl md:text-6xl leading-tight">
                    Faja Stage 1 vs. Stage 2
                </h1>
                <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
                    ¿Cuándo hacer la transición? Descubre visualmente qué faja necesitas para optimizar tus resultados post-quirúrgicos.
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <a href="#comparison" className="px-8 py-4 bg-[#D4AF37] text-white rounded-full font-bold hover:bg-white hover:text-[#2C2420] transition-colors shadow-lg">
                        Ver Comparativa Visual
                    </a>
                    <a href="#quiz" className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-bold hover:bg-white hover:text-[#2C2420] transition-colors border border-white/20">
                        ¿Estoy lista para Stage 2?
                    </a>
                </div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        </div>
    );

    const renderSlider = () => {
        const handleMove = (clientX: number, rect: DOMRect) => {
            const x = clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            setSliderValue(percentage);
        };

        const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            handleMove(e.clientX, rect);

            const handleMouseMove = (mm: MouseEvent) => {
                handleMove(mm.clientX, rect);
            };

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        };

        const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            handleMove(e.touches[0].clientX, rect);

            const handleTouchMove = (tm: TouchEvent) => {
                handleMove(tm.touches[0].clientX, rect);
            };

            const handleTouchEnd = () => {
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            };

            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', handleTouchEnd);
        };

        return (
            <div id="comparison" className="max-w-5xl mx-auto mb-24 animate-fade-in select-none">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-4">
                        <MoveHorizontal size={16} />
                        Desliza para Comparar
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#2C2420] mb-4">La Verdadera Diferencia</h2>
                    <p className="text-stone-500">Arrastra el divisor central para ver la transformación.</p>
                </div>

                <div
                    className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize group touch-none"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                >
                    {/* Image Layer: Stage 2 (Background) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[#F5F2EB]">
                        <img src="/assets/comparator/stage2-slider.png" alt="Resultado final Faja Stage 2 Cintura de Avispa" className="w-full h-full object-cover object-top pointer-events-none select-none" draggable="false" />
                        <span className="absolute top-8 right-8 bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-bold shadow-lg pointer-events-none z-10">STAGE 2</span>
                    </div>

                    {/* Image Layer: Stage 1 (Foreground/Clipped) */}
                    <div
                        className="absolute inset-0 overflow-hidden border-r-4 border-white shadow-[10px_0_50px_rgba(0,0,0,0.2)]"
                        style={{ width: `${sliderValue}%` }}
                    >
                        {/* Stage 1 Image - positioned absolutely to maintain aspect ratio */}
                        <div className="absolute inset-0 w-full h-full bg-[#E8E6E1]">
                            <img src="/assets/comparator/stage1-slider.png" alt="Resultado inicial Faja Stage 1 Post-Quirúrgica" className="w-full h-full object-cover object-top pointer-events-none select-none" draggable="false" />
                        </div>
                        <span className="absolute top-8 left-8 bg-white/90 text-[#2C2420] px-4 py-2 rounded-lg font-bold shadow-lg pointer-events-none z-10">STAGE 1</span>
                    </div>

                    {/* Slider Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center z-20 group-hover:bg-[#D4AF37] transition-colors"
                        style={{ left: `${sliderValue}%` }}
                    >
                        <div className="w-12 h-12 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#2C2420] transform group-active:scale-110 group-hover:scale-105 transition-all outline outline-4 outline-white/20">
                            <MoveHorizontal size={20} className="text-[#D4AF37]" />
                        </div>
                    </div>

                </div>
            </div>
        );
    };

    const renderTechDetails = () => (
        <div className="max-w-6xl mx-auto mb-24 animate-fade-in">
            <div className="text-center mb-16">
                <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs mb-2 block">Ingeniería Textil</span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#2C2420]">Detalles que Importan</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">

                {/* Detail 1: Stretch Test */}
                <div className="group space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100 shadow-md">
                        <img src="/assets/comparator/stage1-stretch.png" alt="Alta Elongación" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl text-center shadow-sm">
                            <p className="font-bold text-[#2C2420] text-sm">Alta Elongación (Stage 1)</p>
                        </div>
                    </div>
                    <p className="text-stone-500 text-sm text-center px-4">Suavidad y elasticidad para acomodar la inflamación severa sin cortar la circulación.</p>
                </div>

                {/* Detail 2: Zipper */}
                <div className="group space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100 shadow-md">
                        <img src="/assets/comparator/zipper-detail.png" alt="Zipper Invisible" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl text-center shadow-sm">
                            <p className="font-bold text-[#2C2420] text-sm">Zipper Invisible Perineal</p>
                        </div>
                    </div>
                    <p className="text-stone-500 text-sm text-center px-4">Diseño higiénico de fácil acceso que no roza ni incomoda en zonas sensibles.</p>
                </div>

                {/* Detail 3: Glute Fabric */}
                <div className="group space-y-4 lg:col-span-1 md:col-span-2 lg:col-start-auto md:w-1/2 md:mx-auto lg:w-full">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100 shadow-md">
                        <img src="/assets/comparator/glute-detail.png" alt="Tejido Glúteo" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl text-center shadow-sm">
                            <p className="font-bold text-[#2C2420] text-sm">Mesh Glúteo vs. Powernet</p>
                        </div>
                    </div>
                    <p className="text-stone-500 text-sm text-center px-4">Panel trasero de micro-red que protege la grasa transferida (BBL) sin comprimirla.</p>
                </div>

            </div>
        </div>
    );

    const renderTable = () => (
        <div className="max-w-4xl mx-auto mb-24 animate-fade-in bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-stone-100">
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C2420] text-center mb-12">Tabla de Especificaciones</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-stone-100">
                            <th className="py-4 px-4 font-serif text-xl text-[#2C2420] w-1/3">Característica</th>
                            <th className="py-4 px-4 font-bold text-[#2C2420] text-center w-1/3 bg-stone-50 rounded-t-xl">Stage 1</th>
                            <th className="py-4 px-4 font-bold text-[#D4AF37] text-center w-1/3 bg-[#D4AF37]/5 rounded-t-xl">Stage 2</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm md:text-base">
                        <tr className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                            <td className="py-6 px-4 font-bold text-[#2C2420]">Compresión</td>
                            <td className="py-6 px-4 text-center text-stone-600">Uniforme y Media (20-25 mmHg)</td>
                            <td className="py-6 px-4 text-center text-stone-600 font-bold">Focalizada y Alta (30+ mmHg)</td>
                        </tr>
                        <tr className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                            <td className="py-6 px-4 font-bold text-[#2C2420]">Material Principal</td>
                            <td className="py-6 px-4 text-center text-stone-600">Triconet / Lycra Bidireccional</td>
                            <td className="py-6 px-4 text-center text-stone-600">Powernet de Alta Densidad</td>
                        </tr>
                        <tr className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                            <td className="py-6 px-4 font-bold text-[#2C2420]">Sistema de Cierre</td>
                            <td className="py-6 px-4 text-center text-stone-600">Broches Externos (Ajustable)</td>
                            <td className="py-6 px-4 text-center text-stone-600">Cierre Interno / Invisible</td>
                        </tr>
                        <tr>
                            <td className="py-6 px-4 font-bold text-[#2C2420]">Objetivo</td>
                            <td className="py-6 px-4 text-center text-stone-600">Drenaje y Reducción de Edema</td>
                            <td className="py-6 px-4 text-center text-stone-600">Moldeado de Cintura Semipermanente</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderQuiz = () => (
        <div id="quiz" className="bg-[#FAF9F6] py-24 border-y border-stone-200">
            <div className="max-w-2xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs mb-2 block">Quick Check</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#2C2420] mb-4">¿Estás lista para Stage 2?</h2>
                    <p className="text-stone-500">Responde con honestidad para cuidar tus resultados.</p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl space-y-8">

                    {/* Question 1 */}
                    <div className="space-y-4">
                        <p className="font-bold text-[#2C2420] text-lg">1. ¿Tu faja Stage 1 ya te queda holgada incluso en los broches más ajustados?</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleQuizAnswer('q1', true)}
                                className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${quizAnswers.q1 === true ? 'border-[#D4AF37] bg-[#D4AF37] text-white' : 'border-stone-200 text-stone-500 hover:border-[#D4AF37]/50'}`}
                            >
                                Sí
                            </button>
                            <button
                                onClick={() => handleQuizAnswer('q1', false)}
                                className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${quizAnswers.q1 === false ? 'border-stone-800 bg-stone-800 text-white' : 'border-stone-200 text-stone-500 hover:border-stone-800/50'}`}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {/* Question 2 */}
                    <div className="space-y-4">
                        <p className="font-bold text-[#2C2420] text-lg">2. ¿Han pasado al menos 3 semanas desde tu cirugía?</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleQuizAnswer('q2', true)}
                                className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${quizAnswers.q2 === true ? 'border-[#D4AF37] bg-[#D4AF37] text-white' : 'border-stone-200 text-stone-500 hover:border-[#D4AF37]/50'}`}
                            >
                                Sí
                            </button>
                            <button
                                onClick={() => handleQuizAnswer('q2', false)}
                                className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${quizAnswers.q2 === false ? 'border-stone-800 bg-stone-800 text-white' : 'border-stone-200 text-stone-500 hover:border-stone-800/50'}`}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {/* Question 3 */}
                    <div className="space-y-4">
                        <p className="font-bold text-[#2C2420] text-lg">3. ¿Sientes que la inflamación ha bajado considerablemente?</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleQuizAnswer('q3', true)}
                                className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${quizAnswers.q3 === true ? 'border-[#D4AF37] bg-[#D4AF37] text-white' : 'border-stone-200 text-stone-500 hover:border-[#D4AF37]/50'}`}
                            >
                                Sí
                            </button>
                            <button
                                onClick={() => handleQuizAnswer('q3', false)}
                                className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${quizAnswers.q3 === false ? 'border-stone-800 bg-stone-800 text-white' : 'border-stone-200 text-stone-500 hover:border-stone-800/50'}`}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {/* Result */}
                    {quizResult && (
                        <div className={`p-6 rounded-xl text-center border-2 animate-pulse-once ${quizResult === 'READY' ? 'border-green-500 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
                            {quizResult === 'READY' ? (
                                <>
                                    <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-serif text-green-800 mb-2">¡SÍ! Tu cuerpo está listo.</h3>
                                    <p className="text-green-700 mb-6">Es momento de cambiar a Stage 2 para empezar a moldear esa cintura.</p>
                                    <a href="#products-stage2" className="inline-block px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg">
                                        Ver Colección Stage 2
                                    </a>
                                </>
                            ) : (
                                <>
                                    <Info className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                                    <h3 className="text-2xl font-serif text-orange-800 mb-2">Espera un poco más.</h3>
                                    <p className="text-orange-700 mb-6">Tu cuerpo aún necesita la contención rígida de Stage 1 para evitar fibrosis. No te apresures.</p>
                                    <a href="#products-stage1" className="inline-block px-8 py-3 bg-[#2C2420] text-white font-bold rounded-lg hover:bg-black transition-colors shadow-lg">
                                        Renovar mi Stage 1
                                    </a>
                                </>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );

    const renderShoppable = () => (
        <div className="max-w-6xl mx-auto py-24 px-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-12">

                {/* Stage 1 Column */}
                <div id="products-stage1" className="space-y-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center text-[#2C2420] font-bold text-xl">1</div>
                        <div>
                            <h3 className="text-2xl font-serif text-[#2C2420]">Esenciales Stage 1</h3>
                            <p className="text-stone-500 text-sm">Máxima seguridad médica.</p>
                        </div>
                    </div>

                    {/* Product Card Placeholder */}
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all">
                        <div className="aspect-[4/5] bg-stone-200 relative">
                            <img src="/assets/stage1-card-thumb.jpg" alt="Faja Post-Quirúrgica Stage 1" className="w-full h-full object-cover" />
                            <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-bold uppercase rounded">Post-Quirúrgica</span>
                        </div>
                        <div className="p-6">
                            <h4 className="font-serif text-lg text-[#2C2420] mb-2">Faja Post-Quirúrgica Completa</h4>
                            <p className="text-stone-500 text-sm mb-4">Soporte médico certificado.</p>
                            <Link to="/post-quirurgica" className="block w-full py-3 text-center border border-[#2C2420] text-[#2C2420] font-bold rounded-lg hover:bg-[#2C2420] hover:text-white transition-colors">
                                Ver Colección Completa
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stage 2 Column */}
                <div id="products-stage2" className="space-y-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
                        <div>
                            <h3 className="text-2xl font-serif text-[#2C2420]">Favoritos Stage 2</h3>
                            <p className="text-stone-500 text-sm">Moldeado de cintura agresivo.</p>
                        </div>
                    </div>

                    {/* Product Card Placeholder */}
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all">
                        <div className="aspect-[4/5] bg-stone-200 relative">
                            <img src="/assets/essentials-flatlay.jpg" alt="Faja Reloj de Arena Stage 2 Best Seller" className="w-full h-full object-cover" />
                            <span className="absolute top-4 left-4 bg-[#D4AF37] text-white px-3 py-1 text-xs font-bold uppercase rounded">Best Seller</span>
                        </div>
                        <div className="p-6">
                            <h4 className="font-serif text-lg text-[#2C2420] mb-2">Reloj de Arena Stage 3</h4>
                            <p className="text-stone-500 text-sm mb-4">La favorita para definir cintura.</p>
                            <Link to="/collections/sculpt" className="block w-full py-3 text-center bg-[#D4AF37] text-white font-bold rounded-lg hover:bg-[#C5A028] transition-colors shadow-lg">
                                Ver Colección Moldeadora
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAF9F6]">
            <SeoHead
                title="Stage 1 vs Stage 2: Comparador Visual | Guitar Curves"
                description="Descubre visualmente la diferencia entre Fajas Stage 1 (Inflamación) y Stage 2 (Moldeo). Herramienta interactiva para saber cuándo cambiar de etapa."
                image="/assets/comparator/stage1-vs-stage2-social.jpg"
                path="/tools/stage1-vs-stage2"
                type="article"
                schema={{
                    type: 'tool',
                    data: {
                        name: 'Comparador Visual Stage 1 vs Stage 2',
                        description: 'Herramienta interactiva para comparar la compresión y materiales de fajas post-quirúrgicas.'
                    },
                    breadcrumbs: [
                        { name: 'Home', item: '/' },
                        { name: 'Tools', item: '/tools' },
                        { name: 'Stage Comparator', item: '/tools/stage1-vs-stage2' }
                    ]
                }}
            />
            {renderHero()}
            <div className="px-4 md:px-8">
                {renderSlider()}
                {renderTechDetails()}
                {renderTable()}
            </div>
            {renderQuiz()}
            {renderShoppable()}
        </div>
    );
}
