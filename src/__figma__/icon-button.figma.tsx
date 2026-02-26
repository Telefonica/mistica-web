import React from 'react';
import {IconButton, ToggleIconButton} from '../icon-button';
import figma from '@figma/code-connect';

figma.connect(
    IconButton,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2166%3A4324',
    {
        props: {
            type: figma.enum('Type', {
                Brand: 'brand',
                Danger: 'danger',
                Neutral: 'neutral',
            }),
            backgroundType: figma.enum('Background type', {
                Soft: 'soft',
                Solid: 'solid',
                Transparent: 'transparent',
            }),
            disabled: figma.enum('State', {
                Disabled: true,
            }),
            showSpinner: figma.enum('State', {
                Loading: true,
            }),
            small: figma.boolean('Small'),
        },
        example: (props) => (
            <IconButton
                type={props.type}
                backgroundType={props.backgroundType}
                small={props.small}
                disabled={props.disabled}
                showSpinner={props.showSpinner}
                aria-label="icon button"
                onPress={() => {}}
            />
        ),
    }
);

figma.connect(
    ToggleIconButton,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=16351%3A4027',
    {
        props: {
            checked: figma.boolean('Checked'),
        },
        example: (props) => (
            <ToggleIconButton
                checkedProps={{
                    Icon: () => null,
                    'aria-label': 'checked',
                }}
                uncheckedProps={{
                    Icon: () => null,
                    'aria-label': 'unchecked',
                }}
                checked={props.checked}
                onChange={() => {}}
            />
        ),
    }
);
