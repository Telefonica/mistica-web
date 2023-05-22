import * as React from 'react';
import {Circle, skinVars, Stack, IconShopRegular} from '..';
import avatarImg from './images/avatar.jpg';

export default {
    title: 'Components/Primitives/Circle',
};

export const Default: StoryComponent = () => {
    return (
        <Stack space={16} dataAttributes={{testid: 'circle'}}>
            <Circle size={40} backgroundColor={skinVars.colors.brand} />

            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconShopRegular color={skinVars.colors.brand} />
            </Circle>

            <Circle size={40} backgroundImage={avatarImg}></Circle>

            <Circle size={40} backgroundColor={skinVars.colors.background} border />

            <Circle size={40} backgroundColor={skinVars.colors.background} border="red" />
        </Stack>
    );
};

Default.storyName = 'Circle';
