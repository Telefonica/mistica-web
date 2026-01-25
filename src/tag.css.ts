import {style, styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const tag = style({
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    borderRadius: vars.borderRadii.tag,
});

export const tagSize = styleVariants({
    default: {
        minWidth: 56,
        minHeight: 28,
        paddingTop: 4,
        paddingRight: 12,
        paddingBottom: 4,
        paddingLeft: 12,
    },
    small: {
        minWidth: 40,
        minHeight: 22,
        paddingTop: 3,
        paddingRight: 8,
        paddingBottom: 3,
        paddingLeft: 8,
    },
});

export const withIconPadding = styleVariants({
    default: {paddingLeft: 8},
    small: {paddingLeft: 4},
});

export const withBadgePadding = styleVariants({
    default: {paddingRight: 8},
    small: {paddingRight: 2},
});

export const icon = sprinkles({display: 'block'});

export const badge = sprinkles({display: 'inline-flex', paddingLeft: 4});
