import {style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {pxToRem} from './utils/css';

export const TRANSITION_TIME_IN_MS = 300;

export const snackbar = style([
    sprinkles({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    }),
    {
        transition: `visibility ${TRANSITION_TIME_IN_MS}ms`,
        visibility: 'hidden',
    },
]);

export const snackbarOpen = style({
    visibility: 'visible',
});

export const wrapper = style([
    sprinkles({
        position: 'fixed',
        borderRadius: 8,
    }),
    {
        maxWidth: 800,
        minWidth: 360,
        minHeight: 48,
        padding: `14px 16px`,
        bottom: 24,
        zIndex: 1000, // above anything
        opacity: 0,
        transform: 'translateY(100px)',
        transition: `transform ${TRANSITION_TIME_IN_MS}ms ease-in-out, opacity ${TRANSITION_TIME_IN_MS}ms ease-in-out`,

        '@media': {
            [mq.tabletOrSmaller]: {
                left: 8,
                right: 8,
                bottom: 8,
                minWidth: 0,
            },
        },
    },
]);

export const wrapperCritical = sprinkles({backgroundColor: vars.colors.feedbackErrorBackground});
export const wrapperInfo = sprinkles({backgroundColor: vars.colors.feedbackInfoBackground});

export const wrapperOpen = style({
    opacity: 1,
    transform: 'initial',
    animationDuration: `${TRANSITION_TIME_IN_MS}ms`,
});

export const content = sprinkles({
    display: 'flex',
    justifyContent: 'space-between',
});

export const button = style({
    marginTop: -6,
    marginLeft: 16,
    marginBottom: -6,
    marginRight: -8,
    fontWeight: 500,
    fontSize: pxToRem(16),
    lineHeight: '24px',
    padding: '4px 8px',
    whiteSpace: 'nowrap',
    width: 'auto',

    '@media': {
        [mq.desktopOrBigger]: {
            marginLeft: 48,
        },
    },
});

export const longButton = style({
    marginTop: 18,
    marginLeft: 0,
    alignSelf: 'flex-end',
});

export const buttonInfo = sprinkles({color: vars.colors.textLinkSnackbar});
export const buttonCritical = sprinkles({color: vars.colors.textPrimaryInverse});
