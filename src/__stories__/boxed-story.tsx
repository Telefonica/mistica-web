import * as React from 'react';
import {Box, Boxed, Text8, ResponsiveLayout} from '..';

export default {
    title: 'Components/Primitives/Boxed',
    parameters: {fullScreen: true},
};

type Args = {
    variant: 'default' | 'brand' | 'negative' | 'alternative';
    variantOutside: 'default' | 'brand' | 'negative' | 'alternative';
    borderRadius: number;
};

export const Default: StoryComponent<Args> = ({variant, variantOutside, borderRadius}) => {
    return (
        <ResponsiveLayout dataAttributes={{testid: 'boxed'}} fullWidth variant={variantOutside}>
            <Box padding={16}>
                <Boxed variant={variant} borderRadius={borderRadius}>
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
    borderRadius: 16,
};
Default.argTypes = {
    variant: {options: ['default', 'brand', 'negative', 'alternative'], control: {type: 'select'}},
    variantOutside: {options: ['default', 'brand', 'negative', 'alternative'], control: {type: 'select'}},
    borderRadius: {control: {type: 'number'}},
};

export const Nested: StoryComponent<{innerRadius: number; padding: number}> = ({innerRadius, padding}) => {
    return (
        <ResponsiveLayout fullWidth>
            <Box padding={16}>
                <Boxed borderRadius={innerRadius + padding}>
                    <Box padding={padding as 16}>
                        <Boxed variant="alternative" borderRadius={innerRadius}>
                            <Box padding={16}>
                                <Text8>Nested (outer radius = inner radius + padding)</Text8>
                            </Box>
                        </Boxed>
                    </Box>
                </Boxed>
            </Box>
        </ResponsiveLayout>
    );
};

Nested.storyName = 'Boxed nested';
Nested.args = {
    innerRadius: 8,
    padding: 16,
};
Nested.argTypes = {
    innerRadius: {control: {type: 'number'}},
    padding: {options: [8, 16, 24], control: {type: 'select'}},
};
