import {createThemeContract} from '@vanilla-extract/css';

import type {BorderRadiiConfig, Colors} from './types';

const colors: Colors = {
    appBarBackground: '',
    background: '',
    backgroundContainer: '',
    backgroundContainerError: '',
    backgroundContainerHover: '',
    backgroundContainerPressed: '',
    backgroundContainerBrand: '',
    backgroundContainerBrandHover: '',
    backgroundContainerBrandPressed: '',
    backgroundContainerBrandOverInverse: '',
    backgroundContainerAlternative: '',
    backgroundBrand: '',
    backgroundBrandSecondary: '',
    backgroundOverlay: '',
    backgroundSkeleton: '',
    backgroundSkeletonInverse: '',
    backgroundAlternative: '',
    backgroundBrandTop: '',
    backgroundBrandBottom: '',
    navigationBarBackground: '',

    skeletonWave: '',

    // BORDERS
    border: '',
    borderLow: '',
    borderHigh: '',
    borderSelected: '',

    // BUTTONS
    buttonDangerBackground: '',
    buttonDangerBackgroundPressed: '',
    buttonDangerBackgroundHover: '',
    buttonLinkDangerBackgroundPressed: '',
    buttonLinkDangerBackgroundInverse: '',
    buttonLinkDangerBackgroundInversePressed: '',
    buttonLinkBackgroundPressed: '',
    buttonLinkBackgroundInversePressed: '',
    buttonPrimaryBackground: '',
    buttonPrimaryBackgroundInverse: '',
    buttonPrimaryBackgroundPressed: '',
    buttonPrimaryBackgroundInversePressed: '',
    buttonPrimaryBackgroundHover: '',
    buttonSecondaryBorder: '',
    buttonSecondaryBorderPressed: '',
    buttonSecondaryBorderInverse: '',
    buttonSecondaryBorderInversePressed: '',
    buttonSecondaryBackgroundHover: '',
    buttonSecondaryBackgroundPressed: '',
    buttonSecondaryBackgroundInverseHover: '',
    buttonSecondaryBackgroundInversePressed: '',

    // CONTROLS
    control: '',
    controlActivated: '',
    controlInverse: '',
    controlActivatedInverse: '',
    controlError: '',
    barTrack: '',
    barTrackInverse: '',
    loadingBar: '',
    loadingBarBackground: '',
    textActivated: '',

    toggleAndroidInactive: '',
    toggleAndroidBackgroundActive: '',
    controlKnobInverse: '',
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
    neutralLowAlternative: '',
    neutralMedium: '',
    neutralMediumInverse: '',
    promo: '',
    textBrand: '',

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
    textError: '',
    textErrorInverse: '',

    // TEXT BUTTONS
    textButtonPrimary: '',
    textButtonPrimaryInverse: '',
    textButtonPrimaryInversePressed: '',
    textButtonSecondary: '',
    textButtonSecondaryPressed: '',
    textButtonSecondaryInverse: '',
    textButtonSecondaryInversePressed: '',

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
    tagTextPromo: '',
    tagTextActive: '',
    tagTextInactive: '',
    tagTextSuccess: '',
    tagTextWarning: '',
    tagTextError: '',
    tagBackgroundPromo: '',
    tagBackgroundActive: '',
    tagBackgroundInactive: '',
    tagBackgroundSuccess: '',
    tagBackgroundWarning: '',
    tagBackgroundError: '',

    customTabsBackground: '',
    coverBackgroundHover: '',
    coverBackgroundPressed: '',
    cardContentOverlay: '',
};

const borderRadii: BorderRadiiConfig = {
    button: '',
    input: '',
    container: '',
    legacyDisplay: '',
    popup: '',
    checkbox: '',
    indicator: '',
    sheet: '',
    bar: '',
    avatar: '',
    mediaSmall: '',
};

const textPresets = {
    cardTitle: {weight: ''},
    button: {weight: ''},
    link: {weight: ''},
    title1: {weight: ''},
    title2: {weight: ''},
    title3: {weight: '', size: '', lineHeight: ''},
    indicator: {weight: ''},
    tabsLabel: {weight: '', size: '', lineHeight: ''},
    navigationBar: {weight: ''},
    text1: {size: '', lineHeight: ''},
    text2: {size: '', lineHeight: ''},
    text3: {size: '', lineHeight: ''},
    text4: {size: '', lineHeight: ''},
    text5: {weight: '', size: '', lineHeight: ''},
    text6: {weight: '', size: '', lineHeight: ''},
    text7: {weight: '', size: '', lineHeight: ''},
    text8: {weight: '', size: '', lineHeight: ''},
    text9: {weight: '', size: '', lineHeight: ''},
    text10: {weight: '', size: '', lineHeight: ''},
};

export const vars = createThemeContract({
    colors,
    /**
     * Raw colors are defined as rgb components to allow applying alpha channel when using the css var
     * See ThemeContextProvider, where the colors provided in the themeConfig are transformed into rgb components
     * See utils/color.tsx applyAlha, where the alpha channel is applied to the css var
     */
    rawColors: colors,
    borderRadii,
    textPresets,
});
