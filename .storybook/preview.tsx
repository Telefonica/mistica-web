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
    return [MOVISTAR_SKIN, O2_SKIN, O2_NEW_SKIN, VIVO_SKIN, VIVO_NEW_SKIN, TELEFONICA_SKIN, BLAU_SKIN].find(
        (skin) => skin === qsSkin
    );
};

const getPlatformByValue = (value?: string | null): Platform => {
    if (value === 'ios' || value === 'android' || value === 'desktop') {
        return value;
    }

    return getPlatform();
};

const getPlatformByUrl = (searchParams: URLSearchParams): Platform => {
    return getPlatformByValue(searchParams.get('platform'));
};

const getTheme = (selectedSkin: string, platform: Platform, colorScheme: ColorScheme): ThemeConfig => {
    const themeConfig = AVAILABLE_THEMES.find(({skin}) => skin.name === selectedSkin) || Movistar;
    return {
        ...themeConfig,
        colorScheme,
        platformOverrides: {
            platform,
            insideNovumNativeApp: platform !== 'desktop',
        },
        enableTabFocus: true,
    };
};

const MisticaThemeProvider = ({Story, context}): React.ReactElement => {
    const searchParams = new URLSearchParams(location.search);
    const [skin, setSkin] = React.useState(getSkin(searchParams));
    const [platform, setPlatform] = React.useState<Platform>(getPlatformByUrl(searchParams));
    const [colorScheme, setColorScheme] = React.useState<ColorScheme>('auto');

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
            <ThemeContextProvider theme={getTheme(skin as string, platform, colorScheme)}>
                <OverscrollColorProvider>
                    {skin === VIVO_NEW_SKIN && <style>{`body {font-family: "Vivo Type"}`}</style>}
                    {skin === TELEFONICA_SKIN && <style>{`body {font-family: "Telefonica Sans"}`}</style>}
                    {(skin === O2_SKIN || skin === O2_NEW_SKIN) && (
                        <style>{`body {font-family: "On Air"}`}</style>
                    )}
                    <Story {...context} />
                </OverscrollColorProvider>
            </ThemeContextProvider>
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
