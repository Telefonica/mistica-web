import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'] as const;

test.each(DEVICES)('RadioButton (%s)', async (device) => {
    await openStoryPage({
        id: 'components-radio-button--controlled',
        device,
    });

    const element = await screen.findByRole('radiogroup');
    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('RadioButton - uncontrolled', async () => {
    await openStoryPage({
        id: 'components-radio-button--uncontrolled',
        device: 'MOBILE_IOS',
    });

    const element = await screen.findByRole('radiogroup');
    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('RadioButton - custom render', async () => {
    await openStoryPage({
        id: 'components-radio-button--custom-render',
        device: 'MOBILE_IOS',
    });

    const element = await screen.findByRole('radiogroup');
    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('RadioButton - disabled', async () => {
    await openStoryPage({
        id: 'components-radio-button--uncontrolled',
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const element = await screen.findByRole('radiogroup');
    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('RadioButton - control element aligned correctly with long content', async () => {
    await openStoryPage({
        id: 'components-radio-button--uncontrolled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(72);

    const element = await screen.findByRole('radiogroup');
    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();
});
