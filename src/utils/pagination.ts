import type {ExclusifyUnion} from './utility-types';

type Visibility = 'desktop' | 'mobile' | 'any';
export type ResponsivePaginationItem = ExclusifyUnion<
    {type: 'page'; page: number; current: boolean} | {type: 'ellipsis'}
> & {visibility: Visibility};

const DEFAULT_SURROUNDING_PAGE_COUNT = 1;
const FIRST_PAGE = 1;
const DESKTOP_BOUNDARY_SLOT_COUNT = 4;
const MOBILE_BOUNDARY_SLOT_COUNT = 2;

const getVisibility = (desktop: boolean, mobile: boolean): Visibility =>
    desktop && mobile ? 'any' : desktop ? 'desktop' : 'mobile';

/**
 * Creates one ordered list with viewport-specific visibility for pages and ellipses.
 * With 20 pages and current page 10, desktop shows [1, ..., 9, 10, 11, ..., 20]
 * and mobile shows [..., 9, 10, 11, ...]; only pages 1 and 20 are desktop-only.
 */
export const getResponsivePaginationItems = ({
    totalPages,
    currentPage,
    surroundingPageCount = DEFAULT_SURROUNDING_PAGE_COUNT,
}: {
    totalPages: number;
    currentPage: number;
    surroundingPageCount?: number;
}): Array<ResponsivePaginationItem> => {
    if (totalPages <= 1) {
        return [];
    }

    const activePage = Math.min(Math.max(currentPage, FIRST_PAGE), totalPages);
    const surroundingCount = Math.min(Math.max(Math.floor(surroundingPageCount), 0), totalPages);
    const dynamicPageCount = 2 * surroundingCount + 1;
    const createPageRange = (start: number, end: number): Array<number> =>
        Array.from({length: Math.max(0, end - start + 1)}, (_, index) => start + index);

    const desktopRangeStart = Math.max(
        Math.min(activePage - surroundingCount, totalPages - dynamicPageCount - 1),
        FIRST_PAGE + 2
    );
    const desktopRangeEnd = Math.min(
        Math.max(activePage + surroundingCount, FIRST_PAGE + dynamicPageCount + 1),
        totalPages - 2
    );
    const desktopPages = new Set(
        totalPages <= dynamicPageCount + DESKTOP_BOUNDARY_SLOT_COUNT
            ? createPageRange(FIRST_PAGE, totalPages)
            : [
                  FIRST_PAGE,
                  ...(desktopRangeStart > FIRST_PAGE + 2 ? [] : [FIRST_PAGE + 1]),
                  ...createPageRange(desktopRangeStart, desktopRangeEnd),
                  ...(desktopRangeEnd < totalPages - 2 ? [] : [totalPages - 1]),
                  totalPages,
              ]
    );

    const mobileRangeStart = Math.max(
        Math.min(activePage - surroundingCount, totalPages - dynamicPageCount),
        FIRST_PAGE + 1
    );
    const mobileRangeEnd = mobileRangeStart + dynamicPageCount - 1;
    const mobilePages = new Set(
        totalPages <= dynamicPageCount + MOBILE_BOUNDARY_SLOT_COUNT
            ? createPageRange(FIRST_PAGE, totalPages)
            : [
                  ...(mobileRangeStart > FIRST_PAGE + 1 ? [] : [FIRST_PAGE]),
                  ...createPageRange(mobileRangeStart, mobileRangeEnd),
                  ...(mobileRangeEnd < totalPages - 1 ? [] : [totalPages]),
              ]
    );

    const items: Array<ResponsivePaginationItem> = [];
    let lastDesktopPage = FIRST_PAGE - 1;
    let lastMobilePage = FIRST_PAGE - 1;
    let hasDesktopEllipsis = false;
    let hasMobileEllipsis = false;

    for (const page of [...new Set([...desktopPages, ...mobilePages])].sort((a, b) => a - b)) {
        const isDesktop = desktopPages.has(page);
        const isMobile = mobilePages.has(page);
        const needsDesktopEllipsis: boolean =
            !hasDesktopEllipsis && (!isDesktop || page > lastDesktopPage + 1);
        const needsMobileEllipsis: boolean = !hasMobileEllipsis && (!isMobile || page > lastMobilePage + 1);

        if ((isDesktop && needsDesktopEllipsis) || (isMobile && needsMobileEllipsis)) {
            items.push({
                type: 'ellipsis',
                visibility: getVisibility(needsDesktopEllipsis, needsMobileEllipsis),
            });
            hasDesktopEllipsis ||= needsDesktopEllipsis;
            hasMobileEllipsis ||= needsMobileEllipsis;
        }
        items.push({
            type: 'page',
            page,
            current: page === activePage,
            visibility: getVisibility(isDesktop, isMobile),
        });
        if (isDesktop) {
            lastDesktopPage = page;
            hasDesktopEllipsis = false;
        }
        if (isMobile) {
            lastMobilePage = page;
            hasMobileEllipsis = false;
        }
    }

    const needsDesktopEllipsis = lastDesktopPage < totalPages && !hasDesktopEllipsis;
    const needsMobileEllipsis = lastMobilePage < totalPages && !hasMobileEllipsis;
    if (needsDesktopEllipsis || needsMobileEllipsis) {
        items.push({type: 'ellipsis', visibility: getVisibility(needsDesktopEllipsis, needsMobileEllipsis)});
    }
    return items;
};
