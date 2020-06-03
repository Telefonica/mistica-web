// @flow
import * as React from 'react';
import addonApi from '@storybook/addons';
import {ThemeContextProvider, Select} from '../../src';
import themes from './themes';

const ThemeSelectorAddon = () => {
    const channel = addonApi.getChannel();
    const [currentTheme, setCurrentTheme] = React.useState(themes[0]);

    React.useEffect(() => {
        channel.emit('theme-selected', currentTheme);
    }, [channel, currentTheme]);

    return (
        <ThemeContextProvider theme={currentTheme}>
            <Select
                required
                options={themes.map((theme) => ({
                    text: theme.skin,
                    value: theme.skin,
                }))}
                value={currentTheme.skin}
                onChangeValue={(selectedSkin) => {
                    const selectedTheme = themes.find((theme) => theme.skin === selectedSkin);
                    if (selectedTheme) {
                        setCurrentTheme(selectedTheme);
                    }
                }}
            />
        </ThemeContextProvider>
    );
};

addonApi.register('theme-selector', () => {
    addonApi.addPanel('theme-selector/panel', {
        title: 'Theme',
        render: ({active}: {active: boolean}) => {
            if (!active) {
                return null;
            }
            return <ThemeSelectorAddon active={active} />;
        },
    });
});
