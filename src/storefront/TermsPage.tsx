import { PolicyLayout } from './components/PolicyLayout';
import { SeoHead } from './components/SeoHead';

export function TermsPage() {
    return (
        <>
            <SeoHead
                title="Términos del Servicio | Fajas Guitar Curves"
                description="Condiciones de uso y descargos de responsabilidad médica."
            />
            <PolicyLayout title="Términos del Servicio" lastUpdated="1 de Enero, 2026">

                <p>
                    Bienvenido a Fajas Guitar Curves. Al acceder o comprar en nuestro sitio, aceptas los siguientes términos y condiciones.
                </p>

                <div className="bg-red-50 p-6 rounded-lg border border-red-100 my-8">
                    <h3 className="text-red-800 mt-0 flex items-center gap-2">
                        ⚕️ Descargo de Responsabilidad Médico (Disclaimer)
                    </h3>
                    <p className="text-red-900 font-medium">
                        Nuestras prendas son de soporte estético y post-quirúrgico, diseñadas con altos estándares de calidad. Sin embargo, <strong>no sustituyen el consejo de tu médico profesional.</strong>
                    </p>
                    <p className="text-red-900">
                        Cada recuperación es única. Siempre debes seguir las indicaciones específicas de tu cirujano plástico respecto al nivel de compresión (Etapa 1 vs Etapa 2), el tiempo de uso diario y el momento adecuado para empezar a usar una faja.
                        Fajas Guitar Curves no se hace responsable por complicaciones derivadas del uso incorrecto o prematuro de prendas de compresión sin autorización médica.
                    </p>
                </div>

                <h3>Propiedad Intelectual</h3>
                <p>
                    Todo el contenido de este sitio, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes y código, es propiedad de Fajas Guitar Curves y está protegido por las leyes de derechos de autor.
                    El uso no autorizado de nuestra marca "Guitar Curves" o nuestras imágenes para fines comerciales está estrictamente prohibido.
                </p>

                <h3>Pagos y Facturación</h3>
                <p>
                    Nos reservamos el derecho de rechazar cualquier pedido que realices con nosotros. Aceptamos las principales tarjetas de crédito y plataformas de pago.
                    El cobro se realiza en el momento en que confirmas tu orden.
                </p>

                <h3>Exactitud de la Información</h3>
                <p>
                    Nos esforzamos por ser lo más precisos posible en las descripciones de nuestros productos y tablas de tallas. Sin embargo, no garantizamos que las descripciones de los productos u otro contenido de este sitio sean exactos, completos, fiables, actuales o libres de errores.
                </p>

                <h3>Cambios en los Términos</h3>
                <p>
                    Puedes revisar la versión más actual de los Términos del Servicio en cualquier momento en esta página. Nos reservamos el derecho, a nuestra sola discreción, de actualizar, cambiar o reemplazar cualquier parte de estos Términos del Servicio mediante la publicación de actualizaciones y cambios en nuestro sitio web.
                </p>

            </PolicyLayout>
        </>
    );
}
