import {globalStyle, style, styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const timeline = styleVariants({
    vertical: {
        display: 'flex',
        flexDirection: 'column',
    },
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
    },
});

export const timelineItem = style([
    sprinkles({
        display: 'flex',
        alignItems: 'stretch',
    }),
    {
        selectors: {
            [`${timeline.horizontal} &`]: {
                flex: 1,
                flexDirection: 'column',
                marginRight: 16,
            },
            [`${timeline.vertical} &`]: {
                flexDirection: 'row',
                marginBottom: 16,
            },
            '&:last-child': {
                marginBottom: 0,
                marginRight: 0,
            },
        },
    },
]);

export const itemContent = style([
    sprinkles({
        flex: 1,
        minHeight: 72,
        paddingBottom: 8,
    }),
    {
        minWidth: 240,
    },
]);

export const timelineItemState = styleVariants({
    active: {},
    inactive: {},
    completed: {},
});

export const lineContainer = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
    }),
    {
        selectors: {
            [`${timeline.horizontal} &`]: {
                flexDirection: 'row',
                // height: 40,
                marginBottom: 16,
            },
            [`${timeline.vertical} &`]: {
                flexDirection: 'column',
                // width: 40,
                marginRight: 16,
            },
        },
    },
]);

export const asset = style({
    selectors: {
        [`${timeline.horizontal} &`]: {
            marginRight: 16,
        },
        [`${timeline.vertical} &`]: {
            marginBottom: 16,
        },
    },
});

globalStyle(`${asset} svg`, {
    display: 'block',
});

export const assetNumberContainer = style([
    sprinkles({
        width: 32,
        height: 32,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: vars.colors.backgroundContainer,
    }),
    {
        border: `2px solid ${vars.colors.borderHigh}`,
        selectors: {
            [`${timelineItemState.active} &`]: {
                borderColor: vars.colors.textActivated,
            },
        },
    },
]);

const lineCommon = style([
    sprinkles({
        flex: 1,
    }),
    {
        selectors: {
            [`${timeline.horizontal} &`]: {
                height: 2,
            },
            [`${timeline.vertical} &`]: {
                width: 2,
            },
            [`${timelineItem}:last-child &`]: {
                display: 'none',
            },
        },
    },
]);

export const line = styleVariants({
    default: [lineCommon, {backgroundColor: vars.colors.barTrack}],
    inverse: [lineCommon, {backgroundColor: vars.colors.barTrackInverse}],
});
