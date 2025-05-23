import {TELEFONICA_SKIN} from './constants';
import {applyAlpha} from '../utils/color';

import type {GetKnownSkin, KnownSkin} from './types';

export const palette = {
    telefonicaBlue: '#0066FF',
    telefonicaBlue10: '#E5F0FF',
    telefonicaBlue20: '#B2D1FF',
    telefonicaBlue30: '#80B3FF',
    telefonicaBlue70: '#0356C9',
    ambar: '#EAC344',
    ambar10: '#FDF9EC',
    ambar40: '#F0D57C',
    ambar70: '#69581F',
    coral: '#E66C64',
    coral10: '#FDF0EF',
    coral40: '#E3A19A',
    coral70: '#D50000',
    coral80: '#912C31',
    orchid: '#C466EF',
    orchid10: '#F9F0FD',
    orchid40: '#D694F4',
    orchid70: '#8A1A93',
    turquoise: '#59C2C9',
    turquoise10: '#EEF9FA',
    turquoise40: '#8BD4D9',
    turquoise70: '#3E888D',
    grey1: '#F2F4FF',
    grey2: '#D1D5E4',
    grey3: '#B0B6CA',
    grey4: '#848CA4',
    grey5: '#6E7894',
    grey6: '#58617A',
    grey7: '#414B61',
    grey8: '#2B3447',
    grey9: '#031A34',
    white: '#FFFFFF',
    black: '#000000',
    darkModeBlack: '#191919',
    darkModeGrey: '#242424',
    darkModeGrey6: '#313235',
};

export const getTelefonicaSkin: GetKnownSkin = () => {
    const skin: KnownSkin = {
        name: TELEFONICA_SKIN,
        colors: {
            appBarBackground: palette.white,
            background: palette.white,
            backgroundContainer: palette.white,
            backgroundContainerError: palette.coral10,
            backgroundContainerHover: applyAlpha(palette.telefonicaBlue70, 0.05),
            backgroundContainerPressed: applyAlpha(palette.telefonicaBlue70, 0.08),
            backgroundContainerBrand: palette.telefonicaBlue,
            backgroundContainerBrandHover: applyAlpha(palette.darkModeBlack, 0.2),
            backgroundContainerBrandPressed: applyAlpha(palette.darkModeBlack, 0.4),
            backgroundContainerBrandOverInverse: palette.telefonicaBlue70,
            backgroundContainerAlternative: palette.grey1,
            backgroundBrand: palette.telefonicaBlue,
            backgroundBrandSecondary: palette.telefonicaBlue,
            backgroundOverlay: applyAlpha(palette.grey6, 0.8),
            backgroundSkeleton: palette.grey2,
            backgroundSkeletonInverse: palette.telefonicaBlue70,
            navigationBarBackground: palette.telefonicaBlue,
            backgroundAlternative: palette.grey1,
            backgroundBrandTop: palette.telefonicaBlue,
            backgroundBrandBottom: palette.telefonicaBlue,
            skeletonWave: palette.grey2,
            borderLow: palette.grey1,
            border: palette.grey2,
            borderHigh: palette.grey5,
            borderSelected: palette.telefonicaBlue,
            coverBackgroundHover: applyAlpha(palette.darkModeBlack, 0.25),
            coverBackgroundPressed: applyAlpha(palette.darkModeBlack, 0.35),
            buttonDangerBackground: palette.coral,
            buttonDangerBackgroundPressed: palette.coral80,
            buttonDangerBackgroundHover: palette.coral80,
            buttonLinkDangerBackgroundPressed: palette.coral10,
            buttonLinkDangerBackgroundInverse: palette.white,
            buttonLinkDangerBackgroundInversePressed: palette.coral10,
            buttonLinkBackgroundPressed: palette.grey1,
            buttonLinkBackgroundInversePressed: applyAlpha(palette.white, 0.08),
            buttonPrimaryBackground: palette.telefonicaBlue,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundPressed: palette.telefonicaBlue70,
            buttonPrimaryBackgroundHover: palette.telefonicaBlue70,
            buttonPrimaryBackgroundInversePressed: palette.telefonicaBlue30,
            buttonSecondaryBorder: palette.telefonicaBlue,
            buttonSecondaryBorderPressed: palette.telefonicaBlue70,
            buttonSecondaryBackgroundHover: palette.telefonicaBlue10,
            buttonSecondaryBackgroundPressed: palette.telefonicaBlue10,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderInversePressed: palette.white,
            buttonSecondaryBackgroundInverseHover: applyAlpha(palette.white, 0.1),
            buttonSecondaryBackgroundInversePressed: applyAlpha(palette.white, 0.1),
            textButtonPrimary: palette.white,
            textButtonPrimaryInverse: palette.telefonicaBlue,
            textButtonPrimaryInversePressed: palette.telefonicaBlue,
            textButtonSecondary: palette.telefonicaBlue,
            textButtonSecondaryPressed: palette.telefonicaBlue70,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInversePressed: palette.white,
            textLink: palette.telefonicaBlue,
            textLinkInverse: palette.white,
            textLinkDanger: palette.coral,
            textLinkSnackbar: palette.telefonicaBlue30,
            textActivated: palette.telefonicaBlue,
            textBrand: palette.telefonicaBlue,
            inputBorder: palette.grey4,
            control: palette.grey3,
            controlActivated: palette.telefonicaBlue,
            controlInverse: palette.grey1,
            controlActivatedInverse: palette.white,
            controlError: palette.coral,
            barTrack: palette.grey2,
            barTrackInverse: applyAlpha(palette.white, 0.3),
            loadingBar: palette.telefonicaBlue30,
            loadingBarBackground: palette.telefonicaBlue70,
            toggleAndroidInactive: palette.grey2,
            toggleAndroidBackgroundActive: palette.grey2,
            iosControlKnob: palette.white,
            controlKnobInverse: palette.telefonicaBlue,
            divider: palette.grey2,
            dividerInverse: applyAlpha(palette.white, 0.2),
            navigationBarDivider: palette.telefonicaBlue,
            badge: palette.coral70,
            feedbackErrorBackground: palette.coral,
            feedbackInfoBackground: palette.grey9,
            brand: palette.telefonicaBlue,
            brandHigh: palette.telefonicaBlue70,
            inverse: palette.white,
            neutralHigh: palette.grey9,
            neutralMedium: palette.grey5,
            neutralMediumInverse: palette.grey5,
            neutralLow: palette.grey1,
            neutralLowAlternative: palette.grey2,
            textPrimary: palette.grey9,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey6,
            textSecondaryInverse: palette.telefonicaBlue10,
            error: palette.coral,
            textError: palette.coral,
            textErrorInverse: palette.white,
            success: palette.turquoise,
            warning: palette.ambar,
            promo: palette.orchid,
            highlight: palette.coral40,
            successLow: palette.turquoise10,
            warningLow: palette.ambar10,
            errorLow: palette.coral10,
            promoLow: palette.orchid10,
            brandLow: palette.telefonicaBlue10,
            successHigh: palette.turquoise70,
            warningHigh: palette.ambar70,
            errorHigh: palette.coral70,
            promoHigh: palette.orchid70,
            successHighInverse: palette.turquoise70,
            warningHighInverse: palette.ambar70,
            errorHighInverse: palette.coral70,
            promoHighInverse: palette.orchid70,
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.grey1,
            textNavigationSearchBarHint: palette.grey1,
            textNavigationSearchBarText: palette.white,
            textAppBar: palette.grey4,
            textAppBarSelected: palette.telefonicaBlue,
            customTabsBackground: palette.telefonicaBlue,
            tagTextPromo: palette.orchid70,
            tagTextActive: palette.telefonicaBlue,
            tagTextInactive: palette.grey5,
            tagTextInfo: palette.telefonicaBlue,
            tagTextSuccess: palette.turquoise70,
            tagTextWarning: palette.ambar70,
            tagTextError: palette.coral70,
            tagBackgroundPromo: palette.orchid10,
            tagBackgroundActive: palette.telefonicaBlue10,
            tagBackgroundInactive: palette.grey1,
            tagBackgroundInfo: palette.telefonicaBlue10,
            tagBackgroundSuccess: palette.turquoise10,
            tagBackgroundWarning: palette.ambar10,
            tagBackgroundError: palette.coral10,
            tagTextPromoInverse: palette.orchid70,
            tagTextActiveInverse: palette.telefonicaBlue,
            tagTextInactiveInverse: palette.grey5,
            tagTextInfoInverse: palette.telefonicaBlue,
            tagTextSuccessInverse: palette.turquoise70,
            tagTextWarningInverse: palette.ambar70,
            tagTextErrorInverse: palette.coral70,
            tagBackgroundPromoInverse: palette.orchid10,
            tagBackgroundActiveInverse: palette.telefonicaBlue10,
            tagBackgroundInactiveInverse: palette.grey1,
            tagBackgroundInfoInverse: palette.telefonicaBlue10,
            tagBackgroundSuccessInverse: palette.turquoise10,
            tagBackgroundWarningInverse: palette.ambar10,
            tagBackgroundErrorInverse: palette.coral10,
            cardContentOverlay: `linear-gradient(180deg, ${applyAlpha(palette.black, 0)} 0%, ${applyAlpha(palette.black, 0.4)} 30%, ${applyAlpha(palette.black, 0.7)} 100%)`,
        },
        darkModeColors: {
            background: palette.darkModeBlack,
            backgroundAlternative: palette.darkModeBlack,
            backgroundBrand: palette.darkModeBlack,
            backgroundBrandSecondary: palette.darkModeBlack,
            backgroundContainer: palette.darkModeGrey,
            backgroundContainerError: palette.darkModeGrey,
            backgroundContainerHover: applyAlpha(palette.white, 0.05),
            backgroundContainerPressed: applyAlpha(palette.white, 0.08),
            backgroundContainerBrand: palette.darkModeGrey,
            backgroundContainerBrandHover: applyAlpha(palette.white, 0.03),
            backgroundContainerBrandPressed: applyAlpha(palette.white, 0.05),
            backgroundContainerBrandOverInverse: palette.darkModeGrey,
            backgroundContainerAlternative: palette.darkModeGrey,
            backgroundOverlay: applyAlpha(palette.darkModeGrey, 0.8),
            backgroundSkeleton: palette.grey6,
            backgroundSkeletonInverse: palette.grey6,
            backgroundBrandTop: palette.darkModeBlack,
            backgroundBrandBottom: palette.darkModeBlack,
            appBarBackground: palette.darkModeGrey,
            navigationBarBackground: palette.darkModeBlack,
            skeletonWave: palette.grey5,
            borderLow: palette.darkModeBlack,
            border: palette.darkModeGrey,
            borderHigh: palette.grey5,
            borderSelected: palette.telefonicaBlue,
            coverBackgroundHover: applyAlpha(palette.darkModeBlack, 0.25),
            coverBackgroundPressed: applyAlpha(palette.darkModeBlack, 0.35),
            buttonDangerBackground: palette.coral,
            buttonDangerBackgroundPressed: palette.coral80,
            buttonDangerBackgroundHover: palette.coral80,
            buttonLinkDangerBackgroundPressed: applyAlpha(palette.white, 0.08),
            buttonLinkDangerBackgroundInverse: applyAlpha(palette.white, 0),
            buttonLinkDangerBackgroundInversePressed: applyAlpha(palette.white, 0.08),
            buttonLinkBackgroundPressed: applyAlpha(palette.white, 0.08),
            buttonLinkBackgroundInversePressed: applyAlpha(palette.white, 0.08),
            buttonPrimaryBackground: palette.telefonicaBlue,
            buttonPrimaryBackgroundInverse: palette.telefonicaBlue,
            buttonPrimaryBackgroundPressed: palette.telefonicaBlue70,
            buttonPrimaryBackgroundHover: palette.telefonicaBlue70,
            buttonPrimaryBackgroundInversePressed: palette.telefonicaBlue70,
            buttonSecondaryBackgroundPressed: applyAlpha(palette.white, 0.15),
            buttonSecondaryBorder: palette.white,
            buttonSecondaryBackgroundHover: applyAlpha(palette.white, 0.15),
            buttonSecondaryBorderPressed: palette.white,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderInversePressed: palette.white,
            buttonSecondaryBackgroundInverseHover: applyAlpha(palette.white, 0.15),
            buttonSecondaryBackgroundInversePressed: applyAlpha(palette.white, 0.15),
            textButtonPrimary: palette.grey2,
            textButtonPrimaryInverse: palette.grey2,
            textButtonPrimaryInversePressed: palette.grey2,
            textButtonSecondary: palette.grey2,
            textButtonSecondaryPressed: palette.grey2,
            textButtonSecondaryInverse: palette.grey2,
            textButtonSecondaryInversePressed: palette.grey2,
            textLink: palette.telefonicaBlue,
            textLinkInverse: palette.telefonicaBlue,
            textLinkDanger: palette.coral,
            textLinkSnackbar: palette.telefonicaBlue30,
            textActivated: palette.telefonicaBlue,
            textBrand: palette.telefonicaBlue,
            inputBorder: palette.grey5,
            control: palette.darkModeGrey6,
            controlActivated: palette.telefonicaBlue,
            controlInverse: palette.darkModeGrey6,
            controlActivatedInverse: palette.telefonicaBlue,
            controlError: palette.coral,
            barTrack: palette.darkModeGrey6,
            barTrackInverse: palette.darkModeGrey6,
            loadingBar: palette.telefonicaBlue,
            loadingBarBackground: palette.grey6,
            toggleAndroidInactive: palette.grey4,
            toggleAndroidBackgroundActive: palette.telefonicaBlue20,
            iosControlKnob: palette.grey2,
            controlKnobInverse: palette.grey2,
            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,
            badge: palette.coral70,
            feedbackErrorBackground: palette.coral,
            feedbackInfoBackground: palette.grey8,
            brand: palette.telefonicaBlue,
            brandHigh: applyAlpha(palette.white, 0.05),
            inverse: palette.grey2,
            neutralHigh: palette.grey2,
            neutralMedium: palette.grey5,
            neutralMediumInverse: palette.grey5,
            neutralLow: palette.darkModeGrey6,
            neutralLowAlternative: palette.darkModeGrey6,
            textPrimary: palette.grey2,
            textPrimaryInverse: palette.grey2,
            textSecondary: palette.grey3,
            textSecondaryInverse: palette.grey3,
            error: palette.coral,
            textError: palette.coral,
            textErrorInverse: palette.coral,
            success: palette.turquoise,
            warning: palette.ambar,
            promo: palette.orchid,
            highlight: palette.coral40,
            successLow: palette.darkModeGrey6,
            warningLow: palette.darkModeGrey6,
            errorLow: palette.darkModeGrey6,
            promoLow: palette.darkModeGrey6,
            brandLow: palette.darkModeGrey6,
            successHigh: palette.turquoise40,
            warningHigh: palette.ambar40,
            errorHigh: palette.coral40,
            promoHigh: palette.orchid40,
            successHighInverse: palette.turquoise70,
            warningHighInverse: palette.ambar70,
            errorHighInverse: palette.coral70,
            promoHighInverse: palette.orchid70,
            textNavigationBarPrimary: palette.grey2,
            textNavigationBarSecondary: palette.grey4,
            textNavigationSearchBarHint: palette.grey4,
            textNavigationSearchBarText: palette.grey2,
            textAppBar: palette.grey5,
            textAppBarSelected: palette.grey2,
            customTabsBackground: palette.darkModeBlack,
            tagTextPromo: palette.orchid40,
            tagTextActive: palette.telefonicaBlue,
            tagTextInactive: palette.grey5,
            tagTextInfo: palette.telefonicaBlue,
            tagTextSuccess: palette.turquoise40,
            tagTextWarning: palette.ambar40,
            tagTextError: palette.coral40,
            tagBackgroundPromo: palette.darkModeGrey6,
            tagBackgroundActive: palette.darkModeGrey6,
            tagBackgroundInactive: palette.darkModeGrey6,
            tagBackgroundInfo: palette.darkModeGrey6,
            tagBackgroundSuccess: palette.darkModeGrey6,
            tagBackgroundWarning: palette.darkModeGrey6,
            tagBackgroundError: palette.darkModeGrey6,
            tagTextPromoInverse: palette.orchid40,
            tagTextActiveInverse: palette.telefonicaBlue,
            tagTextInactiveInverse: palette.grey5,
            tagTextInfoInverse: palette.telefonicaBlue,
            tagTextSuccessInverse: palette.turquoise40,
            tagTextWarningInverse: palette.ambar40,
            tagTextErrorInverse: palette.coral40,
            tagBackgroundPromoInverse: palette.darkModeGrey6,
            tagBackgroundActiveInverse: palette.darkModeGrey6,
            tagBackgroundInactiveInverse: palette.darkModeGrey6,
            tagBackgroundInfoInverse: palette.darkModeGrey6,
            tagBackgroundSuccessInverse: palette.darkModeGrey6,
            tagBackgroundWarningInverse: palette.darkModeGrey6,
            tagBackgroundErrorInverse: palette.darkModeGrey6,
            cardContentOverlay: `linear-gradient(180deg, ${applyAlpha(palette.black, 0)} 0%, ${applyAlpha(palette.black, 0.4)} 30%, ${applyAlpha(palette.black, 0.7)} 100%)`,
        },
        borderRadii: {
            avatar: '50%',
            bar: '0px',
            button: '999px',
            checkbox: '0px',
            container: '0px',
            indicator: '999px',
            input: '0px',
            legacyDisplay: '0px',
            popup: '0px',
            sheet: '0px',
            mediaSmall: '0px',
        },
        textPresets: {
            button: {weight: 'medium'},
            cardTitle: {weight: 'regular'},
            indicator: {weight: 'medium'},
            link: {weight: 'medium'},
            navigationBar: {weight: 'medium'},
            tabsLabel: {
                lineHeight: {desktop: 24, mobile: 24},
                size: {desktop: 18, mobile: 16},
                weight: 'medium',
            },
            text1: {lineHeight: {desktop: 20, mobile: 16}, size: {desktop: 14, mobile: 12}},
            text2: {lineHeight: {desktop: 24, mobile: 20}, size: {desktop: 16, mobile: 14}},
            text3: {lineHeight: {desktop: 24, mobile: 24}, size: {desktop: 18, mobile: 16}},
            text4: {lineHeight: {desktop: 28, mobile: 24}, size: {desktop: 20, mobile: 18}},
            text5: {
                lineHeight: {desktop: 32, mobile: 24},
                size: {desktop: 28, mobile: 20},
                weight: 'regular',
            },
            text6: {
                lineHeight: {desktop: 40, mobile: 32},
                size: {desktop: 32, mobile: 24},
                weight: 'regular',
            },
            text7: {
                lineHeight: {desktop: 48, mobile: 32},
                size: {desktop: 40, mobile: 28},
                weight: 'regular',
            },
            text8: {
                lineHeight: {desktop: 56, mobile: 40},
                size: {desktop: 48, mobile: 32},
                weight: 'regular',
            },
            text9: {
                lineHeight: {desktop: 64, mobile: 48},
                size: {desktop: 56, mobile: 40},
                weight: 'regular',
            },
            text10: {
                lineHeight: {desktop: 72, mobile: 56},
                size: {desktop: 64, mobile: 48},
                weight: 'regular',
            },
            title1: {weight: 'medium'},
            title2: {weight: 'regular'},
            title3: {
                lineHeight: {desktop: 32, mobile: 24},
                size: {desktop: 28, mobile: 20},
                weight: 'regular',
            },
        },
    };
    return skin;
};
