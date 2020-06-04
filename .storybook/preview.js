// @flow
import '../css/roboto.css';
import '../css/reset.css';
import * as React from 'react';
import {addDecorator} from '@storybook/react';
import {ThemeContextProvider, Box} from '../src';
import addons from '@storybook/addons';
import themes from './theme-selector-addon/themes';

import type {Context} from '@storybook/react';

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
    return (
        <Box padding={context?.parameters?.fullScreen ? 0 : 16}>
            <Story />
        </Box>
    );
};

let lastTheme = themes[0];

const ThemeDecorator = ({Story}: DecoratorProps) => {
    const [theme, setCurrentTheme] = React.useState(lastTheme);

    React.useEffect(() => {
        const channel = addons.getChannel();
        channel.on('theme-selected', (theme) => {
            setCurrentTheme(theme);
            lastTheme = theme;
        });
    }, []);

    return (
        <ThemeContextProvider theme={theme}>
            <Story />
        </ThemeContextProvider>
    );
};

addDecorator((Story, context: any) => <LayoutDecorator Story={Story} context={context} />);
addDecorator((Story) => <ThemeDecorator Story={Story} />);
