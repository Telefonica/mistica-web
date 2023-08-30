import {openStoryPage, screen} from '../test-utils';

test('Tooltip', async () => {
    const page = await openStoryPage({
        id: 'components-tooltip--default',
        device: 'DESKTOP',
    });

    await page.click(await screen.findByText(/Tooltip top/im));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
