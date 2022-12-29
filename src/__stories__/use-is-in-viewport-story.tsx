import * as React from 'react';
import {useIsInViewport, skinVars, Stack, Text2, Placeholder, Boxed, Box, Text6, Circle} from '..';

export default {
    title: 'Hooks/useIsInViewport',
};

export const UseIsInViewport: StoryComponent = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const inViewport = useIsInViewport(ref, false);

    return (
        <Stack space={16}>
            <Text2 regular color={skinVars.colors.textSecondary}>
                Scroll down. The "No" text will change to "Yes" when the element is in viewport.
            </Text2>
            {Array.from({length: 10}).map((_, index) => (
                <Placeholder key={index} />
            ))}
            <Boxed ref={ref}>
                <Box paddingX={16} paddingY={64}>
                    <Text6>Is in viewport?</Text6>
                </Box>
            </Boxed>
            {Array.from({length: 10}).map((_, index) => (
                <Placeholder key={index} />
            ))}
            <div style={{position: 'fixed', right: 24, top: 24}}>
                <Circle backgroundColor={skinVars.colors.backgroundBrand} size={64}>
                    <Text6 color={skinVars.colors.inverse}>{inViewport ? 'Yes' : 'No'}</Text6>
                </Circle>
            </div>
        </Stack>
    );
};

UseIsInViewport.storyName = 'useIsInViewport';
