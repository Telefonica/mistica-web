import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import {pxToRem} from './utils/css';

export const container = sprinkles({
    position: 'relative',
    display: 'inline-block',
});

export const badge = style([
    sprinkles({
        background: vars.colors.badge,
    }),
    {
        width: pxToRem(8),
        height: pxToRem(8),
        top: pxToRem(-2),
        right: pxToRem(-6),
        borderRadius: '50%',
    },
]);

export const badgeBorder = style({
    boxShadow: `0px 0px 0px ${pxToRem(1.5)} ${vars.colors.borderLow}`,
});

export const badgeNumber = style([
    badge,
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        top: pxToRem(-8),
        right: pxToRem(-9),
        width: pxToRem(18),
        height: pxToRem(18),
    },
]);

export const badgeWithChildren = sprinkles({
    position: 'absolute',
});

export const badgeBigNumber = style({
    width: pxToRem(24),
    right: pxToRem(-14),
    borderRadius: vars.borderRadii.indicator,
});
