import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {applyAlpha} from './utils/color';
import {vars as colorVars} from './skins/skin-contract.css';

export const dismissableContainer = sprinkles({
    position: 'relative',
    display: 'flex',
    flexShrink: 0,
});

export const dismissableButton = style([
    sprinkles({
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 8,
    }),
    {
        zIndex: 2, // needed because images has zIndex 1, otherwise this component won't be shown
    },
]);

export const dismissableCircleContainer = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        borderRadius: '50%',
    }),
    {
        margin: '0 0 8px 8px',
        backgroundColor: applyAlpha(colorVars.rawColors.background, 0.7),
    },
]);
