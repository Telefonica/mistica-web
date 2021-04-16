import {openStoryPage} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'] as const;

test.each(DEVICES)(`RadioGroup`, async (device) => {
    await openStoryPage({
        section: 'Components/Forms/RadioButton',
        name: 'Radio Button',
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
