import {fallbackVar, globalStyle, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars as responsiveLayoutVars} from './responsive-layout.css';
import {sprinkles} from './sprinkles.css';

const responsiveLayoutSideMargin = fallbackVar(responsiveLayoutVars.sideMargin, '0px');

const sideMarginSpacer = {
    content: '""',
    display: 'block',
    flexShrink: 0,
    width: responsiveLayoutSideMargin,
};

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
        margin: `0 calc(${responsiveLayoutSideMargin} * -1)`,
        ':after': sideMarginSpacer,
        ':before': sideMarginSpacer,

        '@media': {
            [mq.touchableOnly]: hideScrollbar,
        },
    },
]);

export const noScrollbar = style(hideScrollbar);

globalStyle(`${scroll} > *`, {
    flexShrink: 0,
});
