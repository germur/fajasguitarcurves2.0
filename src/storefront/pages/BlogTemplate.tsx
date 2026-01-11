import { GlassNavbar } from '../components/GlassNavbar';
import { DarkFooter } from '../components/DarkFooter';
import { Clock, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogTemplate() {
    return (
        <div className="font-sans text-[#3E322C] bg-white">
            <GlassNavbar />

            <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* COLUMNA IZQUIERDA: CONTENIDO (70%) */}
                <article className="lg:col-span-2">
                    {/* Header del Artículo */}
                    <header className="mb-10 text-center lg:text-left">
                        <span className="bg-stone-100 text-stone-500 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                            Guía de Recuperación
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl mt-6 mb-6 leading-tight text-[#3E322C]">
                            5 Trucos para Evitar la Fibrosis después de tu Lipo
                        </h1>
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-stone-400 font-medium">
                            <span>Por: Equipo Guitar Curves</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> 5 min de lectura</span>
                        </div>
                    </header>

                    <img
                        src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2694&auto=format&fit=crop"
                        alt="Recovery Massage"
                        className="w-full h-96 object-cover rounded-2xl mb-12 shadow-md"
                    />

                    {/* Cuerpo del Texto (Simulado) */}
                    <div className="prose prose-lg prose-headings:font-serif prose-headings:text-[#3E322C] prose-p:text-stone-600 prose-a:text-[#D4AF37] max-w-none">
                        <p className="lead text-xl text-stone-800 font-medium leading-relaxed">
                            La fibrosis no es "mala suerte", es falta de compresión adecuada. Aquí te explicamos cómo usar tu tabla abdominal correctamente para esculpir resultados perfectos.
                        </p>

                        <h3 className="mt-8">1. La presión constante es clave</h3>
                        <p>
                            Imagina que tu piel está "flotando" sobre el músculo después de la cirugía. Si queda espacio vacío, el cuerpo lo llena con tejido cicatrizal desorganizado (fibrosis). El secreto no es apretar hasta asfixiar, sino mantener una presión <strong>uniforme y plana</strong>.
                        </p>

                        {/* BLOQUE DE PRODUCTO INCRUSTADO (Native Ad) */}
                        {/* BLOQUE ELIMINADO: TABLA ABDOMINAL (Producto No Existente) */}

                        <h3>2. Hidratación con Vitamina E</h3>
                        <p>
                            La piel traumatizada necesita nutrición. El tejido de alta compresión de nuestras fajas no es tela común; está infusionado con microcápsulas de Vitamina E, Ginkgo Biloba y Algas Marinas. Al contacto con tu calor corporal, estas cápsulas se rompen y liberan nutrientes directamente en tu piel mientras la usas.
                        </p>

                        <h3>3. La Etapa 2 es crucial</h3>
                        <p>
                            Muchas pacientes cometen el error de quedarse con la faja post-quirúrgica (Stage 1) por 3 meses. ¡Error! A las 2-3 semanas, cuando la inflamación baja, esa faja te quedará grande. Necesitas pasar a una <strong>Faja de Alta Compresión (Stage 2)</strong> para seguir moldeando la cintura. Si la faja no te aprieta, no está trabajando.
                        </p>

                        <blockquote className="border-l-4 border-[#D4AF37] pl-6 italic text-stone-500 my-8 bg-stone-50 py-4 pr-4 rounded-r-lg">
                            "El 70% del resultado de una lipo depende de los cuidados post-operatorios, no de la cirugía en sí." — Dr. Plastic Surgeon
                        </blockquote>

                        <h3>4. Usa la Espuma (Lipo Foam)</h3>
                        <p>
                            La tabla es rígida, pero la espuma es suave. Usa la espuma debajo de la tabla para proteger tu piel de marcas y asegurar que la compresión llegue a cada rincón.
                        </p>

                        <h3>5. Drenajes Linfáticos</h3>
                        <p>
                            No te saltes tus masajes. Ayudan a sacar el líquido retenido que la faja está movilizando.
                        </p>

                    </div>
                </article>

                {/* COLUMNA DERECHA: SIDEBAR STICKY (30%) */}
                <aside className="hidden lg:block">
                    <div className="sticky top-32 space-y-8">

                        {/* Widget: Fit Finder (Captación) */}
                        <div className="bg-[#3E322C] text-white p-8 rounded-2xl text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                            <Calculator size={32} className="mx-auto text-[#D4AF37] mb-4" />
                            <h3 className="font-serif text-2xl mb-3">¿Dudas con tu talla?</h3>
                            <p className="text-sm text-gray-300 mb-6 leading-relaxed">No adivines. Usa nuestra calculadora con IA en 30 segundos.</p>
                            <Link to="/pages/fit-finder" className="block bg-white text-[#3E322C] py-3.5 rounded-xl font-bold text-xs tracking-[0.2em] hover:bg-[#D4AF37] transition-all hover:-translate-y-1 shadow-lg">
                                CALCULAR AHORA
                            </Link>
                        </div>

                        {/* Widget: Top Sellers */}
                        <div className="border border-stone-200 rounded-2xl p-6 bg-white shadow-sm">
                            <h4 className="font-bold uppercase text-[10px] tracking-[0.2em] text-[#D4AF37] mb-6 pb-2 border-b border-stone-100">
                                Recomendados para ti
                            </h4>
                            <div className="space-y-6">
                                {/* Product 1 */}
                                <Link to="/products/hourglass-foundation" className="flex gap-4 items-center group">
                                    <div className="w-16 h-20 bg-stone-100 rounded-lg overflow-hidden">
                                        <img src="/api/placeholder/100/120" className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#3E322C] group-hover:text-[#D4AF37] transition-colors leading-tight mb-1">Faja Reloj de Arena</p>
                                        <p className="text-xs text-stone-500">$109.00</p>
                                    </div>
                                </Link>
                                {/* Product 2 */}

                            </div>
                        </div>

                    </div>
                </aside>

            </div>
            <DarkFooter />
        </div>
    );
}
