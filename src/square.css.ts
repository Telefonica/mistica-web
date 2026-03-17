import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

export const square = style([
    {
        boxSizing: 'border-box',
        borderRadius: `min(${vars.borderRadii.container}, 25%)`,
    },
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
]);
