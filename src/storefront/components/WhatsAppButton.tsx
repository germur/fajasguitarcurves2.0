import { useEffect, useState } from 'react';

export function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Delay appearance slightly for a smooth effect
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const phoneNumber = "14077585862";
    const message = "Hola, me gustaría recibir asesoría sobre mi talla.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                fixed bottom-6 right-6 z-[999] 
                flex items-center justify-center 
                w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl 
                hover:bg-[#1DA851] hover:scale-110 transition-all duration-300
                group
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
            aria-label="Chat on WhatsApp"
        >
            {/* WhatsApp Icon (SVG for authenticity) */}
            <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="fill-white stroke-none"
            >
                <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.767-.721 2.016-1.418.249-.694.249-1.289.173-1.418-.074-.125-.272-.198-.572-.349z" fill="currentColor"></path>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.539 4.076 1.487 5.821l-1.6 5.864 6.002-1.558C7.794 23.334 9.832 23.95 12 23.95c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.822c-1.805 0-3.522-.497-5.02-1.39l-3.568.926.963-3.46C3.41 16.333 2.83 14.238 2.83 12c0-5.059 4.118-9.167 9.17-9.167 5.055 0 9.17 4.108 9.17 9.167 0 5.062-4.115 9.173-9.17 9.173z" fill="currentColor"></path>
            </svg>

            {/* Tooltip / Callout */}
            <span className="
                absolute right-full mr-4 bg-white text-[#2C2420] text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg
                whitespace-nowrap
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                pointer-events-none
            ">
                ¿Necesitas ayuda?
            </span>
        </a>
    );
}
