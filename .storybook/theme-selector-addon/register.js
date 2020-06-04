// @flow
import * as React from 'react';
import addonApi, {types} from '@storybook/addons';
import {WithTooltip, IconButton, TooltipLinkList} from '@storybook/components';
import {getColors} from '../../src';
import themes from './themes';
import createManagerTheme from '../storybook-manager-theme';

const renderPrimaryColorDot = (theme) => (
    <div
        style={{
            width: 20,
            height: 20,
            background: getColors(theme.skin).PRIMARY,
            borderRadius: '50%',
        }}
    />
);

const ThemeSelectorAddon = ({api}) => {
    const channel = addonApi.getChannel();
    const [currentTheme, setCurrentTheme] = React.useState(themes[0]);

    React.useEffect(() => {
        channel.emit('theme-selected', currentTheme);

        api.setOptions({theme: createManagerTheme(currentTheme.skin)});

        // We need this timeout because there could be some race condition between addon mount and storibook manager initialization on page load.
        const tid = setTimeout(() => {
            api.setOptions({theme: createManagerTheme(currentTheme.skin)});
        }, 100);

        return () => {
            clearTimeout(tid);
        };
    }, [api, channel, currentTheme]);

    return (
        <WithTooltip
            placement="top"
            trigger="click"
            closeOnClick
            tooltip={({onHide}) => (
                <TooltipLinkList
                    links={themes.map((theme) => ({
                        id: theme.skin,
                        title: theme.skin,
                        right: renderPrimaryColorDot(theme),
                        onClick: () => {
                            setCurrentTheme(theme);
                            onHide();
                        },
                    }))}
                />
            )}
        >
            <IconButton title="Change theme">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {renderPrimaryColorDot(currentTheme)}
                    <span style={{marginLeft: 8}}>{currentTheme.skin}</span>
                </div>
            </IconButton>
        </WithTooltip>
    );
};

addonApi.register('theme-selector', (api) => {
    addonApi.add('theme-selector/panel', {
        type: types.TOOL,
        title: 'Theme',
        render: () => <ThemeSelectorAddon api={api} />,
    });
});
