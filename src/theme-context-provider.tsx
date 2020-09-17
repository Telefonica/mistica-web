import * as React from 'react';
import {JssProvider} from 'react-jss';
import {createGenerateId} from 'jss';
import {getJss} from './jss';
import {baseTheme} from './theme';
import ThemeContext from './theme-context';
import {getColors} from './colors';
import DialogRoot from './dialog';
import ScreenSizeContextProvider from './screen-size-context-provider';
import {createMediaQueries} from './utils/media-queries';
import {PACKAGE_VERSION} from './package-version';
import AriaIdGetterContext from './aria-id-getter-context';

import type {Theme, ThemeConfig} from './theme';

type Props = {
    theme: ThemeConfig;
    children?: React.ReactNode;
};

// This counter will increment with every new instance of ThemeContextProvider in the app. In a typical app we don't need more than
// one instance of ThemeContextProvider. But some apps may depend on libs that use Mistica too, so there may be more than one instance
// in those cases. We use this counter to avoid class name collisions in those cases.
let jssInstanceId = 0;

const isServerSide = typeof window === 'undefined';

const generateId = isServerSide ? undefined : createGenerateId();

const ThemeContextProvider: React.FC<Props> = ({theme, children}) => {
    const classNamePrefix = React.useMemo(
        // Always start the counter in 0 in server side, otherwise every new request to the server will inclrement the counter and
        // we'll have missmatches when rendering client side. The disadvantage of this is that we can only have one instance of
        // ThemeContextProvider in apps with ssr.
        () => `mistica-${PACKAGE_VERSION.replace(/\./g, '-')}-${isServerSide ? 0 : jssInstanceId++}-`,
        []
    );
    const {skin, colorOverride} = theme;
    const c = getColors(skin, colorOverride);
    const nextAriaId = React.useRef(1);
    const getAriaId = React.useCallback((): string => `aria-id-hook-${nextAriaId.current++}`, []);

    const contextTheme: Theme = {
        skin: theme.skin,
        i18n: theme.i18n,
        platformOverrides: {
            ...baseTheme.platformOverrides,
            ...theme.platformOverrides,
        },
        texts: {
            ...baseTheme.texts,
            ...theme.texts,
        },
        analytics: {
            ...baseTheme.analytics,
            ...theme.analytics,
        },
        dimensions: {
            ...baseTheme.dimensions,
            ...theme.dimensions,
        },
        mq: theme.mediaQueries ? createMediaQueries(theme.mediaQueries) : baseTheme.mq,
        colors: {
            controlActive: c.CONTROL_ACTIVE,
            controlInactive: c.CONTROL_INACTIVE,
            controlError: c.CONTROL_ERROR,
            textPrimary: c.TEXT_PRIMARY,
            background: c.BACKGROUND,
            backgroundHeading: c.BACKGROUND_HEADING,
            backgroundAlternative: c.BACKGROUND_ALTERNATIVE,
            backgroundPromo: c.BACKGROUND_PROMO,
            backgroundBrand: c.BACKGROUND_BRAND,

            buttonPrimaryBackground: c.BUTTON_PRIMARY_BACKGROUND,
            buttonPrimaryBackgroundSelected: c.BUTTON_PRIMARY_BACKGROUND_SELECTED,
            buttonPrimaryBackgroundDisabled: c.BUTTON_PRIMARY_BACKGROUND_DISABLED,
            buttonPrimaryBackgroundHover: c.BUTTON_PRIMARY_BACKGROUND_HOVER,
            buttonPrimaryText: c.BUTTON_PRIMARY_TEXT,
            buttonSecondaryBackground: c.BUTTON_SECONDARY_BACKGROUND,
            buttonSecondaryText: c.BUTTON_SECONDARY_TEXT,
            buttonSecondaryTextSelected: c.BUTTON_SECONDARY_TEXT_SELECTED,
            buttonSecondaryTextDisabled: c.BUTTON_SECONDARY_TEXT_DISABLED,
            buttonSecondaryBorder: c.BUTTON_SECONDARY_BORDER,
            buttonSecondaryBorderSelected: c.BUTTON_SECONDARY_BORDER_SELECTED,
            buttonSecondaryBorderDisabled: c.BUTTON_SECONDARY_BORDER_DISABLED,
            buttonPrimaryBackgroundInverse: c.BUTTON_PRIMARY_BACKGROUND_INVERSE,
            textButtonPrimaryInverse: c.TEXT_BUTTON_PRIMARY_INVERSE,
            buttonPrimaryBackgroundInverseSelected: c.BUTTON_PRIMARY_BACKGROUND_INVERSE_SELECTED,
            textButtonPrimaryInverseSelected: c.TEXT_BUTTON_PRIMARY_INVERSE_SELECTED,
            buttonPrimaryBackgroundInverseDisabled: c.BUTTON_PRIMARY_BACKGROUND_INVERSE_DISABLED,
            textButtonPrimaryInverseDisabled: c.TEXT_BUTTON_PRIMARY_INVERSE_DISABLED,
            buttonSecondaryBorderInverse: c.BUTTON_SECONDARY_BORDER_INVERSE,
            textButtonSecondaryInverse: c.TEXT_BUTTON_SECONDARY_INVERSE,
            buttonSecondaryBorderInverseSelected: c.BUTTON_SECONDARY_BORDER_INVERSE_SELECTED,
            textButtonSecondaryInverseSelected: c.TEXT_BUTTON_SECONDARY_INVERSE_SELECTED,
            buttonSecondaryBorderInverseDisabled: c.BUTTON_SECONDARY_BORDER_INVERSE_DISABLED,
            textButtonSecondaryInverseDisabled: c.TEXT_BUTTON_SECONDARY_INVERSE_DISABLED,
            buttonDangerBackground: c.BUTTON_DANGER_BACKGROUND,
            buttonDangerBackgroundDisabled: c.BUTTON_DANGER_BACKGROUND_DISABLED,
            buttonDangerBackgroundHover: c.BUTTON_DANGER_BACKGROUND_HOVER,
            buttonDangerBackgroundSelected: c.BUTTON_DANGER_BACKGROUND_SELECTED,
            textLink: c.TEXT_LINK,
            textInactive: c.TEXT_INACTIVE,
            textPrimaryInverse: c.TEXT_PRIMARY_INVERSE,
            buttonLinkBackgroundSelected: c.BUTTON_LINK_BACKGROUND_SELECTED,
            iconHighlight: c.ICON_HIGHLIGHT,
            overscrollColorTop: c.OVERSCROLL_COLOR_TOP,
            backgroundSpecialBottom: c.BACKGROUND_SPECIAL_BOTTOM,
            backgroundSpecial1: c.BACKGROUND_SPECIAL_1,
            backgroundOpacity: c.BACKGROUND_OPACITY,
            textPrimarySpecial: c.TEXT_PRIMARY_SPECIAL,
            textSecondary: c.TEXT_SECONDARY,
            loadingBarPrimary: c.LOADING_BAR_PRIMARY,
            loadingBarPrimaryInverse: c.LOADING_BAR_PRIMARY_INVERSE,
            loadingBarBackground: c.LOADING_BAR_BACKGROUND,
            loadingBarBackgroundInverse: c.LOADING_BAR_BACKGROUND_INVERSE,
            layerDecorations: c.LAYER_DECORATIONS,
            divider: c.DIVIDER,
            border: c.BORDER,
            borderLight: c.BORDER_LIGHT,
            textDanger: c.TEXT_DANGER,
            textError: c.TEXT_ERROR,

            feedbackErrorBackground: c.FEEDBACK_ERROR_BACKGROUND,
            feedbackInfoBackground: c.FEEDBACK_INFO_BACKGROUND,
            textAccent: c.TEXT_ACCENT,
            textLinkSnackbar: c.TEXT_LINK_SNACKBAR,

            iconAccent: c.ICON_ACCENT,
            iconSecondary: c.ICON_SECONDARY,
            iconPrimary: c.ICON_PRIMARY,
            iconTertiary: c.ICON_TERTIARY,
            iconInverse: c.ICON_INVERSE,

            badgeBackground: c.BADGE_BACKGROUND,

            toggleAndroidInactive: c.TOGGLE_ANDROID_INACTIVE,
            toggleAndroidBackgroundInactive: c.TOGGLE_ANDROID_BACKGROUND_INACTIVE,
            toggleAndroidActive: c.TOGGLE_ANDROID_ACTIVE,
            toggleAndroidBackgroundActive: c.TOGGLE_ANDROID_BACKGROUND_ACTIVE,
            toggleIosInactive: c.TOGGLE_IOS_INACTIVE,
            toggleIosBackgroundInactive: c.TOGGLE_IOS_BACKGROUND_INACTIVE,
            toggleIosBackgroundActive: c.TOGGLE_IOS_BACKGROUND_ACTIVE,

            textAppbar: c.TEXT_APPBAR,
            textAppbarSelected: c.TEXT_APPBAR_SELECTED,
        },
        Link: theme.Link ?? baseTheme.Link,
    };

    return (
        <JssProvider jss={getJss()} classNamePrefix={classNamePrefix} generateId={generateId}>
            <ThemeContext.Provider value={contextTheme}>
                <AriaIdGetterContext.Provider value={getAriaId}>
                    <ScreenSizeContextProvider>
                        <DialogRoot>{children}</DialogRoot>
                    </ScreenSizeContextProvider>
                </AriaIdGetterContext.Provider>
            </ThemeContext.Provider>
        </JssProvider>
    );
};

export default ThemeContextProvider;
