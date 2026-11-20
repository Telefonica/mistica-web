import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'] as const;

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Checkbox (${testCase})`, async () => {
        await openStoryPage({
            id: 'components-checkbox--controlled',
            device,
        });

        const wrapper = await screen.findByTestId('checkbox-wrapper');
        const checkbox = await screen.findByRole('checkbox');

        await expectScreenshot(wrapper);

        await checkbox.click();

        await expectScreenshot(wrapper);
    });
}

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Checkbox - inverse (${testCase})`, async () => {
        await openStoryPage({
            id: 'components-checkbox--controlled',
            device,
            args: {variantOutside: 'brand'},
        });

        const wrapper = await screen.findByTestId('checkbox-wrapper');
        const checkbox = await screen.findByRole('checkbox');

        await expectScreenshot(wrapper);

        await checkbox.click();

        await expectScreenshot(wrapper);
    });
}

test('Checkbox - uncontrolled', async () => {
    await openStoryPage({
        id: 'components-checkbox--uncontrolled',
        device: 'MOBILE_IOS',
    });

    const wrapper = await screen.findByTestId('checkbox-wrapper');
    const checkbox = await screen.findByRole('checkbox');

    await expectScreenshot(wrapper);

    await checkbox.click();

    await expectScreenshot(wrapper);
});

test('Checkbox - custom render', async () => {
    await openStoryPage({
        id: 'components-checkbox--custom-render',
        device: 'MOBILE_IOS',
    });

    const wrapper = await screen.findByTestId('checkbox-wrapper');
    const checkbox = await screen.findByRole('checkbox');

    await expectScreenshot(wrapper);

    await checkbox.click();

    await expectScreenshot(wrapper);
});

test('Checkbox - disabled', async () => {
    await openStoryPage({
        id: 'components-checkbox--uncontrolled',
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const wrapper = await screen.findByTestId('checkbox-wrapper');
    await expectScreenshot(wrapper);
});

test('Checkbox - control element aligned correctly with long content', async () => {
    await openStoryPage({
        id: 'components-checkbox--uncontrolled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(72);

    const wrapper = await screen.findByTestId('checkbox-wrapper');
    await expectScreenshot(wrapper);
});
