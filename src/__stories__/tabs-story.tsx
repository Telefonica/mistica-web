import * as React from 'react';
import {Tabs} from '..';

export default {
    title: 'Components/Tabs',
    component: Tabs,
};

type Args = {
    tabs: string;
    // TODO: #649 Bug with this prop in local environment
    // withIcon: boolean;
};

export const Default: StoryComponent<Args> = ({tabs}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const texts = tabs.trim().split(/\s*\n+\s*/);
    return (
        <Tabs
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
            tabs={texts.map((text) => ({
                text,
                // TODO: #649 Bug with this prop in local environment
                // icon: withIcon ? <IconCloseRegular size={pxToRem(24)} color="currentColor" /> : null,
            }))}
        />
    );
};

Default.storyName = 'Tabs';
Default.args = {
    tabs: ['First Tab', 'Second Tab', 'Third Tab'].join('\n'),
    // TODO: #649 Bug with this prop in local environment
    // withIcon: true,
};
