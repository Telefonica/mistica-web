import * as React from 'react';
import {Circle, useTheme, Stack, IconShopRegular} from '..';

export default {
    title: 'Components/Primitives/Circle',
};

export const Default: StoryComponent = () => {
    const {colors} = useTheme();

    return (
        <Stack space={16}>
            <div data-testid="circle">
                <Circle size={32} backgroundColor="red" />
            </div>
            <div data-testid="circle-with-icon">
                <Circle size={40} backgroundColor={colors.brandLow}>
                    <IconShopRegular color={colors.brand} />
                </Circle>
            </div>
            <div data-testid="circle-with-image">
                <Circle size={40} backgroundImage="https://i.imgur.com/flZfkiX.png"></Circle>
            </div>
        </Stack>
    );
};

Default.storyName = 'Circle';
