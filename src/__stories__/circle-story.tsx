import * as React from 'react';
import {Circle, useTheme, Stack, IconAcademicLight} from '..';

export default {
    title: 'Components/Others/Circle',
};

export const Default: StoryComponent = () => {
    const {colors} = useTheme();

    return (
        <Stack space={16}>
            <div data-testid="circle">
                <Circle size={32} backgroundColor="red" />
            </div>
            <div data-testid="circle-with-icon">
                <Circle size={40} backgroundColor={colors.iconDisabled}>
                    <IconAcademicLight />
                </Circle>
            </div>
            <div data-testid="circle-with-image">
                <Circle size={40} backgroundImage="https://i.imgur.com/flZfkiX.png"></Circle>
            </div>
        </Stack>
    );
};

Default.storyName = 'Circle';
