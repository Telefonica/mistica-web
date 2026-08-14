import {createVar, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from '../sprinkles.css';
import {vars as skinVars} from '../skins/skin-contract.css';

export const DEFAULT_WIDTH = 240;
export const COLLAPSED_WIDTH = 72;
export const BOXED_INSET = 8;
// Per-level nesting step applied as the item row's left padding. It combines with the item content
// box's own 8px left margin (which clears the selected indicator on the rail) so a nested item's
// content box lands 24px from the section rail — the total nesting indent the Figma spec calls for
// (16 + 8). Using the full 24 here would double-count the 8px margin and over-indent children.
export const NESTING_INDENT = 16;
export const LOGO_SIZE = 32;
// Vertical space between two first-level entries of the body (section to section, section to
// stand-alone item, or stand-alone item to stand-alone item). Items inside a section stay adjacent.
export const FIRST_LEVEL_GAP = 16;

export const sidenavWidthVar = createVar();
export const sidenavPanelWidthVar = createVar();

// The container is a row of columns: the main column, and the double panel column when it is open. Its
// width is intrinsic, so an open panel widens the sidenav and pushes the main content of the layout.
export const container = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'row',
    }),
    {
        position: 'relative',
        boxSizing: 'border-box',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: skinVars.colors.backgroundContainer,
    },
]);

// The column that carries the header, the body, and the footer regions.
export const mainColumn = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
    }),
    {
        position: 'relative',
        boxSizing: 'border-box',
        height: '100%',
        width: sidenavWidthVar,
        flexShrink: 0,
        minWidth: 0,
    },
]);

// Same reasoning as `boxed`: the container's `overflow: hidden` clips a negatively-offset outline,
// so the divider barely shows. Only the right edge is relevant for a full-height bar, so a plain
// right border renders it reliably without being clipped.
export const withRightDivider = style({
    borderRight: `1px solid ${skinVars.colors.divider}`,
});

// A real border (not an inset outline) is used here: the container has `overflow: hidden`, which
// clips a negatively-offset outline and leaves the box edge barely visible. A border on the
// border-box renders on all four sides while children stay clipped to the rounded corners.
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
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
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

// List of first-level entries (sections and stand-alone items). It owns the space between the
// entries, so the scroll sentinels and the footer, which are siblings of this list, stay untouched.
export const bodyContent = style({
    display: 'flex',
    flexDirection: 'column',
    gap: FIRST_LEVEL_GAP,
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

// Collapsed: the title is hidden, but it still reserves its space, so the items of a section keep the
// same vertical rhythm in both states. The title text truncates to one line (see the `truncate` prop
// in the component), because the 72px collapsed bar would otherwise reserve several lines.
export const sectionTitleCollapsed = style({
    visibility: 'hidden',
});

// The rail that carries the items of a section. A first-level stand-alone item reuses it, so that
// it lands on the same rail as the items that belong to a section (see `standaloneItem`).
// Horizontal insets are asymmetric by design: the left rail (8px) hosts the selected indicator, and
// each item's content box adds a further 8px left margin (16px total), while the right side takes a
// flat 8px. This yields the Figma insets: 16px on the left, 8px on the right.
export const sectionContent = style({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 8,
    paddingRight: 8,
});

// A stand-alone item is not wrapped in a section, so it carries the items rail itself.
export const standaloneItem = sectionContent;

// The dividers sit outside `sectionContent`, so they span the whole sidenav width, and the Figma
// anatomy order is: top divider, 8px, section title, 8px, items, 8px, bottom divider.
export const sectionDivider = style({
    marginTop: 8,
    marginBottom: 8,
});

export const sectionDividerHidden = style({
    display: 'none',
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

export const itemTouchableMobile = style({
    height: 48,
});

export const itemTouchableCollapsed = style({
    justifyContent: 'center',
    flex: 'none',
    width: 36,
    margin: '0 auto',
    padding: '0 8px',
    border: 'none',
    lineHeight: 1,
    textDecoration: 'none',
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
    backgroundColor: 'transparent',
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

// The second column of the sidenav. It holds the children of the open parent item, spans the whole
// height of the sidenav, and scrolls on its own. Its horizontal inset (8px) is the same as the items
// rail of a section, so the children land on the same rail as the items of the main column.
export const doublePanelColumn = style({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: sidenavPanelWidthVar,
    height: '100%',
    flexShrink: 0,
    overflowY: 'auto',
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 8,
    paddingRight: 8,
});

// The panel's own 8px inset plus these 8px place the title 16px from the panel edge, which is the
// x-padding of a section title. The 16px bottom margin is the title-to-items gap of the spec.
export const doublePanelTitle = style({
    padding: '0 8px',
    marginBottom: 16,
});

// Separates the main column from the double panel column. It renders whenever the panel is open, even
// when the sidenav hides its right divider, because the two columns always need a visible boundary.
export const columnSeparator = styleVariants({
    default: {borderRight: `1px solid ${skinVars.colors.divider}`},
    brand: {borderRight: `1px solid ${skinVars.colors.dividerBrand}`},
    alternative: {borderRight: `1px solid ${skinVars.colors.divider}`},
    negative: {borderRight: `1px solid ${skinVars.colors.dividerNegative}`},
    media: {borderRight: `1px solid ${skinVars.colors.dividerNegative}`},
});

// Mobile -----------------------------------------------------------------------

export const MOBILE_TOP_BAR_HEIGHT = 56;
export const MOBILE_BOTTOM_BAR_HEIGHT = 48;

export const mobileContainer = style({
    position: 'fixed',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none',
    zIndex: 100,
});

export const mobileTopBar = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: MOBILE_TOP_BAR_HEIGHT,
    zIndex: 100,
    backgroundColor: skinVars.colors.background,
    borderBottom: `1px solid ${skinVars.colors.divider}`,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    gap: 24,
    pointerEvents: 'auto',
});

export const mobileTopBarControls = style({
    display: 'flex',
    gap: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
});

export const mobilePanelOverlay = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'none',
    pointerEvents: 'auto',
    selectors: {
        '&[data-open="true"]': {
            display: 'block',
        },
    },
});

export const mobilePanel = style({
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: skinVars.colors.backgroundContainer,
    overflowY: 'auto',
    zIndex: 101,
    marginTop: MOBILE_TOP_BAR_HEIGHT,
    paddingTop: 24,
    pointerEvents: 'auto',
});

export const mobilePanelHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    paddingLeft: 8,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 16,
    height: 'auto',
    minHeight: 44,
});

export const mobilePanelHeaderTitle = style({
    flex: 1,
    textAlign: 'left',
});

export const mobilePanelContent = style({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 8,
    paddingRight: 8,
});
