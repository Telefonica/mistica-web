import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const shadow = style([
    sprinkles({
        padding: 8,
        borderRadius: '50%',
        background: 'transparent',
    }),
    {
        backgroundSize: '200%',
        margin: -8,
        transition: 'background-color 0.2s ease-in-out',

        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    background: vars.colors.backgroundAlternative,
                },
            },
        },
    },
]);
