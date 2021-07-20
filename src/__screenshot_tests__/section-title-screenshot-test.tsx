import {openStoryPage} from '../test-utils';

const DEVICES = ['DESKTOP', 'MOBILE_ANDROID'] as const;

test.each(DEVICES)(`SectionTitle`, async (device) => {
    await openStoryPage({
        id: 'components-others-sectiontitle--default',
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
