import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'] as const;

test.each(DEVICES)('Checkbox (%s)', async (device) => {
    await openStoryPage({
        id: 'components-checkbox--controlled',
        device,
    });

    const wrapper = await screen.findByTestId('checkbox-wrapper');
    const checkbox = await screen.findByRole('checkbox');

    const image = await wrapper.screenshot();
    expect(image).toMatchImageSnapshot();

    await checkbox.click();

    const imageChecked = await wrapper.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test.each(DEVICES)('Checkbox - inverse (%s)', async (device) => {
    await openStoryPage({
        id: 'components-checkbox--controlled',
        device,
        args: {inverse: true},
    });

    const wrapper = await screen.findByTestId('checkbox-wrapper');
    const checkbox = await screen.findByRole('checkbox');

    const image = await wrapper.screenshot();
    expect(image).toMatchImageSnapshot();

    await checkbox.click();

    const imageChecked = await wrapper.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test('Checkbox - uncontrolled', async () => {
    await openStoryPage({
        id: 'components-checkbox--uncontrolled',
        device: 'MOBILE_IOS',
    });

    const wrapper = await screen.findByTestId('checkbox-wrapper');
    const checkbox = await screen.findByRole('checkbox');

    const image = await wrapper.screenshot();
    expect(image).toMatchImageSnapshot();

    await checkbox.click();

    const imageChecked = await wrapper.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test('Checkbox - custom render', async () => {
    await openStoryPage({
        id: 'components-checkbox--custom-render',
        device: 'MOBILE_IOS',
    });

    const wrapper = await screen.findByTestId('checkbox-wrapper');
    const checkbox = await screen.findByRole('checkbox');

    const image = await wrapper.screenshot();
    expect(image).toMatchImageSnapshot();

    await checkbox.click();

    const imageChecked = await wrapper.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test('Checkbox - disabled', async () => {
    await openStoryPage({
        id: 'components-checkbox--uncontrolled',
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const wrapper = await screen.findByTestId('checkbox-wrapper');
    const image = await wrapper.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Checkbox - control element aligned correctly with long content', async () => {
    await openStoryPage({
        id: 'components-checkbox--uncontrolled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(72);

    const wrapper = await screen.findByTestId('checkbox-wrapper');
    const image = await wrapper.screenshot();
    expect(image).toMatchImageSnapshot();
});
