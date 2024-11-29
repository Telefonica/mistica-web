import {createVar, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from '../sprinkles.css';
import * as mq from '../media-queries.css';
import {vars as skinVars} from '../skins/skin-contract.css';
import {applyAlpha} from '../utils/color';
import {iconContainerSize} from '../icon-button.css';

const horizontalPadding = 24;

export const container = sprinkles({
    position: 'relative',
    height: '100%',
});

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

export const touchable = style({
    display: 'flex',
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
});

export const touchableCardHoverOverlay = style({
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    position: 'absolute',
    backgroundColor: 'transparent',
    transition: 'background-color 0.1s ease-in-out',
    selectors: {
        [`${touchable}:active &`]: {
            backgroundColor: skinVars.colors.backgroundContainerPressed,
        },
    },
    '@media': {
        [mq.supportsHover]: {
            selectors: {
                [`${touchable}:hover &`]: {
                    backgroundColor: skinVars.colors.backgroundContainerHover,
                },
                [`${touchable}:active &`]: {
                    backgroundColor: skinVars.colors.backgroundContainerPressed,
                },
            },
        },
        [mq.touchableOnly]: {
            transition: 'none',
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

export const extra = style([sprinkles({paddingTop: 16, paddingBottom: 24, width: '100%'}), {zIndex: -1}]);

export const MIN_HEIGHT = 216;
export const minHeight = style({minHeight: MIN_HEIGHT});

export const dataCard = style([
    {
        isolation: 'isolate', // This avoids problems with some screenshot tests in webapp
    },
    sprinkles({
        position: 'relative',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    }),
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
        background: skinVars.colors.backgroundContainer,
        transition: 'background-color 0.1s ease-in-out',
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    background: skinVars.colors.backgroundAlternative,
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);

export const cardActionInverse = style([
    cardActionBase,
    {
        background: applyAlpha(skinVars.rawColors.backgroundContainer, 0.7),
        transition: 'background-color 0.1s ease-in-out',
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    background: applyAlpha(skinVars.rawColors.backgroundContainer, 0.9),
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
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

export const withPaddingTop = sprinkles({
    paddingTop: 16,
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

export const footerImage = sprinkles({alignItems: 'center', display: 'flex', paddingRight: 16});

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

export const marginRightButton = style({
    marginRight: 16,
});

const topActionsCount = createVar();

export const vars = {topActionsCount};

export const topActionsWithoutIcon = style({
    /** Move the div to match the card border, ignoring content's padding. We add one extra pixel because of border's width */
    marginRight: -17,
    marginTop: -1,
    width: `calc((${iconContainerSize.small} + 16px) * ${topActionsCount})`,

    '@media': {
        [mq.desktopOrBigger]: {
            marginRight: -25,
            marginTop: -25,
        },
    },
});

export const flexColumn = style({
    display: 'flex',
    flexDirection: 'column',
});
