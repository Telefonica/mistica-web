import {style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const tag = style([
    sprinkles({
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 56,
        paddingY: 4,
    }),
    {
        verticalAlign: 'middle',
        borderRadius: vars.borderRadii.tag,
    },
]);

export const icon = sprinkles({display: 'block'});

export const badge = sprinkles({display: 'inline-flex', paddingLeft: 4});
