import type {
    SidenavEntry,
    SidenavFirstLevelItem,
    SidenavSection,
    SidenavSectionTitle,
    SidenavSlot,
    SidenavSlotRenderProps,
} from './sidenav-bar-types';

/** Tells a first-level section apart from a first-level stand-alone item. */
const isSidenavSection = (entry: SidenavEntry): entry is SidenavSection =>
    Array.isArray((entry as SidenavSection).items);

/** The items of the first level, in order: the items of every section, and every stand-alone item. */
const getFirstLevelItems = (entries: ReadonlyArray<SidenavEntry>): Array<SidenavFirstLevelItem> =>
    entries.flatMap((entry) =>
        isSidenavSection(entry) ? [...entry.items] : [entry as SidenavFirstLevelItem]
    );

/** Reads the two shapes of a section title as one pair: the text, and the visibility of the heading. */
const getSidenavSectionTitle = (title: SidenavSectionTitle): {text: string; isHeadingVisible: boolean} =>
    typeof title === 'string'
        ? {text: title, isHeadingVisible: true}
        : {text: title.text, isHeadingVisible: !title.hidden};

/** Resolves the function form of a slot with the props of the current state. */
const renderSidenavSlot = (slot: SidenavSlot, props: SidenavSlotRenderProps): React.ReactNode =>
    typeof slot === 'function' ? slot(props) : slot;

export {isSidenavSection, getFirstLevelItems, getSidenavSectionTitle, renderSidenavSlot};
