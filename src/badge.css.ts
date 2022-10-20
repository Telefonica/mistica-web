import {style} from '@vanilla-extract/css';

const theme = {
    colors: {
        badge: 'red',
        borderLight: 'white',
        textPrimaryInverse: 'white',
    },
};

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

export const container = style({
    position: 'relative',
    display: 'inline-block',
});

export const badge = style({
    top: -2,
    right: -6,
    width: 8,
    height: 8,
    background: theme.colors.badge,
    borderRadius: '50%',
    boxShadow: `0px 0px 0px 1.5px ${theme.colors.borderLight}`,
});

export const badgeWithChildren = style({
    position: 'absolute',
});

export const badgeNumber = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -8,
    right: -9,
    width: 18,
    height: 18,
    fontSize: 12,
    fontWeight: 500,
    color: theme.colors.textPrimaryInverse,
});

export const badgeBigNumber = style({
    right: -14,
    width: 24,
    borderRadius: 24,
});
