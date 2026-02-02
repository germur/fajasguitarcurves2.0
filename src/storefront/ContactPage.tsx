import { MessageSquare, Mail, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans pb-20">
            {/* Header */}
            <div className="bg-[#2C2420] text-[#F5EDDF] pt-24 pb-32 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/10 text-[#D1AB66] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                        {t('pages.contact.badge')}
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                        {t('pages.contact.title')}
                    </h1>
                    <p className="text-stone-300 text-lg max-w-2xl mx-auto">
                        {t('pages.contact.desc')}
                    </p>
                </div>
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D1AB66] via-[#2C2420] to-[#2C2420]" />
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-20">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Card 1: Chat (Primary) */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center border-t-4 border-[#D1AB66] hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-[#FFF8F0] rounded-full flex items-center justify-center text-[#D1AB66] mb-6">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-xl text-[#2C2420] mb-2">{t('pages.contact.chat_title')}</h3>
                        <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                            {t('pages.contact.chat_desc')}
                        </p>
                        <button
                            onClick={() => navigate('/solutions')}
                            className="mt-auto w-full py-4 bg-[#2C2420] text-[#F5EDDF] rounded-xl font-bold hover:bg-[#D1AB66] hover:text-[#2C2420] transition-colors flex items-center justify-center gap-2"
                        >
                            {t('pages.contact.chat_btn')} <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Card 2: Email */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-[#2C2420] mb-6">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-xl text-[#2C2420] mb-2">{t('pages.contact.email_title')}</h3>
                        <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                            {t('pages.contact.email_desc')}
                        </p>
                        <a href="mailto:support@guitarcurves.com" className="mt-auto w-full py-4 bg-stone-100 text-[#2C2420] rounded-xl font-bold hover:bg-stone-200 transition-colors text-center block">
                            support@guitarcurves.com
                        </a>
                    </div>

                    {/* Card 3: Fit Check */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-[#2C2420] mb-6">
                            <Clock className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-xl text-[#2C2420] mb-2">{t('pages.contact.fit_title')}</h3>
                        <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                            {t('pages.contact.fit_desc')}
                        </p>
                        <button className="mt-auto w-full py-4 bg-stone-100 text-[#2C2420] rounded-xl font-bold hover:bg-stone-200 transition-colors">
                            {t('pages.contact.fit_btn')}
                        </button>
                    </div>

                </div>
            </div>

            {/* Hours */}
            <div className="text-center mt-20 text-stone-400 text-sm">
                <p className="font-bold mb-1">{t('pages.contact.hours_title')}</p>
                <p>{t('pages.contact.hours_week')}</p>
                <p>{t('pages.contact.hours_sat')}</p>
            </div>

        </div>
    );
}
