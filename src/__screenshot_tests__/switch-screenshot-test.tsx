import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'] as const;

test.each(DEVICES)('Switch (%s)', async (device) => {
    await openStoryPage({
        id: 'components-switch--controlled',
        device,
    });

    const element = await screen.findByRole('switch');

    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();

    await element.click();

    const imageChecked = await element.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test('Switch - uncontrolled', async () => {
    await openStoryPage({
        id: 'components-switch--uncontrolled',
        device: 'MOBILE_IOS',
    });

    const element = await screen.findByRole('switch');

    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();

    await element.click();

    const imageChecked = await element.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test('Switch - custom render', async () => {
    await openStoryPage({
        id: 'components-switch--custom-render',
        device: 'MOBILE_IOS',
    });

    const element = await screen.findByRole('switch');

    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();

    await element.click();

    const imageChecked = await element.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test('Switch - disabled', async () => {
    await openStoryPage({
        id: 'components-switch--uncontrolled',
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const element = await screen.findByRole('switch');
    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Switch - control element aligned correctly with long content', async () => {
    await openStoryPage({
        id: 'components-switch--uncontrolled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(72);

    const element = await screen.findByRole('switch');
    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();
});
