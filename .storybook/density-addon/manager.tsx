import * as React from 'react';
import {addons, types} from 'storybook/manager-api';
import {IconButton, TooltipLinkList, WithTooltip} from 'storybook/internal/components';

import type {API} from 'storybook/manager-api';

const ADDON_ID = 'density-selector';
const PANEL_ID = `${ADDON_ID}/panel`;

const DENSITIES = [
    {id: 'cozy', title: 'Cozy'},
    {id: 'compact', title: 'Compact'},
];

const DensitySelectorAddon = ({api}: {api: API}) => {
    const channel = addons.getChannel();
    const [currentDensity, setCurrentDensity] = React.useState(() => api.getQueryParam('density') || 'cozy');

    React.useEffect(() => {
        const notifyDensity = () => {
            channel.emit('density-selected', currentDensity);
        };

        channel.on('story-mounted', notifyDensity);
        channel.emit('density-selected', currentDensity);

        return () => {
            channel.off('story-mounted', notifyDensity);
        };
    }, [channel, currentDensity, api]);

    return (
        <WithTooltip
            placement="top"
            trigger="click"
            closeOnOutsideClick
            tooltip={({onHide}) => (
                <TooltipLinkList
                    links={DENSITIES.map(({id, title}) => ({
                        id,
                        title,
                        onClick: () => {
                            setCurrentDensity(id);
                            onHide();
                        },
                    }))}
                />
            )}
        >
            <IconButton title="Change density">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginLeft: 8}}>
                        Density: {DENSITIES.find(({id}) => id === currentDensity)?.title}
                    </span>
                </div>
            </IconButton>
        </WithTooltip>
    );
};

addons.register(ADDON_ID, (api) => {
    addons.add(PANEL_ID, {
        type: types.TOOL,
        title: 'Density',
        render: () => <DensitySelectorAddon api={api} />,
    });
});
