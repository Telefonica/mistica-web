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
    });

    await page.click(await screen.findByTestId('target'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Popover - inverse', async () => {
    const page = await openStoryPage({
        id: 'components-popover--default',
        device: 'MOBILE_IOS',
        args: {variantOutside: 'brand'},
    });

    await page.click(await screen.findByTestId('target'));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(
    ['top', 'bottom', 'left', 'right'].flatMap((position) =>
        ['start', 'end'].map((alignment) => ({position, alignment}))
    )
)('Popover - position=$position alignment=$alignment', async (args) => {
    const page = await openStoryPage({
        id: 'components-popover--default',
        device: 'DESKTOP',
        args,
    });

    await (await screen.findByRole('button', {name: 'Popover target'})).click();
    expect(await page.screenshot()).toMatchImageSnapshot();
});
