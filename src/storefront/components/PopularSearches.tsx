import { LocalizedLink as Link } from './LocalizedLink';
import { useTranslation } from 'react-i18next';

export function PopularSearches() {
    const { i18n } = useTranslation();
    const isEn = i18n.language === 'en';

    // Base keywords to generate permutations
    // We select high-value keywords that people actually search for
    const keywords = [
        // Types
        { label: isEn ? 'Shapewear' : 'Fajas Reductoras', slug: isEn ? 'shapewear' : 'reductoras' },
        { label: isEn ? 'Waist Trainers' : 'Cinturillas', slug: isEn ? 'waist-trainer' : 'cinturillas' },
        { label: isEn ? 'Bodysuits' : 'Body Moldeador', slug: isEn ? 'bodysuit' : 'body' },
        { label: isEn ? 'Shorts' : 'Shorts', slug: 'shorts' },

        // Colors
        { label: isEn ? 'Black Fajas' : 'Fajas Negras', slug: isEn ? 'black-fajas' : 'fajas-negras' },
        { label: isEn ? 'Beige Fajas' : 'Fajas Beige', slug: isEn ? 'beige-fajas' : 'fajas-beige' },
        { label: isEn ? 'Cocoa Fajas' : 'Fajas Cocoa', slug: isEn ? 'cocoa-fajas' : 'fajas-cocoa' },

        // Uses
        { label: isEn ? 'Post Surgery' : 'Post Quirúrgicas', slug: isEn ? 'post-surgery' : 'post-quirurgica' },
        { label: isEn ? 'Postpartum' : 'Postparto', slug: isEn ? 'postpartum' : 'post-parto' },
        { label: isEn ? 'Daily Use' : 'Uso Diario', slug: isEn ? 'daily-use' : 'uso-diario' },
        { label: isEn ? 'BBL Fajas' : 'Fajas BBL', slug: 'bbl' },

        // Features
        { label: isEn ? 'Strapless' : 'Strapless', slug: 'strapless' },
        { label: isEn ? 'Butt Lifter' : 'Levanta Cola', slug: isEn ? 'butt-lifter' : 'levanta-cola' },
        { label: isEn ? 'High Back' : 'Espalda Alta', slug: isEn ? 'high-back' : 'espalda-alta' },
    ];

    // Matrix Generation: Combine valuable terms
    // e.g. "Black Waist Trainer", "Post Surgery Shorts"
    const combinations = [
        { label: isEn ? 'Black Waist Trainer' : 'Cinturilla Negra', slug: isEn ? 'black-waist-trainer' : 'cinturilla-negra' },
        { label: isEn ? 'Beige Bodysuit' : 'Body Beige', slug: isEn ? 'beige-bodysuit' : 'body-beige' },
        { label: isEn ? 'Post Op Shorts' : 'Short Postoperatorio', slug: isEn ? 'post-op-shorts' : 'short-postoperatorio' },
        { label: isEn ? 'Strapless Shapewear' : 'Faja Strapless', slug: isEn ? 'strapless-shapewear' : 'faja-strapless' },
        { label: isEn ? 'Stage 2 Fajas' : 'Faja Etapa 2', slug: isEn ? 'stage-2' : 'etapa-2' },
        { label: isEn ? 'Stage 1 Fajas' : 'Faja Etapa 1', slug: isEn ? 'stage-1' : 'etapa-1' },
    ];

    const allLinks = [...keywords, ...combinations];

    return (
        <div className="py-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A35944] mb-6">
                {isEn ? 'Popular Searches' : 'Búsquedas Populares'}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-3 gap-x-4">
                {allLinks.map((link) => (
                    <Link
                        key={link.slug}
                        to={`/colecciones/todo/${link.slug}`}
                        className="text-[11px] text-gray-500 hover:text-[#D4AF37] transition-colors block"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
