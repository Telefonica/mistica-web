import {openStoryPage, screen} from '../test-utils';

const POPOVER_POSITIONS = ['top', 'bottom', 'left', 'right'];

test.each(POPOVER_POSITIONS)('Popover - position = %s', async (position) => {
    const page = await openStoryPage({
        id: 'components-popover--default',
        device: 'DESKTOP',
        args: {position, slot: true},
    });

    await page.click(await screen.findByTestId('target'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Popover - appears properly on mobile', async () => {
    const page = await openStoryPage({
        id: 'components-popover--default',
        device: 'MOBILE_IOS',
        // todo https://github.com/Telefonica/mistica-web/issues/1621 Popover unstable on Movistar skin
        skin: 'O2',
    });

    await page.click(await screen.findByTestId('target'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Popover - inverse', async () => {
    const page = await openStoryPage({
        id: 'components-popover--default',
        device: 'MOBILE_IOS',
        // todo https://github.com/Telefonica/mistica-web/issues/1621 Popover unstable on Movistar skin
        skin: 'O2',
        args: {variantOutside: 'brand'},
    });

    await page.click(await screen.findByTestId('target'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
