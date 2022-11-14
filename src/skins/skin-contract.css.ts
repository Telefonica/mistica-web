import {createThemeContract} from '@vanilla-extract/css';

export const vars = createThemeContract({
    colors: {
        appBarBackground: '',
        background: '',
        backgroundContainer: '',
        backgroundBrand: '',
        backgroundOverlay: '',
        backgroundSkeleton: '',
        backgroundSkeletonInverse: '',
        backgroundAlternative: '',
        backgroundFeedbackBottom: '',
        navigationBarBackground: '',

        skeletonWave: '',

        // BORDERS
        border: '',
        borderLight: '',
        borderDark: '',
        borderSelected: '',

        // BUTTONS
        buttonDangerBackground: '',
        buttonDangerBackgroundSelected: '',
        buttonDangerBackgroundHover: '',
        buttonLinkBackgroundSelected: '',
        buttonLinkBackgroundSelectedInverse: '',
        buttonPrimaryBackground: '',
        buttonPrimaryBackgroundInverse: '',
        buttonPrimaryBackgroundSelected: '',
        buttonPrimaryBackgroundSelectedInverse: '',
        buttonPrimaryBackgroundHover: '',
        buttonSecondaryBackground: '',
        buttonSecondaryBackgroundSelected: '',
        buttonSecondaryBorderInverse: '',
        buttonSecondaryBorderSelectedInverse: '',

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
    },
});
