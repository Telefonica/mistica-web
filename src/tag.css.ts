import {style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

const tagCommon = style([
    sprinkles({
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        verticalAlign: 'middle',
        borderRadius: vars.borderRadii.tag,
    },
]);

export const tag = style([
    tagCommon,
    sprinkles({
        minWidth: 56,
    }),
    {
        paddingBottom: vars.spacing.tagPadding.bottom,
        paddingTop: vars.spacing.tagPadding.top,
    },
]);

export const smallTag = style([
    tagCommon,
    sprinkles({
        minWidth: 40,
        paddingY: 2,
    }),
    {
        minHeight: 22,
    },
]);

export const icon = sprinkles({display: 'block'});

export const badge = sprinkles({display: 'inline-flex', paddingLeft: 4});
