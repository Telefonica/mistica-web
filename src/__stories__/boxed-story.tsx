import * as React from 'react';
import {Box, Boxed, Text8, ResponsiveLayout} from '..';

export default {
    title: 'Components/Primitives/Boxed',
    parameters: {fullScreen: true},
};

type Args = {
    variant: 'default' | 'brand' | 'negative' | 'alternative';
    variantOutside: 'default' | 'brand' | 'negative' | 'alternative';
    borderRadius?: number;
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
};
Default.argTypes = {
    variant: {options: ['default', 'brand', 'negative', 'alternative'], control: {type: 'select'}},
    variantOutside: {options: ['default', 'brand', 'negative', 'alternative'], control: {type: 'select'}},
    borderRadius: {control: {type: 'number'}},
};

export const Nested: StoryComponent<{
    innerRadiusType: 'number' | 'string';
    innerRadius: number;
    innerRadiusString: string;
    padding: number;
}> = ({innerRadiusType, innerRadius, innerRadiusString, padding}) => {
    const inner = innerRadiusType === 'number' ? innerRadius : innerRadiusString.trim() || '0px';
    const outer = typeof inner === 'number' ? inner + padding : `calc(${inner} + ${padding}px)`;
    return (
        <ResponsiveLayout fullWidth>
            <Box padding={16}>
                <Boxed borderRadius={outer}>
                    <Box padding={padding as 16}>
                        <Boxed variant="alternative" borderRadius={inner}>
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
    innerRadiusType: 'number',
    innerRadius: 8,
    innerRadiusString: '8px',
    padding: 16,
};
Nested.argTypes = {
    innerRadiusType: {options: ['number', 'string'], control: {type: 'inline-radio'}},
    innerRadius: {control: {type: 'number', min: 0, step: 1}, if: {arg: 'innerRadiusType', eq: 'number'}},
    innerRadiusString: {
        description: 'CSS length, e.g. 8px or 1rem',
        control: {type: 'text'},
        if: {arg: 'innerRadiusType', eq: 'string'},
    },
    padding: {options: [8, 16, 24], control: {type: 'select'}},
};
