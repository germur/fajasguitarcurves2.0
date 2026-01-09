import { MessageSquare, Mail, Phone, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans pb-20">
            {/* Header */}
            <div className="bg-[#2C2420] text-[#F5EDDF] pt-24 pb-32 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/10 text-[#D1AB66] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                        Support Center
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                        We're Here for You.
                    </h1>
                    <p className="text-stone-300 text-lg max-w-2xl mx-auto">
                        Whether you're guessing your size or tracking an order, our team of fit specialists is ready.
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
                        <h3 className="font-bold text-xl text-[#2C2420] mb-2">Chat with an Expert</h3>
                        <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                            Immediate answers for sizing, stage selection, and shipping. Our AI Assistant is available 24/7.
                        </p>
                        <button
                            onClick={() => navigate('/store/solutions')}
                            className="mt-auto w-full py-4 bg-[#2C2420] text-[#F5EDDF] rounded-xl font-bold hover:bg-[#D1AB66] hover:text-[#2C2420] transition-colors flex items-center justify-center gap-2"
                        >
                            Start Chat <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Card 2: Email */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-[#2C2420] mb-6">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-xl text-[#2C2420] mb-2">Email Us</h3>
                        <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                            For order modifications, returns, or partnership inquiries. We reply within 24 hours.
                        </p>
                        <a href="mailto:support@guitarcurves.com" className="mt-auto w-full py-4 bg-stone-100 text-[#2C2420] rounded-xl font-bold hover:bg-stone-200 transition-colors">
                            support@guitarcurves.com
                        </a>
                    </div>

                    {/* Card 3: Fit Check */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-[#2C2420] mb-6">
                            <Clock className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-xl text-[#2C2420] mb-2">Manual Fit Check</h3>
                        <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                            Send us your measurements and a photo (optional) and a human specialist will assign your size.
                        </p>
                        <button className="mt-auto w-full py-4 bg-stone-100 text-[#2C2420] rounded-xl font-bold hover:bg-stone-200 transition-colors">
                            Request Fit Check
                        </button>
                    </div>

                </div>
            </div>

            {/* Hours */}
            <div className="text-center mt-20 text-stone-400 text-sm">
                <p className="font-bold mb-1">Operating Hours</p>
                <p>Mon - Fri: 9am - 6pm EST</p>
                <p>Sat: 10am - 4pm EST</p>
            </div>

        </div>
    );
}
