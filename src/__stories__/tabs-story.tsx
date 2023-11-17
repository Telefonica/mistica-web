import * as React from 'react';
import {Box, IconCloseRegular, pxToRem, ResponsiveLayout, Tabs} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {fullScreen: true},
    argTypes: {
        tabCount: {
            control: {type: 'range', min: 1, max: 5, step: 1},
        },
        theme: {
            options: ['default', 'inverse', 'alternative'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    tabCount: number;
    label: string;
    theme: Variant;
    icon: boolean;
};

export const Default: StoryComponent<Args> = ({tabCount, label, theme, icon}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return (
        <ResponsiveLayout fullWidth variant={theme}>
            <Box padding={16}>
                <Tabs
                    selectedIndex={selectedIndex}
                    onChange={setSelectedIndex}
                    tabs={Array.from({length: tabCount}).map((_, index) => ({
                        text: `${label} ${index + 1}`,
                        icon: icon ? <IconCloseRegular size={pxToRem(24)} color="currentColor" /> : undefined,
                    }))}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Tabs';
Default.args = {
    tabCount: 3,
    label: 'Tab',
    theme: 'default',
    icon: false,
};
