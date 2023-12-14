import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'] as const;

test.each(DEVICES)('Checkbox (%s)', async (device) => {
    await openStoryPage({
        id: 'components-checkbox--controlled',
        device,
    });

    const checkbox = await screen.findByRole('checkbox');

    const image = await checkbox.screenshot();
    expect(image).toMatchImageSnapshot();

    await checkbox.click();

    const imageChecked = await checkbox.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test('Checkbox - uncontrolled', async () => {
    await openStoryPage({
        id: 'components-checkbox--uncontrolled',
        device: 'MOBILE_IOS',
    });

    const checkbox = await screen.findByRole('checkbox');

    const image = await checkbox.screenshot();
    expect(image).toMatchImageSnapshot();

    await checkbox.click();

    const imageChecked = await checkbox.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test('Checkbox - custom render', async () => {
    await openStoryPage({
        id: 'components-checkbox--custom-render',
        device: 'MOBILE_IOS',
    });

    const checkbox = await screen.findByRole('checkbox');

    const image = await checkbox.screenshot();
    expect(image).toMatchImageSnapshot();

    await checkbox.click();

    const imageChecked = await checkbox.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});

test('Checkbox - disabled', async () => {
    await openStoryPage({
        id: 'components-checkbox--uncontrolled',
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const checkbox = await screen.findByRole('checkbox');
    const image = await checkbox.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Checkbox - control element aligned correctly with long content', async () => {
    await openStoryPage({
        id: 'components-checkbox--uncontrolled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(72);

    const checkbox = await screen.findByRole('checkbox');
    const image = await checkbox.screenshot();
    expect(image).toMatchImageSnapshot();
});
