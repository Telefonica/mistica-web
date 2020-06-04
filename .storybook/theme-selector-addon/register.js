// @flow
import * as React from 'react';
import addonApi, {types} from '@storybook/addons';
import {WithTooltip, IconButton, TooltipLinkList} from '@storybook/components';
import {getColors} from '../../src';
import themes from './themes';

const ThemeSelectorAddon = () => {
    const channel = addonApi.getChannel();
    const [currentTheme, setCurrentTheme] = React.useState(themes[0]);

    React.useEffect(() => {
        channel.emit('theme-selected', currentTheme);
    }, [channel, currentTheme]);

    const themeLabel = Object.fromEntries(
        themes.map((theme) => [
            theme.skin,
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div
                    style={{
                        width: 20,
                        height: 20,
                        background: getColors(theme.skin).PRIMARY,
                        borderRadius: '50%',
                        marginRight: 8,
                    }}
                />
                <span>{theme.skin}</span>
            </div>,
        ])
    );

    return (
        <WithTooltip
            placement="top"
            trigger="click"
            closeOnClick
            tooltip={({onHide}) => (
                <TooltipLinkList
                    links={themes.map((theme) => ({
                        id: theme.skin,
                        title: themeLabel[theme.skin],
                        onClick: () => {
                            setCurrentTheme(theme);
                            onHide();
                        },
                    }))}
                />
            )}
        >
            <IconButton title="Change theme">{themeLabel[currentTheme.skin]}</IconButton>
        </WithTooltip>
    );
};

addonApi.register('theme-selector', () => {
    addonApi.add('theme-selector/panel', {
        type: types.TOOL,
        title: 'Theme',
        render: () => <ThemeSelectorAddon />,
    });
});
