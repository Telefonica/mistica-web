import {style, createVar, styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';

const width = createVar();

export const vars = {width};

export const container = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexShrink: 0,
    }),
    {
        alignSelf: 'stretch',
    },
]);

export const touchableContainer = sprinkles({
    display: 'flex',
    flexShrink: 0,
    border: 'none',
    padding: 0,
    width: '100%',
});

export const imageContent = style([
    sprinkles({
        display: 'flex',
    }),

    {
        width: 100,
        minWidth: 100,
        height: 'inherit',
    },
]);

const textContainerBase = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 16,
    }),
    {
        '@media': {
            [mq.desktopOrBigger]: {
                paddingTop: 32,
                paddingBottom: 32,
                paddingLeft: 24,
            },
        },
    },
]);

export const textContainerVariant = styleVariants({
    withImage: [
        textContainerBase,
        {
            paddingRight: 8,
            '@media': {
                [mq.desktopOrBigger]: {
                    paddingRight: 24,
                },
            },
        },
    ],
    withoutImage: [
        textContainerBase,
        {
            paddingRight: 56,
        },
    ],
});
