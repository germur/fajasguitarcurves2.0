import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../../lib/seo/SeoHead';
import { useTranslation } from 'react-i18next';
import {
    CheckCircle2,
    Info,
    MoveHorizontal
} from 'lucide-react';

export default function StageComparator() {
    const { t } = useTranslation();
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
                    {t('pages.stage_comparator.hero.badge')}
                </span>
                <h1 className="font-serif text-4xl md:text-6xl leading-tight">
                    {t('pages.stage_comparator.hero.title')}
                </h1>
                <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
                    {t('pages.stage_comparator.hero.description')}
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <a href="#comparison" className="px-8 py-4 bg-[#D4AF37] text-white rounded-full font-bold hover:bg-white hover:text-[#2C2420] transition-colors shadow-lg">
                        {t('pages.stage_comparator.intro.cta_visual')}
                    </a>
                    <a href="#quiz" className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-bold hover:bg-white hover:text-[#2C2420] transition-colors border border-white/20">
                        {t('pages.stage_comparator.intro.cta_quiz')}
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
                        {t('pages.stage_comparator.slider.badge')}
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#2C2420] mb-4">{t('pages.stage_comparator.slider.title')}</h2>
                    <p className="text-stone-500">{t('pages.stage_comparator.slider.description')}</p>
                </div>

                <div
                    className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize group touch-none"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                >
                    {/* Image Layer: Stage 2 (Background) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[#F5F2EB]">
                        <img src="/assets/comparator/stage2-slider.png" alt="Resultado final Faja Stage 2 Cintura de Avispa" className="w-full h-full object-cover object-top pointer-events-none select-none" draggable="false" />
                        <span className="absolute top-8 right-8 bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-bold shadow-lg pointer-events-none z-10">{t('pages.stage_comparator.slider.label_stage2')}</span>
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
                        <span className="absolute top-8 left-8 bg-white/90 text-[#2C2420] px-4 py-2 rounded-lg font-bold shadow-lg pointer-events-none z-10">{t('pages.stage_comparator.slider.label_stage1')}</span>
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

    const renderTechDetails = () => {
        const techItems = t('pages.stage_comparator.tech.items', { returnObjects: true }) as Array<{ title: string, desc: string }>;
        const images = [
            "/assets/comparator/stage1-stretch.png",
            "/assets/comparator/zipper-detail.png",
            "/assets/comparator/glute-detail.png"
        ];

        return (
            <div className="max-w-6xl mx-auto mb-24 animate-fade-in">
                <div className="text-center mb-16">
                    <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs mb-2 block">{t('pages.stage_comparator.tech.badge')}</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#2C2420]">{t('pages.stage_comparator.tech.title')}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {techItems.map((item, index) => (
                        <div key={index} className={`group space-y-4 ${index === 2 ? 'lg:col-span-1 md:col-span-2 lg:col-start-auto md:w-1/2 md:mx-auto lg:w-full' : ''}`}>
                            <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100 shadow-md">
                                <img src={images[index]} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl text-center shadow-sm">
                                    <p className="font-bold text-[#2C2420] text-sm">{item.title}</p>
                                </div>
                            </div>
                            <p className="text-stone-500 text-sm text-center px-4">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderTable = () => {
        const tableRows = t('pages.stage_comparator.table.rows', { returnObjects: true }) as Array<{ label: string, s1: string, s2: string }>;
        const headers = t('pages.stage_comparator.table.headers', { returnObjects: true }) as string[];

        return (
            <div className="max-w-4xl mx-auto mb-24 animate-fade-in bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-stone-100">
                <h2 className="font-serif text-3xl md:text-4xl text-[#2C2420] text-center mb-12">{t('pages.stage_comparator.table.title')}</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-stone-100">
                                <th className="py-4 px-4 font-serif text-xl text-[#2C2420] w-1/3">{headers[0]}</th>
                                <th className="py-4 px-4 font-bold text-[#2C2420] text-center w-1/3 bg-stone-50 rounded-t-xl">{headers[1]}</th>
                                <th className="py-4 px-4 font-bold text-[#D4AF37] text-center w-1/3 bg-[#D4AF37]/5 rounded-t-xl">{headers[2]}</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm md:text-base">
                            {tableRows.map((row, i) => (
                                <tr key={i} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                                    <td className="py-6 px-4 font-bold text-[#2C2420]">{row.label}</td>
                                    <td className="py-6 px-4 text-center text-stone-600">{row.s1}</td>
                                    <td className="py-6 px-4 text-center text-stone-600 font-bold">{row.s2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderQuiz = () => {
        const questions = t('pages.stage_comparator.quiz.questions', { returnObjects: true }) as string[];

        return (
            <div id="quiz" className="bg-[#FAF9F6] py-24 border-y border-stone-200">
                <div className="max-w-2xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs mb-2 block">{t('pages.stage_comparator.quiz.badge')}</span>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#2C2420] mb-4">{t('pages.stage_comparator.quiz.title')}</h2>
                        <p className="text-stone-500">{t('pages.stage_comparator.quiz.description')}</p>
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl space-y-8">

                        {questions.map((q, index) => {
                            const qKey = `q${index + 1}` as 'q1' | 'q2' | 'q3';
                            return (
                                <div key={index} className="space-y-4">
                                    <p className="font-bold text-[#2C2420] text-lg">{index + 1}. {q}</p>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleQuizAnswer(qKey, true)}
                                            className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${quizAnswers[qKey] === true ? 'border-[#D4AF37] bg-[#D4AF37] text-white' : 'border-stone-200 text-stone-500 hover:border-[#D4AF37]/50'}`}
                                        >
                                            {t('pages.stage_comparator.quiz.options.yes')}
                                        </button>
                                        <button
                                            onClick={() => handleQuizAnswer(qKey, false)}
                                            className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${quizAnswers[qKey] === false ? 'border-stone-800 bg-stone-800 text-white' : 'border-stone-200 text-stone-500 hover:border-stone-800/50'}`}
                                        >
                                            {t('pages.stage_comparator.quiz.options.no')}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Result */}
                        {quizResult && (
                            <div className={`p-6 rounded-xl text-center border-2 animate-pulse-once ${quizResult === 'READY' ? 'border-green-500 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
                                {quizResult === 'READY' ? (
                                    <>
                                        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                        <h3 className="text-2xl font-serif text-green-800 mb-2">{t('pages.stage_comparator.quiz.result_ready.title')}</h3>
                                        <p className="text-green-700 mb-6">{t('pages.stage_comparator.quiz.result_ready.desc')}</p>
                                        <a href="#products-stage2" className="inline-block px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg">
                                            {t('pages.stage_comparator.quiz.result_ready.cta')}
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <Info className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                                        <h3 className="text-2xl font-serif text-orange-800 mb-2">{t('pages.stage_comparator.quiz.result_wait.title')}</h3>
                                        <p className="text-orange-700 mb-6">{t('pages.stage_comparator.quiz.result_wait.desc')}</p>
                                        <a href="#products-stage1" className="inline-block px-8 py-3 bg-[#2C2420] text-white font-bold rounded-lg hover:bg-black transition-colors shadow-lg">
                                            {t('pages.stage_comparator.quiz.result_wait.cta')}
                                        </a>
                                    </>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        );
    };

    const renderShoppable = () => (
        <div className="max-w-6xl mx-auto py-24 px-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-12">

                {/* Stage 1 Column */}
                <div id="products-stage1" className="space-y-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center text-[#2C2420] font-bold text-xl">1</div>
                        <div>
                            <h3 className="text-2xl font-serif text-[#2C2420]">{t('pages.stage_comparator.shoppable.stage1.title')}</h3>
                            <p className="text-stone-500 text-sm">{t('pages.stage_comparator.shoppable.stage1.subtitle')}</p>
                        </div>
                    </div>

                    {/* Product Card Placeholder */}
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all">
                        <div className="aspect-[4/5] bg-stone-200 relative">
                            <img src="/assets/stage1-card-thumb.jpg" alt="Faja Post-Quirúrgica Stage 1" className="w-full h-full object-cover" />
                            <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-bold uppercase rounded">{t('pages.stage_comparator.shoppable.stage1.card.badge')}</span>
                        </div>
                        <div className="p-6">
                            <h4 className="font-serif text-lg text-[#2C2420] mb-2">{t('pages.stage_comparator.shoppable.stage1.card.title')}</h4>
                            <p className="text-stone-500 text-sm mb-4">{t('pages.stage_comparator.shoppable.stage1.card.desc')}</p>
                            <Link to="/post-quirurgica" className="block w-full py-3 text-center border border-[#2C2420] text-[#2C2420] font-bold rounded-lg hover:bg-[#2C2420] hover:text-white transition-colors">
                                {t('pages.stage_comparator.shoppable.stage1.card.cta')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stage 2 Column */}
                <div id="products-stage2" className="space-y-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
                        <div>
                            <h3 className="text-2xl font-serif text-[#2C2420]">{t('pages.stage_comparator.shoppable.stage2.title')}</h3>
                            <p className="text-stone-500 text-sm">{t('pages.stage_comparator.shoppable.stage2.subtitle')}</p>
                        </div>
                    </div>

                    {/* Product Card Placeholder */}
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all">
                        <div className="aspect-[4/5] bg-stone-200 relative">
                            <img src="/assets/essentials-flatlay.jpg" alt="Faja Reloj de Arena Stage 2 Best Seller" className="w-full h-full object-cover" />
                            <span className="absolute top-4 left-4 bg-[#D4AF37] text-white px-3 py-1 text-xs font-bold uppercase rounded">{t('pages.stage_comparator.shoppable.stage2.card.badge')}</span>
                        </div>
                        <div className="p-6">
                            <h4 className="font-serif text-lg text-[#2C2420] mb-2">{t('pages.stage_comparator.shoppable.stage2.card.title')}</h4>
                            <p className="text-stone-500 text-sm mb-4">{t('pages.stage_comparator.shoppable.stage2.card.desc')}</p>
                            <Link to="/colecciones/moldeo" className="block w-full py-3 text-center bg-[#D4AF37] text-white font-bold rounded-lg hover:bg-[#C5A028] transition-colors shadow-lg">
                                {t('pages.stage_comparator.shoppable.stage2.card.cta')}
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
                title={t('pages.stage_comparator.seo.title')}
                description={t('pages.stage_comparator.seo.description')}
                image="/assets/comparator/stage1-vs-stage2-social.jpg"
                path="/tools/stage1-vs-stage2"
                type="article"
                schema={{
                    type: 'tool',
                    data: {
                        name: t('pages.stage_comparator.seo.title'),
                        description: t('pages.stage_comparator.seo.description')
                    },
                    breadcrumbs: [
                        { name: t('nav.home') || 'Inicio', item: '/' },
                        { name: t('nav.tools') || 'Herramientas', item: '/herramientas' },
                        { name: t('pages.stage_comparator.seo.title'), item: '/herramientas/etapa1-vs-etapa2' }
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
