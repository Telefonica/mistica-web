import * as React from 'react';
import {
    BLAU_SKIN,
    TELEFONICA_SKIN,
    VIVO_SKIN,
    O2_SKIN,
    O2_CLASSIC_SKIN,
    O2_NEW_SKIN,
    MOVISTAR_SKIN,
    VIVO_NEW_SKIN,
} from './constants';
import {getBlauSkin} from './blau';
import {getTelefonicaSkin} from './telefonica';
import {getVivoSkin} from './vivo';
import {getVivoNewSkin} from './vivo-new';
import {getO2Skin} from './o2';
import {getO2NewSkin} from './o2-new';
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
        case VIVO_NEW_SKIN:
            return getVivoNewSkin(variant);
        case O2_SKIN:
            return getO2Skin(variant);
        case O2_CLASSIC_SKIN:
            return getO2ClassicSkin(variant);
        case O2_NEW_SKIN:
            return getO2NewSkin(variant);
        case MOVISTAR_SKIN:
            return getMovistarSkin(variant);
        default: {
            const n: never = name;
            throw Error('Unknown skin name: ' + n);
        }
    }
};

// copied/adapted from https://github.com/gregberge/react-flatten-children/blob/master/src/index.tsx
export const flattenChildren = (children: React.ReactNode): Array<React.ReactNode> => {
    const childrenArray = React.Children.toArray(children);
    return childrenArray.reduce((flatChildren: Array<React.ReactNode>, child) => {
        if ((child as React.ReactElement<any>).type === React.Fragment) {
            return flatChildren.concat(flattenChildren((child as React.ReactElement<any>).props.children));
        }
        flatChildren.push(child);
        return flatChildren;
    }, []);
};
