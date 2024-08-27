import {keyframes, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

export const desktopContainer = style({
    '@media': {
        [mq.desktopOrBigger]: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    },
});

export const desktopContent = style({
    '@media': {[mq.desktopOrBigger]: {width: '50%'}},
});

export const desktopImage = style({
    '@media': {[mq.tabletOrSmaller]: {display: 'none'}},
});

export const container = style([
    sprinkles({
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
    }),
    {
        margin: 'auto',
    },
]);

export const innerContainer = style({
    textAlign: 'left',
    padding: '64px 0px 16px',
    zIndex: 1, // needed to support hack for o2-classic
    position: 'relative', // needed to support hack for o2-classic
    display: 'flex',
    flexDirection: 'column',
});

export const innerContainerWithButtons = style({
    '@media': {
        [mq.desktopOrBigger]: {
            paddingBottom: 40,
        },
    },
});

export const assetContainer = sprinkles({
    width: 48,
    height: 48,
});

const textAppearAnimation = keyframes({
    from: {
        opacity: 0,
        transform: 'translateY(24px)',
    },
    to: {
        opacity: 1,
        transform: 'translateY(0)',
    },
});

const textAppearAnimationDesktop = keyframes({
    from: {
        opacity: 0,
        transform: 'translateY(40px)',
    },
    to: {
        opacity: 1,
        transform: 'translateY(0)',
    },
});

const feedbackTextAppear = style({
    animation: `${textAppearAnimation} 1s cubic-bezier(0.215, 0.61, 0.355, 1)`,
    animationFillMode: 'both',
    '@media': {
        [mq.desktopOrBigger]: {
            animationName: textAppearAnimationDesktop,
        },
    },
});

export const feedbackTextAppearFast = style([feedbackTextAppear, {animationDelay: '0.6s'}]);
export const feedbackTextAppearMedium = style([feedbackTextAppear, {animationDelay: '0.8s'}]);
export const feedbackTextAppearSlow = style([feedbackTextAppear, {animationDelay: '1s'}]);

export const feedbackData = style({
    maxWidth: 496,
    overflowWrap: 'break-word',
});

export const backgroundBrand = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            background: vars.colors.backgroundBrand,
        },
    },
});
