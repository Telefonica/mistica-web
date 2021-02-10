import * as React from 'react';
import {addons, types} from '@storybook/addons';
import {IconButton, TooltipLinkList, WithTooltip} from '@storybook/components';

const FontSizeAddon = ({api}) => {
    const channel = addons.getChannel();
    const [fontSize, setFontSize] = React.useState(16);

    React.useEffect(() => {
        const notifyFontSize = () => {
            channel.emit('font-size-selected', fontSize);
        };

        channel.on('story-mounted', notifyFontSize);
        channel.emit('font-size-selected', fontSize);

        return () => {
            channel.off('story-mounted', notifyFontSize);
        };
    }, [channel, fontSize, api]);

    return (
        <WithTooltip
            placement="top"
            trigger="click"
            closeOnClick
            tooltip={({onHide}) => (
                <TooltipLinkList
                    links={[10, 12, 14, 16, 18, 20, 24, 26, 28, 30, 32, 34, 36, 40, 44, 48, 56, 64, 72].map(
                        (size) => ({
                            id: size,
                            title: size,
                            onClick: () => {
                                setFontSize(size);
                                onHide();
                            },
                        })
                    )}
                />
            )}
        >
            <IconButton title="Change base font size">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <svg height="24" viewBox="0 0 24 24" width="24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z" fill="currentColor" />
                    </svg>
                    <span style={{marginLeft: 4}}>{fontSize}</span>
                </div>
            </IconButton>
        </WithTooltip>
    );
};

addons.register('font-size', (api) => {
    addons.add('font-size/panel', {
        type: types.TOOL,
        title: 'Font size',
        render: () => <FontSizeAddon api={api} />,
    });
});
