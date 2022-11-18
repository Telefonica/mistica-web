import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

const buttonLayoutSpacing = 16;
const buttonLinkPadding = 12;

export const inline = style([
    sprinkles({display: 'inline-flex', alignItems: 'center', flexDirection: 'row'}),
    {
        flexWrap: 'wrap',
    },
]);

export const container = style({
    marginTop: -buttonLayoutSpacing,
    marginLeft: -buttonLayoutSpacing - buttonLinkPadding,
});

export const buttons = style({
    marginLeft: buttonLinkPadding,
});

export const buttonChild = style({
    marginTop: buttonLayoutSpacing,
    marginLeft: buttonLayoutSpacing,
});
