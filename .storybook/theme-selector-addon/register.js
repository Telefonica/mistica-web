// @ts-check
import * as React from 'react';
import {addons, types} from '@storybook/addons';
import {WithTooltip, IconButton, TooltipLinkList} from '@storybook/components';
import {getColors} from '../colors';
import {createStorybookTheme} from '../storybook-manager-theme';

const AVAILABLE_SKINS = ['Movistar', 'O2', 'O2-classic', 'Vivo'];

const renderPrimaryColorDot = (skinName) => (
    <div
        style={{
            width: 20,
            height: 20,
            background: getColors(skinName).primary,
            borderRadius: '50%',
        }}
    />
);

const ThemeSelectorAddon = ({api}) => {
    const channel = addons.getChannel();
    const [currentSkin, setCurrentSkin] = React.useState(() => api.getQueryParam('skin') || 'Movistar');

    React.useEffect(() => {
        const notifySkin = () => {
            channel.emit('skin-selected', currentSkin);
        };

        channel.on('story-mounted', notifySkin);

        return () => {
            channel.off('story-mounted', notifySkin);
        };
    }, [channel, currentSkin]);

    React.useEffect(() => {
        channel.emit('skin-selected', currentSkin);

        api.setOptions({theme: createStorybookTheme(currentSkin)});

        // We need this timeout because there could be some race condition between addon mount and storybook manager initialization on page load
        const tid = setTimeout(() => {
            api.setOptions({theme: createStorybookTheme(currentSkin)});
        }, 100);

        return () => {
            clearTimeout(tid);
        };
    }, [api, channel, currentSkin]);

    return (
        <WithTooltip
            placement="top"
            trigger="click"
            closeOnClick
            tooltip={({onHide}) => (
                <TooltipLinkList
                    links={AVAILABLE_SKINS.map((skin) => ({
                        id: skin,
                        title: skin,
                        right: renderPrimaryColorDot(skin),
                        onClick: () => {
                            setCurrentSkin(skin);
                            onHide();
                        },
                    }))}
                />
            )}
        >
            <IconButton title="Change theme">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {renderPrimaryColorDot(currentSkin)}
                    <span style={{marginLeft: 8}}>{currentSkin}</span>
                </div>
            </IconButton>
        </WithTooltip>
    );
};

addons.register('theme-selector', (api) => {
    addons.add('theme-selector/panel', {
        type: types.TOOL,
        title: 'Theme',
        render: () => <ThemeSelectorAddon api={api} />,
    });
});
