import * as React from 'react';
import {ButtonPrimary, ButtonSecondary} from '../button';
import ButtonLayout from '../button-layout';

export const Buttons = ({secondary = false}: {secondary?: boolean}): JSX.Element => (
    <ButtonLayout
        primaryButton={<ButtonPrimary onPress={() => {}}>Button1</ButtonPrimary>}
        secondaryButton={
            secondary ? <ButtonSecondary onPress={() => {}}>Button2</ButtonSecondary> : undefined
        }
    />
);
