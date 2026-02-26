import React from 'react';
import ButtonLayout from '../button-layout';
import {ButtonPrimary} from '../button';
import figma from '@figma/code-connect';

figma.connect(
    ButtonLayout,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=16295%3A216',
    {
        props: {
            align: figma.enum('Align', {
                'Full width': 'full-width',
                Left: 'left',
                Center: 'center',
                Right: 'right',
            }),
        },
        example: (props) => (
            <ButtonLayout
                align={props.align}
                primaryButton={<ButtonPrimary onPress={() => {}}>Primary</ButtonPrimary>}
            />
        ),
    }
);
