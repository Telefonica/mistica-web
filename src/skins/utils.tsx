import {TELEFONICA_SKIN, VIVO_SKIN, O2_SKIN, O2_CLASSIC_SKIN, MOVISTAR_SKIN} from './constants';
import {getTelefonicaSkin} from './telefonica';
import {getVivoSkin} from './vivo';
import {getO2Skin} from './o2';
import {getO2ClassicSkin} from './o2-classic';
import {getMovistarSkin} from './movistar';

import type {SkinVariant, Skin, SkinName} from './types';

export const getSkinByName = (name: SkinName, variant?: SkinVariant): Skin => {
    switch (name) {
        case TELEFONICA_SKIN:
            return getTelefonicaSkin(variant);
        case VIVO_SKIN:
            return getVivoSkin(variant);
        case O2_SKIN:
            return getO2Skin(variant);
        case O2_CLASSIC_SKIN:
            return getO2ClassicSkin(variant);
        case MOVISTAR_SKIN:
            return getMovistarSkin(variant);
        default: {
            const n: never = name;
            throw Error('Unknown skin name: ' + n);
        }
    }
};
