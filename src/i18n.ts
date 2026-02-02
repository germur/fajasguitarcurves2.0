
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import es from './locales/es/translation.json';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languagedetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources: {
            en: {
                translation: en,
            },
            es: {
                translation: es,
            },
        },
        // fallbackLng: 'es', // Default to Spanish if language not detected
        fallbackLng: (code) => {
            // Special logic: if 'en' or starts with 'en-', use 'en'. All others use 'es'.
            if (code && code.startsWith('en')) return ['en'];
            return ['es'];
        },
        supportedLngs: ['es', 'en'],

        // We already do sanitization in React
        interpolation: {
            escapeValue: false,
        },

        // Detection options: prioritizing path (URL)
        detection: {
            order: ['path', 'localStorage', 'navigator'],
            lookupFromPathIndex: 0, // looks for /en/ or /es/ as first segment? We will likely manage this manually via router wrapper, but this helps.
            caches: ['localStorage'],
        }
    });

export default i18n;
