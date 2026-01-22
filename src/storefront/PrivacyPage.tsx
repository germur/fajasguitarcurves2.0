import { PolicyLayout } from './components/PolicyLayout';
import { SeoHead } from './components/SeoHead';

export function PrivacyPage() {
    return (
        <>
            <SeoHead
                title="Política de Privacidad | Fajas Guitar Curves"
                description="Tu privacidad y tus datos son sagrados para nosotros."
            />
            <PolicyLayout title="Política de Privacidad" lastUpdated="1 de Enero, 2026">

                <p className="lead">
                    En Fajas Guitar Curves, entendemos que la privacidad no es solo un requisito legal, es una cuestión de confianza.
                    Cuando compartes tus medidas corporales, fotos para evaluación o datos de salud (etapa de recuperación), nos estás confiando información sensible.
                    Nos tomamos esa responsabilidad muy en serio.
                </p>

                <h3>🔒 Uso de Datos de Personalización</h3>
                <p className="bg-[#F5EDDF] p-6 rounded-lg border border-[#D1AB66]/30">
                    <strong>Tus Medidas son Solo Tuyas:</strong> La información que proporcionas sobre tus medidas (cintura, cadera, torso) y tu etapa de recuperación se utiliza <strong>únicamente</strong> para recomendarte la talla perfecta y personalizar tu experiencia de compra.
                    <br /><br />
                    Nunca vendemos, alquilamos ni compartimos tus datos biométricos o de salud con terceros anunciantes.
                </p>

                <h3>Recopilación de Información</h3>
                <p>
                    Recopilamos información cuando realizas una compra, te registras en nuestro sitio, o participas en una evaluación de talla.
                    Esto incluye nombre, dirección de envío, correo electrónico y datos de pago (procesados de forma segura a través de Shopify Payments).
                </p>

                <h3>Cookies y Tecnologías de Rastreo</h3>
                <p>
                    Utilizamos cookies para mejorar tu experiencia en nuestra tienda. Por ejemplo, las cookies nos permiten recordar qué artículos tienes en tu carrito para que no los pierdas si sales de la página.
                    También nos ayudan a entender cómo interactúas con nuestro sitio para mejorarlo.
                </p>

                <h3>Seguridad</h3>
                <p>
                    Tu información personal está contenida en redes seguras y solo es accesible por un número limitado de personas que tienen derechos especiales de acceso a dichos sistemas y están obligadas a mantener la información confidencial.
                    Además, toda la información confidencial/crediticia que suministras se cifra mediante la tecnología Secure Socket Layer (SSL).
                </p>

                <h3>Tus Derechos</h3>
                <p>
                    Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento. Si deseas ejercer estos derechos, contáctanos en <a href="mailto:privacy@guitarcurves.com">privacy@guitarcurves.com</a>.
                </p>

            </PolicyLayout>
        </>
    );
}
