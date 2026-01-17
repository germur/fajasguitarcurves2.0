
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../lib/seo/SeoHead';

export default function OurStoryPage() {
    return (
        <div className="bg-[#FAF9F6] font-sans text-[#3E322C]">
            <SeoHead
                title="Nuestra Historia: Ingeniería Textil de Medellín | Guitar Curves"
                description="Conoce el origen de Guitar Curves. No es Fast Fashion, es artesanía colombiana diseñada por Nelly Perez para curvas reales."
                path="/pages/our-story"
                schema={{
                    type: 'article', // Using article as a proxy for AboutPage content for now
                    data: {
                        name: "Nuestra Historia - Guitar Curves",
                        description: "La historia de ingeniería textil detrás de Guitar Curves."
                    },
                    breadcrumbs: [
                        { name: 'Home', item: '/' },
                        { name: 'Nuestra Historia', item: '/pages/our-story' }
                    ]
                }}
            />

            {/* 1. HERO CINEMÁTICO */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                {/* Fallback to Image since video is not generated */}
                <div className="absolute inset-0 w-full h-full bg-[#1a1a1a]">
                    <img
                        src="/assets/sewing-detail.png"
                        alt="Sewing Detail"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>

                <div className="relative z-20 text-center text-white px-4">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="font-serif text-5xl md:text-7xl mb-4"
                    >
                        La Ingeniería<br />Detrás de la Curva
                    </motion.h1>
                    <p className="text-xl font-light tracking-widest uppercase">Heritage & Engineering</p>
                </div>
            </section>

            {/* 2. THE FOUNDER (Split Layout) */}
            <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Video con marco desplazado estilo editorial */}
                    <div className="absolute inset-0 border-2 border-[#D4AF37] translate-x-4 translate-y-4"></div>
                    <video
                        src="/assets/nelly-video.mp4"
                        controls
                        playsInline
                        className="relative z-10 w-full h-auto shadow-xl object-cover"
                    />
                </motion.div>

                <div className="space-y-6">
                    <h2 className="font-serif text-4xl leading-tight">
                        "No diseñamos para maniquíes. <span className="italic text-[#D4AF37]">Diseñamos para mujeres reales.</span>"
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-600">
                        Guitar Curves nació en los talleres textiles de Medellín, Colombia, la capital mundial de la faja. Mientras la industria masiva intentaba encajar cuerpos latinos en moldes estándar, nosotros hicimos lo contrario: estudiamos la anatomía de la mujer con curvas reales (cintura pequeña, cadera amplia) y creamos un patrón que la respeta.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-600">
                        No somos 'Fast Fashion'; somos herencia artesanal transmitida por manos expertas que llevan más de 20 años cosiendo confianza.
                    </p>
                    <div className="pt-4">
                        <p className="font-serif text-2xl italic text-[#D4AF37]">Nelly Perez</p>
                        <p className="text-xs uppercase tracking-widest text-gray-400">Fundadora & Master Pattern Maker</p>
                    </div>
                </div>
            </section>

            {/* 3. THE "MADE IN COLOMBIA" BADGE */}
            <section className="bg-[#3E322C] text-white py-24">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <div className="flex justify-center mb-8">
                        <span className="text-6xl">🇨🇴</span>
                    </div>
                    <h3 className="font-serif text-3xl mb-6">Autenticidad Garantizada</h3>
                    <p className="text-xl font-light leading-relaxed opacity-90">
                        Rechazamos el "Fast Fashion". Cada una de nuestras prendas es confeccionada en Colombia bajo estándares éticos, utilizando Powernet de grado médico certificado. Cuando compras Guitar Curves, no solo compras una faja, inviertes en calidad que dura años.
                    </p>
                </div>
            </section>

            {/* 3.5 THE "GUITAR CUT" SECRET (Autoridad Técnica) */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl text-[#3E322C]">El Secreto del "Guitar Cut"</h2>
                        <p className="text-gray-500 mt-4 max-w-3xl mx-auto leading-relaxed">
                            El secreto no está solo en la tela, sino en la tensión. Utilizamos Powernet de Grado Médico con memoria inteligente: una tela bidireccional que comprime firmemente donde necesitas control (abdomen y espalda) pero cede suavemente donde necesitas volumen (glúteos y cadera). Sin aplanar, sin asfixiar. Cada costura es plana y está reforzada con Vitamina E para nutrir tu piel mientras te recuperas.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-[#F2F2F2] rounded-full mx-auto flex items-center justify-center text-2xl">⏳</div>
                            <h4 className="font-bold text-xl">El "Guitar Fit"</h4>
                            <p className="text-sm text-gray-500">Patrones únicos con radio cintura-cadera ampliado.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-[#F2F2F2] rounded-full mx-auto flex items-center justify-center text-2xl">🩺</div>
                            <h4 className="font-bold text-xl">Grado Médico</h4>
                            <p className="text-sm text-gray-500">Compresión certificada para recuperación post-quirúrgica.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-[#F2F2F2] rounded-full mx-auto flex items-center justify-center text-2xl">🌿</div>
                            <h4 className="font-bold text-xl">Cuidado de la Piel</h4>
                            <p className="text-sm text-gray-500">Tejidos infundidos con Vitamina E y Aloe Vera.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. MANIFESTO (Valores) */}
            <section className="bg-[#2C2420] py-12 overflow-hidden whitespace-nowrap">
                <div className="animate-marquee inline-block">
                    <span className="text-4xl md:text-6xl font-bold text-white/10 uppercase mx-8">CONFIDENCE • RECOVERY • CURVES • POWER •</span>
                    <span className="text-4xl md:text-6xl font-bold text-white/10 uppercase mx-8">CONFIDENCE • RECOVERY • CURVES • POWER •</span>
                    <span className="text-4xl md:text-6xl font-bold text-white/10 uppercase mx-8">CONFIDENCE • RECOVERY • CURVES • POWER •</span>
                    <span className="text-4xl md:text-6xl font-bold text-white/10 uppercase mx-8">CONFIDENCE • RECOVERY • CURVES • POWER •</span>
                </div>
            </section>


            {/* 6. CTA FINAL */}
            <section className="py-24 bg-[#F9F8F6] text-center">
                <h2 className="font-serif text-4xl mb-6">Ya conoces nuestra historia.</h2>
                <p className="text-xl text-gray-600 mb-8">Ahora empieza a escribir la tuya con tu nuevo cuerpo.</p>
                <Link to="/fit-finder" className="inline-block bg-[#D4AF37] text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-[#B49286] transition-colors shadow-lg">
                    ENCONTRAR MI FAJA IDEAL
                </Link>
            </section>

        </div>
    );
}
