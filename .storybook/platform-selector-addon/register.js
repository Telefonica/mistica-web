import * as React from 'react';
import addonApi, {types} from '@storybook/addons';
import {IconButton, TooltipLinkList, WithTooltip} from '@storybook/components';

const PLATFORMS = [
    {id: 'ios', title: 'iOS'},
    {id: 'android', title: 'Android'},
];

const PlatformSelectorAddon = ({api}) => {
    const channel = addonApi.getChannel();
    const [currentPlatform, setCurrentPlatform] = React.useState(
        () => api.getQueryParam('platform') || 'android'
    );

    React.useEffect(() => {
        const notifyPlatform = () => {
            channel.emit('platform-selected', currentPlatform);
        };

        channel.on('story-mounted', notifyPlatform);

        return () => {
            channel.off('story-mounted', notifyPlatform);
        };
    }, [channel, currentPlatform]);

    React.useEffect(() => {
        channel.emit('platform-selected', currentPlatform);
    }, [api, channel, currentPlatform]);

    return (
        <WithTooltip
            placement="top"
            trigger="click"
            closeOnClick
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
            <IconButton title="Change theme">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginLeft: 8}}>
                        Platform: {PLATFORMS.find(({id}) => id === currentPlatform).title}
                    </span>
                </div>
            </IconButton>
        </WithTooltip>
    );
};

addonApi.register('platform-selector', (api) => {
    addonApi.add('platform-selector/panel', {
        type: types.TOOL,
        title: 'Platform',
        render: () => <PlatformSelectorAddon api={api} />,
    });
});
