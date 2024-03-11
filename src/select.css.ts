import {style, styleVariants, createVar} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {vars as skinVars} from './skins/skin-contract.css';
import {
    desktopFontSize,
    fieldEndIconGap,
    fieldLeftPadding,
    fieldRightPadding,
    inputLineHeight,
    mobileFontSize,
} from './text-field-base.css';
import {pxToRem} from './utils/css';

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

/** Must be equal or higher than the dialog's z-index */
const OPTIONS_ZINDEX = 26;

export const chevronSize = pxToRem(20);

export const optionsContainer = style([
    sprinkles({
        position: 'fixed',
        padding: 0,
        borderRadius: skinVars.borderRadii.input,
        background: skinVars.colors.backgroundContainer,
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
        zIndex: OPTIONS_ZINDEX,
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
        cursor: 'pointer',
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
        overflow: 'hidden',
        color: skinVars.colors.textPrimary,
        background: 'transparent', // FieldContainer gives the correct background color
        width: '100%',
        paddingY: 0,
    }),
    {
        fontFamily: 'inherit',
        paddingRight: `calc(${chevronSize} + ${fieldEndIconGap}px + ${fieldRightPadding}px)`,
        paddingLeft: fieldLeftPadding,
        outline: 0,
        textOverflow: 'ellipsis',
        appearance: 'none',

        lineHeight: inputLineHeight,
        fontSize: desktopFontSize,
        '@media': {
            [mq.tabletOrSmaller]: {
                fontSize: mobileFontSize,
            },
        },
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
        color: skinVars.colors.textPrimary,
    }),
    {
        pointerEvents: 'none',
        top: 1, // for border
        left: fieldLeftPadding + 1, // +1 for border
        right: `calc(${chevronSize} + ${fieldEndIconGap}px + ${fieldRightPadding}px + 1px)`, // icon width and +1 for border
        lineHeight: inputLineHeight,
        fontSize: desktopFontSize,
        '@media': {
            [mq.tabletOrSmaller]: {
                fontSize: mobileFontSize,
            },
        },
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
    }),
    {
        right: fieldRightPadding,
        top: `calc(50% - ${chevronSize} / 2)`,
        pointerEvents: 'none',
    },
]);

export const menuItem = style([
    sprinkles({
        color: skinVars.colors.textPrimary,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        paddingY: 8,
        paddingX: 16,
    }),
    {
        height: pxToRem(48),
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
    background: skinVars.colors.backgroundAlternative,
});
