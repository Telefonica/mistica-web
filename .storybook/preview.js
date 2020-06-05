// @flow
import '../css/roboto.css';
import '../css/reset.css';
import * as React from 'react';
import {addDecorator} from '@storybook/react';
import {ThemeContextProvider, Box} from '../src';
import addons from '@storybook/addons';
import getTheme from './theme-selector-addon/themes';

import type {Context} from '@storybook/react';

const getUserAgent = (): string => self.navigator.userAgent || '';
const isRunningAcceptanceTest = (): boolean => getUserAgent().includes('acceptance-test');

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

type DecoratorProps = {
    Story: React.ComponentType<any>,
    context?: {
        ...Context,
        parameters: {
            fullScreen?: boolean,
        },
        ...
    },
};

const LayoutDecorator = ({Story, context}: DecoratorProps) => {
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

const ThemeDecorator = ({Story}: DecoratorProps) => {
    const searchParams = new URLSearchParams(location.search);
    const [brandSkin, setBrandSkin] = React.useState(searchParams.get('brand'));

    React.useEffect(() => {
        const channel = addons.getChannel();
        channel.on('brand-selected', (brandSkin) => {
            setBrandSkin(brandSkin);
        });
    }, []);

    return (
        <ThemeContextProvider theme={getTheme(brandSkin, searchParams.get('platform'))}>
            <Story />
        </ThemeContextProvider>
    );
};

addDecorator((Story, context: any) => <LayoutDecorator Story={Story} context={context} />);
addDecorator((Story) => <ThemeDecorator Story={Story} />);
