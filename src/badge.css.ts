import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

export const container = sprinkles({
    position: 'relative',
    display: 'inline-block',
});

export const badge = style([
    sprinkles({
        width: 8,
        height: 8,
        background: vars.colors.badge,
    }),
    {
        top: -2,
        right: -6,
        borderRadius: '50%',
        boxShadow: `0px 0px 0px 1.5px ${vars.colors.borderLight}`,
    },
]);

export const badgeNumber = style([
    badge,
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: vars.colors.textPrimaryInverse,
    }),
    {
        top: -8,
        right: -9,
        width: 18,
        height: 18,
        fontSize: 12,
        fontWeight: 500,
    },
]);

export const badgeWithChildren = sprinkles({
    position: 'absolute',
});

export const badgeBigNumber = style({
    width: 24,
    right: -14,
    borderRadius: 24,
});
