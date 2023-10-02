import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import {style} from '@vanilla-extract/css';

import type {Sprinkles} from './sprinkles.css';

export const disabled = style({
    opacity: 0.5,
    cursor: 'default',
});

const fieldCommonStyles: Sprinkles = {
    overflow: 'hidden',
    border: 'regular',
    display: 'flex',
    borderRadius: vars.borderRadii.input,
    position: 'relative',
    width: 48,
    height: 48,
};

export const field = sprinkles({
    ...fieldCommonStyles,
    background: vars.colors.backgroundContainer,
});

export const focusedField = style([
    sprinkles({
        ...fieldCommonStyles,
    }),
    {
        border: `1px solid ${vars.colors.controlActivated}`,
    },
]);

export const readOnlyField = sprinkles({
    ...fieldCommonStyles,
    background: vars.colors.neutralLow,
});

export const input = style({
    textAlign: 'center',
});
