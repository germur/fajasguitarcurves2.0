import { AlertTriangle, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export default function ReturnsPolicy() {
    const { t } = useTranslation();

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-[#3E322C] font-sans">

            {/* HERO TITLE */}
            <div className="text-center mb-12">
                <h1 className="font-serif text-4xl md:text-5xl mb-6 text-[#2C2420]">{t('components.returns_policy.title')}</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    {t('components.returns_policy.subtitle')}
                    <span className="font-bold text-red-700 block mt-2">{t('components.returns_policy.no_refund')}</span>
                </p>
            </div>

            {/* RECOMMENDATIONS SECTION */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-stone-200 mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="text-[#D1AB66] w-6 h-6" />
                    <h3 className="font-bold text-xl md:text-2xl text-[#2C2420]">{t('components.returns_policy.recommendations_title')}</h3>
                </div>

                <p className="text-gray-500 mb-6 italic">
                    {t('components.returns_policy.recommendations_desc')}
                </p>

                <ul className="space-y-4">
                    {(t('components.returns_policy.recommendations_list', { returnObjects: true }) as string[]).map((item, i) => (
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
                        <h4 className="font-bold text-lg">{t('components.returns_policy.time_window_title')}</h4>
                    </div>
                    <p className="text-gray-600">
                        <Trans i18nKey="components.returns_policy.time_window_desc">
                            Para solicitar un cambio es necesario hacerlo dentro de los primeros <strong className="text-[#2C2420]">7 días</strong> después de recibir tu prenda.
                        </Trans>
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        {t('components.returns_policy.time_window_note')}
                    </p>
                </div>

                {/* Exchange Limit */}
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-400">
                    <div className="flex items-center gap-3 mb-3 text-red-800">
                        <RefreshCw className="w-6 h-6" />
                        <h4 className="font-bold text-lg">{t('components.returns_policy.limit_title')}</h4>
                    </div>
                    <p className="text-red-900/80">
                        <Trans i18nKey="components.returns_policy.limit_desc">
                            El número máximo de cambios es <strong className="uppercase">SÓLO una (1) vez</strong> desde la compra original.
                        </Trans>
                    </p>
                </div>
            </div>

            {/* STRICT HYGIENE WARNING */}
            <div className="flex gap-4 items-start bg-stone-900 text-stone-300 p-6 rounded-xl mb-12">
                <AlertTriangle className="w-6 h-6 shrink-0 text-[#D1AB66]" />
                <p className="text-sm leading-relaxed">
                    <strong className="text-white block mb-1">{t('components.returns_policy.hygiene_title')}</strong>
                    {t('components.returns_policy.hygiene_desc')}
                </p>
            </div>

            {/* CTA */}
            <div className="text-center">
                <a
                    href="https://wa.me/14077585862?text=Hola,%20me%20gustar%C3%ADa%20iniciar%20un%20proceso%20de%20cambio."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-[#2C2420] text-[#F5EDDF] px-10 py-4 rounded-full font-bold tracking-wider hover:bg-[#D1AB66] hover:text-[#2C2420] transition-all duration-300 shadow-xl"
                >
                    {t('components.returns_policy.cta_btn')}
                </a>
                <p className="text-xs text-gray-400 mt-4">
                    {t('components.returns_policy.cta_note')}
                </p>
            </div>
        </div>
    );
}
