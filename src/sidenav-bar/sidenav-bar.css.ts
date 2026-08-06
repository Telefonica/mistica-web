import {createVar, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from '../sprinkles.css';
import {vars as skinVars} from '../skins/skin-contract.css';

export const DEFAULT_WIDTH = 240;
export const COLLAPSED_WIDTH = 72;
export const BOXED_INSET = 8;
export const NESTING_INDENT = 24;
export const LOGO_SIZE = 40;

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

// The 24px inset above the logo belongs to the header, not to the container: `background` and
// `backgroundContainer` are the same in light mode but differ in dark, so painting that strip
// with the container token would detach the header band from the top of the sidenav.
export const headerBase = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 32,
    flexShrink: 0,
    paddingTop: 24,
    paddingBottom: 24,
});

export const header = styleVariants({
    default: {backgroundColor: skinVars.colors.background},
    brand: {backgroundColor: skinVars.colors.backgroundBrandTop},
    alternative: {backgroundColor: skinVars.colors.background},
    negative: {backgroundColor: skinVars.colors.backgroundNegative},
    media: {backgroundColor: skinVars.colors.backgroundNegative},
});

export const headerBoxed = styleVariants({
    default: {backgroundColor: skinVars.colors.backgroundContainer},
    brand: {backgroundColor: skinVars.colors.backgroundContainerBrand},
    alternative: {backgroundColor: skinVars.colors.backgroundContainerAlternative},
    negative: {backgroundColor: skinVars.colors.backgroundContainerNegative},
    media: {backgroundColor: skinVars.colors.backgroundContainerNegative},
});

export const headerCollapsed = style({
    gap: 8,
});

// The logo and the collapse control stack, both 32px wide. Their left edge is placed with
// explicit padding rather than by centering, so that it stays at 20px in both states
// regardless of the right divider border and of whether the consumer loads css/reset.css.
export const headerControls = style({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 24,
});

export const headerControlsCollapsed = style({
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 12,
});

export const logo = style({
    display: 'flex',
    alignItems: 'center',
    width: LOGO_SIZE,
    height: LOGO_SIZE,
});

export const headerSlot = style({
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 0,
    paddingLeft: 24,
    paddingRight: 24,
});

export const headerSlotCollapsed = style({});

// Body region -----------------------------------------------------------------

export const bodyBase = style({
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
});

export const body = styleVariants({
    default: {backgroundColor: skinVars.colors.backgroundContainer},
    brand: {backgroundColor: 'transparent'},
    alternative: {backgroundColor: skinVars.colors.backgroundContainerAlternative},
    negative: {backgroundColor: skinVars.colors.backgroundContainerNegative},
    media: {backgroundColor: skinVars.colors.backgroundContainerNegative},
});

// Without a header, the body owns the 24px top inset instead.
export const bodyWithoutHeader = style({
    paddingTop: 24,
});

// Scroll-intersection divider (appears when content scrolls past header/footer)
export const scrollDivider = style({
    height: 1,
    flexShrink: 0,
    pointerEvents: 'none',
    position: 'sticky',
    zIndex: 1,
});

export const headerScrollDivider = style({
    top: 0,
});

export const footerScrollDivider = style({
    bottom: 0,
});

export const scrollDividerVariant = styleVariants({
    default: {backgroundColor: skinVars.colors.divider},
    brand: {backgroundColor: skinVars.colors.dividerBrand},
    alternative: {backgroundColor: skinVars.colors.divider},
    negative: {backgroundColor: skinVars.colors.dividerNegative},
    media: {backgroundColor: skinVars.colors.dividerNegative},
});

// Footer region ---------------------------------------------------------------

export const footerBase = style({
    flexShrink: 0,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
});

export const footer = styleVariants({
    default: {backgroundColor: skinVars.colors.background},
    brand: {backgroundColor: skinVars.colors.backgroundBrandTop},
    alternative: {backgroundColor: skinVars.colors.background},
    negative: {backgroundColor: skinVars.colors.backgroundNegative},
    media: {backgroundColor: skinVars.colors.backgroundNegative},
});

export const footerBoxed = styleVariants({
    default: {backgroundColor: skinVars.colors.backgroundContainer},
    brand: {backgroundColor: skinVars.colors.backgroundContainerBrand},
    alternative: {backgroundColor: skinVars.colors.backgroundContainerAlternative},
    negative: {backgroundColor: skinVars.colors.backgroundContainerNegative},
    media: {backgroundColor: skinVars.colors.backgroundContainerNegative},
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

export const sectionContent = style({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 8,
    paddingRight: 8,
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

export const itemTouchable = style({
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 0,
    height: 44,
    padding: '0 8px',
    marginLeft: 8,
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
    flex: 'none',
    width: 'auto',
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

export const itemAccent = style({
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 2,
    height: 20,
    borderRadius: 8,
    backgroundColor: skinVars.colors.controlActivated,
    pointerEvents: 'none',
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

// Panel (Dialog and Double Panel) -----------------------------------------------

export const panelOverlay = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: 'auto',
    backgroundColor: 'rgba(0,0,0,0.1)',
});

export const dialogPanel = style({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: skinVars.colors.backgroundContainer,
    borderRadius: skinVars.borderRadii.popup,
    border: `1px solid ${skinVars.colors.border}`,
    minWidth: DEFAULT_WIDTH,
    maxHeight: '70vh',
    overflowY: 'auto',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
    position: 'relative',
    zIndex: 1001,
});

export const dialogPanelTitle = style({
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
});

export const doublePanel = style({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: skinVars.colors.backgroundContainer,
    borderRight: `1px solid ${skinVars.colors.divider}`,
    width: DEFAULT_WIDTH,
    height: '100%',
    overflowY: 'auto',
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 8,
    paddingRight: 8,
});
