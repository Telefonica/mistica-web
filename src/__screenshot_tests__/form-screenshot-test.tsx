import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

for (const testCase of ['DESKTOP', 'MOBILE_IOS'] as Array<Device>) {
    const device = testCase;
    test(`form fields with required errors after submit validation on ${testCase}`, async () => {
        await openStoryPage({
            id: 'patterns-forms-form-with-automatic-state-management--default',
            device,
        });

        await (await screen.findByText('Send')).click();

        const fieldWrapper = await screen.findByTestId('form-wrapper');
        await expectScreenshot(fieldWrapper);
    });
}
