import React from 'react';
import {ButtonDanger, ButtonLink, ButtonLinkDanger, ButtonPrimary, ButtonSecondary} from '../button';
import figma from '@figma/code-connect';

const buttonPrimaryProps = {
    disabled: figma.enum('State', {
        Disabled: true,
    }),
    showSpinner: figma.enum('State', {
        Loading: true,
    }),
    small: figma.boolean('Small'),
    StartIcon: figma.enum('Icon', {
        startIcon: figma.children('*'),
    }),
    EndIcon: figma.enum('Icon', {
        endIcon: figma.children('*'),
    }),
    children: figma.textContent('Action'),
};

// Desktop
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
            StartIcon: figma.enum('Icon', {
                startIcon: figma.children('*'),
            }),
            EndIcon: figma.enum('Icon', {
                endIcon: figma.children('*'),
            }),
            children: figma.textContent('Action'),
        },
        example: (props) => (
            <ButtonDanger
                small={props.small}
                disabled={props.disabled}
                showSpinner={props.showSpinner}
                StartIcon={props.StartIcon}
                EndIcon={props.EndIcon}
                onPress={() => {}}
            >
                {props.children}
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
            StartIcon: figma.enum('Icon', {
                startIcon: figma.children('*'),
            }),
            EndIcon: figma.enum('Icon', {
                endIcon: figma.children('*'),
            }),
            children: figma.textContent('Action'),
        },
        example: (props) => (
            <ButtonLink
                small={props.small}
                disabled={props.disabled}
                showSpinner={props.showSpinner}
                bleedLeft={props.bleedLeft}
                bleedRight={props.bleedRight}
                bleedY={props.bleedY}
                StartIcon={props.StartIcon}
                EndIcon={props.EndIcon}
                onPress={() => {}}
            >
                {props.children}
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
            StartIcon: figma.enum('Icon', {
                startIcon: figma.children('*'),
            }),
            EndIcon: figma.enum('Icon', {
                endIcon: figma.children('*'),
            }),
            children: figma.textContent('Action'),
        },
        example: (props) => (
            <ButtonLinkDanger
                small={props.small}
                disabled={props.disabled}
                showSpinner={props.showSpinner}
                bleedLeft={props.bleedLeft}
                bleedRight={props.bleedRight}
                bleedY={props.bleedY}
                StartIcon={props.StartIcon}
                EndIcon={props.EndIcon}
                onPress={() => {}}
            >
                {props.children}
            </ButtonLinkDanger>
        ),
    }
);

figma.connect(
    ButtonPrimary,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2166%3A4125',
    {
        props: buttonPrimaryProps,
        example: (props) => (
            <ButtonPrimary
                small={props.small}
                disabled={props.disabled}
                showSpinner={props.showSpinner}
                StartIcon={props.StartIcon}
                EndIcon={props.EndIcon}
                onPress={() => {}}
            >
                {props.children}
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
            StartIcon: figma.enum('Icon', {
                startIcon: figma.children('*'),
            }),
            EndIcon: figma.enum('Icon', {
                endIcon: figma.children('*'),
            }),
            children: figma.textContent('Action'),
        },
        example: (props) => (
            <ButtonSecondary
                small={props.small}
                disabled={props.disabled}
                showSpinner={props.showSpinner}
                StartIcon={props.StartIcon}
                EndIcon={props.EndIcon}
                onPress={() => {}}
            >
                {props.children}
            </ButtonSecondary>
        ),
    }
);

// Mobile
figma.connect(
    ButtonPrimary,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=22230%3A10269',
    {
        props: buttonPrimaryProps,
        example: (props) => (
            <ButtonPrimary
                small={props.small}
                disabled={props.disabled}
                showSpinner={props.showSpinner}
                StartIcon={props.StartIcon}
                EndIcon={props.EndIcon}
                onPress={() => {}}
            >
                {props.children}
            </ButtonPrimary>
        ),
    }
);
