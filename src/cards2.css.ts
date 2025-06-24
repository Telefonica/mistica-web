import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {mq} from '.';

const commonContainer = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
    }),
    {
        borderRadius: 'container',
    },
]);

const displayContainer = style([
    sprinkles({
        paddingTop: 24,
        paddingRight: 24,
        paddingBottom: 32,
        paddingLeft: 24,
    }),
]);

const defaultContainer = style([
    sprinkles({
        paddingTop: 16,
        paddingBottom: 24,
        paddingRight: 16,
        paddingLeft: 16,
    }),
    {
        borderRadius: 'container',
        '@media': {
            [mq.desktopOrBigger]: {
                paddingTop: 24,
                paddingRight: 24,
                paddingBottom: 32,
                paddingLeft: 24,
            },
        },
    },
]);

const snapContainer = style([
    sprinkles({
        padding: 16,
    }),
    {
        borderRadius: 'container',
        '@media': {
            [mq.desktopOrBigger]: {
                padding: 24,
            },
        },
    },
]);

export const containerVariants = styleVariants({
    display: [commonContainer, displayContainer],
    default: [commonContainer, defaultContainer],
    snap: [commonContainer, snapContainer],
});

export const titleVariants = styleVariants({
    display: [style({lineHeight: 32})],
    default: [style({lineHeight: 24})],
    snap: [style({lineHeight: 20})],
});
