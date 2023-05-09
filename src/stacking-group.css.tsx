import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

export const border = style([
    sprinkles({borderRadius: 8}),
    {
        border: `1px solid ${vars.colors.borderLow}`,
    },
]);
