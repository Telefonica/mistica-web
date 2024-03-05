import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as skin from './skins/skin-contract.css';

export const container = style([
    sprinkles({
        display: 'flex',
        borderRadius: skin.vars.borderRadii.container,
        padding: 16,
        overflow: 'hidden',
        position: 'relative',
    }),
    {
        minHeight: 56,
    },
]);

export const content = style([sprinkles({flex: 1}), {alignSelf: 'center'}]);

export const closeButtonContainer = sprinkles({
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
});
