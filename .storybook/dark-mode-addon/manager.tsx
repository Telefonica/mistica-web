import * as React from 'react';
import {IconButton, TooltipLinkList, WithTooltip} from 'storybook/internal/components';
import {addons, type API, types} from 'storybook/manager-api';

const COLOR_SCHEMES = [
    {id: 'auto', title: 'Auto', tooltipLabel: 'Auto (OS setting)'},
    {id: 'dark', title: 'Dark'},
    {id: 'light', title: 'Light'},
];

const DarkModeAddon = ({api}: {api: API}) => {
    const channel = addons.getChannel();
    const [colorScheme, setColorScheme] = React.useState('auto');

    React.useEffect(() => {
        const notifyColorScheme = () => {
            channel.emit('color-scheme-selected', colorScheme);
        };

        channel.on('story-mounted', notifyColorScheme);
        channel.emit('color-scheme-selected', colorScheme);

        return () => {
            channel.off('story-mounted', notifyColorScheme);
        };
    }, [channel, colorScheme, api]);

    return (
        <WithTooltip
            placement="top"
            trigger="click"
            closeOnOutsideClick
            tooltip={({onHide}) => (
                <TooltipLinkList
                    links={COLOR_SCHEMES.map(({id, title, tooltipLabel}) => ({
                        id,
                        title: tooltipLabel ?? title,
                        onClick: () => {
                            setColorScheme(id);
                            onHide();
                        },
                    }))}
                />
            )}
        >
            <IconButton title="Change color scheme">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginLeft: 8}}>
                        Color scheme: {COLOR_SCHEMES.find(({id}) => id === colorScheme).title}
                    </span>
                </div>
            </IconButton>
        </WithTooltip>
    );
};

addons.register('dark-mode', (api) => {
    addons.add('dark-mode/panel', {
        type: types.TOOL,
        title: 'Dark mode',
        render: () => <DarkModeAddon api={api} />,
    });
});
