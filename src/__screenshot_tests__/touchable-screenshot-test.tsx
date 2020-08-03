import {openStoryPage} from '../test-utils';

test('Bun common component screenshot', async () => {
    await openStoryPage({
        section: 'Components|Touchables/Touchable',
        name: 'Touchable',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});
