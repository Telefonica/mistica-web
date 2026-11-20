import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'MOBILE_ANDROID'] as const;

for (const testCase of DEVICES) {
    const device = testCase;
    test(`RadioButton (${testCase})`, async () => {
        await openStoryPage({
            id: 'components-radio-button--controlled',
            device,
        });

        const wrapper = await screen.findByTestId('radio-group-wrapper');
        await expectScreenshot(wrapper);
    });
}

for (const testCase of DEVICES) {
    const device = testCase;
    test(`RadioButton - inverse (${testCase})`, async () => {
        await openStoryPage({
            id: 'components-radio-button--controlled',
            device,
            args: {variantOutside: 'brand'},
        });

        const wrapper = await screen.findByTestId('radio-group-wrapper');
        await expectScreenshot(wrapper);
    });
}

test('RadioButton - uncontrolled', async () => {
    await openStoryPage({
        id: 'components-radio-button--uncontrolled',
        device: 'MOBILE_IOS',
    });

    const wrapper = await screen.findByTestId('radio-group-wrapper');
    await expectScreenshot(wrapper);
});

test('RadioButton - custom render', async () => {
    await openStoryPage({
        id: 'components-radio-button--custom-render',
        device: 'MOBILE_IOS',
    });

    const wrapper = await screen.findByTestId('radio-group-wrapper');
    await expectScreenshot(wrapper);
});

test('RadioButton - disabled', async () => {
    await openStoryPage({
        id: 'components-radio-button--uncontrolled',
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const wrapper = await screen.findByTestId('radio-group-wrapper');
    await expectScreenshot(wrapper);
});

test('RadioButton - control element aligned correctly with long content', async () => {
    await openStoryPage({
        id: 'components-radio-button--uncontrolled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(72);

    const wrapper = await screen.findByTestId('radio-group-wrapper');
    await expectScreenshot(wrapper);
});
