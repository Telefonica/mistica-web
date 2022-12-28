import * as React from 'react';
import {Box, Boxed, Stack, Text8, skinVars} from '..';
import {ThemeVariant} from '../theme-variant-context';
import {useCheckbox} from './helpers';

export default {
    title: 'Components/Primitives/Boxed',
};

export const Default: StoryComponent = () => {
    const [isInverseOutside, inverseOutsideCheckbox] = useCheckbox('Inverse outside', false);
    const [isInverseInside, inverseInsideCheckbox] = useCheckbox('Inverse inside', false);

    return (
        <>
            <Stack space={16}>
                {inverseOutsideCheckbox}
                {inverseInsideCheckbox}
            </Stack>
            <ThemeVariant isInverse={isInverseOutside}>
                <div
                    data-testid="boxed"
                    style={{
                        backgroundColor: isInverseOutside
                            ? skinVars.colors.backgroundBrand
                            : skinVars.colors.background,
                    }}
                >
                    <Box padding={16}>
                        <Boxed isInverse={isInverseInside}>
                            <Box padding={16}>
                                <Text8>Text</Text8>
                            </Box>
                        </Boxed>
                    </Box>
                </div>
            </ThemeVariant>
        </>
    );
};

Default.storyName = 'Boxed';
