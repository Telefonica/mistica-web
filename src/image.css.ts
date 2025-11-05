import {createVar, fallbackVar, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';

export const FADE_IN_DURATION_MS = 300;

const mediaBorderRadius = createVar();

export const vars = {
    mediaBorderRadius,
};

export const imageWithBorder = style({
    border: `1px solid ${skinVars.colors.borderLow}`,
});

export const image = style([
    sprinkles({
        top: 0,
        left: 0,
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: skinVars.borderRadii.container,
    }),
    {
        transition: `opacity ${FADE_IN_DURATION_MS}ms`,
    },
]);

export const withoutBorderRadius = style({
    borderRadius: 0,
});

export const circularBorderRadius = style({
    borderRadius: '50%',
});

export const withBorderRadius = style({
    borderRadius: skinVars.borderRadii.container,
});

export const defaultBorderRadius = style({
    borderRadius: fallbackVar(mediaBorderRadius, skinVars.borderRadii.container),
});
