import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function FibrosisBible() {
    return (
        <article className="max-w-3xl mx-auto px-6 py-20 font-sans text-stone-800">
            <header className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 bg-[#F5EDDF] text-[#A35944] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    <Shield size={14} />
                    Guía Médica
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-[#2C2420] mb-6 leading-tight">
                    La Biblia de la Fibrosis: Todo lo que debes saber
                </h1>
                <p className="text-xl text-stone-500 font-light max-w-2xl mx-auto">
                    Evita el endurecimiento post-quirúrgico con estas claves esenciales de recuperación.
                </p>
            </header>

            <div className="prose prose-stone prose-lg mx-auto">
                <p>
                    La fibrosis es una de las complicaciones más comunes y temidas después de una liposucción.
                    Se manifiesta como un endurecimiento de los tejidos y bultos dolorosos bajo la piel.
                </p>
                <p>
                    Para prevenirla, es crucial utilizar <span className="font-bold text-[#2C2420]">compresión de grado médico</span> constante durante las primeras semanas.
                </p>

                {/* INTERNAL LINK - SEO CLUSTER STRATEGY */}
                <div className="my-10 p-8 bg-[#FAF9F6] border-l-4 border-[#D4AF37] rounded-r-xl">
                    <h3 className="font-serif text-2xl text-[#2C2420] mb-3">La Solución Correcta</h3>
                    <p className="mb-6 text-stone-600">
                        No todas las fajas sirven para esta etapa. Necesitas materiales específicos que ofrezcan soporte uniforme sin cortar la circulación.
                    </p>
                    <Link
                        to="/colecciones/recuperacion?tag=Etapa+2"
                        className="inline-flex items-center gap-2 bg-[#2C2420] text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-[#D4AF37] transition-colors"
                    >
                        Ver Fajas Anti-Fibrosis
                    </Link>
                </div>

                <p>
                    Además de la prenda correcta, asegúrate de realizar drenajes linfáticos manuales con un profesional certificado para movilizar los fluidos retenidos.
                </p>
            </div>
        </article>
    );
}
