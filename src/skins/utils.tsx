import * as React from 'react';
import {BLAU_SKIN, TELEFONICA_SKIN, VIVO_SKIN, O2_SKIN, O2_CLASSIC_SKIN, MOVISTAR_SKIN} from './constants';
import {getBlauSkin} from './blau';
import {getTelefonicaSkin} from './telefonica';
import {getVivoSkin} from './vivo';
import {getO2Skin} from './o2';
import {getO2ClassicSkin} from './o2-classic';
import {getMovistarSkin} from './movistar';

import type {SkinVariant, KnownSkin, KnownSkinName} from './types';

export const getSkinByName = (name: KnownSkinName, variant?: SkinVariant): KnownSkin => {
    switch (name) {
        case BLAU_SKIN:
            return getBlauSkin(variant);
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

type ReactChildArray = ReturnType<typeof React.Children.toArray>;

export const flattenChildren = (children: React.ReactNode): ReactChildArray => {
    const childrenArray = React.Children.toArray(children);
    return childrenArray.reduce((flatChildren: ReactChildArray, child) => {
        if ((child as React.ReactElement<any>).type === React.Fragment) {
            return flatChildren.concat(flattenChildren((child as React.ReactElement<any>).props.children));
        }
        flatChildren.push(child);
        return flatChildren;
    }, []);
};
