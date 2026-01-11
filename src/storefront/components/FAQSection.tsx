import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
}

const faqData: FAQItemProps[] = [
    {
        question: "¿Cómo sé si necesito una Faja Stage 1 o Stage 2?",
        answer: "La Stage 1 es de baja compresión, ideal para la primera semana post-op cuando estás muy inflamada. La Stage 2 (nuestra especialidad) es de alta compresión y se usa a partir de la semana 2 o 3 para moldear y pegar la piel al músculo.",
    },
    {
        question: "¿El modelo Guitar Curves sirve si no me he operado?",
        answer: "¡Sí! Si tu cuerpo es natural pero tienes cintura pequeña y caderas anchas, nuestras fajas evitarán que se te hagan bolsas en la espalda o que te aprieten demasiado en los muslos.",
    },
    {
        question: "¿Cómo voy al baño con la faja puesta?",
        answer: "Todas nuestras fajas Stage 2 y 3 cuentan con un cierre perineal (zipper) o una abertura anatómica diseñada para que no tengas que quitártela cada vez que vas al baño.",
    },
    {
        question: "¿Si soy S de cintura pero XL de cadera, qué talla pido?",
        answer: "Esta es la especialidad de Guitar Curves. Nuestra talla 'Guitar' está diseñada específicamente para esta proporción. Si seleccionas una talla regular, te quedará grande de cintura. En nuestra Guía de Tallas busca las opciones 'Guitar' o 'BBL' que tienen 2 tallas de diferencia entre cintura y cadera.",
    },
    {
        question: "¿Cuándo envían mi pedido?",
        answer: "Los pedidos realizados antes de las 2:00 PM EST se envían el mismo día. El envío estándar toma 3-5 días hábiles dentro de USA. Ofrecemos opciones Express si lo necesitas urgente para tu cirugía.",
    }
];

export function FAQSection() {
    // Inject Schema Markup for SEO
    useEffect(() => {
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schemaData);
        script.id = 'faq-schema';
        document.head.appendChild(script);

        return () => {
            const existing = document.getElementById('faq-schema');
            if (existing) document.head.removeChild(existing);
        };
    }, []);

    return (
        <section className="max-w-3xl mx-auto py-12 px-4">
            <div className="text-center mb-10">
                <h2 className="font-serif text-3xl text-[#2C2420]">Preguntas Frecuentes</h2>
                <p className="text-gray-500 mt-2">Respuestas claras para decisiones seguras.</p>
            </div>

            <div className="space-y-4">
                {faqData.map((item, index) => (
                    <AccordionItem key={index} question={item.question} answer={item.answer} />
                ))}
            </div>
        </section>
    );
}

// Visual Accordion Component
function AccordionItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 bg-white ${isOpen ? 'border-[#D4AF37] shadow-md' : 'hover:border-gray-300'}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 text-left bg-white focus:outline-none"
            >
                <span className="font-bold text-[#2C2420] pr-8">{question}</span>
                <ChevronDown
                    className={`text-[#D4AF37] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    size={20}
                />
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed border-l-4 border-[#D4AF37] ml-5 mb-5 pl-4">
                    {answer}
                </div>
            </div>
        </div>
    );
}
