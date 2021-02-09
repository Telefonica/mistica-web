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
            <IconButton title="Change font size">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginLeft: 8}}>Base font Size: {fontSize}</span>
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
