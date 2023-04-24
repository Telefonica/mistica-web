import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';
import * as skin from './skins/skin-contract.css';

export const desktopContainer = sprinkles({
    borderRadius: skin.vars.borderRadii.legacyDisplay,
    display: 'flex',
    justifyContent: 'space-between',
});

export const desktopContent = style({
    '@media': {
        [mq.desktopOrBigger]: {
            width: '50%',
        },
    },
});

export const container = style([
    sprinkles({
        display: 'flex',
        height: '100%',
        width: '100%',
    }),
    {
        margin: 'auto',
    },
]);

export const innerContainer = style({
    textAlign: 'left',
    padding: '64px 8px 16px',
    zIndex: 1, // needed to support hack for o2-classic
    position: 'relative', // needed to support hack for o2-classic
});

export const feedbackDataAppear = style({opacity: 0, transform: 'translate(0, 20px)'});

export const feedbackDataAppearActive = style({
    transitionProperty: 'opacity, transform',
    transitionDuration: '0.8s',
    transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    transitionDelay: '0.6s',
    opacity: 1,
    transform: 'translate(0, 0)',
});

export const feedbackData = style({
    maxWidth: 496,
    overflowWrap: 'break-word',
});
