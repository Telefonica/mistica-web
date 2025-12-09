import {styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';

export const variants = styleVariants({
    default: {borderBottom: `1px solid ${vars.colors.divider}`},
    alternative: {borderBottom: `1px solid ${vars.colors.divider}`},
    brand: {borderBottom: `1px solid ${vars.colors.dividerBrand}`},
    negative: {borderBottom: `1px solid ${vars.colors.dividerNegative}`},
    media: {borderBottom: `1px solid ${vars.colors.dividerNegative}`},
});
