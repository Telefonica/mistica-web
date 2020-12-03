import {mediaQueriesConfig, texts as defaultTexts} from '../src/theme';
import * as themes from '../.storybook/themes';
import type {ThemeConfig, ThemeTexts} from '../src/theme';

// Override the media query desktopOrTabletMinHeight to avoid to show the components mobile version
// when playroom height is too short.
const mediaQueries = {...mediaQueriesConfig, desktopOrTabletMinHeight: 0};

// Override texts
const texts: ThemeTexts = {
    ...defaultTexts,
    expirationDatePlaceholder: 'MM/YY',
    togglePasswordVisibilityLabel: 'Show or hide password',
    loading: 'Loading',
    linkOpensInNewTab: 'Opens in a new window',
    modalClose: 'Close',
    dialogCancelButton: 'Cancel',
    dialogAcceptButton: 'Accept',
    formFieldOptionalLabelSuffix: 'optional',
    formFieldErrorIsMandatory: 'Mandatory field',
    formCreditCardNumberLabel: 'Credit card number',
    formCreditCardExpirationLabel: 'Expiration',
    formCreditCardCvvLabel: 'CVV',
    formCreditCardCvvError: 'Wrong CVV',
    formCreditCardCvvTooltipVisaMcButton: 'Show help CVV',
    formCreditCardCvvTooltipVisaMc: 'The CVV code is the 3 last digits from the back of your card',
    formCreditCardCvvTooltipAmex: 'If it is an American Express, add the 4 digits from the back of your card',
    formCreditCardExpirationError: 'Invalid date',
    formCreditCardNumberError: 'Card number not valid',
    formEmailError: 'Wrong email',
    closeButtonLabel: 'Close',
    formSearchClear: 'Clear search',
};

export const Movistar: ThemeConfig = {...themes.Movistar, mediaQueries, texts};
export const Vivo: ThemeConfig = {...themes.Vivo, mediaQueries, texts};
export const O2: ThemeConfig = {...themes.O2, mediaQueries, texts};
export const O2_Classic: ThemeConfig = {...themes.O2_Classic, mediaQueries, texts};

export const Movistar_iOS: ThemeConfig = {...Movistar, platformOverrides: {platform: 'ios'}};
export const Vivo_iOS: ThemeConfig = {...Vivo, platformOverrides: {platform: 'ios'}};
export const O2_iOS: ThemeConfig = {...O2, platformOverrides: {platform: 'ios'}};
export const O2_Classic_iOS: ThemeConfig = {...O2_Classic, platformOverrides: {platform: 'ios'}};
