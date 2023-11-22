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

test('Slider - tooltip', async () => {
    const page = await openStoryPage({
        id: 'components-slider--uncontrolled',
        device: 'DESKTOP',
        args: {tooltip: true},
    });

    const slider = await screen.findByTestId('slider');

    await slider.click();

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
