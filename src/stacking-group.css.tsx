import {style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';

export const border = style([
    {
        border: `1px solid ${vars.colors.borderLow}`,
    },
]);
