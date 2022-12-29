import {styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';
import {DEFAULT_WIDTH} from './text-field-components.css';

const container = sprinkles({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
});

export const variants = styleVariants({
    default: [
        container,
        {
            '@media': {
                [mq.desktopOrBigger]: {
                    width: DEFAULT_WIDTH,
                },
            },
        },
    ],
    fullWidth: [
        container,
        {
            '@media': {
                [mq.desktopOrBigger]: {
                    width: '100%',
                },
            },
        },
    ],
});
