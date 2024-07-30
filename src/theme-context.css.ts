import {assignVars, createThemeContract, style} from '@vanilla-extract/css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

export const themeVarsContract = createThemeContract(skinVars);
export const textPresetResponsiveVarsContract = createThemeContract(skinVars.textPresets);

export const themeVars = style({
    vars: assignVars(skinVars, themeVarsContract),

    '@media': {
        [mq.tabletOrSmaller]: {
            vars: assignVars(skinVars.textPresets, textPresetResponsiveVarsContract),
        },
    },
});
