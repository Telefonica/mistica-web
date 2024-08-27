export type Locale =
    | 'ca-ES'
    | 'en-US'
    | 'en-GB'
    | 'de-DE'
    | 'es-AR'
    | 'es-CO'
    | 'es-EC'
    | 'es-ES'
    | 'es-MX'
    | 'es-PE'
    | 'es-UY'
    | 'eu-ES'
    | 'gl-ES'
    | 'pt-BR';

const SUPPORTED_LANGUAGES = ['en', 'es', 'pt', 'de'] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const localeToLanguage = (locale: Locale): Language => {
    const lang = locale.split('-')[0] as Language;
    if (SUPPORTED_LANGUAGES.includes(lang)) {
        return lang;
    }
    return 'en';
};
