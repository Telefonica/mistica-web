import {style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import {screenReaderOnlyStyles} from './screen-reader-only.css';

export const skipLinkContainer = style([
    sprinkles({
        background: vars.colors.backgroundContainer,
        border: 'regular',
        borderRadius: vars.borderRadii.container,
        padding: 8,
        position: 'absolute',
        top: 0,
        left: 0,
    }),
    {
        width: 'fit-content',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        opacity: 1,
        transition: 'opacity 0.15s ease-in-out',
        selectors: {
            '&:not(:focus-within)': {
                ...screenReaderOnlyStyles,
                opacity: 0,
            },
        },
    },
]);

export const skipLinkList = style({
    listStyle: 'none',
    padding: 0,
    margin: 0,
});
