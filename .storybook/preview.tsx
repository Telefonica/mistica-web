import './css/roboto.css';
import './css/vivo-font.css';
import './css/telefonica-font.css';
import './css/onair-font.css';
import './css/main.css';
import * as React from 'react';
import {
    ThemeContextProvider,
    MOVISTAR_SKIN,
    VIVO_SKIN,
    VIVO_NEW_SKIN,
    O2_SKIN,
    O2_NEW_SKIN,
    TELEFONICA_SKIN,
    BLAU_SKIN,
    TU_SKIN,
    skinVars,
    OverscrollColorProvider,
} from '../src';
import {AVAILABLE_THEMES, Movistar} from './themes';
import {addons} from '@storybook/addons';
import {getPlatform} from '../src/utils/platform';

import type {ColorScheme, ThemeConfig} from '../src';

type Platform = 'android' | 'desktop' | 'ios';

const getSkin = (searchParams: URLSearchParams) => {
    const qsSkin = searchParams.get('skin');
    return [
        MOVISTAR_SKIN,
        O2_SKIN,
        O2_NEW_SKIN,
        VIVO_SKIN,
        VIVO_NEW_SKIN,
        TELEFONICA_SKIN,
        BLAU_SKIN,
        TU_SKIN,
    ].find((skin) => skin === qsSkin);
};

const getColorScheme = (searchParams: URLSearchParams): ColorScheme | undefined => {
    const colorScheme = searchParams.get('colorScheme');
    return colorScheme === 'light' || colorScheme === 'dark' || colorScheme === 'auto'
        ? colorScheme
        : undefined;
};

const getPlatformByValue = (value?: string | null): Platform | undefined => {
    if (value === 'ios' || value === 'android' || value === 'desktop') {
        return value;
    }

    return value === 'auto' ? getPlatform() : undefined;
};

const getPlatformByUrl = (searchParams: URLSearchParams): Platform | undefined => {
    return getPlatformByValue(searchParams.get('platform'));
};

const getTheme = (
    selectedSkin?: string,
    selectedPlatform?: Platform,
    selectedColorScheme?: ColorScheme
): ThemeConfig => {
    const themeConfig =
        AVAILABLE_THEMES.find(({skin: skinConfig}) => skinConfig.name === selectedSkin) || Movistar;
    return {
        ...themeConfig,
        colorScheme: selectedColorScheme,
        platformOverrides: {
            platform: selectedPlatform,
            insideNovumNativeApp: selectedPlatform !== 'desktop',
        },
        enableTabFocus: true,
        dimensions: {
            headerMobileHeight: 'mistica',
        },
    };
};

const MisticaThemeProvider = ({Story, context}): React.ReactElement => {
    const searchParams = new URLSearchParams(location.search);
    const [skin, setSkin] = React.useState(getSkin(searchParams));
    const [platform, setPlatform] = React.useState(getPlatformByUrl(searchParams));
    const [colorScheme, setColorScheme] = React.useState(getColorScheme(searchParams));
    const isStoryOnNewTab = window.frameElement === null;

    React.useEffect(() => {
        const channel = addons.getChannel();
        channel.on('skin-selected', setSkin);
        channel.on('color-scheme-selected', setColorScheme);
        channel.emit('story-mounted');
        channel.on('platform-selected', (value) => {
            setPlatform(getPlatformByValue(value));
        });

        return () => {
            channel.off('skin-selected', setSkin);
            channel.off('color-scheme-selected', setColorScheme);
            channel.off('platform-selected', (value) => {
                setPlatform(getPlatformByValue(value));
            });
        };
    }, []);

    return (
        <React.StrictMode>
            {/**
             * Avoid rendering story until storybook addons finish loading skin, color scheme and platform.
             * If story is opened in a new tab, we always render it because the addons don't exist in there.
             */}
            {((skin && colorScheme && platform) || isStoryOnNewTab) && (
                <ThemeContextProvider theme={getTheme(skin as string, platform, colorScheme)}>
                    <OverscrollColorProvider>
                        {skin === VIVO_NEW_SKIN && <style>{`body {font-family: "Vivo Type"}`}</style>}
                        {(skin === TELEFONICA_SKIN || skin === TU_SKIN) && (
                            <style>{`body {font-family: "Telefonica Sans"}`}</style>
                        )}
                        {(skin === O2_SKIN || skin === O2_NEW_SKIN || skin === MOVISTAR_SKIN) && (
                            <style>{`body {font-family: "On Air"}`}</style>
                        )}
                        <Story {...context} />
                    </OverscrollColorProvider>
                </ThemeContextProvider>
            )}
        </React.StrictMode>
    );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const withMisticaThemeProvider = (Story, context) => <MisticaThemeProvider Story={Story} context={context} />;

const Styles = () => {
    const [fontSize, setFontSize] = React.useState(16);
    React.useEffect(() => {
        const channel = addons.getChannel();
        channel.on('font-size-selected', setFontSize);

        return () => {
            channel.off('font-size-selected', setFontSize);
        };
    }, []);
    const fontSizeStyle = `html {font-size: ${fontSize}px}`;
    const bodyBackground = `body {background: ${skinVars.colors.background}}`;
    return (
        <style>
            {fontSizeStyle} {bodyBackground}
        </style>
    );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const withLayoutDecorator = (Story, context): React.ReactElement => {
    const isFullscreen = !!context?.parameters?.fullScreen;
    return (
        <>
            <Styles />
            {/* role main required by accessibility rules */}
            <main lang="en" style={{padding: isFullscreen ? 0 : 16}}>
                <Story {...context} />
            </main>
        </>
    );
};

export const decorators = [withLayoutDecorator, withMisticaThemeProvider];

export const parameters = {
    // https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',

    // https://storybook.js.org/docs/7.2/react/writing-stories/naming-components-and-hierarchy#sorting-stories
    options: {
        storySort: {
            method: 'alphabetical',
            order: [
                'Welcome',
                'Components',
                'Patterns',
                'Layout',
                'Icons',
                'Utilities',
                'Hooks',
                'Mística Lab',
                'Community',
            ],
        },
    },
    // Workaround for: https://github.com/storybookjs/storybook/issues/17098
    docs: {source: {type: 'code'}},
};
