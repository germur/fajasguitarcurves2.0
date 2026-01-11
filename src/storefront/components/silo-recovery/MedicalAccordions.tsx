
import { ChevronDown } from 'lucide-react';

export function MedicalAccordions() {
    const faqs = [
        {
            question: "¿CUÁL ES LA DIFERENCIA ENTRE FAJA STAGE 1 Y STAGE 2?",
            answer: "La Stage 1 es de baja compresión para los primeros 7-10 días de inflamación. La Stage 2 (nuestra especialidad) es de alta compresión y es obligatoria desde la semana 2 para moldear la figura y adherir la piel."
        },
        {
            question: "¿CÓMO SÉ MI TALLA SI TENGO LA CINTURA INFLAMADA?",
            answer: "No compres tu talla de pantalón. Mídete la cintura y cadera actual. Si estás entre dos tallas en Stage 2, elige la más grande o usa extensores. Visita nuestra Guía de Tallas."
        },
        {
            question: "¿POR QUÉ NECESITO UN ORIFICIO PERINEAL O ZIPPER?",
            answer: "Los primeros días de recuperación son difíciles. Nuestro sistema de cierre perineal y zipper inferior está diseñado para permitirte ir al baño sin necesidad de quitarte la faja completa, lo que sería doloroso y complicado."
        },
        {
            question: "¿CÓMO EVITAR LA FIBROSIS?",
            answer: "El uso constante de una faja de alta compresión (Stage 2) junto con tablas abdominales y espumas ayuda a mantener una presión uniforme sobre la piel, evitando la acumulación irregular de líquidos que causa la fibrosis."
        }
    ];

    return (
        <div className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold text-[#A35944] uppercase tracking-widest block mb-2">Medical Knowledge Base</span>
                    <h2 className="text-2xl font-serif text-[#2C2420]">Preguntas Frecuentes de Recuperación</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <details key={idx} className="group border-b border-gray-100 pb-4">
                            <summary className="flex justify-between items-center cursor-pointer list-none py-4 text-sm font-bold text-gray-700 hover:text-[#A35944] transition-colors uppercase tracking-wide">
                                {faq.question}
                                <span className="transition-transform group-open:rotate-180">
                                    <ChevronDown size={16} />
                                </span>
                            </summary>
                            <div className="text-gray-500 text-sm leading-relaxed mt-2 pl-4 border-l-2 border-[#D4AF37]/30 animate-fade-in">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
