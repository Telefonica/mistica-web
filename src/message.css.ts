import {globalStyle, style, styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';

const bubbleRadius = '4px';
export const minimumBubbleSize = 48;
export const bubblePaddingY = 12;
export const bubblePaddingX = 16;
export const minimumErrorWidth = 184;
const boxedErrorInset = 16;
const actionsGap = 16;
const actionsInset = 4;

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
export const unboxedAssetSpacing = styleVariants({
    incoming: {marginRight: 12},
    outgoing: {marginLeft: 12},
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
    padding: `${bubblePaddingY}px ${bubblePaddingX}px`,
    minWidth: minimumBubbleSize,
    minHeight: minimumBubbleSize,
});
export const incomingBackground = styleVariants({
    default: {background: vars.colors.messageBubbleBackgroundIncoming},
    brand: {background: vars.colors.messageBubbleBackgroundIncomingBrand},
    negative: {background: vars.colors.messageBubbleBackgroundIncomingNegative},
    alternative: {background: vars.colors.messageBubbleBackgroundIncomingAlternative},
    media: {background: vars.colors.messageBubbleBackgroundIncomingMedia},
});
export const outgoingBackground = styleVariants({
    default: {background: vars.colors.messageBubbleBackgroundOutgoing},
    brand: {background: vars.colors.messageBubbleBackgroundOutgoingBrand},
    negative: {background: vars.colors.messageBubbleBackgroundOutgoingNegative},
    alternative: {background: vars.colors.messageBubbleBackgroundOutgoingAlternative},
    media: {background: vars.colors.messageBubbleBackgroundOutgoingMedia},
});
export const errorBackground = style({background: vars.colors.backgroundContainerError});
export const interactive = style({
    selectors: {
        [`${touchable}:hover &`]: {
            backgroundImage: `linear-gradient(${vars.colors.backgroundContainerHover}, ${vars.colors.backgroundContainerHover})`,
        },
        [`${touchable}:active &`]: {
            backgroundImage: `linear-gradient(${vars.colors.backgroundContainerPressed}, ${vars.colors.backgroundContainerPressed})`,
        },
    },
});
export const content = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    minWidth: 0,
    whiteSpace: 'pre-wrap',
});
export const contentSlot = style({minWidth: 0, maxWidth: '100%', overflowX: 'auto'});
globalStyle(`${contentSlot} > *`, {maxWidth: '100%'});
export const timestamp = style({alignSelf: 'flex-end'});
export const actions = style({display: 'flex', flexShrink: 0, alignItems: 'center', gap: actionsGap});
export const footerActions = style({marginTop: actionsInset, flexWrap: 'wrap'});
export const sideActions = styleVariants({
    incoming: {marginLeft: actionsInset},
    outgoing: {marginRight: actionsInset},
});
export const outgoingFooterActions = style({justifyContent: 'flex-end'});
export const side = style({display: 'flex', flexShrink: 0, alignSelf: 'flex-start', alignItems: 'center'});
export const unboxedActions = style({marginLeft: -8});
export const error = style({
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr)',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 4,
    minWidth: 0,
    overflowWrap: 'anywhere',
});
export const boxedError = style({paddingInline: boxedErrorInset});
export const errorIcon = style({
    display: 'block',
    width: ['1rem', '1lh'],
    height: ['1rem', '1lh'],
});

export const body = style({display: 'flex', flexDirection: 'column', gap: 4});
export const inlineTimestamp = style({flexDirection: 'row', alignItems: 'baseline', gap: 8});
export const text = style({display: 'inline-block', maxWidth: '100%'});

export const footer = style({width: 0, minWidth: '100%', overflowWrap: 'anywhere'});
export const shortErrorLayout = styleVariants({
    incoming: {display: 'flex', flexDirection: 'column', alignItems: 'flex-start'},
    outgoing: {display: 'flex', flexDirection: 'column', alignItems: 'flex-end'},
});
export const shortErrorBubble = style({width: 'fit-content', maxWidth: '100%'});
export const shortErrorFooter = style({
    width: 'max-content',
    minWidth: 0,
    maxWidth: '100%',
});

export const sideDirection = styleVariants({incoming: {}, outgoing: {flexDirection: 'row-reverse'}});
