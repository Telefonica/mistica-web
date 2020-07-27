import './css/roboto.css';
import './css/main.css';
import * as React from 'react';
import {addDecorator} from '@storybook/react';
import {ThemeContextProvider, Box, MOVISTAR_SKIN, VIVO_SKIN, O2_SKIN, O2_CLASSIC_SKIN} from '../src';
import addons from '@storybook/addons';
import getTheme from './theme-selector-addon/themes';

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
}`;

const LayoutDecorator = ({Story, context}) => {
    const styles = isRunningAcceptanceTest() ? <style>{acceptanceStyles}</style> : null;

    return (
        <>
            {styles}
            <Box padding={context?.parameters?.fullScreen ? 0 : 16}>
                <Story />
            </Box>
        </>
    );
};

const getSkin = (searchParams) => {
    const qsSkin = searchParams.get('skin');
    return [MOVISTAR_SKIN, O2_SKIN, O2_CLASSIC_SKIN, VIVO_SKIN].find((skin) => skin === qsSkin);
};

const getPlatform = (searchParams) => {
    const qsPlatform = searchParams.get('platform');
    return ['ios', 'android'].find((platform) => platform === qsPlatform);
};

const ThemeDecorator = ({Story}) => {
    const searchParams = new URLSearchParams(location.search);
    const [skin, setSkin] = React.useState(getSkin(searchParams));

    React.useEffect(() => {
        const channel = addons.getChannel();
        channel.on('skin-selected', setSkin);
        channel.emit('story-mounted');

        return () => {
            channel.off('skin-selected', setSkin);
        };
    }, []);

    return (
        <ThemeContextProvider theme={getTheme(skin, getPlatform(searchParams))}>
            <Story />
        </ThemeContextProvider>
    );
};

addDecorator((Story, context) => <LayoutDecorator Story={Story} context={context} />);
addDecorator((Story) => <ThemeDecorator Story={Story} />);
