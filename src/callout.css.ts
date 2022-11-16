import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

export const container = style([
    sprinkles({
        display: 'flex',
        backgroundColor: vars.colors.backgroundAlternative,
        borderRadius: 8,
        padding: 16,
        overflow: 'hidden',
    }),
    {
        minHeight: 56,
    },
]);

export const content = style([sprinkles({flex: 1}), {alignSelf: 'center'}]);
