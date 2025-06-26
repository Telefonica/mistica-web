import * as React from 'react';
import {
    Box,
    IconAppointmentRegular,
    IconBrainRegular,
    IconBusRegular,
    ResponsiveLayout,
    Tabs,
    Text3,
} from '..';

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
    text: string;
    theme: Variant;
    icon: boolean;
};

export const Default: StoryComponent<Args> = ({tabCount, text, theme, icon}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return (
        <ResponsiveLayout fullWidth variant={theme}>
            <Box padding={16}>
                <Tabs
                    selectedIndex={selectedIndex}
                    onChange={setSelectedIndex}
                    tabs={Array.from({length: tabCount}).map((_, index) => ({
                        text: `${text} ${index + 1}`,
                        Icon: icon
                            ? [IconAppointmentRegular, IconBrainRegular, IconBusRegular][index]
                            : undefined,
                    }))}
                    renderPanel={({selectedIndex, panelProps}) => (
                        <div {...panelProps}>
                            <Text3 regular>Panel {selectedIndex + 1}</Text3>
                        </div>
                    )}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Tabs';
Default.args = {
    tabCount: 3,
    text: 'Tab',
    theme: 'default',
    icon: false,
};
