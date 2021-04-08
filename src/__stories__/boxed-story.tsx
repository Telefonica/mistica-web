import * as React from 'react';
import {Box, Boxed, Stack, Text8} from '..';
import {useTheme} from '../hooks';
import {ThemeVariant} from '../theme-variant-context';
import {useCheckbox} from './helpers';

export default {
    title: 'Components/Layouts/Boxed',
};

export const Default: StoryComponent = () => {
    const [isInverseOutside, inverseOutsideCheckbox] = useCheckbox('Inverse outside', false);
    const [isInverseInside, inverseInsideCheckbox] = useCheckbox('Inverse inside', false);

    const {colors} = useTheme();

    return (
        <>
            <Stack space={16}>
                {inverseOutsideCheckbox}
                {inverseInsideCheckbox}
            </Stack>
            <ThemeVariant isInverse={isInverseOutside}>
                <div
                    data-testid="boxed"
                    style={{backgroundColor: isInverseOutside ? colors.brand : colors.background}}
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
