import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'] as const;

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Switch (${testCase})`, async () => {
        await openStoryPage({
            id: 'components-switch--controlled',
            device,
        });

        const wrapper = await screen.findByTestId('switch-wrapper');
        const element = await screen.findByRole('switch');

        await expectScreenshot(wrapper);

        await element.click();

        await expectScreenshot(wrapper);
    });
}

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Switch - inverse (${testCase})`, async () => {
        await openStoryPage({
            id: 'components-switch--controlled',
            device,
            args: {variantOutside: 'brand'},
        });

        const wrapper = await screen.findByTestId('switch-wrapper');
        const element = await screen.findByRole('switch');

        await expectScreenshot(wrapper);

        await element.click();

        await expectScreenshot(wrapper);
    });
}

test('Switch - uncontrolled', async () => {
    await openStoryPage({
        id: 'components-switch--uncontrolled',
        device: 'MOBILE_IOS',
    });

    const wrapper = await screen.findByTestId('switch-wrapper');
    const element = await screen.findByRole('switch');

    await expectScreenshot(wrapper);

    await element.click();

    await expectScreenshot(wrapper);
});

test('Switch - custom render', async () => {
    await openStoryPage({
        id: 'components-switch--custom-render',
        device: 'MOBILE_IOS',
    });

    const wrapper = await screen.findByTestId('switch-wrapper');
    const element = await screen.findByRole('switch');

    await expectScreenshot(wrapper);

    await element.click();

    await expectScreenshot(wrapper);
});

test('Switch - disabled', async () => {
    await openStoryPage({
        id: 'components-switch--uncontrolled',
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const wrapper = await screen.findByTestId('switch-wrapper');
    await expectScreenshot(wrapper);
});

test('Switch - control element aligned correctly with long content', async () => {
    await openStoryPage({
        id: 'components-switch--uncontrolled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(72);

    const wrapper = await screen.findByTestId('switch-wrapper');
    await expectScreenshot(wrapper);
});
