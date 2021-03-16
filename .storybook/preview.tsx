import './css/roboto.css';
import './css/main.css';
import * as React from 'react';
import {
    ThemeContextProvider,
    Box,
    MOVISTAR_SKIN,
    VIVO_SKIN,
    O2_SKIN,
    O2_CLASSIC_SKIN,
    ThemeConfig,
    useTheme,
} from '../src';
import {AVAILABLE_THEMES, Movistar} from './themes';
import {addons} from '@storybook/addons';

const getUserAgent = () => self.navigator.userAgent || '';
const isRunningAcceptanceTest = () => getUserAgent().includes('acceptance-test');

const acceptanceStyles = `
*, *:after, *:before {
    transition-delay: 0s !important;
    transition-duration: 0s !important;
    animation-delay: -0.0001s !important;
    animation-duration: 0s !important;
    animation-play-state: paused !important;
    caret-color: transparent !important;
    font-variant-ligatures: none !important;
}
*::-webkit-scrollbar {
    display: 'none' !important;
    width: 0 !important;
    height: 0 !important;
}
*:focus, *:active {
    outline: none;
}`;

type Platform = 'android' | 'desktop' | 'ios';
type ColorSchemeSetting = 'auto' | 'light' | 'dark';

const getSkin = (searchParams: URLSearchParams) => {
    const qsSkin = searchParams.get('skin');
    return [MOVISTAR_SKIN, O2_SKIN, O2_CLASSIC_SKIN, VIVO_SKIN].find((skin) => skin === qsSkin);
};

const getPlatform = (searchParams: URLSearchParams): Platform => {
    const qsPlatform = searchParams.get('platform');
    if (qsPlatform === 'ios' || qsPlatform === 'android' || qsPlatform === 'desktop') {
        return qsPlatform;
    }
    return 'desktop';
};

const getTheme = (selectedSkin: string, platform: Platform, colorScheme: ColorSchemeSetting): ThemeConfig => {
    const themeConfig = AVAILABLE_THEMES.find(({skin}) => skin.name === selectedSkin) || Movistar;

    let skin = themeConfig.skin;
    if (colorScheme === 'dark') {
        skin = {
            ...skin,
            colors: {...skin.colors, ...skin.darkModeColors},
        };
    }
    if (colorScheme === 'light') {
        skin = {
            ...skin,
            darkModeColors: {},
        };
    }

    return {
        ...themeConfig,
        skin,
        platformOverrides: {
            platform,
            insideNovumNativeApp: platform !== 'desktop',
        },
    };
};

const MisticaTemeProvider = ({Story, context}): React.ReactElement => {
    const searchParams = new URLSearchParams(location.search);
    const [skin, setSkin] = React.useState(getSkin(searchParams));
    const [platform, setPlatform] = React.useState<Platform>(getPlatform(searchParams));
    const [colorScheme, setColorScheme] = React.useState<ColorSchemeSetting>('auto');

    React.useEffect(() => {
        const channel = addons.getChannel();
        channel.on('skin-selected', setSkin);
        channel.on('platform-selected', setPlatform);
        channel.on('color-scheme-selected', setColorScheme);
        channel.emit('story-mounted');

        return () => {
            channel.off('skin-selected', setSkin);
            channel.off('platform-selected', setPlatform);
            channel.off('color-scheme-selected', setColorScheme);
        };
    }, []);

    return (
        <ThemeContextProvider theme={getTheme(skin, platform, colorScheme)}>
            <Story {...context} />
        </ThemeContextProvider>
    );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const withMisticaThemeProvider = (Story, context) => <MisticaTemeProvider Story={Story} context={context} />;

const Styles = () => {
    const [fontSize, setFontSize] = React.useState(16);
    const {colors} = useTheme();
    React.useEffect(() => {
        const channel = addons.getChannel();
        channel.on('font-size-selected', setFontSize);

        return () => {
            channel.off('font-size-selected', setFontSize);
        };
    }, []);
    const fontSizeStyle = `html {font-size: ${fontSize}px}`;
    const bodyBackground = `body {background: ${colors.background}}`;
    return (
        <style>
            {fontSizeStyle} {bodyBackground} {isRunningAcceptanceTest() && acceptanceStyles}
        </style>
    );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const withLayoutDecorator = (Story, context): React.ReactElement => {
    return (
        // role main required by accessibility rules
        <div role="main">
            <Styles />
            <Box padding={context?.parameters?.fullScreen ? 0 : 16}>
                <Story {...context} />
            </Box>
        </div>
    );
};

export const decorators = [withLayoutDecorator, withMisticaThemeProvider];

export const parameters = {
    // https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',

    options: {
        // https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
        storySort: (a: {id: string; kind: string}[], b: {id: string; kind: string}[]): number => {
            if (a[1].kind === 'Welcome/Welcome') {
                return -1;
            }
            if (b[1].kind === 'Welcome/Welcome') {
                return 1;
            }
            return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, {numeric: true});
        },
    },
};
