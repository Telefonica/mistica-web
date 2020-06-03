// @flow
import '../css/roboto.css';
import '../css/reset.css';
import * as React from 'react';
import {addDecorator} from '@storybook/react';
import {ThemeContextProvider} from '../src';
import addons from '@storybook/addons';
import themes from './theme-selector-addon/themes';

let lastTheme = themes[0];

const ThemeDecorator = ({Story}) => {
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

addDecorator((Story) => <ThemeDecorator Story={Story}></ThemeDecorator>);
