import * as React from 'react';
import {pxToRem} from '../utils/css';
import {Tabs, IconClose} from '..';

export default {
    title: 'Components/Controls/Tabs',
    component: Tabs,
};

type Args = {
    tabs: string;
    withIcon: boolean;
    useCurrentColorInIcon: boolean;
};

export const Default: StoryComponent<Args> = ({tabs, withIcon, useCurrentColorInIcon}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return (
        <Tabs
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
            tabs={tabs
                .trim()
                .split(/\s*\n+\s*/)
                .map((text) => ({
                    text,
                    icon: withIcon ? (
                        <IconClose
                            size={pxToRem(24)}
                            color={useCurrentColorInIcon ? 'currentColor' : undefined}
                        />
                    ) : null,
                }))}
        />
    );
};

Default.storyName = 'Tabs';
Default.args = {
    tabs: ['First Tab', 'Second Tab', 'Third Tab'].join('\n'),
    withIcon: true,
    useCurrentColorInIcon: true,
};
