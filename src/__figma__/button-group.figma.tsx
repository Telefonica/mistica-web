import React from 'react';
import ButtonGroup from '../button-group';
import {ButtonPrimary} from '../button';
import figma from '@figma/code-connect';

// Desktop
figma.connect(
    ButtonGroup,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=184%3A5972',
    {
        props: {},
        example: () => (
            <ButtonGroup primaryButton={<ButtonPrimary onPress={() => {}}>Primary</ButtonPrimary>} />
        ),
    }
);

// Mobile
figma.connect(
    ButtonGroup,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=184%3A5972',
    {
        props: {},
        example: () => (
            <ButtonGroup primaryButton={<ButtonPrimary onPress={() => {}}>Primary</ButtonPrimary>} />
        ),
    }
);
