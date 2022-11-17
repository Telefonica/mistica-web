import {style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const tooltipContainer = sprinkles({display: 'flex', alignItems: 'center'});

export const cvvText = style([
    sprinkles({
        color: vars.colors.textPrimary,
    }),
    {
        margin: 0,
        marginLeft: 16,
        lineHeight: 1.42857142,
        fontSize: 14,
    },
]);
