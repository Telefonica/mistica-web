import {openStoryPage} from '../test-utils';

const DEVICES = ['DESKTOP', 'MOBILE_ANDROID'] as const;

test.each(DEVICES)(`SectionTitle`, async (device) => {
    await openStoryPage({
        section: 'Components/Others/SectionTitle',
        name: 'SectionTitle',
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
