import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'] as const;

test.each(DEVICES)('Switch (%s)', async (device) => {
    await openStoryPage({
        id: 'components-switch--controlled',
        device,
    });

    const wrapper = await screen.findByTestId('switch-wrapper');
    const element = await screen.findByRole('switch');

    const image = await wrapper.screenshot();
    expect(image).toMatchImageSnapshot();

    await element.click();

    const imageChecked = await wrapper.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test.each(DEVICES)('Switch - inverse (%s)', async (device) => {
    await openStoryPage({
        id: 'components-switch--controlled',
        device,
        args: {inverse: true},
    });

    const wrapper = await screen.findByTestId('switch-wrapper');
    const element = await screen.findByRole('switch');

    const image = await wrapper.screenshot();
    expect(image).toMatchImageSnapshot();

    await element.click();

    const imageChecked = await wrapper.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test('Switch - uncontrolled', async () => {
    await openStoryPage({
        id: 'components-switch--uncontrolled',
        device: 'MOBILE_IOS',
    });

    const wrapper = await screen.findByTestId('switch-wrapper');
    const element = await screen.findByRole('switch');

    const image = await wrapper.screenshot();
    expect(image).toMatchImageSnapshot();

    await element.click();

    const imageChecked = await wrapper.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test('Switch - custom render', async () => {
    await openStoryPage({
        id: 'components-switch--custom-render',
        device: 'MOBILE_IOS',
    });

    const wrapper = await screen.findByTestId('switch-wrapper');
    const element = await screen.findByRole('switch');

    const image = await wrapper.screenshot();
    expect(image).toMatchImageSnapshot();

    await element.click();

    const imageChecked = await wrapper.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test('Switch - disabled', async () => {
    await openStoryPage({
        id: 'components-switch--uncontrolled',
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const wrapper = await screen.findByTestId('switch-wrapper');
    const image = await wrapper.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Switch - control element aligned correctly with long content', async () => {
    await openStoryPage({
        id: 'components-switch--uncontrolled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(72);

    const wrapper = await screen.findByTestId('switch-wrapper');
    const image = await wrapper.screenshot();
    expect(image).toMatchImageSnapshot();
});
