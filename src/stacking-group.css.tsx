import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

const spacing = 8;

export const inline = style([
    sprinkles({display: 'inline-flex', alignItems: 'center', flexDirection: 'row'}),
    {
        flexWrap: 'wrap',
    },
]);

export const container = style({
    selectors: {
        '&:first-of-type': {
            marginLeft: 0,
        },
    },
});

export const stackedTrue = style({
    marginLeft: -spacing,
});

export const stackedFalse = style({
    marginLeft: spacing,
});

export const border = style([
    sprinkles({borderRadius: 8}),
    {
        border: `1px solid ${vars.colors.borderLow}`,
    },
]);
