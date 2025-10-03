import {openStoryPage, screen} from '../test-utils';

const POPOVER_POSITIONS = ['top', 'bottom', 'left', 'right'];

test.each(POPOVER_POSITIONS)('Popover - position = %s', async (position) => {
    const page = await openStoryPage({
        id: 'components-popover--default',
        device: 'DESKTOP',
        args: {position, extra: true},
    });

    await page.click(await screen.findByTestId('target'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Popover - appears properly on mobile', async () => {
    const page = await openStoryPage({
        id: 'components-popover--default',
        device: 'MOBILE_IOS',
        skin: 'Movistar', // TODO: investigate why the test is instable with Movistar-new skin
    });

    await page.click(await screen.findByTestId('target'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Popover - inverse', async () => {
    const page = await openStoryPage({
        id: 'components-popover--default',
        device: 'MOBILE_IOS',
        skin: 'Movistar', // TODO: investigate why the test is instable with Movistar-new skin
        args: {inverse: true},
    });

    await page.click(await screen.findByTestId('target'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
