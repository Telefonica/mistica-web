import * as React from 'react';
import {Badge, IconBellFilled, ResponsiveLayout, Box, Touchable} from '..';

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
    inverse: boolean;
    value: string;
};

export const Default: StoryComponent<Args> = ({inverse, value}) => {
    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16} width="fit-content" dataAttributes={{testid: 'content'}}>
                <Badge value={value !== 'undefined' ? +value : undefined}>
                    <Touchable
                        style={{display: 'inline-block', width: 24, height: 24}}
                        onPress={() => {}}
                        aria-label="Read notifications"
                    >
                        <IconBellFilled />
                    </Touchable>
                </Badge>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Badge';
Default.args = {
    inverse: false,
    value: '2',
};
