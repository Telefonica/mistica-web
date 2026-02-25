import React from 'react';
import {ButtonDanger, ButtonLink, ButtonLinkDanger, ButtonPrimary, ButtonSecondary} from '../../button';
import figma from '@figma/code-connect';

figma.connect(
    ButtonDanger,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10659%3A9868',
    {
        props: {
            disabled: figma.enum('State', {
                Disabled: true,
            }),
            showSpinner: figma.enum('State', {
                Loading: true,
            }),
            small: figma.boolean('Small'),
            startIcon: figma.enum('Icon', {
                startIcon: figma.children('*'),
            }),
            endIcon: figma.enum('Icon', {
                endIcon: figma.children('*'),
            }),
        },
        example: (props) => (
            <ButtonDanger
                small={props.small}
                disabled={props.disabled}
                showSpinner={props.showSpinner}
                StartIcon={props.startIcon}
                EndIcon={props.endIcon}
                onPress={() => {}}
            >
                Button
            </ButtonDanger>
        ),
    }
);

figma.connect(
    ButtonLink,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10659%3A9869',
    {
        props: {
            disabled: figma.enum('State', {
                Disabled: true,
            }),
            showSpinner: figma.enum('State', {
                Loading: true,
            }),
            small: figma.boolean('Small'),
            bleedLeft: figma.boolean('BleedLeft'),
            bleedRight: figma.boolean('BleedRight'),
            bleedY: figma.boolean('BleedY'),
            startIcon: figma.enum('Icon', {
                startIcon: figma.children('*'),
            }),
            endIcon: figma.enum('Icon', {
                endIcon: figma.children('*'),
            }),
        },
        example: (props) => (
            <ButtonLink
                small={props.small}
                disabled={props.disabled}
                showSpinner={props.showSpinner}
                bleedLeft={props.bleedLeft}
                bleedRight={props.bleedRight}
                bleedY={props.bleedY}
                StartIcon={props.startIcon}
                EndIcon={props.endIcon}
                onPress={() => {}}
            >
                Button
            </ButtonLink>
        ),
    }
);

figma.connect(
    ButtonLinkDanger,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=14974%3A377',
    {
        props: {
            disabled: figma.enum('State', {
                Disabled: true,
            }),
            showSpinner: figma.enum('State', {
                Loading: true,
            }),
            small: figma.boolean('Small'),
            bleedLeft: figma.boolean('BleedLeft'),
            bleedRight: figma.boolean('BleedRight'),
            bleedY: figma.boolean('BleedY'),
            startIcon: figma.enum('Icon', {
                startIcon: figma.children('*'),
            }),
            endIcon: figma.enum('Icon', {
                endIcon: figma.children('*'),
            }),
        },
        example: (props) => (
            <ButtonLinkDanger
                small={props.small}
                disabled={props.disabled}
                showSpinner={props.showSpinner}
                bleedLeft={props.bleedLeft}
                bleedRight={props.bleedRight}
                bleedY={props.bleedY}
                StartIcon={props.startIcon}
                EndIcon={props.endIcon}
                onPress={() => {}}
            >
                Button
            </ButtonLinkDanger>
        ),
    }
);

figma.connect(
    ButtonPrimary,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2166%3A4125',
    {
        props: {
            disabled: figma.enum('State', {
                Disabled: true,
            }),
            showSpinner: figma.enum('State', {
                Loading: true,
            }),
            small: figma.boolean('Small'),
            startIcon: figma.enum('Icon', {
                startIcon: figma.children('*'),
            }),
            endIcon: figma.enum('Icon', {
                endIcon: figma.children('*'),
            }),
        },
        example: (props) => (
            <ButtonPrimary
                small={props.small}
                disabled={props.disabled}
                showSpinner={props.showSpinner}
                StartIcon={props.startIcon}
                EndIcon={props.endIcon}
                onPress={() => {}}
            >
                Button
            </ButtonPrimary>
        ),
    }
);

figma.connect(
    ButtonSecondary,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10659%3A9867',
    {
        props: {
            disabled: figma.enum('State', {
                Disabled: true,
            }),
            showSpinner: figma.enum('State', {
                Loading: true,
            }),
            small: figma.boolean('Small'),
            startIcon: figma.enum('Icon', {
                startIcon: figma.children('*'),
            }),
            endIcon: figma.enum('Icon', {
                endIcon: figma.children('*'),
            }),
        },
        example: (props) => (
            <ButtonSecondary
                small={props.small}
                disabled={props.disabled}
                showSpinner={props.showSpinner}
                StartIcon={props.startIcon}
                EndIcon={props.endIcon}
                onPress={() => {}}
            >
                Button
            </ButtonSecondary>
        ),
    }
);
