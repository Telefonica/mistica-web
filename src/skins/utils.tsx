import * as React from 'react';
import {
    BLAU_SKIN,
    TELEFONICA_SKIN,
    VIVO_SKIN,
    O2_SKIN,
    O2_NEW_SKIN,
    MOVISTAR_SKIN,
    MOVISTAR_NEW_SKIN,
    VIVO_EVOLUTION_SKIN,
    ESIMFLAG_SKIN,
} from './constants';
import {getBlauSkin} from './blau';
import {getTelefonicaSkin} from './telefonica';
import {getVivoSkin} from './vivo';
import {getVivoEvolutionSkin} from './vivo-evolution';
import {getO2Skin} from './o2';
import {getO2NewSkin} from './o2-new';
import {getMovistarSkin} from './movistar';
import {getMovistarNewSkin} from './movistar-new';
import {getEsimflagSkin} from './esimflag';

import type {SkinVariant, KnownSkin, KnownSkinName} from './types';

export const getSkinByName = (name: KnownSkinName, variant?: SkinVariant): KnownSkin => {
    switch (name) {
        case BLAU_SKIN:
            return getBlauSkin(variant);
        case TELEFONICA_SKIN:
            return getTelefonicaSkin(variant);
        case VIVO_SKIN:
            return getVivoSkin(variant);
        case VIVO_EVOLUTION_SKIN:
            return getVivoEvolutionSkin(variant);
        case O2_SKIN:
            return getO2Skin(variant);
        case O2_NEW_SKIN:
            return getO2NewSkin(variant);
        case MOVISTAR_SKIN:
            return getMovistarSkin(variant);
        case MOVISTAR_NEW_SKIN:
            return getMovistarNewSkin(variant);
        case ESIMFLAG_SKIN:
            return getEsimflagSkin(variant);
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
