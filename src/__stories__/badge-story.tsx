import * as React from 'react';
import {Badge, IconButton, IconBellFilled, ResponsiveLayout, Box} from '..';

export default {
    title: 'Components/Badge',
    argTypes: {
        value: {
            options: ['undefined', '0', '2', '14'],
            control: {type: 'select'},
        },
    },
    parameters: {fullScreen: true},
};

type Args = {
    overInverse: boolean;
    value: string;
};

export const Default: StoryComponent<Args> = ({overInverse, value}) => {
    return (
        <ResponsiveLayout fullWidth isInverse={overInverse}>
            <Box padding={16} width="fit-content" dataAttributes={{testid: 'content'}}>
                <Badge value={value !== 'undefined' ? +value : undefined}>
                    <IconButton onPress={() => {}} aria-label="Read notifications">
                        <IconBellFilled />
                    </IconButton>
                </Badge>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Badge';
Default.args = {
    overInverse: false,
    value: '2',
};
