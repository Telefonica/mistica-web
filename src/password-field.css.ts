import {style} from '@vanilla-extract/css';
import {pxToRem} from './utils/css';
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
        height: pxToRem(40),
        width: pxToRem(40),
        backgroundSize: '200%',
        margin: -8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.1s ease-in-out',

        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    background: vars.colors.backgroundAlternative,
                },
            },
        },
    },
]);
