// @flow
import * as React from 'react';
import addonApi, {types} from '@storybook/addons';
import {WithTooltip, IconButton, TooltipLinkList} from '@storybook/components';
import {getColors} from '../../src';
import {AVAILABLE_BRAND_THEMES} from './themes';
import createManagerTheme from '../storybook-manager-theme';

const renderPrimaryColorDot = (brand) => (
    <div
        style={{
            width: 20,
            height: 20,
            background: getColors(brand).PRIMARY,
            borderRadius: '50%',
        }}
    />
);

const ThemeSelectorAddon = ({api}) => {
    const channel = addonApi.getChannel();
    const [currentBrand, setCurrentBrand] = React.useState(api.getQueryParam('brand') || 'Movistar');

    React.useEffect(() => {
        channel.emit('brand-selected', currentBrand);

        api.setOptions({theme: createManagerTheme(currentBrand)});

        // We need this timeout because there could be some race condition between addon mount and storibook manager initialization on page load.
        const tid = setTimeout(() => {
            api.setOptions({theme: createManagerTheme(currentBrand)});
        }, 100);

        return () => {
            clearTimeout(tid);
        };
    }, [api, channel, currentBrand]);

    return (
        <WithTooltip
            placement="top"
            trigger="click"
            closeOnClick
            tooltip={({onHide}) => (
                <TooltipLinkList
                    links={AVAILABLE_BRAND_THEMES.map((theme) => ({
                        id: theme.skin,
                        title: theme.skin,
                        right: renderPrimaryColorDot(theme.skin),
                        onClick: () => {
                            setCurrentBrand(theme.skin);
                            onHide();
                        },
                    }))}
                />
            )}
        >
            <IconButton title="Change theme">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {renderPrimaryColorDot(currentBrand)}
                    <span style={{marginLeft: 8}}>{currentBrand}</span>
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
