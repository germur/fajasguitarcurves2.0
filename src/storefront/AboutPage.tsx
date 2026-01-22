import { CheckCircle2, Factory, BarChart3, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen font-sans pb-20">
            {/* Hero */}
            <div className="bg-[#2C2420] text-[#F5EDDF] py-24 px-6 text-center">
                <span className="inline-block px-3 py-1 bg-[#D1AB66] text-[#2C2420] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                    Nuestro Manifiesto
                </span>
                <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8">
                    La Ingeniería <br /> de las Curvas.
                </h1>
                <p className="text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
                    Por qué dejamos de diseñar "fajas" y empezamos a construir arquitectura corporal de grado quirúrgico.
                </p>
            </div>

            {/* The Problem Section */}
            <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    <div className="absolute -inset-4 bg-red-50 rounded-3xl transform -rotate-2" />
                    <img
                        src="/assets/about-problem-gap.jpg"
                        alt="El Problema del Hueco en la Cintura"
                        className="relative rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-8 right-8 bg-red-600 text-white p-4 rounded-lg shadow-lg rotate-3">
                        <span className="block text-2xl font-bold">El Hueco.</span>
                        <span className="text-xs font-medium">Por qué el 90% de las fajas se enrollan.</span>
                    </div>
                </div>
                <div>
                    <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2 block">El Fallo de la Industria</span>
                    <h2 className="font-serif text-4xl font-bold text-[#2C2420] mb-6">
                        Diseñadas para Cilindros, <br /> No para Relojes de Arena.
                    </h2>
                    <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                        La manufactura estándar usa "El Método del Tubo". Es más barato coser un tubo recto de tela elástica.
                        Pero tu cuerpo no es un tubo. Cuando una mujer con curvas se pone un tubo, la física contraataca.
                        La tela se enrolla en la cintura y corta las caderas. No eres tú. Es la geometría.
                    </p>

                    <div className="grid grid-cols-2 gap-6 mt-8">
                        {['Hueco en Cintura', 'Se Enrolla', 'Hip Dips', 'Rozaduras'].map((item) => (
                            <div key={item} className="flex items-center gap-2 text-stone-500 font-medium line-through decoration-red-400 decoration-2">
                                <span className="w-2 h-2 bg-red-400 rounded-full" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* The Solution (Guitar Tech) */}
            <div className="bg-[#FAF9F6] py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-[#D1AB66] font-bold uppercase tracking-widest text-xs mb-2 block">Nuestra Innovación</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2420]">
                            Arquitectura Guitar Tech™
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-[#2C2420] rounded-2xl flex items-center justify-center text-[#D1AB66] mb-6">
                                <Factory className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl text-[#2C2420] mb-4">Tallaje por Ratio Dorado</h3>
                            <p className="text-stone-500 leading-relaxed">
                                Agregamos la variable "Ratio". Calculamos la diferencia entre el radio de cintura y cadera, creando una prenda que es usualmente 14 pulgadas más pequeña en la cintura que en las caderas.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 bg-[#D1AB66] text-[#2C2420] font-bold text-xs rounded-bl-2xl">PATENTADO</div>
                            <div className="w-16 h-16 bg-[#2C2420] rounded-2xl flex items-center justify-center text-[#D1AB66] mb-6">
                                <BarChart3 className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl text-[#2C2420] mb-4">Zonas de Confort</h3>
                            <p className="text-stone-500 leading-relaxed">
                                Alta compresión donde necesitas moldear (Zona Roja). Cero compresión donde necesitas volumen (Zona Verde).
                                No más BBLs aplastados.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-[#2C2420] rounded-2xl flex items-center justify-center text-[#D1AB66] mb-6">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl text-[#2C2420] mb-4">Probado en Comunidad</h3>
                            <p className="text-stone-500 leading-relaxed">
                                Cada prototipo se prueba no en maniquíes, sino en pacientes reales post-operadas en varias etapas de recuperación.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-[#2C2420] py-20 text-[#F5EDDF]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-5xl font-bold font-serif mb-2">10k+</div>
                        <div className="text-sm uppercase tracking-widest text-[#D1AB66]">Cinturas Esculpidas</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold font-serif mb-2">0</div>
                        <div className="text-sm uppercase tracking-widest text-[#D1AB66]">Rozaduras de Faja</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold font-serif mb-2">98%</div>
                        <div className="text-sm uppercase tracking-widest text-[#D1AB66]">Tasa de Retención</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold font-serif mb-2">24/7</div>
                        <div className="text-sm uppercase tracking-widest text-[#D1AB66]">Soporte Disponible</div>
                    </div>
                </div>
            </div>

            <div className="text-center py-20 px-6">
                <CheckCircle2 className="w-12 h-12 text-[#D1AB66] mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-[#2C2420] mb-4 font-serif">¿Lista para sentir la diferencia?</h2>
                <Link to="/colecciones/todo" className="inline-block bg-[#A35944] text-white px-8 py-4 rounded-full font-bold hover:bg-[#2C2420] transition-colors">
                    VER LA COLECCIÓN SIGNATURE
                </Link>
            </div>

        </div>
    );
}
