import * as React from 'react';
import {Badge, IconBellFilled, ResponsiveLayout, Box, Touchable} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Badge',
    argTypes: {
        value: {
            options: ['undefined', '0', '2', '14'],
            control: {type: 'select'},
        },
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
    parameters: {fullScreen: true},
};

type Args = {
    variantOutside: Variant;
    value: string;
};

export const Default: StoryComponent<Args> = ({variantOutside, value}) => {
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
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
    variantOutside: 'default',
    value: '2',
};
