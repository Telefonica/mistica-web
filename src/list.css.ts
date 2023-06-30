import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const disabled = style({
    opacity: 0.5,
});

export const hoverBackground = style({
    '@media': {
        [mq.supportsHover]: {
            ':hover': {
                background: vars.colors.backgroundAlternative,
            },
        },
    },
});

export const pointer = sprinkles({cursor: 'pointer'});

export const rowContent = sprinkles({width: '100%', border: 'none', background: 'transparent', padding: 0});

export const content = sprinkles({
    display: 'flex',
    width: '100%',
    minHeight: 72,
});

export const asset = sprinkles({
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
});

export const rowBody = sprinkles({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
});

export const center = sprinkles({
    display: 'flex',
    alignItems: 'center',
});

export const badge = sprinkles({
    justifyContent: 'center',
    minWidth: 16,
    height: '100%',
    flexShrink: 0,
});

export const control = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 0,
        flexShrink: 0,
    }),
    {
        marginLeft: 16,
    },
]);

export const right = style({display: 'flex', marginLeft: 16, maxWidth: '40%'});

export const detailRight = style({paddingLeft: 8});
export const detail = style({textAlign: 'right'});

export const centeredControl = sprinkles({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
});

export const dualActionContainer = sprinkles({
    display: 'flex',
    flexDirection: 'row',
});

const dualActionBase = sprinkles({padding: 0, border: 'none', background: 'transparent'});

export const dualActionLeft = style([
    dualActionBase,
    sprinkles({
        display: 'block',
        flexGrow: 1,
        paddingX: 16,
    }),
]);

export const dualActionDivider = style([
    sprinkles({display: 'flex'}),
    {
        margin: '16px 0',
        borderLeft: `1px solid ${vars.colors.divider}`,
    },
]);

export const dualActionRight = style([
    dualActionBase,
    sprinkles({
        paddingX: 16,
        display: 'flex',
        alignItems: 'center',
        flexGrow: 0,
        width: 'auto',
        height: '100%',
    }),
    {
        lineHeight: 0,
    },
]);
