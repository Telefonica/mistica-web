import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['DESKTOP', 'MOBILE_ANDROID', 'MOBILE_IOS'] as const;

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Spinner - default ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-spinner--default',
            device,
        });

        const spinner = await screen.findByLabelText('Cargando');

        await expectScreenshot(spinner);
    });
}

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Spinner - inverse ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-spinner--default',
            device,
            args: {variantOutside: 'brand'},
        });

        const spinner = await screen.findByLabelText('Cargando');

        await expectScreenshot(spinner);
    });
}
