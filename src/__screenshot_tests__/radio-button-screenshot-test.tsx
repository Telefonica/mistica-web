import {openStoryPage} from '../test-utils';

test('RadioGroup', async () => {
    await openStoryPage({
        section: 'Components/Forms/RadioButton',
        name: 'Radio Button',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
