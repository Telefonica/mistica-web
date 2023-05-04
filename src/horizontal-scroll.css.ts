import {fallbackVar, globalStyle, style} from '@vanilla-extract/css';
import {vars as responsiveLayoutVars} from './responsive-layout.css';
import {sprinkles} from './sprinkles.css';

const responsiveLayoutSideMargin = fallbackVar(responsiveLayoutVars.sideMargin, '0px');

const sideMarginSpacer = {
    content: '""',
    display: 'block',
    flexShrink: 0,
    width: responsiveLayoutSideMargin,
};

export const scroll = style([
    sprinkles({
        display: 'flex',
    }),
    {
        scrollbarWidth: 'none', // Hide scrollbar in FF
        '::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar in Chrome/Safari
        },
        margin: `0 calc(${responsiveLayoutSideMargin} * -1)`,
        ':after': sideMarginSpacer,
        ':before': sideMarginSpacer,
    },
]);

globalStyle(`${scroll} > *`, {
    flexShrink: 0,
});
