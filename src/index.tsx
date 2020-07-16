import {PACKAGE_VERSION} from './package-version';

export {createSheet, withSheet, removeJssProps, createUseStyles, getJss} from './jss';
export {default as ThemeContext} from './theme-context';
export {default as ThemeContextProvider} from './theme-context-provider';
export {default as TextField} from './text-field';
export {default as PhoneInput} from './phone-input';
export {default as DoubleField} from './double-field';
export {default as Select} from './select';
export {default as ScreenReaderOnly} from './screen-reader-only';
export {default as Touchable} from './touchable';
export {default as Spinner} from './spinner';
export {default as FadeIn} from './fade-in';
export {ButtonPrimary, ButtonSecondary, ButtonDanger, ButtonLink} from './button';
export {default as ButtonLayout} from './button-layout';
export {default as FixedFooterLayout} from './fixed-footer-layout';
export {default as ButtonFixedFooterLayout} from './button-fixed-footer-layout';
export {default as Snackbar} from './snackbar';
export {default as Portal} from './portal';
export {default as LoadingBar} from './loading-bar';
export {default as FixedToTop, TopDistanceContext} from './fixed-to-top';
export {default as createNestableContext} from './nestable-context';
export {default as OverscrollColor, OverscrollColorProvider} from './overscroll-color-context';
export {default as Feedback} from './feedback';
export {ErrorFeedbackScreen, InfoFeedbackScreen, SuccessFeedbackScreen} from './feedback-screen';
export {default as IconButton} from './icon-button';
export {default as Popover} from './popover';
export {default as FocusTrap} from './focus-trap';
export {confirm, alert} from './dialog';
export {default as Badge} from './badge';
export {default as TextLink} from './text-link';
export {default as Bun} from './bun';
export {default as Form} from './form';
export {default as FormSelect} from './form-select';
export {default as FormTextField} from './form-text-field';
export {default as FormEmailField} from './form-email-field';
export {default as FormPhoneNumberField} from './form-phone-number-field';
export {default as FormCreditCardExpirationField} from './form-credit-card-expiration-field';
export {default as FormCreditCardFields} from './form-credit-card-fields';
export {default as FormCvvField} from './form-cvv-field';
export {default as Overlay} from './overlay';
export {default as Tooltip} from './tooltip';
export {default as Stack} from './stack';
export {default as Box} from './box';
export {Header, HeaderLayout, MainSectionHeader, MainSectionHeaderLayout} from './header';
export {default as GridLayout} from './grid-layout';
export {default as ResponsiveLayout} from './responsive-layout';
export {default as NavigationBreadcrumbs} from './navigation-breadcrumbs';
export {default as Text} from './text';
export {default as PromoTag} from './promo-tag';
export {default as SectionTitle} from './section-title';
export {Placeholder, AvatarPlaceholder} from './placeholder';
export {RowList, Row, BoxedRowList, BoxedRow} from './list';
export {default as Switch} from './switch';
export {default as RadioButton, RadioGroup} from './radio-button';
export {default as NegativeBox} from './negative-box';
export {default as Tabs} from './tabs';
export {default as Inline} from './inline';

// Icons
export {default as IconClose} from './icons/icon-close';
export {default as IconInfo} from './icons/icon-info';
export {default as IconArrowDown} from './icons/icon-arrow-down';
export {default as IconChevron} from './icons/icon-chevron';

export {
    useTheme,
    useScreenSize,
    useElementSize,
    useAriaId,
    useWindowSize,
    useWindowHeight,
    useWindowWidth,
} from './hooks';
export type {ThemeConfig} from './theme';

export {ThemeVariant, useIsInverseVariant} from './theme-variant-context';

export {default as getColors, MOVISTAR_SKIN, VIVO_SKIN, O2_SKIN, O2_CLASSIC_SKIN} from './colors';
export type {Skin} from './colors';

export type {Locale} from './utils/locale';
export type {TrackingEvent} from './utils/types';
export type {RegionCode} from './utils/region-code';

// Check there is only one version of mistica installed in the page.
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    // @ts-expect-error __mistica_version__ does not exist in window
    if (window.__mistica_version__ && window.__mistica_version__ !== PACKAGE_VERSION) {
        throw new Error(`There is more than one version of @telefonica/mistica running on the same page`);
    } else {
        // @ts-expect-error __mistica_version__ does not exist in window
        window.__mistica_version__ = PACKAGE_VERSION;
    }
}
