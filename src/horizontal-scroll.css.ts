import {globalStyle, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';

const hideScrollbar = {
    scrollbarWidth: 'none', // Firefox
    '::-webkit-scrollbar': {
        display: 'none', // Safari + Chrome
    },
} as const;

export const scroll = style([
    sprinkles({
        display: 'flex',
    }),
    {
        overflowX: 'auto',
        overflowY: 'hidden',

        '@media': {
            [mq.touchableOnly]: hideScrollbar,
        },
    },
]);

export const noScrollbar = style(hideScrollbar);

globalStyle(`${scroll} > *`, {
    flexShrink: 0,
});
