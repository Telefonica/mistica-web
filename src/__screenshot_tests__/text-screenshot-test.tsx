import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const SKINS = ['Movistar', 'O2', 'Vivo-new', 'Telefonica', 'Blau', 'O2-new', 'Tu', 'Esimflag'] as const;

test.each(TESTABLE_DEVICES.flatMap((device) => SKINS.map((skin) => ({device, skin}))))(
    'Text in $device with $skin skin',
    async ({device, skin}) => {
        await openStoryPage({
            id: 'components-text--text-components',
            device,
            skin,
        });

        const element = await screen.findByTestId('text');

        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test('Text wrapping', async () => {
    await openStoryPage({
        id: 'components-text--text-wrapping',
        device: 'DESKTOP',
    });

    const element = await screen.findByTestId('text');

    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();
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

    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();
});
