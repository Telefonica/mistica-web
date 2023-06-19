import * as React from 'react';
import {Badge, IconButton, IconBellFilled, Box, ResponsiveLayout} from '..';

const badgeOptions = ['non numeric', '0', '2', '3', '10'];

export default {
    title: 'Components/Badge',
    argTypes: {
        value: {
            options: badgeOptions,
            control: {type: 'select'},
        },
    },
};

type Args = {
    isInverse: boolean;
    value: string;
};

export const Default: StoryComponent<Args> = ({isInverse, value}) => {
    const ariaLabelPrefix = value === 'non numeric' ? 'Read' : value === '0' ? 'No' : value;

    return (
        <ResponsiveLayout isInverse={isInverse} fullWidth>
            <Box padding={16}>
                <Badge value={value === 'non numeric' ? undefined : +value}>
                    <IconButton onPress={() => {}} aria-label={ariaLabelPrefix + ' notifications'}>
                        <IconBellFilled />
                    </IconButton>
                </Badge>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Badge';

Default.args = {
    isInverse: false,
    value: '2',
};
