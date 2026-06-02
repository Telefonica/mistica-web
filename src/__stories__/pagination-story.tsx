import * as React from 'react';
import {Pagination} from '..';

export default {
    title: 'Components/Pagination',
};

/**
 * Mid-range page with both navigation controls. On desktop renders
 * "Previous 1 2 3 4 ... 9 Next", on mobile collapses labels into chevrons.
 */
export const Default: StoryComponent = () => <Pagination totalPages={9} defaultPage={3} />;
Default.storyName = 'Default';

/**
 * First page: the Previous control must be hidden (showPrevious logic).
 */
export const FirstPage: StoryComponent = () => <Pagination totalPages={10} defaultPage={1} />;
FirstPage.storyName = 'FirstPage';

/**
 * Last page: the Next control must be hidden.
 */
export const LastPage: StoryComponent = () => <Pagination totalPages={10} defaultPage={10} />;
LastPage.storyName = 'LastPage';

/**
 * Wide page count with active page in the middle: ellipses should appear on
 * both sides of the visible range ("1 ... 9 10 11 ... 20").
 */
export const WithEllipsis: StoryComponent = () => <Pagination totalPages={20} defaultPage={10} />;
WithEllipsis.storyName = 'WithEllipsis';

/**
 * No page list, only Previous/Next. On desktop the labels are visible,
 * on mobile the labels are hidden and only chevrons are shown.
 */
export const NavOnlyResponsive: StoryComponent = () => (
    <Pagination totalPages={10} defaultPage={5} hidePageList />
);
NavOnlyResponsive.storyName = 'NavOnlyResponsive';

/**
 * Page list without navigation controls. Matches the product-list scenario
 * from the Figma examples panel.
 */
export const PagesOnly: StoryComponent = () => (
    <Pagination totalPages={5} defaultPage={3} hideNavigationControls />
);
PagesOnly.storyName = 'PagesOnly';

/**
 * iconOnly mode forces chevron-only Previous/Next even on desktop.
 * Combined with hidePageList matches the "Mapa / Listado" card scenario.
 */
export const IconOnlyControls: StoryComponent = () => (
    <Pagination totalPages={10} defaultPage={5} mode="iconOnly" hidePageList />
);
IconOnlyControls.storyName = 'IconOnlyControls';

/**
 * Compact view: triggered automatically when the viewport is narrower than
 * 375px (high-zoom or space-limited contexts). Layout stacks vertically with
 * Previous / page list / Next and only renders the current ± 1 pages.
 * Only visible when the screenshot test runs this story at MOBILE_IOS_SMALL.
 */
export const CompactView: StoryComponent = () => <Pagination totalPages={50} defaultPage={24} />;
CompactView.storyName = 'CompactView';

/**
 * Pagination acting as a single next-chapter link: page list is hidden, only
 * the Next control is rendered with a custom navRightLabel ("Siguiente
 * capítulo"). Matches the chapter-reader scenario from the Figma examples.
 */
export const NextChapterLink: StoryComponent = () => (
    <Pagination totalPages={10} defaultPage={1} hidePageList navRightLabel="Siguiente capítulo" />
);
NextChapterLink.storyName = 'NextChapterLink';
