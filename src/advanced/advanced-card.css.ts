import {style} from '@vanilla-extract/css';
import {sprinkles} from '../sprinkles.css';
import * as mq from '../media-queries.css';

export const actions = style([
    sprinkles({display: 'flex', flex: 1, justifyContent: 'space-between'}),
    {marginTop: 16},
]);

export const footerText = style([
    {
        height: '40px',
        width: '100%',
        flex: '1',
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'center',
    },
]);

export const boxed = style([
    sprinkles({display: 'flex'}),
    {
        isolation: 'isolate', // Needed to preserve border-radius with Video component and Safari
    },
]);

export const dataCard = style([
    sprinkles({
        display: 'flex',
        flex: 1,
        paddingTop: 8,
        paddingBottom: 24,
        paddingX: 16,
        flexDirection: 'column',
        width: '100%',
    }),
    {
        '@media': {
            [mq.desktopOrBigger]: {
                paddingTop: 32,
                paddingBottom: 32,
                paddingLeft: 24,
                paddingRight: 24,
            },
        },
    },
]);
