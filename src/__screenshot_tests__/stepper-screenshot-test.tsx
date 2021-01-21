import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('Stepper in %s', async (device) => {
    await openStoryPage({
        section: 'Components/Others/Stepper',
        name: 'Stepper',
        device,
    });

    const stepper = await screen.findByTestId('stepper');

    const image = await stepper.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('Stepper with large fontSize in %s', async (device) => {
    await openStoryPage({
        section: 'Components/Others/Stepper',
        name: 'Stepper',
        device,
    });

    await setRootFontSize(32);

    const stepper = await screen.findByTestId('stepper');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});
