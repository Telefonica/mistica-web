import * as React from 'react';
import {addons, types} from '@storybook/addons';
import {IconButton, TooltipLinkList, WithTooltip} from '@storybook/components';

const PLATFORMS = [
    {id: 'ios', title: 'iOS'},
    {id: 'android', title: 'Android'},
    {id: 'desktop', title: 'Desktop'},
];

const PlatformSelectorAddon = ({api}) => {
    const channel = addons.getChannel();
    const [currentPlatform, setCurrentPlatform] = React.useState(
        () => api.getQueryParam('platform') || 'desktop'
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
            closeOnClick
            tooltip={({onHide}) => (
                <TooltipLinkList
                    links={PLATFORMS.filter(({id}) => id !== currentPlatform).map(({id, title}) => ({
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

addons.register('platform-selector', (api) => {
    addons.add('platform-selector/panel', {
        type: types.TOOL,
        title: 'Platform',
        render: () => <PlatformSelectorAddon api={api} />,
    });
});
