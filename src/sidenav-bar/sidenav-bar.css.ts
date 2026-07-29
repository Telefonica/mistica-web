import {createVar, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from '../sprinkles.css';
import {vars as skinVars} from '../skins/skin-contract.css';

export const DEFAULT_WIDTH = 240;
export const COLLAPSED_WIDTH = 72;
export const BOXED_INSET = 8;
export const NESTING_INDENT = 24;

export const sidenavWidthVar = createVar();

export const container = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
    }),
    {
        position: 'relative',
        boxSizing: 'border-box',
        height: '100%',
        width: sidenavWidthVar,
        overflow: 'hidden',
        backgroundColor: skinVars.colors.backgroundContainer,
    },
]);

export const withRightDivider = style({
    borderRight: `1px solid ${skinVars.colors.divider}`,
});

export const boxed = style({
    margin: BOXED_INSET,
    height: `calc(100% - ${BOXED_INSET * 2}px)`,
    borderRadius: skinVars.borderRadii.popup,
    border: `1px solid ${skinVars.colors.border}`,
});

// Header region ---------------------------------------------------------------

export const header = style({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
    padding: '24px 24px 24px 20px',
    backgroundColor: skinVars.colors.background,
});

export const headerCollapsed = style({
    justifyContent: 'center',
    paddingLeft: 24,
    paddingRight: 24,
});

export const logo = style({
    display: 'flex',
    alignItems: 'center',
    width: 40,
    height: 40,
});

export const headerSlot = style({
    marginLeft: 24,
    minWidth: 0,
    flex: 1,
});

// Body region -----------------------------------------------------------------

export const body = style({
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
});

// Footer region ---------------------------------------------------------------

export const footer = style({
    flexShrink: 0,
    paddingTop: 8,
    backgroundColor: skinVars.colors.background,
});

// Section ---------------------------------------------------------------------

export const section = style({
    display: 'flex',
    flexDirection: 'column',
});

export const sectionTitle = style({
    padding: '0 16px',
    marginBottom: 8,
});

export const sectionDivider = style({
    marginTop: 8,
    marginBottom: 8,
});

// Item ------------------------------------------------------------------------

export const itemIndentVar = createVar();

export const itemRow = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    paddingLeft: itemIndentVar,
});

export const selectedIndicator = style({
    flexShrink: 0,
    width: 2,
    height: 20,
    borderRadius: 2,
    backgroundColor: skinVars.colors.controlActivated,
});

export const selectedIndicatorPlaceholder = style({
    flexShrink: 0,
    width: 2,
    height: 20,
});

export const itemTouchable = style({
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 0,
    height: 44,
    padding: '0 8px',
    borderRadius: 8,
    color: skinVars.colors.textPrimary,
    backgroundColor: 'transparent',
    selectors: {
        '&:hover': {backgroundColor: skinVars.colors.backgroundContainerHover},
        '&:active': {backgroundColor: skinVars.colors.backgroundContainerPressed},
    },
});

export const itemTouchableCollapsed = style({
    justifyContent: 'center',
});

export const itemTouchableSelected = styleVariants({
    true: {
        backgroundColor: skinVars.colors.backgroundSelected,
        selectors: {
            '&:hover': {backgroundColor: skinVars.colors.backgroundSelectedHover},
            '&:active': {backgroundColor: skinVars.colors.backgroundSelectedPressed},
        },
    },
    false: {},
});

export const itemAsset = style({
    display: 'flex',
    flexShrink: 0,
    width: 20,
    height: 20,
});

export const itemLabel = style({
    flex: 1,
    minWidth: 0,
});

export const itemRightSlot = style({
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
});

export const itemChevron = style({
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    width: 16,
    height: 16,
    color: skinVars.colors.neutralHigh,
});

export const nestedList = style({
    display: 'flex',
    flexDirection: 'column',
});
