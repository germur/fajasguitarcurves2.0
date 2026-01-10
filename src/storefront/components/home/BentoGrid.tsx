import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const GRID_ITEMS = [
    {
        id: 'medical',
        title: 'Post-Surgery',
        subtitle: 'Stage 1 & 2 Essentials',
        img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop',
        link: '/medical',
        colSpan: 'md:col-span-2',
        rowSpan: 'md:row-span-2',
        theme: 'medical'
    },
    {
        id: 'guitar',
        title: 'Guitar Curves',
        subtitle: 'Signature Silhouette',
        img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
        link: '/guitar-curves',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1',
        theme: 'signature'
    },
    {
        id: 'mommy',
        title: 'Mommy Makeover',
        subtitle: 'C-Section Safe',
        img: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?q=80&w=800&auto=format&fit=crop',
        link: '/lifestyle',
        colSpan: 'md:col-span-3',
        rowSpan: 'md:row-span-1',
        theme: 'lifestyle'
    }
];

export function BentoGrid() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="font-serif text-4xl text-[#2C2420] mb-2">Shop by Goal</h2>
                    <p className="text-stone-500 max-w-md">Find the perfect compression engineering for your specific recovery stage or aesthetic goal.</p>
                </div>
                <Link to="/solutions" className="text-[#B49286] font-bold text-sm tracking-wide hover:text-[#A35944] flex items-center gap-2">
                    VIEW ALL COLLECTIONS <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
                {GRID_ITEMS.map((item) => (
                    <Link
                        key={item.id}
                        to={item.link}
                        className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.colSpan} ${item.rowSpan}`}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold uppercase tracking-widest text-white border border-white/30 rounded backdrop-blur-sm">
                                        {item.theme === 'medical' ? 'Medical Grade' : item.theme === 'signature' ? 'Sculpting' : 'Recovery'}
                                    </span>
                                    <h3 className="font-serif text-2xl text-white mb-1">{item.title}</h3>
                                    <p className="text-stone-300 text-sm font-medium">{item.subtitle}</p>
                                </div>
                                <div className="bg-white/20 p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    <ArrowRight className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
