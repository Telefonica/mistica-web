import {openStoryPage} from '../test-utils';

test('RadioGroup', async () => {
    await openStoryPage({
        section: 'Components/Forms/Switch',
        name: 'Switch',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
