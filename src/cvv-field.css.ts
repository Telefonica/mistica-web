import {style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const tooltipContainer = sprinkles({display: 'flex', alignItems: 'center'});

export const cvvText = style([
    sprinkles({
        color: vars.colors.textPrimary,
    }),
]);
