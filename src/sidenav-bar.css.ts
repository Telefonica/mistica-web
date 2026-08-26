import {createVar, globalStyle, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';

import type {NonDeprecatedVariant} from './theme-variant-context';

export const DEFAULT_WIDTH = 240;
export const COLLAPSED_WIDTH = 72;
const BOXED_INSET = 8;
// Per-level nesting step applied as the item row's left padding. It combines with the item content
// box's own 8px left margin (which clears the selected indicator on the rail) so a nested item's
// content box lands 24px from the section rail — the total nesting indent the Figma spec calls for
// (16 + 8). Using the full 24 here would double-count the 8px margin and over-indent children.
export const NESTING_INDENT = 16;
export const LOGO_SIZE = 32;
// Horizontal inset of the items rail on each side of a section (see `sectionContent`). The selected
// indicator of an item sits on that inset, at the left edge of the rail.
const RAIL_INSET = 10;
// Margin of the row of an item, on each side of the items rail. On the left it is measured from the left
// edge of the selected indicator, which is 2px wide, so the row keeps a gap of 6px from that indicator.
// The expanded sidenav and the collapsed rail share this number: the row of an item stands in the same
// place in both states, 18px from each edge of the sidenav.
const ITEM_ROW_INSET = 8;
// Gap between the icon, the label, the right slot and the chevron of a row.
const ITEM_ROW_GAP = 8;
// Distance from the edge of the sidenav to the title of a section, which the title of the second column
// takes as well.
const SECTION_TITLE_INSET = 16;
// Vertical space between two first-level entries of the body (section to section, section to
// stand-alone item, or stand-alone item to stand-alone item). Items inside a section stay adjacent.
const FIRST_LEVEL_GAP = 16;

export const sidenavWidthVar = createVar();
// The second column always takes the `width` of the expanded sidenav, so it needs its own variable: the
// variable above carries the width of the collapsed rail while the sidenav is collapsed.
export const sidenavPanelWidthVar = createVar();

// Animation ------------------------------------------------------------------

// The rail, the labels, the header and the second column move together when the user collapses or
// expands the sidenav.
export const COLLAPSE_DURATION_MS = 350;
// The children of a parent item, and the chevron that reports their state, take their own duration.
export const CONTENT_DURATION_MS = 400;

const COLLAPSE_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const CONTENT_EASING = 'ease';

// The labels fade out one after the other. The first one waits 80ms, and each of the next ones waits
// 40ms more, up to the last delay of the spec: a list of thirty items would otherwise end its stagger
// more than a second after the rail stopped.
export const LABEL_DELAY_BASE_MS = 80;
export const LABEL_DELAY_STEP_MS = 40;
export const LABEL_DELAY_MAX_MS = 160;

// `SidenavBar` fills both durations on its root element, and every rule below reads them from there.
// An acceptance run receives 0ms, so a test that presses a control and reads the result at once never
// catches a frame of the movement.
export const collapseDurationVar = createVar();
export const contentDurationVar = createVar();

// Delay of the fade of one label, which follows the position of its item (see `LABEL_DELAY_BASE_MS`).
export const itemLabelDelayVar = createVar();

// Every animated rule of this file carries this block: the spec asks for an instant change when the
// user turns motion down in the operating system.
const reducedMotion = {
    '@media': {
        ['(prefers-reduced-motion)']: {
            transition: 'none',
        },
    },
} as const;

// Tokens ----------------------------------------------------------------------

// The spec paints the header, the body and the footer of every variant with an existing background token,
// one member per variant. A boxed sidenav paints the same colours as a full-height one, with one exception:
// the negative boxed header (see `headerNegativeBoxedBackground`).
const regionBackgroundColor: Record<NonDeprecatedVariant, string> = {
    default: skinVars.colors.background,
    brand: skinVars.colors.navigationBarBackground,
    alternative: skinVars.colors.backgroundAlternative,
    negative: skinVars.colors.backgroundNegative,
    media: skinVars.colors.backgroundNegative,
};

// The negative variant is the only one whose boxed header takes a different token: the spec gives it
// `backgroundContainerNegative`, while its body and footer keep `backgroundNegative`. The header cannot be
// transparent, because the content scrolls underneath it while it is fixed.
export const headerNegativeBoxedBackground = style({
    backgroundColor: skinVars.colors.backgroundContainerNegative,
});

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
        asset: 'currentColor',
        chevron: skinVars.colors.neutralHigh,
        indicator: skinVars.colors.controlActivated,
        hover: skinVars.colors.backgroundContainerHover,
        pressed: skinVars.colors.backgroundContainerPressed,
        selected: skinVars.colors.backgroundSelected,
        selectedHover: skinVars.colors.backgroundSelectedHover,
        selectedPressed: skinVars.colors.backgroundSelectedPressed,
    },
    brand: {
        label: skinVars.colors.textPrimaryBrand,
        asset: 'currentColor',
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
        asset: 'currentColor',
        chevron: skinVars.colors.neutralHigh,
        indicator: skinVars.colors.controlActivated,
        hover: skinVars.colors.backgroundContainerHover,
        pressed: skinVars.colors.backgroundContainerPressed,
        selected: skinVars.colors.backgroundSelected,
        selectedHover: skinVars.colors.backgroundSelectedHover,
        selectedPressed: skinVars.colors.backgroundSelectedPressed,
    },
    negative: {
        label: skinVars.colors.textPrimaryNegative,
        asset: 'currentColor',
        chevron: skinVars.colors.neutralHighNegative,
        indicator: skinVars.colors.controlActivatedNegative,
        hover: skinVars.colors.backgroundContainerHover,
        pressed: skinVars.colors.backgroundContainerPressed,
        selected: skinVars.colors.backgroundSelectedNegative,
        selectedHover: skinVars.colors.backgroundSelectedNegativeHover,
        selectedPressed: skinVars.colors.backgroundSelectedNegativePressed,
    },
    media: {
        label: skinVars.colors.textPrimaryNegative,
        asset: 'currentColor',
        chevron: skinVars.colors.neutralHighNegative,
        indicator: skinVars.colors.controlActivatedNegative,
        hover: skinVars.colors.backgroundContainerHover,
        pressed: skinVars.colors.backgroundContainerPressed,
        selected: skinVars.colors.backgroundSelected,
        selectedHover: skinVars.colors.backgroundSelectedHover,
        selectedPressed: skinVars.colors.backgroundSelectedPressed,
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
// `sidenavWidthVar` carries the width of the expanded sidenav or the width of the collapsed rail, so the
// transition below runs whenever the user toggles the sidenav.
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
        transition: `width ${collapseDurationVar} ${COLLAPSE_EASING}`,
        ...reducedMotion,
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
    // Above the sticky scroll dividers of the body, and above the edge of a boxed sidenav (see
    // `boxedBorder`), so this line reaches the top and the bottom of the box.
    zIndex: 3,
} as const;

export const withRightDivider = styleVariants(dividerColor, (color) => ({
    '::after': {...verticalDividerOverlay, backgroundColor: color},
}));

// The header, the body and the footer share one background per variant, so the three bands of the sidenav
// stay uniform, and a boxed sidenav paints the same colours as a full-height one.
export const regionBackground = styleVariants(regionBackgroundColor, (color) => ({
    backgroundColor: color,
}));

// While the rail moves, every column of the sidenav stops answering the pointer: the row that the user
// aims at is travelling, and a floating panel opened here would measure an edge that has not arrived yet.
// The rule lands on the columns, and not on the container, so the container still takes the press: a press
// that fell through to the page behind would read as a press outside of the bar, and it would close the
// second column.
export const columnsWhileMoving = style({});

globalStyle(`${columnsWhileMoving} > *`, {
    pointerEvents: 'none',
});

export const boxed = style({
    margin: BOXED_INSET,
    height: `calc(100% - ${BOXED_INSET * 2}px)`,
    borderRadius: skinVars.borderRadii.popup,
});

// The edge of the box is an overlay, not a real border. A real border takes 1px of the container on
// each side, and `overflow: hidden` clips every child to the padding box, so the separator of the
// double panel could not reach the top and the bottom edge of the box: it stopped one pixel short of
// them, and that pixel reads as a gap wherever the border token matches the background of the sidenav,
// which every dark mode does. The overlay keeps the border out of the intrinsic size too, so a boxed
// sidenav of `width` pixels measures exactly that width. An outline is not an option: `overflow:
// hidden` clips a negatively-offset outline.
// `shouldShowBoxedBorder` decides when this class applies: the border only reads over a default or an
// alternative page, and a skin can switch it off.
export const boxedBorder = style({
    '::before': {
        content: '',
        position: 'absolute',
        inset: 0,
        boxSizing: 'border-box',
        border: `1px solid ${skinVars.colors.border}`,
        // The container owns the radius (see `boxed`), and the edge follows it.
        borderRadius: 'inherit',
        pointerEvents: 'none',
        // Above the background of both columns and above the sticky scroll dividers of the body, and
        // below the vertical dividers, which cross it (see `verticalDividerOverlay`).
        zIndex: 2,
    },
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

// The logo and the collapse control stack, both 32px tall. Their left edge is placed with
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

// The collapsed rail keeps the same left padding, and it keeps `flex-start` too. Centring the controls
// gives the same result at rest, because the rail leaves the logo exactly its 32px, but it moves them
// while the rail moves: a centre travels with the box that holds it, and a left edge does not.
export const headerControlsCollapsed = style({
    paddingRight: 20,
});

// The default isotype is a square as wide as its height in both states. The collapsed rail still clamps
// the width, because a logo of the consumer, or the function form of the prop, can be wider than the rail.
// The spec fades the label of the header 50ms after the rail starts to move. Our default header carries no
// label, because the default logo is the isotype in both states, so what this rule gives is the smooth
// clamp of the width, and a smooth fade for a consumer that drives the opacity of its own logo.
export const logo = style({
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    height: LOGO_SIZE,
    // The clamp below is a `max-width`, and not a `width`, so that it interpolates: `auto` has no value to
    // animate from.
    maxWidth: '100%',
    transition: `max-width ${collapseDurationVar} ${COLLAPSE_EASING}, opacity ${collapseDurationVar} ${COLLAPSE_EASING} 50ms`,
    ...reducedMotion,
});

export const logoCollapsed = style({
    maxWidth: LOGO_SIZE,
});

// The slot follows the same rule as the logo above. It never rests at opacity 0, because the collapsed
// rail keeps the slot: the fade serves a consumer that drives the opacity of its own header content.
export const headerSlot = style({
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 0,
    paddingLeft: 24,
    paddingRight: 24,
    transition: `opacity ${collapseDurationVar} ${COLLAPSE_EASING} 50ms`,
    ...reducedMotion,
});

export const headerSlotCollapsed = style({});

// Body region -----------------------------------------------------------------

// The body scrolls up and down, never sideways. The rule below is not the default: a box that scrolls on
// one axis takes `auto` on the other one as well, and the title of a section, which keeps the width of its
// text while the sidenav moves, would then give the collapsed rail a horizontal scrollbar.
export const bodyBase = style({
    flex: 1,
    minHeight: 0,
    overflowX: 'hidden',
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
// It stops 1px before the right edge, so it never crosses the vertical divider that sits there (the right
// divider, or the separator of the double panel). The divider token is translucent in dark mode, so two
// lines that overlap paint a brighter pixel at the crossing. The gap is invisible when no vertical divider
// is there, because the right edge of the sidenav is transparent then. A boxed sidenav also insets it on
// the left (see the `boxed` rule below), where its edge draws a border too.
export const scrollDivider = style({
    height: 1,
    flexShrink: 0,
    pointerEvents: 'none',
    position: 'sticky',
    zIndex: 1,
    marginRight: 1,
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

// The title fades with the labels of the items below it. `visibility` changes in one step, and a
// transition holds a step like this one until the end, so the title stays readable for a screen reader
// while it fades out, and it leaves the accessibility tree only once the rail stopped.
export const sectionTitle = style({
    padding: `0 ${SECTION_TITLE_INSET}px`,
    marginBottom: 8,
    transition: `opacity ${collapseDurationVar} ${COLLAPSE_EASING}, visibility ${collapseDurationVar} ${COLLAPSE_EASING}`,
    ...reducedMotion,
});

// The title text inherits this colour (see the `color="inherit"` of its `Text3`), so every title of the
// sidenav takes its token from one place.
export const sectionTitleVariant = styleVariants(sectionTitleColor, (color) => ({color}));

// Collapsed: the title is hidden, but it still reserves its space, so the items of a section keep the
// same vertical rhythm in both states. Neither `opacity` nor `visibility` takes a box out of the flow.
export const sectionTitleCollapsed = style({
    opacity: 0,
    visibility: 'hidden',
});

// While the sidenav moves, the title keeps the width of its text, for the same reason as the label of an
// item (see `itemLabelKeepsWidth`). Without this, the title would wrap over several lines as the rail
// narrows, and the whole body of the sidenav would move down with it.
export const sectionTitleKeepsWidth = style({
    width: 'max-content',
});

// The rail that carries the items of a section. A first-level stand-alone item reuses it, so that
// it lands on the same rail as the items that belong to a section (see `standaloneItem`).
// The left inset hosts the selected indicator, and the row of each item adds `ITEM_ROW_INSET` on top of
// it, which gives the 18px that the spec measures from the edge of the sidenav to the row.
export const sectionContent = style({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: RAIL_INSET,
    paddingRight: RAIL_INSET,
});

// A stand-alone item is not wrapped in a section, so it carries the items rail itself.
export const standaloneItem = sectionContent;

// The dividers sit outside `sectionContent`, so they span the whole sidenav width, and the Figma
// anatomy order is: top divider, 8px, section title, 8px, items, 8px, bottom divider.
// The 1px right inset keeps the line off the vertical divider on the right edge, for the same reason as
// `scrollDivider` above.
export const sectionDivider = style({
    marginTop: 8,
    marginBottom: 8,
    marginRight: 1,
});

// A boxed sidenav draws a border on its left edge too (see `boxedBorder`), so the horizontal dividers keep
// off that edge as well. A non-boxed sidenav has no divider on the left, so the lines reach that edge.
globalStyle(`${boxed} ${scrollDivider}, ${boxed} ${sectionDivider}`, {
    marginLeft: 1,
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

// The row of an item takes the same box in both states: `ITEM_ROW_INSET` on each side of the items rail.
// Its width is a percentage of the rail, so it follows the rail while the rail moves, and it needs no
// transition of its own. The collapsed rail leaves it 36px, which holds the icon and its two paddings.
// The overflow keeps the label, the right slot and the chevron inside the row while it narrows.
export const itemTouchable = style({
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: ITEM_ROW_GAP,
    flex: 'none',
    width: `calc(100% - ${ITEM_ROW_INSET * 2}px)`,
    minWidth: 0,
    height: 44,
    padding: '0 8px',
    marginLeft: ITEM_ROW_INSET,
    marginRight: ITEM_ROW_INSET,
    borderRadius: 8,
    backgroundColor: 'transparent',
    overflow: 'hidden',
});

// The label inherits the `color` of the row (see the `color="inherit"` of its `Text2`). The asset inherits it
// too (the spec paints it with `currentColor`), while the chevron overrides it with its own token (see
// `itemChevronVariant`).
export const itemTouchableVariant = styleVariants(itemColors, (colors) => ({
    color: colors.label,
    selectors: {
        '&:hover': {backgroundColor: colors.hover},
        '&:active': {backgroundColor: colors.pressed},
    },
}));

// The collapsed rail keeps the box of the row untouched, so that the row never moves between the two
// states. The 36px that the rail leaves hold the icon and its two paddings exactly, which places the icon
// at the centre of the rail. The label and the gap that precedes it overflow that box, and the row clips
// them, so the icon keeps its place from the first frame of the movement to the last one.
export const itemTouchableCollapsed = style({
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

// The label keeps its box in the DOM on the collapsed rail, so a screen reader still reads it, and so the
// fade of the spec has something to fade. Its own box needs no width animation: it grows and shrinks with
// the row that holds it, because it takes the space that the row leaves.
export const itemLabel = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    transition: `opacity ${collapseDurationVar} ${COLLAPSE_EASING} ${itemLabelDelayVar}`,
    ...reducedMotion,
});

// Only the opacity changes. The label keeps its place beside the icon, so the text stands still while it
// fades. A margin or a width of its own would drag the text toward the icon instead.
export const itemLabelCollapsed = style({
    opacity: 0,
});

// While the sidenav moves, the label keeps the width that its text asks for, instead of taking the share
// of the row that the flex layout would give it. The row narrows under a text that does not move, and the
// edge of the sidenav passes over that text: without this, the label would shrink with the row and the
// text would truncate one letter at a time, which reads as the text redrawing itself.
// The expanded sidenav at rest drops this rule, so a label longer than the row truncates there as usual.
export const itemLabelKeepsWidth = style({
    minWidth: 'max-content',
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
    transition: `transform ${contentDurationVar} ${CONTENT_EASING}`,
    ...reducedMotion,
});

// The chevron of an open parent item turns half a turn, so that it reports the state of its group. It
// applies to the chevron that points down, which the sidenav uses for a group that opens in place. The
// double panel keeps the chevron that points right, and never turns it: half a turn would make it point
// away from the column that it opens.
export const itemChevronRotated = style({
    transform: 'rotate(180deg)',
});

export const itemChevronVariant = styleVariants(itemColors, (colors) => ({color: colors.chevron}));

// The children of a parent item grow and shrink as one group. A grid row of `0fr` collapses the group
// without a measured height, which is the pattern that `Accordion` uses (see `accordion.css.ts`).
export const nestedListContainer = style({
    display: 'grid',
});

export const nestedListTransitionClasses = {
    enter: style({
        gridTemplateRows: '0fr',
    }),
    enterActive: style({
        gridTemplateRows: '1fr',
        transition: `grid-template-rows ${contentDurationVar} ${CONTENT_EASING}`,
        ...reducedMotion,
    }),
    exit: style({
        gridTemplateRows: '1fr',
    }),
    exitActive: style({
        gridTemplateRows: '0fr',
        transition: `grid-template-rows ${contentDurationVar} ${CONTENT_EASING}`,
        ...reducedMotion,
    }),
};

export const nestedList = style({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
});

// Panel (Dialog and Double Panel) -----------------------------------------------

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
    overflowX: 'hidden',
    overflowY: 'auto',
});

// The column slides out of the main column and slides back into it, with the movement of the rail. Its
// children keep the width of the open column while it moves, so the text never reflows: the column clips
// them instead (see the `overflow` above, and `doublePanelContent` below).
const doublePanelClosed = style({
    width: 0,
});

const doublePanelOpening = style({
    width: sidenavPanelWidthVar,
    transition: `width ${collapseDurationVar} ${COLLAPSE_EASING}`,
    ...reducedMotion,
});

// The first column that a sidenav opens arrives with the item that owns it, so it enters the tree while it
// is already open. `appear` gives that first column the same movement as every later one.
export const doublePanelTransitionClasses = {
    appear: doublePanelClosed,
    appearActive: doublePanelOpening,
    enter: doublePanelClosed,
    enterActive: doublePanelOpening,
    exit: style({
        width: sidenavPanelWidthVar,
    }),
    exitActive: style({
        width: 0,
        transition: `width ${collapseDurationVar} ${COLLAPSE_EASING}`,
        ...reducedMotion,
    }),
};

// The paddings of the column belong to this box, so the column itself can reach a width of zero. Its
// horizontal inset is the inset of the items rail, so the children of the column land on the same rail as
// the items of the main column.
export const doublePanelContent = style({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: sidenavPanelWidthVar,
    flexShrink: 0,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: RAIL_INSET,
    paddingRight: RAIL_INSET,
});

// The inset of the column plus this padding place the title where a section title stands, at
// `SECTION_TITLE_INSET` from the edge of the column. The 16px bottom margin is the title-to-items gap of
// the spec.
export const doublePanelTitle = style({
    padding: `0 ${SECTION_TITLE_INSET - RAIL_INSET}px`,
    marginBottom: 16,
});

// Separates the main column from the double panel column. It renders whenever the panel is open, even
// when the sidenav hides its right divider, because the two columns always need a visible boundary.
// It is an overlay too (see `verticalDividerOverlay`), so the items of the main column keep the same
// width when the panel opens.
export const columnSeparator = styleVariants(dividerColor, (color) => ({
    '::after': {...verticalDividerOverlay, backgroundColor: color},
}));
