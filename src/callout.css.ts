import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as skin from './skins/skin-contract.css';
import {iconContainerSize, iconSize} from './icon-button.css';

export const container = style([
    sprinkles({
        display: 'flex',
        borderRadius: skin.vars.borderRadii.container,
        padding: 16,
        overflow: 'hidden',
    }),
    {
        minHeight: 56,
    },
]);

export const content = style([sprinkles({flex: 1, position: 'relative'}), {alignSelf: 'center'}]);

export const closeButtonContainer = style([
    sprinkles({
        position: 'absolute',
        right: 0,
    }),
    {
        // Align the X with the text content
        top: '0.125rem',
    },
]);

export const closeButtonContainerSize = style({
    // IconButton's width and left padding
    width: `calc((${iconContainerSize.small} + ${iconSize.small}) / 2)`,
    // IconButton's height + extra space required to align the X with the text content
    height: `calc(${iconSize.small} + 0.125rem)`,
});
