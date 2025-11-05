import type {Language} from './utils/locale';

export type Dictionary = {
    expirationDatePlaceholder: string;
    enablePasswordVisibility: string;
    disablePasswordVisibility: string;
    loading: string;
    linkOpensInNewTab: string;
    linkOpensInCurrentPage: string;
    modalClose: string;
    dialogCancelButton: string;
    dialogAcceptButton: string;
    formErrorsAlertMessage: string;
    formFieldOptionalLabelSuffix: string;
    formFieldErrorIsMandatory: string;
    formCreditCardNumberLabel: string;
    formCreditCardExpirationLabel: string;
    formCreditCardCvvLabel: string;
    formCreditCardCvvError: string;
    formCreditCardCvvTooltipVisaMcButtonOpen: string;
    formCreditCardCvvTooltipVisaMcButtonClose: string;
    formCreditCardCvvTooltipVisaMc: string;
    formCreditCardCvvTooltipAmex: string;
    formCreditCardExpirationError: string;
    formCreditCardNumberError: string;
    formDateOutOfRangeError: string;
    formEmailError: string;
    formIbanError: string;
    formTextMultilineMaxCount: string;
    closeButtonLabel: string;
    formSearchClear: string;
    menuLabelSuffix: string;
    openNavigationMenu: string;
    closeNavigationMenu: string;
    mainNavigationBarOpenSectionMenu: string;
    mainNavigationBarSectionSeeAll: string;
    backNavigationBar: string;
    clearButton: string;
    carouselRegion: string;
    carouselPauseAutoplay: string;
    carouselEnableAutoplay: string;
    carouselReloadAutoplay: string;
    carouselNextButton: string;
    carouselPrevButton: string;
    carouselPageNumber: string;
    playIconButtonLabel: string;
    pauseIconButtonLabel: string;
    sheetConfirmButton: string;
    progressBarCompletedLabel: string;
    progressBarStepLabel: string;
    stepperCurrentStep: string;
    stepperCompletedStep: string;
    pinFieldInputLabel: string;
    counterRemoveLabel: string;
    counterIncreaseLabel: string;
    counterDecreaseLabel: string;
    counterQuantity: string;
    counterMinValue: string;
    counterMaxValue: string;
    timerDaysShortLabel: string;
    timerHoursShortLabel: string;
    timerMinutesShortLabel: string;
    timerSecondsShortLabel: string;
    timerAnd: string;
    timerDayLongLabel: string;
    timerDaysLongLabel: string;
    timerHourLongLabel: string;
    timerHoursLongLabel: string;
    timerMinuteLongLabel: string;
    timerMinutesLongLabel: string;
    timerSecondLongLabel: string;
    timerSecondsLongLabel: string;
    timerDisplayMinutesLabel: string;
    timerDisplaySecondsLabel: string;
    tableActionsHeaderLabel: string;
    ratingVeryBadLabel: string;
    ratingBadLabel: string;
    ratingRegularLabel: string;
    ratingGoodLabel: string;
    ratingVeryGoodLabel: string;
    ratingQuantitativeLabel: string;
    skipLinkNavLabel: string;
};

export type TextToken = Record<Language, string>;

export const expirationDatePlaceholder: TextToken = {
    es: 'MM/AA',
    en: 'MM/YY',
    de: 'MM/JJ',
    pt: 'MM/AA',
};

export const enablePasswordVisibility: TextToken = {
    es: 'Mostrar contraseña',
    en: 'Show password',
    de: 'Passwort anzeigen',
    pt: 'mostrar senha',
};

export const disablePasswordVisibility: TextToken = {
    es: 'Ocultar contraseña',
    en: 'Hide password',
    de: 'Passwort verbergen',
    pt: 'esconder a senha',
};

export const loading: TextToken = {
    es: 'Cargando',
    en: 'Loading',
    de: 'Wird gespeichert',
    pt: 'Carregando',
};

export const linkOpensInNewTab: TextToken = {
    es: 'Se abre en ventana nueva',
    en: 'Opens in a new window',
    de: 'Wird in neuem Fenster geöffnet',
    pt: 'Abre em nova janela',
};

export const linkOpensInCurrentPage: TextToken = {
    es: 'Página actual',
    en: 'Current page',
    de: 'Aktuelle Seite',
    pt: 'Página atual',
};

export const modalClose: TextToken = {
    es: 'Cerrar',
    en: 'Close',
    de: 'Schließen',
    pt: 'Fechar',
};

export const dialogCancelButton: TextToken = {
    es: 'Cancelar',
    en: 'Cancel',
    de: 'Abbrechen',
    pt: 'Cancelar',
};

export const dialogAcceptButton: TextToken = {
    es: 'Aceptar',
    en: 'Accept',
    de: 'Akzeptieren',
    pt: 'Aceitar',
};

export const formErrorsAlertMessage: TextToken = {
    es: 'Revisa los siguientes errores:',
    en: 'Check the following errors:',
    de: 'Prüfe folgende Fehler:',
    pt: 'Confira os seguintes erros:',
};

export const formFieldOptionalLabelSuffix: TextToken = {
    es: 'opcional',
    en: 'optional',
    de: 'optional',
    pt: 'opcional',
};

export const formFieldErrorIsMandatory: TextToken = {
    es: 'Este campo es obligatorio',
    en: 'This field is required',
    de: 'Das ist ein Pflichtfeld',
    pt: 'Este campo é obrigatório',
};

export const formCreditCardNumberLabel: TextToken = {
    es: 'Número de tarjeta',
    en: 'Card number',
    de: 'Kartennummer',
    pt: 'Número de cartão',
};

export const formCreditCardExpirationLabel: TextToken = {
    es: 'Caducidad',
    en: 'Expiry',
    de: 'Ablaufdatum',
    pt: 'Expiração',
};

export const formCreditCardCvvLabel: TextToken = {
    es: 'CVV',
    en: 'CVV',
    de: 'CVV',
    pt: 'CVV',
};

export const formCreditCardCvvError: TextToken = {
    es: 'CVV incorrecto',
    en: 'Incorrect CVV',
    de: 'Falsche CVV',
    pt: 'CVV incorreto',
};

export const formCreditCardCvvTooltipVisaMcButtonOpen: TextToken = {
    es: 'Mostrar ayuda CVV',
    en: 'Show CVV help',
    de: 'CVV-Hilfe anzeigen',
    pt: 'Exibir ajuda CVV',
};

export const formCreditCardCvvTooltipVisaMcButtonClose: TextToken = {
    es: 'Ocultar ayuda CVV',
    en: 'Hide CVV help',
    de: 'CVV-Hilfe ausblenden',
    pt: 'Ocultar ajuda CVV',
};

export const formCreditCardCvvTooltipVisaMc: TextToken = {
    es: 'El CVV son los 3 últimos dígitos del reverso de tu tarjeta',
    en: 'The CVV is the 3 digits of the back of your card',
    de: 'Der CVV-Code besteht aus den 3 Ziffern auf der Kartenrückseite',
    pt: 'O CVV são os 3  dígitos do reverso de seu cartão',
};

export const formCreditCardCvvTooltipAmex: TextToken = {
    es: 'Si es American Express, añade los 4 dígitos del anverso',
    en: "If it's American Express, add the 4-digit number on the front of the card",
    de: 'Bei American Express 4-stelligen Code auf der Rückseite hinzufügen',
    pt: 'Se for American Express, adicione os 4 dígitos do anverso',
};

export const formCreditCardExpirationError: TextToken = {
    es: 'Fecha no válida',
    en: 'Invalid date',
    de: 'Datum ungültig',
    pt: 'Data inválida',
};

export const formCreditCardNumberError: TextToken = {
    es: 'No es un número de tarjeta válido',
    en: 'The card number is not valid',
    de: 'Kartennummer ungültig',
    pt: 'Não é um número de cartão válido',
};

export const formDateOutOfRangeError: TextToken = {
    es: 'Fecha no permitida',
    en: 'Invalid date',
    de: 'Unzulässiges Datum',
    pt: 'Data não permitida',
};

export const formEmailError: TextToken = {
    es: 'Email incorrecto',
    en: 'Invalid email',
    de: 'Falsche E-Mail-Adresse',
    pt: 'Email incorreto',
};

export const formIbanError: TextToken = {
    es: 'IBAN incorrecto',
    en: 'Incorrect IBAN',
    de: 'Falsche IBAN',
    pt: 'IBAN incorreto',
};

export const formTextMultilineMaxCount: TextToken = {
    es: '1$s de 2$s caracteres',
    en: '1$s of 2$s characters',
    de: '1$s von 2$s Zeichen',
    pt: '1$s de 2$s caracteres',
};

export const closeButtonLabel: TextToken = {
    es: 'Cerrar',
    en: 'Close',
    de: 'Schließen',
    pt: 'Fechar',
};

export const formSearchClear: TextToken = {
    es: 'Borrar búsqueda',
    en: 'Clear search',
    de: 'Suche löschen',
    pt: 'Apagar pesquisa',
};

export const menuLabelSuffix: TextToken = {
    es: 'menú',
    en: 'menu',
    de: 'Menü',
    pt: 'menu',
};

export const openNavigationMenu: TextToken = {
    es: 'Abrir menú de navegación',
    en: 'Open navigation menu',
    de: 'Navigationsmenü öffnen',
    pt: 'Abrir menu de navegação',
};

export const closeNavigationMenu: TextToken = {
    es: 'Cerrar menú de navegación',
    en: 'Close navigation menu',
    de: 'Navigationsmenü schließen',
    pt: 'Fechar menu de navegação',
};

export const mainNavigationBarOpenSectionMenu: TextToken = {
    es: 'Abrir submenú',
    en: 'Open submenu',
    de: 'Untermenü öffnen',
    pt: 'Abrir submenu',
};

export const mainNavigationBarSectionSeeAll: TextToken = {
    es: 'Ver todo',
    en: 'See all',
    de: 'Alle anzeigen',
    pt: 'Ver tudo',
};

export const backNavigationBar: TextToken = {
    es: 'Atrás',
    en: 'Back',
    de: 'Zurück',
    pt: 'Voltar',
};

export const clearButton: TextToken = {
    es: 'Borrar',
    en: 'Clear',
    de: 'Löschen',
    pt: 'Apagar',
};

export const carouselRegion: TextToken = {
    es: 'Carrusel',
    en: 'Carousel',
    de: 'Karussell',
    pt: 'Carrossel',
};

export const carouselPauseAutoplay: TextToken = {
    es: 'Pausar carrusel automático',
    en: 'Pause automatic carousel',
    de: 'Automatisches Karussell pausieren',
    pt: 'Pausar carrossel automático',
};

export const carouselEnableAutoplay: TextToken = {
    es: 'Reproducir carrusel automático',
    en: 'Play automatic carousel',
    de: 'Automatisches Karussell abspielen',
    pt: 'Reproduzir carrossel automático',
};

export const carouselReloadAutoplay: TextToken = {
    es: 'Reiniciar reproducción automática',
    en: 'Restart automatic carousel',
    de: 'Automatisches Karussell neu starten',
    pt: 'Reiniciar carrossel automático',
};

export const carouselNextButton: TextToken = {
    es: 'Página siguiente',
    en: 'Next slide',
    de: 'Nächste seite',
    pt: 'Página seguinte',
};

export const carouselPrevButton: TextToken = {
    es: 'Página anterior',
    en: 'Previous slide',
    de: 'Vorherige seite',
    pt: 'Página anterior',
};

export const carouselPageNumber: TextToken = {
    es: '1$s de 2$s',
    en: '1$s of 2$s',
    de: '1$s von 2$s',
    pt: '1$s de 2$s',
};

export const playIconButtonLabel: TextToken = {
    es: 'Reproducir',
    en: 'Play',
    de: 'Abspielen',
    pt: 'Reproduzir',
};

export const pauseIconButtonLabel: TextToken = {
    es: 'Pausar',
    en: 'Pause',
    de: 'Pausieren',
    pt: 'Pausar',
};

export const sheetConfirmButton: TextToken = {
    es: 'Continuar',
    en: 'Continue',
    de: 'Fortfahren',
    pt: 'Continuar',
};

export const progressBarCompletedLabel: TextToken = {
    es: 'completo',
    en: 'completed',
    de: 'vollendet',
    pt: 'concluído',
};

export const progressBarStepLabel: TextToken = {
    es: 'Paso 1$s de 2$s',
    en: 'Step 1$s of 2$s',
    de: 'Schritt 1$s von 2$s',
    pt: 'Etapa 1$s de 2$s',
};

export const stepperCurrentStep: TextToken = {
    es: 'En curso',
    en: 'Current',
    de: 'Aktuell',
    pt: 'Em andamento',
};

export const stepperCompletedStep: TextToken = {
    es: 'Completado',
    en: 'Completed',
    de: 'Abgeschlossen',
    pt: 'Concluído',
};

export const pinFieldInputLabel: TextToken = {
    es: 'Dígito 1$s de 2$s',
    en: 'Digit 1$s of 2$s',
    de: 'Ziffer 1$s von 2$s',
    pt: 'Dígito 1$s de 2$s',
};

export const counterRemoveLabel: TextToken = {
    es: 'Borrar elemento',
    en: 'Remove element',
    de: 'Element entfernen',
    pt: 'Remover elemento',
};

export const counterIncreaseLabel: TextToken = {
    es: 'Aumentar valor',
    en: 'Increase value',
    de: 'Wert steigern',
    pt: 'aumentar valor',
};

export const counterDecreaseLabel: TextToken = {
    es: 'Disminuir valor',
    en: 'Decrease value',
    de: 'Wert verringern',
    pt: 'diminuir valor',
};

export const counterQuantity: TextToken = {
    es: 'cantidad',
    en: 'quantity',
    de: 'menge',
    pt: 'quantidade',
};

export const counterMinValue: TextToken = {
    es: 'mínimo',
    en: 'minimum of',
    de: 'minimal',
    pt: 'mínimo',
};

export const counterMaxValue: TextToken = {
    es: 'máximo',
    en: 'maximum of',
    de: 'maximal',
    pt: 'máximo',
};

export const timerDaysShortLabel: TextToken = {
    es: 'd',
    en: 'd',
    de: 'Tg.',
    pt: 'd',
};

export const timerHoursShortLabel: TextToken = {
    es: 'h',
    en: 'h',
    de: 'Std.',
    pt: 'h',
};

export const timerMinutesShortLabel: TextToken = {
    es: 'min',
    en: 'min',
    de: 'Min.',
    pt: 'min',
};

export const timerSecondsShortLabel: TextToken = {
    es: 's',
    en: 's',
    de: 'Sek.',
    pt: 's',
};

export const timerAnd: TextToken = {
    es: 'y',
    en: 'and',
    de: 'und',
    pt: 'e',
};

export const timerDayLongLabel: TextToken = {
    es: 'día',
    en: 'day',
    de: 'Tag',
    pt: 'dia',
};

export const timerDaysLongLabel: TextToken = {
    es: 'días',
    en: 'days',
    de: 'Tage',
    pt: 'dias',
};

export const timerHourLongLabel: TextToken = {
    es: 'hora',
    en: 'hour',
    de: 'Stunde',
    pt: 'hora',
};

export const timerHoursLongLabel: TextToken = {
    es: 'horas',
    en: 'hours',
    de: 'Stunden',
    pt: 'horas',
};

export const timerMinuteLongLabel: TextToken = {
    es: 'minuto',
    en: 'minute',
    de: 'Minute',
    pt: 'minuto',
};

export const timerMinutesLongLabel: TextToken = {
    es: 'minutos',
    en: 'minutes',
    de: 'Minuten',
    pt: 'minutos',
};

export const timerSecondLongLabel: TextToken = {
    es: 'segundo',
    en: 'second',
    de: 'Sekunde',
    pt: 'segundo',
};

export const timerSecondsLongLabel: TextToken = {
    es: 'segundos',
    en: 'seconds',
    de: 'Sekunden',
    pt: 'segundos',
};

export const timerDisplayMinutesLabel: TextToken = {
    es: 'min',
    en: 'min',
    de: 'Min.',
    pt: 'min',
};

export const timerDisplaySecondsLabel: TextToken = {
    es: 'seg',
    en: 'sec',
    de: 'Sek.',
    pt: 'seg',
};

export const tableActionsHeaderLabel: TextToken = {
    es: 'Acciones',
    en: 'Actions',
    de: 'Aktionen',
    pt: 'Ações',
};

export const ratingVeryBadLabel: TextToken = {
    es: 'muy malo',
    en: 'very bad',
    de: 'sehr schlecht',
    pt: 'muito ruim',
};

export const ratingBadLabel: TextToken = {
    es: 'malo',
    en: 'bad',
    de: 'schlecht',
    pt: 'ruim',
};

export const ratingRegularLabel: TextToken = {
    es: 'regular',
    en: 'regular',
    de: 'regular',
    pt: 'regular',
};

export const ratingGoodLabel: TextToken = {
    es: 'bueno',
    en: 'good',
    de: 'gut',
    pt: 'bom',
};

export const ratingVeryGoodLabel: TextToken = {
    es: 'muy bueno',
    en: 'very good',
    de: 'sehr gut',
    pt: 'muito bom',
};

export const ratingQuantitativeLabel: TextToken = {
    es: '1$s de 2$s',
    en: '1$s out of 2$s',
    de: '1$s von 2$s',
    pt: '1$s de 2$s',
};

/**
 * 1$s: segments count
 * 2$s: total percentage value
 */
export const meterTotalLabel: TextToken = {
    es: 'Indicador de progreso con 1$s secciones, total 2$s% de 100%.',
    en: 'Gauge chart 1$s segments, total 2$s% out of 100%.',
    de: 'Fortschrittsanzeige mit 1$s Abschnitten, insgesamt 2$s% von 100%.',
    pt: 'Indicador de progresso com 1$s seções, total 2$s% de 100%.',
};

/**
 * 1$s: segment number
 * 2$s: segment percentage value
 */
export const meterSectionLabel: TextToken = {
    es: 'Sección 1$s: 2$s%',
    en: 'Segment 1$s: 2$s%',
    de: 'Abschnitt 1$s: 2$s%',
    pt: 'Seção 1$s: 2$s%',
};

export const skipLinkNavLabel: TextToken = {
    es: 'Accesos directos',
    en: 'Skip links',
    de: 'Direkt zum Inhalt',
    pt: 'Acesso rápido',
};
