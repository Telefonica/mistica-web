import {style, createVar} from '@vanilla-extract/css';
import {sprinkles} from '../sprinkles.css';

const aspectRatio = createVar();

export const vars = {aspectRatio};

export const wrapper = sprinkles({
    overflow: 'hidden',
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'relative',
});

export const container = style({
    '@supports': {
        '(aspect-ratio: 1 / 1)': {
            aspectRatio,
        },
    },
});

export const containerWithWrapper = sprinkles({
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
});
