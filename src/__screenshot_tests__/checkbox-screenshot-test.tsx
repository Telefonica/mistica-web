import {openStoryPage, screen, setRootFontSize} from '../test-utils';

test.each`
    device              | skin
    ${'MOBILE_IOS'}     | ${'Vivo-new'}
    ${'MOBILE_ANDROID'} | ${'Vivo-new'}
    ${'MOBILE_IOS'}     | ${'Movistar'}
    ${'MOBILE_ANDROID'} | ${'Movistar'}
`('Checkbox $device $skin', async ({device, skin}) => {
    await openStoryPage({
        id: 'components-checkbox--controlled',
        device,
        skin,
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

test.each`
    device              | skin
    ${'MOBILE_IOS'}     | ${'Vivo-new'}
    ${'MOBILE_ANDROID'} | ${'Vivo-new'}
    ${'MOBILE_IOS'}     | ${'Movistar'}
    ${'MOBILE_ANDROID'} | ${'Movistar'}
`('Checkbox - disabled $device $skin', async ({device, skin}) => {
    await openStoryPage({
        id: 'components-checkbox--uncontrolled',
        device,
        skin,
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
