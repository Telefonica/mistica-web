import {styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';

export const variants = styleVariants({
    default: {borderBottom: `1px solid ${vars.colors.divider}`},
    inverse: {borderBottom: `1px solid ${vars.colors.dividerInverse}`},
});
