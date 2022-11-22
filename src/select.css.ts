import {style, styleVariants, createVar} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {vars as colorsVars} from './skins/skin-contract.css';

const top = createVar();
const left = createVar();
const transformOrigin = createVar();
const minWidth = createVar();
const maxHeight = createVar();

export const vars = {
    top,
    left,
    transformOrigin,
    minWidth,
    maxHeight,
};

export const optionsContainer = style([
    sprinkles({
        position: 'absolute',
        padding: 0,
        borderRadius: 8,
        background: colorsVars.colors.backgroundContainer,
    }),
    {
        margin: 0,
        listStyleType: 'none',
        top,
        left,
        minWidth,
        boxShadow:
            '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
        paddingTop: 8,
        paddingBottom: 8,
        transformOrigin,
        transition: 'opacity .03s linear,transform .12s cubic-bezier(0,0,.2,1) .15s',
        overflowY: 'auto',
        maxHeight: maxHeight ?? '416px',
    },
]);

export const optionsAnimationsVariants = styleVariants({
    show: {opacity: 1, transform: 'scale(1)'},
    hide: {opacity: 0, transform: 'scale(0)'},
});

export const actions = style([
    sprinkles({display: 'flex', flex: 1, alignItems: 'flex-end'}),
    {marginTop: 16},
]);

const selectContainerBase = style([
    sprinkles({
        position: 'relative',
    }),
    {
        outline: 0,

        '@media': {
            [mq.tabletOrSmaller]: {
                width: '100%',
            },
        },
    },
]);

export const selectContainerVariants = styleVariants({
    default: [
        selectContainerBase,
        {
            '@media': {
                [mq.desktopOrBigger]: {
                    width: 'fit-content',
                },
            },
        },
    ],
    fullWidth: [
        selectContainerBase,
        {
            '@media': {
                [mq.desktopOrBigger]: {
                    width: '100%',
                },
            },
        },
    ],
});

const selectBase = style([
    sprinkles({
        border: 'none',
        color: colorsVars.colors.textPrimary,
        backgroundColor: 'transparent', // FieldContainer gives the correct background color
        width: '100%',
        height: '100%',
    }),
    {
        fontFamily: 'inherit',
        paddingRight: 0,
        paddingLeft: 12,
        outline: 0,
        fontSize: 16,
        textOverflow: 'ellipsis',
        appearance: 'none',
    },
]);

export const selectVariants = styleVariants({
    default: [
        selectBase,
        {
            cursor: 'pointer',
        },
    ],
    disabled: [
        selectBase,
        {
            cursor: 'default',
        },
    ],
});

const selectTextBase = style([
    sprinkles({
        position: 'absolute',
        overflow: 'hidden',
        maxWidth: '100%',
        color: colorsVars.colors.textPrimary,
    }),
    {
        pointerEvents: 'none',
        left: 12 + 1, // 12 for select paddingLeft and +1 for border
        right: 48 + 1, // 48 for icon and +1 for border
        lineHeight: '20px',
        fontSize: 16,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
]);

export const selectTextVariants = styleVariants({
    default: [selectTextBase, {opacity: 1}],
    disabled: [selectTextBase, {opacity: 0.5}],
});

export const arrowDown = style([
    sprinkles({
        position: 'absolute',
        right: 16,
    }),
    {
        top: 'calc(50% - 10px)',
        pointerEvents: 'none',
    },
]);

export const menuItem = style([
    sprinkles({
        color: colorsVars.colors.textPrimary,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        height: 48,
        paddingY: 8,
        paddingX: 16,
    }),
    {
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                },
            },
        },
    },
]);

export const menuItemSelected = sprinkles({
    backgroundColor: colorsVars.colors.backgroundAlternative,
});
