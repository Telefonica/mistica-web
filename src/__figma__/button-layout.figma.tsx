import React from 'react';
import ButtonLayout from '../button-layout';
import {ButtonPrimary} from '../button';
import figma from '@figma/code-connect';

const buttonLayoutProps = {
    align: figma.enum('Align', {
        'Full width': 'full-width',
        Left: 'left',
        Center: 'center',
        Right: 'right',
    }),
};

// Desktop
figma.connect(
    ButtonLayout,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=16295%3A216',
    {
        props: buttonLayoutProps,
        example: (props) => (
            <ButtonLayout
                align={props.align}
                primaryButton={<ButtonPrimary onPress={() => {}}>Primary</ButtonPrimary>}
            />
        ),
    }
);

// Mobile
figma.connect(
    ButtonLayout,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=35946%3A4151',
    {
        props: buttonLayoutProps,
        example: (props) => (
            <ButtonLayout
                align={props.align}
                primaryButton={<ButtonPrimary onPress={() => {}}>Primary</ButtonPrimary>}
            />
        ),
    }
);
