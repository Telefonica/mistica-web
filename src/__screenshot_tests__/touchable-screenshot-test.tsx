import {openStoryPage} from '../test-utils';

test('Touchable', async () => {
    await openStoryPage({id: 'components-primitives-touchable--default'});

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});
