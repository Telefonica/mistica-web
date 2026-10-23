import {createVar, style, styleVariants} from '@vanilla-extract/css';

const transitionEasing = 'cubic-bezier(0.77, 0, 0.175, 1)';

const duration = createVar();
const offset = createVar();

export const vars = {duration, offset};

export const isSwapped = style({});

export const wrapper = style({
    display: 'inline-grid',
    gridTemplateAreas: '"content"',
    alignItems: 'center',
    overflow: 'hidden',
});

export const align = styleVariants({
    left: {justifyItems: 'start'},
    center: {justifyItems: 'center'},
    right: {justifyItems: 'end'},
});

// The hidden content uses `visibility: hidden` so its interactive elements can't be focused. Visibility
// is transitioned too, so the content that leaves stays visible until its fade out ends. The visible
// content uses `inherit` instead of `visible`, so a nested SlideSwap inside hidden content stays hidden
const content = style({
    gridArea: 'content',
    transitionProperty: 'opacity, transform, visibility',
    transitionDuration: duration,
    transitionTimingFunction: transitionEasing,
    '@media': {
        '(prefers-reduced-motion)': {
            transitionProperty: 'opacity, visibility',
        },
    },
});

export const primaryContent = style([
    content,
    {
        opacity: 1,
        transform: 'translateY(0)',
        selectors: {
            [`${isSwapped} > &`]: {
                opacity: 0,
                transform: `translateY(calc(-1 * ${offset}))`,
                visibility: 'hidden',
            },
        },
        '@media': {
            '(prefers-reduced-motion)': {
                transform: 'none',
                selectors: {
                    [`${isSwapped} > &`]: {
                        transform: 'none',
                    },
                },
            },
        },
    },
]);

export const swappedContent = style([
    content,
    {
        opacity: 0,
        transform: `translateY(${offset})`,
        visibility: 'hidden',
        selectors: {
            [`${isSwapped} > &`]: {
                opacity: 1,
                transform: 'translateY(0)',
                visibility: 'inherit',
            },
        },
        '@media': {
            '(prefers-reduced-motion)': {
                transform: 'none',
                selectors: {
                    [`${isSwapped} > &`]: {
                        transform: 'none',
                    },
                },
            },
        },
    },
]);
