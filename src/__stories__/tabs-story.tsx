import * as React from 'react';
import {IconCloseRegular, pxToRem, Tabs} from '..';

export default {
    title: 'Components/Tabs',
    component: Tabs,
};

type Args = {
    tabs: string;
};

export const Default: StoryComponent<Args> = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return (
        <Tabs
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
            tabs={['First Tab', 'Second Tab', 'Third Tab'].map((text) => ({
                text,
            }))}
        />
    );
};
Default.storyName = 'Tabs';

export const WithIcon: StoryComponent<Args> = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return (
        <Tabs
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
            tabs={['First Tab', 'Second Tab', 'Third Tab'].map((text) => ({
                text,
                icon: <IconCloseRegular size={pxToRem(24)} color="currentColor" />,
            }))}
        />
    );
};
WithIcon.storyName = 'Tabs with icon';
