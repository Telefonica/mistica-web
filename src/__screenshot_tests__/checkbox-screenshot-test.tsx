import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'] as const;

test.each(DEVICES)('Checkbox in %s', async (device) => {
    await openStoryPage({
        id: 'components-forms-checkbox--default',
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

    const checkboxes = await screen.findAllByRole('checkbox');

    await checkboxes[0].click();
    await checkboxes[1].click();
    await checkboxes[2].click();

    const imageChecked = await page.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});
