import {style} from '@vanilla-extract/css';
import {vars} from '../skins/skin-contract.css';

export const example = style({
    backgroundColor: vars.colors.brand,
    color: vars.colors.textPrimaryInverse,
});
