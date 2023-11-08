import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from '../sprinkles.css';
import * as mq from '../media-queries.css';
import {vars} from '../skins/skin-contract.css';
import {applyAlpha} from '../utils/color';

const horizontalPadding = 24;

export const paddingX = style([
    sprinkles({
        paddingX: 16,
    }),
    {
        '@media': {
            [mq.desktopOrBigger]: {
                paddingLeft: horizontalPadding,
                paddingRight: horizontalPadding,
            },
        },
    },
]);

export const actions = style([
    paddingX,
    sprinkles({
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 24,
    }),
    {
        flexWrap: 'wrap',
        '@media': {
            [mq.tabletOrBigger]: {
                marginTop: 8,
            },
        },
    },
]);

export const touchableArea = style({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
});

export const touchableContainer = style({
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
});

export const touchable = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    width: '100%',
    position: 'relative',
    padding: 0,
    border: 'none',
    background: 'transparent',
});

export const touchableCardOverlay = style({
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    position: 'absolute',
    backgroundColor: 'transparent',
    '@media': {
        [mq.supportsHover]: {
            transition: 'background-color 0.1s ease-in-out',

            selectors: {
                [`${touchableContainer}:hover &`]: {
                    backgroundColor: vars.colors.backgroundContainerHover,
                },
                [`${touchable}:active &`]: {
                    backgroundColor: vars.colors.backgroundContainerPressed,
                },
            },
        },
    },
});

export const cardContentStyle = style([
    paddingX,
    sprinkles({
        paddingTop: 8,
        paddingBottom: 24,
    }),
    {
        '@media': {
            [mq.desktopOrBigger]: {
                paddingTop: 32,
                paddingBottom: 32,
            },
        },
    },
]);

export const zindex = style({zIndex: -1});

export const minHeight = style({minHeight: 216});

export const dataCard = style([
    {
        isolation: 'isolate', // This avoids problems with some screenshot tests in webapp
    },
    sprinkles({
        position: 'relative',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    }),
    minHeight,
]);

const cardActionBase = sprinkles({
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
});

export const cardActionIconButton = sprinkles({
    display: 'flex',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
});

export const cardAction = style([
    cardActionBase,
    {
        background: vars.colors.backgroundContainer,
        transition: 'background-color 0.2s ease-in-out',
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    background: vars.colors.backgroundAlternative,
                },
            },
        },
    },
]);

export const cardActionInverse = style([
    cardActionBase,
    {
        background: applyAlpha(vars.rawColors.backgroundContainer, 0.7),
        transition: 'background-color 0.2s ease-in-out',
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    background: applyAlpha(vars.rawColors.backgroundContainer, 0.9),
                },
            },
        },
    },
]);

export const divider = style({
    marginLeft: -horizontalPadding,
    marginRight: -horizontalPadding,
});

export const footerText = sprinkles({
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    minHeight: 40,
});

export const actionsVariants = styleVariants({
    default: [
        {
            flexDirection: 'row',
            alignItems: 'center',
        },
    ],
    mobile: [
        {
            '@media': {
                [mq.mobile]: {
                    flexDirection: 'column',
                    alignItems: 'start',
                },
            },
        },
    ],
});

export const marginRightAuto = style({
    marginTop: 8,
    '@media': {
        [mq.mobile]: {
            marginRight: 'auto',
        },
    },
});

export const button = style({
    display: 'flex',
    marginTop: 8,
});

export const buttonMobile = style([
    button,
    {
        '@media': {
            [mq.mobile]: {
                marginTop: 16,
            },
        },
    },
]);

export const footerDirection = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'row',
    }),
    {flexWrap: 'wrap'},
]);

export const adjustButtonLink = style({
    position: 'relative',
    marginLeft: -12,
    marginRight: -12,
});

export const marginRightButton = sprinkles({
    right: 16,
});
