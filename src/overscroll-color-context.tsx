'use client';
import * as React from 'react';
import {useThemeVariant} from './theme-variant-context';
import {useTheme} from './hooks';
import {createNestableContext} from './nestable-context';
import {getPlatform} from './utils/platform';
import {vars} from './skins/skin-contract.css';
import {getCssVarValue, isCssVar} from './utils/dom';

import type {Variant} from './theme-variant-context';
import type {Theme} from './theme';

type OverscrollColorConfig = {topColor?: string; bottomColor?: string};

const {Provider, useSetValue, useValue} = createNestableContext<OverscrollColorConfig>({});

const shouldRender = (platformOverrides: Theme['platformOverrides']) =>
    getPlatform(platformOverrides) === 'ios';

const TopOverscrollColor = () => {
    const {topColor} = useValue();
    const {isDarkMode} = useTheme();
    React.useEffect(() => {
        if (!topColor) {
            return;
        }

        const prevMetaTags = document.head.querySelectorAll('meta[name=theme-color]');
        prevMetaTags.forEach((metaTag) => {
            metaTag.remove();
        });

        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.media = isDarkMode ? '(prefers-color-scheme: dark)' : '(prefers-color-scheme: light)';
        // css vars are not supported in theme-color meta tag
        meta.content = isCssVar(topColor) ? getCssVarValue(topColor) : topColor;

        document.head.appendChild(meta);

        return () => {
            // remove the overscroll color meta tag and restore previous meta tags
            meta.remove();
            prevMetaTags.forEach((metaTag) => {
                document.head.appendChild(metaTag);
            });
        };
    }, [isDarkMode, topColor]);
    return null;
};

const BottomOverscrollColor = () => {
    const {topColor, bottomColor} = useValue();
    // if not specified a bottom color, dont render it, except if there is a top color defined,
    // in that case we need to render the bottom color to avoid theme-color affecting the bottom overscroll
    if (!bottomColor && !topColor) {
        return null;
    }

    const defaultBottomColor = getComputedStyle(document.body).backgroundColor;
    const bottomColorToApply = bottomColor ?? defaultBottomColor;

    // if top and bottom color are the same, theme-color set for top color will work for bottom too, so this is not needed
    if (bottomColorToApply === topColor) {
        return null;
    }

    // This sets a fixed div at the bottom of the screen with the bottom color. Fixed elements aren't affected by iOS scroll bounce,
    // so this div is always visible as background.
    // There is a known issue with this approach, if the bottom overscroll color is different from the body background color and there is a
    // page section with a transparent background which is expected to have the background color of the body, the div with the bottom overscroll
    // color will be visible behind the transparent section.
    return (
        <div
            style={{
                position: 'fixed',
                zIndex: -1,
                background: bottomColorToApply,
                width: '100%',
                height: 300,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        />
    );
};

type ProviderProps = {children: React.ReactNode};

export const OverscrollColorProvider = ({children}: ProviderProps): JSX.Element => {
    const {platformOverrides} = useTheme();

    if (!shouldRender(platformOverrides)) {
        return <>{children}</>;
    }

    return (
        <Provider>
            <TopOverscrollColor />
            {children}
            <BottomOverscrollColor />
        </Provider>
    );
};

const getColorFromVariant = (themeVariant: Variant) => {
    switch (themeVariant) {
        case 'default':
            return vars.colors.background;
        case 'alternative':
            return vars.colors.backgroundAlternative;
        case 'inverse':
            return vars.colors.backgroundBrand;
        default:
            const exhaustiveCheck: never = themeVariant;
            throw new Error(`Invalid variant: ${exhaustiveCheck}`);
    }
};

const OverscrollColorComponent = () => {
    const variant = useThemeVariant();
    useSetValue({
        topColor: getColorFromVariant(variant),
    });

    return null;
};

/**
 * @deprecated use useSetOverscrollColor hook instead
 */
const OverscrollColor = (): JSX.Element =>
    shouldRender(useTheme().platformOverrides) ? <OverscrollColorComponent /> : <></>;

export const useSetOverscrollColor = (config: OverscrollColorConfig): void => {
    useSetValue(config);
};

export default OverscrollColor;
