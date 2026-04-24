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

        // Mock CDN icon requests to return immediately with a simple SVG
        await page.setRequestInterception(true);
        page.on('request', (interceptedRequest) => {
            if (
                interceptedRequest.url().includes('mistica-icons') &&
                interceptedRequest.url().endsWith('.svg')
            ) {
                interceptedRequest
                    .respond({
                        status: 200,
                        contentType: 'image/svg+xml',
                        body: '<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>',
                    })
                    .catch(() => {
                        // Ignore errors if request was already handled
                    });
            } else {
                interceptedRequest.continue().catch(() => {
                    // Ignore errors if request was already handled
                });
            }
        });

        // Reload the page to ensure ALL icon requests go through the interceptor
        await page.reload({waitUntil: 'networkidle2'});

        const icons = await page.screenshot({fullPage: true});
        expect(icons).toMatchImageSnapshot();
    },
    120000
);
