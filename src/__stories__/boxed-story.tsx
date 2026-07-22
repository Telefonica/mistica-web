import * as React from 'react';
import {Box, Boxed, Text8, ResponsiveLayout} from '..';

export default {
    title: 'Components/Primitives/Boxed',
    parameters: {fullScreen: true},
};

type Args = {
    variant: 'default' | 'brand' | 'negative' | 'alternative';
    variantOutside: 'default' | 'brand' | 'negative' | 'alternative';
};

export const Default: StoryComponent<Args> = ({variant, variantOutside}) => {
    return (
        <ResponsiveLayout dataAttributes={{testid: 'boxed'}} fullWidth variant={variantOutside}>
            <Box padding={16}>
                <Boxed variant={variant}>
                    <Box padding={16}>
                        <Text8>Text</Text8>
                    </Box>
                </Boxed>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Boxed';
Default.args = {
    variant: 'default',
    variantOutside: 'default',
};
