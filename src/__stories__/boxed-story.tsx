import * as React from 'react';
import {Box, Boxed, Text8, ResponsiveLayout} from '..';

export default {
    title: 'Components/Primitives/Boxed',
    parameters: {fullScreen: true},
    decorators: [
        (Story: any, context: any) => (
            <ResponsiveLayout dataAttributes={{testid: 'boxed'}} fullWidth variant={context.args.variantOutside || 'default'}>
                <Box padding={16}>
                    <Story />
                </Box>
            </ResponsiveLayout>
        ),
    ],
};

type Args = {
    variant: 'default' | 'brand' | 'negative' | 'alternative';
    variantOutside: 'default' | 'brand' | 'negative' | 'alternative';
};

export const Default: StoryComponent<Args> = ({variant}) => {
    return (
        <Boxed variant={variant}>
            <Box padding={16}>
                <Text8>Text</Text8>
            </Box>
        </Boxed>
    );
};

Default.storyName = 'Boxed';
Default.args = {
    variant: 'default',
    variantOutside: 'default',
};
