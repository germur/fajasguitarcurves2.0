import { AlertTriangle, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ReturnsPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-[#3E322C] font-sans">

            {/* HERO TITLE */}
            <div className="text-center mb-12">
                <h1 className="font-serif text-4xl md:text-5xl mb-6 text-[#2C2420]">Póliza de Cambio</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Nos enfocamos en diseñar las siguientes políticas buscando una solución rápida y sencilla en caso de que necesites realizar un cambio
                    <span className="font-bold text-red-700 block mt-2">(no hacemos refund)</span>
                </p>
            </div>

            {/* RECOMMENDATIONS SECTION */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-stone-200 mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="text-[#D1AB66] w-6 h-6" />
                    <h3 className="font-bold text-xl md:text-2xl text-[#2C2420]">Recomendaciones Importantes</h3>
                </div>

                <p className="text-gray-500 mb-6 italic">
                    Es importante seguir las siguientes recomendaciones al momento de probarte tu faja para que tu compra no tenga ningún daño y siga siendo elegible para devolución o cambio.
                </p>

                <ul className="space-y-4">
                    {[
                        "Usar ropa interior, tener el cuerpo libre de lociones corporales, desodorantes, aceites, polvos, perfumes, maquillaje o productos de belleza que puedan transferirse a la prenda.",
                        "Evite tirar de la prenda desde zonas delgadas como la zona de los glúteos y los cordones de silicona.",
                        "Es necesario no utilizar joyas, tener cuidado con las uñas largas o cualquier instrumento punzante que ayude a cerrar o ajustar la prenda.",
                        "Si te encuentras en la etapa de recuperación posquirúrgica o posparto, recuerda cubrir adecuadamente cualquier parte de tu cuerpo que fue sometida a la operación para evitar manchas o decoloración."
                    ].map((item, i) => (
                        <li key={i} className="flex gap-4 items-start text-gray-700 leading-relaxed">
                            <span className="w-1.5 h-1.5 bg-[#D1AB66] rounded-full mt-2.5 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* TERMS & CONDITIONS GRID */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* Time Window */}
                <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-[#D1AB66]">
                    <div className="flex items-center gap-3 mb-3 text-[#2C2420]">
                        <Clock className="w-6 h-6" />
                        <h4 className="font-bold text-lg">Ventana de Tiempo</h4>
                    </div>
                    <p className="text-gray-600">
                        Para solicitar un cambio es necesario hacerlo dentro de los primeros <strong className="text-[#2C2420]">7 días</strong> después de recibir tu prenda.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        Debe estar en excelentes condiciones con sus etiquetas originales y empaque.
                    </p>
                </div>

                {/* Exchange Limit */}
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-400">
                    <div className="flex items-center gap-3 mb-3 text-red-800">
                        <RefreshCw className="w-6 h-6" />
                        <h4 className="font-bold text-lg">Límite de Cambios</h4>
                    </div>
                    <p className="text-red-900/80">
                        El número máximo de cambios es <strong className="uppercase">SÓLO una (1) vez</strong> desde la compra original.
                    </p>
                </div>
            </div>

            {/* STRICT HYGIENE WARNING */}
            <div className="flex gap-4 items-start bg-stone-900 text-stone-300 p-6 rounded-xl mb-12">
                <AlertTriangle className="w-6 h-6 shrink-0 text-[#D1AB66]" />
                <p className="text-sm leading-relaxed">
                    <strong className="text-white block mb-1">Nota de Higiene:</strong>
                    Cualquier prenda que llegue con olores, manchas, o sin etiquetas será rechazada inmediatamente y devuelta al remitente (el cliente cubrirá los gastos de envío).
                </p>
            </div>

            {/* CTA */}
            <div className="text-center">
                <a
                    href="https://wa.me/1xxxxxxxxxx"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-[#2C2420] text-[#F5EDDF] px-10 py-4 rounded-full font-bold tracking-wider hover:bg-[#D1AB66] hover:text-[#2C2420] transition-all duration-300 shadow-xl"
                >
                    INICIAR PROCESO DE CAMBIO
                </a>
                <p className="text-xs text-gray-400 mt-4">
                    Al hacer clic confirmas que has leído y aceptas nuestros términos.
                </p>
            </div>
        </div>
    );
}
