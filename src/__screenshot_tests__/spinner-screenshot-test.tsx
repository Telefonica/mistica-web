import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['DESKTOP', 'MOBILE_ANDROID', 'MOBILE_IOS'] as const;

test.each(DEVICES)('Spinner - default %s', async (device) => {
    await openStoryPage({
        id: 'components-spinner--default',
        device,
    });

    const spinner = await screen.findByLabelText('Cargando');

    const image = await spinner.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Spinner - inverse %s', async (device) => {
    await openStoryPage({
        id: 'components-spinner--default',
        device,
        args: {inverse: true},
    });

    const spinner = await screen.findByLabelText('Cargando');

    const image = await spinner.screenshot();
    expect(image).toMatchImageSnapshot();
});
