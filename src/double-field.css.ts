import {styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';
import {DEFAULT_WIDTH} from './text-field-components';

const container = sprinkles({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
});

export const variants = styleVariants({
    default: [
        container,
        {
            [mq.desktopOrBigger]: {
                width: DEFAULT_WIDTH,
            },
        },
    ],
    fullWidth: [
        container,
        {
            [mq.desktopOrBigger]: {
                width: '100%',
            },
        },
    ],
});
