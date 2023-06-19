import * as React from 'react';
import {Box, Boxed, Text8, skinVars} from '..';
import {ThemeVariant} from '../theme-variant-context';

export default {
    title: 'Components/Primitives/Boxed',
};

type Args = {
    inverseOutside: boolean;
    inverseInside: boolean;
};

export const Default: StoryComponent<Args> = ({inverseOutside, inverseInside}) => {
    return (
        <ThemeVariant isInverse={inverseOutside}>
            <div
                data-testid="boxed"
                style={{
                    backgroundColor: inverseOutside
                        ? skinVars.colors.backgroundBrand
                        : skinVars.colors.background,
                }}
            >
                <Box padding={16}>
                    <Boxed isInverse={inverseInside}>
                        <Box padding={16}>
                            <Text8>Text</Text8>
                        </Box>
                    </Boxed>
                </Box>
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Boxed';

Default.args = {
    inverseOutside: false,
    inverseInside: false,
};
