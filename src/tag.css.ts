import {style} from '@vanilla-extract/css';

export const tag = style({
    display: 'inline-flex',
    verticalAlign: 'middle',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    minWidth: 56,
    padding: '4px 12px 4px 12px',
});

export const withIcon = style({
    paddingLeft: 8,
});
