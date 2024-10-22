import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['DESKTOP', 'MOBILE_ANDROID', 'MOBILE_IOS'] as const;

test.each(DEVICES)('Slider - %s', async (device) => {
    await openStoryPage({
        id: 'components-slider--uncontrolled',
        device,
    });

    const slider = await screen.findByTestId('slider');

    const image = await slider.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Slider - inverse in %s', async (device) => {
    await openStoryPage({
        id: 'components-slider--uncontrolled',
        device,
        args: {inverse: true},
    });

    const slider = await screen.findByTestId('slider');

    const image = await slider.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Slider - disabled', async () => {
    await openStoryPage({
        id: 'components-slider--uncontrolled',
        device: 'MOBILE_ANDROID',
        args: {disabled: true},
    });

    const slider = await screen.findByTestId('slider');

    const image = await slider.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Slider - tooltip', async () => {
    const page = await openStoryPage({
        id: 'components-slider--uncontrolled',
        device: 'DESKTOP',
        args: {tooltip: true},
    });

    const slider = await screen.findByRole('slider');

    await slider.focus();

    const withTooltip = await page.screenshot({fullPage: true});
    expect(withTooltip).toMatchImageSnapshot();

    await slider.evaluate((el) => (el as HTMLInputElement).blur());

    const withoutTooltip = await page.screenshot({fullPage: true});
    expect(withoutTooltip).toMatchImageSnapshot();
});
