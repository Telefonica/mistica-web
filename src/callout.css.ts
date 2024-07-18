import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as skin from './skins/skin-contract.css';

export const container = style([
    sprinkles({
        display: 'flex',
        borderRadius: skin.vars.borderRadii.container,
        padding: 16,
        overflow: 'hidden',
    }),
    {
        minHeight: 56,
    },
]);

export const content = style([sprinkles({flex: 1, position: 'relative'}), {alignSelf: 'center'}]);
