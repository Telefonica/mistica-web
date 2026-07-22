import * as React from 'react';
import {addons, types} from 'storybook/manager-api';
import {IconButton, TooltipLinkList, WithTooltip} from 'storybook/internal/components';

import type {API} from 'storybook/manager-api';

const ADDON_ID = 'platform-selector';
const PANEL_ID = `${ADDON_ID}/panel`;

const PLATFORMS = [
    {id: 'auto', title: 'Auto'},
    {id: 'ios', title: 'iOS'},
    {id: 'android', title: 'Android'},
    {id: 'desktop', title: 'Desktop'},
];

const PlatformSelectorAddon = ({api}: {api: API}) => {
    const channel = addons.getChannel();
    const [currentPlatform, setCurrentPlatform] = React.useState(
        () => api.getQueryParam('platform') || 'auto'
    );

    React.useEffect(() => {
        const notifyPlatform = () => {
            channel.emit('platform-selected', currentPlatform);
        };

        channel.on('story-mounted', notifyPlatform);
        channel.emit('platform-selected', currentPlatform);

        return () => {
            channel.off('story-mounted', notifyPlatform);
        };
    }, [channel, currentPlatform, api]);

    return (
        <WithTooltip
            placement="top"
            trigger="click"
            closeOnOutsideClick
            tooltip={({onHide}) => (
                <TooltipLinkList
                    links={PLATFORMS.map(({id, title}) => ({
                        id,
                        title,
                        onClick: () => {
                            setCurrentPlatform(id);
                            onHide();
                        },
                    }))}
                />
            )}
        >
            <IconButton title="Change platform">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginLeft: 8}}>
                        Platform: {PLATFORMS.find(({id}) => id === currentPlatform)?.title}
                    </span>
                </div>
            </IconButton>
        </WithTooltip>
    );
};

addons.register(ADDON_ID, (api) => {
    addons.add(PANEL_ID, {
        type: types.TOOL,
        title: 'Platform',
        render: () => <PlatformSelectorAddon api={api} />,
    });
});
