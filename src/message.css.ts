import {style, styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';

// Use the Vivo reference radius until the bubble token is published in mistica-design.
const bubbleRadius = '4px';
export const minimumBubbleSize = 48;
export const bubblePaddingY = 12;
const minimumErrorWidth = 120;

export const message = style({display: 'flex', width: 'fit-content', minWidth: 0});
export const direction = styleVariants({
    incoming: {},
    outgoing: {flexDirection: 'row-reverse', marginLeft: 'auto'},
});
export const asset = style({flexShrink: 0});
export const assetAlignment = styleVariants({
    incoming: {alignSelf: 'flex-start', marginRight: 8},
    outgoing: {alignSelf: 'flex-start', marginLeft: 8},
});
export const column = style({display: 'flex', flexDirection: 'column', minWidth: 0});
export const touchable = style({textAlign: 'left', minWidth: 0, borderRadius: vars.borderRadii.container});
export const corners = styleVariants({
    'incoming-standalone': {borderTopLeftRadius: bubbleRadius},
    'incoming-first': {borderBottomLeftRadius: bubbleRadius},
    'incoming-middle': {borderTopLeftRadius: bubbleRadius, borderBottomLeftRadius: bubbleRadius},
    'incoming-last': {borderTopLeftRadius: bubbleRadius},
    'outgoing-standalone': {borderBottomRightRadius: bubbleRadius},
    'outgoing-first': {borderBottomRightRadius: bubbleRadius},
    'outgoing-middle': {borderTopRightRadius: bubbleRadius, borderBottomRightRadius: bubbleRadius},
    'outgoing-last': {borderTopRightRadius: bubbleRadius},
});
export const bubble = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    borderRadius: 'inherit',
    overflowWrap: 'anywhere',
});
export const boxed = style({
    boxSizing: 'border-box',
    padding: `${bubblePaddingY}px 16px`,
    minWidth: minimumBubbleSize,
    minHeight: minimumBubbleSize,
});
export const incomingBackground = styleVariants({
    default: {background: vars.colors.backgroundContainerAlternative},
    brand: {background: vars.colors.backgroundContainer},
    negative: {background: vars.colors.backgroundContainer},
    alternative: {background: vars.colors.backgroundContainer},
    media: {background: vars.colors.backgroundContainer},
});
// Use brandLow until backgroundBubbleOutgoing is published in mistica-design.
export const outgoingBackground = style({background: vars.colors.brandLow});
export const errorBackground = style({background: vars.colors.backgroundContainerError});
export const interactive = style({
    selectors: {
        [`${touchable}:hover &`]: {background: vars.colors.backgroundContainerHover},
        [`${touchable}:active &`]: {background: vars.colors.backgroundContainerPressed},
    },
});
export const content = style({minWidth: 0, whiteSpace: 'pre-wrap'});
export const timestamp = style({alignSelf: 'flex-end'});
export const actions = style({display: 'flex', flexShrink: 0, alignItems: 'center'});
export const side = style({display: 'flex', flexShrink: 0, alignSelf: 'flex-start', alignItems: 'center'});
export const unboxedActions = style({marginLeft: -8});
export const error = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 4,
    minWidth: minimumErrorWidth,
    overflowWrap: 'anywhere',
});
export const boxedError = style({marginLeft: 16});

export const body = style({display: 'flex', flexDirection: 'column', gap: 4});
export const inlineTimestamp = style({flexDirection: 'row', alignItems: 'baseline', gap: 8});
export const text = style({display: 'inline-block', maxWidth: '100%'});

export const footer = style({width: 0, minWidth: '100%', overflowWrap: 'anywhere'});

export const sideDirection = styleVariants({incoming: {}, outgoing: {flexDirection: 'row-reverse'}});
