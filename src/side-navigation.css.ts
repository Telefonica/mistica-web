import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';

export const root = style({
    width: 272,
    minHeight: '100vh',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    background: vars.colors.backgroundContainer,
    color: vars.colors.textPrimary,
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.08)',
    transition: 'width 0.2s ease',
    '@media': {
        [mq.touchableOnly]: {
            transition: 'none',
        },
    },
});

export const collapsed = style({
    width: 72,
});

export const logoContainer = style({
    minHeight: 72,
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
});

export const logoContainerCollapsed = style({
    justifyContent: 'center',
    padding: '0 16px',
});

export const header = style({
    padding: '0 12px 12px',
});

export const headerCollapsed = style({
    padding: '0 8px 12px',
});

export const content = style({
    flex: 1,
    overflowY: 'auto',
    padding: '0 12px',
});

export const contentCollapsed = style({
    padding: '0 8px',
});

export const footer = style({
    padding: '12px',
});

export const footerCollapsed = style({
    padding: '12px 8px',
});

export const item = style({
    paddingBottom: 4,
});

const itemInteractiveBase = {
    minHeight: 48,
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '0 12px',
    borderRadius: vars.borderRadii.container,
    color: vars.colors.textPrimary,
    textDecoration: 'none',
    transition: 'background-color 0.1s ease-in-out, color 0.1s ease-in-out',
    '@media': {
        [mq.supportsHover]: {
            ':hover': {
                background: vars.colors.backgroundContainerHover,
            },
        },
        [mq.touchableOnly]: {
            transition: 'none',
        },
    },
} as const;

export const itemInteractive = style(itemInteractiveBase);

export const itemStatic = style(itemInteractiveBase);

export const itemInteractiveCollapsed = style({
    justifyContent: 'center',
    padding: 0,
});

export const itemSelected = style({
    background: vars.colors.brandLow,
    color: vars.colors.textActivated,
    '@media': {
        [mq.supportsHover]: {
            ':hover': {
                background: vars.colors.brandLow,
            },
        },
    },
});

export const itemDisabled = style({
    opacity: 0.5,
});

export const asset = style({
    width: 24,
    minWidth: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'currentColor',
});

export const label = style({
    minWidth: 0,
    flex: 1,
});

export const right = style({
    minWidth: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.colors.chevronIndicator,
});

export const sectionPanel = style({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 4,
    paddingLeft: 16,
});

export const sectionPanelCollapsed = style({
    display: 'none',
});
