import { PolicyLayout } from './components/PolicyLayout';
import { SeoHead } from './components/SeoHead';

export function ReturnsPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
    };

    return (
        <>
            <SeoHead
                title="Garantía de Ajuste y Cambios | Fajas Guitar Curves"
                description="Cambios de talla gratis en tu primera compra. Garantía de ajuste perfecto por 30 días."
                schema={schema}
            />
            <PolicyLayout title="Garantía de Ajuste Perfecto & Política de Cambios" lastUpdated="January 1, 2026">

                <p className="lead text-xl text-stone-600 mb-8">
                    Queremos que te sientas espectacular y segura. Sabemos que comprar una faja colombiana por internet puede generar dudas.
                    ¿Me cerrará en la cintura? ¿Me entrará en las caderas? Entendemos que tu cuerpo es único, especialmente si estás en un proceso post-quirúrgico o tienes nuestras curvas "Guitar Shape".
                </p>
                <p>
                    Por eso, en Guitar Curves, eliminamos el riesgo de tu compra con nuestra <strong>Garantía de Ajuste Perfecto</strong>.
                </p>

                <hr className="my-12 border-stone-200" />

                <h3 className="flex items-center gap-2">
                    <span className="text-2xl">✨</span> Nuestra Promesa: El Primer Cambio es GRATIS
                </h3>
                <p>
                    Si recibes tu faja y no es tu talla correcta, nosotros cubrimos el costo de envío para cambiártela por la talla que necesitas (válido para el primer cambio dentro de EE. UU.).
                    Queremos asegurarnos de que obtengas ese efecto "snatched" y la compresión médica adecuada sin que te cueste más.
                </p>

                <div className="bg-[#FFF8F0] p-8 rounded-2xl border border-[#D1AB66]/30 my-10">
                    <h3 className="text-[#A35944] mt-0 flex items-center gap-2">
                        <span className="text-2xl">⚠️</span> Reglas de Higiene (LEER ANTES DE PROBAR)
                    </h3>
                    <p className="font-medium">
                        Por regulaciones de salud estrictas y para garantizar la seguridad de todas nuestras clientas (muchas de ellas en recuperación de heridas abiertas), somos inflexibles con la higiene.
                    </p>
                    <p>
                        Nuestras prendas son de uso íntimo. Para que un cambio o devolución sea aceptado, la prenda debe cumplir estrictamente con lo siguiente:
                    </p>
                    <ol>
                        <li><strong>PRUÉBATELA SOBRE TU ROPA INTERIOR:</strong> Nunca te pruebes la faja directamente sobre la piel.</li>
                        <li><strong>SIN MANCHAS NI FLUIDOS:</strong> No aceptaremos prendas con manchas de desodorante, maquillaje, lociones corporales, fluidos corporales o sangre (en casos post-quirúrgicos).</li>
                        <li><strong>SIN OLORES:</strong> La prenda no debe oler a perfume, humo de cigarrillo, detergente o suavizante.</li>
                        <li><strong>ESTADO ORIGINAL:</strong> Debe tener todas las etiquetas pegadas y su empaque original intacto.</li>
                    </ol>
                    <p className="text-sm font-bold text-red-600 mt-4">
                        🛑 IMPORTANTE: Si recibimos una prenda que no cumple con estas condiciones, será rechazada inmediatamente y te la devolveremos a tu cargo. No podemos revender una prenda usada por riesgo biológico. Gracias por tu comprensión y respeto hacia nuestra comunidad.
                    </p>
                </div>

                <h3>🔄 Cómo realizar un cambio o devolución</h3>
                <p>Tienes <strong>30 días</strong> a partir de la fecha de entrega para iniciar tu proceso.</p>
                <ol>
                    <li><strong>Inicia tu Solicitud:</strong> Envía un correo a <a href="mailto:soporte@guitarcurves.com">soporte@guitarcurves.com</a> con tu Número de Orden y el motivo (ej. "Necesito una talla más grande").</li>
                    <li><strong>Aprobación:</strong> Nuestro equipo revisará tu solicitud y te enviará una Etiqueta de Envío Pre-pagada (para cambios de talla).</li>
                    <li><strong>Envío:</strong> Empaca la faja en su bolsa original, pega la etiqueta y déjala en la oficina de correo más cercana.</li>
                    <li><strong>Recibe tu Nueva Faja:</strong> Una vez recibamos tu paquete y verifiquemos que cumple con las reglas de higiene, te enviaremos tu nueva talla en 24-48 horas hábiles.</li>
                </ol>

                <h3>❌ Artículos que NO tienen devolución (Venta Final)</h3>
                <p>Por seguridad e higiene, los siguientes artículos son venta final y no pueden cambiarse ni devolverse:</p>
                <ul>
                    <li>Cremas, Geles y Jabones (si el sello está roto).</li>
                    <li>Tablas Abdominales y Espumas (Lipo Foams) que hayan sido sacadas de su plástico protector.</li>
                    <li>Prendas de la sección "Liquidación" (Clearance).</li>
                    <li>Ropa interior (Panties) que no sea faja.</li>
                </ul>

                <h3>📦 Tiempos de Reembolso</h3>
                <p>Si prefieres un reembolso en lugar de un cambio de talla:</p>
                <ul>
                    <li>Se te devolverá el valor de la prenda menos el costo de la etiqueta de envío de retorno ($9.99 USD).</li>
                    <li>Los costos de envío originales no son reembolsables.</li>
                    <li>El reembolso aparecerá en tu cuenta bancaria entre 5 a 10 días hábiles después de que inspeccionemos la prenda.</li>
                </ul>

                <hr className="my-12 border-stone-200" />

                <div className="text-center bg-stone-50 p-8 rounded-2xl">
                    <h3 className="mt-0">¿Dudas con tu talla antes de enviar?</h3>
                    <p>
                        ¡No adivines! Si vas a realizar un cambio, contáctanos primero.
                        Envíanos una foto de tus medidas actuales (cintura y cadera) y nuestras expertas en Guitar Tech te dirán exactamente qué talla pedir para que esta vez te quede perfecta.
                    </p>
                    <a href="mailto:soporte@guitarcurves.com" className="inline-block bg-[#2C2420] text-[#F5EDDF] px-6 py-3 rounded-full no-underline hover:bg-[#D1AB66] transition-colors">
                        Contactar Soporte
                    </a>
                </div>

            </PolicyLayout>
        </>
    );
}
