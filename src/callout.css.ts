import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as skin from './skins/skin-contract.css';
import {iconContainerSize} from './icon-button.css';

const CALLOUT_MIN_HEIGHT = 56;

export const container = style([
    sprinkles({
        display: 'flex',
        borderRadius: skin.vars.borderRadii.container,
        padding: 16,
        overflow: 'hidden',
        position: 'relative',
    }),
    {
        minHeight: [CALLOUT_MIN_HEIGHT, `max(${CALLOUT_MIN_HEIGHT}px, ${iconContainerSize.small} + 16px)`],
    },
]);

export const content = style([sprinkles({flex: 1}), {alignSelf: 'center'}]);

const baseCloseButtonContainer = style([
    sprinkles({
        position: 'absolute',
        right: 8,
    }),
    {
        top: 8,
    },
]);

export const centeredCloseButtonContainer = style([
    baseCloseButtonContainer,
    {
        top: `calc(50% - ${iconContainerSize.small} / 2)`,
    },
]);

export const defaultCloseButtonContainer = style([
    baseCloseButtonContainer,
    {
        top: 8,
    },
]);
