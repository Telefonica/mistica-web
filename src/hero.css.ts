import {createVar, fallbackVar, style, styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';
import {vars as responsiveLayoutVars} from './responsive-layout.css';
import {vars as skinVars} from './skins/skin-contract.css';

const height = createVar();

export const vars = {height};
const responsiveLayoutSideMargin = fallbackVar(responsiveLayoutVars.sideMargin, '0px');

export const container = style([
    sprinkles({display: 'flex'}),
    {
        height,
    },
]);

export const containerMinHeight = style({
    minHeight: 400,
    '@media': {
        [mq.desktopOrBigger]: {
            minHeight: 460,
        },
    },
});

export const containerMobile = sprinkles({flexDirection: 'column'});

export const containerDesktop = sprinkles({alignItems: 'center', height: '100%'});

export const actions = style([
    sprinkles({display: 'flex', flex: 1, alignItems: 'flex-end'}),
    {marginTop: 24},
]);

export const layout = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },
    },
});

export const contentContainer = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            width: 'auto',
            margin: `0 ${responsiveLayoutSideMargin}`,
        },
    },
});

export const expandedContent = style({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
});

export const contentWrapper = style([
    expandedContent,
    {
        width: 'auto',
        margin: `0 calc(-1 * ${responsiveLayoutSideMargin})`,
    },
]);

export const containerBackground = styleVariants({
    default: {
        background: skinVars.colors.background,
    },
    alternative: {
        background: skinVars.colors.backgroundAlternative,
    },
    brand: {
        background: skinVars.colors.backgroundBrand,
    },
    'brand-secondary': {
        background: skinVars.colors.backgroundBrandSecondary,
    },
    none: {
        background: 'transparent',
    },
});
