import {openStoryPage} from '../test-utils';

test('Title', async () => {
    const argsCases = [
        {
            caseName: 'without-link',
            title: 'This is a title',
            linkText: '',
        },
        {
            caseName: 'with-link',
            title: 'This is a title with link',
            linkText: 'Link',
        },
        {
            caseName: 'with-link-and-long-text',
            title: 'This is a title with link and with a very long text that may wrap to multiple lines in small screens',
            linkText: 'Link',
        },
    ];

    const devices = ['DESKTOP', 'MOBILE_ANDROID'] as const;

    for (const {caseName, title, linkText} of argsCases) {
        for (const device of devices) {
            await openStoryPage({
                id: 'components-title--default',
                device,
                args: {title, linkText},
            });
            const image = await page.screenshot();
            expect(image).toMatchImageSnapshot({
                customSnapshotIdentifier: `title-screenshot-test-${device.toLowerCase()}-${caseName}`,
            });
        }
    }
});
