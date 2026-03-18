import {openStoryPage} from '../test-utils';

const SKINS = ['Movistar', 'O2', 'Blau'] as const;
const ICON_TYPES = ['light', 'regular', 'filled'];

const getCases = () => {
    const cases = [];
    for (const skin of SKINS) {
        for (const type of ICON_TYPES) {
            cases.push([skin, type]);
        }
    }
    return cases;
};

test.each(getCases())(
    'Icons catalog for %s (%s)',
    async (skin, type) => {
        const page = await openStoryPage({
            id: 'icons-catalog--catalog',
            device: 'DESKTOP',
            skin: skin as (typeof SKINS)[number],
            args: {light: type === 'light', regular: type === 'regular', filled: type === 'filled', size: 32},
        });

        // Scroll to bottom to trigger lazy loading of all icons
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        // Wait for lazy loading to be triggered and icons to start fetching from CDN
        await page.waitForTimeout(2000);

        // Scroll back to top for the screenshot
        await page.evaluate(() => {
            window.scrollTo(0, 0);
        });

        // Give generous time for all CDN icon fetches to complete
        // The first test (cold start) needs the most time
        await page.waitForTimeout(10000);

        const icons = await page.screenshot({fullPage: true});
        expect(icons).toMatchImageSnapshot();
    },
    180000
);
