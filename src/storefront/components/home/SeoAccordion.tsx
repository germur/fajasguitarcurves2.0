import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function SeoAccordion() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="bg-[#FAF9F6] border-t border-stone-200 py-12">
            <div className="max-w-4xl mx-auto px-6">

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between text-[#2C2420] font-bold text-lg md:text-xl py-4 border-b border-stone-300 focus:outline-none"
                >
                    <span>La Guía Definitiva de Fajas Colombianas en USA</span>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                    <div className="prose prose-stone max-w-none text-sm md:text-base text-stone-600 space-y-4">
                        <p>
                            Bienvenida a <strong>Fajas Guitar Curves</strong>, la marca líder en prendas de compresión de grado médico diseñada específicamente para cuerpos con curvas latinas (BBL, Lipoescultura y genética de reloj de arena). Entendemos que encontrar la faja correcta en Estados Unidos puede ser difícil.
                        </p>

                        <h3 className="text-[#2C2420] font-bold">¿Qué etapa necesito?</h3>
                        <ul className="list-disc pl-5">
                            <li><strong>Etapa 1 (Inmediata):</strong> Uso 24/7 durante las primeras 2 semanas post-op. Baja compresión, alta elasticidad para acomodar la inflamación.</li>
                            <li><strong>Etapa 2 (Moldeo):</strong> A partir de la semana 3. Alta compresión (Powernet) para esculpir la cintura mientras proteges los glúteos injertados.</li>
                            <li><strong>Etapa 3 (Mantenimiento):</strong> Para uso diario y eventos. Invisible bajo la ropa.</li>
                        </ul>

                        <h3 className="text-[#2C2420] font-bold">Envíos Locales</h3>
                        <p>
                            Olvídate de esperar semanas por un envío internacional. Nuestro almacén centralizado en USA garantiza entregas rápidas a <strong>Houston, Miami, New York, Los Angeles</strong> y más allá.
                        </p>

                        <p className="text-xs italic mt-4">
                            Keywords: Fajas Colombianas, BBL Shapewear, Stage 2 Faja, Waist Trainer, High Compression Garments, Post Surgery Supplies.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
