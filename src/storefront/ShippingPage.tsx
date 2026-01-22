import { PolicyLayout } from './components/PolicyLayout';
import { SeoHead } from './components/SeoHead';

export function ShippingPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "MerchantReturnPolicy", // Using generic structure for shipping signals if specific MerchantShippingPolicy isn't fully supported by simple JSON-LD drop-ins without deeper merchant data
        // For shipping specifically, it's often part of Offer or DeliveryTime settings in Merchant Center, 
        // but we can mark up the page content itself.
        // Let's use a generic WebPage with Service markup for Shipping.
        "mainEntity": {
            "@type": "Service",
            "name": "Fast Shipping from USA",
            "serviceType": "Logistics",
            "provider": {
                "@type": "Organization",
                "name": "Fajas Guitar Curves",
                "url": "https://fajasguitarcurves.com"
            },
            "areaServed": "US"
        }
    };

    return (
        <>
            <SeoHead
                title="Envíos Rápidos y Seguros | Fajas Guitar Curves"
                description="Envíos desde USA en 24 horas. Recibe tu faja en 3-5 días sin aduanas."
                schema={schema}
            />
            <PolicyLayout title="Política de Envíos" lastUpdated="1 de Enero, 2026">

                <p className="lead text-xl text-stone-600 mb-8">
                    Sabemos que cuando pides tu faja, ¡la necesitas YA! Ya sea que tu cirugía se acerque o simplemente quieras estrenar tus curvas.
                    Por eso, toda nuestra logística está centralizada en Estados Unidos.
                </p>

                <div className="bg-[#FFF8F0] p-6 rounded-xl border-l-4 border-[#D1AB66] my-8">
                    <p className="font-bold text-[#A35944] m-0">
                        🚀 Todos nuestros pedidos se envían desde nuestro almacén en [Ciudad, ej. Houston/Miami]. Olvídate de esperar aduanas o envíos internacionales de semanas.
                    </p>
                </div>

                <h3>⏱️ Tiempos de Procesamiento</h3>
                <p>
                    Nos movemos rápido. Los pedidos realizados antes de las 2:00 PM EST se procesan y envían el mismo día (de lunes a viernes).
                    Los pedidos realizados después de esta hora o en fines de semana se procesan el siguiente día hábil.
                </p>

                <h3>🚚 Opciones y Tiempos de Tránsito</h3>
                <p>Trabajamos principalmente con USPS y UPS para garantizar la mejor cobertura.</p>

                <table className="w-full text-left border-collapse my-6">
                    <thead>
                        <tr className="border-b border-stone-300">
                            <th className="py-2">Tipo de Envío</th>
                            <th className="py-2">Tiempo Estimado</th>
                            <th className="py-2">Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-stone-100">
                            <td className="py-3 font-bold">Envío Estándar</td>
                            <td className="py-3">3-5 Días Hábiles</td>
                            <td className="py-3 text-green-700 font-bold">GRATIS (Pedidos +$200)</td>
                        </tr>
                        <tr className="border-b border-stone-100">
                            <td className="py-3 text-stone-600">Envío Estándar</td>
                            <td className="py-3 text-stone-600">3-5 Días Hábiles</td>
                            <td className="py-3 text-stone-600">$9.99</td>
                        </tr>
                        <tr className="border-b border-stone-100">
                            <td className="py-3 font-bold text-[#2C2420]">Express / Prioritario</td>
                            <td className="py-3">1-2 Días Hábiles</td>
                            <td className="py-3">$24.99</td>
                        </tr>
                    </tbody>
                </table>

                <h3>📦 Seguimiento de tu Pedido</h3>
                <p>
                    Tan pronto como tu paquete salga de nuestro almacén, recibirás un correo electrónico con tu número de rastreo (Tracking Number).
                    Por favor, permite hasta 24 horas para que el sistema de la transportadora actualice la ubicación.
                </p>

                <h3>⚠️ Problemas con la Entrega</h3>
                <p>
                    <strong>Paquetes Perdidos:</strong> Aunque es muy raro, si tu paquete aparece como "Entregado" pero no lo tienes, espera 24 horas (a veces los escanean antes). Si sigue sin aparecer, contáctanos.
                </p>
                <p>
                    <strong>Dirección Incorrecta:</strong> No nos hacemos responsables por paquetes enviados a direcciones ingresadas incorrectamente por el cliente. Por favor verifica tu dirección dos veces antes de pagar.
                </p>

            </PolicyLayout>
        </>
    );
}
