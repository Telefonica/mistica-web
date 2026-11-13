import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

for (const testCase of [
    {device: 'DESKTOP', inverse: false, dark: false},
    {device: 'MOBILE_IOS', inverse: false, dark: false},
    {device: 'MOBILE_IOS', inverse: true, dark: false},
    {device: 'MOBILE_IOS', inverse: false, dark: true},
] as const) {
    const {device, inverse, dark} = testCase;
    test(`Breadcrumbs - device: ${testCase.device} - inverse: ${testCase.inverse} - dark: ${testCase.dark}`, async () => {
        await openStoryPage({
            id: 'components-breadcrumbs--default',
            device,
            isDarkMode: dark,
            args: {variantOutside: inverse ? 'brand' : 'default'},
        });

        const element = await screen.findByTestId('story');
        await expectScreenshot(element);
    });
}
