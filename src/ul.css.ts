import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

const verticalGap = 8;
const desktopVerticalGap = 16;

export const ul = style({
    display: 'block',
    margin: 0,
    padding: 0,

    selectors: {
        'li &': {
            paddingTop: verticalGap,
            '@media': {
                [mq.desktopOrBigger]: {
                    paddingTop: desktopVerticalGap,
                },
            },
        },
    },
});

export const liWithCustomIcon = style({
    display: 'flex',
    alignItems: 'flex-start',
    paddingLeft: 8,
    paddingBottom: verticalGap,
    '@media': {
        [mq.desktopOrBigger]: {
            paddingLeft: 16,
            paddingBottom: desktopVerticalGap,
        },
    },
    ':last-child': {
        paddingBottom: 0,
    },
});

export const liWithoutMarker = style({
    display: 'flex',
    alignItems: 'flex-start',
    paddingLeft: 'calc(16px + 1em)',
    paddingBottom: verticalGap,
    '@media': {
        [mq.desktopOrBigger]: {
            paddingLeft: 'calc(32px + 1em)',
            paddingBottom: desktopVerticalGap,
        },
    },
    ':last-child': {
        paddingBottom: 0,
    },
});

export const li = style({
    marginLeft: 24,
    paddingBottom: verticalGap,
    '@media': {
        [mq.desktopOrBigger]: {
            marginLeft: 32,
            paddingLeft: 8,
            paddingBottom: desktopVerticalGap,
        },
    },
    ':last-child': {
        paddingBottom: 0,
    },

    selectors: {
        'ol ol > &': {
            listStyleType: 'lower-alpha',
        },
        'ol ol ol > &': {
            listStyleType: 'lower-roman',
        },
    },
});

export const content = style({
    selectors: {
        [`${liWithCustomIcon} &`]: {
            flex: 1,
        },
    },
});
