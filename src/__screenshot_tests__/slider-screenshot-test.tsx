import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['DESKTOP', 'MOBILE_ANDROID', 'MOBILE_IOS'] as const;

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Slider - ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-slider--uncontrolled',
            device,
        });

        const slider = await screen.findByTestId('slider');

        await expectScreenshot(slider);
    });
}

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Slider - inverse in ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-slider--uncontrolled',
            device,
            args: {variantOutside: 'brand'},
        });

        const slider = await screen.findByTestId('slider');

        await expectScreenshot(slider);
    });
}

test('Slider - disabled', async () => {
    await openStoryPage({
        id: 'components-slider--uncontrolled',
        device: 'MOBILE_ANDROID',
        args: {disabled: true},
    });

    const slider = await screen.findByTestId('slider');

    await expectScreenshot(slider);
});

test('Slider - tooltip', async () => {
    const page = await openStoryPage({
        id: 'components-slider--uncontrolled',
        device: 'DESKTOP',
        args: {tooltip: true},
    });

    const slider = await screen.findByRole('slider');

    await slider.focus();

    await expectScreenshot(page, {...{fullPage: true}});

    await slider.evaluate((el) => (el as HTMLInputElement).blur());

    await expectScreenshot(page, {...{fullPage: true}});
});
