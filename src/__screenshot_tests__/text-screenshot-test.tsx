import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const SKINS = ['Movistar', 'O2', 'Vivo', 'Telefonica', 'Blau', 'Esimflag'] as const;

for (const testCase of TESTABLE_DEVICES.flatMap((device) => SKINS.map((skin) => ({device, skin})))) {
    const {device, skin} = testCase;
    test(`Text in ${testCase.device} with ${testCase.skin} skin`, async () => {
        await openStoryPage({
            id: 'components-text--text-components',
            device,
            skin,
        });

        const element = await screen.findByTestId('text');

        await expectScreenshot(element);
    });
}

test('Text wrapping', async () => {
    await openStoryPage({
        id: 'components-text--text-wrapping',
        device: 'DESKTOP',
    });

    const element = await screen.findByTestId('text');

    await expectScreenshot(element);
});

test('Text wrapping - multiple line breaks', async () => {
    await openStoryPage({
        id: 'components-text--text-wrapping',
        device: 'DESKTOP',
        args: {
            text: 'text with line breaks',
        },
    });

    const element = await screen.findByTestId('text');

    await expectScreenshot(element);
});
