import {openStoryPage} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'] as const;

test.each(DEVICES)(`RadioGroup`, async (device) => {
    await openStoryPage({
        id: 'components-radio-button--default',
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
