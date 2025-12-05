import * as React from 'react';
import {addons, types} from 'storybook/manager-api';
import {IconButton, TooltipLinkList, WithTooltip} from 'storybook/internal/components';
import {AVAILABLE_SKINS, getColors} from '../colors';
import {createStorybookTheme} from '../storybook-manager-theme';

import type {API} from 'storybook/manager-api';
import type {Skin} from '../colors';

const ADDON_ID = 'theme-selector';
const PANEL_ID = `${ADDON_ID}/panel`;

const renderPrimaryColorDot = (skinName: Skin) => (
    <div
        style={{
            width: 20,
            height: 20,
            background: getColors(skinName).primary,
            borderRadius: '50%',
        }}
    />
);

const ThemeSelectorAddon = ({api}: {api: API}) => {
    const [currentSkin, setCurrentSkin] = React.useState<Skin>(
        () => (api.getQueryParam('skin') as Skin) || 'Movistar-new'
    );

    React.useEffect(() => {
        const channel = addons.getChannel();
        const notifySkin = () => {
            channel.emit('skin-selected', currentSkin);
        };

        channel.on('story-mounted', notifySkin);

        return () => {
            channel.off('story-mounted', notifySkin);
        };
    }, [currentSkin]);

    React.useEffect(() => {
        const channel = addons.getChannel();
        channel.emit('skin-selected', currentSkin);

        api.setOptions({theme: createStorybookTheme(currentSkin)});

        // We need this timeout because there could be some race condition between addon mount and storybook manager initialization on page load
        const tid = setTimeout(() => {
            api.setOptions({theme: createStorybookTheme(currentSkin)});
        }, 100);

        return () => {
            clearTimeout(tid);
        };
    }, [api, currentSkin]);

    return (
        <WithTooltip
            placement="top"
            trigger="click"
            closeOnOutsideClick
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

addons.register(ADDON_ID, (api) => {
    addons.add(PANEL_ID, {
        type: types.TOOL,
        title: 'Theme',
        render: () => <ThemeSelectorAddon api={api} />,
    });
});
