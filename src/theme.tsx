import * as React from 'react';

import type {RegionCode} from './utils/region-code';
import type {Locale} from './utils/locale';
import type {
    BorderRadiiConfig,
    Colors,
    Skin,
    SkinName,
    TextPresetsConfig,
    ThemeVariantsConfig,
} from './skins/types';
import type {TrackingEvent} from './utils/types';
import type {Dictionary, TextToken} from './text-tokens';

export const NAVBAR_HEIGHT_MOBILE = 56;
export const NAVBAR_HEIGHT_DESKTOP = 80;
export const NAVBAR_HEIGHT_DESKTOP_LARGE = 2 * NAVBAR_HEIGHT_DESKTOP;

export const dimensions = {
    headerMobileHeight: NAVBAR_HEIGHT_MOBILE,
    headerDesktopHeight: NAVBAR_HEIGHT_DESKTOP,
};

/**
 * https://reactrouter.com/en/main/components/link
 * https://nextjs.org/docs/app/api-reference/components/link
 */
type LinkComponent = React.ComponentType<{
    style?: React.CSSProperties;
    className?: string;
    'aria-label'?: string;
    disabled?: boolean;
    role?: string;
    'data-testid'?: string;
    'aria-checked'?: React.AnchorHTMLAttributes<HTMLAnchorElement>['aria-checked'];
    'aria-controls'?: string;
    'aria-expanded'?: React.AnchorHTMLAttributes<HTMLAnchorElement>['aria-expanded'];
    'aria-hidden'?: React.AnchorHTMLAttributes<HTMLAnchorElement>['aria-hidden'];
    'aria-selected'?: React.AnchorHTMLAttributes<HTMLAnchorElement>['aria-selected'];
    tabIndex?: number;
    innerRef?: React.RefObject<HTMLAnchorElement>;
    to:
        | string
        | {
              pathname?: string;
              search?: string;
              state?: unknown;
              hash?: string;
              key?: string;
          };
    replace?: boolean;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement>;
    children: React.ReactNode;
    target?: string;
}>;

const AnchorLink: LinkComponent = ({to, innerRef, ...props}) => (
    <a ref={innerRef} href={typeof to === 'string' ? to : to?.pathname} {...props}>
        {props.children}
    </a>
);

const getReactRouter5Link = (ReactRouterLink: React.ComponentType<any>): LinkComponent => ReactRouterLink;

const getReactRouter6Link =
    (ReactRouterLink: React.ComponentType<any>): LinkComponent =>
    ({innerRef, ...props}) => <ReactRouterLink ref={innerRef} {...props} />;

const getNext12Link =
    (NextLink: React.ComponentType<any>): LinkComponent =>
    ({to, innerRef, children, ...props}) => (
        <NextLink href={to}>
            <a ref={innerRef} {...props}>
                {children}
            </a>
        </NextLink>
    );

const getNext13Or14Link =
    (NextLink: React.ComponentType<any>): LinkComponent =>
    ({to, innerRef, children, ...props}) => (
        <NextLink href={to} ref={innerRef} {...props}>
            {children}
        </NextLink>
    );

export const getMisticaLinkComponent = (Link?: ThemeConfig['Link']): LinkComponent => {
    if (!Link) {
        return AnchorLink;
    }
    // the $$typeof check is because components like forwardRefs are objects
    // see https://github.com/facebook/react/blob/main/packages/shared/isValidElementType.js
    if (typeof Link === 'function' || (Link as any).$$typeof) {
        return Link as LinkComponent;
    }
    switch (Link.type) {
        case 'ReactRouter5':
            // webapp, flow-frontend
            return getReactRouter5Link(Link.Component);
        case 'ReactRouter6':
            // nt_core
            return getReactRouter6Link(Link.Component);
        case 'Next12':
            // zeus-web
            return getNext12Link(Link.Component);
        case 'Next13':
        case 'Next14':
            // hello-world-web, global-checkout-webview
            return getNext13Or14Link(Link.Component);
        default:
            const exhaustiveCheck: never = Link.type;
            throw new Error(`Invalid Link type: ${exhaustiveCheck}`);
    }
};

export type ColorScheme = 'dark' | 'light' | 'auto';
export type EventFormat = 'universal-analytics' | 'google-analytics-4';

// This is the type expected by ThemeContextProvider theme prop.
// This config is provided by the user of the lib
export type ThemeConfig = Readonly<{
    skin: Readonly<Skin>;
    colorScheme?: ColorScheme; // light by default. TODO: Change to auto by default in next major version
    i18n: Readonly<{
        locale: Locale;
        phoneNumberFormattingRegionCode: RegionCode;
    }>;
    platformOverrides?: Readonly<{
        platform?: 'ios' | 'android' | 'desktop';
        insideNovumNativeApp?: boolean;
        userAgent?: string;
    }>;
    texts?: Partial<Dictionary>;
    analytics?: Readonly<{
        logEvent: (trackingEvent: TrackingEvent) => Promise<void>;
        eventFormat?: EventFormat;
    }>;
    dimensions?: Readonly<{headerMobileHeight: number | 'mistica'}>;
    Link?:
        | LinkComponent
        | {
              type: 'ReactRouter5' | 'ReactRouter6' | 'Next12' | 'Next13' | 'Next14';
              Component: React.ComponentType<any>;
          };
    useHrefDecorator?: () => (href: string) => string;
    /** @deprecated Better use default browser behavior for :focus-visible */
    enableTabFocus?: boolean;
    preventCopyInFormFields?: boolean;
}>;

// This is the lib INTERNAL context
export type Theme = {
    skinName: SkinName;
    i18n: {
        locale: Locale;
        phoneNumberFormattingRegionCode: RegionCode;
    };
    platformOverrides: {
        platform?: 'ios' | 'android' | 'desktop';
        insideNovumNativeApp?: boolean;
        userAgent?: string;
    };
    texts: Partial<Dictionary>;
    analytics: {
        logEvent: (trackingEvent: TrackingEvent) => Promise<void>;
        eventFormat: EventFormat;
    };
    // TODO: rename this props to navigationBarHeight (or something similar) in next major
    dimensions: {headerMobileHeight: number; headerDesktopHeight: number};
    colorValues: Colors;
    borderRadii: BorderRadiiConfig;
    textPresets: TextPresetsConfig;
    themeVariants: ThemeVariantsConfig;
    Link: LinkComponent;
    isDarkMode: boolean;
    isIos: boolean;
    useHrefDecorator: () => (href: string) => string;
    t: (token: TextToken | string, ...params: Array<string | number>) => string;
    preventCopyInFormFields: boolean;
};
