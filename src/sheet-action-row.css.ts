import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars as skinVars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const sheetActionRow = style([
    sprinkles({
        display: 'flex',
        padding: 16,
        minHeight: 72,
        alignItems: 'center',
    }),
    {
        transition: 'background-color 0.1s ease-in-out',
        ':active': {
            background: skinVars.colors.backgroundContainerPressed,
        },
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    background: skinVars.colors.backgroundContainerHover,
                },
                // need to repeat this inside of @media to avoid :hover background to take precedence over :active
                ':active': {
                    background: skinVars.colors.backgroundContainerPressed,
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);
