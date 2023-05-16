import * as React from 'react';
import {Circle, skinVars, Stack, IconShopRegular} from '..';
import avatarImg from './images/avatar.jpg';

export default {
    title: 'Components/Primitives/Circle',
};

export const Default: StoryComponent = () => {
    return (
        <Stack space={16}>
            <div data-testid="circle">
                <Circle size={40} backgroundColor={skinVars.colors.brand} />
            </div>
            <div data-testid="circle-with-icon">
                <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                    <IconShopRegular color={skinVars.colors.brand} />
                </Circle>
            </div>
            <div data-testid="circle-with-image">
                <Circle size={40} backgroundImage={avatarImg}></Circle>
            </div>
            <div data-testid="circle-with-border">
                <Circle size={40} backgroundColor={skinVars.colors.brand} border />
            </div>
        </Stack>
    );
};

Default.storyName = 'Circle';
