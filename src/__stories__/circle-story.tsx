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
                <Circle size={40} backgroundColor={colors.brand} />
            </div>
            <div data-testid="circle-with-icon">
                <Circle size={40} backgroundColor={colors.brandLow}>
                    <IconShopRegular color={colors.brand} />
                </Circle>
            </div>
            <div data-testid="circle-with-image">
                <Circle
                    size={40}
                    backgroundImage="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                ></Circle>
            </div>
        </Stack>
    );
};

Default.storyName = 'Circle';
