import {openStoryPage, setRootFontSize} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'] as const;

test.each(DEVICES)('RadioButton (%s)', async (device) => {
    await openStoryPage({
        id: 'components-radio-button--controlled',
        device,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('RadioButton - uncontrolled', async () => {
    await openStoryPage({
        id: 'components-radio-button--uncontrolled',
        device: 'MOBILE_IOS',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('RadioButton - custom render', async () => {
    await openStoryPage({
        id: 'components-radio-button--custom-render',
        device: 'MOBILE_IOS',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('RadioButton - disabled', async () => {
    await openStoryPage({
        id: 'components-radio-button--uncontrolled',
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('RadioButton - control element aligned correctly with long content', async () => {
    await openStoryPage({
        id: 'components-radio-button--uncontrolled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(72);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
