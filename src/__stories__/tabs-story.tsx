import * as React from 'react';
import {pxToRem} from '../utils/css';
import {Tabs, IconCloseRegular} from '..';

export default {
    title: 'Components/Tabs',
    component: Tabs,
};

type Args = {
    tabs: string;
    withIcon: boolean;
};

export const Default: StoryComponent<Args> = ({tabs, withIcon}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const texts = tabs.trim().split(/\s*\n+\s*/);
    return (
        <Tabs
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
            tabs={texts.map((text) => ({
                text,
                icon: withIcon ? <IconCloseRegular size={pxToRem(24)} color="currentColor" /> : null,
            }))}
        />
    );
};

Default.storyName = 'Tabs';
Default.args = {
    tabs: ['First Tab', 'Second Tab', 'Third Tab'].join('\n'),
    withIcon: true,
};
