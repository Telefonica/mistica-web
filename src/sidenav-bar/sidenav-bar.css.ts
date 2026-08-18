import {createVar, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from '../sprinkles.css';
import {vars as skinVars} from '../skins/skin-contract.css';

import type {NonDeprecatedVariant} from '../theme-variant-context';

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
// The second column always takes the `width` of the expanded sidenav, so it needs its own variable: the
// variable above carries the width of the collapsed rail while the sidenav is collapsed.
export const sidenavPanelWidthVar = createVar();

// Tokens ----------------------------------------------------------------------

// The spec paints the header, the body and the footer of every variant with the `sideNavBackgroundContainer`
// family (one member per variant, boxed or not).
// todo WIP The family carries no `sideNavBackgroundContainerAlternative`, so the alternative variant keeps
//  `backgroundContainerAlternative` until the design tokens add that member.
const sideNavBackgroundContainer: Record<NonDeprecatedVariant, string> = {
    default: skinVars.colors.sideNavBackgroundContainer,
    brand: skinVars.colors.sideNavBackgroundContainerBrand,
    alternative: skinVars.colors.backgroundContainerAlternative,
    negative: skinVars.colors.sideNavBackgroundContainerNegative,
    media: skinVars.colors.sideNavBackgroundContainerMedia,
};

// TODO WIP The spec gives the hovered and the pressed item of the media variant
// `backgroundContainerNegativeHover` and `backgroundContainerNegativePressed`, and the selected item the
// `backgroundContainerSelected` family. Neither group reached the skin contract yet, so the brand container
// states and the negative selected states stand in for them.
const backgroundContainerNegativeHover = skinVars.colors.backgroundContainerBrandHover;
const backgroundContainerNegativePressed = skinVars.colors.backgroundContainerBrandPressed;
const backgroundContainerSelected = skinVars.colors.backgroundSelectedNegative;
const backgroundContainerSelectedHover = skinVars.colors.backgroundSelectedNegativeHover;
const backgroundContainerSelectedPressed = skinVars.colors.backgroundSelectedNegativePressed;

// Every divider of the sidenav (the right divider, the two overscroll dividers, the section dividers and the
// separator of the double panel column) takes the same token for a given variant.
const dividerColor: Record<NonDeprecatedVariant, string> = {
    default: skinVars.colors.divider,
    brand: skinVars.colors.dividerBrand,
    alternative: skinVars.colors.divider,
    negative: skinVars.colors.dividerNegative,
    media: skinVars.colors.dividerNegative,
};

const sectionTitleColor: Record<NonDeprecatedVariant, string> = {
    default: skinVars.colors.textSecondary,
    brand: skinVars.colors.textSecondaryBrand,
    alternative: skinVars.colors.textSecondary,
    negative: skinVars.colors.textSecondaryNegative,
    media: skinVars.colors.textSecondaryNegative,
};

type ItemColors = {
    label: string;
    asset: string;
    chevron: string;
    indicator: string;
    hover: string;
    pressed: string;
    selected: string;
    selectedHover: string;
    selectedPressed: string;
};

// The resting background of an item is transparent in every variant, so the region behind it shows through.
const itemColors: Record<NonDeprecatedVariant, ItemColors> = {
    default: {
        label: skinVars.colors.textPrimary,
        asset: skinVars.colors.neutralHigh,
        chevron: skinVars.colors.chevronIndicator,
        indicator: skinVars.colors.controlActivated,
        hover: skinVars.colors.backgroundContainerHover,
        pressed: skinVars.colors.backgroundContainerPressed,
        selected: skinVars.colors.backgroundSelected,
        selectedHover: skinVars.colors.backgroundSelectedHover,
        selectedPressed: skinVars.colors.backgroundSelectedPressed,
    },
    brand: {
        label: skinVars.colors.textPrimaryBrand,
        asset: skinVars.colors.neutralHighBrand,
        chevron: skinVars.colors.neutralHighBrand,
        indicator: skinVars.colors.controlActivatedBrand,
        hover: skinVars.colors.backgroundContainerBrandHover,
        pressed: skinVars.colors.backgroundContainerBrandPressed,
        selected: skinVars.colors.backgroundSelectedBrand,
        selectedHover: skinVars.colors.backgroundSelectedBrandHover,
        selectedPressed: skinVars.colors.backgroundSelectedBrandPressed,
    },
    alternative: {
        label: skinVars.colors.textPrimary,
        asset: skinVars.colors.neutralHigh,
        chevron: skinVars.colors.chevronIndicator,
        indicator: skinVars.colors.controlActivated,
        hover: skinVars.colors.backgroundContainerHover,
        pressed: skinVars.colors.backgroundContainerPressed,
        selected: skinVars.colors.backgroundSelected,
        selectedHover: skinVars.colors.backgroundSelectedHover,
        selectedPressed: skinVars.colors.backgroundSelectedPressed,
    },
    negative: {
        label: skinVars.colors.textPrimaryNegative,
        asset: skinVars.colors.neutralHighNegative,
        chevron: skinVars.colors.neutralHighNegative,
        indicator: skinVars.colors.controlActivatedNegative,
        hover: skinVars.colors.backgroundContainerBrandHover,
        pressed: skinVars.colors.backgroundContainerBrandPressed,
        selected: skinVars.colors.backgroundSelectedNegative,
        selectedHover: skinVars.colors.backgroundSelectedNegativeHover,
        selectedPressed: skinVars.colors.backgroundSelectedNegativePressed,
    },
    media: {
        label: skinVars.colors.textPrimaryNegative,
        asset: skinVars.colors.neutralHighNegative,
        chevron: skinVars.colors.neutralHighNegative,
        indicator: skinVars.colors.controlActivatedNegative,
        hover: backgroundContainerNegativeHover,
        pressed: backgroundContainerNegativePressed,
        selected: backgroundContainerSelected,
        selectedHover: backgroundContainerSelectedHover,
        selectedPressed: backgroundContainerSelectedPressed,
    },
};

// The container is a row of columns: the main column, and the double panel column when it is open. Its
// width is intrinsic, so an open panel widens the sidenav and pushes the main content of the layout.
// It paints no background of its own: each region owns its token, and the body of the default variant
// is transparent, so the page shows through it.
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

// A vertical divider paints over the last pixel column of the box that owns it, as an absolutely
// positioned overlay. A real border grows the intrinsic width of the container instead, so the whole
// sidenav (and the content next to it) shifted by 1px when the consumer toggled the divider. With the
// overlay, `width` is a total width, dividers included, for both columns, and no child moves. An
// outline is not an option either: the container has `overflow: hidden`, which clips it.
const verticalDividerOverlay = {
    content: '',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 1,
    pointerEvents: 'none',
    // Above the sticky scroll dividers of the body, which would otherwise cross this line.
    zIndex: 2,
} as const;

export const withRightDivider = styleVariants(dividerColor, (color) => ({
    '::after': {...verticalDividerOverlay, backgroundColor: color},
}));

// The header, the body and the footer share one background per variant, so the three bands of the sidenav
// stay uniform, and a boxed sidenav paints the same colours as a full-height one.
export const regionBackground = styleVariants(sideNavBackgroundContainer, (color) => ({
    backgroundColor: color,
}));

export const boxed = style({
    margin: BOXED_INSET,
    height: `calc(100% - ${BOXED_INSET * 2}px)`,
    borderRadius: skinVars.borderRadii.popup,
});

// A real border (not an inset outline) is used here: the container has `overflow: hidden`, which
// clips a negatively-offset outline and leaves the box edge barely visible. A border on the
// border-box renders on all four sides while children stay clipped to the rounded corners.
// `shouldShowBoxedBorder` decides when this class applies: the border only reads over a default or an
// alternative page, and a skin can switch it off.
export const boxedBorder = style({
    border: `1px solid ${skinVars.colors.border}`,
});

// Header region ---------------------------------------------------------------

// The 24px inset above the logo belongs to the header, so the header band reaches the top edge of the
// sidenav in every variant.
// The 32px gap separates the collapse action from the header slot, and the collapsed rail keeps it: the
// spec gives one value for both states.
export const headerBase = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 32,
    flexShrink: 0,
    paddingTop: 24,
    paddingBottom: 24,
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

export const scrollDividerVariant = styleVariants(dividerColor, (color) => ({backgroundColor: color}));

// Footer region ---------------------------------------------------------------

export const footerBase = style({
    flexShrink: 0,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
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

// The title text inherits this colour (see the `color="inherit"` of its `Text3`), so every title of the
// sidenav takes its token from one place.
export const sectionTitleVariant = styleVariants(sectionTitleColor, (color) => ({color}));

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
    backgroundColor: 'transparent',
});

// The label inherits the `color` of the row (see the `color="inherit"` of its `Text2`), while the asset and
// the chevron override it with their own token (see `itemAssetVariant` and `itemChevronVariant`).
export const itemTouchableVariant = styleVariants(itemColors, (colors) => ({
    color: colors.label,
    selectors: {
        '&:hover': {backgroundColor: colors.hover},
        '&:active': {backgroundColor: colors.pressed},
    },
}));

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

// It follows `itemTouchableVariant` in this file on purpose: both rules have the same specificity, so the
// selected background wins over the resting one by source order.
export const itemTouchableSelected = styleVariants(itemColors, (colors) => ({
    backgroundColor: colors.selected,
    selectors: {
        '&:hover': {backgroundColor: colors.selectedHover},
        '&:active': {backgroundColor: colors.selectedPressed},
    },
}));

export const itemAccent = style({
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 2,
    height: 20,
    borderRadius: 8,
    pointerEvents: 'none',
});

export const itemAccentVariant = styleVariants(itemColors, (colors) => ({
    backgroundColor: colors.indicator,
}));

export const itemAsset = style({
    display: 'flex',
    flexShrink: 0,
    width: 20,
    height: 20,
});

export const itemAssetVariant = styleVariants(itemColors, (colors) => ({color: colors.asset}));

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
});

export const itemChevronVariant = styleVariants(itemColors, (colors) => ({color: colors.chevron}));

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
// It is an overlay too (see `verticalDividerOverlay`), so the items of the main column keep the same
// width when the panel opens.
export const columnSeparator = styleVariants(dividerColor, (color) => ({
    '::after': {...verticalDividerOverlay, backgroundColor: color},
}));

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
