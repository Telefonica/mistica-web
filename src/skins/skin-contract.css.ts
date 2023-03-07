import {createThemeContract} from '@vanilla-extract/css';

import type {Colors} from './types';

const colors: Colors = {
    appBarBackground: '',
    background: '',
    backgroundContainer: '',
    backgroundBrand: '',
    backgroundBrandSecondary: '',
    backgroundOverlay: '',
    backgroundSkeleton: '',
    backgroundSkeletonInverse: '',
    backgroundAlternative: '',
    backgroundFeedbackBottom: '',
    navigationBarBackground: '',

    skeletonWave: '',

    // BORDERS
    border: '',
    borderLow: '',
    borderHigh: '',
    borderSelected: '',

    // BUTTONS
    buttonDangerBackground: '',
    buttonDangerBackgroundSelected: '',
    buttonDangerBackgroundHover: '',
    buttonLinkBackgroundSelected: '',
    buttonLinkBackgroundInverseSelected: '',
    buttonPrimaryBackground: '',
    buttonPrimaryBackgroundInverse: '',
    buttonPrimaryBackgroundSelected: '',
    buttonPrimaryBackgroundInverseSelected: '',
    buttonPrimaryBackgroundHover: '',
    buttonSecondaryBorder: '',
    buttonSecondaryBorderSelected: '',
    buttonSecondaryBorderInverse: '',
    buttonSecondaryBorderInverseSelected: '',
    buttonSecondaryBackgroundHover: '',
    buttonSecondaryBackgroundSelected: '',
    buttonSecondaryBackgroundInverseHover: '',
    buttonSecondaryBackgroundInverseSelected: '',

    // CONTROLS
    control: '',
    controlActivated: '',
    controlError: '',
    loadingBar: '',
    loadingBarBackground: '',

    toggleAndroidInactive: '',
    toggleAndroidBackgroundActive: '',
    iosControlKnob: '',

    // DIVIDERS
    divider: '',
    dividerInverse: '',
    navigationBarDivider: '',

    // FEEDBACKS
    badge: '',
    feedbackErrorBackground: '',
    feedbackInfoBackground: '',

    // GLOBAL
    brand: '',
    brandHigh: '',
    inverse: '',
    neutralHigh: '',
    neutralLow: '',
    neutralMedium: '',
    neutralMediumInverse: '',
    promo: '',

    // STATES
    error: '',
    highlight: '',
    success: '',
    warning: '',

    // TEXT GLOBAL
    textPrimary: '',
    textPrimaryInverse: '',
    textSecondary: '',
    textSecondaryInverse: '',

    // TEXT BUTTONS
    textButtonPrimary: '',
    textButtonPrimaryInverse: '',
    textButtonPrimaryInverseSelected: '',
    textButtonSecondary: '',
    textButtonSecondarySelected: '',
    textButtonSecondaryInverse: '',
    textButtonSecondaryInverseSelected: '',

    // TEXT LINKS
    textLink: '',
    textLinkInverse: '',
    textLinkDanger: '',
    textLinkSnackbar: '',

    // TEXT NAVIGATION BARS
    textNavigationBarPrimary: '',
    textNavigationBarSecondary: '',
    textNavigationSearchBarHint: '',
    textNavigationSearchBarText: '',
    textAppBar: '',
    textAppBarSelected: '',

    // TAGS
    successLow: '',
    warningLow: '',
    errorLow: '',
    promoLow: '',
    brandLow: '',
    successHigh: '',
    warningHigh: '',
    errorHigh: '',
    promoHigh: '',
    successHighInverse: '',
    warningHighInverse: '',
    errorHighInverse: '',
    promoHighInverse: '',
};

export const vars = createThemeContract({
    colors,
    /**
     * Raw colors are defined as rgb components to allow applying alpha channel when using the css var
     * See ThemeContextProvider, where the colors provided in the themeConfig are transformed into rgb components
     * See utils/color.tsx applyAlha, where the alpha channel is applied to the css var
     */
    rawColors: colors,
});
