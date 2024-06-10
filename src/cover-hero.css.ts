import {globalStyle, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {slideshowWithBullets} from './carousel.css';

export const coverHero = style([
    sprinkles({
        position: 'relative',
        isolation: 'isolate',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
    }),
]);

export const minHeight = style({
    minHeight: 400,
    '@media': {
        [mq.tabletOrBigger]: {
            minHeight: 460,
        },
    },
});

// give some extra space for the slideshow bullets
globalStyle(`${slideshowWithBullets} ${coverHero}:after`, {
    '@media': {
        [mq.mobile]: {
            display: 'block',
            content: '""',
            height: 24,
        },
    },
});

export const hasSideExtra = style({});

export const centered = style([
    sprinkles({
        alignItems: 'center',
    }),
    {
        textAlign: 'center',
        selectors: {
            [`${hasSideExtra}&`]: {
                '@media': {
                    [mq.tabletOrBigger]: {
                        textAlign: 'left',
                    },
                },
            },
        },
    },
]);

export const mediaLayer = sprinkles({
    position: 'absolute',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
});

export const mediaOverlay = style([
    sprinkles({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    }),
    {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
]);

export const mainContent = sprinkles({position: 'relative'});

// pretitle and description should be 6 grid columns wide, but they are already inside a grid item (the left side of GridLayout)
// so we can't adjust their width to the parent grid columns. 75% is a good approximation.
export const sixColumns = style({
    '@media': {
        [mq.tabletOrBigger]: {
            width: '75%',
            selectors: {
                [`${centered} &`]: {
                    width: '100%',
                },
            },
        },
    },
});
